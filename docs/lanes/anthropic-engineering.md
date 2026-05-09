---
title: anthropic.com/engineering bridge
description: How the bridge MCP server reaches the Anthropic engineering blog.
---

> Outcome of this bridge: a sub-agent that returns engineering-blog facts
> (URLs, titles, fetched bodies) the orchestrator can fold into a grounded,
> citing answer.

## Tools

| Tool | Source endpoint |
|---|---|
| `engineering_index` | `https://www.anthropic.com/engineering` |
| `engineering_fetch` | `https://www.anthropic.com/engineering/<slug>` |
| `engineering_search` | local substring match across `engineering_index` titles |

## Sub-agent

Prompt: [`seeds/prompts/subagent-anthropic-engineering.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/subagent-anthropic-engineering.md).
Tool surface: the three `engineering_*` tools above and nothing else.

## Density

Frequently-cited posts on this lane include `building-effective-agents`,
`effective-context-engineering-for-ai-agents`, `claude-think-tool`,
`demystifying-evals-for-ai-agents`, `code-execution-with-mcp`,
`claude-code-best-practices`, `claude-code-sandboxing`,
`claude-code-auto-mode`, `desktop-extensions`, `contextual-retrieval`,
`building-c-compiler`.

The bridge does not mirror these — it returns live URLs so the parent agent
can attach a Citations `document` block.
