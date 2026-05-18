#!/usr/bin/env bash
# secret-audit (OIT2) — wraps OSEC1 verifier + adds age-drift report.
set -euo pipefail

GH_ORG="${GH_ORG:-${CLAUDE_PLUGIN_OPTION_GH_ORG:-subagentceo}}"
GH_REPO="${GH_REPO:-${CLAUDE_PLUGIN_OPTION_GH_REPO:-knowledge-engineering}}"
MAX_AGE="${CLAUDE_PLUGIN_OPTION_SECRET_MAX_AGE_DAYS:-90}"

echo "## OIT2 secret-audit — $(date -u +%Y-%m-%dT%H:%M:%SZ)" >&2
echo

# Step 1: parity check (OSEC1)
if [ -f package.json ] && grep -q '"verify:secrets"' package.json; then
  echo "### OSEC1 parity verifier"
  if npm run verify:secrets 2>&1 | tail -20; then
    echo "  ✓ parity OK"
  else
    echo "  ✗ parity violations (see above)"
    PARITY_FAIL=1
  fi
else
  echo "  ⚠ OSEC1 verifier not available (run from project root with OSEC1 merged)"
fi
echo

# Step 2: age-drift report
echo "### Age-drift report (threshold: $MAX_AGE days)"
echo
echo "scope | name | updated_at | age_days | status"
echo "------|------|------------|----------|-------"

audit_scope() {
  local scope_label="$1"; shift
  local list_args=("$@")
  gh secret list "${list_args[@]}" --json name,updatedAt 2>/dev/null | jq -r --arg max "$MAX_AGE" --arg scope "$scope_label" '
    .[] |
    . as $s |
    (now - (.updatedAt | fromdateiso8601)) / 86400 | floor as $age |
    "\($scope) | \($s.name) | \($s.updatedAt) | \($age) | \(if $age > ($max|tonumber) then "STALE" else "ok" end)"
  ' || echo "$scope_label | (none) | - | - | -"
}

audit_scope "org"  --org "$GH_ORG"
audit_scope "repo" --repo "$GH_ORG/$GH_REPO"

echo
exit "${PARITY_FAIL:-0}"
