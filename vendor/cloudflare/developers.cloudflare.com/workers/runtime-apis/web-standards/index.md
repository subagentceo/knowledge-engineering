---
title: Web standards
description: Standardized APIs for use by Workers running on Cloudflare's global network.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Web standards

## JavaScript standards

The Cloudflare Workers runtime is [built on top of the V8 JavaScript and WebAssembly engine](https://developers.cloudflare.com/workers/reference/how-workers-works/). The Workers runtime is updated at least once a week, to at least the version of V8 that is currently used by Google Chrome's stable release. This means you can safely use the latest JavaScript features, with no need for transpilers.

All of the [standard built-in objects ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) supported by the current Google Chrome stable release are supported, with a few notable exceptions:

* For security reasons, the following are not allowed:  
   * `eval()`  
   * `new Function`  
   * [WebAssembly.compile ↗](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript%5Finterface/compile%5Fstatic)  
   * [WebAssembly.compileStreaming ↗](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript%5Finterface/compileStreaming%5Fstatic)  
   * `WebAssembly.instantiate` with a [buffer parameter ↗](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript%5Finterface/instantiate%5Fstatic#primary%5Foverload%5F%E2%80%94%5Ftaking%5Fwasm%5Fbinary%5Fcode)  
   * [WebAssembly.instantiateStreaming ↗](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript%5Finterface/instantiateStreaming%5Fstatic)
* `Date.now()` returns the time of the last I/O; it does not advance during code execution.

---

## Web standards and global APIs

The following methods are available per the [Worker Global Scope ↗](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope):

### Base64 utility methods

* atob()  
   * Decodes a string of data which has been encoded using base-64 encoding.
* btoa()  
   * Creates a base-64 encoded ASCII string from a string of binary data.

### Timers

* setInterval()  
   * Schedules a function to execute every time a given number of milliseconds elapses.
* clearInterval()  
   * Cancels the repeated execution set using [setInterval() ↗](https://developer.mozilla.org/en-US/docs/Web/API/setInterval).
* setTimeout()  
   * Schedules a function to execute in a given amount of time.
* clearTimeout()  
   * Cancels the delayed execution set using [setTimeout() ↗](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).
* [scheduler.wait()](https://developers.cloudflare.com/workers/runtime-apis/scheduler/)  
   * Returns a Promise that resolves after a given number of milliseconds. An `await`\-able alternative to `setTimeout()`.

Note

Timers are only available inside of [the Request Context](https://developers.cloudflare.com/workers/runtime-apis/request/#the-request-context).

### `performance.timeOrigin` and `performance.now()`

* performance.timeOrigin  
   * Returns the high resolution time origin. Workers uses the UNIX epoch as the time origin, meaning that `performance.timeOrigin` will always return `0`.
* performance.now()  
   * Returns a `DOMHighResTimeStamp` representing the number of milliseconds elapsed since `performance.timeOrigin`. Note that Workers intentionally reduces the precision of `performance.now()` such that it returns the time of the last I/O and does not advance during code execution. Effectively, because of this, and because `performance.timeOrigin` is always, `0`, `performance.now()` will always equal `Date.now()`, yielding a consistent view of the passage of time within a Worker.

### `EventTarget` and `Event`

The [EventTarget ↗](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) and [Event ↗](https://developer.mozilla.org/en-US/docs/Web/API/Event) API allow objects to publish and subscribe to events.

### `AbortController` and `AbortSignal`

The [AbortController ↗](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and [AbortSignal ↗](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) APIs provide a common model for canceling asynchronous operations.

### Fetch global

* fetch()  
   * Starts the process of fetching a resource from the network. Refer to [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/).

Note

The Fetch API is only available inside of [the Request Context](https://developers.cloudflare.com/workers/runtime-apis/request/#the-request-context).

---

## Encoding API

Both `TextEncoder` and `TextDecoder` support UTF-8 encoding/decoding.

[Refer to the MDN documentation for more information ↗](https://developer.mozilla.org/en-US/docs/Web/API/Encoding%5FAPI).

The [TextEncoderStream ↗](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoderStream) and [TextDecoderStream ↗](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream) classes are also available.

---

## URL API

The URL API supports URLs conforming to HTTP and HTTPS schemes.

[Refer to the MDN documentation for more information ↗](https://developer.mozilla.org/en-US/docs/Web/API/URL)

Note

The default URL class behavior differs from the URL Spec documented above.

A new spec-compliant implementation of the URL class can be enabled using the `url_standard` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/).

---

## Compression Streams

The `CompressionStream` and `DecompressionStream` classes support the deflate, deflate-raw and gzip compression methods.

[Refer to the MDN documentation for more information ↗](https://developer.mozilla.org/en-US/docs/Web/API/Compression%5FStreams%5FAPI)

---

## URLPattern API

The `URLPattern` API provides a mechanism for matching URLs based on a convenient pattern syntax.

[Refer to the MDN documentation for more information ↗](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern).

---

## `Intl`

The `Intl` API allows you to format dates, times, numbers, and more to the format that is used by a provided locale (language and region).

[Refer to the MDN documentation for more information ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Intl).

---

## `navigator.userAgent`

When the [global\_navigator](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-navigator) compatibility flag is set, the [navigator.userAgent ↗](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) property is available with the value `'Cloudflare-Workers'`. This can be used, for example, to reliably determine that code is running within the Workers environment.

## Unhandled promise rejections

The [unhandledrejection ↗](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection%5Fevent) event is emitted by the global scope when a JavaScript promise is rejected without a rejection handler attached.

The [rejectionhandled ↗](https://developer.mozilla.org/en-US/docs/Web/API/Window/rejectionhandled%5Fevent) event is emitted by the global scope when a JavaScript promise rejection is handled late (after a rejection handler is attached to the promise after an `unhandledrejection` event has already been emitted).

worker.js

```

addEventListener("unhandledrejection", (event) => {

  console.log(event.promise); // The promise that was rejected.

  console.log(event.reason); // The value or Error with which the promise was rejected.

});


addEventListener("rejectionhandled", (event) => {

  console.log(event.promise); // The promise that was rejected.

  console.log(event.reason); // The value or Error with which the promise was rejected.

});


```

---

## `navigator.sendBeacon(url[, data])`

When the [global\_navigator](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-navigator) compatibility flag is set, the [navigator.sendBeacon(...) ↗](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) API is available to send an HTTP `POST` request containing a small amount of data to a web server. This API is intended as a means of transmitting analytics or diagnostics information asynchronously on a best-effort basis.

For example, you can replace:

JavaScript

```

const promise = fetch("https://example.com", {

  method: "POST",

  body: "hello world",

});

ctx.waitUntil(promise);


```

with `navigator.sendBeacon(...)`:

JavaScript

```

navigator.sendBeacon("https://example.com", "hello world");


```

## The Web File System Access API

When the `enable_web_file_system` compatibility flag is set, Workers supports the [Web File System Access API ↗](https://developer.mozilla.org/en-US/docs/Web/API/File%5FSystem%5FAccess%5FAPI), which allows you to read and write files and directories to a virtual file system within the Worker environment. This API provides access to the same in-memory virtual file system as the [node:fs module](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/) but does not require Node.js compatibility to be enabled.

JavaScript

```

const root = await navigator.storage.getDirectory();


export default {

  async fetch(request) {

    const fileHandle = await root.getFileHandle("hello.txt", { create: true });

    const writable = await fileHandle.createWritable();

    await writable.write("Hello, world!");

    await writable.close();


    const file = await fileHandle.getFile();

    const contents = await file.text();


    return new Response(contents, { status: 200 });

  },

};


```

Please refer to the [MDN documentation ↗](https://developer.mozilla.org/en-US/docs/Web/API/File%5FSystem%5FAccess%5FAPI) for more information on using this API, and to the [node:fs documentation](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/) for details on the virtual file system structure and limitations.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/web-standards/#page","headline":"JavaScript and web standards · Cloudflare Workers docs","description":"Standardized APIs for use by Workers running on Cloudflare's global network.","url":"https://developers.cloudflare.com/workers/runtime-apis/web-standards/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/web-standards/","name":"Web standards"}}]}
```
