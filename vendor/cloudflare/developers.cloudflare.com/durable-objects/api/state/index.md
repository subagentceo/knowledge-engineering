---
title: Durable Object State
description: API reference for DurableObjectState, which controls concurrency, WebSocket attachment, and storage access.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Object State

## Description

The `DurableObjectState` interface is accessible as an instance property on the Durable Object class. This interface encapsulates methods that modify the state of a Durable Object, for example which WebSockets are attached to a Durable Object or how the runtime should handle concurrent Durable Object requests.

The `DurableObjectState` interface is different from the Storage API in that it does not have top-level methods which manipulate persistent application data. These methods are instead encapsulated in the [DurableObjectStorage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) interface and accessed by [DurableObjectState::storage](https://developers.cloudflare.com/durable-objects/api/state/#storage).

* [  JavaScript ](#tab-panel-8218)
* [  TypeScript ](#tab-panel-8219)
* [  Python ](#tab-panel-8220)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Durable Object

export class MyDurableObject extends DurableObject {

  // DurableObjectState is accessible via the ctx instance property

  constructor(ctx, env) {

    super(ctx, env);

  }

  ...

}


```

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export interface Env {

  MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;

}


// Durable Object

export class MyDurableObject extends DurableObject {

  // DurableObjectState is accessible via the ctx instance property

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }

  ...

}


```

Python

```

from workers import DurableObject


# Durable Object

class MyDurableObject(DurableObject):

  # DurableObjectState is accessible via the ctx instance property

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

  # ...


```

## Methods and Properties

### `exports`

Contains loopback bindings to the Worker's own top-level exports. This has exactly the same meaning as [ExecutionContext's ctx.exports](https://developers.cloudflare.com/workers/runtime-apis/context/#exports).

### `waitUntil`

`waitUntil` is available on `DurableObjectState` for API compatibility with [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil).

`waitUntil` has no effect in Durable Objects

Unlike in Workers, `waitUntil` has no effect in Durable Objects. It does not extend the lifetime of a Durable Object or affect when a request or RPC completes.

Durable Objects automatically remain active as long as there is ongoing work or pending I/O, so `waitUntil` is not needed. Refer to [Lifecycle of a Durable Object](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/) for more information.

#### Parameters

* A required promise of any type.

#### Return values

* None.

### `blockConcurrencyWhile`

`blockConcurrencyWhile` executes an async callback while blocking any other events from being delivered to the Durable Object until the callback completes. This method guarantees ordering and prevents concurrent requests. All events that were not explicitly initiated as part of the callback itself will be blocked. Once the callback completes, all other events will be delivered.

* `blockConcurrencyWhile` is commonly used within the constructor of the Durable Object class to enforce initialization to occur before any requests are delivered.
* Another use case is executing `async` operations based on the current state of the Durable Object and using `blockConcurrencyWhile` to prevent that state from changing while yielding the event loop.
* If the callback throws an exception, the object will be terminated and reset. This ensures that the object cannot be left stuck in an uninitialized state if something fails unexpectedly.
* To avoid this behavior, enclose the body of your callback in a `try...catch` block to ensure it cannot throw an exception.

To help mitigate deadlocks there is a 30 second timeout applied when executing the callback. If this timeout is exceeded, the Durable Object will be reset. It is best practice to have the callback do as little work as possible to improve overall request throughput to the Durable Object.

When to use `blockConcurrencyWhile`

Use `blockConcurrencyWhile` in the constructor to run schema migrations or initialize state before any requests are processed. This ensures your Durable Object is fully ready before handling traffic.

For regular request handling, you rarely need `blockConcurrencyWhile`. SQLite storage operations are synchronous and do not yield the event loop, so they execute atomically without it. For asynchronous KV storage operations, input gates already prevent other requests from interleaving during storage calls.

Reserve `blockConcurrencyWhile` outside the constructor for cases where you make external async calls (such as `fetch()`) and cannot tolerate state changes while the event loop yields.

* [  JavaScript ](#tab-panel-8221)
* [  Python ](#tab-panel-8222)

JavaScript

```

// Durable Object

export class MyDurableObject extends DurableObject {

  initialized = false;


  constructor(ctx, env) {

    super(ctx, env);


    // blockConcurrencyWhile will ensure that initialized will always be true

    this.ctx.blockConcurrencyWhile(async () => {

      this.initialized = true;

    });

  }

  ...

}


```

Python

```

# Durable Object

class MyDurableObject(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    self.initialized = False


    # blockConcurrencyWhile will ensure that initialized will always be true

    async def set_initialized():

      self.initialized = True

    self.ctx.blockConcurrencyWhile(set_initialized)

  # ...


```

#### Parameters

* A required callback which returns a `Promise<T>`.

#### Return values

* A `Promise<T>` returned by the callback.

### `acceptWebSocket`

`acceptWebSocket` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`acceptWebSocket` adds a WebSocket to the set of WebSockets attached to the Durable Object. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage` handler, and `webSocketClose` will be invoked upon disconnect. After calling `acceptWebSocket`, the WebSocket is accepted and its `send` and `close` methods can be used.

The [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api) takes the place of the standard [WebSockets API](https://developers.cloudflare.com/workers/runtime-apis/websockets/). Therefore, `ws.accept` must not have been called separately and `ws.addEventListener` method will not receive events as they will instead be delivered to the Durable Object.

The WebSocket Hibernation API permits a maximum of 32,768 WebSocket connections per Durable Object, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

#### Parameters

* A required `WebSocket` with name `ws`.
* An optional `Array<string>` of associated tags. Tags can be used to retrieve WebSockets via [DurableObjectState::getWebSockets](https://developers.cloudflare.com/durable-objects/api/state/#getwebsockets). Each tag is a maximum of 256 characters and there can be at most 10 tags associated with a WebSocket.

#### Return values

* None.

### `getWebSockets`

`getWebSockets` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getWebSockets` returns an `Array<WebSocket>` which is the set of WebSockets attached to the Durable Object. An optional tag argument can be used to filter the list according to tags supplied when calling [DurableObjectState::acceptWebSocket](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket).

`waitUntil` is not necessary

Disconnected WebSockets are not returned by this method, but `getWebSockets` may still return WebSockets even after `ws.close` has been called. For example, if the server-side WebSocket sends a close, but does not receive one back (and has not detected a disconnect from the client), then the connection is in the `CLOSING` readyState. The client might send more messages, so the WebSocket is technically not disconnected.

With the [web\_socket\_auto\_reply\_to\_close](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#websocket-auto-reply-to-close) compatibility flag (enabled by default on compatibility dates on or after `2026-04-07`), the runtime automatically completes the close handshake, so WebSockets transition from `CLOSING` to `CLOSED` much faster and are less likely to be observed in the `CLOSING` state.

#### Parameters

* An optional tag of type `string`.

#### Return values

* An `Array<WebSocket>`.

### `setWebSocketAutoResponse`

`setWebSocketAutoResponse` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`setWebSocketAutoResponse` sets an automatic response, auto-response, for the request provided for all WebSockets attached to the Durable Object. If a request is received matching the provided request then the auto-response will be returned without waking WebSockets in hibernation and incurring billable duration charges.

`setWebSocketAutoResponse` is a common alternative to setting up a server for static ping/pong messages because this can be handled without waking hibernating WebSockets.

#### Parameters

* An optional `WebSocketRequestResponsePair(request string, response string)` enabling any WebSocket accepted via [DurableObjectState::acceptWebSocket](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket) to automatically reply to the provided response when it receives the provided request. Both request and response are limited to 2,048 characters each. If the parameter is omitted, any previously set auto-response configuration will be removed. [DurableObjectState::getWebSocketAutoResponseTimestamp](https://developers.cloudflare.com/durable-objects/api/state/#getwebsocketautoresponsetimestamp) will still reflect the last timestamp that an auto-response was sent.

#### Return values

* None.

### `getWebSocketAutoResponse`

`getWebSocketAutoResponse` returns the `WebSocketRequestResponsePair` object last set by [DurableObjectState::setWebSocketAutoResponse](https://developers.cloudflare.com/durable-objects/api/state/#setwebsocketautoresponse), or null if not auto-response has been set.

inspect `WebSocketRequestResponsePair`

`WebSocketRequestResponsePair` can be inspected further by calling `getRequest` and `getResponse` methods.

#### Parameters

* None.

#### Return values

* A `WebSocketRequestResponsePair` or null.

### `getWebSocketAutoResponseTimestamp`

`getWebSocketAutoResponseTimestamp` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getWebSocketAutoResponseTimestamp` gets the most recent `Date` on which the given WebSocket sent an auto-response, or null if the given WebSocket never sent an auto-response.

#### Parameters

* A required `WebSocket`.

#### Return values

* A `Date` or null.

### `setHibernatableWebSocketEventTimeout`

`setHibernatableWebSocketEventTimeout` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`setHibernatableWebSocketEventTimeout` sets the maximum amount of time in milliseconds that a WebSocket event can run for.

If no parameter or a parameter of `0` is provided and a timeout has been previously set, then the timeout will be unset. The maximum value of timeout is 604,800,000 ms (7 days).

#### Parameters

* An optional `number`.

#### Return values

* None.

### `getHibernatableWebSocketEventTimeout`

`getHibernatableWebSocketEventTimeout` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getHibernatableWebSocketEventTimeout` gets the currently set hibernatable WebSocket event timeout if one has been set via [DurableObjectState::setHibernatableWebSocketEventTimeout](https://developers.cloudflare.com/durable-objects/api/state/#sethibernatablewebsocketeventtimeout).

#### Parameters

* None.

#### Return values

* A number, or null if the timeout has not been set.

### `getTags`

`getTags` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getTags` returns tags associated with a given WebSocket. This method throws an exception if the WebSocket has not been associated with the Durable Object via [DurableObjectState::acceptWebSocket](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket).

#### Parameters

* A required `WebSocket`.

#### Return values

* An `Array<string>` of tags.

### `abort`

`abort` is used to forcibly reset a Durable Object. A JavaScript `Error` with the message passed as a parameter will be logged. This error is not able to be caught within the application code.

* [  TypeScript ](#tab-panel-8223)
* [  Python ](#tab-panel-8224)

JavaScript

```

// Durable Object

export class MyDurableObject extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


  async sayHello() {

    // Error: Hello, World! will be logged

    this.ctx.abort("Hello, World!");

  }

}


```

Python

```

# Durable Object

class MyDurableObject(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)


  async def say_hello(self):

    # Error: Hello, World! will be logged

    self.ctx.abort("Hello, World!")


```

Not available in local development

`abort` is not available in local development with the `wrangler dev` CLI command.

#### Parameters

* An optional `string` .

#### Return values

* None.

## Properties

### `id`

`id` is a readonly property of type `DurableObjectId` corresponding to the [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) of the Durable Object.

### `storage`

`storage` is a readonly property of type `DurableObjectStorage` encapsulating the [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/).

## Related resources

* [Durable Objects: Easy, Fast, Correct - Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/state/#page","headline":"Durable Object State · Cloudflare Durable Objects docs","description":"API reference for DurableObjectState, which controls concurrency, WebSocket attachment, and storage access.","url":"https://developers.cloudflare.com/durable-objects/api/state/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/state/","name":"Durable Object State"}}]}
```
