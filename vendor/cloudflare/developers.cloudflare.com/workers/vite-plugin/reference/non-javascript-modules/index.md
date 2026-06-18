---
title: Non-JavaScript modules
description: Additional module types that can be imported in your Worker
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Non-JavaScript modules

In addition to TypeScript and JavaScript, the following module types are automatically configured to be importable in your Worker code.

| Module extension    | Imported type      |
| ------------------- | ------------------ |
| .txt                | string             |
| .html               | string             |
| .sql                | string             |
| .bin                | ArrayBuffer        |
| .wasm, .wasm?module | WebAssembly.Module |

For example, with the following import, `text` will be a string containing the contents of `example.txt`:

JavaScript

```

import text from "./example.txt";


```

This is also the basis for importing Wasm, as in the following example:

TypeScript

```

import wasm from "./example.wasm";


// Instantiate Wasm modules in the module scope

const instance = await WebAssembly.instantiate(wasm);


export default {

  fetch() {

    const result = instance.exports.exported_func();


    return new Response(result);

  },

};


```

Note

Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/#page","headline":"Non-JavaScript modules · Cloudflare Workers docs","description":"Additional module types that can be imported in your Worker","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/non-javascript-modules/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/non-javascript-modules/","name":"Non-JavaScript modules"}}]}
```
