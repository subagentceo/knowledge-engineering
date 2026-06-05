#!/usr/bin/env bash
# @cite vendor/anthropics/code.claude.com/docs/en/overview.md
# @cite seeds/citations/define-outcomes.md
set -euo pipefail

REPO_URL="https://github.com/subagentceo/knowledge-engineering.git"
REPO_DIR="${HOME}/knowledge-engineering"

# Verify macOS
[[ "$(uname)" == "Darwin" ]] || { echo "ERROR: not macOS" >&2; exit 1; }

# Node 20+ — prefer nvm, fall back to brew
if ! command -v node &>/dev/null || (( $(node -e 'process.stdout.write(process.version.slice(1).split(".")[0])') < 20 )); then
  if [[ -f "${HOME}/.nvm/nvm.sh" ]]; then
    # shellcheck source=/dev/null
    source "${HOME}/.nvm/nvm.sh"
    nvm install 20 && nvm use 20
  elif command -v brew &>/dev/null; then
    brew install node
  else
    echo "ERROR: neither nvm nor Homebrew found. Install one first:" >&2
    echo "  brew: https://brew.sh" >&2
    echo "  nvm:  https://github.com/nvm-sh/nvm" >&2
    exit 1
  fi
fi

# Verify Node 20+
NODE_MAJOR=$(node -e 'process.stdout.write(process.version.slice(1).split(".")[0])')
(( NODE_MAJOR >= 20 )) || { echo "ERROR: Node ${NODE_MAJOR} < 20" >&2; exit 1; }

# npm required
command -v npm &>/dev/null || { echo "ERROR: npm not found" >&2; exit 1; }

# git (ships with Xcode CLT on macOS)
command -v git &>/dev/null || { echo "ERROR: git not found — run: xcode-select --install" >&2; exit 1; }

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

echo "SUCCESS: macOS CLI bootstrap complete. cd ${REPO_DIR} && claude"
