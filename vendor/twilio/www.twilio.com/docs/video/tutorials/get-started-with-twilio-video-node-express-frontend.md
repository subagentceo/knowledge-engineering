# Get Started with Twilio Video Part 2: Creating the Frontend

This is the second part of a two-part tutorial for creating a video web application with a Node or Express backend and a JavaScript frontend.

In this section, you'll create the frontend side of the application, where participants can join a video room and share their video and audio with other participants. You'll build an HTML page with a form for joining rooms and write JavaScript code to connect to Twilio Video and display participant video streams.

At the end of this tutorial, you'll have a complete web application that allows you to join a video room and video chat with other participants.

> \[!WARNING]
>
> Complete [Part One](/docs/video/tutorials/get-started-with-twilio-video-node-express-server) before starting this section. The frontend depends on the Express server from Part One to generate Access Tokens and manage video rooms.

## Prerequisites

Before you begin, make sure you've:

* Completed [Part One](/docs/video/tutorials/get-started-with-twilio-video-node-express-server) of this tutorial, which sets up the Express backend server.
* A browser that supports the [Twilio Video JavaScript SDK](/docs/video/javascript#supported-browsers).
* The Express server from Part One running. You can start from the root of your project directory:

```bash
npm start
```

## Create the HTML file

In the project's root directory (`video_tutorial` or whatever you named the project's main directory), create a `public` directory to store your HTML and JavaScript files. To make the new directory, run the following command in your terminal:

```bash
mkdir public
```

In this application, you need one HTML file. Create `index.html` in the `public` directory. This file will contain the HTML structure for the video application, which should include:

* A link to the Twilio Video JavaScript SDK CDN.
* A form where a user can enter the name of the Room to join.
* A `<div>` where participants' videos appear after they've joined.
* A link to a `main.js` file, where you'll write the code for controlling the video application.

Add the following code to `public/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Twilio Video Demo</title>
    <!-- Twilio Video CDN -->
    <script src="https://sdk.twilio.com/js/video/releases/2.15.2/twilio-video.min.js"></script>
  </head>
  <body>
    <form id="room-name-form">
      Enter a Room Name to join: <input name="room_name" id="room-name-input" />
      <button type="submit">Join Room</button>
    </form>
    <div id="video-container"></div>
    <script src="/main.js"></script>
  </body>
</html>
```

Note that this `index.html` file links to version 2.15.2 of the Twilio Video JavaScript SDK. You can find the CDN link for [the most recent version of the Twilio Video JavaScript SDK here](https://sdk.twilio.com/js/video/latest/docs/).

## Configure the server to serve the HTML file

Next, configure your Express server to render this `index.html` template when someone visits your web app.

### Add path handling imports

In your `server.js` file, add these imports to the top of the file, right after the existing imports:

```javascript
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

These imports allow you to use `__dirname` in ES6 modules to serve files with Express.

### Add static file serving

Add the following code underneath the `/join-room` route and right above where you start the Express server with `app.listen`:

```javascript
// serve static files from the public directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});
```

> \[!WARNING]
>
> Make sure you're in the correct directory (the root of your project, `video_tutorial`, where your `server.js` and `package.json` files are located) before running the commands below. If you're in a different directory, the server won't start properly.

If your server is not running, start it by running:

```bash
npm start
```

After the server starts, go to `localhost:5000` in your browser. You should see a form with an input box and a submit button.

## Create the JavaScript file

In `index.html`, you linked to a JavaScript file that doesn't exist yet. In this section, you'll create it and build out the video functionality.

### Set up the main.js file

Create a file called `main.js` within the `public` directory, and open that file in a text editor.

First, create variables for the `form`, video container `div`, and `input` HTML elements. Copy and paste the following code into the `public/main.js` file:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");
```

### Create the startRoom function

Next, create a function called `startRoom` that you'll call when the form is submitted. Copy and paste the following code into the `public/main.js` file, under the variable declarations:

```javascript
const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();
  console.log(token);
};
```

The `startRoom` function hides the Join Room form. Then it submits a request to the `/join-room` route with the value the user entered in `room-name-input`. The `/join-room` route either finds an existing Video room with that name or creates one, and gives back an Access Token that this participant can use to join the room.

For now, the code just retrieves the Access Token and prints the token to the console with `console.log`. In the next step, you'll use the token to join the video room.

At the bottom of the `main.js` file, below the `startRoom` function, add an event listener on the form so that when it's submitted, `startRoom` runs:

```javascript
form.addEventListener("submit", startRoom);
```

Go to `localhost:5000` in your browser, enter a room name in the form, click "Join Room", and see the Access Token in the browser's console. (You'll need to open the Developer Tools for your browser to see the console.)

