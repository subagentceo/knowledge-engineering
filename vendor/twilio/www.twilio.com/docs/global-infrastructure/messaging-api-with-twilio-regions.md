# Use the Programmable Messaging API with Twilio Regions

You can use the Programmable Messaging API in Twilio's [Ireland (IE1) region](/docs/global-infrastructure/understanding-twilio-regions) for EU data residency.

For more information on how SMS personal data is processed when using this feature, see the overview of [EU Data Residency for SMS][eu-data-residency].

This guide explains how to configure your application to use the Programmable Messaging API with the IE1 Region. For a general overview of Twilio Regions, see [Understanding Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions).
For information about the Messaging API, see [Programmable Messaging API Overview](/docs/messaging/api).

## Available API features

With SMS in the IE1 region, you can use the Programmable Messaging API to send and receive SMS messages with [EU Data Residency][eu-data-residency]. This includes:

* Configuring the phone number to be used in IE1 using the new Twilio Console or [Phone Number Regional Configuration API][phone-number-region-api].
* Sending outbound SMS using alphanumeric sender IDs and phone numbers that have been enabled in the IE1 region.
  * Programmable Messaging API [Messages resource][messages-resource] to send and manage SMS messages.
  * [Messaging Services resource][services-resource] to manage messaging services and their senders.
* Inbound SMS processing with webhooks configured through either:
  * The [Incoming Phone Numbers resource][incoming-phone-number-resource].
  * [Messaging Services][services-resource] webhooks.

For an in-depth list of available Messaging features in IE1, see [Messaging IE1 Feature Availability](/docs/global-infrastructure/messaging-eu-feature-availability).

## Twilio Console features

