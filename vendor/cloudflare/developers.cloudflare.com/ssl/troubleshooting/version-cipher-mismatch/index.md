---
title: ERR_SSL_VERSION_OR_CIPHER_MISMATCH
description: Learn how to troubleshoot ERR_SSL_VERSION_OR_CIPHER_MISMATCH when using Cloudflare SSL/TLS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ERR\_SSL\_VERSION\_OR\_CIPHER\_MISMATCH

After you [add a new domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare, your visitors' browsers might display one of the following errors:

* `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` (Chrome)
* `Unsupported protocol The client and server don’t support a common SSL protocol version or cipher suite` (Chrome)
* `SSL_ERROR_NO_CYPHER_OVERLAP` (Firefox)

This error occurs when your domain or subdomain is not covered by an SSL/TLS certificate, which is usually caused by:

* A [delay in certificate activation](#certificate-activation).
* An [unproxied domain or subdomain DNS record](#proxied-dns-records).
* An [expired Custom certificate](#certificate-expiration).
* A [multi-level subdomain](#multi-level-subdomains) (`test.dev.example.com`).

## Decision tree

flowchart TD
accTitle: Troubleshooting ERR_SSL_VERSION_OR_CIPHER_MISMATCH decision tree
A>Is your certificate active?] -- Yes --> B>Is the DNS record proxied?]
A -- No --> C[Wait for certificate to activate or pause Cloudflare]
B -- No --> D[Proxy the DNS record]
B -- Yes --> E>Are you using a custom certificate?]
E -- Yes --> F[Custom certificate may be expired]
E -- No --> G>Are you accessing a multi-level subdomain?]
G -- Yes --> H[Get an advanced or custom certificate]

---

## Certificate activation

For domains on a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/)[1](#user-content-fn-1), your domain should **automatically** receive its Universal SSL certificate within **15 minutes to 24 hours** of domain activation[2](#user-content-fn-2).

This certificate will cover your zone apex (`example.com`) and all first-level subdomains (`subdomain.example.com`), and is provisioned even if your records are DNS only. However, the certificate will only be presented if your domain or subdomains are [proxied](https://developers.cloudflare.com/dns/proxy-status/).

## Footnotes

1. The most common Cloudflare setup that involves changing your authoritative nameservers. [↩](#user-content-fnref-1)
2. Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA). [↩](#user-content-fnref-2)

### Potential issues

If your visitors experience `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` (Chrome) or `SSL_ERROR_NO_CYPHER_OVERLAP` (Firefox), check the status of your Universal certificate:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Choose your account and domain.
3. Go to the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page.
4. Find the certificate with the **Type** of **Universal**.
5. Make sure the **Status** is **Active**.

If the **Status** is anything other than **Active**, you can either wait a bit longer for certificate activation or take immediate action.

### Solutions

If you need to immediately resolve this error, [temporarily pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/).

Since Universal certificates can take up to 24 hours to be issued, wait and [monitor the certificate's status](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#ssltls). Once your certificate becomes **Active**, unpause Cloudflare using whichever method you used previously.

If your certificate is still not **Active** after 24 hours, try the various troubleshooting steps used to [resolve timeout issues](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/troubleshooting/#resolve-a-timed-out-state). If these methods are successful (and your certificate becomes **Active**), unpause Cloudflare using whichever method you used previously.

---

## Proxied DNS records

Cloudflare Universal and Advanced certificates only cover the domains and subdomains you have [proxied through Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).

If the **Proxy status** of `A`, `AAAA`, or `CNAME` records for a hostname are **DNS-only**, you will need to change it to **Proxied**.

![Proxy status affects how Cloudflare treats traffic intended for specific DNS records](https://developers.cloudflare.com/_astro/proxy-status-screenshot.uxgurbGi_2igVHO.webp) 

---

## Certificate expiration

If you have a [Custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) and visitors experience `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` (Chrome) or `SSL_ERROR_NO_CYPHER_OVERLAP` (Firefox), [check its status](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#ssltls) to make sure it is not expired.

If it is expired, [upload a replacement certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/).

---

## Multi-level subdomains

By default, Cloudflare [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) only cover your apex domain and one level of subdomain.

| Hostname                 | Covered by Universal certificate? |
| ------------------------ | --------------------------------- |
| example.com              | Yes                               |
| www.example.com          | Yes                               |
| docs.example.com         | Yes                               |
| dev.docs.example.com     | No                                |
| test.dev.api.example.com | No                                |

This means that you might experience `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` (Chrome) or `SSL_ERROR_NO_CYPHER_OVERLAP` (Firefox) on multi-level subdomains.

To prevent insecure connections on a multi-level subdomain, do one of the following:

* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/), which automatically issues individual certificates to your proxied hostnames not covered by a Universal certificate.
* Order an [Advanced Certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) covering the subdomain.
* Upload a [Custom Certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) covering the subdomain.

If none of these solutions work, you could also remove the multi-level subdomain.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/troubleshooting/version-cipher-mismatch/#page","headline":"Fix VERSION_OR_CIPHER_MISMATCH · Cloudflare SSL/TLS docs","description":"Learn how to troubleshoot ERR\\_SSL\\_VERSION\\_OR\\_CIPHER\\_MISMATCH when using Cloudflare SSL/TLS.","url":"https://developers.cloudflare.com/ssl/troubleshooting/version-cipher-mismatch/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/troubleshooting/version-cipher-mismatch/","name":"ERR_SSL_VERSION_OR_CIPHER_MISMATCH"}}]}
```
