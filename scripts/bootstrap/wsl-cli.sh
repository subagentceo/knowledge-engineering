#!/usr/bin/env bash
# @cite vendor/anthropics/code.claude.com/docs/en/overview.md
# @cite seeds/citations/define-outcomes.md
set -euo pipefail

REPO_URL="https://github.com/subagentceo/knowledge-engineering.git"
REPO_DIR="${HOME}/knowledge-engineering"

# Verify WSL environment
if [[ -z "${WSL_DISTRO_NAME:-}" && ! -f /proc/version ]]; then
  echo "ERROR: not running in WSL" >&2; exit 1
fi
grep -qi microsoft /proc/version 2>/dev/null || { echo "WARN: /proc/version has no 'microsoft' — may not be WSL2"; }

# Node 20+ via nvm if node absent or too old
need_node() { ! command -v node &>/dev/null || [[ "$(node -e 'process.exit(+process.version.slice(1).split(".")[0]<20)')" == "" && $(node -e 'process.exit(+process.version.slice(1).split(".")[0]<20)'; echo $?) -ne 0 ]]; }

if ! command -v node &>/dev/null || (( $(node -e 'process.stdout.write(process.version.slice(1).split(".")[0])') < 20 )); then
  if [[ ! -f "${HOME}/.nvm/nvm.sh" ]]; then
    echo "Installing nvm..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  fi
  # shellcheck source=/dev/null
  source "${HOME}/.nvm/nvm.sh"
  nvm install 20
  nvm use 20
fi

# npm required
command -v npm &>/dev/null || { echo "ERROR: npm not found after node install" >&2; exit 1; }

# git required
command -v git &>/dev/null || { echo "ERROR: git not found — run: sudo apt install git" >&2; exit 1; }

# Install Claude CLI (idempotent)
if ! command -v claude &>/dev/null; then
  echo "Installing @anthropic-ai/claude-code..."
  npm install -g @anthropic-ai/claude-code
fi
claude --version

# OAuth-only: reject API key if set
if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ERROR: ANTHROPIC_API_KEY must not be set — OAuth-only (CLAUDE_CODE_OAUTH_TOKEN)" >&2; exit 1
fi
echo "Auth posture: OAuth-only (CLAUDE_CODE_OAUTH_TOKEN)"

# Clone or pull repo
if [[ -d "${REPO_DIR}/.git" ]]; then
  git -C "${REPO_DIR}" pull --ff-only
else
  git clone "${REPO_URL}" "${REPO_DIR}"
fi

# Install deps
npm --prefix "${REPO_DIR}" install

echo "SUCCESS: WSL CLI bootstrap complete. cd ${REPO_DIR} && claude"
