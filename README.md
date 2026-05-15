# knowledge-engineering

> **Solo-founder chassis for shipping a Claude-powered product.** Multi-agent research orchestrator + 28 vendor doc mirrors + 16+ MCP tools across 5 lanes + Cloudflare Sandbox runner + Neon-branched per-PR previews. OAuth-only.

This repo is a **fork-and-ship chassis**, not a one-off project. The intent (per [`PRODUCTRD.md`](PRODUCTRD.md)) is that another founder clones the repo, swaps the seed prompts and vendor list, and inherits everything else: the verify chain, the heartbeat memory layer, the auto-merge loop, the citation discipline, the operator runbooks, and the OAuth-only posture.

## What you get

| Surface | What | Where |
| :--- | :--- | :--- |
| **Orchestrator** | Opus 4.7 (1M context) — 4 sub-agents over `@anthropic-ai/claude-agent-sdk` | `src/agent/run.ts` |
| **MCP tools** | 16+ tools across 5 lanes: `engineering_*`, `blog_*`, `support_*`, `llms_*`, `vendor_*` + `search_tools` | `src/mcp/` |
| **Vendor mirror** | 28 vendor doc surfaces (anthropics, cloudflare, neon, stripe, twilio, workos, elevenlabs, aws, openfeature, gcp, ...) — 1,369 anthropics docs alone | `vendor/` |
| **Crawler** | `crawlee` + llms.txt / html-index / sitemap.xml discovery; preflight-304 idempotency | `scripts/crawl-vendors.ts` |
| **Worker runner** | Cloudflare Sandbox + Durable Objects for per-task ephemeral execution (scaffolded) | `infra/cloudflare/` |
| **Neon branching** | Per-PR Neon DB branches via `cloudflare-preview.yml` | `migrations/`, `scripts/migrate-neon.ts` |
| **Frontend** | `outcomesdk.com` Cloudflare Worker — pretext-driven SPA over `vendor/` markdown | `frontend/` |
| **Heartbeat memory** | Cross-session orchestration state | `seeds/memory/heartbeat/` |
| **Feature flags** | OpenFeature + Cloudflare Flagship provider | `src/lib/openfeature.ts` |
| **Plugin manifest** | 3 Anthropic marketplaces (official, knowledge-work, community) | `.claude/plugins.json` |

## Quickstart

```bash
unset ANTHROPIC_API_KEY                       # OAuth-only — fails closed if this is set
export CLAUDE_CODE_OAUTH_TOKEN=...            # mint via `claude setup-token`
npm install
npm run verify                                # mcp + tf + citations + gates + libs + freshness + project
npm run dev "trivial test query"              # local orchestrator turn
```

See [`DEVELOPER.md`](DEVELOPER.md) for the full first-time setup + day-to-day workflows.

## Where to start reading

| Doc | When to read |
| :--- | :--- |
| [`CLAUDE.md`](CLAUDE.md) | A Claude session starting in this repo — load-bearing context auto-loaded by `claude` |
| [`DEVELOPER.md`](DEVELOPER.md) | First-time setup; adding a vendor / lane / skill / test |
| [`RUNBOOK.md`](RUNBOOK.md) | Using Claude Opus 4.7 1M context as the web orchestrator |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Forking-founder onboarding + PR discipline |
| [`docs/architecture.md`](docs/architecture.md) | Runtime topology |
| [`docs/governance.md`](docs/governance.md) | Branch ruleset + auto-merge state machine |
| [`docs/security.md`](docs/security.md) | OSV-Scanner dependency-vuln gate posture |
| [`docs/context-management.md`](docs/context-management.md) | Token counting, cache boundary, settingSources, safety hooks |
| [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) | Outcome-driven Conventional Commits |
| [`docs/PROJECT.md`](docs/PROJECT.md) | Cowork-style project manifest |
| [`docs/pending.md`](docs/pending.md) | Live action dashboard — operator + agent queue |
| [`docs/operator-runbooks/README.md`](docs/operator-runbooks/README.md) | Claude-in-Chrome operator runbooks (CF API token, GH PAT, etc.) |
| [`PRODUCTRD.md`](PRODUCTRD.md) | Chassis intent + functional requirements |
| [`SUBPROCESSORS.md`](SUBPROCESSORS.md) | Vendor inventory for fork-time re-evaluation |

## The 5 lanes

| Lane | Source | Tools |
| :--- | :--- | :--- |
| `engineering` | anthropic.com/engineering | `engineering_{index,fetch,search}` |
| `blog` | claude.com/blog | `blog_{index,fetch,search}` |
| `support` | support.claude.com | `support_{collections,collection,article}` |
| `llms` | namespaces under `*.claude.com/llms.txt`, `anthropic.com/llms.txt`, vendor llms.txts | `llms_{namespaces,fetch,grep}` |
| `vendor` | the local `vendor/` mirror (28 surfaces) | `vendor_{list,fetch,grep}` |

