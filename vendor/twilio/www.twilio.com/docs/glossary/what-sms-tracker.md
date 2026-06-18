# What is an SMS tracker?

An SMS tracker is software that uncovers detailed information about the delivery and content of text and picture messages. It allows anyone to analyze an individual message or group of messages to see delivery patterns, encoding details, and error conditions.

From the moment you (or your application) kick off a new message to when that message reaches the recipient's phone screen, there are many possible points of failure. We take for granted that an [SMS or MMS](https://www.twilio.com/en-us/messaging/channels/sms) arrives quickly and unscathed. Yet it almost always does. In each case, that means the message was sent correctly by the handset or application, was properly encoded and segmented for the downstream carrier, navigated the global carrier network without incident, and was assembled and displayed correctly on the recipient's handset. If something went wrong along the way, an SMS tracker provides the insight needed to quickly diagnose what happened. It can determine when a delay or failure condition occurred and what part of the communication chain was responsible.

**Delivery Status**

An SMS tracker provides real-time information when a message is queued, sent, delivered successfully, or not delivered by the carrier. It provides useful error information for delivery failures, such as when:

* The receiving phone is turned off or otherwise unavailable.
* The phone number can't receive the SMS, possibly because it is not a mobile number or is blocked.
* The content of the message is in violation of the carrier's rules.
* Too many messages are sent too quickly.

With Twilio, you can directly notify your app about [SMS](https://www.twilio.com/en-us/messaging/channels/sms) delivery status via a [webhook](/docs/glossary/what-is-a-webhook), which is a user-defined HTTP callback. The following [guide](/docs/messaging/guides/track-outbound-message-status) will show you how to set it up.

Detailed information on an individual message is also available through a web-based Console view. It might look like the following:

![Twilio Console Message Details showing delivery status, media, delivery steps, and errors.](https://docs-resources.prod.twilio.com/8037a109b9d8987135b2f5aeb8fb34c0446b91e1be13cb677ce67b88914ca010.png)

**Message Content**

Whether your message contains alphanumeric characters, emoji, or pictures, the content of the message can dictate how it's sent (e.g. using SMS or MMS) and the encoding mechanism used. Different carriers around the world use different encoding methods and this can sometimes impact whether your message looks the same way to the recipient as it does when you sent it.

With an SMS Tracker, you can learn about how message content was formatted or encoded and can log the actual text and picture content for compliance.

It's even possible to retrieve sentiment and keyword analysis about the messages with services that augment an SMS API like [IBM Watson](https://showcase.twilio.com/). This way you can gain insight into what's said across a group of messages without having to read each one.

**Conversation Tracking**

You can also track [SMS conversations](/docs/messaging/tutorials/how-to-create-sms-conversations/php) between two specific phone numbers using HTTP cookies. To do this, you must create a unique cookie for each to/from phone number pair and store the unique cookie messages sent between that pair of numbers. So, for example, the cookie for messages sent between 650-555-2222 and 212-555-9999 will be different than a cookie used in a text conversation between 408-555-3333 and 925-555-1111.

**User Actions**

While infrastructure can provide a wealth of information about delivery and content, there's no substitute for direct user feedback. Twilio, for example, programmatically gathers information about user-actions that relate to an SMS. So, using Twilio's API, you could build an application in which:

* A user receives a passcode via SMS and enters it into a website or app.
* A user enters a temporary password.
* A user replies to a message with a call or SMS.
* A user clicks on a unique link contained in a message.

You can then process these actions to locate network issues and improve message delivery rates.

An SMS tracker uses network data, various monitoring techniques, and direct user feedback data to improve delivery and give you a complete view of the messages you send and receive. It exposes the data to you, and helps inform carrier routing decisions so your messages are always delivered quickly and reliably.
