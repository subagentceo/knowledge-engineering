# knowledge-engineering

A **four-lane knowledge bridge** for the Claude Agent SDK.

A single orchestrator delegates primary research to a `npm-research`
sub-agent (npm public registry, four MCP tools) and grading to a `verifier`
sub-agent (anthropic.com/engineering, claude.com/blog, support.claude.com,
llms.txt namespaces — twelve MCP tools, three per lane). Both sub-agents
talk to stdio MCP servers built on the high-level `McpServer.tool()` API
("v2 idioms") from `@modelcontextprotocol/sdk@^1.29`. Auth is OAuth-only.

> The published `@modelcontextprotocol/sdk` package is on the 1.x major
> (1.29 at time of writing). When this repo and the upstream task description
> say "MCP SDK v2", we mean the high-level `McpServer.tool(name, description,
> inputShape, handler)` API surface — not a 2.x major release.

## Outcome

- One TypeScript codebase, ESM, runnable with `tsx`.
- Two MCP servers (high-level `McpServer.tool()` API), both stdio, both Zod-typed:
  - `src/mcp/npm-registry/` — `npm_org_packages`, `npm_package_metadata`, `npm_downloads`, `npm_search`.
  - `src/mcp/bridge-server.ts` (+ `lanes/*`) — twelve `engineering_*`, `blog_*`, `support_*`, `llms_*` tools.
- Three sub-agents, each with a separate context: `orchestrator`,
  `npm-research`, `verifier`. Verifier runs **after** npm-research and
  grades it against a rubric, per
  [`built-multi-agent-research-system`](https://www.anthropic.com/engineering/built-multi-agent-research-system).
- OAuth-only billing. The runtime fails closed if `ANTHROPIC_API_KEY` is
  set — see `src/oauth/token.ts`. No fallback path.

## The four lanes

| Lane | Source | Docs |
|---|---|---|
| `engineering` | <https://www.anthropic.com/engineering> | [`docs/lanes/engineering/`](docs/lanes/engineering/index.md) |
| `blog` | <https://www.claude.com/blog> | [`docs/lanes/blog/`](docs/lanes/blog/index.md) |
| `support` | <https://support.claude.com> | [`docs/lanes/support/`](docs/lanes/support/index.md) |
| `llms` | namespaces under `*.claude.com/llms.txt`, `anthropic.com/llms.txt` | [`docs/lanes/llms/`](docs/lanes/llms/index.md) |

The full tool-family-to-lane map is in [`docs/architecture.md`](docs/architecture.md).

## Quickstart

```bash
unset ANTHROPIC_API_KEY                # OAuth-only — having it set fails closed
export CLAUDE_CODE_OAUTH_TOKEN=...     # mint via `claude setup-token`
npm install
npm run build
npm run dev "What's the latest @modelcontextprotocol/sdk version, and where has anthropic.com/engineering covered MCP recently?"
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Run the orchestrator end-to-end (OAuth-only). |
| `npm run mcp:bridge` | Start the four-lane bridge MCP server on stdio. |
| `npm run mcp:npm-registry` | Start the npm-registry MCP server on stdio. |
| `npm run example:prompt-caching` | Demo prompt caching via `cache_control: ephemeral`. |
| `npm run example:tool-caching` | Demo caching the `tools` array as one prefix. |
| `npm run example:citations` | Demo grounded citations from a `document` block. |
| `npm run example:programmatic-tool-loop` | Drive a Messages API tool-use loop. |
| `npm run example:deep-links` | Build `claude://` and `claude.ai/new?q=` deep links. |
| `npm run verify:mcp` | Smoke-test both MCP servers via `@modelcontextprotocol/inspector`. |
| `npm run verify:tf` | `terraform validate` + `terraform plan` against `infra/terraform/`. |
| `npm run verify` | Run every `verify:*` in sequence. |

## OAuth-only billing

This stack never reads `ANTHROPIC_API_KEY`. Every entry point starts by
calling `requireOAuth()`; if `ANTHROPIC_API_KEY` is set the process exits
non-zero before any model call. Billing therefore stays on the Max-plan
OAuth identity (or the `CLAUDE_CODE_OAUTH_TOKEN` you mint with
`claude setup-token`). See `src/oauth/token.ts` for the gate.

## Cloudflare-IaC (opt-in, off by default)

`infra/terraform/` is a skeleton. It pins the Cloudflare provider from the
`CLOUDFLARE_TERRAFORM_PROVIDER_VERSION` env var and reads the zone from
`CLOUDFLARE_ZONE`. The shared plugin cache lives at `TF_PLUGIN_CACHE_DIR`.

`verify:tf` runs **`terraform validate` and `terraform plan` only** — no
`apply`. To take the IaC further, layer on the Cloudflare MCP server at
`${CLOUDFLARE_MCP_URL}` (default: <https://mcp.cloudflare.com/mcp>) for
runtime control; that path is opt-in and the orchestrator does not connect
to it without a separate `claude mcp add`.

## Repo layout

```
seeds/prompts/                  system-orchestrator | subagent-npm-research | subagent-verifier | citation-research
src/lib/cache-control.ts        cachedText / withCacheBreakpoint helpers
src/oauth/token.ts              ANTHROPIC_API_KEY-rejecting OAuth gate
src/mcp/npm-registry/           server.ts + tools/*.ts + schemas.ts (Zod)
src/mcp/bridge-server.ts        four-lane bridge composition
src/mcp/lanes/*.ts              engineering | blog | support | llms.txt lanes
src/mcp/bridge-utils.ts         fetchText/fetchHtml/jsonResult/normalizeSlug
src/agent/run.ts                orchestrator + npm-research + verifier
src/examples/*.ts               prompt-caching | tool-caching | citations | programmatic-tool-loop | deep-links
scripts/verify.ts               MCP inspector smoke + terraform validate
infra/terraform/                Cloudflare zone skeleton (validate/plan only)
docs/                           Mintlify site: architecture, lanes/{engineering,blog,support,llms}/, reference/
release-please-config.json      conventional commits → CHANGELOG.md
```

## Session

Generated by [Claude Code](https://claude.ai/code/session_016FaBnqQMe9CDzASE8qbhoj).
