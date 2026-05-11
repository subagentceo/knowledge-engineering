---
title: outcomesdk-domain
description: Verify Cloudflare API token has Zone:Edit on outcomesdk.com so wrangler's custom_domain route binding succeeds on first deploy.
issue: TBD (Phase 13.B+ O7)
estimated_time: ~3 min
---

# Operator runbook: outcomesdk.com domain binding

## Why

Phase 13.B+ (O7) ships `frontend/wrangler.jsonc` with a `routes[]` entry
that uses `"custom_domain": true` to bind `outcomesdk.com` (and its
www. variant) to the `outcomesdk-frontend` Worker on first deploy.
Wrangler handles DNS + TLS cert provisioning automatically — but only
if the deploying API token has `Zone:Edit` permission on the zone.

The existing `CLOUDFLARE_API_TOKEN` GH secret was provisioned for the
`infra/cloudflare/ke-cloud-agent` Worker (Workers Scripts Edit + Secrets
Store Write). That token may NOT have Zone:Edit on outcomesdk.com.

This runbook verifies the existing token's permissions and, if needed,
adds Zone:Edit. ~3 minutes.

## Citations

- `vendor/cloudflare/developers.cloudflare.com/workers/configuration/routing/custom-domains/index.md` — custom_domain route semantics
- `docs/operator-runbooks/cf-api-token.md` — original token-creation runbook

## Pre-reqs

- Cloudflare account: `e6294e3ea89f8207af387d459824aaae`
- Zone `outcomesdk.com` shows in the dashboard (operator confirmed 2026-05-11).

## Paste-into-Claude-in-Chrome prompt

```
You are an operator runbook executor with browser access.

GOAL
Verify (or grant) `Zone:Edit` on outcomesdk.com for the existing
CLOUDFLARE_API_TOKEN used by the GH Actions workflows.

STEPS
1. Navigate to https://dash.cloudflare.com/profile/api-tokens
2. Find the token currently used by GH Actions
   (matches the description in docs/operator-runbooks/cf-api-token.md).
3. Click Edit → check Permissions:
   - If Zone:Edit on outcomesdk.com is already present → exit, report "ok".
   - If not, click "+ Add more" → Zone:Edit → "Specific zone" → outcomesdk.com → Continue.
4. Save the token. Cloudflare may show the token value once for re-copying — IF the
   value changed, report it back so I can update the GH secret. If the value did NOT
   change (Cloudflare appended permissions to the existing token), just confirm "ok".

DO NOT
- Create a new API token (we want to extend the existing one to keep the GH secret stable).
- Modify any other token's permissions.
- Touch zones other than outcomesdk.com.
```

## After the runbook returns

If the token value changed:

1. Update `secrets.CLOUDFLARE_API_TOKEN` in the GH repo settings:
   `https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions`

2. Trigger a redeploy:
   ```
   cd frontend && npm run deploy
   ```

If the token value did not change:

- The next `cd frontend && npm run deploy` (which the auto-merge
  pipeline can trigger after PR E merges) will bind the route
  automatically.

## Verification

- After successful deploy: `curl -I https://outcomesdk.com` returns
  `200` with `cf-ray` header.
- Cloudflare dashboard for outcomesdk.com → Workers Routes shows
  `outcomesdk.com → outcomesdk-frontend`.
