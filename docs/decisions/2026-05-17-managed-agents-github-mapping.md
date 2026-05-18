---
date: 2026-05-17
status: accepted
deciders: alex-jadecli
outcome_id: OMA3
supersedes_note: |
  OMA1 (`2026-05-17-managed-agents-strategy-adoption.md`) pre-allocated `OMA3`
  for a CONTRIBUTING paragraph on multi-session continuity. That paragraph is
  re-allocated under a future outcome id; `OMA3` is hereby re-bound to the
  managed-agents → chassis GitHub-pattern cross-walk captured below. The OMA
  family register in OMA1 should be amended in a follow-up doc-only PR.
---

# ADR — Managed Agents GitHub pattern → chassis GitHub primitives cross-walk (OMA3)

## Context

Anthropic's Managed Agents (MA) "Accessing GitHub" pattern describes how a
managed agent mounts a GitHub repository to its session container, talks to
the GitHub MCP server (`https://api.githubcopilot.com/mcp/`), and opens pull
requests against that repo. See
[`vendor/anthropics/platform.claude.com/docs/en/managed-agents/github.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/github.md)
(mirrored 914 lines as of this ADR).

This chassis already runs GitHub-event-driven automation against itself,
but it does so via **GitHub Actions workflows plus a /routines web-UI
trigger**, not via the Managed Agents control plane. The two architectures
solve overlapping problems with different primitives, and the absence of a
formal cross-walk has made it ambiguous which MA features we should adopt
versus which we deliberately replace with our own primitives.

This ADR is a pure mapping document. It changes no code, no workflows, and
no plugin manifests. It exists so that subsequent OMA3a/b/c follow-ups (and
external forking founders) can reason about MA-vs-chassis equivalences
without re-deriving them.

OMA1 (`2026-05-17-managed-agents-strategy-adoption.md`) covers the broader
MA strategy ratification (outcomes, dreams, multi-session). This ADR is the
GitHub-specific addendum that OMA1 left for a follow-up.

## Current chassis GitHub primitives

| Primitive | Path | Role |
| :--- | :--- | :--- |
| Event → routine setup runbook (OGER1) | `docs/operator-runbooks/github-event-routine-setup.md` | How the operator wires a GitHub event (issue, PR, comment) to a /routines invocation in the web UI. |
| Auto-rebase workflow (OAUTO2) | `.github/workflows/auto-rebase.yml` | Rebases PRs that carry the `automerge` label and have fallen behind `main`. |
| Auto-label workflow (OAUTO9) | `.github/workflows/auto-label.yml` | Applies path-based labels on PR open/sync. |
| Auto-merge workflow | `.github/workflows/auto-merge.yml` | Enables GitHub native auto-merge on labelled PRs once checks pass. |
| Claude code review workflow | `.github/workflows/claude-code-review.yml` | Triggers a Claude review pass on PR open and on `@claude` mentions. |
| Third-party guard workflow | `.github/workflows/third-party-guard.yml` [TODO-OPERATOR: file not present at ADR time; confirm intended path or remove this row] | Intended to gate third-party action SHAs. |
| Verify docs mirrors workflow | `.github/workflows/verify-docs-mirrors.yml` [TODO-OPERATOR: file not present at ADR time; confirm intended path or remove this row] | Intended to verify `vendor/` mirrors stay fresh. |
| OSV scanner | `.github/workflows/osv-scanner.yml` | GoogleOSV-only vulnerability scan, per OSL1. |
| Hooks (security reminder) | `[TODO-OPERATOR: confirm path; expected under .claude/hooks/security_reminder_hook.py]` | Pre-tool hook the chassis would use for content moderation analogues. |

`OGER1` and the four `OAUTO*` workflows are the production surface. The two
`[TODO-OPERATOR]` rows are referenced by the prompt for this ADR but were
not on disk at authoring time; the operator should either land the files or
strike the rows in a follow-up.

## Managed Agents GitHub concepts vs chassis equivalents

| MA concept (see `managed-agents/github.md`) | Chassis equivalent | Notes |
| :--- | :--- | :--- |
| **GitHub MCP server connection** (`https://api.githubcopilot.com/mcp/`, host-side auth token) | `gh` CLI inside Actions runners plus the chassis MCP bridge server (`src/mcp/bridge-server.ts`). | The chassis does not mount the GitHub MCP into a managed-agent session container; Actions runners are the execution environment and they already carry `GITHUB_TOKEN`. |
| **Session-resource cloning** of a repo into the session container | Actions `actions/checkout@v4` step in every workflow. | MA caches repos across sessions for speed; Actions runners are ephemeral. Equivalent caching for us is `actions/cache` keyed on `package-lock.json`. |
| **PR creation from a managed-agent session** | Routine (web UI) plus `gh pr create`, or `claude-code-review.yml` for review-only PRs. | Our PRs are authored by either the operator's local Claude or by `claude-code-review.yml` on push; we do not currently spawn a managed-agent session whose deliverable is "open this PR." |
| **Issue routing** (MA pattern: agent inspects new issue, classifies, assigns) | A routine triggered via the web UI per OGER1 (`docs/operator-runbooks/github-event-routine-setup.md`). | Today the operator hand-triages issues. The routine pattern exists but no issue-router skill ships in `.claude/skills/`. Candidate follow-up — see OMA3b. |
| **PR triage** (MA: agent labels, requests reviewers, comments) | `auto-label.yml` + `claude-code-review.yml`, then `auto-merge.yml` on green. | Functionally covered; the gap is that we do not classify PR *author* (operator vs Claude-authored vs external contributor) before review, which would let us scope review depth. See OMA3b. |
| **Content moderation pre-action** (MA: agent inspects content before posting) | Claude Code hooks (e.g. the security-reminder hook) under `.claude/hooks/`. | The hook layer is the chassis analogue of MA pre-action moderation. Coverage is partial. |
| **Inbound ticket routing** (MA pattern: external ticket lands → agent triages) | **Not implemented.** The chassis is internally operated and does not accept inbound external tickets (no support inbox, no public issue intake beyond org-scoped GitHub issues). | Explicit non-goal until/unless OMA-strategy adds an inbound surface. |

## Adoption opportunities (follow-up outcome IDs)

Each item below is **future work**, not done. They are reserved here so
later PRs can land under a stable id.

- **OMA3a — Extend `auto-rebase.yml` to non-automerge READY PRs after a
  grace period.** *Likely reject.* The `automerge` label is the operator's
  opt-in signal; rebasing PRs that did not opt in would surprise the human
  reviewer (who may be holding the branch deliberately stale to compare a
  diff). If pursued, gate on `ready_for_review` + age > 48h + explicit
  `allow-auto-rebase` label rather than blanket-applying.
- **OMA3b — Add a PR-triage skill that classifies incoming PRs as
  `operator-authored`, `claude-authored`, or `external-contributor`.**
  Cross-walks to the MA "PR triage" concept above. Would feed into review
  depth selection (light review for claude-authored low-risk PRs; deep
  review for external-contributor PRs). Lives under
  `.claude/skills/pr-triage/`.
- **OMA3c — Structured review skill.** Already covered by **ORC3**
  (review-comments family). This entry exists solely to cross-reference
  ORC3 from the MA-mapping family so the reader does not re-open the
  question. *No new work under OMA3c — track under ORC3.*
- **OMA3d — Issue-router skill** keyed on label namespace (`area/*`,
  `phase/*`), invoked via the OGER1 routine pattern. Replaces hand-triage
  with a deterministic first pass.
- **OMA3e — Document the explicit non-adoption of MA session-mounted
  GitHub MCP** in `docs/architecture.md`, so a reader does not assume the
  chassis will grow a managed-agent runtime that opens its own PRs. The
  chassis architecture is "Actions runners + operator-driven routines";
  MA's session-container model is an alternative we are not pursuing for
  this repo.

## Consequences

- The `OMA3` outcome id is now bound to this GitHub-mapping ADR, not to
  the CONTRIBUTING multi-session paragraph originally reserved in OMA1.
  A follow-up doc PR should amend OMA1's "pre-allocated" list.
- Future GitHub-automation work in this repo should reference one of the
  `OMA3a..OMA3e` ids (or open a new one under the `OMA3*` namespace),
  so that the cross-walk above stays the authoritative map.
- The two `[TODO-OPERATOR]` rows in the primitives table flag drift
  between the prompt-spec for this ADR and the current `.github/workflows/`
  tree; resolving them is a small docs-or-yaml follow-up.

## Citations

- [`vendor/anthropics/platform.claude.com/docs/en/managed-agents/github.md`](../../vendor/anthropics/platform.claude.com/docs/en/managed-agents/github.md)
  — MA "Accessing GitHub" pattern (the source for every MA concept in the
  cross-walk).
- [`docs/operator-runbooks/github-event-routine-setup.md`](../operator-runbooks/github-event-routine-setup.md)
  — OGER1, the routine-trigger runbook that backs the issue-routing and
  PR-triage rows.
- [`seeds/citations/define-outcomes.md`](../../seeds/citations/define-outcomes.md)
  — outcome-ID discipline used by every adoption opportunity above.
- [`docs/decisions/2026-05-17-managed-agents-strategy-adoption.md`](./2026-05-17-managed-agents-strategy-adoption.md)
  — OMA1, the parent strategy ADR that reserves the `OMA*` family.
