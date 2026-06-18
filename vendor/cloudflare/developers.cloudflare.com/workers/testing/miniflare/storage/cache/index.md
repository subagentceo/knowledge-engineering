---
title: Cache
description: Access to the default cache is enabled by default:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache

* [Cache Reference](https://developers.cloudflare.com/workers/runtime-apis/cache)
* [How the Cache works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#cache-api)(note that cache using `fetch` is unsupported)

## Default Cache

Access to the default cache is enabled by default:

JavaScript

```

addEventListener("fetch", (e) => {

  e.respondWith(caches.default.match("http://miniflare.dev"));

});


```

## Named Caches

You can access a namespaced cache using `open`. Note that you cannot name your cache `default`, trying to do so will throw an error:

JavaScript

```

await caches.open("cache_name");


```

## Persistence

By default, cached data is stored in memory. It will persist between reloads, but not different `Miniflare` instances. To enable persistence to the file system, specify the cache persistence option:

JavaScript

```

const mf = new Miniflare({

  cachePersist: true, // Defaults to ./.mf/cache

  cachePersist: "./data", // Custom path

});


```

## Manipulating Outside Workers

For testing, it can be useful to put/match data from cache outside a Worker. You can do this with the `getCaches` method:

JavaScript

```

import { Miniflare, Response } from "miniflare";


const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async fetch(request) {

      const url = new URL(request.url);

      const cache = caches.default;

      if(url.pathname === "/put") {

        await cache.put("https://miniflare.dev/", new Response("1", {

          headers: { "Cache-Control": "max-age=3600" },

        }));

      }

      return cache.match("https://miniflare.dev/");

    }

  }

  `,

});

let res = await mf.dispatchFetch("http://localhost:8787/put");

console.log(await res.text()); // 1


const caches = await mf.getCaches(); // Gets the global caches object

const cachedRes = await caches.default.match("https://miniflare.dev/");

console.log(await cachedRes.text()); // 1


await caches.default.put(

  "https://miniflare.dev",

  new Response("2", {

    headers: { "Cache-Control": "max-age=3600" },

  }),

);

res = await mf.dispatchFetch("http://localhost:8787");

console.log(await res.text()); // 2


```

## Purging

You can programmatically purge all entries from a cache using the `purgeCache` method on the `Miniflare` instance. This is useful during development when cached assets need to be cleared without restarting the instance:

JavaScript

```

const mf = new Miniflare({ /* options */ });


// Purge the default cache and get the number of entries purged

const count = await mf.purgeCache();

console.log(`Purged ${count} entries`);


// Purge a specific named cache

await mf.purgeCache("my-named-cache");


```

## Disabling

Both default and named caches can be disabled with the `disableCache` option. When disabled, the caches will still be available in the sandbox, they just won't cache anything. This may be useful during development:

JavaScript

```

const mf = new Miniflare({

  cache: false,

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/#page","headline":"Cache · Cloudflare Workers docs","description":"Access to the default cache is enabled by default:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/cache/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/storage/","name":"Storage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/storage/cache/","name":"Cache"}}]}
```
