---
title: Mintlify documentation strategy
description: Why the docs site has four bridge pages instead of ten tool-lane pages.
---

## Outcome

A Mintlify site whose information architecture is **one page per bridge**:
`anthropic-engineering`, `claude-blog`, `support-claude`, `llms-txt`.

The earlier draft of v0.1 had one page per *tool family* (Subagent/Team,
Filesystem, Shell, MCP, Skill, Plan/Worktree, Task/Todo, Scheduling, Web,
Onboarding) — ten pages decomposed from `code.claude.com/docs/llms.txt` and
`platform.claude.com/docs/llms.txt`. That decomposition lives on as the
**session artifact**: it is the cross-lane index that informed how the
bridges curate content.

## Namespacing rules

| Source | Mintlify path | Notes |
|---|---|---|
| `anthropic.com/engineering` | `lanes/anthropic-engineering` | One bridge page; tools listed inline. |
| `claude.com/blog` | `lanes/claude-blog` | Same shape. |
| `support.claude.com` | `lanes/support-claude` | Same shape; collection slugs inline. |
| `llms.txt` namespaces | `lanes/llms-txt` | The "index of indexes". |
| MCP server reference | `reference/bridge-mcp` | One page; per-lane subsections live in the lane pages. |
| Auth | `reference/auth` | OAuth-only contract. |

## Per-bridge page template

```
# <Bridge name>

> Outcome of this bridge: <one sentence>

## Tools
<table: tool name -> source endpoint>

## Sub-agent
<seed prompt link, restricted tool surface>

## Density / Notes
<which upstream slugs we expect to come back from this bridge most often>
```

## Build

```
npm run docs:dev   # mintlify dev
```
