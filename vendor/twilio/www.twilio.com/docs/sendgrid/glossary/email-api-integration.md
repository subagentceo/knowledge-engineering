# Email API integration

*API*. The facilitation of automating key functions through the synchronization of a sender's email service provider with their platform and software tools.

To connect your email service provider to your own platform and your marketing, sales, or CRM tools, use Email API integration. Using a single interface, you can sync data and create hybrid, customized systems that empower your workforce and leverage your technology.

These APIs provide automation capabilities for your email campaigns and messages.

* [Event Webhook][] Sends an HTTP `POST` request to your chosen URL. It contains events that occur as Twilio SendGrid processes email. Common use cases for this Webhook include removing unsubscribes, determining unengaged recipients, identifying bounced addresses, or reacting to spam reports.
* [Parse Webhook][] Parses the attachments and contents of incoming emails then sends the parsed email to a URL using an HTTP `POST` request. Senders can then receive mail from any of the addresses on their recipient list.
* [SMTP API][] Allows users to specify custom-handling instructions for their email. Users add these instructions through a header inserted into the body of the message.
* [Web API][] Allows users to retrieve data about their account, including spam reports, bounces, and unsubscribes.

[Event Webhook]: /docs/sendgrid/for-developers/tracking-events/event

[Parse Webhook]: /docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook

[SMTP API]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header

[Web API]: /docs/sendgrid/api-reference
