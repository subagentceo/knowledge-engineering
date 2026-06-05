#!/usr/bin/env bash
# @cite vendor/anthropics/code.claude.com/docs/en/overview.md
# @cite seeds/citations/define-outcomes.md
set -euo pipefail

REPO_URL="https://github.com/subagentceo/knowledge-engineering.git"
REPO_DIR="${HOME}/knowledge-engineering"

# Ghostty binary check
if ! command -v ghostty &>/dev/null; then
  echo "ERROR: ghostty binary not found on PATH." >&2
  echo "  Install: https://ghostty.org/download" >&2
  exit 1
fi
ghostty --version 2>/dev/null || ghostty -version 2>/dev/null || true

# Ghostty uses its own GPU renderer; set TERM for tool compat
export TERM="${TERM:-xterm-256color}"
echo "TERM=${TERM}"

# Node 20+
if ! command -v node &>/dev/null || (( $(node -e 'process.stdout.write(process.version.slice(1).split(".")[0])') < 20 )); then
  echo "ERROR: Node 20+ required. Install via nvm, brew, or apt." >&2; exit 1
fi

# npm required
command -v npm &>/dev/null || { echo "ERROR: npm not found" >&2; exit 1; }

# git required
command -v git &>/dev/null || { echo "ERROR: git not found" >&2; exit 1; }

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

echo "SUCCESS: Ghostty agent bootstrap complete."
echo "  cd ${REPO_DIR} && claude"
echo "  Tip: add 'export TERM=xterm-256color' to your shell rc if colors break"
