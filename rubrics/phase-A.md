---
phase: A
title: Boris primitive lens onto posture XML v3
status: done
issue: docs/plans/boris-cherny-refactor-2026-05-15.md
pr: pending (this PR)
---

# Phase A — Boris primitive lens onto posture XML v3 (rubric)

Cited from `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`.
Every criterion is mechanically verifiable; the validator at
`src/lib/posture-shape.test.ts` enforces 4 of 5 criteria directly.

## Outcomes covered

| Outcome | What |
| :---: | :--- |
| **O-A1** | Posture XML v3 ships with 11 Boris primitives (P1–P11) + 11 directives (D1–D11) alongside the existing v2 SDK-feature primitives. Each cites a chapter+ts anchor in `seeds/citations/boris-cherny-ai-ascent-2026.md`. |
| **O-A2** | `src/lib/posture.ts` — typed XML loader returning `{ version, date, borisPrimitives, borisDirectives }`. Pure-TS, no `xml2js`. Discriminated union via `kind: "primitive" \| "directive"`. |
| **O-A3** | `src/lib/posture-shape.test.ts` — zod schema validator + cite-target resolution check. Kicks off the zod-at-boundaries cross-cutting standard. |

## Criteria

### C1. Posture XML v3 exists and parses

```bash
xmllint --noout seeds/posture/session-start.xml
```

Expected: no errors.

Additionally `<posture version="3" date="2026-05-15">` appears at the
root element.

### C2. 11 Boris primitives + 11 Boris directives present

```bash
npx tsx -e 'import("./src/lib/posture.ts").then(m => {
  const p = m.loadPosture();
  if (p.borisPrimitives.length !== 11) process.exit(1);
  if (p.borisDirectives.length !== 11) process.exit(1);
})'
```

Expected: exit 0.

### C3. Every primitive + directive carries ≥1 cite, every cite resolves

`src/lib/posture-shape.test.ts` enforces this. Cite-targets must
fall within a chapter+ts range listed in
`seeds/citations/boris-cherny-ai-ascent-2026.md`'s 10-chapter table.

```bash
npx tsx src/lib/posture-shape.test.ts
```

Expected: 5/5 pass.

### C4. Every directive's applies-ref maps to a real primitive id

Enforced by the same shape test (assertion 5).

### C5. Loader test 100% pass rate

```bash
npx tsx src/lib/posture.test.ts
```

Expected: 8/8 pass.

## Acceptance summary

All 5 criteria are machine-verifiable. CI gates merge through
`npm run verify:libs` which runs both `posture.test.ts` and
`posture-shape.test.ts` via `scripts/lib/run-tests.ts`. No prose-only
criteria; the grader does not need to call the Messages API.

## What this phase did NOT do (deferred to later phases)

- **Phase B** ships c8 coverage tooling + TDD-stage tagging.
  This phase used the discipline informally (e.g., the `@tdd green`
  header) but the verify:tdd CI gate doesn't exist yet.
- **Phase G.4** ships the `.claude/skills/{autofix-pr,goal}/SKILL.md`
  scaffolds for the SDK-feature primitives in v2 that cite real
  Claude Code features but lack in-repo skill files.
- **Phase C.4** sets the operator's `xhigh` effort default in the
  `<effort default="xhigh">` block. Not part of this PR's scope.

## Citations

- `seeds/citations/boris-cherny-ai-ascent-2026.md` (the transcript anchor map)
- `seeds/posture/session-start.xml` (the artifact under validation)
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` (rubric pattern)
- `docs/plans/boris-cherny-refactor-2026-05-15.md` (phase scoping)
