# Webhooks Overview

Twilio provides a REST API for HTTP requests from your application to the Twilio servers. This works well for actions like sending an SMS message or placing a voice call. What happens when your application needs to respond to an event processed by Twilio? One example where your application might need to respond would be that someone makes a phone call to one of your Twilio phone numbers - what should Twilio do next?

## What are Webhooks?

Twilio will send your web application HTTP (or HTTPS) requests after certain events occur - these events differ for each Twilio product. These requests are known as *webhooks* or *callbacks*. Typically, the reason that your web application would get an HTTP callback would be that something a user did should probably be handled by your web application.

For instance, after a customer hangs up on a voice call to a customer service phone number provided by Twilio, a webhook can be sent to your web application. Your web application could tag the customer service agent who handled that phone call as available, add a record to the customer's profile about the length of the call, and then prompt the customer service agent to write follow-up notes.

Some Twilio products may use a different pattern to notify your application that something has occurred - for instance, in an iOS app, there may be a delegate. Typically, webhooks are used because your application does not maintain an open session or connection with Twilio - so Twilio makes an asynchronous HTTP (or HTTPS) request to your web server.

## What do you do with incoming webhooks?

Some webhooks from Twilio require a response - for instance, an inbound SMS message to a Twilio phone number will trigger a webhook to your web application. Your web application would need to return a valid Twilio Markup Language ([TwiML](/docs/glossary/what-is-twilio-markup-language-twiml)) to the Twilio webhook request, even if the TwiML response is simply an empty `Response` tag.

Other webhooks, such as one notifying your web application that a voice recording is complete, are informational. Twilio does not require a response from your web application, other than an HTTP status code of 200 (OK).

## Testing Webhooks on your local development environment

Twilio webhooks require a publicly accessible URL of some kind. While you can put basic HTTP authentication on the URL for security, the URL itself must be one that Twilio can send an HTTP request. In practice, this means that using your local computer for development requires a separate step. Typically there are routers and/or firewalls between your computer and the public internet, which means that unless you use network address translation (NAT), you'll need to use separate software to create a publicly-accessible IP address that can pass requests to your local web application server.

One freely available tool to create these tunnels is [ngrok](https://ngrok.com/). With ngrok, you can have an HTTPS URL (like `https://dc3b6xfb.ngrok.io`) that tunnels requests to a web application server running locally on your own computer at a given port.

1. Install ngrok
2. Run a command similar to:
   ```bash
   ngrok http 8080
   ```

If your development web server uses a different port, replace `8080` with that port. Common ports include `3000`, `4567`, `5000`, `8000`, and `8080`.

You will see a display from ngrok similar to the following:

![Ngrok session status online with Twilio account, update available, version 2.2.8, US region, forwarding URLs.](https://docs-resources.prod.twilio.com/2e53ce436201d77a9495fac368447210cc55adeb4076bda35092a7e68ec7df7e.png)

Next to the forwarding label, you will see your new publicly accessible URL. Use that URL when you configure your webhooks with Twilio, and requests will be served from your local computer. Keep the ngrok command open to maintain the same domain name, however, ngrok will expire publicly accessible domain names after a length of time if you are not on a paid subscription plan.

## Learn more about webhooks

There's lots more to learn about webhooks and we've put together some detailed documentation to help you dive deeper into how to use and manage them.

* [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks)
* [Webhooks FAQ](/docs/usage/webhooks/webhooks-faq)
* [Webhooks Security](/docs/usage/webhooks/webhooks-security)
