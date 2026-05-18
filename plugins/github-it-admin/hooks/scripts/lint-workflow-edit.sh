#!/usr/bin/env bash
# PreToolUse on Write|Edit — if the target path is under .github/workflows/,
# lint it post-edit. Hook receives JSON on stdin per Claude Code hooks API.
#
# The hook DOES NOT block the edit — it surfaces findings as a notification.
# Blocking is left to CI (verify chain).
set -euo pipefail

# Hook input is JSON on stdin: { tool_input: { file_path: "..." }, ... }
INPUT="$(cat || true)"
FILE="$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)"

# Only care about workflow files
case "$FILE" in
  *.github/workflows/*.yml|*.github/workflows/*.yaml) ;;
  *) exit 0 ;;
esac

# File may not exist yet at PreToolUse time (Write creates it). Skip if missing.
[ -f "$FILE" ] || exit 0

# Run the lint skill — informational only at PreToolUse; let the operator
# proceed but flag what's about to land.
OUT=$(npx tsx "${CLAUDE_PLUGIN_ROOT}/skills/claude-action-lint/scripts/lint.ts" "$FILE" 2>&1 || true)
if echo "$OUT" | grep -q "ERROR"; then
  echo "[OIT2-hook] ⚠ workflow lint ERRORs in $FILE — will fail CI:" >&2
  echo "$OUT" >&2
fi
exit 0
