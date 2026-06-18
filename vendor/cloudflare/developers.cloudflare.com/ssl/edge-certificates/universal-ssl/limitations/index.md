---
title: Limitations
description: Review the limitations of Universal certificates, such as hostname coverage, certificate authority  choice, and compatibility with other products.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limitations

Universal SSL certificates present some limitations.

## Proxy status

Cloudflare can only serve an SSL/TLS certificate for a DNS record when you set the record's [proxy status](https://developers.cloudflare.com/dns/proxy-status/) to **Proxied**. If you do not do this, the origin server your record points to will be responsible for supporting SSL/TLS connections.

## Hostname coverage

### Full setup

When you rely only on Universal SSL in a full setup zone, coverage is limited to the root domain (for example, `example.com`) and first-level subdomains (for example, `www.example.com` or `blog.example.com`). Deeper subdomains — such as `dev.www.example.com` or `app3.dev.www.example.com` — are **not** covered and will not serve a valid certificate.

To enable SSL for deeper subdomains, you can:

* Purchase [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) — then turn on [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) for automatic certificate coverage of all proxied subdomains, or manually create advanced certificates for specific hostnames.
* Upload a [custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) that includes the required subdomains as Subject Alternative Names (SANs).

### CNAME setup

On a [CNAME setup zone](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), each subdomain (regardless of level) has its own Universal SSL certificate and does not require additional features or purchases. As long as the subdomains are proxied to Cloudflare, a universal certificate [will be provisioned](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup).

## Certificate authority

For Universal SSL certificates, Cloudflare chooses the certificate authority (CA) used for your certificate.

Cloudflare can change the [certificate authority](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) without prior notification, and will not send any notification as the change happens.

If you want to choose the issuing certificate authority, [order an advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/).

## Validity period

For Universal certificates, Cloudflare controls the validity period. Refer to [validity periods and renewal](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl) for details.

## TLS settings

[Customizing cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) is only available with [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or within [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

You can set up [minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) at the zone level, but, for per-hostname settings, you must have [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/).

## Delegated DCV

Delegated DCV allows zones with [partial DNS setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) to delegate the DCV process to Cloudflare. DCV delegation will not work with Universal SSL certificates and requires the use of an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/).

## Spectrum

Universal SSL is not compatible with [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/). If you are trying to use Spectrum, use either [an advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) or [a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/).

## Load balancing

Due to internal limitations, Universal SSL certificates do not cover [load balancing hostnames](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/) by default. This behavior will be corrected in the future.

## Browser support

For more on browser support, see [Browser compatibility](https://developers.cloudflare.com/ssl/reference/browser-compatibility/).

## SSL invalid brand check

Some domains are not eligible for Universal SSL if they contain words that conflict with trademarked domains.

To resolve this issue, you can:

* Purchase an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/).
* Upload your own [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/).

## Certificate pinning

Cloudflare does not support HTTP public key pinning (HPKP) for universal, advanced, or custom hostname certificates. For details and recommended alternatives, refer to [Certificate pinning](https://developers.cloudflare.com/ssl/reference/certificate-pinning/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/#page","headline":"Limitations for Universal SSL · Cloudflare SSL/TLS docs","description":"Review the limitations of Universal certificates, such as hostname coverage, certificate authority  choice, and compatibility with other products.","url":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/universal-ssl/","name":"Universal SSL"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/universal-ssl/limitations/","name":"Limitations"}}]}
```
