# Twilio.Device.audio

When using the Voice JavaScript SDK, a Device instance has access to a `device.audio` property containing an [`AudioHelper`](https://twilio.github.io/twilio-voice.js/classes/AudioHelper.html) object. This allows you to control the way a `Device` instance interacts with speaker and microphone resources.

The [`AudioHelper`](https://twilio.github.io/twilio-voice.js/classes/AudioHelper.html) is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), so it provides a variety of event-related methods and properties. That functionality will not be covered here. For more information on `EventEmitter` functionality, see the [Node.js Events documentation](https://nodejs.org/api/events.html) or click on the method/property below.

* [addListener](https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener)
* [emit](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args)
* [eventNames](https://nodejs.org/api/events.html#events_emitter_eventnames)
* [getMaxListeners](https://nodejs.org/api/events.html#events_emitter_getmaxlisteners)
* [listenerCount](https://nodejs.org/api/events.html#events_emitter_listenercount_eventname)
* [listeners](https://nodejs.org/api/events.html#events_emitter_listeners_eventname)
* [off](https://nodejs.org/api/events.html#events_emitter_off_eventname_listener)
* [on](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener)
* [once](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener)
* [prependListener](https://nodejs.org/api/events.html#events_emitter_prependlistener_eventname_listener)
* [prependOnceListener](https://nodejs.org/api/events.html#events_emitter_prependoncelistener_eventname_listener)
* [rawListeners](https://nodejs.org/api/events.html#events_emitter_rawlisteners_eventname)
* [removeAllListeners](https://nodejs.org/api/events.html#events_emitter_removealllisteners_eventname)
* [removeListener](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener)
* [listenerCount (static method)](https://nodejs.org/api/events.html#events_events_listenercount_emitter_eventname)
* [defaultMaxListeners (static property)](https://nodejs.org/api/events.html#events_events_defaultmaxlisteners)

## Browser Support

> \[!WARNING]
>
> Many `device.audio` features are browser-dependent.

Currently **Chrome 49+** is the only browser that fully supports `device.audio`.

**Audio output selection** requires support for [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId).

**Audio input selection** requires support for [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext).

*If these features are used in a browser that does not support them, the `get` method will return an empty `Set`, whereas the `set` and `test` methods will return a rejected Promise.*

## Methods

Below are explanations of the audio-related methods on the `AudioHelper` object provided by `device.audio`.

### device.audio.addProcessor(processor, isRemote)

Adds an `AudioProcessor` object and returns a `Promise` representing the result. To add a remote `AudioProcessor`, pass `true`. To add a local `AudioProcessor`, pass `false`. The default value is `false`.

If `isRemote` is `false`, the `AudioHelper` routes the input audio stream through the processor before sending the audio stream to Twilio. If `isRemote` is `true`, the `AudioHelper` routes the output audio stream through the processor before playing it on the speaker.

See the [AudioProcessor](/docs/voice/sdks/javascript/twilioaudioprocessor) interface for an example.

### device.audio.disconnect(doEnable)

Enable or disable the disconnect sound. Passing `true` will enable the sound and `false` will disable the sound. Not passing this parameter will not alter the enable-status of the sound.

Returns a Boolean value that represents the enable-status of the sound.

### device.audio.incoming(doEnable)

Enable or disable the incoming sound. Passing `true` will enable the sound and `false` will disable the sound. Not passing this parameter will not alter the enable-status of the sound.

Returns a Boolean value that represents the enable-status of the sound.

### device.audio.outgoing(doEnable)

Enable or disable the outgoing sound. Passing `true` will enable the sound and `false` will disable the sound. Not passing this parameter will not alter the enable-status of the sound.

Returns a Boolean value that represents the enable-status of the sound.

### device.audio.removeProcessor(processor, isRemote)

Removes an `AudioProcessor` and returns a `Promise` representing the result. To remove a remote `AudioProcessor`, pass `true`. To remove a local `AudioProcessor`, pass `false`. The default value is `false`.

If `isRemote` is `false`, the `AudioHelper` uses the audio stream from the selected input device for existing or future calls. If `isRemote` is `true`, the `AudioHelper` uses the audio stream from the selected output device for existing or future calls.

### device.audio.setAudioConstraints(audioConstraints)

Set the [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) to be applied on every [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) call for new input device audio. Any deviceId specified here will be ignored. Instead, device IDs should be specified using `device.audio.setInputDevice()`. The returned Promise resolves when the media is successfully reacquired, or immediately if no input device is set.

**Example:**

```javascript
const device = new Device(token);

device.audio.setAudioConstraints({ echoCancellation: true })
.then(()=> {
    device.audio.setInputDevice('default');
});

// Now we have a live input audio track, opened with echoCancellation:true
device.audio.setAudioConstraints({
  autoGainControl: false,
  echoCancellation: false,
  noiseSuppression: false,
}).then(() => {
  // We successfully applied the new constraints and should automatically hear the difference.
  // Future calls to setInputDevice will also use these constraints until they're cleared.
}, err => {
  // Something went wrong, most likely err is an OverconstrainedError. Let's roll back.
  await device.audio.unsetAudioConstraints();
  // We should now have a working input audio track again
});
```

### device.audio.setInputDevice(deviceId)

**Note:** This is not supported in Firefox (as recent as 51) due to its lack of support for multiple input devices.

Set the current input device by `deviceId`. Once this is set, the input device will be used in the current call, if any, and used by default for any subsequent calls. In addition, whenever an input device is set, the `device.audio`'s `inputVolume` event will fire on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

Returns a Promise that resolves if the input device was set successfully.

**Example:**

```javascript
const device = new Device(token);

device.audio.setInputDevice('default').then(() => {
  console.info('Success!');
});
```

#### Using `setInputDevice` and `unsetInputDevice`

See our [Best Practices Guide](/docs/voice/sdks/javascript/best-practices#working-with-microphones-and-getusermedia) if your application logic intends to manage audio devices.

### device.audio.unsetAudioConstraints()

Unset the [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) to be applied on every [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) call for new input device audio. The returned Promise resolves when the media is successfully reacquired, or immediately if no input device is set.

### device.audio.unsetInputDevice(deviceId)

Unset the active input device. This will stop the `device.audio`'s `inputVolumeEvent` polling and stop the input stream.

**Example:**

```javascript
const device = new Device(token);

// ...

device.audio.unsetInputDevice().then(()=> {
  console.info('Success!');
});
```

## Properties

### device.audio.availableInputDevices

A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) containing the [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object of all available input devices (hardware devices capable of providing an input audio stream), indexed by deviceId.

> \[!WARNING]
>
> Due to browser-imposed security restrictions, `MediaDeviceInfo`s available in `availableInDevices` may contain auto-generated labels (e.g. "Unknown Audio Input Device 1"), or an incomplete / empty list of devices, until the user grants the application access to these resources in response to a call to the browser's [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) API.
>
> In an effort to reduce device fingerprinting, all major browsers are getting more strict in this regard. We strongly recommend your application calls [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) before rendering your input / output device selection UI for the cleanest user experience.
>
> After the user accepts the `getUserMedia()` prompt, the `AudioHelper`'s `deviceChange` event will be fired to indicate that the application UI should be updated.

### device.audio.availableOutputDevices

A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) containing the [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object of all available output devices (hardware devices capable of outputting audio), indexed by deviceId.

> \[!WARNING]
>
> Due to browser-imposed security restrictions, `MediaDeviceInfo`s available in `availableOutputDevices` may contain auto-generated labels (e.g. "Unknown Audio Output Device 1"), or an incomplete / empty list of devices, until the user grants the application access to these resources in response to a call to the browser's [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) API.
>
> In an effort to reduce device fingerprinting, all major browsers are getting more strict in this regard. We strongly recommend your application calls [`getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) before rendering your input / output device selection UI for the cleanest user experience.
>
> After the user accepts the `getUserMedia()` prompt, the `AudioHelper`'s `deviceChange` event will be fired to indicate that the application UI should be updated.

> \[!WARNING]
>
> Firefox (as recent as 51) does not list any `audiooutput` devices, and Edge (as recent as 38) does not label its `audiooutput` devices even after user permission is granted.

**Example:**

```javascript
const device = new Device(token);

device.audio.availableOutputDevices.forEach((device, id) => {
  console.info('Available device:', id, '(labeled', device.label, ')');
});
```

### device.audio.isOutputSelectionSupported

Returns a Boolean. Returns `false` if the browser does not support [HTMLAudioElement.setSinkId()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) or [MediaDevices.enumerateDevices()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) and Twilio cannot facilitate output selection functionality.

### device.audio.isVolumeSupported

Returns a Boolean. Returns `false` if the browser does not support [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) and Twilio can not analyze the volume in real-time.

### device.audio.ringtoneDevices

`ringtoneDevices` is an [OutputDeviceCollection](https://twilio.github.io/twilio-voice.js/classes/OutputDeviceCollection.html) that controls which output devices are used to play the ringing sound when receiving an incoming call. Changing this set of devices will switch the devices used for the incoming call sound.

**Note:** This is not supported in Firefox (as recent as 51) or Edge (as recent as 38) due to their lack of support for `HTMLAudioElement.setSinkId()`.

**device.audio.ringtoneDevices.delete(device)**

Delete a device from the collection. If no devices remain, the default device will be added as the sole device. If no default device exists, the first available device will be used.

The `device` parameter is a [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object.

This method returns a Boolean for whether the device was present before it was deleted.

**device.audio.ringtoneDevices.get()**

Returns the current set of devices (as [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects).

```javascript
const device = new Device(token);

device.audio.ringtoneDevices.get(); // Returns a Set<MediaDeviceInfo>

```

**device.audio.ringtoneDevices.set(deviceIdOrIds).**

Replace the current device/set of devices with a new device or set of devices.

The `deviceIdOrIds` parameter can be either a single deviceId (as a string) or an array of deviceIds (as an array of strings).

Returns an empty Promise. Rejects if this feature is not supported, or if any of the supplied deviceIds are not found, or if no deviceIds are passed.

```javascript
const device = new Device(token);

device.audio.ringtoneDevices.set('default'); // Set active device
device.audio.ringtoneDevices.set(['default', 'ABC123']); // Set active devices
```

**device.audio.ringtoneDevices.test(soundUrl?)**

Test the devices by playing audio through them.

The optional soundUrl parameter is a URL string for a test sound. If no soundUrl is passed, the test will be run with the 'outgoing' sound.

Returns a Promise. It will resolve with the result of the underlying `HTMLAudioElement`'s play() calls.

```javascript
const device = new Device(token);

device.audio.ringtoneDevices.test(); // Test with 'outgoing' sound
device.audio.ringtoneDevices.test('cowbell.mp3'); // Test with custom sound
```

### device.audio.speakerDevices

`speakerDevices` is an [OutputDeviceCollection](https://twilio.github.io/twilio-voice.js/classes/OutputDeviceCollection.html) that controls which output devices are used to play standard speaker sounds: the ringtone you hear when initiating a call, the disconnect sound, DTMF tones the user might press and the audio received from the remote participant.

Changing this set of devices will switch the device(s) used for these sounds. If you change these during an active call, the remote participant's audio will immediately be played through the new set of outputs.

**Note:** This is not supported in Firefox (as recent as 51) or Edge (as recent as 38) due to their lack of support for `HTMLAudioElement.setSinkId()`.

**device.audio.speakerDevices.delete(device)**

Delete a device from the collection. If no devices remain, the default device will be added as the sole device. If no default device exists, the first available device will be used.

The `device` parameter is a [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object.

This method returns a Boolean for whether the device was present before it was deleted.

**device.audio.speakerDevices.get()**

Returns the current set of devices (as [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects).

```javascript
const device = new Device(token);

device.audio.speakerDevices.get(); // Returns a Set<MediaDeviceInfo>

```

**device.audio.speakerDevices.set(deviceIdOrIds).**

Replace the current device/set of devices with a new device or set of devices.

The `deviceIdOrIds` parameter can be either a single deviceId (as a string) or an array of deviceIds (as an array of strings).

Returns an empty Promise. Rejects if this feature is not supported, or if any of the supplied deviceIds are not found, or if no deviceIds are passed.

```javascript
const device = new Device(token);

device.audio.speakerDevices.set('default'); // Set active device
device.audio.speakerDevices.set(['default', 'ABC123']); // Set active devices
```

**device.audio.speakerDevices.test(soundUrl?)**

Test the devices by playing audio through them.

The optional soundUrl parameter is a URL string for a test sound. If no soundUrl is passed, the test will be run with the 'outgoing' sound.

Returns a Promise. It will resolve with the result of the underlying `HTMLAudioElement`'s play() calls.

```javascript
const device = new Device(token);

device.audio.speakerDevices.test(); // Test with 'outgoing' sound
device.audio.speakerDevices.test('cowbell.mp3'); // Test with custom sound
```

## Accessors

### device.audio.audioConstraints

The current audio constraints (as a [`MediaTrackConstraints`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) object) set by `device.audio.setAudioConstraints()`. Starts as `null`.

### device.audio.inputDevice

Returns the active input device (as a [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object).

Having no `inputDevice` specified by `device.audio.setInputDevice()` will disable functionality related to input selection.

### device.audio.inputStream

Returns the current input stream (as a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object).

## Events

### deviceChange

```javascript
const device = new Device(token);

device.audio.on('deviceChange', handler(lostActiveDevices));

```

Register a handler that will be fired whenever a new audio device is found, an existing audio device is lost or the label of an existing device is changed. This typically happens when the user plugs in or unplugs an audio device, like a headset or a microphone.

This will also trigger after the customer has given access to user media via `getUserMedia` for the first time, as the labels will become populated. If you want to allow users to choose a specific audio device in your application's UI, attach a listener to this event.

> \[!WARNING]
>
> This does not detect a customer plugging in headphones or other speakers through the headphone jack, as the headphone jack only redirects audio from the internal audio device.

The parameter, `lostActiveDevices`, is an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects that represents all devices that were currently active in either `.speakerDevices` or `.ringtoneDevices` at the time they were lost, if any. A non-empty array is an indicator that the user's experience was likely affected by this event.

### inputVolume

```javascript
const device = new Device(token);

device.audio.on('inputVolume', handler(volume))

```

Register a handler that will be fired every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) with the current volume of the selected input device, if one is set. The handler will be invoked up to 60 times per second, and will scale down dynamically on slower devices to preserve performance. The handler receives `volume` as a percentage of maximum volume represented by a floating point number between 0.0 and 1.0, inclusive. This value represents a range of relative decibel values between -100dB and -30dB.

**Note:** This will not work in Firefox (as recent as 51) as there is no supported way to set the input device.

## OutputDeviceCollection

Both `device.audio.speakerDevices` and `device.audio.ringtoneDevices` are instances of an `OutputDeviceCollection`. An `OutputDeviceCollection` represents active audio devices, and can be updated to redirect speaker and ringtone sounds to different devices in real time.

An `OutputDeviceCollection` provides `delete`, `get`, `set`, and `test` methods. Descriptions and examples for each of these methods can be found in the `device.audio.ringtoneDevices` and `device.audio.speakerDevices` sections above.

Below is an example on how one might work with an `OutputDeviceCollection` using a multi-select HTML element:

```javascript
const device = new Device(token);

var speakerDeviceSelect = document.getElementById('speaker-devices');

// When a device is found or lost, update a multi-select element with the
// new set of available devices.
device.audio.on('deviceChange', function updateAvailableDevices() {
  speakerDeviceSelect.innerHtml = '';

  device.audio.availableOutputDevices.forEach((device, id) => {
    var deviceOption = document.createElement('option');
    deviceOption.label = device.label;
    deviceOption.setAttribute('data-id', id);

    // If the device is present in device.audio.speakerDevices, then it is
    // currently active, and should be selected in the multi-select element.
    var speakerDevices = device.audio.speakerDevices.get();
    speakerDevices.forEach((speakerDevice) => {
        if (speakerDevice.deviceId === id) {
          deviceOption.setAttribute('selected', 'selected');
        }
    });

    speakerDeviceSelect.appendChild(deviceOption);
  });
});

// When a device is selected or unselected, update device.audio.speakerDevices
// with the devices the user selected to immediately change where the audio
// is playing from.
speakerDeviceSelect.addEventListener('change',() => {
  var selectedDeviceIds = [].slice.call(speakerDevices.childNodes)
    .filter(function(node) { return node.selected; })
    .map(function(node) { return node.getAttribute('data-id'); });

  device.audio.speakerDevices.set(selectedDeviceIds);
});

```
