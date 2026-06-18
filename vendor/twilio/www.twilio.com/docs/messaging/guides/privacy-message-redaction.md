# Message Redaction for Programmable Messaging

> \[!NOTE]
>
> Message Redaction is available to all Twilio Editions customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

With Twilio's Message Redaction feature, you protect customers' messaging privacy by redacting message bodies and phone numbers, which prevents access to this information from Twilio's Console, APIs, and internal customer support systems. Beyond this, Twilio accesses the data as minimally as necessary to deliver messages as requested and for compliance purposes.

Message Redaction is useful when building for highly regulated industries such as financial services, fintech, healthcare and life sciences, public sector health care, and education, or to meet other unique regulatory and compliance requirements for your business.

This guide walks through the configurations available for content and phone number redaction and [shows you how to enable this feature on your Twilio account](#set-up-your-twilio-account-for-message-privacy), including how to change these settings at an individual message level.

## Message body redaction vs. phone number redaction

Message Redaction redacts phone numbers and message bodies independently. Message body redaction prevents the entire message body from being available in the Twilio Console, APIs, and internal support systems. Phone number redaction replaces the last four digits of non-Twilio-owned phone numbers with `XXXX`. These independent settings allow you to choose whether you want to redact only message bodies, only phone numbers, or both.

## How redaction works

SMS/MMS/RCS and WhatsApp redaction vary slightly in implementation. For more information about WhatsApp message redaction, continue to [the next section](#how-redaction-works-whatsapp).

### Outbound SMS/MMS/RCS

Once Twilio sends an outbound SMS/MMS message with Message Redaction enabled, RCS senders, phone numbers and/or message bodies are no longer available within Twilio Console, APIs, or Twilio's internal support tooling. The unredacted information is accessible to Twilio's production environments for up to 24 hours, and unredacted messages are stored with limited access for compliance purposes.

### Inbound SMS/MMS/RCS

For inbound messages, Twilio stores the entire message while it attempts to forward the message to the destination. It is important to [set both primary and fallback webhooks](#use-post-requests-in-your-sms-webhooks) on your account when using this feature, as you will be unable to retrieve the message body or phone number once redaction is applied after attempted delivery.

Twilio maintains production access to messaging data for up to 24 hours, after which point the information is retained in separate, limited-access storage for compliance purposes.

### Media messages

When you have Message Redaction enabled, Twilio handles media differently based on operational needs.

Outbound Messages with media (outside the US and Canada) use Twilio's [MMS Converter feature](/docs/messaging/services), which converts the original MMS to an SMS with a link to the media file. Twilio retains the media for up to 7 days to give the recipient time to click on the media link, while the message containing the link is only accessible by Twilio's production environment for up to 24 hours.

For inbound messages with media, Twilio deletes media files after 24 hours. This gives the customer's applications time to access the associated files.

## How redaction works: WhatsApp

WhatsApp messages flow through Twilio as [described in Key Concepts and Terms for the WhatsApp Business Platform with Twilio](/docs/whatsapp/key-concepts). There are some differences in how redaction privacy features work with messaging through WhatsApp.

Twilio has very limited controls over how WhatsApp manages data and phone number redaction is not available. Also, Twilio keeps track of [WhatsApp's 24-hour sessions](/docs/whatsapp/key-concepts#the-24-hour-window-or-24-hour-session), including recipients, for billing purposes.

### Outbound WhatsApp messages

WhatsApp deletes message content, including body and media, as soon as there is an acknowledgment that the message was delivered.

If a message is undelivered, WhatsApp may keep the message while it retries delivery for up to seven days. Messages may go undelivered if the end user's device is off or if the user has blocked the business. In addition, WhatsApp stores non-Twilio-owned phone numbers indefinitely, even if you have enabled phone number redaction and Twilio has obfuscated the last four digits of non-Twilio-owned numbers in its systems.

### Inbound WhatsApp messages

WhatsApp deletes message content, including body and media, once the message is received. Deletion in WhatsApp's storage occurs at random intervals but generally takes a few hours. WhatsApp stores non-Twilio-owned phone numbers indefinitely, even if you enable Phone Number Redaction and Twilio has obfuscated the last four digits of non-Twilio-owned numbers in its systems.

In addition, Twilio maintains a list of recipients contacted in last 24 hours for billing purposes.

## Set up your Twilio Account for Message Privacy

There are a few things to configure in your account to support redaction.

Before you can redact message body and phone numbers, you should ensure that your account is properly configured to support these privacy features. Taking the following steps will help you get started right away once Twilio has approved your request to enable Message Privacy features on your account.

### Disable *Sticky Sender* and *Fallback to Long Code* on your Message Service

To redact message bodies and phone numbers, you must disable two features on your Messaging Service:

* Sticky Sender
* Fallback to Long Code

Sticky Sender on Messaging Services is incompatible with phone number redaction to maintain the mapping of recipients and numbers.

Fallback to Long Code is incompatible with message redaction due to the immediate deletion of the body and phone number after the message has been handed off to the provider.

Scheduled SMS messaging is incompatible with message body or phone number redaction at this time.

To disable these features, visit the Console's **SMS Services** section ([Console](https://1console.twilio.com/us1/develop/sms/services) | [Legacy Console](https://www.twilio.com/console/sms/services)). There, you can select your Message Service(s) and disable Sticky Sender and Fallback to Long Code.

### Disable built-in STOP filtering

When Twilio receives a `stop` message, the built-in STOP filtering saves the incoming phone number to Twilio's internal list of blocked numbers for that account. Therefore, using Twilio's built-in STOP filtering could potentially violate the phone number redaction guarantee for customers who choose to opt-out of messages.

If you disable this feature, you will need to build STOP filtering yourself as this is generally required by telecommunications carriers as well as anti-spam laws.

To disable automatic STOP filtering, [contact Support](https://www.twilio.com/console/support/tickets/create).

### Use POST requests in your SMS webhooks

Twilio logs `GET` request parameters for up to seven days. When setting the **A Message Comes In** webhook on a Phone Number or Messaging Service, make sure that the method is set to `POST`, not `GET`. You must use `POST` on both the primary and fallback webhooks to ensure redaction.

To configure webhook methods:

1. Navigate to your Phone Number or Messaging Service configuration page in the Console.
2. Locate the **A Message Comes In** webhook section.
3. In the HTTP method dropdown next to both the primary and fallback webhook URL fields, select **`POST`**.
4. Click **Save** to apply the changes.

To verify your webhook configuration, visit the following sections in the Console:

## Console

* **[Phone Numbers](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming)**
* **[Messaging Services](https://1console.twilio.com/us1/develop/sms/services)**
* **[TwiML Apps](https://1console.twilio.com/us1/develop/sms/runtime/twiml-apps)**

## Legacy Console

* **[Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming)**
* **[Messaging Services](https://www.twilio.com/console/sms/services)**
* **[TwiML Apps](https://www.twilio.com/console/sms/runtime/twiml-apps)**

### Verify your privacy use cases

Twilio [Studio](/docs/studio), [Flex](/docs/flex/developer), and [Conversations](/docs/conversations-classic) are not compatible with redaction because Twilio will log message data for these products. If you are using these products in your application, the message data will be logged automatically.

### Enable Message Redaction for your account

After you receive access to and configure your account for Message Redaction, make sure to enable it for your account. You can do this in the Twilio Console via **Messaging > Settings > General**:

## Console

1. Navigate to **Messaging > Settings > [General](https://1console.twilio.com/us1/develop/sms/settings/general)**.
2. Scroll to the **Message Redaction** section.
3. Toggle **Message Body Redaction** and/or **Phone Number Redaction** to **Enabled**.
4. Click **Save**.

## Legacy Console

1. Navigate to **Messaging > Settings > [General](https://www.twilio.com/console/sms/settings)**.
2. Scroll to the **Message Redaction** section.
3. Toggle **Message Body Redaction** and/or **Phone Number Redaction** to **Enabled**.
4. Click **Save**.

When you enable either Messaging Body Redaction or Phone Number Redaction, Twilio will scan your account and verify that it is configured correctly. You will receive a debugger notification for any features that are misconfigured.

## Retain Message Body and Phone Number on a Single Message

> \[!WARNING]
>
> Customers can override account-level privacy settings for **individual message bodies or phone numbers**.

Thus, if Phone Number and/or Message Body Redaction is *enabled* on your account and you wish to retain this data on specific messages, you may set ContentRetention and AddressRetention parameters to 'retain' on the Create a Message Resource request.

If these features are *disabled* on your account and you wish to redact this data on specific messages, you may set ContentRetention to 'discard' and/or AddressRetention to 'obfuscate' on the Create a Message Resource request.

## What's next?

* Request [Message Redaction](https://pages.twilio.com/message-redaction)
* Configure your account for redaction in the Console ([Console](https://1console.twilio.com/us1/develop/sms/settings/general) | [Legacy Console](https://www.twilio.com/console/sms/settings))
