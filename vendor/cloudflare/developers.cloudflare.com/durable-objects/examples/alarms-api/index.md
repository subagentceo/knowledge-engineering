---
title: Use the Alarms API
description: Use the Durable Objects Alarms API to batch requests to a Durable Object.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use the Alarms API

**Last reviewed:**  over 2 years ago 

Use the Durable Objects Alarms API to batch requests to a Durable Object.

This example implements an `alarm()` handler that allows batching of requests to a single Durable Object.

When a request is received and no alarm is set, it sets an alarm for 10 seconds in the future. The `alarm()` handler processes all requests received within that 10-second window.

If no new requests are received, no further alarms will be set until the next request arrives.

* [  JavaScript ](#tab-panel-8314)
* [  Python ](#tab-panel-8315)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Worker

export default {

  async fetch(request, env) {

    return await env.BATCHER.getByName("foo").fetch(request);

  },

};


// Durable Object

export class Batcher extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

    this.storage = ctx.storage;

    this.ctx.blockConcurrencyWhile(async () => {

      let vals = await this.storage.list({ reverse: true, limit: 1 });

      this.count = vals.size == 0 ? 0 : parseInt(vals.keys().next().value);

    });

  }


  async fetch(request) {

    this.count++;


    // If there is no alarm currently set, set one for 10 seconds from now

    // Any further POSTs in the next 10 seconds will be part of this batch.

    let currentAlarm = await this.storage.getAlarm();

    if (currentAlarm == null) {

      this.storage.setAlarm(Date.now() + 1000 * 10);

    }


    // Add the request to the batch.

    await this.storage.put(this.count, await request.text());

    return new Response(JSON.stringify({ queued: this.count }), {

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    });

  }


  async alarm() {

    let vals = await this.storage.list();

    await fetch("http://example.com/some-upstream-service", {

      method: "POST",

      body: Array.from(vals.values()),

    });

    await this.storage.deleteAll();

    this.count = 0;

  }

}


```

Python

```

from workers import DurableObject, Response, WorkerEntrypoint, fetch

import time


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    stub = self.env.BATCHER.getByName("foo")

    return await stub.fetch(request)


# Durable Object

class Batcher(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    self.storage = ctx.storage


    @self.ctx.blockConcurrencyWhile

    async def initialize():

      vals = await self.storage.list(reverse=True, limit=1)

      self.count = 0

      if len(vals) > 0:

          self.count = int(vals.keys().next().value)


  async def fetch(self, request):

    self.count += 1


    # If there is no alarm currently set, set one for 10 seconds from now

    # Any further POSTs in the next 10 seconds will be part of this batch.

    current_alarm = await self.storage.getAlarm()

    if current_alarm is None:

      self.storage.setAlarm(int(time.time() * 1000) + 1000 * 10)


    # Add the request to the batch.

    await self.storage.put(self.count, await request.text())

    return Response.json(

      {"queued": self.count}

    )


  async def alarm(self):

    vals = await self.storage.list()

    await fetch(

      "http://example.com/some-upstream-service",

      method="POST",

      body=list(vals.values())

    )

    await self.storage.deleteAll()

    self.count = 0


```

The `alarm()` handler will be called once every 10 seconds. If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine. Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-8316)
* [  wrangler.toml ](#tab-panel-8317)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "durable-object-alarm",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "BATCHER",

        "class_name": "Batcher"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "Batcher"

      ]

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "durable-object-alarm"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "BATCHER"

class_name = "Batcher"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Batcher" ]


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/alarms-api/#page","headline":"Use the Alarms API · Cloudflare Durable Objects docs","description":"Use the Durable Objects Alarms API to batch requests to a Durable Object.","url":"https://developers.cloudflare.com/durable-objects/examples/alarms-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/alarms-api/","name":"Use the Alarms API"}}]}
```
