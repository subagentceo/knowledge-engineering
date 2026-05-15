---
phase: 14
title: 5-doc sweep — chassis state surfaces (README, RUNBOOK, CONTRIBUTING, DEVELOPER, CLAUDE)
status: done
shipped_by: PRs #76 (CONVENTIONS.md backfill), #99 (README.md refresh), #100 (RUNBOOK.md), #103 (CONTRIBUTING.md + DEVELOPER.md), #109 (CLAUDE.md)
issue: closed via #49
---

# Phase 14 — chassis state surfaces (rubric)

Phase 14 is the documentation sweep that brought the repo's onboarding
surfaces in line with the post-PR-#76 conventions. No code shipped under
this phase number; it's a pure-docs phase. This rubric is the
backfilled record (Phase G item O-G3) so the rubrics directory has no
numbering gap.

## Outcomes covered

| Outcome | What | PR |
| :---: | :--- | :---: |
| **O-14.A** | `docs/CONVENTIONS.md` — outcome-driven Conventional Commits; the `(O<N>)` discipline | #76 |
| **O-14.B** | `RUNBOOK.md` — Claude Opus 4.7 1M context as the web orchestrator | #100 |
| **O-14.C** | `README.md` refresh — current chassis state (MCP lanes, vendor mirrors, OAuth posture) | #99 |
| **O-14.D** | `CONTRIBUTING.md` + `DEVELOPER.md` — forking-founder onboarding + developer setup | #103 |
| **O-14.E** | `CLAUDE.md` — project-level Claude session context (load-bearing for new sessions) | #109 |

## Criteria

### C1. All five surface docs exist at repo root

```bash
ls README.md RUNBOOK.md CONTRIBUTING.md DEVELOPER.md CLAUDE.md docs/CONVENTIONS.md
```

Expected: 6 paths print without error (5 root + the conventions doc).

### C2. CLAUDE.md cites every primitive directory it loads from

```bash
grep -E "seeds/|rubrics/|\.claude/|src/mcp/" CLAUDE.md | wc -l
```

Expected: ≥10 grep hits across heartbeat / posture / rubric / skill /
plugin / lane references.

### C3. README surface matches reality

```bash
grep -E "16\\+ MCP tools|21\\+ vendor" README.md
```

Expected: 2 hits (the tool surface line and the vendor mirror line —
update if either count grows beyond ≥16 / ≥21).

### C4. Convention test is the gate, not the doc

`docs/CONVENTIONS.md` is the human-readable spec; the *enforceable*
contract is `src/lib/conventions.test.ts`, which fails CI if any commit
authored after `CONVENTION_START_ISO` (2026-05-15T04:30Z) doesn't match
`(O[0-9A-Za-z]+)` form. Verify:

```bash
npx tsx src/lib/conventions.test.ts
```

### C5. RUNBOOK names the load-bearing primitive files

`RUNBOOK.md` references `seeds/posture/session-start.xml` and the
`seeds/memory/heartbeat/` directory as the artifacts the orchestrator
reads at session start. This is the discipline new sessions inherit.

## Why this rubric exists

The rubrics directory previously jumped 13 → 15 because Phase 14 shipped
as documentation PRs without anyone landing a `rubrics/phase-14.md`
companion. The plan's Phase G hygiene sweep (O-G3) closes that gap so
future readers can find the rubric beside its peers without wondering
whether the numbering is intentional.

## Reference

- `docs/plans/founder-refactor-2026-05-15.md` — Phase G, outcome O-G3
- `seeds/memory/heartbeat/last-tick.md` — record of PR #99 closing issue #49
