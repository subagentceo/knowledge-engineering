---
title: Get started
description: Set up SSL/TLS encryption between visitors, Cloudflare, and your origin server.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Set up encrypted connections for your domain by choosing a certificate, selecting an encryption mode, and enforcing HTTPS.

## Before you begin

* [Create an account and register an application](https://developers.cloudflare.com/fundamentals/account/)

## Choose an edge certificate

[Edge certificates](https://developers.cloudflare.com/ssl/concepts/#edge-certificate) are the SSL/TLS certificates that Cloudflare presents to visitors connecting to your domain. Cloudflare offers several types:

* [**Universal certificates**](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/):  
By default, Cloudflare issues — and [renews](https://developers.cloudflare.com/ssl/reference/certificate-validity-periods/#universal-ssl) — free, unshared, publicly trusted SSL certificates to all domains [added to](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) and [activated on](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) Cloudflare.
* [**Advanced certificates**](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/):  
Use advanced certificates when you want something more customizable than [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) but still want the convenience of SSL certificate issuance and renewal.
* [**Custom certificates**](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/):  
Custom certificates are meant for Business and Enterprise customers who want to use their own SSL certificates.
* [**Keyless certificates**](https://developers.cloudflare.com/ssl/keyless-ssl/) (Enterprise only):  
Keyless SSL allows security-conscious clients to upload their own custom certificates and benefit from Cloudflare, but without exposing their TLS private keys.

For help deciding which certificate type fits your use case, refer to [Edge certificates](https://developers.cloudflare.com/ssl/edge-certificates/).

For SaaS providers

Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare's network to your customers via their own custom or vanity domains.

For more details, refer to [Cloudflare for SaaS (managed hostnames)](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/).

## Choose your encryption mode

Once you have chosen your edge certificate, [choose an encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

Encryption modes control how Cloudflare manages two separate connections: one between visitors and Cloudflare, and another between Cloudflare and your origin server. Modes range from no encryption to strict validation of your origin certificate. For more context, refer to the [concepts page](https://developers.cloudflare.com/ssl/concepts/#ssltls-certificate).

[Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) mode — the most secure option — requires a valid, unexpired certificate on your origin server. You can use a certificate from a publicly trusted certificate authority (CA), or generate a free [Origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) from Cloudflare. Each encryption mode page lists its specific requirements.

## Enforce HTTPS connections

Even if your application has an active edge certificate, visitors can still access resources over unsecured HTTP connections.

Using various Cloudflare settings, however, you can force all or most visitor connections to [use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/).

## SEO considerations

Using HTTPS can improve user trust and may be used as a ranking signal by search engines. For related guidance, refer to [Improve SEO](https://developers.cloudflare.com/fundamentals/performance/improve-seo/).

## Optional - Enable additional features

After you have chosen your encryption mode and enforced HTTPS connections, evaluate the following settings:

* [Edge certificates](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/): Customize different aspects of your edge certificates, from enabling **Opportunistic Encryption** to specifying a **Minimum TLS Version**.
* [Authenticated origin pull](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/): Ensure all requests to your origin server originate from the Cloudflare network.
* [Notifications](https://developers.cloudflare.com/notifications/notification-available/): Set up alerts related to certificate validation status, issuance, renewal, and expiration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/get-started/#page","headline":"Get started with SSL/TLS · Cloudflare SSL/TLS docs","description":"Set up SSL/TLS encryption between visitors, Cloudflare, and your origin server.","url":"https://developers.cloudflare.com/ssl/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/get-started/","name":"Get started"}}]}
```
