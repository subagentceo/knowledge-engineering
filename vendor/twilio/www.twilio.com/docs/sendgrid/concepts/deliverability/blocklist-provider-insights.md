# Blocklist provider insights

A sender can get added to a blocklist due to message types, location, or inbox providers. To avoid blocklists, senders should monitor for potential blocks. To restore delivery, follow the guidance of the inbox provider.

If a dedicated IP plan user discovers their IP address has been blocked, they must make the initial delisting request. As Twilio assigns these IP addresses to one account only, the assignees hold responsibility for all the mail sent through their account. If needed, Twilio can step in and assist with these delisting requests.

Twilio monitors shared IP pools, including checking reputable blocklists for shared IPs. If a shared IP is added to a blocklist, Twilio analyzes it for measurable deliverability issues. If Twilio detects issues and delisting is possible, it'll attempt remediation.

## Common blocklists

The list below isn't exhaustive, but it highlights the most prominent blocklists in the email industry. Many blocklists exist, but few substantially affect delivery, and listings that don't cause rejections might not be relevant. Monitor your bounces to see which blocklists prevent your mail delivery, then take action on those.

### Spamhaus

The Spamhaus Project is an international organization that tracks email spammers and spam-related activity. It maintains several anti-spam lists in broad use. To reduce the amount of spam that reaches their users, many internet service providers and email servers subscribe to the Spamhaus feed. The Spamhaus Block List (SBL) targets "verified spam sources (including spammers, spam gangs and spam support services)." Its goal is to list IP addresses belonging to known spammers, spam operations, and spam-support services.

Spamhaus is the leading blocklist in the email industry. Listings from them can impact major inbox providers such as Yahoo, AOL, Microsoft, and many others. To stay in good standing with the email industry, we must work with our senders listed on the Spamhaus SBL to implement better sending behaviors or practices. We actively monitor for Spamhaus listings and will proactively reach out to customers with a listing.

```text {title="Example Spamhaus bounce message"}
550 5.7.1 Service unavailable, Client host \[x.x.x.x] blocked using Spamhaus
```

