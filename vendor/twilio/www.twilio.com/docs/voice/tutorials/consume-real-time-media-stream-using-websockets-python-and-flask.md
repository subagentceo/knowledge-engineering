# Consume a real-time Media Stream using WebSockets, Python, and Flask

## Meet Media Streams

With Twilio's Media Streams, you can access real-time voice data from a Twilio call. Media Streams will stream the audio from the call for its entire duration to a location of your choice.

In this tutorial, you will learn how to stream audio from a live phone call using Twilio, Python, and Flask. You might want to stream audio to provide real-time sentiment analysis for all calls happening within a call center. While we will dial a specific number in this tutorial, you can imagine this number being populated dynamically from the call center software.

> \[!NOTE]
>
> Want to see the Flask portion of this project in its entirety? Head over to [the GitHub repository](https://github.com/TwilioDevEd/mediastreams-consume-websockets-flask), where you can clone the project and run it locally.

## What are WebSockets?

Twilio Media Streams uses WebSockets to deliver your audio.

A [WebSocket](/docs/glossary/what-are-websockets) is an upgraded HTTP protocol. WebSockets are intended to be used for long-running connections and are ideal for real-time applications. A handshake is made, a connection is created, and, unlike HTTP, multiple messages are **expected** to be sent over the socket until it is closed. This helps to remove the need for long-polling applications.

The WebSocket interface is included natively in nearly all client-side web browser implementations.

There are numerous WebSocket Server implementations available for just about every web framework. We'll use the Flask-Sockets to help us through this tutorial.

## Set up your Python environment

In this tutorial, we're going to use the web framework Flask and the WebSocket package [Flask Sockets](https://github.com/heroku-python/flask-sockets). Create a virtual environment and install flask-sockets in your terminal:

```bash
python3 -m venv venv
source ./venv/bin/activate
pip install flask flask-sockets
```

Now that the package is installed, we can spin up a Flask web server.

## Build your WebSocket server

The `sockets` decorator helps you create a WebSocket route with `@socket.route`.

```py title="Create a @socket decorator" description="This allows you to respond to named WebSocket paths (e.g., /media)"
# !mark(5:14)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

Flask Sockets relies on [`gevent`](https://www.gevent.org/) for multithreading, so this server startup looks a little more detailed than a typical Flask server setup.

```py title="Start your server using a WebSocket handler"
# !mark(50:57)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

A typical pattern in most WebSocket server implementations is to continue reading until the WebSocket connection closes:

```py title="Read from the connected WebSocket until it is closed"
# !mark(19:23)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

All messages that are passed over MediaStreams WebSockets are in JSON format.

Python provides a straightforward way to decode JSON:

```py title="Decode the JSON message"
# !mark(25:26)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

There are four different message types that you will encounter:

* [`connected`](/docs/voice/media-streams/websocket-messages#connected-message)
* [`start`](/docs/voice/media-streams/websocket-messages#start-message)
* [`media`](/docs/voice/media-streams/websocket-messages#media-message)
* [`stop`](/docs/voice/media-streams/websocket-messages#stop-message).

The [Start message](/docs/voice/media-streams/websocket-messages#start-message) will contain important information about the stream, like the type of audio, its name, the originating call and any other [custom parameters](/docs/voice/twiml/stream#custom-parameters) you might have sent.

This information will likely come in handy for whatever service you plan to use with your real-time audio.

You can handle each type by looking at the messages `event` property.

```py title="Handle each message type by using the event property"
# !mark(29:44)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

The media payload is encoded in `base64`. Use the built-in Python function `b64decode` to decode it to `bytes`.

```py title="Decode the base64 encoded payload"
# !mark(38:39)
import base64
import json
import logging

from flask import Flask
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

HTTP_SERVER_PORT = 5000

@sockets.route('/media')
def echo(ws):
    app.logger.info("Connection accepted")
    # A lot of messages will be sent rapidly. We'll stop showing after the first one.
    has_seen_media = False
    message_count = 0
    while not ws.closed:
        message = ws.receive()
        if message is None:
            app.logger.info("No message received...")
            continue

        # Messages are a JSON encoded string
        data = json.loads(message)

        # Using the event type you can determine what type of message you are receiving
        if data['event'] == "connected":
            app.logger.info("Connected Message received: {}".format(message))
        if data['event'] == "start":
            app.logger.info("Start Message received: {}".format(message))
        if data['event'] == "media":
            if not has_seen_media:
                app.logger.info("Media message: {}".format(message))
                payload = data['media']['payload']
                app.logger.info("Payload is: {}".format(payload))
                chunk = base64.b64decode(payload)
                app.logger.info("That's {} bytes".format(len(chunk)))
                app.logger.info("Additional media messages from WebSocket are being suppressed....")
                has_seen_media = True
        if data['event'] == "closed":
            app.logger.info("Closed Message received: {}".format(message))
            break
        message_count += 1

    app.logger.info("Connection closed. Received a total of {} messages".format(message_count))


if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler

    server = pywsgi.WSGIServer(('', HTTP_SERVER_PORT), app, handler_class=WebSocketHandler)
    print("Server listening on: http://localhost:" + str(HTTP_SERVER_PORT))
    server.serve_forever()
```

Once your code is all in place, start your Flask server by running this command in your terminal:

```bash
python app.py
```

Now your server should be running on your localhost port 5000. Congratulations! Only one thing left to do here: make sure that Twilio can reach your local web server.

We recommend that you make use of an ssh tunnel service like ngrok, which supports the `wss` scheme. We highly recommend [installing ngrok](https://ngrok.com/download) if you haven't already.

Since our server is running on port 5000, we'll start a tunnel using:

```bash
ngrok http 5000
```

This will generate a random ngrok subdomain. Copy that URL - you'll need it in the next section.

## Start streaming audio

To begin streaming your call's audio with Twilio, you can use the [\<Stream> TwiML verb](/docs/voice/twiml/stream).

Create a new TwiML Bin in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/twiml-bins/twiml-bins) or the [legacy Console](https://www.twilio.com/console/twiml-bins) with the following TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Stream url="wss://yourdomain.ngrok.io/media" />
     </Start>
     <Dial>+15550123456</Dial>
</Response>

```

You'll need to update the above sample in two key ways:

1. Replace the phone number nested in the `<Dial>` tag with your personal phone number, or the number of a friend or family member who can help you see this in action.
2. Replace the `Stream url` with your new ngrok subdomain - you can find this in the terminal if ngrok is running. The `url` attribute must use the `wss` scheme (WebSockets Secure), but we're in the clear since ngrok itself uses the `wss` scheme.

The `<Start>` tag will asynchronously fork your media and immediately continue onto the next TwiML statement. Streaming will continue for the entire duration of the call unless [\<Stop>\<Stream>](/docs/voice/twiml/stream#stop-a-stream) is encountered.

Save your new TwiML Bin, then wire it up to one of your incoming phone numbers ([Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) or the [legacy Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)) by selecting **TwiML Bin** in the **A Call Comes In** section and then selecting your bin from the list. When a call comes into that number, Twilio streams the real-time data straight to your web server.

> \[!NOTE]
>
> By default, Twilio will stream the incoming track - in our case, the incoming phone call. You can always change this by using the `track` attribute.

## Try it out

Find a friend or family member willing to help you test your streaming web server (or use a second phone that is different than the one you listed in your TwiML bin).

One of you should call your Twilio phone number, which will then connect the call to the number you specified in your TwiML bin. Keep an eye on your console output and start talking - you should see your conversation appear in the console as you talk!

## What's next?

Real-time access to your audio data opens up new doors of innovation for you. From real-time visual effects to bioinformatics, you are certain to benefit from this access to live data.

There are several services that you can connect with to provide live speech to text transcriptions. Now that you have the text in real-time, you can perform all sorts of text-based operations like translations, sentiment analysis, and keyword detection.

You might want to pipe your real-time data into a number of external providers. You can use [Google's Cloud Speech to Text](https://cloud.google.com/speech-to-text/), [Amazon's Transcribe](https://aws.amazon.com/transcribe/), or [IBM Watson Speech to Text](https://www.ibm.com/watson/services/speech-to-text/). All of these providers have a language translation service available as well.

Our community has created a [starter set for many languages](https://github.com/twilio/media-streams) and services. Check it out for inspiration in building your real-time applications, and consider contributing.

Let's build something amazing.
