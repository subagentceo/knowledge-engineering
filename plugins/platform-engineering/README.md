# platform-engineering Claude Code plugin

A personalized Claude Code plugin for the operator that bundles four
platform concerns into one installable surface.

Modeled after [`subagentceo/knowledge-work-plugins/cowork-plugin-management`](https://github.com/subagentceo/knowledge-work-plugins/tree/main/cowork-plugin-management)
and [`engineering`](https://github.com/subagentceo/knowledge-work-plugins/tree/main/engineering)
but adapted: those plugins target Cowork desktop / enterprise teams;
this one targets a single operator's local-first workflow with their
own Docker MCP profile.

## Why personalized

The operator runs a Docker MCP Toolkit profile at
`docker.io/subagentceo/platform_engineering:latest` with GitHub +
Atlassian + Neon + Redis Cloud + Filesystem servers. Credentials live
in the macOS Keychain via `docker mcp secret`; OAuth is brokered by
Docker Desktop. This plugin's `.mcp.json` points Claude Code (and
Claude Desktop) at that gateway rather than at remote HTTP MCP servers
the way the public Cowork plugins do.

Result: secrets stay on-device; auth is unified through Docker.

## Skills

| Skill | What it does |
|---|---|
| `install-alloydb` | Cloud-env Setup script + SessionStart hook + service-start script for AlloyDB Omni 17.7 + Redis 7.0 (the PR #174 stack) |
| `docker-platform-engineering` | Wiring Claude Code / Claude Desktop to the Docker MCP `platform_engineering` profile; secret rotation; profile push/pull |
| `turbopuffer-embeddings` | Voyage AI embeddings → Turbopuffer namespace → AlloyDB metadata mirror. Voyage chosen per Anthropic's public recommendation |
| `citations-tests-outcomes` | Per-test `@cite` discipline, outcome-driven Conventional Commits, evaluation matrices in PR bodies (the discipline this repo enforces) |

## Installation

Until this folder is published as its own marketplace, install from
the local checkout:

```bash
# Future (when subagentceo/knowledge-work-profiles publishes a marketplace):
# claude plugins add subagentceo/knowledge-work-profiles/platform-engineering

# Today: install via the plugin marketplace command pointing at this repo:
claude plugins marketplace add subagentceo/knowledge-engineering
claude plugins install platform-engineering@knowledge-engineering
```

## Citations

- [`subagentceo/knowledge-work-plugins/cowork-plugin-management`](https://github.com/subagentceo/knowledge-work-plugins/tree/main/cowork-plugin-management) — plugin layout reference
- [`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](../../docs/decisions/2026-05-16-polyrepo-sibling-pattern.md) — eventual move to `subagentceo/knowledge-work-profiles`
- Issue #175 — outcomes, evaluation criteria, required tests
