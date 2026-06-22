# Changelog

All notable changes to the **subagentknowledge.com frontend Workers** are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] — 2026-06-20 — `agent-inbox` 12 addresses + Cloudflare governance

### Added

- **12 agent email addresses** on `subagentknowledge.com`: `{product,project,finance,legal}` ×
  `{manager,coworker,subagent}` (the `-subagent` tier = coding work). `agent-inbox` worker generalized to a
  function×tier resolver; 8 new routing rules created (the 4 `-manager` rules already existed). All 12 verified
  `enabled: true`, action `worker: agent-inbox`.
- **Cloudflare resource policy** (`coworkers/organizations/cloudflare/POLICY.md`): every Cloudflare resource
  must be created via `e2m-tf` **and** tagged. Inventory in `resources.yaml`; applied by `tagging/apply_tags.py`;
  CI gate `verify_tags.py`. The 12 routing rules + settings are governed in `e2m-tf` (15 import blocks) but are
  **not taggable** (`email_routing_rule` is not a taggable type in the Resource Tagging beta).
- **Simulated Cloudflare Organization** (`coworkers/organizations/cloudflare/organization/`): operator as Org
  Super Admin + the 12 managers as members; promotes to the real `cloudflare_organization` on Enterprise.

### Blocked

- Retroactive **tagging** of the 4 frontend workers + `agent-inbox` worker + KV is staged but not applied: the
  connected Cloudflare token lacks the **Tags** permission (`10000` auth error). Add Tags (Tag Admin) to an
  Account Owned Token, then `python3 tagging/apply_tags.py` tags all six in one run.

## [0.3.0] — 2026-06-20 — `agent-inbox` (email for agents)

### Added

- **agent-inbox Worker** — email for the e2m manager roles on **Cloudflare Email Service**
  (Email Routing inbound + Agents-SDK `onEmail` + `send_email` outbound). Grounded on
  `cloudflare/agentic-inbox` + the Agents email docs. Inbound mail to a role address is parsed into an
  e2m `Envelope` (validated against `@coworkers/e2m-ts`) and queued for that role.
- **4 role addresses live** on `subagentknowledge.com`: `product-manager@`, `project-manager@`,
  `legal-manager@`, `finance-manager@` → Email Routing rule (action `worker: agent-inbox`).
- **Live build** = dependency-free `email()` handler + KV queue (`INBOX` =
  `4bcdd7b006cc42ba9bfebd9587ea5235`) + status page (`/api/manifest`, `/api/inbox?role=`), deployed via the
  Cloudflare API. **Full build** (`src/worker.ts`) = `ManagerInbox` Durable Object per role + outbound
  replies + HMAC reply routing, staged for `wrangler deploy`.

### Deployment

- Enabled Email Routing on zone `3f820e0424fd375d5b6f86acaad0d5d7` (status `ready`). DNS written
  (reversible): apex `MX` → `route1/2/3.mx.cloudflare.net`, SPF `TXT`, DKIM `TXT` (`cf2024-1._domainkey`).
- Worker `agent-inbox` upload `success: true`, `errors: []`; 4 routing rules created `success: true`.

## [0.2.0] — 2026-06-20 — `calendar-frontend`

### Added

- **OP1 12-hour sprint schedule** on <https://calendar.subagentknowledge.com> — 12 one-hour blocks
  (7:00 PM → 6:00 AM PDT), each assigning a manager + coworker to write that domain's OP1, with the
  active block auto-highlighted. New endpoint `GET /api/schedule` (source: `op1-schedule.json`).
- Operator drives each block with two skills: `/op1-coworker` (coworker session — prepares the manager
  via the mail feature, an e2m envelope) and `/op1-manager` (manager session — writes the OP1 section,
  reports). Deployed via the Cloudflare API (script update; custom domain unchanged).

## [0.1.0] — 2026-06-20

### Added

- **calendar-frontend** → <https://calendar.subagentknowledge.com>. Agent-native `calendar` template over
  e2m (event = scheduled DurableTask with `due_date`; actions `list_events · check_availability ·
  create_event`). Deployed as a dependency-free module Worker + custom domain.
  Deploy runbook: `cowork/runbooks/RUNBOOK1001_calendar_worker_1781919443.md`.
- **mail-frontend** → <https://mail.subagentknowledge.com>. Agent-native `mail` template over e2m
  (email = Envelope, reply = Transition; actions `list_emails · get_thread · draft_email · send_email`).
  Deployed as a dependency-free module Worker + custom domain.
  Deploy runbook: `cowork/runbooks/RUNBOOK1002_mail_worker_1781919443.md`.
- Full `McpAgent` `/mcp` Durable Object source staged in each worker's `src/worker.ts`
  (`MailMcp` / `CalendarMcp`) — promotes to a connectable MCP surface via `wrangler deploy`.

### Deployment

- Account `e6294e3ea89f8207af387d459824aaae` · zone `3f820e0424fd375d5b6f86acaad0d5d7`.
- Method: Cloudflare API — `PUT /workers/scripts/<name>` (module upload) + `PUT /workers/domains`
  (custom domain). Both returned `success: true`, `errors: []`. Verified via `workers_get_worker`.

### Notes

- The live build is the **dependency-free** Worker (app shell + `/api/manifest`); the `McpAgent`
  Durable-Object build is staged for `wrangler deploy` (it carries the `v1` SQLite-class migration).
- Mirrors the existing `cowork-frontend` / `coworkers-frontend` Worker conventions.

[Unreleased]: https://github.com/subagentceo/knowledge-engineering/compare/frontend-v0.1.0...HEAD
[0.1.0]: https://github.com/subagentceo/knowledge-engineering/releases/tag/frontend-v0.1.0
