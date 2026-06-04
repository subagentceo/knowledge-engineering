#!/usr/bin/env bash
# setup.sh — bootstrap knowledge-engineering inside WSL2 Ubuntu-26.04 on Windows 11
# user: alexzh | org: subagentceo
#
# @cite enterprise-mirror/bootstrap-wsl.sh
# @cite docs/firehose/triage-2026-06-04.md (t13-1)
#
# ─── PowerShell prerequisite (run ONCE in an elevated PowerShell on the host) ─────
#
#   wsl --install Ubuntu-26.04
#   # Then open the new Ubuntu-26.04 distro and run this script inside it.
#
# ─────────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ORG="subagentceo"
REPO_NAME="knowledge-engineering"
REPO_URL="https://github.com/${REPO_ORG}/${REPO_NAME}.git"
CLONE_DIR="$HOME/${REPO_NAME}"

log()  { printf '\033[1;34m▶\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Linux" ]] || die "run this inside WSL Ubuntu, not on the Windows host"

# ── 1. Tailscale ──────────────────────────────────────────────────────────────
setup_tailscale() {
  log "Connecting to Tailscale home mesh…"
  if ! command -v tailscale >/dev/null 2>&1; then
    warn "tailscale not found — installing via official script"
    curl -fsSL https://tailscale.com/install.sh | sh
  fi
  sudo tailscale up \
    --accept-routes \
    --advertise-tags=tag:dev
  ok "tailscale: $(tailscale status --json | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get(\"Self\",{}).get(\"DNSName\",\"connected\"))' 2>/dev/null || echo 'connected')"
}

# ── 2. Docker context for Docker Desktop Linux engine ─────────────────────────
setup_docker_context() {
  log "Configuring Docker context for Docker Desktop Linux engine…"
  if ! command -v docker >/dev/null 2>&1; then
    die "docker CLI not found — ensure Docker Desktop is installed and WSL integration is enabled, or run the Dockerfile build path"
  fi
  if docker context inspect desktop-linux >/dev/null 2>&1; then
    warn "docker context 'desktop-linux' already exists — skipping creation"
  else
    docker context create desktop-linux \
      --docker "host=npipe:////./pipe/dockerDesktopLinuxEngine"
    ok "docker context 'desktop-linux' created"
  fi
  docker context use desktop-linux
  ok "docker context: $(docker context show)"
}

# ── 3. Clone knowledge-engineering ───────────────────────────────────────────
clone_repo() {
  log "Cloning ${REPO_ORG}/${REPO_NAME}…"
  if [[ -d "$CLONE_DIR/.git" ]]; then
    warn "repo already cloned at $CLONE_DIR — pulling latest"
    git -C "$CLONE_DIR" pull --ff-only
  else
    git clone "$REPO_URL" "$CLONE_DIR"
    ok "cloned to $CLONE_DIR"
  fi
}

# ── 4. Install npm dependencies ───────────────────────────────────────────────
install_deps() {
  log "Installing npm dependencies…"
  cd "$CLONE_DIR"
  npm install
  ok "npm install complete"
}

# ── 5. Start Redis ────────────────────────────────────────────────────────────
start_redis() {
  log "Starting Redis server (daemonized)…"
  if command -v redis-server >/dev/null 2>&1; then
    redis-server --daemonize yes --loglevel warning
    ok "redis started"
  else
    warn "redis-server not found — install via: sudo apt-get install -y redis-server"
  fi
}

# ── 6. Verify environment ─────────────────────────────────────────────────────
verify_env() {
  log "Verifying environment…"
  node --version
  npm --version
  redis-cli ping
  ok "environment ready"
}

main() {
  setup_tailscale
  setup_docker_context
  clone_repo
  install_deps
  start_redis
  verify_env
  ok "WSL2 knowledge-engineering bootstrap complete."
  echo "  Next: cd $CLONE_DIR && npm run dev \"<task>\""
}
main "$@"
