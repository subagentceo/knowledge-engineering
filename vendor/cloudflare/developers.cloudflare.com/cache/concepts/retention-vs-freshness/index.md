---
title: Retention vs Freshness (TTL)
description: How cache retention and TTL freshness differ in Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Retention vs Freshness (TTL)

In the context of Cloudflare CDN (Content Delivery Network), retention and freshness refer to two separate but related concepts. For an object in cache, freshness is how long it should be considered valid without consulting its source, while retention refers to how long it stays in cache before being removed.

## Retention

When a resource is requested, Cloudflare caches it so that subsequent requests can be served without contacting the origin server. If a cached object is not requested again, it is eventually removed to make room for newer, more popular content. This removal process is called eviction.

Cloudflare uses a Least Recently Used (LRU) algorithm to decide which objects to evict when the cache is full. An object's retention period is how long it stays in cache before being evicted. Retention is determined by the object's relative popularity and the size of the cache, and is not configurable.

## Freshness (TTL)

Freshness, also known as Time to Live (TTL), determines how long a cache can use an object without checking with the origin again. For example, if an object has a TTL of five minutes, the cache serves it directly for five minutes after first receiving it. After five minutes, Cloudflare must check with the origin to confirm the object is still valid before serving it again. There are a few ways to configure TTLs for resources served through Cloudflare's CDN:

* Include [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/) or [CDN Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/) directives, like `max-age` or `s-maxage`, in the origin cache-control response header.
* Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) or [Workers](https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers/).

If an object in cache is no longer fresh, Cloudflare revalidates it with the origin. When [stale-while-revalidate](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation) is set, revalidation happens asynchronously at expiry — visitors continue to be served from cache while Cloudflare fetches a fresh copy in the background. Without this directive, incoming requests wait for the origin to respond before receiving content. The origin can either confirm the cached object is still valid (refreshing its TTL) or return a new version to replace it. Refer to [Revalidation](https://developers.cloudflare.com/cache/concepts/revalidation/) for details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/concepts/retention-vs-freshness/#page","headline":"Retention vs Freshness (TTL) · Cloudflare Cache (CDN) docs","description":"How cache retention and TTL freshness differ in Cloudflare.","url":"https://developers.cloudflare.com/cache/concepts/retention-vs-freshness/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/concepts/retention-vs-freshness/","name":"Retention vs Freshness (TTL)"}}]}
```
