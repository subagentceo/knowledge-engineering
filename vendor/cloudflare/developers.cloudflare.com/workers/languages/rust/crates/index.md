---
title: Supported crates
description: Popular Rust crates confirmed to compile to WebAssembly and run on Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported crates

## Background

Learn about popular Rust crates which have been confirmed to work on Workers when using [workers-rs ↗](https://github.com/cloudflare/workers-rs) (or in some cases just `wasm-bindgen`), to write Workers in WebAssembly. Each Rust crate example includes any custom configuration that is required.

This is not an exhaustive list, many Rust crates can be compiled to the [wasm32-unknown-unknown ↗](https://doc.rust-lang.org/rustc/platform-support/wasm64-unknown-unknown.html) target that is supported by Workers. In some cases, this may require disabling default features or enabling a Wasm-specific feature. It is important to consider the addition of new dependencies, as this can significantly increase the [size](https://developers.cloudflare.com/workers/platform/limits/#worker-size) of your Worker.

## `time`

Many crates which have been made Wasm-friendly, will use the `time` crate instead of `std::time`. For the `time` crate to work in Wasm, the `wasm-bindgen` feature must be enabled to obtain timing information from JavaScript.

## `tracing`

Tracing can be enabled by using the `tracing-web` crate and the `time` feature for `tracing-subscriber`. Due to [timing limitations](https://developers.cloudflare.com/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading) on Workers, spans will have identical start and end times unless they encompass I/O.

[Refer to the tracing example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/tracing) for more information.

## `reqwest`

The [reqwest library ↗](https://docs.rs/reqwest/latest/reqwest/) can be compiled to Wasm, and hooks into the JavaScript `fetch` API automatically using `wasm-bindgen`.

## `tokio-postgres`

`tokio-postgres` can be compiled to Wasm. It must be configured to use a `Socket` from `workers-rs`:

[Refer to the tokio-postgres example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/tokio-postgres) for more information.

## `hyper`

The `hyper` crate contains two HTTP clients, the lower-level `conn` module and the higher-level `Client`. The `conn` module can be used with Workers `Socket`, however `Client` requires timing dependencies which are not yet Wasm friendly.

[Refer to the hyper example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/hyper) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/rust/crates/#page","headline":"Supported crates · Cloudflare Workers docs","description":"Popular Rust crates confirmed to compile to WebAssembly and run on Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/languages/rust/crates/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/rust/","name":"Rust"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/rust/crates/","name":"Supported crates"}}]}
```
