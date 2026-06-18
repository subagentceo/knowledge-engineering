---
title: Think
description: Opinionated chat agent framework with built-in tools, persistent memory, lifecycle hooks, streaming, messengers, scheduled tasks, Workflows, and sub-agent RPC.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Think

`@cloudflare/think` lets you build a stateful AI chat agent — one that streams replies, remembers the conversation, and calls tools — by extending a single base class. You provide a model with `getModel()`, and Think wires up the rest of the chat lifecycle for you: the agentic loop (the model calls tools, reads the results, and keeps going until it has an answer), message persistence, streaming, client tools, stream resumption, and extensions — all backed by Durable Object SQLite.

Think works as both a **top-level agent** (WebSocket chat to browser clients via `useAgentChat`) and a **sub-agent** (a child agent that another agent drives over RPC via `chat()`).

New to Cloudflare Agents?

If this is your first agent, start with the [Getting started tutorial](https://developers.cloudflare.com/agents/harnesses/think/getting-started/) for a guided build. For the bigger picture of what agents are and how they run, read [What are agents?](https://developers.cloudflare.com/agents/concepts/what-are-agents/). Think builds on two Cloudflare primitives worth a quick look: [Workers AI](https://developers.cloudflare.com/workers-ai/) provides the model, and each agent instance is a [Durable Object](https://developers.cloudflare.com/durable-objects/) that stores its state. The rest of this section is reference material you can dip into as you need it.

## Quick start

### Install

Terminal window

```

npm install @cloudflare/think @cloudflare/ai-chat agents ai @cloudflare/shell zod workers-ai-provider


```

### Server

* [  JavaScript ](#tab-panel-5565)
* [  TypeScript ](#tab-panel-5566)

JavaScript

```

import { Think } from "@cloudflare/think";

import { createWorkersAI } from "workers-ai-provider";

import { routeAgentRequest } from "agents";


export class MyAgent extends Think {

  getModel() {

    return createWorkersAI({ binding: this.env.AI })(

      "@cf/moonshotai/kimi-k2.6",

    );

  }

}


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { createWorkersAI } from "workers-ai-provider";

import { routeAgentRequest } from "agents";


export class MyAgent extends Think<Env> {

  getModel() {

    return createWorkersAI({ binding: this.env.AI })(

      "@cf/moonshotai/kimi-k2.6",

    );

  }

}


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ||

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

That is it. Think handles the WebSocket chat protocol, message persistence, the agentic loop, message sanitization, stream resumption, client tool support, and workspace file tools.

### Client

* [  JavaScript ](#tab-panel-5567)
* [  TypeScript ](#tab-panel-5568)

JavaScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "MyAgent" });

  const { messages, sendMessage, status } = useAgentChat({ agent });


  return (

    <div>

      {messages.map((msg) => (

        <div key={msg.id}>

          <strong>{msg.role}:</strong>

          {msg.parts.map((part, i) =>

            part.type === "text" ? <span key={i}>{part.text}</span> : null,

          )}

        </div>

      ))}


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem("input");

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="input" placeholder="Send a message..." />

        <button type="submit">Send</button>

      </form>

    </div>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "MyAgent" });

  const { messages, sendMessage, status } = useAgentChat({ agent });


  return (

    <div>

      {messages.map((msg) => (

        <div key={msg.id}>

          <strong>{msg.role}:</strong>

          {msg.parts.map((part, i) =>

            part.type === "text" ? <span key={i}>{part.text}</span> : null,

          )}

        </div>

      ))}


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem(

            "input",

          ) as HTMLInputElement;

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="input" placeholder="Send a message..." />

        <button type="submit">Send</button>

      </form>

    </div>

  );

}


```

### Configuration

* [  wrangler.jsonc ](#tab-panel-5563)
* [  wrangler.toml ](#tab-panel-5564)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "ai": {

    "binding": "AI"

  },

  "durable_objects": {

    "bindings": [

      {

        "class_name": "MyAgent",

        "name": "MyAgent"

      }

    ]

  },

  "migrations": [

    {

      "new_sqlite_classes": [

        "MyAgent"

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


[ai]

binding = "AI"


[[durable_objects.bindings]]

class_name = "MyAgent"

name = "MyAgent"


[[migrations]]

new_sqlite_classes = ["MyAgent"]

tag = "v1"


```

## Think vs AIChatAgent

Both Think and [AIChatAgent](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) extend `Agent` and speak the same `cf_agent_chat_*` WebSocket protocol. They serve different goals.

**AIChatAgent** is a protocol adapter. You override `onChatMessage` and are responsible for calling `streamText`, wiring tools, converting messages, and returning a `Response`. AIChatAgent handles the plumbing — message persistence, streaming, abort, resume — but the LLM call is entirely your concern.

**Think** is an opinionated framework. It makes decisions for you: `getModel()` returns the model, `getSystemPrompt()` or `configureSession()` sets the prompt, `getTools()` returns tools. The default `onChatMessage` runs the complete agentic loop. You override individual pieces, not the whole pipeline.

| Concern                | AIChatAgent                                                      | Think                                                               |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Minimal subclass**   | \~15 lines (wire streamText \+ tools + system prompt + response) | 3 lines (getModel() only)                                           |
| **Storage**            | Flat SQL table                                                   | Session: tree-structured messages, context blocks, compaction, FTS5 |
| **Regeneration**       | Destructive (old response deleted)                               | Non-destructive branching (old responses preserved)                 |
| **Context management** | Manual                                                           | Context blocks with LLM-writable persistent memory                  |
| **Sub-agent RPC**      | Not built in                                                     | chat() with StreamCallback                                          |
| **Programmatic turns** | saveMessages()                                                   | saveMessages(), submitMessages(), continueLastTurn()                |
| **Compaction**         | maxPersistedMessages (deletes oldest)                            | Non-destructive summaries via overlays                              |
| **Search**             | Not available                                                    | FTS5 full-text search per-session and cross-session                 |

### When to use AIChatAgent

* You need full control over the LLM call (RAG, multi-model, custom streaming)
* You want the `Response` return type for HTTP middleware or testing
* You are building a simple chatbot with no memory requirements

### When to use Think

* You want to ship fast (3-line subclass with everything wired)
* You need persistent memory (context blocks the model can read and write)
* You need long conversations (non-destructive compaction)
* You need conversation search (FTS5)
* You are building a sub-agent system (parent-child RPC with streaming)
* You need proactive agents (programmatic turns from scheduled tasks or webhooks)
* You need durable async submission for webhook or RPC callers

## Choose a turn API

Think has several ways to start or continue a turn. Choose based on who starts the work and what the caller needs back.

| Use case                                                       | API                                           |
| -------------------------------------------------------------- | --------------------------------------------- |
| A browser user sends chat messages                             | useAgentChat over the WebSocket chat protocol |
| Server code can wait for the model response                    | saveMessages()                                |
| Server code needs fast durable acceptance and later status     | submitMessages()                              |
| Code should create recurring prompt-driven turns or handlers   | getScheduledTasks()                           |
| Parent code needs direct streaming RPC to a specific child     | subAgent(...).chat()                          |
| A parent delegates work to a retained child agent              | agentTool() or runAgentTool()                 |
| Surround a turn with idempotent app-owned side effects         | startFiber()                                  |
| Coordinate multi-step durable orchestration                    | Workflows                                     |
| Add context or messages without starting a model turn          | persistMessages()                             |
| Advanced subclass or recovery code continues an assistant turn | continueLastTurn()                            |

Use `saveMessages()` when the caller owns the trigger and can wait for the turn to finish. Use [submitMessages()](https://developers.cloudflare.com/agents/harnesses/think/programmatic-submissions/) when timeout ambiguity would make retries unsafe.

Use `chat()` for low-level parent-to-child streaming when your code owns forwarding, cancellation, and replay policy. Use [Agents as tools](https://developers.cloudflare.com/agents/runtime/execution/agent-tools/) when a parent model or workflow delegates to a child agent and you want retained child runs, event replay, abort bridging, and UI drill-in.

Use [startFiber()](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/#startfiber) outside Think when the durable unit is an application job around a turn: accepting a webhook once, restoring a serialized channel or thread target, posting a visible reply, or recording app-level recovery policy. Think submissions own conversation admission and turn serialization; managed fibers own external job acceptance, idempotent side effects, and application recovery.

## In this section

[ Getting started ](https://developers.cloudflare.com/agents/harnesses/think/getting-started/) Build a Think agent step by step. 

[ Configuration ](https://developers.cloudflare.com/agents/harnesses/think/configuration/) Configuration overrides, dynamic configuration, and Session integration. 

[ Tools ](https://developers.cloudflare.com/agents/harnesses/think/tools/) Workspace tools, code execution, browser tools, and extensions. 

[ Lifecycle hooks ](https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/) beforeTurn, beforeStep, onStepFinish, onChatResponse, and more. 

[ Client tools ](https://developers.cloudflare.com/agents/harnesses/think/client-tools/) Browser-side tools, approvals, and concurrency. 

[ Messengers ](https://developers.cloudflare.com/agents/harnesses/think/messengers/) Receive and reply to Chat SDK messenger webhooks. 

[ Scheduled tasks ](https://developers.cloudflare.com/agents/harnesses/think/scheduled-tasks/) Declarative recurring prompts and handlers. 

[ Workflows ](https://developers.cloudflare.com/agents/harnesses/think/workflows/) Durable model-driven reasoning steps inside Cloudflare Workflows. 

[ Sub-agent RPC ](https://developers.cloudflare.com/agents/harnesses/think/sub-agents/) chat() streaming, saveMessages, continueLastTurn, and abort. 

[ Programmatic submissions ](https://developers.cloudflare.com/agents/harnesses/think/programmatic-submissions/) Durable turn admission for webhooks and RPC callers. 

[ Durable recovery ](https://developers.cloudflare.com/agents/harnesses/think/recovery/) Chat recovery, stream-stall watchdog, and stability detection. 

[ Agent Skills ](https://developers.cloudflare.com/agents/runtime/execution/agent-skills/) On-demand instructions, resources, and scripts via getSkills(). 

## Acknowledgments

Think's design is inspired by [Pi ↗](https://pi.dev).

## Example

[ Assistant example ](https://github.com/cloudflare/agents/tree/main/examples/assistant) Explore a multi-session Think assistant with sub-agent routing, shared workspace, MCP, chat recovery, and GitHub OAuth. 

## Related

* [Sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/) — context blocks, compaction, search, multi-session (the storage layer Think builds on)
* [Sub-agents](https://developers.cloudflare.com/agents/runtime/execution/sub-agents/) — `subAgent()`, `abortSubAgent()`, `deleteSubAgent()` (the base Agent methods for spawning children)
* [Chat agents](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) — `AIChatAgent` for when you need full control over the LLM call
* [Long-running agents](https://developers.cloudflare.com/agents/concepts/agentic-patterns/long-running-agents/) — sub-agent delegation patterns for multi-week agent lifetimes
* [Durable execution](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/) — `runFiber()` and crash recovery (used by `chatRecovery`)
* [Browse the web](https://developers.cloudflare.com/agents/tools/browser/) — full CDP helper API reference

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/harnesses/think/#page","headline":"Think · Cloudflare Agents docs","description":"Opinionated chat agent framework with built-in tools, persistent memory, lifecycle hooks, streaming, messengers, scheduled tasks, Workflows, and sub-agent RPC.","url":"https://developers.cloudflare.com/agents/harnesses/think/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}}]}
```
