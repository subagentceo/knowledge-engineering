# Deterministic tracker — OWASTE1..OWASTE5

**Spec:** [`docs/batch-specs/2026-05-18-throughput-hotfixes.md`](./2026-05-18-throughput-hotfixes.md)
**PR:** #240 (`docs/pr-tracking-2026-05-18`)
**Conventions:** [`.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md`](../../.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md)
**Authored by:** agent-2 (orchestrator / tracker)
**Owned by:** agent-1 (implementer — executes /batch units)

## Hand-off contract (load-bearing)

This tracker exists so a different agent can answer one question for each unit, deterministically, with no human judgment:

> **Did OWASTE<N> land on `origin/main` per the spec — yes or no?**

If you (the implementing agent) cannot make the answer go from `❌` to `✅` by reading shell output, the unit is not done. The binary gate is the only gate. Subjective signals ("looks good", "tests cover it", "I think it works") do not count.

Single-commit rule: each unit ships as exactly **one** commit on its own PR, subject ending `(OWASTE<N>)`. If you need a second commit on the same PR, the unit is mis-scoped — collapse it or open a new outcome.

Questions for the orchestrator (agent-2): write them inline under the unit as `### Question` blocks. Agent-2 will answer them in this same file in the next commit. Do **not** open a separate issue, a separate doc, or a Slack thread. PR #240 is the single surface.

---

## Global gates (all 5 units must pass before merge)

Each row is a shell command whose exit status IS the gate. Run from repo root.

| ID | Gate | Command | Pass when |
|----|------|---------|-----------|
| G1 | Commit subject ends `(OWASTE<N>)` | `git log -1 --format=%s <sha> \| grep -E '\(OWASTE[1-5]\)$'` | exit 0 |
| G2 | One commit per PR | `gh pr view <pr> --json commits -q '.commits \| length'` | output is `1` |
| G3 | `npm run verify` green | `npm run verify` | exit 0 |
| G4 | OSV-Scanner (PR) green | `gh pr checks <pr> --required \| grep 'OSV-Scanner (PR)'` | shows `pass` |
| G5 | Citation guard pass for new test | `npx tsx scripts/lib/citation-guard.ts <test-file>` | exit 0 |
| G6 | No edits outside the unit's declared files | `git show --stat <sha> \| awk '/\|/{print $1}' \| sort -u` matches unit's Files list | exact match |
| G7 | PR base is `main`, not `docs/pr-tracking-2026-05-18` | `gh pr view <pr> --json baseRefName -q .baseRefName` | output is `main` |
| G8 | Merge commit (or squash) lands on `origin/main` | `git log origin/main --grep '(OWASTE<N>)' --oneline` | non-empty |

A unit is **done** when G1–G8 are all `✅` for that unit's PR. Not before.

---

## Unit ledger

Update the checkbox column in the same commit that flips a gate. Do not batch updates — one gate flip per commit IF that commit is the one that flipped the gate. Cosmetic-only ledger updates ride on the next functional commit.

### OWASTE1 — warn on `gh` Bash output > 5K tokens without `--jq`

- PR: `_TBD_`
- Commit SHA on main: `_TBD_`
- Files (per spec, exact set): `.claude/hooks.json`, `scripts/check-gh-jq.sh`, `src/hooks/check-gh-jq.test.ts`
- Commit subject (required): `feat(hooks): warn on gh bash output >5K tokens without --jq (OWASTE1)`

| Gate | Status | Evidence (paste command output or sha) |
|------|--------|----------------------------------------|
| G1 commit subject | ❌ | |
| G2 one commit | ❌ | |
| G3 verify green | ❌ | |
| G4 OSV green | ❌ | |
| G5 citation guard | ❌ | |
| G6 files-only | ❌ | |
| G7 base=main | ❌ | |
| G8 on origin/main | ❌ | |

**Done?** ❌ (all 8 must be ✅)

### OWASTE2 — serial merge-loop → `run_in_background` watchdog

- PR: `_TBD_`
- Commit SHA on main: `_TBD_`
- Files (per spec, exact set): `scripts/merge-loop.sh`, `docs/operator-runbooks/merge-loop.md`
- Commit subject (required): `feat(scripts): merge-loop via run_in_background watchdog (OWASTE2)`

| Gate | Status | Evidence |
|------|--------|----------|
| G1 commit subject | ❌ | |
| G2 one commit | ❌ | |
| G3 verify green | ❌ | |
| G4 OSV green | ❌ | |
| G5 citation guard | ❌ | (N/A — no new test file; mark ✅ with note) |
| G6 files-only | ❌ | |
| G7 base=main | ❌ | |
| G8 on origin/main | ❌ | |

**Done?** ❌

### OWASTE3 — warn on `Read` without `offset+limit` on files > 200 lines

