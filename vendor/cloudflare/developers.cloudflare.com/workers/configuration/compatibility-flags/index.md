---
title: Compatibility flags
description: Opt into a specific features of the Workers runtime for your Workers project.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Compatibility flags

Compatibility flags enable specific features. They can be useful if you want to help the Workers team test upcoming changes that are not yet enabled by default, or if you need to hold back a change that your code depends on but still want to apply other compatibility changes.

Compatibility flags will often have a date in which they are enabled by default, and so, by specifying a [compatibility\_date](https://developers.cloudflare.com/workers/configuration/compatibility-dates) for your Worker, you can quickly enable all of these various compatibility flags up to, and including, that date.

## Setting compatibility flags

You may provide a list of `compatibility_flags`, which enable or disable specific changes.

#### Via Wrangler

Compatibility flags can be set in a Worker's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

This example enables the specific flag `formdata_parser_supports_files`, which is described [below](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#formdata-parsing-supports-file). As of the specified date, `2021-09-14`, this particular flag was not yet enabled by default, but, by specifying it in `compatibility_flags`, we can enable it anyway. `compatibility_flags` can also be used to disable changes that became the default in the past.

* [  wrangler.jsonc ](#tab-panel-11436)
* [  wrangler.toml ](#tab-panel-11437)

JSONC

```

{

  // Opt into backwards-incompatible changes through September 14, 2021.

  "compatibility_date": "2021-09-14",

  // Also opt into an upcoming fix to the FormData API.

  "compatibility_flags": [

    "formdata_parser_supports_files"

  ]

}


```

TOML

```

compatibility_date = "2021-09-14"

compatibility_flags = [ "formdata_parser_supports_files" ]


```

#### Via the Cloudflare Dashboard

Compatibility flags can be updated in the Workers settings on the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

#### Via the Cloudflare API

Compatibility flags can be set when uploading a Worker using the [Workers Script API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/) or [Workers Versions API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/create/) in the request body's `metadata` field.

## Node.js compatibility flag

Note

[The nodejs\_compat flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) also enables `nodejs_compat_v2` as long as your compatibility date is 2024-09-23 or later. The v2 flag improves runtime Node.js compatibility by bundling additional polyfills and globals into your Worker. However, this improvement increases bundle size.

If your compatibility date is 2024-09-22 or before and you want to enable v2, add the `nodejs_compat_v2` in addition to the `nodejs_compat` flag. If your compatibility date is after 2024-09-23, but you want to disable v2 to avoid increasing your bundle size, add the `no_nodejs_compat_v2` in addition to the `nodejs_compat flag`.

A [growing subset](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) of Node.js APIs are available directly as [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs), with no need to add polyfills to your own code. To enable these APIs in your Worker, add the `nodejs_compat` compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-11440)
* [  wrangler.toml ](#tab-panel-11441)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


```

* [  wrangler.jsonc ](#tab-panel-11434)
* [  wrangler.toml ](#tab-panel-11435)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


```

As additional Node.js APIs are added, they will be made available under the `nodejs_compat` compatibility flag. Unlike most other compatibility flags, we do not expect the `nodejs_compat` to become active by default at a future date.

The Node.js `AsyncLocalStorage` API is a particularly useful feature for Workers. To enable only the `AsyncLocalStorage` API, use the `nodejs_als` compatibility flag.

* [  wrangler.jsonc ](#tab-panel-11438)
* [  wrangler.toml ](#tab-panel-11439)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_als"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_als" ]


```

## Flags history

Newest flags are listed first.

### Remove Node.js 24.x end-of-life APIs

| **Default as of**   | 2028-04-30                       |
| ------------------- | -------------------------------- |
| **Flag to enable**  | remove\_nodejs\_compat\_eol\_v24 |
| **Flag to disable** | add\_nodejs\_compat\_eol\_v24    |

When `remove_nodejs_compat_eol_v24` is enabled, APIs that reached end-of-life in Node.js 24.x are removed.

This flag is automatically enabled when the `remove_nodejs_compat_eol` flag is enabled after 2028-04-30.

### Remove Node.js 22.x end-of-life APIs

| **Default as of**   | 2027-04-30                       |
| ------------------- | -------------------------------- |
| **Flag to enable**  | remove\_nodejs\_compat\_eol\_v22 |
| **Flag to disable** | add\_nodejs\_compat\_eol\_v22    |

When `remove_nodejs_compat_eol_v22` is enabled, APIs that reached end-of-life in Node.js 22.x are removed.

This flag is automatically enabled when the `remove_nodejs_compat_eol` flag is enabled after 2027-04-30.

### Throw On Not Implements TLS Options

| **Default as of**   | 2026-06-16                                    |
| ------------------- | --------------------------------------------- |
| **Flag to enable**  | throw\_on\_not\_implemented\_tls\_options     |
| **Flag to disable** | no\_throw\_on\_not\_implemented\_tls\_options |

When enabled, passing unsupported TLS options (e.g. `checkServerIdentity`) to `tls.connect()` or `new TLSSocket()` throws `ERR_OPTION_NOT_IMPLEMENTED` instead of silently ignoring them

### Process .pth files for Python Workers

| **Default as of**   | 2026-05-26                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | python\_process\_pth\_files          |
| **Flag to disable** | disable\_python\_process\_pth\_files |

When the `python_process_pth_files` flag is set, Python Workers process `.pth`files in the `python_modules/` directory during startup by calling[site.addsitedir() ↗](https://docs.python.org/3/library/site.html#site.addsitedir)on it. This lets packages extend `sys.path` declaratively, for example to add subdirectories or register import hooks. Without this flag, `.pth` files in`python_modules/` are ignored.

This flag also moves the top-level entropy context managers required by some packages out of the runtime and into[workers-py ↗](https://github.com/cloudflare/workers-py).

You must use `workers-py` version `1.1.3` or later when this flag is set.

### Node.js diagnostics\_channel hasSubscribers getter

| **Default as of**   | 2026-05-19                                         |
| ------------------- | -------------------------------------------------- |
| **Flag to enable**  | diagnostics\_channel\_has\_subscribers\_getter     |
| **Flag to disable** | no\_diagnostics\_channel\_has\_subscribers\_getter |

When `diagnostics_channel_has_subscribers_getter` is enabled, `Channel.hasSubscribers` and `TracingChannel.hasSubscribers` from `node:diagnostics_channel` become read-only getter properties that evaluate directly to a boolean, matching Node.js behavior.

Previously, `hasSubscribers` was registered as a method, requiring users to call `ch.hasSubscribers()` with parentheses. With this flag enabled, `ch.hasSubscribers` returns a boolean without a function call, consistent with the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/diagnostics%5Fchannel.html#channelhassubscribers).

This flag requires [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) to be enabled.

### Workflows preserve `NonRetryableError` message

| **Default as of**   | 2026-05-14                                          |
| ------------------- | --------------------------------------------------- |
| **Flag to enable**  | workflows\_preserve\_non\_retryable\_error\_message |
| **Flag to disable** | workflows\_replace\_non\_retryable\_error\_message  |

When enabled, if a [Workflow](https://developers.cloudflare.com/workflows/) step throws a [NonRetryableError](https://developers.cloudflare.com/workflows/build/workers-api/#nonretryableerror), the error `message` and `name` properties are preserved on the thrown exception instead of being replaced with a generic termination string.

Previously, throwing a `NonRetryableError` with a custom message would result in the original error message being lost and replaced with `"The execution of the Workflow instance was terminated, as a step threw an NonRetryableError and it was not handled"`:

JavaScript

```

import { WorkflowEntrypoint, NonRetryableError } from "cloudflare:workers";


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    await step.do("my-step", async () => {

      throw new NonRetryableError("custom error message");

      // Without this flag: error.message === "The execution of the Workflow instance was terminated, as a step threw an NonRetryableError and it was not handled"

      // With this flag: error.message === "custom error message"

    });

  }

}


```

With the `workflows_preserve_non_retryable_error_message` flag enabled, the original error message and name are preserved, making it easier to debug and handle specific error cases in your Workflow code.

### Enhanced error serialization

| **Default as of**   | 2026-04-21                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | enhanced\_error\_serialization |
| **Flag to disable** | legacy\_error\_serialization   |

When `enhanced_error_serialization` is enabled, errors serialized using `structuredClone()` or V8 serialization support more error types and include own properties on the error object.

Note that when enabled, deserialization of errors will not preserve the original stack trace by default.

Previously, only basic `Error` types were serialized, and own properties added to error objects were lost during serialization.

### Use an isolated PID namespace for containers

| **Default as of**   | 2026-04-01                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | containers\_pid\_namespace     |
| **Flag to disable** | no\_containers\_pid\_namespace |

When `containers_pid_namespace` is set, containers will use an isolated PID namespace. The `ENTRYPOINT` of your container will have PID 1.

When unset, the container shares the PID namespace with the virtual machine (VM) containing the container. The `ENTRYPOINT` of your container will _not_ have PID 1 and other processes running on the VM (that are not part of your container) will be visible.

### Spec-compliant TextEncoderStream/TextDecoderStream backpressure

| **Default as of**   | 2026-03-24                                         |
| ------------------- | -------------------------------------------------- |
| **Flag to enable**  | encoder\_stream\_spec\_compliant\_backpressure     |
| **Flag to disable** | no\_encoder\_stream\_spec\_compliant\_backpressure |

When `encoder_stream_spec_compliant_backpressure` is enabled, `TextEncoderStream` and `TextDecoderStream` use a readable-side high water mark of 0, as specified by the [WHATWG Encoding Standard ↗](https://encoding.spec.whatwg.org/).

With a high water mark of 0, the readable side starts with backpressure applied, so writes correctly block until a reader pulls. Previously, the high water mark defaulted to 1, which caused `pull()` to fire at startup, clearing backpressure before any write occurred.

### Spec-compliant WritableStream writer behavior

| **Default as of**   | 2026-03-24                                    |
| ------------------- | --------------------------------------------- |
| **Flag to enable**  | writable\_stream\_spec\_compliant\_writer     |
| **Flag to disable** | no\_writable\_stream\_spec\_compliant\_writer |

When `writable_stream_spec_compliant_writer` is enabled, several `WritableStream` spec compliance issues around writer lock and release behavior are fixed to match the [WHATWG Streams Standard ↗](https://streams.spec.whatwg.org/).

### Enable global Performance classes

| **Default as of**   | 2026-03-17                            |
| ------------------- | ------------------------------------- |
| **Flag to enable**  | enable\_global\_performance\_classes  |
| **Flag to disable** | disable\_global\_performance\_classes |

When `enable_global_performance_classes` is enabled, the following classes are available on the global scope: `PerformanceEntry`, `PerformanceMark`, `PerformanceMeasure`, `PerformanceResourceTiming`, `PerformanceObserver`, and `PerformanceObserverEntryList`.

These classes are also implicitly enabled by the `enable_nodejs_perf_hooks_module` flag.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

### Enable `node:child_process` module

| **Default as of**   | 2026-03-17                              |
| ------------------- | --------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_child\_process\_module  |
| **Flag to disable** | disable\_nodejs\_child\_process\_module |

The `enable_nodejs_child_process_module` flag enables the `node:child_process` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/child%5Fprocess.html) for more details about the `node:child_process` API.

### Enable `node:perf_hooks` module

| **Default as of**   | 2026-03-17                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | enable\_nodejs\_perf\_hooks\_module  |
| **Flag to disable** | disable\_nodejs\_perf\_hooks\_module |

The `enable_nodejs_perf_hooks_module` flag enables the `node:perf_hooks` module in Workers. This flag also implicitly enables global Performance classes (`PerformanceEntry`, `PerformanceMark`, `PerformanceMeasure`, `PerformanceResourceTiming`, `PerformanceObserver`, and `PerformanceObserverEntryList`).

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/perf%5Fhooks.html) for more details about the `node:perf_hooks` API.

### Enable `node:readline` module

| **Default as of**   | 2026-03-17                        |
| ------------------- | --------------------------------- |
| **Flag to enable**  | enable\_nodejs\_readline\_module  |
| **Flag to disable** | disable\_nodejs\_readline\_module |

The `enable_nodejs_readline_module` flag enables the `node:readline` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/readline.html) for more details about the `node:readline` API.

### Enable `node:repl` module

| **Default as of**   | 2026-03-17                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | enable\_nodejs\_repl\_module  |
| **Flag to disable** | disable\_nodejs\_repl\_module |

The `enable_nodejs_repl_module` flag enables the `node:repl` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/repl.html) for more details about the `node:repl` API.

### Enable `node:tty` module

| **Default as of**   | 2026-03-17                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | enable\_nodejs\_tty\_module  |
| **Flag to disable** | disable\_nodejs\_tty\_module |

The `enable_nodejs_tty_module` flag enables the `node:tty` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/tty.html) for more details about the `node:tty` API.

### Enable `node:v8` module

| **Default as of**   | 2026-03-17                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | enable\_nodejs\_v8\_module  |
| **Flag to disable** | disable\_nodejs\_v8\_module |

The `enable_nodejs_v8_module` flag enables the `node:v8` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/v8.html) for more details about the `node:v8` API.

### Enable `node:worker_threads` module

| **Default as of**   | 2026-03-17                               |
| ------------------- | ---------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_worker\_threads\_module  |
| **Flag to disable** | disable\_nodejs\_worker\_threads\_module |

The `enable_nodejs_worker_threads_module` flag enables the `node:worker_threads` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/worker%5Fthreads.html) for more details about the `node:worker_threads` API.

### WebSocket standard binary type

| **Default as of**   | 2026-03-17                            |
| ------------------- | ------------------------------------- |
| **Flag to enable**  | websocket\_standard\_binary\_type     |
| **Flag to disable** | no\_websocket\_standard\_binary\_type |

This flag controls the default value of the [binaryType](https://developers.cloudflare.com/workers/runtime-apis/websockets/#binarytype) property on `WebSocket`, which in turn controls how binary frames are delivered to the `message` event. With the flag active, `binaryType` defaults to `"blob"` and binary frames arrive as [Blob ↗](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects, matching the [WebSocket specification ↗](https://websockets.spec.whatwg.org/) and standard browser behavior. Without the flag, `binaryType` defaults to `"arraybuffer"` and binary frames arrive as [ArrayBuffer ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/ArrayBuffer), matching the runtime's historical behavior.

The `binaryType` property itself is available on every `WebSocket` regardless of the flag. Assigning a value overrides the default for that specific WebSocket:

JavaScript

```

const resp = await fetch("https://example.com", {

  headers: { Upgrade: "websocket" },

});

const ws = resp.webSocket;


// Opt back into ArrayBuffer delivery before calling accept().

ws.binaryType = "arraybuffer";

ws.accept();


ws.addEventListener("message", (event) => {

  // event.data is an ArrayBuffer for binary frames.

});


```

If you are not ready to migrate and want to keep `ArrayBuffer` as the default for every WebSocket in your Worker, add the `no_websocket_standard_binary_type` flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

This flag has no effect on the Durable Object hibernatable WebSocket [webSocketMessage](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) handler, which always receives binary data as `ArrayBuffer`.

### Expose error codes in Queue operations

| **Default as of**   | 2026-03-12                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | queue\_expose\_error\_codes     |
| **Flag to disable** | no\_queue\_expose\_error\_codes |

When `queue_expose_error_codes` is enabled, [Queue](https://developers.cloudflare.com/queues/) operations will include detailed error information, including error codes and causes, making it easier to handle and diagnose queue-related errors programmatically.

### WebSocket auto-reply to close

| **Default as of**   | 2026-04-07                            |
| ------------------- | ------------------------------------- |
| **Flag to enable**  | web\_socket\_auto\_reply\_to\_close   |
| **Flag to disable** | web\_socket\_manual\_reply\_to\_close |

When a server sends a WebSocket Close frame, the Workers runtime now automatically sends a reciprocal Close frame and transitions `readyState` to `CLOSED` before firing the `close` event. This matches the [WebSocket spec ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close%5Fevent) and browser behavior.

Previously, receiving a server-initiated Close frame left the WebSocket in `CLOSING` and required the application to call `close()` itself. With this flag active, you no longer need to call `close()` in your `close` event handler. The runtime handles the close handshake automatically.

JavaScript

```

const [client, server] = Object.values(new WebSocketPair());

server.accept();


server.addEventListener("close", (event) => {

  // readyState is already CLOSED — no need to call server.close().

  console.log(server.readyState); // WebSocket.CLOSED

  console.log(event.code); // 1000

  console.log(event.wasClean); // true

}, { once: true });


```

If you do still call `close()` inside the handler, the call is silently ignored. This means existing code that manually replies to Close frames will not break when you update your compatibility date.

The automatic close behavior can interfere with WebSocket proxying. When a Worker proxies between a client and a backend, the old behavior allowed the Worker to observe a backend Close frame without the runtime tearing down the connection, giving the Worker time to coordinate a clean close on the client side. To support this pattern, the `accept()` method now accepts an option `allowHalfOpen`. Call `ws.accept({ allowHalfOpen: true })` to restore the old half-open behavior regardless of the compatibility flag.

JavaScript

```

const [client, server] = Object.values(new WebSocketPair());


// Opt into half-open mode for proxying

server.accept({ allowHalfOpen: true });


server.addEventListener("close", (event) => {

  // With allowHalfOpen true, readyState is still CLOSING here,

  // giving you time to coordinate the close on the other side.

  console.log(server.readyState); // WebSocket.CLOSING


  // Manually close when ready.

  server.close(1000, "done");

}, { once: true });


```

Note that there is no corresponding option to the `WebSocket` constructor. WebSockets constructed with `new WebSocket` will always auto-reply to closes after this flag takes effect. WebSockets constructed this way are automatically "accepted", so there is no opportunity to pass the option to `accept()`. If you are creating a WebSocket with `new WebSocket`, but you need half-open behavior, you will need to switch to using `fetch()` instead.

JavaScript

```

// This does not allow half-open:

let ws = new WebSocket("wss://example.com");


// But you can do this instead:

let resp = await fetch("https://example.com", {

  headers: { "Upgrade": "websocket" }

});

if (!resp.webSocket) {

  throw new Error("WebSocket handshake not accepted");

}

let ws = resp.webSocket;

ws.accept({ allowHalfOpen: true });


```

For more information, refer to the [WebSocket API documentation](https://developers.cloudflare.com/workers/runtime-apis/websockets/).

### Dedicated CJK TextDecoder implementation

| **Default as of**   | 2026-03-03                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | text\_decoder\_cjk\_decoder          |
| **Flag to disable** | disable\_text\_decoder\_cjk\_decoder |

When `text_decoder_cjk_decoder` is enabled, a dedicated CJK `TextDecoder` implementation is used for CJK encoding overrides and Big5 lead-byte handling, instead of the legacy ICU-only code path. This improves spec compliance for CJK text decoding.

### Defer unhandled rejection processing to after microtask checkpoint

| **Default as of**   | 2026-03-03                                             |
| ------------------- | ------------------------------------------------------ |
| **Flag to enable**  | unhandled\_rejection\_after\_microtask\_checkpoint     |
| **Flag to disable** | no\_unhandled\_rejection\_after\_microtask\_checkpoint |

When `unhandled_rejection_after_microtask_checkpoint` is enabled, `unhandledrejection` event processing is deferred until the microtask checkpoint completes. This avoids misfires on multi-tick promise chains where a rejection handler is added in a later microtask.

Previously, unhandled rejection processing could fire prematurely before all microtasks in the current checkpoint had been processed, leading to false `unhandledrejection` events for promises that were actually handled.

### Enforce WebSocket close reason byte limit

| **Default as of**   | 2026-03-03                                |
| ------------------- | ----------------------------------------- |
| **Flag to enable**  | websocket\_close\_reason\_byte\_limit     |
| **Flag to disable** | no\_websocket\_close\_reason\_byte\_limit |

When `websocket_close_reason_byte_limit` is enabled, `WebSocket.close()` throws a `SyntaxError` `DOMException` if the `reason` string exceeds 123 bytes when UTF-8 encoded, as required by the [WHATWG WebSocket spec ↗](https://websockets.spec.whatwg.org/) and [RFC 6455 Section 5.5 ↗](https://www.rfc-editor.org/rfc/rfc6455#section-5.5).

Previously, Workers allowed arbitrarily long close reasons without validation.

### Durable Object `deleteAll()` deletes alarms

| **Default as of**   | 2026-02-24                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | delete\_all\_deletes\_alarm   |
| **Flag to disable** | delete\_all\_preserves\_alarm |

With the `delete_all_deletes_alarm` flag set, calling `deleteAll()` on a Durable Object's storage will delete any active alarm in addition to all stored data. Previously, `deleteAll()` only deleted user-stored data, and alarms required a separate `deleteAlarm()` call to remove. This change applies to both KV-backed and SQLite-backed Durable Objects.

### TextDecoder replaces lone surrogates

| **Default as of**   | 2026-02-24                                  |
| ------------------- | ------------------------------------------- |
| **Flag to enable**  | text\_decoder\_replace\_surrogates          |
| **Flag to disable** | disable\_text\_decoder\_replace\_surrogates |

When `text_decoder_replace_surrogates` is enabled, the UTF-16le `TextDecoder` will replace lone surrogates with U+FFFD (the Unicode replacement character) as required by the [Encoding Standard ↗](https://encoding.spec.whatwg.org/). Previously, lone surrogates were passed through unchanged, producing non-well-formed strings.

### Support iterables as fetch Request/Response body

| **Default as of**   | 2026-02-19                         |
| ------------------- | ---------------------------------- |
| **Flag to enable**  | fetch\_iterable\_type\_support     |
| **Flag to disable** | no\_fetch\_iterable\_type\_support |

When `fetch_iterable_type_support` is enabled, sync and async iterables can be passed as the body of a `fetch()` `Request` or `Response` and will be properly iterated over.

Previously, sync iterables like Arrays would be accepted but stringified (e.g., `[1, 2, 3]` would become `"1,2,3"`), and async iterables would be treated as regular objects and not iterated at all. With this flag enabled, iterables are properly consumed as streaming body content.

Note that Arrays will now be treated as iterables instead of being stringified, which is a breaking change for code that relied on the previous behavior.

### Enable Node.js-compatible global timers

| **Default as of**   | 2026-02-10                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | enable\_nodejs\_global\_timers |
| **Flag to disable** | no\_nodejs\_global\_timers     |

When `enable_nodejs_global_timers` is enabled, `setTimeout`, `setInterval`, `clearTimeout`, and `clearInterval` return Node.js-compatible `Timeout` objects with methods like `refresh()`, `ref()`, `unref()`, and `hasRef()`, matching the behavior of `node:timers`.

This flag requires [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) to be enabled and is automatically enabled for Workers using a compatibility date of 2026-02-10 or later when `nodejs_compat` is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/timers.html) for more details about the timer APIs.

### Enable `node:dgram` module

| **Default as of**   | 2026-01-29                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | enable\_nodejs\_dgram\_module  |
| **Flag to disable** | disable\_nodejs\_dgram\_module |

The `enable_nodejs_dgram_module` flag enables the `node:dgram` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/dgram.html) for more details about the `node:dgram` API.

### Enable `node:inspector` module

| **Default as of**   | 2026-01-29                         |
| ------------------- | ---------------------------------- |
| **Flag to enable**  | enable\_nodejs\_inspector\_module  |
| **Flag to disable** | disable\_nodejs\_inspector\_module |

The `enable_nodejs_inspector_module` flag enables the `node:inspector` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/inspector.html) for more details about the `node:inspector` API.

### Enable `node:sqlite` module

| **Default as of**   | 2026-01-29                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | enable\_nodejs\_sqlite\_module  |
| **Flag to disable** | disable\_nodejs\_sqlite\_module |

The `enable_nodejs_sqlite_module` flag enables the `node:sqlite` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/sqlite.html) for more details about the `node:sqlite` API.

### Enable `node:_stream_wrap` module

| **Default as of**   | 2026-01-29                            |
| ------------------- | ------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_stream\_wrap\_module  |
| **Flag to disable** | disable\_nodejs\_stream\_wrap\_module |

The `enable_nodejs_stream_wrap_module` flag enables the `node:_stream_wrap` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2026-01-29 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

### `require()` returns default export

| **Default as of**   | 2026-01-22                        |
| ------------------- | --------------------------------- |
| **Flag to enable**  | require\_returns\_default\_export |
| **Flag to disable** | require\_returns\_namespace       |

When `require_returns_default_export` is enabled, `require()` will return the default export of a module if it exists. If the default export does not exist, it falls back to returning a mutable copy of the module namespace object.

This matches the behavior that Node.js uses for `require(esm)`, where the default export is returned when available. This flag is useful for frameworks like Next.js that expect to be able to patch module exports.

Previously, `require()` always returned the module namespace object (an object like `{default: module.exports}`).

### Duplicate stubs in RPC params instead of transferring ownership

| **Default as of**   | 2026-01-20                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | rpc\_params\_dup\_stubs      |
| **Flag to disable** | rpc\_params\_transfer\_stubs |

Changes the ownership semantics of RPC stubs embedded in the parameters of an RPC call, fixing compatibility issues with [Cap'n Web ↗](https://github.com/cloudflare/capnweb).

When the [Workers RPC system](https://developers.cloudflare.com/workers/runtime-apis/rpc/) was first introduced, RPC stubs that were embedded in the params or return value of some other call had their ownership transferred. That is, the original stub was implicitly disposed, with a duplicate stub being delivered to the destination.

This turns out to compose poorly with another rule: in the callee, any stubs received in the params of a call are automatically disposed when the call returns. These two rules combine to mean that if you proxy a call -- i.e. the implementation of an RPC just makes another RPC call passing along the same params -- then any stubs in the params get disposed twice. Worse, if the eventual recipient of the stub wants to keep a duplicate past the end of the call, this may not work because the copy of the stub in the proxy layer gets disposed anyway, breaking the connection.

For this reason, the pure-JS implementation of Cap'n Web switched to saying that stubs in params do NOT transfer ownership -- they are simply duplicated. This compat flag fixes the Workers Runtime built-in RPC to match Cap'n Web behavior.

One common use case that this fixes is clients that subscribe to callbacks from a Durable Object via Cap'n Web. In this use case, the client app passes a callback function over a Cap'n Web WebSocket to a stateless Worker, which in turn forwards the stub over Workers RPC to a Durable Object. The Durable Object stores a [dup()](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/#the-dup-method) of the stub in order to call it back later to notify the client of events. Unfortunately, before this flag, this didn't work: as soon as the subscribe function itself returned, the Cap'n Web stub in the stateless worker would be disposed (because it was a parameter to a call that returned, and it was not `dup()`ed within the context of the stateless worker). Hence, when the Durable Object later tried to call the subscription callback, it would receive "Error: RPC stub used after being disposed", despite the fact that it had carefully `dup()`ed the stub at its end.

### Fetch iterable body respects toString/toPrimitive overrides

| **Default as of**   | 2026-01-15                                               |
| ------------------- | -------------------------------------------------------- |
| **Flag to enable**  | fetch\_iterable\_type\_support\_override\_adjustment     |
| **Flag to disable** | no\_fetch\_iterable\_type\_support\_override\_adjustment |

When `fetch_iterable_type_support_override_adjustment` is enabled, objects passed as the body of a `fetch()` `Request` or `Response` that are sync iterable but also have a custom `toString` or `Symbol.toPrimitive` method will not be treated as iterables. Instead, they will fall through to being handled as stringified objects, matching the previous behavior for such objects.

This flag refines the behavior introduced by the `fetch_iterable_type_support` flag and is automatically enabled when `fetch_iterable_type_support` is enabled after 2026-01-15.

### Strip UTF-8 BOM in stream `readAllText()`

| **Default as of**   | 2026-01-13                               |
| ------------------- | ---------------------------------------- |
| **Flag to enable**  | strip\_bom\_in\_read\_all\_text          |
| **Flag to disable** | do\_not\_strip\_bom\_in\_read\_all\_text |

When `strip_bom_in_read_all_text` is enabled, the `readAllText()` method on streams will strip a leading UTF-8 Byte Order Mark (BOM) if present, matching the expected behavior per web platform standards.

Previously, the BOM was included in the returned string, which could cause unexpected behavior when parsing text content.

### Enable `node:cluster` module

| **Default as of**   | 2025-12-04                       |
| ------------------- | -------------------------------- |
| **Flag to enable**  | enable\_nodejs\_cluster\_module  |
| **Flag to disable** | disable\_nodejs\_cluster\_module |

The `enable_nodejs_cluster_module` flag enables the `node:cluster` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/cluster.html) for more details about the `node:cluster` API.

### Enable `node:domain` module

| **Default as of**   | 2025-12-04                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | enable\_nodejs\_domain\_module  |
| **Flag to disable** | disable\_nodejs\_domain\_module |

The `enable_nodejs_domain_module` flag enables the `node:domain` module stub in Workers. Note that `node:domain` is deprecated in Node.js itself.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/domain.html) for more details about the `node:domain` API.

### Enable `node:punycode` module

| **Default as of**   | 2025-12-04                        |
| ------------------- | --------------------------------- |
| **Flag to enable**  | enable\_nodejs\_punycode\_module  |
| **Flag to disable** | disable\_nodejs\_punycode\_module |

The `enable_nodejs_punycode_module` flag enables the `node:punycode` module in Workers. Note that `node:punycode` is deprecated in Node.js itself.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/punycode.html) for more details about the `node:punycode` API.

### Enable `node:trace_events` module

| **Default as of**   | 2025-12-04                             |
| ------------------- | -------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_trace\_events\_module  |
| **Flag to disable** | disable\_nodejs\_trace\_events\_module |

The `enable_nodejs_trace_events_module` flag enables the `node:trace_events` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/tracing.html) for more details about the `node:trace_events` API.

### Enable `node:wasi` module

| **Default as of**   | 2025-12-04                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | enable\_nodejs\_wasi\_module  |
| **Flag to disable** | disable\_nodejs\_wasi\_module |

The `enable_nodejs_wasi_module` flag enables the `node:wasi` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-12-04 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/wasi.html) for more details about the `node:wasi` API.

### Enable fast JSG struct optimization

| **Default as of**   | 2025-12-03                 |
| ------------------- | -------------------------- |
| **Flag to enable**  | enable\_fast\_jsg\_struct  |
| **Flag to disable** | disable\_fast\_jsg\_struct |

When `enable_fast_jsg_struct` is enabled, internal struct types used by Workers runtime APIs are constructed using a more efficient pattern that reduces object creation time.

However, optional fields will be explicitly set to `undefined` rather than being omitted from the object entirely, which is an observable behavior change. Code that checks for the presence of a property using `"key" in obj` or `Object.hasOwn(obj, "key")` may behave differently, since optional fields that were previously absent will now be present with a value of `undefined`.

To check for a value, prefer `obj.key !== undefined` over `"key" in obj`.

### Enable ctx.exports

| **Default as of**   | 2025-11-17            |
| ------------------- | --------------------- |
| **Flag to enable**  | enable\_ctx\_exports  |
| **Flag to disable** | disable\_ctx\_exports |

This flag enables [the ctx.exports API](https://developers.cloudflare.com/workers/runtime-apis/context/#exports), which contains automatically-configured loopback bindings for your Worker's top-level exports. This allows you to skip configuring explicit bindings for your `WorkerEntrypoint`s and Durable Object namespaces defined in the same Worker.

### Automatic tracing

| **Flag to enable** | enable\_workers\_observability\_tracing |
| ------------------ | --------------------------------------- |

This flag will enable [Workers Tracing](https://developers.cloudflare.com/workers/observability/traces/) by default if you have the following configured in your Wrangler configuration file:

```

{

  "observability": {

    "enabled": true

  }

}


```

You can also explictly turn on automatic tracing without the flag and with older compatibility dates by setting the following:

```

{

  "observability": {

    "traces": {

      "enabled": true

    }

  }

}


```

### Enable `node:vm` module

| **Default as of**   | 2025-10-01                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | enable\_nodejs\_vm\_module  |
| **Flag to disable** | disable\_nodejs\_vm\_module |

The `enable_nodejs_vm_module` flag enables the `node:vm` module stub in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-10-01 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/vm.html) for more details about the `node:vm` API.

### Enable `node:console` module

| **Default as of**   | 2025-09-21                       |
| ------------------- | -------------------------------- |
| **Flag to enable**  | enable\_nodejs\_console\_module  |
| **Flag to disable** | disable\_nodejs\_console\_module |

The `enable_nodejs_console_module` flag enables the `node:console` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-21 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/console.html) for more details about the `node:console` API.

### Enable workflow entrypoint validation

| **Default as of**   | 2025-09-20                              |
| ------------------- | --------------------------------------- |
| **Flag to enable**  | enable\_validate\_workflow\_entrypoint  |
| **Flag to disable** | disable\_validate\_workflow\_entrypoint |

When `enable_validate_workflow_entrypoint` is enabled, additional validation checks are performed to ensure that [Workflows](https://developers.cloudflare.com/workflows/) are defined and used correctly. This helps catch configuration errors at upload time rather than at runtime.

### Enable `node:fs` module

| **Default as of**   | 2025-09-15                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | enable\_nodejs\_fs\_module  |
| **Flag to disable** | disable\_nodejs\_fs\_module |

The `enable_nodejs_fs_module` flag enables the `node:fs` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-15 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/fs.html) for more details about the `node:fs` API.

### Enable `node:os` module

| **Default as of**   | 2025-09-15                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | enable\_nodejs\_os\_module  |
| **Flag to disable** | disable\_nodejs\_os\_module |

The `enable_nodejs_os_module` flag enables the `node:os` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-15 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/os.html) for more details about the `node:os` API.

### Enable `process` v2 implementation

| **Default as of**   | 2025-09-15                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | enable\_nodejs\_process\_v2  |
| **Flag to disable** | disable\_nodejs\_process\_v2 |

When enabled after 2025-09-15, the `enable_nodejs_process_v2` flag along with the [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) compat flag ensures a comprehensive Node.js-compatible `process` implementation, updating from the previous minimal process implementation that only provided the limited `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform` and `features` properties.

To continue using the previous minimal implementation after the compat date, set the `disable_nodejs_process_v2` flag instead.

Most Node.js-supported process properties are implemented where possible, with undefined exports for unsupported features. See the [process documentation](https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/) for Workers-specific implementation details.

### Enable Node.js HTTP server modules

| **Default as of**   | 2025-09-01                             |
| ------------------- | -------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_http\_server\_modules  |
| **Flag to disable** | disable\_nodejs\_http\_server\_modules |

The `enable_nodejs_http_server_modules` flag enables the availability of Node.js HTTP server modules such as `node:_http_server` in Workers.

The `disable_nodejs_http_server_modules` flag disables the availability of these server modules.

This enables compatibility with Node.js libraries and existing code that use the standard Node.js HTTP server APIs. The available functionality includes:

* `http.createServer()` for creating HTTP servers
* `http.Server` class for server instances
* `http.ServerResponse` for handling server responses

This flag must be used in combination with the `enable_nodejs_http_modules` flag to enable full features of `node:http`.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when `nodejs_compat` is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/http.html) for more details about the Node.js HTTP APIs.

### Enable `node:http2` module

| **Default as of**   | 2025-09-01                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | enable\_nodejs\_http2\_module  |
| **Flag to disable** | disable\_nodejs\_http2\_module |

The `enable_nodejs_http2_module` flag enables the `node:http2` module stubs in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/http2.html) for more details about the `node:http2` API.

### Remove end-of-life Node.js APIs

| **Default as of**   | 2025-09-01                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | remove\_nodejs\_compat\_eol |
| **Flag to disable** | add\_nodejs\_compat\_eol    |

When `remove_nodejs_compat_eol` is enabled, APIs that have reached End-of-Life in Node.js will be removed for Workers. When disabled, the APIs are present but might still be non-functional stubs.

This flag is a roll-up flag. As additional APIs reach EOL in specific Node.js versions, new version-specific compat flags are added (such as `remove_nodejs_compat_eol_v22`, `remove_nodejs_compat_eol_v23`, and `remove_nodejs_compat_eol_v24`) that are implied by this flag after their respective dates.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

### Remove Node.js 23.x end-of-life APIs

| **Default as of**   | 2025-09-01                       |
| ------------------- | -------------------------------- |
| **Flag to enable**  | remove\_nodejs\_compat\_eol\_v23 |
| **Flag to disable** | add\_nodejs\_compat\_eol\_v23    |

When `remove_nodejs_compat_eol_v23` is enabled, APIs that reached end-of-life in Node.js 23.x (EOL June 2025) are removed.

This flag is automatically enabled when the `remove_nodejs_compat_eol_v24` flag is enabled after 2025-09-01.

### Strip Authorization header on cross-origin redirects

| **Default as of**   | 2025-09-01                                         |
| ------------------- | -------------------------------------------------- |
| **Flag to enable**  | strip\_authorization\_on\_cross\_origin\_redirect  |
| **Flag to disable** | retain\_authorization\_on\_cross\_origin\_redirect |

When `strip_authorization_on_cross_origin_redirect` is enabled, the `Authorization` header is automatically removed when following a redirect to a different origin. This behavior is required by the current [Fetch API specification ↗](https://fetch.spec.whatwg.org/).

This requirement was added to the Fetch spec in 2022, after Cloudflare Workers originally implemented its fetch handling. Workers did not originally implement this requirement, so the new behavior is gated behind a compatibility flag.

The old behavior was not inherently insecure, and could be desirable in some circumstances. For example, if an API that requires authorization wishes to redirect to a new hostname while having the client send along their credentials. Under the new behavior, such a redirect will not include credentials automatically. However, the old behavior could lead to unintentional credential leakage when redirecting to untrusted origins.

To retain the old behavior, set the `retain_authorization_on_cross_origin_redirect` flag.

### Enable availability of `node:http` and `node:https` modules

| **Default as of**   | 2025-08-15                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | enable\_nodejs\_http\_modules  |
| **Flag to disable** | disable\_nodejs\_http\_modules |

The `enable_nodejs_http_modules` flag enables the availability of Node.js`node:http` and `node:https` modules in Workers (client APIS only).

The `disable_nodejs_http_modules` flag disables the availability of these modules.

This enables compatibility with Node.js libraries and existing code that use the standard node:http and node:https APIs for making HTTP requests. The available functionality includes:

* `http.request()` and `https.request()` for making HTTP/HTTPS requests
* `http.get()` and `https.get()` for making GET requests
* Request and response objects with standard Node.js APIs
* Support for standard HTTP methods, headers, and options

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/http.html)for more details about the Node.js APIs.

### Expose global MessageChannel and MessagePort

| **Default as of**   | 2025-08-15                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | expose\_global\_message\_channel     |
| **Flag to disable** | no\_expose\_global\_message\_channel |

When the `expose_global_message_channel` flag is set, Workers will expose the `MessageChannel` and `MessagePort` constructors globally.

When the `no_expose_global_message_channel` flag is set, Workers will not expose these.

### Disable global handlers for Python Workers

| **Default as of**   | 2025-08-14                            |
| ------------------- | ------------------------------------- |
| **Flag to enable**  | python\_no\_global\_handlers          |
| **Flag to disable** | disable\_python\_no\_global\_handlers |

When the `python_no_global_handlers` flag is set, Python Workers will disable the global handlers and enforce their use via default entrypoint classes.

### Enable `cache: no-cache` HTTP standard API

| **Default as of**   | 2025-08-07                 |
| ------------------- | -------------------------- |
| **Flag to enable**  | cache\_no\_cache\_enabled  |
| **Flag to disable** | cache\_no\_cache\_disabled |

When you enable the `cache_no_cache_enabled` compatibility flag, you can specify the `no-cache`value for the `cache` property of the Request interface. When this compatibility flag is not enabled, or `cache_option_disabled` is set, the Workers runtime will throw a `TypeError` saying`Unsupported cache mode: no-cache`.

When this flag is enabled you can instruct Cloudflare to force its cache to revalidate the response from a subrequest you make from your Worker using the [fetch()API](https://developers.cloudflare.com/workers/runtime-apis/fetch/):

When `no-cache` is specified:

* All requests have the headers `Pragma: no-cache` and `Cache-Control: no-cache` are set on them.
* Subrequests to origins not hosted by Cloudflare force Cloudflare's cache to revalidate with the origin.

Revalidating with the origin means that the Worker request will first look for a match in Cloudflare's cache, then:

* If there is a match, a conditional request is sent to the origin, regardless of whether or not the match is fresh or stale. If the resource has not changed, the cached version is returned. If the resource has changed, it will be downloaded from the origin, updated in the cache, and returned.
* If there is no match, Workers will make a standard request to the origin and cache the response.

Examples using `cache: 'no-cache'`:

JavaScript

```

const response = await fetch("https://example.com", { cache: "no-cache" });


```

The cache value can also be set on a `Request` object.

JavaScript

```

const request = new Request("https://example.com", { cache: "no-cache" });

const response = await fetch(request);


```

### Set the `this` value of EventTarget event handlers

| **Default as of**   | 2025-08-01                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | set\_event\_target\_this     |
| **Flag to disable** | no\_set\_event\_target\_this |

When the `set_event_target_this` flag is se, Workers will set the `this` value of event handlers to the `EventTarget` instance that the event is being dispatched on. This is compliant with the specification.

When then `no_set_event_target_this` flag is set, Workers will not set the`this` value of event handlers, and it will be `undefined` instead.

### Set forwardable email full headers

| **Default as of**   | 2025-08-01                               |
| ------------------- | ---------------------------------------- |
| **Flag to enable**  | set\_forwardable\_email\_full\_headers   |
| **Flag to disable** | set\_forwardable\_email\_single\_headers |

The original version of the headers sent to edgeworker were truncated to a single value for specific header names, such as To and Cc. With the`set_forwardable_email_full_headers` flag set, Workers will receive the full header values to the worker script.

### Pedantic Web Platform Tests (WPT) compliance

| **Flag to enable**  | pedantic\_wpt      |
| ------------------- | ------------------ |
| **Flag to disable** | non\_pedantic\_wpt |

The `pedantic_wpt` flag enables strict compliance with Web Platform Tests (WPT) in Workers. Initially this only effects `Event` and `EventTarget` APIs but will be expanded to other APIs in the future. There is no default enable date for this flag.

### Bind AsyncLocalStorage snapshots to the request

| **Default as of**   | 2025-06-16                                     |
| ------------------- | ---------------------------------------------- |
| **Flag to enable**  | bind\_asynclocalstorage\_snapshot\_to\_request |
| **Flag to disable** | do\_not\_bind\_asynclocalstorage\_snapshot\_to |

The AsyncLocalStorage frame can capture values that are bound to the current request context. This is not always in the users control since we use the ALS storage frame to propagate internal trace spans as well as user-provided values. When the `bind_asynclocalstorage_snapshot_to_request`flag is set, the runtime binds the snapshot / bound functions to the current request context and will throw an error if the bound functions are called outside of the request in which they were created.

The `do_not_bind_asynclocalstorage_snapshot_to` flag disables this behavior.

### Throw on unrecognized import assertions

| **Default as of**   | 2025-06-16                                 |
| ------------------- | ------------------------------------------ |
| **Flag to enable**  | throw\_on\_unrecognized\_import\_assertion |
| **Flag to disable** | ignore\_unrecognized\_import\_assertion    |

The `throw_on_unrecognized_import_assertion` flag controls how Workers handle import attributes that are not recognized by the runtime. Previously, Workers would ignore all import attributes, which is not compliant with the specification. Runtimes are expected to throw an error when an import attribute is encountered that is not recognized.

When the `ignore_unrecognized_import_assertion` flag is set, Workers will ignore unrecognized import attributes.

### Enable eval during startup

| **Default as of**   | 2025-06-01                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | allow\_eval\_during\_startup    |
| **Flag to disable** | disallow\_eval\_during\_startup |

When the `allow_eval_during_startup` flag is set, Workers can use `eval()`and `new Function(text)` during the startup phase of a Worker script. This allows for dynamic code execution at the beginning of a Worker lifecycle.

When the `disallow_eval_during_startup` flag is set, using `eval()` or`new Function(text)` during the startup phase will throw an error.

### Enable `Request.signal` for incoming requests

| **Flag to enable**  | enable\_request\_signal  |
| ------------------- | ------------------------ |
| **Flag to disable** | disable\_request\_signal |

When you use the `enable_request_signal` compatibility flag, you can attach an event listener to [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) objects, using the [signal property ↗](https://developer.mozilla.org/en-US/docs/Web/API/Request/signal). This allows you to perform tasks when the request to your Worker is canceled by the client.

### Cache API request `cf` overrides cache rules

| **Default as of**   | 2025-05-19                                           |
| ------------------- | ---------------------------------------------------- |
| **Flag to enable**  | cache\_api\_request\_cf\_overrides\_cache\_rules     |
| **Flag to disable** | no\_cache\_api\_request\_cf\_overrides\_cache\_rules |

When `cache_api_request_cf_overrides_cache_rules` is enabled, cache settings specified in the `cf` object of a request passed to the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) will override cache rules. This applies only to user-owned or grey-clouded sites.

This is the Cache API counterpart to the [request\_cf\_overrides\_cache\_rules](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#fetch-api-request-cf-overrides-cache-rules) flag, which applies to the `fetch()` API.

### Enable `navigator.language`

| **Default as of**   | 2025-05-19                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | enable\_navigator\_language  |
| **Flag to disable** | disable\_navigator\_language |

When the `enable_navigator_language` flag is set, the `navigator.language` property will be available in Workers. For now, the value of `navigator.language` will always be `en`.

When the `disable_navigator_language` flag is set, the `navigator.language` property will not be available.

### Disallowing importable environment

| **Flag to enable**  | disallow\_importable\_env |
| ------------------- | ------------------------- |
| **Flag to disable** | allow\_importable\_env    |

When the `disallow_importable_env` flag is enabled, Workers will not allow importing the environment variables via the `cloudflare:workers` module and will not populate the environment variables in the global `process.env` object when Node.js compatibility is enabled.

There is no default enabled date for this flag.

### Enable `FinalizationRegistry` and `WeakRef`

| **Default as of**   | 2025-05-05         |
| ------------------- | ------------------ |
| **Flag to enable**  | enable\_weak\_ref  |
| **Flag to disable** | disable\_weak\_ref |

Enables the use of [FinalizationRegistry ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/FinalizationRegistry) and [WeakRef ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/WeakRef) built-ins.

* `FinalizationRegistry` allows you to register a cleanup callback that runs after an object has been garbage-collected.
* `WeakRef` creates a weak reference to an object, allowing it to be garbage-collected if no other strong references exist.

Behaviour

`FinalizationRegistry` cleanup callbacks may execute at any point during your request lifecycle, even after your invoked handler has completed (similar to `ctx.waitUntil()`). These callbacks do not have an associated async context. You cannot perform any I/O within them, including emitting events to a tail Worker.

These APIs are fundamentally non-deterministic. The timing and execution of garbage collection are unpredictable, and you **should not rely on them for essential program logic**. Additionally, cleanup callbacks registered with `FinalizationRegistry` may **never be executed**, including but not limited to cases where garbage collection is not triggered, or your Worker gets evicted.

### Passthrough AbortSignal of incoming request to subrequests

| **Flag to enable**  | request\_signal\_passthrough     |
| ------------------- | -------------------------------- |
| **Flag to disable** | no\_request\_signal\_passthrough |

When the `request_signal_passthrough` flag set, the `AbortSignal` of an incoming request will be passed through to subrequests when the request is forwarded to a subrequest using the `fetch()` API.

The the `no_request_signal_passthrough` flag is set, the `AbortSignal` of the incoming request will not be passed through.

### Spec-compliant URLPattern implementation

| **Default as of**   | 2025-05-01           |
| ------------------- | -------------------- |
| **Flag to enable**  | urlpattern\_standard |
| **Flag to disable** | urlpattern\_original |

The original `URLPattern` implementation was not fully compliant with the [WHATWG URLPattern Standard ↗](https://urlpattern.spec.whatwg.org/), leading to a number of issues reported by users.

With `urlpattern_standard` enabled, Workers uses a spec-compliant URLPattern implementation. This is a breaking change from the original behavior, so it is gated behind a compatibility flag.

If you are using `URLPattern` and encounter unexpected behavior changes after updating your compatibility date, you can set `urlpattern_original` to revert to the previous implementation.

### Navigation requests prefer asset serving

| **Default as of**   | 2025-04-01                                  |
| ------------------- | ------------------------------------------- |
| **Flag to enable**  | assets\_navigation\_prefers\_asset\_serving |
| **Flag to disable** | assets\_navigation\_has\_no\_effect         |

For Workers with [static assets](https://developers.cloudflare.com/workers/static-assets/) and this compatibility flag enabled, navigation requests (requests which have a `Sec-Fetch-Mode: navigate` header) will prefer to be served by our asset-serving logic, even when an exact asset match cannot be found. This is particularly useful for applications which operate in either [Single Page Application (SPA) mode](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) or have [custom 404 pages](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/#custom-404-pages), as this now means the fallback pages of `200 /index.html` and `404 /404.html` will be served ahead of invoking a Worker script and will therefore avoid incurring a charge.

Without this flag, the runtime will continue to apply the old behavior of invoking a Worker script (if present) for any requests which do not exactly match a static asset.

When `assets.run_worker_first = true` is set, this compatibility flag has no effect. The `assets.run_worker_first = true` setting ensures the Worker script executes before any asset-serving logic.

### Enable auto-populating `process.env`

| **Default as of**   | 2025-04-01                                      |
| ------------------- | ----------------------------------------------- |
| **Flag to enable**  | nodejs\_compat\_populate\_process\_env          |
| **Flag to disable** | nodejs\_compat\_do\_not\_populate\_process\_env |

When you enable the `nodejs_compat_populate_process_env` compatibility flag and the [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)flag is also enabled, `process.env` will be populated with values from any bindings with text or JSON values. This means that if you have added [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/),[secrets](https://developers.cloudflare.com/workers/configuration/secrets/), or [version metadata](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/)bindings, these values can be accessed on `process.env`.

JavaScript

```

const apiClient = ApiClient.new({ apiKey: process.env.API_KEY });

const LOG_LEVEL = process.env.LOG_LEVEL || "info";


```

This makes accessing these values easier and conforms to common Node.js patterns, which can reduce toil and help with compatibility for existing Node.js libraries.

If users do not wish for these values to be accessible via `process.env`, they can use the`nodejs_compat_do_not_populate_process_env` flag. In this case, `process.env` will still be available, but will not have values automatically added.

If the `disallow_importable_env` compatibility flag is set, the `process.env` will also not be populated.

### Queue consumers don't wait for `ctx.waitUntil()` to resolve

| **Flag to enable** | queue\_consumer\_no\_wait\_for\_wait\_until |
| ------------------ | ------------------------------------------- |

By default, [Queues](https://developers.cloudflare.com/queues/) Consumer Workers acknowledge messages only after promises passed to [ctx.waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context) have resolved. This behavior can cause queue consumers which utilize `ctx.waitUntil()` to process messages slowly. The default behavior is documented in the [Queues Consumer Configuration Guide](https://developers.cloudflare.com/queues/configuration/javascript-apis#consumer).

This Consumer Worker is an example of a Worker which utilizes `ctx.waitUntil()`. Under the default behavior, this consumer Worker will only acknowledge a batch of messages after the sleep function has resolved.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // omitted

  },


  async queue(batch, env, ctx) {

    console.log(`received batch of ${batch.messages.length} messages to queue ${batch.queue}`);

    for (let i = 0; i < batch.messages.length; ++i) {

      console.log(`message #${i}: ${JSON.stringify(batch.messages[i])}`);

    }

    ctx.waitUntil(sleep(30 * 1000));

  }

};


function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));

}


