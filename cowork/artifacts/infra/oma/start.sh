#!/bin/sh
# Start Open Managed Agents against AlloyDB Omni
# Usage: sh infra/oma/start.sh [--dev]
#
# Egress proxy auth: ANTHROPIC_API_KEY=egress-proxy-managed is a placeholder.
# The proxy at 160.79.104.10 (api.anthropic.com) replaces it with real session creds.

set -e

OMA_DIR="$(cd "$(dirname "$0")/../../opencoworkers/open-managed-agents" && pwd)"

if [ ! -d "$OMA_DIR" ]; then
  echo "OMA not found at $OMA_DIR"
  echo "Run: cd opencoworkers && curl -L ... (see setup docs)"
  exit 1
fi

export DATABASE_URL="postgresql://postgres:${ALLOYDB_PASSWORD:-postgres}@127.0.0.1:5432/oma"
export VAULT_ENCRYPTION_KEY="${VAULT_ENCRYPTION_KEY:-04545f3dbbcfbcdd135618bcdc391e69e293fda094867aef2234611ab244f819}"
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-egress-proxy-managed}"
export PORT="${PORT:-3001}"

echo "Starting OMA server → AlloyDB Omni (127.0.0.1:5432/oma)"
echo "  API:     http://localhost:$PORT"
echo "  Swagger: http://localhost:$PORT/docs"
echo "  Tailnet: http://100.123.215.25:$PORT"

if [ "$1" = "--dev" ]; then
  cd "$OMA_DIR" && pnpm --filter server dev
else
  cd "$OMA_DIR" && node packages/server/dist/index.js
fi
