# /// script
# requires-python = ">=3.12"
# dependencies = ["pydantic>=2.7"]
# ///
"""T5 — Pydantic mirror of cowork/templates/task-state-machine.ts.

@cite cowork/templates/task-state-machine.ts  (canonical Zod schema)
@cite src/agent/cowork/team_models.py         (upstream subagent mirror)
@cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md

Run directly (no install needed):
    uv run cowork/templates/task-models.py
Or as a library:
    from cowork.templates.task_models import DurableTask, TaskState, transition
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from enum import Enum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field, field_validator, model_validator

_JIRA_RE = re.compile(r"^[A-Z]+-\d+$")


# ── Enums ─────────────────────────────────────────────────────────────────────

class TaskState(str, Enum):
    PENDING     = "pending"
    IN_PROGRESS = "in_progress"
    BLOCKED     = "blocked"
    COMPLETED   = "completed"
    FAILED      = "failed"


class Domain(str, Enum):
    PRODUCT_MANAGEMENT = "product-management"
    DATA               = "data"
    ENGINEERING        = "engineering"
    DESIGN             = "design"


# ── Priority score ─────────────────────────────────────────────────────────────

class PriorityScore(BaseModel):
    urgency:            float = Field(ge=0, le=100)
    impact:             float = Field(ge=0, le=100)
    dependency_unblock: float = Field(ge=0, le=100)
    effort_efficiency:  float = Field(ge=0, le=100)
    staleness:          float = Field(ge=0, le=100)
    total:              float = Field(ge=0, le=100)

    model_config = {"frozen": True}


_WEIGHTS = {
    "urgency":            0.30,
    "impact":             0.25,
    "dependency_unblock": 0.20,
    "effort_efficiency":  0.15,
    "staleness":          0.10,
}


def compute_score(
    urgency:            float,
    impact:             float,
    dependency_unblock: float,
    effort_efficiency:  float,
    staleness:          float,
) -> PriorityScore:
    total = (
        urgency            * _WEIGHTS["urgency"] +
        impact             * _WEIGHTS["impact"] +
        dependency_unblock * _WEIGHTS["dependency_unblock"] +
        effort_efficiency  * _WEIGHTS["effort_efficiency"] +
        staleness          * _WEIGHTS["staleness"]
    )
    return PriorityScore(
        urgency=round(urgency, 1),
        impact=round(impact, 1),
        dependency_unblock=round(dependency_unblock, 1),
        effort_efficiency=round(effort_efficiency, 1),
        staleness=round(staleness, 1),
        total=round(total, 1),
    )


# ── DurableTask (field-for-field mirror of task-state-machine.ts) ─────────────

class DurableTask(BaseModel):
    id:              UUID
    queue:           str                  = "cowork"
    subject:         str
    description:     str | None           = None
    state:           TaskState            = TaskState.PENDING
    owner:           str | None           = None
    depends_on:      list[UUID]           = Field(default_factory=list)
    blocks:          list[UUID]           = Field(default_factory=list)
    domain:          Domain | None        = None
    ke_fit_score:    int | None           = Field(default=None, ge=1, le=5)
    estimated_hours: float | None         = Field(default=None, gt=0)
    due_date:        str | None           = None   # ISO-8601 date
    jira_key:        str | None           = None
    priority_score:  PriorityScore | None = None
    created_at:      datetime
    updated_at:      datetime
    result:          dict[str, Any] | None = None
    error:           str | None            = None

    model_config = {"populate_by_name": True}

    @field_validator("jira_key")
    @classmethod
    def _jira(cls, v: str | None) -> str | None:
        if v and not _JIRA_RE.match(v):
            raise ValueError(f"jira_key must match [A-Z]+-\\d+, got {v!r}")
        return v


# ── Urgency + staleness helpers ────────────────────────────────────────────────

def urgency_score(task: DurableTask, now: datetime | None = None) -> float:
    now = now or datetime.now(timezone.utc)
    if not task.due_date:
        return 30.0
    try:
        due = datetime.fromisoformat(task.due_date)
    except ValueError:
        return 30.0
    if due.tzinfo is None:
        due = due.replace(tzinfo=timezone.utc)
    days_left = (due - now).total_seconds() / 86_400
    if days_left < 0:   return 100.0
    if days_left < 1:   return 95.0
    if days_left < 3:   return 80.0
    if days_left < 7:   return 60.0
    if days_left < 14:  return 40.0
    return 20.0


def staleness_score(task: DurableTask, now: datetime | None = None) -> float:
    now = now or datetime.now(timezone.utc)
    updated = task.updated_at
    if updated.tzinfo is None:
        updated = updated.replace(tzinfo=timezone.utc)
    days = (now - updated).total_seconds() / 86_400
    return min(100.0, days * 5.0)


# ── State machine transition ───────────────────────────────────────────────────

_TRANSITIONS: dict[str, dict] = {
    "claim":    {"from": [TaskState.PENDING],      "to": TaskState.IN_PROGRESS},
    "complete": {"from": [TaskState.IN_PROGRESS],  "to": TaskState.COMPLETED},
    "block":    {"from": [TaskState.IN_PROGRESS],  "to": TaskState.BLOCKED},
    "unblock":  {"from": [TaskState.BLOCKED],      "to": TaskState.IN_PROGRESS},
    "fail":     {"from": [TaskState.IN_PROGRESS],  "to": TaskState.FAILED},
    "retry":    {"from": [TaskState.FAILED],       "to": TaskState.PENDING},
}


def transition(task: DurableTask, event: str, **kwargs: Any) -> DurableTask:
    t = _TRANSITIONS.get(event)
    if not t:
        raise ValueError(f"unknown event: {event!r}")
    if task.state not in t["from"]:
        allowed = [s.value for s in t["from"]]
        raise ValueError(f"illegal: {task.state.value} --{event}-- (allowed from: {allowed})")
    now = datetime.now(timezone.utc)
    patch: dict[str, Any] = {"state": t["to"], "updated_at": now}
    if event == "claim":
        patch["owner"] = kwargs.get("owner")
    elif event == "complete":
        patch["result"] = kwargs.get("result")
    elif event in ("block", "fail"):
        patch["error"] = kwargs.get("reason") or kwargs.get("error")
    elif event == "retry":
        patch["error"] = None
        patch["owner"] = None
    return task.model_copy(update=patch)


# ── Self-test ─────────────────────────────────────────────────────────────────

def _self_test() -> int:
    passed = failed = 0

    def check(name: str, fn) -> None:
        nonlocal passed, failed
        try:
            fn()
            passed += 1
            print(f"  PASS {name}")
        except Exception as exc:
            failed += 1
            print(f"  FAIL {name}: {exc}")

    now_iso = datetime.now(timezone.utc).isoformat()

    def make(state=TaskState.PENDING, **kw) -> DurableTask:
        from uuid import uuid4
        return DurableTask(
            id=uuid4(), subject="test", state=state,
            created_at=now_iso, updated_at=now_iso, **kw
        )

    check("claim pending → in_progress", lambda: transition(make(), "claim", owner="agent-1"))
    check("complete in_progress → completed", lambda: transition(make(TaskState.IN_PROGRESS), "complete"))
    check("block in_progress → blocked",   lambda: transition(make(TaskState.IN_PROGRESS), "block", reason="dep missing"))
    check("retry failed → pending",        lambda: transition(make(TaskState.FAILED), "retry"))
    check("illegal: complete pending",
          lambda: _expect_raises(lambda: transition(make(), "complete")))
    check("jira_key validated",
          lambda: _expect_raises(lambda: make(jira_key="bad")))
    check("ke_fit_score bounds",
          lambda: _expect_raises(lambda: make(ke_fit_score=6)))
    check("priority score compute",
          lambda: compute_score(80, 60, 40, 50, 30))
    check("urgency overdue → 100",
          lambda: _assert(urgency_score(make(due_date="2020-01-01T00:00:00Z")) == 100.0, "overdue not 100"))
    check("staleness 20 days → 100",
          lambda: _assert(
              staleness_score(
                  make(due_date=None).model_copy(update={"updated_at": datetime(2026, 5, 29, tzinfo=timezone.utc)})
              ) == 100.0,
              "staleness capped at 100"
          ))

    print(f"\n{passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


def _expect_raises(fn) -> None:
    try:
        fn()
    except Exception:
        return
    raise AssertionError("expected a validation error")


def _assert(cond: bool, msg: str) -> None:
    if not cond:
        raise AssertionError(msg)


if __name__ == "__main__":
    raise SystemExit(_self_test())