```

If the `queue_consumer_no_wait_for_wait_until` flag is enabled, Queues consumers will no longer wait for promises passed to `ctx.waitUntil()` to resolve before acknowledging messages. This can improve the performance of queue consumers which utilize `ctx.waitUntil()`. With the flag enabled, in the above example, the consumer Worker will acknowledge the batch without waiting for the sleep function to resolve.

Using this flag will not affect the behavior of `ctx.waitUntil()`. `ctx.waitUntil()` will continue to extend the lifetime of your consumer Worker to continue to work even after the batch of messages has been acknowledged.

### Apply TransformStream backpressure fix

| **Default as of**   | 2024-12-16                             |
| ------------------- | -------------------------------------- |
| **Flag to enable**  | fixup-transform-stream-backpressure    |
| **Flag to disable** | original-transform-stream-backpressure |

The original implementation of `TransformStream` included a bug that would cause backpressure signaling to fail after the first write to the transform. Unfortunately, the fix can cause existing code written to address the bug to fail. Therefore, the `fixup-transform-stream-backpressure` compat flag is provided to enable the fix.

The fix is enabled by default with compatibility dates of 2024-12-16 or later.

To restore the original backpressure logic, disable the fix using the`original-transform-stream-backpressure` flag.

### Disable top-level await in require(...)

| **Default as of**   | 2024-12-02                              |
| ------------------- | --------------------------------------- |
| **Flag to enable**  | disable\_top\_level\_await\_in\_require |
| **Flag to disable** | enable\_top\_level\_await\_in\_require  |

Workers implements the ability to use the Node.js style `require(...)` method to import modules in the Worker bundle. Historically, this mechanism allowed required modules to use top-level await. This, however, is not Node.js compatible.

The `disable_top_level_await_in_require` compat flag will cause `require()`to fail if the module uses a top-level await. This flag is default enabled with a compatibility date of 2024-12-02 or later.

To restore the original behavior allowing top-level await, use the`enable_top_level_await_in_require` compatibility flag.

### Enable `cache: no-store` HTTP standard API

| **Default as of**   | 2024-11-11              |
| ------------------- | ----------------------- |
| **Flag to enable**  | cache\_option\_enabled  |
| **Flag to disable** | cache\_option\_disabled |

When you enable the `cache_option_enabled` compatibility flag, you can specify a value for the `cache` property of the Request interface. When this compatibility flag is not enabled, or `cache_option_disabled` is set, the Workers runtime will throw an `Error` saying `The 'cache' field on 'RequestInitializerDict' is not implemented.`

When this flag is enabled you can instruct Cloudflare not to cache the response from a subrequest you make from your Worker using the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/):

The only cache option enabled with `cache_option_enabled` is `'no-store'`. Specifying any other value will cause the Workers runtime to throw a `TypeError` with the message `Unsupported cache mode: <the-mode-you-specified>`.

When `no-store` is specified:

* All requests have the headers `Pragma: no-cache` and `Cache-Control: no-cache` are set on them.
* Subrequests to origins not hosted by Cloudflare bypass Cloudflare's cache.

Examples using `cache: 'no-store'`:

JavaScript

```

