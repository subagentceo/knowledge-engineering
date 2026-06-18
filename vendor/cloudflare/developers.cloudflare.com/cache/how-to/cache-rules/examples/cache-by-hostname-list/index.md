---
title: Cache everything for hostnames in a list
description: Cache everything for hostnames in a list
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache everything for hostnames in a list

Cache everything for hostnames in a list

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to cache everything for hostnames that match a [custom hostname list](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#lists-with-hostnames):

* **When incoming requests match**: Custom filter expression  
   * Using the Expression Builder:  
   `Hostname is in list "my_hostnames"`  
   * Using the Expression Editor:  
   `(http.host in $my_hostnames)`
* **Then**:  
   * **Cache eligibility**: Eligible for cache

Note

The **is in list** operator requires an Enterprise plan. You must first [create a hostname list](https://developers.cloudflare.com/waf/tools/lists/create-dashboard/) in your account before you can reference it in a cache rule expression.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-by-hostname-list/#page","headline":"Cache everything for hostnames in a list · Cloudflare Cache (CDN) docs","description":"Cache everything for hostnames in a list","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-by-hostname-list/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/examples/","name":"Examples"}},{"@type":"ListItem","position":6,"item":{"@id":"/cache/how-to/cache-rules/examples/cache-by-hostname-list/","name":"Cache everything for hostnames in a list"}}]}
```
