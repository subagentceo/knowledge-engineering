---
title: Astro
description: Create an Astro application and deploy it to Cloudflare Workers with Workers Assets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Astro

**Start from CLI**: Scaffold an Astro project on Workers, and pick your template.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-astro-app --framework=astro
```

```
yarn create cloudflare my-astro-app --framework=astro
```

```
pnpm create cloudflare@latest my-astro-app --framework=astro
```

---

**Or just deploy**: Create a static blog with Astro and deploy it on Cloudflare Workers, with CI/CD and previews all set up for you.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)

## What is Astro?

[Astro ↗](https://astro.build/) is a JavaScript web framework designed for creating websites that display large amounts of content (such as blogs, documentation sites, or online stores).

Astro emphasizes performance through minimal client-side JavaScript - by default, it renders as much content as possible at build time, or [on-demand ↗](https://docs.astro.build/en/guides/on-demand-rendering/) on the "server" - this can be a Cloudflare Worker. [“Islands” ↗](https://docs.astro.build/en/concepts/islands/) of JavaScript are added only where interactivity or personalization is needed.

Astro is also framework-agnostic, and supports every major UI framework, including React, Preact, Svelte, Vue, SolidJS, via its official [integrations ↗](https://astro.build/integrations/).

## Deploy a new Astro project on Workers

1. **Create a new project with the create-cloudflare CLI (C3).**  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- my-astro-app --framework=astro  
```  
```  
yarn create cloudflare my-astro-app --framework=astro  
```  
```  
pnpm create cloudflare@latest my-astro-app --framework=astro  
```  
What's happening behind the scenes?  
When you run this command, C3 creates a new project directory, initiates [Astro's official setup tool ↗](https://docs.astro.build/en/tutorial/1-setup/2/), and configures the project for Cloudflare. It then offers the option to instantly deploy your application to Cloudflare.
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

## Deploy an existing Astro project on Workers

Automatic configuration

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Astro, generate the necessary configuration, and deploy your project.

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

Astro Detected 

Generated configuration 

wrangler.jsonc

main: dist/\_worker.js/index.js 

wrangler.jsonc

assets: directory: ./dist, binding: ASSETS 

wrangler.jsonc

compatibility\_flags: nodejs\_compat 

wrangler.jsonc

observability: enabled: true 

astro.config.mjs

adapter: @astrojs/cloudflare 

Workers Deployed 

Wrangler handles configuration automatically 

## Manual configuration

If you prefer to configure your project manually, follow the steps below.

### If you have a static site

If your Astro project is entirely pre-rendered, follow these steps:

1. **Add a Wrangler configuration file**  
In your project root, create a Wrangler configuration file with the following content:  
   * [  wrangler.jsonc ](#tab-panel-11786)  
   * [  wrangler.toml ](#tab-panel-11787)  
JSONC  
```  
{  
  "name": "my-astro-app",  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "assets": {  
    "directory": "./dist"  
  }  
}  
```  
TOML  
```  
name = "my-astro-app"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
[assets]  
directory = "./dist"  
```  
What's this configuration doing?  
The key part of this config is the `assets` field, which tells Wrangler where to find your static assets. In this case, we're telling Wrangler to look in the `./dist` directory. If your assets are in a different directory, update the `directory` value accordingly. Read about other [asset configuration options](https://developers.cloudflare.com/workers/wrangler/configuration/#assets).  
Also note how there's no `main` field in this config - this is because you're only serving static assets, so no Worker code is needed for on demand rendering/SSR.
2. **Build and deploy your project**  
You can deploy your project to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.  
 npm  yarn  pnpm  
```  
npx astro build  
```  
```  
yarn astro build  
```  
```  
pnpm astro build  
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

### If your site uses on demand rendering

If your Astro project uses [on demand rendering (also known as SSR) ↗](https://docs.astro.build/en/guides/on-demand-rendering/), follow these steps:

1. **Install the Astro Cloudflare adapter**  
 npm  yarn  pnpm  
```  
npx astro add cloudflare  
```  
```  
yarn astro add cloudflare  
```  
```  
pnpm astro add cloudflare  
```  
What's happening behind the scenes?  
This command installs the Cloudflare adapter and makes the appropriate changes to your `astro.config.mjs` file in one step. By default, this sets the build output configuration to `output: 'server'`, which server renders all your pages by default. If there are certain pages that _don't_ need on demand rendering/SSR, for example static pages like a privacy policy, you should set `export const prerender = true` for that page or route to pre-render it. You can read more about the adapter configuration options [in the Astro docs ↗](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#options).
2. **Add a `.assetsignore` file**Create a `.assetsignore` file in your `public/` folder, and add the following lines to it:  
.assetsignore  
```  
_worker.js  
_routes.json  
```
3. **Add a Wrangler configuration file**  
In your project root, create a Wrangler configuration file with the following content:  
   * [  wrangler.jsonc ](#tab-panel-11790)  
   * [  wrangler.toml ](#tab-panel-11791)  
JSONC  
```  
{  
  "name": "my-astro-app",  
  "main": "./dist/_worker.js/index.js",  
  // Update to today's date  
  // Set this to today's date  
  "compatibility_date": "2026-06-18",  
  "compatibility_flags": ["nodejs_compat"],  
  "assets": {  
    "binding": "ASSETS",  
    "directory": "./dist"  
  },  
  "observability": {  
    "enabled": true  
  }  
}  
```  
TOML  
```  
name = "my-astro-app"  
main = "./dist/_worker.js/index.js"  
# Set this to today's date  
compatibility_date = "2026-06-18"  
compatibility_flags = [ "nodejs_compat" ]  
[assets]  
binding = "ASSETS"  
directory = "./dist"  
[observability]  
enabled = true  
```  
What's this configuration doing?  
The key parts of this config are:  
   * `main` points to the entry point of your Worker script. This is generated by the Astro adapter, and is what powers your server-rendered pages.  
   * `assets.directory` tells Wrangler where to find your static assets. In this case, we're telling Wrangler to look in the `./dist` directory. If your assets are in a different directory, update the `directory` value accordingly.  
Read more about [Wrangler configuration options](https://developers.cloudflare.com/workers/wrangler/configuration/) and [asset configuration options](https://developers.cloudflare.com/workers/wrangler/configuration/#assets).
4. **Build and deploy your project**  
You can deploy your project to a [\*.workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) or a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) from your local machine or any CI/CD system (including [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/#workers-builds)). Use the following command to build and deploy. If you're using a CI service, be sure to update your "deploy command" accordingly.  
 npm  yarn  pnpm  
```  
npx astro build  
```  
```  
yarn astro build  
```  
```  
pnpm astro build  
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

## Bindings

Note

You cannot use bindings if you're using Astro to generate a purely static site.

With bindings, your Astro application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more. Refer to the [bindings overview](https://developers.cloudflare.com/workers/runtime-apis/bindings/) for more information on what's available and how to configure them.

The [Astro docs ↗](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#cloudflare-runtime) provide information about how you can access them in your `locals`.

## Sessions

Astro's [Sessions API ↗](https://docs.astro.build/en/guides/sessions/) allows you to store user data between requests, such as user preferences, shopping carts, or authentication credentials. When using the Cloudflare adapter, Astro automatically configures [Workers KV](https://developers.cloudflare.com/kv/) for session storage.

Wrangler automatically provisions a KV namespace named `SESSION` when you deploy, so no manual setup is required.

```

---

export const prerender = false;

const cart = await Astro.session?.get("cart");

---


<a href="/checkout">{cart?.length ?? 0} items</a>


```

You can customize the KV binding name with the [sessionKVBindingName ↗](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#sessionkvbindingname) adapter option if you want to use a different binding name.

## Custom 404 pages

To serve a custom 404 page for your Astro site, add `not_found_handling` to your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-11788)
* [  wrangler.toml ](#tab-panel-11789)

JSONC

```

{

  "assets": {

    "directory": "./dist",

    "not_found_handling": "404-page"

  }

}


```

TOML

```

[assets]

directory = "./dist"

not_found_handling = "404-page"


```

This tells Cloudflare to serve your custom 404 page (for example, `src/pages/404.astro`) when a route is not found. Read more about [static asset routing behavior](https://developers.cloudflare.com/workers/static-assets/routing/).

## Astro's build configuration

The Astro Cloudflare adapter sets the build output configuration to `output: 'server'`, which means all pages are rendered on-demand in your Cloudflare Worker. If there are certain pages that _don't_ need on demand rendering/SSR, for example static pages such as a privacy policy, you should set `export const prerender = true` for that page or route to pre-render it. You can read more about on-demand rendering [in the Astro docs ↗](https://docs.astro.build/en/guides/on-demand-rendering/).

If you want to use Astro as a static site generator, you do not need the Astro Cloudflare adapter. Astro will pre-render all pages at build time by default, and you can simply upload those static assets to be served by Cloudflare.

## Node.js requirements

Astro 5.x requires Node.js 18.17.1 or higher. Astro 6 (currently in beta) requires Node.js 22 or higher. If you're using [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), ensure your build environment meets these requirements.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/#page","headline":"Astro · Cloudflare Workers docs","description":"Create an Astro application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["ssg","full-stack","Astro"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/framework-guides/web-apps/","name":"Web applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/framework-guides/web-apps/astro/","name":"Astro"}}]}
```
