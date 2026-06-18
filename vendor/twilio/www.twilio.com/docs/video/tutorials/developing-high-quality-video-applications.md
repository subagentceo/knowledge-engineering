# Developing High Quality Video Applications

This guide provides advice for developing high-quality Twilio Video applications. For an optimal end user experience, we highly recommend that you read the complete [Twilio Programmable Video documentation](/docs/video) and tailor our general recommendations provided here to your specific use-case.

## Settings overview

Use this section as a fast guide to find the recommended settings for your application.

1. Choose the client:

* **Desktop Browser**: refers to clients using Twilio [JavaScript SDK](/docs/video/javascript) on desktop/laptop [supported browsers](/docs/video/javascript#supported-browsers).
* **Mobile Browser**: clients using Twilio [JavaScript SDK](/docs/video/javascript) on [supported mobile browsers](/docs/video/javascript#supported-browsers).
* **Mobile SDK**: clients using Twilio [Android SDK](/docs/video/android) or [iOS SDK](/docs/video/ios).

2. Choose the preferred Network Bandwidth API mode:

* [`grid`](#code-samples-for-grid-mode)
* [`collaboration`](#code-samples-for-collaboration-mode)
* [`presentation`](#code-samples-for-presentation-mode)

You can find detailed information about each option in [this section](#network-bandwidth-profile-api). When in doubt, use `collaboration`.

## What does quality mean?

Quality is an elusive concept that may have different meanings in different contexts. With Twilio Programmable Video, quality is a synonym of Quality of Experience understood as how well a video application solves end users' needs and addresses their expectations.

Videoconferencing is the most typical use-case of real-time video applications. They allow end users to communicate "as they do face-to-face." Hence, end users expectations are high fidelity (for example, high resolution and high frame-rate) and low latency (for example, real-time conversational interactions). However, the quality of experience may also be impacted by other aspects such as battery consumption, availability of computing and networking resources, etc. Some of the variables affecting quality impact one another. For example, if you increase the video resolution then the battery consumption and the networking costs will also increase.

Hence, before starting developing a high-quality video application, first you must wonder: what do end users need and expect? Having a precise answer to that question will help you make the most appropriate decisions for quality optimization.

## Concepts and terminology

You may find useful the following concepts and definitions:

**Resolution**

Video tracks can be understood as sequences of still images each of which is encoded as a matrix of pixels. The resolution refers to the dimensions of such a matrix expressed as *width* x *height*. The following resolutions are common:

| **Resolution**                            | **Dimensions (pixels)** |
| ----------------------------------------- | ----------------------- |
| FullHD (Full High Definition) - aka 1080p | 1920x1080 [^1]          |
| HD (High Definition) - aka 720p           | 1280x720                |
| qHD (Quarter High Definition) - aka 540p  | 960x540 [^1]            |
| VGA (Video Graphics Array)                | 640x480                 |
| QCIF (Quarter Common Interface Format)    | 176×144                 |

[^1]: Note that on some devices, frame dimensions may differ slightly due to limitations of some hardware video encoders requiring the dimensions to be a multiple of 16. For example, 960x540 may actually be 960x528.

**Frame-rate**

The frame-rate refers to the number of still images that the video stream includes per time unit. It is typically expressed in terms of *fps* (*frames per second*). Hence, an *HD@30fps* video will comprise a sequence of 30 HD still images per second.

**Bitrate**

The bitrate refers to the number of bits that a given video or audio stream consumes when being transported through a digital network. It is typically measured in terms of *bps* (*bits per second*) sometimes prefixed with a power of 10 prefix (e.g. *Kbps*, *Mbps*, etc).

**Codecs: VP8, H.264, and VP8 Simulcast**

A codec refers to a type of algorithm that encodes a video signal typically compressing it in the process. VP8 and H.264 are the two main codecs used for videoconferencing. VP8 Simulcast (or Adaptive Simulcast) is a scalable version of the VP8 codec. For further information, you may read our [Working with VP8 Simulcast](/docs/video/tutorials/working-with-vp8-simulcast) developer guide.

**Network Bandwidth Profile API**

The [Network Bandwidth Profile API](/docs/video/tutorials/using-bandwidth-profile-api) (aka BW Profile API) is a Twilio Video API specifically designed for optimizing bandwidth utilization in Video Group Rooms. This is a critical API for creating high-quality video applications.

**Network Quality API**

The Network Quality API is a Video API specifically designed for monitoring the network quality on Rooms. Refer to [Using the Network Quality API](/docs/video/using-network-quality-api) developer guide for further information.

## Minimum Bandwidth Recommendations

**Video Bitrates**

The bandwidth requirement of video streams will depend on the codec, resolution and frame rate. The following table describes the minimum bandwidth required for various codecs and resolutions. In all cases the frame rate is assumed to be 30 fps.

| **Video Codec** | **Resolution (width x height)** | **Bitrate (kbps)** |
| --------------- | ------------------------------- | ------------------ |
| VP8             | 176x144                         | 150                |
| VP8             | 640x480                         | 400                |
| VP8             | 1280x720                        | 650                |
| VP8             | 1920x1080                       | 1,200              |
| VP8 Simulcast   | 176x144                         | 150                |
| VP8 Simulcast   | 640x480                         | 550                |
| VP8 Simulcast   | 1280x720                        | 1,400              |
| VP8 Simulcast   | 1920x1080                       | 3,000              |
| H.264 [^2]      | 176x144                         | 125                |
| H.264 [^2]      | 640x480                         | 400                |
| H.264 [^2]      | 1280x720                        | 600                |

**Screen Share Bitrates**

Screen share typically uses a frame rate of 5 fps. The following table describes the minimum bandwidth required for various codecs and resolutions. In all cases the frame rate is assumed to be 5 fps.

| **Video Codec** | **Resolution (width x height)** | **Bitrate (kbps)** |
| --------------- | ------------------------------- | ------------------ |
| VP8             | 1280x720                        | 85                 |
| VP8             | 1920x1080 [^1]                  | 175                |
| VP8 Simulcast   | 1280x720                        | 700                |
| VP8 Simulcast   | 1920x1080                       | 1,800              |
| H.264 [^2]      | 1280x720                        | 90                 |

[^2]: Note that each device or browser has a different H.264 codec implementation and as such there will be some variance to the bitrates presented above.

**Audio Bitrates**

The default bitrate for the Opus codec is 32 kbps.

## General Recommendations

Before going deep into the technical details, it may be interesting to understand some general common-sense recommendations that you may find useful in your design process.

**Display only to what end users need**

Encoding, communicating and rendering video tracks is expensive. This is very noticeable in multiparty applications when the number of participants is large. For example, in a room with 20 participants, it is generally a bad idea to have all the participants rendering 20 high resolution video tracks. That could contribute to network congestion and will overload the client CPU making the quality of experience poor. Instead, well-designed videoconferencing applications tend to limit the number of rendered video tracks to the ones that are really required. For example, in an e-learning application, it doesn't provide much value having all the students rendering the video of the rest of the students all the time. It is more reasonable to do it only in special situations such as when a question is being asked by that specific participant. In that case, developers must make use of the Network Bandwidth Profile API, which dynamically adjusts to the dominant speaker and rendered size of the participants who are displayed on screen. In addition, the Network Bandwidth Profile API can automatically switch off video tracks that are not visible on screen.

**Make it simple for end users to mute**

Your application should provide mute capabilities to end users so that they can disable the video or audio communication as they wish. This will avoid unnecessary traffic and background noise.

**Use VP8 Simulcast in multiparty Rooms**

Multiparty Rooms participants should prefer [VP8 Simulcast or Adaptive Simulcast](/docs/video/tutorials/working-with-vp8-simulcast) over other video codecs. The larger the number of participants in a room, the more important Simulcast is for providing the best possible quality of experience. If the vast majority of your Video Room only contain two participants then it is safe to leave Simulcast off.

**Use a reasonable resolution and frame-rate for video capture**

Frame-rate and resolution are the two main capture constraints that affect video fidelity. When the video source is a webcam showing people or moving objects, typically the perceptual quality is better at higher frame-rate. However, for screen-sharing, the resolution is typically more relevant. You should try to set resolution and frame-rate to the minimum value required by your use-case. Over-dimensioning resolution and frame-rate will have a negative impact on the CPU and network consumption and may increase latency. In addition, remember that the resolution and frame-rate you specify as capture constraints are just hints for the client video engine. The actual resolution and frame-rate may decrease if CPU overuse is detected or if the network capacity is not enough for the required traffic.

**Consider the render dimensions**

When setting your video capture constraints for publishers you must also consider the render size on the subscriber's side, i.e. the video tiles on the UI. If you know that a given video track is to be rendered only in thumbnail size for all subscribers, then it does not make sense to capture it in high resolution at the publisher.

**Do not share device resources**

High-resolution video and audio consume relevant CPU and bandwidth resources. If those resources are being shared with other applications the quality of experience will decrease. To have the best possible experience, you should recommend your end users to close all the applications that may steal CPU or bandwidth to your video service while it's executing.

**Use the best connectivity you can find**

Network connectivity is the most critical aspect affecting communication quality. Restricted bandwidth, high latency, and packet loss will negatively impact your end users' experience. Hence, you should recommend using the best possible network access they may find: wired connectivity is commonly better than a wireless connection. Among wireless connections, typically corporate or cellular connectivity is better than public open shared WiFi networks.

**Using `maxVideoBitrate` or `maxAudioBitrate`**

Both parameters allow controlling the maximum Participant's upstream bandwidth.

* `maxVideoBitrate` specifies the maximum video bitrate a participant can publish to the Room. By default, no value is set and the `maxVideoBitrate` is unlimited. In that case, the bitrate is only limited by the Twilio client SDK using an algorithm that considers the available bandwidth and CPU resources. In general, we recommend trusting that algorithm and avoid setting the `maxVideoBitrate`. However, in devices with restricted CPU or battery life we recommend setting `maxVideoBitrate` to a value between 500000 and 2000000 bps per track. Note, if a Participant is Publishing `N` video tracks then each video track will be limited to consuming `maxVideoBitrate/N`.
* `maxAudioBitrate` specifies the maximum audio bitrate published by a Participant. It only takes effect when using Opus (that is, it has no effect on PCM codecs). By default it is unset and Opus is configured with its default settings consuming between 20Kbps and 40Kbps. Twilio's recommendation is to keep the default. Leaving `maxAudioBitrate` unset allows Opus Forward Error Correction (FEC) to function effectively, which significantly improves audio quality under packet loss conditions.

|                   | Recommendation       | When to use it                                                                                          |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `maxVideoBitrate` | Keep default (unset) | In mobile platforms keep it between 500000 and 2000000 bps per video track                              |
| `maxAudioBitrate` | Keep default (unset) | Restricting audio bitrate is *not* recommended because it impairs Opus FEC resilience under packet loss |

**Use GLL**

On the Internet, latency and packet loss depend on geolocation. When the connection between a sender and a receiver spans the globe, latency and jitter are increased by the distance between the parties. Packet loss is also more likely, due to the number of routers in the connection path. Due to this, the Twilio infrastructure that serves your rooms should be as close as possible to your clients. Otherwise, quality may be affected:

* Connectivity time may increase.
* Media latency and packet loss may increase making the fidelity drop.

To minimize these problems, Twilio makes it possible to specify the signaling and media regions for your Rooms. However, determining what's the closest region for a participant is not always trivial. For this reason, we recommend developers use GLL (Global Low Latency). When GLL is specified, Twilio will automatically choose the region that minimizes latency. See our [Video Regions and Global Low Latency](/docs/video/tutorials/video-regions-and-global-low-latency) documentation for further insight.

**Measure**

Quality should be understood as a process. You should try to measure both your end users' subjective perception as well as the many different factors that may affect it including CPU consumption and network connectivity metrics. You may find Twilio's Network Quality API interesting for the latter. With that information, try to understand your end users' pain points and design a strategy to minimize them. Periodically repeating the measure-analyze-implement cycle is the best way to guarantee you are offering the best possible quality of experience to your users.

### Network Bandwidth Profile API

**Determining the Bandwidth Profile Mode**
Bandwidth Profiles have three modes: `collaboration`, `presentation`, and `grid`. You can determine the mode that best fits your use-case with the following decision diagram:

![Decision diagram for Network Bandwidth Profile mode selection.](https://docs-resources.prod.twilio.com/15b04d263e1892a079ae3cb7815e5cd51e9d812a143500a9df92c23d9b9f50ab.png)

**Is it a multiparty service?**

* If your application is only used for 1-to-1 calls (i.e. there are never or almost never more than 2 Participants in the Room) answer NO. Otherwise, answer YES.

**Is there a main video track?**

* If your application UI renders all video tracks with the same display size, answer NO. If your application has one (or several) video tracks that are enhanced in the UI (e.g. dominant speaker, screen-share, etc.) taking more display area answer YES.

**Can I use VP8 Simulcast?**

* If some of your end users cannot use VP8 simulcast (e.g. because you have decided to use H.264, or because it's not supported, etc.) answer NO. Otherwise, answer YES.

**Is the main track quality critical?**

* If you prefer the main video track quality to be preserved by all means, even at the cost of completely switching off other less relevant tracks when bandwidth is low (e.g. the screen-share in a presentation), answer YES. Otherwise, answer NO.

### Recommended settings

The following settings apply across all platforms and modes unless otherwise specified in the platform or mode-specific sections below.

#### Codec settings

| **Setting**                    | **Recommendation**                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| Video codec (1-to-1 Rooms)     | VP8 (default). H.264 only for interoperability. Never use Simulcast.                |
| Video codec (multiparty Rooms) | VP8 Simulcast. Use VP8 if simulcast not supported. H.264 only for interoperability. |
| Audio codec                    | Opus (default)                                                                      |

#### Network bandwidth profile defaults

| **Setting**                   | **Default**                            |
| ----------------------------- | -------------------------------------- |
| `trackSwitchOffMode`          | `predicted`                            |
| `clientTrackSwitchOffControl` | `auto`                                 |
| `contentPreferencesMode`      | `auto`                                 |
| `maxSubscriptionBitrate`      | Unlimited (Desktop) / 2500000 (Mobile) |

#### Network Quality API

Always keep the Network Quality API **Active** for monitoring connection quality.

### Platform-Specific Settings

#### Desktop browser

| **Setting**    | **Value**                                        |
| -------------- | ------------------------------------------------ |
| Webcam capture | HD@24fps (reduce to VGA@24fps on CPU overuse)    |
| Screen capture | FullHD@15fps (reduce to HD@15fps on CPU overuse) |

#### Mobile browser

| **Setting**    | **Value**                                           |
| -------------- | --------------------------------------------------- |
| Webcam capture | VGA@24fps (increase to HD@24fps with HW support)    |
| Screen capture | HD@15fps (increase to FullHD@15fps with HW support) |

#### Mobile SDK

| **Setting**    | **Value**                                     |
| -------------- | --------------------------------------------- |
| Camera capture | VGA@24fps (increase to HD with HW support)    |
| Screen capture | HD@15fps (increase to FullHD with HW support) |

### Developing applications with `grid` mode

**When to use:** All video tracks displayed at the same size, or when Simulcast is not available.

| **Setting** | **Value** |
| ----------- | --------- |
| `mode`      | `grid`    |

> **Note:** For larger rooms (5+ participants), not using Simulcast will typically degrade video quality even in `grid` mode.

![Typical GUI layout used for grid mode. Videos are displayed in a matrix where all video tracks have equal relevance.](https://docs-resources.prod.twilio.com/8bc28228ea1f0beecacedb7c2808db0c7d073aa69a3674894f2d615d7fa646e3.png)

#### Code samples for `grid` mode

**JavaScript (Desktop/Mobile Browser)**

```js
Twilio.Video.connect('$TOKEN', {
  name: 'my-room-name'
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 }, // Use 480/640 for mobile
  bandwidthProfile: {
    video: {
      mode: 'grid',
      // maxSubscriptionBitrate: 2500000  // Uncomment for mobile
    }
  },
  // For multiparty rooms (participants >= 3) uncomment the line below
  // preferredVideoCodecs: "auto",
  networkQuality: {local:1, remote: 1}
});
```

**Android SDK**

```java
VideoConstraints videoConstraints =
            new VideoConstraints.Builder()
                    .maxFps(24)
                    .maxVideoDimensions(VideoDimensions.VGA_VIDEO_DIMENSIONS)
                    .build();

LocalVideoTrack localVideoTrack = LocalVideoTrack.create(context, true, videoCapturer, videoConstraints);

NetworkQualityConfiguration configuration =
            new NetworkQualityConfiguration(
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL,
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL);

VideoBandwidthProfileOptions videoBandwidthProfileOptions = new VideoBandwidthProfileOptions.Builder()
        .mode(BandwidthProfileMode.GRID)
        .build();
BandwidthProfileOptions bandwidthProfileOptions = new BandwidthProfileOptions(videoBandwidthProfileOptions);

ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
            .enableNetworkQuality(true)
            .networkQualityConfiguration(configuration)
            .videoTracks(Collections.singletonList(localVideoTrack)
            .bandwidthProfile(bandwidthProfileOptions)
            // Enable simulcast for Rooms with more than 2 participants
            // .preferVideoCodecs(Collections.singletonList(new Vp8Codec(true)))
            .build();
```

**iOS SDK**

```swift
let format = VideoFormat()
format.dimensions = CMVideoDimensions(width:640, height: 480)
format.frameRate = 24

camera.startCapture(device: device, format: format, completion: { (captureDevice, videoFormat, error) in
    // Any code needed to run after capture starts
});

localVideoTrack = LocalVideoTrack(source: camera, enabled: true, name: "Camera")

let connectOptions = ConnectOptions(token: accessToken) { builder in
    if let localVideoTrack = localVideoTrack {
        builder.videoTracks = [localVideoTrack]
    }
    builder.isNetworkQualityEnabled = true
    builder.networkQualityConfiguration =
        NetworkQualityConfiguration(localVerbosity: .minimal, remoteVerbosity: .minimal)
    builder.encodingParameters = EncodingParameters(videoBitrate:0)
    let videoBandwidthProfileOptions = VideoBandwidthProfileOptions { builder in
        builder.mode = .grid
    }
    builder.bandwidthProfileOptions = BandwidthProfileOptions(videoOptions: videoBandwidthProfileOptions)
    // Enable simulcast for Rooms with more than 2 participants
    // builder.preferredVideoCodecs = [TVIVp8Codec(simulcast: true)]
}
```

### Developing Applications with `collaboration` mode

**When to use:** If the dominant speaker is highlighted and there are thumbnails for others; keeping all tracks visible is the priority.

| **Setting** | **Value**       |
| ----------- | --------------- |
| `mode`      | `collaboration` |

> **Note:** For 1-to-1 rooms, use `grid` mode instead. If most participants use VP8 or H.264 (non-simulcast), use `grid` mode instead.

![Apps in collaboration mode highlight the dominant speaker, showing others as thumbnails.](https://docs-resources.prod.twilio.com/784959f0b87a9e6f3a858000cd2dcd4b030cbdcab488ff37be09e2b6b71839e8.png)

#### Code Samples for `collaboration` mode

**JavaScript (Desktop/Mobile Browser)**

```js
Twilio.Video.connect('$TOKEN', {
  name: 'my-room-name'
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 }, // Use 480/640 for mobile
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      // maxSubscriptionBitrate: 2500000  // Uncomment for mobile
    }
  },
  preferredVideoCodecs: "auto",
  networkQuality: {local:1, remote: 1}
});
```

**Android SDK**

```java
VideoConstraints videoConstraints =
            new VideoConstraints.Builder()
                    .maxFps(24)
                    .maxVideoDimensions(VideoDimensions.VGA_VIDEO_DIMENSIONS)
                    .build();

LocalVideoTrack localVideoTrack = LocalVideoTrack.create(context, true, videoCapturer, videoConstraints);

NetworkQualityConfiguration configuration =
            new NetworkQualityConfiguration(
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL,
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL);

VideoBandwidthProfileOptions videoBandwidthProfileOptions = new VideoBandwidthProfileOptions.Builder()
        .mode(BandwidthProfileMode.COLLABORATION)
        .build();
BandwidthProfileOptions bandwidthProfileOptions = new BandwidthProfileOptions(videoBandwidthProfileOptions);

ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
            .enableNetworkQuality(true)
            .networkQualityConfiguration(configuration)
            .videoTracks(Collections.singletonList(localVideoTrack)
            .bandwidthProfile(bandwidthProfileOptions)
            .preferVideoCodecs(Collections.singletonList(new Vp8Codec(true))) // Enable simulcast
            .build();
```

**iOS SDK**

```swift
let format = VideoFormat()
format.dimensions = CMVideoDimensions(width:640, height: 480)
format.frameRate = 24

camera.startCapture(device: device, format: format, completion: { (captureDevice, videoFormat, error) in
    // Any code needed to run after capture starts
});

localVideoTrack = LocalVideoTrack(source: camera, enabled: true, name: "Camera")

let connectOptions = ConnectOptions(token: accessToken) { builder in
    if let localVideoTrack = localVideoTrack {
        builder.videoTracks = [localVideoTrack]
    }
    builder.isNetworkQualityEnabled = true
    builder.networkQualityConfiguration =
        NetworkQualityConfiguration(localVerbosity: .minimal, remoteVerbosity: .minimal)
    builder.encodingParameters = EncodingParameters(videoBitrate:0)
    let videoBandwidthProfileOptions = VideoBandwidthProfileOptions { builder in
        builder.mode = .collaboration
    }
    builder.bandwidthProfileOptions = BandwidthProfileOptions(videoOptions: videoBandwidthProfileOptions)
    builder.preferredVideoCodecs = [TVIVp8Codec(simulcast: true)]
}
```

### Developing Applications with `presentation` mode

**When to use:** One presenter to many viewers; presenter quality is critical and more important than keeping other tracks on.

| **Setting** | **Value**      |
| ----------- | -------------- |
| `mode`      | `presentation` |

> **Note:** For 1-to-1 rooms, use `grid` mode instead. VP8 Simulcast is critical for the participant publishing the presentation.

![Apps in presentation mode prioritize screen-share quality, with optional lower-priority webcams for the presenter or others.](https://docs-resources.prod.twilio.com/4fd28fa55f00af4f51f692f2b9bce22f0bdc886575cce7fb7b93bcaed4337f0d.png)

#### Code samples for `presentation` mode

**JavaScript (Desktop/Mobile Browser)**

```js
Twilio.Video.connect('$TOKEN', {
  name: 'my-room-name'
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 }, // Use 480/640 for mobile
  bandwidthProfile: {
    video: {
      mode: 'presentation',
      // maxSubscriptionBitrate: 2500000  // Uncomment for mobile
    }
  },
  preferredVideoCodecs: "auto",
  networkQuality: {local:1, remote: 1}
});
```

**Android SDK**

```java
VideoConstraints videoConstraints =
            new VideoConstraints.Builder()
                    .maxFps(24)
                    .maxVideoDimensions(VideoDimensions.VGA_VIDEO_DIMENSIONS)
                    .build();

LocalVideoTrack localVideoTrack = LocalVideoTrack.create(context, true, videoCapturer, videoConstraints);

NetworkQualityConfiguration configuration =
            new NetworkQualityConfiguration(
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL,
                        NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL);

VideoBandwidthProfileOptions videoBandwidthProfileOptions = new VideoBandwidthProfileOptions.Builder()
        .mode(BandwidthProfileMode.PRESENTATION)
        .build();
BandwidthProfileOptions bandwidthProfileOptions = new BandwidthProfileOptions(videoBandwidthProfileOptions);

ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
            .enableNetworkQuality(true)
            .networkQualityConfiguration(configuration)
            .videoTracks(Collections.singletonList(localVideoTrack)
            .bandwidthProfile(bandwidthProfileOptions)
            .preferVideoCodecs(Collections.singletonList(new Vp8Codec(true))) // Enable simulcast
            .build();
```

**iOS SDK**

```swift
let format = VideoFormat()
format.dimensions = CMVideoDimensions(width:640, height: 480)
format.frameRate = 24

camera.startCapture(device: device, format: format, completion: { (captureDevice, videoFormat, error) in
    // Any code needed to run after capture starts
});

localVideoTrack = LocalVideoTrack(source: camera, enabled: true, name: "Camera")

let connectOptions = ConnectOptions(token: accessToken) { builder in
    if let localVideoTrack = localVideoTrack {
        builder.videoTracks = [localVideoTrack]
    }
    builder.isNetworkQualityEnabled = true
    builder.networkQualityConfiguration =
        NetworkQualityConfiguration(localVerbosity: .minimal, remoteVerbosity: .minimal)
    builder.encodingParameters = EncodingParameters(videoBitrate:0)
    let videoBandwidthProfileOptions = VideoBandwidthProfileOptions { builder in
        builder.mode = .presentation
    }
    builder.bandwidthProfileOptions = BandwidthProfileOptions(videoOptions: videoBandwidthProfileOptions)
    builder.preferredVideoCodecs = [TVIVp8Codec(simulcast: true)]
}
```
