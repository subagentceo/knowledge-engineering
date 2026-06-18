# Domain Name System

*Internet standard*. A hierarchical system of software and systems that translate a fully qualified domain name into an IP address. [RFC 1034][rfc1034] defines domains and the Domain Name System (DNS).

Computers determine their place on the internet using [IP addresses][ip]. To remember these numeric or hexadecimal sequences can be difficult. DNS provides the structure to map human-readable online branding to a computer-readable IP address.

This allows web users to type `www.example.com` instead of `198.51.100.0` in their browser. It also lets them write an email to `alex@example.com` instead of `alex@203.0.113.6`.

## Additional resources

* [domain](/docs/glossary/domain)
* [fully qualified domain name][fqdn]
* [MX records](/docs/glossary/mx-record)
* [RFC 1034][rfc1034]: Domain Names - Concepts and facilities
* [DNS in Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
* The Twilio [Email Infrastructure Guide][]

[Email Infrastructure Guide]: https://www.twilio.com/en-us/resource-center/the-email-infrastructure-guide-build-it-or-buy-it

[ip]: /docs/glossary/ip-address

[fqdn]: /docs/glossary/fqdn

[rfc1034]: https://datatracker.ietf.org/doc/html/rfc1034
