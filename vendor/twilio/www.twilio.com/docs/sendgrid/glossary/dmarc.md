# Domain-based Message Authentication, Reporting and Conformance (DMARC)

*Internet Security*, *Internet Standard*. A domain-based policy for determining the authenticity of the person or service sending email on behalf of a domain. [RFC 7489][rfc7489] defines this standard.

To minimize email [spoofing][], DMARC builds on top of existing authentication standards.

## Domain-based message authentication

[DomainKeys Identified Mail (DKIM)][dkim] and [Sender Policy Framework (SPF)][spf] can't provide complete spoofing prevention.

* By verifying which domain authorized the IP address that sent the email, SPF validates the identity of the sending email server.
* By cryptographically signing the email message, DKIM ensure message integrity.
* By comparing the visible sending email address in the `From` header against the `reply-to` header or the DKIM signature, DMARC validates displayed sender against the actual sender.

## Reporting and conformance

To implement DMARC, you add a [`TXT`][TXT] DNS record to your domain. The policy consists of a list of tags.

The tags in this `TXT` record instruct receiving email servers on how to handle email that fails either or both DKIM and SPF checks. The DMARC record also tells receiving servers where to send reports about the failures. The ability to provide receiving email servers with failure handling instructions and the opportunity to receive failure reports is incredibly valuable for domain owners. The information can be used to track down the people and services sending email on behalf of your domain, which is a first step in understanding your [sender reputation][sender-reputation]. This feedback loop is unique to the reporting and conformance mechanisms of DMARC.

## Related resources

* [Sender Identity][]
* [Domain Authentication][]
* [Single Sender Verification][]
* [How to Implement DMARC][]
* [SPF specification][spf-spec]
* [DMARC specification][dmarc-spec]
* [DKIM specification][dkim-spec]

[dkim-spec]: https://dkim.org

[dkim]: /docs/sendgrid/glossary/dkim

[dmarc-spec]: https://dmarc.org/resources/specification

[Domain Authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[How to Implement DMARC]: /docs/sendgrid/ui/sending-email/how-to-implement-dmarc

[rfc7489]: https://datatracker.ietf.org/doc/html/rfc7489

[Sender Identity]: /docs/sendgrid/for-developers/sending-email/sender-identity

[sender-reputation]: /docs/sendgrid/glossary/account-reputation-dashboard

[Single Sender Verification]: /docs/sendgrid/ui/sending-email/sender-verification

[spf-spec]: http://www.open-spf.org

[spf]: /docs/sendgrid/glossary/spf

[spoofing]: /docs/sendgrid/glossary/spoofing

[TXT]: https://en.wikipedia.org/wiki/TXT_record
