# Conventions: SemVer & Conventional Commits

This guide is how the **data_science_and_analytics** team operationalizes
[Conventional Commits](https://www.conventionalcommits.org/) and
[Semantic Versioning](https://semver.org/) inside an outcome-driven workflow.

## Why this exists

Outcome-driven development means every change in this team can be traced to
a declared **outcome** — an observable end state, not a task. Outcomes are
identified by stable IDs (`O1`, `O2`, …) declared in the prompt's `<outcomes>`
block at the start of the session. By weaving those IDs into commit messages
and SemVer bumps, we get three things for free:

1. **Traceability.** Any commit can be mapped back to the outcome that
   justified it.
2. **Predictable releases.** Conventional Commit types deterministically map
   to MAJOR / MINOR / PATCH bumps, so release tooling does not need human
   judgment.
3. **Reviewable diffs.** Small, single-purpose commits (one type, one outcome)
   are easier to review, revert, and audit than catch-all commits.

If a change cannot be tied to an outcome, the change is out of scope — open
a new outcome before you make it.

---

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

The "no bump" rows still ship in the changelog, just under a non-release
section.

---

## Commit format

```
<type>(<scope>): <subject> (<outcome-id>)

[optional body — wrap at 72 cols, explain WHY, not WHAT]

[optional footer(s), e.g.:]
BREAKING CHANGE: <description of incompatibility>
Refs: O2, O3
```

Field rules:

- `<type>` is one of: `feat`, `fix`, `perf`, `refactor`, `chore`, `docs`,
  `test`, `build`, `ci`, `revert`.
- `<scope>` is optional but encouraged; for this team typical scopes are
  `setup`, `conventions`, `db`, `cache`, `pipeline`, `notebook`, `team`.
- `<subject>` is imperative present tense (`add`, not `added`/`adds`),
  ≤ 60 characters, no trailing period.
- `<outcome-id>` is the bare token in trailing parentheses on the subject
  line: `(O1)`, `(O2)`, etc.

---

## Outcome-id rule (mandatory)

> Every commit message **MUST** reference at least one outcome ID, written as
> a bare token in trailing parentheses on the subject line, e.g. `(O1)`.
> Commits that span multiple outcomes use the `Refs:` footer to list the
> others while keeping the most-relevant ID on the subject line.

A commit with no outcome ID is rejected at code-review time. If you cannot
name an outcome, do not make the commit.

---

## One example per Conventional Commit type

Each example is a real commit we would write in this team.

### `feat` — new capability

```
feat(setup): bootstrap postgres and redis services (O1)
```

Adds `setup.sh` with start + readiness polling for PostgreSQL 16 and Redis 7.
SemVer impact: **MINOR**.

### `fix` — bug fix

```
fix(setup): wait for pg socket before pg_isready check (O1)
```

Cold-started Postgres can briefly reject before its unix socket binds; the
loop now retries instead of failing on the first probe. SemVer impact:
**PATCH**.

### `perf` — performance improvement

```
perf(setup): drop redundant sleep when redis already accepting (O1)
```

`wait_for_ready` now returns on the first successful probe instead of
sleeping the full interval. SemVer impact: **PATCH**.

### `refactor` — internal restructure, no behaviour change

```
refactor(setup): extract wait_for_ready helper (O1)
```

Inlined poll loops are now a single helper. No behaviour change. SemVer
impact: **none** (or **PATCH** under release tools that demand it).

### `chore` — housekeeping

```
chore(team): scaffold data_science_and_analytics directory (O1)
```

Creates the team folder under `.claude/agents/teams/`. No code, no docs.
SemVer impact: **none**.

### `docs` — documentation only

```
docs(conventions): add SemVer + Conventional Commits guide (O2)
```

Adds this file (`CONVENTIONS.md`). SemVer impact: **none**.

### `test` — tests only

```
test(setup): add bats smoke test for pg/redis health (O1)
```

A bats-core test that runs `setup.sh` in a sandbox and asserts both probes
pass. SemVer impact: **none**.

### `build` — build system / packaging

```
build(deps): pin shellcheck dev dependency (O2)
```

Pins shellcheck so CI lint is reproducible. SemVer impact: **none**.

### `ci` — CI configuration

```
ci(lint): run shellcheck on team setup scripts (O1)
```

Adds a CI job that lints every `setup.sh` under `.claude/agents/teams/*/`.
SemVer impact: **none**.

### `revert` — undo a previous commit

```
revert: revert "feat(setup): autostart docker daemon" (O1)

This reverts commit 0123abcd. The docker autostart broke headless CI runs;
revisit under a separate outcome.
```

SemVer impact: **matches the reverted commit** (here, MINOR).

### Breaking change — MAJOR bump

```
feat(setup)!: rename SETUP_TIMEOUT to READINESS_TIMEOUT_SEC (O1)

BREAKING CHANGE: callers exporting SETUP_TIMEOUT must rename the variable.
The new name is READINESS_TIMEOUT_SEC.
```

The `!` after the scope and the `BREAKING CHANGE:` footer both force a
**MAJOR** bump. Either is sufficient on its own; we use both for clarity.

---

## Worked example: outcome O1, end-to-end

Suppose this team starts at version `0.1.0` and the session declares O1
("setup.sh leaves postgres + redis healthy"). The chain of commits that
lands O1 might be:

| # | Commit                                                                          | Bump   | Running version |
|---|---------------------------------------------------------------------------------|--------|-----------------|
| 1 | `chore(team): scaffold data_science_and_analytics directory (O1)`               | none   | 0.1.0           |
| 2 | `feat(setup): bootstrap postgres and redis services (O1)`                       | MINOR  | 0.2.0           |
| 3 | `fix(setup): wait for pg socket before pg_isready check (O1)`                   | PATCH  | 0.2.1           |
| 4 | `refactor(setup): extract wait_for_ready helper (O1)`                           | none   | 0.2.1           |
| 5 | `feat(setup): print transcript URL on exit (O3)`                                | MINOR  | 0.3.0           |
| 6 | `docs(conventions): add SemVer + Conventional Commits guide (O2)`               | none   | 0.3.0           |
| 7 | `ci(lint): run shellcheck on team setup scripts (O1)`                           | none   | 0.3.0           |

Net effect: O1 lands cleanly, two MINOR bumps and one PATCH, and the changelog
groups the work by outcome, not by chronology.

---

## FAQ / edge cases

**A commit touches more than one outcome.** Pick the outcome that best
describes the *primary intent* and put it on the subject line. List the
others in a `Refs:` footer:

```
feat(setup): print transcript URL on exit (O3)

Refs: O1
```

**A commit doesn't fit any outcome.** It's out of scope. Either declare a
new outcome and commit under it, or drop the change.

**Squash-merge into a release branch.** The squash subject must itself be a
valid Conventional Commit referencing the dominant outcome ID; the squashed
body should preserve the underlying commit subjects so the audit trail
survives.

**Reverts.** Use `revert:` (no scope) and reference the same outcome ID as
the reverted commit. The SemVer bump is the inverse of the reverted commit.

**Outcome IDs across sessions.** IDs are stable per-prompt; do not renumber
historical commits when a new session declares its own `O1`. If ambiguity
arises, prefix with the session date or PR number in commit bodies (not the
subject).
