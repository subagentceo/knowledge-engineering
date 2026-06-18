---
title: zlib
description: Use the Node.js zlib module in Workers for Gzip, Deflate, and Brotli compression.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# zlib

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The node:zlib module provides compression functionality implemented using Gzip, Deflate/Inflate, and Brotli. To access it:

JavaScript

```

import zlib from "node:zlib";


```

The full `node:zlib` API is documented in the [Node.js documentation for node:zlib ↗](https://nodejs.org/api/zlib.html).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/#page","headline":"zlib · Cloudflare Workers docs","description":"Use the Node.js zlib module in Workers for Gzip, Deflate, and Brotli compression.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/zlib/","name":"zlib"}}]}
```
