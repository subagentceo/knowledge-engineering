---
title: Cache POST requests
description: Cache POST requests using the Cache API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache POST requests

**Last reviewed:**  over 4 years ago 

Cache POST requests using the Cache API.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/cache-post-request)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11615)
* [  TypeScript ](#tab-panel-11616)
* [  Python ](#tab-panel-11617)
* [  Hono ](#tab-panel-11618)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    async function sha256(message) {

      // encode as UTF-8

      const msgBuffer = await new TextEncoder().encode(message);

      // hash the message

      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

      // convert bytes to hex string

      return [...new Uint8Array(hashBuffer)]

        .map((b) => b.toString(16).padStart(2, "0"))

        .join("");

    }

    try {

      if (request.method.toUpperCase() === "POST") {

        const body = await request.clone().text();

        // Hash the request body to use it as a part of the cache key

        const hash = await sha256(body);

        const cacheUrl = new URL(request.url);

        // Store the URL in cache by prepending the body's hash

        cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash;

        // Convert to a GET to be able to cache

        const cacheKey = new Request(cacheUrl.toString(), {

          headers: request.headers,

          method: "GET",

        });


        const cache = caches.default;

        // Find the cache key in the cache

        let response = await cache.match(cacheKey);

        // Otherwise, fetch response to POST request from origin

        if (!response) {

          response = await fetch(request);

          ctx.waitUntil(cache.put(cacheKey, response.clone()));

        }

        return response;

      }

      return fetch(request);

    } catch (e) {

      return new Response("Error thrown " + e.message);

    }

  },

};


```

TypeScript

```

interface Env {}

export default {

  async fetch(request, env, ctx): Promise<Response> {

    async function sha256(message) {

      // encode as UTF-8

      const msgBuffer = await new TextEncoder().encode(message);

      // hash the message

      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

      // convert bytes to hex string

      return [...new Uint8Array(hashBuffer)]

        .map((b) => b.toString(16).padStart(2, "0"))

        .join("");

    }

    try {

      if (request.method.toUpperCase() === "POST") {

        const body = await request.clone().text();

        // Hash the request body to use it as a part of the cache key

        const hash = await sha256(body);

        const cacheUrl = new URL(request.url);

        // Store the URL in cache by prepending the body's hash

        cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash;

        // Convert to a GET to be able to cache

        const cacheKey = new Request(cacheUrl.toString(), {

          headers: request.headers,

          method: "GET",

        });


        const cache = caches.default;

        // Find the cache key in the cache

        let response = await cache.match(cacheKey);

        // Otherwise, fetch response to POST request from origin

        if (!response) {

          response = await fetch(request);

          ctx.waitUntil(cache.put(cacheKey, response.clone()));

        }

        return response;

      }

      return fetch(request);

    } catch (e) {

      return new Response("Error thrown " + e.message);

    }

  },

} satisfies ExportedHandler<Env>;


```

Python

```

import hashlib

from workers import WorkerEntrypoint

from pyodide.ffi import create_proxy

from js import fetch, URL, Headers, Request, caches


class Default(WorkerEntrypoint):

    async def fetch(self, request, _, ctx):

        if 'POST' in request.method:

            # Hash the request body to use it as a part of the cache key

            body = await request.clone().text()

            body_hash = hashlib.sha256(body.encode('UTF-8')).hexdigest()


            # Store the URL in cache by prepending the body's hash

            cache_url = URL.new(request.url)

            cache_url.pathname = "/posts" + cache_url.pathname + body_hash


            # Convert to a GET to be able to cache

            headers = Headers.new(dict(request.headers).items())

            cache_key = Request.new(cache_url.toString(), method='GET', headers=headers)


            # Find the cache key in the cache

            cache = caches.default

            response = await cache.match(cache_key)


            # Otherwise, fetch response to POST request from origin

            if response is None:

                response = await fetch(request)

                ctx.waitUntil(create_proxy(cache.put(cache_key, response.clone())))


            return response


        return fetch(request)


```

TypeScript

```

import { Hono } from "hono";

import { sha256 } from "hono/utils/crypto";


const app = new Hono();


// Middleware for caching POST requests

app.post("*", async (c) => {

  try {

    // Get the request body

    const body = await c.req.raw.clone().text();


    // Hash the request body to use it as part of the cache key

    const hash = await sha256(body);


    // Create the cache URL

    const cacheUrl = new URL(c.req.url);


    // Store the URL in cache by prepending the body's hash

    cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash;


    // Convert to a GET to be able to cache

    const cacheKey = new Request(cacheUrl.toString(), {

      headers: c.req.raw.headers,

      method: "GET",

    });


    const cache = caches.default;


    // Find the cache key in the cache

    let response = await cache.match(cacheKey);


    // If not in cache, fetch response to POST request from origin

    if (!response) {

      response = await fetch(c.req.raw);

      c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));

    }


    return response;

  } catch (e) {

    return c.text("Error thrown " + e.message, 500);

  }

});


// Handle all other HTTP methods

app.all("*", (c) => {

  return fetch(c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cache-post-request/#page","headline":"Cache POST requests · Cloudflare Workers docs","description":"Cache POST requests using the Cache API.","url":"https://developers.cloudflare.com/workers/examples/cache-post-request/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Caching","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/cache-post-request/","name":"Cache POST requests"}}]}
```
