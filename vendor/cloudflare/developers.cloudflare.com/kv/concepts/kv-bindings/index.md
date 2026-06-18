---
title: KV bindings
description: KV bindings connect a Cloudflare Worker to a KV namespace for reading and writing data.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# KV bindings

KV [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow for communication between a Worker and a KV namespace.

Configure KV bindings in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Access KV from Workers

A [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) is a key-value database replicated to Cloudflare's global network.

To connect to a KV namespace from within a Worker, you must define a binding that points to the namespace's ID.

The name of your binding does not need to match the KV namespace's name. Instead, the binding should be a valid JavaScript identifier, because the identifier will exist as a global variable within your Worker.

A KV namespace will have a name you choose (for example, `My tasks`), and an assigned ID (for example, `06779da6940b431db6e566b4846d64db`).

To execute your Worker, define the binding.

In the following example, the binding is called `TODO`. In the `kv_namespaces` portion of your Wrangler configuration file, add:

* [  wrangler.jsonc ](#tab-panel-8945)
* [  wrangler.toml ](#tab-panel-8946)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker",

  // ...

  "kv_namespaces": [

    {

      "binding": "TODO",

      "id": "06779da6940b431db6e566b4846d64db"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker"


[[kv_namespaces]]

binding = "TODO"

id = "06779da6940b431db6e566b4846d64db"


```

With this, the deployed Worker will have a `TODO` field in their environment object (the second parameter of the `fetch()` request handler). Any methods on the `TODO` binding will map to the KV namespace with an ID of `06779da6940b431db6e566b4846d64db` – which you called `My Tasks` earlier.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Get the value for the "to-do:123" key

    // NOTE: Relies on the `TODO` KV binding that maps to the "My Tasks" namespace.

    let value = await env.TODO.get("to-do:123");


    // Return the value, as is, for the Response

    return new Response(value);

  },

};


```

## Use KV bindings when developing locally

When you use Wrangler to develop locally with the `wrangler dev` command, Wrangler will default to using a local version of KV to avoid interfering with any of your live production data in KV. This means that reading keys that you have not written locally will return `null`.

To have `wrangler dev` connect to your Workers KV namespace running on Cloudflare's global network, set `"remote" : true` in the KV binding configuration. Refer to the [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) for more information.

* [  wrangler.jsonc ](#tab-panel-8947)
* [  wrangler.toml ](#tab-panel-8948)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker",

  // ...

  "kv_namespaces": [

    {

      "binding": "TODO",

      "id": "06779da6940b431db6e566b4846d64db"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker"


[[kv_namespaces]]

binding = "TODO"

id = "06779da6940b431db6e566b4846d64db"


```

## Access KV from Durable Objects and Workers using ES modules format

[Durable Objects](https://developers.cloudflare.com/durable-objects/) use ES modules format. Instead of a global variable, bindings are available as properties of the `env` parameter [passed to the constructor](https://developers.cloudflare.com/durable-objects/get-started/#2-write-a-durable-object-class).

An example might look like:

JavaScript

```

import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

  }


  async fetch(request) {

    const valueFromKV = await this.env.NAMESPACE.get("someKey");

    return new Response(valueFromKV);

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/concepts/kv-bindings/#page","headline":"KV bindings · Cloudflare Workers KV docs","description":"KV bindings connect a Cloudflare Worker to a KV namespace for reading and writing data.","url":"https://developers.cloudflare.com/kv/concepts/kv-bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/concepts/","name":"Key concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/concepts/kv-bindings/","name":"KV bindings"}}]}
```