Here's the full code for `public/main.js` so far:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");

const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();
  console.log(token);
};

form.addEventListener("submit", startRoom);
```

> \[!NOTE]
>
> This tutorial uses [Group rooms](/docs/video/tutorials/understanding-video-rooms), which support up to 50 participants. Group rooms use Twilio's cloud infrastructure for better quality and scalability. While this tutorial focuses on a two-person video chat, you can extend it to support more participants by modifying the UI to display multiple video streams.

## Join a Twilio Video room

Now that your application can retrieve an Access Token, you can use that token to join the video room in the browser. The Twilio Video JavaScript SDK has a `connect` method that you can call to connect to a Twilio Video room.

Copy and paste the following code underneath the `startRoom` function in `public/main.js`.

```javascript
const joinVideoRoom = async (roomName, token) => {
  // join the video room with the Access Token and the given room name
  const room = await Twilio.Video.connect(token, {
    room: roomName,
  });
  return room;
};
```

This creates a function called `joinVideoRoom`, which passes the Access Token and an object of `ConnectOptions` to the Twilio video `connect` method. The only `ConnectOption` you pass in is the name of the room that you're connecting to.

The `connect` method returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will eventually either resolve to a [Room](https://sdk.twilio.com/js/video/releases/2.15.1/docs/Room.html) object or be rejected with an [error](https://sdk.twilio.com/js/video/releases/2.15.1/docs/TwilioError.html).

Then, call the `joinVideoRoom` function after you've retrieved the Access Token in the `startRoom` function. For now, you can `console.log` the video room object. In the next step, you'll start adding code to display participants' video streams.

Update the `startRoom` function with the following lines of code. Note that you're removing the `console.log(token)` line and replacing it with a call to the `joinVideoRoom` function:

```javascript
// !mark(12,13,14)
  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);
  console.log(room);
};
```

Go to `localhost:5000` in your browser, enter a room name, and click "Join Room". You'll connect to a Twilio Video room and see the room object logged to the console.

This may trigger a prompt asking you to grant browser access to your camera and microphone devices, because once you connect to a video room, the room will start receiving your audio and video data.

Here's the full `main.js` with these additions up to now.

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");

const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);
  console.log(room);
};

const joinVideoRoom = async (roomName, token) => {
  // join the video room with the Access Token and the given room name
  const room = await Twilio.Video.connect(token, {
    room: roomName,
  });
  return room;
};

form.addEventListener("submit", startRoom);
```

## Understand and handle participants

Once a web client joins a video room with an Access Token, it becomes a [Participant](/docs/video/api/participants) in the room. The Twilio Video JavaScript SDK distinguishes between local and remote participants; a web client's local participant is the one who joined the video room from that browser, and all other participants are considered remote participants.

After you've successfully connected to a video room, you'll want to display each participant's video and audio on the page. The room object you got back from the `connect` method has an attribute called `localParticipant`, which represents the local participant, and an attribute called `participants`, which is a list of the remote participants that are connected to the room.

### Display participants' audio and video data

The next step in this code is to display the video and audio data for the participants. This will involve:

* Creating an element on the web page where you'll put a participant's audio and video
* Adding the video and audio data from each participant to that element

The logic for adding the video and audio data on the page will come later; right now, you can create an empty function called `handleConnectedParticipant` under the `startRoom` function. You'll fill out the body of the function in the next section.

```javascript
const handleConnectedParticipant = (participant) => {};
```

Next, you'll add calls to the `handleConnectedParticipant` function. In `main.js`, add the following lines to the `startRoom` function, right after the call the `joinVideoRoom` function. Note that you're removing the `console.log(room)` line and replacing it with a call to `handleConnectedParticipant` on the local participant.

```javascript
// !mark(4,5,6,7)
  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);

  // render the local and remote participants' video and audio tracks
  handleConnectedParticipant(room.localParticipant);
  room.participants.forEach(handleConnectedParticipant);
  room.on("participantConnected", handleConnectedParticipant);
};
```

