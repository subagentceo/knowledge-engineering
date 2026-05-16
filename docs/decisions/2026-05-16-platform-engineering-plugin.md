---
date: 2026-05-16
status: accepted
deciders: alex-jadecli
outcome_id: OPE1
supersedes: none
---

# ADR — platform-engineering as a personalized Claude Code plugin

## Context

The operator runs a Docker MCP Toolkit profile
`docker.io/subagentceo/platform_engineering:latest` carrying GitHub
Official, Atlassian, Neon, Redis Cloud, and Filesystem MCP servers
(verified live in this session: GitHub + Atlassian + Filesystem all
returned successful identity calls; Neon and Redis Cloud need fresh
keychain secrets).

PR #174 lands the AlloyDB Omni 17.7 + Redis 7.0 cloud-env bootstrap
(Setup script, SessionStart hook, `scripts/start_services.sh`,
`ALLOYDB_OMNI_PASSWORD`).

Issue #175 asks for a single feature branch covering four concerns:

1. The install context (the AlloyDB / Redis SessionStart pattern)
2. Docker MCP profile wiring
3. A Turbopuffer + AlloyDB embeddings architecture
4. A skill capturing the citation/test/outcome discipline already in
   this repo

## Decision

Package the four concerns as **one Claude Code plugin**:
`plugins/platform-engineering/` with `.claude-plugin/plugin.json` and
4 skill folders. Modeled after
[`subagentceo/knowledge-work-plugins/cowork-plugin-management`](https://github.com/subagentceo/knowledge-work-plugins/tree/main/cowork-plugin-management),
which ships `.claude-plugin/` + `skills/` as its top-level shape.

## Why a plugin (not a runbook directory)

- **Single install target.** `claude plugins install platform-engineering`
  brings all four skills + the MCP profile wiring in one shot.
- **Marketplace-ready.** Once `subagentceo/knowledge-work-profiles`
  exists (per ADR
  [`2026-05-16-polyrepo-sibling-pattern.md`](./2026-05-16-polyrepo-sibling-pattern.md)),
  this folder moves there with zero refactor.
- **Skill discoverability.** Skills under a plugin auto-load in
  Claude Code, Cowork, and Claude Desktop; loose runbooks don't.

## Why personalized (not a fork of `engineering`)

The public `engineering` plugin's `.mcp.json` uses **remote HTTP MCP
servers** (`https://mcp.slack.com/mcp` etc.) configured for any team.
The operator runs **Docker MCP Toolkit locally** with OAuth +
Keychain-stored PATs. Secrets stay on the operator's machine and the
profile is push/pullable to `docker.io/subagentceo/platform_engineering`.

This plugin's `.mcp.json` points at the local Docker MCP gateway with
`--profile platform_engineering`, not at remote URLs. Concretely:

```jsonc
{
  "mcpServers": {
    "MCP_DOCKER": {
      "command": "docker",
      "args": ["mcp", "gateway", "run", "--profile", "platform_engineering"],
      "type": "stdio"
    }
  }
}
```

This is the same wiring already live at the repo-root `.mcp.json`
(landed in PR #174). The plugin's `.mcp.json` (added in OPE2) is a
copy so users who install the plugin without the host repo's
`.mcp.json` still get the wiring.

## Why Voyage for embeddings (OPE3)

Anthropic publicly recommends Voyage AI in their docs at
[`vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`](../../vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md):

> "Anthropic does not offer its own embedding model. One embeddings
> provider that has a wide variety of options and capabilities
> encompassing all of the above considerations is Voyage AI."

Turbopuffer itself names Voyage as their reference provider in
[`vendor/turbopuffer/turbopuffer.com/docs/performance.md`](../../vendor/turbopuffer/turbopuffer.com/docs/performance.md)
(citing `voyage-4` series and `voyage-context-3`). The choice is
vendor-aligned on both sides.

Default model: `voyage-3.5-lite` (cost-optimized, 1024-dim default).
Switchable to `voyage-code-3` for code retrieval and `voyage-4-large`
when quality warrants the spend.

## Why AlloyDB mirror (OPE3)

Turbopuffer stores vectors + flat metadata. Relational queries
(joins across `documents`, `runs`, `authors`, etc.) need a Postgres.
AlloyDB Omni 17.7 from PR #174 is the canonical Postgres for this
chassis — same instance per cloud session, free, fast, columnar
engine for analytical reads.

The bridge writes:
- **Turbopuffer namespace**: `{id, vector, metadata}` per row.
- **AlloyDB table**: `{id, content_text, metadata jsonb, created_at}`
  for relational lookups. `id` is the join key.

## What this PR does NOT do

- Does not publish the plugin to a marketplace (deferred until the
  knowledge-work-profiles sibling repo exists)
- Does not implement skill commands beyond `SKILL.md` frontmatter
  (skills today are knowledge surfaces; slash commands are PR-7 style
  expansion)
- Does not extend the Voyage client beyond `embed()` (no reranker,
  no multimodal — those are follow-ups)

## Citations

- Issue #175 — gating outcomes + tests
- PR #174 — AlloyDB Omni + Redis cloud-env bootstrap
- PR #172 — polyrepo sibling ADR
- [`vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md`](../../vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md)
- [`vendor/turbopuffer/turbopuffer.com/docs/performance.md`](../../vendor/turbopuffer/turbopuffer.com/docs/performance.md)
- [`subagentceo/knowledge-work-plugins/cowork-plugin-management`](https://github.com/subagentceo/knowledge-work-plugins/tree/main/cowork-plugin-management)
