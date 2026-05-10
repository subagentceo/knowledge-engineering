---
runbook: code-scanning-toggle
outcome: GitHub Code scanning enabled; .github/workflows/osv-scanner.yml flipped from upload-sarif:false to true
unblocks: SARIF results appearing in the Security tab
operator-manual-steps: confirm 2FA on github.com
---

# Runbook: enable Code scanning + flip `upload-sarif`

Cited from:
- `vendor/anthropics/code.claude.com/docs/en/chrome.md`
- `.github/workflows/osv-scanner.yml` (the consumer)
- PR #4 round-5 commit message (why this is gated)

## Outcome

1. GitHub Code scanning is enabled on `subagentceo/knowledge-engineering`.
2. `.github/workflows/osv-scanner.yml` has `upload-sarif: true` on both
   reusable workflow calls (PR scan + push/schedule scan).
3. OSV-Scanner findings appear in the repo's Security tab.

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to enable GitHub Code
scanning on the subagentceo/knowledge-engineering repository.

Citations:
- vendor/anthropics/code.claude.com/docs/en/chrome.md
- .github/workflows/osv-scanner.yml in this repo (which has
  `upload-sarif: false` today, gated on this runbook)

## Steps

1. Open a new tab to
   https://github.com/subagentceo/knowledge-engineering/settings/security_analysis
2. Confirm I am signed in as an admin of the repo. If not, pause.
3. Scroll to "Code scanning". Click "Set up" → "Default".
4. In the dialog that appears, the operator can accept the defaults:
   - Query suite: default
   - Languages: auto-detect (will pick TypeScript)
   - Schedule: weekly (or whatever the default is)
   - Click "Enable CodeQL".
5. Wait for the initial scan to start (a banner appears at the top).
6. Confirm "Code scanning" now shows "Enabled" in the Security & analysis
   list.
7. Return summary:
   - "✓ Code scanning enabled (CodeQL default suite)"
   - "Next step: operator or follow-up PR flips upload-sarif: true in
      .github/workflows/osv-scanner.yml (this is a one-line code change,
      not a UI action — see file edit below)."

## Safety

- If GitHub prompts for 2FA, pause and ask the operator to confirm.
- If the page shows the operator is on a private repo plan that doesn't
  include code scanning, report that to the operator and stop. (The
  subagentceo/knowledge-engineering repo appears public, so this should
  not occur — but check.)
- Do not attempt to edit YAML files via the GitHub UI; the follow-up
  PR is the right surface.
```

## Follow-up commit (after the runbook completes)

A one-line PR to `.github/workflows/osv-scanner.yml`:

```diff
-      upload-sarif: false
+      upload-sarif: true
```

(both `scan-pr` and `scan-main` jobs). The heartbeat orchestrator can
ship this PR autonomously by opening an issue labeled
`runbook:code-scanning-toggle:done` once the operator confirms.

## Verification

After the runbook + the follow-up PR:

- Visit <https://github.com/subagentceo/knowledge-engineering/security>
  — should show Code scanning alerts panel.
- Next PR's `osv-scanner` workflow should not fail at the SARIF upload step.
