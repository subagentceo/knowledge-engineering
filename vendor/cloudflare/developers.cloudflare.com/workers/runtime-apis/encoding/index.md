---
title: Encoding
description: Takes a stream of code points as input and emits a stream of bytes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Encoding

## TextEncoder

### Background

The `TextEncoder` takes a stream of code points as input and emits a stream of bytes. Encoding types passed to the constructor are ignored and a UTF-8 `TextEncoder` is created.

[TextEncoder() ↗](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder) returns a newly constructed `TextEncoder` that generates a byte stream with UTF-8 encoding. `TextEncoder` takes no parameters and throws no exceptions.

### Constructor

JavaScript

```

let encoder = new TextEncoder();


```

### Properties

* `encoder.encoding` DOMString read-only  
   * The name of the encoder as a string describing the method the `TextEncoder` uses (always `utf-8`).

### Methods

* `encode(inputUSVString)` : Uint8Array  
   * Encodes a string input.

---

## TextDecoder

### Background

The `TextDecoder` interface represents a UTF-8 decoder. Decoders take a stream of bytes as input and emit a stream of code points.

[TextDecoder() ↗](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder) returns a newly constructed `TextDecoder` that generates a code-point stream.

### Constructor

JavaScript

```

let decoder = new TextDecoder();


```

### Properties

* `decoder.encoding` DOMString read-only  
   * The name of the decoder that describes the method the `TextDecoder` uses.
* `decoder.fatal` boolean read-only  
   * Indicates if the error mode is fatal.
* `decoder.ignoreBOM` boolean read-only  
   * Indicates if the byte-order marker is ignored.

### Methods

* `decode()` : DOMString  
   * Decodes using the method specified in the `TextDecoder` object. Learn more at [MDN’s TextDecoder documentation ↗](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/encoding/#page","headline":"Encoding · Cloudflare Workers docs","description":"Takes a stream of code points as input and emits a stream of bytes.","url":"https://developers.cloudflare.com/workers/runtime-apis/encoding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/encoding/","name":"Encoding"}}]}
```