const response = await fetch("https://example.com", { cache: "no-store" });


```

The cache value can also be set on a `Request` object.

JavaScript

```

const request = new Request("https://example.com", { cache: "no-store" });

const response = await fetch(request);


```

### Global fetch() strictly public

| **Flag to enable**  | global\_fetch\_strictly\_public |
| ------------------- | ------------------------------- |
| **Flag to disable** | global\_fetch\_private\_origin  |

When the `global_fetch_strictly_public` compatibility flag is enabled, the global [fetch() function](https://developers.cloudflare.com/workers/runtime-apis/fetch/) will strictly route requests as if they were made on the public Internet.

This means requests to a Worker's own zone will loop back to the "front door" of Cloudflare and will be treated like a request from the Internet, possibly even looping back to the same Worker again.

When the `global_fetch_strictly_public` is not enabled, such requests are routed to the zone's origin server, ignoring any Workers mapped to the URL and also bypassing Cloudflare security settings.

### Handle cross-request promise resolution correctly

| **Default as of**   | 2024-10-14                                      |
| ------------------- | ----------------------------------------------- |
| **Flag to enable**  | handle\_cross\_request\_promise\_resolution     |
| **Flag to disable** | no\_handle\_cross\_request\_promise\_resolution |

Historically, it was possible to resolve a promise from an incorrect request context, which could lead to promise continuations being scheduled in the wrong context, causing errors and difficult-to-diagnose bugs.

With `handle_cross_request_promise_resolution` enabled, promise continuations are scheduled to run in the correct request context if it is still alive, or dropped with a warning if the correct context has already ended.

### Upper-case HTTP methods

| **Default as of**   | 2024-10-14                          |
| ------------------- | ----------------------------------- |
| **Flag to enable**  | upper\_case\_all\_http\_methods     |
| **Flag to disable** | no\_upper\_case\_all\_http\_methods |

HTTP methods are expected to be upper-cased. Per the fetch spec, if the method is specified as `get`, `post`, `put`, `delete`, `head`, or `options`, implementations are expected to uppercase the method. All other method names would generally be expected to throw as unrecognized (for example, `patch` would be an error while `PATCH` is accepted). This is a bit restrictive, even if it is in the spec. This flag modifies the behavior to uppercase all methods prior to parsing so that the method is always recognized if it is a known method.

To restore the standard behavior, use the `no_upper_case_all_http_methods`compatibility flag.

### Automatically set the Symbol.toStringTag for Workers API objects

| **Default as of**   | 2024-09-26                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | set\_tostring\_tag          |
| **Flag to disable** | do\_not\_set\_tostring\_tag |

A change was made to set the Symbol.toStringTag on all Workers API objects in order to fix several spec compliance bugs. Unfortunately, this change was more breaking than anticipated. The `do_not_set_tostring_tag` compat flag restores the original behavior with compatibility dates of 2024-09-26 or earlier.

### Enable `node:zlib` module

| **Default as of**   | 2024-09-23       |
| ------------------- | ---------------- |
| **Flag to enable**  | nodejs\_zlib     |
| **Flag to disable** | no\_nodejs\_zlib |

The `nodejs_zlib` flag enables the `node:zlib` module in Workers.

This flag is automatically enabled for Workers using a compatibility date of 2024-09-23 or later when [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/zlib.html) for more details about the `node:zlib` API.

### Allow specifying a custom port when making a subrequest with the fetch() API

| **Default as of**   | 2024-09-02            |
| ------------------- | --------------------- |
| **Flag to enable**  | allow\_custom\_ports  |
| **Flag to disable** | ignore\_custom\_ports |

When this flag is enabled, and you specify a port when making a subrequest with the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/), the port number you specify will be used.

When you make a subrequest to a website that uses Cloudflare ("Orange Clouded") — only [ports supported by Cloudflare's reverse proxy](https://developers.cloudflare.com/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) can be specified. If you attempt to specify an unsupported port, it will be ignored.

When you make a subrequest to a website that does not use Cloudflare ("Grey Clouded") - any port can be specified.

For example:

JavaScript

```

