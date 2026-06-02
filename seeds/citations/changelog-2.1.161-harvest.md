---
refs:
  cl: vendor/anthropics/code.claude.com/docs/en/changelog.md
versions: "2.1.159 – 2.1.161"
harvested: "2026-06-02"
---

# changelog harvest: 2.1.159–2.1.161

## actionable for this project

```yaml
- version: "2.1.161"
  change: >
    OTEL_RESOURCE_ATTRIBUTES values now included as labels on every metric
    datapoint — slice by team/repo in Grafana without extra attribute enrichment.
  impact: high
  action_required: false
  notes: >
    sdkOtelEnv already sets OTEL_RESOURCE_ATTRIBUTES with organization.id and
    workspace.id. Both are now automatically promoted to metric labels by the
    CLI. Existing config is correct; no code change needed. Optional enhancement:
    add repo=knowledge-engineering and team=subagentceo to the array for richer
    Grafana slicing (see env var changes table).

- version: "2.1.161"
  change: >
    OTEL_LOG_TOOL_DETAILS=1 causes tool_decision log events to include
    tool_parameters. Previously documented as of 2.1.157 but silently dropped
    before telemetry init completed.
  impact: med
  action_required: false
  notes: >
    Fix in 2.1.161 (OTel events dropped before init) means tool_decision with
    tool_parameters is now reliably emitted from the very first tool call.
    If OTEL_LOG_TOOL_DETAILS=1 is already in sdkOtelEnv or the environment,
    no action needed. If not set, consider adding it for full tool audit trail.

- version: "2.1.161"
  change: >
    OTel log events (user_prompt, api_request, tool_result, tool_decision)
    silently dropped when emitted before telemetry init completed — now fixed.
  impact: high
  action_required: false
  notes: >
    Means early-session events (first tool calls, first user_prompt) are no
    longer lost. Existing telemetry pipeline picks this up automatically;
    expect higher event counts in dashboards for new sessions.

- version: "2.1.161"
  change: >
    Workflow agents with isolation: "worktree" in background sessions were
    blocked from editing files in their own worktree — now fixed.
  impact: high
  action_required: false
  notes: >
    Unblocks background subagents (npm-research, verifier, crawl-curator) that
    use worktree isolation. Was a silent failure mode; confirm any worktree-
    isolation background agents that were failing now succeed.

- version: "2.1.161"
  change: >
    Background sessions dispatched from `claude agents` booted on stale model
    from daemon env instead of settings.json — now fixed.
  impact: high
  action_required: false
  notes: >
    Background sub-agents now always pick up the model from settings.json.
    Verify settings.json has the desired default model (claude-sonnet-4-6 or
    claude-opus-4-7) so agents boot correctly.

- version: "2.1.161"
  change: >
    Completed subagents stuck showing as running when error during finalize —
    now fixed.
  impact: med
  action_required: false
  notes: >
    Affects `claude agents` status readout. Previously a finalizer error left
    the agent in a phantom running state; now it surfaces as error.

- version: "2.1.161"
  change: >
    EADDRINUSE when tools bind Unix sockets under $TMPDIR with CLAUDE_CODE_TMPDIR
    set to a deep path — now fixed.
  impact: med
  action_required: false
  notes: >
    Relevant if CLAUDE_CODE_TMPDIR is configured. MCP bridge-server and npm-
    registry server use Unix sockets; this fix prevents bind failures on
    non-default TMPDIR paths.

- version: "2.1.160"
  change: >
    Dynamic-workflow trigger keyword renamed from "workflow" to "ultracode".
  impact: med
  action_required: true
  notes: >
    Any prompt or seed that referenced the "workflow" keyword to trigger dynamic
    workflows must be updated to "ultracode". Audit seeds/prompts/ and
    seeds/posture/ for the old keyword.

- version: "2.1.160"
  change: >
    Edit no longer requires separate Read after grep — single-file grep satisfies
    read-before-edit.
  impact: low
  action_required: false
  notes: >
    Workflow improvement. Grep → Edit chains no longer need an intermediate
    Read call, saving one round-trip for targeted edits. Already benefits
    ongoing agent sessions automatically.

- version: "2.1.160"
  change: >
    acceptEdits mode now prompts before writing build-tool config files
    (.npmrc, .yarnrc*, bunfig.toml, .bazelrc, .pre-commit-config.yaml,
    .devcontainer/).
  impact: low
  action_required: false
  notes: >
    Adds a safety gate. Background agents using acceptEdits won't silently
    mutate build configs; they'll pause for confirmation. Expected behavior
    for human-in-the-loop flows.

- version: "2.1.160"
  change: >
    Removed CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE (now no-op).
  impact: low
  action_required: false
  notes: >
    Was not set in sdkOtelEnv or any known project config. No action needed.

- version: "2.1.159"
  change: Internal infra only, no user-facing changes.
  impact: low
  action_required: false
  notes: No-op for this project.
```

