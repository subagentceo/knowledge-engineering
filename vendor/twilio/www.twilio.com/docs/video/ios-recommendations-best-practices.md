# iOS Video Application Recommendations and Best Practices

This guide provides recommendations and best practices for building an iOS video app using the [Twilio Programmable Video iOS SDK](/docs/video/ios).

## Helpful Links

* [iOS Video Collaboration Application](https://github.com/twilio/twilio-video-app-ios)
* [iOS Video QuickStart app](https://github.com/twilio/video-quickstart-ios)
* [iOS Video Quickstart guide](/docs/video/ios-getting-started)
* [iOS Video SDK GitHub](https://github.com/twilio/twilio-video-ios)
* [iOS Video SDK API Reference](https://twilio.github.io/twilio-video-ios/docs/latest/index.html)
* [Guide for Developing High Quality Video Applications](/docs/video/tutorials/developing-high-quality-video-applications)
* [Error and Warning Dictionary](/docs/api/errors)

## Choose Video Settings

Please take a look at this [Developing High Quality Video Applications guide](/docs/video/tutorials/developing-high-quality-video-applications) to choose the right [ConnectOptions](https://twilio.github.io/twilio-video-ios/docs/latest/Classes/TVIConnectOptions.html) when initializing the video call for your use case.

## Handle Media Changes

### Mute and Unmute the Microphone

When the local participant mutes the microphone, it is recommended to unpublish the microphone track instead of [disabling it](https://twilio.github.io/twilio-video-ios/docs/latest/Classes/TVILocalAudioTrack.html#//api/name/enabled). When the microphone track is only disabled, the [orange indicator in the status bar](https://support.apple.com/en-us/HT211876) is still displayed and this could be confusing for users.

```swift
var room: Room? // Set when connected to a video room
var micTrack: LocalAudioTrack?

var isLocalMicOn = false {
    didSet {
        guard oldValue != isLocalMicOn else {
            return
        }

        if isLocalMicOn {
            guard let micTrack = LocalAudioTrack(options: nil, enabled: true, name: "mic") else {
                return
            }

            self.micTrack = micTrack
            room?.localParticipant?.publishAudioTrack(micTrack)
        } else {
            guard let micTrack = micTrack else {
                return
            }

            room?.localParticipant?.unpublishAudioTrack(micTrack)
            self.micTrack = nil
        }
    }
}
```

See the [reference iOS video collaboration app](https://github.com/twilio/twilio-video-app-ios) for a similar implementation working in an app.

### Turn the Camera On and Off

When the local participant turns off the camera, it is recommended to unpublish the camera track instead of [disabling it](https://twilio.github.io/twilio-video-ios/docs/latest/Classes/TVILocalVideoTrack.html#//api/name/enabled). Unpublishing the camera track will minimize resources consumed and there is no impact to the user experience.

```swift
var room: Room? // Set when connected to a video room
var cameraSource: CameraSource?
var cameraTrack: CameraTrack?

var isLocalCameraOn = false {
    didSet {
        guard oldValue != isLocalCameraOn else {
            return
        }

        if isLocalCameraOn {
            guard
                let cameraSource = CameraSource(delegate: self),
                let cameraTrack = LocalVideoTrack(source: cameraSource, enabled: true, name: "camera")
                let captureDevice = CameraSource.captureDevice(position: .front),
            else {
                return
            }

            cameraSource.startCapture(device: captureDevice, completion: nil)

            room?.localParticipant?.publishVideoTrack(cameraTrack)
            self.cameraSource = cameraSource
            self.cameraTrack = cameraTrack
        } else {
            if let cameraTrack = cameraTrack {
                participant?.unpublishVideoTrack(cameraTrack)
            }

            cameraSource?.stopCapture()
            cameraSource = nil
            cameraTrack = nil
        }
    }
}
```

See the [reference iOS video collaboration app](https://github.com/twilio/twilio-video-app-ios) for a similar implementation working in an app.

### Display Media Status in the User Interface

When displaying track status in the user interface, check if the track is enabled. Tracks may be disabled instead of unpublished for [some edge cases](#handle-camera-interruptions) or to optimize the experience for users on a platform that isn't using the iOS Video SDK.

```swift
extension RemoteParticipant {
    var isMicOn: Bool {
        // Make sure to use the same track name that your app is using to create the microphone track
        guard let track = participant.remoteAudioTracks.first(where: { $0.trackName == "mic" }) else {
            return false
        }

        return track.isTrackSubscribed && track.isTrackEnabled
    }

    var isCameraOn: Bool {
        // Make sure to use the same track name that your app is using to create the camera track
        guard let track = participant.remoteVideoTracks.first(where: { $0.trackName == "camera" }) else {
            return false
        }

        return track.isTrackSubscribed && track.isTrackEnabled
    }
}
```

See the [reference iOS video collaboration app](https://github.com/twilio/twilio-video-app-ios) for a similar implementation working in an app.

## Run the App in the Background

### Handle Camera Interruptions

When the app moves to the background, the system will interrupt camera capture. We recommend that you disable the camera track instead of unpublish it, since interruptions can be frequent due to things like notifications. When the camera interruption ends, enable the track again.

```swift
var cameraTrack: CameraTrack? // Set when camera is turned on

// CameraSourceDelegate
func cameraSourceWasInterrupted(source: CameraSource, reason: AVCaptureSession.InterruptionReason) {
    cameraTrack?.isEnabled = false
}

func cameraSourceInterruptionEnded(source: CameraSource) {
    cameraTrack?.isEnabled = true
}
```

See the [reference iOS video collaboration app](https://github.com/twilio/twilio-video-app-ios) for a similar implementation working in an app.

### Handle Audio Interruptions

When another app interrupts audio (e.g. receiving a phone call in the Phone app), audio recording and playback in the video app will be interrupted. This could suspend your app because it is not playing or recording audio. When the app is suspended the app will be disconnected from the video room.

## Handle Errors

This section lists some of the important errors raised by the iOS Video SDK and provides recommendations on how best to handle them in order to provide the optimal user experience.

### Connection Errors

These errors are raised when the app is not able to connect to a Room. The app can use the `RoomDelegate` to receive connection errors.
Your app should handle errors that may happen when trying to [connect to a Room](/docs/video/ios-getting-started#connect-to-a-room).

```swift
// RoomDelegate function
func roomDidFailToConnect(room: Room, error: Error) {
    // Handle error
}
```

The following table describes the most common connection errors and proposes ways for the application to handle them:

| **Error**                                                  | **Code** | **Cause**                                                                | **Solution**                                                                                                                                                           |
| ---------------------------------------------------------- | -------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SignalingConnectionError](/docs/api/errors/53000)         | 53000    | The client could not establish a connection to Twilio's signaling server | User should make sure to have a stable internet connection                                                                                                             |
| [SignalingServerBusyError](/docs/api/errors/53006)         | 53006    | Twilio's signaling server is too busy to accept new clients              | User should try joining the Room again after some time                                                                                                                 |
| [RoomMaxParticipantsExceededError](/docs/api/errors/53105) | 53105    | The Room cannot allow in any more Participants to join                   | Your app should notify the user that the Room is full                                                                                                                  |
| [RoomNotFoundError](/docs/api/errors/53106)                | 53106    | The client attempted to connect to a Room that does not exist            | If ad-hoc Room creation is disabled, then your app should make sure that the Room is created using the REST API before clients attempt to join                         |
| [MediaConnectionError](/docs/api/errors/53405)             | 53405    | The client failed to establish a media connection with the Room          | 1. User should make sure to have a stable internet connection 2. If the user is behind a firewall, then it should allow media traffic to and from Twilio to go through |

### Disconnection Errors

These errors are raised when the app is inadvertently disconnected from the Room. The app can use the RoomDelegate to receive disconnect errors.

```swift
// RoomDelegate function
func roomDidDisconnect(room: Room, error: Error?) {
    if let error = error {
        // Handle error
    }
}
```

The following table describes the most common disconnection errors and proposes ways for the application to handle them:

| **Error**                                                      | **Code** | **Cause**                                                                                                                                                     | **Solution**                                                                                                                                                                     |
| -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SignalingConnectionDisconnectedError](/docs/api/errors/53001) | 53001    | The client failed to reconnect to Twilio's signaling server after a network disruption or handoff                                                             | User should make sure to have a stable internet connection                                                                                                                       |
| [SignalingConnectionTimeoutError](/docs/api/errors/53002)      | 53002    | The liveliness checks for the connection to Twilio's signaling server failed, or the current session expired                                                  | User should rejoin the Room                                                                                                                                                      |
| [ParticipantDuplicateIdentityError](/docs/api/errors/53205)    | 53205    | Another client joined the Room with the same identity                                                                                                         | Your app should make sure each client creates an AccessToken with a unique identity string                                                                                       |
| [MediaConnectionError](/docs/api/errors/53405)                 | 53405    | The client failed to re-establish its media connection with the Room after a network disruption or handoff                                                    | 1. User should make sure to have a stable internet connection 2. If the user is behind a firewall, then the firewall should allow media traffic to and from Twilio to go through |
| [RoomNotFoundError](/docs/api/errors/53106)                    | 53106    | The client tried to reconnect to Twilio's signaling server after a network disruption or handoff, but room they had joined ended while they were disconnected | Your app should notify user that Room has ended                                                                                                                                  |
