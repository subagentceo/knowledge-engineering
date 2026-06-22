#!/usr/bin/env bash
# ghostty-config-test.sh — TDD red/green/refactor for Ghostty 1.3.1 config errors
#
# @cite https://ghostty.org/docs/config/reference (Ghostty 1.3.1 config reference)
# @cite ghostty +validate-config / +list-keybinds CLI introspection
#
# Three breaking changes from the config dialog:
#   1. renderer-max-fps  → unknown field (removed; macOS syncs to display refresh)
#   2. bell              → unknown field (replaced by bell-features)
#   3. goto_tab:last     → error.InvalidFormat (only integers accepted now)
#
# Usage: bash scripts/ghostty-config-test.sh [--fix]
#   No args : RED phase — assert all 3 errors are present
#   --fix   : GREEN phase — apply fixes, assert zero errors

set -euo pipefail

GHOSTTY=/Applications/Ghostty.app/Contents/MacOS/ghostty
CONFIG=~/.config/ghostty/config
PASS=0; FAIL=0; true  # avoid set -e exit on arithmetic zero

validate() { "$GHOSTTY" --config-file="$1" +validate-config 2>&1 || true; }

assert_errors() {
  local label="$1" file="$2"; shift 2
  local out; out=$(validate "$file")
  for pattern in "$@"; do
    if echo "$out" | grep -qF "$pattern"; then
      echo "  ✓ RED  [$label] error present: $pattern"; PASS=$((PASS+1))
    else
      echo "  ✗ RED  [$label] expected error missing: $pattern"; FAIL=$((FAIL+1))
    fi
  done
}

assert_clean() {
  local label="$1" file="$2"
  local out; out=$(validate "$file")
  if [ -z "$out" ]; then
    echo "  ✓ GREEN [$label] no errors"; PASS=$((PASS+1))
  else
    echo "  ✗ GREEN [$label] unexpected errors:"; echo "$out"; FAIL=$((FAIL+1))
  fi
}

# ── RED phase: confirm current config has all 3 errors ────────────────────────
red_phase() {
  echo ""
  echo "=== RED: confirm 3 errors exist in current config ==="
  assert_errors "renderer-max-fps" "$CONFIG" "renderer-max-fps: unknown field"
  assert_errors "bell"             "$CONFIG" "bell: unknown field"
  assert_errors "goto_tab:last"    "$CONFIG" "error.InvalidFormat"
}

# ── GREEN phase: apply fixes and assert zero errors ───────────────────────────
green_phase() {
  echo ""
  echo "=== GREEN: apply fixes ==="

  # Fix 1: remove renderer-max-fps (field removed in 1.3.1; macOS syncs to display refresh)
  sed -i '' '/^renderer-max-fps *=/d' "$CONFIG"

  # Fix 2: `bell` field removed; merge audio into bell-features
  sed -i '' '/^bell *=/d' "$CONFIG"
  sed -i '' 's/^bell-features *=.*/bell-features = system,audio/' "$CONFIG"

  # Fix 3: goto_tab:last → goto_tab:9 (only integers valid in 1.3.1)
  sed -i '' 's/=goto_tab:last/=goto_tab:9/' "$CONFIG"

  assert_clean "full config" "$CONFIG"
}

# ── Entrypoint ────────────────────────────────────────────────────────────────
if [[ "${1:-}" == "--fix" ]]; then
  green_phase
else
  red_phase
fi

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
[[ $FAIL -eq 0 ]]
