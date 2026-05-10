---
title: llms.txt namespace bridge
description: How the bridge MCP server reaches the upstream llms.txt indexes.
source: https://www.anthropic.com/llms.txt
last_fetched: 2026-05-10
---

> **Source URLs (one per namespace):**
>
> - <https://www.claude.com/llms.txt>
> - <https://www.claude.com/docs/llms.txt>
> - <https://code.claude.com/docs/llms.txt>
> - <https://platform.claude.com/docs/llms.txt>
> - <https://www.anthropic.com/llms.txt>
>
> **Last fetched:** 2026-05-10
>
> Outcome of this bridge: a sub-agent that returns `{namespace, source_url,
> line}` triples so the orchestrator can pivot into the right canonical docs
> page on `claude.com`, `code.claude.com`, `platform.claude.com`, or
> `anthropic.com`.

## Tools

| Tool | Behaviour |
|---|---|
| `llms_namespaces` | Curated list of the five namespaces above. |
| `llms_fetch` | Fetch one namespace's `llms.txt` raw text. |
| `llms_grep` | Case-insensitive line-grep across every namespace. |

## How the verifier uses it

This lane is the "index of indexes". When a question is "where is X
documented?" rather than "what does X say?", the verifier hits `llms_grep`
first and lets the orchestrator pivot to one of the other three bridges with
the URL the matched line returned. This avoids guessing canonical URLs.
