---
title: Edge certificates
description: Choose the right edge certificate type for your domain based on your use case.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Edge certificates

Edge certificates are the SSL/TLS certificates that Cloudflare presents to visitors connecting to your domain. These certificates secure the encrypted connection between your visitors and Cloudflare.

Use the guidance below to choose the right certificate type for your use case. If you are not familiar with SSL/TLS certificates, refer to [Concepts](https://developers.cloudflare.com/ssl/concepts/).

Note

Occasionally, the Cloudflare dashboard displays a wildcard certificate with only the apex hostname listed (and does not include the wildcard symbol `*`).

This behavior occurs when all of the following conditions are true:

* The zone is on a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).
* The certificate has a subject or SAN that is a wildcard for the zone's parent domain.

## Use cases

### Simplify issuance and renewal

Managing certificate issuance, renewal, and expiration tracking can be time-consuming. Cloudflare can handle this for you:

* [**Universal SSL**](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/): Automatic, free certificates for your apex domain and first-level subdomains. Provisioned automatically on [full setups](https://developers.cloudflare.com/dns/zone-setups/full-setup/).
* [**Advanced certificates**](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/): Automatic certificates with more control — choose your certificate authority (CA), covered hostnames, and validity period.
* [**Custom certificates**](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/): Upload your own certificates for full control over the CA and [validation level](https://developers.cloudflare.com/ssl/concepts/#validation-level). You handle issuance and renewal.

### Meet cipher suites requirements

A cipher suite is a set of encryption algorithms that a visitor's browser and the server negotiate when establishing a secure connection. Some compliance standards (for example, PCI DSS) require specific cipher suites or prohibit older ones.

With [cipher suites customization](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/), you can set different cipher suites per hostname. For example, you could allow broader compatibility on `www.example.com` for legacy devices while enforcing stricter [compliance standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/) on `shop.example.com`.

Custom cipher suites apply to any edge certificate serving that hostname. To use this feature, you must [purchase the Advanced Certificate Manager add-on ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/acm/). Refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) for setup instructions.

### Automate domain control validation (DCV)

Before a certificate authority (CA) issues a certificate, it must verify you control the domain. This process is called [domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/).

If Cloudflare runs your authoritative DNS ([full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)), DCV happens automatically. If you manage DNS with another provider ([partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)), you may need to complete DCV manually each time a certificate is issued or renewed.

To automate DCV for partial setups, use [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) with [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ssl/edge-certificates/#page","headline":"Edge certificates · Cloudflare SSL/TLS docs","description":"Choose the right edge certificate type for your domain based on your use case.","url":"https://developers.cloudflare.com/ssl/edge-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}}]}
```
