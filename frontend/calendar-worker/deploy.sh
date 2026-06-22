#!/usr/bin/env bash
# Deploy calendar-frontend Worker to calendar.subagentknowledge.com
# Usage: CLOUDFLARE_API_TOKEN=<token> bash deploy.sh   (or: bash deploy.sh <token>)
# The operator runs this — it needs your Cloudflare API token (never committed).
# Preferred: `npm run deploy` (wrangler, uses wrangler.jsonc incl. the Durable Object migration).

set -euo pipefail
TOKEN="${CLOUDFLARE_API_TOKEN:-${1:-}}"
ACCOUNT_ID="e6294e3ea89f8207af387d459824aaae"
SCRIPT_NAME="calendar-frontend"

if [[ -z "$TOKEN" ]]; then echo "ERROR: set CLOUDFLARE_API_TOKEN or pass token as arg 1"; exit 1; fi

cd "$(dirname "$0")"
echo "Recommended: CLOUDFLARE_API_TOKEN=$TOKEN npm run deploy   (wrangler applies the CalendarMcp Durable Object migration)"

npx esbuild src/worker.ts --bundle --format=esm --platform=browser --target=es2022 --outfile=dist/worker.js
METADATA=$(cat <<'JSON'
{
  "main_module": "worker.js",
  "compatibility_date": "2025-06-01",
  "compatibility_flags": ["nodejs_compat"],
  "routes": [{ "pattern": "calendar.subagentknowledge.com", "custom_domain": true }],
  "vars": { "SITE_NAME": "calendar", "COWORKERS_HOST": "coworkers.subagentknowledge.com" }
}
JSON
)
curl -s -X PUT "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${SCRIPT_NAME}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -F "metadata=@-;type=application/json" \
  -F "worker.js=@dist/worker.js;type=application/javascript+module" <<< "$METADATA" \
  | python3 -m json.tool | grep -E '"success"|"errors"|name' || true
echo "Done. Verify: https://calendar.subagentknowledge.com"
