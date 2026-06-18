# Respond to Incoming Phone Calls in Node.js

In this guide, we'll show you how to use [Programmable Voice](https://www.twilio.com/en-us/voice) to respond to incoming phone calls in your Node.js web application. Code on your server can decide what a caller hears when they dial the number you've bought or ported to Twilio. The code snippets in this guide are written using modern JavaScript language features in Node.js version 6 or higher, and make use of the following modules:

* [Express](https://expressjs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [Twilio Node.js SDK](https://github.com/twilio/twilio-node)

Let's get started!

## Respond to incoming calls in your web application

![Incoming call flow with Twilio, showing HTTP request and response between phone and app.](https://docs-resources.prod.twilio.com/e4a3b7408c6b3d528f785d2ef6da26f44efa83a88b6e66b70d270af9e84fb8d5.png)

When a Twilio phone number receives an incoming call, Twilio will send an HTTP request to your web application, asking for instructions on how to handle the call. Your web application will respond with an XML document containing [TwiML](/docs/voice/twiml). That TwiML contains the instruction that Twilio will follow to say some arbitrary text, play an MP3 file, make a recording and much more.

To start answering phone calls, you must:

* [Buy and configure a Twilio-powered phone number](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) capable of making and receiving phone calls, and point it at your web application
* Write web application code to tell Twilio how to handle the incoming call using TwiML
* Make your web application accessible on the Internet so Twilio can send you a webhook request when you receive a call

> \[!WARNING]
>
> If you are sending **SMS messages** to the U.S. or Canada, before proceeding further, be aware of updated restrictions on the use of **Toll-Free numbers** for messaging, including TF numbers obtained by purchasing them. These restrictions do not apply to Voice or other uses outside of SMS messaging. See this [support article](https://help.twilio.com/hc/en-us/articles/20212966914075-Toll-Free-Verification-and-Developers-Navigating-the-New-Restrictions) for details.

## Buy and configure a phone number

In the [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory), you can search for and buy phone numbers in countries around the world. Numbers that have the Voice capability can make and receive voice phone calls from just about anywhere on the planet.

![Search results for voice-capable local numbers in area code 651 with pricing and buy options.](https://docs-resources.prod.twilio.com/ad25acb3103992f4429db457a224efe4f9183b2cd318feb7be00964de2f9e2dd.png)

Once you purchase a number, you'll need to configure that number to send a request to your web application. This callback mechanism is called a [webhook](https://en.wikipedia.org/wiki/Webhook). This can be done in the number's configuration page.

![Voice settings with webhook URL for incoming calls and call status changes.](https://docs-resources.prod.twilio.com/dab389b6caa0c98fe45b7f6459371ebee3c548e12ff09dadc3abed9ddd17e6ae.png)

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

Every TwiML document will have the root **\<Response>** element and within that can contain one or more **verbs**. Verbs are actions you'd like Twilio to take, such as [\<Say>](/docs/voice/twiml/say) a greeting to a caller, or send an SMS [\<Message>](/docs/messaging/twiml/message) in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our [TwiML API Reference](/docs/voice/twiml).

## Write node.js code to handle the incoming phone call

Now comes the fun part - writing code that will handle an incoming HTTP request from Twilio! Our code will dictate what happens when our phone number receives a call by responding with TwiML.

Respond to an incoming call with TwiML

```js
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say('Hello world!');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000, () => {
  console.log(
    'Now listening on port 3000. ' +
      'Be sure to restart when you make code changes!'
  );
});
```

```xml title="The TwiML generated by our server code" description="The SDKs help you generate an XML string that looks like this."
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello world!</Say>
</Response>
```

In order for the webhooks in this code sample to work, Twilio must be able to send your web application an HTTP request over the Internet. Of course, that means your application needs to have a URL or IP address that Twilio can reach.

In production you probably have a public URL, but you probably don't during development. That's where [ngrok](https://ngrok.com/) comes in. ngrok gives you a public URL for a local port on your development machine, which you can use to configure your Twilio webhooks as described above.

Once ngrok is installed, you can use it at the command line to create a tunnel to whatever port your web application is running on. For example, this will create a public URL for a web application listening on port 3000.

```bash
ngrok http 3000
```

After executing that command, you will see that ngrok has given your application a public URL that you can use in your webhook configuration in the [Twilio console](/console/phone-numbers/incoming).

![Ngrok session status online with forwarding URLs to localhost:5000.](https://docs-resources.prod.twilio.com/074f6a836d8dd64cf4c59b6205441d04a7268aa68ee7499ace1ca76901f0b920.png)

Grab your ngrok public URL and head back to the phone number you configured earlier. Now let's switch it from using a TwiML Bin to use your new ngrok URL. Don't forget to append the URL path to your actual TwiML logic! ("http://\<your ngrok subdomain>.ngrok.io/voice" for example)

![Voice settings with webhook URL for incoming calls and call status changes.](https://docs-resources.prod.twilio.com/dab389b6caa0c98fe45b7f6459371ebee3c548e12ff09dadc3abed9ddd17e6ae.png)

## Create node.js responses to incoming phone calls

In the example above, we returned pre-defined TwiML in response to the incoming call. The real power of using webhooks like this is executing dynamic code ([based on the information Twilio sends to your application](/docs/voice/twiml#twilios-request-to-your-application)) to change what you present to the user on the other end of the phone call. You could query your database, reference a customer's phone number in your CRM, or execute any kind of custom logic before determining how to respond to your user.

Create a dynamic response to an incoming call

```js
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const app = express();

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Get information about the incoming call, like the city associated
  // with the phone number (if Twilio can discover it)
  const city = request.body.FromCity;

  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say(`Never gonna give you up ${city}.`);
  twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000);
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them.
>
> Learn more about HTTP authentication [here](/docs/usage/security#http-authentication), and check out our full [guide to securing your Express application by validating incoming Twilio requests](/docs/usage/tutorials/how-to-secure-your-express-app-by-validating-incoming-twilio-requests).

## Where to next?

If this guide was helpful, you might also want to check out these tutorials for Programmable Voice and Node.js. Tutorials walk through full sample applications, implementing Twilio use cases like these:

* [Automated phone surveys](https://www.twilio.com/blog/automated-survey-nodejs-express)
* [Call tracking and lead attribution](https://www.twilio.com/blog/call-tracking-nodejs-express)
* [Click to call](/docs/voice/sdks/javascript/get-started)

Happy hacking!
