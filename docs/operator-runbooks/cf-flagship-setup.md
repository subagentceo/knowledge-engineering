---
title: cf-flagship-setup
description: One-time operator runbook to create a Cloudflare Flagship app and pin its app_id into the chassis. Paste-into-Claude-in-Chrome procedure per docs/pending.md Column 1.
issue: TBD (Phase 13.B+ O5)
estimated_time: ~5 min
---

# Operator runbook: Cloudflare Flagship app setup

## Why

Phase 13.B+ (O5) wires `@openfeature/server-sdk` into the agent runtime
with **Cloudflare Flagship** as the production provider. The agent's
local-dev path (InMemoryProvider seeded from
`seeds/openfeature/local-flags.json`) works without Flagship — but a
production Worker deploy needs a real Flagship `app_id` bound via
`wrangler.jsonc`'s `flagship[]` block.

Citations:

- `vendor/cloudflare/developers.cloudflare.com/flagship/get-started/index.md` — first flag walkthrough
- `vendor/cloudflare/developers.cloudflare.com/flagship/configuration/index.md` — Wrangler binding shape
- `vendor/cloudflare/developers.cloudflare.com/flagship/concepts/index.md` — apps, flags, variations vocabulary

## Pre-reqs

- Cloudflare account: `e6294e3ea89f8207af387d459824aaae` (the `outcomesdk.com` account).
- `wrangler` CLI logged in as the same account.
- ~5 minutes.

## Paste-into-Claude-in-Chrome prompt

> Copy the block below and paste into a Claude-in-Chrome session at
> `claude --chrome --model opus-4-7`. The session will drive the
> Cloudflare dashboard end-to-end and surface the resulting `app_id`.

```
You are an operator runbook executor with browser access.

GOAL
Create a Cloudflare Flagship app named `outcomesdk-chassis`, define a
single string flag named `color-code` with the 8 allowed values
[red, blue, green, yellow, purple, orange, pink, cyan] and default
`cyan`, then surface the resulting Flagship `app_id` so I can paste it
into infra/cloudflare/wrangler.jsonc replacing the
`FLAGSHIP_APP_ID_PLACEHOLDER` string.

STEPS
1. Navigate to https://dash.cloudflare.com/e6294e3ea89f8207af387d459824aaae/workers/flagship
2. Click "Create app". Name: outcomesdk-chassis. Confirm.
3. In the new app, click "Create flag". Name: color-code. Type: String.
4. Add 8 variations: red, blue, green, yellow, purple, orange, pink, cyan.
   Each variation's value equals its name (red→"red", etc.).
5. Set the default variation to `cyan`.
6. Save the flag.
7. From the app's Settings tab, copy the App ID (a UUID-shaped string).
8. Print the App ID to me along with the URL of the dashboard page so
   I can verify.

DO NOT
- Create additional flags beyond color-code (the chassis only declares one).
- Modify any existing app or flag in this account.
- Create a Flagship API token (Worker bindings don't need one).
```

## After the runbook returns the app_id

1. Edit `infra/cloudflare/wrangler.jsonc`:

   ```diff
   "flagship": [
     {
       "binding": "FLAGSHIP",
   -   "app_id": "FLAGSHIP_APP_ID_PLACEHOLDER"
   +   "app_id": "<paste-the-uuid-here>"
     }
   ]
   ```

2. Commit + push as `chore(infra): pin Cloudflare Flagship app_id`.

3. The next `wrangler deploy` from `infra/cloudflare/` activates the
   binding. The Worker's `env.FLAGSHIP.getStringValue("color-code", ...)`
   call now hits the real Flagship service. The agent inside the
   Sandbox receives the resolved value via the
   `OPENFEATURE_color_code` env override.

## Local dev — no Flagship required

Local `npm run dev` uses the InMemoryProvider seeded from
`seeds/openfeature/local-flags.json`. The default `color-code` is
`cyan`. To override locally:

```sh
OPENFEATURE_color_code=red npm run dev "test"
```

That's an env-var override path that mimics what Cloudflare Flagship
does in production — the same code path on both sides.
