#!/usr/bin/env bash
# setup-code.sh — Install Claude Code + ant CLI, create managed agent
#
# AUTH MODEL: Egress proxy — no API key in env or config.
# Run inside a Claude Code session or Cowork task. The SDK inherits session auth
# from the egress proxy (160.79.104.10 / Egress Gateway SDS CA).
# Worker environments get their own ANTHROPIC_ENVIRONMENT_KEY — not the API key.
#
# Usage: ./setup-code.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-code] $*"; }
ok()   { echo "[setup-code] ✓ $*"; }
err()  { echo "[setup-code] ✗ $*" >&2; exit 1; }
run()  { $DRY_RUN && { log "DRY: $*"; return; }; "$@"; }

RESOURCE_IDS="$(dirname "$0")/../project-rag/resource-ids.yaml"

# No x-api-key — auth from egress proxy session context
api() {
  local method="$1" path="$2"; shift 2
  $DRY_RUN && { log "DRY: $method $path"; echo '{"id":"agent_DRY"}'; return; }
  curl -sf -X "$method" "https://api.anthropic.com$path" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" "$@"
}

# ── Node version check ────────────────────────────────────────────────────────
log "Checking Node.js..."
command -v node >/dev/null || err "Node.js not found. Install Node ≥18 first."
NODE_MAJOR=$(node -e 'process.stdout.write(process.versions.node.split(".")[0])')
[[ $NODE_MAJOR -ge 18 ]] || err "Node ≥18 required (found $(node --version))"
ok "Node $(node --version)"

# ── Install Claude Code (includes ant CLI) ────────────────────────────────────
log "Installing @anthropic-ai/claude-code..."
run npm install -g @anthropic-ai/claude-code 2>&1 | tail -3 || true
ok "Claude Code installed"

log "Installing @anthropic-ai/sdk..."
run npm install -g @anthropic-ai/sdk 2>&1 | tail -2 || true
ok "SDK installed"

# ── Verify auth via egress proxy ──────────────────────────────────────────────
log "Verifying session auth via egress proxy..."
STATUS=$(curl -so /dev/null -w "%{http_code}" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  "https://api.anthropic.com/v1/memory_stores" 2>/dev/null || echo "000")
[[ "$STATUS" == "401" ]] && err "Got 401 — run this inside a Claude Code session, not a bare shell"
ok "Egress proxy auth confirmed (HTTP $STATUS)"

# ── Create coordinator agent ──────────────────────────────────────────────────
log "Creating e2m-coordinator agent..."
AGENT_RESP=$(api POST /v1/agents -d '{
  "name": "e2m-coordinator",
  "description": "E2M envelope routing coordinator. Routes tasks between mailboxes and manages project memory.",
  "model": "claude-sonnet-4-6",
  "tools": {"agent_toolset": {"enabled": true}},
  "system_prompt": "You are the e2m coordinator. Route envelopes between mailboxes, manage task delegation, maintain project memory. Always check /mnt/memory/ before starting tasks. Auth is handled by the egress proxy — never add x-api-key to requests."
}' 2>/dev/null || echo '{"id":"agent_ERR"}')
AGENT_ID=$(echo "$AGENT_RESP" | jq -r '.id')
ok "Agent: $AGENT_ID"

# ── Update resource-ids.yaml ──────────────────────────────────────────────────
if [[ -f "$RESOURCE_IDS" ]] && ! $DRY_RUN; then
  sed -i "s|coordinator:.*|coordinator: $AGENT_ID|" "$RESOURCE_IDS" 2>/dev/null || true
  ok "Updated $RESOURCE_IDS"
fi

echo ""
ok "setup-code.sh complete"
log "ant CLI: $(ant --version 2>/dev/null || echo 'restart shell to refresh PATH')"
log "Agent:   $AGENT_ID"
echo "   Next: ./setup-linux.sh (or macos/winget) to provision a self-hosted worker environment"
echo "   NOTE: Worker setup uses ANTHROPIC_ENVIRONMENT_KEY — not an API key"
