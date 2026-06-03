---
id: OMA1
title: Multi-Agent Infrastructure — MCP Layer, Loop Patterns, Autonomous Repository Management
date: 2026-06-03
status: active
deciders: [operator, orchestrator]
---

# OMA1 — Multi-Agent Infrastructure

## Context

After building the JSONL mailbox MCP lane (v0.3.x), the coworker registry, and the hourly CCR loop orchestrator (v0.4.0), a comprehensive survey of the MCP server ecosystem revealed four structural gaps in the current architecture and identified the CCR loop-in patterns available from cloud sessions. This ADR documents the decisions arising from that survey and establishes the implementation roadmap for autonomous repository management.

---

## Part 1 — CCR Loop-In Patterns

### What works from inside a CCR cloud session

| Mechanism | Available in CCR | Survives session end | Notes |
|---|---|---|---|
| `Agent()` + `isolation: "worktree"` | YES | No (tied to parent tick) | Primary pattern — Phase 3 of loop-orchestrator.md |
| SubagentStop hook (`decision: "block"`) | YES | No | ralph-loop pattern; max 8 consecutive blocks |
| `ScheduleWakeup` | NO | No | Main-session `/loop` only; not available to subagents |
| `RemoteTrigger` | NO | — | CLI/web only; not available inside CCR sessions |
| HTTP `/fire` endpoint via `Bash` | YES (if api.anthropic.com allowed) | YES — fires new CCR | Requires routine-specific bearer token stored in env |
| `CronCreate` | YES (session-scoped) | No | Disappears when session ends |

### Decision: three-tier loop architecture

```
Tier 1 — Cron-driven CCR tick (ke-loop-orchestrator, every 60 min)
  └─ Tier 2 — Agent() worktree coworkers (within tick, parallel, max 40 min)
       └─ Tier 3 — SubagentStop hook loops (within coworker, until gate passes)
```

- Tier 1 is the heartbeat. It reads mailbox + V040_LOOP_TASKS, selects highest-priority unblocked item.
- Tier 2 is parallel execution. coworker-feature-dev, coworker-security (always parallel), coworker-data (if vendor refresh needed) run as concurrent Agent() calls with worktree isolation.
- Tier 3 is quality gates. ralph-loop (SubagentStop hook: severity_high_findings == 0) and the prompt iteration loop (eval score ≥ 80/100) use the stop-hook while-loop within a coworker.

### Decision: coworker CCR firing via HTTP

For long-running coworkers that cannot complete within a single 60-min tick, pre-create dedicated CCR routines (ke-coworker-data, ke-coworker-prompt) with API trigger tokens. Store tokens in `env_01Cz5mzNxXr5yJBqmJGdky7u` as secrets. Orchestrator fires via `Bash` curl. Coworker signals completion via `mailbox_outcome` → `agent_orchestrator.jsonl`. Next tick reads it in Phase 1.

### MCP connector inheritance in sub-agents

Sub-agents spawned via `Agent()` inherit all connectors from the parent CCR session as string-references (shared connection). To restrict a coworker (e.g., coworker-security to read-only), use inline `mcpServers` definition in the agent frontmatter — exclusive connection, disconnects on sub-agent finish.

---

## Part 2 — MCP Server Infrastructure Decisions

### Adopted: Memory server (knowledge graph)

**Gap filled**: The flat `~/.claude/projects/.../memory/` file system has no relational structure, no typed entities, no cross-session graph traversal.

**Decision**: Adopt the MCP memory server's knowledge graph pattern. Implement as:
1. Local development: `mcp__memory__*` tools via stdio server
2. Production (Worker): D1-backed knowledge graph with identical tool surface

**Entity types for this repo**:
```
coworker    (id, model, status, category)
connector   (id, category, consensus_policy)
outcome     (id, semver, status, pr_number, commit_sha)
artifact    (sha256, path, size_bytes, produced_by)
task        (semver_outcome_id, status, assignee, branch)
```

**Relations (active-voice)**:
```
coworker → requires → connector
connector → gated_by → consensus_policy
outcome → produced → artifact
task → blocked_by → task
coworker → achieved → outcome
```

