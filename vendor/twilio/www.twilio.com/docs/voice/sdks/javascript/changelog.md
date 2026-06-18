# Voice JavaScript SDK: Changelog

> \[!WARNING]
>
> If you are upgrading to version 2.3.0 or later and have firewall rules or network configuration that blocks any unknown traffic by default, you need to update your configuration to allow connections to the new DNS names and IP addresses. Please refer to this [changelog](/docs/voice/sdks/javascript/changelog#230-january-23-2023) for more details.

## 2.18.2 (April 21, 2026)

### Bug Fixes

* Fixed an issue where multiple PeerConnections are created when `device.connect()` is called multiple times.
* Fixed an issue where the `docs:ts` build fails when the repository is inside a monorepo or workspace due to TypeDoc picking up conflicting `@types` from parent `node_modules`. Thanks @taf2 for your [contribution](https://github.com/twilio/twilio-voice.js/pull/416).

## 2.18.1 (March 17, 2026)

### Bug Fixes

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/406) where `Device` constructor registers deprecated unload event listener, causing Permissions Policy violation in Chrome 146+. Thanks @lorandcompany for your [contribution](https://github.com/twilio/twilio-voice.js/pull/407).

## 2.18.0 (January 5, 2026)

### Improvements

Previously, the SDK relied solely on a backoff mechanism when reconnecting the signaling connection. With this update, the SDK will use a server-provided `Retry-After` value, if available, when a connection attempt is rejected.

## 2.17.0 (December 1, 2025)

### New features

#### Remote audio processor APIs

In version 2.9.0, the SDK introduced the Audio Processor API, which allows you to access the raw audio input and modify audio data before the SDK sends it to Twilio. This release also extends these capabilities to remote audio streams, enabling developers the ability to modify audio before it is played through the speaker.

With these enhancements, you can implement the following client-side audio use cases:

* Background noise removal using any noise cancellation library of your choice
* Custom audio filters
* AI-powered audio classification
* Additional audio processing capabilities

For more information, see [Twilio Audio Processor](/docs/voice/sdks/javascript/twilioaudioprocessor).

**Example**

```ts
import { AudioProcessor, Device } from '@twilio/voice-sdk';

class OutputAudioProcessor implements AudioProcessor {
  async createProcessedStream(stream: MediaStream): Promise<MediaStream> {
    // Implementation 
  }

  async destroyProcessedStream(stream: MediaStream): Promise<void> {
    // Cleanup
  }
}

const processor = new OutputAudioProcessor();
const device = new Device(token, options);

// Pass “true” as second argument to apply processor to remote output audio stream
await device.audio.addProcessor(processor, true);
// To remove it later:
// device.audio.removeProcessor(processor, true);
```

## 2.16.0 (September 25, 2025)

### ECMAScript Module Support GA

The SDK includes ESM support by default and considered Generally Available (GA). It should work with the standard import:

```typescript
import { Device } from '@twilio/voice-sdk';
```

### Changes

* Removed support for the deprecated Plan-B SDP semantics.
* Removed outdated tests.

## 2.15.0 (July 14, 2025)

### Changes

* Replaced SDP munging with the [setCodecPreferences](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpTransceiver/setCodecPreferences) API for setting preferred codecs in the SDK.

## 2.14.0 (June 25, 2025)

### Changes

* Upgraded Typescript dependency to 5.x.
* Replaced Karma test runner with Cypress.
* Added `@types/events` as a dependency. This resolves issues regarding missing Intellisense hinting for SDK objects that extend EventEmitters.

### Bug Fixes

* Fixed `md5` and `rtcpeerconnection-shim` build warnings (as reported in this [Github Issue](https://github.com/twilio/twilio-voice.js/issues/260)) when using the Twilio Voice JS SDK in an Angular webapp. See our [Common Issues document](https://github.com/twilio/twilio-voice.js/blob/master/COMMON_ISSUES.md#build-warnings-with-angular) for more information.

## 2.13.0 (May 6, 2025)

### New Features

In version `2.5.0`, the SDK introduced a mechanism to override WebRTC APIs, enabling support for redirection technologies like [Citrix HDX](https://www.citrix.com/solutions/vdi-and-daas/hdx/what-is-hdx.html). In this release, the SDK extends this capability by allowing the override of the native [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) API, making it possible to create custom media streams tailored for such environments. See [WebRTC API Overrides](/docs/voice/sdks/javascript/best-practices#webrtc-api-overrides) for an example.

## 2.12.4 (March 12, 2025)

### Bug Fixes

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/309) where `device.destroy()` did not work for Chrome Extension Manifest V3.
* Addressed an issue where the `publisher` was `null` upon destruction of an `AudioProcessorObserver`.

### Changes

* Added an API for testing `PreflightTest` in realms other than production. You can now pass `chunderw` and `eventgw` values within the options object when constructing a `PreflightTest`. Note: These new options are intended for internal testing by Twilio employees only, and should not be used otherwise.

## 2.12.3 (December 3, 2024)

### Bug Fixes

* Fixed an issue where the `originalError` property is not populated when a general `ConnectionError (31005)` happens.

## 2.12.2 (November 12, 2024)

### Bug Fixes

* Fixed an issue where the `chunderw` parameter is not being used during signaling reconnection. Note that this parameter is intended solely for testing purposes.

## 2.12.1 (August 30, 2024)

### Bug Fixes

* Fixed an issue where calling `device.connect()` without waiting for the promise to get resolved, then calling `device.audio.setInputDevice()` right away results in an `AcquisitionFailedError`.

## 2.12.0 (August 26, 2024)

### New Features

#### Call Message Events

The Call Message Events, originally released in 2.2.0, has been promoted to GA. This release includes the following **breaking changes**.

* [Call.Message.messageType](/docs/voice/sdks/javascript/twiliocall#callsendmessagemessage) has been converted from `Call.MessageType` enum to `string`.
* Call Message related errors are now emitted via [call.on('error', handler(twilioError))](/docs/voice/sdks/javascript/twiliocall#error-event) instead of [device.on('error', handler(twilioError))](/docs/voice/sdks/javascript/twiliodevice#error-event).
* A new error, [31210](/docs/api/errors/31210), has been added to the SDK. This new error is emitted via [call.on('error', handler(twilioError))](/docs/voice/sdks/javascript/twiliocall#error-event) after calling the [sendMessage](/docs/voice/sdks/javascript/twiliocall#callsendmessagemessage) API with an invalid [Call.Message.messageType](/docs/voice/sdks/javascript/twiliocall#callsendmessagemessage).
* Fixed an issue where the wrong error code `31209` is raised if the payload size of a Call Message Event exceeds the authorized limit. With this release, `31212` is raised instead.

## 2.11.3 (August 21, 2024)

### Bug Fixes

* Fixed an issue where `PreflightTest` throws an error when `RTCIceCandidateStatsReport` is not available. Thanks to @phi-line for your [contribution](https://github.com/twilio/twilio-voice.js/pull/280).

### Improvements

* The SDK now updates its internal device list when microphone permissions change.

## 2.11.2 (June 26, 2024)

### Bug Fixes

* Fixed an issue where an `AcquisitionFailedError` is raised when making a call while a `setInputDevice` invocation is still in progress. The following snippet will reproduce the issue in versions \<2.11.2:

```js
// Call setInputDevice without waiting for it to resolve e.g. using 'await'
device.audio.setInputDevice(id);

// Calling device.connect immediately raises an AcquisitionFailedError error
device.connect(...);
```

## 2.11.1 (May 30, 2024)

### Bug Fixes

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/256) where the input stream stops working after changing the default input device. Thanks @varunm0503 for your [contribution](https://github.com/twilio/twilio-voice.js/pull/267).
* Fixed an echo [issue](https://github.com/twilio/twilio-voice.js/pull/239) where the audio output is duplicated after the device permission is granted. Thanks @kmteras for your [contribution](https://github.com/twilio/twilio-voice.js/pull/239).

## 2.11.0 (May 2, 2024)

### New Features

### Chrome Extensions Manifest V3 Support

In Manifest V2, [Chrome Extensions](https://developer.chrome.com/docs/extensions) had the capability to run the Voice JS SDK in the background for making calls. However, with the introduction of [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), running the Voice JS SDK in the background is now possible only through service workers. Service workers lack access to certain features, such as DOM, `getUserMedia`, and audio playback, making it impossible to make calls with previous versions of the SDK.

This new release enables the SDK to run in a service worker context, allowing it to listen for incoming calls or initiate outgoing calls. Once a call object is created, it can be forwarded to an [offscreen document](https://developer.chrome.com/docs/extensions/reference/api/offscreen), where the SDK gains access to all necessary APIs to fully establish and interact with the call. For implementation details, refer to our [example](https://github.com/twilio/twilio-voice.js/tree/master/extension).

### Client side incoming call forwarding and better support for simultaneous calls

Previous versions of the SDK supported simultaneous outgoing and incoming calls using different [identities](/docs/iam/access-tokens#step-3-generate-token). If an incoming call was received while the `Device` with the same identity was busy, the active call had to be disconnected before accepting the incoming call. With this SDK release, multiple incoming calls for the same identity can be accepted, muted, or put on hold, without disconnecting any existing active calls. This is achieved by forwarding the incoming call to a different `Device` instance. Below are the new APIs and an example for more details.

#### New APIs

* [Call.connectToken](/docs/voice/sdks/javascript/twiliocall#callconnecttoken)
* [ConnectOptions.connectToken](/docs/voice/sdks/javascript/twiliodevice#connecttoken)

#### Example

```js
// Create a Device instance that handles receiving all incoming calls for the same identity.
const receiverDevice = new Device(token, options);
await receiverDevice.register();

receiverDevice.on('incoming', (call) => {
  // Forward this call to a new Device instance using the call.connectToken string.
  forwardCall(call.connectToken);
});

// The forwardCall function may look something like the following.
async function forwardCall(connectToken) {
  // For each incoming call, create a new Device instance for interaction
  // without affecting other calls.
  // IMPORTANT: The token for this new Device needs to have the same identity
  // as the token used in the receiverDevice.
  const device = new Device(token, options);
  const call = await device.connect({ connectToken });

  // Destroy the Device after the call is completed
  call.on('disconnect', () => device.destroy());
}
```

## 2.10.2 (February 14, 2024)

### Bug Fixes

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/67) where an error is thrown when `rtcConstraints` parameter is provided.
* Fixed an issue ([#118](https://github.com/twilio/twilio-voice.js/issues/118), [#210](https://github.com/twilio/twilio-voice.js/issues/210)) where certain calls are not ended right away after a page refresh.

## 2.10.1 (January 12, 2024)

### Bug Fixes \[#bug-fixes-2]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/231) where `device.register()` does not return a promise rejection when the WebSocket fails to connect. Thank you @kamalbennani for your [contribution](https://github.com/twilio/twilio-voice.js/pull/232).
* Fixed an issue where audio processor insights events are not generated if there is an existing processed stream at the start of a call.

## 2.10.0 (January 5, 2024)

### Improvements

* Added tags to client logs for easier filtering
* Added log statements to API calls and events for debugging purposes

### Bug Fixes \[#bug-fixes-3]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/33) where updating token after signaling connection has gone offline causes an Invalid State error.
* Fixed an issue where `Device.Options.logLevel` is only accepting a `number` type. With this release, `strings` are now also allowed. See [Device.Options.logLevel](https://twilio.github.io/twilio-voice.js/interfaces/Device.Options.html#loglevel) for a list of possible values.
* Fixed an [issue](https://github.com/twilio/twilio-voice.js/pull/218#issuecomment-1832496953) where `call.mute()` does not have an effect while the `call.status()` is either `ringing` or `connecting`. Thank you @zyzmoz for your [contribution](https://github.com/twilio/twilio-voice.js/pull/218).

## 2.9.0 (November 28, 2023)

### New Features

#### Audio Processor APIs

The SDK now includes Audio Processor APIs, enabling access to raw audio input and the ability to modify audio data before sending it to Twilio. With this new feature, the following use cases can now be achieved on the client side:

* Background noise removal using a noise cancellation library of your choice
* Music playback when putting the call on hold
* Audio filters
* AI audio classification
* ... and more!

Please visit this [page](/docs/voice/sdks/javascript/twilioaudioprocessor) for more details about the Audio Processor APIs.

## 2.8.0 (October 16, 2023)

### New Features \[#new-features-2]

Added a new feature flag `enableImprovedSignalingErrorPrecision` to enhance the precision of errors emitted by `Device` and `Call` objects.

```js
const token = ...;
const device = new Device(token, {
    enableImprovedSignalingErrorPrecision: true,
});
```

The default value of this option is `false`.

When this flag is enabled, some errors that would have been described with a generic error code are now described with a more precise error code. With this feature, the following errors now have their own error codes. Please see this [page](/docs/api/errors) for more details about each error.

**Device Error Changes**

```js
const device = new Device(token, {
    enableImprovedSignalingErrorPrecision: true,
});
device.on('error', (deviceError) => {
    // the following table describes how deviceError will change with this feature flag
});
```

| Device Error Name                                                | Device Error Code with Feature Flag Enabled | Device Error Code with Feature Flag Disabled |
| ---------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| `GeneralErrors.ApplicationNotFoundError`                         | `31001`                                     | `53000`                                      |
| `GeneralErrors.ConnectionDeclinedError`                          | `31002`                                     | `53000`                                      |
| `GeneralErrors.ConnectionTimeoutError`                           | `31003`                                     | `53000`                                      |
| `MalformedRequestErrors.MissingParameterArrayError`              | `31101`                                     | `53000`                                      |
| `MalformedRequestErrors.AuthorizationTokenMissingError`          | `31102`                                     | `53000`                                      |
| `MalformedRequestErrors.MaxParameterLengthExceededError`         | `31103`                                     | `53000`                                      |
| `MalformedRequestErrors.InvalidBridgeTokenError`                 | `31104`                                     | `53000`                                      |
| `MalformedRequestErrors.InvalidClientNameError`                  | `31105`                                     | `53000`                                      |
| `MalformedRequestErrors.ReconnectParameterInvalidError`          | `31107`                                     | `53000`                                      |
| `SignatureValidationErrors.AccessTokenSignatureValidationFailed` | `31202`                                     | `53000`                                      |
| `AuthorizationErrors.NoValidAccountError`                        | `31203`                                     | `53000`                                      |
| `AuthorizationErrors.JWTTokenExpirationTooLongError`             | `31207`                                     | `53000`                                      |
| `ClientErrors.NotFound`                                          | `31404`                                     | `53000`                                      |
| `ClientErrors.TemporarilyUnavilable`                             | `31480`                                     | `53000`                                      |
| `ClientErrors.BusyHere`                                          | `31486`                                     | `53000`                                      |
| `SIPServerErrors.Decline`                                        | `31603`                                     | `53000`                                      |

**Call Error Changes**

```js
const device = new Device(token, {
    enableImprovedSignalingErrorPrecision: true,
});
const call = device.connect(...);
call.on('error', (callError) => {
    // the following table describes how callError will change with this feature flag
});
```

| Call Error Name                            | Call Error Code with Feature Flag Enabled | Call Error Code with Feature Flag Disabled |
| ------------------------------------------ | ----------------------------------------- | ------------------------------------------ |
| `GeneralErrors.ConnectionDeclinedError`    | `31002`                                   | `31005`                                    |
| `AuthorizationErrors.InvalidJWTTokenError` | `31204`                                   | `31005`                                    |
| `AuthorizationErrors.JWTTokenExpiredError` | `31205`                                   | `31005`                                    |

***IMPORTANT:** If your application logic currently relies on listening to the
generic error code `53000` or `31005`, and you opt into enabling the feature
flag, then your application logic needs to be updated to anticipate the new error code when any of the above errors happen.*

## 2.7.3 (October 6, 2023)

### Bug Fixes \[#bug-fixes-4]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/163) where, sometimes a TypeError is raised while handling an incoming call under the following circumstances:
  * Network interruptions
  * updating the token before accepting the call

## 2.7.2 (September 21, 2023)

*Updated November 1, 2023*

*We have identified an issue on Chromium-based browsers running on MacOS 14 (Sonoma) where the audio deteriorates during a call. This issue happens due to the excessive calls to MediaDevices: enumerateDevices() API. With this release, the SDK calls this API only when necessary to avoid audio deterioration.*

### Changes

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/197) where audio in the Chrome browser is choppy when another application is also using the audio devices.
* Added missing documentation for the following events:
  * `call.on('ringing', handler)`
  * `call.on('warning', handler)`
  * `call.on('warning-cleared', handler)`
  * `device.on('destroyed', handler)`

## 2.7.1 (August 3, 2023)

### Bug Fixes \[#bug-fixes-5]

* Fixed an issue where `call.sendMessage()` API throws an error if the SDK is imported as an [ECMAScript Module (ESM)](https://nodejs.org/api/esm.html) using the `@twilio/voice-sdk/esm` path.

## 2.7.0 (August 1, 2023)

### ECMAScript Module Support

Currently, the SDK is imported as a [CommonJS Module (CJS)](https://nodejs.org/api/modules.html) using the root path `@twilio/voice-sdk`. With this release, the SDK contains an **experimental feature** that allows it to be imported as an [ECMAScript Module (ESM)](https://nodejs.org/api/esm.html) using the `@twilio/voice-sdk/esm` path. As this is an experimental feature, some frameworks using bundlers like `Vite` and `Rollup` may not work. Full support for ESM will be available in a future release and will become the default import behavior of the SDK.

Example:

```js
import { Device } from '@twilio/voice-sdk/esm';
```

## 2.6.1 (July 7, 2023)

### Changes \[#changes-2]

* Fixed some security vulnerabilities shown by `npm audit`.
* Removed unused dependencies.
* Replaced deprecated dependencies.

### Bug Fixes \[#bug-fixes-6]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/178) where calling `device.updateOptions` would reset the `device.audio._enabledSounds` state.
* Fixed an issue where custom DTMF sounds would not play. With this release, custom DTMF sounds should now play when configured during device initialization.

```js
const device = new Device(token, {
  sounds: {
    dtmf8: 'http://example.com/8_button.mp3',
    // Other custom sounds
  },
  // Other options
});
```

## 2.6.0 (June 20, 2023)

### Changes \[#changes-3]

* The SDK now builds on NodeJS versions 16 and above without the `--legacy-peer-deps` flag.
* Removed usage of NodeJS modules from the SDK and some dependencies. With this change, the SDK should now work with some of the latest frameworks that use the latest versions of bundlers such as Vite and Webpack.
* The AudioPlayer dependency has been incorporated into the SDK as part of a migration. This change fixes an issue where source maps are not properly loaded.
* Removed unnecessary files from the generated npm package.
* Links to source maps are now included in the generated npm package.
* The `ws` package has been moved to `devDependencies`.
* The SDK no longer depends on the `xmlhttprequest` npm package.

## 2.5.0 (May 9, 2023)

### New Features \[#new-features-3]

#### WebRTC API Overrides (Beta)

*Updated: This is now GA as of December 14, 2023*

The SDK now allows you to override WebRTC APIs using the following options and events. If your environment supports WebRTC redirection, such as [Citrix HDX](https://www.citrix.com/solutions/vdi-and-daas/hdx/what-is-hdx.html)'s WebRTC [redirection technologies](https://www.citrix.com/blogs/2019/01/15/hdx-a-webrtc-manifesto/), your application can use this new *beta* feature for improved audio quality in those environments.

* [Device.Options.enumerateDevices](https://twilio.github.io/twilio-voice.js/interfaces/Device.Options.html#enumeratedevices)
* [Device.Options.getUserMedia](https://twilio.github.io/twilio-voice.js/interfaces/Device.Options.html#getusermedia)
* [Device.Options.RTCPeerConnection](https://twilio.github.io/twilio-voice.js/interfaces/Device.Options.html#rtcpeerconnection)
* [call.on('audio', handler(remoteAudio))](https://twilio.github.io/twilio-voice.js/classes/Call.html#audioevent)

## 2.4.0 (April 6, 2023)

### Changes \[#changes-4]

* Updated the description of [Device.updateToken](/docs/voice/sdks/javascript/twiliodevice#deviceupdatetokentoken) API. It is recommended to call this API after [Device.tokenWillExpireEvent](/docs/voice/sdks/javascript/twiliodevice#tokenwillexpire-event) is emitted, and before or after a call to prevent a potential \~1s audio loss during the update process.
* Updated stats reporting to stop using deprecated `RTCIceCandidateStats` - `ip` and `deleted`.

### Bug Fixes \[#bug-fixes-7]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/100) where a `TypeError` is thrown after rejecting a call then invoking `updateToken`.
* Fixed an issue ([#87](https://github.com/twilio/twilio-voice.js/issues/87), [#145](https://github.com/twilio/twilio-voice.js/issues/145)) where the `PeerConnection` object is not properly disposed.
* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/14) where `device.audio.disconnect`, `device.audio.incoming` and `device.audio.outgoing` do not have the correct type definitions.
* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/126) where the internal `deviceinfochange` event is being emitted indefinitely, causing high cpu usage.

## 2.3.2 (February 27, 2023)

### Bug Fixes \[#bug-fixes-8]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/95) where a Twilio error is not returned when microphone access is blocked. Thank you @SiimMardus and @ostap0207 for your [contribution](https://github.com/twilio/twilio-voice.js/pull/143).

## 2.3.1 (February 3, 2023)

### Bug Fixes \[#bug-fixes-9]

* Fixed an [issue](https://github.com/twilio/twilio-voice.js/issues/133) where incoming sound will not stop playing after the call is disconnected. Thank you @kamalbennani for your [contribution](https://github.com/twilio/twilio-voice.js/pull/134).

## 2.3.0 (January 23, 2023)

### Changes \[#changes-5]

This release includes updated DNS names for [Twilio Edge Locations](/docs/global-infrastructure/edge-locations). The Voice JS SDK uses these Edge Locations to connect to Twilio's infrastructure via the parameter `Device.Options.edge`. The current usage of this parameter does not change as the SDK automatically maps the edge value to the new DNS names.

Additionally, you need to update your [Content Security Policies (CSP)](https://github.com/twilio/twilio-voice.js/blob/master/README.md#content-security-policy-csp) if you have it enabled for your application. You also need to update your network configuration such as firewalls, if necessary, to allow connections to the new [DNS names and IP addresses](/docs/voice/sdks/network-connectivity-requirements).

## 2.2.0 (December 5, 2022)

### New Features \[#new-features-4]

#### Call Message Events (Beta)

The SDK can now send and receive custom messages to and from Twilio's backend via the following new `Call` APIs.

* [sendMessage](/docs/voice/sdks/javascript/twiliocall#callsendmessagemessage)
* [messageReceivedEvent](/docs/voice/sdks/javascript/twiliocall#messagereceived-event)
* [messageSentEvent](/docs/voice/sdks/javascript/twiliocall#messagesent-event)

Please visit this [page](/docs/voice/sdks/call-message-events) for more details about this feature. Additionally, please see the following for more information on how to send and receive messages on the server.

* [UserDefinedMessage](/docs/voice/api/userdefinedmessage-resource)
* [UserDefinedMessageSubscription](/docs/voice/api/userdefinedmessagesubscription-resource)

**NOTE:** This feature should not be used with [PII](/docs/glossary/what-is-personally-identifiable-information-pii).

**Example**

```js
const device = new Device(token, options);

const setupCallHandlers = call => {
  call.on('messageReceived', message => messageReceivedHandler(message));
  call.on('messageSent', message => messageSentHandler(message));
};

// For outgoing calls
const call = await device.connect();
setupCallHandlers(call);

// For incoming calls
device.on('incoming', call => setupCallHandlers(call));
await device.register();

// For sending a message
const eventSid = call.sendMessage({
  content: { foo: 'foo' },
  messageType: Call.MessageType.UserDefinedMessage,
});
```

## 2.1.2 (October 26, 2022)

### Bug Fixes \[#bug-fixes-10]

* Fixed an issue where insights data stops getting published after calling `device.updateOptions`.

## 2.1.1 (February 18, 2022)

### Bug Fixes \[#bug-fixes-11]

* Ignoring a call will now properly stop the ringing sound
* NPM versioning has been fixed to specify >=12 rather than exactly 12
* Use DOMException instead of DOMError, which has been deprecated
* Removed npm util from the package, instead favoring native functions

## 2.1.0 (January 6, 2022)

### New Features \[#new-features-5]

#### Signaling reconnection support

The Voice JavaScript SDK now fully supports Call reconnection. If the media connection or signaling websocket is lost, the SDK is able to attempt to reconnect the Call. A Call can now potentially be recovered up to 30 seconds after a media or signaling connection loss.

The `Twilio.Device` will emit a ['reconnecting' event](/docs/voice/sdks/javascript/twiliocall#reconnecting-event) when a connectivity loss occurs, and a ['reconnected' event](/docs/voice/sdks/javascript/twiliocall#reconnected-event) upon successful reconnection.

There exists a limitation such that Signaling Reconnection and Edge Fallback are mutually exclusive. To opt-in to the Signaling Reconnection feature, a new option can be passed to the SDK: `maxCallSignalingTimeoutMs`. If this value is not present in the options object passed to the `Device` constructor, the default value will be `0`. Reconnection can only happen with an up-to-date AccessToken.

> \[!WARNING]
>
> Customers relying on edge fallback, along with a small subset of customers using the `'roaming'` edge, will not automatically benefit from this feature without additional configuration. Go to the [Edge Locations page](/docs/voice/sdks/javascript/edges#edge-fallback-and-signaling-reconnection) for more information.

#### Keep AccessToken up to date with tokenWillExpire event and DeviceOptions.tokenWillExpire

The Voice JavaScript SDK now provides two additional features to help keep your AccessTokens up to date:

1. The `'tokenWillExpire'` event, which will be emitted by the Twilio.Device before its associated AccessToken is set to expire. By default, it will be emitted 10 seconds before the AccessToken's expiration.
2. The `DeviceOptions.tokenRefreshMs` property that can configure the timing of the `'tokenWillExpire'` event.

You can use these new features in conjunction with the `device.updateToken()` method to automatically keep an AccessToken up to date.

In the following example, the `'tokenWillExpire'` event will be emitted 30 seconds (3000 milliseconds) before the AccessToken is set to expire, and the event listener for the `'tokenWillExpire'` event will retrieve a new AccessToken and update the Device's AccessToken with the `device.updateToken()` method.

```javascript
const device = new Device(token, {
  // 'tokenWillExpire' event will be emitted 30 seconds before the AccessToken expires
  tokenRefreshMs: 30000,
});

device.on('tokenWillExpire', () => {
  return getTokenViaAjax().then(token => dev.updateToken(token));
});
```

#### Support for Twilio Regions

The Twilio Voice JavaScript SDK now supports Twilio Regions.

If you are part of the Twilio Regions Pilot and wish to specify a home region when using the Voice JavaScript SDK, you will need to:

1. Create AccessTokens with API Keys and API Key Secrets that are stored in the specified Twilio Region, and include the Region name when creating the AccessToken. See example below.
2. Use an edge location that matches your specified Region when instantiating your `Twilio.Device`.

Below is an example of how you would use the Node.js Helper Library to create AccessTokens for the Voice JavaScript SDK for a Region.

```javascript
const accessToken = const accessToken = new twilio.jwt.AccessToken(
  credentials.accountSid,
  credentials.apiKeySid,
  credentials.apiKeySecret, {
    identity,
    ttl,
    region: 'au1',
  },
);

const grant = new VoiceGrant({
  outgoingApplicationSid: credentials.twimlAppSid,
  incomingAllow: true,
});

accessToken.addGrant(grant);
```

**Note:** The API Key and Secret above *must* be created within the `au1` region. It's recommended that the TwiML App used in the Voice Grant is also created in the same Region.

The example below shows how to pass the `au1`-related edge location to the `Twilio.Device` constructor.

```javascript
const device = new Device(accessToken, {
  edge: 'sydney',
});
```

The new `Twilio.Device.home` accessor will return a string value of the home region of the device instance, given that it successfully connected with Twilio.

> \[!NOTE]
>
> Existing EU customers can now migrate their Voice use-cases to the data center in Ireland to establish data residency within the region. In addition, new customers may now select Ireland as their region of choice for Voice related use cases. There is no additional cost to use the new data center in Ireland. To learn more about Regional Voice in Ireland, check out our [blog post](https://www.twilio.com/blog/expanded-data-protection-options-eu-schrems-ii#ongoing-updates-q4) or head over to our [Global Infrastructure docs](/docs/global-infrastructure) to get started.

#### Device.identity

The Voice JavaScript SDK now exposes a `Twilio.Device.identity` accessor.

Given that a `Twilio.Device` has registered successfully with Twilio, the `Twilio.Device.identity` accessor will return a read-only string containing the `identity` that was passed to the AccessToken used to instantiate the `Twilio.Device`.

### Fixes

* Updated `ws` version to fix a potential security vulnerability
* All event listeners will now be properly cleaned up after calling `Twilio.Device.destroy()`
* When Insights fails to post an event, the SDK now logs a warning rather than an Uncaught Promise Rejection

## 2.0.0 (July 9, 2021)

### Breaking API Changes

#### Device singleton behavior removed

Device must now be instantiated before it can be used. Calling `Device.setup()` will no longer
work; instead, a new `Device` must be instantiated via `new Device(token, options?)`.

#### Connection renamed to Call

As Connection is an overloaded and ambiguous term, the class has been renamed Call to better
indicate what the object represents and be more consistent with Mobile SDKs and our REST APIs.

#### Signaling connection now lazy loaded

`Device.setup()` has been removed, and `new Device(...)` will not automatically begin
connecting to signaling. There is no need to listen for `Device.on('ready')`. Instead,
the signaling connection will automatically be acquired in one of two scenarios:

1. The application calls `Device.connect()`, creating an outbound Call. In this case,
   the state of the signaling connection will be represented in the Call.
2. The application calls `Device.register()`, which will register the client to listen
   for incoming calls at the identity specified in the AccessToken.

##### Note on token expiration

As long as outgoing calls are expected to be made, or incoming calls are expected to be received,
the token supplied to `Device` should be fresh and not expired. This can be done by setting a
timer in the application to call `updateToken` with the new token shortly before the prior
token expires. This is important, because signaling connection is lazy loaded and will fail if
the token is not valid at the time of creation.

Example:

```typescript
const TTL = 600000; // Assuming our endpoint issues tokens for 600 seconds (10 minutes)
const REFRESH_TIMER = TTL - 30000; // We update our token 30 seconds before expiration;
const interval = setInterval(async () => {
  const newToken = await getNewTokenViaAjax();
  device.updateToken(newToken);
}, REFRESH_TIMER);
```

#### Device states changed

The Device states have changed. The states were: `[Ready, Busy, Offline]`. These
have been changed to more accurately and clearly represent the states of the
Device. There are two changes to Device state:

1. The states themselves have changed to `[Registered, Registering, Unregistered, Destroyed]`. This
   removes the idea of "Busy" from the state, as technically the Device can have an active
   Call whether it is registered or not, depending on the use case. The Device will always
   start as `Unregistered`. In this state, it can still make outbound Calls. Once `Device.register()`
   has been called, this state will change to `Registering` and finally `Registered`. If
   `Device.unregister()` is called the state will revert to `Unregistered`. If the signaling
   connection is lost, the state will transition to `Registering` or \`Unregistered' depending
   on whether or not the connection can be re-established.

The `destroyed` state represents a `Device` that has been "destroyed" by calling
`Device.destroy`. The device should be considered unusable at this point and a
new one should be constructed for further use.

2. The busy state has been moved to a Boolean, `Device.isBusy`. This is a very basic
   shortcut for the logic `return !!device.activeConnection`.

#### Device events changed

The events emitted by the `Device` are represented by the `Device.EventName`
enum and represent the new Device states:

```typescript
export enum EventName {
  Destroyed = 'destroyed',
  Error = 'error',
  Incoming = 'incoming',
  Unregistered = 'unregistered',
  Registering = 'registering',
  Registered = 'registered',
}
```

Note that `unregistered`, `registering`, and `registered` have replaced
`offline` and `ready`. Although frequently used to represent connected or disconnected,
`ready` and `offline` actually were meant to represent `registered` and `unregistered`,
which was quite ambiguous and a primary reason for the change.

When the device is destroyed using `Device.destroy`, a `"destroyed"` event will
be emitted.

#### Device usage changes

The construction signature and usage of `Device` has changed. These are the new API signatures:

```typescript
/**
 * Create a new Device. This is synchronous and will not open a signaling socket immediately.
 */
new Device(token: string, options?: Device.Options): Device;

/**
 * Promise resolves when the Device has successfully registered.
 * Replaces Device.registerPresence()
 * Can reject if the Device is unusable, i.e. "destroyed".
 */
async Device.register(): Promise<void>;
/**
 * Promise resolves when the Device has successfully unregistered.
 * Replaces Device.unregisterPresence()
 * Can reject if the Device is unusable, i.e. "destroyed".
 */
async Device.unregister(): Promise<void>;
/**
 * Promise resolves when signaling is established and a Call has been created.
 * Can reject if the Device is unusable, i.e. "destroyed".
 */
async Device.connect(options?: Device.ConnectOptions): Promise<Call>;
```

##### Listening for incoming calls

```typescript
const device = new Device(token, { edge: 'ashburn' });

device.on(Device.EventName.Incoming, call => { /* use `call` here */ });
await device.register();
```

##### Making an outgoing call

```typescript
const device = new Device(token, { edge: 'ashburn' });
const call = await device.connect({ To: 'alice' });
```

#### Device CallOptions and Call AcceptOptions standardized

The arguments for `Device.connect()` and `Call.accept()` have been standardized
to the following options objects:

```typescript
interface Call.AcceptOptions {
  /**
   * An RTCConfiguration to pass to the RTCPeerConnection constructor.
   */
  rtcConfiguration?: RTCConfiguration;

  /**
   * MediaStreamConstraints to pass to getUserMedia when making or accepting a Call.
   */
  rtcConstraints?: MediaStreamConstraints;
}
```

```typescript
interface Device.ConnectOptions extends Call.AcceptOptions {
 /**
  * A flat object containing key\:value pairs to be sent to the TwiML app.
  */
  params?: Record<string, string>;
}
```

Note that these now take a [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) rather than just the audio constraints. For example:

```typescript
device.connect({ To: 'client:alice' }, { deviceId: 'default' });
```

might be re-written as:

```typescript
device.connect({
  params: { To: 'client:alice' },
  rtcConstraints: { audio: { deviceId: 'default' } },
});
```

### Moved to new Error format

For backward compatibility, the new error format was attached to the old format under `error.twilioError`:

```typescript
class oldError extends Error {
  //...
  code: number;
  message: string;
  twilioError: TwilioError;
}
```

The new Error format is:

```typescript
class TwilioError extends Error {
  /**
   * A list of possible causes for the Error.
   */
  causes: string[];

  /**
   * The numerical code associated with this Error.
   */
  code: number;

  /**
   * A description of what the Error means.
   */
  description: string;

  /**
   * An explanation of when the Error may be observed.
   */
  explanation: string;

  /**
   * Any further information discovered and passed along at run-time.
   */
  message: string;

  /**
   * The name of this Error.
   */
  name: string;

  /**
   * The original Error received from the external system, if any.
   */
  originalError?: Error;

  /**
   * A list of potential solutions for the Error.
   */
  solutions: string[];
}
```

#### Affected Error Codes

With the transition, the following error codes have changed:

* 31003 -> 53405 | When ICE connection fails
* 31201 -> 31402 | When getting user media fails
* 31208 -> 31401 | When user denies access to user media
* 31901 -> 53000 | When websocket times out in preflight

### New Features \[#new-features-6]

#### Device Options

Previously, `Device.setup()` could only be used the set options once. Now, we've added
`Device.updateOptions(options: Device.Options)` which will allow changing
the Device options without instantiating a new Device. Note that the `edge` cannot be changed
during an active Call.

Example usage:

```typescript
const options = { edge: 'ashburn' };
const device = new Device(token, options);

// Later...

device.updateOptions({ allowIncomingWhileBusy: true });
```

The resulting (non-default) options would now be:

```typescript
{
  allowIncomingWhileBusy: true,
  edge: 'ashburn',
}
```

This function will throw with an `InvalidStateError` if the Device has been
destroyed beforehand.

#### LogLevel Module

The SDK now uses the [`loglevel`](https://github.com/pimterry/loglevel) module. This exposes
several new features for the SDK, including the ability to intercept log messages with custom
handlers and the ability to set logging levels after instantiating a `Device`. To get an instance
of the `loglevel` `Logger` class used internally by the SDK:

```typescript
import { Logger as TwilioClientLogger } from '@twilio/voice-client-sdk';
...
TwilioClientLogger.setLogLevel('DEBUG');
```

Please see the original [`loglevel`](https://github.com/pimterry/loglevel) project for more
documentation on usage.

### Deprecations

#### Connection Deprecations

* Removed `Connection.mediaStream`. To access the MediaStreams, use `Connection.getRemoteStream()` and `Connection.getLocalStream()`
* Removed `Connection.message` in favor of the newer `Connection.customParameters`. Where `.message` was an Object, `.customParameters` is a `Map`.
* Removed the following private members from the public interface:
  * `Connection.options`
  * `Connection.pstream`
  * `Connection.sendHangup`
* Fixed `Connection.on('cancel')` logic so that we no longer emit `cancel` in response to `Connection.ignore()`.

#### Device Option Deprecations

Some deprecated `Device` options have been removed. This includes:

* `enableIceRestart`
* `enableRingingState`
* `fakeLocalDtmf`

The above three removed options are now assumed `true`. The new `Device.Options` interface is now:

```typescript
export interface Options {
  allowIncomingWhileBusy?: boolean;
  appName?: string;
  appVersion?: string;
  audioConstraints?: MediaTrackConstraints | boolean;
  closeProtection?: boolean | string;
  codecPreferences?: Connection.Codec[];
  disableAudioContextSounds?: boolean;
  dscp?: boolean;
  edge?: string[] | string;
  forceAggressiveIceNomination?: boolean;
  maxAverageBitrate?: number;
  rtcConfiguration?: RTCConfiguration;
  sounds?: Partial<Record<Device.SoundName, string>>;
}
```

### Fixes \[#fixes-2]

#### MOS Calculation Formula

The formula used to calculate the mean-opinion score (MOS) has been fixed for
extreme network conditions. These fixes will not affect scores for nominal
network conditions.

## Version 1.x

For the version 1.x changelog, see [Voice JavaScript SDK v1 changelog](/docs/voice/sdks/javascript/v1/changelog).
