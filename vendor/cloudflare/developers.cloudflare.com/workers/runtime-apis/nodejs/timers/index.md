---
title: timers
description: Use the Node.js timers API in Cloudflare Workers to schedule functions with setTimeout, setInterval, and setImmediate.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# timers

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

Use [node:timers ↗](https://nodejs.org/api/timers.html) APIs to schedule functions to be executed later.

This includes [setTimeout ↗](https://nodejs.org/api/timers.html#settimeoutcallback-delay-args) for calling a function after a delay,[setInterval ↗](https://nodejs.org/api/timers.html#clearintervaltimeout) for calling a function repeatedly, and [setImmediate ↗](https://nodejs.org/api/timers.html#setimmediatecallback-args) for calling a function in the next iteration of the event loop.

* [  JavaScript ](#tab-panel-12017)
* [  TypeScript ](#tab-panel-12018)

index.js

```

import timers from "node:timers";


export default {

  async fetch() {

    console.log("first");

    const { promise: promise1, resolve: resolve1 } = Promise.withResolvers();

    const { promise: promise2, resolve: resolve2 } = Promise.withResolvers();

    timers.setTimeout(() => {

      console.log("last");

      resolve1();

    }, 10);


    timers.setTimeout(() => {

      console.log("next");

      resolve2();

    });


    await Promise.all([promise1, promise2]);


    return new Response("ok");

  },

};


```

index.ts

```

import timers from "node:timers";


export default {

  async fetch(): Promise<Response> {

    console.log("first");

    const { promise: promise1, resolve: resolve1 } = Promise.withResolvers<void>();

    const { promise: promise2, resolve: resolve2 } = Promise.withResolvers<void>();

    timers.setTimeout(() => {

      console.log("last");

      resolve1();

    }, 10);


    timers.setTimeout(() => {

      console.log("next");

      resolve2();

    });


    await Promise.all([promise1, promise2]);


    return new Response("ok");

  }

} satisfies ExportedHandler<Env>;


```

Note

Due to [security-based restrictions on timers](https://developers.cloudflare.com/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading) in Workers, timers are limited to returning the time of the last I/O. This means that while setTimeout, setInterval, and setImmediate will defer your function execution until after other events have run, they will not delay them for the full time specified.

Note

When called from a global level (on [globalThis ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/globalThis)), functions such as `clearTimeout` and `setTimeout` will respect web standards rather than Node.js-specific functionality. For complete Node.js compatibility, you must call functions from the `node:timers` module.

The full `node:timers` API is documented in the [Node.js documentation for node:timers ↗](https://nodejs.org/api/timers.html).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/#page","headline":"timers · Cloudflare Workers docs","description":"Use the Node.js timers API in Cloudflare Workers to schedule functions with setTimeout, setInterval, and setImmediate.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/timers/","name":"timers"}}]}
```
