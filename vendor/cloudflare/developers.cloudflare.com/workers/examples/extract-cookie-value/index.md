---
title: Cookie parsing
description: Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cookie parsing

**Last reviewed:**  over 4 years ago 

Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/extract-cookie-value)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11662)
* [  TypeScript ](#tab-panel-11663)
* [  Python ](#tab-panel-11664)
* [  Hono ](#tab-panel-11665)

JavaScript

```

import { parse } from "cookie";

export default {

  async fetch(request) {

    // The name of the cookie

    const COOKIE_NAME = "__uid";

    const cookie = parse(request.headers.get("Cookie") || "");

    if (cookie[COOKIE_NAME] != null) {

      // Respond with the cookie value

      return new Response(cookie[COOKIE_NAME]);

    }

    return new Response("No cookie with name: " + COOKIE_NAME);

  },

};


```

TypeScript

```

import { parse } from "cookie";

export default {

  async fetch(request): Promise<Response> {

    // The name of the cookie

    const COOKIE_NAME = "__uid";

    const cookie = parse(request.headers.get("Cookie") || "");

    if (cookie[COOKIE_NAME] != null) {

      // Respond with the cookie value

      return new Response(cookie[COOKIE_NAME]);

    }

    return new Response("No cookie with name: " + COOKIE_NAME);

  },

} satisfies ExportedHandler;


```

Python

```

from http.cookies import SimpleCookie

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Name of the cookie

        cookie_name = "__uid"


        cookies = SimpleCookie(request.headers["Cookie"] or "")


        if cookie_name in cookies:

            # Respond with cookie value

            return Response(cookies[cookie_name].value)


        return Response("No cookie with name: " + cookie_name)


```

TypeScript

```

import { Hono } from 'hono';

import { getCookie } from 'hono/cookie';


const app = new Hono();


app.get('*', (c) => {

  // The name of the cookie

  const COOKIE_NAME = "__uid";


  // Get the specific cookie value using Hono's cookie helper

  const cookieValue = getCookie(c, COOKIE_NAME);


  if (cookieValue) {

    // Respond with the cookie value

    return c.text(cookieValue);

  }


  return c.text("No cookie with name: " + COOKIE_NAME);

});


export default app;


```

External dependencies

This example requires the npm package [cookie ↗](https://www.npmjs.com/package/cookie) to be installed in your JavaScript project.

The Hono example uses the built-in cookie utilities provided by Hono, so no external dependencies are needed for that implementation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/extract-cookie-value/#page","headline":"Cookie parsing · Cloudflare Workers docs","description":"Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.","url":"https://developers.cloudflare.com/workers/examples/extract-cookie-value/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/extract-cookie-value/","name":"Cookie parsing"}}]}
```
