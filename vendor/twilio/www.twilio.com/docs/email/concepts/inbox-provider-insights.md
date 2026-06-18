# Inbox provider authentication requirements

This section covers the authentication requirements of the largest inbox providers:
[Apple][Apple], [Google][Google], [Microsoft][Microsoft], [Orange][Orange], and [Yahoo][Yahoo].

## Authentication using DNS

* All of these providers check a sender's domain DNS `TXT` records for the following authentication methods:
  * A Sender Policy Framework (SPF) list
  * A DomainKeys Identified Mail (DKIM) signature
  * A Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy
* All require SPF and DKIM at any volume of messages.
* All but Orange require a DMARC policy for a daily volume of more than 5,000 messages.
* Orange requires a DMARC policy for a daily volume of more than 1,000 messages.

## Blocklists

All of these providers use [blocklisting][blocklists].

* Apple uses [Proofpoint][proofpoint]
* Google uses its proprietary blocklist.
* Microsoft uses its [proprietary blocklist][bl-outlook] and [Return Path][Return Path] for Outlook domains.
* Microsoft uses its [proprietary blocklist][bl-m365] for 365 domains.
* Orange uses its proprietary blocklist and those of [Abusix][Abusix], [Spamhaus][Spamhaus], and [Cloudmark][Cloudmark].
* Yahoo uses [Spamhaus][Spamhaus].

## Feedback loops

Some of these providers offer a feedback loop (FBL). An FBL service provides senders with spam data so your lists can remain clean.

* Apple doesn't offer a FBL.
* Google offers an FBL using its Google Postmaster Tools (GPT) service.
* Microsoft doesn't offer a FBL.
* Orange uses the [Signal Spam][fbl-signal-spam] network. Twilio doesn't subscribe to this FBL.
* Yahoo uses an FBL based on the DKIM signature. Twilio allows the FBL to report back to us.

## Inbox provider-specific services

### Google Postmaster Tools

Google offers [Google Postmaster Tools (GPT)](https://gmail.com/postmaster/) so senders can monitor and improve the quality of email campaigns to Gmail recipients.

### Apple Mail Privacy Protection

Apple offers Mail Privacy Protection (MPP) so recipients can hide their IP addresses and protect Mail app activity.

### Microsoft Smart Network Data Services

Microsoft offers senders its [Smart Network Data Services (SNDS)](https://sendersupport.olc.protection.outlook.com/snds/FAQ.aspx#HowDoISignUp) service that reports how subscribers rate the received email and how Outlook views the health of an IP address.

### Microsoft Junk Email Reporting Program

Microsoft offers senders their Junk Email Reporting Program (JMRP). This free service, integrated into SNDS, provides reports on junk email issues that Outlook.com users flagged.

[blocklists]: /docs/email/concepts/deliverability/blocklists

[proofpoint]: /docs/email/concepts/deliverability/blocklist-provider-insights#proofpoint

[Abusix]: /docs/email/concepts/deliverability/blocklist-provider-insights#abusix

[Spamhaus]: /docs/email/concepts/deliverability/blocklist-provider-insights#spamhaus

[Cloudmark]: /docs/email/concepts/deliverability/blocklist-provider-insights#cloudmark

[Return Path]: /docs/email/concepts/deliverability/blocklist-provider-insights#return-path

[bl-outlook]: /docs/email/concepts/deliverability/blocklist-provider-insights#microsoft-outlook

[bl-m365]: /docs/email/concepts/deliverability/blocklist-provider-insights#microsoft-365

[fbl-signal-spam]: https://www.signal-spam.fr

[Apple]: /docs/email/concepts/inbox-provider-insights/apple

[Google]: /docs/email/concepts/inbox-provider-insights/google

[Microsoft]: /docs/email/concepts/inbox-provider-insights/microsoft

[Orange]: /docs/email/concepts/inbox-provider-insights/orange

[Yahoo]: /docs/email/concepts/inbox-provider-insights/yahoo
