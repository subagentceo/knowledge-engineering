---
title: Static Assets
description: Create full-stack applications deployed to Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Static Assets

You can upload static assets (HTML, CSS, images and other files) as part of your Worker, and Cloudflare will handle caching and serving them to web browsers.

**Start from CLI** \- Scaffold a React SPA with an API Worker, and use the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

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

**Or just deploy to Cloudflare**

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/main/vite-react-template)

Learn more about supported frameworks on Workers.

[ Supported frameworks ](https://developers.cloudflare.com/workers/framework-guides/) Start building on Workers with our framework guides. 

### How it works

When you deploy your project, Cloudflare deploys both your Worker code and your static assets in a single operation. This deployment operates as a tightly integrated "unit" running across Cloudflare's network, combining static file hosting, custom logic, and global caching.

The **assets directory** specified in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#assets) is central to this design. During deployment, Wrangler automatically uploads the files from this directory to Cloudflare's infrastructure. Once deployed, requests for these assets are routed efficiently to locations closest to your users.

* [  wrangler.jsonc ](#tab-panel-12077)
* [  wrangler.toml ](#tab-panel-12078)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-spa",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./dist",

    "binding": "ASSETS"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-spa"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./dist"

binding = "ASSETS"


```

Note

If you are using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), you do not need to specify `assets.directory`. For more information about using static assets with the Vite plugin, refer to the [plugin documentation](https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/).

By adding an [**assets binding**](https://developers.cloudflare.com/workers/static-assets/binding/#binding), you can directly fetch and serve assets within your Worker code.

* [  JavaScript ](#tab-panel-12073)
* [  Python ](#tab-panel-12074)

JavaScript

```

// index.js


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    if (url.pathname.startsWith("/api/")) {

      return new Response(JSON.stringify({ name: "Cloudflare" }), {

        headers: { "Content-Type": "application/json" },

      });

    }


    return env.ASSETS.fetch(request);

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response

from urllib.parse import urlparse


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    # Example of serving static assets

    url = urlparse(request.url)

    if url.path.startswith("/api/):

      return Response.json({"name": "Cloudflare"})


    return await self.env.ASSETS.fetch(request)


```

### Routing behavior

By default, if a requested URL matches a file in the static assets directory, that file will be served — without invoking Worker code. If no matching asset is found and a Worker script is present, the request will be processed by the Worker. The Worker can return a response or choose to defer again to static assets by using the [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/) (e.g. `env.ASSETS.fetch(request)`). If no Worker script is present, a `404 Not Found` response is returned.

The default behavior for requests which don't match a static asset can be changed by setting the [not\_found\_handling option under assets](https://developers.cloudflare.com/workers/wrangler/configuration/#assets) in your Wrangler configuration file:

* [not\_found\_handling = "single-page-application"](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/): Sets your application to return a `200 OK` response with `index.html` for requests which don't match a static asset. Use this if you have a Single Page Application. We recommend pairing this with selective routing using `run_worker_first` for [advanced routing control](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/#advanced-routing-control).
* [not\_found\_handling = "404-page"](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/#custom-404-pages): Sets your application to return a `404 Not Found` response with the nearest `404.html` for requests which don't match a static asset.

* [  wrangler.jsonc ](#tab-panel-12075)
* [  wrangler.toml ](#tab-panel-12076)

JSONC

```

{

  "assets": {

    "directory": "./dist",

    "not_found_handling": "single-page-application"

  }

}


```

TOML

```

[assets]

directory = "./dist"

not_found_handling = "single-page-application"


```

If you want the Worker code to execute before serving assets, you can use the `run_worker_first` option. This can be set to `true` to invoke the Worker script for all requests, or configured as an array of route patterns for selective Worker-script-first routing:

**Invoking your Worker script on specific paths:**

* [  wrangler.jsonc ](#tab-panel-12079)
* [  wrangler.toml ](#tab-panel-12080)

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

For a more advanced pattern, refer to [SPA shell with bootstrap data](https://developers.cloudflare.com/workers/examples/spa-shell/), which uses HTMLRewriter to inject prefetched API data into the HTML stream.

[ Routing options ](https://developers.cloudflare.com/workers/static-assets/routing/) Learn more about how you can customize routing behavior. 

### Caching behavior

Cloudflare provides automatic caching for static assets across its network, ensuring fast delivery to users worldwide. When a static asset is requested, it is automatically cached for future requests.

* **First Request:** When an asset is requested for the first time, it is fetched from storage and cached at the nearest Cloudflare location.
* **Subsequent Requests:** If a request for the same asset reaches a data center that does not have it cached, Cloudflare's [tiered caching system](https://developers.cloudflare.com/cache/how-to/tiered-cache/) allows it to be retrieved from a nearby cache rather than going back to storage. This improves cache hit ratio, reduces latency, and reduces unnecessary origin fetches.

## Try it out

[ Vite + React SPA tutorial ](https://developers.cloudflare.com/workers/vite-plugin/tutorial/) Learn how to build and deploy a full-stack Single Page Application with static assets and API routes. 

## Learn more

[ Supported frameworks ](https://developers.cloudflare.com/workers/framework-guides/) Start building on Workers with our framework guides. 

[ Billing and limitations ](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) Learn more about how requests are billed, current limitations, and troubleshooting. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/static-assets/#page","headline":"Static Assets · Cloudflare Workers docs","description":"Create full-stack applications deployed to Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}}]}
```
