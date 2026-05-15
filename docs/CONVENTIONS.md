---
title: CONVENTIONS.md
description: How the knowledge-engineering repo operationalizes Conventional Commits + Semantic Versioning inside an outcome-driven workflow. Every commit references an outcome ID; outcomes are declared per-session in the orchestrator prompt or in the PR description.
phase: meta
citations:
  - vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
  - seeds/citations/define-outcomes.md
  - https://www.conventionalcommits.org/
  - https://semver.org/
---

# Conventions: outcome-driven Conventional Commits + SemVer

This guide is how the **knowledge-engineering** repo operationalizes
[Conventional Commits](https://www.conventionalcommits.org/) and
[Semantic Versioning](https://semver.org/) inside an outcome-driven
workflow.

It is the operator-side translation of the Managed-Agents "define
outcomes" discipline — cited from
[`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md)
and the extract at [`seeds/citations/define-outcomes.md`](../seeds/citations/define-outcomes.md).

## Why this exists

Outcome-driven development means every change is traceable to a declared
**outcome** — an observable end state, not a task. Outcomes are
identified by stable IDs (`O1`, `O2`, …) declared at session start (in
the orchestrator prompt's `<outcomes>` block) OR in the PR body's
"Outcomes" header for ad-hoc work.

Three benefits fall out:

1. **Traceability.** Any commit maps back to the outcome that justified
   it. The grader (per the cited define-outcomes spec) can evaluate
   each outcome independently.
2. **Predictable releases.** Conventional Commit types deterministically
   map to MAJOR / MINOR / PATCH bumps; release tooling needs no human
   judgment.
3. **Reviewable diffs.** Small, single-purpose commits (one type, one
   outcome) are easier to review, revert, and audit.

If a change cannot be tied to an outcome, it is out of scope — open a
new outcome before making it.

## SemVer bump mapping

| Commit type             | SemVer impact            | Notes                                                              |
|-------------------------|--------------------------|--------------------------------------------------------------------|
| `feat`                  | **MINOR** (`x.Y.0`)      | New backwards-compatible capability.                               |
| `fix`                   | **PATCH** (`x.y.Z`)      | Backwards-compatible bug fix.                                      |
| `perf`                  | **PATCH** (`x.y.Z`)      | Performance improvement, no API change.                            |
| `feat!` / `fix!` / `*!` | **MAJOR** (`X.0.0`)      | The `!` after type/scope signals a breaking change.                |
| `BREAKING CHANGE:`      | **MAJOR** (`X.0.0`)      | Footer trailer; forces MAJOR regardless of type.                   |
| `refactor`              | none (or PATCH)          | No behaviour change; PATCH only if your release tool requires one. |
| `chore`                 | none                     | Tooling, deps, housekeeping.                                       |
| `docs`                  | none                     | Documentation only.                                                |
| `test`                  | none                     | Test additions / changes.                                          |
| `build`                 | none                     | Build system, packaging.                                           |
| `ci`                    | none                     | CI configuration.                                                  |
| `revert`                | matches reverted commit  | Generates the inverse change.                                      |

The "no bump" rows still appear in the changelog under a non-release
section.

## Commit format

```
<type>(<scope>): <subject> (<outcome-id>)

[optional body — wrap at 72 cols; explain WHY, not WHAT]

[optional footer(s):]
BREAKING CHANGE: <description>
Refs: O2, O3, #42
Closes: #42
```

Field rules:

- `<type>` ∈ {`feat`, `fix`, `perf`, `refactor`, `chore`, `docs`, `test`,
  `build`, `ci`, `revert`}.
- `<scope>` is optional but encouraged. For this repo, common scopes
  are `vendor`, `crawler`, `neon`, `heartbeat`, `runbooks`,
  `conventions`, `ci`, `github`, `phase-N`.
- `<subject>` is imperative present tense ("add", not "added"/"adds"),
  ≤ 60 characters, no trailing period.
- `<outcome-id>` is a bare token in trailing parentheses on the
  subject line: `(O1)`, `(O2)`, etc.

## Outcome-id rule (mandatory)

> Every commit message **MUST** reference at least one outcome ID,
> written as a bare token in trailing parentheses on the subject line,
> e.g. `(O1)`. Commits spanning multiple outcomes use the `Refs:`
> footer to list the others while keeping the most-relevant ID on the
> subject line.

A commit without an outcome ID is rejected at code review. If you
cannot name an outcome, do not make the commit. (The same rule appears
in the cited `define-outcomes.md`: "It leverages a separate context
window to avoid being influenced by the main agent's implementation
choices" — the grader needs a stable outcome ID to evaluate.)

## PR-to-issue linkage rule (mandatory)

Every PR body **MUST** contain either:

- `Closes #N` (auto-closes the linked issue on merge), OR
- `Refs #N` (references without auto-closing).

This is enforced by `.github/pull_request_template.md` (a checklist the
PR author fills out) and surfaced in the GitHub `/issues` view via the
linkage — so a PR is "part of issues" per the operator's framing.

If a PR doesn't fit any existing issue, open one first.

## Worked example per Conventional Commit type

Each example reflects the kind of commit we already make in this repo.

### `feat` — new capability

```
feat(neon): wire ws constructor for Pool websocket (O2)
```

Wires `neonConfig.webSocketConstructor = ws` in `scripts/lib/neon-client.ts`.
SemVer impact: **MINOR**.

### `fix` — bug fix

```
fix(crawler): page_cap=0 sentinel + relative-URL resolution (O1)
```

Two bugs in one fix. SemVer impact: **PATCH**.

### `perf` — performance improvement

```
perf(crawler): cache neonConfig.webSocketConstructor across pool reuses (O3)
```

SemVer impact: **PATCH**.

### `refactor` — internal restructure, no behavior change

```
refactor(neon): extract warmConnection helper from migrate-neon (O2)
```

No behaviour change. SemVer impact: **none** (or PATCH if release tool requires).

### `chore` — housekeeping

```
chore(heartbeat): tick 9 record — Neon secrets audit (O3)
```

No code; memory state update. SemVer impact: **none**.

### `docs` — documentation only

```
docs(conventions): add outcome-driven commit + SemVer guide (O1)
```

This very commit. SemVer impact: **none**.

### `test` — tests only

```
test(conventions): assert this PR's commits carry outcome IDs (O3)
```

A test that asserts the convention. SemVer impact: **none**.

### `build` — build system / packaging

```
build(deps): pin ws to 8.x for Node 20 (O2)
```

SemVer impact: **none**.

### `ci` — CI configuration

```
ci(neon): add ::error:: annotation surface to migrate-neon (O2)
```

SemVer impact: **none**.

### `revert` — undo a previous commit

```
revert: revert "fix(ci): use db_url_pooled (O2)"

This reverts commit d7b6a32. Wrong output name; @v5 docs confirm
db_url_with_pooler is correct. See PR #61.
```

SemVer impact: **matches the reverted commit**.

### Breaking change — MAJOR bump

```
feat(crawler)!: rename page_cap to max_pages_per_pass (O1)

BREAKING CHANGE: every vendor/<name>/crawl.json must rename the
`page_cap` field to `max_pages_per_pass`. Migration script provided
at scripts/migrate-vendor-crawl-keys.ts.
```

`!` + `BREAKING CHANGE:` both force **MAJOR**.

## Outcomes from this repo's history (worked example)

Today's session declared outcomes informally per-PR. Retroactively
naming them:

| Session-PR-chain | Outcome ID | Description |
| :--- | :---: | :--- |
| PRs #56-#58 | (legacy) | Phase 13.B+ chassis (8 sub-outcomes O1-O8) |
| PRs #60→#61→#63→#65→#69→#72 | OneOn1 | Per-PR Neon migrations actually run end-to-end |
| PRs #66, #67, #71, #73, #74 | OneOn2 | Heartbeat persistence + queued execution |
| PRs #70, #75 | OneOn3 | Verified vendor coverage + secrets matrix |

Future sessions should declare outcomes upfront in their orchestrator
prompt's `<outcomes>` block, then use those IDs in commit subjects.

## FAQ / edge cases

**A commit touches more than one outcome.** Put the primary outcome on
the subject; list the rest in `Refs:` footer.

**A commit doesn't fit any outcome.** It's out of scope. Either
declare a new outcome and commit under it, or drop the change.

**Squash-merge.** The squash subject must itself be a valid Conventional
Commit referencing the dominant outcome ID; preserve underlying
subjects in the squashed body.

**Reverts.** Use `revert:` (no scope) and reference the same outcome ID
as the reverted commit. The SemVer bump is the inverse.

**Outcome IDs across sessions.** IDs are stable per-prompt; don't
renumber historical commits when a new session declares its own `O1`.
For ambiguity, prefix with PR number or session date in commit bodies.

## See also

- [`seeds/citations/define-outcomes.md`](../seeds/citations/define-outcomes.md) — canonical citation extract
- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md`](../vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md) — full source
- [`rubrics/phase-N.md`](../rubrics/) — per-phase outcome rubrics (the criteria the grader scores)
- [`docs/governance.md`](./governance.md) — auto-merge + heartbeat governance
- [`.github/pull_request_template.md`](../.github/pull_request_template.md) — PR template enforcing Closes/Refs
