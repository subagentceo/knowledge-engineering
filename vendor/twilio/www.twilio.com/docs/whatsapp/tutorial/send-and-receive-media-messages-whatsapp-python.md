# Send and Receive Media Messages with WhatsApp in Python

> \[!WARNING]
>
> Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. [Learn more about the new Console](https://www.twilio.com/blog/new-and-improved-console-now-in-general-availability).

In this tutorial, we'll set up a Python Flask application that uses the [WhatsApp Channel](/docs/whatsapp) to:

* Send media messages
* Reply to incoming messages with media

The code samples in this tutorial use [Twilio's Python SDK](https://github.com/twilio/twilio-python) and [Flask](http://flask.pocoo.org/).

## Send outbound media messages through WhatsApp

Just like when [sending an MMS](/docs/messaging/tutorials/how-to-send-sms-messages), sending an outbound WhatsApp message uses Twilio's [Message resource](/docs/messaging/api/message-resource). This section walks you through the setting up and sending media in a WhatsApp message. Media can consist of images, audio files, and PDF documents.

### Sign up for (or log in to) your Twilio Account and activate the Sandbox

Before you can send a WhatsApp message from your web language, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account and activate the [Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/sandbox). The Sandbox allows you to prototype with WhatsApp immediately using a shared phone number without waiting for your Twilio number to be approved by WhatsApp.

To get started, select a number from the available sandbox numbers to activate your sandbox.

![Twilio Sandbox setup for WhatsApp with number selection and activation button.](https://docs-resources.prod.twilio.com/12bea172c44c2e43ed9695169dbbf3c1c0879a5cd2cfff3150de1041648e6621.png)

Be sure to take note of the phone number you choose in the Sandbox. You will need this later when we're ready to send some messages.

#### Gather your Twilio account information

Before you can send any messages, you'll need to gather your Twilio account credentials. You can find these in the [Twilio Console](https://www.twilio.com/console).

* **Account SID** - Used to identify yourself in API requests
* **Auth Token** - Used to authenticate REST API requests

![Project info showing account SID and hidden auth token with option to show.](https://docs-resources.prod.twilio.com/bc6afaa57c1fe443cae20a658cf7cd424c18fa660b55c3b6722f77622844fc4c.png)

For all of our code snippets and Python examples, you need to authenticate with the **Account SID** and **Auth Token**.

> \[!CAUTION]
>
> This tutorial uses hard-coded credentials at the top of the code; you should follow [best practices](/docs/usage/secure-credentials) regarding credential protection in production.

### Send a media WhatsApp message in Python via the REST API

To send an outgoing media message via WhatsApp from your Twilio account you'll need to make an `HTTP POST` to Twilio's [Message resource](/docs/messaging/api/message-resource).

Sending a media message through WhatsApp is similar to sending a text-based message over WhatsApp with one important addition: the `media_url` parameter. The `media_url` parameter in this code tells Twilio where to retrieve the media that we want to include in the WhatsApp message. (You can [prevent unauthorized access to your media](https://help.twilio.com/hc/en-us/articles/223183748-Prevent-Unauthorized-Access-to-Your-Media-with-HTTP-Basic-Auth) by turning on [HTTP Basic Auth for media URLs in the Twilio Console](https://www.twilio.com/console/sms/settings).)

> \[!WARNING]
>
> If you have joined your Sandbox > 24 hours ago, you will need to send a fresh inbound message to your WhatsApp number in order to then send yourself a media message. WhatsApp currently does not support media in "template" messages that take place outside of a 24-hour "session".

Twilio's Python SDK helps you to create a new instance of the Message resource. When you do this, you'll specify the `to`, `from_`, and `media_url` parameters of your message.

If you don't already have the Python SDK installed you can install it using pip:

```xml
pip install twilio
```

If you're not using `pip`, you can find manual installation instructions [here](https://github.com/twilio/twilio-python#installation).

Now, create a file named `send_whatsapp_media.py` and include the following code:

Send a media message with WhatsApp

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    media_url=[
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    ],
    from_="whatsapp:+14155238886",
    to="whatsapp:+15017122661",
)

print(message.sid)
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15017122661",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Replace the placeholder values for `account_sid` and `auth_token` with your unique values. You can find these in your [Twilio console](https://www.twilio.com/console).

> \[!CAUTION]
>
> It's okay to hard-code your credentials when getting started, but you should use environment variables to keep them secret before deploying to production. Check out [how to keep your Twilio credentials secure](/docs/usage/secure-credentials).

The **to** number should be the phone number for the destination WhatsApp account in the [E.164 format](/docs/glossary/what-e164). If you are using the WhatsApp Sandbox, you can only send messages to numbers that have joined the Sandbox.

You'll tell Twilio which phone number to use to send this message by replacing the `from_` number with the `whatsapp:` channel identifier followed by the Sandbox number in [E.164](/docs/glossary/what-e164) format.

Save the file and run it from the command line:

```xml
python send_whatsapp_media.py
```

In a few moments, you should receive a WhatsApp message with an image!

> \[!WARNING]
>
> WhatsApp does not support including a text body in the same message as a video, audio file, document, contact (vCard), or location. If you pass the `Body` parameter on a message with one of these media types, the body will be ignored and not delivered to the device.

#### Understanding Twilio's Response

When you send an outbound WhatsApp media message, Twilio sends data about the message in its response to your request. The JSON response contains the unique SID and URI for your media resource:

```xml
"subresource_uris": {"media": "/2010-04 01/Accounts/ACxxxxxxxx/Messages/SMxxxxxxxxxxxxx/Media.json"}
```

When the Twilio REST API creates your new Message resource, it saves the image found at the specified `media_url` as a [Media resource](/docs/messaging/api/media-resource). Once created, you can access this resource at any time via the API.

You can print this value from your Python code to see where the image is stored. The following line to the end of your `send_whatsapp_media.py` file prints out your newly provisioned Media URI:

```xml
print(message.media._uri)
```

## Respond with media in WhatsApp

To reply using media to incoming WhatsApp messages, you'll need to provide Twilio with a webhook URL that points to a server that runs code to inspect and save the media files.

> \[!WARNING]
>
> WhatsApp media content is currently only supported in Session Messages. If the WhatsApp session with a user expires, you must wait for an inbound message to create a new session before you can send them a media message.

### What are webhooks?

Webhooks are user-defined [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks. They are usually triggered by some event, such as receiving an SMS message or an incoming phone call. When that event occurs, Twilio makes an HTTP request (usually a [`POST` or a `GET`](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)) to the URL configured for the webhook.

To handle a webhook, you only need to build a small web application that can accept the HTTP requests. Almost all server-side programming languages offer some framework for you to do this. [Django](https://www.djangoproject.com/) and [Flask](http://flask.pocoo.org/) are two popular Python web development frameworks. In this tutorial, we'll be setting up our web application with Flask.

Webhook functionality is the same for every Twilio application. First, a webhook makes an HTTP request to a URI that you provide to Twilio. When it receives this request, your application performs pre-defined logic. This could be something like database read/writes or calling another API. Finally, your application sends a TwiML response to Twilio in which it specifies the instructions for Twilio to follow.

### What is TwiML?

[TwiML](/docs/voice/twiml) is the Twilio Markup Language, which is just to say that it's an [XML](https://en.wikipedia.org/wiki/XML) document with special tags defined by Twilio to help you build your messaging and voice applications.

TwiML is easier shown than explained:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Message>Thanks for the message!</Message>
</Response>
```

Every TwiML document has the **\<Response>** element, which can contain one or more **verbs**. Verbs are actions you'd like Twilio to take, such as [\<Say>](/docs/voice/twiml/say) a greeting to a caller, or send an SMS [\<Message>](/docs/messaging/twiml/message) in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our [TwiML API Reference](/docs/voice/twiml).

To send back a media in your WhatsApp reply, you need to include the **media** TwiML element with the URL to the media file. One media attachment is supported per message, with a size limit of 5MB.

### Generate TwiML in your application

To reply to an incoming WhatsApp message, you can either write raw TwiML or use an SDK. When you use the SDK, you don't have to worry about generating the raw XML yourself.

```py title="Reply with media to incoming WhatsApp messages"
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse


app = Flask(__name__)


GOOD_BOY_URL = (
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1"
    "&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
)


@app.route("/whatsapp", methods=["GET", "POST"])
def reply_whatsapp():

    try:
        num_media = int(request.values.get("NumMedia"))
    except (ValueError, TypeError):
        return "Invalid request: invalid or missing NumMedia parameter", 400
    response = MessagingResponse()
    if not num_media:
        msg = response.message("Send us an image!")
    else:
        msg = response.message("Thanks for the image. Here's one for you!")
        msg.media(GOOD_BOY_URL)
    return str(response)


if __name__ == "__main__":
    app.run()
```

You have the code - now you need a URL you can give to Twilio.

Twilio can only access public servers on the Internet. That means you need to publish your web application to a web or cloud hosting provider (of which [there are many](https://www.google.com/#q=cloud+web+hosting)), you can host it on your own server, or you can use a service such as [ngrok](https://ngrok.com/) to expose your local development machine to the internet. (We only recommend the latter for development and testing purposes and not for production deployments.)

To send media in response to an incoming WhatsApp message, add an image URL. If necessary, restart your server, then send a message to your WhatsApp number again. You should receive a WhatsApp message that includes an image. Check out the API Reference for more details.

### Configure your webhook URL

Now that you have a URL for your web application's TwiML reply generating routine, you can configure your Twilio phone number to call your webhook URL whenever a new WhatsApp message comes in for you.

You can set the webhook URL for incoming messages to your server in the [Sandbox](https://www.twilio.com/console/sms/whatsapp/sandbox?).

Make sure you choose `HTTP POST` or `HTTP GET` to correspond to what your web application is expecting. Usually, the default of `POST` is fine.

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them.
>
> Learn more [here](/docs/usage/security#http-authentication), and check out our [guide to securing your Flask application by validating incoming Twilio requests](/docs/usage/tutorials/how-to-secure-your-flask-app-by-validating-incoming-twilio-requests).

## Examine media on incoming WhatsApp messages

Viewing, saving, or manipulating the media files on incoming WhatsApp messages also involves configuring a Webhook URL. The URL points to a server generating TwiML instructions including the media you want to send.

### Get incoming message details

When Twilio calls your webhook, it [sends a number of parameters](/docs/messaging/twiml#twilios-request-to-your-application) about the message you just received. Most of these, such as the `To` phone number, the `From` phone number, and the `Body` of the message are available as properties of the request parameter to our action method.

### Get URLs to the media

Twilio sends form variables named `MediaUrlX`, where ***X*** is a zero-based index. WhatsApp messages will only contain one media file per incoming message, so you can access the file at `MediaUrl0` on the incoming request from Twilio to your webhook URL.

### Determine Content-Type of media

Attachments to WhatsApp messages can be of many different file types, including JPG, MP3, and PDF. (See more about the supported file types in [the FAQs](https://help.twilio.com/hc/en-us/articles/360017961894-Sending-and-Receiving-Media-with-WhatsApp-Messaging-on-Twilio-Beta-?_ga=2.156422648.2135497581.1552927418-1150959182.1546903029).) Twilio handles the determination of the file type for you and you can get the [standard mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) from the `MediaContentTypeX` parameter. If you are expecting photos and images, then you will likely see a lot of attachments with the mime type image/jpeg.

And that's all there is to it; receiving and responding is exactly the same as you would do in any SMS app with our Messaging API. Cool, right?

## What's next?

All the code, in a complete working project, is available on GitHub. To dig deeper, head over to the [Messaging API Reference](/docs/messaging/api) and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [REST API Media resource](/docs/messaging/api/media-resource). Also, you should be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers.

We'd love to hear what you build with this!
