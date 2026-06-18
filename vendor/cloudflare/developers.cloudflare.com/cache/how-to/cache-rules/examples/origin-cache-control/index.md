---
title: Origin Cache Control
description: Origin Cache Control
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Origin Cache Control

Origin Cache Control

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression  
   * Using the Expression Builder:  
   `Hostname contains "example.com"`  
   * Using the Expression Editor:  
   `(http.host contains "example.com")`
* **Then**:  
   * **Cache eligibility**: Eligible for cache  
   * **Setting**: Origin Cache Control  
         * **Enable Origin Cache Control**: Off

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/origin-cache-control/#page","headline":"Origin Cache Control · Cloudflare Cache (CDN) docs","description":"Origin Cache Control","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/origin-cache-control/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/examples/","name":"Examples"}},{"@type":"ListItem","position":6,"item":{"@id":"/cache/how-to/cache-rules/examples/origin-cache-control/","name":"Origin Cache Control"}}]}
```
