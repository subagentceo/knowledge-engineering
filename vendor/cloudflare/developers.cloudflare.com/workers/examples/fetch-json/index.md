---
title: Fetch JSON
description: Send a GET request and read in JSON from the response. Use to fetch external data.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fetch JSON

**Last reviewed:**  over 4 years ago 

Send a GET request and read in JSON from the response. Use to fetch external data.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/fetch-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11670)
* [  TypeScript ](#tab-panel-11671)
* [  Python ](#tab-panel-11672)
* [  Hono ](#tab-panel-11673)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const url = "https://jsonplaceholder.typicode.com/todos/1";


    // gatherResponse returns both content-type & response body as a string

    async function gatherResponse(response) {

      const { headers } = response;

      const contentType = headers.get("content-type") || "";

      if (contentType.includes("application/json")) {

        return { contentType, result: JSON.stringify(await response.json()) };

      }

      return { contentType, result: await response.text() };

    }


    const response = await fetch(url);

    const { contentType, result } = await gatherResponse(response);


    const options = { headers: { "content-type": contentType } };

    return new Response(result, options);

  },

};


```

TypeScript

```

interface Env {}

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const url = "https://jsonplaceholder.typicode.com/todos/1";


    // gatherResponse returns both content-type & response body as a string

    async function gatherResponse(response) {

      const { headers } = response;

      const contentType = headers.get("content-type") || "";

      if (contentType.includes("application/json")) {

        return { contentType, result: JSON.stringify(await response.json()) };

      }

      return { contentType, result: await response.text() };

    }


    const response = await fetch(url);

    const { contentType, result } = await gatherResponse(response);


    const options = { headers: { "content-type": contentType } };

    return new Response(result, options);

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch

import json


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        url = "https://jsonplaceholder.typicode.com/todos/1"


        # gather_response returns both content-type & response body as a string

        async def gather_response(response):

            headers = response.headers

            content_type = headers["content-type"] or ""


            if "application/json" in content_type:

                return (content_type, json.dumps(await response.json()))

            return (content_type, await response.text())


        response = await fetch(url)

        content_type, result = await gather_response(response)


        headers = {"content-type": content_type}

        return Response(result, headers=headers)


```

TypeScript

```

import { Hono } from 'hono';


type Env = {};


const app = new Hono<{ Bindings: Env }>();


app.get('*', async (c) => {

  const url = "https://jsonplaceholder.typicode.com/todos/1";


  // gatherResponse returns both content-type & response body as a string

  async function gatherResponse(response: Response) {

    const { headers } = response;

    const contentType = headers.get("content-type") || "";


    if (contentType.includes("application/json")) {

      return { contentType, result: JSON.stringify(await response.json()) };

    }


    return { contentType, result: await response.text() };

  }


  const response = await fetch(url);

  const { contentType, result } = await gatherResponse(response);


  return new Response(result, {

    headers: { "content-type": contentType }

  });

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/fetch-json/#page","headline":"Fetch JSON · Cloudflare Workers docs","description":"Send a GET request and read in JSON from the response. Use to fetch external data.","url":"https://developers.cloudflare.com/workers/examples/fetch-json/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/fetch-json/","name":"Fetch JSON"}}]}
```
