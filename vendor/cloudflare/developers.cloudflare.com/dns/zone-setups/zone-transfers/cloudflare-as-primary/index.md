---
title: Cloudflare as Primary
description: Use Cloudflare as the primary DNS with zone transfers to secondaries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare as Primary

With outgoing zone transfers, you can use Cloudflare as your primary DNS provider and configure one or more peer DNS servers as secondary DNS providers.

When you [make edits](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) to Cloudflare DNS, those DNS records will be transferred from Cloudflare to your secondary provider via zone transfer using [AXFR ↗](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR ↗](https://datatracker.ietf.org/doc/html/rfc1995)

![With Cloudflare as your primary provider in a multi-provider setup, Cloudflare periodically transfers records to your secondary DNS provider.](https://developers.cloudflare.com/_astro/cloudflare-as-primary.CS_-J48n_Z1u2wbK.webp) 

## How to

* [Set up outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/)

## Availability

Outgoing zone transfers are available to Enterprise customers who are currently using Cloudflare as their [authoritative DNS provider](https://developers.cloudflare.com/dns/zone-setups/full-setup/). For more details on activation and pricing, contact your account team.

## Notes

If you use [Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/), only proxied Load Balancer DNS records will be transferred.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/#page","headline":"Cloudflare as Primary · Cloudflare DNS docs","description":"Use Cloudflare as the primary DNS with zone transfers to secondaries.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/","name":"Cloudflare as Primary"}}]}
```
