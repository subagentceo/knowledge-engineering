# Conversation Intelligence (classic) API Overview

The Conversation Intelligence (classic) API allows you to analyze and extract actionable business intelligence from conversations between your customers and agents using artificial intelligence and machine learning technologies.

This REST API lets you start conversation analysis services, generate transcripts, and manage webhooks that send information to your application while Intelligence Services extracts meaningful data.

## Base URL for API

All endpoints in the Conversation Intelligence (classic) API reference documentation use the following base URL:

```bash
https://intelligence.twilio.com/v2
```

The API is served over HTTPS. To ensure data privacy, it doesn't support unencrypted HTTP. It provides all responses in JSON format.

## API resources overview

The Conversation Intelligence (classic) API includes these resources:

**Service resource**

* [Service resource](/docs/conversation-intelligence-classic/api/service-resource): Create, initialize, and manage Intelligence Services.
* [OperatorAttachment subresource](/docs/conversation-intelligence-classic/api/operator-attachment-subresource): Create and delete Operator Attachments from a Service.
* [OperatorAttachments subresource](/docs/conversation-intelligence-classic/api/operator-attachments-subresource): Fetch Operator Attachments associated with a Service.

**Transcript resource**

* [Transcript resource](/docs/conversation-intelligence-classic/api/transcript-resource): Generate and manage conversation Transcripts.
* [Transcript Media subresource](/docs/conversation-intelligence-classic/api/transcript-media-subresource): Access recording media associated with a Transcript.
* [Transcript OperatorResults subresource](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource): Get the list of OperatorResults for a transcript.
* [Transcript Sentence subresource](/docs/conversation-intelligence-classic/api/transcript-sentence-subresource): List the Sentences of a Transcript.

**Operator resource**

* [Operator resource](/docs/conversation-intelligence-classic/api/operator-resource): Retrieve the details of a Pre-built or Custom Operator.
* [PrebuiltOperator subresource](/docs/conversation-intelligence-classic/api/prebuilt-operator-subresource): Fetch and list Pre-built Operators.
* [CustomOperator subresource](/docs/conversation-intelligence-classic/api/custom-operator-subresource): Create, fetch, list, update, and delete Custom Operators.

**OperatorType resource**

* [OperatorType resource](/docs/conversation-intelligence-classic/api/operator-type-resource): Get the details of an OperatorType.

## Authenticate API requests

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

### Restricted API keys

You can use [Restricted API keys](/docs/iam/api-keys/restricted-api-keys) with Conversation Intelligence (classic) for fine-grained control over API resources. For example, you can provide permissions for an API key to only modify [Intelligence Service resources](/docs/conversation-intelligence-classic/api/service-resource), but not access potentially-sensitive information such as unredacted [Transcript Media subresources](/docs/conversation-intelligence-classic/api/transcript-media-subresource), [Transcript resources](/docs/conversation-intelligence-classic/api/transcript-resource), or [Transcript OperatorResults subresources](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource).

For more information on Twilio's REST API, refer to the Usage documentation on [sending requests](/docs/usage/requests-to-twilio), [API responses](/docs/usage/twilios-response), and [security](/docs/usage/security).

## Rate limiting

Conversation Intelligence (classic) API endpoints are rate limited. You should follow the [REST API Best Practices](/docs/usage/rest-api-best-practices), and implement [retries with exponential backoff](/docs/usage/rest-api-best-practices#retry-with-exponential-backoff) to properly handle the API response [Error 429 "Too Many Requests"](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-) for high-volume workloads.
