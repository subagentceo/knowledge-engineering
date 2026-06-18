# Web API

*API*. A programming interface that allows web servers and web browsers to connect and enable account and data collection for services like email.

An Application Programming Interface (API) establishes and maintains communication between two software applications. The [Twilio Web API][web-api] establishes and maintains communication between two software applications over the internet using a set of defined parameters and rules.

The Twilio Web API lets users retrieve data about their email campaign like spam reports or blocked email addresses.

To collect account and email data including response rates, spam reports, and statistics, integrate with the Twilio Web API. This serves an alternative to Twilio SendGrid [SMTP configuration][].

Use the Twilio Web API in situations where:

* You can only use HTTP
* You don't control your application environment
* You have high latency between Twilio SendGrid and your app
* You built a library to send email
* You want data from your email campaign without logging into the Twilio SendGrid console
* You want to pull contact lists, statistics, and even email reports
* You can send email without using [traditional SMTP][]

Twilio also provides an [SMTP API][] that differs from web API. That API allows you to use message templates, provide custom delivery and handling options, and include advanced tracking and analytics.

[SMTP configuration]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

[SMTP API]: /docs/sendgrid/glossary/smtp-api

[traditional SMTP]: /docs/sendgrid/glossary/smtp

[web-api]: /docs/sendgrid/api-reference
