---
title: Dynamic Workers Starter
description: A starter template for deploying a Worker that loads and runs Dynamic Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dynamic Workers Starter

A [starter template ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers) for deploying a Worker that loads and runs [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/).

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers)

## What it does

This template demonstrates how to use the [Worker Loader API](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) to execute code at runtime. The host Worker exposes an `/api/run` endpoint that accepts code from the frontend, loads it into a sandboxed Dynamic Worker, and returns the result.

Use this pattern for AI agents that need to execute a snippet of code to complete an action.

## Configuration

Add a `worker_loaders` binding to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8427)
* [  wrangler.toml ](#tab-panel-8428)

JSONC

```

{

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ]

}


```

TOML

```

[[worker_loaders]]

binding = "LOADER"


```

## Loading and executing a Dynamic Worker

In this example:

* `env.LOADER.load()` creates a one-off dynamic isolate
* `globalOutbound: null` blocks all outbound network access from the Dynamic Worker

* [  JavaScript ](#tab-panel-8429)
* [  TypeScript ](#tab-panel-8430)

JavaScript

```

export default {

  async fetch(request, env) {

    const { code } = await request.json();


    const worker = env.LOADER.load({

      compatibilityDate: "2026-05-01",

      mainModule: "worker.js",

      modules: {

        "worker.js": code,

      },

      // Block all outbound network access

      globalOutbound: null,

    });


    const result = await worker.getEntrypoint().fetch(request);

    return result;

  },

};


```

TypeScript

```

export default {

  async fetch(request, env): Promise<Response> {

    const { code } = await request.json();


    const worker = env.LOADER.load({

      compatibilityDate: "2026-05-01",

      mainModule: "worker.js",

      modules: {

        "worker.js": code,

      },

      // Block all outbound network access

      globalOutbound: null,

    });


    const result = await worker.getEntrypoint().fetch(request);

    return result;

  },

} satisfies ExportedHandler;


```

## Running locally

Terminal window

```

npm install

npm run dev


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-starter/#page","headline":"Dynamic Workers Starter · Cloudflare Dynamic Workers docs","description":"A starter template for deploying a Worker that loads and runs Dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-starter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/examples/dynamic-workers-starter/","name":"Dynamic Workers Starter"}}]}
```
