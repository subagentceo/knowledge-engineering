#!/usr/bin/env bash
# Storage plane: push regenerated, non-git artifacts off the ephemeral cloud
# VM to durable object storage via rclone.
#
# Usage: REMOTE=kestore:subagentknowledge bash scripts/sync-artifacts.sh
#
# @cite docs/reference/anthropic-foundation-models-integration.md (§4c)
# @cite infra/rclone/rclone.conf.template
set -euo pipefail

REMOTE="${REMOTE:-kestore:subagentknowledge}"

if ! command -v rclone >/dev/null 2>&1; then
  echo "rclone not installed — curl https://rclone.org/install.sh | sudo bash" >&2
  exit 1
fi

# Public feeds (cache-stats.json, vendor-stats.json, citations.json, …) are
# rebuilt every dw:load and are safe to mirror verbatim.
rclone copy frontend/public "${REMOTE}/public" --progress

# Vendor mirror is large and git-tracked, but a sync gives an off-repo
# snapshot for disaster recovery. --fast-list keeps the listing cheap.
rclone sync vendor "${REMOTE}/vendor" --fast-list --transfers 16

echo "synced frontend/public + vendor → ${REMOTE}"
