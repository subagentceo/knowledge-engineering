---
title: CNAME flattening
description: Resolve CNAME records at the zone apex to comply with DNS standards.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CNAME flattening

CNAME flattening speeds up CNAME resolution and allows you to use a [CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname) at your [zone apex](https://developers.cloudflare.com/dns/concepts/#zone-apex) (`example.com`).

Note

This functionality is also what allows you to use a [root custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) with a Cloudflare Pages site.

## How it works

With CNAME flattening, Cloudflare finds the IP address that a CNAME points to. This process could involve a single lookup or multiple (if your CNAME points to another CNAME). Cloudflare then returns the final IP address instead of a CNAME record, helping DNS queries resolve faster.

For more details on the steps involved in CNAME flattening, review the [CNAME flattening diagram](https://developers.cloudflare.com/dns/cname-flattening/cname-flattening-diagram/) and refer to the [Cloudflare blog post ↗](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/).

Note

For information about CNAME flattening in [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/), refer to [internal DNS records](https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/).

## Aspects to keep in mind

* CNAME flattening happens by default in some cases. Refer to [Setup](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/) for details.
* CNAME to a different Cloudflare account is prohibited and will result in [Error 1014: CNAME Cross-User Banned](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/)
* If a CNAME target is being used to verify a domain for a third-party service, turning on [CNAME flattening for all CNAME records](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) may cause the verification to fail since the CNAME record itself will not be returned directly.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/cname-flattening/#page","headline":"CNAME flattening · Cloudflare DNS docs","description":"Resolve CNAME records at the zone apex to comply with DNS standards.","url":"https://developers.cloudflare.com/dns/cname-flattening/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/cname-flattening/","name":"CNAME flattening"}}]}
```
