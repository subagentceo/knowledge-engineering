---
title: Durable Objects
description: Specify Durable Objects to add to your environment as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Objects

* [Durable Objects Reference](https://developers.cloudflare.com/durable-objects/api/)
* [Using Durable Objects](https://developers.cloudflare.com/durable-objects/)

## Objects

Specify Durable Objects to add to your environment as follows:

JavaScript

```

const mf = new Miniflare({

  modules: true,

  script: `

  export class Object1 {

    async fetch(request) {

      ...

    }

  }

  export default {

    fetch(request) {

      ...

    }

  }

  `,

  durableObjects: {

    // Note Object1 is exported from main (string) script

    OBJECT1: "Object1",

  },

});


```

## Persistence

By default, Durable Object data is stored in memory. It will persist between reloads, but not different `Miniflare` instances. To enable persistence to the file system, specify the Durable Object persistence option:

JavaScript

```

const mf = new Miniflare({

  durableObjectsPersist: true, // Defaults to ./.mf/do

  durableObjectsPersist: "./data", // Custom path

});


```

## Manipulating Outside Workers

For testing, it can be useful to make requests to your Durable Objects from outside a worker. You can do this with the `getDurableObjectNamespace` method.

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  modules: true,

  durableObjects: { TEST_OBJECT: "TestObject" },

  script: `

  export class TestObject {

    constructor(state) {

      this.storage = state.storage;

    }


    async fetch(request) {

      const url = new URL(request.url);

      if (url.pathname === "/put") await this.storage.put("key", 1);

      return new Response((await this.storage.get("key")).toString());

    }

  }


  export default {

    async fetch(request, env) {

      const stub = env.TEST_OBJECT.getByName("test");

      return stub.fetch(request);

    }

  }

  `,

});


const ns = await mf.getDurableObjectNamespace("TEST_OBJECT");

const stub = ns.getByName("test");

const doRes = await stub.fetch("http://localhost:8787/put");

console.log(await doRes.text()); // "1"


const res = await mf.dispatchFetch("http://localhost:8787/");

console.log(await res.text()); // "1"


```

## Using a Class Exported by Another Script

Miniflare supports the `script_name` option for accessing Durable Objects exported by other scripts. This requires mounting the other worker as described in [🔌 Multiple Workers](https://developers.cloudflare.com/workers/testing/miniflare/core/multiple-workers).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/#page","headline":"Durable Objects · Cloudflare Workers docs","description":"Specify Durable Objects to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/storage/","name":"Storage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/storage/durable-objects/","name":"Durable Objects"}}]}
```
