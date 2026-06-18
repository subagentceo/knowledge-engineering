---
title: Certificate pinning
description: Learn why Cloudflare does not support HTTP public key pinning (HPKP) and consider an alternative solution to prevent certificate misissuance.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Certificate pinning

Cloudflare does not support [HTTP public key pinning (HPKP)](https://developers.cloudflare.com/ssl/reference/certificate-pinning/) for universal, advanced, or custom hostname certificates.

Cloudflare regularly rotates the edge certificates provisioned for your domain. If HPKP was enabled, your domain would go offline each time a certificate rotates because the new certificate would not match the pinned key. Additionally, [industry experts ↗](https://scotthelme.co.uk/im-giving-up-on-hpkp/) discourage using HPKP. For a detailed overview, refer to the Cloudflare blog post on [why certificate pinning is outdated ↗](https://blog.cloudflare.com/why-certificate-pinning-is-outdated/).

## Recommended alternative

The problem HPKP tries to solve is preventing certificate misissuance. A safer way to detect misissuance without risking downtime is [Certificate Transparency Monitoring](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/), which alerts you when a certificate is issued for your domain.

## If you must pin certificates

If your use case requires certificate pinning, the only advisable approach is to upload a [custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) to Cloudflare and pin to that certificate. Because you control the certificate lifecycle — including renewal timing, CA selection, and key material — you can ensure pin continuity. However, pinning still carries outage risk: if a renewal deploys a new key, clients pinned to the old key will fail TLS. If you need pin continuity, you must intentionally reuse the same key material during renewal. Test renewed certificates in the [staging environment](https://developers.cloudflare.com/ssl/edge-certificates/staging-environment/) before production.

Select the [**user-defined** bundle method](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/bundling-methodologies/#user-defined) so that you control exactly which CA, intermediate, and leaf certificate are served.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/certificate-pinning/#page","headline":"Certificate pinning · Cloudflare SSL/TLS docs","description":"Learn why Cloudflare does not support HTTP public key pinning (HPKP) and consider an alternative solution to prevent certificate misissuance.","url":"https://developers.cloudflare.com/ssl/reference/certificate-pinning/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/reference/certificate-pinning/","name":"Certificate pinning"}}]}
```
