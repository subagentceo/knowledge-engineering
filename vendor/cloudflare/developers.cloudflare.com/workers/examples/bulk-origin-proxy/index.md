---
title: Bulk origin override
description: Resolve requests to your domain to a set of proxy third-party origin URLs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bulk origin override

**Last reviewed:**  over 5 years ago 

Resolve requests to your domain to a set of proxy third-party origin URLs.

* [  JavaScript ](#tab-panel-11603)
* [  TypeScript ](#tab-panel-11604)
* [  Hono ](#tab-panel-11605)
* [  Python ](#tab-panel-11606)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * An object with different URLs to fetch

     * @param {Object} ORIGINS

     */

    const ORIGINS = {

      "starwarsapi.yourdomain.com": "swapi.dev",

      "google.yourdomain.com": "www.google.com",

    };


    const url = new URL(request.url);


    // Check if incoming hostname is a key in the ORIGINS object

    if (url.hostname in ORIGINS) {

      const target = ORIGINS[url.hostname];

      url.hostname = target;

      // If it is, proxy request to that third party origin

      return fetch(url.toString(), request);

    }

    // Otherwise, process request as normal

    return fetch(request);

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * An object with different URLs to fetch

     * @param {Object} ORIGINS

     */

    const ORIGINS = {

      "starwarsapi.yourdomain.com": "swapi.dev",

      "google.yourdomain.com": "www.google.com",

    };


    const url = new URL(request.url);


    // Check if incoming hostname is a key in the ORIGINS object

    if (url.hostname in ORIGINS) {

      const target = ORIGINS[url.hostname];

      url.hostname = target;

      // If it is, proxy request to that third party origin

      return fetch(url.toString(), request);

    }

    // Otherwise, process request as normal

    return fetch(request);

  },

} satisfies ExportedHandler;


```

TypeScript

```

import { Hono } from "hono";

import { proxy } from "hono/proxy";


// An object with different URLs to fetch

const ORIGINS: Record<string, string> = {

  "starwarsapi.yourdomain.com": "swapi.dev",

  "google.yourdomain.com": "www.google.com",

};


const app = new Hono();


app.all("*", async (c) => {

  const url = new URL(c.req.url);


  // Check if incoming hostname is a key in the ORIGINS object

  if (url.hostname in ORIGINS) {

    const target = ORIGINS[url.hostname];

    url.hostname = target;


    // If it is, proxy request to that third party origin

    return proxy(url, c.req.raw);

  }


  // Otherwise, process request as normal

  return proxy(c.req.raw);

});


export default app;


```

Python

```

from workers import WorkerEntrypoint

from js import fetch, URL


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # A dict with different URLs to fetch

        ORIGINS = {

          "starwarsapi.yourdomain.com": "swapi.dev",

          "google.yourdomain.com": "www.google.com",

        }


        url = URL.new(request.url)


        # Check if incoming hostname is a key in the ORIGINS object

        if url.hostname in ORIGINS:

            url.hostname = ORIGINS[url.hostname]

            # If it is, proxy request to that third party origin

            return fetch(url.toString(), request)


        # Otherwise, process request as normal

        return fetch(request)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/#page","headline":"Bulk origin override · Cloudflare Workers docs","description":"Resolve requests to your domain to a set of proxy third-party origin URLs.","url":"https://developers.cloudflare.com/workers/examples/bulk-origin-proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/bulk-origin-proxy/","name":"Bulk origin override"}}]}
```
