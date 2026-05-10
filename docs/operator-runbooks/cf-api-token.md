---
runbook: cf-api-token
outcome: secrets.CLOUDFLARE_API_TOKEN provisioned in the GitHub repo with the minimum permissions for Cloudflare Secrets Store bootstrap.
unblocks: Phase 8 (Cloudflare Sandbox deploy)
operator-manual-steps: confirm 2FA on dash.cloudflare.com; confirm 2FA on github.com
---

# Runbook: provision `CLOUDFLARE_API_TOKEN`

Cited from:
- `vendor/anthropics/code.claude.com/docs/en/chrome.md` — Claude in Chrome surface
- `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` — why this token is needed
- [Cloudflare API tokens UI](https://dash.cloudflare.com/profile/api-tokens)

## Outcome

A GitHub Actions repository secret named `CLOUDFLARE_API_TOKEN` exists at:
<https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions>

Its value is a Cloudflare API token with these scopes:
- **Account → Workers Scripts → Edit** (for `wrangler deploy`)
- **Account → Secrets Store → Write** (for the
  `bootstrap-secrets` job in `.github/workflows/cloudflare-preview.yml`)

After this token exists, the Phase 8 cloud-agent runner can deploy
autonomously per `infra/cloudflare/`.

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to provision a fresh
Cloudflare API token for the subagentceo/knowledge-engineering repo's
GitHub Actions, with the minimum permissions needed for the Cloudflare
Secrets Store autonomous bootstrap.

Citations the operator expects you to honor:
- vendor/anthropics/code.claude.com/docs/en/chrome.md (this Chrome surface)
- vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
  (why this token is scoped the way it is)

## Steps

1. Open a new tab to https://dash.cloudflare.com/profile/api-tokens
2. Confirm I am signed in. If not, pause and ask the operator to sign in,
   then resume.
3. Click "Create Token". Then click "Create Custom Token" → "Get started".
4. Set the token name to: "ke-cloud-agent (Secrets Store + Workers Edit)".
5. Under "Permissions", add these rows (use the "+ Add more" button):
   - Account / Workers Scripts / Edit
   - Account / Secrets Store / Write
6. Under "Account Resources", pick "Include" and select the operator's
   account (whichever has the `subagentceo` GitHub linked). If the operator
   has multiple accounts, pause and ask which one to use.
7. Under "TTL", set Start = today and End = today + 365 days.
8. Click "Continue to summary" → review → click "Create Token".
9. The token only appears once. Copy it to clipboard via the page's
   "Copy" button. DO NOT print the token value into chat output. After
   copying, confirm with the operator that the clipboard contains a
   string starting with the expected token prefix.
10. Open a new tab to
    https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
11. Click "New repository secret" (top right).
12. Set Name = CLOUDFLARE_API_TOKEN. Paste the value from clipboard into
    the Value field.
13. Click "Add secret".
14. Verify the secret CLOUDFLARE_API_TOKEN now appears in the list under
    "Repository secrets". Confirm to the operator.
15. Return a summary in chat:
    - "✓ CF token created (id: <visible id from CF UI>)"
    - "✓ GH secret CLOUDFLARE_API_TOKEN added"
    - DO NOT include the token value.

## Safety

- If Cloudflare or GitHub prompts for 2FA, pause and tell the operator
  to confirm in their authenticator. Resume after the operator confirms.
- If any step fails (e.g., button missing, page redirected), STOP and
  report the failure URL + the last successful step. Do not retry blindly.
- NEVER paste the token value into chat output or write it to a file.
- Use the "Copy" button on the CF UI, not screen-scraping.
```

## Verification (after the prompt completes)

Re-run locally:
```bash
gh secret list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_API_TOKEN
```

Or via the GH UI:
<https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions>

The token's presence is the only check — the value itself is opaque to
the operator after creation.

## Rotation

The token has a 1-year TTL. The heartbeat orchestrator can re-fire this
runbook ~30 days before expiry by opening an issue labeled
`runbook:cf-api-token` and assigning the operator.
