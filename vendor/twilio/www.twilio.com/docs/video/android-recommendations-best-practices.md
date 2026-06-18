# Android Video Application Recommendations and Best Practices

This guide provides recommendations and best practices for building an Android video app using the [Twilio Programmable Video Android SDK](/docs/video/android).

## Helpful links

* [Android Video Collaboration App](https://github.com/twilio/twilio-video-app-android)
* [Android Video Quickstart](https://github.com/twilio/video-quickstart-android)
* [Android Getting Started guide](/docs/video/android-getting-started)
* [Android Video SDK API Reference](https://sdk.twilio.com/android/video/latest/docs/index.html)
* [Guide for Developing High Quality Video Applications](/docs/video/tutorials/developing-high-quality-video-applications)
* [Error and Warning Dictionary](/docs/api/errors)

## Choose Video Settings

To choose the right [ConnectOptions](https://sdk.twilio.com/android/video/latest/docs/com/twilio/video/ConnectOptions.html) when initializing the video call for your use case, see the [Developing High Quality Video Applications guide](/docs/video/tutorials/developing-high-quality-video-applications).

## Manage audio focus

On Android, multiple applications can stream audio at the same time. Your app must manage audio focus to make sure it behaves correctly when other apps play audio. Without proper audio focus handling, your app might stream audio during an incoming phone call or lose audio when placed in the background.

For more details on how audio focus works across Android versions, see the [Android audio focus documentation](https://developer.android.com/guide/topics/media-apps/audio-focus).

> \[!NOTE]
>
> The `AudioFocusRequest` API used in this section requires Android API level 26 (Android 8.0) or later. The Video Android SDK supports API level 25 and higher.

### Request audio focus

Request audio focus before connecting to a Room. Use `AudioAttributes.CONTENT_TYPE_SPEECH` so the system knows your app is handling voice communication. This also prevents automatic ducking on Android 12 and later, which would otherwise lower your app's audio volume when another app requests transient focus.

```java
private AudioManager audioManager;
private AudioFocusRequest audioFocusRequest;

private void requestAudioFocus() {
    audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

    AudioAttributes audioAttributes = new AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
        .build();

    audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
        .setAudioAttributes(audioAttributes)
        .setOnAudioFocusChangeListener(focusChangeListener)
        .build();

    int result = audioManager.requestAudioFocus(audioFocusRequest);
    if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
        // Connect to the Room
    }
}
```

### Handle audio focus changes

When another app requests audio focus, your app receives a callback through the `OnAudioFocusChangeListener`. Handle each focus change to provide the best user experience.

```java
private AudioManager.OnAudioFocusChangeListener focusChangeListener =
    new AudioManager.OnAudioFocusChangeListener() {
        @Override
        public void onAudioFocusChange(int focusChange) {
            switch (focusChange) {
                case AudioManager.AUDIOFOCUS_GAIN:
                    // Regained focus. Resume audio if it was paused.
                    break;
                case AudioManager.AUDIOFOCUS_LOSS:
                    // Permanent loss. Another app has taken focus.
                    // Consider disconnecting from the Room or notifying the user.
                    break;
                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT:
                    // Temporary loss, such as an incoming phone call.
                    // Consider muting the microphone track.
                    break;
                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK:
                    // Another app requested focus but your app can continue
                    // at a lower volume. For voice communication, you may
                    // want to mute instead of ducking.
                    break;
            }
        }
    };
```

### Abandon audio focus

When the user disconnects from the Room, abandon audio focus so other apps can resume normal audio playback.

```java
private void abandonAudioFocus() {
    if (audioManager != null && audioFocusRequest != null) {
        audioManager.abandonAudioFocusRequest(audioFocusRequest);
    }
}
```

## Handle media changes

### Mute and unmute the microphone

When the local participant mutes the microphone, unpublish the microphone track instead of [disabling it](https://sdk.twilio.com/android/video/latest/docs/com/twilio/video/LocalAudioTrack.html). When the microphone track is only disabled, the system still shows the microphone indicator, which can confuse users.

```java
private Room room; // Set when connected to a video room
private LocalAudioTrack micTrack;

private void setMicEnabled(boolean enabled) {
    LocalParticipant localParticipant = room.getLocalParticipant();
    if (localParticipant == null) {
        return;
    }

    if (enabled) {
        micTrack = LocalAudioTrack.create(this, true, "mic");
        if (micTrack != null) {
            localParticipant.publishTrack(micTrack);
        }
    } else {
        if (micTrack != null) {
            localParticipant.unpublishTrack(micTrack);
            micTrack.release();
            micTrack = null;
        }
    }
}
```

To review a similar implementation working in an app, see the [reference Android video collaboration app](https://github.com/twilio/twilio-video-app-android).

### Turn the camera on and off

When the local participant turns off the camera, unpublish the camera track instead of [disabling it](https://sdk.twilio.com/android/video/latest/docs/com/twilio/video/LocalVideoTrack.html). Unpublishing the camera track minimizes resources consumed and there is no impact to the user experience.

```java
private Room room; // Set when connected to a video room
private Camera2Capturer cameraCapturer;
private LocalVideoTrack cameraTrack;

private void setCameraEnabled(boolean enabled) {
    LocalParticipant localParticipant = room.getLocalParticipant();
    if (localParticipant == null) {
        return;
    }

    if (enabled) {
        Camera2Enumerator enumerator = new Camera2Enumerator(this);
        String frontCameraId = null;
        for (String cameraId : enumerator.getDeviceNames()) {
            if (enumerator.isFrontFacing(cameraId)) {
                frontCameraId = cameraId;
                break;
            }
        }

        if (frontCameraId != null) {
            cameraCapturer = new Camera2Capturer(this, frontCameraId);
            cameraTrack = LocalVideoTrack.create(this, true, cameraCapturer, "camera");
            if (cameraTrack != null) {
                localParticipant.publishTrack(cameraTrack);
            }
        }
    } else {
        if (cameraTrack != null) {
            localParticipant.unpublishTrack(cameraTrack);
            cameraTrack.release();
            cameraTrack = null;
        }
        if (cameraCapturer != null) {
            cameraCapturer.dispose();
            cameraCapturer = null;
        }
    }
}
```

To review a similar implementation working in an app, see the [reference Android video collaboration app](https://github.com/twilio/twilio-video-app-android).

### Display media status in the user interface

When displaying track status in the user interface, check if the track is subscribed and enabled. Tracks may be disabled instead of unpublished for [some edge cases](#handle-camera-interruptions) or to optimize the experience for users on a platform that isn't using the Android Video SDK.

```java
private boolean isRemoteParticipantMicOn(RemoteParticipant participant) {
    for (RemoteAudioTrackPublication publication : participant.getRemoteAudioTracks()) {
        if ("mic".equals(publication.getTrackName())) {
            return publication.isTrackSubscribed() && publication.isTrackEnabled();
        }
    }
    return false;
}

private boolean isRemoteParticipantCameraOn(RemoteParticipant participant) {
    for (RemoteVideoTrackPublication publication : participant.getRemoteVideoTracks()) {
        if ("camera".equals(publication.getTrackName())) {
            return publication.isTrackSubscribed() && publication.isTrackEnabled();
        }
    }
    return false;
}
```

To review a similar implementation working in an app, see the [reference Android video collaboration app](https://github.com/twilio/twilio-video-app-android).

## Run the app in the background

### Handle camera interruptions

When the app moves to the background, the system can interrupt camera capture. Disable the camera track instead of unpublishing it, since interruptions can be frequent due to things like notifications. When the app returns to the foreground, re-enable the track.

```java
@Override
protected void onStop() {
    super.onStop();
    if (cameraTrack != null) {
        cameraTrack.enable(false);
    }
}

@Override
protected void onStart() {
    super.onStart();
    if (cameraTrack != null) {
        cameraTrack.enable(true);
    }
}
```

### Handle audio interruptions

When another app interrupts audio, such as receiving a phone call, audio recording and playback in the video app can be interrupted. If your app doesn't handle audio focus changes properly, it might continue to stream audio during the phone call, or it could lose audio entirely.

To handle audio interruptions, implement the `OnAudioFocusChangeListener` as described in the [Manage audio focus](#manage-audio-focus) section.

## Handle errors

This section lists some of the important errors raised by the Android Video SDK and provides recommendations on how to handle them to provide the best user experience.

### Connection errors

These errors are raised when the app can't connect to a Room. Use the `Room.Listener` to receive connection errors.

```java
@Override
public void onConnectFailure(Room room, TwilioException twilioException) {
    // Handle error
    Log.e(TAG, "Failed to connect: " + twilioException.getMessage());
}
```

The following table describes the most common connection errors and proposes ways for the application to handle them:

| Error                                     | Code      | **Cause**                                                             | Solution                                                                                                            |
| ----------------------------------------- | --------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [SignalingConnectionError][53000]         | [53000][] | The client can't establish a connection to Twilio's signaling server. | User should make sure to have a stable internet connection.                                                         |
| [SignalingServerBusyError][53006]         | [53006][] | Twilio's signaling server can't accept new clients.                   | User should try joining the Room again after some time.                                                             |
| [RoomMaxParticipantsExceededError][53105] | [53105][] | The Room can't accept additional Participants.                        | Your app should notify the user that the Room is full.                                                              |
| [RoomNotFoundError][53106]                | [53106][] | The client attempted to connect to a Room that doesn't exist.         | If you disable ad-hoc Room creation, your app must create a Room using the REST API before clients attempt to join. |
| [MediaConnectionError][53405]             | [53405][] | The client can't establish a media connection with the Room.          | User requires a stable internet connection and media traffic allowed to and from Twilio.                            |

[53000]: /docs/api/errors/53000

[53006]: /docs/api/errors/53006

[53105]: /docs/api/errors/53105

[53106]: /docs/api/errors/53106

[53405]: /docs/api/errors/53405

### Disconnection errors

When the app disconnects from the Room, this raises errors. To receive disconnect errors, use the `Room.Listener`.

```java
@Override
public void onDisconnected(Room room, TwilioException twilioException) {
    if (twilioException != null) {
        // Handle error
        Log.e(TAG, "Disconnected with error: " + twilioException.getMessage());
    }
}
```

The following table describes the most common disconnection errors and proposes ways for the application to handle them:

| Error                                         | Code      | Cause                                                                                                                                          | Solution                                                                                             |
| --------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [SignalingConnectionDisconnectedError][53001] | [53001][] | The client failed to reconnect to Twilio's signaling server after a network disruption or handoff.                                             | User needs a stable internet connection.                                                             |
| [SignalingConnectionTimeoutError][53002]      | [53002][] | The liveliness checks for the connection to Twilio's signaling server failed or the current session expired.                                   | User should rejoin the Room                                                                          |
| [ParticipantDuplicateIdentityError][53205]    | [53205][] | Another client with the same identity joined the Room.                                                                                         | Your app needs each client to create an AccessToken with a unique identity string.                   |
| [MediaConnectionError][53405]                 | [53405][] | The client failed to re-establish its media connection with the Room after a network disruption or handoff.                                    | User needs a stable internet connection and a firewall that allows media traffic to and from Twilio. |
| [RoomNotFoundError][53106]                    | [53106][] | After a network disruption or handoff, the client tried to reconnect to Twilio's signaling server but the Room ended during the disconnection. | Your app should notify the user that the Room has ended.                                             |

[53001]: /docs/api/errors/53001

[53002]: /docs/api/errors/53002

[53205]: /docs/api/errors/53205

[53405]: /docs/api/errors/53405

[53106]: /docs/api/errors/53106
