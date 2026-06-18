---
title: EventEmitter
description: Use the Node.js EventEmitter API in Cloudflare Workers to emit and listen for named events.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# EventEmitter

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

An [EventEmitter ↗](https://nodejs.org/docs/latest/api/events.html#class-eventemitter)is an object that emits named events that cause listeners to be called.

JavaScript

```

import { EventEmitter } from "node:events";


const emitter = new EventEmitter();

emitter.on("hello", (...args) => {

  console.log(...args); // 1 2 3

});


emitter.emit("hello", 1, 2, 3);


```

The implementation in the Workers runtime supports the entire Node.js `EventEmitter` API. This includes the [captureRejections ↗](https://nodejs.org/docs/latest/api/events.html#capture-rejections-of-promises)option that allows improved handling of async functions as event handlers:

JavaScript

```

const emitter = new EventEmitter({ captureRejections: true });

emitter.on("hello", async (...args) => {

  throw new Error("boom");

});

emitter.on("error", (err) => {

  // the async promise rejection is emitted here!

});


```

Like Node.js, when an `'error'` event is emitted on an `EventEmitter` and there is no listener for it, the error will be immediately thrown. However, in Node.js it is possible to add a handler on the `process` object for the`'uncaughtException'` event to catch globally uncaught exceptions. The`'uncaughtException'` event, however, is currently not implemented in the Workers runtime. It is strongly recommended to always add an `'error'` listener to any `EventEmitter` instance.

Refer to the [Node.js documentation for EventEmitter ↗](https://nodejs.org/api/events.html#class-eventemitter) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/#page","headline":"EventEmitter · Cloudflare Workers docs","description":"Use the Node.js EventEmitter API in Cloudflare Workers to emit and listen for named events.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/eventemitter/","name":"EventEmitter"}}]}
```
