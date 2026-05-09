# knowledge-engineering

subagentceo ad-hoc R&D developer portal for polyrepo knowledge engineering.

A [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) node with:

- A **sub-agent** (`npm-research`) restricted to a custom MCP server.
- An **MCP server** built on `@modelcontextprotocol/sdk` exposing four
  read-only npm public-registry tools (`npm_org_packages`,
  `npm_package_metadata`, `npm_downloads`, `npm_search`).
- An **Anthropic SDK example** (`src/examples/anthropic-features.ts`)
  exercising prompt caching, tool caching, Citations, programmatic tool
  calling, and deep-links.
- **Automated CHANGELOG.md** via [release-please](https://github.com/googleapis/release-please).
- A **Mintlify** docs site (`docs/`) namespaced from the ten tool lanes in the
  upstream `llms.txt` sources.
- A **session artifact** (`docs/session-artifact.md`) — the tool-anchored
  llms.txt bridge that this v0.1 was decomposed from.

See `docs/quickstart.md` to run.

## Layout

```
seeds/prompts/                    Reusable prompt seeds (cache_control: ephemeral)
src/mcp/npm-registry-server.ts    MCP server (stdio)
src/agent/run.ts                  Orchestrator + sub-agent wiring
src/examples/anthropic-features.ts
docs/                             Mintlify site
release-please-config.json        Automated changelog config
.github/workflows/release-please.yml
```
