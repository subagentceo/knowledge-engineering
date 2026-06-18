---
title: WebAssembly (Wasm)
description: Execute code written in a language other than JavaScript or write an entire Cloudflare Worker in Rust.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WebAssembly (Wasm)

[WebAssembly ↗](https://webassembly.org/) (abbreviated Wasm) allows you to compile languages like [Rust](https://developers.cloudflare.com/workers/languages/rust/), Go, or C to a binary format that can run in a wide variety of environments, including [web browsers ↗](https://developer.mozilla.org/en-US/docs/WebAssembly#browser%5Fcompatibility), Cloudflare Workers, and other WebAssembly runtimes.

You can use WebAssembly to:

* Execute code written in a language other than JavaScript, via `WebAssembly.instantiate()`.  
Note  
`WebAssembly.instantiate()` only supports pre-compiled modules as documented in the [web-standards documentation](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#javascript-standards).
* Write an entire Cloudflare Worker in Rust, using bindings that make Workers' JavaScript APIs available directly from your Rust code.

Most programming languages can be compiled to Wasm, although support varies across languages and compilers. Guides are available for the following languages:

* [ Wasm in JavaScript ](https://developers.cloudflare.com/workers/runtime-apis/webassembly/javascript/)

## Supported proposals

WebAssembly is a rapidly evolving set of standards, with [many proposed APIs ↗](https://webassembly.org/roadmap/) which are in various stages of development. In general, Workers supports the same set of features that are available in Google Chrome.

### SIMD

SIMD is supported on Workers. For more information on using SIMD in WebAssembly, refer to [Fast, parallel applications with WebAssembly SIMD ↗](https://v8.dev/features/simd).

### Threading

Threading is not possible in Workers. Each Worker runs in a single thread, and the [Web Worker ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI) API is not supported.

## Binary size

Compiling to WebAssembly often requires including additional runtime dependencies. As a result, Workers that use WebAssembly are typically larger than an equivalent Worker written in JavaScript. The larger your Worker is, the longer it may take your Worker to start. Refer to [Worker startup time ↗](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time) for more information. We recommend using tools like [wasm-opt ↗](https://github.com/brson/wasm-opt-rs) to optimize the size of your Wasm binary.

## WebAssembly System Interface (WASI)

The [WebAssembly System Interface ↗](https://wasi.dev/) (abbreviated WASI) is a modular system interface for WebAssembly that standardizes a set of underlying system calls for networking, file system access, and more. Applications can depend on the WebAssembly System Interface to behave identically across host environments and operating systems.

WASI is an earlier and more rapidly evolving set of standards than Wasm. WASI support is experimental on Cloudflare Workers, with only some syscalls implemented. Refer to our [open source implementation of WASI ↗](https://github.com/cloudflare/workers-wasi), and [blog post about WASI on Workers ↗](https://blog.cloudflare.com/announcing-wasi-on-workers/) demonstrating its use.

### Resources on WebAssembly

* [Serverless Rust with Cloudflare Workers ↗](https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/)
* [WebAssembly on Cloudflare Workers ↗](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/webassembly/#page","headline":"WebAssembly (Wasm) · Cloudflare Workers docs","description":"Execute code written in a language other than JavaScript or write an entire Cloudflare Worker in Rust.","url":"https://developers.cloudflare.com/workers/runtime-apis/webassembly/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/webassembly/","name":"WebAssembly (Wasm)"}}]}
```
