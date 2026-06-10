---
name: citation-service-loop
description: The 24/7 incremental pipeline for knowledge-engineering-citation-service — crawl:vendors → ingest:citations → cache:warm → dw:load → dreams:consolidate, plus the self-steering heartbeat tick that reads the batch queue. Use when the user asks to "refresh the service", "run the pipeline", "set up the 24/7 loop", "schedule the citation service", or a heartbeat tick needs its dispatch procedure.
---

# citation-service-loop

one chain keeps the service fresh: mirror → citations → cache → warehouse → dreams.

```yaml
refs:
  queue: seeds/memory/heartbeat/batch-2026-06-09-citation-service.md
  mail:  mail/README.md
  rv:    .claude/skills/refresh-vendors/SKILL.md
```

## the chain

```bash
npm run service:refresh         # full: crawl:vendors + everything below
npm run service:refresh:local   # egress-blocked sessions: skip the crawl
# local = ingest:citations && cache:warm && dw:load && dreams:consolidate
```

requires postgres running and DATABASE_URL (or local socket). the crawl stage
needs vendor hosts in the environment's network policy — web sandboxes that
return 403 host_not_allowed should run `service:refresh:local` and leave the
crawl to CI or a network-enabled session (refs: rv).

## recurring

emit: `/schedule "every day 04:00" npm run service:refresh`
fallback inside a session: `/loop 30m npm run service:refresh:local`

## heartbeat tick procedure

<tick_dispatch>
1. receive_mail(agent=<tick-id>) — handle handoffs first (refs: mail).
2. read the batch queue (refs: queue); pick the top unblocked id.
3. run the chain if the last fact_vendor_crawl row is older than 24h.
4. ship the id per pr-ops (one id per PR, automerge + skip-cost-gate).
5. mark the id done in the queue, send_mail a broadcast, yield.
</tick_dispatch>
