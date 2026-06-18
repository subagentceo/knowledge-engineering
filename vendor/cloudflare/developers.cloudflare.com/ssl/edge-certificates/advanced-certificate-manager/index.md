---
title: Advanced certificates
description: Order advanced certificates with custom SANs, validity periods, and CAs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced certificates

Use advanced certificates when you want something more customizable than [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) but still want the convenience of SSL certificate issuance and renewal.

  
To order advanced certificates, you must purchase the Advanced Certificate Manager add-on. This add-on also unlocks the features listed below.

## What the add-on includes

Advanced Certificate Manager allows you to:

* Order advanced certificates that can:  
   * Include up to 50 hosts as covered hostnames (the zone apex must be one of these 50).  
   * Cover more than one level of subdomain.  
   * Be issued by the certificate authority (CA) you choose.  
   * Use your preferred validation method.  
   * Have the validity period you choose.
* Automate domain control validation (DCV) for zones on a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) using [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).
* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) to automatically protect proxied hostnames.
* Select a [custom trust store](https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/) for origin authentication.
* Control [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) and [per-hostname minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/#per-hostname).

Note

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 edge certificates per zone.

Note

On Partial zones, Universal SSL is provisioned per proxied hostname regardless of subdomain depth. If your only reason for considering an advanced certificate is to cover subdomains beyond the first level, Universal SSL may already be sufficient — though you'll need to proxy and validate each new hostname individually as it is added.

## Availability

| Free         | Pro         | Business    | Enterprise  |             |
| ------------ | ----------- | ----------- | ----------- | ----------- |
| Availability | Paid add-on | Paid add-on | Paid add-on | Paid add-on |

Note

Eligible enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Limitations

Advanced certificates do not apply to [Cloudflare Pages](https://developers.cloudflare.com/pages/) or [R2](https://developers.cloudflare.com/r2/) custom domains. Due to [certificate prioritization](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/), these products use Cloudflare for SaaS certificates instead.

Advanced certificates are [Domain Validated (DV)](https://developers.cloudflare.com/ssl/concepts/#validation-level). If your organization needs Organization Validated (OV) or Extended Validation (EV) certificates, refer to [Custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/).   

Advanced certificates cover hostnames within a single domain. If you need a certificate that spans multiple domains (a multi-domain certificate), use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/). For architecture guidance, refer to [Leveraging Cloudflare for your SaaS applications](https://developers.cloudflare.com/reference-architecture/design-guides/leveraging-cloudflare-for-your-saas-applications/).

Note

Cloudflare does not support HTTP public key pinning (HPKP) for universal, advanced, or custom hostname certificates. For details and recommended alternatives, refer to [Certificate pinning](https://developers.cloudflare.com/ssl/reference/certificate-pinning/).

## Multi-level subdomain support

Advanced Certificate Manager supports deep, multi-level subdomains (for example, `api.staging.example.com`). There is no arbitrary limit on the number of subdomain levels, but you must consider the following constraints.

Note

If you want to automatically issue certificates for all proxied hostnames without manually specifying each one, enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/).

### Domain name length limits

These limits are defined by internet standards ([RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035) and [RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280)) and apply to all certificates, regardless of the certificate authority:

* **Total domain length**: The entire domain name cannot exceed 253 characters.
* **Label length**: Each individual level (the text between dots) cannot exceed 63 characters.
* **Common Name (CN) length**: The Common Name field of a certificate cannot exceed 64 characters. If a hostname on your certificate exceeds 64 characters, you must order the certificate via the [API](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/) and set the `cloudflare_branding` option to `true`. This places `sni.cloudflaressl.com` in the CN field and your long hostname in the SAN field. The dashboard does not support ordering certificates with hostnames longer than 64 characters.

### Wildcard coverage

Wildcard certificates only cover **one subdomain level**:

* A certificate for `*.example.com` covers `www.example.com` and `api.example.com` but **not** `api.staging.example.com`.
* To cover multiple levels, you must explicitly add a wildcard for each level to your certificate (for example, `*.example.com`, `*.staging.example.com`).

### Hostnames per certificate

A single advanced certificate can include up to **50 hosts** (SANs) total. The zone apex must be one of these 50, leaving room for up to 49 additional hostnames or wildcards.

### Consistency across certificate authorities

The character-length limits above (253-character total, 63-character label, 64-character CN) are defined by IETF standards ([RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035), [RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280)) and apply uniformly across all CAs. Other constraints, such as the per-certificate SAN count and supported validity periods, are Cloudflare advanced certificates limits or vary by CA. Refer to [Certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) for CA-specific details.

## Related resources

* [ Manage advanced certificates ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/)
* [ API commands ](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/api-commands/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/#page","headline":"Advanced certificates · Cloudflare SSL/TLS docs","description":"Order advanced certificates with custom SANs, validity periods, and CAs.","url":"https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/advanced-certificate-manager/","name":"Advanced certificates"}}]}
```
