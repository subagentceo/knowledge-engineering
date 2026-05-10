---
runbook: cf-account-id
outcome: secrets.CLOUDFLARE_ACCOUNT_ID + vars.CLOUDFLARE_WORKER_NAME provisioned
unblocks: Phase 8 cloudflare-preview.yml workflow
operator-manual-steps: confirm 2FA on github.com
---

# Runbook: provision `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_WORKER_NAME`

Cited from:
- `vendor/anthropics/code.claude.com/docs/en/chrome.md`
- `.github/workflows/cloudflare-preview.yml` (the consumer)

## Outcome

Two GitHub repo entries at
<https://github.com/subagentceo/knowledge-engineering/settings>:

- `secrets.CLOUDFLARE_ACCOUNT_ID` — secret, value = the Cloudflare account
  ID from the `dash.cloudflare.com` URL or sidebar.
- `vars.CLOUDFLARE_WORKER_NAME` — variable, value = `ke-cloud-agent`
  (matches `infra/cloudflare/wrangler.jsonc#name`).

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to provision two GitHub
Actions entries: a secret CLOUDFLARE_ACCOUNT_ID and a variable
CLOUDFLARE_WORKER_NAME.

## Steps

1. Open a new tab to https://dash.cloudflare.com. Confirm signed in.
2. The account ID is displayed in the right-hand sidebar under "API"
   (label: "Account ID"), or in the URL after /accounts/<id>/. Copy it.
   Confirm with the operator the value matches what's shown in the UI.
   DO NOT print the value to chat — treat the account ID as secret-ish
   (per Cloudflare's recommendation it's not strictly secret but should
   not be public).
3. Open a new tab to
   https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
4. Click "New repository secret".
5. Name = CLOUDFLARE_ACCOUNT_ID. Value = paste from clipboard.
6. Click "Add secret". Verify it appears in the list.
7. Navigate to
   https://github.com/subagentceo/knowledge-engineering/settings/variables/actions
8. Click "New repository variable".
9. Name = CLOUDFLARE_WORKER_NAME. Value = `ke-cloud-agent`.
10. Click "Add variable". Verify it appears in the list.
11. Return summary:
    - "✓ secret CLOUDFLARE_ACCOUNT_ID added"
    - "✓ variable CLOUDFLARE_WORKER_NAME = ke-cloud-agent"

## Safety

- If GitHub prompts for 2FA, pause and tell the operator to confirm.
- If the operator's Cloudflare dashboard shows multiple accounts and
  it's ambiguous which one to use, pause and ask which account owns
  the `subagentceo` GitHub linkage.
```

## Verification

```bash
gh secret list   --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_ACCOUNT_ID
gh variable list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_WORKER_NAME
```

Expected: both present.

## Why these are non-secret-but-still-stored-here

`CLOUDFLARE_ACCOUNT_ID` is technically not a credential (knowing it
doesn't grant access). Cloudflare's recommendation is to treat it as
sensitive-but-not-secret. Storing as a GH secret keeps the value out of
PR logs and the GH UI listing; storing as a variable would also work.
We use a secret to be safe.

`CLOUDFLARE_WORKER_NAME` is a non-secret routing identifier and matches
`infra/cloudflare/wrangler.jsonc#name`. Storing as a `vars.` entry keeps
it visible in the GH Actions UI for debugging.