In these new lines of code, you call `handleConnectedParticipant` on the local participant and any remote participants in the room.

The room will send a [participantConnected](https://sdk.twilio.com/js/video/releases/2.15.1/docs/Room.html#event:participantConnected) event whenever a new participant connects to the room. The code also listens for this event and calls the `handleConnectedParticipant` function whenever that event triggers.

Here's the full `main.js` code up to this point:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");

const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);

  // render the local and remote participants' video and audio tracks
  handleConnectedParticipant(room.localParticipant);
  room.participants.forEach(handleConnectedParticipant);
  room.on("participantConnected", handleConnectedParticipant);
};

const handleConnectedParticipant = (participant) => {};

const joinVideoRoom = async (roomName, token) => {
  // join the video room with the Access Token and the given room name
  const room = await Twilio.Video.connect(token, {
    room: roomName,
  });
  return room;
};

form.addEventListener("submit", startRoom);
```

## Display participants' audio and video tracks

In this section, you'll complete the logic for showing each participant's audio and video. Before doing this, you should understand the concept of participant `tracks`.

### What are tracks?

All participants have tracks. There are three types of tracks:

* **Video**: data from video sources such as cameras or screens.
* **Audio**: data from audio inputs such as microphones.
* **Data**: other data generated by a participant within the application. This can be used for features like building a [whiteboarding application](https://github.com/twilio/draw-with-twilio), in-video chat, and more.

By default, when a participant connects to a video room, Twilio will request their local audio and video data. You can use `ConnectOptions` when you join a video room with the `connect` method to control whether or not a local participant sends their local video and audio data. For example, if you wanted to create an audio-only chat room, you could create a room and set `video: false` in `ConnectOptions`, and then the room would not get participants' video data:

```javascript
const room = await Twilio.Video.connect(token, {
    room: roomName,
    video: false,
  });
```

In this application, you'll receive both the audio and video data from participants.

### Publish and subscribe to tracks

Video room tracks follow a [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern. Participants publish their video, audio, and/or data tracks, making them available to other participants who can then subscribe to view them.

By default, participants publish their video and audio tracks when they join a room, and other participants automatically subscribe to those tracks. You can customize this behavior using the [Track Subscriptions API](/docs/video/api/track-subscriptions). For example, you could build mute functionality by stopping a participant from publishing their audio track, or create a presentation mode where audience members only subscribe to the presenter's audio.

In this tutorial, you'll use the default settings where every participant publishes and subscribes to all audio and video tracks.

### Display data from tracks

Given these details, you can now complete the `handleConnectedParticipant` function in `main.js`. You'll separate the logic into a few different pieces.

Remove the empty `handleConnnectedParticipant` function and replace it with the code below.

```javascript
const handleConnectedParticipant = (participant) => {
  // create a div for this participant's tracks
  const participantDiv = document.createElement("div");
  participantDiv.setAttribute("id", participant.identity);
  container.appendChild(participantDiv);

  // iterate through the participant's published tracks and
  // call `handleTrackPublication` on them
  participant.tracks.forEach((trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });

  // listen for any new track publications
  participant.on("trackPublished", handleTrackPublication);
};

