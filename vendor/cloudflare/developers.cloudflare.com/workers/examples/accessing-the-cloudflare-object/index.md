---
title: Accessing the Cloudflare Object
description: Access custom Cloudflare properties and control how Cloudflare features are applied to every request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Accessing the Cloudflare Object

**Last reviewed:**  over 4 years ago 

Access custom Cloudflare properties and control how Cloudflare features are applied to every request.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/accessing-the-cloudflare-object)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11575)
* [  TypeScript ](#tab-panel-11576)
* [  Hono ](#tab-panel-11577)
* [  Python ](#tab-panel-11578)

JavaScript

```

export default {

  async fetch(req) {

    const data =

      req.cf !== undefined

        ? req.cf

        : { error: "The `cf` object is not available inside the preview." };


    return new Response(JSON.stringify(data, null, 2), {

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    });

  },

};


```

TypeScript

```

export default {

  async fetch(req): Promise<Response> {

    const data =

      req.cf !== undefined

        ? req.cf

        : { error: "The `cf` object is not available inside the preview." };


    return new Response(JSON.stringify(data, null, 2), {

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    });

  },

} satisfies ExportedHandler;


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.get("*", async (c) => {

  // Access the raw request to get the cf object

  const req = c.req.raw;


  // Check if the cf object is available

  const data =

    req.cf !== undefined

      ? req.cf

      : { error: "The `cf` object is not available inside the preview." };


  // Return the data formatted with 2-space indentation

  return c.json(data);

});


export default app;


```

Python

```

import json

from workers import Response, WorkerEntrypoint

from js import JSON


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    error = json.dumps({ "error": "The `cf` object is not available inside the preview." })

    data = request.cf if request.cf is not None else error

    headers = {"content-type":"application/json"}

    return Response(JSON.stringify(data, None, 2), headers=headers)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/#page","headline":"Accessing the Cloudflare Object · Cloudflare Workers docs","description":"Access custom Cloudflare properties and control how Cloudflare features are applied to every request.","url":"https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/accessing-the-cloudflare-object/","name":"Accessing the Cloudflare Object"}}]}
```
