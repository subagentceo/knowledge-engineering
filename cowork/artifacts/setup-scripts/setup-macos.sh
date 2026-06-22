#!/usr/bin/env bash
# setup-macos.sh — Full e2m worker environment (macOS 13+ Ventura/Sonoma/Sequoia)
#
# AUTH MODEL (two distinct layers):
#   - API calls from Claude session code: egress proxy (no key needed)
#   - This worker process: ANTHROPIC_ENVIRONMENT_KEY — environment-scoped,
#     issued when the environment is created. NOT ANTHROPIC_API_KEY.
#
# Usage: ./setup-macos.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-macos] $*"; }
ok()   { echo "[setup-macos] ✓ $*"; }
err()  { echo "[setup-macos] ✗ $*" >&2; exit 1; }
run()  { $DRY_RUN && { log "DRY: $*"; return; }; "$@"; }
brew_q(){ run brew install --quiet "$@" 2>&1 | grep -v "^Warning" | tail -3 || true; }

: "${ANTHROPIC_ENVIRONMENT_ID:?Set ANTHROPIC_ENVIRONMENT_ID (env_...)}"
: "${ANTHROPIC_ENVIRONMENT_KEY:?Set ANTHROPIC_ENVIRONMENT_KEY (envkey_...) — not the API key}"

WORKDIR="${WORKDIR:-$HOME/workspace/e2m}"
LAUNCH_AGENTS="$HOME/Library/LaunchAgents"
ENV_ID_FILE="$(dirname "$0")/../project-rag/resource-ids.yaml"

log "Auth model: ANTHROPIC_ENVIRONMENT_KEY (worker-only, not API key)"

# ── Homebrew ──────────────────────────────────────────────────────────────────
if ! command -v brew >/dev/null 2>&1; then
  log "Installing Homebrew..."
  run /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
[[ -f /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
ok "Homebrew $(brew --version 2>/dev/null | head -1)"

# ── Dependencies ──────────────────────────────────────────────────────────────
brew_q node@22 uv
run brew link --force --overwrite node@22 2>/dev/null || true
ok "Node $(node --version 2>/dev/null)"

if ! command -v cargo >/dev/null 2>&1; then
  brew_q rustup && run rustup-init -y --no-modify-path
  source "$HOME/.cargo/env" 2>/dev/null || true
fi
ok "Rust $(rustc --version 2>/dev/null | head -1)"

# ── Claude Code + ant CLI ─────────────────────────────────────────────────────
log "Installing @anthropic-ai/claude-code..."
run npm install -g @anthropic-ai/claude-code 2>&1 | tail -2 || true
ok "ant CLI ready"

# ── Workspace ─────────────────────────────────────────────────────────────────
run mkdir -p "$WORKDIR"
ok "Workspace: $WORKDIR"

# ── LaunchAgent ───────────────────────────────────────────────────────────────
ANT_PATH=$(command -v ant 2>/dev/null || echo "/usr/local/bin/ant")
PLIST="$LAUNCH_AGENTS/com.e2m.worker.plist"
run mkdir -p "$LAUNCH_AGENTS"
run cat > "$PLIST" << PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>             <string>com.e2m.worker</string>
  <key>ProgramArguments</key>
  <array>
    <string>$ANT_PATH</string>
    <string>beta:worker</string>
    <string>--environment-id</string>  <string>$ANTHROPIC_ENVIRONMENT_ID</string>
    <string>--environment-key</string> <string>$ANTHROPIC_ENVIRONMENT_KEY</string>
    <string>--workdir</string>         <string>$WORKDIR</string>
    <string>--log-format</string>      <string>json</string>
    <string>--max-idle</string>        <string>120s</string>
  </array>
  <!-- Worker auth: ENVIRONMENT_KEY only — NOT ANTHROPIC_API_KEY -->
  <key>EnvironmentVariables</key>
  <dict>
    <key>ANTHROPIC_ENVIRONMENT_ID</key>  <string>$ANTHROPIC_ENVIRONMENT_ID</string>
    <key>ANTHROPIC_ENVIRONMENT_KEY</key> <string>$ANTHROPIC_ENVIRONMENT_KEY</string>
  </dict>
  <key>WorkingDirectory</key>  <string>$WORKDIR</string>
  <key>RunAtLoad</key>         <true/>
  <key>KeepAlive</key>         <true/>
  <key>StandardOutPath</key>   <string>$WORKDIR/e2m-worker.log</string>
  <key>StandardErrorPath</key> <string>$WORKDIR/e2m-worker-err.log</string>
</dict>
</plist>
PLIST_EOF
run launchctl load "$PLIST" 2>/dev/null || log "NOTE: launchctl load failed — run manually"
ok "LaunchAgent: $PLIST"

if [[ -f "$ENV_ID_FILE" ]] && ! $DRY_RUN; then
  sed -i '' "s|default:.*|default: $ANTHROPIC_ENVIRONMENT_ID|" "$ENV_ID_FILE" 2>/dev/null || true
fi

echo ""
ok "setup-macos.sh complete"
log "Environment:  $ANTHROPIC_ENVIRONMENT_ID"
log "Worker auth:  ANTHROPIC_ENVIRONMENT_KEY (not API key)"
log "Worker logs:  tail -f $WORKDIR/e2m-worker.log"
log "Stop worker:  launchctl unload $PLIST"
