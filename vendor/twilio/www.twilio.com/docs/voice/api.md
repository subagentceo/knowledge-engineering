# Programmable Voice API Overview

Twilio's [Voice API](https://www.twilio.com/en-us/voice) helps you to make, receive, and monitor calls around the world.

Using this REST API, you can [make outbound phone calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls), [modify calls in progress](/docs/voice/tutorials/how-to-modify-calls-in-progress), and [query metadata](/docs/voice/tutorials/how-to-retrieve-call-logs) about calls you've created. More advanced call features like [programmatic call control](/docs/voice/api#programmatic-call-control), creating [conference calls and call queues](/docs/voice/api), [call recordings](/docs/voice/api#record-calls), and [conversational IVRs](/docs/voice/api) are at your fingertips with Twilio's Programmable Voice.

You can also use the API to route voice calls with global reach to phones, [browsers](/docs/voice/sdks/javascript), [SIP domains](/docs/voice/api/sip-interface), and [mobile applications](/docs/voice/sdks).

> \[!NOTE]
>
> You can obtain numbers by using the [Phone Numbers API](/docs/phone-numbers)

## Base URL

The Twilio REST API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

`https://api.twilio.com/2010-04-01` is the base URL for the following resources:

* [Calls resource](/docs/voice/api/call-resource)
  * [Events subresource](/docs/voice/api/call-event-resource)
  * [Calls Transcriptions subresource](/docs/voice/api/realtime-transcription-resource)
  * [Streams subresource](/docs/voice/api/stream-resource)
  * [UserDefinedMessages subresource](/docs/voice/api/userdefinedmessage-resource)
  * [UserDefinedMessageSubscription subresource](/docs/voice/api/userdefinedmessagesubscription-resource)
  * [SIPREC subresource](/docs/voice/api/siprec)
  * [Payments subresource](/docs/voice/api/payment-resource)
* [Recordings resource](/docs/voice/api/recording)
* [Transcriptions resource](/docs/voice/api/recording-transcription)
* [OutgoingCallerIds resource](/docs/voice/api/outgoing-caller-ids)
* [Conferences resource](/docs/voice/api/conference-resource)
  * [Participant subresource](/docs/voice/api/conference-participant-resource)
* [Queues resource](/docs/voice/api/queue-resource)
  * [Members subresource](/docs/voice/api/member-resource)

`https://voice.twilio.com/v1` is the base URL for the following resources:

* [Countries resource](/docs/voice/api/dialingpermissions-country-resource)
  * [HighRiskSpecialPrefixes subresource](/docs/voice/api/dialingpermissions-highriskspecialprefix-resource)
* [BulkCountryUpdates resource](/docs/voice/api/dialingpermissions-bulkcountryupdate-resource)
* [Settings resource](/docs/voice/api/dialingpermissions-settings-resource)

`https://voice.twilio.com/v2` is the base URL for the following resources:

* [Client resource](/docs/voice/api/clientconfiguration-resource)

> \[!NOTE]
>
> You can control your connectivity into Twilio's platform by including your specific [edge location](/docs/global-infrastructure/edge-locations) in the subdomain. This will allow you to bring Twilio's public or private network connectivity closer to your applications for improved performance.
>
> For instance, customers with infrastructure in Australia can make use of the `sydney` edge location by using the base URL of:
>
> ```bash
> https://api.sydney.us1.twilio.com/2010-04-01
> ```

## Voice API Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
    -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Make and manage calls with the Voice API

Twilio's Voice API lets you make and manage calls programmatically.

To make an outbound call with the API, make a `POST` to the [Calls resource](/docs/voice/api/call-resource).

You can also leverage the REST API to query metadata and manage state for:

* [Call quality feedback](/docs/voice/api/call-resource)
* [Conferences](/docs/voice/api/conference-resource) and [Participants](/docs/voice/api/conference-participant-resource)
* [Outgoing caller IDs](/docs/voice/api/outgoing-caller-ids)
* [Queues](/docs/voice/api/queue-resource) and [Members](/docs/voice/api/member-resource)
* [Recordings](/docs/voice/api/recording) and [Transcriptions](/docs/voice/api/recording-transcription)

### Leverage the Voice SDKs to make or receive calls

Make, receive, or manage calls from any web interface or mobile application.

For step-by-step instructions on how to do this with one of our supported SDKs, check out the quickstarts for:

