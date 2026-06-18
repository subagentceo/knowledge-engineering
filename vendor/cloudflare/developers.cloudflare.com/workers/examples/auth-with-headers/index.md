---
title: Auth with headers
description: Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Auth with headers

**Last reviewed:**  over 5 years ago 

Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.

Caution when using in production

The example code contains a generic header key and value of `X-Custom-PSK` and `mypresharedkey`. To best protect your resources, change the header key and value in the Workers editor before saving your code.

* [  JavaScript ](#tab-panel-11591)
* [  TypeScript ](#tab-panel-11592)
* [  Python ](#tab-panel-11593)
* [  Hono ](#tab-panel-11594)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key

     * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value

     */

    const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";

    const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";

    const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);


    if (psk === PRESHARED_AUTH_HEADER_VALUE) {

      // Correct preshared header key supplied. Fetch request from origin.

      return fetch(request);

    }


    // Incorrect key supplied. Reject the request.

    return new Response("Sorry, you have supplied an invalid key.", {

      status: 403,

    });

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key

     * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value

     */

    const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";

    const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";

    const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);


    if (psk === PRESHARED_AUTH_HEADER_VALUE) {

      // Correct preshared header key supplied. Fetch request from origin.

      return fetch(request);

    }


    // Incorrect key supplied. Reject the request.

    return new Response("Sorry, you have supplied an invalid key.", {

      status: 403,

    });

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK"

        PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey"


        psk = request.headers[PRESHARED_AUTH_HEADER_KEY]


        if psk == PRESHARED_AUTH_HEADER_VALUE:

            # Correct preshared header key supplied. Fetch request from origin.

            return fetch(request)


        # Incorrect key supplied. Reject the request.

        return Response("Sorry, you have supplied an invalid key.", status=403)


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


// Add authentication middleware

app.use('*', async (c, next) => {

  /**

   * Define authentication constants

   */

  const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";

  const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";


  // Get the pre-shared key from the request header

  const psk = c.req.header(PRESHARED_AUTH_HEADER_KEY);


  if (psk === PRESHARED_AUTH_HEADER_VALUE) {

    // Correct preshared header key supplied. Continue to the next handler.

    await next();

  } else {

    // Incorrect key supplied. Reject the request.

    return c.text("Sorry, you have supplied an invalid key.", 403);

  }

});


// Handle all authenticated requests by passing through to origin

app.all('*', async (c) => {

  return fetch(c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/auth-with-headers/#page","headline":"Auth with headers · Cloudflare Workers docs","description":"Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.","url":"https://developers.cloudflare.com/workers/examples/auth-with-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","WebCrypto","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/auth-with-headers/","name":"Auth with headers"}}]}
```
