# Deferrals

An email [deferral][] occurs when a recipient server can't accept email from your IP address or domain. Subsequent attempts of the message might result in acceptance. Deferrals can happen for a number of reasons. To determine which corrective actions you need before your next send, review any deferral reasons.

Deferrals can happen for a variety of reasons, including, but not limited to:

* The receiving server might be too busy to accept your messages.
* The receiving server throttled the sender's IP address for reputation reasons.
* The sender might have exceeded their hourly or daily rate limits.
* There might have been a transient DNS or network issue preventing delivery.

A deferral doesn't necessarily mean that something went wrong. All senders receive deferrals. Email delivery expects this behavior where some messages take more than one attempt to deliver successfully.

## Deferral types

Inbox providers trigger external deferrals. Twilio triggers internal deferrals. These deferrals are also known as preemptive deferrals. To prevent loss of reputation, exceeding limits, or violating policies, sending systems like Twilio make preemptive deferrals on behalf of the sender.

### Deferral messages and remediation

| Deferral message                                | Type     | Reason                                                                         | Remedy                                       |
| ----------------------------------------------- | -------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| IPs reached ISP-suggested hourly limits         | External | You exceeded the [warmup limits][warm-ips] on an added IP address.             | Reduce message delivery rate.                |
| IPs were throttled by recipient server          | External | Recipient server throttled your sending IP address                             | Delivery has been slowed, take no action.    |
| IPs reached ISP-suggested max connection limits | Internal | You sent too much mail too fast                                                | Delivery has been slowed, take no action.    |
| IPs reached max port limit                      | Internal | You reached the maximum number of ports available on Twilio proxies.           | [Add IP addresses to your account.][add-ips] |
| IP reached max connection limit                 | Internal | Your IP address reached the maximum number of connections for the MX provider. | [Add IP addresses to your account.][add-ips] |

## Retry logic

If a sender defers a message, Twilio SendGrid retries sending that message for up to 72 hours. Twilio uses an [exponential backoff algorithm][exp-backoff] during the retry period.

The [Deferred Event webhook response][deferred-response] returns an `event` property with the `deferred` value until delivered. The response includes a `reason` property with the [SMTP response code][smtp-response] and a short explanation. Depending on the response, there might be actions required from the sender.

If the message gets deferred for the entire 72 hour retry period, the `event` changes status to [`blocked`][blocks].

## End-to-end delivery time

Although senders should review deferral reasons, some deferrals might not impact your email campaign with long delays. Depending on the deferral type, the Event Webhook might generate some noise.

Senders should consider end-to-end (EE) times when investigating impact. EE time equals the difference between the `processed` and `delivered` timestamps.

* If you receive a many deferrals but keep low EE times, the delivery impact remains low.
* If the EE time remains high, consider enhancing your email campaign, email infrastructure, or both.

[deferral]: /docs/sendgrid/glossary/deferrals/

[deferred-response]: /docs/sendgrid/for-developers/tracking-events/event#deferred-events

[smtp-response]: https://en.wikipedia.org/wiki/List_of_SMTP_server_return_codes

[exp-backoff]: https://en.wikipedia.org/wiki/Exponential_backoff

[blocks]: /docs/sendgrid/glossary/blocks

[add-ips]: /docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses

[warm-ips]: /docs/sendgrid/concepts/reputation/warm-up-ip-addresses