**Migration from file memory**: run `scripts/memory-migrate.ts` (to be created) that reads `MEMORY.md` + all memory `.md` files and creates entities via `create_entities` bulk.

---

### Adopted: SQLite MCP → CF D1 in production

**Gap filled**: `mailbox_recv` performs a full JSONL file scan + last-line-wins dedup on every call. No indexed queries on pending messages, no TTL enforcement, no consensus vote tracking via SQL.

**Decision**: Replace JSONL mailbox storage with SQLite locally / D1 in production. The MCP tool surface stays identical (7 tools) — the storage layer swaps under it.

**Schema**:
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  from_agent TEXT NOT NULL,
  to_agent TEXT NOT NULL,
  type TEXT NOT NULL,        -- outcome|task|test_result|cost_record|artifact|ping
  status TEXT NOT NULL,      -- pending|delivered|acked|expired
  thread_id TEXT,
  ack_required INTEGER DEFAULT 0,
  ttl_ms INTEGER,
  payload TEXT NOT NULL,     -- JSON
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_messages_to_status ON messages(to_agent, status);
CREATE INDEX idx_messages_thread ON messages(thread_id);

CREATE TABLE consensus_votes (
  connector_id TEXT NOT NULL,
  coworker_id TEXT NOT NULL,
  voted_at TEXT NOT NULL,
  PRIMARY KEY (connector_id, coworker_id)
);

CREATE TABLE knowledge_graph_entities (
  name TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  observations TEXT NOT NULL  -- JSON array
);
CREATE TABLE knowledge_graph_relations (
  from_entity TEXT NOT NULL,
  relation TEXT NOT NULL,
  to_entity TEXT NOT NULL,
  PRIMARY KEY (from_entity, relation, to_entity)
);
```

**CF D1 provisioning**: `mcp__claude_ai_Cloudflare_Developer_Platform__d1_database_create` with account `e6294e3ea89f8207af387d459824aaae`, name `ke-mailbox`.

---

### Adopted: Git MCP for restricted commit-automation subagents

**Gap filled**: commit-commands subagent (v0.4.0-O4) currently requires Bash access to run git. A subagent with `allowedTools: ["git_*"]` cannot execute arbitrary shell commands — protocol-level restriction, not prompt-level.

**Decision**: The `commit-commands` managed subagent definition specifies `allowedTools: ["git_add", "git_commit", "git_create_branch", "git_push"]` with the `(O<N>)` commit convention baked into the system prompt.

---

### Adopted: Slack MCP for human-visible loop output

**Gap filled**: `mailbox_outcome` messages are invisible to the operator until they manually read JSONL. The `comms` ConnectorCategory was already planned for Slack in `coworker-registry.ts`.

**Decision**: After each Phase 6 (outcome registration), the orchestrator calls `slack_post_message` to `#agent-ops` with a structured summary:
```
✓ v0.4.0-O1 merged to main
  branch: feat/v0.4.0-swift-lsp-subagent
  PR: #319 | commit: abc1234
  cost: $0.08 | cache: 71%
```

Operator replies in the thread become the feedback injection for the next tick.

---

### Adopted: Sentry MCP for structured error stacktraces

**Gap filled**: `mailbox_task_sync` `test_result` payload carries only `error_summary: string`. Sentry adds deduplication, occurrence counts, and full stacktrace retrieval as a subagent-isolated operation.

**Decision**: When coworker-verifier posts a failed `test_result`, the orchestrator spawns a diagnostic subagent with `allowedTools: ["sentry_get_issue"]` to retrieve the stacktrace without loading it into the orchestrator's context window.

**Pattern**:
```
orchestrator receives: { type: "test_result", failed: 3, sentry_url: "https://sentry.io/..." }
orchestrator spawns:   Agent("coworker-fix", tools=["sentry_get_issue", "Read", "Edit", "git_*"])
orchestrator stays:    lean context
```

---

### Skipped: Redis archived server

The 4-tool KV surface (set/get/delete/list) does not expose pub/sub, streams, or sorted sets. The DragonflyDB client (`src/db/redis-client.ts`) is already in the repo and more capable. CF Queues is the correct durable push-delivery solution.

---

### Skipped: Google Drive

