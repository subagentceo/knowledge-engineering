---
phase: B
title: TDD discipline + c8 coverage ratchet
status: done
issue: docs/plans/founder-refactor-2026-05-15.md
pr: pending (this PR)
---

# Phase B — TDD discipline + c8 coverage ratchet (rubric)

Cited from `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`.
All criteria mechanically verifiable via the new `verify:coverage` and
`verify:tdd` chain entries.

## Outcomes covered

| Outcome | What |
| :---: | :--- |
| **O-B1** | `c8` wired as the coverage runner via `npm run verify:coverage`. Reports `text-summary` + `lcov`; emits `coverage/lcov.info`. |
| **O-B2** | `scripts/lib/tdd-stage.ts` + test — `@tdd <red\|green\|refactor>` tag parser. `npm run verify:tdd` asserts every test added since 2026-05-15T13:00:00Z carries a valid stage tag. |
| **O-B3** | `scripts/verify-coverage.ts` — threshold gate. Default 70% (env-override via `KE_COVERAGE_THRESHOLD`). Pre-existing-baseline allowlist for 4 known-low files (tracked under O-G8). |
| O-B4 (deferred) | Backfill tests for the 4 allowlisted files; ratchet threshold to 80% then 90%. Lives in Phase G.8. |

## Criteria

### C1. `c8` produces coverage/lcov.info for every src/lib + scripts/lib file

```bash
npm run verify:coverage 2>&1 | grep "file(s) parsed"
```

Expected: `22 file(s) parsed` (or more as repo grows).

### C2. The threshold gate fails on a NEW regression but exempts the pre-existing baseline

Audit by running:

```bash
npm run verify:coverage
```

Expected output includes:

```
  0 below threshold (non-exempt)
  4 below threshold but pre-existing-baseline-exempt
  ✓ no new regression; mean coverage 80%
```

If a new `src/lib/*.ts` lands without a sibling test, the gate fails.

### C3. `verify:tdd` asserts every recently-added test carries a `@tdd` tag

```bash
npm run verify:tdd
```

Expected: `✓ all carry a valid @tdd <red|green|refactor> tag`.

Adding a new test file without the tag fails the gate.

### C4. Both gates are in the `verify` chain

```bash
grep '"verify":' package.json | grep -c "verify:coverage"
grep '"verify":' package.json | grep -c "verify:tdd"
```

Both return 1.

### C5. Pure-function parsers; 100% test coverage on the parsers themselves

```bash
npx tsx scripts/lib/coverage-parser.test.ts   # 7/7 pass
npx tsx scripts/lib/tdd-stage.test.ts          # 8/8 pass
```

## Acceptance summary

5 criteria all machine-verifiable. The Phase A pattern of TDD red →
TDD green commits continues: both new lib modules
(`coverage-parser.ts` and `tdd-stage.ts`) landed via explicit red →
green pairs visible in the commit log.

## What this phase did NOT do (deferred)

- **O-B4 / O-G8** — backfilling the 4 allowlisted pre-existing-low-coverage
  files (citation-guard, neon-client, cache-control, docs-fetch).
  Each backfill PR removes one entry from the allowlist.
- **Threshold ratchet to 80% then 90%** — pending O-B4 backfills.
- **Coverage gate on `src/agent/`, `src/mcp/`, `frontend/`, `infra/cloudflare/`** —
  Phase B scope is `src/lib/` and `scripts/lib/`. Other dirs added
  in future PRs once their test density is sufficient to not noise the gate.

## Citations

- `scripts/lib/coverage-parser.ts` + `.test.ts`
- `scripts/lib/tdd-stage.ts` + `.test.ts`
- `scripts/verify-coverage.ts`, `scripts/verify-tdd-stage.ts`
- `.c8rc.json`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`
- `docs/plans/founder-refactor-2026-05-15.md`
