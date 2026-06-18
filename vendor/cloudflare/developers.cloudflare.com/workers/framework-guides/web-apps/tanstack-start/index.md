---
title: TanStack Start
description: Deploy a TanStack Start application to Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TanStack Start

[TanStack Start ↗](https://tanstack.com/start) is a full-stack framework for building web applications with server-side rendering, streaming, server functions, and bundling.

Already have a TanStack Start project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect TanStack Start, generate the necessary configuration, and deploy your project.

 npm  yarn  pnpm 

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

Learn more about [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/).

TanStack Start Detected 

Generated configuration 

wrangler.jsonc

main: .output/server/index.mjs 

wrangler.jsonc

assets: directory: .output/public 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

Workers Deployed 

Wrangler handles configuration automatically 

## Create a new application

Create a TanStack Start application pre-configured for Cloudflare Workers:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-tanstack-start-app --framework=tanstack-start
```

```
yarn create cloudflare my-tanstack-start-app --framework=tanstack-start
```

```
pnpm create cloudflare@latest my-tanstack-start-app --framework=tanstack-start
```

Start a local development server to preview your project during development:

 npm  yarn  pnpm 

```
npm run dev
```

```
yarn run dev
```

```
pnpm run dev
```

## Configure an existing application

If you have an existing TanStack Start application, configure it to run on Cloudflare Workers:

1. Install `@cloudflare/vite-plugin` and `wrangler`:  
 npm  yarn  pnpm  bun  
```  
npm i @cloudflare/vite-plugin wrangler -- -D  
```  
```  
yarn add @cloudflare/vite-plugin wrangler -D  
```  
```  
pnpm add @cloudflare/vite-plugin wrangler -D  
```  
```  
bun add @cloudflare/vite-plugin wrangler -D  
```
2. Add the Cloudflare plugin to your Vite configuration:  
   * [  JavaScript ](#tab-panel-11812)  
   * [  TypeScript ](#tab-panel-11813)  
vite.config.js  
```  
import { defineConfig } from "vite";  
import { tanstackStart } from "@tanstack/react-start/plugin/vite";  
import { cloudflare } from "@cloudflare/vite-plugin";  
import react from "@vitejs/plugin-react";  
export default defineConfig({  
  plugins: [  
    cloudflare({ viteEnvironment: { name: "ssr" } }),  
    tanstackStart(),  
    react(),  
  ],  
});  
```  
vite.config.ts  
```  
import { defineConfig } from "vite";  
import { tanstackStart } from "@tanstack/react-start/plugin/vite";  
import { cloudflare } from "@cloudflare/vite-plugin";  
import react from "@vitejs/plugin-react";  
export default defineConfig({  
  plugins: [  
    cloudflare({ viteEnvironment: { name: "ssr" } }),  
    tanstackStart(),  
    react(),  
  ],  
});  
```
3. Add a `wrangler.jsonc` configuration file:  
   * [  wrangler.jsonc ](#tab-panel-11804)  
   * [  wrangler.toml ](#tab-panel-11805)  
JSONC  
```  
{  
  "$schema": "node_modules/wrangler/config-schema.json",  
  "name": "<YOUR_PROJECT_NAME>",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "compatibility_flags": ["nodejs_compat"],  
  "main": "@tanstack/react-start/server-entry",  
  "observability": {  
    "enabled": true,  
  },  
}  
```  
TOML  
```  
"$schema" = "node_modules/wrangler/config-schema.json"  
name = "<YOUR_PROJECT_NAME>"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
compatibility_flags = [ "nodejs_compat" ]  
main = "@tanstack/react-start/server-entry"  
[observability]  
enabled = true  
```
4. Update the `scripts` section in `package.json`:  
package.json  
```  
{  
  "scripts": {  
    "dev": "vite dev",  
    "build": "vite build",  
    "preview": "vite preview",  
    "deploy": "npm run build && wrangler deploy",  
    "cf-typegen": "wrangler types"  
  }  
}  
```

## Deploy

Deploy to a `*.workers.dev` subdomain or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your machine or any CI/CD system, including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

 npm  yarn  pnpm 

```
npm run deploy
```

```
yarn run deploy
```

```
pnpm run deploy
```

Note

Preview the build locally before deploying:

 npm  yarn  pnpm 

```
npm run preview
```

```
yarn run preview
```

```
pnpm run preview
```

## Custom entrypoints

TanStack Start uses `@tanstack/react-start/server-entry` as your default entrypoint. Create a custom server entrypoint to add additional Workers handlers such as [Queues](https://developers.cloudflare.com/queues/) and [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/). This is also where you can add additional exports such as [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [Workflows](https://developers.cloudflare.com/workflows/).

1. Create a custom server entrypoint file:  
   * [  JavaScript ](#tab-panel-11816)  
   * [  TypeScript ](#tab-panel-11817)  
src/server.js  
```  
import handler from "@tanstack/react-start/server-entry";  
// Export Durable Objects as named exports  
export { MyDurableObject } from "./my-durable-object";  
export default {  
  fetch: handler.fetch,  
  // Handle Queue messages  
  async queue(batch, env, ctx) {  
    for (const message of batch.messages) {  
      console.log("Processing message:", message.body);  
      message.ack();  
    }  
  },  
  // Handle Cron Triggers  
  async scheduled(event, env, ctx) {  
    console.log("Cron triggered:", event.cron);  
  },  
};  
```  
src/server.ts  
```  
import handler from "@tanstack/react-start/server-entry";  
// Export Durable Objects as named exports  
export { MyDurableObject } from "./my-durable-object";  
export default {  
  fetch: handler.fetch,  
  // Handle Queue messages  
  async queue(batch, env, ctx) {  
    for (const message of batch.messages) {  
      console.log("Processing message:", message.body);  
      message.ack();  
    }  
  },  
  // Handle Cron Triggers  
  async scheduled(event, env, ctx) {  
    console.log("Cron triggered:", event.cron);  
  },  
};  
```
2. Update your Wrangler configuration to point to your custom entrypoint:  
   * [  wrangler.jsonc ](#tab-panel-11802)  
   * [  wrangler.toml ](#tab-panel-11803)  
JSONC  
```  
{  
  "main": "src/server.ts",  
}  
```  
TOML  
```  
main = "src/server.ts"  
```

### Test scheduled handlers locally

Test your scheduled handler locally using the `/cdn-cgi/handler/scheduled` endpoint:

Terminal window

```

curl "http://localhost:3000/cdn-cgi/handler/scheduled?cron=*+*+*+*+*"


```

Example: Using Workflows

Export a Workflow class from your custom entrypoint to run durable, multi-step tasks:

* [  JavaScript ](#tab-panel-11818)
* [  TypeScript ](#tab-panel-11819)

app/server.js

```

import {

  WorkflowEntrypoint,

  WorkflowStep,

  WorkflowEvent,

} from "cloudflare:workers";


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    const result = await step.do("process data", async () => {

      return `Processed: ${event.payload.input}`;

    });


    await step.sleep("wait", "10 seconds");


    await step.do("finalize", async () => {

      console.log("Workflow complete:", result);

    });

  }

}


