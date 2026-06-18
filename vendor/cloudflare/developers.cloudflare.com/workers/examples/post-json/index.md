---
title: Post JSON
description: Send a POST request with JSON data. Use to share data with external servers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Post JSON

**Last reviewed:**  over 4 years ago 

Send a POST request with JSON data. Use to share data with external servers.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/post-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11711)
* [  TypeScript ](#tab-panel-11712)
* [  Python ](#tab-panel-11713)
* [  Hono ](#tab-panel-11714)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * Example someHost is set up to take in a JSON request

     * Replace url with the host you wish to send requests to

     * @param {string} url the URL to send the request to

     * @param {BodyInit} body the JSON data to send in the request

     */

    const someHost = "https://examples.cloudflareworkers.com/demos";

    const url = someHost + "/requests/json";

    const body = {

      results: ["default data to send"],

      errors: null,

      msg: "I sent this to the fetch",

    };


    /**

     * gatherResponse awaits and returns a response body as a string.

     * Use await gatherResponse(..) in an async function to get the response body

     * @param {Response} response

     */

    async function gatherResponse(response) {

      const { headers } = response;

      const contentType = headers.get("content-type") || "";

      if (contentType.includes("application/json")) {

        return JSON.stringify(await response.json());

      } else if (contentType.includes("application/text")) {

        return response.text();

      } else if (contentType.includes("text/html")) {

        return response.text();

      } else {

        return response.text();

      }

    }


    const init = {

      body: JSON.stringify(body),

      method: "POST",

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    };

    const response = await fetch(url, init);

    const results = await gatherResponse(response);

    return new Response(results, init);

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * Example someHost is set up to take in a JSON request

     * Replace url with the host you wish to send requests to

     * @param {string} url the URL to send the request to

     * @param {BodyInit} body the JSON data to send in the request

     */

    const someHost = "https://examples.cloudflareworkers.com/demos";

    const url = someHost + "/requests/json";

    const body = {

      results: ["default data to send"],

      errors: null,

      msg: "I sent this to the fetch",

    };


    /**

     * gatherResponse awaits and returns a response body as a string.

     * Use await gatherResponse(..) in an async function to get the response body

     * @param {Response} response

     */

    async function gatherResponse(response) {

      const { headers } = response;

      const contentType = headers.get("content-type") || "";

      if (contentType.includes("application/json")) {

        return JSON.stringify(await response.json());

      } else if (contentType.includes("application/text")) {

        return response.text();

      } else if (contentType.includes("text/html")) {

        return response.text();

      } else {

        return response.text();

      }

    }


    const init = {

      body: JSON.stringify(body),

      method: "POST",

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    };

    const response = await fetch(url, init);

    const results = await gatherResponse(response);

    return new Response(results, init);

  },

} satisfies ExportedHandler;


```

Python

```

import json

from workers import WorkerEntrypoint

from pyodide.ffi import to_js as _to_js

from js import Object, fetch, Response, Headers


def to_js(obj):

    return _to_js(obj, dict_converter=Object.fromEntries)


# gather_response returns both content-type & response body as a string

async def gather_response(response):

    headers = response.headers

    content_type = headers["content-type"] or ""


    if "application/json" in content_type:

        return (content_type, json.dumps(dict(await response.json())))

    return (content_type, await response.text())


class Default(WorkerEntrypoint):

    async def fetch(self, _request):

    url = "https://jsonplaceholder.typicode.com/todos/1"


    body = {

    "results": ["default data to send"],

    "errors": None,

    "msg": "I sent this to the fetch",

    }


    options = {

    "body": json.dumps(body),

    "method": "POST",

    "headers": {

      "content-type": "application/json;charset=UTF-8",

    },

    }


    response = await fetch(url, to_js(options))

    content_type, result = await gather_response(response)


    headers = Headers.new({"content-type": content_type}.items())

    return Response.new(result, headers=headers)


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


app.get('*', async (c) => {

  /**

   * Example someHost is set up to take in a JSON request

   * Replace url with the host you wish to send requests to

   */

  const someHost = "https://examples.cloudflareworkers.com/demos";

  const url = someHost + "/requests/json";

  const body = {

    results: ["default data to send"],

    errors: null,

    msg: "I sent this to the fetch",

  };


  /**

   * gatherResponse awaits and returns a response body as a string.

   * Use await gatherResponse(..) in an async function to get the response body

   */

  async function gatherResponse(response: Response) {

    const { headers } = response;

    const contentType = headers.get("content-type") || "";


    if (contentType.includes("application/json")) {

      return { contentType, result: JSON.stringify(await response.json()) };

    } else if (contentType.includes("application/text")) {

      return { contentType, result: await response.text() };

    } else if (contentType.includes("text/html")) {

      return { contentType, result: await response.text() };

    } else {

      return { contentType, result: await response.text() };

    }

  }


  const init = {

    body: JSON.stringify(body),

    method: "POST",

    headers: {

      "content-type": "application/json;charset=UTF-8",

    },

  };


  const response = await fetch(url, init);

  const { contentType, result } = await gatherResponse(response);


  return new Response(result, {

    headers: {

      "content-type": contentType,

    },

  });

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/post-json/#page","headline":"Post JSON · Cloudflare Workers docs","description":"Send a POST request with JSON data. Use to share data with external servers.","url":"https://developers.cloudflare.com/workers/examples/post-json/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/post-json/","name":"Post JSON"}}]}
```
