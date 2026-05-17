# Structured review prompt

The roving reviewer posts exactly one of two comment shapes per PR.
Never deviate.

## Shape 1 — approve-clean

```
[approve-clean: roving-reviewer]

<one sentence: why this is safe to merge>
```

Example:

```
[approve-clean: roving-reviewer]

Adds an outbound-allowlist runbook with no executable code paths; documentation-only change with citation paths verified.
```

After posting, enable auto-merge:

```bash
gh pr merge <N> --auto --squash
```

## Shape 2 — approve-pending

```
[approve-pending: operator-decision]

1. <issue 1, terse, file:line if applicable>
2. <issue 2, terse, file:line if applicable>

No nitpicks — only the items above block the auto-approval.
```

Example:

```
[approve-pending: operator-decision]

1. src/oauth/token.ts:42 — new code path reads ANTHROPIC_API_KEY without the fail-closed guard; violates OAuth-only invariant.
2. scripts/crawl-vendors.ts:118 — retry loop has no upper bound; one bad host can hang the whole crawl.

No nitpicks — only the items above block the auto-approval.
```

Do NOT enable auto-merge on approve-pending PRs. The operator
decides whether to push back, fix, or override.

## What does NOT qualify as an issue

- Naming preferences
- Comment density / missing JSDoc
- Import ordering
- Test-name phrasing
- Whitespace, trailing newlines
- "Could be extracted into a helper"
- "Consider using X instead of Y" without a concrete failure mode

These belong to the `claude-review` GitHub Actions workflow, which
already runs on every PR. The roving reviewer's job is to catch the
small set of substantive issues that workflow misses — broken
invariants, silent failures, security boundaries, OAuth-only
posture, citation/verify-chain breakage.

## What DOES qualify

- Breaks an invariant declared in `CLAUDE.md` or an ADR
- Introduces a network call without error handling
- Changes auth, secrets, or env-var contract surface
- Wrong transaction scope on a SQL write
- Silent data loss (caught exception with no log/no rethrow)
- New test missing `@cite` header (verify chain will fail)
- Outcome ID in commit doesn't match a declared outcome
