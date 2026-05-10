---
runbook: voyage-api-key
outcome: secrets.VOYAGE_API_KEY provisioned (optional; only needed for Phase 11.C embeddings flag)
unblocks: Phase 11.C (semantic vendor_grep)
operator-manual-steps: email verification; confirm 2FA
status: OPTIONAL — repo functions without this key; only blocks the embeddings-flag path
---

# Runbook: provision `VOYAGE_API_KEY` (optional)

Cited from:
- `vendor/anthropics/code.claude.com/docs/en/chrome.md`
- `vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md` — why Voyage
- `seeds/citations/embeddings.md`

## Decision: skip or proceed?

The `KE_VENDOR_GREP_EMBEDDINGS=1` flag (Phase 11.C) enables a semantic
mode for `vendor_grep`. Without it, the bridge falls back to substring
grep over the local mirror (the Phase 4 implementation). The substring
mode already covers most discoverability use cases.

**Recommendation: skip unless the operator has a concrete embeddings use case.**
Voyage AI is paid (per-token); the operator hasn't committed to that cost.

If proceeding, the runbook below covers sign-up + key creation +
GH secret add.

## Paste-into-`claude --chrome` prompt

```
You are Claude in Chrome (model: Opus 4.7), running in the operator's
authenticated browser session. Your outcome is to provision a
VOYAGE_API_KEY for the operator's Voyage AI account, then store it as
a GitHub repo secret.

Citations:
- vendor/anthropics/code.claude.com/docs/en/chrome.md
- vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md

## Steps

1. Open a new tab to https://www.voyageai.com.
2. Check if the operator already has an account (look for "Dashboard" or
   "Sign in" in the top nav). If signed in, skip to step 5.
3. If not signed in: click "Sign Up" or "Get Started". Pause and ask
   the operator to provide an email + password (do NOT generate these
   yourself). The operator may want to use an alex@jadecli.com or
   admin@jadecli.com address — ask before assuming.
4. Complete the email verification: when the verification email arrives,
   the operator clicks the link in their email client, then returns to
   this Chrome session. Pause until the operator confirms verification.
5. Navigate to the Voyage AI dashboard: typically https://dash.voyageai.com
   or via the "Dashboard" link in the top nav.
6. Find the "API Keys" or "Credentials" section.
7. Click "Create new key" (or equivalent). Set a descriptive name like
   "knowledge-engineering Phase 11 embeddings".
8. Copy the key to clipboard. DO NOT print the key value to chat output.
9. Open a new tab to
   https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions
10. Click "New repository secret".
11. Name = VOYAGE_API_KEY. Paste the value from clipboard.
12. Click "Add secret". Verify it appears in the list.
13. Return summary:
    - "✓ Voyage account: <new | existing>"
    - "✓ API key created (name: knowledge-engineering Phase 11 embeddings)"
    - "✓ GH secret VOYAGE_API_KEY added"

## Safety

- The Voyage sign-up form may ask for billing info up front. Voyage offers
  a free tier (50M tokens lifetime); confirm the operator wants to proceed
  if billing is requested.
- If 2FA is required (email or authenticator), pause and tell the
  operator to confirm.
- NEVER print the API key value to chat output.
```

## Verification

```bash
gh secret list --repo subagentceo/knowledge-engineering | grep VOYAGE_API_KEY
```

After this lands, the Phase 11.C agent-side follow-up (embeddings index
build + `KE_VENDOR_GREP_EMBEDDINGS=1` mode) can ship.
