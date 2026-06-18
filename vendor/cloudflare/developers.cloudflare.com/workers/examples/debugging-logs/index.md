---
title: Debugging logs
description: Send debugging information in an errored response to a logging service.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Debugging logs

**Last reviewed:**  over 5 years ago 

Send debugging information in an errored response to a logging service.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/debugging-logs)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11658)
* [  TypeScript ](#tab-panel-11659)
* [  Python ](#tab-panel-11660)
* [  Hono ](#tab-panel-11661)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Service configured to receive logs

    const LOG_URL = "https://log-service.example.com/";


    async function postLog(data) {

      return await fetch(LOG_URL, {

        method: "POST",

        body: data,

      });

    }


    let response;


    try {

      response = await fetch(request);

      if (!response.ok && !response.redirected) {

        const body = await response.text();

        throw new Error(

          "Bad response at origin. Status: " +

            response.status +

            " Body: " +

            // Ensure the string is small enough to be a header

            body.trim().substring(0, 10),

        );

      }

    } catch (err) {

      // Without ctx.waitUntil(), your fetch() to Cloudflare's

      // logging service may or may not complete

      ctx.waitUntil(postLog(err.toString()));

      const stack = JSON.stringify(err.stack) || err;

      // Copy the response and initialize body to the stack trace

      response = new Response(stack, response);

      // Add the error stack into a header to find out what happened

      response.headers.set("X-Debug-stack", stack);

      response.headers.set("X-Debug-err", err);

    }

    return response;

  },

};


```

TypeScript

```

interface Env {}

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Service configured to receive logs

    const LOG_URL = "https://log-service.example.com/";


    async function postLog(data) {

      return await fetch(LOG_URL, {

        method: "POST",

        body: data,

      });

    }


    let response;


    try {

      response = await fetch(request);

      if (!response.ok && !response.redirected) {

        const body = await response.text();

        throw new Error(

          "Bad response at origin. Status: " +

            response.status +

            " Body: " +

            // Ensure the string is small enough to be a header

            body.trim().substring(0, 10),

        );

      }

    } catch (err) {

      // Without ctx.waitUntil(), your fetch() to Cloudflare's

      // logging service may or may not complete

      ctx.waitUntil(postLog(err.toString()));

      const stack = JSON.stringify(err.stack) || err;

      // Copy the response and initialize body to the stack trace

      response = new Response(stack, response);

      // Add the error stack into a header to find out what happened

      response.headers.set("X-Debug-stack", stack);

      response.headers.set("X-Debug-err", err);

    }

    return response;

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import WorkerEntrypoint

from pyodide.ffi import create_proxy

from js import Response, fetch


async def post_log(data):

  log_url = "https://log-service.example.com/"

  await fetch(log_url, method="POST", body=data)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Service configured to receive logs

        response = await fetch(request)


        try:

            if not response.ok and not response.redirected:

                body = await response.text()

            # Simulating an error. Ensure the string is small enough to be a header

            raise Exception(f'Bad response at origin. Status:{response.status} Body:{body.strip()[:10]}')

        except Exception as e:

            # Without ctx.waitUntil(), your fetch() to Cloudflare's

            # logging service may or may not complete

            self.ctx.waitUntil(create_proxy(post_log(str(e))))

            # Copy the response and add to header

            response = Response.new(stack, response)

            response.headers["X-Debug-err"] = str(e)


        return response


```

TypeScript

```

import { Hono } from 'hono';


// Define the environment with appropriate types

interface Env {}


const app = new Hono<{ Bindings: Env }>();


// Service configured to receive logs

const LOG_URL = "https://log-service.example.com/";


// Function to post logs to an external service

async function postLog(data: string) {

  return await fetch(LOG_URL, {

    method: "POST",

    body: data,

  });

}


// Middleware to handle error logging

app.use('*', async (c, next) => {

  try {

    // Process the request with the next handler

    await next();


    // After processing, check if the response indicates an error

    if (c.res && (!c.res.ok && !c.res.redirected)) {

      const body = await c.res.clone().text();

      throw new Error(

        "Bad response at origin. Status: " +

        c.res.status +

        " Body: " +

        // Ensure the string is small enough to be a header

        body.trim().substring(0, 10)

      );

    }


  } catch (err) {

    // Without waitUntil, the fetch to the logging service may not complete

    c.executionCtx.waitUntil(

      postLog(err.toString())

    );


    // Get the error stack or error itself

    const stack = JSON.stringify(err.stack) || err.toString();


    // Create a new response with the error information

    const response = c.res ?

      new Response(stack, {

        status: c.res.status,

        headers: c.res.headers

      }) :

      new Response(stack, { status: 500 });


    // Add debug headers

    response.headers.set("X-Debug-stack", stack);

    response.headers.set("X-Debug-err", err.toString());


    // Set the modified response

    c.res = response;

  }

});


// Default route handler that passes requests through

app.all('*', async (c) => {

  return fetch(c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/debugging-logs/#page","headline":"Debugging logs · Cloudflare Workers docs","description":"Send debugging information in an errored response to a logging service.","url":"https://developers.cloudflare.com/workers/examples/debugging-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/debugging-logs/","name":"Debugging logs"}}]}
```
