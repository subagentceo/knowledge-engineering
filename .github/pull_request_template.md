<!--
  knowledge-engineering PR template.

  See docs/CONVENTIONS.md for the outcome-driven Conventional-Commits
  discipline this template enforces. Per the operator's framing,
  "PRs should be part of issues" — every PR MUST link to at least one
  issue via Closes/Refs so it surfaces in the GitHub /issues view.
-->

## Outcomes

<!--
  Declare which outcome IDs this PR fulfills. Outcome IDs are stable
  per-session and appear on every commit subject in trailing parens
  (e.g. "feat(neon): wire ws constructor (O2)").

  Example:
    - **O1** — repo adopts outcome-driven Conventional-Commits
    - **O2** — PR template enforces Closes/Refs
    - **O3** — test asserts this PR's commits carry outcome IDs

  If you can't name an outcome, the change is out of scope.
-->

- **O?** — _<one-line outcome description>_

## Issue linkage (mandatory)

<!--
  At least one of `Closes #N` / `Refs #N` is required. The repo's
  outcome-test (src/lib/conventions.test.ts) asserts this on the
  PR body (when the workflow has the body available).
-->

Closes #
Refs #

## Summary

<!-- 1-3 bullets describing what changed and why. Focus on WHY. -->

-
-

## Test plan

<!-- Markdown checklist of what's been validated locally + by CI. -->

- [ ] `npm run verify` clean locally
- [ ] All commits follow `docs/CONVENTIONS.md`:
  - [ ] Conventional Commit type prefix (`feat:`, `fix:`, `docs:`, etc.)
  - [ ] Trailing outcome ID in parentheses on subject line (e.g. `(O1)`)
- [ ] PR body declares outcomes + at least one `Closes #` / `Refs #`
- [ ] CI green before merge (especially `Create Neon Branch` post PR #72)

## Citations (if introducing new tests or rubric criteria)

<!--
  Per docs/CONVENTIONS.md + seeds/citations/define-outcomes.md, tests
  cite their source-of-truth via @cite headers. List the citation
  files added or referenced in this PR.
-->

- _(none — or list `seeds/citations/<slug>.md` / `vendor/<...>` paths)_

---

<sub>Per the convention, this PR's commits all end with their outcome ID. The auto-merge label may be applied once the PR-template checklist passes <em>and</em> branch protection (operator action #37) is in place.</sub>
