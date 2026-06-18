# Get Started with Twilio Video Part 2: Creating the Frontend

This is the second part of the tutorial for getting started with Twilio Video using Python/Flask and JavaScript. In this part, you'll create a JavaScript frontend that can connect to the [backend Flask web server you created in Part One](/docs/video/tutorials/get-started-with-twilio-video-python-flask-server). If you haven't already created a backend server, refer back to the server code and setup in Part One, and then come back to complete this section.

You can also view the [completed code from both parts of the tutorial](https://github.com/TwilioDevEd/intro-video-tutorial-python) in GitHub.

Before beginning this tutorial, you should ensure you are using one of the [supported browsers](/docs/video/javascript#supported-browsers) for the Twilio Video JavaScript SDK.

## Create the HTML file

In the project's root directory (`video_tutorial` or whatever you named the project's main directory), create a `templates` directory. This is where you'll store your HTML files. To make the new directory, run the following command in your terminal:

```bash
mkdir templates
```

In this application, you'll only need one HTML file. Create a new file called `index.html` in the `templates` directory. This file will contain the HTML structure for the video application, which should include:

* A link to the Twilio Video JavaScript SDK CDN.
* A form where a user can enter the name of the Room they'd like to join.
* A `<div>` where Participants' videos will be displayed after they've joined.
* A link to a `main.js` file, which is where you'll write the code for controlling the video application.

Add the following code to `templates/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Twilio Video Demo</title>
    {/* Twilio Video CDN */}
    <script src="https://sdk.twilio.com/js/video/releases/2.15.2/twilio-video.min.js"></script>
  </head>
  <body>
    <form id="room-name-form">
      Enter a Room Name to join: <input name="room_name" id="room-name-input" />
      <button type="submit">Join Room</button>
    </form>
    <div id="video-container"></div>
    <script src="static/main.js"></script>
  </body>
</html>
```

Note that this `index.html` file links to version 2.15.2 of the Twilio Video JavaScript SDK. You can find the CDN link for [the most recent version of the Twilio Video JavaScript SDK here](https://sdk.twilio.com/js/video/latest/docs/).

Next, you'll want to have your Flask server render this `index.html` template when someone goes to your web app, instead of showing the string "In progress!" as it does right now. In your `app.py` file, change the line that returns "In progress!" to `return render_template("index.html")`.

```python
# !mark(3)
@app.route("/")
def serve_homepage():
    return render_template("index.html")
```

If your server is not running, make sure you are in your virtual environment by running `source venv/bin/activate` (MacOS/Unix) or `venv\Scripts\activate.bat` (Windows). Then, start up the server by running the following command:

```bash
python app.py
```

After the server starts, navigate to `localhost:5000` in your browser. You should see the form with an input box and a submit button.

> \[!NOTE]
>
> If you don't see the form, check your terminal to make sure there are no errors in your Flask server. If there are errors, fix those and refresh the page. If there are no errors, try adding a `print()` statement in the `serve_homepage` function in `app.py` to make sure that function runs when you go to `localhost:5000`. You can also add a `console.log` statement in `index.html` to make sure the file renders correctly.
>
> If the server doesn't start and you see an error that port 5000 is already in use, run the following command to free the port:
>
> ```bash
> kill $(lsof -t -i:5000)
> ```

## Start the JavaScript file

In `index.html`, you linked to a JavaScript file that doesn't exist yet. In this step, you'll create it and start adding code.

In a second terminal window, navigate to your main project directory, and create a new directory called `static` in the root directory of the project:

```bash
mkdir static
```

Then, create a file called `main.js` within the `static` directory, and open that file in a text editor.

First, you'll create variables for the `form`, video container `div`, and `input` HTML elements, to identify them later. Copy and paste the following code into the `static/main.js` file:

```javascript
const form = document.getElementById("room-name-form");
const roomNameInput = document.getElementById("room-name-input");
const container = document.getElementById("video-container");
```

Next, you'll create a function called `startRoom` that you'll call when the form is submitted. Copy and paste the following code into the `static/main.js` file, under the variable declarations:

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
    body: JSON.stringify({ room_name: roomName }),
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

You can now navigate to `localhost:5000` in your browser, enter a room name in the form, click "Join Room", and see the Access Token in the browser's console. (You'll need to open the Developer Tools for your browser to see the console.)

Here's the full code for `static/main.js` so far:

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
    body: JSON.stringify({ room_name: roomName }),
  });
  const { token } = await response.json();
  console.log(token);
};

