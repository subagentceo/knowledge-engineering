---
title: Modules
description: Miniflare supports both the traditional service-worker and the newer modules formats for writing workers. To use the modules format, enable it with:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Modules

* [Modules Reference](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/)

## Enabling Modules

Miniflare supports both the traditional `service-worker` and the newer `modules` formats for writing workers. To use the `modules` format, enable it with:

JavaScript

```

const mf = new Miniflare({

  modules: true,

});


```

You can then use `modules` worker scripts like the following:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // - `request` is the incoming `Request` instance

    // - `env` contains bindings, KV namespaces, Durable Objects, etc

    // - `ctx` contains `waitUntil` and `passThroughOnException` methods

    return new Response("Hello Miniflare!");

  },

  async scheduled(controller, env, ctx) {

    // - `controller` contains `scheduledTime` and `cron` properties

    // - `env` contains bindings, KV namespaces, Durable Objects, etc

    // - `ctx` contains the `waitUntil` method

    console.log("Doing something scheduled...");

  },

};


```

String scripts via the `script` option are supported using the `modules` format, but you cannot import other modules using them. You must use a script file via the `scriptPath` option for this.

## Module Rules

Miniflare supports all module types: `ESModule`, `CommonJS`, `Text`, `Data` and`CompiledWasm`. You can specify additional module resolution rules as follows:

JavaScript

```

const mf = new Miniflare({

  modulesRules: [

    { type: "ESModule", include: ["**/*.js"], fallthrough: true },

    { type: "Text", include: ["**/*.txt"] },

  ],

});


```

### Default Rules

The following rules are automatically added to the end of your modules rules list. You can override them by specifying rules matching the same `globs`:

JavaScript

```

[

  { type: "ESModule", include: ["**/*.mjs"] },

  { type: "CommonJS", include: ["**/*.js", "**/*.cjs"] },

];


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/modules/#page","headline":"Modules · Cloudflare Workers docs","description":"Miniflare supports both the traditional service-worker and the newer modules formats for writing workers. To use the modules format, enable it with:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/modules/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/modules/","name":"Modules"}}]}
```
