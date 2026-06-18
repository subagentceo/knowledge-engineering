---
title: KV
description: Specify KV namespaces to add to your environment as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# KV

* [KV Reference](https://developers.cloudflare.com/kv/api/)

## Namespaces

Specify KV namespaces to add to your environment as follows:

JavaScript

```

const mf = new Miniflare({

  kvNamespaces: ["TEST_NAMESPACE1", "TEST_NAMESPACE2"],

});


```

You can now access KV namespaces in your workers:

JavaScript

```

export default {

  async fetch(request, env) {

    return new Response(await env.TEST_NAMESPACE1.get("key"));

  },

};


```

Miniflare supports all KV operations and data types.

## Manipulating Outside Workers

For testing, it can be useful to put/get data from KV outside a worker. You can do this with the `getKVNamespace` method:

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async fetch(request, env, ctx) {

      const value = parseInt(await env.TEST_NAMESPACE.get("count")) + 1;

      await env.TEST_NAMESPACE.put("count", value.toString());

      return new Response(value.toString());

    },

  }

  `,

  kvNamespaces: ["TEST_NAMESPACE"],

});


const ns = await mf.getKVNamespace("TEST_NAMESPACE");

await ns.put("count", "1");


const res = await mf.dispatchFetch("http://localhost:8787/");

console.log(await res.text()); // 2

console.log(await ns.get("count")); // 2


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/#page","headline":"KV · Cloudflare Workers docs","description":"Specify KV namespaces to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/kv/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/storage/","name":"Storage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/storage/kv/","name":"KV"}}]}
```
