# Sender Policy Framework (SPF)

*Internet Security*, *Internet Standard*. An email authentication standard that sets which servers can send email from their domain. [RFC 7208][rfc7208] defines this standard.

Sender Policy Framework (SPF) lets domains specify which servers they authorized to send email on their behalf. Receiving hosts can confirm this authorization.

The SPF uses the existing [DNS][] infrastructure. The sending email server adds a [`TXT` record][TXT] to their DNS. This record contains a list of the [IP addresses][IP] of email servers authorized to send email messages for that domain.

When the administrator of a receiving email server turns on SPF checks, each incoming message triggers a DNS lookup for an SPF record on the sending email server's DNS. The receiving server then tries to find the IP address of the sending server in the allowed list of IP addresses in the SPF record. If it finds a match, the email message passes and gets delivered to the recipient's inbox. If it doesn't find a match, the email message gets processed according to the receiving server's [DMARC policy][dmarc].

Most large inbox providers have an active SPF policy. While Twilio turns on SPF for all email on all IP addresses, you must configure [domain authentication][] first.

## Related entries

* [Deliverability][]
* [DKIM][]
* [DMARC][]
* [DNS][]
* [Email spoofing][spoofing]
* [IP address][IP]

## Related resources

* [Domain Authentication][]
* [Enforce authentication with a DMARC policy][]
* [How to Implement DMARC][]
* [Sender Identity][]
* [Single Sender Verification][]
* [SPF specification][]
* [Verify senders with DKIM][]

[deliverability]: /docs/sendgrid/glossary/deliverability

[dkim]: /docs/sendgrid/glossary/dkim

[dmarc]: /docs/sendgrid/glossary/dmarc

[DNS]: /docs/sendgrid/glossary/dns

[Domain Authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Enforce authentication with a DMARC policy]: /docs/sendgrid/ui/sending-email/dmarc

[How to Implement DMARC]: /docs/sendgrid/ui/sending-email/how-to-implement-dmarc

[IP]: /docs/sendgrid/glossary/ip-address

[rfc7208]: https://datatracker.ietf.org/doc/html/rfc7208

[Sender Identity]: /docs/sendgrid/for-developers/sending-email/sender-identity

[Single Sender Verification]: /docs/sendgrid/ui/sending-email/sender-verification

[SPF specification]: http://www.open-spf.org

[spoofing]: /docs/sendgrid/glossary/spoofing

[TXT]: https://en.wikipedia.org/wiki/TXT_record

[Verify senders with DKIM]: /docs/sendgrid/ui/account-and-settings/dkim-records
