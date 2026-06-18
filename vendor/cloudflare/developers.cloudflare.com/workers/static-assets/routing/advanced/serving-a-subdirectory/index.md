---
title: Serving a subdirectory
description: How to configure a Worker with static assets on a subpath.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Serving a subdirectory

Note

This feature requires Wrangler v3.98.0 or later.

Like with any other Worker, [you can configure a Worker with assets to run on a path of your domain](https://developers.cloudflare.com/workers/configuration/routing/routes/). Assets defined for a Worker must be nested in a directory structure that mirrors the desired path.

For example, to serve assets from `example.com/blog/*`, create a `blog` directory in your asset directory.

* Directorydist  
   * Directoryblog  
         * index.html  
         * Directoryposts  
                  * post1.html  
                  * post2.html

With a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) like so:

* [  wrangler.jsonc ](#tab-panel-12139)
* [  wrangler.toml ](#tab-panel-12140)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "assets-on-a-path-example",

  "main": "src/index.js",

  "route": "example.com/blog/*",

  "assets": {

    "directory": "dist"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "assets-on-a-path-example"

main = "src/index.js"

route = "example.com/blog/*"


[assets]

directory = "dist"


```

In this example, requests to `example.com/blog/` will serve the `index.html` file, and requests to `example.com/blog/posts/post1` will serve the `post1.html` file.

If you have a file outside the configured path, it will not be served, unless it is part of the `assets.not_found_handling` for [Single Page Applications](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) or [custom 404 pages](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/). For example, if you have a `home.html` file in the root of your asset directory, it will not be served when requesting `example.com/blog/home`. However, if needed, these files can still be manually fetched over [the binding](https://developers.cloudflare.com/workers/static-assets/binding/#binding).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/#page","headline":"Serving a subdirectory · Cloudflare Workers docs","description":"How to configure a Worker with static assets on a subpath.","url":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/serving-a-subdirectory/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/routing/","name":"Routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/static-assets/routing/advanced/","name":"Advanced"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/static-assets/routing/advanced/serving-a-subdirectory/","name":"Serving a subdirectory"}}]}
```
