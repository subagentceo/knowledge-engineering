---
title: Custom Domain with Images
description: Set up custom domain for Images using a Worker or serve images using a prefix path and Cloudflare registered domain.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom Domain with Images

**Last reviewed:**  almost 4 years ago 

Set up custom domain for Images using a Worker or serve images using a prefix path and Cloudflare registered domain.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/images-workers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

To serve images from a custom domain:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Workers** \> **Create Worker** and create your Worker.
3. In your Worker, select **Quick edit** and paste the following code.

* [  JavaScript ](#tab-panel-11689)
* [  TypeScript ](#tab-panel-11690)
* [  Hono ](#tab-panel-11691)
* [  Python ](#tab-panel-11692)

JavaScript

```

export default {

  async fetch(request) {

    // You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA

    const accountHash = "";


    const { pathname } = new URL(request.url);


    // A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public

    // will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"


    return fetch(`https://imagedelivery.net/${accountHash}${pathname}`);

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    // You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA

    const accountHash = "";


    const { pathname } = new URL(request.url);


    // A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public

    // will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"


    return fetch(`https://imagedelivery.net/${accountHash}${pathname}`);

  },

} satisfies ExportedHandler;


```

TypeScript

```

import { Hono } from 'hono';


interface Env {

  // You can store your account hash as a binding variable

  ACCOUNT_HASH?: string;

}


const app = new Hono<{ Bindings: Env }>();


app.get('*', async (c) => {

  // You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA

  // Either get it from environment or hardcode it here

  const accountHash = c.env.ACCOUNT_HASH || "";


  const url = new URL(c.req.url);


  // A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public

  // will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"


  return fetch(`https://imagedelivery.net/${accountHash}${url.pathname}`);

});


export default app;


```

Python

```

from workers import WorkerEntrypoint

from js import URL, fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA

        account_hash = ""

        url = URL.new(request.url)


        # A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public

        # will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"

        return fetch(f'https://imagedelivery.net/{account_hash}{url.pathname}')


```

Another way you can serve images from a custom domain is by using the `cdn-cgi/imagedelivery` prefix path which is used as path to trigger `cdn-cgi` image proxy.

Below is an example showing the hostname as a Cloudflare proxied domain under the same account as the Image, followed with the prefix path and the image `<ACCOUNT_HASH>`, `<IMAGE_ID>` and `<VARIANT_NAME>` which can be found in the **Images** on the Cloudflare dashboard.

JavaScript

```

https://example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/images-workers/#page","headline":"Custom Domain with Images · Cloudflare Workers docs","description":"Set up custom domain for Images using a Worker or serve images using a prefix path and Cloudflare registered domain.","url":"https://developers.cloudflare.com/workers/examples/images-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/images-workers/","name":"Custom Domain with Images"}}]}
```
