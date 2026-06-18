---
title: StringDecoder
description: Use the Node.js string_decoder module in Cloudflare Workers for decoding buffer objects into strings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# StringDecoder

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:string\_decoder ↗](https://nodejs.org/api/string%5Fdecoder.html) is a legacy utility module that predates the WHATWG standard [TextEncoder](https://developers.cloudflare.com/workers/runtime-apis/encoding/#textencoder) and [TextDecoder](https://developers.cloudflare.com/workers/runtime-apis/encoding/#textdecoder) API. In most cases, you should use `TextEncoder` and `TextDecoder` instead. `StringDecoder` is available in the Workers runtime primarily for compatibility with existing npm packages that rely on it. `StringDecoder` can be accessed using:

JavaScript

```

const { StringDecoder } = require("node:string_decoder");

const decoder = new StringDecoder("utf8");


const cent = Buffer.from([0xc2, 0xa2]);

console.log(decoder.write(cent));


const euro = Buffer.from([0xe2, 0x82, 0xac]);

console.log(decoder.write(euro));


```

Refer to the [Node.js documentation for string\_decoder ↗](https://nodejs.org/dist/latest-v20.x/docs/api/string%5Fdecoder.html) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/#page","headline":"StringDecoder · Cloudflare Workers docs","description":"Use the Node.js string\\_decoder module in Cloudflare Workers for decoding buffer objects into strings.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/string-decoder/","name":"StringDecoder"}}]}
```
