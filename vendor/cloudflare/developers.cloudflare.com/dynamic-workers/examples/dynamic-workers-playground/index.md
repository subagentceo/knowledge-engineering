---
title: Dynamic Workers Playground
description: Bundle, execute, and observe Dynamic Workers with real-time logs and timing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dynamic Workers Playground

Try the Dynamic Workers [playground ↗](https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers-playground) to write or import code from GitHub, bundle it at runtime, execute it in a Dynamic Worker, and view real-time logs.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/dynamic-workers-playground)

![Dynamic Workers Playground UI](https://developers.cloudflare.com/_astro/dw-playground.DqwBO_zZ_Z1aayP0.webp) 

## What this demo shows

* **Runtime bundling** — Uses [@cloudflare/worker-bundler ↗](https://www.npmjs.com/package/@cloudflare/worker-bundler) to resolve npm dependencies and compile TypeScript inside a Worker
* **Dynamic execution** — Loads bundled code into an isolated Dynamic Worker
* **Caching** — Reuses previously bundled Workers when the source has not changed
* **Real-time output** — Streams the response body, console logs, execution timing, and bundle metadata back to the client

## Bundling code at runtime

The playground uses [@cloudflare/worker-bundler ↗](https://www.npmjs.com/package/@cloudflare/worker-bundler) to compile TypeScript, resolve npm dependencies, and produce modules the Worker Loader can execute.

Pass source files and a `package.json` to `createWorker()`, which resolves dependencies and returns bundled modules ready to load as a Dynamic Worker:

* [  JavaScript ](#tab-panel-8423)
* [  TypeScript ](#tab-panel-8424)

JavaScript

```

import { createWorker } from "@cloudflare/worker-bundler";


const { mainModule, modules, warnings } = await createWorker({

  files: {

    "src/index.ts": userCode,

    "package.json": JSON.stringify({

      dependencies: { hono: "^4.0.0" },

    }),

  },

  bundle: true,

  minify: false,

});


```

TypeScript

```

import { createWorker } from "@cloudflare/worker-bundler";


const { mainModule, modules, warnings } = await createWorker({

  files: {

    "src/index.ts": userCode,

    "package.json": JSON.stringify({

      dependencies: { hono: "^4.0.0" },

    }),

  },

  bundle: true,

  minify: false,

});


```

## Caching Dynamic Workers

`env.LOADER.load()` creates a new Dynamic Worker on every call. To avoid re-bundling unchanged code, use `env.LOADER.get(id, callback)` instead. The runtime returns an existing Worker on a cache hit, or calls your callback to build one on a miss:

* [  JavaScript ](#tab-panel-8425)
* [  TypeScript ](#tab-panel-8426)

JavaScript

```

const worker = env.LOADER.get(workerId, async () => {

  // This callback only runs on cache miss

  const { mainModule, modules } = await createWorker({ files });


  return {

    mainModule,

    modules,

    compatibilityDate: "2026-05-01",

    tails: [contextExports.DynamicWorkerTail({ props: { workerId } })],

  };

});


const response = await worker.getEntrypoint().fetch(request);


```

TypeScript

```

const worker = env.LOADER.get(workerId, async () => {

  // This callback only runs on cache miss

  const { mainModule, modules } = await createWorker({ files });


  return {

    mainModule,

    modules,

    compatibilityDate: "2026-05-01",

    tails: [

      contextExports.DynamicWorkerTail({ props: { workerId } }),

    ],

  };

});


const response = await worker.getEntrypoint().fetch(request);


```

In the playground, you can see this in action — run the same Dynamic Worker twice and the second request shows a cached result with 0ms cold start, since the build and load phases are skipped entirely.

## Observability with Tail Workers

When you run code in the playground, console output from the Dynamic Worker streams back to the browser in real time. Under the hood, this works through a [Tail Worker](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) pipeline:

1. A Tail Worker (`DynamicWorkerTail`) captures `console.log` output from the Dynamic Worker.
2. Logs are forwarded to a `LogSession` Durable Object.
3. The Durable Object streams them to the client over WebSocket.

To wire this up, include the Tail Worker in the `tails` array when creating the Dynamic Worker:

* [  JavaScript ](#tab-panel-8421)
* [  TypeScript ](#tab-panel-8422)

JavaScript

```

const worker = env.LOADER.get(workerId, async () => ({

  mainModule,

  modules,

  compatibilityDate: "2026-05-01",

  tails: [contextExports.DynamicWorkerTail({ props: { workerId } })],

}));


```

TypeScript

```

const worker = env.LOADER.get(workerId, async () => ({

  mainModule,

  modules,

  compatibilityDate: "2026-05-01",

  tails: [contextExports.DynamicWorkerTail({ props: { workerId } })],

}));


```

For more information on how to capture and stream logs from Dynamic Workers, refer to [Observability with Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/usage/observability/).

## Running locally

Clone the repo and start the dev server:

Terminal window

```

npm install

npm run dev


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-playground/#page","headline":"Dynamic Workers Playground · Cloudflare Dynamic Workers docs","description":"Bundle, execute, and observe Dynamic Workers with real-time logs and timing.","url":"https://developers.cloudflare.com/dynamic-workers/examples/dynamic-workers-playground/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/examples/dynamic-workers-playground/","name":"Dynamic Workers Playground"}}]}
```
