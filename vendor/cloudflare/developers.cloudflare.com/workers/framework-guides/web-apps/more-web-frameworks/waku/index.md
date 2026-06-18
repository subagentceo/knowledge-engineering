---
title: Waku
description: Create a Waku application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Waku

In this guide, you will create a new [Waku ↗](https://waku.gg/) application and deploy to Cloudflare Workers (with the new [Workers Assets](https://developers.cloudflare.com/workers/static-assets/)). Waku is a minimal React framework built for [React 19 ↗](https://react.dev/blog/2024/12/05/react-19) and [React Server Components ↗](https://react.dev/reference/rsc/server-components). The use of Server Components is completely optional. It can be configured to run Server Components during build and output static HTML or it can be configured to run with dynamic React server rendering. It is built on top of [Hono ↗](https://hono.dev/) and [Vite ↗](https://vite.dev/).

Already have a Waku project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Waku, generate the necessary configuration, and deploy your project.

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

Waku Detected 

Generated configuration 

wrangler.jsonc

main: dist/worker.js 

wrangler.jsonc

assets: directory: dist/public 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

Workers Deployed 

Wrangler handles configuration automatically 

## 1\. Set up a new project

Use the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Waku's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Waku project with Workers Assets, run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest my-waku-app -- --framework=waku
```

```
yarn create cloudflare@latest my-waku-app --framework=waku
```

```
pnpm create cloudflare@latest my-waku-app --framework=waku
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Framework Starter`.
* For _Which development framework do you want to use?_, choose `Waku`.
* Complete the framework's own CLI wizard.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

After setting up your project, change your directory by running the following command:

Terminal window

```

cd my-waku-app


```

## 2\. Develop locally

After you have created your project, run the following command in the project directory to start a local server. This will allow you to preview your project locally during development.

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

## 3\. Deploy your project

Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including [Cloudflare's own](https://developers.cloudflare.com/workers/ci-cd/builds/).

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

---

## Bindings

Your Waku application can be fully integrated with the Cloudflare Developer Platform, in both local development and in production, by using product bindings. The [Waku Cloudflare documentation ↗](https://waku.gg/guides/cloudflare#accessing-cloudflare-bindings-execution-context-and-request-response-objects) provides information about configuring bindings and how you can access them in your React Server Components.

## Static assets

You can serve static assets in your Waku application by adding them to the `./public/` directory. Common examples include images, stylesheets, fonts, and web manifests.

During the build process, Waku copies `.js`, `.css`, `.html`, and `.txt` files from this directory into the final assets output. `.txt` files are used for storing data used by Server Components that are rendered at build time.

By default, Cloudflare first tries to match a request path against a static asset path, which is based on the file structure of the uploaded asset directory. This is either the directory specified by `assets.directory` in your Wrangler config or, in the case of the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), the output directory of the client build. Failing that, we invoke a Worker if one is present. If there is no Worker, or the Worker then uses the asset binding, Cloudflare will fallback to the behaviour set by [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/#routing-behavior).

Refer to the [routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/) for more information about how routing works with static assets, and how to customize this behavior.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/waku/#page","headline":"Waku · Cloudflare Workers docs","description":"Create a Waku application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/waku/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/","name":"More guides..."}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/waku/","name":"Waku"}}]}
```
