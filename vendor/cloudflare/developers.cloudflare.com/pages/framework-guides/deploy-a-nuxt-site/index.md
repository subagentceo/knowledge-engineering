---
title: Nuxt
description: Web framework making Vue.js-based development simple and powerful.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Nuxt

[Nuxt ↗](https://nuxt.com) is a web framework making Vue.js-based development simple and powerful.

In this guide, you will create a new Nuxt application and deploy it using Cloudflare Pages.

### Video Tutorial

## Create a new project using the `create-cloudflare` CLI (C3)

The [create-cloudflare CLI (C3)](https://developers.cloudflare.com/pages/get-started/c3/) will configure your Nuxt site for Cloudflare Pages. Run the following command in your terminal to create a new Nuxt site:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-nuxt-app --framework=nuxt --platform=pages
```

```
yarn create cloudflare my-nuxt-app --framework=nuxt --platform=pages
```

```
pnpm create cloudflare@latest my-nuxt-app --framework=nuxt --platform=pages
```

C3 will ask you a series of setup questions and create a new project with [nuxi (the official Nuxt CLI) ↗](https://github.com/nuxt/cli). C3 will also install the necessary adapters along with the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/#check-your-wrangler-version).

After creating your project, C3 will generate a new `my-nuxt-app` directory using the default Nuxt template, updated to be fully compatible with Cloudflare Pages.

When creating your new project, C3 will give you the option of deploying an initial version of your application via [Direct Upload](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/). You can redeploy your application at any time by running following command inside your project directory:

Terminal window

```

npm run deploy


```

Git integration

The initial deployment created via C3 is referred to as a [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/). To set up a deployment via the Pages Git integration, refer to the [Git Integration](#git-integration) section below.

## Configure and deploy a project without C3

To deploy a Nuxt project without C3, follow the [Nuxt Get Started guide ↗](https://nuxt.com/docs/getting-started/installation). After you have set up your Nuxt project, choose either the [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/) or [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/) to deploy your Nuxt project on Cloudflare Pages.

## Git integration

In addition to [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) deployments, you can deploy projects via [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration). Git integration allows you to connect a GitHub or GitLab repository to your Pages application and have your Pages application automatically built and deployed after each new commit is pushed to it.

Git integration

Currently, you cannot add Git integration to existing Pages applications. If you have already deployed your application, you need to create a new Pages application in order to add Git integration to it.

Setup requires a basic understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to GitHub's [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

### Create a GitHub repository

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After creating a new repository, go to your newly created project directory to prepare and push your local application to GitHub by running the following commands in your terminal:

Terminal window

```

# Skip the following three commands if you have built your application

# using C3 or already committed your changes

git init

git add .

git commit -m "Initial commit"


git branch -M main

git remote add origin https://github.com/<YOUR_GH_USERNAME>/<REPOSITORY_NAME>

git push -u origin main


```

### Create a Pages project

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

1. After completing configuration, select the **Save and Deploy**.

Review your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified. Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying your changes to production.

## Use bindings in your Nuxt application

A [binding](https://developers.cloudflare.com/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](https://developers.cloudflare.com/kv/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), and [D1](https://developers.cloudflare.com/d1/).

If you intend to use bindings in your project, you must first set up your bindings for local and remote development.

### Set up bindings for local development

Projects created via C3 come with `nitro-cloudflare-dev`, a `nitro` module that simplifies the process of working with bindings during development:

TypeScript

```

export default defineNuxtConfig({

  modules: ["nitro-cloudflare-dev"],

});


```

This module is powered by the [getPlatformProxy helper function](https://developers.cloudflare.com/workers/wrangler/api#getplatformproxy). `getPlatformProxy` will automatically detect any bindings defined in your project's Wrangler configuration file and emulate those bindings in local development. Review [Wrangler configuration information on bindings](https://developers.cloudflare.com/workers/wrangler/configuration/#bindings) for more information on how to configure bindings in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

Note

Wrangler configuration is used primarily for local development. Bindings specified in it are not available remotely, unless they are created as [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

### Set up bindings for a deployed application

In order to access bindings in a deployed application, you will need to [configure your bindings](https://developers.cloudflare.com/pages/functions/bindings/) in the Cloudflare dashboard.

### Add bindings to TypeScript projects

To get proper type support, you need to create a new `env.d.ts` file in the root of your project and declare a [binding](https://developers.cloudflare.com/pages/functions/bindings/). Make sure you have generated Cloudflare runtime types by running [wrangler types](https://developers.cloudflare.com/pages/functions/typescript/).

The following is an example of adding a `KVNamespace` binding:

TypeScript

```

declare module "h3" {

  interface H3EventContext {

    cf: CfProperties;

    cloudflare: {

      request: Request;

      env: {

        MY_KV: KVNamespace;

      };

      context: ExecutionContext;

    };

  }

}


```

### Access bindings in your Nuxt application

In Nuxt, add server-side code via [Server Routes and Middleware ↗](https://nuxt.com/docs/guide/directory-structure/server#server-directory). The `defineEventHandler()` method is used to define your API endpoints in which you can access Cloudflare's context via the provided `context` field. The `context` field allows you to access any bindings set for your application.

The following code block shows an example of accessing a KV namespace in Nuxt.

* [  JavaScript ](#tab-panel-9396)
* [  TypeScript ](#tab-panel-9397)

JavaScript

```

export default defineEventHandler(({ context }) => {

  const MY_KV = context.cloudflare.env.MY_KV;


  return {

    // ...

  };

});


```

TypeScript

```

export default defineEventHandler(({ context }) => {

  const MY_KV = context.cloudflare.env.MY_KV;


  return {

    // ...

  };

});


```

## Learn more

By completing this guide, you have successfully deployed your Nuxt site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/#page","headline":"Nuxt · Cloudflare Pages docs","description":"Web framework making Vue.js-based development simple and powerful.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-nuxt-site/","name":"Nuxt"}}]}
```
