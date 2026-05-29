#!/usr/bin/env bash
# SessionStart hook for the subagentmcp enterprise mirror.
# - Surfaces the entry point into the GitHub Enterprise / orgs / repos.
# - Warns when enterprise.json drifts past the 7-day verification SLA (CLAUDE.md).
# Output on stdout is shown to the session as context. Never exit non-zero here —
# a failing SessionStart hook should not block the session.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MANIFEST="$ROOT/enterprise.json"

emit() { printf '%s\n' "$*"; }

emit "── subagentmcp · GitHub Enterprise mirror ─────────────────────────────"
emit "Entry point:  gh + enterprise.json (run \`./setup.sh\` to bootstrap a fresh env)"
active_alias="$(gh auth status --active 2>/dev/null | awk '/Logged in to/{print $(NF-1); exit}')"
emit "Active gh alias: ${active_alias:-unknown}"

if [[ -f "$MANIFEST" ]] && command -v jq >/dev/null 2>&1; then
  verified="$(jq -r '.verified_at // empty' "$MANIFEST" 2>/dev/null)"
  org_count="$(jq -r '.orgs | length' "$MANIFEST" 2>/dev/null)"
  repo_count="$(jq -r '[.orgs[].repo_count] | add' "$MANIFEST" 2>/dev/null)"
  emit "Manifest:     ${org_count:-?} orgs · ${repo_count:-?} repos · verified ${verified:-unknown}"

  if [[ -n "$verified" ]]; then
    drift="$(python3 - "$verified" <<'PY' 2>/dev/null || echo -1
import sys
from datetime import date
try:
    y, m, d = map(int, sys.argv[1].split("-"))
    print((date.today() - date(y, m, d)).days)
except Exception:
    print(-1)
PY
)"
    if [[ "$drift" -ge 7 ]]; then
      emit "⚠  Manifest is ${drift} days old (SLA: refresh past 7). Run \`/refresh-manifest\` (admin-jadecli)."
    fi
  fi
else
  emit "⚠  enterprise.json missing or jq unavailable — manifest status unknown."
fi
emit "───────────────────────────────────────────────────────────────────────"
exit 0
