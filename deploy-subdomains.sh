#!/usr/bin/env bash
# deploy-subdomains.sh
#
# Deploys cowork.subagentknowledge.com and coworkers.subagentknowledge.com
# Pre-built bundles are in frontend/cowork-worker/dist/ and frontend/coworkers-worker/dist/
#
# Usage (from repo root):
#   bash deploy-subdomains.sh
#
# Requires CLOUDFLARE_API_TOKEN with Workers:Edit + Zone:Edit permissions
# Account: e6294e3ea89f8207af387d459824aaae (Alex@jadecli.com)
#
# @cite frontend/cowork-worker/wrangler.jsonc
# @cite frontend/coworkers-worker/wrangler.jsonc
# @cite cowork/coworkers/manifest.json

set -euo pipefail

ACCOUNT="e6294e3ea89f8207af387d459824aaae"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get token from env or wrangler config
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  # Try wrangler's stored token
  WRANGLER_TOKEN=$(cat ~/.wrangler/config/default.toml 2>/dev/null | grep api_token | cut -d'"' -f2 || true)
  if [[ -n "$WRANGLER_TOKEN" ]]; then
    CLOUDFLARE_API_TOKEN="$WRANGLER_TOKEN"
  else
    echo "ERROR: Set CLOUDFLARE_API_TOKEN env var or run 'wrangler login' first"
    echo "  export CLOUDFLARE_API_TOKEN=<your-token>"
    echo "  bash deploy-subdomains.sh"
    exit 1
  fi
fi

cf_upload() {
  local script_name="$1"
  local dist_dir="$2"
  echo "▶ Uploading ${script_name}..."

  local result
  result=$(curl -s -X PUT \
    "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/workers/scripts/${script_name}" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -F "metadata=@${dist_dir}/metadata.json;type=application/json" \
    -F "worker.js=@${dist_dir}/worker.js;type=application/javascript+module")

  local success
  success=$(echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('success','false'))" 2>/dev/null || echo "false")

  if [[ "$success" == "True" ]] || [[ "$success" == "true" ]]; then
    echo "  ✓ ${script_name} deployed"
  else
    echo "  ✗ ${script_name} failed:"
    echo "$result" | python3 -m json.tool 2>/dev/null || echo "$result"
    exit 1
  fi
}

echo ""
echo "╔══ Deploying subagentknowledge.com subdomains ══╗"
echo ""

cf_upload "cowork-frontend"    "${REPO_ROOT}/frontend/cowork-worker/dist"
cf_upload "coworkers-frontend" "${REPO_ROOT}/frontend/coworkers-worker/dist"

echo ""
echo "╚══ Done ══╝"
echo ""
echo "  https://cowork.subagentknowledge.com     (cowork/ application)"
echo "  https://coworkers.subagentknowledge.com  (7-coworker directory)"
echo ""
echo "DNS propagation: CF custom_domain routes provision automatically."
echo "First request may take ~30s while CF provisions the subdomain cert."
