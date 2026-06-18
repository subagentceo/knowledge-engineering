# Getting Started with Twilio Webhooks

Ready to get started with Twilio webhooks? Our first recommendation is to watch this video on what webhooks are! Prefer to read about them instead of watching a video? Check out this glossary entry: [What is a Webhook?](/docs/glossary/what-is-a-webhook)

https://www.youtube.com/watch?v=aLjSNfoJCYc

Next, you can follow along with these directions, as we show you how to receive Twilio webhooks with your web application.

This getting started guide is not specific to a certain product at Twilio or to a particular language or platform. We do have language-specific step-by-step tutorials for common webhooks use cases (such as [Responding to Incoming Phone Calls](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls), or [Tracking the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status).

## Finding the right webhooks

The first step in the process is to find the right webhooks for your application. Specific information about webhooks by product is on these pages:

* [Voice Webhooks](/docs/usage/webhooks/voice-webhooks)
* [Messaging Webhooks](/docs/usage/webhooks/messaging-webhooks)

Other Twilio products (such as Conversations, WhatsApp, and Authy) also have webhooks for certain events.

* [Conversations Webhooks](/docs/conversations-classic/conversations-webhooks)
* [Authy Webhooks](/docs/authy/api/webhooks)
* [Proxy Webhooks](/docs/proxy/api/webhooks)
* [Video Status Callbacks](/docs/video/api/status-callbacks)
* [Facebook Messenger](/docs/messaging/channels/facebook-messenger)

In addition to product-specific webhooks, your web application may receive webhooks from Twilio for events such as an error in TwiML returned by your application, or exceeding a certain number of text messages sent per month. For these webhooks, see these pages in the documentation:

* [Debugging Events Webhooks](/docs/usage/troubleshooting/debugging-event-webhooks)
* [Usage Triggers](/docs/usage/api/usage-trigger)
* [Alert Triggers](/docs/usage/troubleshooting/alarms)

Of course, your project may not need all of these webhooks - but you may be able to add some interesting functionality by using them!

## Responding to webhooks

The next step is to map out how you respond to each webhook. Some Twilio webhooks require a response, typically in Twilio Markup Language (TwiML). The TwiML you send back to the webhook varies based on what product you are using:

* [TwiML for Programmable Voice](/docs/voice/twiml)
* [TwiML for Programmable Messaging](/docs/messaging/twiml)
* [TwiML for Programmable Fax](https://help.twilio.com/hc/en-us/articles/1260800821230-Programmable-Fax-Migration-Guide-for-Documo-mFax)

Other Twilio webhooks are informational and simply require a standard HTTP `200 OK` response. This acknowledges that the webhook was received by your web application.

## Use mock webhook requests for development

Once you have identified the webhooks you are planning to use, it's time to write some code! For ad-hoc testing purposes during development, you may find it worthwhile to set up mock HTTP requests to your application. We suggest either using a command-line tool like [curl](https://curl.haxx.se/docs/manpage.html), or a desktop application like [Postman](https://www.getpostman.com/).

Use the sample webhook requests found in the Twilio documentation as starters for your own requests, or send Twilio webhooks to a service like [RequestBin](https://requestbin.com/) to capture the HTTP request being sent.

## Create automated tests for webhooks

After doing some initial validation of your code, you can write automated tests using your preferred testing framework. Once you deploy your application, you can check the Twilio Debugger for errors when a webhook is sent to your application. Those HTTP requests would make excellent candidates for additional tests for your web application framework.

For test-driven development (TDD), you may consider swapping the order of this step and the previous step.

## Run your application on a public URL

Twilio needs to send webhook requests to a publicly available URL. There are two main ways of approaching this - the first is to deploy your web application code to a development or test server that is reachable from the public internet. The second way is to use an HTTP tunneling tool like [ngrok](https://ngrok.com/) to set up a public URL for your application (like `https://n4f4j12.ngrok.io/`) that maps to a web application server running locally on your computer.

In some cases, ngrok or other HTTP tunnels may be blocked by your internal network's firewalls. In those cases, you should set up a development or testing server to use with Twilio before deploying your webhook project to a production environment.

For more about using ngrok to develop webhooks locally, see:

* [How to set up your Java and Servlets development environment](/docs/usage/tutorials/how-to-set-up-your-java-development-environment)
* [How to set up your C# and ASP.NET MVC development environment](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment#installing-and-using-ngrok)
* [Set up your Node.js and Express Development Environment](/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment#install-ngrok-for-local-development)
* [How to set up your PHP development environment](/docs/usage/tutorials/how-to-set-up-your-php-development-environment#install-ngrok)
* [How to set up your Python and Flask development environment](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment#install-ngrok)
* [How to set up your Ruby and Sinatra development environment](/docs/usage/tutorials/how-to-set-up-your-ruby-and-sinatra-development-environment#install-ngrok)

## Configure your public URL with Twilio

Now, Twilio needs to know the URL to which it can send webhook requests.

For Twilio phone numbers, you can set the webhook URL for inbound voice calls, inbound messages, or inbound faxes through the Twilio Console.

For other webhooks, such as the message status callback for outbound messages, you need to set the callback URL either when you send the message through the REST API or when you provide TwiML as a response.
Typically, the API request parameter to set the callback URL is named `callback` or `statusCallback`. Similarly, the TwiML `<Message>` verb to send an outbound message provides an attribute to set the status callback URL.

For specific information about how to set the webhook URL, see the webhook documentation for the product and type of webhook you intend to use.

## Validate that webhook requests are coming from Twilio

Once you have Twilio sending requests to your web application, you may start validating that your incoming webhooks are actually from Twilio. This ensures that third parties can't issue requests to your webhook URL. Twilio signs each HTTP request to your web application with an `X-Twilio-Signature` HTTP header using your Twilio account key.

See the guide to [Webhooks Security](/docs/usage/webhooks/webhooks-security) for more, and read the [validating Twilio requests](/docs/usage/security#validating-requests) section of the security documentation.

Also, you need to update your integration tests, if the path they are testing goes through your validation process. One approach would be to sign your HTTP requests with a made-up Twilio account key, and then use that same key to validate requests in the integration test.

Many test frameworks can set environment variables for test mode (as opposed to production), and keeping account credentials outside of your code is also a best practice.

## Test your webhooks with live traffic

Everything should work now, but it's time to try some live traffic out! How to test live traffic depends on which webhooks you are using, but you can start making phone calls to your Twilio number, sending text messages, or whatever else you have built. Try to exercise as many corner or edge cases as possible with your application, so that you can see if there were any assumptions left out of your unit or integration tests. Go in and add those edge cases to your automated tests, while you are doing manual testing.

## Promote your web application to staging and production

Now you can start the process of promoting your web application to a staging environment, and then to production. As you enter each step, update the callback URL you use with Twilio to ensure that the testing you are doing goes to the correct environment.

Double-check that your production Twilio phone numbers are pointing to production web application environments. Similarly, make sure that the webhooks are being received in production, and network rules don't need to be changed on the firewall.

Test your webhook with SSL enabled, and the certificates you use in production, to ensure that everything works correctly. Twilio webhooks do not work on HTTPS endpoints with self-signed SSL certificates - for more, see the guide to [Webhooks Security](/docs/usage/webhooks/webhooks-security).

Your web application is now in production and ready to respond to Twilio webhooks. For more information, see the [Webhooks FAQ](/docs/usage/webhooks/webhooks-faq).
