# The Proxy API Overview

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

## How it works

Twilio Proxy is exposed as a REST API that allows you to create masked/anonymized text and voice conversations between users.

![Proxy Overview Graphic.](https://docs-resources.prod.twilio.com/f74d5bd01700c4a4c47e5f0cc86aed918984c174922cb35676b8d9837c6ba3b6.png)

The Proxy REST API allows you to create and manage:

* [Services](/docs/proxy/api/service)
* [Sessions](/docs/proxy/api/session)
* [Participants](/docs/proxy/api/participant)
* [Interactions](/docs/proxy/api/interaction)

Additionally, you can add [phone numbers](/docs/proxy/api/phone-number) with Voice or SMS capabilities to a phone number pool.

### REST API resources diagram

![Diagram showing service with sessions, participants, interactions, and phone numbers.](https://docs-resources.prod.twilio.com/287bbc9c1201dc858c89b5cedca2837169526cb0fa286eb9446eacc03f55a223.png)

## API base URL

All URLs in the reference documentation use the following base URL:

```bash
https://proxy.twilio.com/v1
```

*All requests to the Proxy REST API are served over HTTPS. Unencrypted HTTP is not supported.*

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

## SDKs

If you use one of our SDKs for [C#](https://github.com/twilio/twilio-csharp), [Java](https://github.com/twilio/twilio-java), [Node.js](https://github.com/twilio/twilio-node), [PHP](https://github.com/twilio/twilio-php), [Python](https://github.com/twilio/twilio-python), or [Ruby](https://github.com/twilio/twilio-ruby); you needn't worry about the URL for the API or how to do HTTP Basic authentication. The SDKs take care of it for you.

## Getting started

Refer to our [quickstart guide](/docs/proxy/quickstart) for a step-by-step introduction to Proxy, or browse the Proxy resources listed in the left-hand navigation for API Reference material.
