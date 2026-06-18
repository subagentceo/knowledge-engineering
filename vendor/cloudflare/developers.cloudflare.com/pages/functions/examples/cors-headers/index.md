---
title: Adding CORS headers
description: A Pages Functions for appending CORS headers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Adding CORS headers

A Pages Functions for appending CORS headers.

This example is a snippet from our Cloudflare Pages Template repo.

TypeScript

```

// Respond to OPTIONS method

export const onRequestOptions: PagesFunction = async () => {

  return new Response(null, {

    status: 204,

    headers: {

      "Access-Control-Allow-Origin": "*",

      "Access-Control-Allow-Headers": "*",

      "Access-Control-Allow-Methods": "GET, OPTIONS",

      "Access-Control-Max-Age": "86400",

    },

  });

};


// Set CORS to all /api responses

export const onRequest: PagesFunction = async (context) => {

  const response = await context.next();

  response.headers.set("Access-Control-Allow-Origin", "*");

  response.headers.set("Access-Control-Max-Age", "86400");

  return response;

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/examples/cors-headers/#page","headline":"Adding CORS headers · Cloudflare Pages docs","description":"A Pages Functions for appending CORS headers.","url":"https://developers.cloudflare.com/pages/functions/examples/cors-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/examples/","name":"Examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/examples/cors-headers/","name":"Adding CORS headers"}}]}
```
