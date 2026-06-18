---
title: Pricing
description: Workers KV pricing for read, write, delete, and list operations, plus storage costs and billing FAQ.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Workers KV is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

| Free plan1    | Paid plan     |                                   |
| ------------- | ------------- | --------------------------------- |
| Keys read     | 100,000 / day | 10 million/month, + $0.50/million |
| Keys written  | 1,000 / day   | 1 million/month, + $5.00/million  |
| Keys deleted  | 1,000 / day   | 1 million/month, + $5.00/million  |
| List requests | 1,000 / day   | 1 million/month, + $5.00/million  |
| Stored data   | 1 GB          | 1 GB, + $0.50/ GB-month           |

1 The Workers Free plan includes limited Workers KV usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

Note

Workers KV pricing for read, write and delete operations is on a per-key basis. Bulk read operations are billed by the amount of keys read in a bulk read operation.

## Pricing FAQ

#### When writing via KV's [REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fupdate/), how are writes charged?

Each key-value pair in the `PUT` request is counted as a single write, identical to how each call to `PUT` in the Workers API counts as a write. Writing 5,000 keys via the REST API incurs the same write costs as making 5,000 `PUT` calls in a Worker.

#### Do queries I issue from the dashboard or wrangler (the CLI) count as billable usage?

Yes, any operations via the Cloudflare dashboard or wrangler, including updating (writing) keys, deleting keys, and listing the keys in a namespace count as billable KV usage.

#### Does Workers KV charge for data transfer / egress?

No.

#### What operations incur operations charges?

All operations incur charges, including fetches for non-existent keys that return a `null` (Workers API) or `HTTP 404` (REST API). These operations still traverse KV's infrastructure.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/platform/pricing/#page","headline":"Pricing · Cloudflare Workers KV docs","description":"Workers KV pricing for read, write, delete, and list operations, plus storage costs and billing FAQ.","url":"https://developers.cloudflare.com/kv/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/platform/pricing/","name":"Pricing"}}]}
```
