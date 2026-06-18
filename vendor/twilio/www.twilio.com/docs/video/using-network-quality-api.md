# Using the Network Quality API

## Overview

This guide introduces the Network Quality API and provides guidance on how to use it effectively in your Twilio Video applications.

## What is the Network Quality API

In a video application, the perceptual quality experienced by a Participant can be greatly influenced by the network. Degradation of available bandwidth, packet loss, or network jitter may reduce the usability of a video conferencing link causing end user frustration. To tackle this, the Network Quality API monitors the Participant's network and provides quality metrics.
Displaying quality scores in your UI can aid users in diagnosing problems as their network environment changes (such as due to a Wi-Fi to Cellular handoff).

![Flow from network stats to analytics engine to network quality level.](https://docs-resources.prod.twilio.com/6bcc549a3fa19d017dc8f750731f25974ff3ade0c2fbe0eeef01535487126dad.gif)

For this, the Network Quality API uses an algorithm that ingests both Client and Server metrics and computes a *Network Quality Level* on the following scale:

| **Network Quality Level** | **Meaning**                   |
| ------------------------- | ----------------------------- |
| 5                         | Excellent network             |
| 4                         | Good network                  |
| 3                         | Average network               |
| 2                         | Below average network         |
| 1                         | Bad network                   |
| 0                         | Network broken (reconnecting) |

Remark that the Network Quality Level is not an absolute metric, but a score
relative to what you are demanding from the network. For example, it may
happen that your Quality Level is `5` while you are communicating low quality
video, but it drops to `1` as soon as you change the video to be HD even if
the network does not change at all in the process.

This also means that when you are not using the network at all (i.e. you are
neither publishing nor subscribing to any Tracks) your quality level will be
always `5` given that any network will be capable of complying with a zero
communications demand.

## Using the Network Quality API

### Enabling Network Quality Reporting \[#enabling-network-quality-reporting]

The Network Quality API is disabled by default, and is requested at connect time. The following table illustrates the currently supported platforms:

| **Twilio Video SDK** | **NQ Levels for LocalParticipant** | **NQ Levels for RemoteParticipants** | **NQ Statistics** |
| -------------------- | ---------------------------------- | ------------------------------------ | ----------------- |
| Android              | Yes (v4.4.0+)                      | Yes (v5.2.0+)                        | Not Available     |
| iOS                  | Yes (v2.9.0+)                      | Yes (v3.2.0+)                        | Not Available     |
| JavaScript           | Yes (v1.14.0+)                     | Yes (v1.18.0+)                       | Yes (v1.18.0+)    |

#### Android \[#enabling-on-android]

When building `ConnectOptions.Builder`, invoke the `enableNetworkQuality` method and pass `true` as a parameter. By default this enables network quality level changes to be reported for the Local Participant. To also receive network quality level changes for the Remote Participants, a configured `NetworkQualityConfiguration` object needs to be supplied to the `ConnectOptions.Builder.networkQualityConfiguration` method.

```java
NetworkQualityConfiguration configuration =
        new NetworkQualityConfiguration(
                NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL,
                NetworkQualityVerbosity.NETWORK_QUALITY_VERBOSITY_MINIMAL);

ConnectOptions connectOptions =
                new ConnectOptions.Builder(token)
                        .roomName(roomName)
                        .enableNetworkQuality(true)
                        .networkQualityConfiguration(configuration)
                        .build();
```

#### iOS \[#enabling-on-ios]

When building `TVIConnectOptions`, set the property `networkQualityEnabled` to `true`. By default this enables network quality level changes to be reported for the Local Participant. To also receive network quality level changes for the Remote Participants, a configured `TVINetworkQualityConfiguration` object needs to be supplied to the `TVIConnectOptions.networkQualityConfiguration` property.

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
    builder.isNetworkQualityEnabled = true
    builder.networkQualityConfiguration = NetworkQualityConfiguration(localVerbosity: .minimal,
                                                                      remoteVerbosity: .minimal)
    builder.roomName = "my-room"
}

room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

#### JavaScript

