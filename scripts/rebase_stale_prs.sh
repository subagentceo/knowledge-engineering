#!/usr/bin/env bash
# OAUTO19: rebase open automerge PRs that are BEHIND origin/main.
# Runs at SessionStart so any backlog accumulated between sessions is
# cleared before the operator picks up work. Safe to run repeatedly.
#
# Requires:
#   - gh CLI authenticated (CLAUDE_CODE_OAUTH_TOKEN or gh auth login)
#   - Read/write access to PRs on the repository
#
# Cite: docs/decisions/2026-06-04-auto-rebase-pat.md

set -euo pipefail

# Run silently when gh is unavailable — local environments may not have it.
if ! command -v gh >/dev/null 2>&1; then
  exit 0
fi

# Get the current repo from git remote (no-op outside a git repo).
if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  exit 0
fi

# Skip if no GitHub token available (gh would prompt).
# timeout 15: gh auth status can hang on slow networks; SessionStart hooks
# must not block indefinitely (B-GHAUTH1).
if ! timeout 15 gh auth status >/dev/null 2>&1; then
  exit 0
fi

mapfile -t PRS < <(timeout 30 gh pr list \
  --state open \
  --label automerge \
  --json number,isDraft,mergeStateStatus \
  -q '.[] | select(.isDraft==false) | select(.mergeStateStatus=="BEHIND") | .number' 2>/dev/null || true)

if [ "${#PRS[@]}" -eq 0 ]; then
  exit 0
fi

echo "[rebase-stale-prs] ${#PRS[@]} BEHIND PR(s): ${PRS[*]}" >&2

for n in "${PRS[@]}"; do
  if timeout 30 gh pr update-branch "$n" >/dev/null 2>&1; then
    echo "[rebase-stale-prs] rebased #$n" >&2
  else
    echo "[rebase-stale-prs] could not rebase #$n (conflict?)" >&2
  fi
done
