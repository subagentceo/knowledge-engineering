---
title: Network analytics
description: Monitor network and transport-layer traffic and DDoS attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network analytics

Cloudflare Network Analytics (version 2) provides near real-time visibility into network and transport-layer traffic patterns and DDoS attacks. Network Analytics visualizes packet and bit-level data, the same data available via the Network Analytics dataset of the GraphQL Analytics API.

Requirements

Network Analytics requires the following:

* A Cloudflare Enterprise plan.
* Cloudflare Magic Transit or Spectrum.
* Cloudflare WAN.

For a technical deep-dive into Network Analytics, refer to our [blog post ↗](https://blog.cloudflare.com/building-network-analytics-v2/).

## Remarks

* The Network Analytics logs refer to IP traffic of Magic Transit customer prefixes/leased IP addresses or Spectrum applications. These logs are not directly associated with the [zones](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) in your Cloudflare account.
* The data retention for Network Analytics is 16 weeks. Additionally, data older than eight weeks might have lower resolution when using narrow time frames.

## Related resources

* [Cloudflare GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/)
* [Cloudflare Logpush](https://developers.cloudflare.com/logs/logpush/)
* [Migrating from Network Analytics v1 to Network Analytics v2](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/analytics/network-analytics/#page","headline":"Cloudflare Network Analytics · Cloudflare Analytics docs","description":"Monitor network and transport-layer traffic and DDoS attacks.","url":"https://developers.cloudflare.com/analytics/network-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/network-analytics/","name":"Network analytics"}}]}
```
