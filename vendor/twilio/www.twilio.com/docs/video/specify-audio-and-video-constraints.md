# Specify Audio and Video Constraints in JavaScript

As you build with Twilio Video, you can customize certain aspects of your Participants' audio and video capture to optimize behavior for your specific use case. For example, you can turn on or off features such as noise suppression, or alter the video's frame rate. Below are examples for specifying audio and video constraints for local tracks.

## Audio Constraints

To customize audio capture, set [audio constraints][] on a [LocalAudioTrack][]. All the constraints [default to `true`][].

[audio constraints]: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#properties_of_audio_tracks

[LocalAudioTrack]: https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalAudioTrack.html

[default to `true`]: https://www.w3.org/TR/mediacapture-streams/#media-track-supported-constraints

```js
const { connect, createLocalAudioTrack, createLocalTracks } = require('twilio-video');

// Option 1
createLocalTracks({
  audio: { noiseSuppression: false, echoCancellation: false },
  video: true
}).then(localTracks => {
  return connect('$TOKEN', {
    name: 'my-room-name',
    tracks: localTracks
  });
}).then(room => {
  console.log(`Connected to Room: ${room.name}`);
});

// Option 2
connect('$TOKEN', {
  audio: { noiseSuppression: false, echoCancellation: false },
  name: 'my-room-name',
  video: true
}).then(room => {
  console.log(`Connected to Room: ${room.name}`);
});

// Option 3
createLocalAudioTrack({
  noiseSuppression: false,
  echoCancellation: false
}).then(localTrack => {
  console.log(`Created LocalAudioTrack: ${localTrack.name}`);
});
```

## Video Constraints

To customize video capture, set [video constraints][] on a [LocalVideoTrack][]. Setting constraints lets you optimize the video track for network and device conditions. You can set the size, frame rate, or aspect ratio constraints of your choice. All the constraints [default to `true`][].

[video constraints]: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#Properties_of_video_tracks

[LocalVideoTrack]: https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalVideoTrack.html

[default to `true`]: https://www.w3.org/TR/mediacapture-streams/#media-track-supported-constraints

Please keep in mind that video constraints are used to resolve the video capture format, but the actual video sent to other Participants may be downscaled temporally or spatially in response to those Participants' network and device conditions.

```js
const { connect, createLocalTracks } = require('twilio-video');

// Option 1
createLocalTracks({
  audio: true,
  video: { width: 640 },
}).then(localTracks => {
  return connect('$TOKEN', {
    name: 'my-room-name',
    tracks: localTracks,
  });
}).then(room => {
  console.log(`Connected to Room: ${room.name}`);
});

// Option 2
connect('$TOKEN', {
  audio: true,
  name: 'my-room-name',
  video: { width: 640 },
}).then(room => {
  console.log(`Connected to Room: ${room.name}`);
});
```
