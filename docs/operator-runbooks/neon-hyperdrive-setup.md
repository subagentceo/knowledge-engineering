---
title: neon-hyperdrive-setup
description: One-time operator runbook to create a Cloudflare Hyperdrive config pointing at the Neon main branch's pooler URL, so the outcomesdk-frontend Worker can read vendor_pages with sub-ms latency from the edge.
issue: TBD (Phase 13.B+ O8)
estimated_time: ~5 min
---

# Operator runbook: Neon ↔ Cloudflare Hyperdrive setup

## Why

Phase 13.B+ (O8) lands the `vendor_pages` Neon schema and the crawler
dual-write. The frontend (`outcomesdk-frontend`) currently reads vendor
markdown from Workers Static Assets — an acceptable fallback. To
unlock sub-ms edge reads of `vendor_pages`, the Worker needs a
**Cloudflare Hyperdrive** binding pointing at the Neon `main` branch's
pooler URL.

Hyperdrive provides:

- Connection pooling (no cold-start TLS handshake per request).
- Edge caching (configurable TTL).
- Native Worker binding (`env.OUTCOMES_DB.connectionString`).

Cited from:

- `vendor/cloudflare/developers.cloudflare.com/hyperdrive/get-started/index.md`
- `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`

## Pre-reqs

- Cloudflare account: `e6294e3ea89f8207af387d459824aaae`
- Neon project: `divine-cloud-27295848` (main branch)
- ~5 minutes.

## Paste-into-Claude-in-Chrome prompt

```
You are an operator runbook executor with browser access.

GOAL
Create a Cloudflare Hyperdrive config named `outcomes-db` pointing at the
Neon project `divine-cloud-27295848`'s main branch pooler URL, then surface
the resulting Hyperdrive ID so I can paste it into frontend/wrangler.jsonc.

STEPS
1. Open https://console.neon.tech/app/projects/divine-cloud-27295848
2. From the Connect dialog, copy the POOLED connection string for the
   main branch (the URL with `-pooler` in the host). It looks like:
   `postgresql://USER:PASS@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. Open https://dash.cloudflare.com/e6294e3ea89f8207af387d459824aaae/workers/hyperdrive
4. Click "Create Hyperdrive config". Name: outcomes-db.
5. Paste the pooled connection string into the Connection details field.
6. Save. Cloudflare provisions the Hyperdrive config and returns a Hyperdrive ID.
7. Print:
   - The Hyperdrive ID (a UUID).
   - Confirmation that the test connection succeeded.

DO NOT
- Use the unpooled connection string (Hyperdrive needs the pooler URL).
- Modify any other Hyperdrive config in this account.
- Surface the connection string back to me — only the Hyperdrive ID is needed.
```

## After the runbook returns the Hyperdrive ID

1. Edit `frontend/wrangler.jsonc` and add:

   ```jsonc
   "hyperdrive": [
     { "binding": "OUTCOMES_DB", "id": "<paste-the-uuid-here>" }
   ]
   ```

2. Update `frontend/src/worker.ts` to read `vendor_pages` via
   `env.OUTCOMES_DB` (a follow-up PR; the current Worker uses Static
   Assets as the source of truth and that path stays as a graceful
   fallback).

3. Commit + push as `chore(infra): pin Hyperdrive id for outcomes-db`.

## Verification

- After follow-up PR merges + deploy: `curl https://outcomesdk.com/api/vendor/anthropics/<some>.md` returns content sourced from Neon (cached at the edge by Hyperdrive).
- `wrangler hyperdrive get outcomes-db` returns the config metadata.
