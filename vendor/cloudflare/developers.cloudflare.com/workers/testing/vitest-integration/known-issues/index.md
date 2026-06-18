---
title: Known issues
description: Explore the known issues associated with the Workers Vitest integration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Known issues

The Workers Vitest pool is currently in open beta. The following are issues Cloudflare is aware of and fixing:

### Coverage

Native code coverage via [V8 ↗](https://v8.dev/blog/javascript-code-coverage) is not supported. You must use instrumented code coverage via [Istanbul ↗](https://istanbul.js.org/) instead. Refer to the [Vitest Coverage documentation ↗](https://vitest.dev/guide/coverage) for setup instructions.

### Fake timers

Vitest's [fake timers ↗](https://vitest.dev/guide/mocking.html#timers) do not apply to KV, R2 and cache simulators. For example, you cannot expire a KV key by advancing fake time.

### Dynamic `import()` statements with `exports` and Durable Objects

Dynamic `import()` statements do not work inside `export default { ... }` handlers when writing integration tests with `exports.default.fetch()`, or inside Durable Object event handlers. You must import and call your handlers directly, or use static `import` statements in the global scope.

### WebSockets

Using WebSockets with Durable Objects is not supported with per-file storage isolation. To work around this, run your tests with shared storage using `--max-workers=1 --no-isolate`.

### Storage isolation

Storage isolation is per test file. The test runner will undo any writes to storage at the end of each test file as detailed in the [isolation and concurrency documentation](https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/). Cloudflare recommends the following actions to avoid common issues:

#### Await all storage operations

Always `await` all `Promise`s that read or write to storage services.

TypeScript

```

// Example: Seed data

beforeAll(async () => {

  await env.KV.put("message", "test message");

  await env.R2.put("file", "hello-world");

});


```

#### Explicitly signal resource disposal

When calling RPC methods of a Service Worker or Durable Object that return non-primitive values (such as objects or classes extending `RpcTarget`), use the `using` keyword to explicitly signal when resources can be disposed of. See [this example test ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/rpc/test/unit.test.ts#L155) and refer to [explicit-resource-management](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle#explicit-resource-management) for more details.

TypeScript

```

using result = await stub.getCounter();


```

#### Consume response bodies

When making requests via `fetch` or `R2.get()`, consume the entire response body, even if you are not asserting its content. For example:

TypeScript

```

test("check if file exists", async () => {

  await env.R2.put("file", "hello-world");

  const response = await env.R2.get("file");


  expect(response).not.toBe(null);

  // Consume the response body even if you are not asserting it

  await response.text();

});


```

### Missing properties on `ctx.exports`

The `ctx.exports` property provides access to the exports of the main Worker. The Workers Vitest integration attempts to automatically infer these exports by statically analyzing the Worker source code using esbuild. However, complex build setups, such as those using virtual modules or wildcard re-exports that esbuild cannot follow, may result in missing properties on the `ctx.exports` object.

For example, consider a Worker that re-exports an entrypoint from a virtual module using a wildcard export:

TypeScript

```

// index.ts

export * from "@virtual-module";


```

In this case, any exports from `@virtual-module` (such as `MyEntrypoint`) cannot be automatically inferred and will be missing from `ctx.exports`.

To work around this, add the `additionalExports` option to your Vitest configuration:

TypeScript

```

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineConfig({

  plugins: [

    cloudflareTest({

      wrangler: { configPath: "./wrangler.jsonc" },

      additionalExports: {

        MyEntrypoint: "WorkerEntrypoint",

      },

    }),

  ],

});


```

The `additionalExports` option is a map where keys are the export names and values are the type of export (`"WorkerEntrypoint"`, `"DurableObject"`, or `"WorkflowEntrypoint"`).

### Module resolution

If you encounter module resolution issues such as: `Error: Cannot use require() to import an ES Module` or `Error: No such module`, you can bundle these dependencies using the [deps.optimizer ↗](https://vitest.dev/config/#deps-optimizer) option:

TypeScript

```

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineConfig({

  plugins: [

    cloudflareTest({

      // ...

    }),

  ],

  test: {

    deps: {

      optimizer: {

        ssr: {

          enabled: true,

          include: ["your-package-name"],

        },

      },

    },

  },

});


```

You can find an example in the [Recipes](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes) page.

### Importing modules from global setup file

Although Vitest is set up to resolve packages for the [workerd ↗](https://github.com/cloudflare/workerd) runtime, it runs your global setup file in the Node.js environment. This can cause issues when importing packages like [Postgres.js ↗](https://github.com/cloudflare/workers-sdk/issues/6465), which exports a non-Node version for `workerd`. To work around this, you can create a wrapper that uses Vite's SSR module loader to import the global setup file under the correct conditions. Then, adjust your Vitest configuration to point to this wrapper. For example:

TypeScript

```

// File: global-setup-wrapper.ts

import { createServer } from "vite";


// Import the actual global setup file with the correct setup

const mod = await viteImport("./global-setup.ts");


export default mod.default;


// Helper to import the file with default node setup

async function viteImport(file: string) {

  const server = await createServer({

    root: import.meta.dirname,

    configFile: false,

    server: { middlewareMode: true, hmr: false, watch: null, ws: false },

    optimizeDeps: { noDiscovery: true },

    clearScreen: false,

  });

  const mod = await server.ssrLoadModule(file);

  await server.close();

  return mod;

}


```

TypeScript

```

// File: vitest.config.ts

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineConfig({

  plugins: [

    cloudflareTest({

      // ...

    }),

  ],

  test: {

    // Replace the globalSetup with the wrapper file

    globalSetup: ["./global-setup-wrapper.ts"],

  },

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/#page","headline":"Known issues · Cloudflare Workers docs","description":"Explore the known issues associated with the Workers Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/known-issues/","name":"Known issues"}}]}
```
