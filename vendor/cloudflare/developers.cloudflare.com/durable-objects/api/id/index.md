---
title: Durable Object ID
description: API reference for DurableObjectId, the 64-digit hex identifier used to address a Durable Object.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Object ID

## Description

A Durable Object ID is a 64-digit hexadecimal number used to identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable Object IDs are constructed indirectly via the [DurableObjectNamespace](https://developers.cloudflare.com/durable-objects/api/namespace) interface.

The `DurableObjectId` interface refers to a new or existing Durable Object. This interface is most frequently used by [DurableObjectNamespace::get](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to obtain a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) for submitting requests to a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after creating a stub from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

Logging

If you are experiencing an issue with a particular Durable Object, you may wish to log the `DurableObjectId` from your Worker and include it in your Cloudflare support request.

## Methods

### `toString`

`toString` converts a `DurableObjectId` to a 64 digit hex string. This string is useful for logging purposes or storing the `DurableObjectId` elsewhere, for example, in a session cookie. This string can be used to reconstruct a `DurableObjectId` via `DurableObjectNamespace::idFromString`.

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

* None.

#### Return values

* A 64 digit hex string.

### `equals`

`equals` is used to compare equality between two instances of `DurableObjectId`.

* [  JavaScript ](#tab-panel-8191)
* [  Python ](#tab-panel-8192)

JavaScript

```

const id1 = env.MY_DURABLE_OBJECT.newUniqueId();

const id2 = env.MY_DURABLE_OBJECT.newUniqueId();

console.assert(!id1.equals(id2), "Different unique ids should never be equal.");


```

Python

```

id1 = env.MY_DURABLE_OBJECT.newUniqueId()

id2 = env.MY_DURABLE_OBJECT.newUniqueId()

assert not id1.equals(id2), "Different unique ids should never be equal."


```

#### Parameters

* A required `DurableObjectId` to compare against.

#### Return values

* A boolean. True if equal and false otherwise.

## Properties

### `name`

`name` is an optional property of a `DurableObjectId`, which returns the name that was used to create the `DurableObjectId` via [DurableObjectNamespace::idFromName](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname). This value is undefined if the `DurableObjectId` was constructed using [DurableObjectNamespace::newUniqueId](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

The `name` property is also available on `ctx.id` inside the Durable Object when the caller uses `idFromName()` or `getByName()`. `ctx.id.name` will be `undefined` in the following cases:

* The caller accesses the Durable Object using `idFromString()`, even if the ID was originally created with `idFromName()`.
* Names longer than 1,024 bytes are not passed through to `ctx.id`.
* The Durable Object was created with `newUniqueId()`.

Alarms

`ctx.id.name` is especially useful inside [alarm handlers](https://developers.cloudflare.com/durable-objects/api/alarms/), where there is no calling client to pass the name as an argument. When the alarm fires, `ctx.id.name` holds the same name the object was originally accessed with.

Alarms created before 2026-03-15 do not have `name` stored. When such an alarm fires, `ctx.id.name` will be `undefined`, and any new alarm scheduled from that handler will also lack a `name`. To fix this, reschedule the alarm from a `fetch()` or RPC handler where `name` is available.

* [  JavaScript ](#tab-panel-8193)
* [  TypeScript ](#tab-panel-8194)
* [  Python ](#tab-panel-8195)

JavaScript

```

const uniqueId = env.MY_DURABLE_OBJECT.newUniqueId();

const fromNameId = env.MY_DURABLE_OBJECT.idFromName("foo");

console.assert(uniqueId.name === undefined, "unique ids have no name");

console.assert(

  fromNameId.name === "foo",

  "name matches parameter to idFromName",

);


```

TypeScript

```

const uniqueId: DurableObjectId = env.MY_DURABLE_OBJECT.newUniqueId();

const fromNameId: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName("foo");

console.assert(uniqueId.name === undefined, "unique ids have no name");

console.assert(

  fromNameId.name === "foo",

  "name matches parameter to idFromName",

);


```

Python

```

unique_id = env.MY_DURABLE_OBJECT.newUniqueId()

from_name_id = env.MY_DURABLE_OBJECT.idFromName("foo")

assert unique_id.name is None, "unique ids have no name"

assert from_name_id.name == "foo", "name matches parameter to idFromName"


```

The same `name` is available inside the Durable Object via `ctx.id.name`:

* [  JavaScript ](#tab-panel-8196)
* [  TypeScript ](#tab-panel-8197)
* [  Python ](#tab-panel-8198)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


export class ChatRoom extends DurableObject {

  async getRoomName() {

    return this.ctx.id.name; // "foo" when accessed via getByName("foo")

  }

}


```

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export class ChatRoom extends DurableObject<Env> {

  async getRoomName(): Promise<string | undefined> {

    return this.ctx.id.name; // "foo" when accessed via getByName("foo")

  }

}


```

Python

```

from workers import DurableObject


class ChatRoom(DurableObject):

    async def get_room_name(self):

        return self.ctx.id.name  # "foo" when accessed via get_by_name("foo")


```

### `jurisdiction`

`jurisdiction` is an optional property of a `DurableObjectId`, which returns the [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction) the ID is restricted to, such as `"eu"` or `"fedramp"`. The same value is available inside the Durable Object via `ctx.id.jurisdiction`, including in [alarm handlers](https://developers.cloudflare.com/durable-objects/api/alarms/) and objects accessed via `idFromString()`, so you can make region-aware decisions without passing the jurisdiction as an argument or persisting it in storage.

`jurisdiction` is preserved across every ID-construction path, including:

* IDs created from a jurisdiction-restricted subnamespace, for example `env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("foo")` or `.newUniqueId()`.
* IDs created via `env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" })`.
* IDs restored from a string via `idFromString()` — the jurisdiction is encoded in the string itself, so it works on any namespace binding.

`ctx.id.jurisdiction` is `undefined` in two cases:

* The Durable Object was not created in a jurisdiction-restricted namespace.
* The Durable Object's alarm was scheduled before 2026-03-15\. To backfill the value, reschedule the alarm from a `fetch()` or RPC handler.

* [  JavaScript ](#tab-panel-8199)
* [  Python ](#tab-panel-8200)

JavaScript

```

const plainId = env.MY_DURABLE_OBJECT.idFromName("foo");

const euId = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("foo");

console.assert(plainId.jurisdiction === undefined, "no jurisdiction set");

console.assert(euId.jurisdiction === "eu", "jurisdiction matches namespace");


```

Python

```

plain_id = env.MY_DURABLE_OBJECT.idFromName("foo")

eu_id = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("foo")

assert plain_id.jurisdiction is None, "no jurisdiction set"

assert eu_id.jurisdiction == "eu", "jurisdiction matches namespace"


```

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/id/#page","headline":"Durable Object ID · Cloudflare Durable Objects docs","description":"API reference for DurableObjectId, the 64-digit hex identifier used to address a Durable Object.","url":"https://developers.cloudflare.com/durable-objects/api/id/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/id/","name":"Durable Object ID"}}]}
```
