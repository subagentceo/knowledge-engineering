---
title: Handlers
description: Methods, such as `fetch()`, on Workers that can receive and process external inputs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Handlers

Handlers are methods on Workers that can receive and process external inputs, and can be invoked from outside your Worker. For example, the `fetch()` handler receives an HTTP request, and can return a response:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response('Hello World!');

  },

};


```

The following handlers are available within Workers:

* [ Alarm Handler ](https://developers.cloudflare.com/durable-objects/api/alarms/)
* [ Email Handler ](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/)
* [ Fetch Handler ](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/)
* [ Queue Handler ](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer)
* [ Scheduled Handler ](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)
* [ Tail Handler ](https://developers.cloudflare.com/workers/runtime-apis/handlers/tail/)

## Handlers in Python Workers

When you [write Workers in Python](https://developers.cloudflare.com/workers/languages/python/), handlers are placed in a class named `Default` that extends the [WorkerEntrypoint class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/) (which you can import from the `workers` SDK module).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/handlers/#page","headline":"Handlers · Cloudflare Workers docs","description":"Methods, such as fetch(), on Workers that can receive and process external inputs.","url":"https://developers.cloudflare.com/workers/runtime-apis/handlers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/handlers/","name":"Handlers"}}]}
```