```

app/server.ts

```

import {

  WorkflowEntrypoint,

  WorkflowStep,

  WorkflowEvent,

} from "cloudflare:workers";


export class MyWorkflow extends WorkflowEntrypoint<Env> {

  async run(event: WorkflowEvent<{ input: string }>, step: WorkflowStep) {

    const result = await step.do("process data", async () => {

      return `Processed: ${event.payload.input}`;

    });


    await step.sleep("wait", "10 seconds");


    await step.do("finalize", async () => {

      console.log("Workflow complete:", result);

    });

  }

}


```

Add the Workflow configuration to your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-11806)
* [  wrangler.toml ](#tab-panel-11807)

JSONC

```

{

  "workflows": [

    {

      "name": "my-workflow",

      "binding": "MY_WORKFLOW",

      "class_name": "MyWorkflow",

    },

  ],

}


```

TOML

```

[[workflows]]

name = "my-workflow"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


```

Example: Using Service Bindings

Add a service binding to call another Worker's RPC methods from your TanStack Start application:

* [  wrangler.jsonc ](#tab-panel-11808)
* [  wrangler.toml ](#tab-panel-11809)

JSONC

```

{

  "services": [

    {

      "binding": "AUTH_SERVICE",

      "service": "auth-worker",

    },

  ],

}


```

TOML

```

[[services]]

binding = "AUTH_SERVICE"

service = "auth-worker"


```

Call the bound Worker's methods from a server function:

* [  JavaScript ](#tab-panel-11814)
* [  TypeScript ](#tab-panel-11815)

app/routes/index.jsx

```

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


const verifyUser = createServerFn()

  .inputValidator((token) => token)

  .handler(async ({ data: token }) => {

    const result = await env.AUTH_SERVICE.verify(token);

    return result;

  });


```

app/routes/index.tsx

```

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


