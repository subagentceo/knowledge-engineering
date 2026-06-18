---
title: Astro
description: Deploy an Astro site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Astro

[Astro ↗](https://astro.build) is an all-in-one web framework for building fast, content-focused websites. By default, Astro builds websites that have zero JavaScript runtime code.

Refer to the [Astro Docs ↗](https://docs.astro.build/) to learn more about Astro or for assistance with an Astro project.

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.

### Video Tutorial

## Set up a new project

To use `create-cloudflare` to create a new Astro project, run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-astro-app --framework=astro --platform=pages
```

```
yarn create cloudflare my-astro-app --framework=astro --platform=pages
```

```
pnpm create cloudflare@latest my-astro-app --framework=astro --platform=pages
```

Astro will ask:

1. Which project type you would like to set up. Your answers will not affect the rest of this tutorial. Select an answer ideal for your project.
2. If you want to initialize a Git repository. We recommend you to select `No` and follow this guide's [Git instructions](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/#create-a-github-repository) below. If you select `Yes`, do not follow the below Git instructions precisely but adjust them to your needs.

`create-cloudflare` will then install dependencies, including the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@astrojs/cloudflare` adapter, and ask you setup questions.

### Astro configuration

You can deploy an Astro Server-side Rendered (SSR) site to Cloudflare Pages using the [@astrojs/cloudflare adapter ↗](https://github.com/withastro/adapters/tree/main/packages/cloudflare#readme). SSR sites render on Pages Functions and allow for dynamic functionality and customizations.

Note

If using [create-cloudflare (C3) ↗](https://www.npmjs.com/package/create-cloudflare), you can bypass adding an adapter as C3 automatically installs any necessary adapters and configures them when creating your project.

Add the [@astrojs/cloudflare adapter ↗](https://github.com/withastro/adapters/tree/main/packages/cloudflare#readme) to your project's `package.json` by running:

Terminal window

```

npm run astro add cloudflare


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

## Deploy with Cloudflare Pages

### Deploy via the `create-cloudflare` CLI (C3)

If you use [create-cloudflare(C3) ↗](https://www.npmjs.com/package/create-cloudflare) to create your new Astro project, C3 will install all dependencies needed for your project and prompt you to deploy your project via the CLI. If you deploy, your site will be live and you will be provided with a deployment URL.

### Deploy via the Cloudflare dashboard

To deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Select the new GitHub repository that you created and then select **Begin setup**.
6. In the **Set up builds and deployments** section, provide the following information:

| Configuration option | Value         |  | Production branch | main |
| -------------------- | ------------- |  | ----------------- | ---- |
| Build command        | npm run build |  |                   |      |
| Build directory      | dist          |  |                   |      |

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, select **Save and Deploy**.

You will see your first deployment in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

### Local runtime

Local runtime support is configured via the `platformProxy` option:

JavaScript

```

import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";


export default defineConfig({

  adapter: cloudflare({

    platformProxy: {

      enabled: true,

    },

  }),

});


```

## Use bindings in your Astro application

A [binding](https://developers.cloudflare.com/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/), [Durable Object](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), and [D1 ↗](https://blog.cloudflare.com/introducing-d1/).

Use bindings in Astro components and API routes by using `context.locals` from [Astro Middleware ↗](https://docs.astro.build/en/guides/middleware/) to access the Cloudflare runtime which amongst other fields contains the Cloudflare's environment and consecutively any bindings set for your application.

Refer to the following example of how to access a KV namespace with TypeScript.

First, you need to define Cloudflare runtime and KV type by updating the `env.d.ts`. Make sure you have generated Cloudflare runtime types by running [wrangler types](https://developers.cloudflare.com/pages/functions/typescript/).

TypeScript

```

/// <reference types="astro/client" />


type ENV = {

  // replace `MY_KV` with your KV namespace

  MY_KV: KVNamespace;

};


// use a default runtime configuration (advanced mode).

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {

  interface Locals extends Runtime {}

}


```

You can then access your KV from an API endpoint in the following way:

TypeScript

```

import type { APIContext } from "astro";


export async function get({ locals }: APIContext) {

  const { MY_KV } = locals.runtime.env;


  return {

    // ...

  };

}


```

Besides endpoints, you can also use bindings directly from your Astro components:

TypeScript

```

---

const myKV = Astro.locals.runtime.env.MY_KV;

const value = await myKV.get("key");

---

<div>{value}</div>


```

To learn more about the Astro Cloudflare runtime, refer to the [Access to the Cloudflare runtime ↗](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#access-to-the-cloudflare-runtime) in the Astro documentation.

## Learn more

By completing this guide, you have successfully deployed your Astro site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/#page","headline":"Astro · Cloudflare Pages docs","description":"Deploy an Astro site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-an-astro-site/","name":"Astro"}}]}
```
