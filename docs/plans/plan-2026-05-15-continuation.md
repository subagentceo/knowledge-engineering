# Plan — 2026-05-15 continuation

> **Successor to** the initial plan (`/root/.claude/plans/vendor-directory-parallel-taco.md`, snapshotted in PR #59 at `docs/snapshots/2026-05-15-stable/plans/`).
>
> **Authored by** the lead orchestration agent (Claude Opus 4.7) at session
> `9d8f8432-101f-466f-9c31-b1021ea934e7` end-of-day, after merging 19+ PRs
> covering Phases 13.B+ → 16, Phase 14 (Neon MCP + multi-platform), the
> heartbeat persistence layer, the auto-merge audit + Neon WebSocket fix,
> and the outcome-driven Conventional-Commits discipline.
>
> **Status:** scope-only. Tasks/subtasks/todos declared with outcome IDs;
> execution happens in subsequent PRs.

## Citations

This plan cites:

- `vendor/anthropics/code.claude.com/docs/en/platforms.md` — 6 surfaces + 5 integrations + 5 away-from-terminal mechanisms
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` — cloud-session environment, setup scripts, network access
- `vendor/anthropics/code.claude.com/docs/en/desktop.md` — Desktop tab, parallel sessions, Dispatch, computer use
- `vendor/anthropics/code.claude.com/docs/en/devcontainer.md` — dev-container feature + reference image
- `vendor/anthropics/code.claude.com/docs/en/vs-code.md` — VS Code extension; the bundled IDE MCP server
- `vendor/anthropics/code.claude.com/docs/en/jetbrains.md` — JetBrains plugin parity
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` — outcome-driven discipline (cited via `seeds/citations/define-outcomes.md`)
- `seeds/citations/vendor-graph-v2.xml` — the 30-entity vendor catalogue (PR #70)
- `docs/CONVENTIONS.md` — outcome-driven Conventional Commits (PR #76)
- `seeds/memory/heartbeat/` — the persistence layer + 11 tick records (PRs #66, #67, #71, #73, #74, #75, #77 + tick 11 spotify)

## Where we are right now (2026-05-15 EOD)

### Merged into `main` today

| # | PR | Subject | Outcome theme |
| :--- | :---: | :--- | :--- |
| 1 | #60 | `db_url_pooled` (wrong) | Neon CI diagnostic — superseded |
| 2 | #61 | `@v5` + `db_url_with_pooler` per Neon docs | Neon CI diagnostic |
| 3 | #63 | NEON_DATABASE_URL sanity-check step | Neon CI diagnostic |
| 4 | #65 | `::error::` annotation surface | Neon CI diagnostic |
| 5 | #66 | Heartbeat bootstrap (`seeds/memory/heartbeat/`) | Orchestration foundation |
| 6 | #67 | `page_cap=0` sentinel + relative-URL parser fix | Crawler bug fixes |
| 7 | #69 | `warmConnection()` retry (cold-start cover) | Neon CI hardening |
| 8 | #70 | Phase 16 catalog + 7 new vendor configs + rubric | Vendor coverage |
| 9 | #72 | `ws` constructor — **actual** Neon root cause | Neon CI **fixed** |
| 10 | #73 | Tick-7 audit record (auto-merge gap, 2-layer) | Heartbeat memory |
| 11 | #75 | Neon secrets matrix runbook | Operator-readable inventory |
| 12 | #76 | Outcome-driven Conventional-Commits + PR template + test | **Convention adopted** |
| 13 | #77 | Spotify Confidence SDK ecosystem citation | Vendor enrichment |
| 14 | #81 | Convention test grandfathers pre-convention commits | CI hardening |
| 15 | #82 | `fetch-depth: 0` + 3-strategy fallback in test | CI hardening |
| 16 | (more) | Several content + housekeeping merges | — |

### Open PRs at EOD (operator-driven merge)

| PR | Subject | Status |
| :---: | :--- | :--- |
| #59 | Phase 13.B+ snapshot at `docs/snapshots/2026-05-15-stable/` | Closes #78; rebased; CI re-triggered |
| #62 | Phase 14 — Neon MCP + multi-platform decomposition | Closes #79; rebased; CI re-triggered |
| #64 | workos + elevenlabs vendor content (+7 refreshes) | Refs #80; rebased; CI re-triggered |
| #71 | 5-vendor tick-6 content (aws/otel/spotify-conf/parallel/nimble) | Refs #80; force-pushed with (O1) suffix |
| #74 | 3-vendor tick-8 content (brave-search/iterable/gcp) | Closes #80; force-pushed with (O1) suffix |

### Live primitives in `main`

- **Heartbeat** memory layer (11 ticks recorded)
- **Outcome-driven Conventional-Commits** + PR template + enforcement test
- **Neon per-PR branching** + migrations + schema-diff comments (full chain working)
- **Vendor coverage**: 21 vendors tracked; ~17 with content mirrors; 30-entity v2 catalogue
- **Auto-merge gap (Layer 1 closed)** — `Create Neon Branch` now reliably green
- **Auto-merge gap (Layer 2 still open)** — branch-protection ruleset not in place; operator action #37 (gated on PAT runbook)

## Unresolved work — by source

### A. From the initial plan (vendor-directory-parallel-taco)

| Phase | Status | Lift |
| :--- | :--- | :--- |
| Phase 6.B — `src/agent/run.ts` codemode wiring | Deferred at end of session 2026-05-10 | Medium — replace `tools: [...]` arrays with `tools: ["codemode", "search_tools"]`; wire `createCodeTool` from `@cloudflare/codemode/ai`. |
| Phase 7.B — `install-plugins.ts` real materializer | Deferred | Medium — `scripts/install-plugins.ts` shallow-clones marketplace subtrees into `.claude/plugins/`. |
| Phase 8 — Cloudflare Sandbox deploy | Operator-blocked on action #33 (CF API token) | High — full Worker + Sandbox + secret-store bootstrap; criteria in issue #12. |
| Phase 9 — `grade-phase.ts` ODD rubric grader | Deferred | Medium — Messages API over OAuth; fresh context per criterion. |
| Phase 10 — multi-agent decomposition refinement | Deferred | Low — add `crawl-curator` sub-agent topology. |
| Phase 11.B — batched grading + embeddings | Deferred (Phase 11.A done) | Medium — Messages Batches API; optional embeddings via Voyage + Turbopuffer (operator-pending). |
| Phase 12 — bridge as a Connector | Operator-decision pending | Low — scaffold-only PR exists at #31. |
| Phase 15.D — `verify:project` | Deferred | Low — script that mechanically validates `docs/PROJECT.md`. |
| Phase 15.E — `scripts/render-pending.ts` | Deferred | Low — auto-generate `docs/pending.md` from GH issue labels. |

### B. From today's heartbeat queue (`seeds/memory/heartbeat/next-actions.md`)

| # | Action | Lift | Status |
| :--- | :--- | :--- | :--- |
| 1 | `scripts/get-neon-db-url.ts` — auto-derive `NEON_DATABASE_URL` via Neon API | Small | Queued (next tick) |
| 2 | sift allowlist mismatch | Small | Queued |
| 3 | gcp allowlist broadening (sitemap URLs 404 vs strict `/docs/` prefix) | Small | Queued |
| 4 | spotify-confidence 38-failure investigation | Small | Deferred — moving target per tick 11 |

### C. From issue #12 acceptance criteria

| Criterion | Status | Lift |
| :--- | :--- | :--- |
| C1 — `npm run sandbox:dev` accepts POST /run | Worker code exists; npm script MISSING | Small — wire `cd infra/cloudflare && wrangler dev` |
| C2 — outbound allowlist (`evil.example` blocked; `api.anthropic.com` allowed) | Not implemented | Medium — Worker `outbound_service` allowlist + test |
| C3 — `cloudflareIndexMd` + non-markdown validator | ≈ done; `validateBody` exists | Small — confirm/rename to `CloudflareNonMarkdownError` if operator wants exception form |
| C4 — `wrangler deploy` + 4 expected secrets | Operator-blocked on action #33 | Operator |

### D. From Phase 14 open questions (PR #62)

Phase 14 T2-T8 (decomposed in `seeds/prompts/operator-2026-05-15-mcp-multiplatform.md`) await operator answers to Q1-Q6 before agent execution can resume. Each T# becomes a future PR once the relevant Q lands.

### E. From the new platform docs the operator surfaced

`platforms.md` + sibling docs (`claude-code-on-the-web.md`, `desktop.md`, `devcontainer.md`, `vs-code.md`, `jetbrains.md`) introduce mechanics not yet exercised in this repo:

| Mechanism | Status here | Next step |
| :--- | :--- | :--- |
| Web `--remote` / `--teleport` | unused | Smoke test once Phase 14 T2 confirms web MCP attach |
| Desktop `Dispatch` / `Continue in` | unused | Phase 14 T8 covers Dispatch+RemoteControl |
| `devcontainer-features/claude-code:1.0` | unused | Phase 14 T1.6 add-on (operator-driven adoption) |
| `init-firewall.sh` (egress restriction) | aligned with our outbound allowlist intent | Phase 8 C2 implementation |
| VS Code bundled IDE MCP server (`mcp__ide__getDiagnostics`, `mcp__ide__executeCode`) | not consumed | Phase 14 T2.3 smoke |
| `claude --remote-control` | unused | Phase 14 T8 RemoteControl runbook |
| `/web-setup` + Cloudflare admin auth | not configured | Operator runbook addition |
| Cloud-session env vars (`CLAUDE_CODE_REMOTE`, `CLAUDE_CODE_REMOTE_SESSION_ID`) | `setup.sh` already uses `_SESSION_ID` for the transcript URL | Extend `setup.sh` (this PR — see §H) |

### F. npm package install delta (the operator's long list)

From the operator's pasted org listings + the Conventional-Commits hint that we should "consider installing" rather than vendor-grafting all of them, the install delta is:

#### Core (already installed; verify presence)

- `@anthropic-ai/claude-agent-sdk` — already pinned at 0.2.138 (snapshot drift to 0.3.142 per PR #59)
- `@anthropic-ai/claude-code` — operator-installed CLI; not a project dep
- `@openfeature/server-sdk` — installed in PR #54
- `@neondatabase/serverless` — installed in PR #58
- `ws`, `@types/ws` — installed in PR #72
- `@modelcontextprotocol/sdk` — already used by `src/mcp/bridge-server.ts`

#### MCP servers — install for agent dispatch

| Package | Purpose | Bind via |
| :--- | :--- | :--- |
| `@modelcontextprotocol/server-filesystem` | sandboxed filesystem MCP server (per the operator's hint) | `.mcp.json` project scope |
| `@modelcontextprotocol/server-sequential-thinking` | structured planning surface | `.mcp.json` |
| `@modelcontextprotocol/server-memory` | knowledge-graph memory | `.mcp.json`; pairs with `seeds/memory/heartbeat/` |
| `@modelcontextprotocol/inspector` | MCP debugging UI | dev dep; not bound |
| `@modelcontextprotocol/server-github` | GitHub API surface | optional; we already have github MCP via the host |

#### Anthropic-ai org (selective install)

| Package | When to add | Notes |
| :--- | :--- | :--- |
| `@anthropic-ai/claude-trace` | when wiring OpenTelemetry traces (Phase 14 T8 / future observability phase) | OTEL viewer for sessions |
| `@anthropic-ai/mcpb` | when packaging MCP bundles for distribution | One-click install bundles |
| `@anthropic-ai/dxt` | when shipping Desktop Extensions | Desktop tab |
| `@anthropic-ai/sandbox-runtime` | when wrapping security boundaries around arbitrary processes | Future Phase 8 alt path |
| `@anthropic-ai/sdk` | NOT until OAuth/SDK decision (currently the chassis is CLI + Agent SDK only) | Defer |

#### Subprocessor SDKs (NOT recommended for global install)

The operator's list of subprocessor npm orgs (`@google-cloud/*`, `@aws-sdk/*`, `@azure/*`, `cloudflare`, `stripe`, `@workos-inc/node`, `@intercom/*`, `twilio`, `@iterable/*`, `@sentry/node`, `@brave/brave-search-mcp-server`, `@elevenlabs/elevenlabs-js`, `@turbopuffer/turbopuffer`) are **vendor SDKs that consuming apps would install per-vendor, not the chassis itself.** Recommendation: **DO NOT** install them in the root `package.json`. Instead:

- Vendor catalog (PR #70) already tracks which org each subprocessor uses
- Future skill examples / templates can `npm install` the relevant SDK on demand
- Forking founders pick the subset their product needs

The exception: **`@brave/brave-search-mcp-server`** could be installed if we want to wire a Brave Search MCP server into the agent's `.mcp.json`. Defer pending Phase 14 T4 / T6 channel-or-search decision.

#### Ecosystem partners (selective)

| Package | When | Notes |
| :--- | :--- | :--- |
| `@opentelemetry/api`, `@opentelemetry/sdk-node` | When wiring OTEL traces | Phase 14 / future observability phase |
| `@spotify-confidence/openfeature-server-provider` | If we ever swap from Flagship → Confidence as provider | Defer (PR #54 wired Flagship) |
| `parallel-sdk-typescript` (under `@parallel-web`) | If we use parallel.ai search | Defer until evaluated |

### G. New work the operator surfaced

| Item | Type | Lift |
| :--- | :--- | :--- |
| Update `.claude/agents/teams/data_science_and_analytics/setup.sh` per platform docs | Code | Small — this PR ships it (see §H) |
| Install MCP-server packages globally available to the agent | Code | Small — `.mcp.json` + `package.json` |
| Continuation plan (this file) | Doc | Done in this PR |

## Outcomes for the **next session**

Declared upfront per `docs/CONVENTIONS.md`. IDs are this-plan-scoped; future sessions declare their own.

| ID | Outcome | Closes / refs |
| :--- | :--- | :--- |
| **PlanO1** | All 5 open EOD PRs merged (#59, #62, #64, #71, #74) | Closes #78, #79, #80 |
| **PlanO2** | `scripts/get-neon-db-url.ts` ships; local crawler can dual-write to Neon prod without operator-set env var | next-actions #1 |
| **PlanO3** | Sift allowlist mismatch fixed; sift gains `urls.md` content | next-actions #2 |
| **PlanO4** | gcp allowlist broadens to consume sitemap-derived URLs; gcp gains `urls.md` content | next-actions #3 |
| **PlanO5** | `.mcp.json` ships with filesystem + sequential-thinking + memory MCP servers wired (per operator hint) | New |
| **PlanO6** | `npm run sandbox:dev` script wires `wrangler dev` from `infra/cloudflare/`; issue #12 C1 closed | Issue #12 C1 |
| **PlanO7** | Outbound allowlist enforced in worker (allow `api.anthropic.com` + vendor allowlist; deny `evil.example`); test in `infra/cloudflare/src/`; issue #12 C2 closed | Issue #12 C2 |
| **PlanO8** | Phase 6.B — `src/agent/run.ts` codemode wiring; sub-agent allowlists replaced with `["codemode", "search_tools"]` | Initial plan Phase 6.B |
| **PlanO9** | Phase 9 — `scripts/grade-phase.ts` ships; Messages API over OAuth; fresh context per criterion | Initial plan Phase 9 |
| **PlanO10** | Continuation plan + setup.sh shipped (this PR) | This plan |

## Decomposition

### Task 1 — Merge EOD PR queue (PlanO1)

Subtasks:

- T1.1 Watch CI on each PR for full green
- T1.2 Resolve any remaining merge conflicts (the 3 with prior conflicts are already resolved post-#82)
- T1.3 Trigger auto-merge per PR; verify each merges via `mcp__github__merge_pull_request` if automerge stalls
- T1.4 Close #78/#79/#80 if Closes/Refs linkage doesn't auto-resolve
- T1.5 Heartbeat tick 12 record

Estimated commits: 0 from agent (auto-merge handles the loop); 1 heartbeat tick commit.

### Task 2 — Auto-derive NEON_DATABASE_URL (PlanO2)

Subtasks (per `docs/operator-runbooks/neon-secrets-matrix.md` "Option B"):

- T2.1 Add `scripts/get-neon-db-url.ts`:
  ```ts
  // Fetches production-branch pooled connection URI via Neon API.
  // Inputs: NEON_API_KEY + NEON_PROJECT_ID (already in repo secrets+vars)
  // Output: NEON_DATABASE_URL printed to stdout
  ```
  - GET `https://console.neon.tech/api/v2/projects/${id}/branches` → find `name=production` → record `branch.id`
  - GET `https://console.neon.tech/api/v2/projects/${id}/connection_uri?role_name=neondb_owner&branch_id=...` → returns URI with credentials
- T2.2 Test with mock Neon API responses
- T2.3 Wire into `scripts/crawl-vendors.ts` via env-derivation: if `NEON_DATABASE_URL` unset but `NEON_API_KEY` set, derive
- T2.4 Update `docs/operator-runbooks/neon-secrets-matrix.md` to mark "Option B" as IMPLEMENTED

Estimated commits: 4 (per CONVENTIONS), all `(PlanO2)`.

### Task 3 — sift allowlist mismatch (PlanO3)

Subtasks:

- T3.1 Inspect what URLs sift's llms.txt actually contains (post-PR-#67 parser fix) — they pass relative-URL resolution but don't match `sift.com/developers/`
- T3.2 Either broaden allowlist to `sift.com/` OR switch llms.txt source to `developers.sift.com/llms.txt` if it exists
- T3.3 Re-crawl; verify `vendor/sift/` content lands
- T3.4 Update vendor catalog notes if source URL changed

Estimated commits: 2 (config fix + content), per CONVENTIONS.

### Task 4 — gcp allowlist broadening (PlanO4)

Subtasks:

- T4.1 Inspect `cloud.google.com/sitemap.xml` URL patterns
- T4.2 Three candidate fixes documented in tick-8 last-tick.md:
  - Broaden allowlist from `cloud.google.com/docs/` to `cloud.google.com/`
  - Use `cloud.google.com/sitemap_index.xml` (recursive)
  - Switch to html-index discovery from `cloud.google.com/docs/`
- T4.3 Pick the simplest fix (likely broaden allowlist + lower page_cap since gcp surface is enormous)
- T4.4 Re-crawl; verify

Estimated commits: 2.

### Task 5 — Wire MCP servers (PlanO5)

Subtasks:

- T5.1 Install npm packages:
  ```
  npm i --save-dev @modelcontextprotocol/server-filesystem \
                   @modelcontextprotocol/server-sequential-thinking \
                   @modelcontextprotocol/server-memory \
                   @modelcontextprotocol/inspector
  ```
- T5.2 Create `.mcp.json` at repo root with project-scope server definitions:
  ```json
  {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "./vendor", "./seeds"]
      },
      "sequential-thinking": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
      },
      "memory": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-memory"],
        "env": { "MEMORY_FILE_PATH": "./seeds/memory/heartbeat/_mcp-memory.json" }
      }
    }
  }
  ```
- T5.3 Test in a fresh `claude` session (`/mcp` lists all three)
- T5.4 Document in a new `docs/operator-runbooks/mcp-servers.md` how to enable/disable each
- T5.5 Update `docs/PROJECT.md` § "Plugins" to list the new servers

Estimated commits: 3.

### Task 6 — `sandbox:dev` script (PlanO6)

Subtasks:

- T6.1 Add npm script `"sandbox:dev": "cd infra/cloudflare && wrangler dev"` (root `package.json`)
- T6.2 Verify `infra/cloudflare/wrangler.jsonc` supports `wrangler dev` mode (it does — checked earlier; Sandbox Containers bind in dev)
- T6.3 Document at `docs/operator-runbooks/sandbox-dev.md`: how to run locally + how to POST to `/run`
- T6.4 Update issue #12 C1 status

Estimated commits: 2.

### Task 7 — Outbound allowlist test (PlanO7)

Subtasks:

- T7.1 Add `infra/cloudflare/src/outbound-allowlist.ts` — pre-fetch policy that denies hosts not on the list
- T7.2 Wire into `infra/cloudflare/src/worker.ts` `fetch` handler
- T7.3 Test `infra/cloudflare/src/outbound-allowlist.test.ts`:
  - GIVEN `fetch("https://evil.example/")` → deny
  - GIVEN `fetch("https://api.anthropic.com/...")` → allow
- T7.4 Source the allowlist from `vendor/<name>/crawl.json.allow_prefixes` (single source of truth)
- T7.5 Update issue #12 C2 status

Estimated commits: 4.

### Task 8 — Codemode wiring (PlanO8 — Phase 6.B)

Subtasks:

- T8.1 Verify `@cloudflare/codemode` package state (was in initial plan deps)
- T8.2 Replace `src/agent/run.ts` sub-agent `tools: [...]` arrays with `tools: ["codemode", "search_tools"]`
- T8.3 Wire `createCodeTool` from `@cloudflare/codemode/ai`
- T8.4 Update sub-agent seeds (`seeds/prompts/subagent-*.md`) to instruct codemode usage
- T8.5 Token-cost measurement test (target: ≥40% reduction vs current)
- T8.6 Update `rubrics/phase-6.md` to mark 6.B done

Estimated commits: 4. Heavier — touches the agent runtime.

### Task 9 — `grade-phase.ts` (PlanO9 — Phase 9)

Subtasks:

- T9.1 Implement `scripts/grade-phase.ts`:
  - Reads `rubrics/phase-N.md`
  - For each criterion: dispatch test OR Messages API call (OAuth, fresh context)
  - Emit per-criterion pass/fail report + iteration counter
- T9.2 Backfill rubric statuses for phases 0-8
- T9.3 Add `npm run grade -- phase-N`
- T9.4 Wire `verify:rubrics` into the verify chain

Estimated commits: 4.

### Task 10 — Ship this plan + setup.sh (PlanO10)

Subtasks (this PR):

- T10.1 `docs/plans/plan-2026-05-15-continuation.md` (this file)
- T10.2 `.claude/agents/teams/data_science_and_analytics/setup.sh` update per platform docs
- T10.3 Heartbeat tick 12 record referencing the new plan

Estimated commits: 3 in this PR.

## Operator-decision items (carried forward)

These remain blocked on operator input or operator action. Not part of this plan's outcomes; tracked so the next-session orchestrator sees them.

| # | Question / Action | Source |
| :--- | :--- | :--- |
| Q1 | Does Web (`claude.ai/code`) attach Remote-MCP per-org or per-session? | PR #62 |
| Q2 | Should `complete_database_migration` write back to `migrations/000N_*.sql`? | PR #62 |
| Q3 | Slack cloud session Neon OAuth inheritance? | PR #62 |
| Q4 | Scheduled-task runner (cloud Routines vs Desktop vs CLI)? | PR #62 |
| Q5 | Channels plugin (Telegram vs Discord)? | PR #62 |
| Q6 | Chrome integration (macOS-only or also Linux)? | PR #62 |
| Q7 | Production Neon project boundary (no MCP target) | Tick 9 / open-questions.md |
| Q8 | Outcome-ID enforcement (do we add `verify:outcomes`)? | CONVENTIONS.md |
| OA1 | Operator action #33 — `secrets.CLOUDFLARE_API_TOKEN` (gates Phase 8) | pending.md |
| OA2 | Operator action #34 — `secrets.CLOUDFLARE_ACCOUNT_ID` + `vars.CLOUDFLARE_WORKER_NAME` | pending.md |
| OA3 | Operator action #37 — `setup:branch-protection` (gates Layer 2 auto-merge) | pending.md |
| OA4 | Operator action — Cloudflare Flagship app setup | PR #54 / runbook `cf-flagship-setup.md` |
| OA5 | Operator action — Neon Hyperdrive config | Runbook `neon-hyperdrive-setup.md` |
| OA6 | Operator action — `outcomesdk.com` domain binding verification | Runbook `outcomesdk-domain.md` |

## Heartbeat tick continuity

This plan is the bootstrap for the next heartbeat session. The expected first tick of that session:

1. `git pull` to sync `main`
2. Read `seeds/memory/heartbeat/last-tick.md` — most recent tick is 11 (spotify-confidence; or 12 if this PR merges, recording this plan)
3. Read `seeds/memory/heartbeat/next-actions.md` queue
4. Read this plan
5. Pick highest-priority outcome (PlanO1 — get the 5 PRs merged; if already merged when next session opens, move to PlanO2)
6. Execute per the convention

## Risks

| Risk | Mitigation |
| :--- | :--- |
| **The 5 EOD PRs need force-pushed branches' CI to retry.** If CI is unstable, they sit forever. | Auto-merge re-evaluates on every CI green; manual `mcp__github__merge_pull_request` as fallback. |
| **MCP-server installs balloon node_modules.** Each `@modelcontextprotocol/server-*` pulls own deps. | `.mcp.json` uses `npx -y`; no top-level install required. The `inspector` is dev-only. |
| **Codemode wiring changes agent token economics.** Phase 6.B is a non-trivial refactor. | Token-cost measurement test (T8.5) enforces the 40% target as a regression gate. |
| **`grade-phase.ts` calls Messages API → uses rate-limited OAuth.** | Defaults to dry-run (existing pattern from PR #28); live grading is operator-runnable. |
| **`setup.sh` runs in cloud sessions only**; local dev never executes it. | The change is purely additive and gated by `[[ "$CLAUDE_CODE_REMOTE" == "true" ]]` for the new install lines. |

## Out of scope (deliberate)

- **Vendor-grafting subprocessor SDKs** (`@google-cloud/storage`, `@aws-sdk/client-s3`, etc.). These are app-level dependencies forking founders install when building their product; not chassis deps. Documented in §F.
- **Backfilling outcome IDs into historical commits.** Per CONVENTIONS.md "IDs are stable per-prompt; don't renumber historical commits."
- **Operator-action items.** Listed in §"Operator-decision items" but not in any outcome.
- **Phase 14 T2-T8 execution.** Blocked on operator answers Q1-Q6.

## Done state for the next session

By the end of the session that executes this plan:

- All 5 EOD PRs merged (PlanO1)
- `scripts/get-neon-db-url.ts` shipped (PlanO2)
- sift + gcp in `vendor/` with content (PlanO3 + PlanO4)
- `.mcp.json` with 3 MCP servers wired (PlanO5)
- `sandbox:dev` + outbound allowlist tests close issue #12 C1+C2 (PlanO6 + PlanO7)
- `src/agent/run.ts` codemode-wired (PlanO8)
- `scripts/grade-phase.ts` ships + `verify:rubrics` in the chain (PlanO9)
- This plan + setup.sh in main (PlanO10 — this PR)
- 10+ new heartbeat ticks recorded

Issue #12's remaining criterion (C4 — `wrangler deploy`) stays operator-blocked.
The Phase 14 T2-T8 work resumes once Q1-Q6 land.
