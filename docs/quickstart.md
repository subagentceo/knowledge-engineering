---
title: Quickstart
description: Run the orchestrator agent and the npm-registry MCP server locally.
---

## Outcome

After this page, you have:

1. The npm-registry MCP server running on stdio.
2. The orchestrator agent answering a question by delegating to the
   `npm-research` sub-agent.
3. The Anthropic SDK example demonstrating prompt caching, tool caching,
   citations, programmatic tool use, and deep-links.

## Steps

```bash
npm install
npm run build

# (1) MCP server is invoked indirectly by the agent, but you can probe it:
npm run mcp:npm

# (2) Orchestrator with sub-agent
ANTHROPIC_API_KEY=sk-... npm run dev -- "List @modelcontextprotocol packages"

# (3) Anthropic features example
ANTHROPIC_API_KEY=sk-... npm run example:anthropic
```
