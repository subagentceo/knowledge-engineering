# Configuring Audio, Video Input and Output devices

In this guide we'll show you how to configure audio and video input and output devices in your Twilio Video Rooms application.

## Selecting a Specific Video Input

You can use `navigator.mediaDevices.enumerateDevices()` to select a specific video input like this:

```js
const { connect, createLocalTracks } = require('twilio-video');

navigator.mediaDevices.enumerateDevices().then(devices => {
  const videoInput = devices.find(device => device.kind === 'videoinput');
  return createLocalTracks({ audio: true, video: { deviceId: videoInput.deviceId } });
}).then(localTracks => {
  return connect('my-token', { name: 'my-room-name', tracks: localTracks });
}).then(room => {
  console.log('Connected to room ' + room.name);
});
```

Audio inputs can also be selected in a similar fashion.

## Selecting a Specific Audio Input

Selecting a specific audio input is the same as selecting a specific video input. Just select the audio input device ID and set it on the constraints:

```js
const { connect, createLocalTracks } = require('twilio-video');

navigator.mediaDevices.enumerateDevices().then(devices => {
  const audioInput = devices.find(device => device.kind === 'audioinput');
  return createLocalTracks({ audio: { deviceId: audioInput.deviceId }, video: true });
}).then(localTracks => {
  return connect('my-token', { name: 'my-room-name', tracks: localTracks });
}).then(room => {
  console.log('Connected to room ' + room.name);
}); 
```

## Selecting a Specific Audio Output

You can use `navigator.mediaDevices.enumerateDevices()` along with [HTMLMediaElement.setSinkId()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId) to set the audio output device like this:

```js
const { connect } = require('twilio-video');

let audioOutputDevice;

navigator.mediaDevices.enumerateDevices().then(devices => {
  audioOutputDevice = devices.find(device => device.kind === 'audiooutput');
  return connect('$TOKEN', { name: 'my-room-name' });
}).then(room => {
  room.on('trackSubscribed', track => {
    if (track.kind === 'audio') {
      const audioElement = track.attach();
      audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
        document.body.appendChild(audioElement);
      });
    }
  });
});
```
