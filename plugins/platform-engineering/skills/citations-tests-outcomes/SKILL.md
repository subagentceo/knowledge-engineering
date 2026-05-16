---
name: citations-tests-outcomes
description: >
  The citation, test, and outcome discipline this repo enforces:
  every test cites a vendor/seed/rubric source via @cite, every commit
  ends with an outcome ID like (O7), every PR body declares Outcomes
  + Test plan + Citations sections, and TDD red/green/refactor is
  surfaced in commit titles. Use when bootstrapping a new repo that
  should adopt the same discipline, when writing a new test and
  unsure what @cite to point at, when composing a PR body, or when
  picking a @tdd stage tag.
license: Apache-2.0
compatibility: Designed for repos that adopt outcome-driven Conventional Commits + per-test @cite headers. References this repo's verify chain primitives but is portable.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- Bootstrapping a new repo and want to adopt the same discipline
- Writing a new test and unsure what `@cite` should point at
- Composing a PR body and unsure what sections are required
- Picking the right stage tag (`@tdd red`/`green`/`refactor`)

# The three rules

## 1. Citations (`@cite`)

Every test file has a JSDoc header naming the source-of-truth the
test asserts against. Citation paths MUST start with `vendor/`,
`seeds/`, or `rubrics/`.

```ts
/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/performance.md
 */
```

Enforced by [`scripts/lib/citation-guard.ts`](../../../../scripts/lib/citation-guard.ts).
Runs in `npm run verify:citations`. Citations not under those three
prefixes fail the verify chain.

## 2. Outcomes (Conventional Commits + outcome IDs)

Every commit subject ends with `(O<N>)` where `O<N>` is a stable
outcome ID declared in either the orchestrator prompt or the PR body.

```
feat(bridge): GREEN voyage client + turbopuffer-alloydb bridge (OPE3)
refactor(bridge): extract assertOAuthOnlyPosture (OPE3)
test(bridge): RED failing tests (OPE3)
```

Per [`docs/CONVENTIONS.md`](../../../../docs/CONVENTIONS.md).
Enforced by [`src/lib/conventions.test.ts`](../../../../src/lib/conventions.test.ts)
for commits after 2026-05-15.

## 3. TDD stages (`@tdd red|green|refactor`)

Every test file added under `src/lib/`, `scripts/lib/`, or
`infra/cloudflare/src/` after 2026-05-15T13:00Z carries an `@tdd`
tag in its JSDoc header. Enforced by `npm run verify:tdd`.

Three-stage rhythm:
- **`@tdd red`** — test exists, module under test doesn't yet
- **`@tdd green`** — module exists, all tests pass
- **`@tdd refactor`** — internal restructure, tests stay green

Each stage is its own atomic commit. PR #169 (routine schema) is a
canonical example: 4 commits — RED → GREEN → REFACTOR → citation-fix.

# PR body template

[`.github/pull_request_template.md`](../../../../.github/pull_request_template.md)
enforces these sections:

- **Outcomes** — declare outcome IDs the PR fulfills
- **Issue linkage** — at least one `Closes #N` / `Refs #N`
- **Summary** — 1-3 bullets, focus on WHY
- **Test plan** — markdown checklist of validation steps
- **Citations** — if introducing new tests, list source-of-truth paths

# Evaluation matrix

Strong PR bodies include an evaluation matrix mapping each outcome to
a measure. Example from PR #169:

| Criterion | How it's measured | Result |
|---|---|---|
| Every documented option is enumerated | 6 closed-set enums | ✓ |
| Schedule one-of enforced | 3 tests | ✓ |
| Zod v4 idioms only | No deprecated string methods | ✓ |
| Coverage gate (≥70%) | `npm run verify:coverage` | ✓ 91% |

# Why this matters

Outcome-driven development makes every change traceable to a declared
end state. Citation discipline keeps tests anchored to ground truth
(vendor docs, seed extracts, rubric criteria) rather than the test
author's interpretation. TDD stages make the design pressure of "test
before code" visible in the commit graph instead of being invisible
process discipline.

# Citations

- [`docs/CONVENTIONS.md`](../../../../docs/CONVENTIONS.md) — outcome-driven Conventional Commits
- [`scripts/lib/citation-guard.ts`](../../../../scripts/lib/citation-guard.ts) — `@cite` enforcer
- [`scripts/verify-tdd-stage.ts`](../../../../scripts/verify-tdd-stage.ts) — `@tdd` tag enforcer
- [`.github/pull_request_template.md`](../../../../.github/pull_request_template.md) — PR shape
- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../../../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md) — upstream "define outcomes" doctrine
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — extract
