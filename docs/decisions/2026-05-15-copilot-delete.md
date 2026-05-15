---
decision: delete .github/workflows/copilot.yml
date: 2026-05-15
status: confirmed
operator-rule: "Only use [Copilot] if can cite GitHub anthropics/repositories usage of GitHub copilot deterministically else steer to next phase"
outcomes: O-G5
prs: #136 (auto-trigger removal), #142 (file delete)
---

# Decision: delete the Copilot Autofix workflow

## Context

The repo carried `.github/workflows/copilot.yml` — a custom Copilot Autofix workflow gated on `vars.COPILOT_ENABLED`. PR #136 disabled the auto-triggers per operator directive ("turn off the github copilot pull request feedback. it's low quality and causing errors"). PR #142 followed by deleting the file entirely.

Mid-PR, the operator added a deterministic-cite condition: "Only use it if can cite GitHub anthropics/repositories usage of GitHub copilot deterministically else steer to next phase."

This decision file records the diligence check that answers that condition.

## Check

Two GitHub queries against the anthropics organization:

1. **Custom workflow file probe** — search for `path:.github/workflows/copilot.yml org:anthropics`.
   - Result: **no hits.** No anthropics/* repo has a custom Copilot workflow file under that name.

2. **Built-in feature probe** — search for Copilot Code Review workflow runs in the anthropics org.
   - Result: **multiple hits.** `anthropics/claude-code`, `anthropics/claude-cookbooks`, and `anthropics/claude-quickstarts` all show "Copilot code review" workflow runs at paths like
     `actions/workflows/copilot-pull-request-reviewer/copilot-pull-request-reviewer`.
   - These are **GitHub's built-in Copilot Code Review** feature — enabled via repo settings → Code review → "Use Copilot for code review." They do NOT correspond to a file in the repo. Different feature surface.

## Conclusion

The deleted file `.github/workflows/copilot.yml` was **custom Copilot Autofix** (a workflow-file-based feature), which has **zero anthropics/* precedent**. The operator's deterministic-cite condition is **not satisfied** for the deleted feature. Per the rule, "steer to next phase" — the delete in PR #142 stands.

Separately, **Copilot Code Review (built-in)** is used by anthropics/* and IS citation-deterministic. Enabling it for `subagentceo/knowledge-engineering` is a one-checkbox change in repo settings — no file lives in the repo. This is surfaced as a follow-up operator-action item rather than blocking PR #142.

## Follow-up

- **Operator-action (optional)**: enable "Use Copilot for code review" in `subagentceo/knowledge-engineering` repo settings if a second AI review pass alongside the existing `claude-review` workflow is desired. Anthropic's own repos use both — distinct features, complementary signal.
- **No code change required** for the follow-up (the feature is settings-only). If enabled, the `claude-review.yml` workflow remains the authoritative pre-merge gate; Copilot Code Review's comments would be advisory.

## Citations

- `docs/plans/founder-refactor-2026-05-15.md` (Phase G item O-G5)
- `.github/workflows/copilot.yml` (deleted in this PR)
- Operator directive 2026-05-15 (in-session): "Remove the copilot usage. It results in low quality code. Only use it if can cite GitHub anthropic/repositories usage of GitHub copilot deterministically else steer to next phase"
- https://github.com/anthropics/claude-code/actions/workflows/copilot-pull-request-reviewer/copilot-pull-request-reviewer (built-in feature evidence, not a workflow file)
