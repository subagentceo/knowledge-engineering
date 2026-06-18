# Webhooks: an Introduction

Webhooks are user-defined [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks. They are triggered by some event in a web application and can facilitate integrating different applications or third-party APIs, like Twilio.

Twilio uses webhooks to let your application know when events happen, such as receiving an SMS message or getting an incoming phone call. When the event occurs, Twilio makes an HTTP `POST` or `GET` request to the URL you configured for the webhook. The Twilio request includes details of the event, such as the incoming phone number or the body of an incoming message. Many other modern web services like GitHub and Slack also make use of webhooks to communicate events.

![SMS webhook request cycle from sender to Twilio to recipient.](https://docs-resources.prod.twilio.com/79151a29480b443e107245a4c278fddeee9a1f654e2eaf1c57af02ba00a9d971.gif)

Some webhooks are informational—for example, they can notify you when a voice-call recording is ready for download. Others require your web application to respond—for example, to tell Twilio what to do when someone calls your Twilio phone number.

## Get started with webhooks

Watch the following Twilio Tip video, and read the [Getting started with Twilio webhooks guide](/docs/usage/webhooks/getting-started-twilio-webhooks).

https://www.youtube.com/watch?v=aLjSNfoJCYc

## Webhooks by product

Each Twilio product uses webhooks differently. To learn more about which webhooks each product uses and how to set them up with your application, visit these pages:

* [Voice](/docs/usage/webhooks/voice-webhooks)
* [Messaging](/docs/usage/webhooks/messaging-webhooks)
* [Conversations](/docs/conversations-classic/conversations-webhooks)
* [Sync](/docs/sync/webhooks)

## Twilio runtime webhooks

Webhooks aren't just limited to products. You can also have Twilio send you webhooks when events occur in your application. These events include billing levels reaching a threshold or errors that occur when Twilio calls your web application. You can set up a pipeline that sends your webhooks to Slack, Microsoft Teams, or another chat system. You can also set up a webhook that notifies you by email.

Learn more about each of these areas on these pages:

* [Debugging Events Webhook (Beta)](/docs/usage/troubleshooting/debugging-event-webhooks)
* [REST API: Usage Triggers](/docs/usage/api/usage-trigger)

## What's next?

Get an in-depth discussion of webhooks, learn how to validate that inbound webhooks are from Twilio, and read answers to questions from the Twilio developer community.

* [Overview of Webhooks, Callbacks, and Inbound Requests](/docs/usage/webhooks/webhooks-overview)
* [Webhook Security](/docs/usage/webhooks/webhooks-security)
* [Webhooks FAQ](/docs/usage/webhooks/webhooks-faq)

## Webhook tutorials

Follow these tutorials to implement webhooks and explore their capabilities:

* [Track Delivery Status of Messages](/docs/messaging/guides/track-outbound-message-status)
* [Receive and Reply to SMS and MMS Messages](/docs/messaging/tutorials/how-to-receive-and-reply)
* [Serverless Webhooks with Azure Functions and C#](/docs/usage/tutorials/serverless-webhooks-azure-functions-and-csharp)
* [Serverless Webhooks with Azure Functions and Node.js](/docs/usage/tutorials/serverless-webhooks-azure-functions-and-node-js)
* [Creating an ASP.NET MVC Webhook Project](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment)
