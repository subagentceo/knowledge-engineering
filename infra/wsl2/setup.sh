#!/usr/bin/env bash
# @cite infra/wsl2/README.md
# Idempotent bootstrap for a bare WSL2 Ubuntu 24.04 instance.
# Run as a normal user with sudo access (or root).
# Usage: bash infra/wsl2/setup.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

log()  { printf '\033[1;32m[ke-setup]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[ke-setup WARN]\033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m[ke-setup ERR]\033[0m %s\n' "$*" >&2; }

need_sudo() {
  if [[ $EUID -ne 0 ]]; then
    sudo "$@"
  else
    "$@"
  fi
}

# ── 0. Source .env.wsl2 if present ────────────────────────────────────────────
if [[ -f "${REPO_ROOT}/.env.wsl2" ]]; then
  log "Sourcing ${REPO_ROOT}/.env.wsl2"
  # shellcheck disable=SC1090
  set -a; source "${REPO_ROOT}/.env.wsl2"; set +a
fi

# Sanity: OAuth-only invariant — fail if ANTHROPIC_API_KEY is set
if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  err "ANTHROPIC_API_KEY is set. This repo is OAuth-only (CLAUDE_CODE_OAUTH_TOKEN)."
  err "Unset ANTHROPIC_API_KEY from your environment before continuing."
  exit 1
fi

log "Starting WSL2 Ubuntu 24.04 bootstrap — idempotent"

# ── 1. System packages ─────────────────────────────────────────────────────────
log "Installing system packages..."
need_sudo apt-get update -qq
need_sudo apt-get install -y --no-install-recommends \
  software-properties-common \
  ca-certificates \
  gnupg \
  curl \
  wget \
  git \
  jq \
  unzip \
  build-essential \
  pkg-config \
  libssl-dev \
  libffi-dev \
  libsqlite3-dev \
  libbz2-dev \
  libreadline-dev \
  zlib1g-dev \
  xz-utils \
  lsb-release \
  apt-transport-https \
  fd-find \
  ripgrep

# Convenience symlink for fd (Ubuntu ships it as fdfind)
if ! command -v fd &>/dev/null; then
  need_sudo ln -sf /usr/bin/fdfind /usr/local/bin/fd
fi

# ── 2. Node.js 20 LTS ─────────────────────────────────────────────────────────
if ! node --version 2>/dev/null | grep -q '^v20'; then
  log "Installing Node.js 20 LTS via NodeSource..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | need_sudo bash -
  need_sudo apt-get install -y --no-install-recommends nodejs
else
  log "Node.js 20 already installed ($(node --version))"
fi

# ── 3. Python 3.12 via deadsnakes ─────────────────────────────────────────────
if ! python3 --version 2>/dev/null | grep -q '3\.12'; then
  log "Installing Python 3.12 via deadsnakes PPA..."
  need_sudo add-apt-repository ppa:deadsnakes/ppa -y
  need_sudo apt-get update -qq
  need_sudo apt-get install -y --no-install-recommends \
    python3.12 python3.12-venv python3.12-dev python3-pip
  need_sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1
  need_sudo update-alternatives --install /usr/bin/python  python  /usr/bin/python3.12 1
else
  log "Python 3.12 already installed ($(python3 --version))"
fi

# ── 4. uv (Python package manager) ───────────────────────────────────────────
if ! command -v uv &>/dev/null; then
  log "Installing uv..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.cargo/bin:$HOME/.local/bin:${PATH}"
else
  log "uv already installed ($(uv --version))"
fi

# ── 5. Redis 7 ────────────────────────────────────────────────────────────────
if ! command -v redis-server &>/dev/null; then
  log "Installing Redis 7 via official Redis PPA..."
  curl -fsSL https://packages.redis.io/gpg \
    | need_sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" \
    | need_sudo tee /etc/apt/sources.list.d/redis.list > /dev/null
  need_sudo apt-get update -qq
  need_sudo apt-get install -y --no-install-recommends redis
else
  log "Redis already installed ($(redis-server --version | head -1))"
fi

# Enable + start Redis via systemd (WSL2 with systemd enabled)
if systemctl is-active --quiet systemd 2>/dev/null || [[ -d /run/systemd/system ]]; then
  log "Enabling Redis systemd service..."
  need_sudo systemctl enable redis-server 2>/dev/null || true
  need_sudo systemctl start  redis-server 2>/dev/null || true
