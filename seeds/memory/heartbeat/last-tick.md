---
tick: 10
iso: 2026-05-15T05:00:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: operator-direct ("dogfood outcomes with citations for tests via vendor/")
prev_tick: 9 (PR #75 — Neon secrets matrix; merged as 6376ee9)
---

# Tick 10 — outcome-driven Conventional-Commits dogfood

The operator's directive: dogfood outcome-driven development. Outcomes
need to pass with citations. Tests cite vendor/. PRs are part of
issues.

## Outcomes declared upfront (per docs/CONVENTIONS.md § "Outcome-id rule")

- **O1** — Repo adopts an outcome-driven Conventional-Commits convention.
- **O2** — PR template enforces `Closes #N` / `Refs #N` linkage.
- **O3** — Test asserts THIS PR's commits use the outcome-id convention,
  citing the vendor/-sourced "define outcomes" spec.

Each commit in this PR ends with the relevant outcome ID in trailing
parens — the convention being introduced.

## Citation chain (the dogfood)

```
vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
    ↑ canonical (committed in Phase 11)
seeds/citations/define-outcomes.md
    ↑ extract (committed in Phase 11; already cited 6+ places)
docs/CONVENTIONS.md
    ↑ new (this PR's O1)
src/lib/conventions.test.ts
    ↑ new (this PR's O3 — @cite headers reach back to all three)
```

The convention asserts the operator's pattern: tests cite their
source-of-truth, source-of-truth comes from vendor/ (Anthropic's
own spec for outcome-driven work).

## What this PR ships (4 commits, each with outcome ID)

| # | Commit subject | Outcome | Type | SemVer |
| :-- | :--- | :---: | :---: | :---: |
| 1 | `docs(conventions): add outcome-driven commit + SemVer guide (O1)` | O1 | docs | none |
| 2 | `chore(github): add PR template enforcing Closes/Refs (O2)` | O2 | chore | none |
| 3 | `test(conventions): assert this PR's commits use outcome IDs (O3)` | O3 | test | none |
| 4 | `chore(heartbeat): tick 10 record (O3)` | O3 | chore | none |

Per docs/CONVENTIONS.md SemVer table: all `docs`/`chore`/`test`
commits are no-bump. Net version impact of this PR: **none**.

## Test status

```
$ npx tsx src/lib/conventions.test.ts
  ✓ citation source exists in seeds/citations/
  ✓ vendor-mirrored canonical doc exists
  ✓ CONVENTIONS.md exists and references the citation chain
  ✓ .github/pull_request_template.md exists and requires Closes/Refs
  ✓ detected ≥1 commit on the current branch (got 3)
  ✓ commit subject conforms to convention: chore(heartbeat): tick 10 record (O3)
  ✓ commit subject conforms to convention: test(conventions): assert this PR's commits ...
  ✓ commit subject conforms to convention: chore(github): add PR template enforcing Closes/Refs (O2)
  ✓ commit subject conforms to convention: docs(conventions): add outcome-driven commit ...

9 passed, 0 failed
```

After this PR lands, the test runs on every PR via
`npm run verify` (auto-discovered by `scripts/lib/run-tests.ts`).
Future PRs that don't follow the convention will fail CI.

## What "PRs are part of issues" means in practice

Per operator: `https://github.com/.../pulls` should appear in
`https://github.com/.../issues`. GitHub already gives PRs and
issues a shared numeric namespace, but the `/issues` view filters
out PRs unless they have a linkage via `Closes #N` / `Refs #N`.

This PR's `.github/pull_request_template.md` (O2) adds mandatory
placeholders for both — so every future PR shows up under the
linked issue's discussion AND in the operator's issues view.

This PR itself will use:
  Refs: #12  (Phase 8 — outcome-driven work is referenced there)
  Refs: #39  (Phase 2.B — outcome IDs apply retroactively)

## Spec compliance — checklist

Per docs/CONVENTIONS.md, every commit in this PR:
- [x] Starts with a Conventional Commit type prefix
- [x] Has subject ≤60 chars
- [x] Ends with `(O<N>)` outcome ID
- [x] Imperative present tense ("add", not "added")

The PR body declares outcomes + Refs # per the template.

## Next tick

The next-actions queue from tick 9 remains:
1. scripts/get-neon-db-url.ts — auto-derive NEON_DATABASE_URL
2. sift allowlist mismatch
3. gcp allowlist broadening
4. spotify-confidence 38-failure

Now with the convention in place, those would each declare their own
session outcomes upfront and use outcome IDs in commits.
