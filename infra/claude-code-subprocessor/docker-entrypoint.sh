#!/usr/bin/env bash
# @cite infra/wsl2/Dockerfile
# @cite infra/claude-code-subprocessor/matrix.yaml
# OAuth-only posture: fails closed if ANTHROPIC_API_KEY is set.
# CLAUDE_CODE_OAUTH_TOKEN must be present for the session to proceed.
set -euo pipefail

if [[ -n "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ERROR: ANTHROPIC_API_KEY must NOT be set. This project is OAuth-only." >&2
  echo "       Remove ANTHROPIC_API_KEY from the environment and retry." >&2
  exit 1
fi

if [[ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]]; then
  echo "ERROR: CLAUDE_CODE_OAUTH_TOKEN is required but not set." >&2
  echo "       Pass it via: -e CLAUDE_CODE_OAUTH_TOKEN=<token>" >&2
  exit 1
fi

if [[ -n "${NVM_DIR:-}" ]] && [[ -s "${NVM_DIR}/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  . "${NVM_DIR}/nvm.sh"
fi

exec "$@"
