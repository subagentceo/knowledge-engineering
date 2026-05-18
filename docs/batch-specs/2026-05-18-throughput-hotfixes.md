# /batch spec — throughput hotfixes from canonical audit (2026-05-18)

Outcome family: **OWASTE1..OWASTE5** — 5 atomic single-commit hotfixes that land guardrails preventing the categories of waste observed in this session.

## Canonical evidence

Source: `/Users/alexzh/.claude/projects/-Users-alexzh/5ced2c51-6225-4fcf-9b43-02e268d2b45b.jsonl` (JSONL session transcript, owned by the runtime, not editable by the agent).

| Metric | Value | Source line type |
|---|---|---|
| cache_read tokens (session-cumulative) | 186M | `usage.cache_read_input_tokens` summed across assistant turns |
| Session cost | ~$282 (Opus 4.7 cache_read @ $1.50/M dominates) | derived from token counts × public price card |
| Serial Bash `gh pr update-branch` cycles in merge-loop | 17 iterations × ~163s sleep between | timestamp deltas between sequential `tool_use` records |
| Paid latency in merge-loop alone | ~46 minutes | 17 × 163s |
| Largest single-tool output (uncapped `gh` JSON) | ~30K tokens | `tool_result` length on first `list_pull_requests` call |

The 5 units below each cut one category of waste at the **tool-call boundary**, not at the model boundary, so they reduce cache_read pressure structurally.

## /batch instruction (copy into prompt)

```
/batch Land 5 atomic single-commit hotfixes on origin/main, one PR per unit, each with subject ending (OWASTE<N>). Cite docs/batch-specs/2026-05-18-throughput-hotfixes.md as the spec. Each unit is independent — parallelize across worktrees. Required checks: npm run verify + OSV-Scanner (PR) / osv-scan. Each unit ships test + hook config + script; no behavior changes outside of warning/blocking on the documented anti-pattern. Stop on first red CI; do not auto-rebase across units.
```

## Units

### Unit 1 — OWASTE1: warn on `gh` Bash output > 5K tokens without `--jq`

- **Outcome:** every Bash call invoking `gh` that returns > 5K tokens must use `--jq` projection or be rejected with a warning naming the cheaper alternative.
- **Files:** `.claude/hooks.json` (add PreToolUse matcher for `Bash` with `gh` substring), `scripts/check-gh-jq.sh` (the gate), `src/hooks/check-gh-jq.test.ts` (cites `vendor/anthropics/code.claude.com/docs/en/hooks.md` + `vendor/anthropics/code.claude.com/docs/en/tools-reference.md`).
- **Commit:** `feat(hooks): warn on gh bash output >5K tokens without --jq (OWASTE1)`.
- **Evidence cited:** first `list_pull_requests` MCP call dumped ~30K tokens vs ~2K with `--jq '.[]|{number,state,mergeable}'`.

### Unit 2 — OWASTE2: serial merge-loop → `run_in_background` watchdog

- **Outcome:** replace the documented 17×163s serial pattern with a single `Bash run_in_background` driver + Monitor poll. Operator-runbook docs the new shape.
- **Files:** `scripts/merge-loop.sh` (background-safe; no foreground sleeps), `docs/operator-runbooks/merge-loop.md` (cites the API-level Programmatic Tool Calling beta + the Claude Code harness equivalent per `/Users/alexzh/.claude/projects/-Users-alexzh/memory/reference_advanced_tool_use.md`).
- **Commit:** `feat(scripts): merge-loop via run_in_background watchdog (OWASTE2)`.
- **Evidence cited:** 17×163s = ~46 min paid latency in this session's merge phase.

### Unit 3 — OWASTE3: warn on `Read` without `offset+limit` on files > 200 lines

- **Outcome:** PostToolUse hook warns when a `Read` returns more than 200 lines without `offset+limit`, telling the agent to scope next time.
- **Files:** `.claude/hooks.json` (PostToolUse for `Read`), `scripts/check-read-offset.sh`, `src/hooks/check-read-offset.test.ts` (cites `vendor/anthropics/code.claude.com/docs/en/tools-reference.md` Read section).
- **Commit:** `feat(hooks): warn on Read >200 lines without offset+limit (OWASTE3)`.
- **Evidence cited:** vendor doc fire-hoses in this session pushed ~3000-line single-Read calls straight into context, accelerating cache_read growth.

### Unit 4 — OWASTE4: SessionStart hook — per-turn cache_read growth logger

- **Outcome:** every assistant turn appends a row to `.claude/usage/<session-id>.tsv` with `(turn, cache_read_delta, cumulative_cost)` so the operator can see growth in real time.
- **Files:** `.claude/hooks.json` (SessionStart + PostToolUse), `scripts/log-turn-growth.sh`, `src/hooks/log-turn-growth.test.ts` (cites `vendor/anthropics/code.claude.com/docs/en/hooks.md` + cost-tracking guidance in `vendor/anthropics/platform.claude.com/docs/en/api/messages.md`).
- **Commit:** `feat(hooks): log per-turn cache_read growth to .claude/usage/ (OWASTE4)`.
- **Evidence cited:** 186M cache_read was only discovered post-hoc; the operator could have caught growth at 20M had this telemetry been live.

### Unit 5 — OWASTE5: block Bash `cat` on files > 100 lines

- **Outcome:** PreToolUse hook blocks `Bash` invocations of `cat <file>` (or `head -n>100`) when the file exceeds 100 lines; instructs the agent to use `Read` with `offset+limit`.
- **Files:** `.claude/hooks.json` (PreToolUse for Bash with `cat ` substring), `scripts/check-cat-size.sh`, `src/hooks/check-cat-size.test.ts` (cites the same docs as OWASTE3).
- **Commit:** `feat(hooks): block cat on files >100 lines (OWASTE5)`.
- **Evidence cited:** several `cat` calls in this session bypassed `Read`'s offset/limit and dumped full files into tool_result.

## Sequencing and independence

- All 5 units are **independent** (different files, different hook matchers).
- All 5 are **atomic** (one commit, one PR, one outcome tag).
- All 5 should **parallelize** in worktrees — no shared `.claude/hooks.json` lines (each unit appends a discrete matcher block).
- All 5 must pass: `npm run verify` + `OSV-Scanner (PR) / osv-scan`. Citation-guard requires `@cite` headers per test.

## What this spec is NOT

- Not a behavior change to the agent itself. Only guardrails on tool-call shape.
- Not a refactor of the merge-loop pattern beyond OWASTE2's drop-in script.
- Not a hook-runtime change. Uses the existing PreToolUse / PostToolUse / SessionStart contracts documented in `vendor/anthropics/code.claude.com/docs/en/hooks.md`.

## Cites

- `vendor/anthropics/code.claude.com/docs/en/hooks.md` — hook contract
- `vendor/anthropics/code.claude.com/docs/en/tools-reference.md` — Read/Bash signatures
- `vendor/anthropics/code.claude.com/docs/en/commands.md` — /batch behavior
- `/Users/alexzh/.claude/projects/-Users-alexzh/memory/reference_advanced_tool_use.md` — Programmatic Tool Calling rationale (API-level fix; this spec is the harness-level approximation)
