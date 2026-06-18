---
title: Docusaurus
description: Create a Docusaurus application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Docusaurus

**Start from CLI**: Scaffold a Docusaurus project on Workers, and pick your template.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-docusaurus-app --framework=docusaurus
```

```
yarn create cloudflare my-docusaurus-app --framework=docusaurus
```

```
pnpm create cloudflare@latest my-docusaurus-app --framework=docusaurus
```

**Or just deploy**: Create a documentation site with Docusaurus and deploy it on Cloudflare Workers, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/staging/astro-blog-starter-template)

## What is Docusaurus?

[Docusaurus ↗](https://docusaurus.io/) is an open-source framework for building, deploying, and maintaining documentation websites. It is built on React and provides an intuitive way to create static websites with a focus on documentation.

Docusaurus is designed to be easy to use and customizable, making it a popular choice for developers and organizations looking to create documentation sites quickly.

## Deploy a new Docusaurus project on Workers

1. **Create a new project with the create-cloudflare CLI (C3).**  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-docusaurus-app --framework=docusaurus --platform=workers  
```  
```  
yarn create cloudflare my-docusaurus-app --framework=docusaurus --platform=workers  
```  
```  
pnpm create cloudflare@latest my-docusaurus-app --framework=docusaurus --platform=workers  
```  
What's happening behind the scenes?  
When you run this command, C3 creates a new project directory, initiates [Docusaurus' official setup tool ↗](https://docusaurus.io/docs/installation), and configures the project for Cloudflare. It then offers the option to instantly deploy your application to Cloudflare.
2. **Develop locally.**  
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
3. **Deploy your project.**  
Your project can be deployed to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your local machine or any CI/CD system, (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds/)).  
Use the following command to build and deploy your project. If you're using a CI service, be sure to update your "deploy command" accordingly.  
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

## Deploy an existing Docusaurus project on Workers

### If you have a static site

If your Docusaurus project is entirely pre-rendered (which it usually is), follow these steps:

1. **Add a Wrangler configuration file.**  
In your project root, create a Wrangler configuration file with the following content:  
   * [  wrangler.jsonc ](#tab-panel-11796)  
   * [  wrangler.toml ](#tab-panel-11797)  
JSONC  
```  
  {  
    "name": "my-docusaurus-app",  
    // Update to today's date  
    // Set this to today's date  
    "compatibility_date": "2026-06-18",  
    "assets": {  
      "directory": "./build"  
    }  
  }  
```  
TOML  
```  
name = "my-docusaurus-app"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
[assets]  
directory = "./build"  
```  
What's this configuration doing?  
The key part of this config is the `assets` field, which tells Wrangler where to find your static assets. In this case, we're telling Wrangler to look in the `./build` directory. If your assets are in a different directory, update the `directory` value accordingly. Refer to other [asset configuration options](https://developers.cloudflare.com/workers/static-assets/routing/).  
Also note how there's no `main` field in this config - this is because you're only serving static assets, so no Worker code is needed for on demand rendering/SSR.
2. **Build and deploy your project.**  
You can deploy your project to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.  
 npm  yarn  pnpm  
```  
npx docusaurus build  
```  
```  
yarn docusaurus build  
```  
```  
pnpm docusaurus build  
```  
 npm  yarn  pnpm  
```  
npx wrangler@latest deploy  
```  
```  
yarn wrangler@latest deploy  
```  
```  
pnpm wrangler@latest deploy  
```

## Use bindings with Docusaurus

Bindings are a way to connect your Docusaurus project to other Cloudflare services, enabling you to store and retrieve data within your application.

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

[ Bindings ](https://developers.cloudflare.com/workers/runtime-apis/bindings/) Access to compute, storage, AI and more. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/#page","headline":"Docusaurus · Cloudflare Workers docs","description":"Create a Docusaurus application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["ssg"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/","name":"More guides..."}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/","name":"Docusaurus"}}]}
```
