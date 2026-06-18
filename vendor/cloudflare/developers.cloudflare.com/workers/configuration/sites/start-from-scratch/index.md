---
title: Start from scratch
description: Create a new Workers Sites project from scratch with Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Start from scratch

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

This guide shows how to quickly start a new Workers Sites project from scratch.

## Getting started

1. Ensure you have the latest version of [git ↗](https://git-scm.com/downloads) and [Node.js ↗](https://nodejs.org/en/download/) installed.
2. In your terminal, clone the `worker-sites-template` starter repository. The following example creates a project called `my-site`:  
Terminal window  
```  
git clone --depth=1 --branch=wrangler2 https://github.com/cloudflare/worker-sites-template my-site  
```
3. Run `npm install` to install all dependencies.
4. You can preview your site by running the [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) command:  
Terminal window  
```  
wrangler dev  
```
5. Deploy your site to Cloudflare:  
Terminal window  
```  
npx wrangler deploy  
```

## Project layout

The template project contains the following files and directories:

* `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
* `src`: The Worker configured for serving your assets. You do not need to edit this but if you want to see how it works or add more functionality to your Worker, you can edit `src/index.ts`.
* `wrangler.jsonc`: The file containing project configuration. The `bucket` property tells Wrangler where to find the static assets (e.g. `site = { bucket = "./public" }`).
* `package.json`/`package-lock.json`: define the required Node.js dependencies.

## Customize the `wrangler.jsonc` file:

* Change the `name` property to the name of your project:  
   * [  wrangler.jsonc ](#tab-panel-11505)  
   * [  wrangler.toml ](#tab-panel-11506)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "my-site"  
}  
```  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "my-site"  
```
* Consider updating`compatibility_date` to today's date to get access to the most recent Workers features:  
   * [  wrangler.jsonc ](#tab-panel-11507)  
   * [  wrangler.toml ](#tab-panel-11508)  
JSONC  
```  
{  
  "compatibility_date": "yyyy-mm-dd"  
}  
```  
TOML  
```  
compatibility_date = "yyyy-mm-dd"  
```
* Deploy your site to a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) that you own and have already attached as a Cloudflare zone:  
   * [  wrangler.jsonc ](#tab-panel-11509)  
   * [  wrangler.toml ](#tab-panel-11510)  
JSONC  
```  
{  
  "route": "https://example.com/*"  
}  
```  
TOML  
```  
route = "https://example.com/*"  
```  
Note  
Refer to the documentation on [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) to configure a `route` properly.

Learn more about [configuring your project](https://developers.cloudflare.com/workers/wrangler/configuration/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/#page","headline":"Start from scratch · Cloudflare Workers docs","description":"Create a new Workers Sites project from scratch with Wrangler.","url":"https://developers.cloudflare.com/workers/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/sites/","name":"Workers Sites"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/sites/start-from-scratch/","name":"Start from scratch"}}]}
```
