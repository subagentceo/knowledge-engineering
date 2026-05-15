---
runbook: ci-cd-unblock
outcome: CI/CD deploy path live end-to-end. cloudflare-preview.yml runs green on PRs touching infra/cloudflare/**.
unblocks: #114 (CLOUDFLARE_API_TOKEN mint), #119 (CF account-id + worker-name audit close), #115 (rotate CLAUDE_CODE_OAUTH_TOKEN), #116 (rotate NEON_API_KEY GH-side), #118 (E2E smoke against Worker)
operator-manual-steps: confirm 2FA on dash.cloudflare.com; confirm 2FA on github.com; paste long-lived OAuth token into Terminal.app for npm run rotate:claude-oauth
---

# Runbook: unblock CI/CD in one paste-into-`claude --chrome` session

This is **the** runbook for getting the CI/CD deploy path live. One Opus 4.7 paste-block, ~15 steps, ends with `cloudflare-preview.yml` running green on a no-op PR.

Closes a path through sub-issues **#114, #119, #115, #116** of #110. After this lands, sub-issue **#118** (E2E smoke against the deployed Worker) becomes actionable.

## Identity

| Role | Identity |
| - | - |
| Subscription owner | alex@jadecli.com / alex-jadecli (the paying CF + GH account) |
| GH admin | admin@jadecli.com / admin-jadecli (the `gh` CLI is already authenticated as this alias on the operator's machine) |
| CF Secrets Store target | account `e6294e3ea89f8207af387d459824aaae`, store id `565244614fc34be7aa8488ce46112f60` |

## Outcome (binary pass/fail)

After running the paste-block successfully:

- `gh secret list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_API_TOKEN` returns a row. **The CI/CD gate is open.**
- `gh secret list ... | grep CLAUDE_CODE_OAUTH_TOKEN` shows Updated ≥ today (not 2026-05-10).
- `gh secret list ... | grep NEON_API_KEY` shows Updated ≥ today (not 2026-05-10).
- `gh run list --workflow cloudflare-preview.yml --limit 1` shows the most recent run as `success` (or `in_progress` if the operator triggered it during the paste-block).
- The Worker at `https://ke-cloud-agent.alex-e62.workers.dev/run` responds 405 to GET (current behavior) and would route POST through the full E2E flow (validation via #118).

## Citations

- `vendor/anthropics/code.claude.com/docs/en/chrome.md` (claude --chrome surface)
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` (alternative Web surface)
- `vendor/anthropics/code.claude.com/docs/en/remote-control.md` (mobile orchestration; you can drive this paste-block from claude.ai/code on your phone)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (the contract this runbook actuates)
- `docs/operator-runbooks/cf-api-token.md`, `cf-account-id.md`, `turbopuffer-api-key.md` (sister runbooks for individual steps)
- `docs/outcomes/desktop-driven-unblock-2026-05-15.md` (the supersession story)
- `.github/workflows/cloudflare-preview.yml:36-49` (the gate this runbook unblocks)

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7, effort: xhigh), running in the
operator's authenticated browser session. Your outcome is to bring the
CI/CD deploy path for subagentceo/knowledge-engineering fully live by
ensuring all 4 required GitHub secrets are real and fresh, then triggering
a cloudflare-preview.yml workflow run and confirming it completes green.

Citations the operator expects you to honor:
- vendor/anthropics/code.claude.com/docs/en/chrome.md (this Chrome surface)
- vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
  (alternative; same outcome from claude.ai/code)
- docs/operator-runbooks/cloud-env-vars-contract.md (the canonical matrix)
- docs/operator-runbooks/cf-api-token.md (the underlying CF mint flow)

## Phase A: Verify current state (no destructive actions)

1. Open https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
2. Read the secret list. Report which of these are present:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID
   - CLAUDE_CODE_OAUTH_TOKEN
   - NEON_API_KEY
3. Note the Updated timestamp for each. If any is older than 2026-05-15,
   flag for rotation in Phase C.

## Phase B: Mint CLOUDFLARE_API_TOKEN (the gate)

4. Open https://dash.cloudflare.com/profile/api-tokens
5. Confirm you are signed in as alex@jadecli.com. If not, pause and ask
   the operator to sign in.
6. Click "Create Token" → "Create Custom Token" → "Get started".
7. Name: "ke-cloud-agent-ci-2026-05-15"
8. Permissions (add via "+ Add more"):
   - Account / Workers Scripts / Edit
   - Account / Secrets Store / Write
9. Account Resources → Include → alex@jadecli.com's Account
10. TTL: Start today, End today + 365 days.
11. Click "Continue to summary" → review → click "Create Token".
12. **PAUSE for operator** to confirm 2FA if prompted.
13. The token value displays ONCE. Click "Copy" on the dashboard's Copy
    button. DO NOT paste the value into chat or any file outside the
    GitHub secret form.

14. Open https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
15. Click "New repository secret" (top right).
16. Name = CLOUDFLARE_API_TOKEN. Paste value into Value field.
17. Click "Add secret". Confirm the row appears in the list.
18. **PAUSE for operator** to confirm GH 2FA if prompted.

## Phase C: Rotate stale secrets (if Phase A flagged any)

If CLAUDE_CODE_OAUTH_TOKEN is stale (Updated < 2026-05-15):

19. Tell the operator to run this in their Terminal.app:
    ```
    cd /Users/alexzh/knowledge-engineering
    npm run rotate:claude-oauth
    ```
    This opens a browser for OAuth, captures the token to a mode-0600
    file via the leak-safe pipeline in scripts/mint-claude-oauth-secret.ts,
    then pipes to the CF Secrets Store entry id e22122884fda46ae901659c9ab808c90.
20. After the script completes, the operator must ALSO update the GH
    secret. They can run:
    ```
    gh secret set CLAUDE_CODE_OAUTH_TOKEN --repo subagentceo/knowledge-engineering \
      < /Users/alexzh/.config/ke-claude-oauth-rotated.tmp
    rm -P /Users/alexzh/.config/ke-claude-oauth-rotated.tmp
    ```
21. Verify by re-running Phase A step 3.

If NEON_API_KEY is stale:

22. Tell the operator to run:
    ```
    cd /Users/alexzh/knowledge-engineering
    npm run rotate:neon  # (lands in #116)
    ```
    Mirrors the rotate:claude-oauth pattern but mints via Neon REST.

## Phase D: Trigger and verify cloudflare-preview.yml

23. Open https://github.com/subagentceo/knowledge-engineering/actions/workflows/cloudflare-preview.yml
24. Click "Run workflow" → use the default branch (main).
25. Wait ~3 minutes. Tail the run.
26. The run has 2 jobs:
    - bootstrap-secrets (uses CLOUDFLARE_API_TOKEN to write all secrets
      from GH to CF Secrets Store)
    - preview (wrangler deploy)
27. Both should complete green. If either fails, surface the failure
    URL + the failing step + the last 20 log lines.

## Phase E: Report and close

28. Return a structured summary:
    - ✓ CLOUDFLARE_API_TOKEN: created in CF, set in GH
    - ✓ CLOUDFLARE_ACCOUNT_ID: <Updated timestamp>
    - ✓ CLAUDE_CODE_OAUTH_TOKEN: <Updated timestamp> (rotated if needed)
    - ✓ NEON_API_KEY: <Updated timestamp> (rotated if needed)
    - ✓ cloudflare-preview.yml run <URL> completed green
    - Close sub-issues #114 (token mint), #119 (account-id audit), #115
      (oauth rotation), #116 (neon rotation) via gh issue close with a
      comment naming this run URL.

## Safety

- If Cloudflare or GitHub prompts for 2FA, pause and tell the operator
  to confirm in their authenticator. Resume after.
- NEVER paste the CF API token value into chat output or any file
  outside the GH secret form.
- NEVER set ANTHROPIC_API_KEY anywhere. The OAuth-only invariant is
  defended at three layers (see cloud-env-vars-contract.md § Forbidden
  values).
- If the CF dashboard shows multiple accounts and it's ambiguous which
  to use, pause and ask. The canonical choice is alex@jadecli.com's
  Account (e6294e3ea89f8207af387d459824aaae).
```

## Verification (post-paste-block)

```bash
# All 4 GH secrets fresh
gh secret list --repo subagentceo/knowledge-engineering | grep -E "CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|CLAUDE_CODE_OAUTH_TOKEN|NEON_API_KEY"
# Expected: 4 rows, all with Updated ≥ today

# Latest CI run is green
gh run list --repo subagentceo/knowledge-engineering --workflow cloudflare-preview.yml --limit 1
# Expected: status=completed conclusion=success

# Worker still responds
curl -sS -o /dev/null -w "%{http_code}\n" https://ke-cloud-agent.alex-e62.workers.dev/run
# Expected: 405 (current GET-not-supported behavior)
```

## Rotation

- This runbook is re-fired by the heartbeat orchestrator when any of the 4 GH secrets approaches its rotation cadence (1 year for `CLOUDFLARE_API_TOKEN`; annually or post-leak for the others).
- The `ci-fix-routine` (per #122 sub-issue / future PR) will detect a failing `cloudflare-preview.yml` run and surface this runbook as the remediation path.
