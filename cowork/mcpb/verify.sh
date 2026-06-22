#!/usr/bin/env bash
# verify.sh — check 4 Cowork .mcpb extensions on Claude for Mac
# NOTE: .mcpb extensions are managed by the Claude for Mac UI, NOT claude_desktop_config.json.
#       This script checks the Cowork extension registry (local-agent-mode-sessions).
# Usage: bash verify.sh

set -euo pipefail

CLAUDE_SUPPORT="$HOME/Library/Application Support/Claude"
SESSIONS_DIR="$CLAUDE_SUPPORT/local-agent-mode-sessions"

G='\033[0;32m'; Y='\033[0;33m'; R='\033[0;31m'; N='\033[0m'

ok()  { printf "${G}[OK]${N}      %s\n" "$1"; }
warn(){ printf "${Y}[DEGRADED]${N} %s — open Claude → Extensions → Doctor\n" "$1"; }
miss(){ printf "${R}[MISSING]${N}  %s — open Claude → Extensions → Install\n" "$1"; }

# .mcpb extensions appear as rpm/plugin_* entries in session dirs
# Their plugin.json "name" field identifies them.
ext_installed() {
  local pattern="$1"
  find "$SESSIONS_DIR" -maxdepth 6 -name "plugin.json" \
    -exec grep -ql "\"$pattern\"" {} \; 2>/dev/null | grep -q .
}

# Fallback: check if the MCP server process is alive (extension is running)
proc_alive() { pgrep -fi "$1" >/dev/null 2>&1; }

check() {
  local label="$1" pattern="$2" proc="$3"
  if ext_installed "$pattern"; then
    ok "$label"
  elif proc_alive "$proc"; then
    warn "$label (running but not registered)"
  else
    miss "$label"
  fi
}

echo ""
echo "Cowork .mcpb extension status  ($(date +%H:%M:%S))"
echo "─────────────────────────────────────────────────"
check "Claude in Chrome" "claude-in-chrome"  "claude.*chrome"
check "Control Chrome"   "control-chrome"    "control.chrome"
check "Filesystem"       "filesystem"        "server-filesystem"
check "Macos"            "macos"             "macos.mcp"
echo "─────────────────────────────────────────────────"
echo ""
echo "Tip: 'deferred' tools in a session = normal lazy-loading, not an error."
echo ""
