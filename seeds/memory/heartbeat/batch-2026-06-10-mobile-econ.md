---
updated: 2026-06-10T18:30Z
status: active
---

```yaml
refs:
  site: https://subagentknowledge.com/
  ppc:  docs/research/2026-06-10-pay-per-crawl.md
  mail: mail/README.md
```

# batch 3 (B21–B30) — mobile-first interactivity, econ-researcher rubric, cache dogfood

operator directive (2026-06-10): iPhone 16 Pro Chrome is device priority #1
and the landing page was non-interactive; plan via rovo (DENIED by operator
this session — fallback: this file + typed repo mail), provision via the
cloudflare connector (account alex@jadecli.com; connector live, 0 workers
visible), rubric = economic-research team reaching citable data, dogfood
L1/L2/L3 cache + worktrees + a2a/mailbox structured I/O.

## rubric (every id measured against)

```yaml
econ_researcher_rubric:
  - steps_to_citation: taps from landing → copied BibTeX/CSL for an
    economic-research doc (baseline 2026-06-10: broken on mobile = ∞)
  - tokens_to_citation: agent tokens for citations_search→citations_get
    round-trip (cache hits must reduce this)
  - parallel_capacity: independent ids dispatched to isolated worktrees
    with typed envelopes; no free-prose handoffs
```

## queue

```yaml
batch:
  - id: B21  # DONE — this PR (P0)
    task: mobile interactivity fix — #app 2-row 100svh grid + overflow:hidden
      crushed the 6 panes and blocked scrolling on iPhone 16 Pro Chrome;
      flow column + capped decorative ascii (pointer-events none)
    rubric: steps_to_citation goes from ∞ to finite on the priority device
    gate: null
  - id: B22  # DONE — this PR
    task: mobile layout guardrail tests — assert the P0 invariants in CI
      (app container scrolls, ascii pane non-interactive + height-capped,
      every pane id present in index.html)
    rubric: regression cannot reland silently
    gate: B21
  - id: B23  # DONE — this PR
    task: econ-researcher fast path — team chip row above the citations
      table (economic-research first) filtering via team-stats.json +
      #team/<slug> deep link
    rubric: steps_to_citation ≤ 3 taps for economic-research docs
    gate: B21
  - id: B24  # DONE — this PR
    task: L1/L2/L3 read-through for citations_get — in-proc corpus (L1),
      redis via lru-bm25 tier (L2), semantic_cache postgres (L3); cache-hit
      counters in result meta
    rubric: tokens_to_citation drops on repeat reads; counters prove tier
    gate: null
  - id: B25  # DONE — this PR
    task: a2a typed task envelopes — zod TaskEnvelope/TaskResult in
      src/lib/agent-envelope.ts; worktree dispatch + repo-mail payloads
      carry them (no free-prose handoffs)
    rubric: parallel_capacity — every dispatch this batch uses envelopes
    gate: null
  - id: B26
    task: cloudflare edge resources via connector — KV namespace for /cite
      response caching under alex@jadecli.com; wrangler binding + worker
      read-through (create only when measured to help)
    rubric: latency-to-first-byte on /cite/* from mobile
    gate: B24
  - id: B27
    task: rubric evaluator — scripts/eval-citation-rubric.ts scoring
      steps/tokens_to_citation against the live lane; scorecard JSON feed
    rubric: the rubric itself becomes measurable per release
    gate: B23, B24
  - id: B28
    task: rovo plan sync — mirror this queue into jira via the atlassian
      connector once operator re-approves access
    rubric: parallel_capacity (operator-visible planning)
    gate: operator approval of mcp__Atlassian_Rovo__*
  - id: B29
    task: visual QA loop — device-frame screenshots per merge (worktree
      agent renders index at 393x852) attached to PRs
    rubric: operator sees the priority device before merge
    gate: B22
  - id: B30
    task: RUM beacon — minimal performance.mark reporting into an events_
      table (contract_first) for real mobile latency
    rubric: latency measured from real devices, not lab
    gate: B26
```

## directives

<mobile_first_p0>
No batch-3 id ships before the iPhone 16 Pro Chrome defect fix (B21) is on
main. Device priority #1 stays the screenshot test for every frontend id.
</mobile_first_p0>

<structured_agent_io>
Every dispatched worktree agent receives a TaskEnvelope (B25 schema; until
merged, the same fields inline) and reports completion via repo mail with
labels [batch, B<N>] — no free-prose handoffs.
</structured_agent_io>

<econ_researcher_rubric>
Acceptance per id is the rubric block above — fewer taps/tokens to a
citable economic-research artifact, or the id does not close.
</econ_researcher_rubric>

## tl;dr

p0 mobile fix ships first (B21, this pr). then guardrails, econ fast path,
l1/l2/l3 read-through, typed envelopes, cf edge cache via the connector,
a rubric evaluator, and deferred rovo/jira sync pending operator approval.
same loop discipline; dispatches go out as typed mail to worktree agents.
