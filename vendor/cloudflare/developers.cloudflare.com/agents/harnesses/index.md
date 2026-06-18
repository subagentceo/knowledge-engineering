---
title: Harnesses
description: Understand agent harnesses — the loop that controls planning, tool use, and response flow.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Harnesses

A harness is the loop that makes an agent behave like an agent instead of a single model call.

It is responsible for the turn-by-turn work around the model: building the prompt, loading memory, selecting tools, handling tool results, streaming responses, persisting messages, and deciding whether the agent should continue or stop.

You can build this loop yourself on top of the [Agents SDK runtime](https://developers.cloudflare.com/agents/runtime/agents-api/), or use an opinionated harness like [Project Think](https://developers.cloudflare.com/agents/harnesses/think/).

## How harnesses fit

Harnesses sit on top of the Agents SDK runtime:

* **The runtime** gives the agent durable infrastructure: the [Agent class](https://developers.cloudflare.com/agents/runtime/lifecycle/agent-class/), [state](https://developers.cloudflare.com/agents/runtime/lifecycle/state/), [sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/), [routing](https://developers.cloudflare.com/agents/runtime/communication/routing/), [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/), [scheduling](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/), [fibers](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/), and [observability](https://developers.cloudflare.com/agents/runtime/operations/observability/).
* **The harness** gives the agent behavior: model calls, prompt construction, tool selection, stream handling, memory strategy, and lifecycle hooks.

The runtime answers “where does this agent live and how does it stay durable?” The harness answers “what does this agent do on each turn?”

## Choose an approach

Use a build-your-own harness when you need full control over the model call, message format, tool loop, or UI protocol. This is the right approach when you want to compose low-level APIs directly from the Agents SDK.

Use Project Think when you want an opinionated chat-agent harness with defaults for memory, workspace tools, streaming, lifecycle hooks, sub-agent RPC, and durable chat recovery.

## Current harnesses

[ Project Think ](https://developers.cloudflare.com/agents/harnesses/think/) An opinionated chat agent harness with built-in tools, persistent memory, lifecycle hooks, streaming, and sub-agent RPC. 

## What a harness usually owns

A harness usually owns:

* **Prompt construction** — system prompts, memory, retrieved context, and per-turn instructions.
* **Model execution** — the call to Workers AI, OpenAI, Anthropic, Gemini, or another provider.
* **Tool orchestration** — server tools, client tools, MCP tools, approval flows, and continuation after tool results.
* **Message persistence** — how user, assistant, and tool messages are saved and replayed.
* **Streaming and recovery** — how responses stream to clients and resume after disconnects or Durable Object eviction.
* **Extension points** — hooks before and after turns, steps, tool calls, and recovery events.

## Related resources

[ Agents SDK runtime ](https://developers.cloudflare.com/agents/runtime/agents-api/) Build your own harness directly on the Agent class. 

[ Sessions ](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/) Store conversation context and memory across turns. 

[ Durable execution with fibers ](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/) Recover long-running agent work after Durable Object eviction. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/#page","headline":"Harnesses · Cloudflare Agents docs","description":"Understand agent harnesses — the loop that controls planning, tool use, and response flow.","url":"https://developers.cloudflare.com/agents/harnesses/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}}]}
```
