---
title: Cache Tags using Workers
description: Send Additional Cache Tags using Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache Tags using Workers

**Last reviewed:**  about 4 years ago 

Send Additional Cache Tags using Workers

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/cache-tags)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11619)
* [  TypeScript ](#tab-panel-11620)
* [  Hono ](#tab-panel-11621)
* [  Python ](#tab-panel-11622)

JavaScript

```

export default {

  async fetch(request) {

    const requestUrl = new URL(request.url);

    const params = requestUrl.searchParams;

    const tags =

      params && params.has("tags") ? params.get("tags").split(",") : [];

    const url = params && params.has("uri") ? params.get("uri") : "";

    if (!url) {

      const errorObject = {

        error: "URL cannot be empty",

      };

      return new Response(JSON.stringify(errorObject), { status: 400 });

    }

    const init = {

      cf: {

        cacheTags: tags,

      },

    };

    return fetch(url, init)

      .then((result) => {

        const cacheStatus = result.headers.get("cf-cache-status");

        const lastModified = result.headers.get("last-modified");

        const response = {

          cache: cacheStatus,

          lastModified: lastModified,

        };

        return new Response(JSON.stringify(response), {

          status: result.status,

        });

      })

      .catch((err) => {

        const errorObject = {

          error: err.message,

        };

        return new Response(JSON.stringify(errorObject), { status: 500 });

      });

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const requestUrl = new URL(request.url);

    const params = requestUrl.searchParams;

    const tags =

      params && params.has("tags") ? params.get("tags").split(",") : [];

    const url = params && params.has("uri") ? params.get("uri") : "";

    if (!url) {

      const errorObject = {

        error: "URL cannot be empty",

      };

      return new Response(JSON.stringify(errorObject), { status: 400 });

    }

    const init = {

      cf: {

        cacheTags: tags,

      },

    };

    return fetch(url, init)

      .then((result) => {

        const cacheStatus = result.headers.get("cf-cache-status");

        const lastModified = result.headers.get("last-modified");

        const response = {

          cache: cacheStatus,

          lastModified: lastModified,

        };

        return new Response(JSON.stringify(response), {

          status: result.status,

        });

      })

      .catch((err) => {

        const errorObject = {

          error: err.message,

        };

        return new Response(JSON.stringify(errorObject), { status: 500 });

      });

  },

} satisfies ExportedHandler;


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.all("*", async (c) => {

  const tags = c.req.query("tags") ? c.req.query("tags").split(",") : [];

  const uri = c.req.query("uri") ? c.req.query("uri") : "";


  if (!uri) {

    return c.json({ error: "URL cannot be empty" }, 400);

  }


  const init = {

    cf: {

      cacheTags: tags,

    },

  };


  const result = await fetch(uri, init);

  const cacheStatus = result.headers.get("cf-cache-status");

  const lastModified = result.headers.get("last-modified");


  const response = {

    cache: cacheStatus,

    lastModified: lastModified,

  };


  return c.json(response, result.status);

});


app.onError((err, c) => {

  return c.json({ error: err.message }, 500);

});


export default app;


```

Python

```

from workers import WorkerEntrypoint

from pyodide.ffi import to_js as _to_js

from js import Response, URL, Object, fetch


def to_js(x):

    return _to_js(x, dict_converter=Object.fromEntries)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        request_url = URL.new(request.url)

        params = request_url.searchParams

        tags = params["tags"].split(",") if "tags" in params else []

        url = params["uri"] or None


        if url is None:

            error = {"error": "URL cannot be empty"}

            return Response.json(to_js(error), status=400)


        options = {"cf": {"cacheTags": tags}}

        result = await fetch(url, to_js(options))


        cache_status = result.headers["cf-cache-status"]

        last_modified = result.headers["last-modified"]

        response = {"cache": cache_status, "lastModified": last_modified}


        return Response.json(to_js(response), status=result.status)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/cache-tags/#page","headline":"Cache Tags using Workers · Cloudflare Workers docs","description":"Send Additional Cache Tags using Workers","url":"https://developers.cloudflare.com/workers/examples/cache-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/cache-tags/","name":"Cache Tags using Workers"}}]}
```