const verifyUser = createServerFn()

  .inputValidator((token: string) => token)

  .handler(async ({ data: token }) => {

    const result = await env.AUTH_SERVICE.verify(token);

    return result;

  });


```

## Bindings

Your TanStack Start application can be fully integrated with the Cloudflare Developer Platform, in both local development and in production, by using [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

Access bindings by [importing the env object](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) in your server-side code:

* [  JavaScript ](#tab-panel-11820)
* [  TypeScript ](#tab-panel-11821)

app/routes/index.jsx

```

import { createFileRoute } from "@tanstack/react-router";

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


export const Route = createFileRoute("/")({

  loader: () => getData(),

  component: RouteComponent,

});


const getData = createServerFn().handler(() => {

  // Access bindings via env

  // For example: env.MY_KV, env.MY_BUCKET, env.AI, etc.

});


function RouteComponent() {

  // ...

}


```

app/routes/index.tsx

```

import { createFileRoute } from "@tanstack/react-router";

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


export const Route = createFileRoute("/")({

  loader: () => getData(),

  component: RouteComponent,

});


const getData = createServerFn().handler(() => {

  // Access bindings via env

  // For example: env.MY_KV, env.MY_BUCKET, env.AI, etc.

});


function RouteComponent() {

  // ...

}


```

Generate TypeScript types for your bindings based on your Wrangler configuration:

 npm  yarn  pnpm 

```
npm run cf-typegen
```

```
yarn run cf-typegen
```

```
pnpm run cf-typegen
```

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[ Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more. 

### Use R2 in a server function

Add an [R2 bucket binding](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/#4-bind-your-bucket-to-a-worker) to your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-11810)
* [  wrangler.toml ](#tab-panel-11811)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "<YOUR_BUCKET_NAME>",

    },

  ],

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "<YOUR_BUCKET_NAME>"


```

Access the bucket in a server function:

* [  JavaScript ](#tab-panel-11822)
* [  TypeScript ](#tab-panel-11823)

app/routes/index.jsx

```

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


const uploadFile = createServerFn({ method: "POST" })

  .validator((data) => data)

  .handler(async ({ data }) => {

    await env.MY_BUCKET.put(data.key, data.content);

    return { success: true };

  });


const getFile = createServerFn()

  .validator((key) => key)

  .handler(async ({ data: key }) => {

    const object = await env.MY_BUCKET.get(key);

    return object ? await object.text() : null;

  });


```

app/routes/index.tsx

```

import { createServerFn } from "@tanstack/react-start";

import { env } from "cloudflare:workers";


const uploadFile = createServerFn({ method: "POST" })

  .validator((data: { key: string; content: string }) => data)

  .handler(async ({ data }) => {

    await env.MY_BUCKET.put(data.key, data.content);

    return { success: true };

  });


const getFile = createServerFn()

  .validator((key: string) => key)

  .handler(async ({ data: key }) => {

    const object = await env.MY_BUCKET.get(key);

    return object ? await object.text() : null;

  });


```

## Static prerendering

Prerender your application to static HTML at build time and serve as [static assets](https://developers.cloudflare.com/workers/static-assets/).

* [  JavaScript ](#tab-panel-11824)
* [  TypeScript ](#tab-panel-11825)

vite.config.js

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import react from "@vitejs/plugin-react";


export default defineConfig({

  plugins: [

    cloudflare({ viteEnvironment: { name: "ssr" } }),

    tanstackStart({

      prerender: {

        enabled: true,

      },

    }),

    react(),

  ],

});


```

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import react from "@vitejs/plugin-react";


export default defineConfig({

  plugins: [

    cloudflare({ viteEnvironment: { name: "ssr" } }),

    tanstackStart({

      prerender: {

        enabled: true,

      },

    }),

    react(),

  ],

});


```

For more options, refer to [TanStack Start static prerendering ↗](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering).

Note

Requires `@tanstack/react-start` v1.138.0 or later.

### Prerendering data sources

Warning

Prerendering runs at build time. It uses your local environment variables, secrets, and bindings storage data.

To prerender with production data, use [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

In CI environments, environment variables or secrets may not be available during the build. To make them accessible:

* Set `CLOUDFLARE_INCLUDE_PROCESS_ENV=true` in your CI environment and provide the required values as environment variables.
* If using [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), update your [build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/#page","headline":"TanStack Start · Cloudflare Workers docs","description":"Deploy a TanStack Start application to Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/tanstack-start/","name":"TanStack Start"}}]}
```
