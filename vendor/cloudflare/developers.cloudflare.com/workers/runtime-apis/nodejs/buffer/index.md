---
title: Buffer
description: Use the Node.js Buffer API in Cloudflare Workers to manipulate binary data with encoding and decoding support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Buffer

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [Buffer ↗](https://nodejs.org/docs/latest/api/buffer.html) API in Node.js is one of the most commonly used Node.js APIs for manipulating binary data. Every `Buffer` instance extends from the standard [Uint8Array ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Uint8Array) class, but adds a range of unique capabilities such as built-in base64 and hex encoding/decoding, byte-order manipulation, and encoding-aware substring searching.

JavaScript

```

import { Buffer } from "node:buffer";


const buf = Buffer.from("hello world", "utf8");


console.log(buf.toString("hex"));

// Prints: 68656c6c6f20776f726c64

console.log(buf.toString("base64"));

// Prints: aGVsbG8gd29ybGQ=


```

A Buffer extends from `Uint8Array`. Therefore, it can be used in any Workers API that currently accepts `Uint8Array`, such as creating a new Response:

JavaScript

```

const response = new Response(Buffer.from("hello world"));


```

You can also use the `Buffer` API when interacting with streams:

JavaScript

```

const writable = getWritableStreamSomehow();

const writer = writable.getWriter();

writer.write(Buffer.from("hello world"));


```

One key difference between the Workers implementation of `Buffer` and the Node.js implementation is that some methods of creating a `Buffer` in Node.js will allocate those from a global memory pool as a performance optimization. The Workers implementation does not use a memory pool and all `Buffer` instances are allocated independently.

Further, in Node.js it is possible to allocate a `Buffer` with uninitialized memory using the `Buffer.allocUnsafe()` method. This is not supported in Workers and `Buffer`instances are always initialized so that the `Buffer` is always filled with null bytes (`0x00`) when allocated.

Refer to the [Node.js documentation for Buffer ↗](https://nodejs.org/dist/latest-v19.x/docs/api/buffer.html) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/#page","headline":"Buffer · Cloudflare Workers docs","description":"Use the Node.js Buffer API in Cloudflare Workers to manipulate binary data with encoding and decoding support.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/buffer/","name":"Buffer"}}]}
```
