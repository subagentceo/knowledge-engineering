#!/usr/bin/env python3
# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "pydantic>=2.7",
#   "anthropic>=0.40",
# ]
# ///
"""T6 — uvx-runnable rerank CLI.

Two-pass priority rerank:
  Pass 1 (deterministic): score all tasks via compute_score(), rank by total.
  Pass 2 (--llm flag):    Claude Haiku reorders top-5 using prefill+stop JSON.

Auth: OAuth only. ANTHROPIC_API_KEY is forbidden (see src/oauth/token.ts).
The Anthropic SDK picks up CLAUDE_CODE_OAUTH_TOKEN automatically.

Usage:
    # No install:
    uvx --from . python cowork/templates/rerank-cli.py --top 10

    # With LLM rerank:
    uvx --from . python cowork/templates/rerank-cli.py --top 10 --llm

    # Pipe JSONL tasks from AlloyDB snapshot:
    cat cowork/data/tasks.jsonl | uvx ... python rerank-cli.py --top 5 --llm

    # Pass an explicit context query:
    uvx ... python rerank-cli.py --top 10 --llm --query "what ships by wednesday"

@cite cowork/templates/task-models.py           (DurableTask, compute_score)
@cite src/course-plugins/claude-api/skills/rag/scripts/reranking_and_context.py
@cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from datetime import datetime, timezone
from uuid import UUID

from task_models import (
    DurableTask,
    Domain,
    PriorityScore,
    TaskState,
    compute_score,
    urgency_score,
    staleness_score,
)


# ── Scoring ───────────────────────────────────────────────────────────────────

_DOMAIN_MUL: dict[str | None, float] = {
    "product-management": 1.2,
    "engineering":        1.1,
    "data":               1.0,
    "design":             0.9,
    None:                 1.0,
}


def _impact(task: DurableTask) -> float:
    fit_base = (task.ke_fit_score / 5.0 * 100.0) if task.ke_fit_score else 50.0
    mul = _DOMAIN_MUL.get(task.domain.value if task.domain else None, 1.0)
    return min(100.0, fit_base * mul)


def _dep_score(task: DurableTask, all_tasks: list[DurableTask], now: datetime) -> float:
    downstream = [t for t in all_tasks if str(task.id) in [str(d) for d in t.depends_on]]
    if not downstream:
        return 0.0
    return min(100.0, sum(urgency_score(t, now) for t in downstream) / len(downstream))


def _effort_eff(task: DurableTask, impact: float) -> float:
    if not task.estimated_hours:
        return 50.0
    return min(100.0, (impact / task.estimated_hours) * 5.0)


def score_task(task: DurableTask, all_tasks: list[DurableTask], now: datetime) -> PriorityScore:
    impact = _impact(task)
    return compute_score(
        urgency=urgency_score(task, now),
        impact=impact,
        dependency_unblock=_dep_score(task, all_tasks, now),
        effort_efficiency=_effort_eff(task, impact),
        staleness=staleness_score(task, now),
    )


# ── Pass 1: deterministic ─────────────────────────────────────────────────────

def pass1(tasks: list[DurableTask]) -> list[tuple[DurableTask, PriorityScore]]:
    now = datetime.now(timezone.utc)
    eligible = [t for t in tasks if t.state in (TaskState.PENDING, TaskState.BLOCKED)]
    scored = [(t, score_task(t, tasks, now)) for t in eligible]
    scored.sort(key=lambda x: x[1].total, reverse=True)
    return scored


# ── Pass 2: optional LLM rerank (top-5 slots) ────────────────────────────────

def pass2(
    ranked:  list[tuple[DurableTask, PriorityScore]],
    query:   str,
    model:   str,
    top:     int,
) -> tuple[list[tuple[DurableTask, PriorityScore]], int]:
    from anthropic import Anthropic  # lazy import — pass 1 has no Anthropic dep
    client = Anthropic()  # picks up CLAUDE_CODE_OAUTH_TOKEN; ANTHROPIC_API_KEY forbidden

    candidates = ranked[:min(20, len(ranked))]
    listing = "\n".join(
        f'{t.id}: [score={s.total}] {t.subject}'
        for t, s in candidates
    )
    n_top = min(5, top)

    resp = client.messages.create(
        model=model,
        max_tokens=500,
        messages=[
            {
                "role": "user",
                "content": (
                    f"Context: {query or 'knowledge-engineering cowork/ weekly prioritization'}\n\n"
                    f"Tasks (id: description):\n{listing}\n\n"
                    f"Return the {n_top} highest-priority task IDs in order, as a JSON array."
                ),
            },
            {"role": "assistant", "content": '["'},  # prefill
        ],
        stop_sequences=['"]'],
    )
    raw    = '["' + resp.content[0].text + '"]'
    ids    = json.loads(raw)
    tokens = resp.usage.input_tokens + resp.usage.output_tokens

    by_id  = {str(t.id): (t, s) for t, s in candidates}
    llm_top = [by_id[i] for i in ids[:n_top] if i in by_id]
    llm_ids = {str(t.id) for t, _ in llm_top}
    rest    = [(t, s) for t, s in ranked if str(t.id) not in llm_ids]

    return llm_top + rest, tokens


# ── Output formatters ─────────────────────────────────────────────────────────

def print_table(ranked: list[tuple[DurableTask, PriorityScore]], top: int) -> None:
    print(f"\n{'#':>3}  {'SCORE':>6}  {'STATE':13}  {'DOMAIN':20}  SUBJECT")
    print("─" * 90)
    for i, (task, score) in enumerate(ranked[:top], 1):
        domain = (task.domain.value if task.domain else "—").ljust(20)
        state  = task.state.value.ljust(13)
        print(f"{i:>3}  {score.total:>6.1f}  {state}  {domain}  {task.subject[:50]}")
        print(f"     u={score.urgency:.0f} i={score.impact:.0f} d={score.dependency_unblock:.0f} "
              f"e={score.effort_efficiency:.0f} s={score.staleness:.0f}")


def emit_jsonl(ranked: list[tuple[DurableTask, PriorityScore]], top: int) -> None:
    for rank, (task, score) in enumerate(ranked[:top], 1):
        row = task.model_dump(mode="json")
        row["rank"]           = rank
        row["priority_score"] = score.model_dump()
        print(json.dumps(row))


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description="Rerank durable tasks by priority")
    parser.add_argument("--top",   type=int, default=10,                                help="Number of tasks to return")
    parser.add_argument("--llm",   action="store_true",                                  help="Enable LLM rerank pass (requires Anthropic OAuth)")
    parser.add_argument("--model", default="claude-haiku-4-5-20251001",                  help="Model for LLM pass")
    parser.add_argument("--query", default="",                                           help="Context for LLM rerank")
    parser.add_argument("--jsonl", action="store_true",                                  help="Emit JSONL output instead of table")
    parser.add_argument("--file",  default="-",                                          help="Input JSONL file (default: stdin)")
    args = parser.parse_args()

    # Read tasks
    if args.file == "-":
        lines = sys.stdin.read().splitlines()
    else:
        with open(args.file) as f:
            lines = f.read().splitlines()

    tasks: list[DurableTask] = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        tasks.append(DurableTask.model_validate(json.loads(line)))

    if not tasks:
        # Emit sample tasks for smoke test
        from uuid import uuid4
        now_iso = datetime.now(timezone.utc).isoformat()
        tasks = [
            DurableTask(id=uuid4(), subject="Schedule Wednesday metrics-review task", state=TaskState.PENDING,
                        domain=Domain.PRODUCT_MANAGEMENT, ke_fit_score=5, estimated_hours=0.5,
                        due_date="2026-06-25T10:00:00Z", created_at=now_iso, updated_at=now_iso),
            DurableTask(id=uuid4(), subject="Install analytics template", state=TaskState.PENDING,
                        domain=Domain.DATA, ke_fit_score=5, estimated_hours=2,
                        created_at=now_iso, updated_at=now_iso),
            DurableTask(id=uuid4(), subject="Customize data:build-dashboard skill", state=TaskState.PENDING,
                        domain=Domain.DATA, ke_fit_score=3, estimated_hours=3,
                        created_at=now_iso, updated_at=now_iso),
            DurableTask(id=uuid4(), subject="Add vendor count to CLAUDE.md", state=TaskState.PENDING,
                        domain=Domain.ENGINEERING, ke_fit_score=2, estimated_hours=0.25,
                        created_at=now_iso, updated_at=now_iso),
            DurableTask(id=uuid4(), subject="Install plan template", state=TaskState.PENDING,
                        domain=Domain.PRODUCT_MANAGEMENT, ke_fit_score=5, estimated_hours=1,
                        due_date="2026-06-25T10:00:00Z", created_at=now_iso, updated_at=now_iso),
        ]
        print(f"(no input — using {len(tasks)} sample tasks)", file=sys.stderr)

    t0     = time.monotonic()
    ranked = pass1(tasks)
    method = "score"
    tokens: int | None = None

    if args.llm and ranked:
        ranked, tokens = pass2(ranked, args.query, args.model, args.top)
        method = "llm"

    elapsed_ms = int((time.monotonic() - t0) * 1000)

    if args.jsonl:
        emit_jsonl(ranked, args.top)
    else:
        print_table(ranked, args.top)
        print(f"\ntotal: {len(tasks)} tasks · ranked: {min(args.top, len(ranked))} "
              f"· method: {method} · {elapsed_ms}ms", end="")
        if tokens:
            print(f" · {tokens} tokens", end="")
        print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