## env var changes

| var | change | was | now | applies_to |
|---|---|---|---|---|
| `OTEL_RESOURCE_ATTRIBUTES` | behavior change | values set as resource metadata only | values also promoted as labels on every metric datapoint | `sdkOtelEnv` in `claude-cost-poller.ts` |
| `OTEL_LOG_TOOL_DETAILS` | bug fix | `tool_parameters` dropped if emitted before telemetry init | `tool_parameters` reliably present from first event | `sdkOtelEnv` (add if full tool audit needed) |
| `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` | removed | controlled fast-mode override | no-op; safe to remove from any config | anywhere it appears |

### OTEL_RESOURCE_ATTRIBUTES assessment

Current `sdkOtelEnv` sets:

```
OTEL_RESOURCE_ATTRIBUTES: "organization.id=c38224f8-0e34-45c0-abee-739f89331d6a,workspace.id=wrkspc_01CBeWLBbjPFi6iqmBnnh3vs"
```

With 2.1.161, both attributes are now promoted to metric labels automatically.
**No code change is required.** The existing config is already correct.

Optional (not required): extend the array with `repo` and `team` for richer
Grafana faceting:

```ts
OTEL_RESOURCE_ATTRIBUTES: [
  `organization.id=${ORGANIZATION_ID}`,
  `workspace.id=${WORKSPACE_ID}`,
  "repo=knowledge-engineering",
  "team=subagentceo",
].join(","),
```

This would enable `group by repo` / `group by team` across all claude_code.*
metrics without any dashboard changes — the labels propagate automatically.
Decision deferred; not load-bearing.

## bug fixes that unblock work

- **Worktree isolation in background sessions** (2.1.161): Workflow agents
  with `isolation: "worktree"` were blocked from editing files in their own
  worktree when running as background sessions. Now fixed. Background
  npm-research, verifier, and crawl-curator agents that use worktree isolation
  can now write outputs without hitting the silent block.

- **Background agent model selection** (2.1.161): Background sessions launched
  via `claude agents` were booting with the stale daemon-env model instead of
  the model in `settings.json`. Fixed. Agents now consistently use the
  configured model.

- **Early-session OTel event loss** (2.1.161): `user_prompt`, `api_request`,
  `tool_result`, and `tool_decision` events emitted before telemetry init
  completed were silently dropped. Fixed. Full event coverage from session
  start — dashboards will show higher event counts; this is correct behavior.

- **tool_parameters on tool_decision** (2.1.161): Confirmed reliable now that
  early-event drop is fixed. Set `OTEL_LOG_TOOL_DETAILS=1` to capture full
  tool argument audit trail in OTel logs.

- **Background session overnight retire** (2.1.160): Sessions re-attached after
  daemon retire were losing conversation history. Fixed. Long-running background
  crawl/verify agents that span overnight daemon restarts now resume correctly.

- **Completed subagent phantom running state** (2.1.161): Finalizer errors no
  longer leave subagents appearing as running. `claude agents` status output is
  now accurate.

## no-ops / already handled

- `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` removal: not used in this project.
- `acceptEdits` build-config prompt gate (2.1.160): project does not use
  acceptEdits mode in automated pipelines; no behavior change.
- Shell startup file write prompt (2.1.160): Claude Code interactive sessions
  will prompt before modifying `~/.bashrc` etc. No pipeline impact.
- `claude mcp` secret redaction (2.1.161): MCP list/get/add no longer expands
  `${VAR}` references or leaks credential headers. Purely a security hardening;
  no project config change needed.
- Parallel tool call batch cancellation fix (2.1.161): failed Bash no longer
  cancels other calls in same batch. Improves throughput for parallel tool call
  patterns already used by orchestrator; no code change needed.
- 2.1.159: internal infra only; no user-facing changes.

## tl;dr

Three high-impact items from 2.1.161:

1. **OTEL_RESOURCE_ATTRIBUTES → metric labels**: existing `organization.id` and
   `workspace.id` in `sdkOtelEnv` now automatically appear as Grafana label
   dimensions. No code change needed. Optional: add `repo` and `team` for
   free-dimensional slicing.

2. **Worktree + background session write-block fixed**: background subagents
   using `isolation: "worktree"` can now edit their worktree files. Was a
   silent failure.

3. **OTel early-event loss fixed**: user_prompt / tool_decision events at
   session start are no longer dropped. Dashboard event counts will increase;
   this is correct.

One action required from 2.1.160: audit `seeds/prompts/` and `seeds/posture/`
for the `"workflow"` dynamic-workflow trigger keyword — it must be renamed to
`"ultracode"`.
