---
title: Pricing
description: Hyperdrive pricing details for Free and Workers Paid plans.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Hyperdrive is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

| Free plan[1](#user-content-fn-1)        | Paid plan     |           |
| --------------------------------------- | ------------- | --------- |
| Database queries[2](#user-content-fn-2) | 100,000 / day | Unlimited |

Footnotes

1: The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

2: Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`).

## Footnotes

1. The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error. [↩](#user-content-fnref-1)
2. Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`). [↩](#user-content-fnref-2)

Hyperdrive limits are automatically adjusted when subscribed to a Workers Paid plan. Hyperdrive's [connection pooling and query caching](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/) are included in Workers Paid plan, so do not incur any additional charges.

## Pricing FAQ

### Does connection pooling or query caching incur additional charges?

No. Hyperdrive's built-in cache and connection pooling are included within the stated plans above. There are no hidden limits other than those [published](https://developers.cloudflare.com/hyperdrive/platform/limits/).

### Are cached queries counted the same as uncached queries?

Yes, any query made through Hyperdrive, whether cached or uncached, whether query or mutation, is counted according to the limits above.

### Does Hyperdrive charge for data transfer / egress?

No.

Note

For questions about pricing, refer to the [pricing FAQs](https://developers.cloudflare.com/hyperdrive/reference/faq/#pricing).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/platform/pricing/#page","headline":"Pricing · Cloudflare Hyperdrive docs","description":"Hyperdrive pricing details for Free and Workers Paid plans.","url":"https://developers.cloudflare.com/hyperdrive/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/platform/pricing/","name":"Pricing"}}]}
```