const handleTrackPublication = () => {}
```

In the body of `handleConnectedParticipant`, you first create a new `<div>` element for a participant, where you'll put all of this participant's tracks. (This will be helpful when a participant disconnects from the video app — you can remove all of their tracks from the page by removing this `<div>`.)

Then, you loop through all of the participant's published tracks by looping over the [participant's `tracks` attribute](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Participant.html), which contains the participant's [`TrackPublication`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/TrackPublication.html) objects. A `TrackPublication` object represents a track that the participant published.

> \[!NOTE]
>
> `TrackPublication` objects can be either [`LocalTrackPublication`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/LocalTrackPublication.html) or [`RemoteTrackPublication`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/RemoteTrackPublication.html) objects. In this application's case, you don't need to distinguish between local or remote objects, because they're treated the same. You might want to distinguish between local and remote tracks if you wanted to do something like display the local participant's video differently than other participants' videos.

You pass those `TrackPublication` objects to a new function called `handleTrackPublication`, which will eventually add the track onto the page. `handleTrackPublication` is an empty function underneath the `handleConnectedParticipant` function now, but you'll complete it in the next step.

You also listen for any new track publications from a participant. Whenever there's a [trackPublished](/docs/video/api/track-subscriptions) event, the `handleTrackPublication` function runs.

> \[!NOTE]
>
> This section is complex, as you're dealing with several different objects: [`Participants`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Participant.html), [`TrackPublications`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/TrackPublication.html), and [`Tracks`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Track.html).
>
> It can be helpful to `console.log` these objects as you're starting to understand what they do. Feel free to add `console.log` statements throughout the code and take time to look at what the objects include. As an example, you might add `console.log` lines to the `handleConnectedParticipant` function and inspect the `participant` and `trackPublication` objects:
>
> ```javascript
>   // iterate through the participant's published tracks and
>   // call `handleTrackPublication` on them
>   console.log("participant: ", participant);
>   participant.tracks.forEach((trackPublication) => {
>     console.log("trackPublication: ", trackPublication);
>     handleTrackPublication(trackPublication, participant);
>   });
> ```

In the next function, `handleTrackPublication`, you'll be working with individual [`trackPublication`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/TrackPublication.html)s from a participant.

Remove the empty `handleTrackPublication` function, and replace it with the following code:

```javascript
const handleTrackPublication = (trackPublication, participant) => {
  function displayTrack(track) {
    // append this track to the participant's div and render it on the page
    const participantDiv = document.getElementById(participant.identity);
    // track.attach creates an HTMLVideoElement or HTMLAudioElement
    // (depending on the type of track) and adds the video or audio stream
    participantDiv.append(track.attach());
  }
};
```

First, you create an internal function, `displayTrack`, to handle rendering the data on the page. It will receive a track and find the `<div>` that you created earlier for containing all of a participant's tracks. Then, you'll call `track.attach()` and append that to the participant's `<div>`.

`track.attach()` creates either an [`HTMLVideoElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement), if the track is a [`VideoTrack`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/VideoTrack.html), or an [`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) for an [`AudioTrack`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/AudioTrack.html). It then adds the video or audio data stream to that HTML element. This is how video will ultimately show up on the page, and how the browser will play audio.

You'll only call `displayTrack` on tracks that you are subscribed to. Update the `handleTrackPublication` function with the following code, underneath the `displayTrack` function:

```javascript
// !mark(10,11,12,13,14,15,16,17)
const handleTrackPublication = (trackPublication, participant) => {
  function displayTrack(track) {
    // append this track to the participant's div and render it on the page
    const participantDiv = document.getElementById(participant.identity);
    // track.attach creates an HTMLVideoElement or HTMLAudioElement
    // (depending on the type of track) and adds the video or audio stream
    participantDiv.append(track.attach());
  }

  // check if the trackPublication contains a `track` attribute. If it does,
  // you've subscribed to this track. If not, you haven't subscribed.
  if (trackPublication.track) {
    displayTrack(trackPublication.track);
  }

  // listen for any new subscriptions to this track publication
  trackPublication.on("subscribed", displayTrack);
};
```

You can identify whether or not you've subscribed to a published track by checking if the `trackPublication` has a [`track`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Track.html) attribute. The `track` is the stream of audio, video, or data that you'll add to the page. If the `trackPublication` has a `track`, you've subscribed and you can display the data. Otherwise, you haven't subscribed to the published track yet.

This code also adds an event listener so that any time you subscribe to a new track, `displayTrack` runs.

Here's the full code for the `main.js` file:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");

const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);

  // render the local and remote participants' video and audio tracks
  handleConnectedParticipant(room.localParticipant);
  room.participants.forEach(handleConnectedParticipant);
  room.on("participantConnected", handleConnectedParticipant);
};

const handleConnectedParticipant = (participant) => {
  // create a div for this participant's tracks
  const participantDiv = document.createElement("div");
  participantDiv.setAttribute("id", participant.identity);
  container.appendChild(participantDiv);

  // iterate through the participant's published tracks and
  // call `handleTrackPublication` on them
  participant.tracks.forEach((trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });

  // listen for any new track publications
  participant.on("trackPublished", handleTrackPublication);
};

const handleTrackPublication = (trackPublication, participant) => {
  function displayTrack(track) {
    // append this track to the participant's div and render it on the page
    const participantDiv = document.getElementById(participant.identity);
    // track.attach creates an HTMLVideoElement or HTMLAudioElement
    // (depending on the type of track) and adds the video or audio stream
    participantDiv.append(track.attach());
  }

  // check if the trackPublication contains a `track` attribute. If it does,
  // you've subscribed to this track. If not, you haven't subscribed.
  if (trackPublication.track) {
    displayTrack(trackPublication.track);
  }

  // listen for any new subscriptions to this track publication
  trackPublication.on("subscribed", displayTrack);
};

const joinVideoRoom = async (roomName, token) => {
  // join the video room with the Access Token and the given room name
  const room = await Twilio.Video.connect(token, {
    room: roomName,
  });
  return room;
};

form.addEventListener("submit", startRoom);
```

You should now be able to go to `localhost:5000`, join a video room, and see your video. Then, from a separate tab, you can join the same room and see both participants' video and hear audio.

## Clean up

You now have a working Video application! The last piece is to clean up after a participant closes their browser or disconnects. In those cases, you should disconnect them from the room and stop displaying their video.

Copy and paste the following `handleDisconnectedParticipant` function in `public/main.js` under the `handleTrackPublication` function.

```javascript
const handleDisconnectedParticipant = (participant) => {
  // stop listening for this participant
  participant.removeAllListeners();
  // remove this participant's div from the page
  const participantDiv = document.getElementById(participant.identity);
  participantDiv.remove();
};
```

In this function, when a participant disconnects, you remove all the listeners you had on the participant, and remove the `<div>` containing their video and audio tracks.

Then, add an event listener in the `startRoom` function, underneath the calls to `handleConnectedParticipant`. When a `participantDisconnected` event happens, call the `handleDisconnectedParticipant` function that you wrote.

```javascript
// !mark(6,7)
  // render the local and remote participants' video and audio tracks
  handleConnectedParticipant(room.localParticipant);
  room.participants.forEach(handleConnectedParticipant);
  room.on("participantConnected", handleConnectedParticipant);

  // handle cleanup when a participant disconnects
  room.on("participantDisconnected", handleDisconnectedParticipant);
};
```

You'll also want to detect when someone closes the browser or navigates to a new page, so that you can disconnect them from the room. This alerts other participants that the participant left the room. Underneath the event listener for `participantDisconnected`, add two more event listeners: one for [`pagehide`](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event), and one for [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event). When either of these events occur, disconnect the local participant from the room.

```javascript
// !mark(3,4)
  // handle cleanup when a participant disconnects
  room.on("participantDisconnected", handleDisconnectedParticipant);
  window.addEventListener("pagehide", () => room.disconnect());
  window.addEventListener("beforeunload", () => room.disconnect());
};
```

Here's the final `main.js` with all of this functionality:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");

const startRoom = async (event) => {
  // prevent a page reload when a user submits the form
  event.preventDefault();
  // hide the join form
  form.style.visibility = "hidden";
  // retrieve the room name
  const roomName = roomNameInput.value;

  // fetch an Access Token from the join-room route
  const response = await fetch("/join-room", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomName: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);

  // render the local and remote participants' video and audio tracks
  handleConnectedParticipant(room.localParticipant);
  room.participants.forEach(handleConnectedParticipant);
  room.on("participantConnected", handleConnectedParticipant);

  // handle cleanup when a participant disconnects
  room.on("participantDisconnected", handleDisconnectedParticipant);
  window.addEventListener("pagehide", () => room.disconnect());
  window.addEventListener("beforeunload", () => room.disconnect());
};

const handleConnectedParticipant = (participant) => {
  // create a div for this participant's tracks
  const participantDiv = document.createElement("div");
  participantDiv.setAttribute("id", participant.identity);
  container.appendChild(participantDiv);

  // iterate through the participant's published tracks and
  // call `handleTrackPublication` on them
  participant.tracks.forEach((trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });

  // listen for any new track publications
  participant.on("trackPublished", handleTrackPublication);
};

const handleTrackPublication = (trackPublication, participant) => {
  function displayTrack(track) {
    // append this track to the participant's div and render it on the page
    const participantDiv = document.getElementById(participant.identity);
    // track.attach creates an HTMLVideoElement or HTMLAudioElement
    // (depending on the type of track) and adds the video or audio stream
    participantDiv.append(track.attach());
  }

  // check if the trackPublication contains a `track` attribute. If it does,
  // you've subscribed to this track. If not, you haven't subscribed.
  if (trackPublication.track) {
    displayTrack(trackPublication.track);
  }

  // listen for any new subscriptions to this track publication
  trackPublication.on("subscribed", displayTrack);
};

const handleDisconnectedParticipant = (participant) => {
  // stop listening for this participant
  participant.removeAllListeners();
  // remove this participant's div from the page
  const participantDiv = document.getElementById(participant.identity);
  participantDiv.remove();
};

const joinVideoRoom = async (roomName, token) => {
  // join the video room with the Access Token and the given room name
  const room = await Twilio.Video.connect(token, {
    room: roomName,
  });
  return room;
};

form.addEventListener("submit", startRoom);
```

> \[!NOTE]
>
> If your server is still running from earlier, `node-dev` should trigger it to restart when you make changes to `server.js`. If you stopped the server or if you're not sure it's running, restart it now by running `npm start` in your terminal. Make sure you're in the project root directory (`video_tutorial`).

## Test your application

Now that you've completed the code, it's time to test your video chat application! Follow these steps to test the functionality:

1. **Open the application**: Go to `localhost:5000` in your browser to display a form with the text "Enter a Room Name to join:" along with an input field and a "Join Room" button. Enter a room name like `my-test-room` in the input field and click "Join Room".
2. **Grant permissions**: When you click "Join Room", your browser will prompt you to allow access to your camera and microphone. Click "Allow" to grant these permissions.
3. **See your video**: After granting permissions, your own video will appear on the page. The page will hide the join form.
4. **Join from another tab**: Open a new browser tab (or use a different browser) and go to `localhost:5000` again. Enter the same room name (`my-test-room`) and click "Join Room".
5. **See both videos**: You will now see two video feeds on the page in each browser tab:
   * Your own video feed
   * The other participant's video feed
6. **Test audio**: Speak into your microphone to hear your voice coming through the other browser tab (you may want to wear headphones to avoid feedback).
7. **Test disconnect**: Close one of the browser tabs or navigate away from the page. The participant's video should disappear from the other tab.

If everything is working correctly, you now have a fully functional two-person video chat application!

> \[!NOTE]
>
> If you experience echo or feedback, make sure to use headphones or mute one of the browser tabs. This happens because the microphone picks up the audio from one tab and sends it to the other tab.

## Next steps

You're done! You now have a video chat application that you can use for connecting two people with audio and video.

Right now, the application is only running locally. To make it accessible to others without deploying the application, you can use ngrok. [Download ngrok](https://ngrok.com/download) and follow the setup instructions (you'll unzip the ngrok download file and can then start it up). Once it's downloaded, start ngrok on port 5000.

```bash
./ngrok http 5000
```

You should see output that looks like this:

```bash
ngrok by @inconshreveable                                                                                                                                         (Ctrl+C to quit)

Session Status                online
Update                        update available (version 2.3.40, Ctrl-U to update)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://04ae1f9f6d2b.ngrok.io -> http://localhost:5000
Forwarding                    https://04ae1f9f6d2b.ngrok.io -> http://localhost:5000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Copy the "Forwarding" address and send that to a friend so they can join your video chat!

There's so much more that you can add on to your application now that you've built the foundation. For example, you can:

* Add CSS to style the video application or [add overlays to the video](https://www.twilio.com/blog/add-an-overlay-to-web-video-chat)
* [Add virtual backgrounds](https://www.twilio.com/blog/change-background-video-calls-twilio-video-processors-library) or [create your own video effects](https://www.twilio.com/blog/custom-effect-filters-twilio-programmable-video) with the Video Processors library
* Add [muting/unmuting](https://www.twilio.com/blog/add-muting-unmuting-twilio-programmable-video-typescript) or video on/off functionality
* Provide feedback on a user's [network quality](/docs/video/using-network-quality-api) before they join a room, or have participants [check their audio and video](/docs/video/build-js-video-application-recommendations-and-best-practices#testing-the-microphone-and-camera) before entering a room

For more inspiration, check out the [Twilio Video React quick deploy app](https://github.com/twilio/twilio-video-app-react), which demonstrates a wide range of video functionality, or try out more [Video tutorials on the Twilio Blog](https://www.twilio.com/blog).
