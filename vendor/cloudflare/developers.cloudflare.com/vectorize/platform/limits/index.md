---
title: Limits
description: Account, index, and vector limits for Vectorize on Free and Paid plans.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

The following limits apply to accounts, indexes, and vectors:

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/nyamy2SM9zwWTXKE6). If the limit can be increased, Cloudflare will contact you with next steps.

| Feature                                                     | Current Limit                       |
| ----------------------------------------------------------- | ----------------------------------- |
| Indexes per account                                         | 50,000 (Workers Paid) / 100 (Free)  |
| Maximum dimensions per vector                               | 1536 dimensions, 32 bits precision  |
| Precision per vector dimension                              | 32 bits (float32)                   |
| Maximum vector ID length                                    | 64 bytes                            |
| Metadata per vector                                         | 10KiB                               |
| Maximum returned results (topK) with values or metadata     | 50                                  |
| Maximum returned results (topK) without values and metadata | 100                                 |
| Maximum upsert batch size (per batch)                       | 1000 (Workers) / 5000 (HTTP API)    |
| Maximum vectors in a list-vectors page                      | 1000                                |
| Maximum index name length                                   | 64 bytes                            |
| Maximum vectors per index                                   | 10,000,000                          |
| Maximum namespaces per index                                | 50,000 (Workers Paid) / 1000 (Free) |
| Maximum namespace name length                               | 64 bytes                            |
| Maximum vectors upload size                                 | 100 MB                              |
| Maximum metadata indexes per Vectorize index                | 10                                  |
| Maximum indexed data per metadata index per vector          | 64 bytes                            |

Limits for V1 indexes (deprecated)

| Feature                               | Limit                            |
| ------------------------------------- | -------------------------------- |
| Indexes per account                   | 100 indexes                      |
| Maximum dimensions per vector         | 1536 dimensions                  |
| Maximum vector ID length              | 64 bytes                         |
| Metadata per vector                   | 10 KiB                           |
| Maximum returned results (topK)       | 20                               |
| Maximum upsert batch size (per batch) | 1000 (Workers) / 5000 (HTTP API) |
| Maximum index name length             | 63 bytes                         |
| Maximum vectors per index             | 200,000                          |
| Maximum namespaces per index          | 1000 namespaces                  |
| Maximum namespace name length         | 63 bytes                         |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/platform/limits/#page","headline":"Limits · Cloudflare Vectorize docs","description":"Account, index, and vector limits for Vectorize on Free and Paid plans.","url":"https://developers.cloudflare.com/vectorize/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/platform/limits/","name":"Limits"}}]}
```
