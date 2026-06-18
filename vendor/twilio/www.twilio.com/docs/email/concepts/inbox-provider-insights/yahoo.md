# Yahoo

Yahoo provides different email plans for personal and business use.

Yahoo only allows users to register `yahoo.com` accounts. They had allowed other domains like `ymail.com`. Yahoo also maintains the email infrastructure for the following domains:

* `aol.com`
* `att.net`
* `comcast.net`
* `verizon.net`

> \[!NOTE]
>
> Yahoo defers mail at higher rates than other inbox providers. They more often defer mail that differs from established patterns. Senders should take care when introducing sending elements to their email program and warm additional IP addresses.

## Authentication support

Yahoo checks a sender's domain DNS `TXT` records for a Sender Policy Framework (SPF) list, DomainKeys Identified Mail (DKIM) signature, and a Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy. It requires SPF and DKIM at any volume of messages and requires DMARC for a daily volume of more than 5,000 messages.

| Authentication method | Necessity                                     |
| --------------------- | --------------------------------------------- |
| SPF                   | Required                                      |
| DKIM                  | Required                                      |
| DMARC                 | Required for more than 5,000 messages per day |

## Blocklisting

For blocklisting decisions, Yahoo uses [Spamhaus][].

## Feedback loop

Yahoo bases its feedback loop (FBL) on the DKIM signature. Twilio allows the FBL to report back. Twilio applies two DKIM signatures to each message sent to Yahoo domains.

[Spamhaus]: /docs/email/concepts/deliverability/blocklist-provider-insights#spamhaus
