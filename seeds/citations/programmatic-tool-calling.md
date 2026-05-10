---
slug: programmatic-tool-calling
source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md
local: vendor/anthropics/platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md
drives: core citation for Phase 6 codemode
---

# programmatic-tool-calling — extract

## Header tree

- # Programmatic tool calling
  - ## Model compatibility
  - ## Quick start
  - ## How programmatic tool calling works
  - ## Core concepts
    - ### The `allowed_callers` field
    - ### The `caller` field in responses
    - ### Container lifecycle
  - ## Example workflow (Steps 1-5)
  - ## Advanced patterns
    - ### Batch processing with loops
    - ### Early termination
    - ### Conditional tool selection
    - ### Data filtering
  - ## Response format
  - ## Error handling

## Plan-relevant pull quotes

> Programmatic tool calling allows Claude to **write code that calls your
> tools programmatically within a [code execution] container**, rather
> than requiring round trips through the model for each tool invocation.
> This reduces latency for multi-tool workflows and **decreases token
> consumption by allowing Claude to filter or process data before it
> reaches the model's context window**.

> Consider checking budget compliance across 20 employees: the
> traditional approach requires 20 separate model round-trips, pulling
> thousands of expense line items into the context along the way. With
> programmatic tool calling, a single script runs all 20 lookups,
> filters the results, and **returns only the employees who exceeded
> their limits**, shrinking what Claude needs to reason over from
> hundreds of kilobytes down to a handful of lines.

> `"allowed_callers": ["code_execution_20260120"]`

## Why this drives Phase 6 (core citation)

Phase 6's codemode integration is a 1:1 implementation of this pattern.
Sub-agents declare `tools: ["codemode", "search_tools"]` instead of
loading every MCP tool definition up front; intermediate tool results
flow through the sandbox runtime, not the model. The `allowed_callers`
field is the canonical name for the gating mechanism we mirror via
`@cloudflare/codemode`'s `DynamicWorkerExecutor`.
