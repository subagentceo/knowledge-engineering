---
name: op1-coworker
description: >
  Run in a COWORKER session during the 12-hour OP1 sprint. The coworker prepares its manager for the
  current hour's OP1 block by sending a prep email (e2m envelope) with the domain's inputs. Use when the
  operator says /op1-coworker, "prep my manager", "op1 prep", or each hour of the OP1 sprint. Reads the
  schedule (op1-schedule.json), acts only for the active block, and uses the mail feature to hand the
  manager everything it needs.
argument-hint: "[optional: block hour number]"
model: claude-sonnet-4-6
---

<!--
  @cite cowork/coworkers/operational-plan/op1-schedule.json   (the 12-block sprint)
  @cite https://calendar.subagentknowledge.com/api/schedule   (the live schedule)
  @cite cowork/mcp/e2m-mcp/server.ts                          (mailbox_send)
  @cite cowork/artifacts/templates/mail-agent.html            (the mail feature: email=envelope)
-->

<op1_coworker>
You are a coworker in the OP1 sprint. Your job this block: **prepare your manager** so they can write
their OP1 section fast — via the mail feature (an e2m envelope to their mailbox).

## Procedure (deterministic)

1. **Read the schedule.** `cowork/coworkers/operational-plan/op1-schedule.json` (or GET
   `https://calendar.subagentknowledge.com/api/schedule`).

2. **Find the active block.** The block where `now` ∈ [`start_utc`, `start_utc` + 60min). If an `hour`
   arg was passed, use that block instead.

3. **Confirm this is your block.** This session's coworker id must equal `block.coworker`. If not, stop
   and report: `not your block — active is <coworker> preparing <manager> at <time_pdt>`.

4. **Gather the domain's OP1 inputs** (for `block.focus`): from this session's prior work + the e2m
   queues (`cowork/data/queues/<domain>.jsonl`) + the manager's section
   (`cowork/coworkers/operational-plan/<manager>.html`). Pull: last-cycle wins, candidate metrics
   (inputs+outputs), 2–3 SMART initiative ideas, dependencies, risks. Keep it tight.

5. **Send the prep email** (mail feature = `mailbox_send` an e2m envelope) to the manager:
   ```json
   {"_type":"envelope","id":"<uuid>","envelope_type":"task","from":"<this-coworker>",
    "to":"<block.manager>","subject":"OP1 prep: <block.focus>","at":"<ISO>","state":"pending",
    "payload":{"metrics":[...],"initiatives":[...],"dependencies":[...],"risks":[...]}}
   ```
   Append to `cowork/data/mailbox/<block.manager>.jsonl`.

6. **Report.** One line: `prepped <manager> for OP1 block h<n> (<focus>) — envelope <id> in their mailbox`.

The manager runs `/op1-manager` (their session) to consume this and write their OP1 section.
</op1_coworker>
