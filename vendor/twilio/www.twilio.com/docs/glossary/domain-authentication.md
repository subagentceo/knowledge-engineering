# Domain authentication

*Internet Security*. Protocols and policies that specify [IP addresses][ip-address] and [domains][domain] as proof of identity of an individual or organization sending email messages.

Domain authentication tells inbox providers that they can trust an email message. Authentication prevents malicious actors from [spoofing][] legitimate traffic which reduces forgeries, [spam][], and [phishing][] attempts. By establishing and maintaining proper authentication records, inbox providers lean toward trusting email originating from your domain.

Domain authentication builds on three standards that use the [domain name system (DNS)][dns]:

* [*DomainKeys Identified Mail* (DKIM)][dkim] signature: Authenticates email message as genuine.
* [*Sender Policy Framework* (SPF)][spf]: Verifies the sending IP address has authorization.
* [*Domain-based Message Authentication, Reporting & Conformance* (DMARC)][dmarc] policy: Instructs email servers when the other two fail.

This change helps your [reputation][ers] as a sender and your email deliverability. [Email service providers (ESPs)][esp] distrust messages without domain authentication, because they can't validate who sent the message. Sender validation increases your reputation with ESPs. This decreases the possibility that send your email message to spam.

> \[!WARNING]
>
> You might encounter the term *domain whitelabel*. The term *domain authentication*" replaces that term and eliminates any potential racial or cultural connotations associated with the earlier term.

## Additional resources

* [Configure domain authentication][domain-auth]

[dkim]: /docs/glossary/dkim

[dmarc]: /docs/glossary/dmarc

[dns]: /docs/glossary/dns

[domain]: /docs/glossary/domain

[esp]: /docs/glossary/email-service-provider

[ip-address]: /docs/glossary/ip-address

[phishing]: /docs/glossary/phishing

[spf]: /docs/glossary/spf

[spam]: /docs/glossary/spam

[spoofing]: /docs/glossary/spoofing

[ers]: /docs/glossary/email-reputation-score

[domain-auth]: /docs/email/security/domains
