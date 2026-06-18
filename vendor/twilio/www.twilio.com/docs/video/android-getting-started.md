# Twilio Video Quickstart for Android

Build your video application with the Twilio Video Android SDK.

> \[!NOTE]
>
> Before getting started with this guide, we recommend you take a look at the open source [Twilio Video Android App](https://github.com/twilio/twilio-video-app-android) and [Twilio Video Quickstart for Android](https://github.com/twilio/video-quickstart-android/tree/master).

## Video API overview

The Twilio Video API includes the following resources:

* **`Room`**: The real-time audio, data, video and screen-share session. It's the basic building block for a Programmable Video application.
* **`Participants`**: The client applications that are connected to a Room and sharing audio, data, and video media with one another.
* **`Tracks`**: The audio, data, and video media streams that are shared within a Room.
* **`LocalTracks`**: The audio, data, and video captured from the local client's media sources (for example, microphone and camera).
* **`RemoteTracks`**: The audio, data, and video tracks from other participants connected to the Room.

## Prerequisites

To start using the Video Android SDK in your apps, you need to perform a few tasks first.

> \[!NOTE]
>
> The Video Android SDK supports the following:
>
> * Android API level 25 and higher
> * Architectures: armeabi-v7a, arm64-v8a, x86, x86\_64

### Step 1: Get the Video Android SDK

The Video Android SDK is distributed through [Maven Central](https://central.sonatype.com/artifact/com.twilio/video-android).

#### Gradle

Add the following lines to your `build.gradle` file:

```groovy
allprojects {
    repositories {
        mavenCentral()
    }
}

android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

dependencies {
    // The Video library resides on Maven Central
    implementation 'com.twilio:video-android:7.10.2'
}
```

#### Proguard

Add the following lines to your `proguard-project.txt` file:

```console
-keep class tvi.webrtc.** { *; }
-keep class com.twilio.video.** { *; }
-keepattributes InnerClasses
```

### Step 2: Get an API key

API keys represent credentials to access the Twilio API. You can create API keys from the [Twilio Console](https://console.twilio.com/us1/account/keys-credentials/api-keys?frameUrl=/console/project/api-keys) or with the [REST API](/docs/iam/api-keys/key-resource-v2010). You use them to:

* [Authenticate to the REST API](/docs/usage/requests-to-twilio).
* [Create and revoke Access Tokens](/docs/iam/access-tokens).

Learn more about [API keys](/docs/iam/api-keys).

### Step 3: Generate an Access Token

An Access Token is a short-lived credential used to authenticate your client-side application to Twilio.

You can generate an Access Token using either the [Twilio CLI](/docs/video/tutorials/user-identity-access-tokens#generate-cli) or a [Twilio server-side SDK](/docs/video/tutorials/user-identity-access-tokens#generate-helper-lib).

For application testing purposes, the [Twilio CLI](/docs/video/tutorials/user-identity-access-tokens#generate-cli) provides a quick way to generate Access Tokens that you can then copy and paste into your application. In a production application, you should use a [Twilio server-side SDK](/docs/video/tutorials/user-identity-access-tokens#generate-helper-lib) because your back-end server will need to generate an Access Token for every user in your application.

To use the CLI, you will need to install the [Twilio CLI](/docs/video/tutorials/user-identity-access-tokens#generate-cli) and log in to your Twilio account from the command line; see the [CLI Quickstart](/docs/twilio-cli/quickstart)  for instructions. Then, you can install the [Token CLI plugin](https://github.com/twilio-labs/plugin-token) with the following command:

```bash
twilio plugins:install @twilio-labs/plugin-token
```

To generate an Access Token, run the following command. `--identity` is a required argument and should be a string that represents the user identity for this Access Token.

```bash
twilio token:video --identity=<identity>
```

You can find examples of how to generate an Access Token for a participant using Twilio server-side SDKs in the [User Identity and Access Token guide](/docs/video/tutorials/user-identity-access-tokens#examples).

## Connect to a Room

You can use `Video.connect()` to connect to a Room from your Android application. Once connected, you can send and receive audio and video streams with other Participants who are connected to the Room.

```java
private Room.Listener roomListener() {
  return new Room.Listener() {
      @Override
      public void onConnected(Room room) {
        Log.d(TAG,"Connected to " + room.getName());
      }
  }
}

public void connectToRoom(String roomName) {
  ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName(roomName)
    .audioTracks(localAudioTracks)
    .videoTracks(localVideoTracks)
    .dataTracks(localDataTracks)
    .build();
  room = Video.connect(context, connectOptions, roomListener);
}
```

You *must* pass the Access Token when connecting to a Room. You may also optionally pass the following:

* `roomName`: The room name to dynamically specify the name of the Room you want to join. You can also encode the Room name in the Access Token, which will allow the user to connect to only the Room specified in the token.
* `localAudioTracks`, `localVideoTracks` or `localDataTracks`: The local audio, video, or data tracks to begin sharing your local media with other Participants in the Room upon connecting.

The name of the Room specifies which Room you want to join. If you have enabled [client-side Room ("ad-hoc Room") creation](/docs/video/tutorials/understanding-video-rooms#ad-hoc-rooms)  for your account and a Room by that name doesn't already exist, it will be created upon connection. If a Room by that name is already active, you'll be connected to the Room and receive notifications from any other Participants also connected to the same Room. Room names must be unique within an Account.

> \[!NOTE]
>
> If you have enabled client-side Room creation, any new Room you create via the Android SDK will follow the default Room settings that you've specified in your account. These settings include options like a `StatusCallback` URL where you can receive Room creation and other webhook events, the maximum number of Participants, automatic recording, and more. You can view and update your default Room settings in the [Twilio Console](https://www.twilio.com/console/video/configure).

You can also create a Room using the [Rooms resource](/docs/video/api/rooms-resource).

## Join a Room

To join an existing Room, pass the Room name to the `connect` method, just as you would when creating a Room.

Once in a Room, you'll receive a `participantConnected` event for each Participant that successfully joins. Querying the `participants` getter will return any existing Participants who have already joined the Room.

```java
private Room.Listener roomListener() {
  return new Room.Listener() {
    @Override
    public void onConnected(Room room) {
      Log.d(TAG,"Connected to " + room.getName());
    }
  }
}

public void connectToRoom(String roomName) {
  ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName(roomName)
    .audioTracks(localAudioTracks)
    .videoTracks(localVideoTracks)
    .dataTracks(localDataTracks)
    .build();
  room = Video.connect(context, connectOptions, roomListener);
}
```

## Set up local media

You can capture local media from your device's microphone, camera or screen-share on different platforms in your Android application in the following ways:

* Begin capturing audio data by creating a `LocalAudioTrack`.
* Begin capturing video by adding a `LocalVideoTrack` with an associated `VideoCapturer`. The Video Android SDK provides customizable video capturers for both camera and screen sharing.

```java
// Create an audio track
boolean enable = true;
LocalAudioTrack localAudioTrack = LocalAudioTrack.create(context, enable);

// A video track requires an implementation of a VideoCapturer. Here's how to use the front camera with a Camera2Capturer.
Camera2Enumerator camera2Enumerator = new Camera2Enumerator(context);
String frontCameraId = null;
for (String cameraId : camera2Enumerator.getDeviceNames()) {
    if (camera2Enumerator.isFrontFacing(cameraId)) {
        frontCameraId = cameraId;
        break;
    }
}
if(frontCameraId != null) {
    // Create the CameraCapturer with the front camera
    CameraCapturer cameraCapturer = new Camera2Capturer(context, frontCameraId);

    // Create a video track
    LocalVideoTrack localVideoTrack = LocalVideoTrack.create(context, enable, cameraCapturer);

    // Rendering a local video track requires an implementation of VideoSink
    // Let's assume you have added a VideoView in our view hierarchy
    VideoView videoView = (VideoView) findViewById(R.id.video_view);

    // Render a local video track to preview your camera
    localVideoTrack.addSink(videoView);

    // Release the audio track to free native memory resources
    localAudioTrack.release();

    // Release the video track to free native memory resources
    localVideoTrack.release();
}
```

## Connect as a publish-only Participant

For some use cases, you may want to connect as a publish-only Participant that's not subscribed to any Tracks. You can disable automatic subscription behavior via `ConnectOptions` by setting `enableAutomaticSubscription` to `false`.

```java
public void connectToRoom(String roomName) {
  ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName("my-room")
    .enableAutomaticSubscription(false)
    .build();
  room = Video.connect(context, connectOptions, roomListener);
}
```

## Working with remote Participants

### Handle connected Participants

When you join a Room, Participants may already be present. You can check for existing Participants in the `connected` event callback by using the `participants` getter.

```java
// Connect to room
Room room = Video.connect(context, connectOptions, new Room.Listener() {
    @Override
    public void onConnected(Room room) {}

    @Override
    public void onConnectFailure(Room room, TwilioException e) {}

    @Override
    public void onDisconnected(Room room, TwilioException e) {}

    @Override
    public void onRecordingStarted(Room room) {}

    @Override
    public void onRecordingStopped(Room room) {}

    @Override
    public void onParticipantConnected(Room room, RemoteParticipant participant) {
        Log.i("Room.Listener", participant.getIdentity() + " has joined the room.");
    }

    @Override
    public void onParticipantDisconnected(Room room, RemoteParticipant participant) {
        Log.i("Room.Listener", participant.getIdentity() + " has left the room.");
    }
);

// ... Assume we have received the connected callback

// After receiving the connected callback the LocalParticipant becomes available
LocalParticipant localParticipant = room.getLocalParticipant();
Log.i("LocalParticipant ", localParticipant.getIdentity());

// Get the first participant from the room
RemoteParticipant participant = room.getRemoteParticipants().get(0);
Log.i("HandleParticipants", participant.getIdentity() + " is in the room.");

```

### Handle Participant connection events

When Participants connect or disconnect from a Room that you're connected to, you'll be notified via an event listener. Similar to Room Events, Twilio will fire [Participant events](/docs/video/api/status-callbacks#rooms-callback-events) if the `StatusCallback` webhook URL is set when the Room is created. These events help your application keep track of the participants who join or leave a Room.

```java
private Room.Listener roomListener() {
  return new Room.Listener() {

    @Override
    public void onParticipantConnected(Room room, RemoteParticipant participant) {
      Log.v(TAG, "Participant connected: " + participant.getIdentity());
    }

    @Override
    public void onParticipantDisconnected(Room room, RemoteParticipant participant) {
      Log.v(TAG, "Participant disconnected: " + participant.getIdentity());
    }
  };
}
```

### Display a remote Participant's video

To see the video tracks being sent by remote Participants, you need to render them to the screen:

```java
// First, set a Media Listener when a Participant first connects:
private Room.Listener roomListener() {
  return new Room.Listener() {
    @Override
    public void onParticipantConnected(Room room, RemoteParticipant participant) {
      participant.setListener(remoteParticipantListener());
    }
  };
}

/* In the Participant listener, we can respond when the Participant adds a Video
Track by rendering it on screen: */
private RemoteParticipant.Listener remoteParticipantListener() {
  return new RemoteParticipant.Listener() {
      @Override
      public void onVideoTrackSubscribed(RemoteParticipant participant,
                                         RemoteVideoTrackPublication remoteVideoTrackPublication,
                                         RemoteVideoTrack remoteVideoTrack) {
        primaryVideoView.setMirror(false);
        remoteVideoTrack.addSink(primaryVideoView);
      }
  };
}
```

## Participating in a Room

### Display a camera preview

Sometimes you need to make sure you're looking fantastic before entering a Room. We get it. Each SDK provides a means to render a local camera preview outside the context of an active Room.

**Note:** See [set up local media](#set-up-local-media) to learn how to initialize a `CameraCapturer`.

```java
/* The CameraCapturer is a default video capturer provided by Twilio which can
   capture video from the front or rear-facing device camera */
private CameraCapturer cameraCapturer;

/* A VideoView receives frames from a local or remote video track and renders them
   to an associated view. */
private VideoView primaryVideoView;

// Start the camera preview
LocalVideoTrack localVideoTrack = LocalVideoTrack.create(context, true, cameraCapturer);
primaryVideoView.setMirror(true);
localVideoTrack.addSink(primaryVideoView);

// Release the local video track to free native memory resources once you are done
localVideoTrack.release();
```

### Disconnect from a Room

You can disconnect from a Room you're currently participating in. Other Participants will receive a `participantDisconnected` event.

```java
// To disconnect from a Room:
room.disconnect();

// This results in a call to Room.Listener#onDisconnected
private Room.Listener roomListener() {
  return new Room.Listener() {
    @Override
    public void onDisconnected(Room room, TwilioException e) {
        Log.d(TAG,"Disconnected from " + room.getName());
    }
  };
}
```

### Room reconnection

The Video SDK will raise notifications when a Room is reconnecting due to a network disruption. A Room reconnection is triggered due to a signaling or media reconnection event.

```java
private Room.Listener roomListener() {
  return new Room.Listener() {

    /*
     * Exception will be either TwilioException.SIGNALING_CONNECTION_DISCONNECTED_EXCEPTION or
     * TwilioException.MEDIA_CONNECTION_ERROR_EXCEPTION
     */
    @Override
    public void onReconnecting(Room room, TwilioException exception) {
      Log.v(TAG, "Reconnecting to room: " + room.getName() + ", exception = " + exception.getMessage());
    }

    @Override
    public void onReconnected(Room room) {
      Log.v(TAG, "Reconnected to room " + room.getName());
    }
  };
}
```

## Server-side control

The Twilio Video API allows you to control your video applications from your back-end server via HTTP requests.

Learn more about the [Video API](/docs/video/api).

## Troubleshooting audio

If you're experiencing echo on Android, attempt the following changes before making a support ticket.

You can also find this information in the [troubleshooting audio section](https://github.com/twilio/video-quickstart-android/#troubleshooting-audio) of the Android Quickstart README.

* [Use software echo cancellation](https://sdk.twilio.com/android/video/releases/7.9.1/docs/com/twilio/video/AudioOptions.html#echoCancellation).

  ```java
  WebRtcAudioUtils.setWebRtcBasedAcousticEchoCanceler(true);
  ```
* [Use hardware noise suppression](https://sdk.twilio.com/android/video/releases/7.9.1/docs/com/twilio/video/AudioOptions.html#noiseSuppression).

  ```java
  WebRtcAudioUtils.setWebRtcBasedNoiseSuppressor(false);
  ```
* [Use hardware automatic gain control](https://sdk.twilio.com/android/video/releases/7.9.1/docs/com/twilio/video/AudioOptions.html#autoGainControl).

  ```java
  WebRtcAudioUtils.setWebRtcBasedAutomaticGainControl(false);
  ```

## Enable debug logging

To enable debug level logging, add the following code in your application:

```java
/*
 * Set the log level of the Video Android SDK
 */
Video.setLogLevel(LogLevel.DEBUG);

/*
 * If your application is experiencing an issue related to a specific
 * module, you can set the log level of each of the following modules.
 */
Video.setModuleLogLevel(LogModule.CORE, LogLevel.DEBUG);
Video.setModuleLogLevel(LogModule.PLATFORM, LogLevel.DEBUG);
Video.setModuleLogLevel(LogModule.SIGNALING, LogLevel.DEBUG);
Video.setModuleLogLevel(LogModule.WEBRTC, LogLevel.DEBUG);
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
* **Video Android SDK version**: Include the version of the Video Android SDK where this issue occurs.
* **Android version**: Include the version of Android where this issue occurs.
* **Android device**: Include the details of the Android device where this issue occurs.
* **Room SID**: Include the Room SID. It can be useful for tracing backend issues.

After gathering the required information, you can [create an issue on GitHub](https://github.com/twilio/video-quickstart-android/issues) or open a support ticket through the [Twilio Help Center Assistant](https://help.twilio.com).
