---
title: Bindings
description: Connect Pages Functions to Cloudflare resources like KV, R2, D1, and Durable Objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bindings

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) enables your Pages Functions to interact with resources on the Cloudflare developer platform. Use bindings to integrate your Pages Functions with Cloudflare resources like [KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), and [D1](https://developers.cloudflare.com/d1/). You can set bindings for both production and preview environments.

This guide will instruct you on configuring a binding for your Pages Function. You must already have a Cloudflare Developer Platform resource set up to continue.

Note

Pages Functions only support a subset of all [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), which are listed on this page.

## KV namespaces

[Workers KV](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) is Cloudflare's key-value storage solution.

To bind your KV namespace to your Pages Function, you can configure a KV namespace binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#kv-namespaces) or the Cloudflare dashboard.

To configure a KV namespace binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **KV namespace**.
4. Give your binding a name under **Variable name**.
5. Under **KV namespace**, select your desired namespace.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use KV in your Function. In the following example, your KV namespace binding is called `TODO_LIST` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9400)
* [  TypeScript ](#tab-panel-9401)

JavaScript

```

export async function onRequest(context) {

  const task = await context.env.TODO_LIST.get("Task:123");

  return new Response(task);

}


```

TypeScript

```

interface Env {

  TODO_LIST: KVNamespace;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  const task = await context.env.TODO_LIST.get("Task:123");

  return new Response(task);

};


```

### Interact with your KV namespaces locally

You can interact with your KV namespace bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

To interact with your KV namespace binding locally by passing arguments to the Wrangler CLI, add `-k <BINDING_NAME>` or `--kv=<BINDING_NAME>` to the `wrangler pages dev` command. For example, if your KV namespace is bound your Function via the `TODO_LIST` binding, access the KV namespace in local development by running:

Terminal window

```

npx wrangler pages dev <OUTPUT_DIR> --kv=TODO_LIST


```

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## Durable Objects

[Durable Objects](https://developers.cloudflare.com/durable-objects/) (DO) are Cloudflare's strongly consistent data store that power capabilities such as connecting WebSockets and handling state.

You must create a Durable Object Worker and bind it to your Pages project using the Cloudflare dashboard or your Pages project's [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/). You cannot create and deploy a Durable Object within a Pages project.

To bind your Durable Object to your Pages Function, you can configure a Durable Object binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#kv-namespaces) or the Cloudflare dashboard.

To configure a Durable Object binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **Durable Object**.
4. Give your binding a name under **Variable name**.
5. Under **Durable Object namespace**, select your desired namespace.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use Durable Objects in your Function. In the following example, your DO binding is called `DURABLE_OBJECT` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9402)
* [  TypeScript ](#tab-panel-9403)

JavaScript

```

export async function onRequestGet(context) {

  const id = context.env.DURABLE_OBJECT.newUniqueId();

  const stub = context.env.DURABLE_OBJECT.get(id);


  // Pass the request down to the durable object

  return stub.fetch(context.request);

}


```

TypeScript

```

interface Env {

  DURABLE_OBJECT: DurableObjectNamespace;

}


export const onRequestGet: PagesFunction<Env> = async (context) => {

  const id = context.env.DURABLE_OBJECT.newUniqueId();

  const stub = context.env.DURABLE_OBJECT.get(id);


  // Pass the request down to the durable object

  return stub.fetch(context.request);

};


```

### Interact with your Durable Object namespaces locally

You can interact with your Durable Object bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

While developing locally, to interact with a Durable Object namespace, run `wrangler dev` in the directory of the Worker exporting the Durable Object. In another terminal, run `wrangler pages dev` in the directory of your Pages project.

To interact with your Durable Object namespace locally via the Wrangler CLI, append `--do <BINDING_NAME>=<CLASS_NAME>@<SCRIPT_NAME>` to `wrangler pages dev`. `CLASS_NAME` indicates the Durable Object class name and `SCRIPT_NAME` the name of your Worker.

For example, if your Worker is called `do-worker` and it declares a Durable Object class called `DurableObjectExample`, access this Durable Object by running `npx wrangler dev` in the `do-worker` directory. At the same time, run `npx wrangler pages dev <OUTPUT_DIR> --do MY_DO=DurableObjectExample@do-worker` in your Pages' project directory. Interact with the `MY_DO` binding in your Function code by using `context.env` (for example, `context.env.MY_DO`).

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## R2 buckets

[R2](https://developers.cloudflare.com/r2/) is Cloudflare's blob storage solution that allows developers to store large amounts of unstructured data without the egress fees.

To bind your R2 bucket to your Pages Function, you can configure a R2 bucket binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#r2-buckets) or the Cloudflare dashboard.

To configure a R2 bucket binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **R2 bucket**.
4. Give your binding a name under **Variable name**.
5. Under **R2 bucket**, select your desired R2 bucket.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use R2 buckets in your Function. In the following example, your R2 bucket binding is called `BUCKET` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9404)
* [  TypeScript ](#tab-panel-9405)

JavaScript

```

export async function onRequest(context) {

  const obj = await context.env.BUCKET.get("some-key");

  if (obj === null) {

    return new Response("Not found", { status: 404 });

  }

  return new Response(obj.body);

}


```

TypeScript

```

interface Env {

  BUCKET: R2Bucket;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  const obj = await context.env.BUCKET.get("some-key");

  if (obj === null) {

    return new Response("Not found", { status: 404 });

  }

  return new Response(obj.body);

};


```

### Interact with your R2 buckets locally

You can interact with your R2 bucket bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

Note

By default, Wrangler automatically persists data to local storage. For more information, refer to [Local development](https://developers.cloudflare.com/workers/development-testing/).

To interact with an R2 bucket locally via the Wrangler CLI, add `--r2=<BINDING_NAME>` to the `wrangler pages dev` command. If your R2 bucket is bound to your Function with the `BUCKET` binding, access this R2 bucket in local development by running:

Terminal window

```

npx wrangler pages dev <OUTPUT_DIR> --r2=BUCKET


```

Interact with this binding by using `context.env` (for example, `context.env.BUCKET`.)

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## D1 databases

[D1](https://developers.cloudflare.com/d1/) is Cloudflare's native serverless database.

To bind your D1 database to your Pages Function, you can configure a D1 database binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#d1-databases) or the Cloudflare dashboard.

To configure a D1 database binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add**\> **D1 database bindings**.
4. Give your binding a name under **Variable name**.
5. Under **D1 database**, select your desired D1 database.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use D1 in your Function. In the following example, your D1 database binding is `NORTHWIND_DB` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9406)
* [  TypeScript ](#tab-panel-9407)

JavaScript

```

export async function onRequest(context) {

  // Create a prepared statement with our query

  const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");

  const data = await ps.first();


  return Response.json(data);

}


```

TypeScript

```

interface Env {

  NORTHWIND_DB: D1Database;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  // Create a prepared statement with our query

  const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");

  const data = await ps.first();


  return Response.json(data);

};


```

### Interact with your D1 databases locally

You can interact with your D1 database bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

To interact with a D1 database via the Wrangler CLI while [developing locally](https://developers.cloudflare.com/d1/best-practices/local-development/#develop-locally-with-pages), add `--d1 <BINDING_NAME>=<DATABASE_ID>` to the `wrangler pages dev` command.

If your D1 database is bound to your Pages Function via the `NORTHWIND_DB` binding and the `database_id` in your Wrangler file is `xxxx-xxxx-xxxx-xxxx-xxxx`, access this database in local development by running:

Terminal window

```

npx wrangler pages dev <OUTPUT_DIR> --d1 NORTHWIND_DB=xxxx-xxxx-xxxx-xxxx-xxxx


```

Interact with this binding by using `context.env` (for example, `context.env.NORTHWIND_DB`.)

Note

By default, Wrangler automatically persists data to local storage. For more information, refer to [Local development](https://developers.cloudflare.com/workers/development-testing/).

Refer to the [D1 Workers Binding API documentation](https://developers.cloudflare.com/d1/worker-api/) for the API methods available on your D1 binding.

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## Vectorize indexes

[Vectorize](https://developers.cloudflare.com/vectorize/) is Cloudflare’s native vector database.

To bind your Vectorize index to your Pages Function, you can configure a Vectorize index binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#vectorize-indexes) or the Cloudflare dashboard.

To configure a Vectorize index binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
3. Select your Pages project > **Settings**.
4. Go to **Bindings** \> **Add** \> **Vectorize index**.
5. Give your binding a name under **Variable name**.
6. Under **Vectorize index**, select your desired Vectorize index.
7. Redeploy your project for the binding to take effect.

### Use Vectorize index bindings

To use Vectorize index in your Pages Function, you can access your Vectorize index binding in your Pages Function code. In the following example, your Vectorize index binding is called `VECTORIZE_INDEX` and you can access the binding in your Pages Function code on `context.env`.

* [  JavaScript ](#tab-panel-9408)
* [  TypeScript ](#tab-panel-9409)

JavaScript

```

// Sample vectors: 3 dimensions wide.

//

// Vectors from a machine-learning model are typically ~100 to 1536 dimensions

// wide (or wider still).

const sampleVectors = [

  {

    id: "1",

    values: [32.4, 74.1, 3.2],

    metadata: { url: "/products/sku/13913913" },

  },

  {

    id: "2",

    values: [15.1, 19.2, 15.8],

    metadata: { url: "/products/sku/10148191" },

  },

  {

    id: "3",

    values: [0.16, 1.2, 3.8],

    metadata: { url: "/products/sku/97913813" },

  },

  {

    id: "4",

    values: [75.1, 67.1, 29.9],

    metadata: { url: "/products/sku/418313" },

  },

  {

    id: "5",

    values: [58.8, 6.7, 3.4],

    metadata: { url: "/products/sku/55519183" },

  },

];


export async function onRequest(context) {

  let path = new URL(context.request.url).pathname;

  if (path.startsWith("/favicon")) {

    return new Response("", { status: 404 });

  }


  // You only need to insert vectors into your index once

  if (path.startsWith("/insert")) {

    // Insert some sample vectors into your index

    // In a real application, these vectors would be the output of a machine learning (ML) model,

    // such as Workers AI, OpenAI, or Cohere.

    let inserted = await context.env.VECTORIZE_INDEX.insert(sampleVectors);


    // Return the number of IDs we successfully inserted

    return Response.json(inserted);

  }

}


```

TypeScript

```

export interface Env {

  // This makes our vector index methods available on context.env.VECTORIZE_INDEX.*

  // For example, context.env.VECTORIZE_INDEX.insert() or query()

  VECTORIZE_INDEX: VectorizeIndex;

}


// Sample vectors: 3 dimensions wide.

//

// Vectors from a machine-learning model are typically ~100 to 1536 dimensions

// wide (or wider still).

const sampleVectors: Array<VectorizeVector> = [

  {

    id: "1",

    values: [32.4, 74.1, 3.2],

    metadata: { url: "/products/sku/13913913" },

  },

  {

    id: "2",

    values: [15.1, 19.2, 15.8],

    metadata: { url: "/products/sku/10148191" },

  },

  {

    id: "3",

    values: [0.16, 1.2, 3.8],

    metadata: { url: "/products/sku/97913813" },

  },

  {

    id: "4",

    values: [75.1, 67.1, 29.9],

    metadata: { url: "/products/sku/418313" },

  },

  {

    id: "5",

    values: [58.8, 6.7, 3.4],

    metadata: { url: "/products/sku/55519183" },

  },

];


export const onRequest: PagesFunction<Env> = async (context) => {

  let path = new URL(context.request.url).pathname;

  if (path.startsWith("/favicon")) {

    return new Response("", { status: 404 });

  }


  // You only need to insert vectors into your index once

  if (path.startsWith("/insert")) {

    // Insert some sample vectors into your index

    // In a real application, these vectors would be the output of a machine learning (ML) model,

    // such as Workers AI, OpenAI, or Cohere.

    let inserted = await context.env.VECTORIZE_INDEX.insert(sampleVectors);


    // Return the number of IDs we successfully inserted

    return Response.json(inserted);

  }

};


```

## Workers AI

[Workers AI](https://developers.cloudflare.com/workers-ai/) allows you to run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.

To bind Workers AI to your Pages Function, you can configure a Workers AI binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#workers-ai) or the Cloudflare dashboard.

When developing locally using Wrangler, you can define an AI binding using the `--ai` flag. Start Wrangler in development mode by running [wrangler pages dev --ai AI](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to expose the `context.env.AI` binding.

To configure a Workers AI binding via the Cloudflare dashboard:

1. Go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project > **Settings**.
3. Select your Pages environment > **Bindings** \> **Add** \> **Workers AI**.
4. Give your binding a name under **Variable name**.
5. Redeploy your project for the binding to take effect.

### Use Workers AI bindings

To use Workers AI in your Pages Function, you can access your Workers AI binding in your Pages Function code. In the following example, your Workers AI binding is called `AI` and you can access the binding in your Pages Function code on `context.env`.

* [  JavaScript ](#tab-panel-9410)
* [  TypeScript ](#tab-panel-9411)

JavaScript

```

export async function onRequest(context) {

  const input = { prompt: "What is the origin of the phrase Hello, World" };


  const answer = await context.env.AI.run(

    "@cf/meta/llama-3.1-8b-instruct",

    input,

  );


  return Response.json(answer);

}


```

TypeScript

```

interface Env {

  AI: Ai;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  const input = { prompt: "What is the origin of the phrase Hello, World" };


  const answer = await context.env.AI.run(

    "@cf/meta/llama-3.1-8b-instruct",

    input,

  );


  return Response.json(answer);

};


```

### Interact with your Workers AI binding locally

Workers AI local development usage charges

Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

You can interact with your Workers AI bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

To interact with a Workers AI binding via the Wrangler CLI while developing locally, run:

Terminal window

```

npx wrangler pages dev --ai=<BINDING_NAME>


```

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## Service bindings

[Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) enable you to call a Worker from within your Pages Function.

To bind your Pages Function to a Worker, configure a Service binding in your Pages Function using the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#service-bindings) or the Cloudflare dashboard.

To configure a Service binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **Service binding**.
4. Give your binding a name under **Variable name**.
5. Under **Service**, select your desired Worker.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use Service bindings in your Function. In the following example, your Service binding is called `SERVICE` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9412)
* [  TypeScript ](#tab-panel-9413)

JavaScript

```

export async function onRequestGet(context) {

  return context.env.SERVICE.fetch(context.request);

}


```

TypeScript

```

interface Env {

  SERVICE: Fetcher;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  return context.env.SERVICE.fetch(context.request);

};


```

### Interact with your Service bindings locally

You can interact with your Service bindings locally in one of two ways:

* Configure your Pages project's Wrangler file and run [npx wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).
* Pass arguments to `wrangler pages dev` directly.

To interact with a [Service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) while developing locally, run the Worker you want to bind to via `wrangler dev` and in parallel, run `wrangler pages dev` with `--service <BINDING_NAME>=<SCRIPT_NAME>` where `SCRIPT_NAME` indicates the name of the Worker. For example, if your Worker is called `my-worker`, connect with this Worker by running it via `npx wrangler dev` (in the Worker's directory) alongside `npx wrangler pages dev <OUTPUT_DIR> --service MY_SERVICE=my-worker` (in the Pages' directory). Interact with this binding by using `context.env` (for example, `context.env.MY_SERVICE`).

If you set up the Service binding via the Cloudflare dashboard, you will need to append `wrangler pages dev` with `--service <BINDING_NAME>=<SCRIPT_NAME>` where `BINDING_NAME` is the name of the Service binding and `SCRIPT_NAME` is the name of the Worker.

For example, to develop locally, if your Worker is called `my-worker`, run `npx wrangler dev` in the `my-worker` directory. In a different terminal, also run `npx wrangler pages dev <OUTPUT_DIR> --service MY_SERVICE=my-worker` in your Pages project directory. Interact with this Service binding by using `context.env` (for example, `context.env.MY_SERVICE`).

Wrangler also supports running your Pages project and bound Workers in the same dev session with one command. To try it out, pass multiple -c flags to Wrangler, like this: `wrangler pages dev -c wrangler.jsonc -c ../other-worker/wrangler.jsonc`. The first argument must point to your Pages configuration file, and the subsequent configurations will be accessible via a Service binding from your Pages project.

Warning

Support for running multiple Workers in the same dev session with one Wrangler command is experimental, and subject to change as we work on the experience. If you run into bugs or have any feedback, [open an issue on the workers-sdk repository ↗](https://github.com/cloudflare/workers-sdk/issues/new)

Note

If a binding is specified in a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and via a command-line argument, the command-line argument takes precedence.

## Queue Producers

[Queue Producers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#producer) enable you to send messages into a queue within your Pages Function.

To bind a queue to your Pages Function, configure a queue producer binding in your Pages Function using the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#queues-producers) or the Cloudflare dashboard:

To configure a queue producer binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **Queue**.
4. Give your binding a name under **Variable name**.
5. Under **Queue**, select your desired queue.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use a queue producer binding in your Function. In this example, the binding is named `MY_QUEUE` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9414)
* [  TypeScript ](#tab-panel-9415)

JavaScript

```

export async function onRequest(context) {

  await context.env.MY_QUEUE.send({

    url: request.url,

    method: request.method,

    headers: Object.fromEntries(request.headers),

  });


  return new Response("Sent!");

}


```

TypeScript

```

interface Env {

  MY_QUEUE: Queue<any>;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  await context.env.MY_QUEUE.send({

    url: request.url,

    method: request.method,

    headers: Object.fromEntries(request.headers),

  });


  return new Response("Sent!");

};


```

### Interact with your Queue Producer binding locally

If using a queue producer binding with a Pages Function, you will be able to send events to a queue locally. However, it is not possible to consume events from a queue with a Pages Function. You will have to create a [separate consumer Worker](https://developers.cloudflare.com/queues/get-started/#5-create-your-consumer-worker) with a [queue consumer handler](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) to consume events from the queue. Wrangler does not yet support running separate producer Functions and consumer Workers bound to the same queue locally.

## Hyperdrive configs

Note

PostgreSQL drivers like [Postgres.js ↗](https://github.com/porsager/postgres) depend on Node.js APIs. Pages Functions with Hyperdrive bindings must be [deployed with Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs).

* [  wrangler.jsonc ](#tab-panel-9422)
* [  wrangler.toml ](#tab-panel-9423)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


```

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) is a service for connecting to your existing databases from Cloudflare Workers and Pages Functions.

To bind your Hyperdrive config to your Pages Function, you can configure a Hyperdrive binding in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#hyperdrive) or the Cloudflare dashboard.

To configure a Hyperdrive binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **Hyperdrive**.
4. Give your binding a name under **Variable name**.
5. Under **Hyperdrive configuration**, select your desired configuration.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use Hyperdrive in your Function. In the following example, your Hyperdrive config is named `HYPERDRIVE` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9416)
* [  TypeScript ](#tab-panel-9417)

JavaScript

```

import postgres from "postgres";


export async function onRequest(context) {

  // create connection to postgres database

  const sql = postgres(context.env.HYPERDRIVE.connectionString);


  try {

    const result = await sql`SELECT id, name, value FROM records`;


    return Response.json({result: result})

  } catch (e) {

    return Response.json({error: e.message, {status: 500}});

  }

}


```

TypeScript

```

import postgres from "postgres";


interface Env {

  HYPERDRIVE: Hyperdrive;

}


type MyRecord = {

  id: number;

  name: string;

  value: string;

};


export const onRequest: PagesFunction<Env> = async (context) => {

  // create connection to postgres database

  const sql = postgres(context.env.HYPERDRIVE.connectionString);


  try {

    const result = await sql<MyRecord[]>`SELECT id, name, value FROM records`;


    return Response.json({result: result})

  } catch (e) {

    return Response.json({error: e.message, {status: 500}});

  }

};


```

### Interact with your Hyperdrive binding locally

To interact with your Hyperdrive binding locally, you must provide a local connection string to your database that your Pages project will connect to directly. You can set an environment variable `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` with the connection string of the database, or use the Wrangler file to configure your Hyperdrive binding with a `localConnectionString` as specified in [Hyperdrive documentation for local development](https://developers.cloudflare.com/hyperdrive/configuration/local-development/). Then, run [npx wrangler pages dev <OUTPUT\_DIR>](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev).

## Analytics Engine

The [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) binding enables you to write analytics within your Pages Function.

To bind an Analytics Engine dataset to your Pages Function, you must configure an Analytics Engine binding using the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#analytics-engine-datasets) or the Cloudflare dashboard:

To configure an Analytics Engine binding via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Bindings** \> **Add** \> **Analytics engine**.
4. Give your binding a name under **Variable name**.
5. Under **Dataset**, input your desired dataset.
6. Redeploy your project for the binding to take effect.

Below is an example of how to use an Analytics Engine binding in your Function. In the following example, the binding is called `ANALYTICS_ENGINE` and you can access the binding in your Function code on `context.env`:

* [  JavaScript ](#tab-panel-9418)
* [  TypeScript ](#tab-panel-9419)

JavaScript

```

export async function onRequest(context) {

  const url = new URL(context.request.url);


  context.env.ANALYTICS_ENGINE.writeDataPoint({

    indexes: [],

    blobs: [url.hostname, url.pathname],

    doubles: [],

  });


  return new Response("Logged analytic");

}


```

TypeScript

```

interface Env {

  ANALYTICS_ENGINE: AnalyticsEngineDataset;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  const url = new URL(context.request.url);


  context.env.ANALYTICS_ENGINE.writeDataPoint({

    indexes: [],

    blobs: [url.hostname, url.pathname],

    doubles: [],

  });


  return new Response("Logged analytic");

};


```

### Interact with your Analytics Engine binding locally

You cannot use an Analytics Engine binding locally.

## Environment variables

An [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) is an injected value that can be accessed by your Functions. Environment variables are a type of binding that allow you to attach text strings or JSON values to your Pages Function. It is stored as plain text. Set your environment variables directly within the Cloudflare dashboard for both your production and preview environments at runtime and build-time.

To add environment variables to your Pages project, you can use the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#environment-variables) or the Cloudflare dashboard.

To configure an environment variable via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Variables and Secrets** \> **Add** .
4. After setting a variable name and value, select **Save**.

Below is an example of how to use environment variables in your Function. The environment variable in this example is `ENVIRONMENT` and you can access the environment variable on `context.env`:

* [  JavaScript ](#tab-panel-9420)
* [  TypeScript ](#tab-panel-9421)

JavaScript

```

export function onRequest(context) {

  if (context.env.ENVIRONMENT === "development") {

    return new Response("This is a local environment!");

  } else {

    return new Response("This is a live environment");

  }

}


```

TypeScript

```

interface Env {

  ENVIRONMENT: string;

}


export const onRequest: PagesFunction<Env> = async (context) => {

  if (context.env.ENVIRONMENT === "development") {

    return new Response("This is a local environment!");

  } else {

    return new Response("This is a live environment");

  }

};


```

### Interact with your environment variables locally

You can interact with your environment variables locally in one of two ways:

* Configure your Pages project's Wrangler file and running `npx wrangler pages dev`.
* Pass arguments to [wrangler pages dev](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-dev) directly.

To interact with your environment variables locally via the Wrangler CLI, add `--binding=<ENVIRONMENT_VARIABLE_NAME>=<ENVIRONMENT_VARIABLE_VALUE>` to the `wrangler pages dev` command:

Terminal window

```

npx wrangler pages dev --binding=<ENVIRONMENT_VARIABLE_NAME>=<ENVIRONMENT_VARIABLE_VALUE>


```

## Secrets

Secrets are a type of binding that allow you to attach encrypted text values to your Pages Function. You cannot see secrets after you set them and can only access secrets programmatically on `context.env`. Secrets are used for storing sensitive information like API keys and auth tokens.

To add secrets to your Pages project:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Variables and Secrets** \> **Add**.
4. Set a variable name and value.
5. Select **Encrypt** to create your secret.
6. Select **Save**.

You use secrets the same way as environment variables. When setting secrets with Wrangler or in the Cloudflare dashboard, it needs to be done before a deployment that uses those secrets. For more guidance, refer to [Environment variables](#environment-variables).

### Local development with secrets

Warning

Do not use `vars` to store sensitive information in your Worker's Wrangler configuration file. Use secrets instead.

Put secrets for use in local development in either a `.dev.vars` file or a `.env` file, in the same directory as the Wrangler configuration file.

Note

You can use the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) to declare which secret names your Worker requires. When defined, only the keys listed in `secrets.required` are loaded from `.dev.vars` or `.env`. Additional keys are excluded and missing keys produce a warning.

Choose to use either `.dev.vars` or `.env` but not both. If you define a `.dev.vars` file, then values in `.env` files will not be included in the `env` object during local development.

These files should be formatted using the [dotenv ↗](https://hexdocs.pm/dotenvy/dotenv-file-format.html) syntax. For example:

.dev.vars / .env

```

SECRET_KEY="value"

API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


```

Do not commit secrets to git

The `.dev.vars` and `.env` files should not be committed to git. Add `.dev.vars*` and `.env*` to your project's `.gitignore` file.

To set different secrets for each Cloudflare environment, create files named `.dev.vars.<environment-name>` or `.env.<environment-name>`.

When you select a Cloudflare environment in your local development, the corresponding environment-specific file will be loaded ahead of the generic `.dev.vars` (or `.env`) file.

* When using `.dev.vars.<environment-name>` files, all secrets must be defined per environment. If `.dev.vars.<environment-name>` exists then only this will be loaded; the `.dev.vars` file will not be loaded.
* In contrast, all matching `.env` files are loaded and the values are merged. For each variable, the value from the most specific file is used, with the following precedence:  
   * `.env.<environment-name>.local` (most specific)  
   * `.env.local`  
   * `.env.<environment-name>`  
   * `.env` (least specific)

Controlling `.env` handling

It is possible to control how `.env` files are loaded in local development by setting environment variables on the process running the tools.

* To disable loading local dev vars from `.env` files without providing a `.dev.vars` file, set the `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` environment variable to `"false"`.
* To include every environment variable defined in your system's process environment as a local development variable, ensure there is no `.dev.vars` and then set the `CLOUDFLARE_INCLUDE_PROCESS_ENV` environment variable to `"true"`. This is not needed when using the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property), which loads from `process.env` automatically.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/bindings/#page","headline":"Bindings · Cloudflare Pages docs","description":"Connect Pages Functions to Cloudflare resources like KV, R2, D1, and Durable Objects.","url":"https://developers.cloudflare.com/pages/functions/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/bindings/","name":"Bindings"}}]}
```
