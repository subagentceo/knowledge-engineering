---
title: Qwik
description: Deploy a Qwik City application to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Qwik

[Qwik ↗](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability ↗](https://qwik.builder.io/docs/concepts/resumable/), server-side rendering of HTML and [fine-grained lazy-loading ↗](https://qwik.builder.io/docs/concepts/progressive/#lazy-loading) of code.

In this guide, you will create a new Qwik application implemented via [Qwik City ↗](https://qwik.builder.io/qwikcity/overview/) (Qwik's meta-framework) and deploy it using Cloudflare Pages.

## Creating a new project

Use the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to create a new project. C3 will create a new project directory, initiate Qwik's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Qwik project, run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-qwik-app --framework=qwik --platform=pages
```

```
yarn create cloudflare my-qwik-app --framework=qwik --platform=pages
```

```
pnpm create cloudflare@latest my-qwik-app --framework=qwik --platform=pages
```

`create-cloudflare` will install additional dependencies, including the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/#check-your-wrangler-version) and any necessary adapters, and ask you setup questions.

As part of the `cloudflare-pages` adapter installation, a `functions/[[path]].ts` file will be created. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](https://developers.cloudflare.com/pages/functions/routing/#dynamic-routes) to learn more.

After selecting your server option, change the directory to your project and render your project by running the following command:

Terminal window

```

npm start


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

If you use [create-cloudflare(C3) ↗](https://www.npmjs.com/package/create-cloudflare) to create your new Qwik project, C3 will install all dependencies needed for your project and prompt you to deploy your project via the CLI. If you deploy, your site will be live and you will be provided with a deployment URL.

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

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Qwik site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Use bindings in your Qwik application

A [binding](https://developers.cloudflare.com/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/), [Durable Object](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), and [D1 ↗](https://blog.cloudflare.com/introducing-d1/).

In QwikCity, add server-side code via [routeLoaders ↗](https://qwik.builder.io/qwikcity/route-loader/) and [actions ↗](https://qwik.builder.io/qwikcity/action/). Then access bindings set for your application via the `platform` object provided by the framework.

The following code block shows an example of accessing a KV namespace in QwikCity.

TypeScript

```

// ...


export const useGetServerTime = routeLoader$(({ platform }) => {

  // the type `KVNamespace` comes from runtime types generated by running `wrangler types`

  const { MY_KV } = (platform.env as { MY_KV: KVNamespace }));


  return {

    // ....

  }

});


```

## Learn more

By completing this guide, you have successfully deployed your Qwik site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-qwik-site/#page","headline":"Qwik · Cloudflare Pages docs","description":"Deploy a Qwik City application to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-qwik-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-qwik-site/","name":"Qwik"}}]}
```
