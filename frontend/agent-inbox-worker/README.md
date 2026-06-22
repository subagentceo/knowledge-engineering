# agent-inbox-worker

Email for the e2m manager roles, on **Cloudflare Email Service** — the real implementation behind
"enable the 4 roles with email on the subagentknowledge.com domain."

Grounded on: [Agents email docs](https://developers.cloudflare.com/agents/communication-channels/email/) ·
[cloudflare/agentic-inbox](https://github.com/cloudflare/agentic-inbox) ·
[Email for agents](https://blog.cloudflare.com/email-for-agents/).

## Addresses (live)

| role | address |
|------|---------|
| product-manager | `product-manager@subagentknowledge.com` |
| project-manager | `project-manager@subagentknowledge.com` |
| legal-manager | `legal-manager@subagentknowledge.com` |
| finance-manager | `finance-manager@subagentknowledge.com` |

Inbound mail to any of these is routed by Cloudflare **Email Routing** to the `agent-inbox` Worker, parsed,
and turned into an **e2m `Envelope`** (validated against `@coworkers/e2m-ts`) for that role.

## Two builds

- **Live (`dist/worker.js`)** — dependency-free `email()` handler: address-based routing for the 4 roles
  + KV queue (`INBOX`) + a status page. This is what's deployed now (via the Cloudflare API).
  Inspect: `GET /api/manifest`, `GET /api/inbox?role=product-manager`.
- **Full (`src/worker.ts`)** — the Agents-SDK build: one `ManagerInbox` Durable Object per role
  (the inbox = the agent's memory), `routeAgentEmail` + `createAddressBasedEmailResolver` (HMAC-signed
  reply routing), and **outbound** via the `send_email` binding. Promote with `wrangler deploy`.

## Deploy

```bash
# live shell is already deployed via the Cloudflare API (see deploy.sh).
# to promote to the stateful + outbound build:
npm install
npx wrangler deploy        # adds send_email + ManagerInbox DO (migration v1)
```

Outbound (`env.EMAIL.send`) requires the domain added to **Email Sending** in the dashboard
(SPF/DKIM/DMARC auto-config). Email Routing (inbound) is already enabled; rules live on the zone.

## What enabling email wrote to the zone (`subagentknowledge.com`)

Reversible — disabling Email Routing removes these:

- `MX` → `route1/route2/route3.mx.cloudflare.net`
- `TXT` SPF → `v=spf1 include:_spf.mx.cloudflare.net ~all`
- `TXT` DKIM → `cf2024-1._domainkey` (Email Routing signing key)
- 4 routing rules (one per role address) → action `worker: agent-inbox`
