---
title: Streams
description: A web standard API that allows JavaScript to programmatically access and process streams of data.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Streams

The [Streams API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Streams%5FAPI) is a web standard API that allows JavaScript to programmatically access and process streams of data.

* [ ReadableStream ](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/)
* [ ReadableStream BYOBReader ](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/)
* [ ReadableStream DefaultReader ](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreamdefaultreader/)
* [ TransformStream ](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/)
* [ WritableStream ](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/)
* [ WritableStream DefaultWriter ](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestreamdefaultwriter/)

Use the Streams API to avoid buffering large requests or responses in memory. This enables you to parse extremely large request or response bodies within a Worker's 128 MB memory limit. This is faster than buffering the entire payload into memory, as your Worker can start processing data incrementally, and allows your Worker to handle multi-gigabyte payloads or files within its memory limits.

Workers do not need to prepare an entire response body before returning a `Response`. You can use a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/) to stream a response body after sending the response status line and headers.

Note

By default, Cloudflare Workers is capable of streaming responses using the [Streams APIs ↗](https://developer.mozilla.org/en-US/docs/Web/API/Streams%5FAPI). To maintain the streaming behavior, you should only modify the response body using the methods in the Streams APIs.

If your Worker only forwards subrequest responses to the client verbatim without reading their body text, then its body handling is already optimal and you do not have to use these APIs.

The worker can create a `Response` object using a `ReadableStream` as the body. Any data provided through the`ReadableStream` will be streamed to the client as it becomes available.

* [  Module Worker ](#tab-panel-12065)
* [  Service Worker ](#tab-panel-12066)
* [  Python ](#tab-panel-12067)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Fetch from origin server.

    const response = await fetch(request);


    // ... and deliver our Response while that’s running.

    return new Response(response.body, response);

  },

};


```

Service Workers are deprecated

Service Workers are deprecated, but still supported. We recommend using [Module Workers](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) instead. New features may not be supported for Service Workers.

JavaScript

```

addEventListener("fetch", (event) => {

  event.respondWith(fetchAndStream(event.request));

});


async function fetchAndStream(request) {

  // Fetch from origin server.

  const response = await fetch(request);


  // ... and deliver our Response while that’s running.

  return new Response(readable.body, response);

}


```

Python

```

from workers import WorkerEntrypoint, Response, fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Fetch from origin server.

        response = await fetch(request)


        # Stream the response body to the client.

        return Response(response.body, headers=response.headers)


```

A [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) and the [ReadableStream.pipeTo()](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/#methods) method can be used to modify the response body as it is being streamed:

* [  Module Worker ](#tab-panel-12068)
* [  Service Worker ](#tab-panel-12069)
* [  Python ](#tab-panel-12070)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Fetch from origin server.

    const response = await fetch(request);


    const { readable, writable } = new TransformStream({

      transform(chunk, controller) {

        controller.enqueue(modifyChunkSomehow(chunk));

      },

    });


    // Start pumping the body. NOTE: No await!

    response.body.pipeTo(writable);


    // ... and deliver our Response while that’s running.

    return new Response(readable, response);

  },

};


```

Service Workers are deprecated

Service Workers are deprecated, but still supported. We recommend using [Module Workers](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) instead. New features may not be supported for Service Workers.

JavaScript

```

addEventListener("fetch", (event) => {

  event.respondWith(fetchAndStream(event.request));

});


async function fetchAndStream(request) {

  // Fetch from origin server.

  const response = await fetch(request);


  const { readable, writable } = new TransformStream({

    transform(chunk, controller) {

      controller.enqueue(modifyChunkSomehow(chunk));

    },

  });


  // Start pumping the body. NOTE: No await!

  response.body.pipeTo(writable);


  // ... and deliver our Response while that’s running.

  return new Response(readable, response);

}


```

Python

```

from workers import WorkerEntrypoint, Response

from js import ReadableStream, TextEncoder

from pyodide.ffi import create_proxy, to_js

import asyncio


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        enc = TextEncoder.new()


        async def start(controller):

            for i in range(5):

                controller.enqueue(enc.encode(f"chunk {i}\n"))

                await asyncio.sleep(0.1)

            controller.close()


        stream = ReadableStream.new(

            to_js({"start": create_proxy(start)})

        )

        return Response(stream, headers={"Content-Type": "text/plain"})


```

This example calls `response.body.pipeTo(writable)` but does not `await` it. This is so it does not block the forward progress of the remainder of the `fetchAndStream()` function. It continues to run asynchronously until the response is complete or the client disconnects.

The runtime can continue running a function (`response.body.pipeTo(writable)`) after a response is returned to the client. This example pumps the subrequest response body to the final response body. However, you can use more complicated logic, such as adding a prefix or a suffix to the body or to process it somehow.

---

## Common issues

Warning

The Streams API is only available inside of the [Request context](https://developers.cloudflare.com/workers/runtime-apis/request/), inside the `fetch` event listener callback.

---

## Related resources

* [Stream large JSON](https://developers.cloudflare.com/workers/examples/streaming-json/) \- Parse and transform large JSON request and response bodies
* [MDN's Streams API documentation ↗](https://developer.mozilla.org/en-US/docs/Web/API/Streams%5FAPI)
* [Streams API spec ↗](https://streams.spec.whatwg.org/)
* Write your Worker code in [ES modules syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) for an optimized experience.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/#page","headline":"Streams - Runtime APIs · Cloudflare Workers docs","description":"A web standard API that allows JavaScript to programmatically access and process streams of data.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/streams/","name":"Streams"}}]}
```
