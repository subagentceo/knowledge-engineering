#!/usr/bin/env bash
# secret-promote/list-scope-split — show org-vs-repo scope split for every
# secret in the OSEC1 parity table.
set -euo pipefail

GH_ORG="${GH_ORG:-${CLAUDE_PLUGIN_OPTION_GH_ORG:-subagentceo}}"
GH_REPO="${GH_REPO:-${CLAUDE_PLUGIN_OPTION_GH_REPO:-knowledge-engineering}}"

ORG_NAMES="$(gh secret list --org "$GH_ORG" --json name -q '.[].name' 2>/dev/null || true)"
REPO_NAMES="$(gh secret list --repo "$GH_ORG/$GH_REPO" --json name -q '.[].name' 2>/dev/null || true)"

PARITY_FILE="docs/data/secrets-parity.json"
if [ ! -f "$PARITY_FILE" ]; then
  echo "[OIT2-prom-list] parity file missing at $PARITY_FILE — OSEC1 not merged yet?" >&2
  exit 1
fi

echo "secret | org_scope | repo_scope"
echo "-------|-----------|-----------"
jq -r '.secrets[].name' "$PARITY_FILE" | while read -r name; do
  ORG=$(echo "$ORG_NAMES" | grep -qx "$name" && echo "✓" || echo "✗")
  REPO=$(echo "$REPO_NAMES" | grep -qx "$name" && echo "✓" || echo "✗")
  echo "$name | $ORG | $REPO"
done
