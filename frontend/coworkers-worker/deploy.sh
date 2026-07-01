#!/usr/bin/env bash
# DEPRECATED: manual-fallback-only. wrangler.jsonc is the canonical deploy
# mechanism (bindings, migrations, compatibility_date declared there) — this
# raw curl path drifted (stale compatibility_date, missing durable_objects /
# migrations) because it duplicated that config instead of reading it.
# Usage: CLOUDFLARE_API_TOKEN=<token> bash deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
exec npx wrangler deploy
