#!/usr/bin/env bash
# setup-winget.sh — Windows 11 e2m worker environment
# Run inside Git Bash, WSL2, or paste the PowerShell block into pwsh.exe
#
# AUTH MODEL (two distinct layers):
#   - API calls from Claude session code: egress proxy (no key in code)
#   - This worker process: ANTHROPIC_ENVIRONMENT_KEY — environment-scoped,
#     issued at environment creation. NOT ANTHROPIC_API_KEY.
#     Set it as a Windows user env var (see instructions below).
#
# Usage: ./setup-winget.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do case $arg in --dry-run) DRY_RUN=true ;; esac done

log()  { echo "[setup-winget] $*"; }
ok()   { echo "[setup-winget] ✓ $*"; }
err()  { echo "[setup-winget] ✗ $*" >&2; exit 1; }
run()  { $DRY_RUN && { log "DRY: $*"; return; }; "$@"; }

: "${ANTHROPIC_ENVIRONMENT_ID:?Set ANTHROPIC_ENVIRONMENT_ID (env_...)}"
: "${ANTHROPIC_ENVIRONMENT_KEY:?Set ANTHROPIC_ENVIRONMENT_KEY (envkey_...) — not the API key}"

WORKDIR="${WORKDIR:-$HOME/workspace/e2m}"
ENV_ID_FILE="$(dirname "$0")/../project-rag/resource-ids.yaml"

log "Auth model: ANTHROPIC_ENVIRONMENT_KEY (worker env scope, not API key)"

# ── Detect environment ────────────────────────────────────────────────────────
if command -v winget >/dev/null 2>&1; then
  IN_WSL=false
elif grep -qi microsoft /proc/version 2>/dev/null; then
  IN_WSL=true
else
  err "Run in Git Bash, WSL2, or use the PowerShell block at the bottom of this script"
fi

# ── Install via winget ────────────────────────────────────────────────────────
if ! $IN_WSL; then
  log "Installing via winget..."
  run winget install OpenJS.NodeJS.LTS Git.Git Python.Python.3.12 Rustlang.Rustup jqlang.jq \
    -e --accept-source-agreements --accept-package-agreements
  export PATH="$PATH:/c/Program Files/nodejs:/c/Users/$USER/AppData/Roaming/npm"
else
  log "WSL2: installing via apt..."
  run apt-get update -qq
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null 2>&1 || true
  run apt-get install -y -qq nodejs npm jq git python3 python3-pip
fi

# ── Claude Code + ant CLI ─────────────────────────────────────────────────────
log "Installing @anthropic-ai/claude-code..."
run npm install -g @anthropic-ai/claude-code 2>&1 | tail -2 || true
ok "ant CLI ready"

run mkdir -p "$WORKDIR"
ok "Workspace: $WORKDIR"

# ── Windows Task Scheduler XML ────────────────────────────────────────────────
ANT_PATH=$(command -v ant 2>/dev/null || echo "%APPDATA%\\npm\\ant.cmd")
TASK_XML="$WORKDIR/e2m-worker-task.xml"
run cat > "$TASK_XML" << XML_EOF
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <Triggers><BootTrigger><Enabled>true</Enabled></BootTrigger></Triggers>
  <Principals><Principal><LogonType>InteractiveToken</LogonType><RunLevel>LeastPrivilege</RunLevel></Principal></Principals>
  <Settings><MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <RestartOnFailure><Interval>PT1M</Interval><Count>999</Count></RestartOnFailure></Settings>
  <Actions>
    <Exec>
      <!-- Worker auth: ENVIRONMENT_KEY only — NOT ANTHROPIC_API_KEY -->
      <Command>cmd.exe</Command>
      <Arguments>/c "set ANTHROPIC_ENVIRONMENT_ID=$ANTHROPIC_ENVIRONMENT_ID && set ANTHROPIC_ENVIRONMENT_KEY=$ANTHROPIC_ENVIRONMENT_KEY && $ANT_PATH beta:worker --environment-id $ANTHROPIC_ENVIRONMENT_ID --environment-key $ANTHROPIC_ENVIRONMENT_KEY --workdir $WORKDIR --log-format json >> $WORKDIR\\e2m-worker.log 2>&1"</Arguments>
      <WorkingDirectory>$WORKDIR</WorkingDirectory>
    </Exec>
  </Actions>
</Task>
XML_EOF
ok "Task XML: $TASK_XML"

# ── Set user env vars (no API key — environment key only) ────────────────────
if ! $DRY_RUN && ! $IN_WSL; then
  powershell.exe -Command "
    [System.Environment]::SetEnvironmentVariable('ANTHROPIC_ENVIRONMENT_ID','$ANTHROPIC_ENVIRONMENT_ID','User')
    [System.Environment]::SetEnvironmentVariable('ANTHROPIC_ENVIRONMENT_KEY','$ANTHROPIC_ENVIRONMENT_KEY','User')
  " 2>/dev/null && ok "User env vars set (ENVIRONMENT_KEY, not API key)" || \
    log "NOTE: set env vars manually in System Properties → Advanced → Environment Variables"
fi

if [[ -f "$ENV_ID_FILE" ]] && ! $DRY_RUN; then
  sed -i "s|default:.*|default: $ANTHROPIC_ENVIRONMENT_ID|" "$ENV_ID_FILE" 2>/dev/null || true
fi

echo ""
ok "setup-winget.sh complete"
log "Register worker: schtasks /Create /XML \"$TASK_XML\" /TN e2m-worker /F  (Admin PowerShell)"
log "Start worker:    schtasks /Run /TN e2m-worker"
log "Worker logs:     $WORKDIR\\e2m-worker.log"
log "Auth:            ANTHROPIC_ENVIRONMENT_KEY (not API key)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# POWERSHELL EQUIVALENT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# winget install OpenJS.NodeJS.LTS Git.Git Python.Python.3.12 Rustlang.Rustup jqlang.jq -e --accept-source-agreements --accept-package-agreements
# npm install -g @anthropic-ai/claude-code
# # Worker auth — environment-scoped key, NOT the API key:
# [System.Environment]::SetEnvironmentVariable("ANTHROPIC_ENVIRONMENT_ID", "env_...", "User")
# [System.Environment]::SetEnvironmentVariable("ANTHROPIC_ENVIRONMENT_KEY", "envkey_...", "User")
# ant beta:worker --environment-id $env:ANTHROPIC_ENVIRONMENT_ID --environment-key $env:ANTHROPIC_ENVIRONMENT_KEY --workdir C:\workspace\e2m --log-format json
