# Get Started with Twilio Video Part 1: Creating a server with Node or Express

This is the first part of a two-part tutorial for creating a video web application with a Node or Express backend and a JavaScript frontend. In this section, you'll set up a backend server that creates Twilio [Group video rooms](/docs/video/tutorials/understanding-video-rooms) and generates Access Tokens for video room participants. In part two, you'll create the frontend side of the application, where participants can join a video room and share their video and audio with other participants.

At the end of this full tutorial, you'll have a web application that allows you to join a two-person video room and video chat with another person.

If you've already completed the backend section of this tutorial, jump over to [Part Two](/docs/video/tutorials/get-started-with-twilio-video-node-express-frontend).

## Setup

### Requirements

* [Node.js](https://nodejs.org/en/) (most recent LTS version) and [npm](https://www.npmjs.com/) installed on your machine
* A free Twilio account. Sign up for a [free account](https://www.twilio.com/try-twilio) or [log into an existing account](https://www.twilio.com/console).
* [VS Code](https://code.visualstudio.com/). You can use any code editor you like, but this tutorial uses VS Code, so the instructions will be specific to that editor.

### Create the project directory

Open a terminal window and go to the directory where you want your project to live. Then, create a project folder and change into this directory:

```bash
mkdir video_tutorial && cd video_tutorial
```

### Collect account values and store them in a `.env` file

To start, you'll need to collect a few values from the [Twilio Console](https://www.twilio.com/console) so that you can connect your application to Twilio. You'll store these values in a `.env` file, and your server will read in these values.

Within the project folder you created above, create a file called `.env`.

The first value you'll need is your Account SID, which you can find in the [Twilio Console](https://www.twilio.com/console). Once you've gotten that value, store it in the `.env` file:

```bash
TWILIO_ACCOUNT_SID=<your account sid>
```

#### Create an API key

Next, you'll need to create an [API key](/docs/glossary/what-is-an-api-key). This is what you'll use to authenticate with Twilio when making API calls.

You can create an API key using the [Twilio CLI](/docs/twilio-cli/quickstart), the [REST API](/docs/iam/api-keys/key-resource-v2010), or the [Twilio Console](https://www.twilio.com/console/project/api-keys). This tutorial will show how to generate it via the Console.

To generate the API Key from the Twilio Console:

* Go to the [API keys section of the Twilio Console](https://www.twilio.com/console/project/api-keys) and click "Create API key."
* Give the key a friendly name, such as "First Video Project."
* Choose "United States (US1)" for the Region. **Keys created outside the United States (US1) region won't work.**
* Choose "Standard" for the key type.
* Click "Create API Key".

When you've created the key, you'll see the friendly name, type, key SID, and API key secret.

> \[!WARNING]
>
> Make sure to copy the secret because you'll only be able to see it once. When you leave this page, you won't be able to see the secret again.

Copy the API Key ID and the API Key Secret and store both values in the `.env` file.

```bash
# !mark(2,3)
TWILIO_ACCOUNT_SID=<your account sid>
TWILIO_API_KEY_SID=<key sid>
TWILIO_API_KEY_SECRET=<secret>
```

### Secure your credentials

If you're using git for version control, [make sure these credentials remain secure](/docs/usage/secure-credentials) and out of version control. To do this, create a `.gitignore` file at the root of your project directory. In this file, you can list the files and directories that you want git to ignore from being tracked or committed.

Open the `.gitignore` file in your code editor and add the `.env` file. While you're here, you can also add `node_modules/` for the dependencies folder you'll install in the next step.

```bash
.env
node_modules/
```

After you've stored those credentials and added the `.env` to `.gitignore`, you can move on to creating the Express server.

### Install the dependencies

First, set up a Node.js project with a default `package.json` file by running the following command:

```bash
npm init --yes
```

Once you've got your `package.json` file, you're ready to install the needed dependencies.

For this project, you'll need the following packages:

* [Express](https://expressjs.com/), a Node.js framework
* [Twilio Node SDK](https://github.com/twilio/twilio-node), to use the Twilio APIs
* [dotenv](https://www.npmjs.com/package/dotenv), to load the environment variables from a `.env` file into your application
* [node-dev](https://www.npmjs.com/package/node-dev), to restart the Node process when you modify a file
* [uuid](https://www.npmjs.com/package/uuid), to generate random values for participant identities

Run the following command to install the dependencies:

```bash
npm install express twilio dotenv node-dev uuid
```

If you check your `package.json` file, you'll notice that the packages above have been installed as `dependencies`.

### Configure package.json

After installing the dependencies, you need to make a few modifications to your `package.json` file to ensure the project works correctly with modern JavaScript modules.

Open `package.json` in your text editor and update it to match the following configuration:

```json
{
  "name": "video_tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node-dev server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "node-dev": "^8.0.0",
    "twilio": "^5.12.2",
    "uuid": "^13.0.0"
  }
}
```

The key changes to note are:

* Adding `"type": "module"` to use ES6 module syntax
* Adding a `start` script in the `scripts` section that uses `node-dev` to run the server with reloading when files change

## Create the server

You'll need a server to generate [Access Tokens](/docs/iam/access-tokens) to grant participants permission to access a video room. The server will also serve the frontend code that you'll build in Part Two of this tutorial. There are several options for creating web servers with Node.js, but this tutorial uses [Express](https://expressjs.com/).

This section walks through the general setup for a basic Express server. In the next section, you'll add the Twilio-specific code for creating video rooms.

First, create a file called `server.js` at the root of the project directory. This will be the server file where you put all the core logic for your web server. Open that file in your text editor and copy and paste the following code into the file:

```javascript
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";
import express from "express";

dotenv.config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const app = express();
const port = 5000;

// use the Express JSON middleware
app.use(express.json());

// create the twilioClient
const twilioClient = twilio(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
```

This code pulls in the required dependencies for the server, loads the environment variables from your `.env` file, and starts an Express application. The application runs on port 5000. This code also creates a Twilio client with the Twilio Node SDK. You'll use this client to communicate with Twilio.

At the bottom of the code, you start the Express server on port 5000.

To run the server using the `start` script you configured earlier in `package.json`, return to your terminal window and run the following command:

```bash
npm start

```

After the server starts, you'll see the following log statement in your terminal window:

```bash
Express server running on port 5000
```

## Create rooms

You'll use the `twilioClient` you created earlier in `server.js` and write a function to create video rooms.

In `server.js`, underneath where you created the `twilioClient` variable, paste in the following function:

```javascript
const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};
```

In the code above, you create a function called `findOrCreateRoom`. This function takes in a room name and checks if an in-progress video room with that name already exists for your account. If that room doesn't exist, you'll get [Error 20404](/docs/api/errors/20404), which indicates that you need to create the room.

This function will create the room as a [Group room](/docs/video/tutorials/understanding-video-rooms) (`type: "group"`). Group rooms use Twilio cloud infrastructure to relay media between participants, which provides better quality and scalability than peer-to-peer connections.

Eventually, you'll use this function to allow a participant to specify a room to either create or join. In the next section, you'll write a function to create an Access Token for a participant.

Here's the full `server.js` code with the `findOrCreateRoom` function:

```javascript
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";
import express from "express";

dotenv.config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const app = express();
const port = 5000;

// use the Express JSON middleware
app.use(express.json());

// create the twilioClient
const twilioClient = twilio(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
```

## Generate an Access Token for a Participant

Next, you'll create a function that returns an Access Token for a participant. An Access Token gives a participant permission to join video rooms.

The Access Token will be in the [JSON Web Token (JWT)](https://jwt.io/) standard. The Node Twilio SDK contains functions for creating and decoding these tokens in the JWT format.

Copy and paste the following `getAccessToken` function in `server.js`, under the `findOrCreateRoom` function:

```javascript
const getAccessToken = (roomName) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    // generate a random unique identity for this participant
    { identity: uuidv4() }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
};
```

The function does the following:

* Takes in a room name
* Creates an Access Token (in [JWT](https://jwt.io/) format)

  * Generates a unique string for a participant's identity (see note below about the participant identity requirement)
* Creates a Video Grant
* Adds it to the Access Token
* Returns the token in serialized format

> \[!NOTE]
>
> The participant identity doesn't need to be a random string—it could be a value like an email, a user's name, or a user ID. However, each participant currently connected to a room must have a unique identity. If a second participant joins with the same identity as someone already in the room, Twilio will disconnect the first participant.

The [Video Grant](/docs/video/tutorials/user-identity-access-tokens#about-access-tokens) is important to add to the token, because it is the piece that allows a participant to connect to video rooms. You can limit the participant's access to a particular video room (which the code above does), or you can generate a token with general access to video rooms.

If you were going to connect this application with other Twilio services, you could create additional grants. For example, you could add Sync or Conversation grants to allow access to [Twilio Sync](/docs/sync/api) or [Twilio Conversations](https://www.twilio.com/en-us/messaging/conversations-api).

Here's the full server code with the added `getAccessToken` function:

```javascript
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";
import express from "express";

dotenv.config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const app = express();
const port = 5000;

// use the Express JSON middleware
app.use(express.json());

// create the twilioClient
const twilioClient = twilio(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

const getAccessToken = (roomName) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    // generate a random unique identity for this participant
    { identity: uuidv4() }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
};

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
```

## Put it all together in a route

Next, you'll create a route called `/join-room`. In Part Two of this Tutorial, your frontend application will make a `POST` request to this `/join-room` route with a `roomName` in the body of the request.

Copy and paste the following code in `server.js`, underneath the `getAccessToken` function:

```javascript
app.post("/join-room", async (req, res) => {
  try {
    // return 400 if the request has an empty body or no roomName
    if (!req.body || !req.body.roomName) {
      return res.status(400).send("Must include roomName argument.");
    }
    const roomName = req.body.roomName;
    // find or create a room with the given roomName
    await findOrCreateRoom(roomName);
    // generate an Access Token for a participant in this room
    const token = getAccessToken(roomName);
    res.send({
      token: token,
    });
  } catch (error) {
    console.error("Error in /join-room:", error);
    res.status(500).send({
      error: error.message,
    });
  }
});
```

This route takes a `POST` request containing a JSON object with a room name, and then calls the `findOrCreateRoom` function and the `getAccessToken` function. It returns the serialized Access Token, which is a [JSON Web Token (JWT)](https://jwt.io/). The route includes error handling to catch and return any errors that occur during room creation or token generation.

Here's the final server file with all of these pieces:

```javascript
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";
import express from "express";

dotenv.config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const app = express();
const port = 5000;

// use the Express JSON middleware
app.use(express.json());

// create the twilioClient
const twilioClient = twilio(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

const getAccessToken = (roomName) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    // generate a random unique identity for this participant
    { identity: uuidv4() }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });
  // Note: You can generate multiple Access Tokens with the same identity.
  // The identity must be unique among participants currently connected to the room.
  // If a second participant joins with the same identity, Twilio disconnects the first
  // participant (see Error 53205).
  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
};

app.post("/join-room", async (req, res) => {
  try {
    // return 400 if the request has an empty body or no roomName
    if (!req.body || !req.body.roomName) {
      return res.status(400).send("Must include roomName argument.");
    }
    const roomName = req.body.roomName;
    // find or create a room with the given roomName
    await findOrCreateRoom(roomName);
    // generate an Access Token for a participant in this room
    const token = getAccessToken(roomName);
    res.send({
      token: token,
    });
  } catch (error) {
    console.error("Error in /join-room:", error);
    res.status(500).send({
      error: error.message,
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
```

Test this route by running the server (with the command `npm start`) and making a `POST` request to `http://localhost:5000/join-room`. You can use [curl](https://curl.se/), [Postman](https://www.postman.com/), [HTTPie](https://httpie.io/), or another tool for making this request. To make the request using `curl`, run the following command in your terminal:

```bash
curl -X POST http://localhost:5000/join-room \
-H "Content-Type: application/json" \
--data '{"roomName": "test room!"}'
```

The output will be similar to the output below:

```bash
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0..."
}
```

You can use the site [jwt.io](https://jwt.io/) to inspect the token you received and see the different components that make up the Access Token. If you paste the token you received into the jwt.io debugger, it will decode the token and show you what the token includes. The token contains a video grant for the specific room you created. The token will also include fields with other information you provided:

* `iss`: your `TWILIO_API_KEY_SID`
* `sub`: your `TWILIO_ACCOUNT_SID`
* `identity`: the randomly generated uuid for the participant's identity

> \[!WARNING]
>
> If the curl request hangs or you receive authentication errors, check that your `.env` file is located in the root of your project directory (the same directory as `server.js`). If the `.env` file is in the wrong location, the server won't be able to load your Twilio credentials, which will cause the request to fail or hang.

You've got a working backend server that will create video rooms and generate Access Tokens. You're done with this section of the tutorial and can move on to [Part Two](/docs/video/tutorials/get-started-with-twilio-video-node-express-frontend), where you'll create the frontend for this web app.
