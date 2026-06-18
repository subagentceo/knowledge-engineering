---
title: ​Purge everything
description: Purge all cached content for your entire zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ​Purge everything

To maintain optimal site performance, Cloudflare strongly recommends using single-file (by URL) purging instead of a complete cache purge.

Purging everything instantly clears all resources from your CDN cache in all Cloudflare data centers. Each new request for a purged resource returns to your origin server to validate the resource. If Cloudflare cannot validate the resource, Cloudflare fetches the latest version from the origin server and replaces the cached version. When a site with heavy traffic contains a lot of assets, requests to your origin server can increase substantially and result in slow site performance.

1. In the Cloudflare dashboard, go to the **Configuration** page.  
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Purge Cache**, select **Purge Everything**. A warning window appears.
3. If you agree, select **Purge Everything**.

Note

When purging everything for a non-production cache environment, all files for that specific cache environment will be purged. However, when purging everything for the production environment, all files will be purged across all environments.

For information on rate limits, refer to the [Availability and limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits) section.

## Resulting cache status

Purge Everything invalidates the resource, resulting in the `CF-Cache-Status` header indicating [EXPIRED](https://developers.cloudflare.com/cache/concepts/cache-responses/#expired) for subsequent requests.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/#page","headline":"​Purge everything · Cloudflare Cache (CDN) docs","description":"Purge all cached content for your entire zone.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge-everything/","name":"​Purge everything"}}]}
```
