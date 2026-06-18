# Reverse DNS

*Internet Standard*. Method for systems to resolve an [IP address][ip] from a [domain][] name. [RFC 5855][rfc5855] defines this standard for IPv4 addresses. [RFC 8501][rfc8501] defines this standard for IPv6 addresses.

The primary purpose of the Domain Name System (DNS) is to map a domain to an IP address. Some authentication methods want to verify that an IP address belongs to a specific domain. Using Reverse DNS, a recipient server can verify that the given sender's IP address belongs to the domain given in the sender's email address.

[rfc5855]: https://datatracker.ietf.org/doc/html/rfc5855

[rfc8501]: https://datatracker.ietf.org/doc/html/rfc8501

[ip]: /docs/glossary/ip-address

[domain]: /docs/glossary/domain
