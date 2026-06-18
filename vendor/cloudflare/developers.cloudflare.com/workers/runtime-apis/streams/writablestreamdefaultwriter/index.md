---
title: WritableStream DefaultWriter
description: Use WritableStreamDefaultWriter in Workers to write data directly to a WritableStream.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WritableStream DefaultWriter

## Background

A writer is used when you want to write directly to a [WritableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/), rather than piping data to it from a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/). For example:

JavaScript

```

function writeArrayToStream(array, writableStream) {

  const writer = writableStream.getWriter();

  array.forEach(chunk => writer.write(chunk).catch(() => {}));


  return writer.close();

}


writeArrayToStream([1, 2, 3, 4, 5], writableStream)

  .then(() => console.log('All done!'))

  .catch(e => console.error('Error with the stream: ' + e));


```

## Properties

* `writer.desiredSize` int  
   * The size needed to fill the stream’s internal queue, as an integer. Always returns 1, 0 (if the stream is closed), or `null` (if the stream has errors).
* `writer.closed` Promise<void>  
   * A promise that indicates if the writer is closed. The promise is fulfilled when the writer stream is closed and rejected if there is an error in the stream.

## Methods

* `abort(reasonstringoptional)` : Promise<void>  
   * Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/), then its abort algorithm causes the transform’s readable side to become errored with `reason`.  
Warning  
Any data not yet written is lost upon abort.
* `close()` : Promise<void>  
   * Attempts to close the writer. Remaining writes finish processing before the writer is closed. This method returns a promise fulfilled with `undefined` if the writer successfully closes and processes the remaining writes, or rejected on any error.
* `releaseLock()` : void  
   * Releases the writer’s lock on the stream. Once released, the writer is no longer active. You can call this method before all pending `write(chunk)` calls are resolved. This allows you to queue a `write` operation, release the lock, and begin piping into the writable stream from another source, as shown in the example below.

JavaScript

```

let writer = writable.getWriter();

// Write a preamble.

writer.write(new TextEncoder().encode('foo bar'));

// While that’s still writing, pipe the rest of the body from somewhere else.

writer.releaseLock();

await someResponse.body.pipeTo(writable);


```

* `write(chunkany)` : Promise<void>  
   * Writes a chunk of data to the writer and returns a promise that resolves if the operation succeeds.  
   * The underlying stream may accept fewer kinds of type than `any`, it will throw an exception when encountering an unexpected type.

---

## Related resources

* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [Writable streams in the WHATWG Streams API specification ↗](https://streams.spec.whatwg.org/#ws-model)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/writablestreamdefaultwriter/#page","headline":"WritableStreamDefaultWriter · Cloudflare Workers docs","description":"Use WritableStreamDefaultWriter in Workers to write data directly to a WritableStream.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/writablestreamdefaultwriter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/streams/","name":"Streams"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/streams/writablestreamdefaultwriter/","name":"WritableStream DefaultWriter"}}]}
```
