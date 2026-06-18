---
title: Dynamic Workflows
description: Run different Workflow logic for each user or tenant by combining Workflows with Dynamic Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dynamic Workflows

You can run a Workflow inside a Dynamic Worker to get durable execution for code that is loaded at runtime. Each step in the Workflow survives failures, can sleep for hours or days, can wait for external events, and resumes exactly where it left off — even if the isolate is recycled between steps.

Because Dynamic Workers are created on-demand, you do not have to register each Workflow up front or manage them individually. Load the code when it is needed, and the Workflows engine handles persistence and retries behind the scenes. This works equally well for one-time executions as it does for long-running, multi-step processes.

For example, you might be building:

* A SaaS platform where each tenant defines their own automation — onboarding sequences, approval chains, or billing retry logic — and you need each one to run durably without deploying a separate Workflow per customer.
* An AI agent framework where agents generate and execute multi-step plans at runtime, and each plan needs to survive restarts, sleep between tool calls, and wait for human approval.
* A multi-tenant job system where each customer submits their own processing logic — data transforms, webhook chains, scheduled tasks — and you want every step to persist progress and retry on failure without building your own orchestrator.

The `@cloudflare/dynamic-workflows` library connects your Worker Loader to the Workflows engine so that each Dynamic Worker gets the full power of durable steps (`step.do()`, `step.sleep()`, `step.waitForEvent()`) without you having to build the plumbing yourself.

In this guide, you will use the `@cloudflare/dynamic-workflows` library to set up a Worker Loader, write a Dynamic Worker with durable steps, and trigger a Workflow instance.

## Understand the model

This setup has three parts:

