# CLAUDE.md — project-level context for Claude sessions

> Loaded automatically by `claude` (CLI + Desktop + VS Code). Closes Phase 14.A per issue #49.

## What this repo is

A **multi-agent research chassis** that solo founders fork to ship a Claude-powered product. Orchestrator + sub-agents (`npm-research`, `verifier`, `crawl-curator`) over an MCP bridge with 16+ tools spanning 25 vendor doc surfaces.

**Auth is OAuth-only.** `ANTHROPIC_API_KEY` is rejected at every layer (`src/oauth/token.ts`, the Worker env-sanitizer, the Sandbox container env-sanitizer). The chassis fails closed when the key is present.

## Agent-to-agent writing style (codegen-latency optimized)

> Goal: minimize round-trips and prose. Maximize cited, batched tool calls.

Format rules:
- **Minimize prose.** No throat-clearing, no recap, no "great question". Output = tool calls + terse confirmations.
- **No clarifying questions** unless the action is irreversible or changes identity/scope. Decide, act, flag.
- **Citations are mandatory, not decorative.** Every codegen step cites its source: `@cite vendor/...` or `@cite context7:<library>/<topic>` or `@cite seeds/...`. Enforced by `scripts/lib/citation-guard.ts`.

Tool-call rules (batching > sequencing):
- **Batch parallel MCP calls in one assistant message** (multiple `tool_use` blocks per turn). Independent reads (Read, Grep, Glob, context7, vendor-doc fetches) — always parallel.
- **Use `code-mode` MCP for >2 dependent calls.** `mcp__MCP_DOCKER__code-mode` / `mcp__outcomes-mcp__code` runs TypeScript that issues many MCP calls in a single round-trip. Use it whenever a chain would otherwise be 3+ sequential tool_use turns. Cite: `vendor/anthropics/code.claude.com/docs/en/api/code-mode.md` if present, otherwise context7 lookup of "anthropic code mode mcp".
- **Multi-PR sweep heuristic.** Iterating PRs one-at-a-time with `gh pr view; gh pr close; gh pr reopen; gh pr merge` is N×4 round-trips per PR — for 5 PRs that is 20 sequential turns. Write a single TypeScript program that uses `mcp__MCP_DOCKER__code-mode` so the entire sweep is one round-trip. Same pattern for any multi-entity loop (mass-comment, label sweeps, status surveys). Cite: `seeds/citations/programmatic-tool-calling.md`.
- **Worktree isolation for parallel coworkers.** When forking `Agent()` for engineering work, use `isolation: "worktree"` and give the agent a clear task budget (max tool calls, max wall-clock, what to skip). The worktree is auto-cleaned if no changes are made. Reserves the main checkout for orchestration.
- **Citation tool order of preference:** (1) `vendor/` local markdown (zero-latency, mirrored), (2) `mcp__plugin_context7_context7__query-docs` for library APIs not in vendor/, (3) `mcp__MCP_DOCKER__search_cloudflare_documentation` for CF specifics, (4) `mcp__MCP_DOCKER__fetch_generic_documentation` last resort.
- **Never** sequential-poll when the harness will notify on completion. Never sleep to wait for a tool result.

Code-output rules:
- **No comments explaining what the code does** — well-named identifiers carry that. Only WHY comments (hidden constraints, citations, workarounds).
- **No defensive code at internal boundaries.** Validate at system edges only.
- **No half-implementations.** Either ship a working slice or don't open the file.

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

## `third_party/` is gitignored (OHYG1)

`third_party/` is the operator-side read-only upstream mirror — workerd, workers-sdk, terragrunt, vendored agent-skills, etc. Never tracked in git, never scanned by the verify chain or OSV. **Do not** add files there in a commit; **do not** assume CI sees that directory. Local agent operations (Grep/Glob/find) should pass an explicit exclude OR rely on git-aware tools (`git grep`, `git ls-files`) so they don't traverse 13k+ upstream files. Defense in depth: `.gitignore` excludes the path from git; `.github/workflows/osv-scanner.yml` passes `--experimental-exclude=third_party` to OSV as a belt-and-suspenders.

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

**BANNED_RE (OPM3, load-bearing).** `src/lib/conventions.test.ts` rejects commit subjects matching `/^(chore|ci)(\([^)]*\))?:\s*(nudge|drain|re-?trigger|serial drain|kick|poke|bump)\b.*\bci\b/i`. Sync-after-rebase commits MUST describe what was done, not the CI action. Safe pattern: `chore(<scope>): sync branch to main after <topic> merge (O<N>)`. Banned: `chore: retrigger CI ...`.

## PR loop discipline (OAUTO17)

The branch ruleset `Protect main — no HITL` (id `16440994`) requires two contexts: `npm run verify` + `OSV-Scanner (PR) / osv-scan`. With `strict_required_status_checks_policy: true`, PRs must also be up-to-date with main.

- **`workflow_dispatch` does NOT satisfy required checks.** It produces `OSV-Scanner (push / schedule) / osv-scan` — a DIFFERENT context name than the required `OSV-Scanner (PR) / osv-scan`. Only `pull_request`-triggered runs create the required context.
- **GitHub App-pushed commits suppress `pull_request` events** (anti-recursion). After `gh pr update-branch` or auto-rebase's App-authored merge, `branch-guard`, `agent-cost-gate`, and `OSV-Scanner (PR)` never fire on the new head SHA → PR stuck `BLOCKED`.
- **Fix:** `gh pr close N && gh pr reopen N && gh pr merge N --auto --rebase`. The reopen event creates a fresh `pull_request` payload that fires those workflows. Codified in `.github/workflows/auto-rebase.yml` `rescue-blocked-prs` job (PR #327 — OAUTO17).
- **Multi-PR sweeps: write TypeScript via code-mode**, not N×4 `gh` shell calls. One round-trip beats N×4 round-trips. Cite: `seeds/citations/programmatic-tool-calling.md`.

For the full house-format breakdown of all 6 ci-loop lessons, read `docs/prompts/loop-improvements-2026-06-03.md`.

## Test-file assertion discipline

Test files in `src/lib/*.test.ts` define a local mini-DSL of helpers (`assertEqual`, `assertThrows`, `assertRejects`). When mixing these with bare Node `assert.*` calls, you MUST also `import assert from "node:assert"` — otherwise the test runner throws `assert is not defined` at runtime. Prefer the local helpers for consistency; bare `node:assert` belongs only in `docs/outcomes/*.test.ts` and other places that opt in to `node:assert/strict`. Lesson learned from PR #309 (`assertThrows` replaces `assert.throws`).

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
- `src/course-plugins/` — Claude plugin marketplace (`course-plugins`): 6 plugins / 55 skills distilled from Anthropic courses. Manifest in `.claude-plugin/marketplace.json`; raw transcripts in `docs/courses/`; sourcing in `src/course-plugins/PROVENANCE.md`.
- `enterprise-mirror/` — version-controlled tooling for the subagentmcp enterprise mirror (10 orgs / 239 repos). `setup.sh` (Mac entry point), `bootstrap-wsl.sh` (Windows 11 / WSL Ubuntu reproduction), SessionStart drift hook, `.meta/{fetch.sh,build.py}`, redis 7.0 + postgres 16 devcontainer. Companion `/refresh-manifest` skill in `.claude/skills/`.
- `docs/reference/programmatic-tool-calling.md` — mirrored Claude API doc on programmatic (code-execution) tool calling.
