#!/bin/bash
# SessionStart hook: load version-controlled NON-SECRET project env into the
# session. Works in BOTH Claude Code CLI and Claude Code on the web.
#
# Mechanism: reads .env.defaults (committed, non-secret) and appends each
# `export KEY=value` to $CLAUDE_ENV_FILE, the file Claude Code sources for every
# subsequent Bash command in the session. See:
#   docs/snapshots/2026-05-15-stable/claude/skills/session-start-hook/SKILL.md
#   vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md ("$CLAUDE_ENV_FILE")
#
# Design rules:
#   - NON-SECRET only. Secrets stay in the cloud-env UI / Keychain / .dev.vars
#     per docs/operator-runbooks/cloud-env-vars-contract.md. This file is committed.
#   - A value already set in the environment is NOT overwritten — a session or
#     cloud-UI override always wins over the committed default.
#   - Idempotent: re-running (resume/clear) does not duplicate exports, because
#     Claude Code re-creates $CLAUDE_ENV_FILE per session; within a run we also
#     guard against re-export of an already-set key.
#   - No-op-safe when $CLAUDE_ENV_FILE is unset (older CLI / non-hook invocation):
#     falls back to printing the exports so a human can `eval` them, and exits 0.
#
# @cite docs/operator-runbooks/cloud-env-vars-contract.md
# @cite docs/snapshots/2026-05-15-stable/claude/skills/session-start-hook/SKILL.md
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DEFAULTS="${PROJECT_DIR}/.env.defaults"

[ -f "${DEFAULTS}" ] || { echo "load_project_env: ${DEFAULTS} not found — skipping" >&2; exit 0; }

# Where to write. $CLAUDE_ENV_FILE is provided by Claude Code (CLI + web). When
# absent, stream to stdout so the output is still usable (eval) and harmless.
ENV_OUT="${CLAUDE_ENV_FILE:-/dev/stdout}"

emitted=0
while IFS= read -r line || [ -n "${line}" ]; do
  # Skip comments and blank lines.
  case "${line}" in
    ''|\#*) continue ;;
  esac
  key="${line%%=*}"
  val="${line#*=}"
  # Skip malformed lines (no '=').
  [ "${key}" = "${line}" ] && continue
  # Do not overwrite a value already set in the environment (override wins).
  if [ -n "${!key:-}" ]; then
    continue
  fi
  printf 'export %s=%q\n' "${key}" "${val}" >> "${ENV_OUT}"
  emitted=$((emitted + 1))
done < "${DEFAULTS}"

echo "load_project_env: exported ${emitted} non-secret var(s) from .env.defaults into ${ENV_OUT}" >&2
exit 0
