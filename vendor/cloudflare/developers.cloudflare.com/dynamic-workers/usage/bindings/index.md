---
title: Bindings
description: Give Dynamic Workers access to external APIs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bindings

Bindings let you control what a Dynamic Worker can access. When you create a Dynamic Worker, you decide exactly what resources and operations it can use.

This allows you to:

* **Give each Dynamic Worker its own resources** — Partition a [KV](https://developers.cloudflare.com/kv/) namespace, [R2](https://developers.cloudflare.com/r2/) bucket, or database so each worker only sees its own data.
* **Expose custom capabilities** — Define your own methods that Dynamic Workers can call — like posting to a chat room, sending an email, or querying an internal service. You design the interface and the Dynamic Worker just calls it.
* **Restrict and control access** — Inspect, transform, or reject calls before they reach the underlying resource.

## Custom Bindings with Dynamic Workers

With custom bindings, you:

* **Define the binding implementation in your loader Worker**: You create a class with methods. Because this runs in your loader Worker, that's where you can add authentication, logging, scope access per customer.
* **Pass it to the Dynamic Worker as a binding**: It just calls methods like `this.env.CHAT_ROOM.post("Hello!")` without knowing anything about the implementation behind it.

### How it works

#### Step 1: Define the binding

To create a custom binding, your loader Worker needs to implement a [WorkerEntrypoint class](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc#the-workerentrypoint-class) and export it. The methods you define on this class are the methods the Dynamic Worker will be able to call.

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class ChatRoom extends WorkerEntrypoint {

  async post(text: string): Promise<void> {

    // Your implementation here

  }

}


```

#### Step 2: Pass it to the Dynamic Worker

Your loader Worker will then create an instance of the exported class, called a stub, and pass it into the Dynamic Worker's `env`.

TypeScript

```

let chatRoom = ctx.exports.ChatRoom({ props: { roomName: "#bot-chat" } });


let worker = env.LOADER.load({

  env: { CHAT_ROOM: chatRoom },

  // ...

});


```

From the Dynamic Worker's perspective, `CHAT_ROOM` just looks like a regular binding with methods it can call:

TypeScript

```

// Inside the Dynamic Worker

await this.env.CHAT_ROOM.post("Hello!");


```

#### Step 3: Customize per user with props

One class can serve many different Dynamic Workers. Instead of defining a separate class for each user, you pass in `props` when creating the stub, which contains information specific to that user.

TypeScript

```

// Same class, different props per user

let aliceRoom = ctx.exports.ChatRoom({ props: { roomName: "#alice", apiKey: ALICE_KEY } });

let bobRoom   = ctx.exports.ChatRoom({ props: { roomName: "#bob", apiKey: BOB_KEY } });


```

When the Dynamic Worker calls a method on the binding, it's actually making a call back to your loader Worker, that's where the method runs. Inside that method, you can read the `props` via [this.ctx.props](https://developers.cloudflare.com/workers/runtime-apis/context#props). Only the loader Worker has access to the props, the Dynamic Worker never sees them.

TypeScript

```

export class ChatRoom extends WorkerEntrypoint<Cloudflare.Env, ChatRoomProps> {

  async post(text: string): Promise<void> {

    // Props are set when the stub is created — the Dynamic Worker never sees them

    let roomName = this.ctx.props.roomName;

    await postToChat(roomName, text);

  }

}


```

### Example: Chat room agent

Here's a complete example putting it all together. Say you're building a platform where AI agents can post to chat rooms. Each agent should only be able to post to its assigned room and it should never see the API key used to authenticate.

You define a `ChatRoom` class in your parent Worker. This class has a `post` method, the only method the Dynamic Worker can call on this binding. Inside this class, you control which room the message goes to, which API key is used, and what name is attached to the message.

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class ChatRoom extends WorkerEntrypoint<Cloudflare.Env, ChatRoomProps> {

  async post(text: string): Promise<void> {

    let { apiKey, botName, roomName } = this.ctx.props;


    // Prefix the message with the bot's name.

    text = `[${botName}]: ${text}`;


    // Send it to the chat service.

    await postToChat(apiKey, roomName, text);

  }

}


type ChatRoomProps = {

  apiKey: string;

  roomName: string;

  botName: string;

};


```

You export one `ChatRoom` class, but each stub you create can have different `props` — a different room name, a different API key, a different bot name. The `props` are set when you create the stub, and the Dynamic Worker never sees them.

Now pass it to a Dynamic Worker:

TypeScript

```

// Create a stub scoped to a specific room.

let chatRoom = ctx.exports.ChatRoom({

  props: {

    apiKey,

    roomName: "#bot-chat",

    botName: "Robo",

  },

});


let worker = env.LOADER.load({

  env: {

    CHAT_ROOM: chatRoom,

  },

  compatibilityDate: "$today",

  mainModule: "index.js",

  modules: {

    "index.js": `

      export class Agent extends WorkerEntrypoint {

        async run() {

          // This is all the Dynamic Worker sees.

          await this.env.CHAT_ROOM.post("Hello!");

        }

      }

    `,

  },

  globalOutbound: null,

});


return worker.getEntrypoint("Agent").run();


```

The agent just calls `this.env.CHAT_ROOM.post("Hello!")`. It has no way to post to a different room, see or use the API key, or change the bot name attached to its messages.

### Tip: Tell your agent about the types

For an AI agent to write code against your bindings, it needs to know the interface. Give your agent TypeScript type declarations with doc comments describing each method. Modern LLMs understand TypeScript well, making it the most concise way to describe a JavaScript API. This works even if the agent is writing plain JavaScript.

Make sure your `WorkerEntrypoint` class extends the TypeScript type so the declarations stay in sync with the implementation.

## Passing normal Workers bindings

To pass resources like a [KV](https://developers.cloudflare.com/kv/) namespace or [R2](https://developers.cloudflare.com/r2/) bucket to a Dynamic Worker, you need to bind the resource to your loader Worker and create a custom binding that wraps it. You can scope access per customer by prefixing keys and defining only the methods you want to expose.

### Example: Scoping a KV namespace per customer

First, bind the KV namespace to your loader Worker. Then in your loader Worker, export a class that uses the KV binding and defines the methods Dynamic Workers can call:

TypeScript

```

import { WorkerEntrypoint } from "cloudflare:workers";


export class MyStorage extends WorkerEntrypoint<Cloudflare.Env, MyStorageProps> {

  // Export this class from your loader Worker

  // The Dynamic Worker will be able to call get() and put()

  async get(key: string): Promise<string | null> {

    // Prefix the key so this customer can only access their own data

    return this.env.MY_KV.get(`${this.ctx.props.prefix}:${key}`);

  }


  async put(key: string, value: string): Promise<void> {

    await this.env.MY_KV.put(`${this.ctx.props.prefix}:${key}`, value);

  }

}


type MyStorageProps = {

  prefix: string;

};


```

Then pass it to the Dynamic Worker with a customer-specific prefix:

TypeScript

```

// Create a stub scoped to this customer's prefix

let storage = ctx.exports.MyStorage({

  props: { prefix: `customer-${customerId}` },

});


let worker = env.LOADER.load({

  env: { STORAGE: storage },

  // ...

});


```

The Dynamic Worker just uses it like any other binding:

TypeScript

```

// Inside the Dynamic Worker, it just sees STORAGE with get and put

let value = await this.env.STORAGE.get("settings");

await this.env.STORAGE.put("settings", "dark-mode");


```

This same pattern works for any resource your loader Worker has access to — [R2](https://developers.cloudflare.com/r2/) buckets or [D1](https://developers.cloudflare.com/d1/) databases. Bind the resource to your loader Worker, export a class that uses it, and pass the stub to the Dynamic Worker.

For persistent storage that lives with each Dynamic Worker, see [Durable Object Facets](https://developers.cloudflare.com/dynamic-workers/usage/durable-object-facets/).

## Capability-based Sandboxing

Custom bindings follow a capability-based security model — a Dynamic Worker can only access what you explicitly give it. If it hasn't received a stub for something, it can't access it.

This is powered by Workers RPC, also known as [Cap'n Web ↗](https://github.com/cloudflare/capnweb), an RPC system designed to pass object references across security boundaries. When a Dynamic Worker receives a stub, it can call that object's methods and each call is an RPC back to the original object in your loader Worker. Stubs have no global identifier and cannot be forged, the only way to obtain one is to receive it.

Capability-based security is essential to the design of most successful sandboxes, though it's usually hidden as an implementation detail — Android has Binder, Chrome has Mojo, and Cloudflare Workers has Cap'n Web. Dynamic Workers directly expose this power to you, the developer, so that you can build your own strong sandbox.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/usage/bindings/#page","headline":"Bindings · Cloudflare Dynamic Workers docs","description":"Give Dynamic Workers access to external APIs.","url":"https://developers.cloudflare.com/dynamic-workers/usage/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/usage/","name":"Usage"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/usage/bindings/","name":"Bindings"}}]}
```
