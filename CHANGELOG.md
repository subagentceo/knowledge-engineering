# Changelog

All notable changes to this project are tracked here. This file is maintained
automatically by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

## [0.1.0] - 2026-05-09

### Features

- Initial Claude Agent SDK node scaffold (`src/agent/run.ts`).
- npm-registry MCP server with `npm_org_packages`, `npm_package_metadata`,
  `npm_downloads`, `npm_search` (`src/mcp/npm-registry-server.ts`).
- Anthropic SDK example wiring prompt caching, tool caching, citations,
  programmatic tool calling, and deep-links (`src/examples/anthropic-features.ts`).
- Seed prompts in `seeds/prompts/` for orchestrator, npm-research sub-agent,
  and citation-grounded research.
- Mintlify documentation strategy (`docs/`).
- Session artifact: tool-anchored llms.txt bridge (`docs/session-artifact.md`).

### Chores

- `release-please` configured for automated CHANGELOG + version bumps.
