# Twilio Video Quickstart for iOS

Build your video application with the Twilio Video iOS SDK.

> \[!NOTE]
>
> Before getting started, we recommend you take a look at the open source [Twilio Video iOS App](https://github.com/twilio/twilio-video-app-ios) and [Twilio Video Quickstart for iOS](https://github.com/twilio/video-quickstart-ios).
>
> Use of this software is subject to the [Twilio Terms of Service](https://www.twilio.com/legal/tos). Please review **ACKNOWLEDGEMENTS.md** for licenses of dependent software embedded in the downloaded package.

## Video API overview

The Twilio Video API includes the following resources:

* **`Room`**: The real-time audio, data, video and screen-share session. It's the basic building block for a Programmable Video application.
* **`Participants`**: The client applications that are connected to a Room and sharing audio, data, and video media with one another.
* **`Tracks`**: The audio, data, and video media streams that are shared within a Room.
* **`LocalTracks`**: The audio, data, and video captured from the local client's media sources (for example, microphone and camera).
* **`RemoteTracks`**: The audio, data, and video tracks from other participants connected to the Room.

## Prerequisites

To start using the Video iOS SDK in your apps, you need to perform a few tasks first.

> \[!NOTE]
>
> The iOS SDK supports iOS 12.2 or higher. It's built for arm64 and x86\_64 architectures with Bitcode slices for arm64 devices.
>
> The `TwilioVideo.framework` is built with Xcode 13. The framework can be consumed with previous versions of Xcode. However, re-compiling Bitcode when exporting for Ad Hoc or Enterprise distribution requires the use of Xcode 13.x.

### Step 1: Get the Video iOS SDK

Install the Twilio Video iOS SDK dynamic framework with Swift Package Manager, with CocoaPods, or manually.

#### Swift Package Manager

1. Add the `https://github.com/twilio/twilio-video-ios` repository as a Swift Package.
2. In your Xcode project, go to **Build Settings**.
3. Search for **Other Linker Flags** and add `-ObjC`.

#### CocoaPods

1. Add the following lines to your `podfile`:

   ```rb
   source 'https://github.com/CocoaPods/Specs'

   platform :ios, '12.2'

   target 'TARGET_NAME' do
       pod 'TwilioVideo', '~> 5'
   end
   ```
2. Run `pod install` to install the dependencies to your project.

#### Manual

The `TwilioVideo.xcframework` is distributed as a dynamic iOS framework that you can drag and drop into your existing projects.

You can browse all [Twilio Video iOS releases](https://github.com/twilio/twilio-video-ios/releases) or download [the latest Video dynamic framework](https://github.com/twilio/twilio-video-ios/releases/download/5.11.2/TwilioVideo.xcframework.zip) directly.

Once you've downloaded and unpacked the XCFramework, do the following:

1. Navigate to your Xcode project's **General** settings page.
2. Drag and drop `TwilioVideo.xcframework` onto the **Frameworks, Libraries, and Embedded Content** section.
3. Make sure that **Copy items if needed** is checked and click **Finish**. Make sure that **Embed & Sign** is checked.
4. Go to the **Build Settings** tab.
5. Search for **Other Linker Flags** and add `-ObjC`.

### Step 2: Get an API key

API keys represent credentials to access the Twilio API. You use them to:

* [Authenticate to the REST API](/docs/usage/requests-to-twilio).
* Create and revoke [Access Tokens](/docs/iam/access-tokens).

Learn more about [API keys](/docs/iam/api-keys).

### Step 3: Generate an Access Token

To execute the code samples below, you'll need to generate an Access Token. An Access Token is a short-lived credential used to authenticate your client-side application to Twilio.

You can generate an Access Token using either the [Twilio CLI](/docs/video/tutorials/user-identity-access-tokens#generate-cli) or a [Twilio server-side SDK](/docs/video/tutorials/user-identity-access-tokens#generate-helper-lib).

For application testing purposes, the Twilio CLI provides a quick way to generate Access Tokens that you can then copy and paste it into your application. In a production application, you should use the Twilio server-side SDKs because your back-end server will need to generate an Access Token for every user in your application.

To use the CLI, you will need to install the Twilio CLI and log in to your Twilio account from the command line. For instructions, see the [CLI quickstart](/docs/twilio-cli/quickstart). Then, you can install the [Token CLI plugin](https://github.com/twilio-labs/plugin-token) with the following command:

```bash
twilio plugins:install @twilio-labs/plugin-token
```

To generate an Access Token, run the following command. `--identity` is a required argument and should be a string that represents the user identity for this Access Token.

```bash
twilio token:video --identity=<identity>
```

You can find examples of how to generate an Access Token for a participant using Twilio server-side SDKs in [User Identity and Access Token](/docs/video/tutorials/user-identity-access-tokens#examples).

## Connect to a Room

You can call `TwilioVideo.connect()` to connect to a Room from your iOS application. Once connected, you can send and receive audio and video streams with other Participants who are connected to the Room.

```swift
@IBAction func createARoom(sender: AnyObject) {
    let connectOptions = ConnectOptions(token: accessToken) { (builder) in
        builder.roomName = "my-room"
    }
    room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
}

// MARK: RoomDelegate

func roomDidConnect(room: Room) {
    print("Did connect to Room")

    if let localParticipant = room.localParticipant {
        print("Local identity \(localParticipant.identity)")

        // Set the delegate of the local particiant to receive callbacks
        localParticipant.delegate = self
    }
}
```

You *must* pass the Access Token when connecting to a Room. You may also optionally pass the following:

* `roomName`: The room name to dynamically specify the name of the Room you want to join. You can also encode the Room name in the Access Token, which will let the user connect to only the Room specified in the token.
* `localAudioTracks`, `localVideoTracks` or `localDataTracks`: The local audio, video, or data tracks to begin sharing your local media with other Participants in the Room upon connecting.
* An ICE transport policy, which allows you to force calls through TURN relay for testing purposes.

The name of the Room specifies which Room you want to join. If you have enabled [client-side Room ("ad-hoc Room") creation](/docs/video/tutorials/understanding-video-rooms#ad-hoc-rooms)  for your account and a Room by that name doesn't already exist, it will be created upon connection. If a Room by that name is already active, you'll be connected to the Room and receive notifications from any other Participants also connected to the same Room. Room names must be unique within an Account.

> \[!NOTE]
>
> If you have enabled client-side Room creation, any new Room you create via the iOS SDK will follow the default Room settings that you've specified in your account. These settings include options like a `StatusCallback` URL where you can receive Room creation and other webhook events, the maximum number of Participants, automatic recording, and more. You can view and update your default Room settings in the [Twilio Console](https://www.twilio.com/console/video/configure).

You can also create a Room using the Rooms REST API. Look at the [REST API Rooms resource](/docs/video/api/rooms-resource#create-room) docs for more details.

## Join a Room

To join an existing Room, pass the Room name to the `connect` method, just as you would when creating a Room.

Once in a Room, you'll receive a `room:participantDidConnect:` callback for each Participant that successfully joins. Querying the `remoteParticipants` getter will return any existing Participants who have already joined the Room.

```swift
@IBAction func joinRoom(sender: AnyObject) {
    let connectOptions = ConnectOptions(token: accessToken) { (builder) in
        builder.roomName = "existing-room"
    })
    room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
}

// MARK: RoomDelegate

func roomDidConnect(room: Room) {
    print("Did connect to room")

    if let localParticipant = room.localParticipant {
        print("Local identity \(localParticipant.identity)")

        // Set the delegate of the local particiant to receive callbacks
        localParticipant.delegate = self
    }
}
```

## Set up local media

You can capture local media from your device's microphone, camera or screen-share on different platforms in the following ways:

* Begin capturing audio data by creating a `TVILocalAudioTrack`.
* Begin capturing video by creating a `TVILocalVideoTrack` with an associated `TVIVideoCapturer`. The Video iOS SDK provides customizable video capturers for both camera and screen sharing.

```swift
// Create an audio track
var localAudioTrack = LocalAudioTrack()

// Create a data track
var localDataTrack = LocalDataTrack()

// Create a CameraSource to provide content for the video track
var localVideoTrack : LocalVideoTrack?

// Create a video track with the capturer.
if let camera = CameraSource(delegate: self) {
    localVideoTrack = LocalVideoTrack(source: camera)
}
```

## Specify tracks at connect time

When the client joins a Room, the client can specify which tracks they want to share with other Participants. The following code is how we share the audio and video track we created earlier:

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    builder.roomName = "my-room"

    if let audioTrack = localAudioTrack {
        builder.audioTracks = [ audioTrack ]
    }
    if let dataTrack = localDataTrack {
        builder.dataTracks = [ dataTrack ]
    }
    if let videoTrack = localVideoTrack {
        builder.videoTracks = [ videoTrack ]
    }
}

var room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

## Connect as a publish-only Participant

For some use cases, such as a [ReplayKit broadcast extension](https://github.com/twilio/video-quickstart-ios/tree/master/ReplayKitExample), you may want to connect as a publish-only Participant that's not subscribed to any tracks. You can disable automatic subscription behavior via `connectOptions`.

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    builder.isAutomaticSubscriptionEnabled = false
    builder.roomName = "my-room"

    if let audioTrack = localAudioTrack {
        builder.audioTracks = [ audioTrack ]
    }
}

var room = TwilioVideo.connect(options: connectOptions, delegate: self)
```

## Working with remote Participants

### Handle connected Participants

When you join a Room, Participants may already be present. You can check for existing Participants in the `roomDidConnect:` callback by using the `remoteParticipants` getter. To receive `RemoteParticipantDelegate` callbacks you will need to set the `RemoteParticipant.delegate` property for each connected remote Participant.

```swift
room = TwilioVideo.connect(options: connectOptions, delegate: self)

// MARK: RoomDelegate

func roomDidConnect(room: Room) {
    // The Local Participant
    if let localParticipant = room.localParticipant {
        print("Local identity \(localParticipant.identity)")

        // Set the delegate of the local participant to receive callbacks
        localParticipant.delegate = self
    }

    // Connected participants already in the room
    print("Number of connected Participants \(room.remoteParticipants.count)")

    // Set the delegate of the remote participants to receive callbacks
    for remoteParticipant in room.remoteParticipants {
      remoteParticipant.delegate = self
    }
}

func participantDidConnect(room: Room, participant: RemoteParticipant) {
    print ("Participant \(participant.identity) has joined Room \(room.name)")

    // Set the delegate of the remote participant to receive callbacks
    participant.delegate = self
}

func participantDidDisconnect(room: Room, participant: RemoteParticipant) {
    print ("Participant \(participant.identity) has left Room \(room.name)")
}
```

### Handle Participant connection events

When Participants connect or disconnect from a Room that you're connected to, you'll be notified via an event listener.
Similar to Room events, Twilio will send [Participant events](/docs/video/api/status-callbacks#rooms-callback-events) if the `StatusCallback` webhook URL is set when the Room is created. These events help your application keep track of the participants who join or leave a Room.

```swift
// MARK: RoomDelegate

// First, we set a Participant Delegate when a Participant first connects:
func participantDidConnect(room: Room, participant: RemoteParticipant) {
    print("Participant connected: \(participant.identity)")
    participant.delegate = self
}
```

### Display a remote Participant's video

To see the video tracks being sent by remote Participants, we need to render them to the screen:

```swift
// MARK: RemoteParticipantDelegate

/*
 * In the Participant Delegate, we can respond when the Participant adds a Video
 * Track by rendering it on screen.
 */
func didSubscribeToVideoTrack(videoTrack: RemoteVideoTrack,
                              publication: RemoteVideoTrackPublication,
                              participant: RemoteParticipant) {

    print("Participant \(participant.identity) added a video track.")

    if let remoteView = VideoView.init(frame: self.view.bounds,
                                       delegate:self) {

        videoTrack.addRenderer(remoteView)
        self.view.addSubview(remoteView)
        self.remoteView = remoteView
    }
}

// MARK: VideoViewDelegate

// Lastly, we can subscribe to important events on the VideoView
func videoViewDimensionsDidChange(view: VideoView, dimensions: CMVideoDimensions) {
    print("The dimensions of the video track changed to: \(dimensions.width)x\(dimensions.height)")
    self.view.setNeedsLayout()
}
```

## Participating in a Room

### Display a camera preview

Sometimes you need to make sure you're looking fantastic before entering a Room. We get it. The iOS SDK provides a means to render a local camera preview outside the context of an active Room:

```swift
// Use CameraSource to produce video from the device's front camera.

if let camera = CameraSource(delegate: self),
    let videoTrack = LocalVideoTrack(source: camera) {

    // VideoView is a VideoRenderer and can be added to any VideoTrack.
    let renderer = VideoView(frame: view.bounds)
}
if let camera = TVICameraCapturer(source: .frontCamera),
    let videoTrack = TVILocalVideoTrack(capturer: camera) {

    // TVIVideoView is a TVIVideoRenderer and can be added to any TVIVideoTrack.
    let renderer = TVIVideoView(frame: view.bounds)

    // Add renderer to the video track
    videoTrack.addRenderer(renderer)

    self.localVideoTrack = videoTrack
    self.camera = camera
    self.view.addSubview(renderer)
} else {
    print("Couldn't create CameraCapturer or LocalVideoTrack")
}
```

### Disconnect from a Room

You can disconnect from a Room you're currently participating in. Other Participants will receive a `participantDisconnected` event.

```swift
// To disconnect from a Room, we call:
room?.disconnect()

// This results in a callback to RoomDelegate#roomDidDisconnect(room: Room, error: Error?)

// MARK: RoomDelegate

func roomDidDisconnect(room: Room, error: Error?) {
    print("Disconnected from room \(room.name)")
}
```

### Room reconnection

The Video SDK will raise notifications when a Room is reconnecting due to a network disruption. A Room reconnection is triggered due to a signaling or media reconnection event.

```swift
// MARK: RoomDelegate

// Error will be either TwilioVideoSDK.Error.signalingConnectionError or TwilioVideoSDK.Error.mediaConnectionError
func roomIsReconnecting(room: Room, error: Error) {
    print("Reconnecting to room \(room.name), error = \(String(describing: error))")
}

func roomDidReconnect(room: Room) {
    print("Reconnected to room \(room.name)")
}
```

## Background modes

To keep a Room connection running in the background, select the **Audio, AirPlay, and Picture in Picture** mode from the **Capabilities** project settings page in Xcode.

![Background modes with Audio, AirPlay, and in selected.](https://docs-resources.prod.twilio.com/35a17f14f456b96088d95649b1d1b65bd02433f3d6916848abeeeb16eb252758.png)

## User permissions

Twilio Video requires user permission for features like sharing video from the camera or audio from the microphone. Consider how your applications might function with reduced functionality in case some permissions (for example, the camera) are declined.

| Friendly name | Privacy usage description key    | iOS version | Recommendation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camera        | `NSCameraUsageDescription`       | All         | Request permissions using [AVCaptureDevice.requestAccess(for:completionHandler:)](https://developer.apple.com/documentation/avfoundation/avcapturedevice/1624584-requestaccess) before calling [TwilioVideoSDK.connect(options:delegate:)](https://twilio.github.io/twilio-video-ios/docs/latest_5.x/Classes/TwilioVideoSDK.html#//api/name/connectWithOptions:delegate:) with a `TVICameraSource`.                                                                                                                                                                                                                                                                             |
| Microphone    | `NSMicrophoneUsageDescription`   | All         | Request permissions using [AVAudioSession.requestRecordPermission()](https://developer.apple.com/documentation/avfoundation/avaudiosession/1616601-requestrecordpermission) before calling [TwilioVideoSDK.connect(options:delegate:)](https://twilio.github.io/twilio-video-ios/docs/latest_5.x/Classes/TwilioVideoSDK.html#//api/name/connectWithOptions:delegate:) when Participants publish or subscribe to audio tracks with `TVIDefaultAudioDevice`. <br />Custom audio devices do not require microphone permissions for playback only use cases. See [video-quickstart-ios/issues/207](https://github.com/twilio/video-quickstart-ios/issues/207) for more information. |
| Local network | `NSLocalNetworkUsageDescription` | 14.0+       | This permission isn't recommended unless your app is already using [NWConnection](https://developer.apple.com/documentation/network/nwconnection) APIs on the local network.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Reconnections and the UIApplication lifecycle

When an application is put into the background, both the signaling and media connections close, which triggers the reconnecting delegate method. This occurs when connected to a Room with no shared audio tracks.

## Server-side control

The Twilio Video API allows you to control your video applications from your backend server via HTTP requests.

Learn more about the [Video API](/docs/video/api).

## Enable debug logging

To enable debug level logging, add the following code in your application:

```swift
TwilioVideoSDK.setLogLevel(.debug)
```

## Getting help

Providing debugging information helps us diagnose and respond quickly. When submitting issues or support tickets, include the following information:

* **Description**: Describe the issue.
* **Steps to reproduce**: List the steps required to reproduce the issue.
* **Code**: Include relevant code snippets that would help in reproduction and troubleshooting of the issue.
* **Expected behavior**: Describe what you expected to happen.
* **Actual behavior**: Describe what actually happened.
* **Reproduction frequency**: Indicate how often the isssue occurs in percentage (for example, 50% of the time).
* **Logs**: Include any log output generated when the issue occurs.
* **Video iOS SDK version**: Include the version of the Video iOS SDK where this issue occurs.
* **Xcode version**: Include the version of Xcode where this issue occurs.
* **iOS version**: Include the version of iOS where this issue occurs.
* **iOS device**: Include the details of the iOS device where this issue occurs.
* **Room SID**: Include the Room SID. It can be useful for tracing backend issues.

After gathering the required information, you can create a GitHub issue for the [Twilio Video iOS SDK](https://github.com/twilio/twilio-video-ios/issues) or the [Twilio Video iOS Quickstart app](https://github.com/twilio/video-quickstart-ios/issues), or open a support ticket through the [Twilio Help Center Assistant](https://help.twilio.com).
