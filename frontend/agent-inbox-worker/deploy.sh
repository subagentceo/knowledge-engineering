#!/usr/bin/env bash
# agent-inbox-worker deploy notes (account e6294e3ea89f8207af387d459824aaae, zone 3f820e0424fd375d5b6f86acaad0d5d7).
#
# The live shell (dist/worker.js) was deployed via the Cloudflare API:
#   PUT /accounts/{acct}/workers/scripts/agent-inbox   (module upload, binding INBOX=kv:4bcdd7b006cc42ba9bfebd9587ea5235)
#   POST /zones/{zone}/email/routing/enable            (MX + SPF + DKIM)
#   POST /zones/{zone}/email/routing/rules x4          ({role}@subagentknowledge.com -> worker agent-inbox)
#
# To promote to the full Agents-SDK build (stateful inbox agents + outbound replies):
set -euo pipefail
npm install
npx wrangler deploy   # src/worker.ts: send_email binding + ManagerInbox DO (migration v1)
echo "Note: add subagentknowledge.com to Email Sending in the dashboard for outbound (SPF/DKIM/DMARC)."
