---
title: Use Workers KV from Durable Objects
description: Read and write to/from KV within a Durable Object
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Workers KV from Durable Objects

**Last reviewed:**  almost 3 years ago 

Read and write to/from Workers KV within a Durable Object

The following Worker script shows you how to configure a Durable Object to read from and/or write to a [Workers KV namespace](https://developers.cloudflare.com/kv/concepts/how-kv-works/). This is useful when using a Durable Object to coordinate between multiple clients, and allows you to serialize writes to KV and/or broadcast a single read from KV to hundreds or thousands of clients connected to a single Durable Object [using WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Prerequisites:

* A [KV namespace](https://developers.cloudflare.com/kv/api/) created via the Cloudflare dashboard or the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
* A [configured binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) for the `kv_namespace` in the Cloudflare dashboard or Wrangler file.
* A [Durable Object namespace binding](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects).

Configure your Wrangler file as follows:

* [  wrangler.jsonc ](#tab-panel-8355)
* [  wrangler.toml ](#tab-panel-8356)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "main": "src/index.ts",

  "kv_namespaces": [

    {

      "binding": "YOUR_KV_NAMESPACE",

      "id": "<id_of_your_namespace>"

    }

  ],

  "durable_objects": {

    "bindings": [

      {

        "name": "YOUR_DO_CLASS",

        "class_name": "YourDurableObject"

      }

    ]

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

main = "src/index.ts"


[[kv_namespaces]]

binding = "YOUR_KV_NAMESPACE"

id = "<id_of_your_namespace>"


[[durable_objects.bindings]]

name = "YOUR_DO_CLASS"

class_name = "YourDurableObject"


```

* [  TypeScript ](#tab-panel-8353)
* [  Python ](#tab-panel-8354)

TypeScript

```

import { DurableObject } from "cloudflare:workers";


interface Env {

  YOUR_KV_NAMESPACE: KVNamespace;

  YOUR_DO_CLASS: DurableObjectNamespace;

}


export default {

  async fetch(req: Request, env: Env): Promise<Response> {

    // Assume each Durable Object is mapped to a roomId in a query parameter

    // In a production application, this will likely be a roomId defined by your application

    // that you validate (and/or authenticate) first.

    let url = new URL(req.url);

    let roomIdParam = url.searchParams.get("roomId");


    if (roomIdParam) {

      // Get a stub that allows you to call that Durable Object

      let durableObjectStub = env.YOUR_DO_CLASS.getByName(roomIdParam);


      // Pass the request to that Durable Object and await the response

      // This invokes the constructor once on your Durable Object class (defined further down)

      // on the first initialization, and the fetch method on each request.

      //

      // You could pass the original Request to the Durable Object's fetch method

      // or a simpler URL with just the roomId.

      let response = await durableObjectStub.fetch(`http://do/${roomId}`);


      // This would return the value you read from KV *within* the Durable Object.

      return response;

    }

  },

};


export class YourDurableObject extends DurableObject {

  constructor(

    public state: DurableObjectState,

    env: Env,

  ) {

    super(state, env);

  }


  async fetch(request: Request) {

    // Error handling elided for brevity.

    // Write to KV

    await this.env.YOUR_KV_NAMESPACE.put("some-key");


    // Fetch from KV

    let val = await this.env.YOUR_KV_NAMESPACE.get("some-other-key");


    return Response.json(val);

  }

}


```

Python

```

from workers import DurableObject, Response, WorkerEntrypoint

from urllib.parse import urlparse, parse_qs


class Default(WorkerEntrypoint):

  async def fetch(self, req):

    # Assume each Durable Object is mapped to a roomId in a query parameter

    # In a production application, this will likely be a roomId defined by your application

    # that you validate (and/or authenticate) first.

    url = req.url

    parsed_url = urlparse(url)

    room_id_param = parse_qs(parsed_url.query).get('roomId', [None])[0]


    if room_id_param:

      # Get a stub that allows you to call that Durable Object

      durable_object_stub = self.env.YOUR_DO_CLASS.getByName(room_id_param)


      # Pass the request to that Durable Object and await the response

      # This invokes the constructor once on your Durable Object class (defined further down)

      # on the first initialization, and the fetch method on each request.

      #

      # You could pass the original Request to the Durable Object's fetch method

      # or a simpler URL with just the roomId.

      response = await durable_object_stub.fetch(f"http://do/{room_id_param}")


      # This would return the value you read from KV *within* the Durable Object.

      return response


class YourDurableObject(DurableObject):

  def __init__(self, state, env):

    super().__init__(state, env)


  async def fetch(self, request):

    # Error handling elided for brevity.

    # Write to KV

    await self.env.YOUR_KV_NAMESPACE.put("some-key", "some-value")


    # Fetch from KV

    val = await self.env.YOUR_KV_NAMESPACE.get("some-other-key")


    return Response.json(val)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/#page","headline":"Durable Objects - Use KV within Durable Objects · Cloudflare Durable Objects docs","description":"Read and write to/from KV within a Durable Object","url":"https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/use-kv-from-durable-objects/","name":"Use Workers KV from Durable Objects"}}]}
```
