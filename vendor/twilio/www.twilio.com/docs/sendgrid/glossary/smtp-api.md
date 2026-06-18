# SMTP API

*API*. A progamming interface that provides customized email handling instructions on a per-email basis.

[Simple Mail Transfer Protocol (SMTP)][SMTP] transfers email over the internet. An Application Programming Interface (API) establishes and maintains communication between two software applications. The [Twilio SMTP API][smtp-api] establishes and maintains communication between two software applications over the internet using a set of defined parameters and rules.

The Twilio SMTP API enables developers to customize email handling instructions using an `X-SMTPAPI` header. Each email that Twilio SendGrid delivers includes this JSON header. It provides specific instructions on handling the email message.

Use the SMTP API to perform the following SMTP email related tasks:

* Manage lists
* Track opens and clicks
* Handle authentication
* Integrate analytics
* Manage subscriptions
* Tag or label your email messages
* Filter the type data you want to receive
* Create dynamic emails
* Customize emails and add unique arguments using templates

## Related resources

* Twilio [Web API](/docs/sendgrid/api-reference/)
* [Event Webhook](/docs/sendgrid/for-developers/tracking-events/event/)
* [Parse Webhook](/docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/)
* [Reverse DNS](/docs/sendgrid/glossary/reverse-dns/)
* [Transactional templates](https://sendgrid.com/dynamic_templates)

[smtp-api]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

[SMTP]: /docs/sendgrid/glossary/smtp
