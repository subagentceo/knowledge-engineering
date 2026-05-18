#!/usr/bin/env bash
# claude-oauth-rotate (OIT2) — reads CLAUDE_CODE_OAUTH_TOKEN from macOS
# clipboard and dual-writes to gh org+repo. Never echoes the value.
# Self-deletes if invoked from /tmp (matches the 2026-05-18 one-shot pattern).
#
# Refs: OIT2, OSEC2, OSEC3.
# Citation: the 2026-05-18 successful rotation flow used in this repo.
set -euo pipefail

GH_ORG="${GH_ORG:-${CLAUDE_PLUGIN_OPTION_GH_ORG:-subagentceo}}"
GH_REPO="${GH_REPO:-${CLAUDE_PLUGIN_OPTION_GH_REPO:-knowledge-engineering}}"
MIN_LEN="${MIN_LEN:-50}"

# Self-delete if invoked from /tmp
if [[ "$0" == /tmp/* ]]; then
  trap 'rm -f "$0"' EXIT
fi

if ! command -v pbpaste >/dev/null 2>&1; then
  echo "[OIT2-oauth] pbpaste not found — this script targets macOS clipboard" >&2
  exit 1
fi

VAL="$(pbpaste)"
LEN=${#VAL}
echo "[OIT2-oauth] got $LEN chars from clipboard"

if [ "$LEN" -lt "$MIN_LEN" ]; then
  echo "[OIT2-oauth] value too short ($LEN < $MIN_LEN) — likely the OAuth code, not the exchanged token. Re-run \`claude setup-token\` and copy the FULL printed line." >&2
  exit 1
fi

# Dual-write
printf '%s' "$VAL" | gh secret set --org "$GH_ORG" --visibility selected --repos "$GH_REPO" CLAUDE_CODE_OAUTH_TOKEN
echo "[OIT2-oauth] gh org set OK"

printf '%s' "$VAL" | gh secret set --repo "$GH_ORG/$GH_REPO" CLAUDE_CODE_OAUTH_TOKEN
echo "[OIT2-oauth] gh repo set OK"

# Wipe clipboard
printf '' | pbcopy
echo "[OIT2-oauth] clipboard cleared"

unset VAL

# Read-after-write verify (timestamps must match recent)
echo "[OIT2-oauth] verify timestamps (both should be within seconds of each other):"
gh secret list --org "$GH_ORG"   2>&1 | grep CLAUDE_CODE_OAUTH_TOKEN || true
gh secret list --repo "$GH_ORG/$GH_REPO" 2>&1 | grep CLAUDE_CODE_OAUTH_TOKEN || true

echo "[OIT2-oauth] DONE"
