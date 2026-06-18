---
title: RedwoodSDK
description: Create a RedwoodSDK application and deploy it to Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RedwoodSDK

In this guide, you will create a new [RedwoodSDK ↗](https://rwsdk.com/) application and deploy it to Cloudflare Workers.

RedwoodSDK is a framework for building server-side web applications on Cloudflare. It is a Vite plugin that provides SSR, React Server Components, Server Functions, and realtime capabilities.

## Deploy a new RedwoodSDK application on Workers

1. **Create a new project.**  
Run the following command, replacing `my-project-name` with your desired project name:  
 npm  yarn  pnpm  
```  
npx create-rwsdk my-project-name  
```  
```  
yarn dlx create-rwsdk my-project-name  
```  
```  
pnpx create-rwsdk my-project-name  
```
2. **Change the directory.**  
Terminal window  
```  
cd my-project-name  
```
3. **Install dependencies.**  
 npm  yarn  pnpm  bun  
```  
npm install  
```  
```  
yarn install  
```  
```  
pnpm install  
```  
```  
bun install  
```
4. **Develop locally.**  
Run the following command in the project directory to start a local development server. RedwoodSDK is a Vite plugin, so you can use the same development workflow as any other Vite project:  
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
Access the development server in your browser at `http://localhost:5173`, where you should see "Hello, World!" displayed on the page.
5. **Add your first route.**  
The entry point of your application is `src/worker.tsx`. Open that file in your editor.  
You will see the `defineApp` function, which handles requests by returning responses to the client:  
```  
import { defineApp } from "rwsdk/worker";  
import { route, render } from "rwsdk/router";  
import { Document } from "@/app/Document";  
import { Home } from "@/app/pages/Home";  
export default defineApp([  
  render(Document, [route("/", () => new Response("Hello, World!"))]),  
]);  
```  
Add a `/ping` route handler:  
```  
import { defineApp } from "rwsdk/worker";  
import { route, render } from "rwsdk/router";  
export default defineApp([  
  render(Document, [  
    route("/", () => new Response("Hello, World!")),  
    route("/ping", function () {  
      return <h1>Pong!</h1>;  
    }),  
  ]),  
]);  
```  
Navigate to `http://localhost:5173/ping` to see "Pong!" displayed on the page.  
Routes can return JSX directly. RedwoodSDK has support for React Server Components, which renders JSX on the server and sends HTML to the client.
6. **Deploy your project.**  
You can deploy your project to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), either from your local machine or from any CI/CD system, including [Cloudflare Workers CI/CD](https://developers.cloudflare.com/workers/ci-cd/builds/).  
Use the following command to build and deploy. If you are using CI, make sure to update your [deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration accordingly.  
 npm  yarn  pnpm  
```  
npm run release  
```  
```  
yarn run release  
```  
```  
pnpm run release  
```  
The first time you run the command it might fail and ask you to create a workers.dev subdomain. Go to the dashboard and open the Workers menu. Opening the Workers landing page for the first time will create a workers.dev subdomain automatically.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/#page","headline":"RedwoodSDK · Cloudflare Workers docs","description":"Create a RedwoodSDK application and deploy it to Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/redwoodsdk/","name":"RedwoodSDK"}}]}
```
