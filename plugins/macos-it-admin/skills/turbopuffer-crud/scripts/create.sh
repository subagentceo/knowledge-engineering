#!/usr/bin/env bash
# Turbopuffer key CREATE — operator-paste flow (browser-only; no admin API).
# See SKILL.md for full context. This script is intentionally shell, not TS,
# because the only "logic" is shell prompting + piping.
#
# Refs: OIT1 (this plugin), OSEC2 (rotation runbook), OSEC1 (parity).

set -euo pipefail

cat <<'EOF'
=== TURBOPUFFER KEY CREATE ===
1. Open https://turbopuffer.com/dashboard/api-keys
2. Click "Create API Key"
3. Name: knowledge-engineering-write-YYYY-MM-DD
4. Permissions: Write
5. Create — the value displays once. Click the COPY button (do NOT screenshot).
6. Paste below at the silent prompt; press Enter.
EOF

read -rs VAL
echo "(got $(printf '%s' "$VAL" | wc -c | tr -d ' ') chars)"
[ "${#VAL}" -lt 20 ] && { echo "[OIT1-tp] value too short — aborting" >&2; exit 1; }

printf '%s' "$VAL" | gh secret set --org subagentceo \
  --visibility selected --repos knowledge-engineering TURBOPUFFER_API_KEY_WRITE
echo "[OIT1-tp] gh org set OK" >&2

printf '%s' "$VAL" | gh secret set TURBOPUFFER_API_KEY_WRITE
echo "[OIT1-tp] gh repo set OK" >&2

if [ -n "${CLOUDFLARE_SECRETS_STORE_ID:-}" ]; then
  wrangler secrets-store secret create "$CLOUDFLARE_SECRETS_STORE_ID" \
    --name TURBOPUFFER_API_KEY_WRITE --value "$VAL" --scopes workers --remote \
    && echo "[OIT1-tp] wrangler secrets-store set OK" >&2 \
    || { echo "[OIT1-tp] wrangler secrets-store FAILED" >&2; exit 1; }
else
  echo "[OIT1-tp] skipping wrangler (no CLOUDFLARE_SECRETS_STORE_ID set)" >&2
fi

HTTP=$(curl -sS https://api.turbopuffer.com/v1/namespaces \
  -H "Authorization: Bearer $VAL" \
  -o /dev/null -w "%{http_code}")
unset VAL

case "$HTTP" in
  200|404) echo "[OIT1-tp] verify OK (HTTP $HTTP)" >&2 ;;
  *) echo "[OIT1-tp] verify FAILED (HTTP $HTTP) — investigate" >&2; exit 1 ;;
esac
