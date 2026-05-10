---
title: claude.com/blog bridge
description: How the bridge MCP server reaches the Claude product/strategy blog.
source: https://www.claude.com/blog
last_fetched: 2026-05-10
---

> **Source URL:** <https://www.claude.com/blog> &nbsp; · &nbsp; **Last fetched:** 2026-05-10
>
> Outcome of this bridge: a sub-agent that returns Claude blog facts (URLs,
> titles, fetched bodies) the orchestrator can fold into a citing answer.

## Tools

| Tool | Source endpoint |
|---|---|
| `blog_index` | `https://www.claude.com/blog` |
| `blog_fetch` | `https://www.claude.com/blog/<slug>` |
| `blog_search` | local substring match across `blog_index` titles |

## How the verifier uses it

When `npm-research` produces a roadmap-shaped or strategy-shaped claim
(versions, capabilities of an Anthropic-published package), the verifier
requires a `claude.com/blog` citation to mark the claim as `pass`. Examples
of frequently-cited posts include
`building-multi-agent-systems-when-and-how-to-use-them`,
`what-is-model-context-protocol`,
`extending-claude-capabilities-with-skills-mcp-servers`, and
`building-agents-with-skills-equipping-agents-for-specialized-work`.

This lane skews toward strategy and feature announcements; the
`engineering` lane skews toward technical writeups. Cross-cutting questions
usually want both.
