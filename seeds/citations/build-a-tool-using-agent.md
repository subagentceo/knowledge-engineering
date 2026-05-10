---
slug: build-a-tool-using-agent
source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md
local: vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent.md
drives: meta-pattern for gen:servers (Phase 6)
---

# build-a-tool-using-agent — extract

## Header tree

- # Tutorial: Build a tool-using agent
  - ## Ring 1: Single tool, single turn
  - (additional rings 2-5: multi-tool, multi-turn loop, errors, SDK abstraction)

## Plan-relevant pull quotes

> A guided walkthrough from a single tool call to a production-ready
> agentic loop.

> This tutorial builds a calendar-management agent in **five concentric
> rings**. Each ring is a complete, runnable program that adds exactly
> one concept to the ring before it. By the end you will have written
> the agentic loop by hand and then replaced it with the Tool Runner SDK
> abstraction.

> The request sends a `tools` array alongside the user message. When
> Claude decides to call a tool, the response comes back with
> `stop_reason: "tool_use"` and a `tool_use` content block containing
> the tool name, a unique `id`, and the structured `input`. Your code
> executes the tool, then sends the result back in a `tool_result`
> block whose `tool_use_id` matches the `id` from the call.

## Why this drives Phase 6's gen:servers

Phase 6's `scripts/generate-server-tree.ts` materializes one
`servers/<server>/<tool>.ts` file per MCP tool. The "concentric rings"
mental model from this tutorial is the meta-pattern: each generated
wrapper is a Ring 1 ("single tool, single turn") shape, and the
codemode runtime composes them into Ring 3+ (multi-tool, multi-turn)
shapes inside the agent's executable code blocks.
