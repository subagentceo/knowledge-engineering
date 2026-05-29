# Post-mortem: knowledge-engineering merge train (2026-05-29)

> **Status:** complete. 6 non-draft PRs merged, 1 draft (#284) intentionally left.
> **Author:** Claude (Opus 4.8, 1M ctx), admin-jadecli session.
> **Scope:** drain all open PRs on `subagentceo/knowledge-engineering` via local code-review → fix → merge, looping until done.

All claims below are tagged `[fact]` (from tool-call logs / GitHub API), `[est]` (estimated, method given), or `[infer]` (reasoned from observed behavior).

---

## 1. Timeline (factual)

Merge timestamps from `gh pr view --json mergedAt` `[fact]`:

| UTC | PR | Title | Disposition |
| :-- | :-- | :-- | :-- |
| 22:06:36 | #278 | feat(schema): allow_urls exact-match (OBLOGS2) | cleaned branch, merged once OSV unblocked |
| 22:20:48 | #285 | fix(deps): bump qs + ws to clear OSV (OSVFIX1) | **authored this session** — the unblocker |
| 22:23:53 | #268 | fix(crawl): blog-extract fidelity (OBLOGF1) | rebased onto fixed main |
| 22:34:17 | #271 | feat(eval): blog-eval S+R+E (OBLOGE1) | add/add conflict + 2 gate fixes |
| 22:39:04 | #272 | feat(pr-healer): CI-healer skill (ORC2) | 14 commits squashed → 1 |
| 22:43:18 | #253 | chore(main): release 0.2.0 | release-please; close/reopen to fire checks |

Wall-clock from first merge (#278, 22:06) to last (#253, 22:43): **~37 minutes** `[fact]`.

`#284` (draft, zod PR schema) excluded — drafts are not merge-ready `[fact: gh pr list isDraft=true]`.

---

## 2. Root cause of churn (factual)

The entire train was blocked by **one systemic gate**, not per-PR problems.

`OSV-Scanner (PR)` is a required status check under the branch ruleset
`[fact: gh api repos/.../rules/branches/main → required_status_checks: ["npm run verify", "OSV-Scanner (PR) / osv-scan"], strict policy, merge method "rebase" only]`.

The scanner ran with `--fail-on-vuln=true` and found 3 medium advisories on `main`, inherited by **every** branch `[fact: gh run view --log-failed]`:

| Advisory | Pkg | Had | Fixed | Path |
| :-- | :-- | :-- | :-- | :-- |
| GHSA-q8mj-m7cp-5q26 | qs | 6.15.1 | 6.15.2 | root → @modelcontextprotocol/sdk → express |
| GHSA-58qx-3vcg-4xpx | ws | 8.18.0 | 8.21.0 | frontend + infra/cloudflare → wrangler → miniflare (dev) |

Because the advisories lived on `main`, no individual PR could ever go green on its own. This was diagnosed only **after** several wasted merge attempts on #251/#268 `[fact: "the base branch policy prohibits the merge" then OSV fail observed]`.

**Two secondary gates** then surfaced once OSV was fixed, each costing one extra CI round-trip on #271:
- `verify:tdd` — every test file added after 2026-05-15 must carry `@tdd <red|green|refactor>` `[fact: log "1 test file(s) missing @tdd tag"]`. The tag was dropped during the add/add conflict resolution on the shared test file.
- `conventions.test.ts` — every post-2026-05-15 commit subject must end with `(O<N>)` `[fact: log "subject doesn't match … (O<N>)"]`. My fix commit `fix(test): …` lacked it.

A third check, `Create Neon Branch`, failed on every PR `[fact]` but is **not required**, so it never blocked — later confirmed by operator: Neon budget exhausted `[fact: operator message]`.

---

## 3. Token & cost estimate

No per-call token meter is exposed to the agent, so this is reconstructed from the tool-call log (counts are `[fact]`; token sizes are `[est]`).

### 3.1 Tool-call inventory `[fact]`

| Tool | Calls | Notes |
| :-- | --: | :-- |
| Bash | ~55 | git, gh, npm, node --test |
| Monitor | 5 | CI watch (bkmjp1li5, bo6n3tiho, b5fm73gye, bno1rj4sw, by6t911ks) |
| Read | 3 | task output files |
| Edit | 2 | @tdd tag (×2 attempts) |
| Write | 1 | this doc |
| TaskCreate/Update | ~13 | train tracking |
| AskUserQuestion | 2 | merge-method + gate decisions |
| ToolSearch | 3 | Monitor/Task/Edit schema loads |
| **Total** | **~84** | across the merge-train portion |

GitHub Actions triggered: **40 workflow runs, 35 `verify` runs** in the 21:00Z+ window `[fact: gh run list count]`.

### 3.2 Token model `[est]`

The dominant cost driver is **context re-read on each turn**, not the tool outputs themselves. This session ran with a large system prompt (CLAUDE.md ×3 levels + enterprise manifest + MCP tool catalog ≈ **40–55k input tokens of fixed preamble**) `[est: measured from the visible context blocks]`.

Per-turn cost ≈ (fixed preamble + conversation-so-far) input + output. With ~84 tool-call turns and a conversation that grew to an estimated 120–180k tokens by the end:

| Bucket | Est. tokens | Method |
| :-- | --: | :-- |
| Input (cumulative, cache-aware) | ~3.5–5.0M | 84 turns × growing context; prompt-cache hits on the stable preamble cut effective cost ~5–10× on warm turns `[est]` |
| Input (effective, post-cache) | ~0.9–1.4M | assuming ~75% cache-hit rate on preamble within 5-min windows `[infer: ScheduleWakeup/Monitor kept turns <5min apart mostly]` |
| Output (assistant text + tool args) | ~120–180k | terse focus-mode replies + bash scripts `[est]` |

### 3.3 Cost `[est]`

Opus 4.x pricing (public list, used as the rate card): **$15 / 1M input, $75 / 1M output**, with cached input at **~$1.50 / 1M** (10% of input) `[est: standard Anthropic cache discount]`.

| Component | Tokens | Rate | Cost |
| :-- | --: | --: | --: |
| Uncached input (first-touch preamble + new context) | ~1.2M | $15/M | ~$18 |
| Cached input (warm preamble re-reads) | ~3.5M | $1.50/M | ~$5 |
| Output | ~0.15M | $75/M | ~$11 |
| **Model total** | | | **~$34** `[est, ±50%]` |

Plus non-model cost:
- **GitHub Actions minutes:** 35 `verify` runs × ~3 min + 35 OSV/other × ~0.5 min ≈ **~125 runner-minutes** `[est from durations in gh pr checks, e.g. "verify 2m28s"]`. On GitHub-hosted Linux at $0.008/min ≈ **~$1** `[est]` — negligible vs. the wasted-signal cost.
- **Wasted CI:** of 35 verify runs, an estimated **~20 were re-runs** caused by the OSV blocker + the two gate-fix round-trips + close/reopen `[infer]`. ~12 runner-minutes and ~3 agent wait-cycles were pure churn.

**Headline:** ~$34 in model spend `[est]`, of which **an estimated 35–45% (~$12–15) was churn** — re-reading growing context across failed-merge retry loops that a single up-front diagnosis would have collapsed `[est]`.

---

## 4. What went well `[fact/infer]`

- **Root-caused the systemic gate** instead of `--admin`-bypassing a real security check (operator directive: "uphold code standard"). Fixing `qs`/`ws` on `main` unblocked all 5 downstream PRs at once.
- **Local verification substituted for disabled Claude CI** — `npx tsc --noEmit` + `node --test <file>` on every branch before merge.
- **Merge-noise cleaned** — #271/#272/#278 each had 10–21 commits of empty `OCIRETRIG` nudges + `Merge branch main` churn; squashed to 1–2 meaningful commits, verified byte-identical trees (`git diff backup HEAD --stat` empty).
- **Monitor tool replaced polling** for CI waits after the operator flagged token waste.

---

## 5. What went wrong `[fact/infer]`

1. **Diagnosis came after action.** Three merge attempts were made before reading the ruleset / OSV log. The signal ("BLOCKED", then "OSV fail") was available on the first failed merge. `[fact]`
2. **Per-PR gate discovery, serialized.** `@tdd` and `(O<N>)` were learned one failed CI run at a time on #271 (~6 wasted runner-minutes + 2 agent cycles), then correctly *pre-checked* on #278/#272 `[fact]` — the right pattern, learned late.
3. **Conflict resolution dropped a required header.** Taking `--theirs` on the add/add `blog-extract-fidelity.test.ts` silently lost the `@tdd green` line. `[fact]`
4. **Redundant work:** dispatched `workflow_dispatch` runs that duplicated the auto-firing `pull_request` checks `[fact: "OSV-Scanner (push/schedule): skipping"]`.

---

## 6. Outcomes — what to implement to reduce churn, latency, cost

Written as outcome IDs in this repo's convention, now that the train is complete.

### OPM1 — Pre-merge gate-preflight script (highest leverage)
**Problem:** gates (OSV, `@tdd`, `(O<N>)`, frontmatter) were discovered serially via failed CI, each costing a ~3-min runner round-trip + an agent wait-cycle.
**Outcome:** `scripts/preflight-pr.ts <branch>` that runs *locally*, in seconds, the exact gate set the ruleset enforces — `npm run verify` + an `osv-scanner` binary + a commit-message lint over `origin/main..HEAD` + `@tdd`-tag scan of new test files. Exit non-zero with the specific fix.
**Saves:** ~20 wasted `verify` runs → near 0 `[est]`; collapses the #271 two-round-trip into one local pass. **~$10–13 model churn + ~12 runner-min.** `[est]`
**Cite:** `[fact: §2 gates]`, this repo's existing `scripts/verify-tdd-stage.ts` + `src/lib/conventions.test.ts` are the source-of-truth to mirror.

### OPM2 — Keep `main` continuously OSV-clean
**Problem:** an advisory landing on `main` silently blocks the entire queue; discovered only mid-train.
**Outcome:** the scheduled `OSV-Scanner (push/schedule)` run on `main` (already exists, `[fact: workflow shows schedule trigger]`) should **open an auto-fix PR** (dependabot-style or a small `npm update` bot) the moment it goes red, before a human queues feature PRs behind it. Pair with `dependabot` grouped action+npm updates already in flight (#251).
**Saves:** removes the class of bug that caused 100% of this train's initial blockage. `[infer]`

### OPM3 — Stop the `OCIRETRIG` nudge-commit anti-pattern
**Problem:** branches carried 5–10 empty `chore: nudge/drain/re-trigger CI (OCIRETRIG)` commits plus repeated `Merge branch main` — pure history pollution that I had to squash on 3 of 5 PRs `[fact]`.
**Outcome:** delete whatever loop emits `OCIRETRIG` commits. CI re-triggers belong to `gh run rerun` or `gh pr update-branch`, never to empty commits. Add a `conventions.test.ts` rule that *rejects* `OCIRETRIG` subjects so the habit can't return.
**Saves:** ~3 force-push + squash cycles per train (~$3–5 model + reviewer cognitive load). `[est]`

### OPM4 — Make `Create Neon Branch` non-blocking / budget-aware
**Problem:** it failed on every PR (Neon budget out) and produced misleading red Xs that cost diagnosis time, even though it's not required `[fact]`.
**Outcome:** gate the Neon job behind `if: ${{ vars.NEON_ENABLED == 'true' }}` and flip the var off when budget is exhausted, so it `skips` cleanly instead of failing. Surfaces real failures only.
**Cite:** `[fact: operator message "neon is out of budget"; gh pr checks shows "Create Neon Branch fail" on all]`.

### OPM5 — Conflict-safe shared-fixture convention
**Problem:** #268 and #271 both *created* the same `blog-extract-fidelity.test.ts` (add/add conflict), and resolution dropped the `@tdd` header.
**Outcome:** when two PRs evolve one file, the later PR should branch *from the earlier PR's branch*, not from `main` — or split the file (F-criteria vs S/R/E-criteria in separate files). Add a CI check that re-asserts required headers *after* any rebase (a post-merge `@tdd`/`@cite` re-scan in the merge queue).
**Saves:** the entire #271 re-work loop (2 CI rounds, ~$4). `[est]`

### OPM6 — Diagnose-before-act merge protocol
**Problem:** action preceded diagnosis on the first 3 merge attempts.
**Outcome:** encode a fixed order in the (now-merged) `pr-healer` skill (ORC2): **(1)** read `gh api .../rules/branches/main` once per session, **(2)** read the most recent failed run's `--log-failed` *before* retrying, **(3)** classify flaky/legit/infra, **(4)** only then act. This is exactly the skill #272 describes — it should be the first thing invoked next time, not reconstructed ad-hoc.
**Cite:** `[fact: #272 SKILL.md "classify failed required checks as flaky/legitimate/infra"]` — the capability shipped this session but wasn't used to drive this session.

---

## 7. One-line lessons

- **A red required-check on `main` is a queue-wide outage** — treat it as P1, diagnose first. `[OPM2]`
- **Mirror the CI gate set locally** or pay a 3-min runner round-trip per discovery. `[OPM1]`
- **Empty commits are never the way to re-trigger CI.** `[OPM3]`
- The skill that would have made this cheap (`pr-healer`) was *merged during the very train it should have run*. Use it next time. `[OPM6]`
