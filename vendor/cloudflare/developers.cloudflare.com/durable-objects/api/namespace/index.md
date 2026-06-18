---
title: Durable Object Namespace
description: API reference for DurableObjectNamespace, which creates IDs and obtains stubs to interact with Durable Objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Object Namespace

## Description

A Durable Object namespace is a set of Durable Objects that are backed by the same Durable Object class. There is only one Durable Object namespace per class. A Durable Object namespace can contain any number of Durable Objects.

The `DurableObjectNamespace` interface is used to obtain a reference to new or existing Durable Objects. The interface is accessible from the fetch handler on a Cloudflare Worker via the `env` parameter, which is the standard interface when referencing bindings declared in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

This interface defines several [methods](https://developers.cloudflare.com/durable-objects/api/namespace/#methods) that can be used to create an ID for a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after calling [DurableObjectNamespace::get](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to create a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

* [  JavaScript ](#tab-panel-8204)
* [  TypeScript ](#tab-panel-8205)
* [  Python ](#tab-panel-8206)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Durable Object

export class MyDurableObject extends DurableObject {

  ...

}


// Worker

export default {

  async fetch(request, env) {

    // A stub is a client Object used to invoke methods defined by the Durable Object

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");

    ...

  }

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

  ...

}


// Worker

export default {

  async fetch(request, env) {

    // A stub is a client Object used to invoke methods defined by the Durable Object

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");

    ...

  }

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import DurableObject, WorkerEntrypoint


# Durable Object

class MyDurableObject(DurableObject):

  pass


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    # A stub is a client Object used to invoke methods defined by the Durable Object

    stub = self.env.MY_DURABLE_OBJECT.getByName("foo")

    # ...


```

## Methods

### `idFromName`

`idFromName` creates a unique [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) which refers to an individual instance of the Durable Object class. Named Durable Objects are the most common method of referring to Durable Objects.

JavaScript

```

const fooId = env.MY_DURABLE_OBJECT.idFromName("foo");

const barId = env.MY_DURABLE_OBJECT.idFromName("bar");


```

#### Parameters

* A required string to be used to generate a [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) corresponding to the name of a Durable Object.

#### Return values

* A [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of a Durable Object class.

### `newUniqueId`

`newUniqueId` creates a randomly generated and unique [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) which refers to an individual instance of the Durable Object class. IDs created using `newUniqueId`, will need to be stored as a string in order to refer to the same Durable Object again in the future. For example, the ID can be stored in Workers KV, another Durable Object, or in a cookie in the user's browser.

JavaScript

```

const id = env.MY_DURABLE_OBJECT.newUniqueId();

const euId = env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" });


```

`newUniqueId` results in lower request latency at first use

The first time you get a Durable Object stub based on an ID derived from a name, the system has to take into account the possibility that a Worker on the opposite side of the world could have coincidentally accessed the same named Durable Object at the same time. To guarantee that only one instance of the Durable Object is created, the system must check that the Durable Object has not been created anywhere else. Due to the inherent limit of the speed of light, this round-the-world check can take up to a few hundred milliseconds. `newUniqueId` can skip this check.

After this first use, the location of the Durable Object will be cached around the world so that subsequent lookups are faster.

#### Parameters

* An optional object with the key `jurisdiction` and value of a [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction) string.

#### Return values

* A [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of the Durable Object class.

### `idFromString`

`idFromString` creates a [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) from a previously generated ID that has been converted to a string. This method throws an exception if the ID is invalid, for example, if the ID was not created from the same `DurableObjectNamespace`.

JavaScript

```

// Create a new unique ID

const id = env.MY_DURABLE_OBJECT.newUniqueId();

// Convert the ID to a string to be saved elsewhere, e.g. a session cookie

const session_id = id.toString();


...

// Recreate the ID from the string

const id = env.MY_DURABLE_OBJECT.idFromString(session_id);


```

#### Parameters

* A required string corresponding to a [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) previously generated either by `newUniqueId` or `idFromName`.

#### Return values

* A [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of a Durable Object class.

### `get`

`get` obtains a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) from a [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) which can be used to invoke methods on a Durable Object.

This method returns the stub immediately, often before a connection has been established to the Durable Object. This allows requests to be sent to the instance right away, without waiting for a network round trip.

JavaScript

```

const id = env.MY_DURABLE_OBJECT.newUniqueId();

const stub = env.MY_DURABLE_OBJECT.get(id);


```

#### Parameters

* A required [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id)
* An optional object with the key `locationHint` and value of a [locationHint](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) string.

#### Return values

* A [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) referring to an instance of a Durable Object class.

### `getByName`

`getByName` obtains a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) from a provided name, which can be used to invoke methods on a Durable Object.

This method returns the stub immediately, often before a connection has been established to the Durable Object. This allows requests to be sent to the instance right away, without waiting for a network round trip.

JavaScript

```

const fooStub = env.MY_DURABLE_OBJECT.getByName("foo");

const barStub = env.MY_DURABLE_OBJECT.getByName("bar");


```

#### Parameters

* A required string to be used to generate a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) corresponding to an instance of the Durable Object class with the provided name.
* An optional object with the key `locationHint` and value of a [locationHint](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) string.

#### Return values

* A [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) referring to an instance of a Durable Object class.

### `jurisdiction`

`jurisdiction` creates a subnamespace from a namespace where all Durable Object IDs and references created from that subnamespace will be restricted to the specified [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).

JavaScript

```

const subnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");

const euStub = subnamespace.getByName("foo");


```

#### Parameters

* A required [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction) string.

#### Return values

* A `DurableObjectNamespace` scoped to a particular regulatory or geographic jurisdiction. Additional geographic jurisdictions are continuously evaluated, so share requests in the [Durable Objects Discord channel ↗](https://discord.com/channels/595317990191398933/773219443911819284).

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/namespace/#page","headline":"Durable Object Namespace · Cloudflare Durable Objects docs","description":"API reference for DurableObjectNamespace, which creates IDs and obtains stubs to interact with Durable Objects.","url":"https://developers.cloudflare.com/durable-objects/api/namespace/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/namespace/","name":"Durable Object Namespace"}}]}
```
