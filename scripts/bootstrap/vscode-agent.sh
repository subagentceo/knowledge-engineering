#!/usr/bin/env bash
# @cite vendor/anthropics/code.claude.com/docs/en/overview.md
# @cite seeds/citations/define-outcomes.md
set -euo pipefail

REPO_URL="https://github.com/subagentceo/knowledge-engineering.git"
REPO_DIR="${HOME}/knowledge-engineering"
CLAUDE_EXT="anthropic.claude-vscode"

# VS Code CLI must be on PATH
if ! command -v code &>/dev/null; then
  echo "ERROR: 'code' CLI not found." >&2
  echo "  macOS: open VS Code → Cmd+Shift+P → 'Shell Command: Install code in PATH'" >&2
  echo "  Linux: ensure /usr/share/code/bin or snap path is on PATH" >&2
  exit 1
fi

# Node 20+
if ! command -v node &>/dev/null || (( $(node -e 'process.stdout.write(process.version.slice(1).split(".")[0])') < 20 )); then
  echo "ERROR: Node 20+ required. Install via nvm or brew/apt." >&2; exit 1
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

# Install Claude VS Code extension (idempotent)
if ! code --list-extensions 2>/dev/null | grep -qi "${CLAUDE_EXT}"; then
  echo "Installing VS Code extension ${CLAUDE_EXT}..."
  code --install-extension "${CLAUDE_EXT}"
else
  echo "Extension ${CLAUDE_EXT} already installed"
fi

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

echo "SUCCESS: VS Code agent bootstrap complete."
echo "  Open workspace: code ${REPO_DIR}"
echo "  Then use Claude panel (Ctrl+Shift+P → 'Claude: Open Chat')"
