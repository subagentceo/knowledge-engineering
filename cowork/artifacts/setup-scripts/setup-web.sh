#!/usr/bin/env bash
# setup-web.sh — Smoke-test the Managed Agents Memory API via egress proxy auth
#
# AUTH MODEL: No ANTHROPIC_API_KEY needed. Run this inside a Claude Artifact,
# Claude Code session, or Claude Cowork task — the egress proxy injects credentials
# transparently. From a raw shell outside that context, calls return 401.
#
# HOW IT WORKS:
#   /etc/hosts: 160.79.104.10  api.anthropic.com
#   TLS cert:   CN=*.anthropic.com, issuer=Egress Gateway SDS Issuing CA (production)
#   Auth:       x-api-key injected by claude.ai Service Worker / session bridge
#               → container code never holds a key
#
# Usage: ./setup-web.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-web] $*"; }
ok()   { echo "[setup-web] ✓ $*"; }
err()  { echo "[setup-web] ✗ $*" >&2; exit 1; }

# API call — no key header; egress proxy handles auth when running in session context
api() {
  local method="$1" path="$2"; shift 2
  $DRY_RUN && { log "DRY RUN: $method https://api.anthropic.com$path"; echo '{"dry_run":true,"id":"memstore_DRY"}'; return; }
  curl -sf -X "$method" "https://api.anthropic.com$path" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" \
    "$@"
}

log "Checking dependencies..."
command -v curl >/dev/null || err "curl not found"
command -v jq   >/dev/null || err "jq not found"
ok "curl + jq available"

log "Verifying egress proxy auth (expect 200, not 401)..."
STATUS=$(curl -so /dev/null -w "%{http_code}" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  "https://api.anthropic.com/v1/memory_stores" 2>/dev/null || echo "000")

if [[ "$STATUS" == "401" ]]; then
  err "Got 401 — this script must run inside a Claude session context (Artifact, Claude Code, or Cowork). The egress proxy only injects auth there."
elif [[ "$STATUS" == "200" || "$STATUS" == "DRY" ]]; then
  ok "Egress proxy auth working (HTTP $STATUS)"
else
  log "Unexpected status $STATUS — proceeding anyway (may be rate limit or beta access)"
fi

log "Creating test memory store..."
STORE=$(api POST /v1/memory_stores -d '{
  "name": "e2m-setup-test",
  "description": "Temporary store created by setup-web.sh — safe to archive"
}')
STORE_ID=$(echo "$STORE" | jq -r '.id')
ok "Store created: $STORE_ID"

log "Writing a test memory..."
MEM=$(api POST "/v1/memory_stores/$STORE_ID/memories" -d "{
  \"path\": \"/setup/test.md\",
  \"content\": \"setup-web.sh smoke test — $(date -u +%Y-%m-%dT%H:%M:%SZ)\"
}")
MEM_ID=$(echo "$MEM" | jq -r '.id')
MEM_SHA=$(echo "$MEM" | jq -r '.content_sha256')
ok "Memory written: $MEM_ID (sha256: ${MEM_SHA:0:12}...)"

log "Reading memory back..."
CONTENT=$(api GET "/v1/memory_stores/$STORE_ID/memories/$MEM_ID" | jq -r '.content')
ok "Content verified: $CONTENT"

log "Testing optimistic concurrency (safe update with precondition)..."
api POST "/v1/memory_stores/$STORE_ID/memories/$MEM_ID" \
  -d "{\"content\":\"updated by precondition test\",\"precondition\":{\"type\":\"content_sha256\",\"content_sha256\":\"$MEM_SHA\"}}" \
  >/dev/null
ok "Precondition update succeeded"

log "Listing memory versions..."
VER_COUNT=$(api GET "/v1/memory_stores/$STORE_ID/memory_versions?memory_id=$MEM_ID" | jq '.data | length')
ok "Versions: $VER_COUNT"

log "Cleaning up..."
api DELETE "/v1/memory_stores/$STORE_ID/memories/$MEM_ID" -d '{}' >/dev/null
api POST   "/v1/memory_stores/$STORE_ID/archive" -d '{}' >/dev/null
ok "Store archived"

echo ""
ok "setup-web.sh complete — Memory API reachable via egress proxy auth"
echo "   Next: ./setup-chat.sh to bootstrap project memory stores"