form.addEventListener("submit", startRoom);
```

> \[!NOTE]
>
> This tutorial uses [Group](/docs/video/tutorials/understanding-video-rooms#video-rooms) rooms, which support up to 50 participants. If you request Access Tokens for more than the maximum number of participants in one room, you'll receive an error that there are too many participants in the room. This tutorial doesn't cover error handling in these cases — for now, if you run into this error, you can try joining a new room with a different name. You'll see the error appear in your browser's console if it happens.

## Join a Twilio Video Room

Now that your application can retrieve an Access Token, you can use that token to join the video room in the browser. The Twilio Video JavaScript SDK has a `connect` method that you can call to connect to a Twilio Video room.

Copy and paste the following code underneath the `startRoom` function in `static/main.js`.

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
    body: JSON.stringify({ room_name: roomName }),
  });
  const { token } = await response.json();

  // join the video room with the token
  const room = await joinVideoRoom(roomName, token);
  console.log(room);
};
```

Now if you navigate to `localhost:5000` in your browser, enter a room name, and click "Join Room", you'll connect to a Twilio Video room. If you open your browser's console, you should see a log line with the room object. You might also be prompted to grant browser access to your camera and microphone devices, because once you connect to a video room, the room will start receiving your audio and video data.

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
    body: JSON.stringify({ room_name: roomName }),
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

## Understand and handle Participants

Once a web client joins a video room with an Access Token, it becomes a [Participant](/docs/video/api/participants) in the room. The Twilio Video JavaScript SDK distinguishes between local and remote participants; a web client's local participant is the one who joined the video room from that browser, and all other participants are considered remote participants.

After you've successfully connected to a video room, you'll want to display each participant's video and audio on the page. The room object you got back from the `connect` method has an attribute called `localParticipant`, which represents the local participant, and an attribute called `participants`, which is a list of the remote participants that are connected to the room.

### Display Participants' audio and video data

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
    body: JSON.stringify({ room_name: roomName }),
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

## Display Participants' audio and video tracks

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

Video room tracks follow a [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern. A participant publishes their video, audio, and/or data tracks, and all other participants can subscribe to those published tracks. A participant cannot subscribe to an unpublished track.

When a participant publishes a track, it means they are making the data from that track available to other participants. By default, participants will publish their video and audio tracks when they join a room. A local participant can choose to unpublish or disable certain tracks as well. You can take advantage of this to build something like mute functionality; you could write a function that allows a local participant to stop publishing their audio track. This would make the audio track no longer available to other participants in the room, while still keeping their video track available.

You can update the default track subscription setting with the [Track Subscriptions API](/docs/video/api/track-subscriptions), which allows you to specify which tracks to subscribe to automatically. For example, if you were building a video presentation application, you might want participants to only subscribe to one participant's audio track (the presenter), and not subscribe to anyone else's (the audience).

In this tutorial, you'll stick with the default track publication setting, with every participant publishing their audio and video tracks, and other participants automatically subscribing to those tracks.

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
  participant.on("trackPublished", (trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });
};