- PR: `_TBD_`
- Commit SHA on main: `_TBD_`
- Files (per spec, exact set): `.claude/hooks.json`, `scripts/check-read-offset.sh`, `src/hooks/check-read-offset.test.ts`
- Commit subject (required): `feat(hooks): warn on Read >200 lines without offset+limit (OWASTE3)`

| Gate | Status | Evidence |
|------|--------|----------|
| G1 commit subject | ❌ | |
| G2 one commit | ❌ | |
| G3 verify green | ❌ | |
| G4 OSV green | ❌ | |
| G5 citation guard | ❌ | |
| G6 files-only | ❌ | |
| G7 base=main | ❌ | |
| G8 on origin/main | ❌ | |

**Done?** ❌

### OWASTE4 — SessionStart hook: per-turn cache_read growth logger

- PR: `_TBD_`
- Commit SHA on main: `_TBD_`
- Files (per spec, exact set): `.claude/hooks.json`, `scripts/log-turn-growth.sh`, `src/hooks/log-turn-growth.test.ts`
- Commit subject (required): `feat(hooks): log per-turn cache_read growth to .claude/usage/ (OWASTE4)`

| Gate | Status | Evidence |
|------|--------|----------|
| G1 commit subject | ❌ | |
| G2 one commit | ❌ | |
| G3 verify green | ❌ | |
| G4 OSV green | ❌ | |
| G5 citation guard | ❌ | |
| G6 files-only | ❌ | |
| G7 base=main | ❌ | |
| G8 on origin/main | ❌ | |

**Done?** ❌

### OWASTE5 — block Bash `cat` on files > 100 lines

- PR: `_TBD_`
- Commit SHA on main: `_TBD_`
- Files (per spec, exact set): `.claude/hooks.json`, `scripts/check-cat-size.sh`, `src/hooks/check-cat-size.test.ts`
- Commit subject (required): `feat(hooks): block cat on files >100 lines (OWASTE5)`

| Gate | Status | Evidence |
|------|--------|----------|
| G1 commit subject | ❌ | |
| G2 one commit | ❌ | |
| G3 verify green | ❌ | |
| G4 OSV green | ❌ | |
| G5 citation guard | ❌ | |
| G6 files-only | ❌ | |
| G7 base=main | ❌ | |
| G8 on origin/main | ❌ | |

**Done?** ❌

---

## In-session todos (live state for the implementing agent)

Mark `[x]` only when the underlying gate flips. Do not pre-check.

- [ ] OWASTE1 PR opened
- [ ] OWASTE1 merged to main (G8 ✅)
- [ ] OWASTE2 PR opened
- [ ] OWASTE2 merged to main (G8 ✅)
- [ ] OWASTE3 PR opened
- [ ] OWASTE3 merged to main (G8 ✅)
- [ ] OWASTE4 PR opened
- [ ] OWASTE4 merged to main (G8 ✅)
- [ ] OWASTE5 PR opened
- [ ] OWASTE5 merged to main (G8 ✅)
- [ ] Tracker updated with final SHAs and evidence
- [ ] PR #240 ready for review (all 5 OWASTE units green + tracker filled)

---

## Q&A — implementing agent asks, orchestrator answers

Format:

```
### Q<n> [from agent-1, <UTC timestamp>]
<question>

### A<n> [from agent-2, <UTC timestamp>]
<answer, with file:line cites>
```

Both Q and A land on PR #240 as separate commits using the load-bearing convention:

- Q commit: `docs(tracker): ask Q<n> on OWASTE<N> (OCP7)`
- A commit: `docs(tracker): answer Q<n> on OWASTE<N> (OCP7)`

No question goes anywhere except this file. No answer goes anywhere except this file.

### Q1 [from agent-1, 2026-05-18T~04:35Z] — on OWASTE1 (applies to OWASTE3, OWASTE4, OWASTE5 too)

The spec's `Files` line for OWASTE1 puts the test at `src/hooks/check-gh-jq.test.ts`. Empirically:

- `scripts/lib/run-tests.ts` discovers tests only under `scripts/lib/`, `src/lib/`, and `infra/cloudflare/src/` (see `src/lib/run-tests.ts` lines 23-27 — wait, actual file is `scripts/lib/run-tests.ts:23-27`).
- All 20+ existing `*.test.ts` files in this repo live under `src/lib/` (verified via `find src -name '*.test.ts'`).
- A test at `src/hooks/check-gh-jq.test.ts` would pass `verify:citations` (citation-guard walks `src/`, `scripts/`, `infra/`) but would **not run** under `verify:libs`. Silent dead code — G3 passes but the test contributes nothing.

Three options:

- **Option A** — move the test to `src/lib/check-gh-jq.test.ts` (everywhere). G6 then requires updating the spec's Files line for OWASTE1/3/4/5 to read `src/lib/...test.ts`. I cannot change the spec unilaterally because the orchestrator owns it.
- **Option B** — extend `scripts/lib/run-tests.ts` to also discover `src/hooks/`. That's a behavior change outside the unit's declared files and violates G6 for OWASTE1.
- **Option C** — keep the test at `src/hooks/` and accept that it's discovered by citation-guard only. The hook's runtime behavior is exercised in production; the test is documentation. Existing repo precedent: zero tests under `src/hooks/`, but also no precedent against it.

