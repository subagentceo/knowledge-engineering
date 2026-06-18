---
title: Module support
description: Import ES Modules, WebAssembly, text, and binary files in Pages Functions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Module support

Pages Functions provide support for several module types, much like [Workers ↗](https://blog.cloudflare.com/workers-javascript-modules/). This means that you can import and use external modules such as WebAssembly (Wasm), `text` and `binary` files inside your Functions code.

This guide will instruct you on how to use these different module types inside your Pages Functions.

## ECMAScript Modules

ECMAScript modules (or in short ES Modules) is the official, [standardized ↗](https://tc39.es/ecma262/#sec-modules) module system for JavaScript. It is the recommended mechanism for writing modular and reusable JavaScript code.

[ES Modules ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are defined by the use of `import` and `export` statements. Below is an example of a script written in ES Modules format, and a Pages Function that imports that module:

JavaScript

```

export function greeting(name: string): string {

  return `Hello ${name}!`;

}


```

JavaScript

```

import { greeting } from "../src/greeting.ts";


export async function onRequest(context) {

  return new Response(`${greeting("Pages Functions")}`);

}


```

## WebAssembly Modules

[WebAssembly](https://developers.cloudflare.com/workers/runtime-apis/webassembly/) (abbreviated Wasm) allows you to compile languages like Rust, Go, or C to a binary format that can run in a wide variety of environments, including web browsers, Cloudflare Workers, Cloudflare Pages Functions, and other WebAssembly runtimes.

The distributable, loadable, and executable unit of code in WebAssembly is called a [module ↗](https://webassembly.github.io/spec/core/syntax/modules.html).

Below is a basic example of how you can import Wasm Modules inside your Pages Functions code:

JavaScript

```

import addModule from "add.wasm";


export async function onRequest() {

  const addInstance = await WebAssembly.instantiate(addModule);

  return new Response(

    `The meaning of life is ${addInstance.exports.add(20, 1)}`,

  );

}


```

## Text Modules

Text Modules are a non-standardized means of importing resources such as HTML files as a `String`.

To import the below HTML file into your Pages Functions code:

```

<!DOCTYPE html>

<html>

  <body>

    <h1>Hello Pages Functions!</h1>

  </body>

</html>


```

Use the following script:

JavaScript

```

import html from "../index.html";


export async function onRequest() {

  return new Response(html, {

    headers: { "Content-Type": "text/html" },

  });

}


```

## Binary Modules

Binary Modules are a non-standardized way of importing binary data such as images as an `ArrayBuffer`.

Below is a basic example of how you can import the data from a binary file inside your Pages Functions code:

JavaScript

```

import data from "../my-data.bin";


export async function onRequest() {

  return new Response(data, {

    headers: { "Content-Type": "application/octet-stream" },

  });

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/module-support/#page","headline":"Module support · Cloudflare Pages docs","description":"Import ES Modules, WebAssembly, text, and binary files in Pages Functions.","url":"https://developers.cloudflare.com/pages/functions/module-support/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/module-support/","name":"Module support"}}]}
```
