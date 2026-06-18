---
title: Build your first Workflow
description: Create and deploy your first Cloudflare Workflow with durable, multi-step execution on the Workers platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build your first Workflow

Workflows allow you to build durable, multi-step applications using the Workers platform. A Workflow can automatically retry, persist state, run for hours or days, and coordinate between third-party APIs.

You can build Workflows to post-process file uploads to [R2 object storage](https://developers.cloudflare.com/r2/), automate generation of [Workers AI](https://developers.cloudflare.com/workers-ai/) embeddings into a [Vectorize](https://developers.cloudflare.com/vectorize/) vector database, or to trigger user lifecycle emails using [Email Service](https://developers.cloudflare.com/email-service/).

Note

The term "Durable Execution" is widely used to describe this programming model.

"Durable" describes the ability of the program to implicitly persist state without you having to manually write to an external store or serialize program state.

In this guide, you will create and deploy a Workflow that fetches data, pauses, and processes results.

## Quick start

If you want to skip the steps and pull down the complete Workflow we are building in this guide, run:

Terminal window

```

npm create cloudflare@latest workflows-starter -- --template "cloudflare/workflows-starter"


```

Use this option if you are familiar with Cloudflare Workers or want to explore the code first and learn the details later.

Follow the steps below to learn how to build a Workflow from scratch.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a new Worker project

1. Open a terminal and run the `create cloudflare` (C3) CLI tool to create your Worker project:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-workflow  
```  
```  
yarn create cloudflare my-workflow  
```  
```  
pnpm create cloudflare@latest my-workflow  
```  
For setup, select the following options:  
   * For _What would you like to start with?_, choose `Hello World example`.  
   * For _Which template would you like to use?_, choose `Worker only`.  
   * For _Which language do you want to use?_, choose `TypeScript`.  
   * For _Do you want to use git for version control?_, choose `Yes`.  
   * For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).
2. Move into your new project directory:  
Terminal window  
```  
cd my-workflow  
```  
What files did C3 create?  
In your project directory, C3 will have generated the following:  
   * `wrangler.jsonc`: Your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration).  
   * `src/index.ts`: A minimal Worker written in TypeScript.  
   * `package.json`: A minimal Node dependencies configuration file.  
   * `tsconfig.json`: TypeScript configuration.

## 2\. Write your Workflow

1. Create a new file `src/workflow.ts`:  
src/workflow.ts  
```  
import { WorkflowEntrypoint, WorkflowStep } from "cloudflare:workers";  
import type { WorkflowEvent } from "cloudflare:workers";  
type Params = { name?: string };  
type IPResponse = { result: { ipv4_cidrs: string[] } };  
export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {  
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {  
    const data = await step.do("fetch data", async () => {  
      const response = await fetch(  
        "https://api.cloudflare.com/client/v4/ips",  
      );  
      return await response.json<IPResponse>();  
    });  
    await step.sleep("pause", "20 seconds");  
    const result = await step.do(  
      "process data",  
      { retries: { limit: 3, delay: "5 seconds", backoff: "linear" } },  
      async () => {  
        return {  
          name: event.payload.name ?? "World",  
          ipCount: data.result.ipv4_cidrs.length,  
        };  
      },  
    );  
    return result;  
  }  
}  
```  
A Workflow extends `WorkflowEntrypoint` and implements a `run` method. This code also passes in our `Params` type as a [type parameter](https://developers.cloudflare.com/workflows/build/events-and-parameters/) so that events that trigger our Workflow are typed.  
The [step](https://developers.cloudflare.com/workflows/build/workers-api/#step) object is the core of the Workflows API. It provides methods to define durable steps in your Workflow:  
   * `step.do(name, callback)` \- Executes code and persists the result. If the Workflow is interrupted or retried, it resumes from the last successful step rather than re-running completed work. The callback returns serializable data, including `ReadableStream<Uint8Array>` for large binary output in JavaScript Workflows.  
   * `step.sleep(name, duration)` \- Pauses the Workflow for a duration (for example, `"10 seconds"`, `"1 hour"`).  
If you return a stream, return a fresh, unlocked `ReadableStream<Uint8Array>`. BYOB streams and BYOB readers are not supported.  
You can pass a [retry configuration](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/) to `step.do()` to customize how failures are handled. See the [full step API](https://developers.cloudflare.com/workflows/build/workers-api/#step) for stream requirements, limits, and additional methods like `sleepUntil` and `waitForEvent`.  
When deciding whether to break code into separate steps, ask yourself: "Do I want all of this code to run again if just one part fails?" Separate steps are ideal for operations like calling external APIs, querying databases, or reading files from storage - if a later step fails, your Workflow can retry from that point using data already fetched, avoiding redundant API calls or database queries.  
For more guidance on how to define your Workflow logic, refer to [Rules of Workflows](https://developers.cloudflare.com/workflows/build/rules-of-workflows/).

## 3\. Configure your Workflow

1. Open `wrangler.jsonc`, which is your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project and your Workflow, and add the `workflows` configuration:  
   * [  wrangler.jsonc ](#tab-panel-13069)  
   * [  wrangler.toml ](#tab-panel-13070)  
JSONC  
```  
{  
  "$schema": "node_modules/wrangler/config-schema.json",  
  "name": "my-workflow",  
  "main": "src/index.ts",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "observability": {  
    "enabled": true  
  },  
  "workflows": [  
    {  
      "name": "my-workflow",  
      "binding": "MY_WORKFLOW",  
      "class_name": "MyWorkflow"  
    }  
  ]  
}  
```  
TOML  
```  
"$schema" = "node_modules/wrangler/config-schema.json"  
name = "my-workflow"  
main = "src/index.ts"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
[observability]  
enabled = true  
[[workflows]]  
name = "my-workflow"  
binding = "MY_WORKFLOW"  
class_name = "MyWorkflow"  
```  
The `class_name` must match your exported class, and `binding` is the variable name you use to access the Workflow in your code (like `env.MY_WORKFLOW`).  
If you want the same Workflow to run automatically on a recurring interval, add `schedules` to the Workflow definition:  
   * [  wrangler.jsonc ](#tab-panel-13071)  
   * [  wrangler.toml ](#tab-panel-13072)  
JSONC  
```  
{  
  "$schema": "node_modules/wrangler/config-schema.json",  
  "name": "my-workflow",  
  "main": "src/index.ts",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "workflows": [  
    {  
      "name": "my-workflow",  
      "binding": "MY_WORKFLOW",  
      "class_name": "MyWorkflow",  
      "schedules": ["0 * * * *"]  
    }  
  ]  
}  
```  
TOML  
```  
"$schema" = "node_modules/wrangler/config-schema.json"  
name = "my-workflow"  
main = "src/index.ts"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
[[workflows]]  
name = "my-workflow"  
binding = "MY_WORKFLOW"  
class_name = "MyWorkflow"  
schedules = [ "0 * * * *" ]  
```  
Each matching cron expression creates a new Workflow instance automatically, so you do not need top-level `triggers.crons` and a separate `scheduled` handler for Workflow-specific recurring runs.  
Scheduled instances include the matching cron expression and scheduled trigger time on `event.schedule`.  
Use the latest Wrangler release when configuring Workflow schedules. If your local Wrangler schema does not recognize `schedules` yet, update Wrangler before deploying.  
You can also access [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) (such as [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), or [D1](https://developers.cloudflare.com/d1/)) via `this.env` within your Workflow. For more information on bindings within Workers, refer to [Bindings (env)](https://developers.cloudflare.com/workers/runtime-apis/bindings/).
2. Now, generate types for your bindings:  
Terminal window  
```  
npx wrangler types  
```  
This creates a `worker-configuration.d.ts` file with the `Env` type that includes your `MY_WORKFLOW` binding.

## 4\. Write your API

Now, you'll need a place to call your Workflow.

1. Replace `src/index.ts` with a [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) to start and check Workflow instances:  
src/index.ts  
```  
export { MyWorkflow } from "./workflow";  
export default {  
  async fetch(request: Request, env: Env): Promise<Response> {  
    const url = new URL(request.url);  
    const instanceId = url.searchParams.get("instanceId");  
    if (instanceId) {  
      const instance = await env.MY_WORKFLOW.get(instanceId);  
      return Response.json(await instance.status());  
    }  
    const instance = await env.MY_WORKFLOW.create();  
    return Response.json({ instanceId: instance.id });  
  },  
} satisfies ExportedHandler<Env>;  
```

## 5\. Develop locally

1. Start a local development server:  
Terminal window  
```  
npx wrangler dev  
```
2. To start a Workflow instance, open a new terminal window and run:  
Terminal window  
```  
curl http://localhost:8787  
```  
An `instanceId` will be automatically generated:  
```  
{ "instanceId": "abc-123-def" }  
```
3. Check the status using the returned `instanceId`:  
Terminal window  
```  
curl "http://localhost:8787?instanceId=abc-123-def"  
```  
The Workflow will progress through its steps. After about 20 seconds (the sleep duration), it will complete.

## 6\. Deploy your Workflow

1. Deploy your Workflow:  
Terminal window  
```  
npx wrangler deploy  
```  
Test in production using the same curl commands against your deployed URL. You can also [trigger a workflow instance](https://developers.cloudflare.com/workflows/build/trigger-workflows/) in production via Workers, Wrangler, or the Cloudflare dashboard.  
Once deployed, you can also inspect Workflow instances with the CLI:  
Terminal window  
```  
npx wrangler workflows instances describe my-workflow latest  
```  
The output of `instances describe` shows:  
   * The status (success, failure, running) of each step  
   * Any state emitted by the step. For streamed output, the CLI shows a preview or summary instead of the full contents.  
   * Any `sleep` state, including when the Workflow will wake up  
   * Retries associated with each step  
   * Errors, including exception messages

## Learn more

[ Events and parameters ](https://developers.cloudflare.com/workflows/build/events-and-parameters/) Pass data to Workflows and pause for external events with waitForEvent. 

[ Sleeping and retrying ](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/) Configure retry behavior and sleep patterns. 

[ Workers API ](https://developers.cloudflare.com/workflows/build/workers-api/) Explore the full Workflows API for programmatic control. 

[ Rules of Workflows ](https://developers.cloudflare.com/workflows/build/rules-of-workflows/) Understand the programming model and best practices. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/get-started/guide/#page","headline":"Build your first Workflow · Cloudflare Workflows docs","description":"Create and deploy your first Cloudflare Workflow with durable, multi-step execution on the Workers platform.","url":"https://developers.cloudflare.com/workflows/get-started/guide/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/get-started/guide/","name":"Build your first Workflow"}}]}
```
