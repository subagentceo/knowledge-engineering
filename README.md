# knowledge-engineering

subagentceo ad-hoc R&D developer portal for polyrepo knowledge engineering.

A [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)
orchestrator wired to a **four-lane knowledge bridge** over a single MCP SDK
v2 stdio server.

| Bridge | Sub-agent | Tools |
|---|---|---|
| `anthropic.com/engineering` | `anthropic-engineering` | `engineering_index`, `engineering_fetch`, `engineering_search` |
| `claude.com/blog` | `claude-blog` | `blog_index`, `blog_fetch`, `blog_search` |
| `support.claude.com` | `support-claude` | `support_collections`, `support_collection`, `support_article` |
| `llms.txt` namespaces | `llms-txt` | `llms_namespaces`, `llms_fetch`, `llms_grep` |

The stack is **TypeScript only** and **OAuth only**; `ANTHROPIC_API_KEY` is
explicitly rejected at startup. See `docs/reference/auth.md`.

## Layout

```
seeds/prompts/                    Reusable prompt seeds (cache_control: ephemeral)
src/oauth/token.ts                OAuth-only auth gate
src/mcp/bridge-server.ts          Stdio MCP SDK v2 server (entry point)
src/mcp/bridge-utils.ts           HTTP helpers
src/mcp/lanes/*.ts                One file per bridge
src/agent/run.ts                  Orchestrator + four sub-agents
docs/                             Mintlify site (four bridge pages)
release-please-config.json        Automated changelog config
.github/workflows/release-please.yml
```

## Run

See `docs/quickstart.md`.

```bash
npm install && npm run build
export CLAUDE_CODE_OAUTH_TOKEN=...   # claude setup-token
npm run dev -- "What has Anthropic said about MCP across engineering, blog, and support?"
```