Read-only OAuth scope (`drive.readonly`). Cannot write artifacts. CF R2 with signed URLs is the correct artifact transport — coworker writes to R2, passes signed URL in `ArtifactPayload.path`.

---

### Skipped: AWS KB Retrieval Server

Conflicts with CF-native + OAuth-only posture. The Voyage→Turbopuffer→AlloyDB pipeline (ADR `OPE1`) already implements semantic retrieval.

---

### Skipped: GitLab

Repo is on GitHub.

---

## Part 3 — Autonomous Repository Management Roadmap

The goal is: multi-agent loops across multiple CCR sessions that autonomously build, verify, and merge features to main. Every piece below is a repeatable, composable unit.

### Repeatable outcome unit (the atomic loop result)

```
1 SemVer task ID (v{M}.{m}.{p}-O{N})
→ 1 branch (alexzh/KENG-NNNN-description)
→ 1 coworker Agent() execution (worktree isolated)
→ 1 verify gate (npm run verify + swift build)
→ 1 commit (feat/fix scope: description (O{N}))
→ 1 PR (auto-merged if CI green + no review required)
→ 1 mailbox_outcome (achieved|blocked)
→ 1 knowledge graph update (outcome → produced → artifacts)
→ 1 Slack notification (#agent-ops)
```

### Build sequence for autonomous repo management

```
v0.4.0-O1:  Swift LSP subagent scaffold + CF Worker stub
v0.4.0-O2:  Feature-dev subagent scaffold + CF Worker stub
v0.4.0-O3:  PR-review subagent scaffold + CF Worker stub
v0.4.0-O4:  Commit-commands subagent (git MCP restricted)
v0.4.0-O5:  Security-guidance subagent (always-on hook)
v0.4.0-O6:  Ralph-loop subagent (SubagentStop hook pattern)
v0.4.0-O7:  Dev-chain coworker prompt + eval (score ≥ 80/100)
v0.4.0-O8:  CoworkerDashboard SSE + CF KV consensus panel (blocked on O1)

v0.4.1-O1:  SQLite→D1 mailbox storage migration
v0.4.1-O2:  Memory server integration + entity migration script
v0.4.1-O3:  Slack comms lane (mailbox_outcome → #agent-ops mirror)
v0.4.1-O4:  Sentry diagnostic subagent pattern
v0.4.1-O5:  CF R2 artifact transport (replaces path-only ArtifactPayload)

v0.5.0-O1:  ke-coworker-data CCR routine + HTTP fire pattern
v0.5.0-O2:  ke-coworker-prompt CCR routine + opus-4-8 iteration
v0.5.0-O3:  Connector consensus via D1 (replaces kv-coworker-votes KV)
v0.5.0-O4:  Cross-session knowledge graph (Memory server + D1 graph)
```

### Session continuity mechanism

Each tick writes a heartbeat to `seeds/memory/heartbeat/last-tick.md`:
```yaml
tick_id: v0.4.0-tick-2026-06-03T00
completed: [O1, O2]
in_progress: [O7]
blocked: [O8: waiting on O1]
next_tick: [O3, O4, O5, O6]
knowledge_graph_updated: true
slack_notified: true
```

The next CCR session reads this in Phase 1 as the primary state source. The knowledge graph entities provide the queryable relationship state. JIRA issues (KENG-NNNN) provide the operator-visible tracking layer.

---

## Implementation Notes

- All CF resources are fresh for account `e6294e3ea89f8207af387d459824aaae` — verify absent before creating
- Auth is OAuth-only everywhere; `ANTHROPIC_API_KEY` is never set
- Every commit ends with `(O<N>)` — `src/lib/conventions.test.ts` enforces this
- Branch topology: `alexzh/KENG-NNNN-description` — `scripts/branch/validate.ts` enforces this
- Finance and design remain separate agent roles — never merged into one delegated agent

## See also

- `docs/orchestration/coworker-registry.ts` — canonical typed registry
- `seeds/prompts/loop-orchestrator.md` — 6-phase hourly loop prompt
- `src/mcp/lanes/mailbox.ts` — current JSONL mailbox implementation
- `src/sdk/cost-types.ts` — shared cost telemetry types
- `.github/workflows/upload-agent-costs.yml` — CI cost artifact upload
