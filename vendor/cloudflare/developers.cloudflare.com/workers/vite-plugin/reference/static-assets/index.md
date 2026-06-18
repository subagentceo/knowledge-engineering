---
title: Static Assets
description: Static assets and the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Static Assets

This guide focuses on the areas of working with static assets that are unique to the Vite plugin. For more general documentation, see [Static Assets](https://developers.cloudflare.com/workers/static-assets/).

## Configuration

The Vite plugin does not require that you provide the `assets` field in order to enable assets and instead determines whether assets should be included based on whether the `client` environment has been built. By default, the `client` environment is built if any of the following conditions are met:

* There is an `index.html` file in the root of your project
* `build.rollupOptions.input` or `environments.client.build.rollupOptions.input` is specified in your Vite config
* You have a non-empty [public directory ↗](https://vite.dev/guide/assets#the-public-directory)
* Your Worker [imports assets as URLs ↗](https://vite.dev/guide/assets#importing-asset-as-url)

On running `vite build`, an output `wrangler.json` configuration file is generated as part of the build output. The `assets.directory` field in this file is automatically populated with the path to your `client` build output. It is therefore not necessary to provide the `assets.directory` field in your input Worker configuration.

The `assets` configuration should be used, however, if you wish to set [routing configuration](https://developers.cloudflare.com/workers/static-assets/routing/) or enable the [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/#binding). The following example configures the `not_found_handling` for a single-page application so that the fallback will always be the root `index.html` file.

* [  wrangler.jsonc ](#tab-panel-12217)
* [  wrangler.toml ](#tab-panel-12218)

JSONC

```

{

  "assets": {

    "not_found_handling": "single-page-application"

  }

}


```

TOML

```

[assets]

not_found_handling = "single-page-application"


```

## Features

The Vite plugin ensures that all of Vite's [static asset handling ↗](https://vite.dev/guide/assets) features are supported in your Worker as well as in your frontend. These include importing assets as URLs, importing as strings and importing from the `public` directory as well as inlining assets.

Assets [imported as URLs ↗](https://vite.dev/guide/assets#importing-asset-as-url) can be fetched via the [assets binding](https://developers.cloudflare.com/workers/static-assets/binding/#binding). As the binding's `fetch` method requires a full URL, we recommend using the request URL as the `base`. This is demonstrated in the following example:

TypeScript

```

import myImage from "./my-image.png";


export default {

  fetch(request, env) {

    return env.ASSETS.fetch(new URL(myImage, request.url));

  },

};


```

Assets imported as URLs in your Worker will automatically be moved to the client build output. When running `vite build` the paths of any moved assets will be displayed in the console.

Note

If you are developing a multi-Worker application, assets can only be accessed on the client and in your entry Worker.

## Headers and redirects

Custom [headers](https://developers.cloudflare.com/workers/static-assets/headers/) and [redirects](https://developers.cloudflare.com/workers/static-assets/redirects/) are supported at build, preview and deploy time by adding `_headers` and `_redirects` files to your [public directory ↗](https://vite.dev/guide/assets#the-public-directory). The paths in these files should reflect the structure of your client build output. For example, generated assets are typically located in an [assets subdirectory ↗](https://vite.dev/config/build-options#build-assetsdir).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/#page","headline":"Static Assets · Cloudflare Workers docs","description":"Static assets and the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/static-assets/","name":"Static Assets"}}]}
```
