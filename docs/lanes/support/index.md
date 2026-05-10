---
title: support.claude.com bridge
description: How the bridge MCP server reaches the Claude help center.
source: https://support.claude.com
last_fetched: 2026-05-10
---

> **Source URL:** <https://support.claude.com> &nbsp; · &nbsp; **Last fetched:** 2026-05-10
>
> Outcome of this bridge: a sub-agent that returns help-center facts
> (collection slug, article URL, body) for grounded support answers.

## Tools

| Tool | Source endpoint |
|---|---|
| `support_collections` | curated list of collection slugs (no upstream JSON index) |
| `support_collection` | `https://support.claude.com/en/collections/<slug>` |
| `support_article` | `https://support.claude.com/en/articles/<id>-<slug>` |

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

## How the verifier uses it

When `npm-research` produces a claim about supported configurations, billing,
or end-user behaviour, the verifier prefers a `support.claude.com` citation
to mark `pass`.
