---
name: priority-rerank
description: >-
  Rerank and surface the top-priority durable tasks for the knowledge-engineering
  chassis using BM25 + LLM scoring across the task state machine. Produces a
  dated HTML priority dashboard saved to cowork/artifacts/priority_tasks.html.
  Language targets: Rust+serde (hot path, lowest latency), Pydantic+uv/uvx
  (Python CLI, uvx runnable), TypeScript+Zod (orchestrator contract).
  Cadence: run before each Wednesday 10:00 UTC metrics review.
argument-hint: "[--lang rust|ts|py] [--top N] [week-ending YYYY-MM-DD]"
---

# /priority-rerank — knowledge-engineering task prioritization

> **@cite** `src/agent/team/subagent-schema.ts` (TeamTask, TaskSchema — Zod contract)
> **@cite** `src/agent/cowork/team_models.py` (Pydantic mirror)
> **@cite** `src/mcp/ext-tasks/index.ts` (pgdurable task queue MCP)
> **@cite** `src/cache/lru-bm25.ts` (L1 LRU + BM25 ranking, cache hit rate)
> **@cite** `src/course-plugins/claude-api/skills/rag/scripts/reranking_and_context.py`
> **@cite** `data/models/alloydb/dim_cowork_tasks.yaml` (DW semantics for task rows)
> **@cite** `cowork/templates/task-state-machine.ts` (canonical state transitions)
> **@cite** `cowork/templates/rerank-engine.ts` (BM25+LLM rerank, Zod I/O)
> **@cite** `cowork/templates/priority-queue.rs` (serde hot path)
> **@cite** `cowork/templates/cache-bench.rs` (latency + hit-rate benchmarks)
> **@cite** `cowork/templates/task-models.py` (uv/uvx pydantic mirror)
> **@cite** `cowork/templates/rerank-cli.py` (uvx runnable rerank)

## Intent

Surface *what to work on next* by scoring every pending/in-progress task across
five dimensions and returning a ranked list ready to feed back into the task state
machine. The same ranking logic runs in three language runtimes so agents pick the
fastest available path:

| runtime | file | when to use |
|---|---|---|
| Rust (serde) | `cowork/templates/priority-queue.rs` | hot-path rerank, < 1 ms p99 |
| TypeScript (Zod) | `cowork/templates/rerank-engine.ts` | orchestrator, Claude tool call |
| Python (Pydantic + uv) | `cowork/templates/rerank-cli.py` | ad-hoc, uvx runnable |

## Scoring dimensions

Each task receives a score ∈ [0, 100]:

| dimension | weight | source |
|---|---|---|
| urgency | 30 | `due_date` proximity; overdue = max |
| impact | 25 | `ke_fit_score` from dim_agent_templates or manual annotation |
| dependency_unblock | 20 | tasks blocked by this one × their urgency |
| effort_efficiency | 15 | impact / estimated_hours (low effort, high impact wins) |
| staleness | 10 | days since last state transition (prevents queue rot) |

Final score: `Σ(dimension_score × weight) / 100`

LLM rerank pass (optional, `--llm` flag): send top-20 candidates to Claude Haiku
with prefill `["` + stop `"]` for JSON ID list. Replaces BM25 ordering for the
top 5 slots only (preserve lower slots for determinism).

## Usage

```bash
# TypeScript (orchestrator)
npx tsx cowork/templates/rerank-engine.ts --top 10

# Python CLI (uvx, no install)
uvx --from . python cowork/templates/rerank-cli.py --top 10 --llm

# Rust (compiled hot path)
cargo run --manifest-path cowork/templates/Cargo.toml --bin priority-queue -- --top 10

# Benchmark cache hit rate and latency
cargo bench --manifest-path cowork/templates/Cargo.toml
```

## Task state machine transitions

States (verbatim from `src/agent/team/subagent-schema.ts` TeamTaskState):

```
pending ──claim──▶ in_progress ──complete──▶ completed
                        │
                        └──block──▶ blocked ──unblock──▶ in_progress
                        └──fail───▶ failed  ──retry───▶ pending
```

Rerank only considers `pending` and `blocked` (unblocked) tasks.
`in_progress` tasks appear in the dashboard but are not re-ordered.

## Output

1. `cowork/artifacts/priority_tasks.html` — ranked task cards in the design system
2. `cowork/data/priority_<YYYY-MM-DD>.jsonl` — JSONL snapshot (one task per line)
3. Stdout: top-N table (rank · score · id · subject · state · owner)

Design system: identical to `cowork/artifacts/connector_audit_94.html`
- `#0a0a0a` bg, `ui-monospace`, `#51c4ff` fact, `#7bd88f` dim, `#e6b455` measure

## Wednesday cadence

Run immediately before `/metrics-review`:
1. `priority-rerank` → `cowork/data/priority_<date>.jsonl`
2. `/metrics-review` → reads priority snapshot → appends "recommended actions" from it
3. PM agent → syncs top-5 ranked tasks to `docs/pending.md`

Schedule: `cronExpression: "0 9 * * 3"` (one hour before metrics review).

## Benchmark targets (by next Wednesday 2026-06-25)

| metric | target | measured by |
|---|---|---|
| Rust rerank p99 | < 1 ms (1 000 tasks) | `cargo bench` criterion |
| TS rerank p99 | < 10 ms (1 000 tasks) | `vitest bench` |
| L1 cache hit rate | ≥ 0.90 (repeat queries) | `cowork/templates/cache-bench.rs` |
| LLM rerank tokens | < 500 / run | logged to `cowork/data/bench.jsonl` |

## File map

```
cowork/templates/
  task-state-machine.ts   # T1 — Zod state machine, canonical transitions
  rerank-engine.ts        # T2 — BM25+LLM rerank, Zod I/O
  priority-queue.rs       # T3 — Rust serde priority queue, < 1 ms
  cache-bench.rs          # T4 — Rust criterion benchmarks
  Cargo.toml              # T3+T4 shared manifest
  task-models.py          # T5 — Pydantic mirror of T1 schema
  rerank-cli.py           # T6 — uvx runnable rerank CLI
data/models/alloydb/
  dim_cowork_tasks.yaml   # T7 — DW semantics
cowork/artifacts/
  priority_tasks.html     # T8 — live dashboard
```
