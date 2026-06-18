# What is the Twilio Markup Language (TwiML)?

TwiML, or the Twilio Markup Language, is an XML-based language that instructs Twilio on how to handle various events such as incoming and outgoing calls, SMS messages, and MMS messages. When building a Twilio application you will use TwiML when communicating your desired actions to Twilio.

https://www.youtube.com/watch?v=fb0rKmGGyq8

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

Every TwiML document will have the root **\<Response** > element and within that can contain one or more **verbs** . Verbs are actions you'd like Twilio to take, such as [\<Say>](/docs/voice/twiml/say) a greeting to a caller, or send an SMS [\<Message>](/docs/messaging/twiml/message) in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our [TwiML API Reference](/docs/voice/twiml).

### How Does TwiML Work?

TwiML is composed of a number of *verbs* and *nouns* which act as instructions for Twilio. Those verbs include:

* [Say](/docs/voice/twiml/say) - Read text to the caller
* [Play](/docs/voice/twiml/play) - Play an audio file for the caller
* [Dial](/docs/voice/twiml/dial) - Add another party to the call
* [Record](/docs/voice/twiml/record) - Record the caller's voice
* [Gather](/docs/voice/twiml/gather) - Collect digits the caller types on their
  keypad
* [SMS](/docs/voice/twiml/sms) - Send an SMS message during a phone call
* [Hangup](/docs/voice/twiml/hangup) - Hang up the call
* [Queue](/docs/voice/twiml/queue) - Add the caller to a queue of callers.
* [Redirect](/docs/voice/twiml/redirect) - Redirect call flow to a different
  TwiML document.
* [Pause](/docs/voice/twiml/pause) - Wait before executing more instructions
* [Reject](/docs/voice/twiml/reject) - Decline an incoming call without being
  billed.
* [Message](/docs/messaging/twiml/message) - Send an MMS or SMS message reply

*Nouns* generally are acted on by a *verb* or will modify the verb's behavior. For example, the *Message* verb will send a text message but the text inside the tags and `Body`, and `Media` are nouns which change exactly what Twilio will do. Depending on how you use the nouns, the *Message* might be a SMS, multiple SMSes, or an MMS.

Click on individual *verbs* to see the *nouns* available.

### How Do I Use TwiML?

TwiML is the primary language used to control actions on Twilio and is especially powerful when combined with our products such as [Programmable Messaging](/docs/messaging) and [Programmable Voice](/docs/voice).

Your application will return TwiML in response to various events. Some of those events might be an incoming phone call or SMS, or perhaps a change in delivery status for a SMS your application sent.

### Can I Use TwiML Without Writing Code?

Yes! We encourage you to look at [TwiML Bins](https://www.twilio.com/console/dev-tools/twiml-bins), Twilio's no-code, serverless solution for running TwiML. It's the most frictionless way to start using Twilio: don't worry about spinning up a new VPS or exposing a route to your development machine. TwiML Bins allow you to quickly prototype your app - or even run it in production directly from our servers.

For those of you who are writing code, [the Twilio SDKs](/docs/libraries) will automatically create valid TwiML for you. If you don't use one of our primary languages, don't sweat it! We've included curl commands and raw TwiML with most of our examples so you can call the API or return TwiML from your language of choice.

## Ready to Start Exploring TwiML?

We know you're going to like TwiML as much as we do. Sign up for a Twilio account and [try TwiML bins](https://www.twilio.com/console/dev-tools/twiml-bins) or hop right [into the SDKs](/docs/libraries).

Let's build something amazing.
