#!/usr/bin/env bash
# setup-linux.sh — Full e2m self-hosted worker environment (Ubuntu 22.04+ / Debian 12+)
#
# AUTH MODEL (two distinct layers):
#   - API calls from Claude session code: egress proxy (no key needed)
#   - This worker process: ANTHROPIC_ENVIRONMENT_KEY — issued when you create the environment,
#     scoped to that environment only. NOT the same as ANTHROPIC_API_KEY.
#
# The environment key authenticates the worker WITH the managed agents plane,
# which then grants it access under the session's credentials. The API key
# never appears here.
#
# Usage: sudo ./setup-linux.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-linux] $*"; }
ok()   { echo "[setup-linux] ✓ $*"; }
err()  { echo "[setup-linux] ✗ $*" >&2; exit 1; }
run()  { $DRY_RUN && { log "DRY: $*"; return; }; "$@"; }
apt_q(){ run apt-get install -y -qq "$@" 2>&1 | grep -v "^$" | tail -2 || true; }

# Worker auth — environment-scoped key, not the API key
: "${ANTHROPIC_ENVIRONMENT_ID:?Set ANTHROPIC_ENVIRONMENT_ID (env_...) from the managed agents console}"
: "${ANTHROPIC_ENVIRONMENT_KEY:?Set ANTHROPIC_ENVIRONMENT_KEY (envkey_...) — issued at environment creation}"

WORKDIR="${WORKDIR:-/workspace}"
ENV_ID_FILE="$(dirname "$0")/../project-rag/resource-ids.yaml"

log "Auth model: ANTHROPIC_ENVIRONMENT_KEY (not API key) — environment: $ANTHROPIC_ENVIRONMENT_ID"

# ── System packages ───────────────────────────────────────────────────────────
log "Updating apt..."
run apt-get update -qq
apt_q curl wget jq git build-essential pkg-config libssl-dev

# ── Node 22 ──────────────────────────────────────────────────────────────────
if ! command -v node >/dev/null 2>&1 || [[ $(node -e 'process.stdout.write(process.versions.node.split(".")[0])') -lt 22 ]]; then
  log "Installing Node 22..."
  run curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt_q nodejs
fi
ok "Node $(node --version)"

# ── Python 3.12 + uv ─────────────────────────────────────────────────────────
apt_q python3.12 python3.12-venv python3-pip
run pip install --break-system-packages --quiet uv 2>/dev/null || true
ok "Python $(python3 --version 2>&1 | cut -d' ' -f2)"

# ── Rust ─────────────────────────────────────────────────────────────────────
if ! command -v cargo >/dev/null 2>&1; then
  log "Installing Rust..."
  run curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path 2>&1 | tail -2
  export PATH="$HOME/.cargo/bin:$PATH"
fi
ok "Rust $(rustc --version 2>/dev/null | head -1)"

# ── Claude Code + ant CLI ─────────────────────────────────────────────────────
log "Installing @anthropic-ai/claude-code..."
run npm install -g @anthropic-ai/claude-code 2>&1 | tail -2 || true
ok "ant CLI ready"

# ── Workspace ─────────────────────────────────────────────────────────────────
run mkdir -p "$WORKDIR" && run chmod 777 "$WORKDIR"
ok "Workspace: $WORKDIR"

# ── Systemd worker service ────────────────────────────────────────────────────
# Worker uses ENVIRONMENT_KEY — the managed agents plane handles the rest
ANT_PATH=$(command -v ant 2>/dev/null || echo /usr/local/bin/ant)
run cat > /etc/systemd/system/e2m-worker.service << UNIT
[Unit]
Description=E2M Managed Agent Worker
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$WORKDIR
# Worker auth: environment-scoped key — NOT ANTHROPIC_API_KEY
Environment=ANTHROPIC_ENVIRONMENT_ID=$ANTHROPIC_ENVIRONMENT_ID
Environment=ANTHROPIC_ENVIRONMENT_KEY=$ANTHROPIC_ENVIRONMENT_KEY
ExecStart=$ANT_PATH beta:worker \\
  --environment-id \$ANTHROPIC_ENVIRONMENT_ID \\
  --environment-key \$ANTHROPIC_ENVIRONMENT_KEY \\
  --workdir $WORKDIR \\
  --log-format json \\
  --max-idle 120s
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
UNIT

run systemctl daemon-reload
run systemctl enable e2m-worker
run systemctl start e2m-worker || log "NOTE: start failed — check: journalctl -u e2m-worker"
ok "systemd service: e2m-worker"

# Update resource IDs
if [[ -f "$ENV_ID_FILE" ]] && ! $DRY_RUN; then
  sed -i "s|default:.*|default: $ANTHROPIC_ENVIRONMENT_ID|" "$ENV_ID_FILE" 2>/dev/null || true
fi

echo ""
ok "setup-linux.sh complete"
log "Environment:     $ANTHROPIC_ENVIRONMENT_ID"
log "Worker auth:     ANTHROPIC_ENVIRONMENT_KEY (not the API key)"
log "Worker status:   systemctl status e2m-worker"
log "Worker logs:     journalctl -u e2m-worker -f"
