#!/usr/bin/env bash
# setup-email-routing.sh
#
# Creates Cloudflare Email Routing rules for all 12 coworker addresses
# on subagentknowledge.com, routing each to the agent-inbox Worker.
#
# Usage:
#   CF_KEY=<your-global-api-key> bash scripts/setup-email-routing.sh
#
# Requires: CF_KEY (Global API Key from dash.cloudflare.com > My Profile > API Tokens)
# The Global API Key works with X-Auth-Email + X-Auth-Key headers.
#
# @cite https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/
# @cite https://developers.cloudflare.com/api/resources/email_routing/subresources/routing_rules/methods/create/
# @cite coworkers/organizations/github/e2m-tf/modules/email-routing/main.tf

set -euo pipefail

CF_EMAIL="${CF_EMAIL:-alex@jadecli.com}"
ACCOUNT_ID="${ACCOUNT_ID:-e6294e3ea89f8207af387d459824aaae}"
ZONE_ID="${ZONE_ID:-3f820e0424fd375d5b6f86acaad0d5d7}"
DOMAIN="subagentknowledge.com"
WORKER_NAME="agent-inbox"

if [[ -z "${CF_KEY:-}" ]]; then
  echo "ERROR: CF_KEY not set. Get your Global API Key from:"
  echo "  https://dash.cloudflare.com/profile/api-tokens"
  echo ""
  echo "Then run:"
  echo "  CF_KEY=<key> bash scripts/setup-email-routing.sh"
  exit 1
fi

AUTH=(-H "X-Auth-Email: $CF_EMAIL" -H "X-Auth-Key: $CF_KEY" -H "Content-Type: application/json")

# ── Step 1: Enable Email Routing on the zone ──────────────────────────────────

echo "▶ Checking Email Routing status..."
ER_STATUS=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing" "${AUTH[@]}" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('result',{}).get('enabled', False))" 2>/dev/null)

if [[ "$ER_STATUS" != "True" ]]; then
  echo "  Enabling Email Routing on $DOMAIN..."
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/enable" "${AUTH[@]}" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✓ Enabled' if d.get('success') else f'  ✗ {d}')" 2>/dev/null
else
  echo "  ✓ Email Routing already enabled"
fi

# ── Step 2: List existing rules (avoid duplicates) ────────────────────────────

echo ""
echo "▶ Fetching existing routing rules..."
EXISTING=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules" "${AUTH[@]}" \
  | python3 -c "
import sys, json
d = json.load(sys.stdin)
rules = d.get('result', [])
existing = set()
for r in rules:
    for m in r.get('matchers', []):
        if m.get('field') == 'to':
            existing.add(m['value'].split('@')[0])
for e in sorted(existing):
    print(e)
" 2>/dev/null)

echo "  Existing rules: $(echo "$EXISTING" | wc -l | tr -d ' ') addresses"

# ── Step 3: Create rules for each coworker ────────────────────────────────────

COWORKERS=(
  "product-management-coworker"
  "project-management-coworker"
  "design-coworker"
  "engineering-coworker"
  "data-coworker"
  "sales-coworker"
  "operations-coworker"
  "finance-coworker"
  "legal-coworker"
  "marketing-coworker"
  "agent-resources-coworker"
  "human-resources-coworker"
)

echo ""
echo "▶ Creating routing rules (${#COWORKERS[@]} coworker addresses → $WORKER_NAME Worker)..."

CREATED=0
SKIPPED=0

for CW in "${COWORKERS[@]}"; do
  ADDRESS="${CW}@${DOMAIN}"

  if echo "$EXISTING" | grep -q "^${CW}$"; then
    echo "  ○ $ADDRESS (already exists)"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  RESULT=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules" \
    "${AUTH[@]}" \
    -d "{
      \"matchers\": [{\"type\": \"literal\", \"field\": \"to\", \"value\": \"$ADDRESS\"}],
      \"actions\": [{\"type\": \"worker\", \"value\": [\"$WORKER_NAME\"]}],
      \"enabled\": true,
      \"name\": \"$CW\"
    }")

  SUCCESS=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null)

  if [[ "$SUCCESS" == "True" ]]; then
    echo "  ✓ $ADDRESS → $WORKER_NAME"
    CREATED=$((CREATED + 1))
  else
    ERROR=$(echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('errors',[{}])[0].get('message','unknown'))" 2>/dev/null)
    echo "  ✗ $ADDRESS: $ERROR"
  fi
done

# ── Step 4: Verify ────────────────────────────────────────────────────────────

echo ""
echo "╔══ Email Routing Summary ══╗"
echo "  Created: $CREATED"
echo "  Skipped: $SKIPPED (already existed)"
echo "  Domain:  $DOMAIN"
echo "  Worker:  $WORKER_NAME"
echo "╚══════════════════════════╝"
echo ""
echo "Verify at: https://dash.cloudflare.com/$ACCOUNT_ID/$DOMAIN/email/routing"
echo ""
echo "Test: send an email to product-management-coworker@$DOMAIN"
echo "      → it should arrive in the agent-inbox Worker's Durable Object"
