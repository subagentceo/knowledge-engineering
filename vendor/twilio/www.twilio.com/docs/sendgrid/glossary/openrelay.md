# Open relay

*Internet Security*. An unsecured [Simple Mail Transfer Protocol (SMTP) relay][smtp-relay] that routes email between domains. Anyone on the internet to send email messages through this relay.

Never configure an [SMTP server][] in this way: spammers can exploit it. ISPs block open relays.

To learn more, see the Twilio [Email Infrastructure Guide][].

[Email Infrastructure Guide]: https://www.twilio.com/en-us/resource-center/the-email-infrastructure-guide-build-it-or-buy-it

[smtp-relay]: /docs/sendgrid/glossary/smtp-relay

[SMTP server]: /docs/sendgrid/glossary/smtp-server
