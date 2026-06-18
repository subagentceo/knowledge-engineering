# Voice Webhooks

Your web application can receive several types of webhooks from Twilio Voice.

An [incoming voice call](#incoming-voice-call) webhook arrives when someone dials a phone number associated with your Twilio account. Your application can process this request in real time.

A [status callback](#call-status-callbacks) webhook is sent after your application completes an outbound call through Twilio.

Twilio sends a [recording status callback](#recording-status-callbacks) after it finishes processing a call recording.

> \[!NOTE]
>
> Twilio can send your web application an HTTP request when certain events happen, such as an incoming text message to one of your Twilio phone numbers. These requests are called *webhooks*, or *status callbacks*. For more, check out our guide to [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks). Find other webhook pages, such as a [security guide](/docs/usage/webhooks/webhooks-security) and an [FAQ](/docs/usage/webhooks/webhooks-faq) in the [Webhooks](/docs/usage/webhooks) section of the docs.

## Incoming Voice Call

Each Twilio phone number includes settings that control how Twilio handles incoming voice calls. You can configure a number to use any of the following options:

* [Webhooks](/docs/usage/webhooks/webhooks-overview)
* [Twilio Functions](/docs/serverless/functions-assets/functions)
* [Twilio Studio Flows](/docs/studio)
* [Twilio Proxy](/docs/proxy)

Configure these settings in the Twilio Console or programmatically with the [IncomingPhoneNumber](/docs/phone-numbers/api/incomingphonenumber-resource) REST API resource.

If you set up a webhook to handle incoming calls, Twilio will send an HTTP (or HTTPS) request to your web application. Twilio uses either a `POST` or `GET` request, depending on your configuration. Most web applications prefer `POST`.

Twilio will send information about the incoming phone call to your application. These parameters are documented in [Twilio's request to your application](/docs/voice/twiml#twilios-request-to-your-application). Your application should respond to Twilio by returning Twilio Markup Language for Programmable Voice ([TwiML for Voice](/docs/voice/twiml)).

> \[!WARNING]
>
> Keeping user information confidential is critical. Use HTTPS for your webhook endpoint and verify that Twilio sent the request. For details, see the [webhooks security guide](/docs/usage/webhooks/webhooks-security).

To set up webhooks for incoming voice calls, follow the step-by-step guides for your language:

* [Respond to Incoming Phone Calls in C#](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/csharp)
* [Respond to Incoming Phone Calls in Java](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/java)
* [Respond to Incoming Phone Calls in Node.js](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/node)
* [Respond to Incoming Phone Calls in PHP](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/php)
* [Respond to Incoming Phone Calls in Python](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/python)
* [Respond to Incoming Phone Calls in Ruby](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls/ruby)

## Call Status Callbacks

Whether your Twilio phone number receives a call or your application places an outgoing call, Twilio will send an asynchronous HTTP or HTTPS request to your server after the call ends.

There are two ways to tell Twilio which URL to use. You can:

* Set the [`StatusCallback` parameter](/docs/voice/api/call-resource#statuscallback) on a `Call` resource for an outgoing phone call that uses the REST API.
* Set the [statusCallback attribute on the \<Number>](/docs/voice/twiml/number#attributes-status-callback-event) element in TwiML.

Use the `StatusCallbackMethod` parameter or `statusCallbackMethod` attribute to specify the HTTP method (`GET` or `POST`).

By default, Twilio sends a callback when the call completes, but you can subscribe to additional status events. Specify the events (`initiated`, `ringing`, `answered`, `completed`) with the [StatusCallbackEvent parameter](/docs/voice/api/call-resource#statuscallbackevent) on the `Call` resource or the [statusCallbackEvent attribute](/docs/voice/twiml/client#attributes-status-callback-event) in TwiML.

For more about status callbacks, including how to set a status callback from your code or from TwiML, see the [Ending the call: callback requests](/docs/voice/twiml#ending-the-call-callback-requests) section of the TwiML voice docs.

> \[!NOTE]
>
> `StatusCallback` and `StatusCallbackEvent` can only be defined on Programmable Voice calls. For Elastic SIP Trunking calls, any `StatusCallback` would need to be handled by the SIP Infrastructure that is receiving the SIP signaling.

## Recording Status Callbacks

After a call ends, Twilio processes the recording and transcodes it into a compressed audio format. When processing finishes, Twilio sends a recording status callback to your application.

The `RecordingStatus` value is one of four states: `in-progress`, `completed`, `absent`, or `failed`. When the recording is complete and the file is available, Twilio sends a webhook with the `completed` status. The `RecordingUrl` parameter contains a link to the audio file that your application can download.

For more about voice recording with Twilio, see the [Call Recording Resource](/docs/voice/api/recording) documentation.

For more information, see [Getting started with recording status callbacks](https://help.twilio.com/hc/en-us/articles/360014251313-Getting-Started-with-Recording-Status-Callbacks).
