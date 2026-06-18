# The WhatsApp Business Platform with Twilio: Best Practices and FAQs

With Twilio Programmable Messaging, you can integrate WhatsApp messaging into your web application. Although these integrations are generally straightforward, developers may benefit from guidance on how to best utilize the Programmable Messaging API specifically for WhatsApp. This document provides answers to frequently asked questions and presents best practices for integrating the WhatsApp Business Platform with Twilio.

## General

### What are the requirements for a business to be approved for WhatsApp?

To use WhatsApp through Twilio, your business must comply with the following Meta policies:

* [WhatsApp Business Solution Terms](https://www.whatsapp.com/legal/business-solution-terms)
* [WhatsApp Business Messaging Policy](https://www.whatsapp.com/legal/business-policy)
* [WhatsApp Commerce Policy](https://www.whatsapp.com/legal/commerce-policy)

During the approval process, Meta reviews both your business and your intended use case to confirm that they align with these policies.

### How do I improve marketing delivery rates?

You can improve marketing delivery rates by turning on Marketing Messages API for your WhatsApp Business Account:

1. In the WhatsApp Manager, open **Overview** > **Alerts**.
2. Review and accept the Marketing Messages API Terms of Service.
3. After acceptance, Marketing Messages API is enabled automatically—no code changes are required in Twilio.

### What is the cost of the WhatsApp service?

Every WhatsApp message sent through Twilio incurs:

* A Twilio per-message fee (except for traffic that originates in Flex, which has its own pricing model).
* A Meta fee, based on the template category (utility, marketing, or authentication) and the end user's country code.

For current rates and cost estimates, see:

* [Twilio WhatsApp pricing](https://www.twilio.com/whatsapp/pricing)
* [Meta pricing details](https://developers.facebook.com/docs/whatsapp/pricing/)

### How can I manage separate access lists to the Sandbox and to live numbers?

If you need distinct allowlists for different traffic types, create separate Twilio accounts and route the relevant traffic through each account. This approach lets you maintain independent access lists and usage controls.

### What is the messages per second (MPS) limit for outbound WhatsApp messages?

By default, each WhatsApp sender supports up to **80 messages per second (MPS)** for outbound traffic (text or media). Text-only throughput can be increased to **400 MPS** on request, subject to approval. Media throughput can't be increased beyond 80 MPS.

Messages that exceed the configured throughput are queued. A message can remain in the queue for up to four hours; messages still in the queue after four hours fail. New messages that would extend the queue beyond four hours are rejected.

If you expect to send high-volume traffic for longer than a few minutes, open a [Twilio support ticket](https://support.twilio.com/) before launching the campaign.

#### Factors that can reduce throughput

* Large media files
* A high number of unique media files per recipient
* URLs that point to slow-loading websites
* Concurrent inbound traffic on the same sender
* High network latency between your servers and recipients

If your use case requires higher sustained throughput, use a [Messaging Service](/docs/messaging/services) to distribute traffic across multiple WhatsApp senders.

### Why do I see discrepancies between Meta's usage insights and my Twilio insights?

Time zone differences can cause small discrepancies between reporting platforms. Twilio records metrics in Coordinated Universal Time (UTC), while Meta's insights use Pacific Time (PT) by default.

Because of this 8-hour offset, variances can appear in monthly message counts, especially around month-end transitions (for example, from November 30 to December 1). Depending on the exact timestamp, a single message can be counted in one month in the Meta dashboard and in another month in the Twilio Console. If you operate in a time zone that is far from PT or UTC, the difference between your local activity, Meta's PT reporting, and Twilio's UTC reporting can seem larger.

For the authoritative record of billable usage, see your Twilio invoice, Twilio Console Insights, or the Usage API.

## Sandbox

* **Why am I getting a message "your number is not associated with the sandbox channel"?**

  Ensure that you have carefully followed the instructions in the [Using Phone Numbers with WhatsApp](/docs/whatsapp/api#using-twilio-phone-numbers-with-whatsapp) section of the Programmable Messaging API Reference and Overview. You need to join the sandbox and enable one of your Twilio numbers with WhatsApp.
* **Why am I getting a message "Twilio could not find a Channel with the specified From address" when trying to send a message?**

  There are two common reasons why you are seeing this error:

  * The `From` address in your Programmable Messaging API request is incorrect. To send messages using WhatsApp, the `From` address should be `whatsapp:<sandbox phone number>`. This can be found on the [sandbox page](https://www.twilio.com/console/messaging/whatsapp/sandbox).
  * You are trying to send a message from an account that does not have the sandbox enabled. [Activate the sandbox](https://www.twilio.com/console/sms/whatsapp) before sending a message.
* **I joined the Twilio sandbox for WhatsApp and got a "Twilio Sandbox. You are all set! The sandbox can send/receive messages..." reply. Can I change the message?**

  This reply is part of the sandbox implementation and cannot be changed. Once you get your own number, you are free to set your own message. Note that WhatsApp requires brands to receive customer opt-in before sending messages on WhatsApp.
* **My outbound message from the sandbox was not delivered. Why?**

  There are two reasons why a message sent from the Twilio Sandbox for WhatsApp would fail to be delivered:

  * You're trying to send a message to a user who has not joined your sandbox. For more information, see [Test WhatsApp messaging with the Sandbox](/docs/whatsapp/sandbox).
  * You're sending a free-form message to the user outside the [customer service window](/docs/whatsapp/key-concepts#customer-service-windows). A customer service window lasts for 24 hours after the last inbound message you receive from a user. Outside a customer service window, you may only send a pre-approved template message to the user. Any message that does not match a pre-approved template will be sent by Twilio as a free-form message. See the [list of templates pre-approved for the sandbox](/docs/whatsapp/sandbox#business-initiated-messages-and-templates).

## API-specific questions

* **Can I check if a user's phone number is enabled for WhatsApp?**

  Every time you send a WhatsApp message, Twilio automatically checks if the number is enabled for WhatsApp and will fail the message with [error code 63003](/docs/api/errors/63003) if the destination is found to be invalid. WhatsApp has strict guidelines regarding availability checks. When a number is found to be a valid WhatsApp number, you are required to send a message to prevent your account from being marked for lower-quality traffic. WhatsApp does not permit exposing the capability check or using it independently of sending a message.
* **What formatting options do I have in WhatsApp?**

  Refer to the [guide to rich messaging features](/docs/whatsapp/message-features), including formatting options in the WhatsApp Business Platform with Twilio.
* **Can I send messages to WhatsApp groups or manage groups?**

  Meta launched the [WhatsApp Groups API](https://developers.facebook.com/docs/whatsapp/groups/) in October 2025, which enables programmatic creation and management of groups on WhatsApp. Twilio also offers a group messaging solution using the Conversations API. You can find sample code in Code Exchange: [WhatsApp Group Messaging](https://www.twilio.com/code-exchange/whatsapp-group-messaging). For more information, refer to [Twilio Conversations](/docs/conversations-classic).
* **Does the WhatsApp Business Platform with Twilio support read receipts?**

  Twilio supports read receipts on business-initiated messages. Currently, Twilio does not support read receipts for inbound (user-initiated) WhatsApp messages. This means it is not possible for the business to set the status of a message it received to "read" (i.e., changing the checkmark color on the end-user's application).

## Live Senders (WhatsApp-enabled phone numbers)

* **What use cases are supported by WhatsApp?**

  WhatsApp supports user-initiated and business-initiated messaging. With user-initiated messaging, the first message is received by the business from the user. This opens a conversation in which the business can reply with free-form messages. The conversation remains open for 24 hours following the last message received from the user.

  Business-initiated messaging is when the business sends the first message to the user or replies to the user more than 24 hours after the last message received from the user. This typically applies to notification use cases. Business-initiated messaging requires the use of pre-approved templates.
* **What account type options do I have for my business in WhatsApp? How do they appear in the app?**

  Information about available WhatsApp account types can be found in the [WhatsApp API documentation](/docs/whatsapp/api). You can apply for an Official Business Account once your number is live and the Meta Business Manager account that is linked to your WhatsApp number is set to `Verified` status.
* **What kind of phone numbers can be enabled for WhatsApp?**

  WhatsApp requires a phone number to be E.164-compliant and able to receive a one-time PIN (OTP) code via SMS or phone call to enable the service. This includes 10-digit long codes, local numbers, national numbers, and toll-free numbers in most regions. Most numbers sold on Twilio are supported. Short codes are not supported. More information can be found in the [Which Twilio Phone Numbers are Compatible with WhatsApp](https://help.twilio.com/hc/en-us/articles/360026678054-Which-Twilio-Phone-Numbers-are-Compatible-with-WhatsApp-) article.

## Media support

* **How can I send and receive media on WhatsApp? What type of media is supported?**

  You can find information about how to send and receive media messages and supported media on WhatsApp in the [Sending and Receiving Media with WhatsApp Messaging](https://help.twilio.com/hc/en-us/articles/360017961894-Sending-and-Receiving-Media-with-WhatsApp-Messaging-on-Twilio-Beta-) article. We also have a more detailed, [step-by-step tutorial for sending and receiving media on WhatsApp](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp).

## Troubleshooting WhatsApp error codes

### Error 63020: Invitation not accepted

[Error 63020](/docs/api/errors/63020) occurs when you have not yet accepted Twilio's invitation to send messages on behalf of your business.

To resolve the error, open Meta Business Manager and accept the invitation. After you accept, you can send and receive WhatsApp messages.

### Error 63018: Sender rate limit reached

[Error 63018](/docs/api/errors/63018) indicates that the WhatsApp sender has reached its rate limit.

For details on Meta's rate-limit tiers and recommendations for rollout planning, see [WhatsApp rate limiting](https://help.twilio.com/hc/en-us/articles/360024008153-WhatsApp-Rate-Limiting).

### Errors 20249 and 133016: WhatsApp registration rate limit reached

Meta applies rate limits to the WhatsApp registration endpoint. You can submit up to **10** registration requests per business number within any rolling 72-hour window.

When you submit a registration request, the API counts how many requests you have made for that business number during the previous 72 hours:

* If the count is **fewer than 10**, the request proceeds normally.
* If the count is **10**, the API returns Meta error code `133016` (surfaced in Twilio as Error 20249). The number can't be registered again until 72 hours have elapsed since the first request in the window.

These limits apply to registration through the Senders API as well as self-sign-up.

### Error 63051: WhatsApp sender is locked

[Error 63051](/docs/api/errors/63051) appears when Meta locks a WhatsApp sender (phone number) because it observes no recent activity for that number. The locked sender can't send WhatsApp messages, but other senders in the same WhatsApp Business Account continue to operate normally.

Meta typically locks a sender when it detects little or no traffic—usually no messages sent in the previous 30 days. Meta has not published the exact thresholds.

#### Resolution

Re-register the locked sender by using self-sign-up or the Senders API. After registration succeeds, the sender can resume sending messages.

#### Prevention

* Send at least a minimal amount of outbound traffic from every WhatsApp sender within each rolling 30-day period.
* If you add a new sender but don't plan to use it immediately, schedule a small recurring message to keep the sender active.

Because Meta hasn't published its exact criteria, regular traffic doesn't guarantee that a sender won't be locked. However, maintaining consistent outbound activity significantly reduces the likelihood of Error 63051.

If these steps don't resolve the issue, contact [Twilio Support](https://support.twilio.com/).
