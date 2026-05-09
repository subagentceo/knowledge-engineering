---
title: llms.txt namespace bridge
description: How the bridge MCP server reaches the upstream llms.txt indexes.
---

> Outcome of this bridge: a sub-agent that returns `{namespace, source_url,
> line}` triples so the orchestrator can pivot into the right canonical docs
> page on `claude.com`, `code.claude.com`, `platform.claude.com`, or
> `anthropic.com`.

## Tools

| Tool | Behaviour |
|---|---|
| `llms_namespaces` | Curated list of the five namespaces below. |
| `llms_fetch` | Fetch one namespace's `llms.txt` raw text. |
| `llms_grep` | Case-insensitive line-grep across every namespace. |

## Namespaces

| id | URL |
|---|---|
| `claude.com` | `https://www.claude.com/llms.txt` |
| `claude.com/docs` | `https://www.claude.com/docs/llms.txt` |
| `code.claude.com/docs` | `https://code.claude.com/docs/llms.txt` |
| `platform.claude.com/docs` | `https://platform.claude.com/docs/llms.txt` |
| `anthropic.com` | `https://www.anthropic.com/llms.txt` |

## Sub-agent

Prompt: [`seeds/prompts/subagent-llms-txt.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/subagent-llms-txt.md).
Tool surface: the three `llms_*` tools above.

This lane is the "index of indexes" — when a question is "where is X
documented?" rather than "what does X say?", route here first and let the
orchestrator pivot to one of the other three bridges with the URL the line
returned.
