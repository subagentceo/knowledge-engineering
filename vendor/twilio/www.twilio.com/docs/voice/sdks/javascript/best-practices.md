# Voice JavaScript SDK: Best Practices

## Overview

Twilio Voice SDKs allow you to build high-quality calling experiences directly into web and mobile applications. They can be used to build use cases like contact centers, sales dialers, peer-to-peer calling and more using familiar web and mobile development tools.

There are a few things you need to keep in mind to get the most out of the Voice JavaScript SDK. Following these best practices will ensure your users have a seamless calling experience. They will also make it easier to troubleshoot connection and call quality issues.

* [Debugging](/docs/voice/sdks/javascript/best-practices#debugging)
* [Give users feedback when device state changes](#give-users-feedback-when-device-state-changes)
* [Gracefully handle no-answer situations](#gracefully-handle-no-answer-situations)
* [Working with microphones and getUserMedia](#working-with-microphones-and-getusermedia)
* [Monitor call quality with Voice Insights](#monitor-call-quality-with-voice-insights)
* [Manage the calling environment](#manage-the-calling-environment)
* [Use the closest Twilio data center](#use-the-closest-twilio-data-center)
* [Keep AccessTokens up to date](/docs/voice/sdks/javascript/best-practices#keep-accesstokens-up-to-date)
* [WebRTC API Overrides](/docs/voice/sdks/javascript/best-practices#webrtc-api-overrides)
* [Setting WebRtcIPHandling in Chrome](/docs/voice/sdks/javascript/best-practices#setting-webrtciphandling-in-chrome)

To get the most out of this guide, use it in conjunction with the Voice JS SDK quickstarts, reference components, and documentation.

## Debugging

The JavaScript SDK exposes a [loglevel](https://github.com/pimterry/loglevel) based logger to allow for runtime logging configuration.

To configure the log level, use the `logLevel` property in the [DeviceOptions](/docs/voice/sdks/javascript/twiliodevice#deviceoptions) object when instantiating a `Twilio.Device` or when calling `device.updateOptions()` on a `Twilio.Device` instance.

The `DeviceOptions.logLevel` value is a number that corresponds to the different levels of logging available:

| `DeviceOptions.logLevel` value | Logging Level |
| ------------------------------ | ------------- |
| `logLevel: 0`                  | "TRACE"       |
| `logLevel: 1`                  | "DEBUG"       |
| `logLevel: 2`                  | "INFO"        |
| `logLevel: 3`                  | "WARN"        |
| `logLevel: 4`                  | "ERROR"       |
| `logLevel: 5`                  | "SILENT"      |

Below are examples for how to enable "DEBUG" level logging when instantiating a `Twilio.Device` and when calling `device.updateOptions()`.

```javascript
// when instantiating a Twilio.Device

const device = new Twilio.Device (token, { logLevel: 1 });


// when calling device.updateOptions()

const deviceOptions = {
  logLevel: 1
}

device.updateOptions(deviceOptions);
```

## Give users feedback when device state changes

The JavaScript SDK relies on events following the [EventEmitter interface](https://nodejs.org/api/events.html#events_class_eventemitter) to control the calling experience. Alerting the user to an incoming call requires listening for the `Device.on('incoming')` event, for example. Similarly, the SDK also provides events for monitoring the `Device` and `Call` states.

Surfacing changes in the `Device` and `Call` states to the UI using these events can often be the difference between a smooth calling experience and an extremely frustrating one. Important events to listen for include the following:

### Device is ready for calls: .on('registered', handler)

The `Device.on('registered')` event is fired once the Device has been successfully setup using a valid [access token](/docs/iam/access-tokens) and is registered to receive incoming calls (note that the voice client can still make outbound calls if it is not registered). Use this event to change a UI element, like a status indicator for example. This ensures the user is aware that your application is online and ready to start making and receiving calls.

### Device is not available for calls: .on('unregistered', handler)

Similarly, it's important to notify the user if your application goes offline at any point of time. Use the Device.on('unregistered') event to change the status indicator to offline to alert the user. This event is triggered if the connection to Twilio drops for some reason or if the access token expires. You should also use this event to attempt to reconnect using `Device.register()`.

### Something's wrong: .on('error', handler)

Handling this event allows you to catch and handle device errors gracefully. You can see the list of errors surfaced by this handler [here](/docs/voice/sdks/error-codes). Some commonly encountered errors are:

* Errors with the access token, either due to expiration or invalidation. To avoid access token expiration, you can implement code to automatically refresh your app's access token.
* The user denying your application access to the microphone. You can use this to disable the call button and instruct the user to provide microphone access.

## Gracefully handle no-answer situations

It's also important to gracefully handle situations where a call to the voice client goes unanswered despite it being online. How to handle this depends on how the voice client is brought into the call:

### Using \<Dial>

Incoming calls can be connected to the voice client using the `<Dial>` verb's [\<Client>](/docs/voice/twiml/client) noun. In this case, you should set the [timeout](/docs/voice/twiml/dial#timeout) attribute to a value that works best for your use case. You should also configure an action URL using the [action](/docs/voice/twiml/dial#action) attribute. Twilio will make a request to this URL with these [parameters](/docs/voice/twiml/dial#dial-attributes) once the call is concluded, and will include information the outcome of the call (whether it was answered or not answered).

### Using the REST API

You can also use the REST API to bring a voice client into a call. This is involves first [making an outbound call](/docs/voice/tutorials/how-to-make-outbound-phone-calls) to the client. When the client picks up, the `Url` parameter retrieves TwiML that is used to set up the call. It's important to set a `Timeout` on the API request that works best for your use case. Note that the max is 60 seconds for calls made to the voice client. Be sure to configure a status callback URL using the `StatusCallback` parameter and specify the call progress event webhooks using the `StatusCallbackEvent` parameter. This ensures your application knows the outcome of the call.

If the call outcome in both situations is no-answer, it's important this is conveyed to the caller. One way to do this is by directing them to voicemail. You can use the [\<Record>](/docs/voice/twiml/record) verb to set up voicemail. If the call is unanswered, the caller is directed to TwiML that uses the `<Record>` verb to leave a voicemail.

## Working with microphones and getUserMedia

The SDK will automatically choose the default input and output devices when placing or receiving calls. However, we recommend asking for device permissions before creating the device object to avoid problems at call connect or accept time e.g. hardware issues or permissions related issues. The following code snippet demonstrates how to do this.

```javascript
// Call getUserMedia to ask for device permission and populate the device labels.
// Also, performing this action here allows for capturing gUM (getUserMedia) errors early
// before accepting/receiving a call and it's possible to create a much better user experience.
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

// Calling getUserMedia will start the media track selected.
// This is not desired as the user may get the impression the mic is in use.
// Therefore, we want to avoid having tracks started when they're not needed.
// We only wanted to get the input device list so we stop the tracks immediately.
stream.getTracks().forEach(track => track.stop());

// Create device object using your token and desired options.
const device = new Device(token, options);
device.register();

// Our example UI is a Dropdown that shows the available input devices (microphones).
// The user can select the input device.
const micOptions = document.createElement('select');
micOptions.addEventListener('change', () => {
  device.audio.setInputDevice(micOptions.value);
});

// Update UI with the updated list of available devices.
const updateMicOptions = () => {
  micOptions.innerHTML = '';
  device.audio.availableInputDevices.forEach(d => {
    const option = document.createElement('option');
    option.value = d.deviceId;
    option.innerText = d.label;
    micOptions.appendChild(option);
  });
};

// Populate the dropdown once registered.
device.on('registered', () => updateMicOptions());

// We want to detect if the device list changes e.g. a headset was plugged in/out.
// We set up handlers to update our dropdown list with the new device list
// Subscribe to the event for when the list of devices changes
device.audio.on('deviceChange', () => updateMicOptions());

```

If there is more than one input device available, you might need to select an input device.

Calling `device.audio.setInputDevice` sets the stream for current and
future calls and will not release it automatically.

While this behavior isn't an issue, it results in the application
holding onto the input device, and the application may show a red
"recording" symbol in the browser tab.

To remove the red "recording" symbol, you must release the device. To
release it, call `device.audio.unsetInputDevice` after the call
disconnects. Note that after calling `device.audio.unsetInputDevice`
future calls use the default input device.

Consider application logic that keeps track of the user-selected device
and calls `device.audio.setInputDevice` before calling `device.connect()`
for outgoing calls and `call.accept()` for incoming calls. Furthermore,
consider calling `device.audio.unsetInputDevice` once a call is
disconnected. See the following example:

```ts
import { Device } from '@twilio/voice-sdk';
let inputDeviceId = ...;
const device = new Device(...);

async function makeOutgoingCall() {
  await device.audio.setInputDevice(inputDeviceId);
  const call = await device.connect(...);

  call.on('disconnect', async () => {
    inputDeviceId = ... // save the current input device id
    await device.audio.unsetInputDevice();
  });
}

async function acceptIncomingCall(incomingCall) {
  await device.audio.setInputDevice(inputDeviceId);
  await incomingCall.accept();

  incomingCall.on('disconnect', async () => {
    inputDeviceId = ... // save the current input device id
    await device.audio.unsetInputDevice();
  });
}
```

## Monitor call quality with Voice Insights

Voice Insights for Twilio Voice SDKs provides call quality analytics for client calls. It provides a [REST API](/docs/voice/voice-insights/api) for retrieving historical call quality statistics such as jitter, Mean Opinion Socre (MoS) and packet loss. It also provides a component in the [JavaScript SDK](/docs/voice/voice-insights/api/call/details-sdk-call-quality-events) that fires events when call quality drops below acceptable thresholds. This can be used to notify the user in real time about issues with call quality.

Voice Insights fires two types of events on the front end: network warnings and audio level warnings.

* **Network warnings** are fired when there is a reduction in call quality as indicated by three measures - round trip time or RTT, mean opinion score or MOS, jitter, and packet loss.
* **Audio level events** are fired when Insights detects unchanged audio levels. While these could indicate an issue, they usually indicate that the audio has been muted on the microphone or input device.

By implementing handlers for these events and surfacing them in the UI, you can notify the user about degradation in call quality or issues with audio input. This can be used to prompt the user to take remedial action like checking their internet connection or input device audio.

Implementing Voice Insights for Twilio Voice SDKs can also make troubleshooting issues a lot easier. The Voice Insights [dashboard](https://www.twilio.com/console/voice/insights) in the console provides aggregate call quality metrics across all calls, and can be filtered to just voice client calls. This is useful in seeing trends in your call quality stats. For example, you could see that client calls with a particular browser version are seeing more issues with quality. It also records call setup events, allowing you to diagnose issues with call connection. The same data is also made available for individual calls.

You can [learn more about Voice Insights](/docs/voice/voice-insights) by checking out the docs.

## Manage the calling environment

VoIP call quality is heavily influenced by environmental factors like firewall configuration, network conditions and available bandwidth, browser version (for webRTC) and OS and microphone and speaker hardware. It's important you review our [deployment best practices](https://help.twilio.com/hc/en-us/articles/223133127-What-are-Twilio-Client-s-Deployment-Best-Practices-) and [connectivity requirements documentation](https://help.twilio.com/hc/en-us/articles/223180888-What-are-Twilio-Client-s-network-connectivity-requirements-) before taking your app to production.

If possible, you should also take advantage of the [DSCP](https://en.wikipedia.org/wiki/Differentiated_services) support enabled in the Voice JavaScript SDK version 1.3 onwards. DSCP, or Differentiated Services Code Point, allows packets to be tagged to prioritize them on the network. Browsers that support DSCP are capable of tagging call media packets sent by the voice client in this manner. Your router or network element can then use these tags to prioritize call media packets over other traffic on the network. Also, note that your router or network element needs to be DSCP-compliant.

DSCP is currently supported only by Google Chrome. For help setting DSCP on a Windows machine, please see [this Zendesk article](https://support.zendesk.com/hc/en-us/articles/115005468288-Talk-network-requirements).

## Use the closest Twilio data center

Twilio has a global presence with data centers around the world; [see the full list of locations here](/docs/global-infrastructure/edge-locations). Connecting to edge locations minimizes latency by allowing your Twilio client device to connect to the closest point of presence. There are two ways you can set up your Client to connect to Twilio:

* **Use Twilio's Global Low Latency routing** to let Twilio use latency-based DNS lookups to pick the closest data center. You can do this by omitting the `edge` parameter while creating the device.
* **Force edge selection by using the `edge` parameter.** You can find the list of edges and their IP addresses [here](/docs/global-infrastructure/edge-locations). This approach makes sense if all Twilio Voice clients are going to be based in the same edge location. You can instantiate the device with the `edge` parameter or use `device.updateOptions` to set the edge.

## Keep AccessTokens up to date

The Voice JavaScript SDK provides three features to help keep your AccessTokens up to date.

1. [The device.updateToken() method](/docs/voice/sdks/javascript/twiliodevice#deviceupdatetokentoken)
2. The ['tokenWillExpire' event](/docs/voice/sdks/javascript/twiliodevice#tokenwillexpire-event) emitted by the `Twilio.Device` instance

   * By default, this event will be emitted 10 seconds (10000 milliseconds) before the AccessToken expires, but you can configure this behavior with the `DeviceOptions.tokenRefreshMs` property.
3. The [DeviceOptions.tokenRefreshMs property](/docs/voice/sdks/javascript/twiliodevice#deviceoptions)

   * This property allows you to configure how many milliseconds before an AccessToken's expiration the `'tokenWillExpire'` event will be emitted.

As shown in the example below, you can use these three features together to automatically keep an AccessToken up to date.

```javascript
const device = new Device(token, {
  // 'tokenWillExpire' event will be emitted 30 seconds before the AccessToken expires
  tokenRefreshMs: 30000,
});

device.on('tokenWillExpire', () => {
  return getTokenViaAjax().then(token => device.updateToken(token));
});
```

## WebRTC API Overrides

The Voice JavaScript SDK allows you to override WebRTC APIs using the following options and events. If your environment supports WebRTC redirection, such as [Citrix HDX](https://www.citrix.com/solutions/hdx/)'s WebRTC [redirection technologies](https://www.citrix.com/blogs/2019/01/15/hdx-a-webrtc-manifesto/), your application can use this feature for improved audio quality in those environments.

* Device.Options.enumerateDevices
* Device.Options.getUserMedia
* Device.Options.MediaStream
* Device.Options.RTCPeerConnection
* call.on('audio', handler(remoteAudio))

The following code snippet demonstrates how to use the Voice JavaScript SDK to enable Citrix HDX's WebRTC redirection.

```javascript
// Prerequisites:
// - Citrix's UCSDK 3.1.0 or later
// - Twilio Voice JS SDK 2.13.0 or later
// - Proper Citrix VDI environment setup with HDX support


// Before loading the Citrix UCSDK, it is necessary to define a global
// function with the name `getCitrixWebrtcRedir` as required by Citrix's UCSDK.
// The example provided below will always resolve and return `1`,
// indicating the application is always running in a Citrix environment.
// This behavior can be dynamic, and the function should reject if 
// redirection is not supported.
// For further details, refer to the Citrix HDX WebRTC Redirection SDK 
// Documentation. To access Citrix's SDK and its documentation, please 
// contact Citrix directly.
window.getCitrixWebrtcRedir = () => new Promise(res => res(1));

// Load Citrix's UCSDK using RequireJS.
// As of version 3.1.0, Citrix's UCSDK must be loaded via RequireJS.
// Attempting alternative methods, such as using <script> tags or import statements,
// will lead to errors.
require(['./CitrixWebRTC'], async () => {
  // Initialize Citrix's UCSDK
  CitrixWebRTC.initUCSDK('twilio-citrix-partner');

  // Citrix connected/disconnected logs.
  CitrixWebRTC.setVMEventCallback(event => {
    console.log(`Got Citrix VM Event:`, event)
    if (event.event === 'vdiClientConnected') {
      console.log('Citrix webrtc vdiClientConnected');
    } else if ( event.event == 'vdiClientDisconnected') {
      console.log('Citrix webrtc disconnected');
    }
  });

  // Citrix MediaStream override
  class MediaStream {
    constructor() {
      return CitrixWebRTC.createMediaStream();
    }
  }

  // Initialize Twilio Device object using your own token.
  const device = new Twilio.Device(token, {
    // RTCPeerConnection and enumerateDevices needs the UCSDK's scope so we bind them
    RTCPeerConnection: CitrixWebRTC.CitrixPeerConnection.bind(CitrixWebRTC),
    enumerateDevices: CitrixWebRTC.enumerateDevices.bind(CitrixWebRTC),
    // getUserMedia's parameters are needed so we make sure we don't lose them
    getUserMedia: (...args) => CitrixWebRTC.getUserMedia(...args),
    // Citrix MediaStream override
    MediaStream,
    // ... other device options
  });

  let remoteAudio;
  const setupOnAudioElement = call => {
    // Listen for audio event. Triggers when the audio element
    // used for remote audio stream has been created.
    call.on('audio', audioElement => {
      // Remove any previous mapping
      if (remoteAudio) {
        CitrixWebRTC.disposeAudioElement(remoteAudio);
        remoteAudio = null;
      }
      // Map the audio element that was created for
      // remote audio stream as soon as it's available
      CitrixWebRTC.mapAudioElement(audioElement);
      remoteAudio = audioElement;
    });
  };

  // If making outgoing calls
  const call = await device.connect({
    rtcConfiguration: {
      // Needs explicit sdpSemantics and enableDtlsSrtp
      sdpSemantics: 'unified-plan',
      enableDtlsSrtp: true,
    },
    // params: ... your other params if necessary
  });
  setupOnAudioElement(call);

  // For incoming calls
  device.on('incoming', call => {
    setupOnAudioElement(call);
    call.accept({
      rtcConfiguration: {
        // Needs explicit sdpSemantics and enableDtlsSrtp
        sdpSemantics: 'unified-plan',
        enableDtlsSrtp: true,
      }
    });
  });
});

```

## Setting WebRtcIPHandling in Chrome

Before connecting a Voice SDK call, the browser selects a pair of IP addresses ([RTCIceCandidatePair](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidatePair)) suitable for establishing an audio connection with Twilio. These IP address pairs are selected from the list of network interfaces available to the device. In cases of network interruptions, the browser might try to use a new local address from a network interface while the call is in progress. Although rare, this can cause one-way audio where one call participant can't hear the other. This risk increases with the number of network interfaces on the device.

To reduce the likelihood of such issues, use the [WebRtcIPHandling](https://chromeenterprise.google/policies/#WebRtcIPHandling) setting available in Chrome Enterprise. This ensures that the browser only uses the best available network interfaces. The optimal setting depends on specific use cases, but to avoid using private interfaces for local addresses, use the `default_public_interface_only` value.
