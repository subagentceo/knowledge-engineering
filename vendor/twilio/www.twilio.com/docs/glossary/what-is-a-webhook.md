# What is a Webhook?

An event-driven communication that sends data between apps using custom HTTP `POST` request to a URL.

To handle event-driven data communications between two apps, webhooks have replaced API requests. Rather than an outside app making requests your API on a regular cadence to see if something changed, your app sends a notification when something changes. This has led to webhooks being called "Reverse APIs".

To implement a webhook:

1. You add an API to your app.
2. The API includes a webhook property that points to a URL for a different web app.
3. A user of your app does something that triggers an event.
4. The API sends data received from that event to the webhook URL you specified.
5. The app returns the result of the webhook.

https://www.youtube.com/watch?v=aLjSNfoJCYc

## Webhooks in Twilio

To let your app know when events happen, Twilio uses webhooks. These events could include receiving an SMS message or getting an incoming phone call. When the event occurs, Twilio makes an [HTTP request][http-requests] to the URL you configured for your webhook. The Twilio request includes event details such as the incoming phone number or the body of an incoming message. To communicate events, many web services like GitHub and Slack also make use of webhooks.

![SMS HTTP request cycle showing server-client interactions with webhooks.](https://docs-resources.prod.twilio.com/79151a29480b443e107245a4c278fddeee9a1f654e2eaf1c57af02ba00a9d971.gif)

Whichever framework and language you choose, webhooks function the same for every Twilio app.

### Related topics

To learn how to work with webhooks on a variety of platforms, see these guides:

* [Webhooks Hub][]
* [Receive and Reply to SMS and MMS Messages][]
* [Track Delivery Status of Messages][]
* [Respond to Incoming Phone Calls][]
* [Serverless Webhooks with Azure Functions][]

[http-requests]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

[Receive and Reply to SMS and MMS Messages]: /docs/messaging/tutorials/how-to-receive-and-reply

[Respond to Incoming Phone Calls]: /docs/voice/tutorials/how-to-respond-to-incoming-phone-calls

[Serverless Webhooks with Azure Functions]: /docs/usage/tutorials/serverless-webhooks-azure-functions-and-node-js

[Track Delivery Status of Messages]: /docs/messaging/guides/track-outbound-message-status

[Webhooks Hub]: /docs/usage/webhooks
