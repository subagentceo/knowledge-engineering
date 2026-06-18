---
title: Modify request property
description: Create a modified request with edited properties based off of an incoming request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Modify request property

**Last reviewed:**  over 5 years ago 

Create a modified request with edited properties based off of an incoming request.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/modify-request-property)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11698)
* [  TypeScript ](#tab-panel-11699)
* [  Python ](#tab-panel-11700)
* [  Hono ](#tab-panel-11701)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * Example someHost is set up to return raw JSON

     * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied

     * @param {string} someHost the host the request will resolve too

     */

    const someHost = "example.com";

    const someUrl = "https://foo.example.com/api.js";


    /**

     * The best practice is to only assign new RequestInit properties

     * on the request object using either a method or the constructor

     */

    const newRequestInit = {

      // Change method

      method: "POST",

      // Change body

      body: JSON.stringify({ bar: "foo" }),

      // Change the redirect mode.

      redirect: "follow",

      // Change headers, note this method will erase existing headers

      headers: {

        "Content-Type": "application/json",

      },

      // Change a Cloudflare feature on the outbound response

      cf: { apps: false },

    };


    // Change just the host

    const url = new URL(someUrl);


    url.hostname = someHost;


    // Best practice is to always use the original request to construct the new request

    // to clone all the attributes. Applying the URL also requires a constructor

    // since once a Request has been constructed, its URL is immutable.

    const newRequest = new Request(

      url.toString(),

      new Request(request, newRequestInit),

    );


    // Set headers using method

    newRequest.headers.set("X-Example", "bar");

    newRequest.headers.set("Content-Type", "application/json");

    try {

      return await fetch(newRequest);

    } catch (e) {

      return new Response(JSON.stringify({ error: e.message }), {

        status: 500,

      });

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * Example someHost is set up to return raw JSON

     * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied

     * @param {string} someHost the host the request will resolve too

     */

    const someHost = "example.com";

    const someUrl = "https://foo.example.com/api.js";


    /**

     * The best practice is to only assign new RequestInit properties

     * on the request object using either a method or the constructor

     */

    const newRequestInit = {

      // Change method

      method: "POST",

      // Change body

      body: JSON.stringify({ bar: "foo" }),

      // Change the redirect mode.

      redirect: "follow",

      // Change headers, note this method will erase existing headers

      headers: {

        "Content-Type": "application/json",

      },

      // Change a Cloudflare feature on the outbound response

      cf: { apps: false },

    };


    // Change just the host

    const url = new URL(someUrl);


    url.hostname = someHost;


    // Best practice is to always use the original request to construct the new request

    // to clone all the attributes. Applying the URL also requires a constructor

    // since once a Request has been constructed, its URL is immutable.

    const newRequest = new Request(

      url.toString(),

      new Request(request, newRequestInit),

    );


    // Set headers using method

    newRequest.headers.set("X-Example", "bar");

    newRequest.headers.set("Content-Type", "application/json");

    try {

      return await fetch(newRequest);

    } catch (e) {

      return new Response(JSON.stringify({ error: e.message }), {

        status: 500,

      });

    }

  },

} satisfies ExportedHandler;


```

Python

```

import json

from workers import WorkerEntrypoint

from pyodide.ffi import to_js as _to_js

from js import Object, URL, Request, fetch, Response


def to_js(obj):

    return _to_js(obj, dict_converter=Object.fromEntries)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        some_host = "example.com"

        some_url = "https://foo.example.com/api.js"


        # The best practice is to only assign new_request_init properties

        # on the request object using either a method or the constructor

        new_request_init = {

          "method": "POST", # Change method

          "body": json.dumps({ "bar": "foo" }), # Change body

          "redirect": "follow", # Change the redirect mode

          # Change headers, note this method will erase existing headers

          "headers": {

            "Content-Type": "application/json",

          },

          #  Change a Cloudflare feature on the outbound response

          "cf": { "apps": False },

        }


        # Change just the host

        url = URL.new(some_url)

        url.hostname = some_host


        # Best practice is to always use the original request to construct the new request

        # to clone all the attributes. Applying the URL also requires a constructor

        # since once a Request has been constructed, its URL is immutable.

        org_request = Request.new(request, new_request_init)

        new_request = Request.new(url.toString(),org_request)


        new_request.headers["X-Example"] =  "bar"

        new_request.headers["Content-Type"] = "application/json"


        try:

            return await fetch(new_request)

        except Exception as e:

            return Response.new({"error": str(e)}, status=500)


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.all("*", async (c) => {

  /**

   * Example someHost is set up to return raw JSON

   */

  const someHost = "example.com";

  const someUrl = "https://foo.example.com/api.js";


  // Create a URL object to modify the hostname

  const url = new URL(someUrl);

  url.hostname = someHost;


  // Create a new request

  // First create a clone of the original request with the new properties

  const requestClone = new Request(c.req.raw, {

    // Change method

    method: "POST",

    // Change body

    body: JSON.stringify({ bar: "foo" }),

    // Change the redirect mode

    redirect: "follow" as RequestRedirect,

    // Change headers, note this method will erase existing headers

    headers: {

      "Content-Type": "application/json",

      "X-Example": "bar",

    },

    // Change a Cloudflare feature on the outbound response

    cf: { apps: false },

  });


  // Then create a new request with the modified URL

  const newRequest = new Request(url.toString(), requestClone);


  // Send the modified request

  const response = await fetch(newRequest);


  // Return the response

  return response;

});


// Handle errors

app.onError((err, c) => {

  return err.getResponse();

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/modify-request-property/#page","headline":"Modify request property · Cloudflare Workers docs","description":"Create a modified request with edited properties based off of an incoming request.","url":"https://developers.cloudflare.com/workers/examples/modify-request-property/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Headers","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/modify-request-property/","name":"Modify request property"}}]}
```
