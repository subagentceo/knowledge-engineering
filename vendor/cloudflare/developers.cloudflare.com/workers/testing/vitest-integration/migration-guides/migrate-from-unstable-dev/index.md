---
title: Migrate from unstable_dev
description: Migrate from the [`unstable_dev`](/workers/wrangler/api/#unstable_dev) API to writing tests with the Workers Vitest integration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate from unstable\_dev

The [unstable\_dev](https://developers.cloudflare.com/workers/wrangler/api/#unstable%5Fdev) API has been a recommended approach to run integration tests. The `@cloudflare/vitest-pool-workers` package integrates directly with Vitest for fast re-runs, supports both unit and integration tests, all whilst providing isolated per-test storage.

This guide demonstrates key differences between tests written with the `unstable_dev` API and the Workers Vitest integration. For more information on writing tests with the Workers Vitest integration, refer to [Write your first test](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/).

## Reference a Worker for integration testing

With `unstable_dev`, to trigger a `fetch` event, you would do this:

JavaScript

```

import { unstable_dev } from "wrangler"


it("dispatches fetch event", () => {

  const worker = await unstable_dev("src/index.ts");

  const resp = await worker.fetch("http://example.com");

  ...

})


```

With the Workers Vitest integration, you can accomplish the same goal using `exports` from `cloudflare:workers`. `exports.default` refers to the default export defined by the `main` option in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This `main` Worker runs in the same isolate as tests so any global mocks will apply to it too.

JavaScript

```

import { exports } from "cloudflare:workers";

import "../src/"; // Currently required to automatically rerun tests when `main` changes


it("dispatches fetch event", async () => {

  const response = await exports.default.fetch("http://example.com");

  ...

});


```

## Stop a Worker

With the Workers Vitest integration, there is no need to stop a Worker via `worker.stop()`. This functionality is handled automatically after tests run.

## Import Wrangler configuration

Via the `unstable_dev` API, you can reference a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) by adding it as an option:

JavaScript

```

await unstable_dev("src/index.ts", {

  config: "wrangler.toml",

});


```

With the Workers Vitest integration, you can now set this reference to a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) in `vitest.config.js` for all of your tests:

JavaScript

```

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineConfig({

  plugins: [

    cloudflareTest({

      wrangler: {

        configPath: "wrangler.jsonc",

      },

    }),

  ],

});


```

## Test service Workers

Unlike the `unstable_dev` API, the Workers Vitest integration does not support testing Workers using the service worker format. You will need to first [migrate to the ES modules format](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) in order to use the Workers Vitest integration.

## Define types

You can remove `UnstableDevWorker` imports from your code. Instead, follow the [Write your first test guide](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/#define-types) to define types for all of your tests.

```

import { unstable_dev } from "wrangler";

import type { UnstableDevWorker } from "wrangler";

import worker from "src/index.ts";


describe("Worker", () => {

  let worker: UnstableDevWorker;

  ...

});


```

## Related resources

* [Write your first test](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/#define-types) \- Write unit tests against Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/#page","headline":"Migrate from unstable_dev · Cloudflare Workers docs","description":"Migrate from the unstable\\_dev API to writing tests with the Workers Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/","name":"Migrate from unstable_dev"}}]}
```
