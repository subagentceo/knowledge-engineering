---
title: Vite Environments
description: Vite environments and the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vite Environments

The [Vite Environment API ↗](https://vite.dev/guide/api-environment), released in Vite 6, is the key feature that enables the Cloudflare Vite plugin to integrate Vite directly with the Workers runtime. It is not necessary to understand all the intricacies of the Environment API as an end user, but it is useful to have a high-level understanding.

## Default behavior

Vite creates two environments by default: `client` and `ssr`. A front-end only application uses the `client` environment, whereas a full-stack application created with a framework typically uses the `client` environment for front-end code and the `ssr` environment for server-side rendering.

By default, when you add a Worker using the Cloudflare Vite plugin, an additional environment is created. Its name is derived from the Worker name, with any dashes replaced with underscores. This name can be used to reference the environment in your Vite config in order to apply environment specific configuration.

Note

The default Vite environment name for a Worker is always the top-level Worker name. This enables you to reference the Worker consistently in your Vite config when using multiple [Cloudflare Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/).

## Environment configuration

In the following example we have a Worker named `my-worker` that is associated with a Vite environment named `my_worker`. We use the Vite config to set global constant replacements for this environment:

* [  wrangler.jsonc ](#tab-panel-12219)
* [  wrangler.toml ](#tab-panel-12220)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "main": "./src/index.ts"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "./src/index.ts"


```

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  environments: {

    my_worker: {

      define: {

        __APP_VERSION__: JSON.stringify("v1.0.0"),

      },

    },

  },

  plugins: [cloudflare()],

});


```

For more information about Vite's configuration options, see [Configuring Vite ↗](https://vite.dev/config/).

The default behavior of using the Worker name as the environment name is appropriate when you have a standalone Worker, such as an API that is accessed from your front-end application, or an [auxiliary Worker](https://developers.cloudflare.com/workers/vite-plugin/reference/api/#interface-pluginconfig) that is accessed via service bindings.

## Full-stack frameworks

If you are using the Cloudflare Vite plugin with [TanStack Start ↗](https://tanstack.com/start/) or [React Router v7 ↗](https://reactrouter.com/), then your Worker is used for server-side rendering and tightly integrated with the framework. To support this, you should assign it to the `ssr` environment by setting `viteEnvironment.name` in the plugin config.

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

import { reactRouter } from "@react-router/dev/vite";


export default defineConfig({

  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],

});


```

This merges the Worker's environment configuration with the framework's SSR configuration and ensures that the Worker is included as part of the framework's build output.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/#page","headline":"Vite Environments · Cloudflare Workers docs","description":"Vite environments and the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/vite-environments/","name":"Vite Environments"}}]}
```
