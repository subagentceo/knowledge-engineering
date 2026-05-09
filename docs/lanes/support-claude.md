---
title: support.claude.com bridge
description: How the bridge MCP server reaches the Claude help center.
---

> Outcome of this bridge: a sub-agent that returns help-center facts
> (collection slug, article URL, body) for grounded support answers.

## Tools

| Tool | Source endpoint |
|---|---|
| `support_collections` | curated list of collection slugs (no upstream JSON index) |
| `support_collection` | `https://support.claude.com/en/collections/<slug>` |
| `support_article` | `https://support.claude.com/en/articles/<id>-<slug>` |

## Sub-agent

Prompt: [`seeds/prompts/subagent-support-claude.md`](https://github.com/subagentceo/knowledge-engineering/blob/main/seeds/prompts/subagent-support-claude.md).
Tool surface: the three `support_*` tools above.

## Curated collections

| Slug | Description |
|---|---|
| `14445694-claude-code` | Claude Code |
| `15399129-connectors` | Connectors |
| `16163169-claude-desktop` | Claude Desktop |
| `9387370-team-and-enterprise-plans` | Team and Enterprise plans |
| `4078531-claude` | Claude (consumer) |
| `4078534-privacy-and-legal` | Privacy and legal |
| `4078535-safeguards` | Safeguards |

The list is curated rather than discovered: `support.claude.com` does not
expose a stable collection index, so the bridge ships the seven slugs the
session artifact named.
