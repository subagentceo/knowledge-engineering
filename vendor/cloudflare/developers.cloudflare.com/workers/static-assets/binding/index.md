---
title: Configuration and Bindings
description: Details on how to configure Workers static assets and its binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration and Bindings

Configuring a Worker with assets requires specifying a [directory](https://developers.cloudflare.com/workers/static-assets/binding/#directory) and, optionally, an [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/), in your Worker's Wrangler file. The [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/) allows you to dynamically fetch assets from within your Worker script (e.g. `env.ASSETS.fetch()`), similarly to how you might with a make a `fetch()` call with a [Service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/).

Only one collection of static assets can be configured in each Worker.

## `directory`

The folder of static assets to be served. For many frameworks, this is the `./public/`, `./dist/`, or `./build/` folder.

* [  wrangler.jsonc ](#tab-panel-12083)
* [  wrangler.toml ](#tab-panel-12084)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./public/",

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./public/"


```

### Ignoring assets

Sometime there are files in the asset directory that should not be uploaded.

In this case, create a `.assetsignore` file in the root of the assets directory. This file takes the same format as `.gitignore`.

Wrangler will not upload asset files that match lines in this file.

**Example**

You are migrating from a Pages project where the assets directory is `dist`. You do not want to upload the server-side Worker code nor Pages configuration files as public client-side assets. Add the following `.assetsignore` file:

```

_worker.js

_redirects

_headers


```

Now Wrangler will not upload these files as client-side assets when deploying the Worker.

## `run_worker_first`

Controls whether to invoke the Worker script regardless of a request which would have otherwise matched an asset. `run_worker_first = false` (default) will serve any static asset matching a request, while `run_worker_first = true` will unconditionally [invoke your Worker script](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/#run-your-worker-script-first).

* [  wrangler.jsonc ](#tab-panel-12085)
* [  wrangler.toml ](#tab-panel-12086)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "main": "src/index.ts",

  // The following configuration unconditionally invokes the Worker script at

  // `src/index.ts`, which can programmatically fetch assets via the ASSETS binding

  "assets": {

    "directory": "./public/",

    "binding": "ASSETS",

    "run_worker_first": true,

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "src/index.ts"


[assets]

directory = "./public/"

binding = "ASSETS"

run_worker_first = true


```

You can also specify `run_worker_first` as an array of route patterns to selectively run the Worker script first only for specific routes.

The array supports glob patterns with `*` for deep matching and negative patterns with `!` prefix.

Negative patterns have precedence over non-negative patterns. The Worker will run first when a non-negative pattern matches and none of the negative pattern matches.

The order in which the patterns are listed is not significant.

`run_worker_first` is often paired with the [not\_found\_handling = "single-page-application" setting](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/#advanced-routing-control):

* [  wrangler.jsonc ](#tab-panel-12087)
* [  wrangler.toml ](#tab-panel-12088)

JSONC

```

{

  "name": "my-spa-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "main": "./src/index.ts",

  "assets": {

    "directory": "./dist/",

    "not_found_handling": "single-page-application",

    "binding": "ASSETS",

    "run_worker_first": ["/api/*", "!/api/docs/*"]

  }

}


```

TOML

```

name = "my-spa-worker"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "./src/index.ts"


[assets]

directory = "./dist/"

not_found_handling = "single-page-application"

binding = "ASSETS"

run_worker_first = [ "/api/*", "!/api/docs/*" ]


```

In this configuration, requests to `/api/*` routes will invoke the Worker script first, except for `/api/docs/*` which will follow the default asset-first routing behavior.

Common uses for `run_worker_first` include authentication checks, A/B testing, and [injecting bootstrap data into your SPA shell](https://developers.cloudflare.com/workers/examples/spa-shell/).

## `binding`

Configuring the optional [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) gives you access to the collection of assets from within your Worker script.

* [  wrangler.jsonc ](#tab-panel-12089)
* [  wrangler.toml ](#tab-panel-12090)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "main": "./src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./public/",

    "binding": "ASSETS",

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

main = "./src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./public/"

binding = "ASSETS"


```

In the example above, assets would be available through `env.ASSETS`.

### Runtime API Reference

#### `fetch()`

**Parameters**

* `request: Request | URL | string` Pass a [Request object](https://developers.cloudflare.com/workers/runtime-apis/request/), URL object, or URL string. Requests made through this method have `html_handling` and `not_found_handling` configuration applied to them.

**Response**

* `Promise<Response>` Returns a static asset response for the given request.

**Example**

Your dynamic code can make new, or forward incoming requests to your project's static assets using the assets binding. For example, `env.ASSETS.fetch(request)`, `env.ASSETS.fetch(new URL('https://assets.local/my-file'))` or `env.ASSETS.fetch('https://assets.local/my-file')`. The hostname used in the URL (for example, `assets.local`) is not meaningful — any valid hostname will work. Only the URL pathname is used to match assets.

Note

If you need to fetch assets from within an [RPC method](https://developers.cloudflare.com/workers/runtime-apis/rpc/#fetching-static-assets) (where there is no incoming `request`), construct a URL using any hostname — for example, `this.env.ASSETS.fetch(new Request('https://assets.local/path/to/asset'))`.

Take the following example that configures a Worker script to return a response under all requests headed for `/api/`. Otherwise, the Worker script will pass the incoming request through to the asset binding. In this case, because a Worker script is only invoked when the requested route has not matched any static assets, this will always evaluate [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/#routing-behavior) behavior.

* [  JavaScript ](#tab-panel-12081)
* [  TypeScript ](#tab-panel-12082)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {

      // TODO: Add your custom /api/* logic here.

      return new Response("Ok");

    }

    // Passes the incoming request through to the assets binding.

    // No asset matched this request, so this will evaluate `not_found_handling` behavior.

    return env.ASSETS.fetch(request);

  },

};


```

TypeScript

```

interface Env {

  ASSETS: Fetcher;

}


export default {

  async fetch(request, env): Promise<Response> {

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {

      // TODO: Add your custom /api/* logic here.

      return new Response("Ok");

    }

    // Passes the incoming request through to the assets binding.

    // No asset matched this request, so this will evaluate `not_found_handling` behavior.

    return env.ASSETS.fetch(request);

  },

} satisfies ExportedHandler<Env>;


```

## Routing configuration

For the various static asset routing configuration options, refer to [Routing](https://developers.cloudflare.com/workers/static-assets/routing/).

## Smart Placement

[Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) can be used to place a Worker's code close to your back-end infrastructure. Smart Placement will only have an effect if you specified a `main`, pointing to your Worker code.

### Smart Placement with Worker Code First

If you desire to run your [Worker code ahead of assets](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/#run-your-worker-script-first) by setting `run_worker_first=true`, all requests must first travel to your Smart-Placed Worker. As a result, you may experience increased latency for asset requests.

Use Smart Placement with `run_worker_first=true` when you need to integrate with other backend services, authenticate requests before serving any assets, or if you want to make modifications to your assets before serving them.

If you want some assets served as quickly as possible to the user, but others to be served behind a smart-placed Worker, considering splitting your app into multiple Workers and [using service bindings to connect them](https://developers.cloudflare.com/workers/configuration/placement/#multiple-workers).

### Smart Placement with Assets First

Enabling Smart Placement with `run_worker_first=false` (or not specifying it) lets you serve assets from as close as possible to your users, but moves your Worker logic to run most efficiently (such as near a database).

Use Smart Placement with `run_worker_first=false` (or not specifying it) when prioritizing fast asset delivery.

This will not impact the [default routing behavior](https://developers.cloudflare.com/workers/static-assets/#routing-behavior).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/binding/#page","headline":"Configuration and Bindings · Cloudflare Workers docs","description":"Details on how to configure Workers static assets and its binding.","url":"https://developers.cloudflare.com/workers/static-assets/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/binding/","name":"Configuration and Bindings"}}]}
```
