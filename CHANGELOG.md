# Changelog

All notable changes to this project are tracked here. This file is maintained
automatically by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

## [0.1.0] - 2026-05-09

### Features

- Four-lane knowledge bridge MCP server on MCP SDK v2
  (`src/mcp/bridge-server.ts`) with one lane module per source:
  - `anthropic.com/engineering` (`engineering_index`, `engineering_fetch`,
    `engineering_search`)
  - `claude.com/blog` (`blog_index`, `blog_fetch`, `blog_search`)
  - `support.claude.com` (`support_collections`, `support_collection`,
    `support_article`)
  - `llms.txt` namespaces (`llms_namespaces`, `llms_fetch`, `llms_grep`)
- Claude Agent SDK orchestrator (`src/agent/run.ts`) with one sub-agent per
  bridge; each sub-agent's tool surface is restricted to its lane.
- OAuth-only auth gate (`src/oauth/token.ts`): refuses to run if
  `ANTHROPIC_API_KEY` is set or no OAuth token is provided.
- Seed prompts in `seeds/prompts/` for the orchestrator and four bridge
  sub-agents.
- Mintlify documentation site (`docs/`) with one page per bridge plus
  reference pages for the MCP server, orchestrator, and OAuth contract.
- Session artifact (`docs/session-artifact.md`): how the original ten
  tool-family decomposition was rotated into four content-source bridges.

### Chores

- `release-please` configured for automated CHANGELOG + version bumps.
