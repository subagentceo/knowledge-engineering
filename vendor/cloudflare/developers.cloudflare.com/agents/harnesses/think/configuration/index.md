---
title: Configuration
description: Configuration overrides, dynamic runtime configuration, Session integration, and package exports for the Think chat agent framework.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration

Think is configured by overriding methods and properties on your `Think` subclass. Most agents only override `getModel()`.

## Configuration overrides

| Method / Property        | Default                        | Description                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getModel()               | throws                         | Return the LanguageModel to use                                                                                                                                                                                                                                                                              |
| getSystemPrompt()        | "You are a helpful assistant." | System prompt (fallback when no context blocks)                                                                                                                                                                                                                                                              |
| getTools()               | {}                             | AI SDK ToolSet for the agentic loop                                                                                                                                                                                                                                                                          |
| getScheduledTasks()      | {}                             | Code-declared recurring prompts or handlers — refer to [Scheduled tasks](https://developers.cloudflare.com/agents/harnesses/think/scheduled-tasks/)                                                                                                                                                          |
| getDefaultTimezone()     | undefined                      | Default timezone for wall-clock scheduled tasks                                                                                                                                                                                                                                                              |
| getMessengers()          | {}                             | Messenger ingress and delivery declarations — refer to [Messengers](https://developers.cloudflare.com/agents/harnesses/think/messengers/)                                                                                                                                                                    |
| maxSteps                 | 10                             | Max tool-call rounds per turn                                                                                                                                                                                                                                                                                |
| sendReasoning            | true                           | Send reasoning chunks to chat clients                                                                                                                                                                                                                                                                        |
| configureSession()       | identity                       | Add context blocks, compaction, search, skills — refer to [Sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/)                                                                                                                                                                   |
| getSkills()              | \[\]                           | Return Agent Skills sources for on-demand skill activation — refer to [Agent Skills](https://developers.cloudflare.com/agents/runtime/execution/agent-skills/)                                                                                                                                               |
| getSkillScriptRunner()   | null                           | Enable the optional run\_skill\_script tool                                                                                                                                                                                                                                                                  |
| workspaceBash            | true                           | Include or configure the default workspace bash tool — refer to [Tools](https://developers.cloudflare.com/agents/harnesses/think/tools/)                                                                                                                                                                     |
| messageConcurrency       | "queue"                        | How overlapping submits behave — refer to [Client tools](https://developers.cloudflare.com/agents/harnesses/think/client-tools/#message-concurrency)                                                                                                                                                         |
| waitForMcpConnections    | false                          | Wait for MCP servers before inference                                                                                                                                                                                                                                                                        |
| chatRecovery             | true                           | Wrap WebSocket, sub-agent, programmatic, and continuation turns in runFiber for durable execution. Set to a configuration object with maxAttempts, stableTimeoutMs, terminalMessage, and onExhausted to tune bounded recovery                                                                                |
| chatStreamStallTimeoutMs | 0 (off)                        | Opt-in inactivity watchdog: abort a turn whose model stream produces no chunk for this long (measures the gap between chunks, including tool execution). With chatRecovery on, a stall routes into bounded recovery                                                                                          |
| contextOverflow          | undefined                      | Opt-in mid-turn context-overflow handling with reactive, maxRetries, and proactive options. Requires classifyChatError plus a session compaction function — refer to [Context-window overflow recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/#context-window-overflow-recovery) |

For `chatRecovery` and `chatStreamStallTimeoutMs` behavior, refer to [Durable recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/).

## Dynamic configuration

Think's class generics match `Agent<Env, State, Props>`. Persisted runtime configuration is typed at the `configure<T>()` and `getConfig<T>()` call sites, stored in SQLite, and survives hibernation and restarts.

* [  JavaScript ](#tab-panel-5577)
* [  TypeScript ](#tab-panel-5578)

JavaScript

```

export class MyAgent extends Think {

  getModel() {

    const tier = this.getConfig()?.modelTier ?? "fast";

    const models = {

      fast: "@cf/moonshotai/kimi-k2.6",

      capable: "@cf/meta/llama-4-scout-17b-16e-instruct",

    };

    return createWorkersAI({ binding: this.env.AI })(models[tier]);

  }

}


```

TypeScript

```

type MyConfig = { modelTier: "fast" | "capable"; theme: string };


export class MyAgent extends Think<Env> {

  getModel() {

    const tier = this.getConfig<MyConfig>()?.modelTier ?? "fast";

    const models = {

      fast: "@cf/moonshotai/kimi-k2.6",

      capable: "@cf/meta/llama-4-scout-17b-16e-instruct",

    };

    return createWorkersAI({ binding: this.env.AI })(models[tier]);

  }

}


```

| Method                    | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| configure<T>(config: T)   | Persist a typed configuration object                          |
| getConfig<T>(): T \| null | Read the persisted configuration, or null if never configured |

Expose configuration to the client via `@callable`:

* [  JavaScript ](#tab-panel-5579)
* [  TypeScript ](#tab-panel-5580)

JavaScript

```

import { callable } from "agents";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  @callable()

  updateConfig(config) {

    this.configure(config);

  }

}


```

TypeScript

```

import { callable } from "agents";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  @callable()

  updateConfig(config: MyConfig) {

    this.configure<MyConfig>(config);

  }

}


```

## Session integration

Think stores conversations in a [Session](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/) — the storage layer that holds your messages and gives the model writable memory. Two concepts come up here: **context blocks** are labelled sections of the system prompt the model can read and update (for example, a `memory` block of facts about the user), and **compaction** summarizes older messages so long conversations stay within the model's context window. Override `configureSession` to add persistent memory, compaction, search, and skills:

* [  JavaScript ](#tab-panel-5581)
* [  TypeScript ](#tab-panel-5582)

JavaScript

```

import { Think, Session } from "@cloudflare/think";


export class MyAgent extends Think {

  getModel() {

    /* ... */

  }


  configureSession(session) {

    return session

      .withContext("soul", {

        provider: { get: async () => "You are a helpful coding assistant." },

      })

      .withContext("memory", {

        description: "Important facts learned during conversation.",

        maxTokens: 2000,

      })

      .withCachedPrompt();

  }

}


```

TypeScript

```

import { Think, Session } from "@cloudflare/think";


export class MyAgent extends Think<Env> {

  getModel() {

    /* ... */

  }


  configureSession(session: Session) {

    return session

      .withContext("soul", {

        provider: { get: async () => "You are a helpful coding assistant." },

      })

      .withContext("memory", {

        description: "Important facts learned during conversation.",

        maxTokens: 2000,

      })

      .withCachedPrompt();

  }

}


```

When `configureSession` adds context blocks, Think builds the system prompt from those blocks instead of using `getSystemPrompt()`. Think's `this.messages` getter reads directly from Session's tree-structured storage.

For the full Session API — context blocks, compaction, search, skills, and multi-session support — refer to the [Sessions documentation](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/).

## Package exports

| Export                                | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| @cloudflare/think                     | Think, Session, Workspace, skills namespace                 |
| @cloudflare/think/messengers          | Messenger contracts, Chat SDK bridge, state agent, delivery |
| @cloudflare/think/messengers/telegram | Telegram messenger provider and delivery helpers            |
| @cloudflare/think/workflows           | ThinkWorkflow, step.prompt() — Workflow prompts             |
| @cloudflare/think/tools/workspace     | createWorkspaceTools() — for custom storage backends        |
| @cloudflare/think/tools/execute       | createExecuteTool() — sandboxed code execution via codemode |
| @cloudflare/think/tools/browser       | createBrowserTools() — Chrome DevTools Protocol tools       |
| @cloudflare/think/tools/extensions    | createExtensionTools() — LLM-driven extension loading       |
| @cloudflare/think/extensions          | ExtensionManager, HostBridgeLoopback — extension runtime    |

## Dependencies

Peer dependencies you provide:

| Package                | Required | Notes                            |
| ---------------------- | -------- | -------------------------------- |
| agents                 | yes      | Cloudflare Agents SDK            |
| ai                     | yes      | AI SDK v6                        |
| zod                    | yes      | Schema validation (v4)           |
| @chat-adapter/telegram | optional | Required for Telegram messengers |

Bundled with `@cloudflare/think`:

| Package              | Notes                                               |
| -------------------- | --------------------------------------------------- |
| @cloudflare/shell    | Workspace filesystem                                |
| @cloudflare/codemode | Code execution for createExecuteTool()              |
| just-bash            | Sandboxed shell for the default workspace bash tool |

The Agent Skills engine and its script runner live in [agents/skills](https://developers.cloudflare.com/agents/runtime/execution/agent-skills/), so skill scripts pull `@cloudflare/worker-bundler` and `just-bash` through `agents`, not Think.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/configuration/#page","headline":"Configuration · Cloudflare Agents docs","description":"Configuration overrides, dynamic runtime configuration, Session integration, and package exports for the Think chat agent framework.","url":"https://developers.cloudflare.com/agents/harnesses/think/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/harnesses/think/configuration/","name":"Configuration"}}]}
```
