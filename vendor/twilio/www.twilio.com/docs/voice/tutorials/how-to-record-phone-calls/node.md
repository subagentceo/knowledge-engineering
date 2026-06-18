# Record Phone Calls in Node.js

In this guide we'll show you how to use [Programmable Voice](https://www.twilio.com/en-us/voice) to record phone calls with your Node.js web application. You can tell Twilio to record part of a phone call or the entire thing. The code snippets in this guide are written using modern JavaScript language features in Node.js version 6 or higher, and make use of the following modules:

* [Express](https://expressjs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [Twilio Node.js SDK](https://github.com/twilio/twilio-node)

Let's get started!

## Set up your web application

![Incoming call flow with Twilio, showing HTTP request and response between phone and app.](https://docs-resources.prod.twilio.com/e4a3b7408c6b3d528f785d2ef6da26f44efa83a88b6e66b70d270af9e84fb8d5.png)

When a phone number you have bought through Twilio receives an incoming call, Twilio will send an HTTP request to a server you control, asking for instructions on how to handle the call. Your server will respond with an XML document containing [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml) that tells Twilio to read out a message, play an MP3 file, make a recording, and much more.

To start answering phone calls, you must:

* [Buy and configure a Twilio-powered phone number](https://www.twilio.com/console/phone-numbers/incoming) capable of making and receiving phone calls, and point it at your web application
* Write web application code to tell Twilio how to handle the incoming call (using TwiML)
* Make your web application accessible on the Internet so Twilio can send you a webhook request when you receive a call

> \[!WARNING]
>
> If you are sending **SMS messages** to the U.S. or Canada, before proceeding further, be aware of updated restrictions on the use of **Toll-Free numbers** for messaging, including TF numbers obtained by purchasing them. These restrictions do not apply to Voice or other uses outside of SMS messaging. See this [support article](https://help.twilio.com/hc/en-us/articles/20212966914075-Toll-Free-Verification-and-Developers-Navigating-the-New-Restrictions) for details.

### Buy and configure a phone number

In [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers) or the [legacy Console](https://www.twilio.com/console/phone-numbers/incoming), you can search for and buy phone numbers in dozens of different countries, capable of calling (and being called by) just about every phone on the planet.

![Search results for voice-capable local numbers in area code 651 with pricing and buy options.](https://docs-resources.prod.twilio.com/ad25acb3103992f4429db457a224efe4f9183b2cd318feb7be00964de2f9e2dd.png)

Once you purchase a number, you'll need to configure that number to send a request to your web application. This callback mechanism is called a [webhook](https://en.wikipedia.org/wiki/Webhook). This can be done in the number's configuration page.

### What's a Webhook?

A [webhook](https://en.wikipedia.org/wiki/Webhook) is a callback mechanism that allows two systems to communicate events to one another over the Internet using HTTP requests. In this case, Twilio is sending a webhook request to your web application whenever a phone number you control receives an incoming call. You'll see this webhook mechanism used in many Twilio APIs for handling event notifications like this.

Not working on a server with a public URL? We'll show you how to expose your local development machine to the public Internet later in this guide. Next, you'll need to write some server-side code that will be executed when an incoming call comes in.

## Record part of a phone call

Now comes the fun part - writing code that will handle an incoming HTTP request from Twilio!

In this example we'll use [the Express web framework](https://expressjs.com/) for Node.js to respond to Twilio's request and we'll use TwiML to tell Twilio how to handle the call.

Record part of an incoming call

```js
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say('Hello. Please leave a message after the beep.');

  // Use <Record> to record the caller's message
  twiml.record();

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000);
```

[TwiML](/docs/messaging/twiml) is a set of XML tags that tell Twilio how to handle an incoming call (or [SMS](/docs)). In this example we tell Twilio to read some instructions to the caller and then record whatever the caller says next.

You can listen to your recordings [in your Twilio Console](/console/voice/logs/recordings) or access them directly through Twilio's REST API.

### Transcribing a recording

You can also tell Twilio to transcribe a recording, giving you a text representation of what the caller said.

Record and transcribe an incoming call

```js
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say('Hello. Please leave a message after the beep.');

  // Use <Record> to record and transcribe the caller's message
  twiml.record({ transcribe: true, maxLength: 30 });

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(3000);
```

Here we add "transcribe: true" to our response to tell Twilio to transcribe the recording after it's complete. We also pass a "maxLength" argument to limit the length of the recording (it defaults to an hour).

Check out [the \<Record> reference docs](/docs/voice/twiml/record) to see all the parameters you can use to customize your recordings.

## Record an entire outgoing call

When you make outgoing calls with the Twilio REST API, you can tell Twilio to record the entire call from beginning to end.

### Grab your Twilio account credentials

First, you'll need to get your Twilio account credentials. [They can be found on the home page of the console](/console).

### Make and record an outbound call

Just pass an extra "record" argument to "client.calls.create()" and Twilio will record the entire phone call.

Record an outbound call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+15017122661",
    record: true,
    to: "+14155551212",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15017122661",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14155551212",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

Once the call is complete, you can listen to your recordings [in your Twilio Console](https://www.twilio.com/console/voice/logs/recordings) or access them directly through Twilio's REST API.

You can also gain access to the recording as soon as the call is complete by including a `recordingStatusCallback` with your `client.calls.create` method. When your recording is ready, Twilio will send a request to the URL you specified, and that request will include a link to the recording's audio file.

Learn more about the [`RecordingStatusCallback`](/docs/voice/api/call-resource#recordingstatuscallback) parameter.

## Where to next?

If this guide was helpful, you might also want to check out these tutorials for Programmable Voice and Node.js. Tutorials walk through full sample applications, implementing Twilio use cases like these:

* [Automated phone surveys](https://www.twilio.com/blog/automated-survey-nodejs-express)
* [Call tracking and lead attribution](https://www.twilio.com/blog/call-tracking-nodejs-express)
* [Click to call](/docs/voice/sdks/javascript/get-started)

Happy hacking!
