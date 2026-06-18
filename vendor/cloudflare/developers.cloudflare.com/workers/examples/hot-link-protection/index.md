---
title: Hot-link protection
description: Block other websites from linking to your content. This is useful for protecting images.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hot-link protection

**Last reviewed:**  over 5 years ago 

Block other websites from linking to your content. This is useful for protecting images.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/hot-link-protection)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11685)
* [  TypeScript ](#tab-panel-11686)
* [  Python ](#tab-panel-11687)
* [  Hono ](#tab-panel-11688)

JavaScript

```

export default {

  async fetch(request) {

    const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";

    const PROTECTED_TYPE = "image/";


    // Fetch the original request

    const response = await fetch(request);


    // If it's an image, engage hotlink protection based on the

    // Referer header.

    const referer = request.headers.get("Referer");

    const contentType = response.headers.get("Content-Type") || "";


    if (referer && contentType.startsWith(PROTECTED_TYPE)) {

      // If the hostnames don't match, it's a hotlink

      if (new URL(referer).hostname !== new URL(request.url).hostname) {

        // Redirect the user to your website

        return Response.redirect(HOMEPAGE_URL, 302);

      }

    }


    // Everything is fine, return the response normally.

    return response;

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";

    const PROTECTED_TYPE = "image/";


    // Fetch the original request

    const response = await fetch(request);


    // If it's an image, engage hotlink protection based on the

    // Referer header.

    const referer = request.headers.get("Referer");

    const contentType = response.headers.get("Content-Type") || "";


    if (referer && contentType.startsWith(PROTECTED_TYPE)) {

      // If the hostnames don't match, it's a hotlink

      if (new URL(referer).hostname !== new URL(request.url).hostname) {

        // Redirect the user to your website

        return Response.redirect(HOMEPAGE_URL, 302);

      }

    }


    // Everything is fine, return the response normally.

    return response;

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch

from urllib.parse import urlparse


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        homepage_url = "https://tutorial.cloudflareworkers.com/"

        protected_type = "image/"


        # Fetch the original request

        response = await fetch(request)


        # If it's an image, engage hotlink protection based on the referer header

        referer = request.headers["Referer"]

        content_type = response.headers["Content-Type"] or ""


        if referer and content_type.startswith(protected_type):

            # If the hostnames don't match, it's a hotlink

            if urlparse(referer).hostname != urlparse(request.url).hostname:

                # Redirect the user to your website

                return Response.redirect(homepage_url, 302)


        # Everything is fine, return the response normally

        return response


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


// Middleware for hot-link protection

app.use('*', async (c, next) => {

  const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";

  const PROTECTED_TYPE = "image/";


  // Continue to the next handler to get the response

  await next();


  // If we have a response, check for hotlinking

  if (c.res) {

    // If it's an image, engage hotlink protection based on the Referer header

    const referer = c.req.header("Referer");

    const contentType = c.res.headers.get("Content-Type") || "";


    if (referer && contentType.startsWith(PROTECTED_TYPE)) {

      // If the hostnames don't match, it's a hotlink

      if (new URL(referer).hostname !== new URL(c.req.url).hostname) {

        // Redirect the user to your website

        c.res = c.redirect(HOMEPAGE_URL, 302);

      }

    }

  }

});


// Default route handler that passes through the request to the origin

app.all('*', async (c) => {

  // Fetch the original request

  return fetch(c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/hot-link-protection/#page","headline":"Hot-link protection · Cloudflare Workers docs","description":"Block other websites from linking to your content. This is useful for protecting images.","url":"https://developers.cloudflare.com/workers/examples/hot-link-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","Headers","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/hot-link-protection/","name":"Hot-link protection"}}]}
```
