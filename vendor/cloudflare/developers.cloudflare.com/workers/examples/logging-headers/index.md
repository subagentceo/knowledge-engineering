---
title: Logging headers to console
description: Examine the contents of a Headers object by logging to console with a Map.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Logging headers to console

**Last reviewed:**  over 5 years ago 

Examine the contents of a Headers object by logging to console with a Map.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/logging-headers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-11693)
* [  TypeScript ](#tab-panel-11694)
* [  Python ](#tab-panel-11695)
* [  Rust ](#tab-panel-11696)
* [  Hono ](#tab-panel-11697)

JavaScript

```

export default {

  async fetch(request) {

    console.log(new Map(request.headers));

    return new Response("Hello world");

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    console.log(new Map(request.headers));

    return new Response("Hello world");

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        print(dict(request.headers))

        return Response('Hello world')


```

```

use worker::*;


#[event(fetch)]

async fn fetch(req: HttpRequest, _env: Env, _ctx: Context) -> Result<Response> {

    console_log!("{:?}", req.headers());

    Response::ok("hello world")

}


```

TypeScript

```

import { Hono } from 'hono';


const app = new Hono();


app.get('*', (c) => {

  // Different ways to log headers in Hono:


  // 1. Using Map to display headers in console

  console.log('Headers as Map:', new Map(c.req.raw.headers));


  // 2. Using spread operator to log headers

  console.log('Headers spread:', [...c.req.raw.headers]);


  // 3. Using Object.fromEntries to convert to an object

  console.log('Headers as Object:', Object.fromEntries(c.req.raw.headers));


  // 4. Hono's built-in header accessor (for individual headers)

  console.log('User-Agent:', c.req.header('User-Agent'));


  // 5. Using c.req.headers to get all headers

  console.log('All headers from Hono context:', c.req.header());


  return c.text('Hello world');

});


export default app;


```

---

## Console-logging headers

Use a `Map` if you need to log a `Headers` object to the console:

JavaScript

```

console.log(new Map(request.headers));


```

Use the `spread` operator if you need to quickly stringify a `Headers` object:

JavaScript

```

let requestHeaders = JSON.stringify([...request.headers]);


```

Use `Object.fromEntries` to convert the headers to an object:

JavaScript

```

let requestHeaders = Object.fromEntries(request.headers);


```

### The problem

When debugging Workers, examine the headers on a request or response. A common mistake is to try to log headers to the developer console via code like this:

JavaScript

```

console.log(request.headers);


```

Or this:

JavaScript

```

console.log(`Request headers: ${JSON.stringify(request.headers)}`);


```

Both attempts result in what appears to be an empty object — the string `"{}"` — even though calling `request.headers.has("Your-Header-Name")` might return true. This is the same behavior that browsers implement.

The reason this happens is because [Headers ↗](https://developer.mozilla.org/en-US/docs/Web/API/Headers) objects do not store headers in enumerable JavaScript properties, so the developer console and JSON stringifier do not know how to read the names and values of the headers. It is not actually an empty object, but rather an opaque object.

`Headers` objects are iterable, which you can take advantage of to develop a couple of quick one-liners for debug-printing headers.

### Pass headers through a Map

The first common idiom for making Headers `console.log()`\-friendly is to construct a `Map` object from the `Headers` object and log the `Map` object.

JavaScript

```

console.log(new Map(request.headers));


```

This works because:

* `Map` objects can be constructed from iterables, like `Headers`.
* The `Map` object does store its entries in enumerable JavaScript properties, so the developer console can see into it.

### Spread headers into an array

The `Map` approach works for calls to `console.log()`. If you need to stringify your headers, you will discover that stringifying a `Map` yields nothing more than `[object Map]`.

Even though a `Map` stores its data in enumerable properties, those properties are [Symbol ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Symbol)\-keyed. Because of this, `JSON.stringify()` will [ignore Symbol-keyed properties ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Symbol#symbols%5Fand%5Fjson.stringify) and you will receive an empty `{}`.

Instead, you can take advantage of the iterability of the `Headers` object in a new way by applying the [spread operator ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread%5Fsyntax) (`...`) to it.

JavaScript

```

let requestHeaders = JSON.stringify([...request.headers], null, 2);

console.log(`Request headers: ${requestHeaders}`);


```

### Convert headers into an object with Object.fromEntries (ES2019)

ES2019 provides [Object.fromEntries ↗](https://github.com/tc39/proposal-object-from-entries) which is a call to convert the headers into an object:

JavaScript

```

let headersObject = Object.fromEntries(request.headers);

let requestHeaders = JSON.stringify(headersObject, null, 2);

console.log(`Request headers: ${requestHeaders}`);


```

This results in something like:

JavaScript

```

Request headers: {

  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",

  "accept-encoding": "gzip",

  "accept-language": "en-US,en;q=0.9",

  "cf-ipcountry": "US",

  // ...

}"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/logging-headers/#page","headline":"Logging headers to console · Cloudflare Workers docs","description":"Examine the contents of a Headers object by logging to console with a Map.","url":"https://developers.cloudflare.com/workers/examples/logging-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging","Headers","JavaScript","Rust","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/logging-headers/","name":"Logging headers to console"}}]}
```
