# Receive and Reply to Incoming Messages - Python

In this guide, we'll show you how to use [Programmable Messaging](https://www.twilio.com/en-us/messaging/channels/sms) to respond to incoming messages in your Python web application. When someone sends a text message to your Twilio number, Twilio can call a **webhook** you create in Python from which you can send a reply back using **TwiML**.

All this talk of webhooks and TwiML got you feeling anxious? Fear not. This guide will help you master the basics in no time.

> \[!NOTE]
>
> Twilio can send your web application an HTTP request when certain events happen, such as an incoming text message to one of your Twilio phone numbers. These requests are called *webhooks*, or *status callbacks*. For more, check out our guide to [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks). Find other webhook pages, such as a [security guide](/docs/usage/webhooks/webhooks-security) and an [FAQ](/docs/usage/webhooks/webhooks-faq) in the [Webhooks](/docs/usage/webhooks) section of the docs.

The code snippets in this guide are written using the [Flask](http://flask.pocoo.org/) web framework and the Twilio Python SDK. Let's get started!

![Diagram showing SMS flow from phone to app via Twilio with HTTP requests and responses.](https://docs-resources.prod.twilio.com/c15f2bf86138c03fe2b76b46fa25e1dba9bef1bd079c95b3b0cb8bb6ebfb847c.png)

## What is a Webhook?

Webhooks are user-defined [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks. They are usually triggered by some event, such as receiving an SMS message or an incoming phone call. When that event occurs, Twilio makes an HTTP request (usually a [`POST` or a `GET`](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)) to the URL configured for the webhook.

To handle a webhook, you only need to build a small web application that can accept the HTTP requests. Almost all server-side programming languages offer some framework for you to do this. Examples across languages include [ASP.NET MVC](https://www.asp.net/) for C#, [Servlets](https://en.wikipedia.org/wiki/Java_servlet) and [Spark](https://github.com/perwendel/spark) for Java, [Express](https://expressjs.com/) for Node.js, [Django](https://www.djangoproject.com/) and [Flask](http://flask.pocoo.org/) for Python, and [Rails](https://rubyonrails.org/) and [Sinatra](http://www.sinatrarb.com/) for Ruby. [PHP](https://secure.php.net/) has its own web app framework built in, although frameworks like [Laravel](https://laravel.com/), [Symfony](https://symfony.com/) and [Yii](https://www.yiiframework.com/) are also popular.

Whichever framework and language you choose, webhooks function the same for every Twilio application. They will make an HTTP request to a URI that you provide to Twilio. Your application performs whatever logic you feel necessary - read/write from a database, integrate with another API or perform some computation - then replies to Twilio with a TwiML response with the instructions you want Twilio to perform.

### What is TwiML?

[TwiML](/docs/voice/twiml) is the Twilio Markup Language, which is just to say that it's an [XML](https://en.wikipedia.org/wiki/XML) document with special tags defined by Twilio to help you build your SMS and voice applications. TwiML is easier shown than explained. Here's some TwiML you might use to respond to an incoming phone call:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Thanks for calling!</Say>
</Response>
```

And here's some TwiML you might use to respond to an incoming SMS message:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We got your message, thank you!</Message>
</Response>
```

Every TwiML document will have the root **\<Response**> element and within that can contain one or more **verbs**. Verbs are actions you'd like Twilio to take, such as [\<Say>](/docs/voice/twiml/say) a greeting to a caller, or send an SMS [\<Message>](/docs/messaging/twiml/message) in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our [TwiML API Reference](/docs/voice/twiml).

## Generating TwiML in your web application

When someone sends a text message to your Twilio number, you can send a TwiML reply back using a configured webhook. Here's how to generate TwiML using the SDK.

Respond to an incoming text message

```py
from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a message
    resp.message("The Robots are coming! Head for the hills!")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

When you use the SDK, you don't have to worry about generating the raw XML yourself. Of course, if you prefer to do that, then we won't stop you.

You have the code, now you need a URL you can give to Twilio. Twilio can only access public servers on the Internet. That means you need to take your web application and publish it to a web or cloud hosting provider (of which [there are many](https://www.google.com/#q=cloud+web+hosting)), you can host it on your own server, or you can use a service such as [ngrok](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment#install-ngrok) to expose your local development machine to the internet. We generally only recommend the latter for development and testing purposes and not for production deployments.

### Configure Your Webhook URL

Now that you have a URL for your web application's TwiML reply generating routine, you can configure your Twilio phone number to call your webhook URL whenever a new SMS (or MMS) message comes in for you.

1. Log into Twilio.com and go to the [Console's Numbers page](/console/phone-numbers/incoming)
2. Click on the phone number you'd like to modify
3. Find the Messaging section and the "A MESSAGE COMES IN" option
4. Select "Webhook" and paste in the URL you want to use:

![Messaging configuration with webhook URL set to https://yourserver.com/sms.](https://docs-resources.prod.twilio.com/f25966b33e960a4214a186c1dbdd0d35aff94f3b3c704f7db85ba8a082ec20d2.png)

Make sure you choose `HTTP POST` or `HTTP GET` to correspond to what your web application is expecting. Usually the default of `POST` will be fine.

### Backup Webhook URL

You'll notice in the console that there is also a spot to provide a Webhook URL for when the "PRIMARY HANDLER FAILS." Twilio will call this URL in the event that your primary handler returns an error or does not return a response within 15 seconds. Refer to our [Availability and Reliability guide](/docs/usage/security/availability-reliability) for more details on the fallback URL.

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them.
>
> Learn more [here](/docs/usage/security#http-authentication), and check out our [guide to securing your Flask application by validating incoming Twilio requests](/docs/usage/tutorials/how-to-secure-your-flask-app-by-validating-incoming-twilio-requests).

## Respond with media message

To send a message with embedded media (e.g. an image), add an image URL to your text message body. If necessary, restart your server, then text your Twilio number again. You should receive a text message that includes an image. You can even send multiple images by adding more **Media** elements to your response. Check out the [API Reference](/docs/messaging/twiml/message) for more details.

> \[!NOTE]
>
> MMS messages can only be sent and received by numbers having MMS capability. You can [check the capabilities](/console/phone-numbers/search) of numbers in the account portal or query the [Available Phone Numbers](/docs/phone-numbers/api/availablephonenumber-resource) resource to search for Twilio numbers that are MMS enabled.

Generate a TwiML Message with Image

```py
from flask import Flask
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)


@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a MMS message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a text message
    msg = resp.message("The Robots are coming! Head for the hills!")

    # Add a picture message
    msg.media(
        "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
    )

    return str(resp)


if __name__ == "__main__":
    app.run(debug=True)
```

## Custom responses to incoming messages

Let's take a look at how we might respond to an incoming message with a different message depending on the incoming Body parameter from the incoming Twilio Request.

Generate a dynamic TwiML Message

```py
from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/sms", methods=['GET', 'POST'])
def incoming_sms():
    """Send a dynamic reply to an incoming text message"""
    # Get the message the user sent our Twilio number
    body = request.values.get('Body', None)

    # Start our TwiML response
    resp = MessagingResponse()

    # Determine the right reply for this message
    if body == 'hello':
        resp.message("Hi!")
    elif body == 'bye':
        resp.message("Goodbye")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

* When you text `hello` to your Twilio number, the app replies with `Hi!`.
* When you text `bye` to your Twilio number, the app replies with `Goodbye`.

## Receive incoming messages without sending a reply

If you would like to receive incoming messages but not send an outgoing reply message, you can return an empty TwiML response. Twilio still expects to receive TwiML in response to its request to your server, but if the TwiML does not contain any directions, Twilio will accept the empty TwiML without taking any actions.

Receive an incoming message without sending a response

```py
from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Receive incoming messages without sending a message response."""
    # Start our TwiML response
    resp = MessagingResponse()

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
```

## Enhance messages with Twilio Marketplace Add-ons

Need more information about the phone number that sent the message? Need to analyze the message itself for sentiment or other data? Add-ons are available in the [Twilio Marketplace](https://twilio.com/console/add-ons) to accomplish these tasks and more.

To learn how to enable [Add-ons for your incoming SMS messages](https://console.twilio.com/us1/develop/add-ons/catalog?products=programmable_messaging), refer to our [Add-ons tutorial](/docs/marketplace/listings/tutorial).	To learn how to enable [Add-ons for your incoming SMS messages](https://console.twilio.com/us1/develop/add-ons/catalog?products=programmable_messaging), see the [How to Use Twilio Marketplace Add-on Listings guide](/docs/marketplace/listings/usage#add-on-listings).

![Flowchart of SMS to app communication via Twilio with third-party services.](https://docs-resources.prod.twilio.com/2e7432cda6965a10a0fa9c7c5eecddb3b67dc073dde8b9ad03e92d1ac3c8b9fe.png)

## Where to next?

When you're ready to dig deeper into handling incoming messages, check out our guide on how to [Create an SMS Conversation](/docs/messaging/tutorials/how-to-create-sms-conversations/python) and our [Automated Survey](/blog/automated-survey-python-flask) tutorial.
