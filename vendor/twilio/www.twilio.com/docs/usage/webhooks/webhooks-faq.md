# Webhooks FAQ

Here are some commonly asked questions about webhooks and inbound requests.

## What is a webhook?

Webhooks are user-defined [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) callbacks. They are triggered by some event in a web application and can facilitate integrating different applications or third-party APIs, like Twilio.

Learn more on this glossary page: [What is a Webhook?](/docs/glossary/what-is-a-webhook)

## Where do I find the specifications for inbound HTTP requests to my server?

Each type of event (such as an incoming text message, or a phone call status change) sends a webhook with a format that corresponds to that type.

For incoming phone calls, Twilio will make an HTTP [request to your server](/docs/voice/twiml#twilios-request-to-your-application) that expects TwiML as a response. This HTTP request may either be a `GET` or a `POST`. Typically, you will want those HTTP requests to be encrypted with TLS, and sent over an HTTPS connection.

For inbound text messages, Twilio will send an HTTP `POST` request to your server with a body that uses the **application/x-www-form-urlencoded** encoding. View the [list of parameters sent in that request](/docs/messaging/twiml#twilios-request-to-your-application).

## How does my server respond to Twilio webhooks?

Your web application will respond to a Twilio webhook differently, depending on what type of event it is. If you are receiving a webhook for an inbound text message, your application would respond with [TwiML for Programmable SMS](/docs/messaging/twiml). For an inbound voice call, your application would produce [TwiML for Programmable Voice](/docs/voice/twiml).

Other events may simply require that your web application responds with a simple HTTP `200 OK` - for instance, a Programmable Voice status callback webhook. This is typically for events where Twilio is informing your web application that an event has occurred but is not expecting interaction.

## How do I validate that incoming webhooks are sent from Twilio?

Twilio will send an `X-Twilio-Signature` HTTP Header with all webhooks. This signature uses your account's auth token to create a digital signature from the content of the request (the parameters being sent via either the `GET` or `POST` method). To verify that an inbound request comes from Twilio, use the [Twilio Server-Side SDKs](/docs/libraries) to validate the request for you with the [RequestValidator](/docs/usage/security#validating-requests).

Find more security information and tutorials for validating inbound webhooks on the [Webhooks Security](/docs/usage/webhooks/webhooks-security) page.

## How do I debug an incoming webhook?

There are a couple of different options - the first is to mimic the incoming Twilio request using a tool like [Paw](https://paw.cloud/) or [Postman](https://www.getpostman.com/downloads/) that lets you easily send HTTP requests to your endpoint. This is very helpful for debugging locally on your own computer.

Next, Twilio provides a [Debugger](https://1console.twilio.com/go?to=/account/__account__/us1/debugger/event-logs) as part of the Twilio Console. The Debugger will list any errors that Twilio finds when it sends a webhook to your application. For more about the Debugger, see this step-by-step guide to [Debugging Webhooks](/docs/usage/troubleshooting/debugging-your-application#debugging-webhooks).

If you would like to view historical data about errors or warnings when Twilio calls your webhook, you can use the [Monitor REST API](/docs/usage/monitor-alert) to retrieve alerts. You may also set up [Alarms](https://1console.twilio.com/go?to=/us1/monitor/alarms/manage) to notify you when an error or warning occurs.

Last, Twilio also provides a Request Inspector in the Console for each Voice Call. This Request Inspector is at the bottom of the call record in the [Call Logs](https://1console.twilio.com/go?to=/account/__account__/us1/logs/voice/calls) section of the Console, which can be found under Programmable Voice, and then in the Calls Section.

The request inspector will show the exact HTTP request that Twilio made, along with the HTTP response that your web application provided. These logs are kept for 30 days.

For more about the Request Inspector, as well as other tips for debugging, see this Support Article for [Debugging your application](https://help.twilio.com/hc/en-us/articles/223136407-Debugging-your-application).

## What IP addresses does Twilio use to send requests?

Twilio uses a pool of IP addresses to send webhook requests. As such, there is not a specific range of IP addresses that you should allow for Twilio webhooks. Instead, we suggest that you consider placing some servers in a DMZ and proxying the Twilio webhook request through those servers to your application servers.

For more, see this Support Article about [Which IP addresses will Twilio's requests come from](https://help.twilio.com/hc/en-us/articles/223183868-Which-IP-addresses-will-Twilio-s-requests-come-from-)?

## How do I test webhooks with my local environment?

You can use [ngrok](https://ngrok.com/) or another tool to set up a tunnel between a web server running on your local computer, and a publicly accessible web URL that you can provide to Twilio to use for webhooks.

For directions to set up ngrok with your own environment, follow one of these tutorials:

* [How to set up your Java and Servlets development environment](/docs/usage/tutorials/how-to-set-up-your-java-development-environment)
* [How to set up your C# and ASP.NET MVC development environment](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment#installing-and-using-ngrok)
* [Set up your Node.js and Express Development Environment](/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment#install-ngrok-for-local-development)
* [How to set up your PHP development environment](/docs/usage/tutorials/how-to-set-up-your-php-development-environment#install-ngrok)
* [How to set up your Python and Flask development environment](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment#install-ngrok)
* [How to set up your Ruby and Sinatra development environment](/docs/usage/tutorials/how-to-set-up-your-ruby-and-sinatra-development-environment#install-ngrok)

## What Twilio region is processing my request?

[Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions) enable you to isolate the processing of your Twilio communications to a specific geographic location. If your applications handle traffic in multiple regions you may need to know which one was used for a given webhook. For this purpose, all webhooks will contain an HTTP header `X-Home-Region` containing the specific region.

Example header: `X-Home-Region: us1`
