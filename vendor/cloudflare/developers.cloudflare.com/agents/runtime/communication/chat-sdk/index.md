---
title: Chat SDK
description: Integrate Chat SDK with Agents, including durable state for subscriptions, locks, queues, and message history.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Chat SDK

Use `agents/chat-sdk` when you run the [Chat SDK ↗](https://chat-sdk.dev/) inside an Agent. The first integration helper is a Chat SDK `StateAdapter` that stores state in Agents sub-agents.

The adapter stores Chat SDK subscriptions, locks, queues, dedupe keys, thread state, channel state, callback metadata, transcript lists, and thread history in Durable Object SQLite. Each state shard is a `ChatSdkStateAgent` sub-agent under your ingress Agent.

## Install

Install both packages in the Worker that hosts your messenger ingress:

 npm  yarn  pnpm  bun 

```
npm i agents chat
```

```
yarn add agents chat
```

```
pnpm add agents chat
```

```
bun add agents chat
```

`agents/chat-sdk` provides durable state for Chat SDK. Use it with any Chat SDK adapter, such as Telegram, Slack, Discord, Teams, or Google Chat.

## Basic setup

Create a parent Agent that owns your Chat SDK runtime. Pass `createChatSdkState()` as the Chat SDK `state` option.

* [  JavaScript ](#tab-panel-5875)
* [  TypeScript ](#tab-panel-5876)

JavaScript

```

import { Agent } from "agents";

import { createChatSdkState } from "agents/chat-sdk";

import { Chat } from "chat";

import { createTelegramAdapter } from "@chat-adapter/telegram";


export { ChatSdkStateAgent } from "agents/chat-sdk";


export class MessengerAgent extends Agent {

  chat;


  onStart() {

    const telegram = createTelegramAdapter({

      botToken: this.env.TELEGRAM_BOT_TOKEN,

      mode: "webhook",

      userName: "my_bot",

    });


    this.chat = new Chat({

      adapters: { telegram },

      userName: "my_bot",

      state: createChatSdkState(),

      concurrency: { strategy: "burst", debounceMs: 600 },

    });

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { createChatSdkState } from "agents/chat-sdk";

import { Chat } from "chat";

import { createTelegramAdapter } from "@chat-adapter/telegram";


export { ChatSdkStateAgent } from "agents/chat-sdk";


export class MessengerAgent extends Agent<Env> {

  private chat!: Chat;


  onStart() {

    const telegram = createTelegramAdapter({

      botToken: this.env.TELEGRAM_BOT_TOKEN,

      mode: "webhook",

      userName: "my_bot",

    });


    this.chat = new Chat({

      adapters: { telegram },

      userName: "my_bot",

      state: createChatSdkState(),

      concurrency: { strategy: "burst", debounceMs: 600 },

    });

  }

}


```

Add the parent Agent to your Durable Object migration:

* [  wrangler.jsonc ](#tab-panel-5865)
* [  wrangler.toml ](#tab-panel-5866)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "MessengerAgent",

        "name": "MessengerAgent"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": [

        "MessengerAgent"

      ],

      "tag": "v1"

    }

  ]

}


```

TOML

```

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = ["nodejs_compat"]


[[durable_objects.bindings]]

class_name = "MessengerAgent"

name = "MessengerAgent"


[[migrations]]

new_sqlite_classes = ["MessengerAgent"]

tag = "v1"


```

Export `ChatSdkStateAgent` from your Worker entry point so sub-agent routing can resolve it. When `createChatSdkState()` is called inside an Agent lifecycle method or request handler, it uses the current Agent as the parent and creates state shards with `this.subAgent()`.

## State sharding

By default, Chat SDK state is sharded by the first two colon-separated segments of a thread-like key.

For example, `telegram:-100123:456` and `telegram:-100123:789` share the same state shard, `telegram:-100123`.

The default key sharder recognizes these Chat SDK key prefixes:

* `thread-state:`
* `channel-state:`
* `msg-history:`
* `transcripts:user:`

Unknown keys use the adapter's default shard name, `default`.

## Custom sharding

Use `shardKey` to control how thread IDs map to state sub-agent names:

* [  JavaScript ](#tab-panel-5867)
* [  TypeScript ](#tab-panel-5868)

JavaScript

```

const state = createChatSdkState({

  shardKey(threadId) {

    return threadId.split(":").slice(0, 2).join(":");

  },

});


```

TypeScript

```

const state = createChatSdkState({

  shardKey(threadId) {

    return threadId.split(":").slice(0, 2).join(":");

  },

});


```

Use `keyShard` when an adapter stores non-thread-shaped keys that should still route to a provider-specific shard:

* [  JavaScript ](#tab-panel-5873)
* [  TypeScript ](#tab-panel-5874)

JavaScript

```

const state = createChatSdkState({

  keyShard(key) {

    if (!key.startsWith("dedupe:telegram:")) {

      return undefined;

    }


    const chatId = key.slice("dedupe:telegram:".length).split(":")[0];

    return chatId ? `telegram:${chatId}` : undefined;

  },

});


```

TypeScript

```

const state = createChatSdkState({

  keyShard(key) {

    if (!key.startsWith("dedupe:telegram:")) {

      return undefined;

    }


    const chatId = key.slice("dedupe:telegram:".length).split(":")[0];

    return chatId ? `telegram:${chatId}` : undefined;

  },

});


```

Returning `undefined` falls back to the built-in key sharder and then to the default shard.

## API

### `createChatSdkState(options)`

Creates a Chat SDK `StateAdapter` backed by a `ChatSdkStateAgent` sub-agent.

* [  JavaScript ](#tab-panel-5871)
* [  TypeScript ](#tab-panel-5872)

JavaScript

```

import { createChatSdkState } from "agents/chat-sdk";


export { ChatSdkStateAgent } from "agents/chat-sdk";


const state = createChatSdkState({

  // parent: this // Optional. Defaults to the current Agent from getCurrentAgent().

});


```

TypeScript

```

import { createChatSdkState } from "agents/chat-sdk";


export { ChatSdkStateAgent } from "agents/chat-sdk";


const state = createChatSdkState({

  // parent: this // Optional. Defaults to the current Agent from getCurrentAgent().

});


```

Options:

| Option   | Description                                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| agent    | Optional custom subclass of ChatSdkStateAgent. Defaults to ChatSdkStateAgent.                                                 |
| parent   | Optional parent Agent that will call subAgent() to create state shards. Defaults to the current Agent from getCurrentAgent(). |
| name     | Default shard name for keys that cannot be mapped. Defaults to default.                                                       |
| shardKey | Maps Chat SDK thread IDs and lock keys to a shard name.                                                                       |
| keyShard | Maps generic Chat SDK cache or list keys to a shard name.                                                                     |

### `ChatSdkStateAgent`

The sub-agent class that stores state in SQLite. Export it from your Worker entry point so the runtime can create it.

* [  JavaScript ](#tab-panel-5869)
* [  TypeScript ](#tab-panel-5870)

JavaScript

```

export { ChatSdkStateAgent } from "agents/chat-sdk";


```

TypeScript

```

export { ChatSdkStateAgent } from "agents/chat-sdk";


```

### `ChatSdkStateAdapter`

The concrete `StateAdapter` implementation returned by `createChatSdkState()`. Most applications do not need to instantiate it directly.

## What is stored

The adapter implements the full Chat SDK `StateAdapter` interface:

* Subscriptions for `thread.subscribe()` and `thread.unsubscribe()`.
* Locks for per-thread or per-channel concurrency.
* Pending message queues for `queue`, `debounce`, and `burst` concurrency strategies.
* Generic key-value cache entries with optional TTL.
* Append-only lists with max-length trimming and list-level TTL refresh.

Chat SDK features built on these primitives include:

* Message deduplication.
* Thread and channel state.
* Persistent thread history for adapters that opt in to `persistThreadHistory`.
* Callback URL token storage.
* Modal context storage.
* Cross-platform transcripts.

## Cleanup behavior

TTL reads are strict: expired locks, cache values, queue entries, and list entries are ignored or deleted before they are returned.

Physical cleanup is lazy. `ChatSdkStateAgent` schedules one cleanup callback for the earliest known expiry and reschedules after cleanup runs. This keeps idle shards quiet while preventing expired rows from accumulating indefinitely.

## Example

[ Chat SDK messenger example ](https://github.com/cloudflare/agents/tree/main/examples/chat-sdk-messenger) Build a Telegram messenger bot with Chat SDK state in sub-agents, burst/debounce concurrency, and Think-backed AI replies running in managed fibers. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/communication/chat-sdk/#page","headline":"Chat SDK · Cloudflare Agents docs","description":"Integrate Chat SDK with Agents, including durable state for subscriptions, locks, queues, and message history.","url":"https://developers.cloudflare.com/agents/runtime/communication/chat-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/communication/","name":"Communication"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/communication/chat-sdk/","name":"Chat SDK"}}]}
```
