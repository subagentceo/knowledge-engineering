---
title: React Router (formerly Remix)
description: Create a React Router application and deploy it to Cloudflare Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# React Router (formerly Remix)

**Start from CLI**: Scaffold a full-stack app with [React Router v7 ↗](https://reactrouter.com/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for lightning-fast development.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-react-router-app --framework=react-router
```

```
yarn create cloudflare my-react-router-app --framework=react-router
```

```
pnpm create cloudflare@latest my-react-router-app --framework=react-router
```

**Or just deploy**: Create a full-stack app using React Router v7, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-starter-template)

Note

SPA mode and prerendering are not currently supported when using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). If you wish to use React Router in an SPA then we recommend starting with the [React template](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/) and using React Router [as a library ↗](https://reactrouter.com/start/data/installation).

Already have a React Router project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect React Router, generate the necessary configuration, and deploy your project.

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

React Router Detected 

Generated configuration 

wrangler.jsonc

main: build/server/index.js 

wrangler.jsonc

assets: directory: build/client 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

Workers Deployed 

Wrangler handles configuration automatically 

## What is React Router?

[React Router v7 ↗](https://reactrouter.com/) is a full-stack React framework for building web applications. It combines with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) to provide a first-class experience for developing, building and deploying your apps on Cloudflare.

## Creating a full-stack React Router app

1. **Create a new project with the create-cloudflare CLI (C3)**  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-react-router-app --framework=react-router  
```  
```  
yarn create cloudflare my-react-router-app --framework=react-router  
```  
```  
pnpm create cloudflare@latest my-react-router-app --framework=react-router  
```  
How is this project set up?  
Below is a simplified file tree of the project.  
   * Directorymy-react-router-app  
         * Directoryapp  
                  * Directoryroutes  
                              * ...  
                  * entry.server.ts  
                  * root.tsx  
                  * routes.ts  
         * Directoryworkers  
                  * app.ts  
         * react-router.config.ts  
         * vite.config.ts  
         * wrangler.jsonc  
`react-router.config.ts` is your [React Router config file ↗](https://reactrouter.com/explanation/special-files#react-routerconfigts). In this file:  
   * `ssr` is set to `true`, meaning that your application will use server-side rendering.  
   * `future.v8_viteEnvironmentApi` is set to `true` to enable compatibility with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).  
`vite.config.ts` is your [Vite config file ↗](https://vite.dev/config/). The React Router and Cloudflare plugins are included in the `plugins` array. The [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) runs your server code in the Workers runtime, ensuring your local development environment is as close to production as possible.  
`wrangler.jsonc` is your [Worker config file](https://developers.cloudflare.com/workers/wrangler/configuration/). In this file:  
   * `main` points to `./workers/app.ts`. This is the entry file for your Worker. The default export includes a [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/fetch/), which delegates the request to React Router.  
   * If you want to add [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to resources on Cloudflare's developer platform, you configure them here.
2. **Develop locally**  
After creating your project, run the following command in your project directory to start a local development server.  
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
What's happening in local development?  
This project uses React Router in combination with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). This means that your application runs in the Cloudflare Workers runtime, just like in production, and enables access to local emulations of bindings.
3. **Deploy your project**  
Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your own machine or from any CI/CD system, including Cloudflare's own [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).  
The following command will build and deploy your project. If you are using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.  
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

## Use bindings with React Router

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

Once you have configured the bindings in the Wrangler configuration file, they are then available within `context.cloudflare` in your loader or action functions:

app/routes/home.tsx

```

export function loader({ context }: Route.LoaderArgs) {

  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };

}


export default function Home({ loaderData }: Route.ComponentProps) {

  return <Welcome message={loaderData.message} />;

}


```

As you have direct access to your Worker entry file (`workers/app.ts`), you can also add additional exports such as [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [Workflows](https://developers.cloudflare.com/workflows/)

Example: Using Workflows

Here is an example of how to set up a simple Workflow in your Worker entry file.

workers/app.ts

```

import { createRequestHandler } from "react-router";

import { WorkflowEntrypoint, type WorkflowStep, type WorkflowEvent } from 'cloudflare:workers';


declare global {

  interface CloudflareEnvironment extends Env {}

}


type Env = {

  MY_WORKFLOW: Workflow;

};


export class MyWorkflow extends WorkflowEntrypoint<Env> {

  override async run(event: WorkflowEvent<{ hello: string }>, step: WorkflowStep) {

    await step.do("first step", async () => {

      return { output: "First step result" };

    });


    await step.sleep("sleep", "1 second");


    await step.do("second step", async () => {

      return { output: "Second step result" };

    });


    return "Workflow output";

  }

}


const requestHandler = createRequestHandler(

  () => import("virtual:react-router/server-build"),

  import.meta.env.MODE

);


export default {

  async fetch(request, env, ctx) {

    return requestHandler(request, {

      cloudflare: { env, ctx },

    });

  },

} satisfies ExportedHandler<CloudflareEnvironment>;


```

Configure it in your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-11800)
* [  wrangler.toml ](#tab-panel-11801)

JSONC

```

{

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

[[workflows]]

name = "my-workflow"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


```

And then use it in your application:

app/routes/home.tsx

```

export async function action({ context }: Route.ActionArgs) {

  const env = context.cloudflare.env;

  const instance = await env.MY_WORKFLOW.create({ params: { "hello": "world" } })

  return { id: instance.id, details: await instance.status() };

}


```

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[ Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/#page","headline":"React Router (formerly Remix) · Cloudflare Workers docs","description":"Create a React Router application and deploy it to Cloudflare Workers","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/react-router/","name":"React Router (formerly Remix)"}}]}
```
