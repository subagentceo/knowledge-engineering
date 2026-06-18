---
title: Solid
description: Create a Solid application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Solid

Note

Support for SolidStart projects on Cloudflare Workers is currently in beta.

Already have a Solid Start project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Solid Start, generate the necessary configuration, and deploy your project.

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

Solid Start Detected 

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

In this guide, you will create a new [Solid ↗](https://www.solidjs.com/) application and deploy to Cloudflare Workers (with the new [Workers Assets](https://developers.cloudflare.com/workers/static-assets/)).

## 1\. Set up a new project

Use the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Solid's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Solid project with Workers Assets, run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-solid-app --framework=solid --experimental
```

```
yarn create cloudflare my-solid-app --framework=solid --experimental
```

```
pnpm create cloudflare@latest my-solid-app --framework=solid --experimental
```

After setting up your project, change your directory by running the following command:

Terminal window

```

cd my-solid-app


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

## 3\. Deploy your Project

Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including [Cloudflare's own](https://developers.cloudflare.com/workers/ci-cd/builds/).

The following command will build and deploy your project. If you're using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.

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

Your Solid application can be fully integrated with the Cloudflare Developer Platform, in both local development and in production, by using product bindings. The [Solid documentation ↗](https://docs.solidjs.com/reference/server-utilities/get-request-event) provides information about how to access platform primitives, including bindings. Specifically, for Cloudflare, you can use [getRequestEvent().nativeEvent.context.cloudflare.env ↗](https://docs.solidjs.com/solid-start/advanced/request-events#nativeevent) to access bindings.

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[ Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/solid/#page","headline":"Solid · Cloudflare Workers docs","description":"Create a Solid application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/solid/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/","name":"More guides..."}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/solid/","name":"Solid"}}]}
```
