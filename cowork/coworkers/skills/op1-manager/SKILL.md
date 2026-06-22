---
name: op1-manager
description: >
  Run in a MANAGER session during the 12-hour OP1 sprint. The manager consumes its coworker's prep email
  (e2m envelope), then writes/updates its 6-page OP1 section, and reports to the operator. Use when the
  operator says /op1-manager, "write my op1", "op1 block", or each hour of the OP1 sprint. Reads the
  schedule, acts only for the active block, and is deterministic + type-safe (e2m transitions + the OP1
  template).
argument-hint: "[optional: block hour number]"
model: claude-sonnet-4-6
---

<!--
  @cite cowork/coworkers/operational-plan/op1-schedule.json   (the 12-block sprint)
  @cite cowork/coworkers/operational-plan/<manager>.html      (the OP1 section to write)
  @cite cowork/coworkers/operational-plan/references/amazon-operating-cadence.md
  @cite cowork/standards/agent-hierarchy.md                   (the durability gate)
-->

<op1_manager>
You are a manager (S-team) in the OP1 sprint. Your job this block: **write your 6-page OP1 section**,
using the prep your coworker mailed you.

## Procedure (deterministic)

1. **Read the schedule.** `op1-schedule.json` (or GET the live `/api/schedule`). Find the active block
   (`now` ∈ [`start_utc`, +60min); or the `hour` arg). Confirm this session's manager == `block.manager`;
   else stop: `not your block — active is <manager> at <time_pdt>`.

2. **Read the prep email** (`mailbox_recv` for this manager): the latest `OP1 prep` envelope from
   `block.coworker` in `cowork/data/mailbox/<manager>.jsonl`. `mailbox_ack` it (a transition).

3. **Write the OP1 section.** Fill `cowork/coworkers/operational-plan/<manager>.html` per the Amazon OP1
   template (§1 Intro · §2 Metrics table · §3 prior-year + the 5-provider landscape · §4 SMART
   initiatives · §5 Resources · Appendices), using the coworker's payload. **Metrics first.** Keep one-way
   vs two-way doors separate; decide what NOT to do.

4. **Gate (durability).** The section is "done" only if: §2 has 8–15 metrics with 2025/2026/2027 columns,
   §4 has ≥3 SMART initiatives (baseline vs incremental) with dependencies, and the provider table is
   filled. Otherwise leave `state: in_progress` and note the gap.

5. **Report to the operator.** Append a `summary` envelope to `cowork/data/mailbox/operator.jsonl`:
   ```json
   {"_type":"envelope","id":"<uuid>","envelope_type":"summary","from":"<manager>","to":"operator",
    "subject":"OP1 block h<n> complete: <focus>","at":"<ISO>","state":"pending",
    "payload":{"section":"operational-plan/<manager>.html","metrics":<n>,"initiatives":<n>,"gate":"pass|in_progress"}}
   ```
   It surfaces at the morning summary.

6. **Hand off.** The next block's coworker/manager run their skills at the next hour (see the calendar).

This is the "all I do is enter a skill" loop: `/op1-coworker` (coworker session) then `/op1-manager`
(manager session), once per hour, for 12 hours. The schedule keeps everyone on the same block.
</op1_manager>
