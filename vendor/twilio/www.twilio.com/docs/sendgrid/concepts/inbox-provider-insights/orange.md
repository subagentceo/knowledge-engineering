# Orange email security and reputation

Orange, a French multinational telecommunications corporation, manages the `orange.fr` and `wanadoo.fr` domains.

> \[!NOTE]
>
> Orange is sensitive to spam report rates. Senders with spam report rates at or above 0.6% may experience throttling or reputation blocks when sending to Orange domains.

## Authentication support

Microsoft Outlook checks a sender's domain DNS `TXT` records for a Sender Policy Framework (SPF) list, DomainKeys Identified Mail (DKIM) signature, and a Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy. It requires SPF and DKIM at any volume of messages and requires DMARC for a daily volume of more than 1,000 messages.

| Authentication method | Necessity                                     |
| --------------------- | --------------------------------------------- |
| SPF                   | Required                                      |
| DKIM                  | Required                                      |
| DMARC                 | Required for more than 1,000 messages per day |

Orange rejects senders without a DMARC policy.

## Blocklisting

Orange accepts email based on its own internal blocklist and those of [Abusix][], [Spamhaus][], and [Cloudmark][]. If any of these providers list your IP address, Orange rejects your email.

[Abusix]: /docs/sendgrid/concepts/deliverability/blocklist-provider-insights#abusix

[Spamhaus]: /docs/sendgrid/concepts/deliverability/blocklist-provider-insights#spamhaus

[Cloudmark]: /docs/sendgrid/concepts/deliverability/blocklist-provider-insights#cloudmark

## Feedback loop

Orange uses the Signal Spam network. Twilio doesn't subscribe to this feedback loop (FBL). Senders should follow best practices and to regularly review email lists for unengaged recipients.
