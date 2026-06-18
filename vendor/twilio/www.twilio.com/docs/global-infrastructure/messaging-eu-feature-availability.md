# Messaging features in Ireland (IE1)

SMS messaging is available in Twilio's [Ireland (IE1) Region](/docs/global-infrastructure/understanding-twilio-regions) for [EU Data Residency][eu-data-residency].
This page covers the available Messaging features in the IE1 region.

To get started with sending SMS in IE1, see the guide: [Use the Programmable Messaging API with Twilio Regions][messaging-in-ie1].

For unsupported features, see [Unsupported Messaging Features in IE1](#unsupported-messaging-features-in-ie1).

## API Features

The following APIs support SMS in IE1:

* [Messages resource][messages-resource] to send and manage SMS messages.
* [Messaging Services resource][services-resource] to manage messaging services.
* [Incoming Phone Numbers resource][incoming-phone-number-resource] for inbound SMS webhook configurations.
* [Phone Number Regional Configuration API][phone-number-region-api] to configure phone numbers for IE1

## Console Features

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

## Messaging channels

SMS messaging is supported in the IE1 region with [EU Data Residency][eu-data-residency].

MMS, WhatsApp, RCS and Facebook Messenger are not supported in the IE1 region.

## Supported senders

You can use the following sender types to send SMS in the IE1 region:

| Sender type             | Supported | Notes                                                                                             |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| Phone Numbers           | Yes       | Exception: Sending from or to +1 phone numbers is not supported in IE1.                           |
| Alphanumeric sender IDs | Yes       | Both pre-registered and dynamic alphanumeric sender IDs are supported in IE1.                     |
| Messaging Service       | Yes       | Add supported senders to a service sender pool and set the service SID as the `from` on messages. |
| Short Codes             | No        |                                                                                                   |

## Inbound SMS Features

You can process inbound SMS messages in the IE1 region using:

* [Incoming Phone Number][incoming-phone-number-resource] webhook configurations
* Messaging Services webhook configurations set through the [Services resource][services-resource]

Other inbound processing features, such as Studio and Functions, are not supported for messages received in IE1.

## Messaging Services

Messaging Services in the IE1 region support the following features:

* Managing [Messaging Services][console-services] in the new Twilio Console.
* Managing Messaging Services through the [Services resource][services-resource].
* Sticky sender selection for SMS messages.
* Country Code Geomatch.
* Webhook configuration for inbound messages and status callbacks.
* [Advanced Opt-Out](/docs/messaging/tutorials/advanced-opt-out).

The following Messaging Services features are not supported in IE1:

* Area Code Geomatch. This is mainly relevant to +1 phone numbers, which are not currently supported in IE1.
* Engagement Suite Features:
  * Link Shortening and Tracking.
  * Message Scheduling.

## Message Redaction

Twilio Edition's [Message Redaction](/docs/messaging/guides/privacy-message-redaction) is supported in IE1. You can redact message bodies and end user phone numbers using:

* **Automatic redaction with message settings:** Navigate to Messaging > Settings > General Settings in the Console and enable Message Body Redaction and Phone Number Redaction.
* **Message API parameters:** Set the `contentRetention` parameter to `discard` and the `addressRetention` parameter to `obfuscate` when sending a message.

> \[!NOTE]
>
> Messaging redaction settings apply to messages in both US1 and IE1 regions.

The unredacted information is stored within the IE1 region in Twilio's production environments for up to 24 hours, and unredacted messages are stored with limited access for compliance purposes.
Message Redactions is a paid feature available as part of [Twilio Editions](https://www.twilio.com/en-us/editions).

## Unsupported messaging features in IE1

The following messaging features are not available in the IE1 region:

* Messaging to or from +1 phone numbers. +1 phone numbers cannot be configured for IE1.
* Advanced throughput: Phone Numbers and Alphanumeric Sender IDs in the IE1 region have a fixed throughput of 10 MPS.
* The following messaging add-on features are not supported in IE1: Engagement Suite (Message Scheduling and Link Tracking), Message Tagging, SMS Pumping Protection, and Compliance Toolkit.
* Integration with these Twilio products is not supported: Verify, Studio, Flex, Conversations, and Functions.

For a list of products available in each region, see [Regional product and feature availability](/docs/global-infrastructure/regional-product-and-feature-availability).

[phone-number-region-api]: /docs/global-infrastructure/inbound-processing-api#v3-region-configuration-api

[services-resource]: /docs/messaging/api/service-resource

[messages-resource]: /docs/messaging/api/message-resource

[incoming-phone-number-resource]: /docs/messaging/api/phonenumber-resource

[eu-data-residency]: /docs/global-infrastructure/sms-eu-data-residency

[messaging-in-ie1]: /docs/global-infrastructure/messaging-api-with-twilio-regions

[console-numbers]: https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory

[console-services]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging/messaging-services

[console-logs]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging-logs

[console-insights]: https://1console.twilio.com/go?to=/account/__account__/ie1/messaging/messaging-insights/overview
