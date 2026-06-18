# Get Started with Twilio Video Part 1: Creating a Server with Python/Flask

This is the first part of a two-part tutorial for creating a video web application with a Python3/Flask backend and a JavaScript frontend. In this section, you'll set up a backend server that creates Twilio [Group](/docs/video/tutorials/understanding-video-rooms#video-rooms) video rooms and generates Access Tokens for video room participants. In part two, you'll create the frontend side of the application, where participants can join a video room and share their video and audio with other participants.

At the end of this full tutorial, you'll have a web application that allows you to join a video room and video chat with other participants.

You can also view the [completed code from both parts of the tutorial](https://github.com/TwilioDevEd/intro-video-tutorial-python) in GitHub.

If you have already completed the backend section of this tutorial, jump over to [Part Two](/docs/video/tutorials/get-started-with-twilio-video-python-flask-frontend). Otherwise, let's get started.

## Setup

### Requirements

* [Python](https://wiki.python.org/moin/BeginnersGuide/Download) (version 3.6 or higher)
* [pip](https://pip.pypa.io/en/stable/installation/) (for installing Python packages)
* A free Twilio account. Sign up for a [free account](https://www.twilio.com/try-twilio) or [log into an existing account](https://www.twilio.com/console).

### Create the project directory

Open a new terminal window and navigate to the directory where you want your project to live. Then, create a project folder and change into this directory:

```bash
mkdir video_tutorial && cd video_tutorial
```

### Collect account values and store them in a `.env` file

To start, you'll need to collect a few values from the [Twilio Console](https://www.twilio.com/console) so that you can connect your application to Twilio. You will store these values in a `.env` file, and your server will read in these values.

Within the new project folder you created above, create a file called `.env` and open it in your preferred text editor.

The first value you'll need is your Account SID, which you can find in the [Twilio Console](https://www.twilio.com/console). Once you've gotten that value, store it in the `.env` file:

```bash
TWILIO_ACCOUNT_SID=<your account sid>
```

### Create an API key

Next, you'll need to create an [API key](/docs/glossary/what-is-an-api-key). This is what you'll use to authenticate with Twilio when making API calls.

You can create an API key using the [Twilio CLI](/docs/twilio-cli/quickstart), the [REST API](/docs/iam/api-keys/key-resource-v2010), or the [Twilio Console](https://www.twilio.com/console/project/api-keys). This tutorial will show how to generate it via the Console.

To generate the API Key from the Twilio Console:

* Go to the [API keys section of the Twilio Console](https://www.twilio.com/console/project/api-keys) and click **Create API key**.
* Give the key a friendly name, such as "First Video Project".
* Choose **United States (US1)** for the **Region**. **Keys created outside the United States (US1) region don't work.**
* Choose **Standard** for the key type.
* Click **Create API Key**.

When you've created the key, you'll see the friendly name, type, key SID, and API key secret.

> \[!WARNING]
>
> Make sure to copy the secret now, because you'll only be able to see it once. When you leave this page, you won't be able to see the secret again.

Copy the API Key ID and the API Key Secret and store both values in the `.env` file.

```bash
# !mark(2,3)
TWILIO_ACCOUNT_SID=<your account sid>
TWILIO_API_KEY_SID=<key sid>
TWILIO_API_KEY_SECRET=<secret>
```

### Secure your credentials

If you're using git for version control, [make sure these credentials remain secure](/docs/usage/secure-credentials) and out of version control. To do this, create a `.gitignore` file at the root of your project directory. In this file, you can list the files and directories that you want git to ignore from being tracked or committed.

Open the new `.gitignore` file in your code editor and add the `.env` file. While you're here, you can also add `venv/`, for the virtual environment directory you'll create in the next step.

```bash
.env
venv/
```

Now that you've stored those credentials and added the `.env` to `.gitignore`, you can move on to creating the Flask server.

### Install the dependencies

First, you'll need to create and activate a [virtual environment](https://docs.python.org/3/library/venv.html) where you'll install your dependencies. In your terminal window, run the following command to create a virtual environment called `venv`:

```bash
python3 -m venv venv
```

Then, activate the virtual environment. Whenever you run the server for this project or install dependencies, you should be in the virtual environment.

To activate the virtual environment for macOS or Unix, run the following command:

```bash
source venv/bin/activate
```

If you are using a Windows machine, run:

```bash
venv\Scripts\activate.bat
```

Then, you'll use [pip](https://pypi.org/project/pip/) to install the dependencies for this project:

* [flask](https://pypi.org/project/Flask/), the web framework you'll use for creating the server
* [twilio](https://pypi.org/project/twilio/), the Twilio Python SDK
* [python-dotenv](https://pypi.org/project/python-dotenv/), for retrieving the environment variables you stored in the .env file

In your terminal window, run the following command:

```bash
pip install flask python-dotenv twilio
```

This command will add the dependencies to your virtual environment. Whenever you start your server, make sure you're in the virtual environment by running `source venv/bin/activate` (macOS/Unix) or `venv\Scripts\activate.bat` (Windows). You'll know that you're in the virtual environment because you'll see `(venv)` at the beginning of the command line prompt.

## Create the server

You will need a server to generate [Access Tokens](/docs/iam/access-tokens) (to grant participants permission to access a video room) and serve the frontend code that you'll build in Part Two of this tutorial. There are several options for creating web servers with Python, but this tutorial uses [Flask](https://flask.palletsprojects.com/en/2.0.x/).

This section walks through the general setup for a basic Flask server. In the next section, you'll add the Twilio-specific code for creating video rooms.

First, create a new file called `app.py`. This will be the server file where you put all the core logic for your web server. Open that file in your text editor, and copy and paste the following code into the file:

```python
import os
import uuid  # for generating random user id values

import twilio.jwt.access_token
import twilio.jwt.access_token.grants
import twilio.rest
from dotenv import load_dotenv
from flask import Flask, render_template, request

# Load environment variables from a .env file
load_dotenv()

# Create a Twilio client
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
api_key = os.environ["TWILIO_API_KEY_SID"]
api_secret = os.environ["TWILIO_API_KEY_SECRET"]
twilio_client = twilio.rest.Client(api_key, api_secret, account_sid)

# Create a Flask app
app = Flask(__name__)


# Create a route that just returns "In progress"
@app.route("/")
def serve_homepage():
    return "In progress!"


# Start the server when this file runs
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

At the top of the file, you import the dependencies needed for the server. Then, you load the values in your `.env` file with `load_dotenv` and grab the values from the environment. Using those values, you can create a client with the Twilio Python SDK. You'll use this client to communicate with Twilio.

Next, you create a basic Flask app. Currently, it is just an application with a single route that returns "In progress!".

At the bottom of the file, the server is set to run in debug mode. When the server is in debug mode, it will provide helpful error messages and it will automatically reload the server when you make changes to it. You should remove `debug=True` if you run this server in production.

Currently, the application doesn't do much, but you can test it by running the command `python app.py` in your terminal, making sure you're in your virtual environment. You should see output similar to the following:

```bash
python app.py
```

It will display output similar to the following:

```bash
(venv) $ python app.py
 * Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://192.168.86.244:5000/ (Press CTRL+C to quit)
```

> \[!NOTE]
>
> If you see an error that says "ModuleNotFoundError: No module named 'flask'" or a similar error for one of the other dependencies, make sure that you have activated your virtual environment and installed the dependencies in that environment.
> And that you are in the correct directory when you run the command `python app.py`.

This will start the server on port 5000. Navigate to `localhost:5000` in your browser, and you should see the string "In progress!".

Now that you have a functioning web server, you'll create a function that tells Twilio to create or find a video room.

## Create rooms

You'll use the `twilio_client` you created earlier in `app.py`, and write a function to create new video rooms.

In `app.py`, underneath where you create the app (`app=Flask(__name__)`) and above the `"/"` route, paste in the following function:

```python
def find_or_create_room(room_name):
    try:
        # try to fetch an in-progress room with this name
        twilio_client.video.rooms(room_name).fetch()
    except twilio.base.exceptions.TwilioRestException:
        # the room did not exist, so create it
        twilio_client.video.rooms.create(unique_name=room_name, type="group")
```

In the code above, you create a function called `find_or_create_room`, which takes in a room name and checks if a video room with that name already exists for your account. If that room doesn't exist, you'll get a `TwilioRestException`, which will indicate that you should create the room.

This function will create the room as a [Group](/docs/video/tutorials/understanding-video-rooms#video-rooms) room (`type="group"`), which supports up to 50 participants.

Eventually, you'll use this function to allow a participant to specify a room to either create or join. In the next section, you'll write a function to create an Access Token for a participant.

Here's the full `app.py` code with the new `find_or_create_room` function:

```python
import os
import uuid  # for generating random user id values

import twilio.jwt.access_token
import twilio.jwt.access_token.grants
import twilio.rest
from dotenv import load_dotenv
from flask import Flask, render_template, request

# Load environment variables from a .env file
load_dotenv()

# Create a Twilio client
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
api_key = os.environ["TWILIO_API_KEY_SID"]
api_secret = os.environ["TWILIO_API_KEY_SECRET"]
twilio_client = twilio.rest.Client(api_key, api_secret, account_sid)

# Create a Flask app
app = Flask(__name__)


def find_or_create_room(room_name):
    try:
        # try to fetch an in-progress room with this name
        twilio_client.video.rooms(room_name).fetch()
    except twilio.base.exceptions.TwilioRestException:
        # the room did not exist, so create it
        twilio_client.video.rooms.create(unique_name=room_name, type="group")


# Create a route that just returns "In progress"
@app.route("/")
def serve_homepage():
    return "In progress!"


# Start the server when this files runs
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

## Generate an Access Token for a participant

Now, you'll create a function that returns an Access Token for a participant. An Access Token gives a participant permission to join video rooms.

The Access Token will be in the [JSON Web Token (JWT)](https://jwt.io/) standard. The Python Twilio SDK contains functions for creating and decoding these tokens in the JWT format.

Copy and paste the following `get_access_token` function into `app.py`, under the `find_or_create_room` function:

```python
def get_access_token(room_name):
    # create the access token
    access_token = twilio.jwt.access_token.AccessToken(
        account_sid, api_key, api_secret, identity=uuid.uuid4().int
    )
    # create the video grant
    video_grant = twilio.jwt.access_token.grants.VideoGrant(room=room_name)
    # Add the video grant to the access token
    access_token.add_grant(video_grant)
    return access_token
```

The function does the following:

* Takes in a room name
* Creates an Access Token (in [JWT](https://jwt.io/) format)

  * Generates a unique string for a participant's identity (see note below about the participant identity requirement)
* Creates a Video Grant
* Adds it to the Access Token
* Returns the token

> \[!NOTE]
>
> The participant identity doesn't need to be a random string — it could be a value like an email, a user's name, or a user ID. However, it does need to be a unique value for the specific room. You cannot create more than one token for a given participant identity in a room.

The [Video Grant](/docs/video/tutorials/user-identity-access-tokens#about-access-tokens) is important to add to the token, because it is the piece that allows a participant to connect to video rooms. You can limit the participant's access to a particular video room (which the code above does), or you can generate a token with general access to video rooms.

If you were going to connect this application with other Twilio services, such as [Twilio Sync](/docs/sync/api) or [Twilio Conversations](https://www.twilio.com/en-us/messaging/conversations-api), you could create additional Sync or Conversation grants and add them to this token to allow access to those services as well.

Here's the full server code with the added `get_access_token` function:

```python
import os
import uuid  # for generating random user id values

import twilio.jwt.access_token
import twilio.jwt.access_token.grants
import twilio.rest
from dotenv import load_dotenv
from flask import Flask, render_template, request

# Load environment variables from a .env file
load_dotenv()

# Create a Twilio client
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
api_key = os.environ["TWILIO_API_KEY_SID"]
api_secret = os.environ["TWILIO_API_KEY_SECRET"]
twilio_client = twilio.rest.Client(api_key, api_secret, account_sid)

# Create a Flask app
app = Flask(__name__)


def find_or_create_room(room_name):
    try:
        # try to fetch an in-progress room with this name
        twilio_client.video.rooms(room_name).fetch()
    except twilio.base.exceptions.TwilioRestException:
        # the room did not exist, so create it
        twilio_client.video.rooms.create(unique_name=room_name, type="group")


def get_access_token(room_name):
    # create the access token
    access_token = twilio.jwt.access_token.AccessToken(
        account_sid, api_key, api_secret, identity=uuid.uuid4().int
    )
    # create the video grant
    video_grant = twilio.jwt.access_token.grants.VideoGrant(room=room_name)
    # Add the video grant to the access token
    access_token.add_grant(video_grant)
    return access_token


# Create a route that just returns "In progress"
@app.route("/")
def serve_homepage():
    return "In progress!"


# Start the server when this file runs
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

## Put it all together in a route

Next, you'll create a route called `/join-room`. In [Part Two](/docs/video/tutorials/get-started-with-twilio-video-python-flask-frontend) of this Tutorial, your frontend application will make a `POST` request to this `/join-room` route with a `room_name` in the body of the request.

Copy and paste the following code in `app.py`, underneath the route that returns "In progress!":

```python
@app.route("/join-room", methods=["POST"])
def join_room():
    # extract the room_name from the JSON body of the POST request
    room_name = request.json.get("room_name")
    # find an existing room with this room_name, or create one
    find_or_create_room(room_name)
    # retrieve an access token for this room
    access_token = get_access_token(room_name)
    # return the decoded access token in the response
    # NOTE: if you are using version 6 of the Python Twilio SDK,
    # you should call `access_token.to_jwt().decode()`
    return {"token": access_token.to_jwt()}
```

This route takes a `POST` request containing a JSON object with a room name, and then calls the `find_or_create_room` function and the `get_access_token` function. It returns the decoded Access Token, which is a [JSON Web Token (JWT)](https://jwt.io/).

Here's the final server file with all of these pieces:

```python
import os
import uuid  # for generating random user id values

import twilio.jwt.access_token
import twilio.jwt.access_token.grants
import twilio.rest
from dotenv import load_dotenv
from flask import Flask, render_template, request

# Load environment variables from a .env file
load_dotenv()

# Create a Twilio client
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
api_key = os.environ["TWILIO_API_KEY_SID"]
api_secret = os.environ["TWILIO_API_KEY_SECRET"]
twilio_client = twilio.rest.Client(api_key, api_secret, account_sid)

# Create a Flask app
app = Flask(__name__)


def find_or_create_room(room_name):
    try:
        # try to fetch an in-progress room with this name
        twilio_client.video.rooms(room_name).fetch()
    except twilio.base.exceptions.TwilioRestException:
        # the room did not exist, so create it
        twilio_client.video.rooms.create(unique_name=room_name, type="group")


def get_access_token(room_name):
    # create the access token
    access_token = twilio.jwt.access_token.AccessToken(
        account_sid, api_key, api_secret, identity=uuid.uuid4().int
    )
    # create the video grant
    video_grant = twilio.jwt.access_token.grants.VideoGrant(room=room_name)
    # Add the video grant to the access token
    access_token.add_grant(video_grant)
    return access_token


# Create a route that just returns "In progress"
@app.route("/")
def serve_homepage():
    return "In progress!"


@app.route("/join-room", methods=["POST"])
def join_room():
    # extract the room_name from the JSON body of the POST request
    room_name = request.json.get("room_name")
    # find an existing room with this room_name, or create one
    find_or_create_room(room_name)
    # retrieve an access token for this room
    access_token = get_access_token(room_name)
    # return the decoded access token in the response
    # NOTE: if you are using version 6 of the Python Twilio SDK,
    # you should call `access_token.to_jwt().decode()`
    return {"token": access_token.to_jwt()}


# Start the server when this file runs
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

Test this new route by running the server (with the command `python app.py`) and making a `POST` request to `http://localhost:5000/join-room`. You can use [curl](https://curl.se/), [Postman](https://www.postman.com/), [HTTPie](https://httpie.io/), or another tool for making this request. To make the request using `curl`, run the following command in your terminal:

```bash
curl -X POST http://localhost:5000/join-room \
-H "Content-Type: application/json" \
--data '{"room_name": "test room!"}'
```

You will receive output similar to the output below:

```bash
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0..."
}
```

You can use the site [jwt.io](https://jwt.io/) to inspect the token you received and see the different components that make up the Access Token. If you paste the token you received into the jwt.io debugger, it will decode the token and show you what the token includes. You should see that it contains a video grant for the specific room you created. The token will also include fields with other information you provided:

* `iss`: your `TWILIO_API_KEY_SID`
* `sub`: your `TWILIO_ACCOUNT_SID`
* `identity`: the randomly generated uuid for the participant's identity

You now have a working backend server that creates video rooms and generates Access Tokens. You're done with this section of the tutorial and can move on to [Part Two](/docs/video/tutorials/get-started-with-twilio-video-python-flask-frontend), where you'll create the frontend for this web app.
