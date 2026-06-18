---
title: Use the Cache API
description: Store R2 objects in Cloudflare's cache using the Workers Cache API for faster retrieval.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use the Cache API

**Last reviewed:**  almost 4 years ago 

Use the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) to store R2 objects in Cloudflare's cache.

Note

You will need to [connect a custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) or [route](https://developers.cloudflare.com/workers/configuration/routing/routes/) to your Worker in order to use the Cache API. Cache API operations in the Cloudflare Workers dashboard editor, Playground previews, and any `*.workers.dev` deployments will have no impact.

JavaScript

```

export default {

  async fetch(request, env, context) {

    try {

      const url = new URL(request.url);


      // Construct the cache key from the cache URL

      const cacheKey = new Request(url.toString(), request);

      const cache = caches.default;


      // Check whether the value is already available in the cache

      // if not, you will need to fetch it from R2, and store it in the cache

      // for future access

      let response = await cache.match(cacheKey);


      if (response) {

        console.log(`Cache hit for: ${request.url}.`);

        return response;

      }


      console.log(

        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`

      );


      // If not in cache, get it from R2

      const objectKey = url.pathname.slice(1);

      const object = await env.MY_BUCKET.get(objectKey);

      if (object === null) {

        return new Response('Object Not Found', { status: 404 });

      }


      // Set the appropriate object headers

      const headers = new Headers();

      object.writeHttpMetadata(headers);

      headers.set('etag', object.httpEtag);


      // Cache API respects Cache-Control headers. Setting s-max-age to 10

      // will limit the response to be in cache for 10 seconds max

      // Any changes made to the response here will be reflected in the cached value

      headers.append('Cache-Control', 's-maxage=10');


      response = new Response(object.body, {

        headers,

      });


      // Store the fetched response as cacheKey

      // Use waitUntil so you can return the response without blocking on

      // writing to cache

      context.waitUntil(cache.put(cacheKey, response.clone()));


      return response;

    } catch (e) {

      return new Response('Error thrown ' + e.message);

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/cache-api/#page","headline":"Use the Cache API · Cloudflare R2 docs","description":"Store R2 objects in Cloudflare's cache using the Workers Cache API for faster retrieval.","url":"https://developers.cloudflare.com/r2/examples/cache-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/cache-api/","name":"Use the Cache API"}}]}
```
