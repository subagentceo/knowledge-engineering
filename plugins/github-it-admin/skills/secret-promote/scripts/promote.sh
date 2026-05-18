#!/usr/bin/env bash
# secret-promote (OIT2) — promote a value from operator clipboard into
# gh-org scope. Operator pastes once; gh API is write-only on values.
set -euo pipefail

GH_ORG="${GH_ORG:-${CLAUDE_PLUGIN_OPTION_GH_ORG:-subagentceo}}"
GH_REPO="${GH_REPO:-${CLAUDE_PLUGIN_OPTION_GH_REPO:-knowledge-engineering}}"

NAME="${1:?usage: promote.sh <SECRET_NAME>}"

if ! command -v pbpaste >/dev/null 2>&1; then
  echo "[OIT2-prom] pbpaste not found — macOS only" >&2
  exit 1
fi

cat >&2 <<EOF
=== secret-promote: $NAME ===
Copy the value to your clipboard from its canonical source (vendor
dashboard, NOT from gh — gh is write-only on values). Then press Enter.
EOF
read -r _

VAL="$(pbpaste)"
LEN=${#VAL}
if [ "$LEN" -lt 8 ]; then
  echo "[OIT2-prom] value too short ($LEN chars); aborting" >&2
  exit 1
fi
echo "[OIT2-prom] got $LEN chars from clipboard" >&2

if ! printf '%s' "$VAL" | gh secret set --org "$GH_ORG" --visibility selected --repos "$GH_REPO" "$NAME"; then
  echo "[OIT2-prom] gh secret set FAILED — clipboard preserved for retry" >&2
  exit 1
fi
echo "[OIT2-prom] gh org set OK" >&2

# Verify
if ! gh secret list --org "$GH_ORG" 2>&1 | grep -q "^$NAME"; then
  echo "[OIT2-prom] WRITE VERIFY FAILED: $NAME not in gh secret list --org $GH_ORG" >&2
  exit 1
fi
echo "[OIT2-prom] verify OK" >&2

printf '' | pbcopy
echo "[OIT2-prom] clipboard cleared" >&2
unset VAL
