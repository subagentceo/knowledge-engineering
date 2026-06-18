---
title: Sub-agent RPC and programmatic turns
description: Stream Think turns through a child agent with chat(), and trigger turns programmatically with saveMessages(), continueLastTurn(), and abort.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sub-agent RPC and programmatic turns

Think works as both a top-level agent and a sub-agent. When used as a sub-agent, the `chat()` method runs a full turn and streams events via a callback.

Note

This page covers calling Think from server code instead of a browser — multi-agent systems, scheduled or webhook-triggered turns, and recovery. If you are building a single chat agent that users talk to in the browser, you can skip it; `useAgentChat` (see [Getting started](https://developers.cloudflare.com/agents/harnesses/think/getting-started/)) is all you need.

For durable acceptance with idempotent retry and later status inspection, refer to [Programmatic submissions](https://developers.cloudflare.com/agents/harnesses/think/programmatic-submissions/). For recovery after eviction, refer to [Durable recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/).

## chat

TypeScript

```

async chat(

  userMessage: string | UIMessage,

  callback: StreamCallback,

  options?: ChatOptions,

): Promise<void>


```

### StreamCallback

| Method           | When it fires                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onStart(event)   | Before work starts; exposes the request ID for cancellation                                                                                                          |
| onEvent(json)    | For each streaming chunk (JSON-serialized UIMessageChunk)                                                                                                            |
| onDone()         | After the turn completes and the assistant message is persisted                                                                                                      |
| onError(message) | On error during the turn                                                                                                                                             |
| onInterrupted()  | Optional. The attempt was interrupted and a scheduled continuation (in a later isolate) owns the final outcome — not done, not a terminal error. Defaults to a no-op |

`onInterrupted` matters for a `chat()`\-driven turn that is interrupted and recovers: the RPC promise resolves **cleanly** (the isolate is still alive), so a consumer that keys off the clean resolve would mis-read it as success and finalize whatever partial it had streamed. Treat it as "not done, not failed — a continuation owns the answer": keep the channel open, show a recovering state, or re-attach, rather than finalizing the partial. A deploy or eviction interruption kills the isolate before this can fire (the caller sees a transport break instead); `onInterrupted` covers the in-isolate stall-into-recovery path.

### ChatOptions

| Field  | Description                               |
| ------ | ----------------------------------------- |
| signal | AbortSignal to cancel the turn mid-stream |

Tools belong to the child agent. Define durable capabilities with the child's `getTools()`, extensions, MCP tools, or client tool schemas. Legacy callers that pass `options.tools` to `chat()` receive a warning and the value is ignored.

### Example: parent calling a child

* [  JavaScript ](#tab-panel-5647)
* [  TypeScript ](#tab-panel-5648)

JavaScript

```

import { Think } from "@cloudflare/think";


export class ParentAgent extends Think {

  getModel() {

    /* ... */

  }


  async delegateToChild(task) {

    const child = await this.subAgent(ChildAgent, "child-1");


    const chunks = [];

    await child.chat(task, {

      onStart: (event) => {

        console.log("Child started:", event.requestId);

      },

      onEvent: (json) => {

        chunks.push(json);

      },

      onDone: () => {

        console.log("Child completed");

      },

      onError: (error) => {

        console.error("Child failed:", error);

      },

    });


    return chunks;

  }

}


export class ChildAgent extends Think {

  getModel() {

    /* ... */

  }


  getSystemPrompt() {

    return "You are a research assistant. Analyze data and report findings.";

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import type { StreamCallback } from "@cloudflare/think";


export class ParentAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  async delegateToChild(task: string) {

    const child = await this.subAgent(ChildAgent, "child-1");


    const chunks: string[] = [];

    await child.chat(task, {

      onStart: (event) => {

        console.log("Child started:", event.requestId);

      },

      onEvent: (json) => {

        chunks.push(json);

      },

      onDone: () => {

        console.log("Child completed");

      },

      onError: (error) => {

        console.error("Child failed:", error);

      },

    });


    return chunks;

  }

}


export class ChildAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  getSystemPrompt() {

    return "You are a research assistant. Analyze data and report findings.";

  }

}


```

### Cancelling a sub-agent turn

Use `onStart` and `cancelChat()` for RPC-safe cancellation across a sub-agent boundary:

* [  JavaScript ](#tab-panel-5643)
* [  TypeScript ](#tab-panel-5644)

JavaScript

```

let requestId;


const callback = {

  onStart(event) {

    requestId = event.requestId;

  },

  onEvent(json) {

    // Forward stream chunks.

  },

  onDone() {},

  onError(error) {

    console.error(error);

  },

};


const turn = child.chat("Long analysis task", callback);


// Later, from another RPC call or failure handler:

if (requestId) {

  await child.cancelChat(requestId, "client disconnected");

}


await turn;


```

TypeScript

```

let requestId: string | undefined;


const callback: StreamCallback = {

  onStart(event) {

    requestId = event.requestId;

  },

  onEvent(json) {

    // Forward stream chunks.

  },

  onDone() {},

  onError(error) {

    console.error(error);

  },

};


const turn = child.chat("Long analysis task", callback);


// Later, from another RPC call or failure handler:

if (requestId) {

  await child.cancelChat(requestId, "client disconnected");

}


await turn;


```

If the caller and callee are not separated by Workers RPC, you can also pass an `AbortSignal` to cancel mid-stream:

* [  JavaScript ](#tab-panel-5637)
* [  TypeScript ](#tab-panel-5638)

JavaScript

```

const controller = new AbortController();

setTimeout(() => controller.abort(), 30_000);


await child.chat("Long analysis task", callback, {

  signal: controller.signal,

});


```

TypeScript

```

const controller = new AbortController();

setTimeout(() => controller.abort(), 30_000);


await child.chat("Long analysis task", callback, {

  signal: controller.signal,

});


```

`cancelChat(requestId, reason?)` is a no-op if the turn already completed or the request ID is unknown. When aborted, the partial assistant message is still persisted.

## saveMessages

Inject messages and trigger a model turn without a WebSocket connection. Use for scheduled responses, webhook-triggered turns, proactive agents, or chaining from `onChatResponse`.

TypeScript

```

async saveMessages(

  messages:

    | UIMessage[]

    | ((current: UIMessage[]) => UIMessage[] | Promise<UIMessage[]>),

  options?: SaveMessagesOptions,

): Promise<SaveMessagesResult>


```

Returns `{ requestId, status, error? }` where `status` is `"completed"`, `"error"`, `"skipped"`, or `"aborted"`.

| status      | When                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| "completed" | Turn ran to completion.                                                                                               |
| "error"     | Turn started but the stream reported an error. error contains the stream error message when available.                |
| "skipped"   | Turn invalidated mid-flight, for example by chat-clear; user message persisted, no model run.                         |
| "aborted"   | Turn cancelled before completion via options.signal or chat-request-cancel. Partial assistant chunks still persisted. |

Pass `options.signal` to cancel a programmatic turn from the Durable Object that starts it. `AbortSignal` cannot cross Durable Object RPC boundaries, and the signal is not persisted across hibernation.

### Static messages

* [  JavaScript ](#tab-panel-5639)
* [  TypeScript ](#tab-panel-5640)

JavaScript

```

await this.saveMessages([

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Time for your daily summary." }],

  },

]);


```

TypeScript

```

await this.saveMessages([

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Time for your daily summary." }],

  },

]);


```

### Function form

When multiple `saveMessages` calls queue up, the function form runs with the latest messages when the turn actually starts:

* [  JavaScript ](#tab-panel-5641)
* [  TypeScript ](#tab-panel-5642)

JavaScript

```

await this.saveMessages((current) => [

  ...current,

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Continue your analysis." }],

  },

]);


```

TypeScript

```

await this.saveMessages((current) => [

  ...current,

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Continue your analysis." }],

  },

]);


```

### Scheduled responses

Trigger a recurring prompt turn with [getScheduledTasks()](https://developers.cloudflare.com/agents/harnesses/think/scheduled-tasks/):

* [  JavaScript ](#tab-panel-5645)
* [  TypeScript ](#tab-panel-5646)

JavaScript

```

export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  getScheduledTasks() {

    return {

      dailyReport: {

        schedule: "every day at 09:00",

        timezone: "UTC",

        prompt: "Generate the daily report.",

      },

    };

  }

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  getScheduledTasks() {

    return {

      dailyReport: {

        schedule: "every day at 09:00",

        timezone: "UTC",

        prompt: "Generate the daily report.",

      },

    };

  }

}


```

### Chaining from onChatResponse

Start a follow-up turn after the current one completes:

TypeScript

```

async onChatResponse(result: ChatResponseResult) {

  if (result.status === "completed" && this.needsFollowUp(result.message)) {

    await this.saveMessages([{

      id: crypto.randomUUID(),

      role: "user",

      parts: [{ type: "text", text: "Now summarize what you found." }],

    }]);

  }

}


```

## continueLastTurn

Run another model call after the latest assistant message without injecting a new user message. Think persists the result as a new assistant message with `continuation: true`; it does not append chunks to the existing assistant message.

TypeScript

```

protected async continueLastTurn(

  body?: Record<string, unknown>,

  options?: SaveMessagesOptions,

): Promise<SaveMessagesResult>


```

Returns `{ requestId, status: "skipped" }` if the last message is not an assistant message. The optional `body` parameter overrides the stored body for this continuation. Pass `options.signal` to cancel the continuation while it is running.

## abortRequest and abortAllRequests

Cancel in-flight chat turns from inside the Durable Object:

TypeScript

```

protected abortRequest(requestId: string, reason?: unknown): void

protected abortAllRequests(): void


```

Use `abortRequest()` when you know the request ID. Use `abortAllRequests()` for single-purpose helpers that should cancel whatever turn is currently running. Prefer `SaveMessagesOptions.signal` for programmatic turns when you can pass a signal at the call site.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/sub-agents/#page","headline":"Sub-agent RPC and programmatic turns · Cloudflare Agents docs","description":"Stream Think turns through a child agent with chat(), and trigger turns programmatically with saveMessages(), continueLastTurn(), and abort.","url":"https://developers.cloudflare.com/agents/harnesses/think/sub-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/harnesses/think/sub-agents/","name":"Sub-agent RPC and programmatic turns"}}]}
```
