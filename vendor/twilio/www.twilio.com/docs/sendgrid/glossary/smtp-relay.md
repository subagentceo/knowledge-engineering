# SMTP relay

*Internet standard*. A system that sends email between [SMTP servers][smtp-server] on different domains.

Email transmits data using [Simple Mail Transfer Protocol (SMTP)][smtp]. If the recipient exists on a different domain, the relay moves the message from your email server to the email server of the recipient.

When parties on the same domain send an email message, SMTP doesn't use a relay. Only one server is involved. Each domain needs its own relay.

To reduce spam, many internet providers limit the amount of email messages go through their SMTP relays each day. This process is called [throttling][].

[smtp]: /docs/sendgrid/glossary/smtp

[smtp-server]: /docs/sendgrid/glossary/smtp-server

[throttling]: /docs/sendgrid/glossary/throttling
