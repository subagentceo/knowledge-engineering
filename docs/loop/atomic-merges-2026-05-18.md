# Atomic-merge loop tracker — 2026-05-18

**Branch:** `loop/atomic-merges-2026-05-18` (linear, off `origin/main`)
**Started:** 2026-05-18 UTC
**Conventions:** [`.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md`](../../.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md)
**Rubric:** [`plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md`](../../plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md) — citations + outcomes + TDD stages
**Enforcers:** `npm run verify:citations`, `npm run verify:tdd`, `npm run verify:libs` (conventions test)

## Loop

**Unit of work = one outcome PR**, per [`plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md`](../../plugins/platform-engineering/skills/citations-tests-outcomes/SKILL.md). One outcome PR may contain 1–4 commits (RED → GREEN → REFACTOR → citation-fix rhythm). Cherry-pick policy: a commit from any of the 7 source PRs becomes a commit in a new outcome PR; commits sharing one outcome ID land together via squash-merge.

For each outcome in the queue:

1. Branch off fresh `origin/main`: `loop/atomic/NN-<outcome-slug>`.
2. Cherry-pick all commits in that outcome from the source PR(s).
3. Run the 3 enforcers (`verify:citations`, `verify:tdd`, `verify:libs`). Capture exit codes.
4. Classify the outcome PR:
   - **MERGE** — passes enforcers, no rubric issue → push, open 1-PR, wait for 2 CI checks (`npm run verify`, `OSV-Scanner (PR) / osv-scan`), squash-merge.
   - **REFACTOR** — fixable rubric issue (mis-scoped subject, missing `@cite`, missing `@tdd`, body unclear) → amend in-place, then merge as above.
   - **DISCARD** — fails enforcers AND fix requires out-of-scope changes; OR superseded on `origin/main` (e.g., OHYG1 obsoletes `third_party/` submodule attempts).
5. After squash-merge: `git fetch origin main && git rebase origin/main` on the loop branch. Repeat for next outcome.
6. After all outcomes from a source PR are processed: update that PR's "Post-loop state".

**Repo ruleset (verified 2026-05-18, ruleset 16440994):**
- Direct push to main is rejected. Must go through PR.
- Required checks: `npm run verify` + `OSV-Scanner (PR) / osv-scan` (both).
- Merge method: squash only.
- `strict_required_status_checks_policy: true` → PR must be up-to-date with main before merge.
- 0 required reviewers.

## Real working set: 18 commits across 7 PRs (34 merge-noise commits dropped)

### Decision codes

- `M` — merged to `origin/main` atomically as that single commit
- `R` — refactored (amended) then merged
- `D` — discarded (with reason)
- `_` — not yet processed

### Queue (one row per source-PR commit; rows grouped by outcome PR they'll feed)

| # | Source PR | SHA | Subject | Outcome PR slug | Decision | Notes |
|---|----|-----|---------|-----------------|----------|-------|
| 1 | #225 | `b5f9e37` | feat(pr-reviewer): roving PR-reviewer skill (ORC3) | `01-orc3-reviewer-skill` | `M` | cherry-picked → `1b38375` on loop branch; rubric green; ready to push as 1-PR |
| 2 | #193 | `161b454` | feat(third_party): agent-skills + terragrunt submodules (OPR4) | `_` | check vs OHYG1 (third_party = untracked) |
| 3 | #192 | `a37f72c` | feat(third_party): docs-mirrors consumption layer (OPR3) | `_` | check vs OHYG1 |
| 4 | #191 | `c409e32` | docs(adr): OPR2 — third_party/ submodules ADR | `_` | check vs OHYG1 |
| 5 | #191 | `01fc3a9` | feat(third-party): workerd + workers-sdk submodules (OPR2) | `_` | check vs OHYG1 |
| 6 | #191 | `c20d0be` | ci(third-party): CODEOWNERS + guard workflow (OPR2) | `_` | check vs OHYG1 |
| 7 | #174 | `c230b2a` | feat(cloud-env): AlloyDB Omni + Redis SessionStart hook (OKWP2) | `_` | |
| 8 | #174 | `1b53db1` | feat(mcp): docker mcp gateway with platform_engineering profile | `_` | |
| 9 | #155 | `d2e2ed6` | docs(orchestrator): 3 paste-prompts for vendor bootstrap (OCP3) | `_` | |
| 10 | #155 | `31062e4` | docs(orchestrator): 5 subagent prompts for ci-fixer/citation/runbook (OCP4) | `_` | |
| 11 | #240 | `4efcf64` | docs(tracking): live PR queue dashboard for 2026-05-18 (OCP7) | `_` | |
| 12 | #240 | `bb1a856` | docs(tracking): update post-OHYG1 — 26 merged, 7 open (OCP7) | `_` | |
| 13 | #240 | `2ab0bbb` | docs(manifest): root depth-1 manifest for 33 operator-listed paths (OCP7) | `_` | scope drift candidate |
| 14 | #240 | `95abdc5` | docs(manifest): host-env manifest for macOS Ghostty terminal (OCP7) | `_` | scope drift candidate |
| 15 | #240 | `1e659d8` | docs(batch-spec): 5 throughput hotfixes from canonical audit (OCP7) | `_` | OWASTE spec — separate surface |
| 16 | #240 | `51b7d1b` | docs(tracker): deterministic OWASTE1-5 hand-off + posture XML (OCP7) | `_` | OWASTE tracker — separate surface |
| 17 | #240 | `4a9ced3` | docs(tracker): ask Q1 on OWASTE1 (OCP7) | `_` | OWASTE Q&A |
| 18 | #240 | `60fb010` | docs(tracker): answer Q1 on OWASTE1 (OCP7) | `_` | OWASTE Q&A |

## Per-PR post-loop state

Updated as the loop progresses. Each PR ends in exactly one of:

- **MERGED** — all real commits landed on `origin/main`, PR closes via auto-merge or manual close.
- **CLOSED-SUPERSEDED** — work landed via this loop on `origin/main`, original PR closed without merge.
- **STILL-OPEN** — needs operator decision, no automated path.
- **DISCARDED** — work rejected as obsolete (e.g., supplanted by OHYG1).

| PR | Title | Real commits | Final state | Follow-up commit subject (if any) |
|----|-------|--------------|-------------|------------------------------------|
| #225 | feat(pr-reviewer): roving PR-reviewer skill (ORC3) | 1 | TBD | TBD |
| #193 | feat(third_party): agent-skills submodules PR D (OPR4) | 1 | TBD | TBD |
| #192 | feat(third_party): docs-mirrors consumption layer (OPR3) | 1 | TBD | TBD |
| #191 | feat(third-party): cloudflare submodules (OPR2) | 3 | TBD | TBD |
| #174 | feat(cloud-env): AlloyDB Omni + Redis (OKWP2) | 2 | TBD | TBD |
| #155 | docs(orchestrator): paste-prompts from #109 (OCP3+OCP4) | 2 | TBD | TBD |
| #240 | docs(tracking): live PR queue dashboard (OCP7) | 8 | TBD | TBD |
