---
name: tool-use-on-platforms
description: The tool-use and tool-result block plumbing differences for Claude on Bedrock vs Vertex — converse stop_reason / tool_use parts / tool_result with status field vs Anthropic SDK stop_reason / tool_use blocks / tool_result with tool_use_id and is_error. Trigger when implementing the tool-use loop, building tool schemas, returning tool results, or porting a tool-calling agent between a cloud platform and the first-party API.
---

# Tool use across platforms: schemas, results, and the loop

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

The tool-use **concept and loop are identical** to `claude-api` (send tools → tool-use request →
run function → send result → repeat). Tool schemas are JSON Schema on both. What diverges is the
**block shapes and field names**: Bedrock uses `toolUse` parts and a `toolResult` with a `status`;
Vertex uses `tool_use` blocks and a `tool_result` with `is_error`.

## Quick reference

| | Bedrock | Vertex |
|---|---|---|
| Stop field | `response["stopReason"]` | `message.stop_reason` |
| Request part | `toolUse` part (`toolUseId`/`name`/`input`) | `tool_use` block (`id`/`name`/`input`) |
| Result block | `toolResult` w/ `status: success\|error` | `tool_result` w/ `is_error: bool` |
| Result id field | `toolUseId` | `tool_use_id` |

## Scripts

- [`scripts/tool_use_loop.py`](scripts/tool_use_loop.py) — the platform-neutral tool-use loop.
- [`scripts/bedrock_tool_use.py`](scripts/bedrock_tool_use.py) — reading `toolUse` parts and sending a `toolResult` with `status`.
- [`scripts/vertex_tool_use.py`](scripts/vertex_tool_use.py) — reading `tool_use` blocks and sending a `tool_result` with `is_error`.

## References

- [The loop, reading requests, and sending results](references/tool-loop-and-blocks.md) — full per-platform plumbing and the stateless-resend rule.
- [Built-in tools](references/built-in-tools.md) — text editor (version-pinned names), web search (Vertex only), batch tool.

## Source
Course notes: "Introducing/Handling/Running/Sending Tool Use", "Multi-Turn Conversations with
Tools", "Batch Tool Use", "The Text Editor Tool", "Structured Data with Tools" (Bedrock);
"Handling Message Blocks", "Sending Tool Results", "Implementing Multiple Turns", "The Batch Tool",
"The Text Edit Tool", "The Web Search Tool" (Vertex) — projects/courses/{bedrock,vertex} files.
