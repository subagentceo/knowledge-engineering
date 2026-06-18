---
title: Cloudflare as Secondary
description: Use Cloudflare as a secondary DNS provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare as Secondary

With incoming zone transfers, you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.

When you make edits in your primary DNS provider, those DNS records will be transferred from your primary DNS provider to Cloudflare via zone transfer using [AXFR ↗](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR ↗](https://datatracker.ietf.org/doc/html/rfc1995).

flowchart LR
accTitle: Cloudflare as Secondary DNS
A((Zone Admin)) --DNS record <br /> management--> B[Primary DNS <br /> provider]
B --Zone transfer--> C[Cloudflare <br /> DNS]
B & C <--DNS lookups--> D[Resolver] <--DNS lookups--> E((User))

## How to

* [Set up incoming zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/)
* Proxy traffic through Cloudflare with [Secondary DNS Override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/)

## Availability

Secondary DNS is only available to Enterprise customers. For more details on activation and pricing, contact your account team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/#page","headline":"Cloudflare as Secondary · Cloudflare DNS docs","description":"Use Cloudflare as a secondary DNS provider.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","name":"Cloudflare as Secondary"}}]}
```
