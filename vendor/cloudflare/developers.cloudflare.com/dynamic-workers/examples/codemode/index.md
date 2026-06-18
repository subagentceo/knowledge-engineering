---
title: Code Mode Example
description: Project management chat app demonstrating code-as-tool. The LLM writes and executes JavaScript to orchestrate multiple tools in a single Dynamic Worker sandbox.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Code Mode Example

This example shows how to use the [@cloudflare/codemode ↗](https://www.npmjs.com/package/@cloudflare/codemode) library with the [Agents SDK ↗](https://www.npmjs.com/package/agents) to build an agent where the LLM writes code to orchestrate tool calls, instead of calling them one at a time. This approach, called [Code Mode ↗](https://blog.cloudflare.com/code-mode/), reduces tokens spent by up to 80%, returns better results, and avoids bloating the context window.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/codemode)

This example shows you how to:

* Define tools as plain functions with Zod schemas
* Use `createCodeTool` to expose your tools to the LLM as a single "write code" tool
* Use `DynamicWorkerExecutor` to safely run LLM-generated code
* Wire it all together with `AIChatAgent` to handle chat over WebSockets

## How it works

The agent uses three components from the [@cloudflare/codemode ↗](https://www.npmjs.com/package/@cloudflare/codemode) library and the [Agents SDK ↗](https://www.npmjs.com/package/agents):

* **`AIChatAgent` (`@cloudflare/ai-chat`)**, your agent's base class. Handles chat over WebSockets, persists messages, and calls the LLM.
* **`createCodeTool` (`@cloudflare/codemode/ai`)**, wraps your tools into a single `codemode` tool that accepts `{ code: string }`.
* **`DynamicWorkerExecutor` (`@cloudflare/codemode`)**, runs the LLM-generated code in an isolated [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/).

The flow:

1. User sends a message over WebSocket.
2. `AIChatAgent` passes it to the LLM with a single tool available: `codemode`.
3. The LLM writes JavaScript, for example `const projects = await codemode.listProjects()`, instead of making individual tool calls.
4. `DynamicWorkerExecutor` spins up an isolated Worker and runs the code. Inside the sandbox, `codemode.listProjects()` calls your real `listProjects` implementation.
5. The result, any console output, and errors are returned to the LLM.
6. The LLM uses the result to respond to the user, or writes more code if it needs to.

### `DynamicWorkerExecutor`

`DynamicWorkerExecutor` is part of the `@cloudflare/codemode` library. When the LLM writes code that orchestrates your tools, that code needs to run somewhere safe. `DynamicWorkerExecutor` spins up an isolated Dynamic Worker for each execution using the Worker Loader binding. Inside the sandbox:

* A `codemode` proxy object routes calls like `codemode.createTask(...)` back to your real tool implementations over Workers RPC
* Setting `globalOutbound` to `null` blocks `fetch()`, so the code can only reach the outside world through your tools
* `console.log` output is captured and returned alongside the result
* Each execution gets its own Worker instance with a 30-second timeout

* [  JavaScript ](#tab-panel-8417)
* [  TypeScript ](#tab-panel-8418)

JavaScript

```

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({

  loader: env.LOADER, // WorkerLoader binding from wrangler.jsonc

  timeout: 30000, // default: 30s

  globalOutbound: null, // null = fetch blocked

});


```

TypeScript

```

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({

  loader: env.LOADER, // WorkerLoader binding from wrangler.jsonc

  timeout: 30000, // default: 30s

  globalOutbound: null, // null = fetch blocked

});


```

### `createCodeTool`

`createCodeTool` is part of `@cloudflare/codemode`. It takes your tools and an executor, and returns a single AI SDK `tool()`. It:

* Generates TypeScript type declarations from your tools' Zod schemas, so the LLM knows what is available and what the argument shapes look like.
* Puts those types in the tool's description, so the LLM sees a single tool with parameter `{ code: string }` and a description that includes the full typed API surface.
* On execution, normalizes the LLM's code (strips markdown fences, wraps bare statements in async functions, auto-returns the last expression), then passes it to the executor.

* [  JavaScript ](#tab-panel-8419)
* [  TypeScript ](#tab-panel-8420)

JavaScript

```

import { createCodeTool } from "@cloudflare/codemode/ai";


const codemode = createCodeTool({

  tools: myTools, // Record<string, tool()> with Zod schemas

  executor, // DynamicWorkerExecutor

});


// The LLM sees: one tool called "codemode" with input { code: string }

// The description includes TypeScript types for all your tools


```

TypeScript

```

import { createCodeTool } from "@cloudflare/codemode/ai";


const codemode = createCodeTool({

  tools: myTools, // Record<string, tool()> with Zod schemas

  executor, // DynamicWorkerExecutor

});


// The LLM sees: one tool called "codemode" with input { code: string }

// The description includes TypeScript types for all your tools


```

The LLM writes an async arrow function. `createCodeTool` normalizes it and hands it to the executor. The executor builds a Worker module with a `codemode` proxy, runs the code, and returns `{ code, result, logs }`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/examples/codemode/#page","headline":"Code Mode Example · Cloudflare Dynamic Workers docs","description":"Project management chat app demonstrating code-as-tool. The LLM writes and executes JavaScript to orchestrate multiple tools in a single Dynamic Worker sandbox.","url":"https://developers.cloudflare.com/dynamic-workers/examples/codemode/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","AI Agents","JavaScript","TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dynamic-workers/","name":"Dynamic Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/dynamic-workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/dynamic-workers/examples/codemode/","name":"Code Mode Example"}}]}
```
