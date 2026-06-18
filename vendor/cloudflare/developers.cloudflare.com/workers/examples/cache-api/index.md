---
title: Using the Cache API
description: Use the Cache API to store responses in Cloudflare's cache.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using the Cache API

**Last reviewed:**  over 5 years ago 

Use the Cache API to store responses in Cloudflare's cache.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/cache-api)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11611)
* [  TypeScript ](#tab-panel-11612)
* [  Python ](#tab-panel-11613)
* [  Hono ](#tab-panel-11614)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const cacheUrl = new URL(request.url);


    // Construct the cache key from the cache URL

    const cacheKey = new Request(cacheUrl.toString(), request);

    const cache = caches.default;


    // Check whether the value is already available in the cache

    // if not, you will need to fetch it from origin, and store it in the cache

    let response = await cache.match(cacheKey);


    if (!response) {

      console.log(

        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`,

      );

      // If not in cache, get it from origin

      response = await fetch(request);


      // Must use Response constructor to inherit all of response's fields

      response = new Response(response.body, response);


      // Cache API respects Cache-Control headers. Setting s-maxage to 10

      // will limit the response to be in cache for 10 seconds max


      // Any changes made to the response here will be reflected in the cached value

      response.headers.append("Cache-Control", "s-maxage=10");


      ctx.waitUntil(cache.put(cacheKey, response.clone()));

    } else {

      console.log(`Cache hit for: ${request.url}.`);

    }

    return response;

  },

};


```

TypeScript

```

interface Env {}

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const cacheUrl = new URL(request.url);


    // Construct the cache key from the cache URL

    const cacheKey = new Request(cacheUrl.toString(), request);

    const cache = caches.default;


    // Check whether the value is already available in the cache

    // if not, you will need to fetch it from origin, and store it in the cache

    let response = await cache.match(cacheKey);


    if (!response) {

      console.log(

        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`,

      );

      // If not in cache, get it from origin

      response = await fetch(request);


      // Must use Response constructor to inherit all of response's fields

      response = new Response(response.body, response);


      // Cache API respects Cache-Control headers. Setting s-maxage to 10

      // will limit the response to be in cache for 10 seconds max


      // Any changes made to the response here will be reflected in the cached value

      response.headers.append("Cache-Control", "s-maxage=10");


      ctx.waitUntil(cache.put(cacheKey, response.clone()));

    } else {

      console.log(`Cache hit for: ${request.url}.`);

    }

    return response;

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import WorkerEntrypoint

from pyodide.ffi import create_proxy

from js import Response, Request, URL, caches, fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        cache_url = request.url


        # Construct the cache key from the cache URL

        cache_key = Request.new(cache_url, request)

        cache = caches.default


        # Check whether the value is already available in the cache

        # if not, you will need to fetch it from origin, and store it in the cache

        response = await cache.match(cache_key)


        if response is None:

            print(f"Response for request url: {request.url} not present in cache. Fetching and caching request.")

            # If not in cache, get it from origin

            response = await fetch(request)

            # Must use Response constructor to inherit all of response's fields

            response = Response.new(response.body, response)


            # Cache API respects Cache-Control headers. Setting s-max-age to 10

            # will limit the response to be in cache for 10 seconds s-maxage

            # Any changes made to the response here will be reflected in the cached value

            response.headers.append("Cache-Control", "s-maxage=10")

            self.ctx.waitUntil(create_proxy(cache.put(cache_key, response.clone())))

        else:

            print(f"Cache hit for: {request.url}.")

        return response


```

TypeScript

```

import { Hono } from "hono";

import { cache } from "hono/cache";


const app = new Hono();


// We leverage hono built-in cache helper here

app.get(

  "*",

  cache({

    cacheName: "my-cache",

    cacheControl: "max-age=3600", // 1 hour

  }),

);


// Add a route to handle the request if it's not in cache

app.get("*", (c) => {

  return c.text("Hello from Hono!");

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cache-api/#page","headline":"Using the Cache API · Cloudflare Workers docs","description":"Use the Cache API to store responses in Cloudflare's cache.","url":"https://developers.cloudflare.com/workers/examples/cache-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Caching","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/cache-api/","name":"Using the Cache API"}}]}
```
