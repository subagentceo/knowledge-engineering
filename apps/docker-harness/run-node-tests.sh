#!/usr/bin/env bash
# Build-check the analytics-dashboard/cost TypeScript poller.
# There is no test suite; the meaningful gate is `tsc --noEmit` (type-checks the
# OTel cost-record pipeline against its declared interfaces).
set -uo pipefail
cd /work/apps/analytics-dashboard/cost
RED=$'\033[31m'; GRN=$'\033[32m'; YEL=$'\033[33m'; RST=$'\033[0m'

echo "${YEL}== analytics-dashboard/cost: npm install ==${RST}"
npm install --no-audit --no-fund || { echo "${RED}npm install FAILED${RST}"; exit 1; }

echo "${YEL}== tsc --noEmit ==${RST}"
if npx --yes tsc --noEmit --strict --skipLibCheck src/claude-cost-poller.ts; then
  echo "${GRN}analytics-dashboard/cost: TYPECHECK PASS${RST}"
else
  echo "${RED}analytics-dashboard/cost: TYPECHECK FAIL${RST}"; exit 1
fi
