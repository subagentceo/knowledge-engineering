#!/usr/bin/env bash
# SessionStart — verifies gh auth state + CLAUDE_CODE_OAUTH_TOKEN freshness.
# Output goes to stderr (visible to operator); never blocks session start.
set -euo pipefail

GH_ORG="${CLAUDE_PLUGIN_OPTION_GH_ORG:-subagentceo}"
GH_REPO="${CLAUDE_PLUGIN_OPTION_GH_REPO:-knowledge-engineering}"
MAX_AGE="${CLAUDE_PLUGIN_OPTION_SECRET_MAX_AGE_DAYS:-90}"

# gh auth
ACTIVE=$(gh auth status --active 2>&1 | grep -oE 'account [a-z0-9-]+' | awk '{print $2}' || true)
if [ "$ACTIVE" != "alex-jadecli" ]; then
  echo "[OIT2-session] ⚠ gh active account is '$ACTIVE' (expected 'alex-jadecli')" >&2
fi

SCOPES=$(gh auth status 2>&1 | grep -oE "Token scopes: '[^']+'" | head -1 || true)
for need in admin:org repo workflow; do
  if ! echo "$SCOPES" | grep -q "$need"; then
    echo "[OIT2-session] ⚠ missing gh scope: $need (run: gh auth refresh -s $need)" >&2
  fi
done

# CLAUDE_CODE_OAUTH_TOKEN freshness
check_age() {
  local label="$1"; shift
  local updated_at
  updated_at=$(gh secret list "$@" --json name,updatedAt -q '.[] | select(.name=="CLAUDE_CODE_OAUTH_TOKEN") | .updatedAt' 2>/dev/null || true)
  if [ -z "$updated_at" ]; then
    echo "[OIT2-session] ⚠ CLAUDE_CODE_OAUTH_TOKEN missing on $label" >&2
    return
  fi
  local age_days
  age_days=$(( ( $(date -u +%s) - $(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$updated_at" +%s 2>/dev/null || echo 0) ) / 86400 ))
  if [ "$age_days" -gt "$MAX_AGE" ]; then
    echo "[OIT2-session] ⚠ CLAUDE_CODE_OAUTH_TOKEN on $label is $age_days days old (> $MAX_AGE) — rotate via claude-oauth-rotate skill" >&2
  fi
}

check_age "org" --org "$GH_ORG"
check_age "repo" --repo "$GH_ORG/$GH_REPO"

exit 0
