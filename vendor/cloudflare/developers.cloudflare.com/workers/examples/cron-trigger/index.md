---
title: Setting Cron Triggers
description: Set a Cron Trigger for your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setting Cron Triggers

**Last reviewed:**  almost 5 years ago 

Set a Cron Trigger for your Worker.

* [  JavaScript ](#tab-panel-11646)
* [  TypeScript ](#tab-panel-11647)
* [  Python ](#tab-panel-11648)
* [  Hono ](#tab-panel-11649)

JavaScript

```

export default {

  async scheduled(controller, env, ctx) {

    console.log("cron processed");

  },

};


```

TypeScript

```

interface Env {}

export default {

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    console.log("cron processed");

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def scheduled(self, controller, env, ctx):

        print("cron processed")


```

TypeScript

```

import { Hono } from "hono";


interface Env {}


// Create Hono app

const app = new Hono<{ Bindings: Env }>();


// Regular routes for normal HTTP requests

app.get("/", (c) => c.text("Hello World!"));


// Export both the app and a scheduled function

export default {

  // The Hono app handles regular HTTP requests

  fetch: app.fetch,


  // The scheduled function handles Cron triggers

  async scheduled(

    controller: ScheduledController,

    env: Env,

    ctx: ExecutionContext,

  ) {

    console.log("cron processed");


    // You could also perform actions like:

    // - Fetching data from external APIs

    // - Updating KV or Durable Object storage

    // - Running maintenance tasks

    // - Sending notifications

  },

};


```

## Set Cron Triggers in Wrangler

Refer to [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for more information on how to add a Cron Trigger.

If you are deploying with Wrangler, set the cron syntax (once per hour as shown below) by adding this to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11650)
* [  wrangler.toml ](#tab-panel-11651)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker",

  // ...

  "triggers": {

    "crons": [

      "0 * * * *"

    ]

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker"


[triggers]

crons = [ "0 * * * *" ]


```

You also can set a different Cron Trigger for each [environment](https://developers.cloudflare.com/workers/wrangler/environments/) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). You need to put the `[triggers]` table under your chosen environment. For example:

* [  wrangler.jsonc ](#tab-panel-11652)
* [  wrangler.toml ](#tab-panel-11653)

JSONC

```

{

  "env": {

    "dev": {

      "triggers": {

        "crons": [

          "0 * * * *"

        ]

      }

    }

  }

}


```

TOML

```

[env.dev.triggers]

crons = [ "0 * * * *" ]


```

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev). This will expose a `/__scheduled` (or `/cdn-cgi/handler/scheduled` for Python Workers) route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

Terminal window

```

npx wrangler dev --test-scheduled


curl "http://localhost:8787/__scheduled?cron=0+*+*+*+*"


curl "http://localhost:8787/cdn-cgi/handler/scheduled?cron=*+*+*+*+*" # Python Workers


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cron-trigger/#page","headline":"Setting Cron Triggers · Cloudflare Workers docs","description":"Set a Cron Trigger for your Worker.","url":"https://developers.cloudflare.com/workers/examples/cron-trigger/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/cron-trigger/","name":"Setting Cron Triggers"}}]}
```
