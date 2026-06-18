---
title: Build a counter
description: Build a counter using Durable Objects and Workers with RPC methods.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a counter

**Last reviewed:**  almost 3 years ago 

Build a counter using Durable Objects and Workers with RPC methods.

This example shows how to build a counter using Durable Objects and Workers with [RPC methods](https://developers.cloudflare.com/workers/runtime-apis/rpc) that can print, increment, and decrement a `name` provided by the URL query string parameter, for example, `?name=A`.

* [  JavaScript ](#tab-panel-8318)
* [  TypeScript ](#tab-panel-8319)
* [  Python ](#tab-panel-8320)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Worker

export default {

  async fetch(request, env) {

    let url = new URL(request.url);

    let name = url.searchParams.get("name");

    if (!name) {

      return new Response(

        "Select a Durable Object to contact by using" +

          " the `name` URL query string parameter, for example, ?name=A",

      );

    }


    // A stub is a client Object used to send messages to the Durable Object.

    let stub = env.COUNTERS.getByName(name);


    // Send a request to the Durable Object using RPC methods, then await its response.

    let count = null;

    switch (url.pathname) {

      case "/increment":

        count = await stub.increment();

        break;

      case "/decrement":

        count = await stub.decrement();

        break;

      case "/":

        // Serves the current value.

        count = await stub.getCounterValue();

        break;

      default:

        return new Response("Not found", { status: 404 });

    }


    return new Response(`Durable Object '${name}' count: ${count}`);

  },

};


// Durable Object

export class Counter extends DurableObject {

  async getCounterValue() {

    let value = (await this.ctx.storage.get("value")) || 0;

    return value;

  }


  async increment(amount = 1) {

    let value = (await this.ctx.storage.get("value")) || 0;

    value += amount;

    // You do not have to worry about a concurrent request having modified the value in storage.

    // "input gates" will automatically protect against unwanted concurrency.

    // Read-modify-write is safe.

    await this.ctx.storage.put("value", value);

    return value;

  }


  async decrement(amount = 1) {

    let value = (await this.ctx.storage.get("value")) || 0;

    value -= amount;

    await this.ctx.storage.put("value", value);

    return value;

  }

}


```

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export interface Env {

  COUNTERS: DurableObjectNamespace<Counter>;

}


// Worker

export default {

  async fetch(request, env) {

    let url = new URL(request.url);

    let name = url.searchParams.get("name");

    if (!name) {

      return new Response(

        "Select a Durable Object to contact by using" +

          " the `name` URL query string parameter, for example, ?name=A",

      );

    }


    // A stub is a client Object used to send messages to the Durable Object.

    let stub = env.COUNTERS.get(name);


    let count = null;

    switch (url.pathname) {

      case "/increment":

        count = await stub.increment();

        break;

      case "/decrement":

        count = await stub.decrement();

        break;

      case "/":

        // Serves the current value.

        count = await stub.getCounterValue();

        break;

      default:

        return new Response("Not found", { status: 404 });

    }


    return new Response(`Durable Object '${name}' count: ${count}`);

  },

} satisfies ExportedHandler<Env>;


// Durable Object

export class Counter extends DurableObject {

  async getCounterValue() {

    let value = (await this.ctx.storage.get("value")) || 0;

    return value;

  }


  async increment(amount = 1) {

    let value: number = (await this.ctx.storage.get("value")) || 0;

    value += amount;

    // You do not have to worry about a concurrent request having modified the value in storage.

    // "input gates" will automatically protect against unwanted concurrency.

    // Read-modify-write is safe.

    await this.ctx.storage.put("value", value);

    return value;

  }


  async decrement(amount = 1) {

    let value: number = (await this.ctx.storage.get("value")) || 0;

    value -= amount;

    await this.ctx.storage.put("value", value);

    return value;

  }

}


```

Python

```

from workers import DurableObject, Response, WorkerEntrypoint

from urllib.parse import urlparse, parse_qs


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    parsed_url = urlparse(request.url)

    query_params = parse_qs(parsed_url.query)

    name = query_params.get('name', [None])[0]


    if not name:

      return Response(

        "Select a Durable Object to contact by using"

        + " the `name` URL query string parameter, for example, ?name=A"

      )


    # A stub is a client Object used to send messages to the Durable Object.

    stub = self.env.COUNTERS.getByName(name)


    # Send a request to the Durable Object using RPC methods, then await its response.

    count = None


    if parsed_url.path == "/increment":

      count = await stub.increment()

    elif parsed_url.path == "/decrement":

      count = await stub.decrement()

    elif parsed_url.path == "" or parsed_url.path == "/":

      # Serves the current value.

      count = await stub.getCounterValue()

    else:

      return Response("Not found", status=404)


    return Response(f"Durable Object '{name}' count: {count}")


# Durable Object

class Counter(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)


  async def getCounterValue(self):

    value = await self.ctx.storage.get("value")

    return value if value is not None else 0


  async def increment(self, amount=1):

    value = await self.ctx.storage.get("value")

    value = (value if value is not None else 0) + amount

    # You do not have to worry about a concurrent request having modified the value in storage.

    # "input gates" will automatically protect against unwanted concurrency.

    # Read-modify-write is safe.

    await self.ctx.storage.put("value", value)

    return value


  async def decrement(self, amount=1):

    value = await self.ctx.storage.get("value")

    value = (value if value is not None else 0) - amount

    await self.ctx.storage.put("value", value)

    return value


```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-8321)
* [  wrangler.toml ](#tab-panel-8322)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-counter",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "COUNTERS",

        "class_name": "Counter"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "Counter"

      ]

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-counter"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "COUNTERS"

class_name = "Counter"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Counter" ]


```

### Related resources

* [Workers RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/)
* [Durable Objects: Easy, Fast, Correct — Choose three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/build-a-counter/#page","headline":"Build a counter · Cloudflare Durable Objects docs","description":"Build a counter using Durable Objects and Workers with RPC methods.","url":"https://developers.cloudflare.com/durable-objects/examples/build-a-counter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/build-a-counter/","name":"Build a counter"}}]}
```
