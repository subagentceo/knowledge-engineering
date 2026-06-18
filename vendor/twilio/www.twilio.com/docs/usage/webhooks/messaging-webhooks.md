# Messaging Webhooks

Twilio supports two different types of [webhooks](/docs/usage/webhooks) for use with [Programmable Messaging](/docs/messaging):

* The [Incoming Message Webhook](#incoming-message-webhook) allows you to programmatically react when your Twilio phone number receives a message.
* The [Outbound Message Status Callback](#outbound-message-status-callback) allows you to programmatically track the delivery status of a message you sent.

## Incoming Message Webhook

Your Twilio phone numbers can use webhooks to react to the receipt of incoming messages.

When one of your Twilio phone numbers receives a message, Twilio can send either an HTTP `POST` or an HTTP `GET` request to a webhook URL you configured.
Twilio's webhook request contains the information about the incoming message in either the `POST` body or the `GET` query parameters, respectively.

For the complete list of parameters that Twilio sends, read more information about [Twilio's request to your application](/docs/messaging/twiml#twilios-request-to-your-application).

Your application has to return Twilio Markup Language ([TwiML](/docs/messaging/twiml)) as the response to Twilio's webhook request. This response tells Twilio what to do. For instance, you can reply to the sender of the received message with your own message requesting more information.

> \[!NOTE]
>
> It is also possible to receive an incoming message and not send a reply message back to the user. To do so, simply send the following TwiML in your response to Twilio:
>
> ```bash
> <Response></Response>
> ```
>
> For more on this topic, read this support article: [Receive SMS and MMS Messages without Responding](https://help.twilio.com/hc/en-us/articles/223134127-Receive-SMS-and-MMS-Messages-without-Responding)

Ready to set up incoming message webhooks for your own application?

To configure a webhook for a Twilio phone number receiving inbound SMS/MMS messages, follow these tutorials:

* [Receive and Reply to SMS and MMS Messages in Node.js](/docs/messaging/tutorials/how-to-receive-and-reply/node-js)
* [Receive and Reply to SMS and MMS Messages in Python](/docs/messaging/tutorials/how-to-receive-and-reply/python)
* [Receive and Reply to SMS and MMS Messages in C#](/docs/messaging/tutorials/how-to-receive-and-reply/csharp)
* [Receive and Reply to SMS and MMS Messages in Java](/docs/messaging/tutorials/how-to-receive-and-reply/java)
* [Receive and Reply to SMS and MMS Messages in Ruby](/docs/messaging/tutorials/how-to-receive-and-reply/ruby)
* [Receive and Reply to SMS and MMS Messages in PHP](/docs/messaging/tutorials/how-to-receive-and-reply/php)

To respond to incoming WhatsApp messages with media, follow these tutorials:

* [Respond with Media in WhatsApp using Node.js](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-nodejs#respond-with-media-in-whatsapp)
* [Respond with Media in WhatsApp using Python](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-python#respond-with-media-in-whatsapp)
* [Respond with Media in WhatsApp using C#](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-csharp-aspnet#respond-with-media-in-whatsapp)
* [Respond with Media in WhatsApp using Java](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-java-servlets#respond-with-media-in-whatsapp)
* [Respond with Media in WhatsApp using Ruby](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-ruby#respond-with-media-in-whatsapp)
* [Respond with Media in WhatsApp using PHP](/docs/whatsapp/tutorial/send-and-receive-media-messages-whatsapp-php#respond-with-media-in-whatsapp)

## Outbound Message Status Callback

To determine if a message that your application sends has delivered successfully, you can do either of the following actions:

* Use status callbacks to respond to changes in the status of outbound messages as they happen.
* Use the [Message resource](/docs/messaging/api/message-resource) of the [Programmable Messaging REST API](/docs/messaging/api) to [fetch a specific Message](/docs/messaging/api/message-resource#fetch-a-message-resource) by its Message `SID` and check the returned [Message Status value](/docs/messaging/api/message-resource#message-status-values).

Message status changes occur throughout the lifecycle of a message from creation, through sending, to delivery, and even read receipt for supporting [messaging channels](/docs/messaging/channels).
Twilio can send status callback requests for the message status transitions described in the guide [Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks).

To use status callbacks to programmatically react to changes in a message's status, you need to:

* Set up your status callback endpoint on the [Messaging Service](/docs/messaging/services#status-callback-url) directly
* Set up your status callback endpoint to receive Twilio's status callback requests.
* Send the message specifying the `StatusCallback` URL of your endpoint.

For step-by-step instructions to accomplish these tasks, see [Tracking the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status).

## What's next?

For advanced considerations when implementing a production-grade status logging solution for a large number of outbound messages, see
[Best Practices for Messaging Delivery Status Logging](/docs/messaging/guides/outbound-message-logging).