const response = await fetch("https://example.com:8000");


```

With allow\_custom\_ports the above example would fetch `https://example.com:8000` rather than`https://example.com:443`.

Note that creating a WebSocket client with a call to `new WebSocket(url)` will also obey this flag.

### WritableStream abort clears pending write queue

| **Default as of**   | 2024-09-02                                                 |
| ------------------- | ---------------------------------------------------------- |
| **Flag to enable**  | internal\_writable\_stream\_abort\_clears\_queue           |
| **Flag to disable** | internal\_writable\_stream\_abort\_does\_not\_clear\_queue |

When using the original WritableStream implementation ("internal" streams), the `abort()` operation was previously handled lazily, meaning that the queue of pending writes would not be cleared until the next time the queue was processed. This behavior could cause the stream to hang if the consumer stopped consuming.

With `internal_writable_stream_abort_clears_queue` enabled, the queue is cleared immediately upon `abort()`, preventing hangs in cases where the consumer has stopped processing writes.

### Properly extract blob MIME type from `content-type` headers

| **Default as of**   | 2024-06-03                 |
| ------------------- | -------------------------- |
| **Flag to enable**  | blob\_standard\_mime\_type |
| **Flag to disable** | blob\_legacy\_mime\_type   |

When calling `response.blob.type()`, the MIME type will now be properly extracted from `content-type` headers, per the [WHATWG spec ↗](https://fetch.spec.whatwg.org/#concept-header-extract-mime-type).

### Use standard URL parsing in `fetch()`

| **Default as of**   | 2024-06-03           |
| ------------------- | -------------------- |
| **Flag to enable**  | fetch\_standard\_url |
| **Flag to disable** | fetch\_legacy\_url   |

The `fetch_standard_url` flag makes `fetch()` use [WHATWG URL Standard ↗](https://url.spec.whatwg.org/) parsing rules. The original implementation would throw `TypeError: Fetch API cannot load` errors with some URLs where standard parsing does not, for instance with the inclusion of whitespace before the URL. URL errors will now be thrown immediately upon calling `new Request()` with an improper URL. Previously, URL errors were thrown only once `fetch()` was called.

### Returning empty Uint8Array on final BYOB read

| **Default as of**   | 2024-05-13                                |
| ------------------- | ----------------------------------------- |
| **Flag to enable**  | internal\_stream\_byob\_return\_view      |
| **Flag to disable** | internal\_stream\_byob\_return\_undefined |

In the original implementation of BYOB ("Bring your own buffer") `ReadableStreams`, the `read()` method would return `undefined` when the stream was closed and there was no more data to read. This behavior was inconsistent with the standard `ReadableStream` behavior, which returns an empty `Uint8Array` when the stream is closed.

When the `internal_stream_byob_return_view` flag is used, the BYOB `read()` will implement standard behavior.

JavaScript

```

const resp = await fetch('https://example.org');

const reader = resp.body.getReader({ mode: 'byob' });

await result = await reader.read(new Uint8Array(10));


if (result.done) {

  // The result gives us an empty Uint8Array...

  console.log(result.value.byteLength); // 0


  // However, it is backed by the same underlying memory that was passed

  // into the read call.

  console.log(result.value.buffer.byteLength); // 10

}


```

### Brotli Content-Encoding support

| **Default as of**   | 2024-04-29                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | brotli\_content\_encoding     |
| **Flag to disable** | no\_brotli\_content\_encoding |

When the `brotli_content_encoding` compatibility flag is enabled, Workers supports the `br` content encoding and can request and respond with data encoded using the [Brotli ↗](https://developer.mozilla.org/en-US/docs/Glossary/Brotli%5Fcompression) compression algorithm. This reduces the amount of data that needs to be fetched and can be used to pass through the original compressed data to the client. See the Fetch API [documentation](https://developers.cloudflare.com/workers/runtime-apis/fetch/#how-the-accept-encoding-header-is-handled) for details.

### Durable Object stubs and Service Bindings support RPC

| **Default as of**   | 2024-04-03 |
| ------------------- | ---------- |
| **Flag to enable**  | rpc        |
| **Flag to disable** | no\_rpc    |

With this flag on, [Durable Object](https://developers.cloudflare.com/durable-objects/) stubs and [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) support [RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/). This means that these objects now appear as if they define every possible method name. Calling any method name sends an RPC to the remote Durable Object or Worker service.

For most applications, this change will have no impact unless you use it. However, it is possible some existing code will be impacted if it explicitly checks for the existence of method names that were previously not defined on these types. For example, we have seen code in the wild which iterates over [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and tries to auto-detect their types based on what methods they implement. Such code will now see service bindings as implementing every method, so may misinterpret service bindings as being some other type. In the cases we have seen, the impact was benign (nothing actually broke), but out of caution we are guarding this change behind a flag.

### Handling custom thenables

| **Default as of**   | 2024-04-01                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | unwrap\_custom\_thenables     |
| **Flag to disable** | no\_unwrap\_custom\_thenables |

With the `unwrap_custom_thenables` flag set, various Workers APIs that accept promises will also correctly handle custom thenables (objects with a `then` method) that are not native promises, but are intended to be treated as such). For example, the `waitUntil` method of the `ExecutionContext`object will correctly handle custom thenables, allowing them to be used in place of native promises.

JavaScript

```

async fetch(req, env, ctx) {

  ctx.waitUntil({ then(res) {

    // Resolve the thenable after 1 second

    setTimeout(res, 1000);

  } });

  // ...

}


```

### Fetchers no longer have get/put/delete helper methods

| **Default as of**   | 2024-03-26                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | fetcher\_no\_get\_put\_delete  |
| **Flag to disable** | fetcher\_has\_get\_put\_delete |

[Durable Object](https://developers.cloudflare.com/durable-objects/) stubs and [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) both implement a `fetch()` method which behaves similarly to the global `fetch()` method, but requests are instead sent to the destination represented by the object, rather than being routed based on the URL.

Historically, API objects that had such a `fetch()` method also had methods `get()`, `put()`, and `delete()`. These methods were thin wrappers around `fetch()` which would perform the corresponding HTTP method and automatically handle writing/reading the request/response bodies as needed.

These methods were a very early idea from many years ago, but were never actually documented, and therefore rarely (if ever) used. Enabling the `fetcher_no_get_put_delete`, or setting a compatibility date on or after `2024-03-26` disables these methods for your Worker.

This change paves a future path for you to be able to define your own custom methods using these names. Without this change, you would be unable to define your own `get`, `put`, and `delete` methods, since they would conflict with these built-in helper methods.

### Queues send messages in `JSON` format

| **Default as of**   | 2024-03-18                 |
| ------------------- | -------------------------- |
| **Flag to enable**  | queues\_json\_messages     |
| **Flag to disable** | no\_queues\_json\_messages |

With the `queues_json_messages` flag set, Queue bindings will serialize values passed to `send()` or `sendBatch()` into JSON format by default (when no specific `contentType` is provided).

### Suppress global `importScripts()`

| **Default as of**   | 2024-03-04                |
| ------------------- | ------------------------- |
| **Flag to enable**  | no\_global\_importscripts |
| **Flag to disable** | global\_importscripts     |

Suppresses the global `importScripts()` function. This method was included in the Workers global scope but was marked explicitly as non-implemented. However, the presence of the function could cause issues with some libraries. This compatibility flag removes the function from the global scope.

### Node.js AsyncLocalStorage

| **Flag to enable**  | nodejs\_als     |
| ------------------- | --------------- |
| **Flag to disable** | no\_nodejs\_als |

Enables the availability of the Node.js [AsyncLocalStorage ↗](https://nodejs.org/api/async%5Fhooks.html#async%5Fhooks%5Fclass%5Fasynclocalstorage) API in Workers.

### Python Workers

| **Flag to enable** | python\_workers |
| ------------------ | --------------- |

This flag enables first class support for Python. [Python Workers](https://developers.cloudflare.com/workers/languages/python/) implement the majority of Python's [standard library](https://developers.cloudflare.com/workers/languages/python/stdlib), support all [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings), [environment variable](https://developers.cloudflare.com/workers/configuration/environment-variables), and [secrets](https://developers.cloudflare.com/workers/configuration/secrets), and integration with JavaScript objects and functions via a [foreign function interface](https://developers.cloudflare.com/workers/languages/python/ffi).

### WebCrypto preserve publicExponent field

| **Default as of**   | 2023-12-01                             |
| ------------------- | -------------------------------------- |
| **Flag to enable**  | crypto\_preserve\_public\_exponent     |
| **Flag to disable** | no\_crypto\_preserve\_public\_exponent |

In the WebCrypto API, the `publicExponent` field of the algorithm of RSA keys would previously be an `ArrayBuffer`. Using this flag, `publicExponent` is a `Uint8Array` as mandated by the specification.

### `Vectorize` query with metadata optionally returned

| **Default as of**   | 2023-11-08                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | vectorize\_query\_metadata\_optional |
| **Flag to disable** | vectorize\_query\_original           |

A set value on `vectorize_query_metadata_optional` indicates that the Vectorize query operation should accept newer arguments with `returnValues` and `returnMetadata` specified discretely over the older argument `returnVectors`. This also changes the return format. If the vector values have been indicated for return, the return value is now a flattened vector object with `score` attached where it previously contained a nested vector object.

### WebSocket Compression

| **Default as of**   | 2023-08-15                   |
| ------------------- | ---------------------------- |
| **Flag to enable**  | web\_socket\_compression     |
| **Flag to disable** | no\_web\_socket\_compression |

The Workers runtime did not support WebSocket compression when the initial WebSocket implementation was released. Historically, the runtime has stripped or ignored the `Sec-WebSocket-Extensions` header -- but is now capable of fully complying with the WebSocket Compression RFC. Since many clients are likely sending `Sec-WebSocket-Extensions: permessage-deflate` to their Workers today (`new WebSocket(url)` automatically sets this in browsers), we have decided to maintain prior behavior if this flag is absent.

If the flag is present, the Workers runtime is capable of using WebSocket Compression on both inbound and outbound WebSocket connections.

Like browsers, calling `new WebSocket(url)` in a Worker will automatically set the `Sec-WebSocket-Extensions: permessage-deflate` header. If you are using the non-standard `fetch()` API to obtain a WebSocket, you can include the `Sec-WebSocket-Extensions` header with value `permessage-deflate` and include any of the compression parameters defined in [RFC-7692 ↗](https://datatracker.ietf.org/doc/html/rfc7692#section-7).

### Strict crypto error checking

| **Default as of**   | 2023-08-01                 |
| ------------------- | -------------------------- |
| **Flag to enable**  | strict\_crypto\_checks     |
| **Flag to disable** | no\_strict\_crypto\_checks |

Perform additional error checking in the Web Crypto API to conform with the specification and reject possibly unsafe key parameters:

* For RSA key generation, key sizes are required to be multiples of 128 bits as boringssl may otherwise truncate the key.
* The size of imported RSA keys must be at least 256 bits and at most 16384 bits, as with newly generated keys.
* The public exponent for imported RSA keys is restricted to the commonly used values `[3, 17, 37, 65537]`.
* In conformance with the specification, an error will be thrown when trying to import a public ECDH key with non-empty usages.

### Strict compression error checking

| **Default as of**   | 2023-08-01                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | strict\_compression\_checks     |
| **Flag to disable** | no\_strict\_compression\_checks |

Perform additional error checking in the Compression Streams API and throw an error if a `DecompressionStream` has trailing data or gets closed before the full compressed data has been provided.

### Override cache rules cache settings in `request.cf` object for Fetch API

| **Default as of**   | 2025-04-02                               |
| ------------------- | ---------------------------------------- |
| **Flag to enable**  | request\_cf\_overrides\_cache\_rules     |
| **Flag to disable** | no\_request\_cf\_overrides\_cache\_rules |

This flag changes the behavior of cache when requesting assets via the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch). Cache settings specified in the `request.cf` object, such as `cacheEverything` and `cacheTtl`, are now given precedence over any [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) set.

### Bot Management data

| **Default as of**   | 2023-08-01                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | no\_cf\_botmanagement\_default |
| **Flag to disable** | cf\_botmanagement\_default     |

This flag streamlines Workers requests by reducing unnecessary properties in the `request.cf` object.

With the flag enabled - either by default after 2023-08-01 or by setting the `no_cf_botmanagement_default` flag - Cloudflare will only include the [Bot Management object](https://developers.cloudflare.com/bots/reference/bot-management-variables/) in a Worker's `request.cf` if the account has access to Bot Management.

With the flag disabled, Cloudflare will include a default Bot Management object, regardless of whether the account is entitled to Bot Management.

### URLSearchParams delete() and has() value argument

| **Default as of**   | 2023-07-01                                   |
| ------------------- | -------------------------------------------- |
| **Flag to enable**  | urlsearchparams\_delete\_has\_value\_arg     |
| **Flag to disable** | no\_urlsearchparams\_delete\_has\_value\_arg |

The WHATWG introduced additional optional arguments to the `URLSearchParams` object [delete() ↗](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/delete) and [has() ↗](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/has) methods that allow for more precise control over the removal of query parameters. Because the arguments are optional and change the behavior of the methods when present there is a risk of breaking existing code. If your compatibility date is set to July 1, 2023 or after, this compatibility flag will be enabled by default.

For an example of how this change could break existing code, consider code that uses the `Array` `forEach()` method to iterate through a number of parameters to delete:

JavaScript

```

const usp = new URLSearchParams();

// ...

['abc', 'xyz'].forEach(usp.delete.bind(usp));


```

The `forEach()` automatically passes multiple parameters to the function that is passed in. Prior to the addition of the new standard parameters, these extra arguments would have been ignored.

Now, however, the additional arguments have meaning and change the behavior of the function. With this flag, the example above would need to be changed to:

JavaScript

```

const usp = new URLSearchParams();

// ...

['abc', 'xyz'].forEach((key) => usp.delete(key));


```

### Use a spec compliant URL implementation in redirects

| **Default as of**   | 2023-03-14                        |
| ------------------- | --------------------------------- |
| **Flag to enable**  | response\_redirect\_url\_standard |
| **Flag to disable** | response\_redirect\_url\_original |

Change the URL implementation used in `Response.redirect()` to be spec-compliant (WHATWG URL Standard).

### Dynamic Dispatch Exception Propagation

| **Default as of**   | 2023-03-01                                    |
| ------------------- | --------------------------------------------- |
| **Flag to enable**  | dynamic\_dispatch\_tunnel\_exceptions         |
| **Flag to disable** | dynamic\_dispatch\_treat\_exceptions\_as\_500 |

Previously, when using Workers for Platforms' [dynamic dispatch API](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/) to send an HTTP request to a user Worker, if the user Worker threw an exception, the dynamic dispatch Worker would receive an HTTP `500` error with no body. When the `dynamic_dispatch_tunnel_exceptions` compatibility flag is enabled, the exception will instead propagate back to the dynamic dispatch Worker. The `fetch()` call in the dynamic dispatch Worker will throw the same exception. This matches the similar behavior of [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) and [Durable Objects](https://developers.cloudflare.com/durable-objects/).

### `Headers` supports `getSetCookie()`

| **Default as of**   | 2023-03-01                      |
| ------------------- | ------------------------------- |
| **Flag to enable**  | http\_headers\_getsetcookie     |
| **Flag to disable** | no\_http\_headers\_getsetcookie |

Adds the [getSetCookie() ↗](https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie) method to the [Headers ↗](https://developer.mozilla.org/en-US/docs/Web/API/Headers) API in Workers.

JavaScript

```

const response = await fetch("https://example.com");

let cookieValues = response.headers.getSetCookie();


```

### Node.js compatibility

| **Flag to enable**  | nodejs\_compat     |
| ------------------- | ------------------ |
| **Flag to disable** | no\_nodejs\_compat |

Enables [Node.js APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) in the Workers Runtime.

Note that some Node.js APIs are only enabled if your Worker's compatibility date is set to on or after the following dates:

| Node.js API                                                                                                                                                 | Enabled after |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [http.server](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-nodejs-http-server-modules)                               | 2025-09-01    |
| [node:http, node:https](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-availability-of-nodehttp-and-nodehttps-modules) | 2025-08-15    |
| [process.env](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-auto-populating-processenv)                               | 2025-04-01    |
| [Disable Top-level Await in require()](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#disable-top-level-await-in-require)     | 2024-12-02    |

When enabling `nodejs_compat`, we recommend using the latest version of [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/), and the latest compatiblity date, in order to maximize compatibility. Some older versions of Wrangler inject additional polyfills that are no longer neccessary, as they are provided by the Workers runtime, if your Worker is using a more recent compatibility date.

If you see errors using a particular NPM package on Workers, you should first try updating your compatibility date and use the latest version of [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) or the [Cloudflare Vite Plugin](https://developers.cloudflare.com/workers/vite-plugin/). If you still encounter issues, please report them by [opening a GitHub issue ↗](https://github.com/cloudflare/workers-sdk/issues/new?template=bug-template.yaml).

### Streams Constructors

| **Default as of**   | 2022-11-30                     |
| ------------------- | ------------------------------ |
| **Flag to enable**  | streams\_enable\_constructors  |
| **Flag to disable** | streams\_disable\_constructors |

Adds the work-in-progress `new ReadableStream()` and `new WritableStream()` constructors backed by JavaScript underlying sources and sinks.

### Compliant TransformStream constructor

| **Default as of**   | 2022-11-30                                      |
| ------------------- | ----------------------------------------------- |
| **Flag to enable**  | transformstream\_enable\_standard\_constructor  |
| **Flag to disable** | transformstream\_disable\_standard\_constructor |

Previously, the `new TransformStream()` constructor was not compliant with the Streams API standard. Use the `transformstream_enable_standard_constructor` to opt-in to the backwards-incompatible change to make the constructor compliant. Must be used in combination with the `streams_enable_constructors` flag.

### CommonJS modules do not export a module namespace

| **Default as of**   | 2022-10-31                  |
| ------------------- | --------------------------- |
| **Flag to enable**  | export\_commonjs\_default   |
| **Flag to disable** | export\_commonjs\_namespace |

CommonJS modules were previously exporting a module namespace (an object like `{ default: module.exports }`) rather than exporting only the `module.exports`. When this flag is enabled, the export is fixed.

### Do not throw from async functions

| **Default as of**   | 2022-10-31                           |
| ------------------- | ------------------------------------ |
| **Flag to enable**  | capture\_async\_api\_throws          |
| **Flag to disable** | do\_not\_capture\_async\_api\_throws |

The `capture_async_api_throws` compatibility flag will ensure that, in conformity with the standards API, async functions will only ever reject if they throw an error. The inverse `do_not_capture_async_api_throws` flag means that async functions which contain an error may throw that error synchronously rather than rejecting.

### New URL parser implementation

| **Default as of**   | 2022-10-31    |
| ------------------- | ------------- |
| **Flag to enable**  | url\_standard |
| **Flag to disable** | url\_original |

The original implementation of the [URL ↗](https://developer.mozilla.org/en-US/docs/Web/API/URL) API in Workers was not fully compliant with the [WHATWG URL Standard ↗](https://url.spec.whatwg.org/), differing in several ways, including:

* The original implementation collapsed sequences of multiple slashes into a single slash:  
`new URL("https://example.com/a//b").toString() === "https://example.com/a/b"`
* The original implementation would throw `"TypeError: Invalid URL string."` if it encountered invalid percent-encoded escape sequences, like `https://example.com/a%%b`.
* The original implementation would percent-encode or percent-decode certain content differently:  
`new URL("https://example.com/a%40b?c d%20e?f").toString() === "https://example.com/a@b?c+d+e%3Ff"`
* The original implementation lacked more recently implemented `URL` features, like [URL.canParse() ↗](https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse%5Fstatic).

Set the compatibility date of your Worker to a date after `2022-10-31` or enable the `url_standard` compatibility flag to opt-in the fully spec compliant `URL` API implementation.

Refer to the [response\_redirect\_url\_standard compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#use-a-spec-compliant-url-implementation-in-redirects) , which affects the URL implementation used in `Response.redirect()`.

### `R2` bucket `list` respects the `include` option

| **Default as of**  | 2022-08-04               |
| ------------------ | ------------------------ |
| **Flag to enable** | r2\_list\_honor\_include |

With the `r2_list_honor_include` flag set, the `include` argument to R2 `list` options is honored. With an older compatibility date and without this flag, the `include` argument behaves implicitly as `include: ["httpMetadata", "customMetadata"]`.

### Do not substitute `null` on `TypeError`

| **Default as of**   | 2022-06-01                              |
| ------------------- | --------------------------------------- |
| **Flag to enable**  | dont\_substitute\_null\_on\_type\_error |
| **Flag to disable** | substitute\_null\_on\_type\_error       |

There was a bug in the runtime that meant that when being passed into built-in APIs, invalid values were sometimes mistakenly coalesced with `null`. Instead, a `TypeError` should have been thrown. The `dont_substitute_null_on_type_error` fixes this behavior so that an error is correctly thrown in these circumstances.

### Minimal subrequests

| **Default as of**   | 2022-04-05               |
| ------------------- | ------------------------ |
| **Flag to enable**  | minimal\_subrequests     |
| **Flag to disable** | no\_minimal\_subrequests |

With the `minimal_subrequests` flag set, `fetch()` subrequests sent to endpoints on the Worker's own zone (also called same-zone subrequests) have a reduced set of features applied to them. In general, these features should not have been initially applied to same-zone subrequests, and very few user-facing behavior changes are anticipated. Specifically, Workers might observe the following behavior changes with the new flag:

* Response bodies will not be opportunistically gzipped before being transmitted to the Workers runtime. If a Worker reads the response body, it will read it in plaintext, as has always been the case, so disabling this prevents unnecessary decompression. Meanwhile, if the Worker passes the response through to the client, Cloudflare's HTTP proxy will opportunistically gzip the response body on that side of the Workers runtime instead. The behavior change observable by a Worker script should be that some `Content-Encoding: gzip` headers will no longer appear.
* Automatic Platform Optimization may previously have been applied on both the Worker's initiating request and its subrequests in some circumstances. It will now only apply to the initiating request.
* Link prefetching will now only apply to the Worker's response, not responses to the Worker's subrequests.

### Global `navigator`

| **Default as of**   | 2022-03-21            |
| ------------------- | --------------------- |
| **Flag to enable**  | global\_navigator     |
| **Flag to disable** | no\_global\_navigator |

With the `global_navigator` flag set, a new global `navigator` property is available from within Workers. Currently, it exposes only a single `navigator.userAgent` property whose value is set to `'Cloudflare-Workers'`. This property can be used to reliably determine whether code is running within the Workers environment.

### Do not use the Custom Origin Trust Store for external subrequests

| **Default as of**   | 2022-03-08                    |
| ------------------- | ----------------------------- |
| **Flag to enable**  | no\_cots\_on\_external\_fetch |
| **Flag to disable** | cots\_on\_external\_fetch     |

The `no_cots_on_external_fetch` flag disables the use of the [Custom Origin Trust Store](https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/) when making external (grey-clouded) subrequests from a Cloudflare Worker.

### Setters/getters on API object prototypes

| **Default as of**   | 2022-01-31                                    |
| ------------------- | --------------------------------------------- |
| **Flag to enable**  | workers\_api\_getters\_setters\_on\_prototype |
| **Flag to disable** | workers\_api\_getters\_setters\_on\_instance  |

Originally, properties on Workers API objects were defined as instance properties as opposed to prototype properties. This broke subclassing at the JavaScript layer, preventing a subclass from correctly overriding the superclass getters/setters. This flag controls the breaking change made to set those getters/setters on the prototype template instead.

This changes applies to:

* `AbortSignal`
* `AbortController`
* `Blob`
* `Body`
* `DigestStream`
* `Event`
* `File`
* `Request`
* `ReadableStream`
* `ReadableStreamDefaultReader`
* `ReadableStreamBYOBReader`
* `Response`
* `TextDecoder`
* `TextEncoder`
* `TransformStream`
* `URL`
* `WebSocket`
* `WritableStream`
* `WritableStreamDefaultWriter`

### Durable Object `stub.fetch()` requires a full URL

| **Default as of**   | 2021-11-10                                    |
| ------------------- | --------------------------------------------- |
| **Flag to enable**  | durable\_object\_fetch\_requires\_full\_url   |
| **Flag to disable** | durable\_object\_fetch\_allows\_relative\_url |

Originally, when making a request to a Durable Object by calling `stub.fetch(url)`, a relative URL was accepted as an input. The URL would be interpreted relative to the placeholder URL `http://fake-host`, and the resulting absolute URL was delivered to the destination object's `fetch()` handler. This behavior was incorrect — full URLs were meant to be required. This flag makes full URLs required.

### `fetch()` improperly interprets unknown protocols as HTTP

| **Default as of**   | 2021-11-10                                  |
| ------------------- | ------------------------------------------- |
| **Flag to enable**  | fetch\_refuses\_unknown\_protocols          |
| **Flag to disable** | fetch\_treats\_unknown\_protocols\_as\_http |

Originally, if the `fetch()` function was passed a URL specifying any protocol other than `http:` or `https:`, it would silently treat it as if it were `http:`. For example, `fetch()` would appear to accept `ftp:` URLs, but it was actually making HTTP requests instead.

Note that Cloudflare Workers supports a non-standard extension to `fetch()` to make it support WebSockets. However, when making an HTTP request that is intended to initiate a WebSocket handshake, you should still use `http:` or `https:` as the protocol, not `ws:` nor `wss:`.

The `ws:` and `wss:` URL schemes are intended to be used together with the `new WebSocket()` constructor, which exclusively supports WebSocket. The extension to `fetch()` is designed to support HTTP and WebSocket in the same request (the response may or may not choose to initiate a WebSocket), and so all requests are considered to be HTTP.

### Streams BYOB reader detaches buffer

| **Default as of**   | 2021-11-10                                       |
| ------------------- | ------------------------------------------------ |
| **Flag to enable**  | streams\_byob\_reader\_detaches\_buffer          |
| **Flag to disable** | streams\_byob\_reader\_does\_not\_detach\_buffer |

Originally, the Workers runtime did not detach the `ArrayBuffer`s from user-provided TypedArrays when using the [BYOB reader's read() method](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/#methods), as required by the Streams spec, meaning it was possible to inadvertently reuse the same buffer for multiple `read()` calls. This change makes Workers conform to the spec.

User code should never try to reuse an `ArrayBuffer` that has been passed into a [BYOB reader's read() method](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/#methods). Instead, user code can reuse the `ArrayBuffer` backing the result of the `read()` promise, as in the example below.

JavaScript

```

// Consume and discard `readable` using a single 4KiB buffer.

let reader = readable.getReader({ mode: "byob" });

let arrayBufferView = new Uint8Array(4096);

while (true) {

  let result = await reader.read(arrayBufferView);

  if (result.done) break;

  // Optionally something with `result` here.

  // Re-use the same memory for the next `read()` by creating

  // a new Uint8Array backed by the result's ArrayBuffer.

  arrayBufferView = new Uint8Array(result.value.buffer);

}


```

The more recently added extension method `readAtLeast()` will always detach the `ArrayBuffer` and is unaffected by this feature flag setting.

### `FormData` parsing supports `File`

| **Default as of**   | 2021-11-03                                     |
| ------------------- | ---------------------------------------------- |
| **Flag to enable**  | formdata\_parser\_supports\_files              |
| **Flag to disable** | formdata\_parser\_converts\_files\_to\_strings |

[The FormData API ↗](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is used to parse data (especially HTTP request bodies) in `multipart/form-data` format.

Originally, the Workers runtime's implementation of the `FormData` API incorrectly converted uploaded files to strings. Therefore, `formData.get("filename")` would return a string containing the file contents instead of a `File` object. This change fixes the problem, causing files to be represented using `File` as specified in the standard.

### `HTMLRewriter` handling of `<esi:include>`

| **Flag to enable** | html\_rewriter\_treats\_esi\_include\_as\_void\_tag |
| ------------------ | --------------------------------------------------- |

The HTML5 standard defines a fixed set of elements as void elements, meaning they do not use an end tag: `<area>`, `<base>`, `<br>`, `<col>`, `<command>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<keygen>`, `<link>`, `<meta>`, `<param>`, `<source>`, `<track>`, and `<wbr>`.

HTML5 does not recognize XML self-closing tag syntax. For example, `<script src="https://developers.cloudflare.com/workers/configuration/compatibility-flags/foo.js" />` does not specify a script element with no body. A `</script>` ending tag is still required. The `/>` syntax simply is not recognized by HTML5 at all and it is treated the same as `>`. However, many developers still like to use this syntax, as a holdover from XHTML, a standard which failed to gain traction in the early 2000's.

`<esi:include>` and `<esi:comment>` are two tags that are not part of the HTML5 standard, but are instead used as part of [Edge Side Includes ↗](https://en.wikipedia.org/wiki/Edge%5FSide%5FIncludes), a technology for server-side HTML modification. These tags are not expected to contain any body and are commonly written with XML self-closing syntax.

`HTMLRewriter` was designed to parse standard HTML5, not ESI. However, it would be useful to be able to implement some parts of ESI using `HTMLRewriter`. To that end, this compatibility flag causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as void tags, so that they can be parsed and handled properly.

## Experimental flags

These flags can be enabled via `compatibility_flags`, but are not yet scheduled to become default on any particular date.

### Queue consumers don't wait for `ctx.waitUntil()` to resolve

| **Flag to enable** | queue\_consumer\_no\_wait\_for\_wait\_until |
| ------------------ | ------------------------------------------- |

By default, [Queues](https://developers.cloudflare.com/queues/) Consumer Workers acknowledge messages only after promises passed to [ctx.waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context) have resolved. This behavior can cause queue consumers which utilize `ctx.waitUntil()` to process messages slowly. The default behavior is documented in the [Queues Consumer Configuration Guide](https://developers.cloudflare.com/queues/configuration/javascript-apis#consumer).

This Consumer Worker is an example of a Worker which utilizes `ctx.waitUntil()`. Under the default behavior, this consumer Worker will only acknowledge a batch of messages after the sleep function has resolved.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // omitted

  },


  async queue(batch, env, ctx) {

    console.log(`received batch of ${batch.messages.length} messages to queue ${batch.queue}`);

    for (let i = 0; i < batch.messages.length; ++i) {

      console.log(`message #${i}: ${JSON.stringify(batch.messages[i])}`);

    }

    ctx.waitUntil(sleep(30 * 1000));

  }

};


function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));

}


```

If the `queue_consumer_no_wait_for_wait_until` flag is enabled, Queues consumers will no longer wait for promises passed to `ctx.waitUntil()` to resolve before acknowledging messages. This can improve the performance of queue consumers which utilize `ctx.waitUntil()`. With the flag enabled, in the above example, the consumer Worker will acknowledge the batch without waiting for the sleep function to resolve.

Using this flag will not affect the behavior of `ctx.waitUntil()`. `ctx.waitUntil()` will continue to extend the lifetime of your consumer Worker to continue to work even after the batch of messages has been acknowledged.

### `HTMLRewriter` handling of `<esi:include>`

| **Flag to enable** | html\_rewriter\_treats\_esi\_include\_as\_void\_tag |
| ------------------ | --------------------------------------------------- |

The HTML5 standard defines a fixed set of elements as void elements, meaning they do not use an end tag: `<area>`, `<base>`, `<br>`, `<col>`, `<command>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<keygen>`, `<link>`, `<meta>`, `<param>`, `<source>`, `<track>`, and `<wbr>`.

HTML5 does not recognize XML self-closing tag syntax. For example, `<script src="https://developers.cloudflare.com/workers/configuration/compatibility-flags/foo.js" />` does not specify a script element with no body. A `</script>` ending tag is still required. The `/>` syntax simply is not recognized by HTML5 at all and it is treated the same as `>`. However, many developers still like to use this syntax, as a holdover from XHTML, a standard which failed to gain traction in the early 2000's.

`<esi:include>` and `<esi:comment>` are two tags that are not part of the HTML5 standard, but are instead used as part of [Edge Side Includes ↗](https://en.wikipedia.org/wiki/Edge%5FSide%5FIncludes), a technology for server-side HTML modification. These tags are not expected to contain any body and are commonly written with XML self-closing syntax.

`HTMLRewriter` was designed to parse standard HTML5, not ESI. However, it would be useful to be able to implement some parts of ESI using `HTMLRewriter`. To that end, this compatibility flag causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as void tags, so that they can be parsed and handled properly.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/compatibility-flags/#page","headline":"Compatibility flags · Cloudflare Workers docs","description":"Opt into a specific features of the Workers runtime for your Workers project.","url":"https://developers.cloudflare.com/workers/configuration/compatibility-flags/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/compatibility-flags/","name":"Compatibility flags"}}]}
```
