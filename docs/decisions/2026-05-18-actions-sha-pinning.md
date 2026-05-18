# ADR: SHA-pin third-party GitHub Actions (OGHW-X2)

**Date:** 2026-05-18
**Outcome:** OGHW-X2
**Status:** Accepted
**Supersedes:** N/A (new policy)

@cite seeds/citations/github-actions-best-practices-2026-05-18.md
@cite https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
@cite docs/decisions/2026-05-17-auto-merge-recovery.md

## Problem

`.github/workflows/*` pin third-party actions to floating `@v<major>` tags
(`cloudflare/wrangler-action@v3`, `neondatabase/create-branch-action@v5`,
`neondatabase/delete-branch-action@v3`, `neondatabase/schema-diff-action@v1`,
`tj-actions/branch-names@v8`, `google/osv-scanner-action/.github/workflows/...@v2.3.8`).

Floating tags are **mutable**. A compromised maintainer (or an attacker
with their credentials) can re-point `v3` to malicious code, and every
workflow run after that picks up the new content silently. Recent supply-
chain attacks against the GitHub Actions ecosystem
(`tj-actions/changed-files` March 2025, `reviewdog/action-setup` March
2025) targeted exactly this surface.

## Decision

**Hybrid policy: SHA-pin everything not under `actions/*` or `github/*`.**

1. **Pin to a 40-char commit SHA** for every action whose owner is NOT
   one of:
   - `actions/*` (first-party GitHub-maintained)
   - `github/*` (first-party GitHub-maintained, e.g. `github/codeql-action`)
   - `anthropics/*` (vendor we trust by direct relationship)
2. **Each SHA-pinned `uses:` line carries an inline comment with the
   readable version tag** for grep-ability:
   ```yaml
   uses: cloudflare/wrangler-action@<40-char-sha>  # v3.x
   ```
3. **`.github/dependabot.yml`** (new) declares the `github-actions`
   ecosystem with `directory: "/"`, `schedule.interval: "weekly"`, and a
   single `groups:` entry bundling all major bumps into one PR per week.
4. **Documented exceptions** live at the bottom of this ADR and inline
   as `# exception: <reason>` comments next to the offending `uses:`
   line.

## Exception list (permanent)

| Action | Current pin | Reason for exception |
| --- | --- | --- |
| `google/osv-scanner-action/.github/workflows/osv-scanner-reusable-pr.yml@v2.3.8` | `@v2.3.8` (tag) | Reusable workflow references cannot be SHA-pinned reliably across path/rev renames in the action's own repo; the *reusable workflow file* shape changes with releases and there is no `@<sha>` substitute for `@<tag>` when GitHub resolves the path. Mitigated by: (a) version pin (not floating major), (b) `subscribe_pr_activity` on the upstream releases, (c) audit on bump. |
| `tj-actions/branch-names@v8` | `@v8` (floating major) | Considered SHA-pinning, but this action is small (one composite step that reads `github.head_ref`); the supply-chain risk is bounded by its minimal capability surface and read-only token use. To be re-evaluated when our verify chain learns to verify-on-fork. |

## Progressive-migration backlog (COMPLETE)

All 6 previously-tag-pinned third-party actions are now SHA-pinned.
Dependabot (`.github/dependabot.yml`) opens a weekly grouped PR to bump
the SHAs when upstream releases new versions; the audit on bump is the
gate (per the StepSecurity guidance cited above).

| Action | Pinned SHA | Workflow | Landed in |
| --- | --- | --- | --- |
| `cloudflare/wrangler-action@v3` | `9acf94ace14e7dc412b076f2c5c20b8ce93c79cd` | `cloudflare-preview.yml` | OGHW6 |
| `neondatabase/create-branch-action@v5` | `34f619c41c6e67b4f2f13f1c6eae90827a5f2cf4` | `neon-branch.yml` | OGHW7 |
| `neondatabase/schema-diff-action@v1` | `80cfa8521628e890015b60f5291a7738926617dc` | `neon-branch.yml` | OGHW7 |
| `neondatabase/delete-branch-action@v3` | `4468d825d5a88ef4012f1705a82f02ec3072f776` | `neon-branch.yml` | OGHW7 |
| `googleapis/release-please-action@v4` | `8b8fd2cc23b2e18957157a9d923d75aa0c6f6ad5` | `release-please.yml` | OGHW9 |
| `hashicorp/setup-terraform@v3` | `b9cd54a3c349d3f38e8881555d616ced269862dd` | `verify.yml` | OGHW11 |

## Outcomes (evaluation criteria)

| ID | Outcome | Test |
| --- | --- | --- |
| OGHW-X2-1 | Every `uses:` line referencing a non-`actions/*`/`github/*`/`anthropics/*` action in `.github/workflows/*` either is pinned to a 40-char SHA OR appears in the Exception list above. | `src/lib/workflows/sha-pin.test.ts` — parses every workflow file, extracts `uses:` lines, asserts pattern. |
| OGHW-X2-2 | `.github/dependabot.yml` declares the `github-actions` ecosystem with `directory: "/"` and weekly schedule. | `src/lib/workflows/dependabot-config.test.ts` |
| OGHW-X2-3 | Each SHA-pinned `uses:` carries an inline `# v<major>.<minor>` comment for grep-ability. | `src/lib/workflows/sha-pin.test.ts` (same file) |

## Rejected alternatives

- **Strict — SHA-pin EVERYTHING including `actions/*` and `github/*`.**
  GitHub themselves do not require SHA pins on their own actions in
  their published templates. Aligning with vendor practice keeps churn
  reasonable.
- **Permissive — keep floating majors everywhere.** Misses the supply-
  chain threat addressed by the GitHub hardening guide; rejected at
  D-SHA per the plan.

## Related work

- OGHW-X1: extracts a `permissions:` defaults checklist into every
  workflow header.
- OGHW-X3: shared `concurrency:` + `timeout-minutes:` defaults.
- OCQ1: the new `codeql.yml` is the first workflow to ship under this
  policy (uses `github/codeql-action/init@v3` — exempt per the policy).
