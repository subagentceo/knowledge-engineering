---
title: Limits
description: Review Agent Memory platform limits, including message sizes, naming constraints, and API pagination limits.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

The following limits apply to Agent Memory operations.

| Feature                    | Limit                      |
| -------------------------- | -------------------------- |
| Messages per ingest() call | 500                        |
| Message content size       | 32 KB (32,768 bytes UTF-8) |
| Recall query size          | 1 KB (1,024 bytes UTF-8)   |
| Session ID length          | 64 characters              |
| Profile name length        | 100 characters             |
| Namespace name length      | 32 characters              |
| List API page size         | 1 to 1,000 (default: 20)   |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/platform/limits/#page","headline":"Limits · Cloudflare Agent Memory docs","description":"Review Agent Memory platform limits, including message sizes, naming constraints, and API pagination limits.","url":"https://developers.cloudflare.com/agent-memory/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-memory/","name":"Agent Memory"}},{"@type":"ListItem","position":3,"item":{"@id":"/agent-memory/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/agent-memory/platform/limits/","name":"Limits"}}]}
```