In JavaScript (v1.18.0+), you can use the following code snippet for [configuring](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#NetworkQualityConfiguration__anchor) the Network Quality API:

```js
var Video = require('twilio-video');
var token = getAccessToken();

Video.connect(token, {
  name: 'my-room',
  audio: { name: 'microphone' },
  video: { name: 'camera' },
  networkQuality: {
    local: 1, // LocalParticipant's Network Quality verbosity [1 - 3]
    remote: 2 // RemoteParticipants' Network Quality verbosity [0 - 3]
  }
}).then(function(room) {
  // Change Network Quality verbosity levels after joining the Room
  room.localParticipant.setNetworkQualityConfiguration({
    local: 2,
    remote: 1
  });
});
```

##### Setting Network Quality Verbosity

Network Quality Levels are derived from the following metrics:

* **Bandwidth:** Ranks the estimated available bandwidth in comparison with the one required by the service.
* **Latency:** Ranks the transfer delay (round trip time) and jitter between the client and server.
* **Fraction Lost:** Ranks network losses between the client and the server.

The above metrics are used to calculate a Network Quality Level for each direction (Send and Receive) and media type (Audio and Video), with the exception that bandwidth is not used for audio. The overall Network Quality Level is the minimum of all partial levels.

You can access the partial levels and associated metrics using the `networkQuality` [verbosity](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#NetworkQualityVerbosity) levels for the LocalParticipant and RemoteParticipants. The following table describes the different verbosity levels:

| **Verbosity** | **Value** | **Description**                                                                                                                                                                                                                                                                                                                                                |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| none          | 0         | Nothing is reported for the Participant. This has no effect and defaults to `minimal` for the LocalParticipant.                                                                                                                                                                                                                                                |
| minimal       | 1         | Reports NQ Level for the Participant.                                                                                                                                                                                                                                                                                                                          |
| moderate      | 2         | Reports NQ Level and `NetworkQualityStats` for the Participant. `NetworkQualityStats` is populated with the audio and video NQ Levels for both send and receive.                                                                                                                                                                                               |
| detailed      | 3         | Reports NQ Level and `NetworkQualityStats` for the Participant. `NetworkQualityStats` is populated with the audio and video NQ Levels for both send and receive and their corresponding `NetworkQualityMediaStats`. `NetworkQualityMediaStats` is populated with bandwidth, latency, and fraction lost metrics in the form of `NetworkQualitySendOrRecvStats`. |

Setting `networkQuality` to `true` is equivalent to setting the Network Quality verbosity for the LocalParticipant to `1 (minimal)` and the Network Quality verbosity for RemoteParticipants to `0 (none)`.

##### References

* [NetworkQualityStats](https://sdk.twilio.com/js/video/releases/2.34.0/docs/NetworkQualityStats.html)
* [NetworkQualityMediaStats](https://sdk.twilio.com/js/video/releases/2.34.0/docs/NetworkQualityMediaStats.html)
* [NetworkQualitySendOrRecvStats](https://sdk.twilio.com/js/video/releases/2.34.0/docs/NetworkQualitySendOrRecvStats.html)

### Receiving the Network Quality Level \[#receiving-the-network-quality-level]

Once the Network Quality API is enabled through the `connect` method as shown above, the SDK will start receiving Network Quality Level events. That Network Quality Level is a value from 0-5, inclusive, representing the quality of the network connection of the Participant, as illustrated in the table above. Note that while a Room is in the `reconnecting` state, a LocalParticipant's Network Quality Level is set to `0`.

The specific value of the Network Quality Level can be obtained at any time using the `networkQualityLevel` property of the `LocalParticipant` object. Also note that while a Room is in `reconnecting` state, the `LocalParticipant`'s Network Quality Level is `0`.

In addition, applications can get notified of changes on the `networkQualityLevel` by subscribing to the `networkQualityLevelChanged` event that is published by the `LocalParticipant`.

#### Android \[#using-on-android]

Implementing the `onNetworkQualityLevelChanged` method on the `LocalParticipant.Listener` interface will allow you to receive network quality level changes for the local participant.

```java
LocalParticipant.Listener localParticipantListener = new LocalParticipant.Listener() {

    @Override
    public void onNetworkQualityLevelChanged(
        @NonNull LocalParticipant localParticipant,
        @NonNull NetworkQualityLevel networkQualityLevel) {}
}
```

Implementing the `onNetworkQualityLevelChanged` method on the `RemoteParticipant.Listener` interface will allow you to receive network quality level changes for the remote participant.

```java
RemoteParticipant.Listener remoteParticipantListener = new RemoteParticipant.Listener() {

    @Override
    public void onNetworkQualityLevelChanged(
        @NonNull RemoteParticipant remoteParticipant,
        @NonNull NetworkQualityLevel networkQualityLevel) {}
}
```

#### iOS \[#using-on-ios]

Implement [-\[TVILocalParticipantDelegate localParticipant:networkQualityLevelDidChange:\]](https://twilio.github.io/twilio-video-ios/docs/latest/Protocols/TVILocalParticipantDelegate.html#//api/name/localParticipant:networkQualityLevelDidChange:) in order to respond to network quality level changes for the local participant. Be sure that you have set the delegate of the `LocalParticipant` to ensure the callbacks are received.

```swift
// MARK: LocalParticipantDelegate
func localParticipantNetworkQualityLevelDidChange(participant: LocalParticipant, networkQualityLevel: NetworkQualityLevel) {
    print("Local Participant Network Quality Level Changed: \(networkQualityLevel)")
}
```

Implement [-\[TVIRemoteParticipantDelegate remoteParticipant:networkQualityLevelDidChange:\]](https://twilio.github.io/twilio-video-ios/docs/latest/Protocols/TVIRemoteParticipantDelegate.html#//api/name/remoteParticipant:networkQualityLevelDidChange:) in order to respond to network quality level changes for remote participants. Be sure that you have set the delegate of each `RemoteParticipant` to ensure the callbacks are received.

```swift
// MARK: RemoteParticipantDelegate
func remoteParticipantNetworkQualityLevelDidChange(participant: RemoteParticipant, networkQualityLevel: NetworkQualityLevel) {
    print("Remote Participant (\(participant.identity)) Network Quality Level Changed: \(networkQualityLevel)")
}
```

#### JavaScript

A typical way of using the Network Quality Level is to represent a Participant's Network Quality as cell phone-style signal-strength bars. The following snippet shows how to do it in JavaScript:

```js
function printNetworkQualityStats(networkQualityLevel, networkQualityStats) {
  // Print in console the networkQualityLevel using bars
  console.log({
    1: '▃',
    2: '▃▄',
    3: '▃▄▅',
    4: '▃▄▅▆',
    5: '▃▄▅▆▇'
  }[networkQualityLevel] || '');

  if (networkQualityStats) {
    // Print in console the networkQualityStats, which is non-null only if Network Quality
    // verbosity is 2 (moderate) or greater
    console.log('Network Quality statistics:', networkQualityStats);
  }
}

// Print the initial Network Quality Level and statistics
printNetworkQualityStats(participant.networkQualityLevel, participant.networkQualityStats);

// Print changes to Network Quality Level and statistics
participant.on('networkQualityLevelChanged', printNetworkQualityStats);
```
