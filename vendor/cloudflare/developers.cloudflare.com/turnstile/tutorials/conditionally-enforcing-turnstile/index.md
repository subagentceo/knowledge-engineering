---
title: Conditionally enforce Turnstile
description: This tutorial explains how to conditionally enforce Turnstile based on the incoming request, such as a pre-shared secret in a header or a specific IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Conditionally enforce Turnstile

**Last reviewed:**  about 1 year ago 

This tutorial explains how to conditionally enforce Turnstile based on the incoming request, such as a pre-shared secret in a header or a specific IP address.

## Overview

You may have setups such as automation that cannot load or run the Turnstile challenge. Using [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/), this tutorial will demonstrate how to conditionally handle the [client-side widget](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) and [Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) when specific criteria are met.

Note

While this tutorial removes Turnstile client-side elements when specific criteria are met, you could instead conditionally insert them.

Warning

It is critical to make sure you are validating tokens with the Siteverify API when your criteria for enforcing Turnstile are not met.

It is not sufficient to only remove the client-side widget from the page, as an attacker can forge the request to your API.

## Implementation

This tutorial will modify the existing [Turnstile demo ↗](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/) to conditionally remove the existing `script` and widget container elements.

src/index.mjs

```

export default {

  async fetch(request) {

    // ...


    if (request.headers.get("x-bypass-turnstile") === "VerySecretValue") {

      class RemoveHandler {

        element(element) {

          element.remove();

        }

      }


      return new HTMLRewriter()

        // Remove the script tag

        .on(

          'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]',

          new RemoveHandler(),

        )

       // Remove the container used in implicit rendering

        .on(

          '.cf-turnstile',

          new RemoveHandler(),

        )

       // Remove the container used in explicit rendering

        .on(

          '#myWidget',

          new RemoveHandler(),

        )

        .transform(body);

    }


    return new Response(body, {

      headers: {

        "Content-Type": "text/html",

      },

    });

  },

};


```

## Server-side integration

We will exit early in our validation if the same logic we used to remove the client-side elements is present.

Warning

The same logic must be used in both the client-side and the server-side implementations.

src/index.mjs

```

async function handlePost(request) {

  if (request.headers.get("x-bypass-turnstile") === "VerySecretValue") {

    return new Response('Turnstile not enforced on this request')

  }

  // Proceed with validation as normal!

  const body = await request.formData();

  // Turnstile injects a token in "cf-turnstile-response".

  const token = body.get('cf-turnstile-response');

  const ip = request.headers.get('CF-Connecting-IP');

  // ...

}


```

With these changes, Turnstile will not be enforced on requests with the header `x-bypass-turnstile: VerySecretValue` present.

## Demonstration

After running `npm run dev` in the project folder, you can test the changes by running the following command:

Terminal window

```

curl -X POST http://localhost:8787/handler -H "x-bypass-turnstile: VerySecretValue"


```

```

Turnstile not enforced on this request


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/tutorials/conditionally-enforcing-turnstile/#page","headline":"Conditionally enforce Turnstile · Cloudflare Turnstile docs","description":"This tutorial explains how to conditionally enforce Turnstile based on the incoming request, such as a pre-shared secret in a header or a specific IP address.","url":"https://developers.cloudflare.com/turnstile/tutorials/conditionally-enforcing-turnstile/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Node.js","TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/tutorials/conditionally-enforcing-turnstile/","name":"Conditionally enforce Turnstile"}}]}
```
