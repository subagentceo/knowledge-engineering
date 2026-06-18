---
title: Remote-procedure call (RPC)
description: The built-in, JavaScript-native RPC system built into Workers and Durable Objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Remote-procedure call (RPC)

Note

To use RPC, [define a compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates) of `2024-04-03` or higher, or include `rpc` in your [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

Workers provide a built-in, JavaScript-native [RPC (Remote Procedure Call) ↗](https://en.wikipedia.org/wiki/Remote%5Fprocedure%5Fcall) system, allowing you to:

* Define public methods on your Worker that can be called by other Workers on the same Cloudflare account, via [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc)
* Define public methods on [Durable Objects](https://developers.cloudflare.com/durable-objects) that can be called by other workers on the same Cloudflare account that declare a binding to it.

The RPC system is designed to feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

## Example

For example, if Worker B implements the public method `add(a, b)`:

* [  wrangler.jsonc ](#tab-panel-12039)
* [  wrangler.toml ](#tab-panel-12040)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_b",

  "main": "./src/workerB.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_b"

main = "./src/workerB.js"


```

* [  JavaScript ](#tab-panel-12052)
* [  TypeScript ](#tab-panel-12053)
* [  Python ](#tab-panel-12054)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from Worker B");

  }


  add(a, b) {

    return a + b;

  }

}


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from Worker B");

  }


  add(a: number, b: number) {

    return a + b;

  }

}


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello from Worker B")


    def add(self, a: int, b: int) -> int:

        return a + b


```

Worker A can declare a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) to Worker B:

* [  wrangler.jsonc ](#tab-panel-12043)
* [  wrangler.toml ](#tab-panel-12044)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "worker_a",

  "main": "./src/workerA.js",

  "services": [

    {

      "binding": "WORKER_B",

      "service": "worker_b"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "worker_a"

main = "./src/workerA.js"


[[services]]

binding = "WORKER_B"

service = "worker_b"


```

Making it possible for Worker A to call the `add()` method from Worker B:

* [  JavaScript ](#tab-panel-12047)
* [  TypeScript ](#tab-panel-12048)
* [  Python ](#tab-panel-12049)

JavaScript

```

export default {

  async fetch(request, env) {

    const result = await env.WORKER_B.add(1, 2);

    return new Response(result);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const result = await env.WORKER_B.add(1, 2);

    return new Response(result);

  },

};


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        result = await self.env.WORKER_B.add(1, 2)

    return Response(f"Result: {result}")


```

The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with standard JavaScript classes.

## All calls are asynchronous

Whether or not the method you are calling was declared asynchronous on the server side, it will behave as such on the client side. You must `await` the result.

Note that RPC calls do not actually return `Promise`s, but they return a type that behaves like a `Promise`. The type is a "custom thenable", in that it implements the method `then()`. JavaScript supports awaiting any "thenable" type, so, for the most part, you can treat the return value like a Promise.

(We'll see why the type is not actually a Promise a bit later.)

## Structured clonable types, and more

Nearly all types that are [Structured Cloneable ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm#supported%5Ftypes) can be used as a parameter or return value of an RPC method. This includes, most basic "value" types in JavaScript, including objects, arrays, strings and numbers.

As an exception to Structured Clone, application-defined classes (or objects with custom prototypes) cannot be passed over RPC, except as described below.

The RPC system also supports a number of types that are not Structured Cloneable, including:

* Functions, which are replaced by stubs that call back to the sender.
* Application-defined classes that extend `RpcTarget`, which are similarly replaced by stubs.
* [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/) and [WriteableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/), with automatic streaming flow control.
* [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) and [Response](https://developers.cloudflare.com/workers/runtime-apis/response/), for conveniently representing HTTP messages.
* RPC stubs themselves, even if the stub was received from a third Worker.

## Functions

You can send a function over RPC. When you do so, the function is replaced by a "stub". The recipient can call the stub like a function, but doing so makes a new RPC back to the place where the function originated.

### Return functions from RPC methods

Consider the following two Workers, connected via a [Service Binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc). The counter service provides the RPC method `newCounter()`, which returns a function:

* [  wrangler.jsonc ](#tab-panel-12045)
* [  wrangler.toml ](#tab-panel-12046)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "counter-service",

  "main": "./src/counterService.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "counter-service"

main = "./src/counterService.js"


```

* [  JavaScript ](#tab-panel-12057)
* [  TypeScript ](#tab-panel-12058)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from counter-service");

  }


  async newCounter() {

    let value = 0;

    return (increment = 0) => {

      value += increment;

      return value;

    };

  }

}


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export default class extends WorkerEntrypoint {

  async fetch() {

    return new Response("Hello from counter-service");

  }


  async newCounter() {

    let value = 0;

    return (increment = 0) => {

      value += increment;

      return value;

    };

  }

}


```

This function can then be called by the client Worker:

* [  wrangler.jsonc ](#tab-panel-12050)
* [  wrangler.toml ](#tab-panel-12051)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "client_worker",

  "main": "./src/clientWorker.js",

  "services": [

    {

      "binding": "COUNTER_SERVICE",

      "service": "counter-service"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "client_worker"

main = "./src/clientWorker.js"


[[services]]

binding = "COUNTER_SERVICE"

service = "counter-service"


```

* [  JavaScript ](#tab-panel-12055)
* [  TypeScript ](#tab-panel-12056)

JavaScript

```

export default {

  async fetch(request, env) {

    using f = await env.COUNTER_SERVICE.newCounter();

    await f(2); // returns 2

    await f(1); // returns 3

    const count = await f(-5); // returns -2


    return new Response(count);

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env) {

    using f = await env.COUNTER_SERVICE.newCounter();

    await f(2); // returns 2

    await f(1); // returns 3

    const count = await f(-5); // returns -2


    return new Response(count);

  },

};


```

Note

Refer to [Explicit Resource Management](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle) to learn more about the `using` declaration shown in the example above.

How is this possible? The system is not serializing the function itself. When the function returned by `CounterService` is called, it runs within `CounterService` — even if it is called by another Worker.

Under the hood, the caller is not really calling the function itself directly, but calling what is called a "stub". A "stub" is a [Proxy ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Proxy) object that allows the client to call the remote service as if it were local, running in the same Worker. Behind the scenes, it calls back to the Worker that implements `CounterService` and asks it to execute the function closure that had been returned earlier.

### Send functions as parameters of RPC methods

You can also send a function in the parameters of an RPC. This enables the "server" to call back to the "client", reversing the direction of the relationship.

Because of this, the words "client" and "server" can be ambiguous when talking about RPC. The "server" is a Durable Object or WorkerEntrypoint, and the "client" is the Worker that invoked the server via a binding. But, RPCs can flow both ways between the two. When talking about an individual RPC, we recommend instead using the words "caller" and "callee".

## Class Instances

To use an instance of a class that you define as a parameter or return value of an RPC method, you must extend the built-in `RpcTarget` class.

Consider the following example:

* [  wrangler.jsonc ](#tab-panel-12021)
* [  wrangler.toml ](#tab-panel-12022)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "counter",

  "main": "./src/counter.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "counter"

main = "./src/counter.js"


```

* [  JavaScript ](#tab-panel-12037)
* [  TypeScript ](#tab-panel-12038)

JavaScript

```

import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";


class Counter extends RpcTarget {

  #value = 0;


  increment(amount) {

    this.#value += amount;

    return this.#value;

  }


  get value() {

    return this.#value;

  }

}


export class CounterService extends WorkerEntrypoint {

  async newCounter() {

    return new Counter();

  }

}


export default {

  fetch() {

    return new Response("ok");

  },

};


```

TypeScript

```

import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";


class Counter extends RpcTarget {

  #value = 0;


  increment(amount: number) {

    this.#value += amount;

    return this.#value;

  }


  get value() {

    return this.#value;

  }

}


export class CounterService extends WorkerEntrypoint {

  async newCounter() {

    return new Counter();

  }

}


export default {

  fetch() {

    return new Response("ok");

  },

};


```

The method `increment` can be called directly by the client, as can the public property `value`:

* [  wrangler.jsonc ](#tab-panel-12023)
* [  wrangler.toml ](#tab-panel-12024)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "client-worker",

  "main": "./src/clientWorker.js",

  "services": [

    {

      "binding": "COUNTER_SERVICE",

      "service": "counter",

      "entrypoint": "CounterService"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "client-worker"

main = "./src/clientWorker.js"


[[services]]

binding = "COUNTER_SERVICE"

service = "counter"

entrypoint = "CounterService"


```

* [  JavaScript ](#tab-panel-12029)
* [  TypeScript ](#tab-panel-12030)

JavaScript

```

export default {

  async fetch(request, env) {

    using counter = await env.COUNTER_SERVICE.newCounter();


    await counter.increment(2); // returns 2

    await counter.increment(1); // returns 3

    await counter.increment(-5); // returns -2


    const count = await counter.value; // returns -2


    return new Response(count);

  },

};


```

TypeScript

```

export default {

  async fetch(request: Request, env: Env) {

    using counter = await env.COUNTER_SERVICE.newCounter();


    await counter.increment(2); // returns 2

    await counter.increment(1); // returns 3

    await counter.increment(-5); // returns -2


    const count = await counter.value; // returns -2


    return new Response(count);

  },

};


```

Note

Refer to [Explicit Resource Management](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle) to learn more about the `using` declaration shown in the example above.

Classes that extend `RpcTarget` work a lot like functions: the object itself is not serialized, but is instead replaced by a stub. In this case, the stub itself is not callable, but its methods are. Calling any method on the stub actually makes an RPC back to the original object, where it was created.

As shown above, you can also access properties of classes. Properties behave like RPC methods that don't take any arguments — you await the property to asynchronously fetch its current value. Note that the act of awaiting the property (which, behind the scenes, calls `.then()` on it) is what causes the property to be fetched. If you do not use `await` when accessing the property, it will not be fetched.

Note

While it's possible to define a similar interface to the caller using an object that contains many functions, this is less efficient. If you return an object that contains five functions, then you are creating five stubs. If you return a class instance, where the class declares five methods, you are only returning a single stub. Returning a single stub is often more efficient and easier to reason about. Moreover, when returning a plain object (not a class), non-function properties of the object will be transmitted at the time the object itself is transmitted; they cannot be fetched asynchronously on-demand.

Note

Classes which do not inherit `RpcTarget` cannot be sent over RPC at all. This differs from Structured Clone, which defines application-defined classes as clonable. Why the difference? By default, the Structured Clone algorithm simply ignores an object's class entirely. So, the recipient receives a plain object, containing the original object's instance properties but entirely missing its original type. This behavior is rarely useful in practice, and could be confusing if the developer had intended the class to be treated as an `RpcTarget`. So, Workers RPC has chosen to disallow classes that are not `RpcTarget`s, to avoid any confusion.

### Promise pipelining

When you call an RPC method and get back an object, it's common to immediately call a method on the object:

* [  JavaScript ](#tab-panel-12025)
* [  TypeScript ](#tab-panel-12026)

JavaScript

```

// Two round trips.

using counter = await env.COUNTER_SERVICE.getCounter();

await counter.increment();


```

TypeScript

```

// Two round trips.

using counter = await env.COUNTER_SERVICE.getCounter();

await counter.increment();


```

But consider the case where the Worker service that you are calling may be far away across the network, as in the case of [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) or [Durable Objects](https://developers.cloudflare.com/durable-objects). The code above makes two round trips, once when calling `getCounter()`, and again when calling `.increment()`. We'd like to avoid this.

With most RPC systems, the only way to avoid the problem would be to combine the two calls into a single "batch" call, perhaps called `getCounterAndIncrement()`. However, this makes the interface worse. You wouldn't design a local interface this way.

Workers RPC allows a different approach: You can simply omit the first `await`:

* [  JavaScript ](#tab-panel-12027)
* [  TypeScript ](#tab-panel-12028)

JavaScript

```

// Only one round trip! Note the missing `await`.

using promiseForCounter = env.COUNTER_SERVICE.getCounter();

await promiseForCounter.increment();


```

TypeScript

```

// Only one round trip! Note the missing `await`.

using promiseForCounter = env.COUNTER_SERVICE.getCounter();

await promiseForCounter.increment();


```

In this code, `getCounter()` returns a promise for a counter. Normally, the only thing you would do with a promise is `await` it. However, Workers RPC promises are special: they also allow you to initiate speculative calls on the future result of the promise. These calls are sent to the server immediately, without waiting for the initial call to complete. Thus, multiple chained calls can be completed in a single round trip.

How does this work? The promise returned by an RPC is not a real JavaScript `Promise`. Instead, it is a custom ["Thenable" ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Promise#thenables). It has a `.then()` method like `Promise`, which allows it to be used in all the places where you'd use a normal `Promise`. For instance, you can `await` it. But, in addition to that, an RPC promise also acts like a stub. Calling any method name on the promise forms a speculative call on the promise's eventual result. This is known as "promise pipelining".

This works when calling properties of objects returned by RPC methods as well. For example:

* [  JavaScript ](#tab-panel-12031)
* [  TypeScript ](#tab-panel-12032)

JavaScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class MyService extends WorkerEntrypoint {

  async foo() {

    return {

      bar: {

        baz: () => "qux",

      },

    };

  }

}


```

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class MyService extends WorkerEntrypoint {

  async foo() {

    return {

      bar: {

        baz: () => "qux",

      },

    };

  }

}


```

* [  JavaScript ](#tab-panel-12035)
* [  TypeScript ](#tab-panel-12036)

JavaScript

```

export default {

  async fetch(request, env) {

    using foo = env.MY_SERVICE.foo();

    let baz = await foo.bar.baz();

    return new Response(baz);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    using foo = env.MY_SERVICE.foo();

    let baz = await foo.bar.baz();

    return new Response(baz);

  },

};


```

If the initial RPC ends up throwing an exception, then any pipelined calls will also fail with the same exception

## ReadableStream, WriteableStream, Request and Response

You can send and receive [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/), [WriteableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/), [Request](https://developers.cloudflare.com/workers/runtime-apis/request/), and [Response](https://developers.cloudflare.com/workers/runtime-apis/response/) using RPC methods. When doing so, bytes in the body are automatically streamed with appropriate flow control. This allows you to send messages over RPC which are larger than [the typical 32 MiB limit](#limitations).

Only [byte-oriented streams ↗](https://developer.mozilla.org/en-US/docs/Web/API/Streams%5FAPI/Using%5Freadable%5Fbyte%5Fstreams) (streams with an underlying byte source of `type: "bytes"`) are supported.

In all cases, ownership of the stream is transferred to the recipient. The sender can no longer read/write the stream after sending it. If the sender wishes to keep its own copy, it can use the [tee() method of ReadableStream ↗](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee) or the [clone() method of Request or Response ↗](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone). Keep in mind that doing this may force the system to buffer bytes and lose the benefits of flow control.

## Forwarding RPC stubs

A stub received over RPC from one Worker can be forwarded over RPC to another Worker.

* [  JavaScript ](#tab-panel-12033)
* [  TypeScript ](#tab-panel-12034)

JavaScript

```

using counter = env.COUNTER_SERVICE.getCounter();

await env.ANOTHER_SERVICE.useCounter(counter);


```

TypeScript

```

using counter = env.COUNTER_SERVICE.getCounter();

await env.ANOTHER_SERVICE.useCounter(counter);


```

Here, three different workers are involved:

1. The calling Worker (we'll call this the "introducer")
2. `COUNTER_SERVICE`
3. `ANOTHER_SERVICE`

When `ANOTHER_SERVICE` calls a method on the `counter` that is passed to it, this call will automatically be proxied through the introducer and on to the [RpcTarget](https://developers.cloudflare.com/workers/runtime-apis/rpc/) class implemented by `COUNTER_SERVICE`.

In this way, the introducer Worker can connect two Workers that did not otherwise have any ability to form direct connections to each other.

Currently, this proxying only lasts until the end of the Workers' execution contexts. A proxy connection cannot be persisted for later use.

## Video Tutorial

In this video, we explore how Cloudflare Workers support Remote Procedure Calls (RPC) to simplify communication between Workers. Learn how to implement RPC in your JavaScript applications and build serverless solutions with ease. Whether you're managing microservices or optimizing web architecture, this tutorial will show you how to quickly set up and use Cloudflare Workers for RPC calls. By the end of this video, you'll understand how to call functions between Workers, pass functions as arguments, and implement user authentication with Cloudflare Workers.

## More Details

* [ Lifecycle ](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/)
* [ Reserved Methods ](https://developers.cloudflare.com/workers/runtime-apis/rpc/reserved-methods/)
* [ Visibility and Security Model ](https://developers.cloudflare.com/workers/runtime-apis/rpc/visibility/)
* [ TypeScript ](https://developers.cloudflare.com/workers/runtime-apis/rpc/typescript/)
* [ Error handling ](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/)

## Limitations

* [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) is currently ignored when making RPC calls. If Smart Placement is enabled for Worker A, and Worker B declares a [Service Binding](https://developers.cloudflare.com/workers/runtime-apis/bindings) to it, when Worker B calls Worker A via RPC, Worker A will run locally, on the same machine.
* The maximum serialized RPC limit is 32 MiB. Consider using [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/) when returning more data.  
   * [  JavaScript ](#tab-panel-12041)  
   * [  TypeScript ](#tab-panel-12042)  
JavaScript  
```  
export class MyService extends WorkerEntrypoint {  
  async foo() {  
    // Although this works, it puts a lot of memory pressure on the isolate.  
    // If possible, streaming the data from its original source is much preferred and would yield better performance.  
    // If you must buffer the data into memory, consider chunking it into smaller pieces if possible.  
    const sizeInBytes = 33 * 1024 * 1024; // 33 MiB  
    const arr = new Uint8Array(sizeInBytes);  
    return new ReadableStream({  
      start(controller) {  
        controller.enqueue(arr);  
        controller.close();  
      },  
    });  
  }  
}  
```  
TypeScript  
```  
export class MyService extends WorkerEntrypoint {  
  async foo() {  
    // Although this works, it puts a lot of memory pressure on the isolate.  
    // If possible, streaming the data from its original source is much preferred and would yield better performance.  
    // If you must buffer the data into memory, consider chunking it into smaller pieces if possible.  
    const sizeInBytes = 33 * 1024 * 1024; // 33 MiB  
    const arr = new Uint8Array(sizeInBytes);  
    return new ReadableStream({  
      start(controller) {  
        controller.enqueue(arr);  
        controller.close();  
      },  
    });  
  }  
}  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/rpc/#page","headline":"Remote-procedure call (RPC) · Cloudflare Workers docs","description":"The built-in, JavaScript-native RPC system built into Workers and Durable Objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/rpc/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["RPC"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/rpc/","name":"Remote-procedure call (RPC)"}}]}
```
