---
title: Quickstart
description: Run the orchestrator and the four-lane knowledge-bridge MCP server locally.
---

## Outcome

After this page, you have:

1. The `knowledge-bridge` stdio MCP server compiled and runnable.
2. The orchestrator answering a question by delegating to one or more of
   the four bridge sub-agents (`anthropic-engineering`, `claude-blog`,
   `support-claude`, `llms-txt`).

## Prereqs

OAuth-only. Set one of:

```bash
claude setup-token
export CLAUDE_CODE_OAUTH_TOKEN=...
# OR
claude login
export CLAUDE_CODE_SESSION_INHERIT=1
```

If `ANTHROPIC_API_KEY` is set the agent will refuse to start; unset it.

## Steps

```bash
npm install
npm run build

# (1) Probe the MCP server directly (lists tools, echoes JSON-RPC).
npm run mcp:bridge

# (2) Orchestrator with sub-agents
npm run dev -- "What has Anthropic said about MCP across engineering, blog, and support?"
```
