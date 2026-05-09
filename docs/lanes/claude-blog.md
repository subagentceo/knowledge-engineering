---
title: claude.com/blog bridge
description: How the bridge MCP server reaches the Claude product/strategy blog.
---

> Outcome of this bridge: a sub-agent that returns Claude blog facts (URLs,
> titles, fetched bodies) the orchestrator can fold into a citing answer.

## Tools

| Tool | Source endpoint |
|---|---|
| `blog_index` | `https://www.claude.com/blog` |
| `blog_fetch` | `https://www.claude.com/blog/<slug>` |
| `blog_search` | local substring match across `blog_index` titles |

## Sub-agent

Prompt: [`seeds/prompts/subagent-claude-blog.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/subagent-claude-blog.md).
Tool surface: the three `blog_*` tools above.

## Density

Frequently-cited posts include
`building-multi-agent-systems-when-and-how-to-use-them`,
`multi-agent-coordination-patterns`,
`common-workflow-patterns-for-ai-agents-and-when-to-use-them`,
`building-ai-agents-for-the-enterprise`,
`what-is-model-context-protocol`,
`extending-claude-capabilities-with-skills-mcp-servers`,
`building-agents-that-reach-production-systems-with-mcp`,
`building-agents-with-skills-equipping-agents-for-specialized-work`,
`claude-api-skill`, `eight-trends-defining-how-software-gets-built-in-2026`,
`product-development-in-the-agentic-era`.

This lane skews toward strategy and feature announcements; the
`anthropic-engineering` lane skews toward technical writeups. Cross-cutting
questions usually want both.
