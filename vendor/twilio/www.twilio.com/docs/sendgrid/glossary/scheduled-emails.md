# Scheduled Emails

*Marketing*. Configuring a [system to send email messages][auto-email] starting at a given date and time.

**For example**: If a retailer has a promotion starting at 10:00. They should want the email delivered as close to that time as possible.

> \[!NOTE]
>
> If you have the flexibility, schedule email for off-peak times. Most senders schedule email batches for the top of the hour or half hour. Scheduling email to avoid those times (for example, scheduling at 10:53) can result in lower deferral rates because it won't be going through our servers at the same times as everyone else's mail.

## Scheduled email in Twilio SendGrid

Twilio SendGrid allows you to set when email gets sent in its [Marketing Campaigns][] or [transactional APIs][].

[Marketing Campaigns]: https://sendgrid.api-docs.io/v3.0/single-sends/create-single-send

[transactional APIs]: /docs/sendgrid/for-developers/sending-email/scheduling-parameters

[auto-email]: /docs/sendgrid/glossary/automated-email
