---
title: Web Standards
description: When using the API, Miniflare allows you to substitute custom Responses for
fetch() calls using undici's
MockAgent API.
This is useful for testing Workers that make HTTP requests to other services. To
enable fetch mocking, create a
MockAgent
using the createFetchMock() function, then set this using the fetchMock
option.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Web Standards

* [Web Standards Reference](https://developers.cloudflare.com/workers/runtime-apis/web-standards)
* [Encoding Reference](https://developers.cloudflare.com/workers/runtime-apis/encoding)
* [Fetch Reference](https://developers.cloudflare.com/workers/runtime-apis/fetch)
* [Request Reference](https://developers.cloudflare.com/workers/runtime-apis/request)
* [Response Reference](https://developers.cloudflare.com/workers/runtime-apis/response)
* [Streams Reference](https://developers.cloudflare.com/workers/runtime-apis/streams)
* [Web Crypto Reference](https://developers.cloudflare.com/workers/runtime-apis/web-crypto)

## Mocking Outbound `fetch` Requests

When using the API, Miniflare allows you to substitute custom `Response`s for`fetch()` calls using `undici`'s[MockAgent API ↗](https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin). This is useful for testing Workers that make HTTP requests to other services. To enable `fetch` mocking, create a[MockAgent ↗](https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin)using the `createFetchMock()` function, then set this using the `fetchMock`option.

JavaScript

```

import { Miniflare, createFetchMock } from "miniflare";


// Create `MockAgent` and connect it to the `Miniflare` instance

const fetchMock = createFetchMock();

const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async fetch(request, env, ctx) {

      const res = await fetch("https://example.com/thing");

      const text = await res.text();

      return new Response(\`response:\${text}\`);

    }

  }

  `,

  fetchMock,

});


// Throw when no matching mocked request is found

// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentdisablenetconnect)

fetchMock.disableNetConnect();


// Mock request to https://example.com/thing

// (see https://undici.nodejs.org/#/docs/api/MockAgent?id=mockagentgetorigin)

const origin = fetchMock.get("https://example.com");

// (see https://undici.nodejs.org/#/docs/api/MockPool?id=mockpoolinterceptoptions)

origin

  .intercept({ method: "GET", path: "/thing" })

  .reply(200, "Mocked response!");


const res = await mf.dispatchFetch("http://localhost:8787/");

console.log(await res.text()); // "response:Mocked response!"


```

## Subrequests

Miniflare does not support limiting the amount of[subrequests](https://developers.cloudflare.com/workers/platform/limits#account-plan-limits). Please keep this in mind if you make a large amount of subrequests from your Worker.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/standards/#page","headline":"Web Standards · Cloudflare Workers docs","description":"When using the API, Miniflare allows you to substitute custom Responses for\nfetch() calls using undici's\nMockAgent API.\nThis is useful for testing Workers that make HTTP requests to other services. To\nenable fetch mocking, create a\nMockAgent\nusing the createFetchMock() function, then set this using the fetchMock\noption.","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/standards/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/standards/","name":"Web Standards"}}]}
```
