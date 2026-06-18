# What is Call Whisper?

*Call Whisper*, also commonly referred to as *Call Screening*, involves playing a message to the callee while the caller continues to hear ringing. It can provide additional information such as the source or purpose of the call to the callee before the call begins and even allow the callee to accept or reject the call based on that information.

## Common Applications of Call Whisper

* [**Call Tracking**](/en-us/use-cases/call-and-text-marketing/call-tracking)**:** With certain types of call tracking implementations, tracked calls can come from numerous different phone numbers. In these situations, whisper is used to inform the callee that they're receiving a tracked call from a potential customer. Additional information on the caller, such as location and demographic information can also be provided in the whisper.
* **[Contact Center](https://www.twilio.com/en-us/flex):** Whisper can be used in contact centers to provide the agent with additional information on the customer and the nature of the request. The information can be gathered from the customer using an IVR when they call in, or from a CRM using the caller ID or any other identifier.

## **Implementing call whisper with Twilio**

The [\<Dial>](/docs/voice/twiml/dial) verb in [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml) allows you to add a call whisper feature to your Twilio voice application by providing a call screening URL that controls the call once the callee picks up while the caller continues to hear ringing (required [answerOnBridge](/docs/voice/twiml/dial#answeronbridge) set to true). If the call is being answered by a client created using the [Voice JavaScript SDK](/docs/voice/sdks/javascript), the `url` attribute on the [\<Client>](/docs/voice/twiml/client) noun can be used. If the call is being answered using a phone number, the same attribute is available on the [\<Number>](/docs/voice/twiml/number). \
This attribute can point to a URL that can return TwiML containing the [\<Play>](/docs/voice/twiml/play) and [\<Say>](/docs/voice/twiml/say) verbs to play a message to the callee before connecting the call. It can also contain [\<Gather>](/docs/voice/twiml/gather) and [\<Hangup>](/docs/voice/twiml/hangup) verbs, allowing the callee to accept or reject the call by pressing a key.

For more detailed information, please check out this [tutorial on Call Screening](/blog/ivr-screening-recording-csharp-aspnet-mvc).
