---
title: Modify response
description: Fetch and modify response properties which are immutable by creating a copy first.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Modify response

**Last reviewed:**  over 5 years ago 

Fetch and modify response properties which are immutable by creating a copy first.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/modify-response)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11702)
* [  TypeScript ](#tab-panel-11703)
* [  Python ](#tab-panel-11704)
* [  Hono ](#tab-panel-11705)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * @param {string} headerNameSrc Header to get the new value from

     * @param {string} headerNameDst Header to set based off of value in src

     */

    const headerNameSrc = "foo"; //"Orig-Header"

    const headerNameDst = "Last-Modified";


    /**

     * Response properties are immutable. To change them, construct a new

     * Response and pass modified status or statusText in the ResponseInit

     * object. Response headers can be modified through the headers `set` method.

     */

    const originalResponse = await fetch(request);


    // Change status and statusText, but preserve body and headers

    let response = new Response(originalResponse.body, {

      status: 500,

      statusText: "some message",

      headers: originalResponse.headers,

    });


    // Change response body by adding the foo prop

    const originalBody = await originalResponse.json();

    const body = JSON.stringify({ foo: "bar", ...originalBody });

    response = new Response(body, response);


    // Add a header using set method

    response.headers.set("foo", "bar");


    // Set destination header to the value of the source header

    const src = response.headers.get(headerNameSrc);


    if (src != null) {

      response.headers.set(headerNameDst, src);

      console.log(

        `Response header "${headerNameDst}" was set to "${response.headers.get(

          headerNameDst,

        )}"`,

      );

    }

    return response;

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * @param {string} headerNameSrc Header to get the new value from

     * @param {string} headerNameDst Header to set based off of value in src

     */

    const headerNameSrc = "foo"; //"Orig-Header"

    const headerNameDst = "Last-Modified";


    /**

     * Response properties are immutable. To change them, construct a new

     * Response and pass modified status or statusText in the ResponseInit

     * object. Response headers can be modified through the headers `set` method.

     */

    const originalResponse = await fetch(request);


    // Change status and statusText, but preserve body and headers

    let response = new Response(originalResponse.body, {

      status: 500,

      statusText: "some message",

      headers: originalResponse.headers,

    });


    // Change response body by adding the foo prop

    const originalBody = await originalResponse.json();

    const body = JSON.stringify({ foo: "bar", ...originalBody });

    response = new Response(body, response);


    // Add a header using set method

    response.headers.set("foo", "bar");


    // Set destination header to the value of the source header

    const src = response.headers.get(headerNameSrc);


    if (src != null) {

      response.headers.set(headerNameDst, src);

      console.log(

        `Response header "${headerNameDst}" was set to "${response.headers.get(

          headerNameDst,

        )}"`,

      );

    }

    return response;

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch

import json


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        header_name_src = "foo" # Header to get the new value from

        header_name_dst = "Last-Modified" # Header to set based off of value in src


        # Response properties are immutable. To change them, construct a new response

        original_response = await fetch(request)


        # Change status and statusText, but preserve body and headers

        response = Response(original_response.body, status=500, status_text="some message", headers=original_response.headers)


        # Change response body by adding the foo prop

        new_body = await original_response.json()

        new_body["foo"] = "bar"

        response.replace_body(json.dumps(new_body))


        # Add a new header

        response.headers["foo"] = "bar"


        # Set destination header to the value of the source header

        src = response.headers[header_name_src]


        if src is not None:

            response.headers[header_name_dst] = src

            print(f'Response header {header_name_dst} was set to {response.headers[header_name_dst]}')


        return response


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


app.get('*', async (c) => {

  /**

   * Header configuration

   */

  const headerNameSrc = "foo"; // Header to get the new value from

  const headerNameDst = "Last-Modified"; // Header to set based off of value in src


  /**

   * Response properties are immutable. With Hono, we can modify the response

   * by creating custom response objects.

   */

  const originalResponse = await fetch(c.req.raw);


  // Get the JSON body from the original response

  const originalBody = await originalResponse.json();


  // Modify the body by adding a new property

  const modifiedBody = {

    foo: "bar",

    ...originalBody

  };


  // Create a new custom response with modified status, headers, and body

  const response = new Response(JSON.stringify(modifiedBody), {

    status: 500,

    statusText: "some message",

    headers: originalResponse.headers,

  });


  // Add a header using set method

  response.headers.set("foo", "bar");


  // Set destination header to the value of the source header

  const src = response.headers.get(headerNameSrc);

  if (src != null) {

    response.headers.set(headerNameDst, src);

    console.log(

      `Response header "${headerNameDst}" was set to "${response.headers.get(headerNameDst)}"`

    );

  }


  return response;

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/modify-response/#page","headline":"Modify response · Cloudflare Workers docs","description":"Fetch and modify response properties which are immutable by creating a copy first.","url":"https://developers.cloudflare.com/workers/examples/modify-response/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Headers","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/modify-response/","name":"Modify response"}}]}
```
