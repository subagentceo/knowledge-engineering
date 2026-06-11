---
updated: 2026-06-11T00:00Z
status: in-progress
owners: [alex-osa, vlad-osa]
model: fable 5 (1m context)
---

```yaml
refs:
  mail: mail/README.md
  env:  src/lib/agent-envelope.ts
  b3:   seeds/memory/heartbeat/batch-2026-06-10-mobile-econ.md
  ppc:  docs/research/2026-06-10-pay-per-crawl.md
  loop: .claude/skills/citation-service-loop/SKILL.md
```

# batch 4 (B31–B40) — handoff queue for alex-osa + vlad-osa (fable 5 1m)

session-limit handoff from admin@jadecli.com's session (PRs #429–#448,
batches 1–3). successors: alex@subagents.com (git alex-osa) and
vlad@opensubagents.com (git vlad-osa). complete what was skipped, then
overhaul repo + application using the knowledge mirrored in vendor/ itself.

## carryover (skipped, env-gated last session)

```yaml
batch:
  - id: B31  # was B26
    task: cloudflare KV for /cite/* under alex@jadecli.com via the connector
      — measure TTFB on the DEPLOYED worker first; create only if it wins
    owner: alex-osa
    gate: deployed-worker latency measurement
    status: queued
  - id: B32  # was B30
    task: RUM beacon → events_ table (contract_first; allowed_operations)
    owner: alex-osa
    gate: B31
    status: queued
  - id: B33
    task: kick off the crawls — npm run crawl:vendors needs vendor hosts in
      the environment network policy (this sandbox 403'd: host_not_allowed);
      run from CI schedule or a network-enabled environment, then
      npm run service:refresh:local to propagate (ingest→warm→dw→dreams)
    owner: vlad-osa
    gate: network-enabled environment
    status: queued
  - id: B34
    task: deterministic url topology — mirror paths MUST equal urllib-style
      url parts: vendor/<netloc>/<path-segment>/.../<leaf>.md (scheme
      dropped, netloc as first dir, each path segment one subdir, query
      ignored). today vendor/<name>/<host>/... and hostless mirrors both
      exist; write the spec, a migration script with redirects in
      vendor-manifests, and make corpusPathToUrl the inverse function with
      a round-trip property test (url→path→url identity)
    owner: vlad-osa
    gate: B33
    status: queued
  - id: B35
    task: overhaul pass 1 — apply vendor/ knowledge to the app itself: every
      module cites the mirrored doc that justifies its design (@cite), and a
      verify gate fails when a cited page disappears from the mirror
    owner: alex-osa
    gate: null
    status: done  # PR: claude/stoic-gauss-rqhw70 — module @cite coverage + mirror-disappearance gate
  - id: B36
    task: overhaul pass 2 — frontend rebuilt against vendor/cloudflare 2026
      guidance (run_worker_first route arrays, assets-first navigation,
      speculation rules) per the ppc report recommendations (refs: ppc)
    owner: alex-osa
    gate: B31
    status: queued
  - id: B37
    task: a2a runtime typing — TaskEnvelope/TaskResult (refs: env) become
      the wire format of src/a2a/server.ts (a2a-js sdk message parts), so
      worktree dispatch, repo mail, and the a2a server share ONE schema;
      generate JSON schema from zod for non-ts agents at runtime
    owner: vlad-osa
    gate: null
    status: queued
  - id: B38
    task: dreams on real signal — after B33 crawls land, fact_memory_access
      has live reads from citations_* tools; run dreams:consolidate and
      verify curation against real usage, not seeded facts
    owner: vlad-osa
    gate: B33
    status: queued
  - id: B39
    task: pay-per-crawl activation — operator completes beta signup
      (docs/operator-runbooks/pay-per-crawl-enrollment.md); then verify 402
      posture + Discovery API listing
    owner: alex-osa
    gate: operator signup
    status: queued
  - id: B40
    task: batch-5 planning tick — read this file + mail, sync jira epic
      KAN-12 successors via rovo, author the next queue
    owner: both
    gate: B31..B39 triage
    status: queued
```

## directives (binding on successors)

<use_fable5_1m>
Run on fable 5 with the 1m context window. Load CLAUDE.md, this file, and
your inbox (receive_mail) before any code. The vendor/ mirror is your
primary knowledge source — cite it, don't refetch what is mirrored.
</use_fable5_1m>

<deterministic_url_topology>
New mirror writes follow urllib-part topology: netloc directory, one
subdirectory per path segment. corpusPathToUrl(path) must be the exact
inverse of the crawler's url→path mapping; enforce with a round-trip
property test. No hand-named vendor directories for new sources.
</deterministic_url_topology>

<typed_a2a_io>
Every agent2agent task uses TaskEnvelope in and TaskResult out (refs: env),
validated at runtime in the language actually running (zod in ts; emit
JSON schema from the zod source for anything else). Free-prose handoffs
are a defect.
</typed_a2a_io>

<loop_discipline>
Same loop as batches 1–3: one id per PR, labels automerge + skip-cost-gate
at creation, rebase auto-merge, claude/ branch prefix, commit subjects end
(B<N>), mark ids done in this file, broadcast send_mail on completion,
keep jira KAN epic in sync (refs: loop, b3).
</loop_discipline>

## tl;dr

ten ids for alex-osa + vlad-osa on fable 5 1m: the two env-gated carryovers,
crawl kickoff from a network-enabled environment, deterministic urllib
topology with a round-trip proof, two overhaul passes driven by vendor/
knowledge, a2a runtime typing unification, dreams on real signal,
pay-per-crawl activation, and the batch-5 tick. inbox mail carries each
owner's typed envelope.