* [C#/.NET](/docs/voice/quickstart/server)
* [Java](/docs/voice/quickstart/server)
* [Node.js](/docs/voice/quickstart/server)
* [PHP](/docs/voice/quickstart/server)
* [Python](/docs/voice/quickstart/server)
* [Ruby](/docs/voice/quickstart/server)
* [Go](/docs/voice/quickstart/server)
* [iOS - Swift](https://github.com/twilio/voice-quickstart-swift#quickstart)
* [iOS - Objective-C](https://github.com/twilio/voice-quickstart-objc#quickstart)
* [Android](https://github.com/twilio/voice-quickstart-android#quickstart)
* [Voice JavaScript SDK](/docs/voice/sdks/javascript/get-started) (using Twilio [Functions](/docs/serverless/functions-assets/functions))

### Programmatic call control

The basics of most call flows start with the ability to say strings of text and gather DTMF keypad input.

You can use the Voice API directly to [create outbound calls](/docs/voice/api/call-resource) and query and manage state for [conferences](/docs/voice/conference), [queues](/docs/voice/api/queue-resource), and [recordings](/docs/voice/api/recording).

Twilio's markup language, [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml), is the primary language used to control actions on Twilio. For instance, you'll need to use [TwiML's \<Say>](/docs/voice/twiml/say) to read some text to a person on a Twilio call.

Twilio provides SDKs in 6 supported web programming languages: [C#/.NET](https://github.com/twilio/twilio-csharp), [Java](https://github.com/twilio/twilio-java), [Node.js](https://github.com/twilio/twilio-node), [PHP](https://github.com/twilio/twilio-php), [Python](https://github.com/twilio/twilio-python), and [Ruby](https://github.com/twilio/twilio-ruby). These SDKs make including TwiML in your web application a seamless process.

For instance, you can use one of our SDKs to read some text to a caller and gather their input via keypad: [select your language of choice to get started](/docs/voice/tutorials/how-to-gather-user-input-via-keypad).

### Conference calls & Queueing

Twilio's TwiML provides intelligent [Conference](/docs/voice/conference) and [Queue](/docs/voice/twiml/queue) primitives to take the heavy lifting out of building seamless call experiences:

* Create a Conference by leveraging TwiML's [\<Dial>](/docs/voice/twiml/dial) with [\<Conference>](/docs/voice/twiml/conference). When you add a caller to a conference this way, Twilio creates a [Conference resource](/docs/voice/api/conference-resource) and a [Participant subresource](/docs/voice/api/conference-participant-resource) to represent the caller who joined.
* Use the Conference resource to list the conferences in your account, update a conference's status, and query information about participants in a given conference.
* Learn how to [create and manage conference calls from your web applications](/docs/voice/tutorials/how-to-create-conference-calls) using Twilio's SDKs.
* You can create a new Queue by making a `POST` request to the [Queues resource](/docs/voice/api/queue-resource) or by leveraging the [\<Enqueue>](/docs/voice/twiml/enqueue) verb in your TwiML document. Learn how to [use Twilio's Queue feature to create a call queueing system](/docs/voice/queue-calls).

### Record calls

With Twilio's Voice API, you can record, store, and transcribe calls with a little bit of code:

* If you're using the REST API to create your call, set [`Record=true`](/docs/voice/api/call-resource#create-a-call-resource).
* You can also generate a recording with [TwiML](/docs/voice/twiml/dial#record) or by making a `POST` request to the [Recordings resource](/docs/voice/api/recording#create-a-recording-resource) of a live call.
* Learn how to record calls made from your web application, by taking a spin through this[tutorial on recording outgoing and inbound calls with the server-side SDKs](/docs/voice/tutorials/how-to-record-phone-calls).
* Review our [support article](https://help.twilio.com/hc/en-us/articles/223133027-Transcribe-entire-phone-calls-with-Twilio) for options to transcribe your call recording.

## Manage SIP calls with Twilio's API

Route calls from your existing VoIP infrastructure to Twilio for programmatic call control - without migrating hardware or carriers with SIP interface.

[Programmable Voice SIP](/docs/voice/api/sip-interface) lets you route your voice calls with global reach to any landline phone, mobile phone, browser, mobile app, or any other SIP endpoint.

## Explore rich communications

Explore the power of Twilio's Voice API with our [quickstarts](/docs/voice/quickstart), see how to [make calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls) or [respond to incoming calls](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls), [modify calls](/docs/voice/tutorials/how-to-modify-calls-in-progress), and more by diving into our [collection of tutorials for Programmable Voice](/docs/voice/tutorials).

## Get help integrating the Voice API

Twilio's Voice API is a flexible building block that can take you from making your first phone call.

While we hope this page gives a good overview of what you can do with the API, we're only scratching the surface: check out our [troubleshooting tips](/docs/voice/troubleshooting) to learn about Twilio's debugging tools, common issues, and other tools and add-ons like [Voice Insights](https://www.twilio.com/en-us/voice/insights).

If you need any help integrating the Programmable Voice API or want to talk best practices, get in touch. You can give us feedback by using the rating widget on this page, [talking to support](https://help.twilio.com), [talking to sales](https://www.twilio.com/en-us/help/sales), or [reaching out on Twitter](https://www.twitter.com/twilio).

Let's build something amazing.
