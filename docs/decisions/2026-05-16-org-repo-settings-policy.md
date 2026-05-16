---
date: 2026-05-16
status: accepted
deciders: alex-jadecli
outcome_id: OGS1
---

# ADR — Org + repo settings policy adapted from Anthropic reference repos

## Context

Operator asked to adopt patterns from these public Anthropic repos:

- [`anthropics/claude-code`](https://github.com/anthropics/claude-code/actions) — issue triage, autopr, dedupe, lock-closed
- [`anthropics/claude-code-base-action`](https://github.com/anthropics/claude-code-base-action/actions) — copilot reviewer dynamic
- [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action/actions) — ci, release, test-mcp-servers, sync-base-action
- [`anthropics/skills`](https://github.com/anthropics/skills/actions) — copilot reviewer
- [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins/actions) — scan-plugins, validate-plugins
- [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official/actions) — bump-plugin-shas, close-external-prs, scan-plugins, **validate-frontmatter**, validate-marketplace, validate-plugins
- [`anthropics/claude-for-legal`](https://github.com/anthropics/claude-for-legal/actions) — CLA
- [`anthropics/claude-agent-sdk-typescript`](https://github.com/anthropics/claude-agent-sdk-typescript/actions) — issue-triage, non-write-users-check, slack-issue-notification

And to update three settings surfaces:

- `https://github.com/subagentceo/knowledge-engineering/settings`
- `https://github.com/organizations/subagentceo/settings/repository-defaults`
- `https://github.com/organizations/subagentceo/settings/rules`

## Decision

Adopt 4 patterns; defer 6. Apply at org-default + repo level so future
repos inherit while `knowledge-engineering` conforms today. No
retroactive sweep on the other 10+ org repos (scope-creep).

## Adopted

### A. Org-defaults for NEW repos (admin-jadecli, applied this session)

```bash
GH_TOKEN=$(gh auth token --user admin-jadecli) gh api -X PATCH orgs/subagentceo \
  -f dependabot_alerts_enabled_for_new_repositories=true \
  -f dependabot_security_updates_enabled_for_new_repositories=true \
  -f secret_scanning_enabled_for_new_repositories=true \
  -f secret_scanning_push_protection_enabled_for_new_repositories=true
```

Pre-state: all four `false`. Post-state: all four `true`.

### B. Repo settings on `knowledge-engineering` (alex-jadecli, applied)

```bash
gh api -X PATCH repos/subagentceo/knowledge-engineering \
  -F allow_merge_commit=false \
  -F allow_rebase_merge=false

# Enable dependabot security updates + vulnerability alerts on this
# existing repo too (org-default only affects NEW repos).
gh api -X PUT repos/subagentceo/knowledge-engineering/automated-security-fixes
gh api -X PUT repos/subagentceo/knowledge-engineering/vulnerability-alerts
```

Aligns repo merge-method settings with the existing ruleset
(`scripts/setup-branch-protection.ts`) which already declares
`allowed_merge_methods: ["squash"]`. Removes redundancy + closes the
"repo says yes, ruleset says no" confusion.

### C. validate-skill-frontmatter.yml workflow

New file `.github/workflows/validate-skill-frontmatter.yml` modeled
after [`anthropics/claude-plugins-official/.github/workflows/validate-frontmatter.yml`](https://github.com/anthropics/claude-plugins-official/blob/main/.github/workflows/validate-frontmatter.yml).
Validates every `plugins/<plugin>/skills/<skill>/SKILL.md` against
the agentskills.io spec we vendor-mirrored in PR #176
(`vendor/agentskills/agentskills.io/specification.md`):

- `name` 1-64 chars, kebab-case, matches parent dir
- `description` 1-1024 chars, non-empty
- `compatibility` (if present) ≤ 500 chars
- `plugin.json` parses as JSON

Lightweight (no `bun`/`node` install for the frontmatter pass; uses
`awk`+`grep`).

### D. Existing ruleset stays in place

`Protect main — no HITL` ruleset (id 16440994) already enforces:

- PR required
- Squash-only (`allowed_merge_methods: ["squash"]`)
- Required status checks: `npm run verify`, `OSV-Scanner (PR) / osv-scan`
- `strict_required_status_checks_policy: true` (branch must be up-to-date — no-conflict guarantee)
- No deletion, no non-fast-forward

This already matches what Anthropic does on their reference repos
(confirmed via the ruleset shapes visible in their public PRs).

## Deferred (out of scope this PR)

| Pattern | From | Why deferred |
|---|---|---|
| `close-external-prs.yml` | claude-plugins-official | Single-operator repo; no external PR firehose to gate |
| `bump-plugin-shas.yml` | claude-plugins-official | We don't yet host a plugin marketplace |
| `scan-plugins.yml` | knowledge-work-plugins | Same — runs on plugin marketplace repos |
| `validate-plugins.yml` | knowledge-work-plugins | Covered by C above (frontmatter is the wedge) |
| `issue-triage.yml` | multiple | Existing `claude.yml` + `claude-code-review.yml` are sufficient; triage would need a new use case |
| `autopr.yml` | claude-code | Out of scope; requires the `claude-code` GitHub App with broader perms |
| `lock-closed-issues.yml` | claude-code | Single-operator; no spam to lock |
| `cla.yaml` | claude-for-legal | Single-operator; no external contributors |
| Retroactive sweep on other 10+ subagentceo repos | — | High blast radius; defer until confirmed per repo |

## Out-of-band vs in-repo state

| Where the change lives | What | Audit |
|---|---|---|
| GitHub org settings (not in git) | Org-defaults A | API PATCH log + this ADR |
| GitHub repo settings (not in git) | Repo-level B | API PATCH log + this ADR |
| Git (in this PR) | Workflow C, this ADR | Standard PR diff |

When a future operator wants to reproduce the org/repo settings on a
new fork or new org, they run the bash commands in §A and §B above.

## Outcomes

- **OGS1** — org defaults flipped to security-first for new repos
- **OGS2** — knowledge-engineering repo squashed-only + dependabot
- **OGS3** — validate-skill-frontmatter.yml gates SKILL.md additions
- **OGS4** — this ADR captures the policy + adoption rationale

## Citations

- `vendor/agentskills/agentskills.io/specification.md` — the spec the validator enforces
- [`anthropics/claude-plugins-official/.github/workflows/validate-frontmatter.yml`](https://github.com/anthropics/claude-plugins-official/blob/main/.github/workflows/validate-frontmatter.yml) — direct template
- `scripts/setup-branch-protection.ts` — existing ruleset that this ADR aligns with
- `docs/decisions/2026-05-16-platform-engineering-plugin.md` — the plugin layout this validator gates
- `docs/decisions/2026-05-16-polyrepo-sibling-pattern.md` — why future repos under subagentceo inherit org defaults
