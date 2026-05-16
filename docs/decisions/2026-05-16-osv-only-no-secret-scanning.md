---
date: 2026-05-16
status: accepted
deciders: alex-jadecli
outcome_id: OSL1
supersedes: docs/decisions/2026-05-16-org-repo-settings-policy.md (§A, §B partial)
---

# ADR — GoogleOSV-only security stack; secret-scanning + Dependabot disabled

## Context

PR #177 enabled four GitHub-native security features at org + repo
level: Dependabot alerts, Dependabot security updates, secret scanning,
secret scanning push protection.

Within hours the operator reversed the decision with explicit
rationale: **"we use the google osv instead of secret scanning because
it's cheaper"**. Operator pays for GitHub Enterprise and Anthropic
Max but does not want to layer GitHub Advanced Security pricing on
top. OSV-Scanner (Google) already runs as a required CI check
(`.github/workflows/osv-scanner.yml`, vendor-mirrored at
`vendor/osv-scanner/`) and the new
`plugins/platform-engineering/skills/github-repo-security-review/`
+ `github-org-security-review/` skills cover the diff-aware secret
+ semantic-vuln surface using Claude + OSV instead.

## Decision

**All four GitHub-native security toggles stay OFF**, at org and repo
levels, indefinitely. Future operators (or future agent sessions)
that re-enable them violate this ADR.

The replacement stack:

| Concern | Replacement | Cost |
|---|---|---|
| Dependency CVE alerts | OSV-Scanner CI workflow (`.github/workflows/osv-scanner.yml`) | $0 (OSS) |
| Dependency auto-PRs | Manual via `github-repo-security-review` skill OR ad-hoc agent runs | $0 (agent already paid) |
| Secret scanning at push | `github-repo-security-review` skill's diff scanner + Voyage-embedding-based pattern matcher | $0 |
| Push protection | OSV-Scanner is a required check on the ruleset; PR cannot merge w/ vulns | $0 |
| Semantic vuln review | `github-repo-security-review` skill calling Claude through `CLAUDE_CODE_OAUTH_TOKEN` (OAuth-only posture, not `ANTHROPIC_API_KEY`) | included in Max plan |

## Forbidden settings

The following GitHub settings MUST remain `false`/`disabled` for
`subagentceo` org + `subagentceo/knowledge-engineering` repo +
**every future repo** in the org:

| Setting | API path | State |
|---|---|---|
| `dependabot_alerts_enabled_for_new_repositories` | `PATCH /orgs/subagentceo` | false |
| `dependabot_security_updates_enabled_for_new_repositories` | `PATCH /orgs/subagentceo` | false |
| `secret_scanning_enabled_for_new_repositories` | `PATCH /orgs/subagentceo` | false |
| `secret_scanning_push_protection_enabled_for_new_repositories` | `PATCH /orgs/subagentceo` | false |
| `security_and_analysis.dependabot_security_updates` (per-repo) | `PATCH /repos/{owner}/{repo}` | disabled |
| `security_and_analysis.secret_scanning` (per-repo) | `PATCH /repos/{owner}/{repo}` | disabled |
| `security_and_analysis.secret_scanning_push_protection` (per-repo) | `PATCH /repos/{owner}/{repo}` | disabled |
| `/repos/{owner}/{repo}/automated-security-fixes` | `PUT/DELETE` | DELETEd |
| `/repos/{owner}/{repo}/vulnerability-alerts` | `PUT/DELETE` | DELETEd |

A future agent that proposes re-enabling any of these MUST be
challenged with this ADR and the operator's cost rationale.

## Applied this session

```bash
# Org-level (admin-jadecli token, admin:org scope):
GH_TOKEN=$(gh auth token --user admin-jadecli) gh api -X PATCH orgs/subagentceo \
  -F dependabot_alerts_enabled_for_new_repositories=false \
  -F dependabot_security_updates_enabled_for_new_repositories=false \
  -F secret_scanning_enabled_for_new_repositories=false \
  -F secret_scanning_push_protection_enabled_for_new_repositories=false

# Repo-level:
gh api -X DELETE repos/subagentceo/knowledge-engineering/automated-security-fixes
gh api -X DELETE repos/subagentceo/knowledge-engineering/vulnerability-alerts
gh api -X PATCH repos/subagentceo/knowledge-engineering \
  -f 'security_and_analysis[secret_scanning][status]=disabled' \
  -f 'security_and_analysis[secret_scanning_push_protection][status]=disabled'
```

Post-state verified via `GET /repos/subagentceo/knowledge-engineering`:
all 5 `security_and_analysis.*` fields are `disabled`.

## Enforcement: assertion script

`scripts/assert-security-posture.ts` runs in the verify chain and
fails if any of the forbidden settings flip back to enabled. Operator
can run it ad-hoc: `npm run verify:security-posture`.

## Citations

- [`vendor/osv-scanner/`](../../vendor/osv-scanner/) — Google OSV-Scanner docs mirror
- [`.github/workflows/osv-scanner.yml`](../../.github/workflows/osv-scanner.yml) — required CI check
- [`plugins/platform-engineering/skills/github-repo-security-review/SKILL.md`](../../plugins/platform-engineering/skills/github-repo-security-review/SKILL.md) — replacement scanner
- [`plugins/platform-engineering/skills/github-org-security-review/SKILL.md`](../../plugins/platform-engineering/skills/github-org-security-review/SKILL.md) — org-wide rollup
- [`docs/decisions/2026-05-16-org-repo-settings-policy.md`](./2026-05-16-org-repo-settings-policy.md) — the ADR this supersedes (§A + §B partial)
- Operator chat 2026-05-16: "we use the google osv instead of secret scanning because it's cheaper"

## Out of scope

- Re-enabling GitHub Advanced Security for any repo
- Migrating off OSV-Scanner
- Adding GitHub Code Scanning (CodeQL stays as informational, not required)
