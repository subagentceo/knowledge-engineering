# Microsoft

Microsoft provides free and consumer mail services in addition to business offerings. Microsoft consumer offerings started with the Hotmail brand but have since expanded. Delivering email to Microsoft follow issues with other large providers. Microsoft analyses multiple factors to decide whether a message is spam, including signals such as content, authentication, and domain and IP reputation.

> \[!NOTE]
>
> Senders should note that Microsoft is especially sensitive to senders attempting to message unengaged recipients. If you continue to send mail to recipients who have not engaged with a message in the past six months, you are more likely to encounter reputation issues with Microsoft. Senders should establish sunset policies accordingly.

## Microsoft Outlook

To describe all of the Microsoft consumer email offerings, Twilio refers to them as *Microsoft Outlook*. This includes the following free email domains:

* `hotmail.com`
* `outlook.com`
* `live.com`
* `msn.com`

These domains share similar `MX` records and use the same filtering services. A sender's reputation issues at one domain apply across all of these Microsoft domains.

### Authentication support for Microsoft Outlook

Microsoft Outlook checks a sender's domain DNS `TXT` records for a Sender Policy Framework (SPF) list, DomainKeys Identified Mail (DKIM) signature, and a Domain-based Message Authentication, Reporting, and Conformance (DMARC) policy. It requires SPF and DKIM at any volume of messages and requires DMARC for a daily volume of more than 5,000 messages.

| Authentication method | Necessity                                     |
| --------------------- | --------------------------------------------- |
| SPF                   | Required                                      |
| DKIM                  | Required                                      |
| DMARC                 | Required for more than 5,000 messages per day |

Microsoft rejects senders without a DMARC policy with the following bounce message:

> *550; 5.7.15 Access denied, sending domain doesn't meet the required authentication level*

### Blocklists for Microsoft Outlook

Microsoft maintains its [own proprietary blocklist][bl-outlook] for Outlook domains. It relies on a variety of signals, including some third-party listings.

### Junk Email Reporting Program

Microsoft offers senders their Junk Email Reporting Program (JMRP). This free service provides reports on junk email issues that Outlook.com users flagged. With this service, senders can clean their email lists and improve content quality. To learn more about the JMRP, [enroll in the JMRP program][jmrp-enroll]. Feedback starts within as little as 72 hours.

### Smart Network Data Services

Microsoft offers senders their Smart Network Data Services (SNDS). SNDS provides high-level insight on how subscribers rate the email they receive as well as how Outlook views the health of an IP address. SNDS provides data based on actual email sent to consumer-domain subscribers.

SNDS helps examine your reputation with Microsoft Outlook. The utility provides color-coded reputation scores correlated to dates. To determine if an issue exists and how to proceed with troubleshooting, use SNDS with Twilio-provided stats, such as delivery and open rates.

To learn more about SNDS, you can [sign up for SNDS](https://sendersupport.olc.protection.outlook.com/snds/FAQ.aspx#HowDoISignUp) and review the [SNDS FAQs](https://sendersupport.olc.protection.outlook.com/snds/FAQ.aspx).

## Microsoft 365

Microsoft offers Microsoft 365 as a bundle of services offered to businesses that includes corporate email. To verify that a domain uses the 365 service, check the `MX` records. These domains have an `MX` record that matches `*.mail.protection.outlook.com`.

### Authentication Support for Microsoft 365

Microsoft 365 administrators can establish their own acceptance criteria for email.

| Authentication method | Necessity              |
| --------------------- | ---------------------- |
| SPF                   | Administrator decision |
| DKIM                  | Administrator decision |
| DMARC                 | Administrator decision |

As senders might not know which domains set SPF, DKIM, and DMARC, Twilio recommends setting SPF, DKIM, and DMARC.

Microsoft 365 doesn't send [DMARC Forensic or Failure reports][dmarc-forensics], even if the source domain has a valid `ruf=mailto:` address in its DMARC `TXT` record.

### Blocklists for Microsoft 365

Microsoft maintains its [own proprietary blocklist][bl-m365] for 365 domains. It relies on a variety of signals, including some third-party listings.

[dmarc-forensics]: https://dmarcreport.com/dmarc-forensic-report/

[jmrp-enroll]: https://postmaster.live.com/snds/JMRP.aspx

[bl-outlook]: /docs/sendgrid/concepts/deliverability/blocklist-provider-insights#microsoft-outlook

[bl-m365]: /docs/sendgrid/concepts/deliverability/blocklist-provider-insights#microsoft-outlook
