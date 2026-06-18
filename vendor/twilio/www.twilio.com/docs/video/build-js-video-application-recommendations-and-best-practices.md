# Building a JS Video App: Recommendations and Best Practices

## Overview

This guide provides recommendations and best practices for building a Video Application using twilio-video.js.

## Contents

* [Helpful Links](#helpful-links)
* [Browser Support](#browser-support)
* [Choosing Video Settings](#choosing-video-settings)
* [Acquiring Local Media](#acquiring-local-media)
  * [Application Domain](#application-domain)
  * [Autoplay Policy](#autoplay-policy)
  * [Acquiring Camera in Mobile Browsers](#acquiring-camera-in-mobile-browsers)
  * [Testing the Microphone and Camera](#testing-the-microphone-and-camera)
* [Application Backgrounding in Mobile Browsers](#application-backgrounding-in-mobile-browsers)
* [Handling Page Unload](#handling-page-unload)
* [Handling Errors](#handling-errors)
  * [Media Errors](#media-errors)
  * [Connection Errors](#connection-errors)
  * [Disconnection Errors](#disconnection-errors)
* [Handling Warnings](#handling-warnings)
  * [Media Warnings](#media-warnings)

## Helpful Links

* [Video QuickStart](https://github.com/twilio/video-quickstart-js)
* [Video Collaboration Application (React)](https://github.com/twilio/twilio-video-app-react)
* [Guide for Developing High Quality Video Applications](/docs/video/tutorials/developing-high-quality-video-applications)
* [Video SDK Source](https://github.com/twilio/twilio-video.js)
* [Video SDK Docs](https://sdk.twilio.com/js/video/releases/2.34.0/docs/)
* [Common Issues](https://github.com/twilio/twilio-video.js/blob/master/COMMON_ISSUES.md)
* [Known Audio Issues in iOS Safari](https://github.com/twilio/twilio-video.js/issues/941)
* [Error and Warning Dictionary](/docs/api/errors)

## Browser Support

This [table](/docs/video/javascript#supported-browsers) shows the browsers and platforms that `twilio-video.js` supports. To determine if twilio-video.js supports the browser in which your application runs, use the [isSupported](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html) flag.

```js
const { isSupported } = require('twilio-video');
if (isSupported) {
  // Set up your video app.
} else {
  console.error('This browser is not supported by twilio-video.js.');
}
```

## Choosing Video Settings

To choose the right [ConnectOptions](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#ConnectOptions) values for your use case, see this [guide](/docs/video/tutorials/developing-high-quality-video-applications).

## Acquiring Local Media

### Application Domain

twilio-video.js relies on [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to acquire local media. In order for this API to be available, please ensure that your application is running either on **localhost** or an **https** domain.

### Autoplay Policy

The autoplay policy does not allow you to autoplay audio using unmuted `<audio>` or `<video>` elements unless the user has interacted with your application (clicking on a button, for example), especially if your application's media engagement score is not high enough. Please refer to "Working around the browsers' autoplay policy" in the [JavaScript SDK's COMMON\_ISSUES.md](https://github.com/twilio/twilio-video.js/blob/master/COMMON_ISSUES.md#working-around-the-browsers-autoplay-policy) to work around different browsers' autoplay policies.

### Acquiring Camera in Mobile Browsers

In mobile browsers, the camera can be reserved by only one LocalVideoTrack at any given time. If you attempt to create a second LocalVideoTrack, video frames will no longer be supplied to the first LocalVideoTrack. So, we recommend that:

*If you want to display your camera preview*, pre-acquire media using [createLocalTracks](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.createLocalTracks__anchor). You can then pass these LocalTracks to [connect](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.connect__anchor).

```js
const { createLocalTracks, connect } = require('twilio-video');

const tracks = await createLocalTracks();

// Display camera preview.
const localVideoTrack = tracks.find(track => track.kind === 'video');
divContainer.appendChild(localVideoTrack.attach());

// Join the Room with the pre-acquired LocalTracks.
const room = await connect('token', {
  name: 'my-cool-room',
  tracks
});
```

*If you want to switch between the front and back facing cameras*, starting from SDK version [2.34.0](https://github.com/twilio/twilio-video.js/releases/tag/2.34.0), you can [restart](https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalVideoTrack.html#restart__anchor) the existing LocalVideoTrack.

```js
const { createLocalTracks, connect } = require('twilio-video');

const tracks = await createLocalTracks({
  audio: true,
  video: { facingMode: 'user' }
});

// Join the Room with the pre-acquired LocalTracks.
const room = await connect('token', {
  name: 'my-cool-room',
  tracks
});

const cameraTrack = tracks.find(track => track.kind === 'video');

// Switch to the back facing camera.
cameraTrack.restart({ facingMode: 'environment' });
```

In SDK versions 2.6.0 and below, you can stop and unpublish the existing LocalVideoTrack, use [createLocalVideoTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.createLocalVideoTrack__anchor) to create a new LocalVideoTrack and publish it to the Room.

```js
const { createLocalTracks, createLocalVideoTrack, connect } = require('twilio-video');

const tracks = await createLocalTracks({
  audio: true,
  video: { facingMode: 'user' }
});

// Join the Room with the pre-acquired LocalTracks.
const room = await connect('token', {
  name: 'my-cool-room',
  tracks
});

// Capture the back facing camera.
const backFacingTrack = await createLocalVideoTrack({ facingMode: 'environment' });

// Switch to the back facing camera.
const frontFacingTrack = tracks.find(track => track.kind === 'video');
frontFacingTrack.stop();
room.localParticipant.unpublishTrack(frontFacingTrack);
room.localParticipant.publishTrack(backFacingTrack);
```

### Testing the Microphone and Camera

In mobile browsers, [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) is successful even when your microphone and/or camera are reserved by another tab or application. This can result in mobile Participants not being seen and/or heard by others in a Room. In order to work around this, we recommend that your application prompt users to test their microphone and camera before joining a Room. You can use [createLocalAudioTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.createLocalAudioTrack__anchor) to acquire the microphone, and use the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to calculate its level. If the level is 0 even when the user is talking, then most likely the microphone is reserved by either another tab or application. You can then recommend that the user close all the other applications and reload your application, or worst case, restart the browser.

**testmic.js**

```js
const { createLocalAudioTrack } = require('twilio-video');
const pollAudioLevel = require('./pollaudiolevel');

const audioTrack = await createLocalAudioTrack();

// Display the audio level.
pollAudioLevel(audioTrack, level => {
  /* Update audio level indicator. */
});
```

**pollaudiolevel.js**

```js
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = AudioContext ? new AudioContext() : null;

function rootMeanSquare(samples) {
  const sumSq = samples.reduce((sumSq, sample) => sumSq + sample * sample, 0);
  return Math.sqrt(sumSq / samples.length);
}

async function pollAudioLevel(track, onLevelChanged) {
  if (!audioContext) {
    return;
  }

  // Due to browsers' autoplay policy, the AudioContext is only active after
  // the user has interacted with your app, after which the Promise returned
  // here is resolved.
  await audioContext.resume();

  // Create an analyser to access the raw audio samples from the microphone.
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.5;

  // Connect the LocalAudioTrack's media source to the analyser.
  const stream = new MediaStream([track.mediaStreamTrack]);
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  const samples = new Uint8Array(analyser.frequencyBinCount);
  let level = null;

  // Periodically calculate the audio level from the captured samples,
  // and if changed, call the callback with the new audio level.
  requestAnimationFrame(function checkLevel() {
    analyser.getByteFrequencyData(samples);
    const rms = rootMeanSquare(samples);
    const log2Rms = rms && Math.log2(rms);

    // Audio level ranges from 0 (silence) to 10 (loudest).
    const newLevel = Math.ceil(10 * log2Rms / 8);
    if (level !== newLevel) {
      level = newLevel;
      onLevelChanged(level);
    }

    // Continue calculating the level only if the audio track is live.
    if (track.mediaStreamTrack.readyState === 'live') {
      requestAnimationFrame(checkLevel);
    } else {
      requestAnimationFrame(() => onLevelChanged(0));
    }
  });
}

module.exports = pollAudioLevel;
```

You can use [createLocalVideoTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.createLocalVideoTrack__anchor) to acquire the camera, and attach its corresponding `<video>` element to the DOM. If there are no video frames, then most likely the camera is reserved by either another tab or application. Your can then recommend that the user close all the other applications and reload your application, or worst case, restart the browser.

**testcamera.js**

```js
const { createLocalVideoTrack } = require('twilio-video');

const videoTrack = await createLocalVideoTrack();

// Display the video preview.
const divContainer = document.getElementById('local-video');
const videoElement = videoTrack.attach();
divContainer.appendChild(videoElement);
```

**NOTE:** In iOS Safari, because of this [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=179363), calling [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) again will mute previously acquired LocalTracks. So, please make sure that the LocalTracks that you pass in ConnectOptions are neither muted nor stopped.

## Application Backgrounding in Mobile Browsers

When an application that is running on a mobile browser is backgrounded, it will not have access to the video feed from the camera until it is foregrounded. So, we recommend that you stop and unpublish the camera's LocalVideoTrack, and publish a new LocalVideoTrack once your application is foregrounded. On the remote side, you can listen to the [unsubscribed](https://sdk.twilio.com/js/video/releases/2.34.0/docs/RemoteVideoTrackPublication.html#event:unsubscribed) and [subscribed](https://sdk.twilio.com/js/video/releases/2.34.0/docs/RemoteVideoTrackPublication.html#event:subscribed) events on the corresponding RemoteVideoTrackPublication in order to notify the user accordingly. You can use the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to detect backgrounding and foregrounding.

**mobileuser.js**

```js
const { connect, createLocalTracks, createLocalVideoTrack } = require('twilio-video');

const tracks = await createLocalTracks();

let videoTrack = tracks.find(track => track.kind === 'video');

const room = await connect('token1', {
  name: 'my-cool-room',
  tracks
});

if (/* isMobile */) {
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden') {
      // The app has been backgrounded. So, stop and unpublish your LocalVideoTrack.
      videoTrack.stop();
      room.localParticipant.unpublishTrack(videoTrack);
    } else {
      // The app has been foregrounded, So, create and publish a new LocalVideoTrack.
      videoTrack = await createLocalVideoTrack();
      await room.localParticipant.publishTrack(videoTrack);
    }
  });
}
```

**remoteuser.js**

```js
const { connect } = require('twilio-video');

function setupRemoteVideoNotifications(publication) {
  if (publication.isSubscribed) {
    // Indicate to the user that the mobile user has added video.
  }

  publication.on('subscribed', track => {
    // Indicate to the user that the mobile user has added video.
  });

  publication.on('unsubscribed', track => {
    // Indicate to the user that the mobile user has removed video.
  });
}

function setupRemoteVideoNotificationsForParticipant(participant) {
  // Set up remote video notifications for the VideoTracks that are
  // already published.
  participant.videoTracks.forEach(setupRemoteVideoNotifications);

  // Set up remote video notifications for the VideoTracks that will be
  // published later.
  participant.on('trackPublished', setupRemoteVideoNotifications);
}

const room = await connect('token2', { name: 'my-cool-room' });

// Set up remote video notifications for the VideoTracks of RemoteParticipants
// already in the Room.
room.participants.forEach(setupRemoteVideoNotificationsForParticipant);

// Set up remote video notifications for the VideoTracks of RemoteParticipants
// that will join the Room later.
room.on('participantConnected', setupRemoteVideoNotificationsForParticipant);
```

## Handling Page Unload

When the user closes the tab/browser or navigates to another web page, we recommend that you disconnect from the Room so that other Participants are immediately notified.

```js
const { createLocalTracks, connect } = require('twilio-video');

const tracks = await createLocalTracks();

const room = await connect('token', {
  name: 'my-cool-room',
  tracks
});

// Listen to the "beforeunload" event on window to leave the Room
// when the tab/browser is being closed.
window.addEventListener('beforeunload', () => room.disconnect());

// iOS Safari does not emit the "beforeunload" event on window.
// Use "pagehide" instead.
window.addEventListener('pagehide', () => room.disconnect());
```

## Handling Errors

This section lists some of the important errors raised by `twilio-video.js` and provides recommendations on how best to handle them.

### Media Errors

These errors are raised when twilio-video.js fails to acquire the user's local media (camera and/or microphone). Your app can catch these errors as shown below:

```js
const { connect, createLocalAudioTrack, createLocalTracks, createLocalVideoTrack } = require('twilio-video');

function handleMediaError(error) {
  console.error('Failed to acquire media:', error.name, error.message);
}

// Handle media error raised by createLocalAudioTrack.
createLocalAudioTrack().catch(handleMediaError);

// Handle media error raised by createLocalVideoTrack.
createLocalVideoTrack().catch(handleMediaError);

// Handle media error raised by createLocalTracks.
createLocalTracks().catch(handleMediaError);

const mediaErrors = [
  'NotAllowedError',
  'NotFoundError',
  'NotReadableError',
  'OverconstrainedError',
  'TypeError'
];

// Since connect() will acquire media for the application if tracks are not provided in ConnectOptions,
// it can raise media errors.
connect(token, { name: 'my-cool-room' }).catch(error => {
  if (mediaErrors.includes(error.name)) {
    // Handle media error here.
    handleMediaError(error);
  }
});
```

The following table describes the possible media errors and proposes ways for the application to handle them:

| **Name**             | **Message**                                                                                                                                                                                                                                                             | **Cause**                                                                                                                                                                                                                                                | **Solution**                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NotFoundError        | 1. Permission denied by system 2. The object cannot be found here 3. Requested device not found                                                                                                                                                                         | 1. User has disabled the input device for the browser in the system settings 2. User's machine does not have any such input device connected to it                                                                                                       | 1. User should enable the input device for the browser in the system settings 2. User should have at lease one input device connected                                                                      |
| NotAllowedError      | 1. Permission denied 2. Permission dismissed 3. The request is not allowed by the user agent or the platform in the current context 4. The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission | 1. User has denied permission for your app to access the input device, either by clicking the "deny" button on the permission dialog, or by going to the browser settings 2. User has denied permission for your app by dismissing the permission dialog | 1. User should allow your app to access the input device in the browser settings and then reload 2. User should reload your app and grant permission to access the input device                            |
| TypeError            | 1. Cannot read property 'getUserMedia' of undefined 2. navigator.mediaDevices is undefined                                                                                                                                                                              | Your app is being served from a non-localhost non-secure context                                                                                                                                                                                         | Your app should be served from a secure context (localhost or https)                                                                                                                                       |
| NotReadableError     | 1. Failed starting capture of an audio track 2. Failed starting capture of a video track 3. Could not start audio source 4. Could not start video source 5. The I/O read operation failed                                                                               | The browser could not start media capture with the input device even after the user gave permission, probably because another app or tab has reserved the input device                                                                                   | User should close all other apps and tabs that have reserved the input device and reload your app, or worst case, restart the browser                                                                      |
| OverconstrainedError | N/A                                                                                                                                                                                                                                                                     | The input device could not satisfy the requested media constraints                                                                                                                                                                                       | If this exception was raised due to your app requesting a specific device ID, then most likely the input device is no longer connected to the machine, so your app should request the default input device |

**NOTE:** Each error can log a different message depending on the browser and OS. This table lists all possible messages associated with each error.

### Connection Errors

These errors are raised by twilio-video.js when it fails to join a Room. Your app can catch these errors as shown below:

```js
const { connect } = require('twilio-video');

connect(token, { name: 'my-cool-room' }).catch(error => {
  if ('code' in error) {
    // Handle connection error here.
    console.error('Failed to join Room:', error.code, error.message);
  }
});
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

These errors are raised by twilio-video.js when it is inadvertently disconnected from the Room. Your app can catch these errors as shown below:

```js
const { connect } = require('twilio-video');

connect(token, { name: 'my-cool-room' }).then(room => {
  room.once('disconnected', (room, error) => {
    if (error) {
      console.log('You were disconnected from the Room:', error.code, error.message);
    }
  });
});
```

The following table describes the most common disconnection errors and proposes ways for the application to handle them:

| **Error**                                                      | **Code** | **Cause**                                                                                                    | **Solution**                                                                                                                                                           |
| -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SignalingConnectionDisconnectedError](/docs/api/errors/53001) | 53001    | The client failed to reconnect to Twilio's signaling server after a network disruption or handoff            | User should make sure to have a stable internet connection                                                                                                             |
| [SignalingConnectionTimeoutError](/docs/api/errors/53002)      | 53002    | The liveliness checks for the connection to Twilio's signaling server failed, or the current session expired | User should rejoin the Room                                                                                                                                            |
| [ParticipantDuplicateIdentityError](/docs/api/errors/53205)    | 53205    | Another client joined the Room with the same identity                                                        | Your app should make sure each client creates an AccessToken with a unique identity string                                                                             |
| [MediaConnectionError](/docs/api/errors/53405)                 | 53405    | The client failed to re-establish its media connection with the Room after a network disruption or handoff   | 1. User should make sure to have a stable internet connection 2. If the user is behind a firewall, then it should allow media traffic to and from Twilio to go through |

## Handling Warnings

This section lists some of the important warnings raised by `twilio-video.js` and provides recommendations on how best to handle them.

### Media Warnings

> \[!NOTE]
>
> The Media Warnings feature is currently in Public Beta. [Learn more about Twilio's beta product support here](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-Product-Support).

The JavaScript SDK raises Media Warnings whenever the Twilio media server is not able to detect media from a published audio or video track. You can enable Media Warnings starting from [version 2.34.0 of the Twilio Video JavaScript SDK](https://github.com/twilio/twilio-video.js/releases/tag/2.34.0).

#### Enable Media Warnings

You can enable Media Warnings with the `notifyWarnings` option in the [SDK's ConnectOptions object](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#ConnectOptions) when connecting to a Twilio Room:

```js
// Enable Media Warnings
const room = await connect('token', {
  notifyWarnings: [ 'recording-media-lost' ]
  // Other connect options
});
```

`notifyWarnings` takes an array of warnings to listen for. By default, this array is empty and no warning events will be raised.

Possible values to provide in the `notifyWarnings` array are:

* `recording-media-lost` - Raised when the media server has not detected any media on the published track that is being recorded in the past 30 seconds. This usually happens when there are network interruptions or when the track has stopped.

#### Listen for Media Warning events

The SDK raises Media Warning events when it detects the conditions specified in the `notifyWarnings` options above. You can implement callbacks on these events to act on them when they happen, or to alert the user of an issue.

The `warningsCleared` event is raised when conditions have returned to normal.

```js
// Catch Media Warnings
Array.from(room.localParticipant.tracks.values()).forEach(publication => {
  publication.on('warning', name => {
    if (name === 'recording-media-lost') {
      console.log(`LocalTrack ${publication.track.name} is not recording media.`);

      // Wait a reasonable amount of time to clear the warning.
      const timer = setTimeout(() => {
        // If the warning is not cleared, you can manually
        // reconnect to the room, or show a dialog to the user
      }, 5000);

      publication.once('warningsCleared', () => {
        console.log(`LocalTrack ${publication.track.name} warnings have cleared!`);
        clearTimeout(timer);
      });
    }
  });
});
```

##### Media Warning events

* **LocalTrackPublication.on('warning', callback(name))** - Raised when the published Track encounters a warning.
* **LocalTrackPublication.on('warningsCleared', callback())** - Raised when the published Track cleared all warning.
* **LocalParticipant.on('trackWarning', callback(name, publication))** - Raised when one of the LocalParticipant's published tracks encounters a warning.
* **LocalParticipant.on('trackWarningsCleared', callback(publication))** - Raised when one of the LocalParticipant's published tracks cleared all warning.
* **Room.on('trackWarning', callback(name, publication, participant))** - Raised when one of the LocalParticipant's published tracks in the Room encounters a warning.
* **Room.on('trackWarningsCleared', callback(publication, participant))** - Raised when one of the LocalParticipant's published tracks in the Room clears all warnings.
