---
title: Analytics and logs
description: View analytics and logs for Internal DNS queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Analytics and logs

Internal DNS leverages [Gateway analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/). Below you can find information about specific fields and different methods you can use to access this data.

## GraphQL

For detailed metrics, use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/). Refer to the GraphQL Analytics API documentation for guidance on how to [get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

The [fields](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/) added to cover Internal DNS are the following:

* `InternalDNSFallbackStrategy`: The fallback strategy applied to the internal DNS response. Empty if no fallback strategy was applied.
* `InternalDNSRCode`: The response code sent back by the internal DNS service.
* `InternalDNSViewID`: The view identifier that was sent to the internal DNS service.
* `InternalDNSZoneID`: The internal zone identifier returned by the internal DNS service.

## Logs

Leverage Logpush jobs for [Gateway DNS](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/gateway%5Fdns/#internaldnsfallbackstrategy). For help setting up Logpush, refer to [Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

You can also set up [Logpush filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) to only push logs related to a specific [internal zone](https://developers.cloudflare.com/dns/internal-dns/internal-zones/) or [view](https://developers.cloudflare.com/dns/internal-dns/dns-views/) ID.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/analytics/#page","headline":"Analytics and logs · Cloudflare DNS docs","description":"View analytics and logs for Internal DNS queries.","url":"https://developers.cloudflare.com/dns/internal-dns/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics","GraphQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/analytics/","name":"Analytics and logs"}}]}
```
