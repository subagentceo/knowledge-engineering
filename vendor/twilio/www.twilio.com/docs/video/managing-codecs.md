# Managing codecs

The term *codec* blends the words *encoder* and *decoder*. An encoder compresses—or encodes—a media signal. A decoder reverses the process and prepares the media for playback. A codec defines the format that represents the media. For two endpoints to exchange media, they must share at least one codec. Many audio and video codecs are available. Each codec differs in computing requirements, compression ratio, and fidelity.

In this guide, we discuss four considerations when it comes to codecs:

1. Codecs supported by Twilio Video SDKs
2. Codecs and use cases
3. Codec interoperability in Group Rooms
4. Multi-codec Rooms and hardware acceleration

![Encoding and decoding video. .](https://docs-resources.prod.twilio.com/fca5b0c5ca957c1271ca4bbf74def200f1799183d8979066e3b9b68a2d1a0969.png)

## Codecs supported by Twilio Video SDKs

The codecs that Twilio Video Client SDKs support are platform dependent. In the JavaScript SDK, browser vendors supply the codec implementations, while on mobile SDKs the device hardware determines codec support. Modern browsers and recent Twilio Video SDKs support the VP8, VP9, and H.264 Video codecs.

### Video codecs

Twilio Video SDKs support the following video codecs.

| SDK or browser     | VP8 | VP9 [^1] | H.264                              |
| ------------------ | --- | -------- | ---------------------------------- |
| Chrome 57+         | Yes | Yes      | Yes                                |
| Safari 15+         | Yes | Yes      | Yes                                |
| Firefox 55+        | Yes | Yes      | Yes                                |
| Video iOS 2.0+     | Yes | Yes      | Yes [^2]                           |
| Video Android 2.0+ | Yes | Yes      | Yes [^3] (If hardware supports it) |

For details, see the [browser support table](/docs/video/javascript#supported-browsers).

[^1]: VP9 is supported only in Peer-to-peer Video Rooms.

[^2]: Twilio Video for iOS relies on hardware support for H.264. Hardware encode/decode is supported on all iOS devices.

[^3]: Twilio Video for Android relies on hardware support for H.264, which depends on device capabilities. Reference the following example to check if the device supports H.264.

The following example shows how to check if a device supports the H.264 codec (Video Android 6.x+):

```java

HardwareVideoEncoderFactory hardwareVideoEncoderFactory =
        new HardwareVideoEncoderFactory(null, true, true);
HardwareVideoDecoderFactory hardwareVideoDecoderFactory =
        new HardwareVideoDecoderFactory(null);

boolean h264EncoderSupported = false;
for (VideoCodecInfo videoCodecInfo : hardwareVideoEncoderFactory.getSupportedCodecs()) {
    if (videoCodecInfo.name.equalsIgnoreCase("h264")) {
        h264EncoderSupported = true;
        break;
    }
}
boolean h264DecoderSupported = false;
for (VideoCodecInfo videoCodecInfo : hardwareVideoDecoderFactory.getSupportedCodecs()) {
    if (videoCodecInfo.name.equalsIgnoreCase("h264")) {
        h264DecoderSupported = true;
        break;
    }
}

boolean isH264Supported =  h264EncoderSupported && h264DecoderSupported;
```

### Audio codecs

Twilio Video SDKs support the following audio codecs.

| SDK or browser | iSAC | OPUS | PCMU | PCMA | G.722 |
| -------------- | ---- | ---- | ---- | ---- | ----- |
| Chrome 110+    | No   | Yes  | Yes  | Yes  | Yes   |
| Safari         | Yes  | Yes  | Yes  | Yes  | Yes   |
| Firefox 55+    | No   | Yes  | Yes  | Yes  | Yes   |
| Video iOS 2.0+ | Yes  | Yes  | Yes  | Yes  | Yes   |
| Video iOS 1.x  | Yes  | Yes  | Yes  | Yes  | Yes   |
| Android 2.0+   | Yes  | Yes  | Yes  | Yes  | Yes   |
| Android 1.x    | No   | Yes  | No   | No   | No    |

## Codecs and use cases

If your use case averages three or more participants in a Video Room then Twilio recommends using VP8 as the preferred video codec in the connect options and enabling the [Adaptive Simulcast](/docs/video/tutorials/working-with-vp8-simulcast#adaptive-simulcast) feature. Adaptive Simulcast ensures that any network or device issues with one participant do not impact the experience of other participants.

For use cases where the vast majority of Rooms have only two participants, Twilio recommends letting the underlying platform determine the best video codec by not specifying a preferred video codec and leaving Adaptive Simulcast disabled.

Opus is the default and recommended audio codec because it's supported by all modern browsers and the Video Twilio SDKs.

## Codec interoperability in Group Rooms

Before establishing a multimedia communication, the involved parties need to agree on the codecs to be used. Twilio manages this through an automatic codec negotiation that imposes some interoperability restrictions.

In a Video Room, an SFU (Selective Forwarding Unit) media server mediates among clients. If client A wants to send media to clients B and C, then A sends only one media stream to the SFU that, in turn, forwards it to B and C. The codec negotiation is based on the following principles:

* For inbound tracks (i.e. tracks getting into the SFU), the SFU tries to accept the codec preferred by the client as long as this codec is supported by the SFU.
* For outbound tracks (i.e. tracks getting out the SFU), the tracks are only offered in the codec in which they are being received.

These have interoperability implications. First because the only codecs allowed are the ones supported by the SFU. The following tables summarize them:

Video Room SFU infrastructure supports the following video codecs.

|               | VP8 | VP9 | H.264 |
| ------------- | --- | --- | ----- |
| Is Supported? | Yes | No  | Yes   |

Video Room SFU infrastructure supports the following audio codecs.

|               | iSAC | OPUS | PCMU | PCMA | G.722 |
| ------------- | ---- | ---- | ---- | ---- | ----- |
| Is Supported? | No   | Yes  | Yes  | No   | No    |

Second, because the codecs negotiated in a call might limit the interoperability with clients joining later. As a result, a set of clients supporting a common codec doesn't guarantee that they'll be able to communicate. For example, participants A and B are using Chrome and Firefox respectively and start communicating using VP8. When participant C joins later with a legacy Safari \< 12.1 browser it will not be able to receive video track from A and B because legacy Safari \< 12.1 supports only H.264. Even though both A and B could communicate using H.264, when they connected to the SFU they negotiated their default as VP8. The following image illustrates the example.

![Browser video codec compatibility diagram featuring Chrome, Firefox, Safari, and SFU connections.](https://docs-resources.prod.twilio.com/b45d398bb2670c67098595448a2aa1911b3d8f1c7ef832d89ed5781c257dc05d.png)

### Controlling codecs client-side: codec preferences

You can override default codec selection using codec preferences. The following SDK versions support codec preferences:

* JavaScript SDK v1.3+
* Android SDK v2.0+
* iOS SDK v2.0+

Codec preferences are based on the following principles:

* Allows selecting both the preferred audio codecs and the preferred video codecs in which media tracks are published by a client SDK.
* Selected codecs are provided as an ordered list of codec specifications, so that codecs specified first have higher preference.
* Only codecs supported at a given SDK can be specified as preferred.
* Codec Preferences are set when a participant connects to a room as part of the `ConnectOptions`.
* A participant selecting a preferred codec does not guarantee that the SDK uses the codec. The preference just means that the codec shall have higher priority among the list of possible codecs to use. The chosen codec might depend on other factors, such as the codecs supported by the other parties of the communication.

The following examples show how a Participant can connect to a room preferring iSAC as the audio codec and H.264 as the video codec.

Select preferred codecs in Android SDK (v2.0+):

```java
// Android Java

// Prefer H264 if it is hardware available for encoding and decoding
VideoCodec videoCodec = isH264Supported ? (new H264Codec()) : (new Vp8Codec());
ConnectOptions connectOptions = new ConnectOptions.Builder(token)
    .preferAudioCodecs(Collections.singletonList(new IsacCodec()))
    .preferVideoCodecs(Collections.singletonList(videoCodec)
    .build();

Room room = Video.connect(context, connectOptions, listener);
```

Note that checking for H.264 hardware support changed from v5.x to v6.x. See [Codecs supported by Twilio Video SDKs](#codecs-supported-by-twilio-video-sdks) to learn how to use the correct syntax.

Selecting preferred codecs in iOS SDK (required v2.0+)\*\*

```swift
// iOS Swift
let options = TVIConnectOptions.init(token: accessToken block: {(builder: TVIConnectOptionsBuilder) -> Void in
    builder.preferredAudioCodecs = [ TVIIsacCodec() ]
    builder.preferredVideoCodecs = [ TVIH264Codec() ]
}

var room = TwilioVideo.connect(with: options delegate: self)
```

```objc
// iOS Objective-C
TVIConnectOptions *options = [TVIConnectOptions optionsWithToken:self.accessToken
                                block:^(TVIConnectOptionsBuilder * _Nonnull builder) {
    builder.preferredAudioCodecs = @[ [TVIIsacCodec new] ];
    builder.preferredVideoCodecs = @[ [TVIH264Codec new] ];
}];

TVIRoom *room = [TwilioVideo connectWithOptions:options delegate:self];
```

For further information on how Codec Preferences work, please check the corresponding SDK reference documentation regarding the `connect` primitive and its `ConnectOptions` parameter.

## Multi-codec Rooms: using Codec Preferences for optimizing battery life

In Twilio Video, a Room uses multi-codec capabilities when different participants send their video or audio using different codecs. Multi-codecs can optimize battery life, because many vendors provide hardware acceleration for specific codec suites. For example, all iOS devices have H.264 hardware acceleration, and many modern Android devices provide hardware acceleration for both H.264 and VP8. If client devices have different hardware support, Codec Preferences make it possible to send media using the codec supported by the local device and to receive media using the codec supported by the remote participant device.

For example, three clients A - Chrome, B - Firefox, and C - iOS smartphone negotiate VP8 as the video codec by default. However, you might prefer to use H.264 for client C to optimize the battery life of the iOS smartphone. You can set H.264 as C's preferred codec. The following code illustrate this example:

Participant A codec preferences:

```js
// We don't really need this: VP8 is Chrome's default preferred video codec
const room = await connect(token, {
    preferredVideoCodecs: ['VP8']
});
```

Participant B codec preferences

```js
// We don't really need this: VP8 is Firefox's default preferred video codec
const room = await connect(token, {
    preferredVideoCodecs: ['VP8']
});
```

Participant C codec preferences:

```swift
// iOS Swift
let options = TVIConnectOptions.init(token: accessToken block: {(builder: TVIConnectOptionsBuilder) -> Void in
      builder.preferredVideoCodecs = [ TVIH264Codec() ]
}
var room = TwilioVideo.connect(with: options delegate: self)
```

If A, B, and C connect to a Room, the topology is the following:

![Multi-codecs example in a Room.](https://docs-resources.prod.twilio.com/8ce08861db7298c2303e9e12083c40ff2efbb7dab22aed3f86a59d1d4544c4fc.png)

### Multi-codecs limitations and known issues

* The quality of H.264 support on Android devices varies and there can be device specific encode and decode issues
* Multi-codec support for video is currently limited to H.264 and VP8.
* Multi-codec support for audio is currently limited to Opus and PCMU.
* Support for H.264 video is currently limited to the Constrained Baseline profile at level 3.1. This means that the maximum resolution of a video track is 1280x720 at 30 fps.
* The use of multi-codecs in a Room with recording activated causes recordings to be also multi-codec. This means that a recording keeps the codec of the track originating it.
