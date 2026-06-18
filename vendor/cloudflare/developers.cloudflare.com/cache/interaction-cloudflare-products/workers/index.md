---
title: Customize cache behavior with Workers
description: Customize cache behavior with the Workers Cache API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize cache behavior with Workers

You can use [Workers](https://developers.cloudflare.com/workers/) to customize cache behavior on Cloudflare's network. Workers run as middleware in the request lifecycle — a single Worker handles both the request and response phases. When a request arrives, it hits the Worker before the cache is checked. The Worker can modify the incoming request (for example, rewrite the URL or add headers), then call `fetch()` to continue the request through the cache. When the response comes back — whether from cache or from the origin server — the Worker can also modify the response before it is sent to the visitor.

The diagram below illustrates a common interaction flow between Workers and Cache.

![Workers and cache flow example flow diagram.](https://developers.cloudflare.com/_astro/workers-cache-flow.DBEQRofC_ZP2BOU.webp) 
1. A visitor (a) requests a URL, and this request is directed to a Worker. The Worker can then interact with the request, either requesting the content from the origin server using (b) `fetch()` or sending a (f) response back to the visitor.
2. If the content is cached, the cache sends a (e) response back to the Worker, which can modify the response before sending a (f) response back to the visitor.
3. When using [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) with Workers, the cache rule must match the properties of the URL in the `fetch()` (b) request — such as headers, hostname, or URL path — not the original visitor URL/host (a). Otherwise, the rule will not be applied.

Here are a few examples of how Workers can be used to customize cache behavior:

* **Modify Response**: Adjust or enhance content after it is retrieved from the cache, ensuring that responses are up-to-date or tailored to specific needs.
* **Signed URLs**: Generate time-limited signed URLs to control access and enhance security.
* **Personalized Response**: Deliver personalized content based on user data while using cached resources to reduce the load on the origin server.
* **Reduce Latency**: Serve content from a data center close to the visitor, decreasing load times and improving the user experience.

You can also use [Snippets](https://developers.cloudflare.com/rules/snippets/) for lightweight modifications like header changes, redirects, and JWT validation without deploying a full Worker script. Snippets are included at no additional cost on all paid plans but have stricter resource limits (5 ms execution time, 32 KB package size).

Note

When using Workers and [O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) (a traffic routing configuration where requests pass through two Cloudflare zones), some caveats and limitations may apply.

## Cache features in Workers

Workers offer two ways to interact with the cache. Use `fetch()` when your Worker makes subrequests to an origin. Use the Cache API when your Worker generates responses without a backend origin.

* **fetch()**: When a Worker calls `fetch()`, the request passes through Cloudflare's cache and [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) (if enabled). You can control caching behavior by setting properties on the request's [cf object](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) — including time-to-live (TTL) values, custom cache keys, and cache headers. For more details, refer to [Cache using fetch](https://developers.cloudflare.com/workers/examples/cache-using-fetch/).
* **Cache API**: Allows you to programmatically store, retrieve, and delete responses in Cloudflare's cache using `caches.default` or `caches.open()`. Unlike `fetch()`, the Cache API only operates on the cache in the data center handling the current request — it does not interact with Tiered Cache. Use the Cache API when you need to cache responses that did not come from an origin. For more details, refer to [Using the Cache API](https://developers.cloudflare.com/workers/examples/cache-api/).

To understand more about how Cache and Workers interact, refer to [Cache in Workers](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers/#page","headline":"Customize cache behavior with Workers · Cloudflare Cache (CDN) docs","description":"Customize cache behavior with the Workers Cache API.","url":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/workers/","name":"Customize cache behavior with Workers"}}]}
```
