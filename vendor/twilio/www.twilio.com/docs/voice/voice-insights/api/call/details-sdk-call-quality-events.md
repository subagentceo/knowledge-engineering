# Details: Voice Insights SDK Events

Voice Insights enables you to see key events that occur in the lifecycle of a Twilio Voice SDK call. The event log provides events on any state change transitions that occur during a call, warnings seen on deteriorating network quality or audio equipment malfunction, and the events raised when the feedback submitted by the end user. Event log also contains errors seen on connection failures. Connection errors occur when the Twilio SDK fails to connect with Twilio servers. These failures can occur because of severe network degradation or due to a firewall.

The event reference describes each event to give you visibility into the call lifecycle.

* [ERROR and WARNING events](#error-and-warning-events)
  * [Network Warnings](#network-warnings)
  * [Audio Warnings](#audio-warnings)
  * [Connection Warnings](#connection-warnings)
  * [Peer Connection Warnings](#peer-connection-warnings)
  * [ICE Gathering Warnings](#ice-gathering-state-warnings)
  * [ICE Connection Warnings](#ice-connection-warnings)
  * [User Media Errors](#user-media-errors)
  * [Registration Errors](#registration-errors)
* [INFO and DEBUG events](#info-and-debug-events)
  * [Network Warning Cleared events](#network-warning-cleared)
  * [Audio Warning Cleared events](#audio-warning-cleared)
  * [Audio Events](#audio-events)
  * [ICE Connection State Events](#ice)
  * [Signaling State Change Events](#signaling)
  * [User Media Events](#user-media)
  * [Connection Events](#connection)
  * [Peer Connection Events](#peer-connection)
  * [ICE Candidate Events](#ice-candidate)
  * [ICE Gathering State Events](#ice-gathering)
  * [ICE Connection State Events](#ice-connection)
  * [Settings Events](#settings)
  * [Feedback Events](#feedback)
  * [Registration Events](#registration)
  * [Network Change Events](#network-information)

## ERROR and WARNING events

The following events are logged to the Voice Insights system and are also raised as `error` or `warning` events in the SDK.

### Network warnings \[#network-warnings]

The following events are raised when Twilio SDKs detect deteriorating network conditions on the stream received at the SDK sensors from the Twilio media gateway. These events belong to the `network-quality-warning-raised` group.

You can [implement handlers for these events by listening for `#warning` events](/docs/voice/sdks/javascript/twiliocall#warning-event) to show visual indicators that alert the end user to a problem.

| event Name                   | event Level | trigger condition                                           | Description                                                                                                                                                                        |
| :--------------------------- | :---------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `high-rtt`                   | WARNING     | Round Trip Time (RTT) > 400 ms for 3 out of last 5 samples  | Round-trip-time (RTT) is the measure of latency in the network. Higher latency can result in perceptible delays in audio.                                                          |
| `low-mos`                    | WARNING     | Mean Opinion Score (MOS) \< 3.5 for 3 out of last 5 samples | Mean Opinion Score (MOS) is a measure of the overall network conditions that affect call quality.                                                                                  |
| `high-jitter`                | WARNING     | Jitter > 30 ms for 3 out of last 5 samples                  | Jitter is the measure of variability at which packets arrive at the SDK sensors. High jitter can result in audio quality problems on the call, such as crackling and choppy audio. |
| `high-packet-loss`           | WARNING     | Packet loss > 1% in 3 out of last 5 samples                 | Packet loss is measured as the percentage of packets that were sent but not received at the SDK sensors. High packet loss can result in choppy audio or a dropped call.            |
| `high-packets-lost-fraction` | WARNING     | Packet loss > 3% in 7 out of last 10 samples                | A more severe event than merely high-packet-loss. Packet loss can result in choppy audio or a dropped call (Android/iOS SDKs only).                                                |
| `low-bytes-received`         | WARNING     | Bytes received = 0 for three consecutive seconds            | The SDK sensors detect no bytes being received at the SDK (JS SDK only).                                                                                                           |
| `low-bytes-sent`             | WARNING     | Bytes sent = 0 for three consecutive seconds                | The SDK sensors detect no bytes being sent from the SDK (JS SDK only).                                                                                                             |
| `ice-connectivity-lost`      | WARNING     | ICE transitions to `disconnected` state                     | The previously selected ICE connection was lost and renegotiation will be required. (JS SDK only).                                                                                 |

### Audio warnings \[#audio-warnings]

The following events are raised whenever Twilio SDKs detect that the audio level has stayed constant for an unexpected duration. As the participants interact on the call, audio levels vary. Although these events could indicate a problem, constant audio levels could occur when one of the participants has muted their microphone using a hardware mute.

You might find it useful to ask the user if they've mistakenly muted their microphone when these events are raised for an extended period of time.

You can [implement handlers for these events by listening for `#warning` events](/docs/voice/sdks/javascript/twiliocall#warning-event) to show visual indicators that alert the end user to a problem.

The following warning events belong to the `audio-level-warning-raised` group. These are also emitted by the SDK through the event emitter. These warning level events are cleared on any fluctuation in audio levels.

| event Name                    | event Level | trigger condition                                                                                                                                                                                                                                                                                  |
| :---------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constant-audio-input-level`  | WARNING     | Audio input level from the microphone is unchanged for 20 seconds. JS SDK 1.13.0 and later: The most recent ten seconds of volume values are recorded and then analyzed. If the standard deviation of these samples is less than 1% of the maximum audio value, then the warning is raised.        |
| `constant-audio-output-level` | WARNING     | Audio output level from the speakers/headset is unchanged for 20 seconds. JS SDK 1.13.0 and later: The most recent ten seconds of volume values are recorded and then analyzed. If the standard deviation of these samples is less than 1% of the maximum audio value, then the warning is raised. |

Audio errors are also fired when speaker and ringtone devices fail to set (JS SDK only).

| event Name                    | event Level | trigger condition                                                                                                   |
| :---------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `ringtone-devices-set-failed` | ERROR       | Output selection is not supported by the browser, a specified deviceId wasn't found, or no deviceIds were specified |
| `speaker-devices-set-failed`  | ERROR       | Output selection is not supported by the browser, a specified deviceId wasn't found, or no deviceIds were specified |

### Connection warnings \[#connection-warnings]

| event Name        | event Level | trigger condition                                                                                     |
| :---------------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `listening-error` | WARNING     | Raised when an attempt to listen for cancellation has failed (Android/iOS only)                       |
| `error`           | ERROR       | A connection error occurred. Errors can occur due to bad network conditions or due to setup failures. |

### Peer Connection warnings \[#peer-connection-warnings]

The following events are logged as part of the `pc-connection-state group`.

| event Name | event Level | trigger condition                                                                         |
| :--------- | :---------- | :---------------------------------------------------------------------------------------- |
| `failed`   | WARNING     | Raised when one or more of the ICE transports on the connection is in the "failed" state. |

### ICE Gathering State warnings \[#ice-gathering-state-warnings]

These events are logged as part of the `ice-gathering-state` group.

| event Name | event Level | trigger condition                              |
| :--------- | :---------- | :--------------------------------------------- |
| `none`     | WARNING     | Raised when no ICE candidates are gathered.    |
| `timeout`  | WARNING     | Raised when ICE candidate gathering times out. |

### ICE Connection warnings \[#ice-connection-warnings]

The following events belong to the group `ice-connection-state`. These are the standard `RTCPeerConnection.iceConnection` state events as described below. More information on ICE events is available [here](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState):

| event Name | event Level | trigger condition                                                                                                                                                                                                                                       |
| :--------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `failed`   | ERROR       | The ICE candidate has checked all candidates pairs against one another and has failed to find compatible matches for all components of the connection. It is, however, possible that the ICE agent did find compatible connections for some components. |

### User Media Errors \[#user-media-errors]

The following events belong to the `get-user-media` group. These events indicate whether the Voice SDK device was able to access the user's audio microphone.

| event Name | event Level | trigger condition                                                                                                                                                  |
| :--------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `failed`   | ERROR       | Twilio Voice SDK failed to get access to user's media devices. This event is logged if the microphone was not accessible due to other errors on the user's device. |
| `denied`   | ERROR       | The user denied permission to access microphone/speakers, and as a result connection could not be established.                                                     |

### Registration Errors \[#registration-errors]

| event Name                          | event Level | trigger condition                                                                                                                                               |
| :---------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unsupported-cancel-message-error`  | ERROR       | Raised when a "cancel" push notification is processed by the SDK. The version of the SDK does not support "cancel" push notifications.                          |
| `registration-error`                | ERROR       | Raised when registration fails.                                                                                                                                 |
| `unregistration-error`              | ERROR       | Raised when unregistration fails.                                                                                                                               |
| `unregistration-registration-error` | ERROR       | In order to unregister, a registration needs to have been performed. Attempts to unregister a client instance that is not registered will result in this error. |

## INFO and DEBUG events

The following events are logged to the Voice Insights system, but are not raised as `warning` events in the Twilio SDKs.

### Network warning cleared events \[#network-warning-cleared]

When Twilio SDKs detect that network conditions are back to normal, these warnings are cleared. The warning-cleared events belong to the `network-quality-warning-cleared` group.

| event Name         | event Level | trigger condition                                           |
| :----------------- | :---------- | :---------------------------------------------------------- |
| `high-rtt`         | INFO        | Round Trip Time (RTT) \< 400 ms for 3 out of last 5 samples |
| `low-mos`          | INFO        | Mean Opinion Score (MOS) > 3.5 for 3 out of last 5 samples  |
| `high-jitter`      | INFO        | Jitter \< 30 ms for 3 out of last 5 samples                 |
| `high-packet-loss` | INFO        | packet loss \< 3% in 7 out of last 10 samples               |

### Audio warning cleared events \[#audio-warning-cleared]

These belong to the group `audio-level-warning-cleared`.

| event Name                    | event Level | trigger condition                                                              |
| :---------------------------- | :---------- | :----------------------------------------------------------------------------- |
| `constant-audio-input-level`  | INFO        | Raised when audio input level starts varying again after a warning was raised  |
| `constant-audio-output-level` | INFO        | Raised when audio output level starts varying again after a warning was raised |

### Audio Events \[#audio-events]

Audio events are fired when speaker and ringtone devices are set and when a device change is detected (JS SDK only).

| event Name             | event Level | trigger condition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `speaker-devices-set`  | INFO        | speakerDevices set via Twilio.AudioOutputCollection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ringtone-devices-set` | INFO        | ringtoneDevices set via Twilio.AudioOutputCollection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `device-change`        | INFO        | Fired whenever a new audio device is found, an existing audio device is lost or the label of an existing device is changed. This typically happens when the user plugs in or unplugs an audio device, like a headset or a microphone. This will also trigger after the user has given access to user media via getUserMedia for the first time, as the labels will become populated. If you want to allow users to choose a specific audio device in your application's UI, attach a listener to this event. Note that this does not detect a customer plugging in headphones or other speakers through the headphone jack, as the headphone jack only redirects audio from the internal audio device. |

### ICE-Connection-State events \[#ice]

The following events belong to the group `ice-connection-state`. These are the standard `RTCPeerConnection.iceConnection` state events as described below. More information on ICE events is available [here](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState):

| event Name     | event Level | Description                                                                                                                                                                                                                                                                                                                                                                 |
| :------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checking`     | DEBUG       | The ICE agent has been given one or more remote candidates and is checking pairs of local and remote candidates against one another to try to find a compatible match, but has not yet found a pair which will allow the peer connection to be made. It's possible that gathering of candidates is also still underway.                                                     |
| `connected`    | DEBUG       | A usable pairing of local and remote candidates has been found for all components of the connection, and the connection has been established. It's possible that gathering is still underway, and it's also possible that the ICE agent is still checking candidates against one another looking for a better connection to use.                                            |
| `closed`       | DEBUG       | The ICE agent for this RTCPeerConnection has shut down and is no longer handling requests.                                                                                                                                                                                                                                                                                  |
| `completed`    | DEBUG       | The ICE agent has finished gathering candidates, has checked all pairs against one another, and has found a connection for all components.                                                                                                                                                                                                                                  |
| `disconnected` | DEBUG       | Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than `failed` and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the `connected` state. |

### Signaling-State events \[#signaling]

The following events belong to the `signaling-state` group. These are the standard `RTCPeerConnection.signalingState` events as described below.

| event Name             | event Level | Description                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stable`               | DEBUG       | There is no ongoing exchange of offer and answer underway. This may mean that the RTCPeerConnection object is new, in which case both the localDescription and remoteDescription are null; it may also mean that negotiation is complete and a connection has been established. |
| `closed`               | DEBUG       | The connection is closed.                                                                                                                                                                                                                                                       |
| `have-remote-offer`    | DEBUG       | The remote peer has created an offer and used the signaling server to deliver it to the local peer, which has set the offer as the remote description by calling RTCPeerConnection.setRemoteDescription().                                                                      |
| `have-local-offer`     | DEBUG       | The local peer has called RTCPeerConnection.setLocalDescription(), passing in SDP representing an offer (usually created by calling RTCPeerConnection.createOffer()), and the offer has been applied successfully.                                                              |
| `have-remote-pranswer` | INFO        | Android/iOS SDK only                                                                                                                                                                                                                                                            |

More information on Signaling events is available [here](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/signalingState).

### Connection events \[#connection]

The following events belong to the `connection` group. They are logs of the key events that describe the state of the connection between the SDK and Twilio.

| event Name               | event Level | Description                                                                                             |
| :----------------------- | :---------- | :------------------------------------------------------------------------------------------------------ |
| `disconnected-by-local`  | INFO        | The connection was disconnected by the local participant.                                               |
| `incoming`               | INFO        | Twilio Voice SDK received an incoming connection.                                                       |
| `accepted-by-local`      | INFO        | The connection was accepted by the client app.                                                          |
| `accepted-by-remote`     | INFO        | The connection was accepted by the remote participant being called.                                     |
| `disconnected-by-remote` | INFO        | The remote participant initiated the disconnect.                                                        |
| `ignored-by-local`       | INFO        | The incoming connection was ignored by the client.                                                      |
| `unmuted`                | INFO        | The connection was unmuted.                                                                             |
| `muted`                  | INFO        | The connection was muted.                                                                               |
| `rejected-by-local`      | INFO        | An incoming connection was rejected by the local participant.                                           |
| `connected`              | INFO        | (Android and iOS SDK only).                                                                             |
| `outgoing`               | INFO        | (Android and iOS SDK only).                                                                             |
| `ringing`                | INFO        | Indicates the incoming call is ringing (Android and iOS SDK only).                                      |
| `disconnect-called`      | INFO        | (Android and iOS SDK only).                                                                             |
| `outgoing-ringing`       | INFO        | Indicates the outbound call is ringing.                                                                 |
| `listen`                 | INFO        | Raised when an attempt to listen for cancellations is made (Android and iOS SDK only).                  |
| `listening`              | INFO        | Raised when an attempt to listen for cancellations has succeeded(Android and iOS SDK only).             |
| `cancel`                 | INFO        | Raised when a cancellation has been reported.                                                           |
| `reconnecting`           | INFO        | Raised when media connection fails and automatic reconnection has been started by issuing ICE Restarts. |
| `reconnected`            | INFO        | Raised when media connection has been restored which is detected when media starts flowing.             |
| `hold`                   | INFO        | Indicates the call has been put on hold (Android and iOS SDK only).                                     |
| `unhold`                 | INFO        | Indicates the call has been taken off hold (Android and iOS SDK only).                                  |

### Peer Connection events \[#peer-connection]

The following events are logged as part of the `pc-connection-state` group. They indicate key events that describe the state of the peer connection between the SDK and Twilio's WebRTC gateway. (JS SDK Only)

| event Name     | event Level | Description                                                                                                                                                                                                                                                                                  |
| :------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connecting`   | DEBUG       | One or more of the ICE transports are currently in the process of establishing a connection; that is, their RTCIceConnectionState is either "checking" or "connected", and no transports are in the "failed" state.                                                                          |
| `connected`    | DEBUG       | Every ICE transport used by the connection is either in use (state "connected" or "completed") or is closed (state "closed"); in addition, at least one transport is either "connected" or "completed".                                                                                      |
| `disconnected` | DEBUG       | At least one of the ICE transports for the connection is in the "disconnected" state and none of the other transports are in the state "failed", "connecting", or "checking".                                                                                                                |
| `new`          | DEBUG       | At least one of the connection's ICE transports (RTCIceTransports or RTCDtlsTransports) are in the "new" state, and none of them are in one of the following states: "connecting", "checking", "failed", or "disconnected", or all of the connection's transports are in the "closed" state. |
| `closed`       | DEBUG       | The RTCPeerConnection is closed.                                                                                                                                                                                                                                                             |

### ICE Candidate Events \[#ice-candidate]

These events are logged as part of the `ice-candidate` group.

| event Name                    | event Level | Description                                                                                                                                                         |
| :---------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ice-candidate`               | DEBUG       | Raised during ICE gathering process when an ICE candidate is identified.                                                                                            |
| `selected-ice-candidate-pair` | DEBUG       | Shows the transport protocol and [ICE candidate type](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidateType) for both local and remote participants. |

### ICE Gathering State Events \[#ice-gathering]

The events below are logged as part of the `ice-gathering-state` group.

| event Name  | event Level | Description                                                                                                                                                                                                                                                          |
| :---------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `new`       | DEBUG       | Indicates the peer connection was just created and hasn't done any networking yet.                                                                                                                                                                                   |
| `gathering` | DEBUG       | Indicates the ICE agent is in the process of gathering candidates for the connection.                                                                                                                                                                                |
| `complete`  | DEBUG       | Raised when the ICE agent has finished gathering candidates. If something happens that requires collecting new candidates, such as a new interface being added or the addition of a new ICE server, the state will revert to `gathering` to gather those candidates. |

### ICE Connection State Events \[#ice-connection]

The following events are logged as part of the `ice-connection-state` group.

| event Name     | event Level | Description                                                                                                                                                                                                                                                                                                                                                                 |
| :------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connecting`   | DEBUG       | The ICE agent is connecting to the remote candidate.                                                                                                                                                                                                                                                                                                                        |
| `new`          | DEBUG       | The ICE agent is gathering addresses or is waiting to be given remote candidates.                                                                                                                                                                                                                                                                                           |
| `gathering`    | DEBUG       | The ICE agent is gathering candidates.                                                                                                                                                                                                                                                                                                                                      |
| `completed`    | DEBUG       | The ICE agent has finished gathering candidates, has checked all pairs against one another, and has found a connection for all components.                                                                                                                                                                                                                                  |
| `none`         | DEBUG       | No ICE candidates returned.                                                                                                                                                                                                                                                                                                                                                 |
| `timeout`      | DEBUG       | The ICE connection has timed out.                                                                                                                                                                                                                                                                                                                                           |
| `checking`     | DEBUG       | The ICE agent has been given one or more remote candidates and is checking pairs of local and remote candidates against one another to try to find a compatible match, but has not yet found a pair which will allow the peer connection to be made. It's possible that gathering of candidates is also still underway.                                                     |
| `disconnected` | DEBUG       | Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than "failed" and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the "connected" state. |
| `closed`       | DEBUG       | The ICE agent for this RTCPeerConnection has shut down and is no longer handling requests.                                                                                                                                                                                                                                                                                  |
| `connected`    | DEBUG       | A usable pairing of local and remote candidates has been found for all components of the connection, and the connection has been established. It's possible that gathering is still underway, and it's also possible that the ICE agent is still checking candidates against one another looking for a better connection to use.                                            |

### User Media events \[#user-media]

The following events belong to the `get-user-media` group. These events indicate whether the Voice SDK device was able to access the user's audio microphone.

| event Name  | event Level | Description                                                                                                         |
| :---------- | :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `succeeded` | INFO        | Twilio Voice SDK successfully got access to user's media devices. This is perquisite for establishing a connection. |

### Settings events \[#settings]

| event Name | event Level | Description                             |
| :--------- | :---------- | :-------------------------------------- |
| `codec`    | INFO        | Raised when the codec has been selected |

### Feedback events \[#feedback]

The Twilio Voice JavaScript SDK allows users to [rate the quality of each call through its `postFeedback` API.](/docs/voice/sdks/javascript/twiliocall#callpostfeedbackscore-issue) Once feedback has been submitted, you can visualize and analyze the results through the Voice Insights dashboards.

Feedback events belong to the group `feedback`

| event Name      | event Level | Description                                                                                                                                                                                                |
| :-------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `received`      | INFO        | This event is logged when you post feedback to Twilio using the postFeedback API. The event contains the issue-name and the quality-score submitted by the user.                                           |
| `received-none` | INFO        | This event is logged when you call the postFeedback API without any parameters. The event is used to log the instances where you prompted the user for feedback, but the user declined to submit feedback. |

### Registration events (Android & iOS SDKs only) \[#registration]

| event Name       | event Level | Description                                      |
| :--------------- | :---------- | :----------------------------------------------- |
| `registration`   | INFO        | Raised when the client identity is registered.   |
| `unregistration` | INFO        | Raised when the client identity is unregistered. |

### Network Information events (JS SDK only) \[#network-information]

| event Name       | event Level | Description                                                                                                                                                      |
| :--------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `network-change` | INFO        | Experimental feature: [https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) |
