---
title: A/B testing with same-URL direct access
description: Set up an A/B test by controlling what response is served based on cookies. This version supports passing the request through to test and control on the origin, bypassing random assignment.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# A/B testing with same-URL direct access

**Last reviewed:**  over 5 years ago 

Set up an A/B test by controlling what response is served based on cookies. This version supports passing the request through to test and control on the origin, bypassing random assignment.

* [  JavaScript ](#tab-panel-11571)
* [  TypeScript ](#tab-panel-11572)
* [  Python ](#tab-panel-11573)
* [  Hono ](#tab-panel-11574)

JavaScript

```

const NAME = "myExampleWorkersABTest";


export default {

  async fetch(req) {

    const url = new URL(req.url);


    // Enable Passthrough to allow direct access to control and test routes.

    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))

      return fetch(req);


    // Determine which group this requester is in.

    const cookie = req.headers.get("cookie");


    if (cookie && cookie.includes(`${NAME}=control`)) {

      url.pathname = "/control" + url.pathname;

    } else if (cookie && cookie.includes(`${NAME}=test`)) {

      url.pathname = "/test" + url.pathname;

    } else {

      // If there is no cookie, this is a new client. Choose a group and set the cookie.

      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split

      if (group === "control") {

        url.pathname = "/control" + url.pathname;

      } else {

        url.pathname = "/test" + url.pathname;

      }

      // Reconstruct response to avoid immutability

      let res = await fetch(url);

      res = new Response(res.body, res);

      // Set cookie to enable persistent A/B sessions.

      res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);

      return res;

    }

    return fetch(url);

  },

};


```

TypeScript

```

const NAME = "myExampleWorkersABTest";


export default {

  async fetch(req): Promise<Response> {

    const url = new URL(req.url);

    // Enable Passthrough to allow direct access to control and test routes.

    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))

      return fetch(req);

    // Determine which group this requester is in.

    const cookie = req.headers.get("cookie");

    if (cookie && cookie.includes(`${NAME}=control`)) {

      url.pathname = "/control" + url.pathname;

    } else if (cookie && cookie.includes(`${NAME}=test`)) {

      url.pathname = "/test" + url.pathname;

    } else {

      // If there is no cookie, this is a new client. Choose a group and set the cookie.

      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split

      if (group === "control") {

        url.pathname = "/control" + url.pathname;

      } else {

        url.pathname = "/test" + url.pathname;

      }

      // Reconstruct response to avoid immutability

      let res = await fetch(url);

      res = new Response(res.body, res);

      // Set cookie to enable persistent A/B sessions.

      res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);

      return res;

    }

    return fetch(url);

  },

} satisfies ExportedHandler;


```

Python

```

import random

from urllib.parse import urlparse, urlunparse

from workers import Response, fetch, WorkerEntrypoint


NAME = "myExampleWorkersABTest"


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    url = urlparse(request.url)

    # Uncomment below when testing locally

    # url = url._replace(netloc="example.com") if "localhost" in url.netloc else url


    # Enable Passthrough to allow direct access to control and test routes.

    if url.path.startswith("/control") or url.path.startswith("/test"):

      return fetch(urlunparse(url))


    # Determine which group this requester is in.

    cookie = request.headers.get("cookie")


    if cookie and f'{NAME}=control' in cookie:

      url = url._replace(path="/control" + url.path)

    elif cookie and f'{NAME}=test' in cookie:

      url = url._replace(path="/test" + url.path)

    else:

      # If there is no cookie, this is a new client. Choose a group and set the cookie.

      group = "test" if random.random() < 0.5 else "control"

      if group == "control":

        url = url._replace(path="/control" + url.path)

      else:

        url = url._replace(path="/test" + url.path)


      # Reconstruct response to avoid immutability

      res = await fetch(urlunparse(url))

      headers = dict(res.headers)

      headers["Set-Cookie"] = f'{NAME}={group}; path=/'

      return Response(res.body, headers=headers)


    return fetch(urlunparse(url))


```

TypeScript

```

import { Hono } from "hono";

import { getCookie, setCookie } from "hono/cookie";


const app = new Hono();


const NAME = "myExampleWorkersABTest";


// Enable passthrough to allow direct access to control and test routes

app.all("/control/*", (c) => fetch(c.req.raw));

app.all("/test/*", (c) => fetch(c.req.raw));


// Middleware to handle A/B testing logic

app.use("*", async (c) => {

  const url = new URL(c.req.url);


  // Determine which group this requester is in

  const abTestCookie = getCookie(c, NAME);


  if (abTestCookie === "control") {

    // User is in control group

    url.pathname = "/control" + c.req.path;

  } else if (abTestCookie === "test") {

    // User is in test group

    url.pathname = "/test" + c.req.path;

  } else {

    // If there is no cookie, this is a new client

    // Choose a group and set the cookie (50/50 split)

    const group = Math.random() < 0.5 ? "test" : "control";


    // Update URL path based on assigned group

    if (group === "control") {

      url.pathname = "/control" + c.req.path;

    } else {

      url.pathname = "/test" + c.req.path;

    }


    // Set cookie to enable persistent A/B sessions

    setCookie(c, NAME, group, {

      path: "/",

    });

  }


  const res = await fetch(url);


  return c.body(res.body, res);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/ab-testing/#page","headline":"A/B testing with same-URL direct access · Cloudflare Workers docs","description":"Set up an A/B test by controlling what response is served based on cookies. This version supports passing the request through to test and control on the origin, bypassing random assignment.","url":"https://developers.cloudflare.com/workers/examples/ab-testing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/ab-testing/","name":"A/B testing with same-URL direct access"}}]}
```
