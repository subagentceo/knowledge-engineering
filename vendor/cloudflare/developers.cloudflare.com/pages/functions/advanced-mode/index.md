---
title: Advanced mode
description: Use a _worker.js file to develop Pages Functions instead of the /functions directory.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced mode

Advanced mode allows you to develop your Pages Functions with a `_worker.js` file rather than the `/functions` directory.

In some cases, Pages Functions' built-in file path based routing and middleware system is not desirable for existing applications. You may have a Worker that is complex and difficult to splice up into Pages' file-based routing system. For these cases, Pages offers the ability to define a `_worker.js` file in the output directory of your Pages project.

When using a `_worker.js` file, the entire `/functions` directory is ignored, including its routing and middleware characteristics. Instead, the `_worker.js` file is deployed and must be written using the [Module Worker syntax](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/). If you have never used Module syntax, refer to the [JavaScript modules blog post ↗](https://blog.cloudflare.com/workers-javascript-modules/) to learn more. Using Module syntax enables JavaScript frameworks to generate a Worker as part of the Pages output directory contents.

## Set up a Function

In advanced mode, your Function will assume full control of all incoming HTTP requests to your domain. Your Function is required to make or forward requests to your project's static assets. Failure to do so will result in broken or unwanted behavior. Your Function must be written in Module syntax.

After making a `_worker.js` file in your output directory, add the following code snippet:

* [  JavaScript ](#tab-panel-9398)
* [  TypeScript ](#tab-panel-9399)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {

      // TODO: Add your custom /api/* logic here.

      return new Response("Ok");

    }

    // Otherwise, serve the static assets.

    // Without this, the Worker will error and no assets will be served.

    return env.ASSETS.fetch(request);

  },

};


```

TypeScript

```

// Note: You would need to compile your TS into JS and output it as a `_worker.js` file. We do not read `_worker.ts`


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

    // Otherwise, serve the static assets.

    // Without this, the Worker will error and no assets will be served.

    return env.ASSETS.fetch(request);

  },

} satisfies ExportedHandler<Env>;


```

In the above code, you have configured your Function to return a response under all requests headed for `/api/`. Otherwise, your Function will fallback to returning static assets.

* The `env.ASSETS.fetch()` function will allow you to return assets on a given request.
* `env` is the object that contains your environment variables and bindings.
* `ASSETS` is a default Function binding that allows communication between your Function and Pages' asset serving resource.
* `fetch()` calls to Pages' asset-serving resource and serves the requested asset.

## Migrate from Workers

To migrate an existing Worker to your Pages project, copy your Worker code and paste it into your new `_worker.js` file. Then handle static assets by adding the following code snippet to `_worker.js`:

TypeScript

```

return env.ASSETS.fetch(request);


```

## Deploy your Function

After you have set up a new Function or migrated your Worker to `_worker.js`, make sure your `_worker.js` file is placed in your Pages' project output directory. Deploy your project through your Git integration for advanced mode to take effect.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/advanced-mode/#page","headline":"Advanced mode · Cloudflare Pages docs","description":"Use a \\_worker.js file to develop Pages Functions instead of the /functions directory.","url":"https://developers.cloudflare.com/pages/functions/advanced-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/advanced-mode/","name":"Advanced mode"}}]}
```
