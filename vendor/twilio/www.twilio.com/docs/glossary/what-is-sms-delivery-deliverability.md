# What is SMS Delivery or Deliverability?

*SMS Delivery* is a measure of the percentage of outgoing SMS and MMS messages which are received at their intended destination. While sometimes referring to the status of a single message, SMS delivery usually is a rate of delivered versus intended messages and summarized as an 'SMS Delivery Rate.'

## SMS Delivery and Reliability

Whether sending a text message from a phone or through an [SMS API](/docs/glossary/what-is-sms-api-short-messaging-service), the nature of the [short messaging service](/docs/glossary/what-is-an-sms-short-message-service) means some percentage of SMS messages will never be delivered.

As opposed to thumbing out a text on a phone, SMSes sent programmatically through an SMS Gateway have an advantage; application logic can verify delivery, increasing total SMS Deliverability by working around issues with sent messages. Through choosing reliable API partners (Twilio's current SLAs with [Programmable SMS](https://www.twilio.com/en-us/messaging/channels/sms) are here), [implementing read receipts](https://www.twilio.com/blog/introducing-message-delivery-information-nt-html) or falling back to a different process [or number](https://www.twilio.com/blog/twilio-messaging-service-copilot-features), you can keep your SMS Deliverability rate close to 100%.

**Twilio's Messaging Services' *Fallback to Long Code* feature can automatically fall back to long codes on SMS delivery failure**

Of course - even with best practices in place, you'll still have some failures. Here's how to measure your success... and how to improve it.

### The Message Deliverability Equation

There is no standard time frame for measuring SMS or text message deliverability, but most often rates are quoted *annually*, *quarterly*, or *daily*. The equation then becomes:

> TOTAL MESSAGES DELIVERED / MESSAGES INTENDED

It's important to note that deliverability **isn't measured by total API calls or messages sent**. Message Deliverability strictly measures how many messages are delivered versus the number intended in a defined time frame.

This key difference means that your logic can implement fallbacks and use messaging auditing features to increase deliverability, even if that requires additional API calls and redundant logic. As SMS deliverability strictly focuses on intention versus result, Twilio can help you increase deliverability through our value-added services and your business logic and code.

### Common Causes of Text Message Delivery Failure

There are quite a few places where SMS and MMS delivery might fail, especially as messages move through the interfaces between pieces of infrastructure.

Although not an exhaustive list, common failure vectors include:

* Telecommunications Networks and Carriers
* End-Device Level Errors and Exceptions
* Invalid Numbers or Information
* [SMS API Provider](/docs/glossary/what-is-sms-api-short-messaging-service)
* [SMS Gateway](/docs/glossary/what-is-a-sms-gateway)

The device endpoint is an especially common vector for deliverability issues. Sometimes roaming devices or quickly moving devices do not acknowledge SMS or MMS reception, leading to messages being received more than once, or never received at all. (As with multiple API calls, messages delivered multiple times should only be counted as one delivered message.) Additionally, sometimes end devices or numbers just can't receive SMSes - [Twilio's Phone Number Lookup](https://www.twilio.com/en-us/trusted-activation/lookup) can help solve this problem.

Note that sometimes deliverability issues are deliberate - for example, messages judged 'spam' may be blocked by our carrier partners. Twilio [lists message error codes here](/docs/messaging/api/message-resource).

Invalid numbers are the most common reason for message delivery problems. Changed (or fake) phone numbers won't reach their intended destination, decreasing your message delivery score.

### Improving SMS and MMS Deliverability

As listed above, there are quite a few SMS delivery failure modes - but not all are in your control. For your application, the content and meta content as well as any recovery logic are reasonable places to improve your deliverability.

* Ensure phone numbers are correct and can receive phone calls. Our [Phone Number Lookup](https://www.twilio.com/en-us/trusted-activation/lookup) product can assist here.
* Make sure your message is not 'spammy.' Include clear opt-out instructions, precise language, and proper capitalization and punctuation. ([See some of our best practices](https://help.twilio.com/hc/en-us/articles/223181848-How-Does-Carrier-Filtering-Work-) for avoiding carrier blacklists).
* [Use short codes](https://www.twilio.com/en-us/messaging/channels/sms/short-codes) when sending mass text messages.
* When short code message delivery fails, fall back to a [long code](/docs/glossary/what-long-code-phone-number) when using the *Fallback to Long Code* feature of [Twilio Messaging Services](/docs/messaging/services).
* Follow Twilio [text message status codes](https://help.twilio.com/hc/en-us/articles/223134347-What-do-the-SMS-statuses-mean-) and use event webhooks to mark messages to resend later.

With these best practices, you'll ensure high SMS delivery rates. High-quality content and graceful exception handling will ensure you see the highest possible deliverability.

If you still would like more help with deliverability, [talk to Twilio sales](https://www.twilio.com/en-us/help/sales) - we have loads of experience helping customers perfect their SMS Marketing efforts.

**Related Content**

* [Shortcode Phone Numbers](https://www.twilio.com/en-us/messaging/channels/sms/short-codes)
* [SMS Marketing Best Practices and Rate Limits](https://help.twilio.com/hc/en-us/articles/223183648-Sending-and-Receiving-Limitations-on-Calls-and-SMS-Messages)
* [Carrier Text Messaging Filtering FAQ](https://help.twilio.com/hc/en-us/articles/223181848-How-Does-Carrier-Filtering-Work-)
