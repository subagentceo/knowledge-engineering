# Unique Arguments

> \[!CAUTION]
>
> Twilio SendGrid stores this data in a JSON object as non-personally identifiable information (PII). You can't redact or remove these fields. Don't place PII in this field. Twilio SendGrid doesn't treat this data as PII. These values might be visible to Twilio employees, stored long-term, and may continue to be stored after you've left the Twilio SendGrid platform.

To attach arguments to your [SMTP][] email, add the `unique_args` JSON object to your [SMTP API][] `POST` request. For tracking purposes, you can attach an unlimited number of unique arguments to your email *up to 10,000 bytes* in length. To retrieve their values, use the [Event API][] or the [Email Activity][].

Only the Twilio SendGrid [SMTP API][] and [V2 Mail Send API][] use unique arguments. The [V3 Mail Send API][] uses custom arguments.

The `unique_args` object only accepts string values. Using any other data type could result in unintended behavior.

```json {title="Example of adding an argument with a JSON string"}
{
  "unique_args": {
    "customerAccountNumber": "55555",
    "activationAttempt": "1",
    "New Argument 1": "New Value 1",
    "New Argument 2": "New Value 2",
    "New Argument 3": "New Value 3",
    "New Argument 4": "New Value 4"
  }
}
```

The [SendGrid Event Webhook][] displays these arguments. The contents of one of these `POST` requests resembles the following example:

```json {title="Example webhook post data"}
{
  "sg_message_id": "145cea24eb8.1c420.57425.filter-132.3382.5368192A3.0",
  "New Argument 1": "New Value 1",
  "event": "processed",
  "New Argument 4": "New Value 4",
  "email": "example@example.com",
  "smtp-id": "<145cea24eb8.1c420.57425@localhost.localdomain>",
  "timestamp": 1399331116,
  "New Argument 2": "New Value 2",
  "New Argument 3": "New Value 3",
  "customerAccountNumber": "55555",
  "activationAttempt": "1"
}
```

> \[!CAUTION]
>
> If your email has bounces with the `Return-Path`, the `unique_args` don't attach to the event. When developing `unique_args` `POST` handling, account for this issue with `Return-Path`.

To apply different unique arguments to individual emails, you might use [substitution tags][]. An following example shows how substitution tags would be used:

```json {title="Example of using substitution tags"}
{
  "sub": {
    "-account_number-": ["314159", "271828"]
  },
  "unique_args": {
    "customerAccountNumber": "-account_number-"
  }
}
```

## Additional resources

* [SMTP Service Crash Course][]
* [Getting Started with the SMTP API][]
* [Integrating with SMTP][]
* [Building an SMTP Email][]

[Building an SMTP Email]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header

[Email Activity]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed

[Event API]: /docs/sendgrid/for-developers/tracking-events/event

[Getting Started with the SMTP API]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

[Integrating with SMTP]: /docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api

[SendGrid Event Webhook]: /docs/sendgrid/for-developers/tracking-events/event

[SMTP Service Crash Course]: https://www.twilio.com/en-us/blog/insights/smtp-service-crash-course

[substitution tags]: /docs/sendgrid/for-developers/sending-email/substitution-tags

[V2 Mail Send API]: /docs/sendgrid/v2-api/mail

[V3 Mail Send API]: /docs/sendgrid/api-reference/mail-send/mail-send

[SMTP]: /docs/sendgrid/glossary/smtp

[SMTP API]: /docs/sendgrid/glossary/smtp-api
