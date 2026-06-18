---
title: Using timingSafeEqual
description: Protect against timing attacks by safely comparing values using `timingSafeEqual`.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using timingSafeEqual

**Last reviewed:**  almost 3 years ago 

Protect against timing attacks by safely comparing values using `timingSafeEqual`.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/protect-against-timing-attacks)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

The [crypto.subtle.timingSafeEqual](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal) function compares two values using a constant-time algorithm. The time taken is independent of the contents of the values.

When strings are compared using the equality operator (`==` or `===`), the comparison will end at the first mismatched character. By using `timingSafeEqual`, an attacker would not be able to use timing to find where at which point in the two strings there is a difference.

The `timingSafeEqual` function takes two `ArrayBuffer` or `TypedArray` values to compare. These buffers must be of equal length, otherwise an exception is thrown. Note that this function is not constant time with respect to the length of the parameters and also does not guarantee constant time for the surrounding code. Handling of secrets should be taken with care to not introduce timing side channels.

Warning

Do not return early when the input and secret have different lengths. An early return leaks the length of the secret through response timing. Instead, always perform a constant-time comparison as shown in the examples below — when lengths differ, compare the user input against itself and negate the result so the check still fails but takes the same amount of time.

In order to compare two strings, you must use the [TextEncoder](https://developers.cloudflare.com/workers/runtime-apis/encoding/#textencoder) API.

* [  TypeScript ](#tab-panel-11715)
* [  Python ](#tab-panel-11716)
* [  Hono ](#tab-panel-11717)

TypeScript

```

interface Environment {

  MY_SECRET_VALUE?: string;

}


export default {

  async fetch(req: Request, env: Environment) {

    if (!env.MY_SECRET_VALUE) {

      return new Response("Missing secret binding", { status: 500 });

    }


    const authToken = req.headers.get("Authorization") || "";


    const encoder = new TextEncoder();


    const userValue = encoder.encode(authToken);

    const secretValue = encoder.encode(env.MY_SECRET_VALUE);


    // Do not return early when lengths differ — that leaks the secret's

    // length through timing.  Instead, always perform a constant-time

    // comparison: when the lengths match compare directly; otherwise

    // compare the user input against itself (always true) and negate.

    const lengthsMatch = userValue.byteLength === secretValue.byteLength;

    const isEqual = lengthsMatch

      ? crypto.subtle.timingSafeEqual(userValue, secretValue)

      : !crypto.subtle.timingSafeEqual(userValue, userValue);


    if (!isEqual) {

      return new Response("Unauthorized", { status: 401 });

    }


    return new Response("Welcome!");

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response

from js import TextEncoder, crypto


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        auth_token = request.headers["Authorization"] or ""

        secret = self.env.MY_SECRET_VALUE


        if secret is None:

            return Response("Missing secret binding", status=500)


        encoder = TextEncoder.new()

        user_value = encoder.encode(auth_token)

        secret_value = encoder.encode(secret)


        # Do not return early when lengths differ — that leaks the secret's

        # length through timing.  Always perform a constant-time comparison.

        if user_value.byteLength == secret_value.byteLength:

            is_equal = crypto.subtle.timingSafeEqual(user_value, secret_value)

        else:

            is_equal = not crypto.subtle.timingSafeEqual(user_value, user_value)


        if not is_equal:

            return Response("Unauthorized", status=401)


        return Response("Welcome!")


```

TypeScript

```

import { Hono } from 'hono';


interface Environment {

  Bindings: {

    MY_SECRET_VALUE?: string;

  }

}


const app = new Hono<Environment>();


// Middleware to handle authentication with timing-safe comparison

app.use('*', async (c, next) => {

  const secret = c.env.MY_SECRET_VALUE;


  if (!secret) {

    return c.text("Missing secret binding", 500);

  }


  const authToken = c.req.header("Authorization") || "";


  const encoder = new TextEncoder();


  const userValue = encoder.encode(authToken);

  const secretValue = encoder.encode(secret);


  // Do not return early when lengths differ — that leaks the secret's

  // length through timing.  Instead, always perform a constant-time

  // comparison: when the lengths match compare directly; otherwise

  // compare the user input against itself (always true) and negate.

  const lengthsMatch = userValue.byteLength === secretValue.byteLength;

  const isEqual = lengthsMatch

    ? crypto.subtle.timingSafeEqual(userValue, secretValue)

    : !crypto.subtle.timingSafeEqual(userValue, userValue);


  if (!isEqual) {

    return c.text("Unauthorized", 401);

  }


  // If we got here, the auth token is valid

  await next();

});


// Protected route

app.get('*', (c) => {

  return c.text("Welcome!");

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/#page","headline":"Using timingSafeEqual · Cloudflare Workers docs","description":"Protect against timing attacks by safely comparing values using timingSafeEqual.","url":"https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","WebCrypto","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/protect-against-timing-attacks/","name":"Using timingSafeEqual"}}]}
```
