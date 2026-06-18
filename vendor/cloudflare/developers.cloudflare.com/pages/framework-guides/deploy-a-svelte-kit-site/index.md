---
title: SvelteKit
description: Learn how to create and deploy a SvelteKit application to Cloudflare Pages using the create-cloudflare CLI
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SvelteKit

SvelteKit is the official framework for building modern web applications with [Svelte ↗](https://svelte.dev), an increasingly popular open-source tool for creating user interfaces. Unlike most frameworks, SvelteKit uses Svelte, a compiler that transforms your component code into efficient JavaScript, enabling SvelteKit to deliver fast, reactive applications that update the DOM surgically as the application state changes.

In this guide, you will create a new SvelteKit application and deploy it using Cloudflare Pages. You will use [SvelteKit ↗](https://kit.svelte.dev/), the official Svelte framework for building web applications of all sizes.

## Setting up a new project

Use the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate SvelteKit's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new SvelteKit project, run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-svelte-app --framework=svelte --platform=pages
```

```
yarn create cloudflare my-svelte-app --framework=svelte --platform=pages
```

```
pnpm create cloudflare@latest my-svelte-app --framework=svelte --platform=pages
```

SvelteKit will prompt you for customization choices. For the template option, choose one of the application/project options. The remaining answers will not affect the rest of this guide. Choose the options that suit your project.

`create-cloudflare` will then install dependencies, including the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the SvelteKit `@sveltejs/adapter-cloudflare` adapter, and ask you setup questions.

After you have installed your project dependencies, start your application:

Terminal window

```

npm run dev


```

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After creating a new repository, go to your newly created project directory to prepare and push your local application to GitHub by running the following commands in your terminal:

Terminal window

```

git init

git remote add origin https://github.com/<your-gh-username>/<repository-name>

git add .

git commit -m "Initial commit"

git branch -M main

git push -u origin main


```

## SvelteKit Cloudflare configuration

To use SvelteKit with Cloudflare Pages, you need to add the [Cloudflare adapter ↗](https://kit.svelte.dev/docs/adapter-cloudflare) to your application.

Note

If using [create-cloudflare (C3) ↗](https://www.npmjs.com/package/create-cloudflare), you can bypass adding an adapter as C3 automatically installs any necessary adapters and configures them when creating your project.

1. Install the Cloudflare Adapter by running `npm i --save-dev @sveltejs/adapter-cloudflare` in your terminal.
2. Include the adapter in `svelte.config.js`:

```

 import adapter from '@sveltejs/adapter-auto';

 import adapter from '@sveltejs/adapter-cloudflare';


/** @type {import('@sveltejs/kit').Config} */

const config = {

  kit: {

    adapter: adapter(),

    // ... truncated ...

  }

};


export default config;


```

1. (Needed if you are using TypeScript) Include support for environment variables. The `env` object, containing KV namespaces and other storage objects, is passed to SvelteKit via the platform property along with context and caches, meaning you can access it in hooks and endpoints. For example:

```

declare namespace App {

    interface Locals {}


   interface Platform {

       env: {

           COUNTER: DurableObjectNamespace;

       };

       context: {

           waitUntil(promise: Promise<any>): void;

       };

       caches: CacheStorage & { default: Cache }

   }


    interface Session {}


    interface Stuff {}

}


```

1. Access the added KV or Durable objects (or generally any [binding](https://developers.cloudflare.com/pages/functions/bindings/)) in your endpoint with `env`:

JavaScript

```

export async function post(context) {

  const counter = context.platform.env.COUNTER.idFromName("A");

}


```

Note

In addition to the Cloudflare adapter, review other adapters you can use in your project:

* [@sveltejs/adapter-auto ↗](https://www.npmjs.com/package/@sveltejs/adapter-auto)  
SvelteKit's default adapter automatically chooses the adapter for your current environment. If you use this adapter, [no configuration is needed ↗](https://kit.svelte.dev/docs/adapter-auto). However, the default adapter introduces a few disadvantages for local development because it has no way of knowing what platform the application is going to be deployed to.

To solve this issue, provide a `CF_PAGES` variable to SvelteKit so that the adapter can detect the Pages platform. For example, when locally building the application: `CF_PAGES=1 vite build`.

* [@sveltejs/adapter-static ↗](https://www.npmjs.com/package/@sveltejs/adapter-static)Only produces client-side static assets (no server-side rendering) and is compatible with Cloudflare Pages. Review the [official SvelteKit documentation ↗](https://kit.svelte.dev/docs/adapter-static) for instructions on how to set up the adapter. Keep in mind that if you decide to use this adapter, the build directory, instead of `.svelte-kit/cloudflare`, becomes `build`. You must also configure your Cloudflare Pages application's build directory accordingly.

Warning

If you are using any adapter different from the default SvelteKit adapter, remember to commit and push your adapter setting changes to your GitHub repository before attempting the deployment.

## Deploy with Cloudflare Pages

### Deploy via the `create-cloudflare` CLI (C3)

If you use [create-cloudflare(C3) ↗](https://www.npmjs.com/package/create-cloudflare) to create your new Svelte project, C3 will install all dependencies needed for your project and prompt you to deploy your project via the CLI. If you deploy, your site will be live and you will be provided with a deployment URL.

### Deploy via the Cloudflare dashboard

To deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Select the new GitHub repository that you created and then select **Begin setup**.
6. In the **Build settings** section, select _SvelteKit_ as your **Framework preset**. Your selection will provide the following information:

| Configuration option | Value                  |  | Production branch | main |
| -------------------- | ---------------------- |  | ----------------- | ---- |
| Build command        | npm run build          |  |                   |      |
| Build directory      | .svelte-kit/cloudflare |  |                   |      |

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your SvelteKit project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

## Functions setup

In SvelteKit, functions are written as endpoints. Functions contained in the `/functions` directory at the project's root will not be included in the deployment, which compiles to a single `_worker.js` file.

To have the functionality equivalent to Pages Functions [onRequests](https://developers.cloudflare.com/pages/functions/api-reference/#onrequests), you need to write standard request handlers in SvelteKit. For example, the following TypeScript file behaves like an `onRequestGet`:

TypeScript

```

import type { RequestHandler } from "./$types";


export const GET = (({ url }) => {

  return new Response(String(Math.random()));

}) satisfies RequestHandler;


```

SvelteKit API Routes

For more information about SvelteKit API Routes, refer to the [SvelteKit documentation ↗](https://kit.svelte.dev/docs/routing#server).

## Learn more

By completing this guide, you have successfully deployed your Svelte site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/#page","headline":"SvelteKit · Cloudflare Pages docs","description":"Learn how to create and deploy a SvelteKit application to Cloudflare Pages using the create-cloudflare CLI","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-svelte-kit-site/","name":"SvelteKit"}}]}
```
