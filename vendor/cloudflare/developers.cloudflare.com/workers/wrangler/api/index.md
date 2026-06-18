---
title: API
description: A set of programmatic APIs that can be integrated with local Cloudflare Workers-related workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API

Wrangler offers APIs to programmatically interact with your Cloudflare Workers.

* [experimental\_generateTypes](#experimental%5Fgeneratetypes) \- Generate TypeScript type definitions from your Worker configuration.
* [unstable\_startWorker](#unstable%5Fstartworker) \- Start a server for running integration tests against your Worker.
* [unstable\_dev](#unstable%5Fdev) \- Start a server for running either end-to-end (e2e) or integration tests against your Worker.
* [getPlatformProxy](#getplatformproxy) \- Get proxies and values for emulating the Cloudflare Workers platform in a Node.js process.

## `experimental_generateTypes`

Generate TypeScript type definitions from your Worker configuration. This API uses the same core logic as the `wrangler types` CLI command, so outputs stay aligned between the CLI and programmatic API.

Unlike the CLI command, `experimental_generateTypes` does not write to disk automatically. Instead, it returns the generated type content as structured strings for you to handle as needed.

Note

The `experimental_generateTypes()` function has an `experimental_` prefix because the API is experimental and may change in the future.

### Syntax

TypeScript

```

import { experimental_generateTypes } from "wrangler";


const result = await experimental_generateTypes(options);


```

### Parameters

* `options` ` object ` optional  
   * Optional options object mirroring the `wrangler types` CLI flags:  
         * `config` `string | string[]`  
         Path to the Wrangler configuration file to use. Can be an array for multi-config type resolution.  
         * `env` `string`  
         Name of the Wrangler environment to generate types for.  
         * `envFile` `string[]`  
         Paths to `.env` files to load when inferring local variables and secrets.  
         * `envInterface` `string`  
         Name of the generated environment interface. Defaults to `Env`.  
         * `includeEnv` `boolean`  
         Whether to include environment and bindings types in the output. Defaults to `true`.  
         * `includeRuntime` `boolean`  
         Whether to include runtime types in the output. Defaults to `true`.  
         * `path` `string`  
         Path to the declaration file for generated types. Defaults to `worker-configuration.d.ts`.  
         * `strictVars` `boolean`  
         Whether to generate strict literal and union types for variables. Defaults to `true`.

### Return Type

`experimental_generateTypes()` returns a `Promise` resolving to an object containing the following fields:

* `content` `string`  
   * Combined formatted output containing all generated sections, including headers and both env and runtime types.
* `env` `string | null`  
   * Generated environment and bindings types, or `null` when env types are excluded.
* `path` `string`  
   * Target declaration file path associated with this generation run.
* `runtime` `string | null`  
   * Generated runtime types, or `null` when runtime types are excluded.

### Usage

You can use `experimental_generateTypes` to generate types programmatically and write them to disk yourself, or pass them to other tools:

TypeScript

```

import { experimental_generateTypes } from "wrangler";

import * as fs from "node:fs";


const result = await experimental_generateTypes({

  config: "wrangler.json",

  includeRuntime: true,

  includeEnv: true,

});


// Write the combined content to the path specified in options

fs.writeFileSync(result.path, result.content, "utf-8");


```

To generate only env types without runtime types:

TypeScript

```

const result = await experimental_generateTypes({

  includeRuntime: false,

});


```

To generate types for a specific environment with a custom interface name:

TypeScript

```

const result = await experimental_generateTypes({

  env: "staging",

  envInterface: "StagingEnv",

  path: "./types/staging.d.ts",

});


```

## `unstable_startWorker`

This API exposes the internals of Wrangler's dev server, and allows you to customise how it runs. For example, you could use `unstable_startWorker()` to run integration tests against your Worker. This example uses `node:test`, but should apply to any testing framework:

JavaScript

```

import assert from "node:assert";

import test, { after, before, describe } from "node:test";

import { unstable_startWorker } from "wrangler";


describe("worker", () => {

  let worker;


  before(async () => {

    worker = await unstable_startWorker({ config: "wrangler.json" });

  });


  test("hello world", async () => {

    assert.strictEqual(

      await (await worker.fetch("http://example.com")).text(),

      "Hello world",

    );

  });


  after(async () => {

    await worker.dispose();

  });

});


```

## `unstable_dev`

Start an HTTP server for testing your Worker.

Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

By default, `unstable_dev` will perform integration tests against a local server. If you wish to perform an e2e test against a preview Worker, pass `local: false` in the `options` object when calling the `unstable_dev()` function. Note that e2e tests can be significantly slower than integration tests.

Note

The `unstable_dev()` function has an `unstable_` prefix because the API is experimental and may change in the future. We recommend migrating to the `unstable_startWorker()` API, documented above.

If you have been using `unstable_dev()` for integration testing and want to migrate to Cloudflare's Vitest integration, refer to the [Migrate from unstable\_dev migration guide](https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-from-unstable-dev/) for more information.

### Constructor

JavaScript

```

const worker = await unstable_dev(script, options);


```

### Parameters

* `script` ` string `  
   * A string containing a path to your Worker script, relative to your Worker project's root directory.
* `options` ` object ` optional  
   * Optional options object containing `wrangler dev` configuration settings.  
   * Include an `experimental` object inside `options` to access experimental features such as `disableExperimentalWarning`.  
         * Set `disableExperimentalWarning` to `true` to disable Wrangler's warning about using `unstable_` prefixed APIs.

### Return Type

`unstable_dev()` returns an object containing the following methods:

* `fetch()` `Promise<Response>`  
   * Send a request to your Worker. Returns a Promise that resolves with a [Response](https://developers.cloudflare.com/workers/runtime-apis/response) object.  
   * Refer to [Fetch](https://developers.cloudflare.com/workers/runtime-apis/fetch/).
* `stop()` `Promise<void>`  
   * Shuts down the dev server.

### Usage

When initiating each test suite, use a `beforeAll()` function to start `unstable_dev()`. The `beforeAll()` function is used to minimize overhead: starting the dev server takes a few hundred milliseconds, starting and stopping for each individual test adds up quickly, slowing your tests down.

In each test case, call `await worker.fetch()`, and check that the response is what you expect.

To wrap up a test suite, call `await worker.stop()` in an `afterAll` function.

#### Single Worker example

* [  JavaScript ](#tab-panel-12227)
* [  TypeScript ](#tab-panel-12228)

JavaScript

```

const { unstable_dev } = require("wrangler");


describe("Worker", () => {

  let worker;


  beforeAll(async () => {

    worker = await unstable_dev("src/index.js", {

      experimental: { disableExperimentalWarning: true },

    });

  });


  afterAll(async () => {

    await worker.stop();

  });


  it("should return Hello World", async () => {

    const resp = await worker.fetch();

    const text = await resp.text();

    expect(text).toMatchInlineSnapshot(`"Hello World!"`);

  });

});


```

TypeScript

```

import { unstable_dev } from "wrangler";

import type { UnstableDevWorker } from "wrangler";


describe("Worker", () => {

  let worker: UnstableDevWorker;


  beforeAll(async () => {

    worker = await unstable_dev("src/index.ts", {

      experimental: { disableExperimentalWarning: true },

    });

  });


  afterAll(async () => {

    await worker.stop();

  });


  it("should return Hello World", async () => {

    const resp = await worker.fetch();

    const text = await resp.text();

    expect(text).toMatchInlineSnapshot(`"Hello World!"`);

  });

});


```

#### Multi-Worker example

You can test Workers that call other Workers. In the below example, we refer to the Worker that calls other Workers as the parent Worker, and the Worker being called as a child Worker.

If you shut down the child Worker prematurely, the parent Worker will not know the child Worker exists and your tests will fail.

* [  JavaScript ](#tab-panel-12229)
* [  TypeScript ](#tab-panel-12230)

JavaScript

```

import { unstable_dev } from "wrangler";


describe("multi-worker testing", () => {

  let childWorker;

  let parentWorker;


  beforeAll(async () => {

    childWorker = await unstable_dev("src/child-worker.js", {

      config: "src/child-wrangler.toml",

      experimental: { disableExperimentalWarning: true },

    });

    parentWorker = await unstable_dev("src/parent-worker.js", {

      config: "src/parent-wrangler.toml",

      experimental: { disableExperimentalWarning: true },

    });

  });


  afterAll(async () => {

    await childWorker.stop();

    await parentWorker.stop();

  });


  it("childWorker should return Hello World itself", async () => {

    const resp = await childWorker.fetch();

    const text = await resp.text();

    expect(text).toMatchInlineSnapshot(`"Hello World!"`);

  });


  it("parentWorker should return Hello World by invoking the child worker", async () => {

    const resp = await parentWorker.fetch();

    const parsedResp = await resp.text();

    expect(parsedResp).toEqual("Parent worker sees: Hello World!");

  });

});


```

TypeScript

```

import { unstable_dev } from "wrangler";

import type { UnstableDevWorker } from "wrangler";


describe("multi-worker testing", () => {

  let childWorker: UnstableDevWorker;

  let parentWorker: UnstableDevWorker;


  beforeAll(async () => {

    childWorker = await unstable_dev("src/child-worker.js", {

      config: "src/child-wrangler.toml",

      experimental: { disableExperimentalWarning: true },

    });

    parentWorker = await unstable_dev("src/parent-worker.js", {

      config: "src/parent-wrangler.toml",

      experimental: { disableExperimentalWarning: true },

    });

  });


  afterAll(async () => {

    await childWorker.stop();

    await parentWorker.stop();

  });


  it("childWorker should return Hello World itself", async () => {

    const resp = await childWorker.fetch();

    const text = await resp.text();

    expect(text).toMatchInlineSnapshot(`"Hello World!"`);

  });


  it("parentWorker should return Hello World by invoking the child worker", async () => {

    const resp = await parentWorker.fetch();

    const parsedResp = await resp.text();

    expect(parsedResp).toEqual("Parent worker sees: Hello World!");

  });

});


```

## `getPlatformProxy`

The `getPlatformProxy` function provides a way to obtain an object containing proxies (to **local** `workerd` bindings) and emulations of Cloudflare Workers specific values, allowing the emulation of such in a Node.js process.

Warning

`getPlatformProxy` is, by design, to be used exclusively in Node.js applications. `getPlatformProxy` cannot be run inside the Workers runtime.

One general use case for getting a platform proxy is for emulating bindings in applications targeting Workers, but running outside the Workers runtime (for example, framework local development servers running in Node.js), or for testing purposes (for example, ensuring code properly interacts with a type of binding).

Note

Binding proxies provided by this function are a best effort emulation of the real production bindings. Although they are designed to be as close as possible to the real thing, there might be slight differences and inconsistencies between the two.

### Syntax

JavaScript

```

const platform = await getPlatformProxy(options);


```

### Parameters

* `options` ` object ` optional  
   * Optional options object containing preferences for the bindings:  
         * `environment` string  
         The environment to use.  
         * `configPath` string  
         The path to the config file to use.  
         If no path is specified, the default behavior is to search from the current directory up the filesystem for a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to use.  
         **Note:** this field is optional but if a path is specified it must point to a valid file on the filesystem.  
         * `persist` boolean | `{ path: string }`  
         Indicates if and where to persist the bindings data. If `true` or `undefined`, defaults to the same location used by Wrangler, so data can be shared between it and the caller. If `false`, no data is persisted to or read from the filesystem.  
         **Note:** If you use `wrangler`'s `--persist-to` option, note that this option adds a subdirectory called `v3` under the hood while `getPlatformProxy`'s `persist` does not. For example, if you run `wrangler dev --persist-to ./my-directory`, to reuse the same location using `getPlatformProxy`, you will have to specify: `persist: { path: "./my-directory/v3" }`.  
         * `remoteBindings` boolean optional (default: \`true\`)  
         Whether or not [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) should be enabled.

### Return Type

`getPlatformProxy()` returns a `Promise` resolving to an object containing the following fields.

* `env` `Record<string, unknown>`  
   * Object containing proxies to bindings that can be used in the same way as production bindings. This matches the shape of the `env` object passed as the second argument to modules-format workers. These proxy to binding implementations run inside `workerd`.  
   * TypeScript Tip: `getPlatformProxy<Env>()` is a generic function. You can pass the shape of the bindings record as a type argument to get proper types without `unknown` values.
* `cf` IncomingRequestCfProperties read-only  
   * Mock of the `Request`'s `cf` property, containing data similar to what you would see in production.
* `ctx` object  
   * Mock object containing implementations of the [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) and [passThroughOnException](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception) functions that do nothing.
* `caches` object  
   * Emulation of the [Workers caches runtime API](https://developers.cloudflare.com/workers/runtime-apis/cache/).  
   * For the time being, all cache operations do nothing. A more accurate emulation will be made available soon.
* `dispose()` () => `Promise<void>`  
   * Terminates the underlying `workerd` process.  
   * Call this after the platform proxy is no longer required by the program. If you are running a long running process (such as a dev server) that can indefinitely make use of the proxy, you do not need to call this function.

### Usage

The `getPlatformProxy` function uses bindings found in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). For example, if you have an [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) configuration set up in the Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-12231)
* [  wrangler.toml ](#tab-panel-12232)

JSONC

```

{

  "vars": {

    "MY_VARIABLE": "test"

  }

}


```

TOML

```

[vars]

MY_VARIABLE = "test"


```

You can access the bindings by importing `getPlatformProxy` like this:

JavaScript

```

import { getPlatformProxy } from "wrangler";


const { env } = await getPlatformProxy();


```

To access the value of the `MY_VARIABLE` binding add the following to your code:

JavaScript

```

console.log(`MY_VARIABLE = ${env.MY_VARIABLE}`);


```

This will print the following output: `MY_VARIABLE = test`.

### Supported bindings

All supported bindings found in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) are available to you via `env`.

The bindings supported by `getPlatformProxy` are:

* [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/)
* [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/)
* [KV namespace bindings](https://developers.cloudflare.com/kv/api/)
* [R2 bucket bindings](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/)
* [Queue bindings](https://developers.cloudflare.com/queues/configuration/javascript-apis/)
* [D1 database bindings](https://developers.cloudflare.com/d1/worker-api/)
* [Hyperdrive bindings](https://developers.cloudflare.com/hyperdrive)  
Hyperdrive values are simple passthrough ones  
Values provided by hyperdrive bindings such as `connectionString` and `host` do not have a valid meaning outside of a `workerd` process. This means that Hyperdrive proxies return passthrough values, which are values corresponding to the database connection provided by the user. Otherwise, it would return values which would be unusable from within node.js.
* [Workers AI bindings](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai)  
Workers AI local development usage charges  
Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.
* [Durable Object bindings](https://developers.cloudflare.com/durable-objects/api/)  
   * To use a Durable Object binding with `getPlatformProxy`, always specify a [script\_name](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects).  
   For example, you might have the following binding in a Wrangler configuration file read by `getPlatformProxy`.  
         * [  wrangler.jsonc ](#tab-panel-12235)  
         * [  wrangler.toml ](#tab-panel-12236)  
   JSONC  
   ```  
   {  
     "durable_objects": {  
       "bindings": [  
         {  
           "name": "MyDurableObject",  
           "class_name": "MyDurableObject",  
           "script_name": "external-do-worker"  
         }  
       ]  
     }  
   }  
   ```  
   TOML  
   ```  
   [[durable_objects.bindings]]  
   name = "MyDurableObject"  
   class_name = "MyDurableObject"  
   script_name = "external-do-worker"  
   ```  
   You will need to declare your Durable Object `"MyDurableObject"` in another Worker, called `external-do-worker` in this example.  
   ./external-do-worker/src/index.ts  
   ```  
   export class MyDurableObject extends DurableObject {  
     // Your DO code goes here  
   }  
   export default {  
     fetch() {  
       // Doesn't have to do anything, but a DO cannot be the default export  
       return new Response("Hello, world!");  
     },  
   };  
   ```  
   That Worker also needs a Wrangler configuration file that looks like this:  
         * [  wrangler.jsonc ](#tab-panel-12233)  
         * [  wrangler.toml ](#tab-panel-12234)  
   JSONC  
   ```  
   {  
     "name": "external-do-worker",  
     "main": "src/index.ts",  
     "compatibility_date": "XXXX-XX-XX"  
   }  
   ```  
   TOML  
   ```  
   name = "external-do-worker"  
   main = "src/index.ts"  
   compatibility_date = "XXXX-XX-XX"  
   ```  
   If you are not using RPC with your Durable Object, you can run a separate Wrangler dev session alongside your framework development server.  
   Otherwise, you can build your application and run both Workers in the same Wrangler dev session.  
   If you are using Pages run:  
    npm  yarn  pnpm  
   ```  
   npx wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```  
   ```  
   yarn wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```  
   ```  
   pnpm wrangler pages dev -c path/to/pages/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```  
   If you are using Workers with Assets run:  
    npm  yarn  pnpm  
   ```  
   npx wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```  
   ```  
   yarn wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```  
   ```  
   pnpm wrangler dev -c path/to/workers-assets/wrangler.jsonc -c path/to/external-do-worker/wrangler.jsonc  
   ```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/api/#page","headline":"API · Cloudflare Workers docs","description":"A set of programmatic APIs that can be integrated with local Cloudflare Workers-related workflows.","url":"https://developers.cloudflare.com/workers/wrangler/api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/api/","name":"API"}}]}
```
