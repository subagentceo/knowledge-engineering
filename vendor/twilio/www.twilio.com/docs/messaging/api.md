# Messaging API Overview

With the Programmable Messaging REST API, you can add messaging capabilities to your application.

## Base URLs

To ensure data privacy, Twilio serves its APIs over HTTPS.

Messaging-related APIs use three base URLs:

### Twilio API base URL

The following API resources that process SMS messages point to the Base URL of `https://api.twilio.com/2010-04-01`:

* [Messages resource](/docs/messaging/api/message-resource)
  * [Feedback subresource](/docs/messaging/api/message-feedback-resource)
  * [Media subresource](/docs/messaging/api/media-resource)

The following API resources that manage [Messaging Services](/docs/messaging/services) point to `https://messaging.twilio.com/v1`:

* [Services resource](/docs/messaging/api/service-resource)
  * [PhoneNumbers subresource](/docs/messaging/api/phonenumber-resource)
  * [Shortcodes subresource](/docs/messaging/api/services-shortcode-resource)
  * [AlphaSenders subresource](/docs/messaging/api/alphasender-resource)
  * [DestinationAlphaSenders subresource](/docs/messaging/api/destination-alphasender-resource)
  * [ChannelSenders subresource](/docs/messaging/api/messaging-service-channelsender-resource)

The following API resources that report on deactivated phone numbers and process toll-free verification requests also point to `https://messaging.twilio.com/v1`:

* [Deactivations resource](/docs/messaging/api/deactivations-resource)
* [Verifications resource](/docs/messaging/api/tollfree-verification-resource)

The API resource that reports on [per-country SMS pricing](/docs/messaging/api/pricing) points to the `https://pricing.twilio.com/v1` base URL.

### Ireland (IE1) region base URLs

To use the Programmable Messaging API in Twilio's Ireland (IE1) region for EU data residency, add `dublin.ie1` before `.twilio.com` in the base URL. For example, the [Messages resource](/docs/messaging/api/message-resource) in IE1 uses this base URL: `https://api.dublin.ie1.twilio.com/2010-04-01`.

To send SMS from the IE1 region, see [Use the Programmable Messaging API with Twilio regions](/docs/global-infrastructure/messaging-api-with-twilio-regions).

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

Here's an example of authenticating with the API:

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
     -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

When you [use the Programmable Messaging API in the Ireland (IE1) region for EU data residency](/docs/global-infrastructure/messaging-api-with-twilio-regions), use the region-specific Auth Token or create region-specific API keys. For instructions, see [Manage regional API credentials](/docs/global-infrastructure/manage-regional-api-credentials).

## Use the Programmable Messaging API

> \[!NOTE]
>
> Twilio monitors messages to prevent content violating the [Acceptable Use Policy](https://www.twilio.com/en-us/legal/aup) (AUP)*.* This helps to ensure that Twilio Messaging is seen as a trustworthy, high engagement channel and will not slow down the delivery of messages.
>
> If a message you send has violated the AUP, it will be returned and you will receive an error code which identifies the necessary changes you need to make before sending it again.

### Send messages

To send an outbound message, send a `POST` request to the [Messages resource](/docs/messaging/api/message-resource).

* To [send media messages](/docs/messaging/tutorials/how-to-send-sms-messages), use the `MediaUrl` parameter in the request.
* To [schedule an outbound Message](/docs/messaging/features/message-scheduling) to be sent in the future, use the `ScheduleType` and `SendAt` parameters in the request.
* To [send messages with shortened links](/docs/messaging/features/link-shortening), use the `ShortenUrls` parameter in the request.
  * **Note**: This feature is available only if you use a [Messaging Service](/docs/messaging/services).

To learn more about how to receive and reply to messages, see [Receive and Reply to Messages Guide](/docs/messaging/tutorials/how-to-receive-and-reply).

### Fetch, list, update, and delete messages

Use the [Messages resources](/docs/messaging/api/message-resource) to fetch, list, and delete Messages associated with your account.

Redact messages by updating a Message resource.

### Fetch, list, and delete media

Twilio creates a [Media subresource](/docs/messaging/api/media-resource) when an incoming or outgoing Message resource contains media.

You can fetch, list, and delete Media subresources.

### Manage your short codes

Fetch, list, and update your Account's short codes with the [ShortCodes subresource](/docs/messaging/api/short-code-resource).

### Track message feedback

Track user-reported outcomes of Messages with the [Feedback subresource](/docs/messaging/api/message-feedback-resource).

### Manage your Messaging Services

Create, fetch, read, update, and delete Messaging Services with the [Services resource](/docs/messaging/api/service-resource).

Manage your Messaging Services' senders with the following subresources:

* [ShortCodes subresource](/docs/messaging/api/services-shortcode-resource)
* [AlphaSenders subresource](/docs/messaging/api/alphasender-resource)
* [DestinationAlphaSenders subresource](/docs/messaging/api/destination-alphasender-resource)
* [PhoneNumbers subresource](/docs/messaging/api/phonenumber-resource)
* [ChannelSenders subresource](/docs/messaging/api/messaging-service-channelsender-resource)

### Check SMS pricing by country

Check inbound and outbound SMS message pricing with the [Messaging Countries subresources](/docs/messaging/api/pricing) of the Pricing API.

### Retrieve a list of deactivated US phone numbers

Fetch a list of all US phone numbers that were deactivated on a given day with the [Deactivations resource](/docs/messaging/api/deactivations-resource).

### Verify that your toll-free number complies with regulations

Demonstrate that your toll-free number complies with US and Canadian SMS regulations. Submit, update, or delete toll-free verification (TFV) requests with the [Verifications resource][].

[Verifications resource]: /docs/messaging/api/tollfree-verification-resource

## Additional resources

* [SMS developer quickstart](/docs/messaging/quickstart)
* For inspiration, read the [Twilio Blog](https://www.twilio.com/blog/search-results?search=sms) on building messaging applications with various languages and tools.
* Get started with [toll-free verification][tfv-start].
* For help troubleshooting your Programmable Messaging application, check out the docs on [Debugging Common Issues](/docs/messaging/guides/debugging-common-issues) and [Debugging Tools](/docs/messaging/guides/debugging-tools).
* [Learn more about Twilio's Global Infrastructure](/docs/global-infrastructure), which allows you to control where your application's Twilio-related data is routed, processed, and stored.

[tfv-start]: /docs/messaging/compliance/toll-free/api-onboarding