Plus `search_tools` for progressive disclosure across the surfaces.

The full lane-to-tool map is in [`docs/architecture.md`](docs/architecture.md). Per-lane docs at `docs/lanes/{engineering,blog,support,llms,vendor}/index.md`.

## Sub-agents

| Sub-agent | Tools | Purpose |
| :--- | :--- | :--- |
| `npm-research` | 4 npm-registry MCP tools | Primary npm data; cites registry URLs |
| `verifier` | 12 knowledge-bridge tools (excl. vendor_*) | Independent grader vs `docs/rubric.md` |
| `crawl-curator` | 3 `vendor_*` tools | Per-vendor `crawl.json` audits + drift detection |

The orchestrator pattern follows [`anthropic.com/engineering/built-multi-agent-research-system`](https://www.anthropic.com/engineering/built-multi-agent-research-system) — verifier runs **after** npm-research and grades its output before the orchestrator marks a docs-lane todo `completed`.

## OAuth-only billing — hard invariant

This stack never reads `ANTHROPIC_API_KEY`. Every entry point starts by calling `requireOAuth()`; if `ANTHROPIC_API_KEY` is set the process exits non-zero before any model call. Billing stays on the Max-plan OAuth identity. The Cloudflare Worker env-sanitizer rejects the key before passing env into the Sandbox container, and the `PreToolUse(Bash)` hook in `src/lib/safety-hooks.ts` blocks `export ANTHROPIC_API_KEY=` at runtime.

See `src/oauth/token.ts` (gate), `infra/cloudflare/src/env-sanitize.ts` (Worker boundary), `src/lib/safety-hooks.ts` (runtime hook).

## Discipline

- **Outcome-driven Conventional Commits.** Every commit subject ends with `(O<N>)`. The convention test (`src/lib/conventions.test.ts`) enforces this for commits authored after `2026-05-15T04:30Z`. See [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md).
- **Citation-required tests.** Every `*.test.ts` under `scripts/lib/`, `src/lib/`, `infra/cloudflare/src/` must have an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`. Enforced by `scripts/lib/citation-guard.ts`.
- **Skills as SDK-discoverable artifacts.** `.claude/skills/<name>/SKILL.md` (directory form) per [`code.claude.com/docs/en/agent-sdk/claude-code-features.md`](vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md).
- **Auto-merge on green.** Apply `automerge` label; CI gates merge.
- **Heartbeat memory.** Cross-session state lives in `seeds/memory/heartbeat/{last-tick,next-actions,decisions,open-questions}.md`. Cited by the heartbeat skill at `.claude/skills/heartbeat/SKILL.md`.

## Verify chain

```bash
npm run verify       # full chain: ~30-60s on a clean repo
```

| Step | What | Cost |
| :--- | :--- | :--- |
| `verify:mcp` | Builds + asserts tool count on each MCP server | seconds |
| `verify:tf` | `terraform validate` + `terraform plan` | seconds |
| `verify:citations` | Lints test files for `@cite` headers | seconds |
| `verify:gates` | Asserts `docs/phase-gates.md` matches `rubrics/phase-N.md` | seconds |
| `verify:libs` | Auto-runs every `*.test.ts` under `scripts/lib/`, `src/lib/`, `infra/cloudflare/src/` | seconds |
| `verify:freshness` | Warns on stale vendor mirrors (>14d) | seconds |
| `verify:project` | Asserts `docs/PROJECT.md` sections + `docs/pending.md` freshness | seconds |

## Repo layout

```
src/                — orchestrator + MCP servers + lib helpers
vendor/             — mirrored vendor docs (28 surfaces; first-class git content)
scripts/            — crawler, verify chain, grader, install-plugins, context-budget, ...
infra/cloudflare/   — Cloudflare Worker (Sandbox + Neon branching) — scaffolded
frontend/           — outcomesdk.com (pretext-driven SPA)
docs/               — architecture, governance, conventions, PROJECT, pending, plans, runbooks
seeds/              — operator prompts, posture XML, citation extracts, heartbeat memory
rubrics/            — per-phase outcome rubrics (0..18)
.claude/            — skills (directory form), plugins, agents, settings
.github/            — workflows (verify, OSV, neon-branch, auto-merge, claude-review, ...)
migrations/         — Neon SQL migrations
servers/            — auto-generated MCP-tool wrapper tree (Phase 6.A; codemode wiring pending)
```

## See also

- [`PRODUCTRD.md`](PRODUCTRD.md) — chassis intent + functional requirements
- [`SUBPROCESSORS.md`](SUBPROCESSORS.md) — vendor + service inventory
- [`docs/PROJECT.md`](docs/PROJECT.md) — Cowork-style manifest
- [`seeds/posture/session-start.xml`](seeds/posture/session-start.xml) — XML primitive loaded by every session
- [`seeds/prompts/`](seeds/prompts/) — operator seeds (5+ files)
