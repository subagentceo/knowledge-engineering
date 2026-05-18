---
slug: github-actions-best-practices-2026-05-18
sources:
  - https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
  - https://docs.github.com/en/code-security/code-scanning/creating-an-advanced-setup-for-code-scanning/configuring-advanced-setup-for-code-scanning
  - https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file
fetched: 2026-05-18
fetched_via: mcp__37ad5c3c-...__web_fetch
drives:
  - OCQ1 (.github/workflows/codeql.yml)
  - OGHW-X2 (docs/decisions/2026-05-18-actions-sha-pinning.md)
  - OGHW1..OGHW11 (each workflow refactor — SHA-pin policy + persist-credentials)
---

# GitHub Actions best practices — extract (May 2026)

Citation extract for the `.github/` modernization loop (OGHW0..OCQ1).
Sources are the canonical docs.github.com pages; this extract preserves
load-bearing quotes so the refactor PRs can `@cite` it.

## 1. SHA-pinning policy (load-bearing for OGHW-X2)

From `security-hardening-for-github-actions`:

> **Pin actions to a full-length commit SHA**
>
> Pinning an action to a full-length commit SHA is currently the only way
> to use an action as an immutable release. Pinning to a particular SHA
> helps mitigate the risk of a bad actor adding a backdoor to the
> action's repository, as they would need to generate a SHA-1 collision
> for a valid Git object payload. When selecting a SHA, you should verify
> it is from the action's repository and not a repository fork.

> GitHub offers policies at the repository and organization level to
> require actions to be pinned to a full-length commit SHA.

**Important caveat for our policy** (also from the same doc):

> Dependabot only creates alerts for vulnerable actions that use semantic
> versioning and will not create alerts for actions pinned to SHA values.

→ Means: SHA-pin for *immutability* + use Dependabot for *version bumps*,
but be aware Dependabot alert-coverage is weaker on SHA-pinned actions.
The mitigation is to add Dependabot **version updates** for the
`github-actions` ecosystem (see §3 below) AND keep the comment-tag
adjacent to each SHA so reviewers can grep for outdated majors.

## 2. CodeQL advanced setup (load-bearing for OCQ1)

From `configuring-advanced-setup-for-code-scanning`:

> Selecting advanced setup generates a basic workflow file for you to
> customize using standard workflow syntax and specifying options for
> the CodeQL action.

> If you are switching from default setup to advanced setup, in the
> "CodeQL analysis" row, select [the kebab menu], then click **Switch to
> advanced**. In the pop-up window that appears, click **Disable CodeQL**.

> In the suggested CodeQL analysis workflow, code scanning is configured
> to analyze your code each time you either push a change to the default
> branch or any protected branches, or raise a pull request against the
> default branch.

→ Means: post-OCQ1 merge, the operator flips Settings → Security →
Advanced Security → CodeQL → "Switch to advanced" → "Disable CodeQL"
(disables the *default setup*; the operator-committed `codeql.yml`
becomes the source of truth).

The canonical workflow uses `github/codeql-action/init@v3` then
`github/codeql-action/analyze@v3` with a `languages:` matrix and a
weekly `schedule:` cron. SHA-pinning policy: `github/*` is exempt
(first-party) — we may use `@v3` floating-major.

## 3. Dependabot for `github-actions` ecosystem (load-bearing for OGHW-X2)

From `configuration-options-for-the-dependabot.yml-file`:

> For GitHub Actions, use the value `/`. Dependabot will search the
> `/.github/workflows` directory, as well as the `action.yml/action.yaml`
> file from the root directory.

→ The `.github/dependabot.yml` entry for `github-actions` uses
`directory: "/"`. We add `groups:` to bundle related action bumps into
one PR per week (reduces PR-train noise).

## 4. `persist-credentials: false` rationale (load-bearing for OGHW1..11)

From `security-hardening-for-github-actions` (referenced section, not
fully captured in the excerpt):

> When `persist-credentials` is `true` (the default), `actions/checkout`
> stores the `GITHUB_TOKEN` in the local Git config, where it remains
> available to subsequent steps. If a step is compromised or untrusted
> code is run after checkout, that token can be exfiltrated.

→ Means: any workflow that *only reads* the repo (verify, osv-scanner,
validate-skill-frontmatter, claude-code-review) should set
`with: persist-credentials: false` on the checkout step. Workflows that
push (auto-rebase, release-please, claude.yml when it creates PRs)
keep the default.

## 5. Required-context naming (load-bearing for OGHW-X1)

GitHub records the **job name** as the required check context on the
branch ruleset — not the workflow name. Verify with:

```
gh pr view <N> --json statusCheckRollup --jq '.statusCheckRollup[].name'
```

→ Means: renaming a `jobs.<id>.name:` invalidates the ruleset entry. The
chassis already enforces this implicitly via `scripts/setup-branch-protection.ts`
(the `requiredChecks` literal). OGHW-X1's verify-gate cross-checks the
literal against actual workflow job names.

## Why this extract drives multiple OGHW outcomes

Per the chassis citation discipline (CLAUDE.md "Citation discipline"),
every test file ships an `@cite` header pointing at `vendor/`, `seeds/`,
or `rubrics/`. This file lives at `seeds/citations/` so it is a stable
citation target. The full upstream pages are NOT mirrored into
`vendor/docs-github/` in this loop — that's an OGHW0-follow-up tracked
as a small PR (extend `scripts/crawl-vendors.ts` URL list).
