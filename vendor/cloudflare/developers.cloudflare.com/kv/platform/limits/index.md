---
title: Limits
description: Workers KV account and namespace limits for reads, writes, key size, value size, and storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

| Feature                                                                                                                       | Free                  | Paid         |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------ |
| Reads                                                                                                                         | 100,000 reads per day | Unlimited    |
| Writes to different keys                                                                                                      | 1,000 writes per day  | Unlimited    |
| Writes to same key                                                                                                            | 1 per second          | 1 per second |
| Operations/Worker invocation [1](#user-content-fn-1)                                                                          | 1000                  | 1000         |
| Namespaces per account                                                                                                        | 1,000                 | 1,000        |
| Storage/account                                                                                                               | 1 GB                  | Unlimited    |
| Storage/namespace                                                                                                             | 1 GB                  | Unlimited    |
| Keys/namespace                                                                                                                | Unlimited             | Unlimited    |
| Key size                                                                                                                      | 512 bytes             | 512 bytes    |
| Key metadata                                                                                                                  | 1024 bytes            | 1024 bytes   |
| Value size                                                                                                                    | 25 MiB                | 25 MiB       |
| Minimum [cacheTtl](https://developers.cloudflare.com/kv/api/read-key-value-pairs/#cachettl-parameter) [2](#user-content-fn-2) | 30 seconds            | 30 seconds   |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

Free versus Paid plan pricing

Refer to [KV pricing](https://developers.cloudflare.com/kv/platform/pricing/) to review the specific KV operations you are allowed under each plan with their pricing.

Workers KV REST API limits

Using the REST API to access Cloudflare Workers KV is subject to the [rate limits that apply to all operations of the Cloudflare REST API](https://developers.cloudflare.com/fundamentals/api/reference/limits).

## Footnotes

1. Within a single invocation, a Worker can make up to 1,000 operations to external services (for example, 500 Workers KV reads and 500 R2 reads). A bulk request to Workers KV counts for 1 request to an external service. [↩](#user-content-fnref-1)
2. The maximum value is [Number.MAX\_SAFE\_INTEGER ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Number/MAX%5FSAFE%5FINTEGER). [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/platform/limits/#page","headline":"Limits · Cloudflare Workers KV docs","description":"Workers KV account and namespace limits for reads, writes, key size, value size, and storage.","url":"https://developers.cloudflare.com/kv/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/platform/limits/","name":"Limits"}}]}
```
