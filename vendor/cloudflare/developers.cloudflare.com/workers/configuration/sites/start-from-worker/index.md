---
title: Start from Worker
description: Add static asset serving to an existing Cloudflare Worker using Workers Sites.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Start from Worker

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

Workers Sites require [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) — make sure to use the [latest version](https://developers.cloudflare.com/workers/wrangler/install-and-update/#update-wrangler).

If you have a pre-existing Worker project, you can use Workers Sites to serve static assets to the Worker.

## Getting started

1. Create a directory that will contain the assets in the root of your project (for example, `./public`)
2. Add configuration to your Wrangler file to point to it.  
   * [  wrangler.jsonc ](#tab-panel-11513)  
   * [  wrangler.toml ](#tab-panel-11514)  
JSONC  
```  
{  
  "site": {  
    "bucket": "./public" // Add the directory with your static assets!  
  }  
}  
```  
TOML  
```  
[site]  
bucket = "./public"  
```
3. Install the `@cloudflare/kv-asset-handler` package in your project:  
Terminal window  
```  
npm i -D @cloudflare/kv-asset-handler  
```
4. Import the `getAssetFromKV()` function into your Worker entry point and use it to respond with static assets.

* [  Module Worker ](#tab-panel-11511)
* [  Service Worker ](#tab-panel-11512)

JavaScript

```

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

import manifestJSON from "__STATIC_CONTENT_MANIFEST";

const assetManifest = JSON.parse(manifestJSON);


export default {

  async fetch(request, env, ctx) {

    try {

      // Add logic to decide whether to serve an asset or run your original Worker code

      return await getAssetFromKV(

        {

          request,

          waitUntil: ctx.waitUntil.bind(ctx),

        },

        {

          ASSET_NAMESPACE: env.__STATIC_CONTENT,

          ASSET_MANIFEST: assetManifest,

        },

      );

    } catch (e) {

      let pathname = new URL(request.url).pathname;

      return new Response(`"${pathname}" not found`, {

        status: 404,

        statusText: "not found",

      });

    }

  },

};


```

JavaScript

```

import { getAssetFromKV } from "@cloudflare/kv-asset-handler";


addEventListener("fetch", (event) => {

  event.respondWith(handleEvent(event));

});


async function handleEvent(event) {

  try {

    // Add logic to decide whether to serve an asset or run your original Worker code

    return await getAssetFromKV(event);

  } catch (e) {

    let pathname = new URL(event.request.url).pathname;

    return new Response(`"${pathname}" not found`, {

      status: 404,

      statusText: "not found",

    });

  }

}


```

For more information on the configurable options of `getAssetFromKV()` refer to [kv-asset-handler docs ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/kv-asset-handler).

1. Run `wrangler deploy` or `npx wrangler deploy` as you would normally with your Worker project. Wrangler will automatically upload the assets found in the configured directory.  
Terminal window  
```  
npx wrangler deploy  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/#page","headline":"Start from Worker · Cloudflare Workers docs","description":"Add static asset serving to an existing Cloudflare Worker using Workers Sites.","url":"https://developers.cloudflare.com/workers/static-assets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/sites/","name":"Workers Sites"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/sites/start-from-worker/","name":"Start from Worker"}}]}
```
