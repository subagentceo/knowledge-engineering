# Reverse DNS

*Internet Standard*. Method for systems to resolve an [IP address][ip] from a [domain][] name. [RFC 5855][rfc5855] defines this standard for IPv4 addresses. [RFC 8501][rfc8501] defines this standard for IPv6 addresses.

The primary purpose of the Domain Name System (DNS) is to map a domain to an IP address. Some authentication methods want to verify that an IP address belongs to a specific domain. Using Reverse DNS, a recipient server can verify that the given sender's IP address belongs to the domain given in the sender's email address.

> \[!WARNING]
>
> You might encounter the term *IP whitelabel*. The term *reverse DNS* replaces that term and eliminates any potential racial or cultural connotations associated with the earlier term.

## Additional resources

* [Configure link branding](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding)
* [Configure domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication)
* [Configure reverse DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns)

[rfc5855]: https://datatracker.ietf.org/doc/html/rfc5855

[rfc8501]: https://datatracker.ietf.org/doc/html/rfc8501

[ip]: /docs/sendgrid/glossary/ip-address

[domain]: /docs/sendgrid/glossary/domain
