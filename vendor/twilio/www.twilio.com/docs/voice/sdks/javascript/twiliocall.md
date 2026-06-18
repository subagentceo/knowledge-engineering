# Voice JavaScript SDK: Twilio.Call

A `Twilio.Call` object represents a call to or from Twilio. You never instantiate a `Call` directly, but a `Call` instance is passed to the event handlers for `errorEvent` and `incomingEvent`, returned when you invoke [device.connect()](/docs/voice/sdks/javascript/twiliodevice#deviceconnectconnectoptions), and returned via the [device.calls accessor](/docs/voice/sdks/javascript/twiliodevice#devicecalls).

```javascript
const device = new Device(token);

// Make an outgoing call
async function makeOutgoingCall() {
  const call = await device.connect();
}

// or handle an incoming call
device.on('incoming', call => {});
```

## Table of Contents

* [Methods](/docs/voice/sdks/javascript/twiliocall#methods)
* [Events](/docs/voice/sdks/javascript/twiliocall#events)
* [Properties](/docs/voice/sdks/javascript/twiliocall#properties)
* [Accessors](/docs/voice/sdks/javascript/twiliocall#accessors)
* [EventEmitter Methods and Properties](/docs/voice/sdks/javascript/twiliocall#eventemitter-methods-and-properties)

## Methods

This section contains descriptions of the methods available on a `Call` instance.

| [call.accept()](/docs/voice/sdks/javascript/twiliocall#callacceptacceptoptions) <br /><br /> [call.disconnect()](/docs/voice/sdks/javascript/twiliocall#calldisconnect) <br /><br /> [call.getLocalStream()](/docs/voice/sdks/javascript/twiliocall#callgetlocalstream) <br /><br /> [call.getRemoteStream()](/docs/voice/sdks/javascript/twiliocall#callgetremotestream) | [call.ignore()](/docs/voice/sdks/javascript/twiliocall#callignore) <br /><br /> [call.isMuted()](/docs/voice/sdks/javascript/twiliocall#callismuted) <br /><br /> [call.mute()](/docs/voice/sdks/javascript/twiliocall#callmuteshouldmute) <br /><br /> [call.postFeedback()](/docs/voice/sdks/javascript/twiliocall#callpostfeedbackscore-issue) | [call.reject()](/docs/voice/sdks/javascript/twiliocall#callreject) <br /><br /> [call.sendDigits()](/docs/voice/sdks/javascript/twiliocall#callsenddigitsdigits) <br /><br /> [call.sendMessage()](#callsendmessagemessage) <br /><br /> [call.status()](/docs/voice/sdks/javascript/twiliocall#callstatus) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### call.accept(acceptOptions)

Accepts an incoming voice call, initiates a media session for the `Call` instance. Returns `void`.

The optional `acceptOptions` parameter is a JavaScript object that allows you to configure the WebRTC connection and the MediaStream.

The properties of the `acceptOptions` object are listed in the table below. Both properties are optional.

| `acceptOptions` property        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **rtcConfiguration** *optional* | An [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration) dictionary to pass to the [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) constructor. This allows you to configure the WebRTC connection between your local machine and the remote peer.                                                                                                                                                                                                                          |
| **rtcConstraints** *optional*   | A [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) dictionary to pass to [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) when accepting a `Call`. This allows you to configure the behavior of tracks returned in the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream). Each browser implements a different set of `MediaTrackConstraints`, so consult your browser's implementation of `getUserMedia` for more information. |

**Example:**

```javascript
const acceptOptions = {
  rtcConfiguration: {...}
  rtcConstraints: {...}
};

// This could be invoked by the user clicking
// an "Answer Incoming Call" button
call.accept(acceptOptions)
```

The `call.status()` will be set to `connecting` while the media session for the `Call` instance is being set up.

The `call.status()` will change to `open` once the media session has been established.

### call.disconnect()

Close the media session associated with the `Call` instance. Returns `void`.

### call.getLocalStream()

Get the local `MediaStream` being used by the `Call` instance. Returns `void`.

This contains the local `Device` instance's audio input.

### call.getRemoteStream()

Get the remote `MediaStream`. Returns the remote MediaStream if set. Otherwise, returns `undefined`.

This contains the remote caller's audio, which is being received locally and output through the local user's speakers.

### call.ignore()

Ignore a pending call without alerting the dialing party. Returns `void`.

This method will stop incoming sound for the local `Device` instance and set the `call.status()` to `closed`.

This method will not send a hangup message to the dialing party.

The dialing party will continue to hear ringing until another `Device` instance with the same `identity` accepts the `Call` or if the `Call` times out.

### call.isMuted()

Returns a Boolean indicating whether the input audio of the local `Device` instance is muted.

### call.mute(shouldMute?)

Mutes or unmutes the local user's input audio based on the Boolean `shouldMute` argument you provide.

`shouldMute` defaults to `true` when no argument is passed.

```javascript
// Passing true or no argument will mute
// the local device's input audio
call.mute(true);
call.mute();


// Unmute the input audio
call.mute(false);
```

### call.postFeedback(score?, issue?)

Creates a [Feedback resource](/docs/voice/voice-insights/api/call/call-annotation-resource) for the [Call resource](/docs/voice/api/call-resource) associated with the `Call` instance. If no parameters are passed, Twilio will report that feedback was not available for this call. Returns an empty Promise.

Posting the feedback using this API will enable you to understand which factors contribute to audio quality problems.

Twilio will be able to correlate the metrics with perceived call quality and provide an accurate picture of the factors affecting your users' call experience.

For a high-level overview of your call feedback, you can use the [FeedbackSummary Resource](/docs/voice/voice-insights/api/call/call-annotation-resource).

**Parameter**: ****feedbackScore***optional***

Data Type:

*number* or *undefined*

Description:

The end user's rating of the call using an integer (`1`, `2`, `3`, `4`, or `5`) or `undefined` if the user declined to give feedback. Suggested score interpretations are as follows:

* `1` - Terrible call quality, call dropped, or caused great difficulty in communicating
* `2` - Bad call quality; choppy audio, periodic one-way-audio
* `3` - Average call quality; manageable with some noise/minor packet loss
* `4` - Good call quality; minor issues
* `5` - Great call quality; no issues

***

**Parameter**: ****feedbackIssue***optional***

Data Type:

*string*

Description:

The primary issue that the end user experienced on the call. The possible values are as follows:

* `'dropped-call'` - Call initially connected but was dropped
* `'audio-latency'` - Participants can hear each other but with significant delay
* `'one-way-audio'` - One participant couldn't hear the other
* `'choppy-audio'` - Periodically, participants couldn't hear each other. Some words were lost
* `'noisy-call'` - There was disturbance, background noise, low clarity
* `'echo'` - There was echo during the call

**Example:**

```javascript
// Pass feedbackScore only
call.postFeedback(5);

// Pass feedbackScore and feedbackIssue
call.postFeedback(2, 'dropped-call');

// Pass no arguments when user declines to provide feedback
call.postFeedback();

```

### call.reject()

Reject an incoming call. Returns `void`.

This will cause a hangup to be issued to the dialing party.

### call.sendDigits(digits)

Play DTMF tones. This is useful when dialing an extension or when an automated phone menu expects DTMF tones. Returns `void`.

The `digits` parameter is a string and can contain the characters `0`-`9`, `*`, `#`, and `w`. Each `w` will cause a 500-millisecond pause between digits sent.

The SDK only supports *sending* DTMF digits. It does not raise events if DTMF digits are present in the incoming audio stream.

### call.sendMessage(message)

*Note: This method is part of the [Call Message Events feature](/docs/voice/sdks/call-message-events).*

Send a message to the server-side application.

The `call.sendMessage()` method takes an argument object with the following properties:

| Property             | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| content *object*     | The content of the message you wish to send to the server-side application.                                            |
| contentType *string* | The `Content-Type` of the message. Currently, the value will only be `"application/json"`                              |
| messageType *string* | The type of message sent from the server-side application. Currently, the value will only be `"user-defined-message"`. |

Send a message to the server-side application:

```javascript
// the Call is active

const messageObject = {
   content: { key1: 'This is a messsage from the client side'},
   messageType: 'user-defined-message',
   contentType: "application/json"
}

call.sendMessage(messageObject)
```

If the message was successfully sent to Twilio (which will then send the message to the subscription callback endpoint), the [messageSent event](#messagesent-event) will be emitted by the Call instance.

### call.status()

Return the status of the `Call` instance.

The possible status values are as follows:

| Status           | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `"closed"`       | The media session associated with the call has been disconnected.                                           |
| `"connecting"`   | The call was accepted by or initiated by the local `Device` instance and the media session is being set up. |
| `"open"`         | The media session associated with the call has been established.                                            |
| `"pending"`      | The call is incoming and hasn't yet been accepted.                                                          |
| `"reconnecting"` | The ICE connection was disconnected and a reconnection has been triggered.                                  |
| `"ringing"`      | The callee has been notified of the call but has not yet responded.                                         |

## Events

This section describes the different [events](https://developer.mozilla.org/en-US/docs/Web/Events) that can be emitted by a `Call` instance. Using event handlers allow you customize the behavior of your application when an event occurs, such as updating the UI when a call has been accepted or disconnected.

| [accept Event](/docs/voice/sdks/javascript/twiliocall#accept-event) <br /><br /> [audio Event](/docs/voice/sdks/javascript/twiliocall#audio-event) <br /><br /> [cancel Event](/docs/voice/sdks/javascript/twiliocall#cancel-event) <br /><br /> [disconnect Event](/docs/voice/sdks/javascript/twiliocall#disconnect-event) <br /><br /> [error Event](/docs/voice/sdks/javascript/twiliocall#error-event) <br /><br /> [messageReceived Event](#messagereceived-event) <br /><br /> [messageSent Event](#messagesent-event) <br /><br /> [mute Event](/docs/voice/sdks/javascript/twiliocall#mute-event) | [reconnected Event](/docs/voice/sdks/javascript/twiliocall#reconnected-event) <br /><br /> [reconnecting Event](/docs/voice/sdks/javascript/twiliocall#reconnecting-event) <br /><br /> [reject Event](/docs/voice/sdks/javascript/twiliocall#reject-event) <br /><br /> [ringing Event](/docs/voice/sdks/javascript/twiliocall#ringing-event) <br /><br /> [sample Event](/docs/voice/sdks/javascript/twiliocall#sample-event) <br /><br /> [warning Event](/docs/voice/sdks/javascript/twiliocall#warning-event) <br /><br /> [warning-cleared Event](/docs/voice/sdks/javascript/twiliocall#warning-cleared-event) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### accept Event

Emitted when an incoming `Call` is accepted. For outgoing calls, the`'accept'` event is emitted when the media session for the call has finished being set up.

The event listener will receive the `Call` instance.

Listen for the `'accept'` event:

```javascript
call.on('accept', call => {
  console.log('The incoming call was accepted or the outgoing call's media session has finished setting up.');
});
```

### audio Event

Emitted when the `HTMLAudioElement` for the remote audio is created. The handler function receives the `HTMLAudioElement` for the remote audio as its sole argument. This event can be used to redirect media if your environment supports it. See [WebRTC redirection](/docs/voice/sdks/javascript/changelog#webrtc-api-overrides-beta) for more details.

### cancel Event

Emitted when the `Call` instance has been canceled by the remote end and the `call.status()` has transitioned to `'closed'`.

Listen for the `'cancel'` event:

```javascript
call.on('cancel', () => {
 console.log('The call has been canceled.');
});
```

### disconnect Event

Emitted when the media session associated with the `Call` instance is disconnected.

The event listener will receive the `Call` instance.

Listen for the `'disconnect'` event:

```javascript
call.on('disconnect', call => {
 console.log('The call has been disconnected.');
});
```

### error Event

Emitted when the `Call` instance receives an error.

The event listener will receive a `TwilioError` object.

#### TwilioError

The format of the `TwilioError` returned from the error event is a JavaScript object with the following properties:

| Property                              | Description                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| **causes** *string\[]*                | A list of possible causes for the error                         |
| **code** *number*                     | The numerical code associated with this error                   |
| **description** *string*              | A description of what the error means                           |
| **explanation** *string*              | An explanation of when the error may be observed                |
| **message** *string*                  | Any further information discovered and passed along at runtime. |
| **name** *string*                     | The name of this error                                          |
| **originalError** (optional) *string* | The original error received from the external system, if any    |
| **solutions** *string\[]*             | A list of potential solutions for the error                     |

Listen for the `'error'` event:

```javascript
call.on('error', (error) => {
    console.log('An error has occurred: ', error);
});
```

See a list of common errors on the [Voice SDK Error Codes Page](/docs/voice/sdks/error-codes).

### messageReceived Event

*Note: This method is part of the [Call Message Events feature](/docs/voice/sdks/call-message-events).*

Emitted when the Call instance receives a message sent from the server-side application.

The event listener receives a message object with the following properties:

| Property      | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| content       | The message sent from the server-side application.                                                                     |
| contentType   | The `Content-Type` of the message. Currently, the value will only be `"application/json"`                              |
| messageType   | The type of message sent from the server-side application. Currently, the value will only be `"user-defined-message"`. |
| voiceEventSid | A unique identifier for this message. This can be used for internal logging/tracking.                                  |

Listen for the `'messageReceived'` event:

```javascript
call.on('messageReceived', (message) => {
  console.log('Message received:')
  console.log(JSON.stringify(message.content));
});
```

### messageSent Event

*Note: This method is part of the [Call Message Events feature](/docs/voice/sdks/call-message-events).*

Emitted when the Call instance sends a message to the server-side application using the [call.sendMessage()](#callsendmessagemessage) method.

The event listener receives a message object with the following properties:

| Property      | Description                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| content       | The message sent from the server-side application.                                                                     |
| contentType   | The `Content-Type` of the message. Currently, the value will only be `"application/json"`                              |
| messageType   | The type of message sent from the server-side application. Currently, the value will only be `"user-defined-message"`. |
| voiceEventSid | A unique identifier for this message. This can be used for internal logging/tracking.                                  |

Listen for the `'messageSent'` event:

```javascript
call.on('messageSent', (message) => {
  // voiceEventSid can be used for tracking the message
  const voiceEventSid = message.voiceEventSid;
  console.log('Message sent. voiceEventSid: ', voiceEventSid)
});
```

**Note:** If `call.sendMessage()` was invoked and the `'messageSent'` event was not emitted, check the [Device instance's error handler](/docs/voice/sdks/javascript/twiliodevice#error-event).

### mute Event

Emitted when the input audio associated with the `Call` instance is muted or unmuted.

The event listener will receive two arguments:

* a Boolean indicating whether the input audio for the `Call` instance is currently muted
* the `Call` instance

Listen for the `'mute'` event:

```javascript
call.on('mute', (isMuted, call) => {
 // isMuted is true if the input audio is currently muted
 // i.e. The remote participant CANNOT hear local device's input

 // isMuted is false if the input audio is currently unmuted
 // i.e. The remote participant CAN hear local device's input

 isMuted ? console.log('muted') : console.log('unmuted');
});
```

### reconnected Event

Emitted when the `Call` instance has regained media and/or signaling connectivity.

Listen for the `'reconnected'` event:

```javascript
call.on('reconnected', () => {
  console.log('The call has regained connectivity.')
});
```

### reconnecting Event

Emitted when the Call instance has lost media and/or signaling connectivity and is reconnecting.

The event listener will receive a [TwilioError](/docs/voice/sdks/javascript/twiliocall#twilioerror) object describing the error that caused the media and/or signaling connectivity loss.

You may want to use this event to update the UI so that the user is aware of the connectivity loss and that the SDK is attempting to reconnect.

Listen for the `'reconnecting'` event:

```javascript
call.on('reconnecting', (twilioError) => {
  // update the UI to alert user that connectivity was lost
  // and that the SDK is trying to reconnect
  showReconnectingMessageInBrowser();

  // You may also want to view the TwilioError:
  console.log('Connectivity error: ', twilioError);
});
```

### reject Event

Emitted when `call.reject()` was invoked and the `call.status()` is `closed`.

Listen for the `'reject'` event:

```javascript
call.on('reject', () => {
 console.log('The call was rejected.');
});
```

### ringing Event

Emitted when the `Call` has entered the `ringing` state.

When using the Dial verb with `answerOnBridge=true`, the ringing state will begin when the callee has been notified of the call and will transition into open after the callee accepts the call, or closed if the call is rejected or cancelled.

The parameter `hasEarlyMedia` denotes whether there is early media available from the callee. If `true`, the Client SDK will automatically play the early media. Sometimes this is ringing, other times it may be an important message about the call. If `false`, there is no remote media to play, so the application may want to play its own outgoing ringtone sound.

Listen for the `'ringing'` event:

```javascript
call.on('ringing', hasEarlyMedia => {
  showRingingIndicator();
  if (!hasEarlyMedia) {
    playOutgoingRinging();
  }
});
```

### sample Event

Emitted when the `Call` instance receives a WebRTC sample object. This event is published every second.

The event listener will receive the WebRTC sample object.

Listen for the `'sample'` event:

```javascript
call.on('sample', sample => {
    // Do something
});
```

**Example of WebRTC Sample Data**

```json
{
  "audioInputLevel": 11122,
  "audioOutputLevel": 2138,
  "bytesReceived": 8600,
  "bytesSent": 8600,
  "codecName": "opus",
  "jitter": 0,
  "mos": 4.397229249317001,
  "packetsLost": 0,
  "packetsLostFraction": 0,
  "packetsReceived": 50,
  "packetsSent": 50,
  "rtt": 77,
  "timestamp": 1572301567032.327,
  "totals": {
    "bytesReceived": 63640,
    "bytesSent": 83936,
    "packetsLost": 0,
    "packetsLostFraction": 0,
    "packetsReceived": 370,
    "packetsSent": 488
  }
}
```

### volume Event

Emitted every 50 milliseconds with the current input and output volumes on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

The event listener will be invoked up to 60 times per second and will scale down dynamically on slower devices to preserve performance.

The event listener will receive `inputVolume` and `outputVolume` as percentages of maximum volume represented by a floating point number between 0.0 and 1.0 (inclusive). This value represents a range of relative decibel values between -100dB and -30dB.

Listen for the `'volume'` event:

```javascript
call.on('volume', (inputVolume, outputVolume) => {
    // Do something
});
```

You may want to use this to display volume levels in the browser. See the [Voice JavaScript SDK quickstart GitHub repository](https://github.com/TwilioDevEd/voice-javascript-sdk-quickstart-node/blob/a4f459a5db4672d36d467a2d38af28dc7159dcfe/public/quickstart.js#L262) for an example of how to implement this functionality.

### warning Event

Emitted when a call quality metric has crossed a threshold.

The event listener will receive two arguments:

1. a string of the warning name (ex: `'high-rtt'`)
2. an object containing data on the warning

This event is raised when the SDK detects a drop in call quality or other conditions that may indicate the user is having trouble with the call. You can implement callbacks on these events to alert the user of an issue.

To alert the user that an issue has been resolved, you can listen for the `warning-cleared` event, which indicates that a call quality metric has returned to normal.

For a full list of conditions that will raise a `warning` event, check the [Voice Insights SDK Events Reference page](/docs/voice/voice-insights/api/call/details-sdk-call-quality-events).

The example below shows how you can listen for and handle `warning` events.

```javascript
call.on('warning', function(warningName, warningData) {
  if (warningName === 'low-mos') {
    showQualityWarningModal('We have detected poor call quality conditions. You may experience degraded call quality.');
    console.log(warningData);
    /* Prints the following
      {
        // Stat name
        "name": "mos",

        // Array of mos values in the past 5 samples that triggered the warning
        "values": [2, 2, 2, 2, 2],

        // Array of samples collected that triggered the warning.
        // See sample object format here https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#sample-event
        "samples": [...],

        // The threshold configuration.
        // In this example, low-mos warning will be raised if the value is below 3
        "threshold": {
          "name": "min",
          "value": 3
        }
      }
     */
  }
});
```

### warning-cleared Event

Emitted when a call quality metric has returned to normal.

The event listener will receive one argument, the warning name as a string (ex: `'low-mos'`).

You can listen for this event to update the user when a call quality issue has been resolved. See example below.

```javascript
call.on('warning-cleared', function(warningName) {
  if (warningName === 'low-mos') {
    hideQualityWarningModal();
  }
});
```

## Properties

### call.callerInfo

For calls that have undergone [SHAKEN/STIR validation](/docs/voice/trusted-calling-with-shakenstir), `call.callerInfo` will return an object with an `isVerified` property.

If a caller's identity has been verified by Twilio and has achieved level `A` attestation, the `call.callerInfo.isVerified` property will be `true`.

```javascript
console.log(call.callerInfo);

// PRINTS:
// { isVerified: true }
```

If a call has failed validation or if the call achieves an attestation lower than level `A`, the `call.callerInfo.isVerified` property will be `false`.

```javascript
console.log(call.callerInfo);

// PRINTS:
// { isVerified: false }
```

For calls with no caller verification information, `call.callerInfo` will have a value of `null`.

```javascript
console.log(call.callerInfo);

// PRINTS:
// null
```

### call.customParameters

Returns a Map object containing the custom parameters that were passed in the [ConnectOptions.params](/docs/voice/sdks/javascript/twiliodevice#connectoptions) property when invoking `device.connect()`.

These custom parameters will be sent in the body of the HTTP request that Twilio will send to your TwiML App's Voice Configuration URL.

```javascript
var params = {
  To: "+15554448888",
  aCustomParameter: "the value of your custom parameter"
};

const call = await device.connect({ params });

console.log(call.customParameters);

// PRINTS:
// {'To' => '+15554448888', 'aCustomParameter' => 'the value of your custom parameter'}

```

### call.parameters

Returns the Call parameters received from Twilio.

For **incoming** calls, the `call.parameters` may look like this:

```javascript
console.log(call.parameters);

// PRINTS:
// {
//   From: "+15554448888",
//   CallSid: "CAxxxx...",
//   To: "client:YourDeviceIdentity",
//   AccountSid: "ACxxxx..."
// }
```

For **outgoing** calls, the call may not yet have a CallSID. You can find the CallSID by waiting until the `Twilio.Call` instance has emitted the `'accept'` event.

```javascript
const call = await device.connect({ params });

console.log(call.parameters);

// PRINTS:
// {}


// For outgoing calls, the "accept" event is emitted when the Call's media session has finished setting up.
call.on("accept", () => {
  console.log(call.parameters)
});

// PRINTS:
// { CallSID: "CAxxxx..." }
```

## Accessors

### call.codec

Returns the audio codec used for the [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) associated with the `Call` instance.

Possible values are `"opus"` and `"pcmu"`.

```javascript
console.log(call.codec);

// Prints:
// "pcmu"
```

### call.connectToken

The connect token is available as soon as the call is established and connected to Twilio. Use this token to reconnect to a call via the [device.connect()](/docs/voice/sdks/javascript/twiliodevice#deviceconnectconnectoptions) method.

For incoming calls, the connect token is available in the call object after the [device's incoming event](/docs/voice/sdks/javascript/twiliodevice#incoming-event) is emitted. For outgoing calls, the connect token is available after the [call's accept event](/docs/voice/sdks/javascript/twiliocall#accept-event) is emitted.

```javascript
console.log(call.connectToken);

// Prints:
// "JTdCJTIyY3VzdG9tUGFyYW1ldGVycyUyMiUzQSU3QiUyMnJlY2Vw..."
```

### call.direction

Returns the directionality of the `Call` instance.

Possible values are `"INCOMING"` and `"OUTGOING"`.

An incoming call is one that is directed towards your `Device` instance.

An outgoing call is one that is made by invoking [device.connect()](/docs/voice/sdks/javascript/twiliodevice#deviceconnectconnectoptions).

```javascript
console.log(call.direction);

// Prints:
// "OUTGOING"
```

## EventEmitter Methods and Properties

A `Call` instance is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), so it provides a variety of event-related methods and properties. Although it will not be covered here, more information on EventEmitter functionality can be found in the full [Node.js Events documentation](https://nodejs.org/api/events.html). Alternatively, you can click on the method/property below to be taken to the pertaining documentation.

| [addListener](https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener) <br /><br /> [emit](https://nodejs.org/api/events.html#events_emitter_emit_eventname_args) <br /><br /> [eventNames](https://nodejs.org/api/events.html#events_emitter_eventnames) <br /><br /> [getMaxListeners](https://nodejs.org/api/events.html#events_emitter_getmaxlisteners) <br /><br /> [listenerCount](https://nodejs.org/api/events.html#events_emitter_listenercount_eventname) <br /><br /> [listeners](https://nodejs.org/api/events.html#events_emitter_listeners_eventname) <br /><br /> [off](https://nodejs.org/api/events.html#events_emitter_off_eventname_listener) <br /><br /> [on](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) | [once](https://nodejs.org/api/events.html#events_emitter_once_eventname_listener) [prependListener](https://nodejs.org/api/events.html#events_emitter_prependlistener_eventname_listener) <br /><br /> [prependOnceListener](https://nodejs.org/api/events.html#events_emitter_prependoncelistener_eventname_listener) <br /><br /> [rawListeners](https://nodejs.org/api/events.html#events_emitter_rawlisteners_eventname) <br /><br /> [removeAllListeners](https://nodejs.org/api/events.html#events_emitter_removealllisteners_eventname) <br /><br /> [removeListener](https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener) <br /><br /> [listenerCount (static method)](https://nodejs.org/api/events.html#events_events_listenercount_emitter_eventname) <br /><br /> [defaultMaxListeners (static property)](https://nodejs.org/api/events.html#events_events_defaultmaxlisteners) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