const handleTrackPublication = () => {}
```

In the body of `handleConnectedParticipant`, you first create a new `<div>` element for a participant, where you'll put all of this participant's tracks. (This will be helpful when a participant disconnects from the video app — you can remove all of their tracks from the page by removing this `<div>`.)

Then, you loop through all of the participant's published tracks by looping over the [participant's `tracks` attribute](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Participant.html), which contains the participant's [`TrackPublication`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/TrackPublication.html) objects. A `TrackPublication` object represents a track that has been published.

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

`track.attach()` creates either an [`HTMLVideoElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement), if the track is a [`VideoTrack`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/VideoTrack.html), or an [`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) for an [`AudioTrack`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/AudioTrack.html). It then adds the video or audio data stream to that HTML element. This is how video will ultimately show up on the page, and how audio will be played.

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
  // we are subscribed to this track. If not, we are not subscribed.
  if (trackPublication.track) {
    displayTrack(trackPublication.track);
  }

  // listen for any new subscriptions to this track publication
  trackPublication.on("subscribed", displayTrack);
};
```

You can identify whether or not you are subscribed to a published track by seeing if the `trackPublication` has a [`track`](https://sdk.twilio.com/js/video/releases/2.15.2/docs/Track.html) attribute. The `track` is the stream of audio, video, or data that you'll add to the page. If the `trackPublication` does have a `track`, this participant is subscribed and you can display the data. Otherwise, this local participant has not been subscribed to the published track.

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
    body: JSON.stringify({ room_name: roomName }),
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
  participant.on("trackPublished", (trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });
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
  // we are subscribed to this track. If not, we are not subscribed.
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

Copy and paste the following `handleDisconnectedParticipant` function in `static/main.js` under the `handleTrackPublication` function.

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

You'll also want to detect when someone closes the browser or navigates to a new page, so that you can disconnect them from the room. This way, other participants can be alerted that the participant left the room. Underneath the event listener for `participantDisconnected`, add two more event listeners: one for [`pagehide`](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event), and one for [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event). When either of these events occur, the local participant should disconnect from the room.

```javascript
// !mark(3,4)
  // handle cleanup when a participant disconnects
  room.on("participantDisconnected", handleDisconnectedParticipant);
  window.addEventListener("pagehide", () => room.disconnect());
  window.addEventListener("beforeunload", () => room.disconnect());
};
```

## Handle remote participant track publications

When listening for new track publications from remote participants, make sure you pass `participant` explicitly to the handler. The `trackPublished` event only emits a single argument: the `trackPublication` object. If your handler expects both `trackPublication` and `participant`, the second argument is `undefined`, and the remote participant's video and audio tracks silently fail to render.

Wrap the call in an arrow function so that `participant` is captured from the enclosing scope:

```js
// participant is passed explicitly via closure
participant.on("trackPublished", (trackPublication) => {
  handleTrackPublication(trackPublication, participant);
});
```

Without this, only the local participant's tracks display. When a second user joins the room, their tracks are published but never attached to the page because `document.getElementById(undefined)` returns `null`, causing the `append()` call to fail.

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
    body: JSON.stringify({ room_name: roomName }),
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
  participant.on("trackPublished", (trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  });
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
  // we are subscribed to this track. If not, we are not subscribed.
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

## Test the application

With the final `main.js` and `app.py` in place, you can test the full video application.

1. Make sure you're in your virtual environment. If not, activate it:

   ```bash
   source venv/bin/activate
   ```
2. Start the Flask server:

   ```bash
   python app.py
   ```
3. Open your browser and navigate to `localhost:5000`. You should see a form with an input field labeled "Enter a Room Name to join" and a **Join Room** button.
4. Enter a room name (for example, "my-room") and click **Join Room**. Your browser may prompt you to grant access to your camera and microphone. After you allow access, you should see:
   * The form disappears.
   * Your own video feed appears on the page.
5. Open a second browser tab (or a different browser) and navigate to `localhost:5000`. Enter the same room name and click **Join Room**. You should now see:
   * Both participants' video feeds displayed on the page.
   * Audio from both participants playing through your speakers.
6. Close one of the tabs. The remaining participant's page should update to show only their own video, confirming that the disconnect cleanup is working.

> \[!NOTE]
>
> If you don't see video or hear audio, open your browser's Developer Tools console and check for errors. Common issues include:
>
> * The browser blocked camera or microphone access. Check your browser's site permissions.
> * The Flask server isn't running. Verify there are no errors in the terminal where you started the server.
> * The `.env` file is missing or has incorrect credentials. Double-check your Account SID, API Key SID, and API Key Secret.

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
