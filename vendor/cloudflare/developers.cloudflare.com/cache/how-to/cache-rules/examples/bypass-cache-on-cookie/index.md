---
title: Bypass Cache on Cookie
description: Bypass Cache on Cookie
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bypass Cache on Cookie

Bypass Cache on Cookie

Note

If you are migrating from Page Rules and you want to keep Page Rules behavior, you need to create two specific rules before creating this rule. For more details refer to [Migration from Page Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/).

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to bypass cache for requests containing cookie `test_cookie` for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression  
   * Using the Expression Builder:  
   `Hostname contains "example.com" AND Cookie contains "test-cookie"`  
   * Using the Expression Editor:  
   `(http.host contains "example.com" and http.cookie contains "test-cookie")`
* **Then**:  
   * **Cache eligibility**: Bypass cache

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/#page","headline":"Bypass Cache on Cookie · Cloudflare Cache (CDN) docs","description":"Bypass Cache on Cookie","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/examples/","name":"Examples"}},{"@type":"ListItem","position":6,"item":{"@id":"/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/","name":"Bypass Cache on Cookie"}}]}
```
