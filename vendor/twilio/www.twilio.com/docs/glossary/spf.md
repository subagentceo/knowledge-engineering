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
* [SPF specification][]

[deliverability]: /docs/glossary/deliverability

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[DNS]: /docs/glossary/dns

[Domain Authentication]: /docs/email/security/domains

[IP]: /docs/glossary/ip-address

[rfc7208]: https://datatracker.ietf.org/doc/html/rfc7208

[SPF specification]: http://www.open-spf.org

[spoofing]: /docs/glossary/spoofing

[TXT]: https://en.wikipedia.org/wiki/TXT_record
