---
title: anthropic.com/engineering bridge
description: How the bridge MCP server reaches the Anthropic engineering blog.
source: https://www.anthropic.com/engineering
last_fetched: 2026-05-10
---

> **Source URL:** <https://www.anthropic.com/engineering> &nbsp; · &nbsp; **Last fetched:** 2026-05-10
>
> Outcome of this bridge: a sub-agent (the verifier) returns engineering-blog
> facts (URLs, titles, fetched bodies) that the orchestrator can fold into a
> grounded, citing answer.

## Tools

| Tool | Source endpoint |
|---|---|
| `engineering_index` | `https://www.anthropic.com/engineering` |
| `engineering_fetch` | `https://www.anthropic.com/engineering/<slug>` |
| `engineering_search` | local substring match across `engineering_index` titles |

## How the verifier uses it

The `verifier` sub-agent calls `engineering_search` and `engineering_fetch` to
look up authoritative engineering posts that corroborate (or contradict)
claims surfaced by `npm-research`. Cross-cited posts include
`built-multi-agent-research-system`, `building-effective-agents`,
`effective-context-engineering-for-ai-agents`, and `code-execution-with-mcp`.

The bridge does not mirror these posts; it returns live URLs so the parent
agent can attach a Citations `document` block per
[`docs.claude.com/en/docs/build-with-claude/citations`](https://docs.claude.com/en/docs/build-with-claude/citations).
