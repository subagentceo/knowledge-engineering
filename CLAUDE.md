# CLAUDE.md — project-level context for Claude sessions

> Loaded automatically by `claude` (CLI + Desktop + VS Code). Closes Phase 14.A per issue #49.

## What this repo is

A **multi-agent research chassis** that solo founders fork to ship a Claude-powered product. Orchestrator + sub-agents (`npm-research`, `verifier`, `crawl-curator`) over an MCP bridge with 16+ tools spanning 25 vendor doc surfaces.

**Auth is OAuth-only.** `ANTHROPIC_API_KEY` is rejected at every layer (`src/oauth/token.ts`, the Worker env-sanitizer, the Sandbox container env-sanitizer). The chassis fails closed when the key is present.

## Quickstart for a Claude session

If you (Claude) are starting a session in this repo, do this first:

1. **Read `seeds/posture/session-start.xml`** — the load-bearing XML primitive. Encodes auth posture, commit-per-todo discipline, /routines pattern, codemode + sandbox posture, doc-rules, sources.
2. **Read `docs/CONVENTIONS.md`** — outcome-driven Conventional Commits. Every commit ends with `(O<N>)`.
3. **Read `docs/PROJECT.md`** — Cowork-style project manifest.
4. **Read `docs/pending.md`** — live action dashboard. Your queue.
5. **Read `seeds/memory/heartbeat/last-tick.md`** — what the previous tick decided.

## Loaded primitives

| Primitive | File |
| :--- | :--- |
| Posture XML | `seeds/posture/session-start.xml` |
| Operator seeds (5 of them) | `seeds/prompts/operator-2026-05-10*.md`, `seeds/prompts/operator-2026-05-15-*.md` |
| Heartbeat memory | `seeds/memory/heartbeat/` (last-tick, next-actions, decisions, open-questions) |
| Rubrics | `rubrics/phase-{0..16}.md` |
| Citation extracts | `seeds/citations/*.md` (15+ extracts of cited vendor docs) |
| Skills | `.claude/skills/{heartbeat,routines,refresh-vendors,schedule-bridge}/SKILL.md` (SDK-discoverable directory form per `agent-sdk/claude-code-features.md`) |
| Plugin manifest | `.claude/plugins.json` (3 marketplaces) |

## Run commands

| Action | Command |
| :--- | :--- |
| Verify chain | `npm run verify` |
| Crawl all vendors | `npm run crawl:vendors` |
| Crawl one vendor | `npm run crawl:vendor -- <name>` |
| Run orchestrator locally | `npm run dev "<task>"` |
| Worker local dev | `npm run sandbox:dev` |
| Grade a phase | `npm run grade -- phase-<N>` |
| Install marketplace plugins | `npm run install:plugins` |

## OAuth-only invariant

The repo's hard rule: `ANTHROPIC_API_KEY` is **never** set. Anywhere. The OAuth gate at `src/oauth/token.ts` fails closed when it's present. The Cloudflare Worker's env-sanitizer rejects it before passing env into the Sandbox.

If you see code that wants `ANTHROPIC_API_KEY`, it's a bug or a leak. Fix it; don't accommodate it.

## Tool surface

- **16+ MCP tools** across 5 lanes: `engineering_*`, `blog_*`, `support_*`, `llms_*`, `vendor_*` plus `search_tools` (progressive disclosure)
- **25 vendor doc mirrors** under `vendor/`:
  - **First-party Anthropic surfaces:** `anthropics/` (code.claude.com + platform.claude.com + claude.com/docs), `claude-sitemap/` (claude.com blog + connectors + customers + plugins + resources + solutions + code-with-claude + support.claude.com EN articles), `anthropic-sitemap/` (anthropic.com engineering + news + research + learn + product + features + economic-futures + claude)
  - **Ecosystem & subprocessors:** cloudflare, neon, stripe, twilio, workos, elevenlabs, aws, gcp, sentry, intercom, brave-search, sift, arkose-labs, modelcontextprotocol, openfeature, opentelemetry, parallel-web, turbopuffer, spotify-confidence, nimble, iterable, osv-scanner
- **2 MCP servers**: `src/mcp/bridge-server.ts` (the knowledge bridge) and `src/mcp/npm-registry/server.ts` (npm-research lane)

## Citation discipline

Every test file MUST have an `@cite` header pointing at `vendor/`, `seeds/`, or `rubrics/`. Enforced by `scripts/lib/citation-guard.ts` in the verify chain.

Example:
```ts
/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */
```

## Commit discipline

Every commit ends with `(O<N>)`. The convention test (`src/lib/conventions.test.ts`) enforces this for commits authored after 2026-05-15T04:30Z. Pre-convention commits are grandfathered.

```
feat(neon): wire ws constructor for Pool websocket (O1)

Closes #N
Refs O1
```

## See also

- `RUNBOOK.md` — using Claude Opus 4.7 (1M context) as the web orchestrator
- `CONTRIBUTING.md` — forking-founder onboarding
- `DEVELOPER.md` — developer setup + workflows
- `README.md` — surface overview
- `docs/architecture.md` — runtime topology
- `docs/governance.md` — branch ruleset + auto-merge state machine
- `docs/decisions/` — ADRs. Load-bearing recent ones:
  - `2026-05-16-osv-only-no-secret-scanning.md` (OSL1) — GoogleOSV-only; secret_scanning_* + dependabot_security_updates must remain disabled
  - `2026-05-16-platform-engineering-plugin.md` (OPE1) — Voyage→Turbopuffer→AlloyDB bridge + plugin scaffolding
  - `2026-05-16-enterprise-control-plane.md` (OCP1) — knowledge-engineering as the operator's enterprise/org control plane
  - `2026-05-16-polyrepo-sibling-pattern.md` (OPR1) — env-var-abstraction for sibling repos (no submodules)
  - `2026-05-16-org-repo-settings-policy.md` — org/repo settings adopted from Anthropic reference repos (superseded in part by OSL1)
