---
title: Rust
description: Write Workers in 100% Rust using the [`workers-rs` crate](https://github.com/cloudflare/workers-rs)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rust

Cloudflare Workers provides support for Rust via the [workers-rs crate ↗](https://github.com/cloudflare/workers-rs), which makes [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis) and [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to developer platform products, such as [Workers KV](https://developers.cloudflare.com/kv/concepts/how-kv-works/), [R2](https://developers.cloudflare.com/r2/), and [Queues](https://developers.cloudflare.com/queues/), available directly from your Rust code.

By following this guide, you will learn how to build a Worker entirely in the Rust programming language.

## Prerequisites

Before starting this guide, make sure you have:

* A recent version of [Rust ↗](https://rustup.rs/)
* [npm ↗](https://docs.npmjs.com/getting-started)
* The Rust `wasm32-unknown-unknown` toolchain:

Terminal window

```

rustup target add wasm32-unknown-unknown


```

* And `cargo-generate` sub-command by running:

Terminal window

```

cargo install cargo-generate


```

## 1\. Create a new project with Wrangler

Open a terminal window, and run the following command to generate a Worker project template in Rust:

Terminal window

```

cargo generate cloudflare/workers-rs


```

Your project will be created in a new directory that you named, in which you will find the following files and folders:

* `Cargo.toml` \- The standard project configuration file for Rust's [Cargo ↗](https://doc.rust-lang.org/cargo/) package manager. The template pre-populates some best-practice settings for building for Wasm on Workers.
* `wrangler.toml` \- Wrangler configuration, pre-populated with a custom build command to invoke `worker-build` (Refer to [Wrangler Bundling](https://developers.cloudflare.com/workers/languages/rust/#bundling-worker-build)).
* `src` \- Rust source directory, pre-populated with Hello World Worker.

## 2\. Develop locally

After you have created your first Worker, run the [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) command to start a local server for developing your Worker. This will allow you to test your Worker in development.

Terminal window

```

npx wrangler dev


```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

Note

If you have issues with this step or you do not have access to a browser interface, refer to the [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) documentation for more information.

Go to [http://localhost:8787 ↗](http://localhost:8787) to review your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3\. Write your Worker code

With your new project generated, write your Worker code. Find the entrypoint to your Worker in `src/lib.rs`:

```

use worker::*;


#[event(fetch)]

async fn main(req: Request, env: Env, ctx: Context) -> Result<Response> {

    Response::ok("Hello, World!")

}


```

Note

There is some counterintuitive behavior going on here:

1. `workers-rs` provides an `event` macro which expects a handler function signature identical to those seen in JavaScript Workers.
2. `async` is not generally supported by Wasm, but you are able to use `async` in a `workers-rs` project (refer to [async](https://developers.cloudflare.com/workers/languages/rust/#async-wasm-bindgen-futures)).

### Related runtime APIs

`workers-rs` provides a runtime API which closely matches Worker's JavaScript API, and enables integration with Worker's platform features. For detailed documentation of the API, refer to [docs.rs/worker ↗](https://docs.rs/worker/latest/worker/).

#### `event` macro

This macro allows you to define entrypoints to your Worker. The `event` macro supports the following events:

* `fetch` \- Invoked by an incoming HTTP request.
* `scheduled` \- Invoked by [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/).
* `queue` \- Invoked by incoming message batches from [Queues](https://developers.cloudflare.com/queues/) (Requires `queue` feature in `Cargo.toml`, refer to the [workers-rs GitHub repository and queues feature flag ↗](https://github.com/cloudflare/workers-rs#queues)).
* `start` \- Invoked when the Worker is first launched (such as, to install panic hooks).

#### `fetch` parameters

The `fetch` handler provides three arguments which match the JavaScript API:

1. **[Request ↗](https://docs.rs/worker/latest/worker/struct.Request.html)**

An object representing the incoming request. This includes methods for accessing headers, method, path, Cloudflare properties, and body (with support for asynchronous streaming and JSON deserialization with [Serde ↗](https://serde.rs/)).

1. **[Env ↗](https://docs.rs/worker/latest/worker/struct.Env.html)**

Provides access to Worker [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

* [Secret ↗](https://docs.rs/worker/latest/worker/struct.Secret.html) \- Secret value configured in Cloudflare dashboard or using `wrangler secret put`.
* [Var ↗](https://docs.rs/worker/latest/worker/type.Var.html) \- Environment variable defined in `wrangler.toml`.
* [KvStore ↗](https://docs.rs/worker/latest/worker/kv/struct.KvStore.html) \- Workers [KV](https://developers.cloudflare.com/kv/api/) namespace binding.
* [ObjectNamespace ↗](https://docs.rs/worker/latest/worker/durable/struct.ObjectNamespace.html) \- [Durable Object](https://developers.cloudflare.com/durable-objects/) binding.
* [Fetcher ↗](https://docs.rs/worker/latest/worker/struct.Fetcher.html) \- [Service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) to another Worker.
* [Bucket ↗](https://docs.rs/worker/latest/worker/struct.Bucket.html) \- [R2](https://developers.cloudflare.com/r2/) Bucket binding.
* [D1Database ↗](https://docs.rs/worker/latest/worker/d1/struct.D1Database.html) \- [D1](https://developers.cloudflare.com/d1/) database binding.
* [Queue ↗](https://docs.rs/worker/latest/worker/struct.Queue.html) \- [Queues](https://developers.cloudflare.com/queues/) producer binding.
* [Ai ↗](https://docs.rs/worker/latest/worker/struct.Ai.html) \- [Workers AI](https://developers.cloudflare.com/workers-ai/) binding.
* [Hyperdrive ↗](https://docs.rs/worker/latest/worker/struct.Hyperdrive.html) \- [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) binding.
* [AnalyticsEngineDataset ↗](https://docs.rs/worker/latest/worker/struct.AnalyticsEngineDataset.html) \- [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) binding.
* [DynamicDispatcher ↗](https://docs.rs/worker/latest/worker/struct.DynamicDispatcher.html) \- [Dynamic Dispatch](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/) binding.
* [SecretStore ↗](https://docs.rs/worker/latest/worker/struct.SecretStore.html) \- [Secrets Store](https://developers.cloudflare.com/secrets-store/) binding.
* [RateLimiter ↗](https://docs.rs/worker/latest/worker/struct.RateLimiter.html) \- [Rate Limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) binding.
1. **[Context ↗](https://docs.rs/worker/latest/worker/struct.Context.html)**

Provides access to [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) (deferred asynchronous tasks) and [passThroughOnException](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception) (fail open) functionality.

#### [Response ↗](https://docs.rs/worker/latest/worker/struct.Response.html)

The `fetch` handler expects a [Response ↗](https://docs.rs/worker/latest/worker/struct.Response.html) return type, which includes support for streaming responses to the client asynchronously. This is also the return type of any subrequests made from your Worker. There are methods for accessing status code and headers, as well as streaming the body asynchronously or deserializing from JSON using [Serde ↗](https://serde.rs/).

#### `Router`

Implements convenient [routing API ↗](https://docs.rs/worker/latest/worker/struct.Router.html) to serve multiple paths from one Worker. Refer to the [Router example in the worker-rs GitHub repository ↗](https://github.com/cloudflare/workers-rs#or-use-the-router).

## 4\. Deploy your Worker project

With your project configured, you can now deploy your Worker, to a `*.workers.dev` subdomain, or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the deployment process to set one up.

Terminal window

```

npx wrangler deploy


```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

Note

When pushing to your `*.workers.dev` subdomain for the first time, you may see [523 errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/) while DNS is propagating. These errors should resolve themselves after a minute or so.

After completing these steps, you will have a basic Rust-based Worker deployed. From here, you can add create dependencies and write code in Rust to implement your Worker application. If you would like to know more about the inner workings of how Rust compiled to Wasm is supported by Workers, the next section outlines the libraries and tools involved.

## How this deployment works

Wasm Workers are invoked from a JavaScript entrypoint script which is created automatically for you when using `workers-rs`.

### JavaScript Plumbing (`wasm-bindgen`)

To access platform features such as bindings, Wasm Workers must be able to access methods from the JavaScript runtime API.

This interoperability is achieved using [wasm-bindgen ↗](https://wasm-bindgen.github.io/wasm-bindgen/), which provides the glue code needed to import runtime APIs to, and export event handlers from, the Wasm module. `wasm-bindgen` also provides [js-sys ↗](https://docs.rs/js-sys/latest/js%5Fsys/), which implements types for interacting with JavaScript objects. In practice, this is an implementation detail, as `workers-rs`'s API handles conversion to and from JavaScript objects, and interaction with imported JavaScript runtime APIs for you.

Note

If you are using `wasm-bindgen` without `workers-rs` / `worker-build`, then you will need to patch the JavaScript that it emits. This is because when you import a `wasm` file in Workers, you get a `WebAssembly.Module` instead of a `WebAssembly.Instance` for performance and security reasons.

To patch the JavaScript that `wasm-bindgen` emits:

1. Run `wasm-pack build --target bundler` as you normally would.
2. Patch the JavaScript file that it produces (the following code block assumes the file is called `mywasmlib.js`):

JavaScript

```

import * as imports from "./mywasmlib_bg.js";


// switch between both syntax for node and for workerd

import wkmod from "./mywasmlib_bg.wasm";

import * as nodemod from "./mywasmlib_bg.wasm";

if (typeof process !== "undefined" && process.release.name === "node") {

  imports.__wbg_set_wasm(nodemod);

} else {

  const instance = new WebAssembly.Instance(wkmod, {

    "./mywasmlib_bg.js": imports,

  });

  imports.__wbg_set_wasm(instance.exports);

}


export * from "./mywasmlib_bg.js";


```

1. In your Worker entrypoint, import the function and use it directly:

JavaScript

```

import { myFunction } from "path/to/mylib.js";


```

### Async (`wasm-bindgen-futures`)

[wasm-bindgen-futures ↗](https://wasm-bindgen.github.io/wasm-bindgen/api/wasm%5Fbindgen%5Ffutures/) (part of the `wasm-bindgen` project) provides interoperability between Rust Futures and JavaScript Promises. `workers-rs` invokes the entire event handler function using `spawn_local`, meaning that you can program using async Rust, which is turned into a single JavaScript Promise and run on the JavaScript event loop. Calls to imported JavaScript runtime APIs are automatically converted to Rust Futures that can be invoked from async Rust functions.

### Bundling (`worker-build`)

To run the resulting Wasm binary on Workers, `workers-rs` includes a build tool called [worker-build ↗](https://github.com/cloudflare/workers-rs/tree/main/worker-build) which:

1. Creates a JavaScript entrypoint script that properly invokes the module using `wasm-bindgen`'s JavaScript API.
2. Invokes `web-pack` to minify and bundle the JavaScript code.
3. Outputs a directory structure that Wrangler can use to bundle and deploy the final Worker.

`worker-build` is invoked by default in the template project using a custom build command specified in the `wrangler.toml` file.

### Binary Size (`wasm-opt`)

Unoptimized Rust Wasm binaries can be large and may exceed Worker bundle size limits or experience long startup times. The template project pre-configures several useful size optimizations in your `Cargo.toml` file:

TOML

```

[profile.release]

lto = true

strip = true

codegen-units = 1


```

Finally, `worker-bundle` automatically invokes [wasm-opt ↗](https://github.com/brson/wasm-opt-rs) to further optimize binary size before upload.

## Related resources

* [Rust Wasm Book ↗](https://rustwasm.github.io/docs/book/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/rust/#page","headline":"Cloudflare Workers — Rust language support · Cloudflare Workers docs","description":"Write Workers in 100% Rust using the workers-rs crate","url":"https://developers.cloudflare.com/workers/languages/rust/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/rust/","name":"Rust"}}]}
```