To check if Spamhaus includes your IP address, see [Spamhaus Inquiry Form](https://check.spamhaus.org/)

### Proofpoint

Proofpoint blocks often indicate concerns with list hygiene. If you don't address the block's root cause, the Proofpoint doesn't remove the block. A root cause might cover a data source change, poor address collection practices, or other causes.

Absence of reverse DNS records can lead to rejections on delisting requests. If using a dedicated IP and experiencing Proofpoint blocks, ensure you have reverse DNS configured. Additionally, we also advise customers to set-up link branding as opposed to using the generic SendGrid link branding.

Allow up to 72 hours for a response when submitting a delisting request. If the block remains in place after 72 hours and you have taken steps to remedy the cause of the listing, a follow-up email can be sent to `postmaster@proofpoint.com` summarizing all actions that have been taken and to request re-review of the listing.

```text {title="Example Proofpoint bounce message"}
554 5.7.0 Blocked - see https://support.proofpoint.com/dnsbl-lookup.cgi?ip=x.x.x.x
```

To check if Proofpoint lists your IP address or domain, see [ProofPoint Inquiry Form](https://www.proofpoint.com/us/ipcheck)

#### Cloudmark

Proofpoint acquired Cloudmark in 2017. Cloudmark provides several different anti-abuse tools. The Cloudmark Cloud for Email provides a comprehensive messaging security solution. Cloudmark allows clients to redirect all messages for a particular domain to a different mail exchange (MX) host. Senders might find `*.cloudfilter.net` rather than the `MX` of the email provider for that domain.

The Cloudmark Sender Intelligence (CSI) blocklist identifies possible sources of spam using data from the Cloudmark Global Thread Network.

```text {title="Example Cloudmark bounce message"}
550 5.7.1 Service unavailable; client [x.x.x.x] blocked using csi.cloudmark.com
```

To check if CSI lists your IP address or domain, see [Cloudmark Inquiry Form](https://csi.cloudmark.com/en/reset/)

### SpamCop

SpamCop lets users report unsolicited bulk email. This service also monitors for spam trap hits within their network. If SpamCop detects a trap hit, it lists the sender's IP address. If SpamCop observes no further trap activity, it releases the IP address after 24 hours. Any additional hits result in re-listing the IP address. SpamCop doesn't accept delisting requests from users.

```text {title="Example SpamCop bounce message"}
554 5.7.1 Service unavailable; Client host \[x.x.x.x] blocked using bl.spamcop.net; Blocked
```

To check if SpamCop lists your IP address or domain,
see [SpamCop Inquiry Form](https://www.spamcop.net/bl.shtml)

### Microsoft

Microsoft provides free and consumer mail services in addition to business offerings. Microsoft calls the consumer mail service Microsoft Outlook. It calls the licensed, business offering Microsoft 365. To protect these services, Microsoft has a proprietary filtering and blocklisting logic. This logic does incorporate some third-party blocklists such as Spamhaus. Microsoft makes blocklisting decisions independent of these third parties.

#### Microsoft Outlook

Microsoft consumer services include the following domains:

* `hotmail.com`
* `outlook.com`
* `msn.com`
* `live.com`

```text {title="Example Microsoft Outlook bounce message"}
550 5.7.1 Unfortunately, messages from \[x.x.x.x] weren't sent.
Please contact your Internet service provider since part of their network is on our block list (S3140).
```

* To learn more about how Twilio works with Microsoft Outlook, see the [inbox provider insights on Microsoft Outlook](/docs/sendgrid/concepts/inbox-provider-insights/microsoft#microsoft-outlook)
* To check if Microsoft lists your IP address or domain,
  see the [Microsoft Outlook Inquiry Form](https://olcsupport.office.com/).
  * If your IP is listed, it is recommended that you utilize Microsoft's [Smart Network Data Services](https://www.twilio.com/docs/sendgrid/concepts/inbox-provider-insights/microsoft#smart-network-data-services) tool to investigate the possible root cause for the block and to assist in the remediation process.
  * Our users often report that the first response indicates that there is no evidence to show that a block exists. Should you receive a response like this, respond to the email and provide examples of the bounce message that your IP is receiving. When re-escalating, do not open additional support requests via the delisting form linked above and instead reply to the email that you received.

#### Microsoft 365

Microsoft 365 offers corporate or licensed email for businesses.

```text {title="Example Microsoft 365 bounce message"}
550 5.7.606-649 Access denied, banned sending IP \[x.x.x.x]
```

* To check if Microsoft lists your IP address or domain,
  see [Microsoft 365 Inquiry Form](https://sender.office.com/).
* To learn more about how Twilio works with Microsoft 365, see [inbox provider insights on Microsoft 365](/docs/sendgrid/concepts/inbox-provider-insights/microsoft#microsoft-365)

### Abusix

Abusix specializes in network abuse management and email security software. The service checks data about IP addresses and domains that it suspects might relate to malicious behavior.

```text {title="Example Abusix bounce message"}
552 5.2.0 Remote MTA x.x.x.x: An URL contained in this message is blacklisted by Abusix Domain Blacklist
```

To check if Abusix lists your IP address or domain,
see [Abusix Inquiry Form](https://app.abusix.com/lookup)

### Return Path

Validity maintains the Return Path blocklist (RPBL) and lists IPs based on sender behavior and content. The RPBL uses these signals, including attachments, spam trap hits, and authentication status, to determine listing decisions.

```text {title="Example Return Path bounce message"}
554 5.7.1 Service unavailable; Client host [x.x.x.x] blocked using returnpath.dnsbl; Return Path RPBL Listed
```

To check if Return Path lists your IP address or domain,
see [Return Path Inquiry Form](https://senderscore.org/assess/blocklist-lookup/)

### Vade Secure

Vade Secure provides anti-phishing, spear phishing, malware, and ransomware services. Their heuristic filtering analyzes globally all incoming emails, including links, attached files, and content, to detect threats.

```text {title="Example Vade Secure bounce message"}
550 5.7.1 H:VSP \[x.x.x.x] Connection refused due to Vade Secure Phishing
```

To check if Vade Secure lists your IP address or domain,
see [Vade Secure Inquiry Form](https://sendertool.vadesecure.com/)

### UCE Protect

UCE Protect often lists all IP addresses of any reputable email service provider. UCE Protect ignores the [RFC 6471][] stated principle of transparency:

* It vaguely describes their listing criteria in such a way that no audit trail is possible.
* It doesn't identify their sources and operating methodologies.
* It doesn't provide a mechanism exists to request information on why it placed your IP address on their Blocklist.

[RFC 6471]: https://datatracker.ietf.org/doc/rfc6471/

Section 2.2.5 of RFC 6471:

> *It is generally considered entirely appropriate for a DNSBL to charge for access to it by its users - the definition of a commercial DNSBL. However, the practice of requiring a listee to pay for delisting from a negative-connotation DNSBL steers perilously close to notions of extortion, blackmail, or a "protection racket". Even when such accusations are entirely unjustified, the practice causes uproar and damage to the DNSBL's reputation, if not the DNSBL mechanism as a whole.*

Due to offering "Express Delisting", UCE Protect operates outside the boundaries of a legitimate negative-connotation Domain Name Service blocklist (DNSBL). As such, most inbox providers don't reference UCE Protect when making inbox placement or blocking. If UCE Protect includes your domain or IP address, this causes little-to-no impact on deliverability. Therefore, Twilio doesn't take action on listings for UCE Protect.