else
  warn "systemd not running — start Redis manually: redis-server --daemonize yes"
fi

# ── 6. Docker CLI ─────────────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  log "Installing Docker CLI..."
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | need_sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    | need_sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  need_sudo apt-get update -qq
  need_sudo apt-get install -y --no-install-recommends docker-ce docker-ce-cli containerd.io
  need_sudo usermod -aG docker "${USER:-root}"
  warn "Log out and back in for Docker group membership to take effect."
else
  log "Docker already installed ($(docker --version))"
fi

# ── 7. Terraform ──────────────────────────────────────────────────────────────
if ! command -v terraform &>/dev/null; then
  log "Installing Terraform via HashiCorp apt..."
  curl -fsSL https://apt.releases.hashicorp.com/gpg \
    | need_sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" \
    | need_sudo tee /etc/apt/sources.list.d/hashicorp.list > /dev/null
  need_sudo apt-get update -qq
  need_sudo apt-get install -y --no-install-recommends terraform
else
  log "Terraform already installed ($(terraform version -json | jq -r '.terraform_version' 2>/dev/null || terraform version | head -1))"
fi

# ── 8. Swift 6.1 ──────────────────────────────────────────────────────────────
SWIFT_VERSION="6.1"
SWIFT_INSTALL_DIR="/opt/swift"

if ! command -v swift &>/dev/null; then
  log "Installing Swift ${SWIFT_VERSION}..."
  SWIFT_TAG="swift-${SWIFT_VERSION}-RELEASE"
  SWIFT_PLATFORM="ubuntu24.04"
  SWIFT_TARBALL="${SWIFT_TAG}-${SWIFT_PLATFORM}.tar.gz"
  SWIFT_URL="https://download.swift.org/${SWIFT_TAG}-${SWIFT_PLATFORM}/${SWIFT_TAG}-${SWIFT_PLATFORM}.tar.gz"

  TMP_DIR="$(mktemp -d)"
  curl -fsSL "${SWIFT_URL}" -o "${TMP_DIR}/${SWIFT_TARBALL}"
  need_sudo tar -xzf "${TMP_DIR}/${SWIFT_TARBALL}" -C /opt
  need_sudo mv "/opt/${SWIFT_TAG}-${SWIFT_PLATFORM}" "${SWIFT_INSTALL_DIR}"
  rm -rf "${TMP_DIR}"

  # PATH entry added to profile below
else
  log "Swift already installed ($(swift --version 2>&1 | head -1))"
fi

# ── 9. Claude Code CLI ────────────────────────────────────────────────────────
if ! command -v claude &>/dev/null; then
  log "Installing Claude Code CLI..."
  need_sudo npm install -g @anthropic-ai/claude-code
else
  log "Claude Code CLI already installed ($(claude --version 2>/dev/null || echo unknown))"
fi

# ── 10. .claude/ directory structure ──────────────────────────────────────────
log "Setting up ~/.claude/ directory structure..."
mkdir -p \
  "${HOME}/.claude/worktrees" \
  "${HOME}/.claude/skills" \
  "${HOME}/.claude/logs" \
  "${HOME}/.claude/cache"

# Copy project-level Claude settings if available
if [[ -f "${REPO_ROOT}/.claude/settings.json" && ! -f "${HOME}/.claude/settings.json" ]]; then
  cp "${REPO_ROOT}/.claude/settings.json" "${HOME}/.claude/settings.json"
  log "Copied project .claude/settings.json to ~/.claude/"
fi

# ── 11. PATH exports in ~/.bashrc ─────────────────────────────────────────────
BASHRC="${HOME}/.bashrc"
MARKER="# ke-wsl2-path-exports"

if ! grep -q "${MARKER}" "${BASHRC}" 2>/dev/null; then
  log "Adding PATH exports to ${BASHRC}..."
  cat >> "${BASHRC}" <<EOF

${MARKER}
export PATH="/opt/swift/usr/bin:\${PATH}"
export PATH="\${HOME}/.cargo/bin:\${HOME}/.local/bin:\${PATH}"
# uv-managed Python virtual envs
export UV_PYTHON="python3.12"
EOF
fi

log "Bootstrap complete."
log ""
log "Next steps:"
log "  1. source ~/.bashrc  (or open a new terminal)"
log "  2. Set CLAUDE_CODE_OAUTH_TOKEN in your .env.wsl2"
log "  3. cd ${REPO_ROOT} && npm install"
log "  4. npm run verify"
