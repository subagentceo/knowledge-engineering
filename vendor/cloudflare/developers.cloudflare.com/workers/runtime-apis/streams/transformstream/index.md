---
title: TransformStream
description: Use the TransformStream API in Workers to pipe data between readable and writable streams.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TransformStream

## Background

A transform stream consists of a pair of streams: a writable stream, known as its writable side, and a readable stream, known as its readable side. Writes to the writable side result in new data being made available for reading from the readable side.

Workers currently only implements an identity transform stream, a type of transform stream which forwards all chunks written to its writable side to its readable side, without any changes.

---

## Constructor

JavaScript

```

let { readable, writable } = new TransformStream();


```

* `TransformStream()` TransformStream  
   * Returns a new identity transform stream.

## Properties

* `readable` ReadableStream  
   * An instance of a `ReadableStream`.
* `writable` WritableStream  
   * An instance of a `WritableStream`.

---

## `IdentityTransformStream`

The current implementation of `TransformStream` in the Workers platform is not current compliant with the [Streams Standard ↗](https://streams.spec.whatwg.org/#transform-stream) and we will soon be making changes to the implementation to make it conform with the specification. In preparation for doing so, we have introduced the `IdentityTransformStream` class that implements behavior identical to the current `TransformStream` class. This type of stream forwards all chunks of byte data (in the form of `TypedArray`s) written to its writable side to its readable side, without any changes.

The `IdentityTransformStream` readable side supports [bring your own buffer (BYOB) reads ↗](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamBYOBReader).

### Constructor

JavaScript

```

let { readable, writable } = new IdentityTransformStream();


```

* `IdentityTransformStream()` IdentityTransformStream  
   * Returns a new identity transform stream.

### Properties

* `readable` ReadableStream  
   * An instance of a `ReadableStream`.
* `writable` WritableStream  
   * An instance of a `WritableStream`.

---

## `FixedLengthStream`

The `FixedLengthStream` is a specialization of `IdentityTransformStream` that limits the total number of bytes that the stream will passthrough. It is useful primarily because, when using `FixedLengthStream` to produce either a `Response` or `Request`, the fixed length of the stream will be used as the `Content-Length` header value as opposed to use chunked encoding when using any other type of stream. An error will occur if too many, or too few bytes are written through the stream.

### Constructor

JavaScript

```

let { readable, writable } = new FixedLengthStream(1000);


```

* `FixedLengthStream(length)` FixedLengthStream  
   * Returns a new identity transform stream.  
   * `length` maybe a `number` or `bigint` with a maximum value of `2^53 - 1`.

### Properties

* `readable` ReadableStream  
   * An instance of a `ReadableStream`.
* `writable` WritableStream  
   * An instance of a `WritableStream`.

---

## Related resources

* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [Transform Streams in the WHATWG Streams API specification ↗](https://streams.spec.whatwg.org/#transform-stream)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/#page","headline":"TransformStream · Cloudflare Workers docs","description":"Use the TransformStream API in Workers to pipe data between readable and writable streams.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/streams/","name":"Streams"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/streams/transformstream/","name":"TransformStream"}}]}
```
