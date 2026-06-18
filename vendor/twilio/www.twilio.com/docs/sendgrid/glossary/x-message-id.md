# X-Message-ID

*Analytics*. A custom [Simple Mail Transfer Protocol (SMTP)][SMTP] email [header][] that Twilio SendGrid includes in email messages it sends as [event webhook][event-webhook] metadata.

The following image depicts a typical response received after a message has been sent:

![API response showing email send status 202 Accepted with message ID.](https://docs-resources.prod.twilio.com/2ef4c669d5093c826ee3da8f24eb9b74fc0d2adee0afcedf7cd301dfd93a97d8.png)

This response includes the `X-Message-ID` header. Use this header to track events that the Event Webhook posts.

To correlate to your Event Webhook data and help troubleshooting, store this `X-Message-ID` header data.

## Related entries

* [Message-ID](/docs/sendgrid/glossary/message-id)

[SMTP]: /docs/sendgrid/glossary/smtp

[header]: /docs/sendgrid/glossary/header

[event-webhook]: /docs/sendgrid/glossary/webhook
