---
title: Development Mode
description: Bypass the cache temporarily with Development Mode.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Development Mode

Development Mode temporarily suspends Cloudflare's edge caching and [Polish](https://developers.cloudflare.com/images/polish/) features for three hours unless disabled beforehand. Development Mode allows customers to immediately observe changes to their [cacheable content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions) like images, CSS, or JavaScript.

Note

To bypass cache for longer than three hours, use bypass cache in [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache).

## Enable Development Mode

Development Mode temporarily bypasses Cloudflare's cache and does not purge cached files. To instantly purge your Cloudflare cache, refer to [purge cache](https://developers.cloudflare.com/cache/how-to/purge-cache/).

1. In the Cloudflare dashboard, go to the **Configuration** page.  
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Toggle **Development Mode** to **On**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/reference/development-mode/#page","headline":"Development Mode · Cloudflare Cache (CDN) docs","description":"Bypass the cache temporarily with Development Mode.","url":"https://developers.cloudflare.com/cache/reference/development-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/reference/development-mode/","name":"Development Mode"}}]}
```
