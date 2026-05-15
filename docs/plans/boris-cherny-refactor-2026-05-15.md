# Plan — Boris Cherny posture refactor (2026-05-15+ session)

## Context

The operator is removing themselves from the PR-review loop and handing the lead orchestrator role to Opus 4.7 1M. Authorization extended to: install packages, update out-of-date deps, use Context7, install official Claude plugin marketplaces (then re-write to our TS standard), and treat operator prompts as starting points.

The work is a **lens-and-discipline refactor** of the existing `knowledge-engineering` repo (130+ merged PRs, 30+ vendor mirrors, real Sandbox+Neon stack, OpenFeature, heartbeat memory). Two reference inputs:

1. **Boris Cherny AI Ascent 2026 transcript** — 11 primitives (P1 product-overhang … P11 moats-shift) + 10 directives (D1 predicate-first … D10 seven-powers).
2. **Operator addendum** — `support.claude.com` is not currently mirrored; 341 `/en/articles/*` URLs in `https://support.claude.com/sitemap.xml`; appending `.md` returns `text/markdown` (verified live this turn).

The operator wants:
- Refactor 2026-05-14/15 code to fit Boris primitives + directives, dogfooded against `vendor/` documentation.
- TDD red/green/refactor cycle, ≥90% coverage, test citations.
- Outcome-IDs (`O<N>`) on every commit; rubrics for every phase.
- Plugins from `claude-official-plugins` re-written in our TS code standard rather than vendored verbatim.
- Programmatic MCP-v2 tool calling via the `servers/` tree (Phase 6.B wire-up).
- Routines (`/loop`, pr-babysitter, ci-healer) babysit PRs through auto-merge.
- Documentation-first: when unclear, consult `vendor/` not guesswork.

The intended outcome at session end: every primitive has a directive, every directive has a test, every test has a citation, the operator can disconnect for a multi-day stretch and find a green main on return.

## Recommended approach

**Six phases (A–F), each one PR per outcome, each PR `automerge`-labelled, CI gates merge.** No mega-PRs. Each phase ends `npm run verify` green AND `npm run grade -- phase-<letter>` rubric-green.

The reference repo (`ascent-agent`) the operator pasted illustrates target *shape* but is too thin for our existing surface; we lift its **discipline** (D1 predicate-first, D8 Monday checkpoint, D10 seven-powers, D11 cite-the-catalogue) and graft it onto our richer posture XML v2.

## Orchestration model (multi-model fanout)

Per operator directive, this orchestrator (me, Opus 4.7 1M) dispatches work to model tiers via the Agent tool's `model` parameter and the repo's existing programmatic-subagent surface:

| Model | Where | Used for |
| :--- | :--- | :--- |
| **Opus 4.7 1M** (this session) | Lead orchestrator + team lead | Reading the plan, sequencing PRs, choosing which phase fans out next, writing the PR descriptions, handling CI-failure escalations |
| **Opus 4.7** (regular ctx) | `subagent_type: general-purpose` with `model: opus` | Codegen: writing `src/lib/posture.ts`, the `c8` wrapper, the dispatcher in `servers/_client.ts`, the `support-mdfirst` transform — anything that needs strong reasoning over typed code |
| **Opus 4.7 fast mode** | Toggled via `/fast` in interactive sessions; in dispatch via the regular Opus model | Quick docstring/README polish; rubric drafts; commit-message authoring where a regular Opus turn is overkill |
| **Haiku 4.5** (`model: haiku`) | `subagent_type: Explore` for filesystem searches; `general-purpose` for narrow lookups | Fan-out exploration: "find every file that imports `support-claude.ts`," "list test files missing a `@tdd` tag," "grep `vendor/` for the 16 collection slugs and report counts." 5-10 Haiku probes in parallel beat one Opus probe sequentially. |

