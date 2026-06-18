# DomainKeys Identified Mail (DKIM)

*Internet standard*. A domain-based email authentication protocol that helps ISPs better identify legitimate email senders. [RFC 6376][rfc6376] defined this standards and [RFC 8301][rfc8301], [RFC 8463][rfc8463], [RFC 8553][rfc8553], and [RFC 8616][rfc8616] updated it.

The DomainKeys Identified Mail (DKIM) process includes two components: a DKIM record stored in your [DNS][] records and a `DKIM-Signature` metadata entry in your email message [headers][].

To verify the authenticity of an email message, DKIM adds the `DKIM-Signature` to the header of every email message you send. This signature includes two key components:

* Instructions on how to generate the digital fingerprint for this email message
* A copy of the digital fingerprint encrypted with [public-key cryptography][pkc]

The instructions explain to the receiving server where it can find the public key and what settings to use to re-create the digital fingerprint. Having retrieved the key, the receiving server can compare a decrypted version of the fingerprint in the signature to its recreation based on the instructions. If they match, the receiving server considers the email message valid and sends it on to the recipient's inbox.

By providing an encrypted source of validity, the DKIM signature prevents bad actors from impersonating a legitimate domain.

While Twilio turns on DKIM for all email on all IP addresses, you must configure [domain authentication][] first.

## Related entries

* [Deliverability][]
* [DMARC][]
* [DKIM][]
* [Email spoofing][spoofing]
* [IP address][IP]
* [SPF][]

## Related resources

* [Domain authentication][]
* [DKIM specification][dkim-spec]
* [Sender identity][]
* [Verify senders with DKIM][]

[deliverability]: /docs/sendgrid/glossary/deliverability

[dkim-spec]: https://dkim.org

[dkim]: /docs/sendgrid/glossary/dkim

[dmarc]: /docs/sendgrid/glossary/dmarc

[DNS]: /docs/sendgrid/glossary/dns

[Domain authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[headers]: /docs/sendgrid/glossary/header

[IP]: /docs/sendgrid/glossary/ip-address

[pkc]: https://twilio.com/blog/what-is-public-key-cryptography

[rfc6376]: https://datatracker.ietf.org/doc/html/rfc6376

[rfc8301]: https://datatracker.ietf.org/doc/html/rfc8301

[rfc8463]: https://datatracker.ietf.org/doc/html/rfc8463

[rfc8553]: https://datatracker.ietf.org/doc/html/rfc8553

[rfc8616]: https://datatracker.ietf.org/doc/html/rfc8616

[SPF]: /docs/sendgrid/glossary/spf

[spoofing]: /docs/sendgrid/glossary/spoofing

[Sender identity]: /docs/sendgrid/for-developers/sending-email/sender-identity

[Verify senders with DKIM]: /docs/sendgrid/ui/account-and-settings/dkim-records