Which option? If A, please update the spec's Files line for OWASTE1, OWASTE3, OWASTE4, OWASTE5 (OWASTE2 has no test) and I'll proceed.

(none answered yet)

---

## Load-bearing XML prompt for the implementing agent

Paste this verbatim at the start of the implementing agent's session. It encodes the contract above into a posture the agent reads first.

```xml
<posture>
  <identity>
    You are agent-1, the implementer for OWASTE1..OWASTE5 on PR #240
    (branch docs/pr-tracking-2026-05-18) in
    /Users/alexzh/subagentmcp/subagentceo/knowledge-engineering.
  </identity>

  <ground-truth>
    <spec>docs/batch-specs/2026-05-18-throughput-hotfixes.md</spec>
    <tracker>docs/batch-specs/2026-05-18-throughput-hotfixes.tracker.md</tracker>
    <conventions>.claude/agents/teams/data_science_and_analytics/CONVENTIONS.md</conventions>
    <repo-claude-md>CLAUDE.md</repo-claude-md>
  </ground-truth>

  <outcomes>
    <outcome id="OWASTE1">warn on gh Bash output >5K tokens without --jq</outcome>
    <outcome id="OWASTE2">replace serial merge-loop with run_in_background watchdog</outcome>
    <outcome id="OWASTE3">warn on Read >200 lines without offset+limit</outcome>
    <outcome id="OWASTE4">log per-turn cache_read growth to .claude/usage/</outcome>
    <outcome id="OWASTE5">block Bash cat on files >100 lines</outcome>
    <outcome id="OCP7">tracker maintenance (Q/A, evidence rows, ledger updates)</outcome>
  </outcomes>

  <invariants>
    <i n="1">Every commit subject ends with (O&lt;id&gt;) per conventions.</i>
    <i n="2">Each OWASTE unit ships as exactly ONE commit on exactly ONE PR.</i>
    <i n="3">Each PR's base is main, NOT docs/pr-tracking-2026-05-18.</i>
    <i n="4">Each PR's diff touches ONLY the files declared in the spec's Files line for that unit. G6 enforces this.</i>
    <i n="5">No unit is "done" until G1..G8 in the tracker are all ✅ with evidence pasted in.</i>
    <i n="6">No question to the orchestrator goes anywhere except the tracker's Q&amp;A section. No answer either.</i>
    <i n="7">Read the OAuth-only invariant in CLAUDE.md before touching any auth-adjacent code. ANTHROPIC_API_KEY is rejected at every layer.</i>
    <i n="8">Citation guard: every new test file MUST have an @cite header pointing at vendor/, seeds/, or rubrics/.</i>
  </invariants>

  <flow>
    <step n="1">Read spec + tracker + conventions in full. Do not skim.</step>
    <step n="2">Pick the next ❌ unit. Create a git worktree under /tmp/owaste-N for isolation (see using-git-worktrees skill).</step>
    <step n="3">Implement only the files in the unit's Files line. Run npm run verify locally.</step>
    <step n="4">Commit with the exact subject in the unit's "Commit subject (required)" row. One commit.</step>
    <step n="5">Push, open PR with base=main, head=&lt;worktree branch&gt;.</step>
    <step n="6">Wait for CI. Paste evidence into the tracker row-by-row in a follow-up commit on docs/pr-tracking-2026-05-18 using subject "docs(tracker): mark OWASTE&lt;N&gt; gates green (OCP7)".</step>
    <step n="7">When G8 flips ✅ (merged to main), flip the corresponding "In-session todos" checkbox in the same commit as G8's evidence row.</step>
    <step n="8">Repeat for the next ❌ unit. Stop on first red CI; do not auto-rebase across units.</step>
  </flow>

  <stop-conditions>
    <stop>A unit's diff would touch a file not in its Files line. STOP and ask via Q&amp;A.</stop>
    <stop>A unit needs a second commit on the same PR. STOP — re-scope or open a new outcome.</stop>
    <stop>CI red. STOP. Do not start the next unit until the failing PR is green or explicitly abandoned with an answer in Q&amp;A.</stop>
    <stop>Citation guard rejects a test file. STOP — add the @cite header pointing at the real vendor doc, not a placeholder.</stop>
    <stop>You cannot find a vendor/ doc to cite. STOP and ask via Q&amp;A — do not invent a citation.</stop>
  </stop-conditions>

  <done>
    Done = the tracker file shows all 5 units with G1..G8 ✅ and all 12 in-session
    todo checkboxes ticked. Anything short of that is not done, regardless of how
    much work was performed.
  </done>
</posture>
```
