#!/usr/bin/env bash
# Deploy cowork-frontend Worker to cowork.subagentknowledge.com
# Usage: CLOUDFLARE_API_TOKEN=<token> bash deploy.sh
# Or: bash deploy.sh <token>

set -euo pipefail
TOKEN="${CLOUDFLARE_API_TOKEN:-${1:-}}"
ACCOUNT_ID="e6294e3ea89f8207af387d459824aaae"
SCRIPT_NAME="cowork-frontend"

if [[ -z "$TOKEN" ]]; then
  echo "ERROR: Set CLOUDFLARE_API_TOKEN or pass token as first arg"
  exit 1
fi

echo "Building cowork-frontend..."
cd "$(dirname "$0")"
npx esbuild src/worker.ts \
  --bundle --format=esm --platform=browser --target=es2022 \
  --outfile=dist/worker.js

echo "Uploading to CF Workers API..."
METADATA=$(cat <<'JSON'
{
  "main_module": "worker.js",
  "compatibility_date": "2026-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "routes": [
    { "pattern": "cowork.subagentknowledge.com", "custom_domain": true }
  ],
  "vars": {
    "SITE_NAME": "cowork",
    "COWORKERS_HOST": "coworkers.subagentknowledge.com"
  }
}
JSON
)

curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${SCRIPT_NAME}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -F "metadata=@-;type=application/json" \
  -F "worker.js=@dist/worker.js;type=application/javascript+module" \
  <<< "$METADATA" | python3 -m json.tool | grep -E '"success"|"errors"|name'

echo ""
echo "Done. Verify: https://cowork.subagentknowledge.com"
