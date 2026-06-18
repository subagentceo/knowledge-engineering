---
title: React + Vite
description: Create a React application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# React + Vite

**Start from CLI** \- scaffold a full-stack app with a React SPA, Cloudflare Workers API, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) for lightning-fast development.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-react-app --framework=react
```

```
yarn create cloudflare my-react-app --framework=react
```

```
pnpm create cloudflare@latest my-react-app --framework=react
```

---

**Or just deploy** \- create a full-stack app using React, Hono API and Vite, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/main/vite-react-template)

## What is React?

[React ↗](https://react.dev/) is a framework for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently. You can use React to build a single-page application (SPA), and combine it with a backend API running on Cloudflare Workers to create a full-stack application.

## Creating a full-stack app with React

1. **Create a new project with the create-cloudflare CLI (C3)**  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-react-app --framework=react  
```  
```  
yarn create cloudflare my-react-app --framework=react  
```  
```  
pnpm create cloudflare@latest my-react-app --framework=react  
```  
How is this project set up?  
Below is a simplified file tree of the project.  
   * Directorymy-react-app  
         * Directorysrc/  
                  * App.tsx  
         * Directoryworker/  
                  * index.ts  
         * index.html  
         * vite.config.ts  
         * wrangler.jsonc  
`wrangler.jsonc` is your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). In this file:  
   * `main` points to `worker/index.ts`. This is your Worker, which is going to act as your backend API.  
   * `assets.not_found_handling` is set to `single-page-application`, which means that routes that are handled by your React SPA do not go to the Worker, and are thus free.  
   * If you want to add bindings to resources on Cloudflare's developer platform, you configure them here. Read more about [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).  
`vite.config.ts` is set up to use the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). This runs your Worker in the Cloudflare Workers runtime, ensuring your local development environment is as close to production as possible.  
`worker/index.ts` is your backend API, which contains a single endpoint, `/api/`, that returns a text response. At `src/App.tsx`, your React app calls this endpoint to get a message back and displays this.
2. **Develop locally with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)**  
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
This project uses Vite for local development and build, and thus comes with all of Vite's features, including hot module replacement (HMR).  
In addition, `vite.config.ts` is set up to use the Cloudflare Vite plugin. This runs your application in the Cloudflare Workers runtime, just like in production, and enables access to local emulations of bindings.
3. **Deploy your project**  
Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including Cloudflare's own [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).  
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

## Asset Routing

If you're using React as a SPA, you will want to set `not_found_handling = "single-page-application"` in your Wrangler configuration file.

By default, Cloudflare first tries to match a request path against a static asset path, which is based on the file structure of the uploaded asset directory. This is either the directory specified by `assets.directory` in your Wrangler config or, in the case of the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), the output directory of the client build. Failing that, we invoke a Worker if one is present. If there is no Worker, or the Worker then uses the asset binding, Cloudflare will fallback to the behaviour set by [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/#routing-behavior).

Refer to the [routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/) for more information about how routing works with static assets, and how to customize this behavior.

## Use bindings with React

Your new project also contains a Worker at `./worker/index.ts`, which you can use as a backend API for your React application. While your React application cannot directly access Workers bindings, it can interact with them through this Worker. You can make [fetch() requests](https://developers.cloudflare.com/workers/runtime-apis/fetch/) from your React application to the Worker, which can then handle the request and use bindings. Learn how to [configure Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[ Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react/#page","headline":"React + Vite · Cloudflare Workers docs","description":"Create a React application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/react/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["spa"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/react/","name":"React + Vite"}}]}
```
