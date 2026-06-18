---
title: Migrate from Miniflare 2's test environments
description: Migrate from [Miniflare 2](https://github.com/cloudflare/miniflare?tab=readme-ov-file) to the Workers Vitest integration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate from Miniflare 2's test environments

[Miniflare 2 ↗](https://github.com/cloudflare/miniflare?tab=readme-ov-file) provided custom environments for Jest and Vitest in the `jest-environment-miniflare` and `vitest-environment-miniflare` packages respectively. The `@cloudflare/vitest-pool-workers` package provides similar functionality using modern Miniflare versions and the [workerd runtime ↗](https://github.com/cloudflare/workerd). `workerd` is the same JavaScript/WebAssembly runtime that powers Cloudflare Workers. Using `workerd` practically eliminates behavior mismatches between your tests and deployed code. Refer to the [Miniflare 3 announcement ↗](https://blog.cloudflare.com/miniflare-and-workerd) for more information.

Warning

Cloudflare no longer provides a Jest testing environment for Workers. If you previously used Jest, you will need to [migrate to Vitest ↗](https://vitest.dev/guide/migration.html#migrating-from-jest) first, then follow the rest of this guide. Vitest provides built-in support for TypeScript, ES modules, and hot-module reloading for tests out-of-the-box.

Warning

The Workers Vitest integration does not support testing Workers using the service worker format. [Migrate to ES modules format](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) first.

## Install the Workers Vitest integration

First, you will need to uninstall the old environment and install the new pool. Vitest environments can only customize the global scope, whereas pools can run tests using a completely different runtime. In this case, the pool runs your tests inside [workerd ↗](https://github.com/cloudflare/workerd) instead of Node.js.

Terminal window

```

npm uninstall vitest-environment-miniflare

npm install --save-dev vitest@^4.1.0

npm install --save-dev @cloudflare/vitest-pool-workers


```

## Update your Vitest configuration file

After installing the Workers Vitest integration, update your Vitest configuration file to use the `cloudflareTest()` Vite plugin instead. Most Miniflare configuration previously specified in `environmentOptions` can be moved to the `miniflare` option in `cloudflareTest()`. Refer to [Miniflare's WorkerOptions interface ↗](https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/README.md#interface-workeroptions) for supported options and the [Miniflare version 2 to 3 migration guide](https://developers.cloudflare.com/workers/testing/miniflare/migrations/from-v2/) for more information. If you relied on configuration stored in a Wrangler file, set `wrangler.configPath` too.

```

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineWorkersConfig({

  test: {

    environment: "miniflare",

    environmentOptions: { ... },

  },

});

export default defineConfig({

  plugins: [

    cloudflareTest({

      miniflare: { ... },

      wrangler: { configPath: "./wrangler.jsonc" },

    }),

  ],

});


```

## Update your TypeScript configuration file

If you are using TypeScript, update your `tsconfig.json` to include the correct ambient `types`:

```

{

  "compilerOptions": {

    ...,

    "types": [

      ...

      "vitest-environment-miniflare/globals"

      "@cloudflare/vitest-pool-workers/types"

    ]

  },

}


```

## Access bindings

To access [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your tests, use the `env` helper from the `cloudflare:workers` module.

```

import { it } from "vitest";

import { env } from "cloudflare:workers";


it("does something", () => {

  const env = getMiniflareBindings();

  // ...

});


```

If you are using TypeScript, you need to define the type of `env` for your tests. Refer to [Define types](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/#define-types) for setup instructions.

## Storage isolation

Storage isolation is per test file by default. You no longer need to include `setupMiniflareIsolatedStorage()` in your tests.

```

const describe = setupMiniflareIsolatedStorage();

import { describe } from "vitest";


```

## Work with `waitUntil()`

The `new ExecutionContext()` constructor and `getMiniflareWaitUntil()` function are now `createExecutionContext()` and `waitOnExecutionContext()` respectively. Note `waitOnExecutionContext()` now returns an empty `Promise<void>` instead of a `Promise` resolving to the results of all `waitUntil()`ed `Promise`s.

```

import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";


it("does something", () => {

  // ...

  const ctx = new ExecutionContext();

  const ctx = createExecutionContext();

  const response = worker.fetch(request, env, ctx);

  await getMiniflareWaitUntil(ctx);

  await waitOnExecutionContext(ctx);

});


```

## Mock outbound requests

The `getMiniflareFetchMock()` function is no longer available. To mock outbound `fetch()` requests, mock `globalThis.fetch` directly or use ecosystem libraries such as [MSW ↗](https://mswjs.io/). Refer to the [request mocking example ↗](https://github.com/cloudflare/workers-sdk/blob/main/fixtures/vitest-pool-workers-examples/request-mocking/test/imperative.test.ts) for a complete example.

## Use Durable Object helpers

The `getMiniflareDurableObjectStorage()`, `getMiniflareDurableObjectState()`, `getMiniflareDurableObjectInstance()`, and `runWithMiniflareDurableObjectGates()` functions have all been replaced with a single `runInDurableObject()` function from the `cloudflare:test` module. The `runInDurableObject()` function accepts a `DurableObjectStub` with a callback accepting the Durable Object and corresponding `DurableObjectState` as arguments. Consolidating these functions into a single function simplifies the API surface, and ensures instances are accessed with the correct request context and [gating behavior ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/). Refer to the [Test APIs page](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/) for more details.

```

import { env } from "cloudflare:workers";

import { runInDurableObject } from "cloudflare:test";


it("does something", async () => {

  const env = getMiniflareBindings();

  const id = env.OBJECT.newUniqueId();

  const stub = env.OBJECT.get(id);


  const storage = await getMiniflareDurableObjectStorage(id);

  doSomethingWith(storage);

  await runInDurableObject(stub, async (instance, state) => {

    doSomethingWith(state.storage);

  });


  const state = await getMiniflareDurableObjectState(id);

  doSomethingWith(state);

  await runInDurableObject(stub, async (instance, state) => {

    doSomethingWith(state);

  });


  const instance = await getMiniflareDurableObjectInstance(id);

  await runWithMiniflareDurableObjectGates(state, async () => {

    doSomethingWith(instance);

  });

  await runInDurableObject(stub, async (instance) => {

    doSomethingWith(instance);

  });

});


```

The `flushMiniflareDurableObjectAlarms()` function has been replaced with the `runDurableObjectAlarm()` function from the `cloudflare:test` module. The `runDurableObjectAlarm()` function accepts a single `DurableObjectStub` and returns a `Promise` that resolves to `true` if an alarm was scheduled and the `alarm()` handler was executed, or `false` otherwise. To "flush" multiple instances' alarms, call `runDurableObjectAlarm()` in a loop.

```

import { env } from "cloudflare:workers";

import { runDurableObjectAlarm } from "cloudflare:test";


it("does something", async () => {

  const env = getMiniflareBindings();

  const id = env.OBJECT.newUniqueId();

  await flushMiniflareDurableObjectAlarms([id]);

  const stub = env.OBJECT.get(id);

  const ran = await runDurableObjectAlarm(stub);

});


```

Finally, the `getMiniflareDurableObjectIds()` function has been replaced with the `listDurableObjectIds()` function from the `cloudflare:test` module. The `listDurableObjectIds()` function now accepts a `DurableObjectNamespace` instance instead of a namespace `string` to provide stricter typing. Note the `listDurableObjectIds()` function respects storage isolation. IDs of objects created in other test files will not be returned.

```

import { env } from "cloudflare:workers";

import { listDurableObjectIds } from "cloudflare:test";


it("does something", async () => {

  const ids = await getMiniflareDurableObjectIds("OBJECT");

  const ids = await listDurableObjectIds(env.OBJECT);

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2/#page","headline":"Migrate from Miniflare 2's test environments · Cloudflare Workers docs","description":"Migrate from Miniflare 2 to the Workers Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/vitest-integration/migration-guides/migrate-from-miniflare-2/","name":"Migrate from Miniflare 2's test environments"}}]}
```
