---
title: Get started
description: Get started with the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Note

This guide demonstrates creating a standalone Worker from scratch. If you would instead like to create a new application from a ready-to-go template, refer to the [TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), [React Router](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/), [React](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/) or [Vue](https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/) framework guides.

## Start with a basic `package.json`

package.json

```

{

  "name": "cloudflare-vite-get-started",

  "private": true,

  "version": "0.0.0",

  "type": "module",

  "scripts": {

    "dev": "vite dev",

    "build": "vite build",

    "preview": "npm run build && vite preview",

    "deploy": "npm run build && wrangler deploy"

  }

}


```

Note

Ensure that you include `"type": "module"` in order to use ES modules by default.

## Install the dependencies

 npm  yarn  pnpm  bun 

```
npm i -D vite @cloudflare/vite-plugin wrangler
```

```
yarn add -D vite @cloudflare/vite-plugin wrangler
```

```
pnpm add -D vite @cloudflare/vite-plugin wrangler
```

```
bun add -d vite @cloudflare/vite-plugin wrangler
```

## Create your Vite config file and include the Cloudflare plugin

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [cloudflare()],

});


```

The Cloudflare Vite plugin doesn't require any configuration by default and will look for a `wrangler.jsonc`, `wrangler.json` or `wrangler.toml` in the root of your application.

Refer to the [API reference](https://developers.cloudflare.com/workers/vite-plugin/reference/api/) for configuration options.

## Create your Worker config file

* [  wrangler.jsonc ](#tab-panel-12209)
* [  wrangler.toml ](#tab-panel-12210)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "cloudflare-vite-get-started",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "main": "./src/index.ts"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "cloudflare-vite-get-started"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "./src/index.ts"


```

The `name` field specifies the name of your Worker. By default, this is also used as the name of the Worker's Vite Environment (see [Vite Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/) for more information). The `main` field specifies the entry file for your Worker code.

For more information about the Worker configuration, see [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Create your Worker entry file

src/index.ts

```

export default {

  fetch() {

    return new Response(`Running in ${navigator.userAgent}!`);

  },

};


```

A request to this Worker will return **'Running in Cloudflare-Workers!'**, demonstrating that the code is running inside the Workers runtime.

## Dev, build, preview and deploy

You can now start the Vite development server (`npm run dev`), build the application (`npm run build`), preview the built application (`npm run preview`), and deploy to Cloudflare (`npm run deploy`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/get-started/#page","headline":"Get started · Cloudflare Workers docs","description":"Get started with the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/get-started/","name":"Get started"}}]}
```
