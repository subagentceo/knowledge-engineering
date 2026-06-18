---
title: Next.js
description: Create an Next.js application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Next.js

**Start from CLI** \- scaffold a Next.js project on Workers.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-next-app --framework=next
```

```
yarn create cloudflare my-next-app --framework=next
```

```
pnpm create cloudflare@latest my-next-app --framework=next
```

This is a simple getting started guide. For detailed documentation on how to use the Cloudflare OpenNext adapter, visit the [OpenNext website ↗](https://opennext.js.org/cloudflare).

## What is Next.js?

[Next.js ↗](https://nextjs.org/) is a [React ↗](https://react.dev/) framework for building full stack applications.

Next.js supports Server-side and Client-side rendering, as well as Partial Prerendering which lets you combine static and dynamic components in the same route.

You can deploy your Next.js app to Cloudflare Workers using the OpenNext adapter.

## Next.js supported features

Most Next.js features are supported by the Cloudflare OpenNext adapter:

| Feature                               | Cloudflare adapter  | Notes                                                                        |
| ------------------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| App Router                            | 🟢 supported        |                                                                              |
| Pages Router                          | 🟢 supported        |                                                                              |
| Route Handlers                        | 🟢 supported        |                                                                              |
| React Server Components               | 🟢 supported        |                                                                              |
| Static Site Generation (SSG)          | 🟢 supported        |                                                                              |
| Server-Side Rendering (SSR)           | 🟢 supported        |                                                                              |
| Incremental Static Regeneration (ISR) | 🟢 supported        |                                                                              |
| Server Actions                        | 🟢 supported        |                                                                              |
| Response streaming                    | 🟢 supported        |                                                                              |
| asynchronous work with next/after     | 🟢 supported        |                                                                              |
| Middleware                            | 🟢 supported        |                                                                              |
| Image optimization                    | 🟢 supported        | Supported via [Cloudflare Images](https://developers.cloudflare.com/images/) |
| Partial Prerendering (PPR)            | 🟢 supported        | PPR is experimental in Next.js                                               |
| Composable Caching ('use cache')      | 🟢 supported        | Composable Caching is experimental in Next.js                                |
| Node.js in Middleware                 | ⚪ not yet supported | Node.js middleware introduced in 15.2 are not yet supported                  |

## Deploy a new Next.js project on Workers

1. **Create a new project with the create-cloudflare CLI (C3).**  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-next-app --framework=next  
```  
```  
yarn create cloudflare my-next-app --framework=next  
```  
```  
pnpm create cloudflare@latest my-next-app --framework=next  
```  
What's happening behind the scenes?  
When you run this command, C3 creates a new project directory, initiates[Next.js's official setup tool ↗](https://nextjs.org/docs/app/api-reference/cli/create-next-app), and configures the project for Cloudflare. It then offers the option to instantly deploy your application to Cloudflare.
2. **Develop locally.**  
After creating your project, run the following command in your project directory to start a local development server. The command uses the Next.js development server. It offers the best developer experience by quickly reloading your app every time the source code is updated.  
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
3. **Test and preview your site with the Cloudflare adapter.**  
 npm  yarn  pnpm  
```  
npm run preview  
```  
```  
yarn run preview  
```  
```  
pnpm run preview  
```  
What's the difference between dev and preview?  
The command used in the previous step uses the Next.js development server, which runs in Node.js. However, your deployed application will run on Cloudflare Workers, which uses the `workerd` runtime. Therefore when running integration tests and previewing your application, you should use the preview command, which is more accurate to production, as it executes your application in the `workerd` runtime using `wrangler dev`.
4. **Deploy your project.**  
You can deploy your project to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.  
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
Note  
[**Workers Builds**](https://developers.cloudflare.com/workers/ci-cd/builds/) requires you to configure environment variables in the ["Build Variables and secrets"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#:~:text=Build%20variables%20and%20secrets) section.  
This ensures the Next build has the necessary access to both public `NEXT_PUBLIC_...` variables and [non-NEXT\_PUBLIC\_... ↗](https://nextjs.org/docs/pages/guides/environment-variables#bundling-environment-variables-for-the-browser), which are essential for tasks like inlining and building SSG pages.  
Learn more in the [OpenNext environment variable guide ↗](https://opennext.js.org/cloudflare/howtos/env-vars#workers-builds)

## Deploy an existing Next.js project on Workers

Automatic configuration

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Next.js, generate the necessary configuration, and deploy your project.

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

Next.js Detected 

Generated configuration 

wrangler.jsonc

main: .open-next/worker.js 

wrangler.jsonc

assets: directory: .open-next/assets 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

package.json

adapter: @opennextjs/cloudflare 

Workers Deployed 

Wrangler handles configuration automatically 

## Manual configuration

If you prefer to configure your project manually, follow the steps below.

1. **Install [@opennextjs/cloudflare ↗](https://www.npmjs.com/package/@opennextjs/cloudflare)**  
 npm  yarn  pnpm  bun  
```  
npm i @opennextjs/cloudflare@latest  
```  
```  
yarn add @opennextjs/cloudflare@latest  
```  
```  
pnpm add @opennextjs/cloudflare@latest  
```  
```  
bun add @opennextjs/cloudflare@latest  
```
2. **Install [wrangler CLI ↗](https://developers.cloudflare.com/workers/wrangler) as a devDependency**  
 npm  yarn  pnpm  bun  
```  
npm i -D wrangler@latest  
```  
```  
yarn add -D wrangler@latest  
```  
```  
pnpm add -D wrangler@latest  
```  
```  
bun add -d wrangler@latest  
```
3. **Add a Wrangler configuration file**  
In your project root, create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the following content:  
   * [  wrangler.jsonc ](#tab-panel-11798)  
   * [  wrangler.toml ](#tab-panel-11799)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "main": ".open-next/worker.js",  
  "name": "my-app",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "compatibility_flags": [  
    "nodejs_compat"  
  ],  
  "assets": {  
    "directory": ".open-next/assets",  
    "binding": "ASSETS"  
  }  
}  
```  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
main = ".open-next/worker.js"  
name = "my-app"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
compatibility_flags = [ "nodejs_compat" ]  
[assets]  
directory = ".open-next/assets"  
binding = "ASSETS"  
```  
Note  
As shown above, you must enable the [nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) _and_ set your [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) to `2024-09-23` or later for your Next.js app to work with @opennextjs/cloudflare.
4. **Add a configuration file for OpenNext**  
In your project root, create an OpenNext configuration file named `open-next.config.ts` with the following content:  
TypeScript  
```  
import { defineCloudflareConfig } from "@opennextjs/cloudflare";  
export default defineCloudflareConfig();  
```  
Note  
`open-next.config.ts` is where you can configure the caching, see the [adapter documentation ↗](https://opennext.js.org/cloudflare/caching) for more information
5. **Update `package.json`**  
You can add the following scripts to your `package.json`:  
```  
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",  
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",  
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"  
```  
Usage  
   * `preview`: Builds your app and serves it locally, allowing you to quickly preview your app running locally in the Workers runtime, via a single command.  
   * `deploy`: Builds your app, and then deploys it to Cloudflare  
   * `cf-typegen`: Generates a `cloudflare-env.d.ts` file at the root of your project containing the types for the env.
6. **Develop locally.**  
After creating your project, run the following command in your project directory to start a local development server. The command uses the Next.js development server. It offers the best developer experience by quickly reloading your app after your source code is updated.  
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
7. **Test your site with the Cloudflare adapter.**  
The command used in the previous step uses the Next.js development server to offer a great developer experience. However your application will run on Cloudflare Workers so you want to run your integration tests and verify that your application works correctly in this environment.  
 npm  yarn  pnpm  
```  
npm run preview  
```  
```  
yarn run preview  
```  
```  
pnpm run preview  
```
8. **Deploy your project.**  
You can deploy your project to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.  
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
Note  
[**Workers Builds**](https://developers.cloudflare.com/workers/ci-cd/builds/) requires you to configure environment variables in the ["Build Variables and secrets"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#:~:text=Build%20variables%20and%20secrets) section.  
This ensures the Next build has the necessary access to both public `NEXT_PUBLIC_...` variables and [non-NEXT\_PUBLIC\_... ↗](https://nextjs.org/docs/pages/guides/environment-variables#bundling-environment-variables-for-the-browser), which are essential for tasks like inlining and building SSG pages.  
Learn more in the [OpenNext environment variable guide ↗](https://opennext.js.org/cloudflare/howtos/env-vars#workers-builds)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/#page","headline":"Next.js · Cloudflare Workers docs","description":"Create an Next.js application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/nextjs/","name":"Next.js"}}]}
```
