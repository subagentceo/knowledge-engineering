#!/usr/bin/env bash
# setup-desktop.sh — Claude Desktop + Cowork + Docker MCP Toolkit integration
#
# AUTH MODEL:
#   - Claude Desktop: session auth via the claude.ai login — no key in config files
#   - MCP servers running inside Docker: inherit Desktop session auth via MCP_DOCKER gateway
#   - The egress proxy pattern (160.79.104.10 / Egress Gateway SDS CA) applies to
#     Artifact iframes and Claude Code sessions launched from Desktop
#   - NEVER put ANTHROPIC_API_KEY into claude_desktop_config.json
#
# Usage: ./setup-desktop.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-desktop] $*"; }
ok()   { echo "[setup-desktop] ✓ $*"; }
err()  { echo "[setup-desktop] ✗ $*" >&2; exit 1; }
run()  { $DRY_RUN && { log "DRY: $*"; return; }; "$@"; }

# ── Detect OS and config path ─────────────────────────────────────────────────
case "$(uname -s)" in
  Darwin)
    OS=macos
    DESKTOP_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
    ;;
  Linux)
    if grep -qi microsoft /proc/version 2>/dev/null; then
      OS=wsl2
      WIN_USER=$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r' || echo "$USER")
      DESKTOP_CONFIG="/mnt/c/Users/$WIN_USER/AppData/Roaming/Claude/claude_desktop_config.json"
    else
      err "Claude Desktop is macOS/Windows only"
    fi
    ;;
  MINGW*|MSYS*|CYGWIN*)
    OS=windows
    DESKTOP_CONFIG="$APPDATA/Claude/claude_desktop_config.json"
    ;;
esac

log "OS: $OS"
log "Config: $DESKTOP_CONFIG"
log "Auth model: Desktop session login — no API key in config"

# ── Backup existing config ────────────────────────────────────────────────────
DESKTOP_DIR="$(dirname "$DESKTOP_CONFIG")"
run mkdir -p "$DESKTOP_DIR"
[[ -f "$DESKTOP_CONFIG" ]] && run cp "$DESKTOP_CONFIG" "${DESKTOP_CONFIG}.bak.$(date +%s)" && ok "Backed up existing config"

# ── Build config — NO API key anywhere ───────────────────────────────────────
EXISTING=$( [[ -f "$DESKTOP_CONFIG" ]] && cat "$DESKTOP_CONFIG" || echo '{"mcpServers":{}}' )

NEW_CONFIG=$(echo "$EXISTING" | python3 -c "
import json, sys
cfg = json.load(sys.stdin)
s = cfg.setdefault('mcpServers', {})

# Docker MCP gateway — inherits Desktop session auth via MCP_DOCKER
# Requires Docker Desktop ≥4.40 with MCP Toolkit enabled
# Auth flows: Desktop login → MCP_DOCKER gateway → session credentials
# NO API key needed or wanted here
s['docker-mcp'] = {
  'command': 'docker',
  'args': ['mcp', 'gateway', 'run'],
  'env': {}
}

# e2m filesystem — local workspace access
# Auth: Desktop session (not API key)
s['e2m-filesystem'] = {
  'command': 'npx',
  'args': ['-y', '@modelcontextprotocol/server-filesystem',
           '\$HOME/workspace/e2m'],
  'env': {}
}

# e2m managed-agents MCP server
# Auth: inherited from Desktop session via egress proxy
# DO NOT add ANTHROPIC_API_KEY here — it is not needed and would be wrong
s['e2m-managed-agents'] = {
  'command': 'npx',
  'args': ['-y', '@anthropic-ai/mcp-server-managed-agents'],
  'env': {
    'ANTHROPIC_BETA': 'managed-agents-2026-04-01'
  }
}

print(json.dumps(cfg, indent=2))
" 2>/dev/null || echo "$EXISTING")

if $DRY_RUN; then
  log "DRY: would write to $DESKTOP_CONFIG:"
  echo "$NEW_CONFIG"
else
  echo "$NEW_CONFIG" > "$DESKTOP_CONFIG"
  ok "claude_desktop_config.json updated (no API key)"
fi

# ── Cowork project ────────────────────────────────────────────────────────────
COWORK_PROJECT_DIR="${COWORK_PROJECT_DIR:-$HOME/workspace/e2m}"
run mkdir -p "$COWORK_PROJECT_DIR"
run cat > "$COWORK_PROJECT_DIR/.cowork-project.json" << JSON_EOF
{
  "name": "e2m-workspaces",
  "description": "E2M Envelope2Mailbox protocol workspace",
  "created": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "authModel": "egress-proxy-session",
  "note": "No ANTHROPIC_API_KEY — auth handled by egress proxy (160.79.104.10 / Egress Gateway SDS CA) from Desktop session",
  "memoryEnabled": true,
  "linkedChatProject": "e2m-workspaces"
}
JSON_EOF
run cp "$(dirname "$0")/../CLAUDE.md" "$COWORK_PROJECT_DIR/CLAUDE.md" 2>/dev/null && ok "CLAUDE.md → Cowork project"
ok "Cowork project: $COWORK_PROJECT_DIR"

# ── Docker MCP Toolkit instructions ──────────────────────────────────────────
cat << INSTRUCTIONS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Docker MCP Toolkit — Manual Steps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your docker_mcptoolkit_${OS}_claude_desktop profile shows "No servers added".

The gateway inherits your Desktop session credentials — no API key needed.

To add MCP servers in Docker Desktop:
  1. Open Docker Desktop → MCP Toolkit (left sidebar)
  2. Select your claude_desktop profile
  3. Click "+" → Add Server — recommended for e2m:
       • github       (repo access)
       • filesystem   (local files)
       • fetch        (HTTP/web)
  4. Restart Claude Desktop

Auth chain: Desktop login → docker mcp gateway run → session credentials
                                     ↑ no API key anywhere in this chain
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTRUCTIONS

echo ""
ok "setup-desktop.sh complete"
log "Config: $DESKTOP_CONFIG"
log "No ANTHROPIC_API_KEY used — Desktop session auth throughout"
log "Restart Claude Desktop to load new MCP servers"
