---
title: HTTP
description: Facilitate Worker-to-Worker communication by forwarding Request objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP

Worker A that declares a Service binding to Worker B can forward a [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object to Worker B, by calling the `fetch()` method that is exposed on the binding object.

For example, consider the following Worker that implements a [fetch() handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/):

* [  wrangler.jsonc ](#tab-panel-11944)
* [  wrangler.toml ](#tab-panel-11945)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_b",

  "main": "./src/workerB.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_b"

main = "./src/workerB.js"


```

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response("Hello World!");

  }

}


```

The following Worker declares a binding to the Worker above:

* [  wrangler.jsonc ](#tab-panel-11946)
* [  wrangler.toml ](#tab-panel-11947)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_a",

  "main": "./src/workerA.js",

  "services": [

    {

      "binding": "WORKER_B",

      "service": "worker_b"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_a"

main = "./src/workerA.js"


[[services]]

binding = "WORKER_B"

service = "worker_b"


```

And then can forward a request to it:

JavaScript

```

export default {

  async fetch(request, env) {

    return await env.WORKER_B.fetch(request);

  },

};


```

Note

If you construct a new request manually, rather than forwarding an existing one, ensure that you provide a valid and fully-qualified URL with a hostname. For example:

JavaScript

```

export default {

  async fetch(request, env) {

    // provide a valid URL

    let newRequest = new Request("https://valid-url.com", { method: "GET" });

    let response = await env.WORKER_B.fetch(newRequest);

    return response;

  }

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#page","headline":"Service bindings - HTTP · Cloudflare Workers docs","description":"Facilitate Worker-to-Worker communication by forwarding Request objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/bindings/","name":"Bindings (env)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/bindings/service-bindings/","name":"Service bindings"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/runtime-apis/bindings/service-bindings/http/","name":"HTTP"}}]}
```
