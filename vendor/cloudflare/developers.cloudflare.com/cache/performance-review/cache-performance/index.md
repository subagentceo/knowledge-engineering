---
title: Cache performance
description: Measure and improve cache performance for your site.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache performance

## Optimize cache ratios

Your cache ratio measures how often Cloudflare serves content from cache instead of contacting your origin server. A higher ratio means faster responses for visitors and less traffic to your origin.

Depending on the [cache status](https://developers.cloudflare.com/cache/concepts/cache-responses/) you receive, you can make modifications to improve your cache ratio.

* **Dynamic**: The resource was not eligible for caching. This is the default response for many file types including HTML. To cache additional content, refer to [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/).
* **Revalidated**: The resource was in cache but Cloudflare confirmed with your origin that it was still current before serving it. To address an atypical quantity of revalidated content, consider [increasing your Edge Cache TTLs](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) (how long Cloudflare considers cached content fresh before checking your origin).
* **Expired**: The cached resource's TTL elapsed before it was requested again. Consider [extending Edge Cache TTLs](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) for these resources via a Cache Rule, or configure your origin to return [revalidation headers](https://developers.cloudflare.com/cache/concepts/cache-control/) (`Last-Modified` or `ETag`) so Cloudflare can confirm content is still current without downloading it again.
* **Miss**: The resource was not found in cache and was served from your origin. Although tricky to optimize, there are a few potential remedies:  
   * [Enable Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache) to check an upper-tier Cloudflare data center before contacting your origin server.  
   * [Create a custom cache key](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/custom-cache-key/) so that multiple URLs match the same cached resource, for example by ignoring the query string.

## Troubleshoot cache performance with example reports

Use [Cache Analytics](https://developers.cloudflare.com/cache/performance-review/cache-analytics/) to identify cache performance issues. The following examples show how to filter for common problems and resolve them.

* Not caching HTML.  
   * Identify the issue: Select **Add filter** and select **Cache status equals Dynamic**.  
   * Resolution: Set a Cloudflare Cache Rule to [cache dynamic content](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-everything/).

Warning

This option caches all HTML regardless of the presence of dynamic content (content that changes per visitor, such as time of visit, location, or device). If you use this approach to cache pages containing dynamic content, visitors may receive information not intended for them. To avoid caching dynamic content, add a condition to the rule's matching criteria to exclude it. Some examples include:

* Checking for the presence of a cookie.
* Excluding requests that match known dynamic content file paths.
* Excluding requests with dynamic content extensions (or no extension).

* Short cache expiration TTL.  
   * Identify the issue: Select **Add filter** and select **Cache status equals Revalidated**.  
   * Resolution: [Increase Cloudflare's Edge Cache TTL via a Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/edge-ttl/).
* Need to enable Tiered Cache or custom cache key.  
   * Identify the issue: Select **Add filter** and select **Cache status equals Miss**.  
   * Resolution: [Enable Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache) or [create a custom cache key](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/custom-cache-key/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/performance-review/cache-performance/#page","headline":"Cache performance · Cloudflare Cache (CDN) docs","description":"Measure and improve cache performance for your site.","url":"https://developers.cloudflare.com/cache/performance-review/cache-performance/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/performance-review/","name":"Performance review"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/performance-review/cache-performance/","name":"Cache performance"}}]}
```
