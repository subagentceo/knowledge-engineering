---
title: Durable Object Stub
description: API reference for DurableObjectStub, the client used to invoke RPC methods on a remote Durable Object.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Object Stub

## Description

The `DurableObjectStub` interface is a client used to invoke methods on a remote Durable Object. The type of `DurableObjectStub` is generic to allow for RPC methods to be invoked on the stub.

Durable Objects implement E-order semantics, a concept deriving from the [E distributed programming language ↗](https://en.wikipedia.org/wiki/E%5F%28programming%5Flanguage%29). When you make multiple calls to the same Durable Object, it is guaranteed that the calls will be delivered to the remote Durable Object in the order in which you made them. E-order semantics makes many distributed programming problems easier. E-order is implemented by the [Cap'n Proto ↗](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

If an exception is thrown by a Durable Object stub all in-flight calls and future calls will fail with [exceptions](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/). To continue invoking methods on a remote Durable Object a Worker must recreate the stub. There are no ordering guarantees between different stubs.

* [  JavaScript ](#tab-panel-8229)
* [  TypeScript ](#tab-panel-8230)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Durable Object

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

  }


  async sayHello() {

    return "Hello, World!";

  }

}


// Worker

export default {

  async fetch(request, env) {

    // A stub is a client used to invoke methods on the Durable Object

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");


    // Methods on the Durable Object are invoked via the stub

    const rpcResponse = await stub.sayHello();


    return new Response(rpcResponse);

  },

};


```

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export interface Env {

  MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;

}


// Durable Object

export class MyDurableObject extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


  async sayHello(): Promise<string> {

    return "Hello, World!";

  }

}


// Worker

export default {

  async fetch(request, env) {

    // A stub is a client used to invoke methods on the Durable Object

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");


    // Methods on the Durable Object are invoked via the stub

    const rpcResponse = await stub.sayHello();


    return new Response(rpcResponse);

  },

} satisfies ExportedHandler<Env>;


```

## Properties

### `id`

`id` is a property of the `DurableObjectStub` corresponding to the [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) used to create the stub.

* [  JavaScript ](#tab-panel-8225)
* [  Python ](#tab-panel-8226)

JavaScript

```

const id = env.MY_DURABLE_OBJECT.newUniqueId();

const stub = env.MY_DURABLE_OBJECT.get(id);

console.assert(id.equals(stub.id), "This should always be true");


```

Python

```

id = env.MY_DURABLE_OBJECT.newUniqueId()

stub = env.MY_DURABLE_OBJECT.get(id)

assert id.equals(stub.id), "This should always be true"


```

### `name`

`name` is an optional property of a `DurableObjectStub`, which returns a name if it was provided upon stub creation either directly via [DurableObjectNamespace::getByName](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname) or indirectly via a [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) created by [DurableObjectNamespace::idFromName](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname). This value is undefined if the [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) used to create the `DurableObjectStub` was constructed using [DurableObjectNamespace::newUniqueId](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

* [  JavaScript ](#tab-panel-8227)
* [  Python ](#tab-panel-8228)

JavaScript

```

const stub = env.MY_DURABLE_OBJECT.getByName("foo");

console.assert(stub.name === "foo", "This should always be true");


```

Python

```

stub = env.MY_DURABLE_OBJECT.getByName("foo")

assert stub.name == "foo", "This should always be true"


```

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/stub/#page","headline":"Durable Object Stub · Cloudflare Durable Objects docs","description":"API reference for DurableObjectStub, the client used to invoke RPC methods on a remote Durable Object.","url":"https://developers.cloudflare.com/durable-objects/api/stub/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/stub/","name":"Durable Object Stub"}}]}
```
