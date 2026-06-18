# Twilio Email message ID

*Marketing*. A unique identifier that Twilio Email generates and assigns to an email message for event identification purposes.

Twilio Email assigns this ID to individual email messages. You can search for this Message ID information in the [**Email Log**][log]. The Activity Feed labels the Message ID as `Message ID` and the Event Webhook labels it with `sg_message_id`.

Example Email Message ID: **XBg2anf2TqCy6WXKQFhieQ.filter0905p1mdw1-4434-59E0C6FF-3.0**

> \[!NOTE]
>
> The Twilio Email Message ID differs from the [SMTP headers][header]: [`X-Message-ID`][x-message-id] and [`Message-ID`][message-id].

[message-id]: https://en.wikipedia.org/wiki/Message-ID

[x-message-id]: /docs/glossary/x-message-id

[header]: /docs/glossary/header

[log]: /docs/email/logs
