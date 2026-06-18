---
title: Universal SSL
description: Free TLS certificates automatically issued for all proxied hostnames.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Universal SSL

By default, Cloudflare issues — and [renews](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl) — free, unshared, publicly trusted SSL certificates to all domains [added to](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and [activated on](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) Cloudflare.

On a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), Universal SSL certificates cover your root domain (for example, `example.com`) and first-level subdomains (for example, `www.example.com`). On a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), each proxied subdomain receives its own certificate regardless of depth. Cloudflare handles issuance, renewal, and deployment automatically.

For full setup zones that need coverage beyond first-level subdomains, use [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) or [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/).

Universal certificates are [Domain Validated (DV)](https://developers.cloudflare.com/ssl/concepts/#validation-level), which means the certificate authority verifies domain ownership but does not validate organization identity. For setup details, refer to [Enable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/).

Note

Universal SSL certificates are issued after your domain is active on Cloudflare. If you need an SSL certificate before migrating traffic, or if you need to [customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/), use [Advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or [Custom](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) certificates.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Related resources

* [Limitations](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/)
* [Backup certificates](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/)
* [Validity period and renewal](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/#page","headline":"Free Universal SSL/TLS certificates · Cloudflare SSL/TLS docs","description":"Free TLS certificates automatically issued for all proxied hostnames.","url":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/universal-ssl/","name":"Universal SSL"}}]}
```
