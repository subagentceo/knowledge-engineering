# Test WhatsApp messaging with the Sandbox

> \[!WARNING]
>
> Use the Twilio Sandbox for WhatsApp for testing and discovery purposes only. Don't use it in a production environment.

The Twilio Sandbox for WhatsApp is a pre-configured environment in the Twilio Console for testing the following functionality:

* [Sending business-initiated messages](#business-initiated-messages-and-templates)
* [Replying to user-initiated messages](#user-initiated-messages-and-replies)
* Configuring a [webhook URL](#webhook-url) and a [status callback URL](#status-callback-url)

You don't need a WhatsApp Business Account or a registered WhatsApp sender to use the Sandbox.

Twilio provides the Sandbox with a shared phone number (`+14155238886`). While all Sandbox users use the same number, only users who have joined your specific Sandbox can receive messages from you.

Watch the following video to learn how to use the Sandbox to send and receive WhatsApp messages.

https://www.youtube.com/watch?v=UVez2UyjpFk

## Sandbox limitations

* You can only message end users who have joined your Sandbox. Messaging other users will fail with [Error 63015](/docs/api/errors/63015).
* The Sandbox supports functional testing, but not load testing of profile traffic.
* The Sandbox number is a Twilio number and displays the Twilio logo.
* The Sandbox number can only send one message every three seconds.
* For [business-initiated messages](#business-initiated-messages-and-templates) from the Sandbox, you can use only pre-approved templates.
* The Sandbox session expires three days after joining. After this, end users need to rejoin the Sandbox.
* The Sandbox number might be temporarily restricted from sending to certain countries, such as Brazil or Indonesia. This restriction can cause message failures. If you encounter this issue, contact Twilio Support. To ensure more reliable delivery to recipients in other countries, register your own sender with its primary business location and the correct sender country code in each destination country. For setup instructions, see the WhatApp guides: [WhatsApp Self Sign-up](/docs/whatsapp/self-sign-up) (direct customers) and [WhatsApp Tech Provider Program](/docs/whatsapp/isv/tech-provider-program) (Independent Software Vendors (ISVs)).

There is no limit to the number of messages you can send or how long you can use the Twilio Sandbox for WhatsApp. However, [Twilio free trial accounts](/docs/usage/trials) include 100 WhatsApp messages as part of their trial free units. Sandbox messages are billed at standard [Twilio API for WhatsApp pricing](https://www.twilio.com/en-us/whatsapp/pricing).

## How to activate and join the Sandbox

To send or receive WhatsApp messages using the Sandbox, you must activate the Sandbox and have at least one end user join the Sandbox.

1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
2. Activate and connect to the Twilio Sandbox for WhatsApp:
   1. Go to the [Try WhatsApp page in the Console](https://www.twilio.com/console/sms/whatsapp/sandbox), acknowledge the terms, and click **Confirm**.
   2. Have each end user who wants to join send `join <your sandbox code>` to the Sandbox number, or scan the QR code with their mobile device and send the pre-populated message. The Sandbox will reply to confirm they have joined.

Once joined, end users receive messages only from the joined Sandbox. To disconnect from the Sandbox, they can reply to the message with `stop` or switch to a different Sandbox by messaging `join <other sandbox keyword>`.

Multiple end users can join the same Sandbox, but each must send the `join <your sandbox code>` message to the Sandbox number to join.

## Business-initiated messages and templates

When a user sends your business a message, it opens a 24-hour customer service window. During this window, you can send free-form text and media without a message template. Outside the window, you can only message users with an approved template. Learn more about [customer service windows](/docs/whatsapp/key-concepts#customer-service-windows) and [message templates](/docs/whatsapp/key-concepts#message-templates).

> \[!NOTE]
>
> Sending `join <your sandbox code>` to the Sandbox number starts a customer service window.

The Twilio Sandbox for WhatsApp comes with the following pre-approved templates for testing purposes:

* **Appointment Reminders**: "Your appointment is coming up on \{\{1}} at \{\{2}}"
* **Order Notifications**: "Your \{\{1}} order of \{\{2}} has shipped and should be delivered on \{\{3}}. Details: \{\{4}}"
* **Verification Codes**: "Your \{\{1}} code is \{\{2}}"

**Note**: The double-bracketed numbers are placeholders for your custom values. In your code, provide these values as key-value pairs. For example, if you use the Appointment Reminders template, `{"1":"2025/7/15","2":"3:00p.m."}` will show "Your appointment is coming up on 2025/7/15 at 3:00p.m.".

You can't use custom message templates with the Sandbox. To set up and use custom message templates, you need to register a WhatsApp sender through [WhatsApp Self Sign-up](/docs/whatsapp/self-sign-up) (direct customers) or [WhatsApp Tech Provider Program](/docs/whatsapp/isv/tech-provider-program) (Independent Software Vendors (ISVs)).

## User-initiated messages and replies

You can use the Sandbox to explore replying to incoming WhatsApp messages.

When an end user sends you a WhatsApp message, you can reply to that message within the 24-hour customer service window. During the 24-hour window, you can reply with free-form messages.

### Webhook URL

When an end user sends a WhatsApp message, Twilio sends a [webhook](/docs/glossary/what-is-a-webhook) to your webhook URL. Typically, the webhook URL points to your application. When Twilio receives a message, it makes a request to your URL. You can reply using [TwiML](/docs/glossary/what-is-twilio-markup-language-twiml), Twilio's markup language for message instructions. Learn more about [how to reply with TwiML in the language of your choice](/docs/whatsapp/quickstart).

In the Sandbox, you can set the webhook URL in the **When a Message Comes in** field under **Sandbox settings > Sandbox configuration**.

## WhatsApp message delivery status

You can receive real-time status updates for WhatsApp messages that you send and receive with the Sandbox.

### Status callback URL

When you set a status callback URL, you can receive requests from Twilio with information about the delivery status of your WhatsApp message. Twilio sends a request to your status callback URL each time your message status changes to one of the following: `queued`, `failed`, `sent`, `delivered`, or `read`. Learn more about [tracking the message status of outbound messages](/docs/messaging/guides/track-outbound-message-status).

In the Sandbox, you can set the status callback URL in the **Status callback URL** field under **Sandbox settings > Sandbox configuration**.

## Next steps

* Get started with the [WhatsApp for Twilio quickstart](/docs/whatsapp/quickstart).
* Learn about [using WhatsApp Business Accounts with Twilio](/docs/whatsapp/tutorial/whatsapp-business-account).
* Register your WhatsApp sender with [WhatsApp Self Sign-up](/docs/whatsapp/self-sign-up) (direct customers) or [WhatsApp Tech Provider Program](/docs/whatsapp/isv/tech-provider-program) (ISVs).
* Learn about [WhatsApp messaging best practices](/docs/whatsapp/best-practices-and-faqs).
