---
title: Fetch Events
description: Dispatch and test HTTP fetch events in Miniflare for Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fetch Events

* [FetchEvent Reference](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/)

## HTTP Requests

Whenever an HTTP request is made, a `Request` object is dispatched to your worker, then the generated `Response` is returned. The`Request` object will include a[cf object](https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties). Miniflare will log the method, path, status, and the time it took to respond.

If the Worker throws an error whilst generating a response, an error page containing the stack trace is returned instead.

## Dispatching Events

When using the API, the `dispatchFetch` function can be used to dispatch `fetch`events to your Worker. This can be used for testing responses. `dispatchFetch`has the same API as the regular `fetch` method: it either takes a `Request`object, or a URL and optional `RequestInit` object:

JavaScript

```

import { Miniflare, Request } from "miniflare";


const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async fetch(request, env, ctx) {

      const body = JSON.stringify({

        url: event.request.url,

        header: event.request.headers.get("X-Message"),

      });

      return new Response(body, {

        headers: { "Content-Type": "application/json" },

      });

    })

  }

  `,

});


let res = await mf.dispatchFetch("http://localhost:8787/");

console.log(await res.json()); // { url: "http://localhost:8787/", header: null }


res = await mf.dispatchFetch("http://localhost:8787/1", {

  headers: { "X-Message": "1" },

});

console.log(await res.json()); // { url: "http://localhost:8787/1", header: "1" }


res = await mf.dispatchFetch(

  new Request("http://localhost:8787/2", {

    headers: { "X-Message": "2" },

  }),

);

console.log(await res.json()); // { url: "http://localhost:8787/2", header: "2" }


```

When dispatching events, you are responsible for adding[CF-\* headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/) and the[cf object](https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties). This lets you control their values for testing:

JavaScript

```

const res = await mf.dispatchFetch("http://localhost:8787", {

  headers: {

    "CF-IPCountry": "GB",

  },

  cf: {

    country: "GB",

  },

});


```

## Upstream

Miniflare will call each `fetch` listener until a response is returned. If no response is returned, or an exception is thrown and `passThroughOnException()`has been called, the response will be fetched from the specified upstream instead:

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  script: `

  addEventListener("fetch", (event) => {

    event.passThroughOnException();

    throw new Error();

  });

  `,

  upstream: "https://miniflare.dev",

});

// If you don't use the same upstream URL when dispatching, Miniflare will

// rewrite it to match the upstream

const res = await mf.dispatchFetch("https://miniflare.dev/core/fetch");

console.log(await res.text()); // Source code of this page


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/fetch/#page","headline":"Fetch Events · Cloudflare Workers docs","description":"Dispatch and test HTTP fetch events in Miniflare for Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/fetch/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/fetch/","name":"Fetch Events"}}]}
```
