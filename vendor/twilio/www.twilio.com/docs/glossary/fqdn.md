# Fully Qualified Domain Name (FQDN)

*Internet standard*. A human-readable label that identifies a specific server on the internet.

A Fully Qualified Domain Name (FQDN) sets the complete address for a specific location in the [Domain Name System (DNS)][dns] hierarchy. This is also known as the absolute domain name.

An FQDN consists of four parts. Using the example of `mail.sys.example.com`, these parts include:

| Part                            | Abbr | Description                                                            | Example    |
| ------------------------------- | ---- | ---------------------------------------------------------------------- | ---------- |
| Top level domain                | TLD  | Trunk of the DNS hierarchy                                             | `.com`     |
| [Domain][]                      |      | Branding for a specific entity on the internet                         | `.example` |
| Partially qualified domain name | PQDN | Virtual space that identifies part of an entity, like its systems team | `.sys`     |
| Hostname                        |      | Label for a specific server or host in the domain                      | `mail`     |

To connect to a server or service on the internet, always use the FQDN.

[dns]: /docs/glossary/dns

[domain]: /docs/glossary/domain
