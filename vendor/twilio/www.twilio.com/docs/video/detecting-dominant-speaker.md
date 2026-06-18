# Detecting the Dominant Speaker

This guide introduces the Dominant Speaker Detection API and provides guidance on how to use it effectively in your Twilio Video applications.

In a multi-party video application, the dominant speaker is the Participant sharing the loudest audio track in the Room. The Dominant Speaker Detection API sends events to your application every time the dominant speaker changes. Developers can use those events to improve the end user's experience by bringing into focus the speakers published video tracks.

## API Usage

The `Room.dominantSpeaker` property ([Android](https://sdk.twilio.com/android/video/releases/7.9.1/docs/com/twilio/video/Room.html#getDominantSpeaker--), ([iOS](https://twilio.github.io/twilio-video-ios/docs/latest/Classes/TVIRoom.html#//api/name/dominantSpeaker), [JavaScript](https://sdk.twilio.com/js/video/releases/2.34.0/docs/Room.html)) represents the RemoteParticipant with the loudest RemoteAudioTrack. Whenever the Dominant Speaker changes, the Room emits a `dominantSpeakerChanged` event.

**Note: `dominantSpeakerChanged` events are emitted in Rooms with two or more Participants.**

### Enabling Dominant Speaker Detection

The Dominant Speaker API is disabled by default, and is requested at connect time. The following table illustrates the currently supported platforms:

| **Twilio Video SDK** | **Dominant Speaker API support** |
| -------------------- | -------------------------------- |
| Android              | Yes (v4.3.0+)                    |
| iOS                  | Yes (v2.8.0+)                    |
| JavaScript           | Yes (v1.14.0+)                   |

#### Android

When building `ConnectOptions`, set the property `enableDominantSpeaker` to `true`.

```java
 ConnectOptions connectOptions =
        new ConnectOptions.Builder(token)
                        .roomName(roomName)
                        .enableDominantSpeaker(true)
                        .build();
Room room = Video.connect(context, connectOptions, roomListener);
```

Implement [Room.Listener#onDominantSpeakerChanged(@NonNull Room room, @Nullable RemoteParticipant remoteParticipant)](https://sdk.twilio.com/android/video/releases/7.9.1/docs/com/twilio/video/Room.Listener.html#onDominantSpeakerChanged-com.twilio.video.Room-com.twilio.video.RemoteParticipant-) in order to respond to speaker events.

```java
@Override
void onDominantSpeakerChanged(
                @NonNull Room room, @Nullable RemoteParticipant remoteParticipant) {
                // Handle dominant speaker change
        }
```

#### iOS

When building `TVIConnectOptions`, set the property `isDominantSpeakerEnabled` to `true`.

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    // Enable Dominant Speaker functionality
    builder.isDominantSpeakerEnabled = true

    if let localAudioTrack = self.localAudioTrack {
        builder.audioTracks = [localAudioTrack]
    }
    builder.roomName = "my-conference-room"
}

room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

Implement [-\[TVIRoomDelegate room:dominantSpeakerDidChange:\]](https://twilio.github.io/twilio-video-ios/docs/latest/Protocols/TVIRoomDelegate.html#//api/name/room:dominantSpeakerDidChange:) in order to respond to speaker events.

```swift
// MARK: TVIRoomDelegate
func dominantSpeakerDidChange(room: Room, participant: RemoteParticipant?) {
    var identity = "N/A"

    if let participant = participant {
        identity = participant.identity
    }

    print("Dominant Speaker Changed: \(identity)")
}
```

#### JavaScript

In the `connect` method, set the property `dominantSpeaker` to `true` to enable the Dominant Speaker API and to start receiving `dominantSpeakerChanged` events.

```javascript
var Video = require('twilio-video');
var token = getAccessToken();

// Connect with custom names for LocalAudioTrack and LocalVideoTrack
Video.connect(token, {
  name: 'my-conference-room'
  audio: { name: 'microphone' },
  video: { name: 'camera' },
  dominantSpeaker: true
}).then(function(room) {
  room.on('dominantSpeakerChanged', participant => {
    console.log('The new dominant speaker in the Room is:', participant);
  });
});
```

## Known Issues

* At present it is not possible to detect when a PSTN participant is the dominant speaker. A PSTN participant is one who dials a Twilio phone number and is connected to a Room using the [Connect](/docs/voice/twiml/connect) TwiML verb
