---
title: Sub-agents
description: Spawn child agents with isolated storage and typed RPC using subAgent(), abortSubAgent(), and deleteSubAgent().
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sub-agents

Spawn child agents as co-located Durable Objects with their own isolated SQLite storage. The parent gets a typed RPC stub for calling methods on the child — every public method on the child class is callable as a remote procedure call with Promise-wrapped return types.

Use sub-agents when a single user or entity owns an open-ended set of long-lived agents, such as chats, documents, sessions, shards, or projects. Each sub-agent runs in parallel with its own state while the parent coordinates discovery, access control, and lifecycle.

If you want a parent chat agent to dispatch another chat-capable agent during a single turn and render that child's progress inline, use [Agents as tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/). Agents as tools are built on sub-agents, but add a parent-side run registry, streaming `agent-tool-event` frames, replay, cancellation, and cleanup.

## Quick start

* [  JavaScript ](#tab-panel-6199)
* [  TypeScript ](#tab-panel-6200)

JavaScript

```

import { Agent } from "agents";


export class Orchestrator extends Agent {

  async delegateWork() {

    const researcher = await this.subAgent(Researcher, "research-1");

    const findings = await researcher.search("cloudflare agents sdk");

    return findings;

  }

}


export class Researcher extends Agent {

  async search(query) {

    const results = await fetch(`https://api.example.com/search?q=${query}`);

    return results.json();

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class Orchestrator extends Agent {

  async delegateWork() {

    const researcher = await this.subAgent(Researcher, "research-1");

    const findings = await researcher.search("cloudflare agents sdk");

    return findings;

  }

}


export class Researcher extends Agent {

  async search(query: string) {

    const results = await fetch(`https://api.example.com/search?q=${query}`);

    return results.json();

  }

}


```

Both classes must be exported from the worker entry point. No separate Durable Object bindings are needed for child-only classes — child classes are discovered automatically via `ctx.exports`.

* [  wrangler.jsonc ](#tab-panel-6187)
* [  wrangler.toml ](#tab-panel-6188)

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

        "class_name": "Orchestrator",

        "name": "Orchestrator"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": [

        "Orchestrator"

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

class_name = "Orchestrator"

name = "Orchestrator"


[[migrations]]

new_sqlite_classes = ["Orchestrator"]

tag = "v1"


```

Only the top-level parent agent needs a Durable Object binding and migration. Child agents are created as facets of the parent — they share the same machine but have fully isolated SQLite storage.

## subAgent

Get or create a named sub-agent. The first call for a given name triggers the child's `onStart()`. Subsequent calls return the existing instance.

* [  JavaScript ](#tab-panel-6189)
* [  TypeScript ](#tab-panel-6190)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  async subAgent<T extends Agent>(

    cls: SubAgentClass<T>,

    name: string,

  ): Promise<SubAgentStub<T>>;

}


```

| Parameter | Type             | Description                                                                                                      |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| cls       | SubAgentClass<T> | The Agent subclass. Must be exported from the worker entry point, and the export name must match the class name. |
| name      | string           | Unique name for this child instance. The same name always returns the same child.                                |

Returns a `SubAgentStub<T>` — a typed RPC stub where every user-defined method on `T` is available as a Promise-returning remote call.

### SubAgentStub

The stub exposes all public instance methods you define on the child class. Methods inherited from `Agent` (lifecycle hooks, `setState`, `broadcast`, `sql`, and so on) are excluded — only your custom methods appear on the stub.

Return types are automatically wrapped in `Promise` if they are not already:

* [  JavaScript ](#tab-panel-6201)
* [  TypeScript ](#tab-panel-6202)

JavaScript

```

class MyChild extends Agent {

  greet(name) {

    return `Hello, ${name}`;

  }

  async fetchData(url) {

    return fetch(url).then((r) => r.json());

  }

}


// On the stub:

// greet(name: string) => Promise<string>       (sync → wrapped)

// fetchData(url: string) => Promise<unknown>   (already async → unchanged)


```

TypeScript

```

class MyChild extends Agent {

  greet(name: string): string {

    return `Hello, ${name}`;

  }

  async fetchData(url: string): Promise<unknown> {

    return fetch(url).then((r) => r.json());

  }

}


// On the stub:

// greet(name: string) => Promise<string>       (sync → wrapped)

// fetchData(url: string) => Promise<unknown>   (already async → unchanged)


```

### Requirements

* The child class must extend `Agent`
* The child class must be exported from the worker entry point (`export class MyChild extends Agent`)
* The export name must match the class name — `export { Foo as Bar }` is not supported
* The top-level parent class must be bound as a Durable Object namespace in `wrangler.jsonc`
* A facet-only child class does not need to be registered under `new_sqlite_classes` unless the same class is also bound as a top-level Durable Object elsewhere
* Nested facet parents do not need their own top-level Durable Object bindings; the runtime resolves nested children through the root parent namespace
* The child class name cannot be `Sub`, because `/sub/` is reserved as the URL separator for nested routes

### Notes for testing

Tests that use `@cloudflare/vitest-pool-workers` may need to list facet classes as test-only Durable Object bindings so `ctx.exports` provides a facet-compatible class value. Keep those facet classes out of `new_sqlite_classes`; the extra binding belongs only in test `wrangler.jsonc` files and is not a production Worker requirement.

## abortSubAgent

Forcefully stop a running sub-agent. The child stops executing immediately and restarts on the next `subAgent()` call. Storage is preserved — only the running instance is killed.

* [  JavaScript ](#tab-panel-6191)
* [  TypeScript ](#tab-panel-6192)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  abortSubAgent(cls: SubAgentClass, name: string, reason?: unknown): void;

}


```

| Parameter | Type          | Description                                       |
| --------- | ------------- | ------------------------------------------------- |
| cls       | SubAgentClass | The Agent subclass used when creating the child   |
| name      | string        | Name of the child to abort                        |
| reason    | unknown       | Error thrown to any pending or future RPC callers |

Abort is transitive — if the child has its own sub-agents, they are also aborted.

## deleteSubAgent

Abort the child (if running) and permanently wipe its storage. The next `subAgent()` call creates a fresh instance with empty SQLite.

* [  JavaScript ](#tab-panel-6193)
* [  TypeScript ](#tab-panel-6194)

JavaScript

```

class Agent {}


```

TypeScript

```

class Agent {

  deleteSubAgent(cls: SubAgentClass, name: string): void;

}


```

| Parameter | Type          | Description                                     |
| --------- | ------------- | ----------------------------------------------- |
| cls       | SubAgentClass | The Agent subclass used when creating the child |
| name      | string        | Name of the child to delete                     |

Deletion is transitive — the child's own sub-agents are also deleted.

## Introspection and access control

### `hasSubAgent`

Check whether a child has been spawned and not deleted. This is backed by a framework-maintained SQLite registry.

* [  JavaScript ](#tab-panel-6195)
* [  TypeScript ](#tab-panel-6196)

JavaScript

```

if (!this.hasSubAgent(Chat, id)) {

  return new Response("Not found", { status: 404 });

}


```

TypeScript

```

if (!this.hasSubAgent(Chat, id)) {

  return new Response("Not found", { status: 404 });

}


```

### `listSubAgents`

List spawned sub-agents, optionally filtered by class. Rows are returned in creation order.

* [  JavaScript ](#tab-panel-6197)
* [  TypeScript ](#tab-panel-6198)

JavaScript

```

const chats = this.listSubAgents(Chat);

// [{ className: "Chat", name: "chat-abc", createdAt: 1700000000000 }]


```

TypeScript

```

const chats = this.listSubAgents(Chat);

// [{ className: "Chat", name: "chat-abc", createdAt: 1700000000000 }]


```

### `onBeforeSubAgent`

Override this middleware hook on the parent to gate, mutate, or short-circuit incoming `/sub/` requests before the framework wakes the child. It mirrors `onBeforeConnect` and `onBeforeRequest`.

The hook can return:

| Return value | Effect                                    |
| ------------ | ----------------------------------------- |
| void         | Forward the original request to the child |
| Request      | Forward a modified request                |
| Response     | Short-circuit and do not wake the child   |

* [  JavaScript ](#tab-panel-6205)
* [  TypeScript ](#tab-panel-6206)

JavaScript

```

export class Inbox extends Agent {

  async onBeforeSubAgent(_request, { className, name }) {

    // Strict registry gate: only allow clients to reach chats that were created.

    if (!this.hasSubAgent(className, name)) {

      return new Response(`${className} "${name}" not found`, {

        status: 404,

      });

    }

  }

}


```

TypeScript

```

export class Inbox extends Agent {

  override async onBeforeSubAgent(_request, { className, name }) {

    // Strict registry gate: only allow clients to reach chats that were created.

    if (!this.hasSubAgent(className, name)) {

      return new Response(`${className} "${name}" not found`, {

        status: 404,

      });

    }

  }

}


```

WebSocket upgrade requests flow through this hook the same way as plain HTTP requests. If you return a modified `Request`, preserve the original WebSocket upgrade headers.

## Parent and child identity

Sub-agents know who their parent is through `this.parentPath` and `this.selfPath`.

* [  JavaScript ](#tab-panel-6207)
* [  TypeScript ](#tab-panel-6208)

JavaScript

```

// Inside a Chat spawned by Inbox:

this.parentPath;

// [{ className: "Inbox", name: "user-123" }]


this.selfPath;

// [

//   { className: "Inbox", name: "user-123" },

//   { className: "Chat", name: "chat-abc" }

// ]


```

TypeScript

```

// Inside a Chat spawned by Inbox:

this.parentPath;

// [{ className: "Inbox", name: "user-123" }]


this.selfPath;

// [

//   { className: "Inbox", name: "user-123" },

//   { className: "Chat", name: "chat-abc" }

// ]


```

`parentPath` is root-first, so the direct parent is always `parentPath.at(-1)`. Top-level agents have `parentPath === []`.

Use `parentAgent(Cls)` from a sub-agent to get a typed RPC stub to its immediate parent:

* [  JavaScript ](#tab-panel-6203)
* [  TypeScript ](#tab-panel-6204)

JavaScript

```

const inbox = await this.parentAgent(Inbox);

await inbox.recordTurn(this.name, "...");


```

TypeScript

```

const inbox = await this.parentAgent(Inbox);

await inbox.recordTurn(this.name, "...");


```

`parentAgent()` resolves the direct parent even when that parent is itself a facet-only sub-agent, using a root-side RPC bridge under the hood. This gives you typed method calls to the immediate parent without requiring every nested parent class to be bound as a top-level Durable Object.

For grandparents and further ancestors, iterate `this.parentPath` and call `getAgentByName()` directly. If the binding name does not match the class name, call `getAgentByName(env.MY_BINDING, this.parentPath.at(-1)!.name)` instead of `parentAgent()`.

## Client routing

### `useAgent({ sub })`

Extend any `useAgent` call with a `sub` chain to connect to a descendant facet:

* [  JavaScript ](#tab-panel-6209)
* [  TypeScript ](#tab-panel-6210)

JavaScript

```

const chat = useAgent({

  agent: "Inbox",

  name: userId,

  sub: [{ agent: "Chat", name: chatId }],

});


```

TypeScript

```

const chat = useAgent({

  agent: "Inbox",

  name: userId,

  sub: [{ agent: "Chat", name: chatId }],

});


```

The hook builds a URL like `/agents/inbox/user-123/sub/chat/chat-abc` and opens a direct WebSocket to the `Chat` child. Every other `useAgent` feature works as usual: state sync, `stub` calls, `@callable` RPC, and `useAgentChat` on top of the returned socket.

### Custom HTTP routing

For fetch handlers that do their own top-level URL parsing, use `routeSubAgentRequest()` to dispatch a request into a sub-agent from an already-resolved parent stub:

* [  JavaScript ](#tab-panel-6215)
* [  TypeScript ](#tab-panel-6216)

JavaScript

```

import { getAgentByName, routeSubAgentRequest } from "agents";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    const match = url.pathname.match(/^\/api\/u\/([^/]+)(\/.*)$/);

    if (!match) return new Response("Not found", { status: 404 });


    const [, userId, rest] = match;

    const parent = await getAgentByName(env.Inbox, userId);

    return routeSubAgentRequest(request, parent, { fromPath: rest });

  },

};


```

TypeScript

```

import { getAgentByName, routeSubAgentRequest } from "agents";


export default {

  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);

    const match = url.pathname.match(/^\/api\/u\/([^/]+)(\/.*)$/);

    if (!match) return new Response("Not found", { status: 404 });


    const [, userId, rest] = match;

    const parent = await getAgentByName(env.Inbox, userId);

    return routeSubAgentRequest(request, parent, { fromPath: rest });

  },

};


```

`fromPath` takes the sub-agent tail, such as `/sub/chat/chat-abc`. The helper parses it, runs the parent's `onBeforeSubAgent` hook, and forwards the request into the facet.

### External typed RPC

From inside the parent Durable Object, `this.subAgent(Cls, name)` returns a typed stub. From outside the parent, use `getSubAgentByName()`:

* [  JavaScript ](#tab-panel-6211)
* [  TypeScript ](#tab-panel-6212)

JavaScript

```

import { getAgentByName, getSubAgentByName } from "agents";


const inbox = await getAgentByName(env.Inbox, userId);

const chat = await getSubAgentByName(inbox, Chat, chatId);


await chat.addMessage({ role: "user", content: "hello" });


```

TypeScript

```

import { getAgentByName, getSubAgentByName } from "agents";


const inbox = await getAgentByName(env.Inbox, userId);

const chat = await getSubAgentByName(inbox, Chat, chatId);


await chat.addMessage({ role: "user", content: "hello" });


```

`getSubAgentByName()` returns an RPC-only proxy. Method calls work, but `.fetch()` throws. Use `routeSubAgentRequest()` for HTTP and WebSocket forwarding.

## Storage isolation

Each sub-agent has its own SQLite database, completely isolated from the parent and from other sub-agents. A parent writing to `this.sql` and a child writing to `this.sql` operate on different databases:

* [  JavaScript ](#tab-panel-6221)
* [  TypeScript ](#tab-panel-6222)

JavaScript

```

export class Parent extends Agent {

  async demonstrate() {

    this.sql`INSERT INTO parent_data (key, value) VALUES ('color', 'blue')`;


    const child = await this.subAgent(Child, "child-1");

    await child.increment("clicks");


    // Parent's SQL and child's SQL are completely separate

  }

}


export class Child extends Agent {

  async increment(key) {

    this

      .sql`CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER DEFAULT 0)`;

    this

      .sql`INSERT INTO counters (key, value) VALUES (${key}, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1`;

    const row = this.sql`SELECT value FROM counters WHERE key = ${key}`.one();

    return row?.value ?? 0;

  }

}


```

TypeScript

```

export class Parent extends Agent {

  async demonstrate() {

    this.sql`INSERT INTO parent_data (key, value) VALUES ('color', 'blue')`;


    const child = await this.subAgent(Child, "child-1");

    await child.increment("clicks");


    // Parent's SQL and child's SQL are completely separate

  }

}


export class Child extends Agent {

  async increment(key: string): Promise<number> {

    this

      .sql`CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER DEFAULT 0)`;

    this

      .sql`INSERT INTO counters (key, value) VALUES (${key}, 1) ON CONFLICT(key) DO UPDATE SET value = value + 1`;

    const row = this.sql<{

      value: number;

    }>`SELECT value FROM counters WHERE key = ${key}`.one();

    return row?.value ?? 0;

  }

}


```

## Naming and identity

Two different classes can share the same user-facing name — they are resolved independently. The internal key is a composite of class name and facet name:

* [  JavaScript ](#tab-panel-6213)
* [  TypeScript ](#tab-panel-6214)

JavaScript

```

const counter = await this.subAgent(Counter, "shared-name");

const logger = await this.subAgent(Logger, "shared-name");

// These are two separate sub-agents with separate storage


```

TypeScript

```

const counter = await this.subAgent(Counter, "shared-name");

const logger = await this.subAgent(Logger, "shared-name");

// These are two separate sub-agents with separate storage


```

The child's `this.name` property returns the facet name (not the parent's name):

* [  JavaScript ](#tab-panel-6217)
* [  TypeScript ](#tab-panel-6218)

JavaScript

```

export class Child extends Agent {

  getName() {

    return this.name; // Returns "shared-name", not the parent's ID

  }

}


```

TypeScript

```

export class Child extends Agent {

  getName(): string {

    return this.name; // Returns "shared-name", not the parent's ID

  }

}


```

## Patterns

### Parallel sub-agents

Run multiple sub-agents concurrently:

* [  JavaScript ](#tab-panel-6219)
* [  TypeScript ](#tab-panel-6220)

JavaScript

```

export class Orchestrator extends Agent {

  async runAll(queries) {

    const results = await Promise.all(

      queries.map(async (query, i) => {

        const worker = await this.subAgent(Researcher, `research-${i}`);

        return worker.search(query);

      }),

    );

    return results;

  }

}


```

TypeScript

```

export class Orchestrator extends Agent {

  async runAll(queries: string[]) {

    const results = await Promise.all(

      queries.map(async (query, i) => {

        const worker = await this.subAgent(Researcher, `research-${i}`);

        return worker.search(query);

      }),

    );

    return results;

  }

}


```

### Nested sub-agents

Sub-agents can spawn their own sub-agents, forming a tree:

* [  JavaScript ](#tab-panel-6223)
* [  TypeScript ](#tab-panel-6224)

JavaScript

```

export class Manager extends Agent {

  async delegate(task) {

    const team = await this.subAgent(TeamLead, "team-a");

    return team.assign(task);

  }

}


export class TeamLead extends Agent {

  async assign(task) {

    const worker = await this.subAgent(Worker, "worker-1");

    return worker.execute(task);

  }

}


export class Worker extends Agent {

  async execute(task) {

    return { completed: task };

  }

}


```

TypeScript

```

export class Manager extends Agent {

  async delegate(task: string) {

    const team = await this.subAgent(TeamLead, "team-a");

    return team.assign(task);

  }

}


export class TeamLead extends Agent {

  async assign(task: string) {

    const worker = await this.subAgent(Worker, "worker-1");

    return worker.execute(task);

  }

}


export class Worker extends Agent {

  async execute(task: string) {

    return { completed: task };

  }

}


```

### Callback streaming

Pass an `RpcTarget` callback to stream results from a sub-agent back to the parent:

* [  JavaScript ](#tab-panel-6225)
* [  TypeScript ](#tab-panel-6226)

JavaScript

```

import { RpcTarget } from "cloudflare:workers";


class StreamCollector extends RpcTarget {

  chunks = [];

  onChunk(text) {

    this.chunks.push(text);

  }

}


export class Parent extends Agent {

  async streamFromChild() {

    const child = await this.subAgent(Streamer, "streamer-1");

    const collector = new StreamCollector();

    await child.generate("Write a poem", collector);

    return collector.chunks;

  }

}


export class Streamer extends Agent {

  async generate(prompt, callback) {

    const chunks = ["Once ", "upon ", "a ", "time..."];

    for (const chunk of chunks) {

      callback.onChunk(chunk);

    }

  }

}


```

TypeScript

```

import { RpcTarget } from "cloudflare:workers";


class StreamCollector extends RpcTarget {

  chunks: string[] = [];

  onChunk(text: string) {

    this.chunks.push(text);

  }

}


export class Parent extends Agent {

  async streamFromChild() {

    const child = await this.subAgent(Streamer, "streamer-1");

    const collector = new StreamCollector();

    await child.generate("Write a poem", collector);

    return collector.chunks;

  }

}


export class Streamer extends Agent {

  async generate(prompt: string, callback: StreamCollector) {

    const chunks = ["Once ", "upon ", "a ", "time..."];

    for (const chunk of chunks) {

      callback.onChunk(chunk);

    }

  }

}


```

## Scheduling and durable work

Sub-agents can schedule their own callbacks and run durable fibers:

| Method                              | Behavior in sub-agent                                                      |
| ----------------------------------- | -------------------------------------------------------------------------- |
| schedule() / scheduleEvery()        | Work normally and run callbacks inside the sub-agent                       |
| cancelSchedule()                    | Works for schedules owned by the calling sub-agent                         |
| getScheduleById() / listSchedules() | Work and return schedules scoped to the calling sub-agent                  |
| keepAlive() / keepAliveWhile()      | Work by delegating the heartbeat to the top-level parent                   |
| runFiber()                          | Works, with fiber rows and snapshots stored in the child's SQLite database |
| setState()                          | Works normally and writes to the child's own storage                       |
| this.sql                            | Works normally and points at the child's own SQLite database               |
| subAgent()                          | Works, so sub-agents can spawn their own children                          |

The top-level parent still owns the physical Durable Object alarm because facets do not have independent alarm slots. The Agents SDK records which child owns each scheduled callback or recovery check, wakes the parent, and routes the work back into the child. The callback still runs with the sub-agent as `this`, so it uses the child's state, SQLite storage, and `getCurrentAgent()` context.

The older synchronous `getSchedule()` and `getSchedules()` APIs throw inside sub-agents because scheduled rows are stored on the top-level parent. Use `getScheduleById()` and `listSchedules()` instead.

Calling `this.destroy()` inside a sub-agent delegates cleanup to the parent. The parent cancels that sub-agent's schedules, removes recovery metadata for the sub-agent and its descendants, removes the registry entry, and asks the runtime to wipe the child storage. Treat `this.destroy()` as fire-and-forget because deleting the sub-agent can abort its isolate before the method returns cleanly.

## Example

[ Multi-session chat example ](https://github.com/cloudflare/agents/tree/main/examples/multi-ai-chat) Build an inbox where each chat is an AIChatAgent sub-agent with isolated state and direct client routing. 

## Related

* [Think](https://developers.cloudflare.com/agents/harnesses/think/) — `chat()` method for streaming AI turns through sub-agents
* [Long-running agents](https://developers.cloudflare.com/agents/concepts/agentic-patterns/long-running-agents/) — sub-agent delegation in the context of multi-week agent lifetimes
* [Callable methods](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) — RPC via `@callable` and service bindings
* [Agents as tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/) — run Think or `AIChatAgent` sub-agents as retained, streaming tools
* [Schedule tasks](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) — scheduling primitives for top-level agents and sub-agents

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/sub-agents/#page","headline":"Sub-agents · Cloudflare Agents docs","description":"Spawn child agents with isolated storage and typed RPC using subAgent(), abortSubAgent(), and deleteSubAgent().","url":"https://developers.cloudflare.com/agents/runtime/execution/sub-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/sub-agents/","name":"Sub-agents"}}]}
```
