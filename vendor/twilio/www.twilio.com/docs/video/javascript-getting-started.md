# Twilio Video Quickstart for JavaScript

Run the [Twilio Video quickstart app](https://github.com/twilio/video-quickstart-js) to see the Twilio Video JavaScript SDK in action. Then explore the code to learn how to build your own video application using the SDK.

A Twilio Video app has [three main components](/docs/video/video-app-components). This guide describes the front-end application and the Video Room functionality. To learn how the quickstart app implements an access token server using Express, see `/server/index.js` in the [quickstart app](https://github.com/twilio/video-quickstart-js/).

## Prerequisites

Before you can run the quickstart app, you need to install Node.js and gather your Twilio account credentials.

### Install Node.js

Install [Node.js](https://nodejs.org/en/download/) on your local machine. The quickstart app uses Node.js to run a local web server.

### Get an API key

API keys represent credentials that allow your application to access the Twilio API.

1. Create an API key in the [API keys & tokens](https://console.twilio.com/us1/account/keys-credentials/api-keys/create) section of the Twilio Console.
2. Save the API key SID and secret in a secure place. The secret is only shown once when you create the key.

Learn more about [API Keys](/docs/iam/api-keys/keys-in-console).

### Get your Account SID

Get your Account SID from the [Twilio Console dashboard home page](https://console.twilio.com/).

## Clone and configure the quickstart app

Follow these steps to download the quickstart app and set up your Twilio credentials:

1. Clone the Twilio Video JavaScript quickstart app repository to your local machine. For example:

   ```bash
     git clone https://github.com/twilio/video-quickstart-js.git
   ```

   > \[!NOTE]
   >
   > To use the quickstart app as a starting point for your own application, you can [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the [twilio/video-quickstart-js](https://github.com/twilio/video-quickstart-js) repository to your GitHub account, then clone your fork.
2. Change to the `video-quickstart-js` directory:

   ```bash
   cd video-quickstart-js
   ```
3. Create a `.env` file from the template:

   ```bash
   cp .env.template .env
   ```
4. Edit the new `.env` file. Replace the placeholders with your credentials from the [Prerequisites](#prerequisites) section:

   ```text
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
   TWILIO_API_KEY=SKxxxxxxxxxx
   TWILIO_API_SECRET=xxxxxxxxxx
   ```
5. Install the dependencies:
   ```bash
   npm install
   ```

## Run the quickstart app locally and join a Video Room

After configuring the app, you can run it locally and test joining a Video Room:

1. Run the application:

   ```bash
   npm start
   ```
2. Open your web browser to `http://localhost:3000`.
3. When prompted, test and choose your microphone and camera.

   > \[!NOTE]
   >
   > Desktop browsers save your choices. On mobile browsers, you're prompted to test and choose your microphone and camera every time you load the application to make sure they're not reserved by another application.
4. Enter a Room name and your user name, then click **Join Room**.
   You should see your own camera feed and name displayed.

To test the multi-Participant functionality, you can open another browser tab and enter the same Room name to join the Room and see and hear yourself on both tabs.

## Explore Twilio Video capabilities with the quickstart app code

The quickstart app's `quickstart/src/joinroom.js` file demonstrates how to use the Video SDK APIs to build a multi-participant video session. You can incorporate this code into your application and build your user interface around it.

The Twilio Video API includes the following resources:

* **`Room`**: The real-time audio, data, video and screen-share session. It's the basic building block for a Programmable Video application.
* **`Participants`**: The client applications that are connected to a Room and sharing audio, data, and video media with one another.
* **`Tracks`**: The audio, data, and video media streams that are shared within a Room.
* **`LocalTracks`**: The audio, data, and video captured from the local client's media sources (for example, microphone and camera).
* **`RemoteTracks`**: The audio, data, and video tracks from other participants connected to the Room.

> \[!NOTE]
>
> The UI code in the quickstart app uses jQuery, but you can use the Twilio Video SDK with any framework.

The following sections describe the key parts of the quickstart app code that use the Twilio Video JavaScript SDK to connect to a Room, set up local media, work with remote Participants, and participate in a Room.

### Connect to a new or existing Room

The `joinroom.js` file makes a single call to the Video SDK's `connect()` API to create a new Room or to join an existing Room.

```javascript
async function joinRoom(token, connectOptions) {
  …
  // Join to the Room with the given AccessToken and ConnectOptions.
  const room = await connect(token, connectOptions);
  …
}
```

The function accepts two parameters:

* `token` is required and is the Access Token obtained from the back-end server (not described in this quickstart).
* `connectOptions` are optional and can include `name`, `audio`, `video`, and other properties.

> \[!NOTE]
>
> The name of the Room specifies which Room to join. If you're using [client-side Room ("ad-hoc Room") creation](/docs/video/tutorials/understanding-video-rooms#ad-hoc-rooms) for your account and a Room by that name doesn't already exist, it's created upon connection. If a Room by that name is already active, the Participant is connected to the Room and can receive notifications from any other Participants also connected to the same Room. Room names must be unique within an account.

### Listen for Participant events in a Room

The quickstart app registers event listeners for all Participant lifecycle events immediately after it connects.

```javascript
// Handle the LocalParticipant's media.
participantConnected(room.localParticipant, room);

// Subscribe to RemoteParticipants already in the Room.
room.participants.forEach(participant => {
  participantConnected(participant, room);
});

// Subscribe to RemoteParticipants joining later.
room.on('participantConnected', participant => {
  participantConnected(participant, room);
});

// Handle a disconnected RemoteParticipant.
room.on('participantDisconnected', participant => {
  participantDisconnected(participant, room);
});
```

The `participantConnected` and `participantDisconnected` functions are helper methods that attach and detach media and update the user interface.

### Set up local media

Immediately after connecting, the app stores the `LocalVideoTrack` that `connect()` created for you:

```javascript
let localVideoTrack =
  Array.from(room.localParticipant.videoTracks.values())[0].track;
```

When a Participant backgrounds the app (on mobile browsers), the app stops and unpublishes the track:

```javascript
localVideoTrack.stop();
room.localParticipant.unpublishTrack(localVideoTrack);
```

The app creates a new track (respecting any constraints present in `connectOptions.video`) when the app returns to the foreground.

```javascript
localVideoTrack = await createLocalVideoTrack(connectOptions.video);
await room.localParticipant.publishTrack(localVideoTrack);
```

### Display a local camera preview

The app renders the local Participant's camera the same way as any remote track. Upon connection, `participantConnected` immediately calls `attachTrack` so the local preview appears instantly:

```javascript
participantConnected(room.localParticipant, room);
```

### Working with Remote Participants

When a remote Participant joins the Room, the quickstart app sets up event listeners to attach newly published audio and video tracks in real time. The app updates the UI to render each Participant's media and clean up if they [disconnect](#disconnect-from-a-room):

```javascript
function participantConnected(participant, room) {
  // Set up the Participant's media container.
  setupParticipantContainer(participant, room);

  // Tracks already published.
  participant.tracks.forEach(publication => {
    trackPublished(publication, participant);
  });

  // Tracks that will be published later.
  participant.on('trackPublished', publication => {
    trackPublished(publication, participant);
  });
}

function trackPublished(publication, participant) {
  if (publication.track) {
    attachTrack(publication.track, participant);
  }
  publication.on('subscribed',  track => attachTrack(track, participant));
  publication.on('unsubscribed', track => detachTrack(track, participant));
}
```

The `attachTrack` function renders the audio or video into the app's page:

```javascript
function attachTrack(track, participant) {
  const $media = $(`div#${participant.sid} > ${track.kind}`, $participants);
  $media.css('opacity', '');
  track.attach($media.get(0));

  if (track.kind === 'video' && participant === activeParticipant) {
    track.attach($activeVideo.get(0));
    $activeVideo.css('opacity', '');
  }
}
```

### Mute and unmute audio and video

The quickstart app automatically mutes video when the app is backgrounded and unmutes when the app returns to the foreground:

```javascript
// Mute (backgrounded)
localVideoTrack.stop();
room.localParticipant.unpublishTrack(localVideoTrack);

// Unmute (foregrounded)
localVideoTrack = await createLocalVideoTrack(connectOptions.video);
await room.localParticipant.publishTrack(localVideoTrack);
```

### Disconnect from a Room

To disconnect from a Room, the application can call `room.disconnect()` in response to user actions or events.

When the user clicks the **Leave Room** button, the app disconnects from the Room:

```javascript
$leave.click(function onLeave() {
  $leave.off('click', onLeave);
  $togglePip.off('click', togglePipButtonHandler);
  room.disconnect();
});
```

The app automatically disconnects when the Participant leaves or reloads the app page, or closes the tab:

```javascript
window.onbeforeunload = () => { room.disconnect(); };
window.onpagehide     = () => { room.disconnect(); };   // iOS Safari
```

After the SDK emits the `disconnected` event, the app performs the final resource cleanup.

```javascript
room.once('disconnected', (room, error) => {
  …
  localVideoTrack.stop();
  participantDisconnected(room.localParticipant, room);
  room.participants.forEach(participant => {
    participantDisconnected(participant, room);
  });
  $activeVideo.get(0).srcObject = null;
  window.room = null;
  …
});
```

## Next steps

Now that you've run the quickstart app and understand the basics of connecting to a Room, explore these resources to build and enhance your video application:

* [Install the Twilio Video JavaScript SDK](/docs/video/javascript): Add the SDK to your own project
* [Twilio Video React app](https://github.com/twilio/twilio-video-app-react): Explore a full-featured video application built with React
* [Video app components](/docs/video/video-app-components): Understand the architecture of a complete video application
