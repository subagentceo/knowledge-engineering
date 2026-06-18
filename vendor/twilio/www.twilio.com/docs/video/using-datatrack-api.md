# Using the DataTrack API - JavaScript

In this guide, we will show you how to use the DataTrack API to send messages between Participants connected to a Room. With the DataTrack API you will be able to build powerful collaboration features such as whiteboarding, screen annotations, shared augmented reality apps and more. Use this guide along with our example app [Quick Draw With Twilio](https://github.com/twilio/draw-with-twilio) to learn about the DataTrack API.

* [Overview](#overview)
* [Using the DataTrack API](#using-the-datatrack-api)
* [Configuring DataTrack reliability](#configuring-datatrack-reliability)

## Overview

The DataTrack API lets you create a DataTrack which can be used to send low latency messages to zero or more subscribers to the track. DataTracks have the following properties:

* DataTracks are unidirectional.
  * To send messages, use [LocalDataTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalDataTrack.html).
  * To receive messages, use [RemoteDataTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/RemoteDataTrack.html).
* DataTracks have built-in mechanisms to support reliable transmission. Check out the section on [Configuring DataTrack reliability](#configuring-datatrack-reliability).
* Recommended maximum payload size of data sent over the DataTrack is 16KiB.

In the next section, we will show you how to use the DataTrack API with the JavaScript SDK.

## Using the DataTrack API

### Create a LocalDataTrack

The [LocalDataTrack](https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalDataTrack.html)  represents data that the [LocalParticipant](https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalParticipant.html) can publish to a Room.

```js
const { LocalDataTrack } = require(`twilio-video`);
const dataTrack = new LocalDataTrack();
```

### Connect to a Room and Publish the LocalDataTrack

Next, we want to publish the LocalDataTrack we created earlier to the Room we connect to:

```js
const { connect } = require('twilio-video');

const room = await connect('$TOKEN', {
  name: 'my-chat-room',
  tracks: [dataTrack]
});
```

### Send Messages Over a LocalDataTrack

To send data to the Room, use [send](https://sdk.twilio.com/js/video/releases/2.34.0/docs/LocalDataTrack.html#send__anchor). DataTracks behave like audio and video Tracks as Participants only receive data sent after:

* The LocalDataTrack was successfully published to the Room, and
* The Participant subscribed to the DataTrack.

For example, if Alice starts sending a stream of consecutive natural numbers (one number per second), and Bob joins the Room and subscribes to Alice's DataTrack after 5 seconds while Charlie joins the Room and subscribes to Alice's DataTrack after 10 seconds, then Bob will receive all the numbers starting from 6, and Charlie will receive all the numbers starting from 11.

Continuing with the example from above:

```js
const dataTrackPublished = {};

dataTrackPublished.promise = new Promise((resolve, reject) => {
  dataTrackPublished.resolve = resolve;
  dataTrackPublished.reject = reject;
});

room.localParticipant.on('trackPublished', publication => {
  if (publication.track === dataTrack) {
    dataTrackPublished.resolve();
  }
});

room.localParticipant.on('trackPublicationFailed', (error, track) => {
  if (track === dataTrack) {
    dataTrackPublished.reject(error);
  }
});

function sendMessage(message) {
  dataTrackPublished.promise.then(() => dataTrack.send(message));
}

```

### Receiving Messages

Now that we are sending messages over the LocalDataTrack, we want our Participants to subscribe to the published DataTrack and receive those messages.

In the "trackSubscribed" event listener, you want to look for the subscribed DataTrack by checking the `kind` property. Once you have the DataTrack, you can extract the message payload.

```js
participant.on('trackSubscribed', track => {
  console.log(`Participant "${participant.identity}" added ${track.kind} Track ${track.sid}`);
  if (track.kind === 'data') {
    track.on('message', data => {
      console.log(data);
    });
  }
});
```

## Configuring DataTrack Reliability

DataTracks are intended for low-latency communication between Participants. Importantly, to optimize for lowest latency possible, *delivery of DataTrack messages is not guaranteed*. You can think of them more like UDP messages, rather than TCP.

You can configure the retry parameters for your DataTrack with the following options:

* **maxPacketLifeTime** sets the time in milliseconds during which the DataTrack will transmit or retransmit a message until that message is acknowledged.
* **maxRetransmits** sets the maximum number of retransmit attempts that will be made.

DataTrack connections are established between Participants via the media server. Under the hood, there is one connection between a LocalParticipant to the media server and a second connection from the media server to the RemoteParticipant. Twilio's media server configures the same **maxPacketLifeTime** value on each remote Participant's connection. Therefore, you should set the **maxPacketLifetime** to *half the acceptable max lifetime* for each message you send.