* **Worker Loader**: the main Worker you deploy. It receives requests, decides which Dynamic Worker to load, and creates Workflow instances. You write this code.
* **Dynamic Worker**: the per-tenant code that defines what the Workflow actually does — its steps, sleeps, and event waits. Each Dynamic Worker is loaded on-demand at runtime.
* **DynamicWorkflow class**: a Workflow entry point created by the library. When the Workflows engine needs to execute a step, this class loads the correct Dynamic Worker for that instance and runs the step inside it.
![Architecture](https://developers.cloudflare.com/_astro/dynamic-workflows.C7b0JP-O_Z14Bk9g.webp) 

Here is how they work together:

* The Worker Loader receives a request, loads the tenant's Dynamic Worker, and gives it a Workflow binding tagged with a tenant ID.
* The Dynamic Worker calls `env.WORKFLOWS.create()` to start a new Workflow instance. The tenant ID is saved with the instance automatically.
* The Workflows engine runs the steps defined in the Dynamic Worker — `step.do()`, `step.waitForEvent()`, `step.sleep()`. Each step is durable: its result is persisted and will not re-run after it succeeds.
* If the isolate is recycled between steps (for example, during a sleep or while waiting for an event), the engine reads the tenant ID back from the instance, reloads the same Dynamic Worker through the Worker Loader, and resumes where it left off.

The library provides two functions that handle the wiring between the Worker Loader and the Workflows engine, so you do not have to manually tag requests, parse payloads, or write your own `WorkflowEntrypoint` subclass.

* `wrapWorkflowBinding`: creates a Workflow binding tagged with metadata (like `{ tenantId }`) that you pass to a Dynamic Worker. The library attaches that metadata to every instance the Dynamic Worker creates, so the engine can trace each instance back to the right tenant.
* `createDynamicWorkflowEntrypoint`: creates the DynamicWorkflow class that reloads the correct Dynamic Worker when the engine resumes. You give it a callback that takes the metadata and returns the tenant's Workflow class, and the library calls that callback whenever a step needs to run.

## Install the library

The library handles the wiring between the Worker Loader and the Workflows engine, so you do not have to manually tag requests, parse payloads, or write your own `WorkflowEntrypoint` subclass.

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/dynamic-workflows
```

```
yarn add @cloudflare/dynamic-workflows
```

```
pnpm add @cloudflare/dynamic-workflows
```

```
bun add @cloudflare/dynamic-workflows
```

## Configure your Worker Loader

Your Worker Loader needs two [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/):

* A **Worker Loader** binding (`LOADER`) to load Dynamic Workers at runtime.
* A **Workflow binding** (`WORKFLOWS`) that points to the `DynamicWorkflow` class. This is the entrypoint the Workflows engine uses to route each instance to the correct Dynamic Worker.

* [  wrangler.jsonc ](#tab-panel-8445)
* [  wrangler.toml ](#tab-panel-8446)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker-loader",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ],

  "workflows": [

    {

      "name": "dynamic-workflow",

      "binding": "WORKFLOWS",

      "class_name": "DynamicWorkflow"

    }

  ]

}


```

TOML

```

name = "my-worker-loader"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


[[worker_loaders]]

binding = "LOADER"


[[workflows]]

name = "dynamic-workflow"

binding = "WORKFLOWS"

class_name = "DynamicWorkflow"


```

## Create the Worker Loader

The Worker Loader is where you connect Dynamic Workers to the Workflows engine. In this file, you define:

* How to load a tenant's code: a function that takes a tenant ID, fetches their code, and gives them a Workflow binding. The binding is created with `wrapWorkflowBinding`, which tags every Workflow instance with the tenant ID so the engine can route back to the right code later.
* How the engine resumes a Workflow: using `createDynamicWorkflowEntrypoint`, you define a callback that the engine calls whenever it needs to run a step. The callback receives the tenant ID from the instance metadata and returns the tenant's Workflow class. This is what makes durable execution work across isolate restarts — the engine knows how to reload the right code.

Note

You must re-export `DynamicWorkflowBinding` from your Worker Loader. The Cloudflare runtime needs this export to build the wrapped binding that Dynamic Workers use. If you forget this line, you will get a runtime error when a Dynamic Worker tries to create a Workflow instance.

* [  JavaScript ](#tab-panel-8449)
* [  TypeScript ](#tab-panel-8450)

JavaScript

```

import {

  createDynamicWorkflowEntrypoint,

  DynamicWorkflowBinding,

  wrapWorkflowBinding,

} from "@cloudflare/dynamic-workflows";


// Required: re-exporting puts the class on cloudflare:workers exports,

// which is how wrapWorkflowBinding builds per-tenant RPC stubs.

export { DynamicWorkflowBinding };


function loadTenant(env, tenantId) {

  return env.LOADER.get(tenantId, async () => ({

    compatibilityDate: "2026-01-01",

    mainModule: "index.js",

    modules: { "index.js": await fetchTenantCode(tenantId) },

    // The Dynamic Worker uses this exactly like a real Workflow binding;

    // every create() is tagged with { tenantId } automatically.

    env: { WORKFLOWS: wrapWorkflowBinding({ tenantId }) },

  }));

}


// The entrypoint name must match `class_name` in the workflows binding of your Wrangler config file.

export const DynamicWorkflow = createDynamicWorkflowEntrypoint(

  async ({ env, metadata }) => {

    const stub = loadTenant(env, metadata.tenantId);

    return stub.getEntrypoint("TenantWorkflow");

  },

);


export default {

  fetch(request, env) {

    const tenantId = request.headers.get("x-tenant-id");

    return loadTenant(env, tenantId).getEntrypoint().fetch(request);

  },

};


```

TypeScript

```

import {

  createDynamicWorkflowEntrypoint,

  DynamicWorkflowBinding,

  wrapWorkflowBinding,

  type WorkflowRunner,

} from "@cloudflare/dynamic-workflows";


// Required: re-exporting puts the class on cloudflare:workers exports,

// which is how wrapWorkflowBinding builds per-tenant RPC stubs.

export { DynamicWorkflowBinding };


interface Env {

  WORKFLOWS: Workflow;

  LOADER: WorkerLoader;

}


function loadTenant(env: Env, tenantId: string) {

  return env.LOADER.get(tenantId, async () => ({

    compatibilityDate: "2026-01-01",

    mainModule: "index.js",

    modules: { "index.js": await fetchTenantCode(tenantId) },

    // The Dynamic Worker uses this exactly like a real Workflow binding;

    // every create() is tagged with { tenantId } automatically.

    env: { WORKFLOWS: wrapWorkflowBinding({ tenantId }) },

  }));

}


// The entrypoint name must match `class_name` in the workflows binding of your Wrangler config file.

export const DynamicWorkflow = createDynamicWorkflowEntrypoint<Env>(

  async ({ env, metadata }) => {

    const stub = loadTenant(env, metadata.tenantId as string);

    return stub.getEntrypoint("TenantWorkflow") as unknown as WorkflowRunner;

  },

);


export default {

  fetch(request: Request, env: Env) {

    const tenantId = request.headers.get("x-tenant-id")!;

    return loadTenant(env, tenantId).getEntrypoint().fetch(request);

  },

};


```

Here is what happens when a request arrives:

1. The `fetch` handler reads the tenant ID from the request header.
2. `loadTenant` calls `env.LOADER.get()` to load (or reuse) a Dynamic Worker for that tenant. The Dynamic Worker receives `WORKFLOWS: wrapWorkflowBinding({ tenantId })` as a binding, which looks and behaves like a normal Workflow binding.
3. The request is forwarded to the Dynamic Worker's `fetch` handler, which can now call `env.WORKFLOWS.create()` to start a Workflow instance.

When that Workflow instance later needs to run a step — for example, after a `step.sleep()` or when a new isolate picks it up — the Workflows engine calls `run()` on the `DynamicWorkflow` class. The library reads the `tenantId` back from the metadata stored on the instance and invokes the callback you passed to `createDynamicWorkflowEntrypoint`. That callback loads the Dynamic Worker for that tenant and returns its `TenantWorkflow` class, so the engine can execute the next step in the original code.

## Write the Dynamic Worker

The Dynamic Worker is the code your user writes, and it does not need to know anything about the routing layer. It is a standard Workflow that uses `step.do()`, `step.sleep()`, and `step.waitForEvent()` as normal — from its perspective, `env.WORKFLOWS` is a regular Workflow binding.

Warning

Do not put secrets in the metadata you pass to `wrapWorkflowBinding` (for example, API keys or tokens). The Workflows engine persists the metadata in the event payload, and Dynamic Worker code can read it back via `instance.status()`. Use metadata for routing information like tenant IDs, not for sensitive data.

* [  JavaScript ](#tab-panel-8447)
* [  TypeScript ](#tab-panel-8448)

JavaScript

```

import { WorkflowEntrypoint } from "cloudflare:workers";


export class TenantWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    return step.do("greet", async () => `Hello, ${event.payload.name}!`);

  }

}


export default {

  async fetch(request, env) {

    const instance = await env.WORKFLOWS.create({

      params: await request.json(),

    });

    // instance is an RPC stub — .id is an RpcPromise, so await it.

    return Response.json({ id: await instance.id });

  },

};


```

TypeScript

```

import { WorkflowEntrypoint } from "cloudflare:workers";


export class TenantWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    return step.do("greet", async () => `Hello, ${event.payload.name}!`);

  }

}


export default {

  async fetch(request, env) {

    const instance = await env.WORKFLOWS.create({

      params: await request.json(),

    });

    // instance is an RPC stub — .id is an RpcPromise, so await it.

    return Response.json({ id: await instance.id });

  },

};


```

Normal Workflows behavior still applies. Workflow IDs, `.status()`, `.pause()`, retries, hibernation, and durable steps are unaffected by this architecture. The library only adds the routing between the Worker Loader and the Dynamic Worker.

## Trigger a dynamic workflow

Send a `POST` request to the Worker Loader with a tenant ID header and a JSON payload. The Worker Loader loads the matching Dynamic Worker, which calls `env.WORKFLOWS.create()` and returns the new instance ID.

Terminal window

```

curl -X POST http://localhost:8787/ \

  -H "x-tenant-id: tenant-42" \

  -H "Content-Type: application/json" \

  -d '{"name": "Alice"}'


```

## Check workflow status

Use the instance ID returned from the previous request to check the Workflow status. For more information on the status API, refer to the [Workers API reference](https://developers.cloudflare.com/workflows/build/workers-api/).

Terminal window

```

curl "http://localhost:8787/api/status?instanceId=YOUR_INSTANCE_ID"


```

## Related resources

* [@cloudflare/dynamic-workflows on GitHub ↗](https://github.com/cloudflare/dynamic-workflows)
* [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/)
* [Trigger Workflows](https://developers.cloudflare.com/workflows/build/trigger-workflows/)
* [Events and parameters](https://developers.cloudflare.com/workflows/build/events-and-parameters/)
* [Dynamic Workers getting started](https://developers.cloudflare.com/dynamic-workers/getting-started/)
* [Dynamic Worker Loaders](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)
* [Bindings with Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/usage/bindings/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/usage/dynamic-workflows/#page","headline":"Dynamic Workflows · Cloudflare Dynamic Workers docs","description":"Run different Workflow logic for each user or tenant by combining Workflows with Dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/usage/dynamic-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/usage/","name":"Usage"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/usage/dynamic-workflows/","name":"Dynamic Workflows"}}]}
```
