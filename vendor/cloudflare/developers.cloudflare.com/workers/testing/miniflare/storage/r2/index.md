---
title: R2
description: Specify R2 Buckets to add to your environment as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2

* [R2 Reference](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)

## Buckets

Specify R2 Buckets to add to your environment as follows:

JavaScript

```

const mf = new Miniflare({

  r2Buckets: ["BUCKET1", "BUCKET2"],

});


```

## Manipulating Outside Workers

For testing, it can be useful to put/get data from R2 storage outside a worker. You can do this with the `getR2Bucket` method:

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async fetch(request, env, ctx) {

      const object = await env.BUCKET.get("count");

      const value = parseInt(await object.text()) + 1;

      await env.BUCKET.put("count", value.toString());

      return new Response(value.toString());

    }

  }

  `,

  r2Buckets: ["BUCKET"],

});


const bucket = await mf.getR2Bucket("BUCKET");

await bucket.put("count", "1");


const res = await mf.dispatchFetch("http://localhost:8787/");

console.log(await res.text()); // 2

console.log(await (await bucket.get("count")).text()); // 2


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/r2/#page","headline":"R2 · Cloudflare Workers docs","description":"Specify R2 Buckets to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/storage/","name":"Storage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/storage/r2/","name":"R2"}}]}
```