**Routine wiring.** The existing routines (`pr-babysitter`, `ci-healer`) stay on whatever model their `SKILL.md` already declares (default Opus). New routine added in Phase F: `coverage-sweeper` — runs nightly, dispatches Haiku fan-out to identify the lowest-coverage file under `src/lib/` and opens a draft PR with a TDD-red commit naming it. Cited from Boris's "loops are the future" (transcript 8:36-8:42) + `vendor/anthropics/code.claude.com/docs/en/whats-new/2026-w15.md` (`/loop` primitive).

**Context management.** Per the OAuth-only posture + `src/lib/token-counting.ts` (already shipped in PR #95): every Opus codegen call carries explicit `cache_control` on the posture XML system-prompt prefix via `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`. Haiku fan-out probes do NOT cache (probes are diverse; cache would be a tax). `npm run context:budget` is the pre-flight check before every Opus dispatch.

## Code standards (cross-cutting, all phases)

| Standard | What | Enforcement |
| :--- | :--- | :--- |
| **Enums via zod or TS `const` assertions** | All status fields (`pass\|fail\|blocked`, `red\|green\|refactor`, `mirror\|http`, etc.) declared once as a zod schema or `as const` union. No string literals at the call site. | `scripts/lib/enum-discipline.test.ts` (new in Phase B) greps for string literals that should be enums. |
| **zod schemas at every boundary** | Posture XML loader, catalogue, vendor crawl-config, plugin manifest, goal-checker output — every external/persisted shape is a zod schema. Parse on read; the parsed type is the only thing the rest of the code sees. | Add `zod` to `dependencies` if missing; one schema per `src/lib/*.ts` boundary module. |
| **Inheritance for related types** | Phase A `Primitive`/`Directive`/`Invariant` share a `PostureNode` base (id + cite + name). Phase E `VendorCrawlConfig` extends `BaseCrawlConfig` with the discriminated `transform` field. | TS interface extension; covered by `posture-shape.test.ts`. |
| **semver** | `package.json` `version` bumps per phase merge. Phase A bumps minor (new primitives surface); Phase C bumps minor (TS strict++); Phase E bumps minor (new vendor); Phase F bumps minor (HITL switch). Patch bumps for backfills. | `release-please-config.json` already drives semver from Conventional Commits — add a post-merge check that the version line moved on phase PRs. |
| **Inheritance + composition for routines** | `src/lib/routines/Base.ts` — abstract class `BaseRoutine { run(): Promise<RoutineResult> }` with template-method `classify() / dispatch() / report()`. `PrBabysitter` and `CiHealer` extend it. Phase F. | Test: subclasses register via a typed registry; new routines drop in by extending the base. |
| **GraphQL where it earns its keep** | Heartbeat queries to GitHub already use REST via `mcp__github__*`. If a future fan-out needs cross-cutting joins (PRs × runs × labels), `@octokit/graphql` is preferred over REST chains. Not in scope this phase; documented as a Phase G-or-later when warranted. | n/a (planned, not required this batch) |

## In-session decomposition (operator directive)

Every PR in phases A–F decomposes as: **TASK → SUBTASK → TODO**, where each todo is a single atomic commit. Example for Phase A (A1):

```
TASK O-A1: posture XML v3 lands with Boris primitives
  SUBTASK: extend XML schema
    TODO 1: add <primitives boris="true"> block with 11 P entries
    TODO 2: add <directives boris="true"> block with 11 D entries
    TODO 3: add <cite> sub-elements with chapter+ts ranges
  SUBTASK: backfill transcript citation
    TODO 4: write seeds/citations/boris-cherny-ai-ascent-2026.md (chapters 1–10 with ts anchors)
    TODO 5: cross-reference each P/D's <cite> against the citation file (verify:posture-cites)
  SUBTASK: rubric stub
    TODO 6: rubrics/phase-A.md — 5 criteria, all measurable
```

Each TODO is `git commit -m '<type>(<scope>): <subject> (O-A1)'`. The PR description lists the TASK + SUBTASK headers; the commit log lists the TODOs. This is the same outcome-ID discipline already enforced by `src/lib/conventions.test.ts` post-2026-05-15T04:30Z.

## Cross-reference: 3 changelogs reviewed (CLI 2.0.0 → 2.1.142, Desktop, What's New weeks 13–19)

The operator's transcripted changelogs validate **all 9 SDK-feature primitives in posture XML v2 are shipping in Claude Code 2.1.x**:

| Posture primitive | Real CLI feature | Shipped in |
| :--- | :--- | :--- |
| `/loop` (self-pacing wakeup) | `/loop` command | **2.1.101 (week 15, April 10)** |
| `/goal` (iterate-until-completion) | `/goal` command — "set a completion condition and Claude keeps working across turns until it's met" | **2.1.139 (week 19, May 8)** |
| `claude agents` (local dispatch panel) | `claude agents` Agent View (Research Preview) | **2.1.139 (week 19, May 8)** |
| `/autofix-pr` (CI-failure auto-fix engine) | `/autofix-pr` for terminal-side PR auto-fix | **week 15 (April 6–10)** |
| `remote-control` (mobile entry) | `/remote-control` bridges CLI to claude.ai/code | **2.1.51 (Feb 24)** |
| `claude-code-on-the-web` | Web sessions + redesigned sidebar + drag-and-drop | **week 17 (April 20–24)** |
| `agent-teams` (experimental) | Confirmed experimental, gated by `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | **2.1.32 (Feb 5)** |
| `typescript-sdk` | `@anthropic-ai/claude-agent-sdk` (formerly claude-code-sdk) | **2.0.0 (Sept 29, 2025)** |
| `programmatic-subagents` | `--agents` flag + `agents:{}` parameter | **2.0.0** |

**Net additions to the plan:**

- **A.4 (new)** — replace the `cite` attribute on each posture primitive with the specific 2.1.x version where it shipped. Cite the changelog row in `seeds/citations/claude-code-changelog-2.1.x.md` (new).
- **C.4 (new)** — set the operator's default effort to `xhigh` on Opus 4.7 (the documented Max/Team-Premium recommended default per week 16). Add a `<effort default="xhigh">` block to the posture XML.
- **F.5 (new)** — replace the in-repo `ci-healer` routine with `/autofix-pr` where the primitive's behavior fits. Document the seam in `docs/operator-runbooks/autofix-pr.md` (new). Keep our routine for cases the built-in primitive can't handle (e.g., the OSV-Scanner-specific OAuth bootstrap chain).
- **G.11 (new)** — wire `/usage` into the heartbeat tick as the plan-limit surfacer; rotate from the older approach of querying `/v1/usage` directly. Cited from CLI 2.1.66 / 2.1.59 changelog rows ("Added `/usage` command for plan limits"). On/after the 2026-06-15 decoupling deadline, this is what surfaces remaining quota.
- **G.12 (new)** — adopt **auto mode hard deny rules** (`settings.autoMode.hard_deny`, shipped 2.1.136) for the OAuth-only posture. The repo's existing `src/lib/safety-hooks.ts` `PreToolUse(Bash)` hook becomes belt-and-suspenders alongside the harness-level hard deny — both layers stay, since hard_deny runs before the hook and reduces noise.
- **G.13 (new)** — `--plugin-url <url>` and `.zip` plugin archives (shipped week 19 / 2.1.129) replace some of the shallow-clone work in `scripts/install-plugins.ts`. Refactor in G9.c to prefer the built-in primitive over our custom Git sparse-checkout path when source is a `.zip` URL.

### Phase A — Boris primitive lens onto posture XML (foundation)

**Outcome:** every Boris primitive has a named `<primitive id="P*">` block in `seeds/posture/session-start.xml` v3 with cite-to-transcript-timestamp; every directive lands with `applies="P*,P*"`.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-A1 | Posture XML v3: add 11 Boris primitives (P1–P11) + 11 directives (D1–D11) alongside existing 9 SDK-feature primitives. Cite transcript ts ranges as `<cite ch="<N>" ts="..."/>`. | `seeds/posture/session-start.xml` |
| O-A2 | `src/lib/posture.ts` — typed XML loader: `loadPosture()` → `{ primitives, directives, invariants, routines, sources }`. Pure-TS reader, no `xml2js` (file is hand-edited, well-formed by contract). | `src/lib/posture.ts` + `.test.ts` |
| O-A3 | `src/lib/posture-shape.test.ts` — schema validator. Asserts: every `<p>` has id + name + ≥1 cite; every `<d>` has id + applies; cite-targets resolve to a real chapter+ts range in `seeds/citations/boris-cherny-ai-ascent-2026.md` (new). | `seeds/citations/boris-cherny-ai-ascent-2026.md` |

**Rubric (`rubrics/phase-A.md`):** count(primitives) ≥ 20; count(directives) ≥ 11; every primitive cites the transcript; loader test 100% coverage.

### Phase B — TDD discipline + coverage tool to 90%

**Outcome:** every test file added going forward declares red/green/refactor stage; coverage tool emits per-file %; threshold gate fails CI below 70% (rising to 90% by end of phase).

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-B1 | Wire `c8` as the coverage runner. `scripts/lib/run-tests.ts` invokes child tests via `c8 --reporter=lcov --reporter=text-summary` and emits `coverage/lcov.info`. `npm run verify:coverage` summarizes. | `scripts/lib/run-tests.ts` |
| O-B2 | `scripts/lib/tdd-stage.ts` — TDD-stage parser. Reads `@tdd <red\|green\|refactor>` tag in the `@cite` header. `verify:tdd` asserts every test added in the last 7 days has a stage tag. | `scripts/lib/tdd-stage.ts` + `.test.ts` |
| O-B3 | Coverage threshold gate. `scripts/verify-coverage.ts` parses `coverage/lcov.info` and fails if any file under `src/lib/` or `scripts/lib/` drops below the current bar. Phased ratchet: 70% (this PR), 80%, 90% across three PRs. | `scripts/verify-coverage.ts` |
| O-B4 | Backfill PR — coverage gaps in `src/mcp/lanes/*.ts`, `src/mcp/bridge-server.ts`, `src/agent/run.ts`. One test file per source file, red-first commits. | `src/mcp/lanes/*.test.ts` (new) |

**Rubric (`rubrics/phase-B.md`):** `c8` reports ≥90% statement coverage in `src/lib/` and `scripts/lib/` by end; every PR carries TDD stage tags; CI gate fails on regression.

### Phase C — Programmatic MCP v2 (Phase 6.B wire-up via direct MCP, not codemode)

**Outcome:** `servers/_client.ts` is real; `src/agent/run.ts` sub-agent allowlists move to a single source-of-truth registry keyed by tag.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-C1 | `servers/_client.ts` — real dispatcher via `@modelcontextprotocol/sdk@^1.29` MCP client (stdio). NOT `@cloudflare/codemode` — that's CF-Agents-runtime coupled (Phase 6.B-A / issue #102 owns the codemode path, gated on CF Sandbox deploy). Local orchestrator uses the SDK directly. | `servers/_client.ts` + `.test.ts` |
| O-C2 | `src/agent/tool-registry.ts` — tags every tool: `{ qualifiedName, tags: ["lane:knowledge-bridge", "kind:search"] }`. Sub-agents declare slices: `{ tags: ["lane:knowledge-bridge", "kind:search\|fetch"] }`. | `src/agent/tool-registry.ts` + `.test.ts` |
| O-C3 | TS strict++. Add `noUncheckedIndexedAccess: true` + `exactOptionalPropertyTypes: true` to `tsconfig.json`. Fix resulting errors (estimated <50). | `tsconfig.json` |

**Rubric (`rubrics/phase-C.md`):** `servers/_client.ts` does NOT throw when wired; one verifier sub-agent successfully invokes a knowledge-bridge tool via the dispatcher; TS compile clean with both new strict flags on.

### Phase D — Plugin re-write to our TS code standard

**Outcome:** every `kind: skill` entry in `.claude/plugins.json` is replaced by an in-repo TS implementation; upstream is cited but not vendored verbatim.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-D1 | `vendor/claude-plugins-official/` — crawl the 3 marketplace repos (anthropics/claude-plugins-official, knowledge-work-plugins, claude-plugins-community) to capture upstream skill prompts for citation. | `vendor/claude-plugins-official/crawl.json` |
| O-D2 | Re-write `code-review`, `mcp-server-dev`, `agent-decomposition` as `.claude/skills/<name>/SKILL.md` + `src/lib/skills/<name>.ts` with `@cite vendor/claude-plugins-official/...` headers. ≥90% coverage each. | `.claude/skills/<name>/SKILL.md`, `src/lib/skills/*.ts` |
| O-D3 | `.claude/plugins.json` — drop the marketplace `install` entries for the 3 re-written skills. Keep `<marketplace>` metadata so discovery still works. | `.claude/plugins.json` |

**Rubric (`rubrics/phase-D.md`):** the 3 re-written skills pass shape-tests; no skill exists in BOTH `.claude/plugins.json install[]` AND our `.claude/skills/`; citation guard resolves every new test file.

### Phase E — Support.claude.com mirror (operator addendum)

**Outcome:** `vendor/claude-support/` mirrors 341 EN articles across 16 collections; `src/mcp/lanes/support-claude.ts` becomes mirror-first.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-E1 | New transform mode `support-mdfirst` in `scripts/lib/transforms.ts` — appends `.md` to `/en/articles/<id-slug>` URLs; validates `content-type: text/markdown`. Probed live this turn: confirmed working. | `scripts/lib/transforms.ts` + `.test.ts` |
| O-E2 | `vendor/claude-support/crawl.json` — `sitemap_xml_sources: ["https://support.claude.com/sitemap.xml"]`, sitemap_filter `^https://support\.claude\.com/en/articles/`, transform `support-mdfirst`, allow_prefixes `["https://support.claude.com/en/"]`, page_cap 400. | `vendor/claude-support/crawl.json` |
| O-E3 | First crawl: 341 articles → `vendor/claude-support/support.claude.com/en/articles/<id-slug>.md`. Commit. | `vendor/claude-support/**` |
| O-E4 | `src/mcp/lanes/support-claude.ts` — replace 90-LOC live-HTTP lane with mirror-first lookup against `vendor/claude-support/urls.md`. Allowlist enforced; HTTP fallback only if mirror miss. | `src/mcp/lanes/support-claude.ts` |
| O-E5 | `src/lib/vendor-catalog.test.ts` — add `claude-support` to `LEGACY_ALLOW` OR add to v2 catalog (`seeds/citations/vendor-graph-v2.xml`). The latter is cleaner. | `seeds/citations/vendor-graph-v2.xml` |

**Rubric (`rubrics/phase-E.md`):** `find vendor/claude-support -name "*.md" | wc -l` ≥ 340; `support_article` returns body from mirror with `source: "mirror"` for 16 sampled URLs across all collections; live HTTP fallback works when one mirror file is renamed.

### Phase G — Repo hygiene + Turbopuffer admin + inconsistent-vendor reconciliation

**Outcome:** every mismatch surfaced by the parallel Haiku fanout survey is either fixed in place or has a tracked follow-up; no orphan rubric, no stale workflow file, no `crawl.json`-without-`urls.md` vendor.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-G1 | **Turbopuffer admin invite runbook.** `docs/operator-runbooks/parallel-api-key.md` and `nimbleway-api-key.md` already reference a sister `turbopuffer-api-key.md` that doesn't exist. Create it with the alex@jadecli.com → admin@jadecli.com admin-invite flow per operator instruction. Operator-action issue surfaces in `docs/pending.md` Column 1. | `docs/operator-runbooks/turbopuffer-api-key.md` (new) |
| O-G2 | **Inconsistent vendors.** `vendor/arkose-labs/`, `vendor/sentry/`, `vendor/twilio/` each have `crawl.json` but ZERO `.md` files and no `urls.md`. Per the Phase 2.B "deferred fallback strategies" history in `rubrics/phase-2.md`. Diagnose each and either re-crawl (preferred — vendor docs may now publish llms.txt) or document the explicit blocker in the crawl.json `note` field. | `vendor/{arkose-labs,sentry,twilio}/crawl.json` |
| O-G3 | **Missing `rubrics/phase-14.md`.** Phase numbering jumps 13 → 15. Either ship the rubric (with `status: archived` if the phase was rolled into others) or document the renumbering in `rubrics/README.md`. | `rubrics/phase-14.md` (new) |
| O-G4 | **Boris primitive ↔ skill mapping.** Posture XML v2 cites `/autofix-pr` and `/goal` as primitives but neither has a `.claude/skills/<name>/SKILL.md`. Either ship the skill scaffolds (operator-runbook style) or downgrade the cite to "tracked-but-not-implemented." Surface the gap in `rubrics/phase-A.md` so Phase A can fix it as part of the same XML rewrite. | `.claude/skills/{autofix-pr,goal}/SKILL.md` OR posture-XML edits |
| O-G5 | **Delete deactivated `copilot.yml`.** Operator-confirmed via this session that GH Copilot PR feedback is OFF (PR #136). The workflow file is now load-bearing-noise. Remove it. The `vars.COPILOT_ENABLED` gate becomes unreachable; that's the point. | `.github/workflows/copilot.yml` (delete) |
| O-G6 | **Archive stale session artifacts.** `docs/session-artifact.md` and `docs/session-2026-05-10.md` are from session-start and have not been touched in 5 days. Move to `docs/archive/` with a date prefix, OR delete if `git log -p` is sufficient history. | `docs/archive/` |
| O-G7 | **Reconcile `seeds/citations/vendor-graph-v2.xml` with `vendor/`.** Catalogue has 30 entities; `vendor/` has 28 dirs (3 inconsistent per G2). Decide: does the catalogue list what *should* exist (in which case G2 must re-crawl), or what *does* exist (in which case the 3 entries get removed)? My read: catalogue is the target state; G2 closes the gap. | `seeds/citations/vendor-graph-v2.xml` |
| O-G8 | **Coverage backfill for `src/lib/cache-control.ts` + `src/lib/docs-fetch.ts`.** These two `src/lib/` modules ship without test siblings. Surface as Phase B-final commits with TDD-red-first commits. | `src/lib/cache-control.test.ts`, `src/lib/docs-fetch.test.ts` (new) |
| O-G9 | **Harness-thins refactor: 6 large scripts.** `scripts/crawl-vendors.ts` (772 LOC), `scripts/grade-phase.ts` (481 LOC), `scripts/mint-neon-api-secret.ts` (297 LOC), `scripts/setup-github-project.ts` (217 LOC), `scripts/install-plugins.ts` (213 LOC), `scripts/audit-neon-extensions.ts` (201 LOC) all violate Boris primitive P4 (harness-thins) + directive D4 (≤300 LOC orchestration modules). Extract logic into `scripts/lib/<topic>.ts`; CLIs become thin entry points. Phased over G9.a (crawl-vendors split), G9.b (grade-phase + mint-neon), G9.c (setup-github-project + install-plugins + audit-neon-extensions). | `scripts/lib/{crawler-runner,grader-runner,neon-rotation,gh-setup,plugin-installer,neon-audit}.ts` (new) |
| O-G10 | **zod schemas at boundaries.** Only one zod schema in the codebase today (`src/lib/docs-fetch.ts`). Add schemas to: posture loader (Phase A), catalogue loader, vendor crawl-config, plugin manifest, goals.md parser, openfeature local-flags. Each adds 30–60 LOC + tests. | `src/lib/schemas/{posture,catalogue,crawl-config,plugins,goals,openfeature}.ts` (new) |

**Rubric (`rubrics/phase-G.md`):** every flagged mismatch from the survey closes with either a fix or a documented decision; no `crawl.json`-without-content vendor remains; `find scripts -name "*.ts" -size +30k` returns empty; zod schema count ≥ 7.

### Phase F — Auto-merge tightening + operator-out-of-loop switch

**Outcome:** branch protection's required-checks list matches the posture XML's `<auto-merge>` claim (5 checks); pr-babysitter + ci-healer are dry-run-tested; operator-required HITL is explicitly off.

| ID | What | Critical file |
| :--: | :-- | :-- |
| O-F1 | `scripts/setup-branch-protection.ts` — extend `requiredChecks` from 2 to 5: `verify`, `osv-scan`, `cloudflare-preview`, `neon-branch`, `claude-review`. Each gated by its workflow's secret check (skipped-job convention). | `scripts/setup-branch-protection.ts` |
| O-F2 | Tests for pr-babysitter + ci-healer classifier logic. Extracted out of `SKILL.md` markdown into `src/lib/routines/{pr-babysitter,ci-healer}.ts` + `.test.ts`. SKILL.md cites the TS module. | `src/lib/routines/*.ts` |
| O-F3 | Posture XML — explicit `<hitl operator-required="false">` block citing this session as the trigger. `seeds/memory/heartbeat/decisions.md` records the decision. | `seeds/posture/session-start.xml` |
| O-F4 | `.github/workflows/auto-merge.yml` — pre-merge rollup guard (proposed by the never-merged PR #132): if any required check is in known-failure state, comment on the PR and skip enabling auto-merge. | `.github/workflows/auto-merge.yml` |

**Rubric (`rubrics/phase-F.md`):** `gh api repos/.../rulesets/16440994 | jq '.rules[] | select(.type=="required_status_checks") | .parameters.required_status_checks | length'` returns 5; routine test suite passes; `seeds/posture/session-start.xml` parses; the PR carrying this phase merges via auto-merge (dogfood proof).

## Phase ordering + parallel-PR strategy

PRs A → B → C → D → E → F sequentially is safe but slow. Better: **A first (foundation), then B+C+E+G in parallel (no overlap in critical files), then D + F serially (D touches `.claude/plugins.json`; F touches branch protection — both want a clean main).**

Phase G's items are independently parallelizable too — G1 (Turbopuffer runbook), G2 (3 inconsistent vendors), G3 (phase-14 rubric), G4 (Boris-skill mapping), G5 (delete copilot.yml), G6 (archive sessions), G7 (catalogue reconcile), G9.a/b/c (script splits) all touch disjoint files and can ship as small PRs in any order. G8 (coverage backfill) and G10 (zod schemas) overlap with Phase B and should follow B's coverage gate.

Operator-side note: phase E (341 markdown files) bloats the repo `du -sh` by ~3-5 MB; this is in line with existing vendor mirrors (compare `vendor/claude-tutorials` at 118 pages).

## Critical files (master inventory)

**Create:**
- `seeds/citations/boris-cherny-ai-ascent-2026.md` (Phase A — transcript with chapter/ts anchors)
- `src/lib/posture.ts` + `.test.ts`, `src/lib/posture-shape.test.ts` (Phase A)
- `scripts/lib/tdd-stage.ts` + `.test.ts`, `scripts/verify-coverage.ts` (Phase B)
- `src/agent/tool-registry.ts` + `.test.ts` (Phase C)
- `vendor/claude-plugins-official/crawl.json` + content, `src/lib/skills/{code-review,mcp-server-dev,agent-decomposition}.ts` + `.test.ts` (Phase D)
- `vendor/claude-support/crawl.json` + 341 markdown files (Phase E)
- `src/lib/routines/{pr-babysitter,ci-healer}.ts` + `.test.ts` (Phase F)
- `rubrics/phase-{A,B,C,D,E,F}.md` (all phases)

**Modify:**
- `seeds/posture/session-start.xml` → v3 (Phase A + F)
- `scripts/lib/run-tests.ts` (Phase B — c8 wrapper)
- `scripts/lib/transforms.ts` (Phase E — new `support-mdfirst`)
- `seeds/citations/vendor-graph-v2.xml` (Phase E — add claude-support entity)
- `servers/_client.ts` (Phase C — real dispatcher)
- `src/agent/run.ts` (Phase C — tool-registry refactor)
- `tsconfig.json` (Phase C — TS strict++)
- `src/mcp/lanes/support-claude.ts` (Phase E — mirror-first)
- `.claude/plugins.json` (Phase D — drop re-written entries)
- `scripts/setup-branch-protection.ts` (Phase F — 5 required checks)
- `.github/workflows/auto-merge.yml` (Phase F — rollup guard)
- `package.json` (Phase B — `c8`, `verify:coverage`, `verify:tdd` scripts)

**Reuse (existing, no recreation):**
- `scripts/lib/citation-guard.ts` — already enforces `@cite`; only the test-stage tag (Phase B) needs a sibling check.
- `scripts/lib/sitemap-xml.ts` — Phase 13.B sitemap discovery, reused by Phase E.
- `scripts/lib/checksums.ts` — content-hash; Phase E crawl reuses.
- `scripts/lib/html-index.ts` — used elsewhere; not needed by Phase E (sitemap is structured).
- `src/lib/vendor-mirror.ts` / `src/lib/vendor-manifests.ts` — Phase E lane refactor reuses verbatim.
- `src/lib/embeddings.ts` (PR #108) + `src/lib/token-counting.ts` (PR #95) — referenced by Phase B coverage targets, not modified.

## Verification

Each phase ends with this exact chain green:

```bash
unset ANTHROPIC_API_KEY
npm install                          # install c8 + any new deps from Phase B
npm run lint                         # tsc --noEmit, strict + new flags
npm run verify                       # mcp + tf + citations + gates + libs + freshness + project
npm run verify:coverage              # Phase B onward — fails if regression
npm run verify:tdd                   # Phase B onward — every new test has stage tag
npm run goals                        # heartbeat goal checker (PR #108)
```

Plus per-phase smoke checks documented in each `rubrics/phase-<letter>.md`.

End-to-end proof: after Phase F merges, the operator should be able to comment `goal: clear next 5 issues` on a tracking issue and find them merged 2–6 hours later with no manual review intervention — that's the dogfood predicate for the operator-out-of-loop switch.

## Out of scope (deliberate)

- **`@cloudflare/codemode` wire-up** in the local orchestrator. The package is CF-Agents-runtime coupled (peer dep on Vercel `ai` SDK). Issue #102 (#40-A) owns it post-#12 CF Sandbox deploy. Phase C ships direct-MCP-SDK dispatcher instead — same outcome (no per-sub-agent allowlist token tax), lower dep risk.
- **`@chenglou/pretext` frontend refactor.** Existing `frontend/` ships; not touched here.
- **OpenFeature / Flagship app creation.** Operator-runbook gated; tracked separately.
- **`/v1/usage` decoupling-deadline kill-switch from the ascent-agent reference.** Our deadline math lives in `seeds/posture/session-start.xml` `<deadline>` block (to be added in Phase A); the ascent-agent's hardcoded `2026-06-15` is environment-specific to that hypothetical repo, not ours. We adopt the *pattern*, not the date.

## Citations

- `seeds/posture/session-start.xml` (v2, the existing posture)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md` (Agent SDK programmatic surface)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md` (sub-agent tool allowlists)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md` (settingSources, skills, hooks)
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` (rubric pattern, ODD)
- `vendor/osv-scanner/google.github.io/osv-scanner/` (Phase F required-check rationale)
- `https://support.claude.com/sitemap.xml` (Phase E — verified live this turn, 341 EN articles, `.md` returns `text/markdown`)
- Boris Cherny — AI Ascent 2026 transcript (will land at `seeds/citations/boris-cherny-ai-ascent-2026.md` in Phase A)
