# Reconnection States and Events

## Overview

This guide introduces the Reconnection States and Events and provides guidance on how to use them effectively in your Twilio Video applications. Whenever there are disruptions in network connectivity, the Twilio Video SDK will attempt to re-establish the signaling and media connections to the Room. The Reconnection States and Events can be used by the application logic to update its user interface accordingly.

* [Room Reconnection States and Events](#room-reconnection-states-and-events)
* [RemoteParticipant Reconnection States and Events](#remoteparticipant-reconnection-states-and-events)
* [Availability](#availability)
* [Preventing Reconnection Failure due to Expired AccessToken](#preventing-reconnection-failure-due-to-expired-accesstoken)
* [Handling Browser Session Termination and Page Navigation](#handling-browser-session-termination-and-page-navigation)

## Room Reconnection States and Events

The `Room.state` property represents the status of the application's signaling and media connections to the Room and its Participants. When the application joins a Room, it will transition to the "connected" state. Similarly, when the application disconnects from a Room, it will transition to the "disconnected" state. Apart from these basic states, there are two Reconnection Events:

**reconnecting** - when the application is trying to re-establish its signaling and/or media connections to the Room. When the Room transitions to this state, it will emit the "reconnecting" event as follows:

```js
room.on('reconnecting', error => {
  assert.equal(room.state, 'reconnecting');
  if (error.code === 53001) {
    console.log('Reconnecting your signaling connection!', error.message);
  } else if (error.code === 53405) {
    console.log('Reconnecting your media connection!', error.message);
  }
  /* Update the application UI here */
});
```

**reconnected** - when the application has successfully re-established its signaling and media connections to the Room. The Room will transition to the "connected" state and will emit the "reconnected" event as follows:

```js
room.on('reconnected', () => {
  assert.equal(room.state, 'connected');
  console.log('Reconnected your signaling and media connections!');
  /* Update the application UI here */
});
```

If the application fails to re-establish its signaling connection to the Room, then the Room transitions to the "disconnected" state, and emits the "disconnected" event as follows:

```js
room.on('disconnected', (room, error) => {
  assert.equal(room.state, 'disconnected');
  if (error.code === 20104) {
    console.log('Signaling reconnection failed due to expired AccessToken!');
  } else if (error.code === 53000) {
    console.log('Signaling reconnection attempts exhausted!');
  } else if (error.code === 53002) {
    console.log('Signaling reconnection took too long!');
  }
});
```

## RemoteParticipant Reconnection States and Events

The `RemoteParticipant.state` property represents the status of the RemoteParticipant's signaling connection to the Room. When the RemoteParticipant joins a Room, it will transition to the "connected" state. Similarly, when the RemoteParticipant disconnects from a Room, it will transition to the "disconnected" state. Apart from these basic states, there are two Reconnection Events:

**reconnecting** - when the RemoteParticipant is trying to re-establish its signaling connection to the Room. When the RemoteParticipant transitions to this state, it will emit the "reconnecting" event as follows:

```js
remoteParticipant.on('reconnecting', () => {
  assert.equal(remoteParticipant.state, 'reconnecting');
  console.log(`${remoteParticipant.identity} is reconnecting the signaling connection to the Room!`);
  /* Update the RemoteParticipant UI here */
});
```

**participantReconnecting** - alternative Room-level event for RemoteParticipant's "reconnecting" event.

```js
room.on('participantReconnecting', remoteParticipant => {
  assert.equals(remoteParticipant.state, 'reconnecting');
  console.log(`${remoteParticipant.identity} is reconnecting the signaling connection to the Room!`);
  /* Update the RemoteParticipant UI here */
});
```

**reconnected** - when the RemoteParticipant has successfully re-established its signaling connection to the Room. The Remote transitions to the "connected" state and will emit the "reconnected" event as follows:

```js
remoteParticipant.on('reconnected', () => {
  assert.equals(remoteParticipant.state, 'connected');
  console.log(`${remoteParticipant.identity} has reconnected the signaling connection to the Room!`);
  /* Update the RemoteParticipant UI here */
});
```

**participantReconnected** - alternative Room-level event for RemoteParticipant's "reconnected" event.

```js
room.on('participantReconnected', remoteParticipant => {
  assert.equals(remoteParticipant.state, 'connected');
  console.log(`${remoteParticipant.identity} has reconnected the signaling connection to the Room!`);
  /* Update the RemoteParticipant UI here */
});
```

## Availability

| Reconnection States and Events                     | Twilio Video SDK versions |
| -------------------------------------------------- | ------------------------- |
| Media Reconnection (Room)                          | twilio-video.js@1.9.0+    |
| Media + Signaling Reconnection (Room)              | twilio-video.js@2.0.0+    |
| Signaling Reconnection (RemoteParticipant)         | twilio-video.js@2.1.0+    |
| Media + Signaling Reconnection (RemoteParticipant) | Coming Soon               |

## Preventing Reconnection Failure due to Expired AccessToken

Let's say that you have created an AccessToken that is valid for 1 hour and then use it to join a Room. After 1 hour and 15 minutes, due to some network disruption or handoff, the Twilio Video SDK attempts to reconnect to the Room. Because the AccessToken is expired at this time, the reconnection will fail, and you will be disconnected from the Room. In order to prevent this from happening, make sure that you create AccessTokens that are valid for the maximum allowed session duration, which is currently 24 hours (86,400 seconds).

If you are concerned that this AccessToken can be re-used later by a malicious actor, you can scope the AccessToken to a particular Room and an identity, thereby making sure that no one can re-use the AccessToken to join another Room even though it is still valid in terms of its Time-To-Live.

```js
const AccessToken = require('twilio').jwt.AccessToken;

/**
 * Create an AccessToken that is valid for 24 hours.
 */
const token = new AccessToken(
  'your_twilio_account_sid',
  'your_twilio_api_key',
  'your_twilio_api_secret',
  { ttl: 86400 });

/**
 * Scope the AccessToken to a particular identity.
 */
token.identity = 'alice';

/**
 * Scope the AccessToken to a particular Room.
 */
token.addGrant(new VideoGrant({
  room: 'my-room'
}));
```

## Handling Browser Session Termination and Page Navigation

When a Participant closes the tab/browser or navigates away from your application, we recommend that you disconnect from the Room so that other Participants are immediately notified. You can achieve this as follows:

```js
window.addEventListener('beforeunload', () => {
  room.disconnect();
});
```
