---
title: Edge Cache TTL
description: Edge Cache TTL
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Edge Cache TTL

Edge Cache TTL

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to adjust edge cache TTL for caching resources on Cloudflare edge to one day, for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression  
   * Using the Expression Builder:  
   `Hostname contains "example.com"`  
   * Using the Expression Editor:  
   `(http.host contains "example.com")`
* **Then**:  
   * **Cache eligibility**: Eligible for cache  
   * **Setting**: Edge TTL  
         * Ignore cache-control header and use this TTL  
                  * **Input time-to-live (TTL)**: _1 day_

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/edge-ttl/#page","headline":"Edge Cache TTL · Cloudflare Cache (CDN) docs","description":"Edge Cache TTL","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/edge-ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/examples/","name":"Examples"}},{"@type":"ListItem","position":6,"item":{"@id":"/cache/how-to/cache-rules/examples/edge-ttl/","name":"Edge Cache TTL"}}]}
```
