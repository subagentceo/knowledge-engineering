---
title: Cache
description: Control reading and writing from the Cloudflare global network cache.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache

## Background

The [Cache API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Cache) allows fine grained control of reading and writing from the [Cloudflare global network ↗](https://www.cloudflare.com/network/) cache.

The Cache API is available globally but the contents of the cache do not replicate outside of the originating data center. A `GET /users` response can be cached in the originating data center, but will not exist in another data center unless it has been explicitly created.

Tiered caching

The `cache.put` method is not compatible with tiered caching. Refer to [Cache API](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#cache-api) for more information. To perform tiered caching, use the [fetch API](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#interact-with-the-cloudflare-cache).

Workers deployed to custom domains have access to functional `cache` operations. So do [Pages functions](https://developers.cloudflare.com/pages/functions/), whether attached to custom domains or `*.pages.dev` domains.

However, any Cache API operations in the Cloudflare Workers dashboard editor and [Playground](https://developers.cloudflare.com/workers/playground/) previews will have no impact. For Workers fronted by [Cloudflare Access ↗](https://www.cloudflare.com/teams/access/), the Cache API is not currently available.

Note

This individualized zone cache object differs from Cloudflare’s Global CDN. For details, refer to [How the cache works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

---

## Accessing Cache

The `caches.default` API is strongly influenced by the web browsers’ Cache API, but there are some important differences. For instance, Cloudflare Workers runtime exposes a single global cache object.

JavaScript

```

let cache = caches.default;

await cache.match(request);


```

You may create and manage additional Cache instances via the [caches.open ↗](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) method.

JavaScript

```

let myCache = await caches.open('custom:cache');

await myCache.match(request);


```

---

## Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

* `Cache-Control`  
   * Controls caching directives. This is consistent with [Cloudflare Cache-Control Directives](https://developers.cloudflare.com/cache/concepts/cache-control#cache-control-directives). Refer to [Edge TTL](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code#edge-ttl) for a list of HTTP response codes and their TTL when `Cache-Control` directives are not present.
* `Cache-Tag`  
   * Allows resource purging by tag(s) later.
* `ETag`  
   * Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
* `Expires` string  
   * A string that specifies when the resource becomes invalid.
* `Last-Modified`  
   * Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

This differs from the web browser Cache API as they do not honor any headers on the request or response.

Note

Responses with `Set-Cookie` headers are never cached, because this sometimes indicates that the response contains unique data. To store a response with a `Set-Cookie` header, either delete that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.

Use the `Cache-Control` method to store the response without the `Set-Cookie` header.

---

## Methods

### `Put`

JavaScript

```

cache.put(request, response);


```

* `put(request, response)` : Promise  
   * Attempts to add a response to the cache, using the given request as the key. Returns a promise that resolves to `undefined` regardless of whether the cache successfully stored the response.

Note

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

#### Parameters

* `request` string | Request  
   * Either a string or a [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object to serve as the key. If a string is passed, it is interpreted as the URL for a new Request object.
* `response` Response  
   * A [Response](https://developers.cloudflare.com/workers/runtime-apis/response/) object to store under the given key.

#### Invalid parameters

`cache.put` will throw an error if:

* The `request` passed is a method other than `GET`.
* The `response` passed has a `status` of [206 Partial Content ↗](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-206-status-code/).
* The `response` passed contains the header `Vary: *`. The value of the `Vary` header is an asterisk (`*`). Refer to the [Cache API specification ↗](https://w3c.github.io/ServiceWorker/#cache-put) for more information.

#### Errors

`cache.put` returns a `413` error if `Cache-Control` instructs not to cache or if the response is too large.

Note

`cache.put` will silently reject a `301` or `302` redirect response if both of the following are true:

1. The cache key does not include the query string (for example, a custom cache key set via Workers or Page Rules that strips the query string).
2. The `Location` header in the redirect response contains the request's query string.

This is a cache-poisoning mitigation. To cache redirect responses with query strings, either include the query string in your cache key, or remove the query string from the `Location` header before calling `cache.put()`. This restriction does not apply on `.workers.dev` domains, which include the query string in the cache key by default.

### `Match`

JavaScript

```

cache.match(request, options);


```

* `match(request, options)` : Promise`<Response | undefined>`  
   * Returns a promise wrapping the response object keyed to that request.

Note

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

#### Parameters

* `request` string | Request  
   * The string or [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.
* `options`  
   * Can contain one possible property: `ignoreMethod` (Boolean). When `true`, the request is considered to be a `GET` request regardless of its actual value.

Unlike the browser Cache API, Cloudflare Workers do not support the `ignoreSearch` or `ignoreVary` options on `match()`. You can accomplish this behavior by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

* `Range`  
   * Results in a `206` response if a matching response with a Content-Length header is found. Your Cloudflare cache always respects range requests, even if an `Accept-Ranges` header is on the response.
* `If-Modified-Since`  
   * Results in a `304` response if a matching response is found with a `Last-Modified` header with a value before the time specified in `If-Modified-Since`.
* `If-None-Match`  
   * Results in a `304` response if a matching response is found with an `ETag` header with a value that matches a value in `If-None-Match`.

Note

`cache.match()` never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns is fulfilled with `undefined`.

#### Errors

`cache.match` generates a `504` error response when the requested content is missing or expired. The Cache API does not expose this `504` directly to the Worker script, instead returning `undefined`. Nevertheless, the underlying `504` is still visible in Cloudflare Logs.

If you use Cloudflare Logs, you may see these `504` responses with the `RequestSource` of `edgeWorkerCacheAPI`. Again, these are expected if the cached asset was missing or expired. Note that `edgeWorkerCacheAPI` requests are already filtered out in other views, such as Cache Analytics. To filter out these requests or to filter requests by end users of your website only, refer to [Filter end users](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/#filter-end-users).

### `Delete`

JavaScript

```

cache.delete(request, options);


```

* `delete(request, options)` : Promise`<boolean>`

Deletes the `Response` object from the cache and returns a `Promise` for a Boolean response:

* `true`: The response was cached but is now deleted
* `false`: The response was not in the cache at the time of deletion.

Global purges

The `cache.delete` method only purges content of the cache in the data center that the Worker was invoked. For global purges, refer to [Purging assets stored with the Cache API](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#purge-assets-stored-with-the-cache-api).

#### Parameters

* `request` string | Request  
   * The string or [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.
* `options` object  
   * Can contain one possible property: `ignoreMethod` (Boolean). Consider the request method a GET regardless of its actual value.

---

## Related resources

* [How the cache works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/)
* [Example: Cache using fetch()](https://developers.cloudflare.com/workers/examples/cache-using-fetch/)
* [Example: using the Cache API](https://developers.cloudflare.com/workers/examples/cache-api/)
* [Example: caching POST requests](https://developers.cloudflare.com/workers/examples/cache-post-request/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/cache/#page","headline":"Cache · Cloudflare Workers docs","description":"Control reading and writing from the Cloudflare global network cache.","url":"https://developers.cloudflare.com/workers/runtime-apis/cache/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/cache/","name":"Cache"}}]}
```