> \[!WARNING]
>
> Messaging features in IE1 are only available in the [new Twilio Console](https://www.twilio.com/en-us/blog/products/launches/new-twilio-console). The legacy Twilio Console does not support Messaging IE1 features.

You can access these messaging features for SMS in IE1 in the new Twilio Console:

* Configuring phone numbers for IE1 in [Numbers and Senders][console-numbers].
  * Setting a phone number's active region to IE1 from the Regional tab.
  * Configuring a phone number's webhook from the Messaging tab.
* Managing [Messaging Services][console-services] in IE1.
* [Messaging Logs][console-logs] in IE1.
* [Messaging Insights][console-insights] in IE1.

For an in-depth list of available Messaging features in IE1, see [Messaging IE1 Feature Availability](/docs/global-infrastructure/messaging-eu-feature-availability).

## Getting started

Any Twilio customer can use the Programmable Messaging API in IE1. To get started, follow these steps:

### 1. Create IE1-specific API credentials

To authenticate requests to the IE1 Region, you must create region-specific API keys. See [Manage regional API credentials][regional-credentials] to get started.

### 2. Configure your senders for IE1

If you plan on sending with phone numbers, you must update the phone number's active region to IE1 for messaging. This ensures that inbound messages and webhooks configured on the phone number are processed in IE1.

To set a phone number active region to IE1, follow these steps in the Console:

1. Navigate to **[Numbers & Senders > Phone Numbers][console-numbers]**, then select your phone number.
2. In the **Regional** tab, check your phone number's active region.
3. Click **Change active region**.
4. Select the region you want to switch to, and click **Update region**.

Use the [Phone Number Regional Configuration API][phone-number-region-api] to set the active region programmatically.

Alphanumeric sender IDs do not require additional configuration to be used in IE1, since they do not support inbound messaging.

### 3. Send messages in IE1 through the API or SDK

Once your credentials and senders are prepared, you can begin sending messages by targeting the IE1-specific base AP URLs or by configuring your SDK to use the IE1 region.
See the [API](#using-the-programmable-messaging-api-in-ie1) or [SDK](#using-the-twilio-sdks-with-ie1) sections for details and examples.

## Using the Programmable Messaging API in IE1

To make API requests to the IE1 Region, use the following base URLs:

| API Resource                                             | API URL for Ireland (IE1) Region                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Messages][messages-resource]                            | `https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Messages/`             |
| [Messaging Services][services-resource]                  | `https://messaging.dublin.ie1.twilio.com/v1/Services`                                      |
| [Incoming Phone Numbers][incoming-phone-number-resource] | `https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/IncomingPhoneNumbers/` |

> \[!NOTE]
>
> Only the `dublin` edge location is supported for messaging API requests in IE1.

### Send an SMS message

To send an SMS message through the IE1 Region, make a `POST` request to the [Messages resource][messages-resource] using the IE1 base URL.

```bash
curl -X POST "https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/*ACCOUNT_SID*/Messages.json" \
--data-urlencode "Body=Hello from IE1!" \
--data-urlencode "From=+35XXXXXXXXXX" \
--data-urlencode "To=+35XXXXXXXXXX" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

### Messaging Services in IE1

> \[!NOTE]
>
> Messaging Services are isolated within their region and cannot be used in or transferred to a different region.

You can create and manage messaging services using the [Services resource][services-resource] in IE1 or [Messaging Services][console-services] in the Console. For a list of Messaging Service features currently supported in IE1, see [Messaging IE1 Feature Availability](/docs/global-infrastructure/messaging-eu-feature-availability#messaging-services).

To create a Messaging Service in the IE1 Region, make a `POST` request to the [Services resource][services-resource] using the IE1 base URL.

```bash
curl -X POST "https://messaging.dublin.ie1.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=My IE1 Messaging Service" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

To add a Messaging Service sender in IE1, make a `POST` request to the appropriate subresource under the Messaging Service using the IE1 base URL.

> \[!NOTE]
>
> Only phone number senders that are [configured for IE1](#2-configure-your-senders-for-ie1) can be added to Messaging Services in IE1.

```bash
curl -X POST "https://messaging.dublin.ie1.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers" \
--data-urlencode "PhoneNumber=+35XXXXXXXXXX" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

To send messages with the Messaging Service in IE1, include the Messaging Service SID as the `From` parameter in your API request:

```bash
curl -X POST "https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json" \
--data-urlencode "Body=Hello from IE1 Messaging Service!" \
--data-urlencode "From={ServiceSid}" \
--data-urlencode "To=+35XXXXXXXXXX" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

### Configure inbound SMS webhooks

Inbound webhooks for messages received in IE1 can be configured at the phone number or messaging service level.

Set a phone number webhook from [Numbers and Senders][console-numbers] or the service webhook from [Messaging Services][console-services] in the Console.

Using the [Incoming Phone Numbers resource][incoming-phone-number-resource]:

```bash
curl -X POST "https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{PhoneNumberSid}.json" \
--data-urlencode "SmsUrl=https://www.example.com/sms" \
--data-urlencode "SmsMethod=POST" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

Using the [Messaging Services resource][services-resource]:

```bash
curl -X POST "https://messaging.dublin.ie1.twilio.com/v1/Services/{ServiceSid}" \
--data-urlencode "InboundRequestUrl=https://www.example.com/sms" \
--data-urlencode "InboundMethod=POST" \
--data-urlendcode "useInboundWebhookOnNumber=false" \
-u {IE1_API_KEY_SID}:{IE1_API_KEY_SECRET}
```

## Using the Twilio SDKs with IE1

When using Twilio SDKs, specify the `edge` and `region` parameters to target the IE1 Region. For example, using the Node.js SDK:

```javascript
const twilio = require('twilio');

const ie1ApiKey = 'IE1_API_KEY';
const ie1ApiSecret = 'IE1_API_SECRET';

const client = twilio(ie1ApiKey, ie1ApiSecret, {
  accountSid: accountSid,
  edge: 'dublin',
  region: 'ie1'
});
```

[phone-number-region-api]: /docs/global-infrastructure/inbound-processing-api#v3-region-configuration-api

[messages-resource]: /docs/messaging/api/message-resource

[services-resource]: /docs/messaging/api/service-resource

[incoming-phone-number-resource]: /docs/messaging/api/phonenumber-resource

[eu-data-residency]: /docs/global-infrastructure/sms-eu-data-residency

[regional-credentials]: /docs/global-infrastructure/manage-regional-api-credentials

[console-numbers]: https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory

[console-services]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging/messaging-services

[console-logs]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging-logs

[console-insights]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging/messaging-insights/overview
