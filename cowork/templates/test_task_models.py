"""
Tests for cowork/templates/task-models.py — Pydantic mirror of task-state-machine.ts.

@cite cowork/templates/task-models.py
@cite cowork/templates/task-state-machine.ts
"""
from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

import pytest
from pydantic import ValidationError

# task-models.py uses PEP 723 inline metadata; import from the module directly
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from importlib import import_module

tm = import_module("task-models")

TaskState = tm.TaskState
DurableTask = tm.DurableTask
PriorityScore = tm.PriorityScore
compute_score = tm.compute_score
transition = tm.transition
urgency_score = tm.urgency_score
staleness_score = tm.staleness_score

NOW_ISO = datetime.now(timezone.utc).isoformat()


def make(state=TaskState.PENDING, **kw) -> DurableTask:
    return DurableTask(
        id=uuid4(), subject="test task", state=state,
        created_at=NOW_ISO, updated_at=NOW_ISO, **kw,
    )


class TestTaskState:
    def test_all_states_exist(self):
        assert set(s.value for s in TaskState) == {
            "pending", "in_progress", "blocked", "completed", "failed",
        }


class TestDurableTask:
    def test_defaults(self):
        t = make()
        assert t.queue == "cowork"
        assert t.state == TaskState.PENDING
        assert t.depends_on == []
        assert t.blocks == []

    def test_ke_fit_score_bounds(self):
        make(ke_fit_score=1)
        make(ke_fit_score=5)
        with pytest.raises(ValidationError):
            make(ke_fit_score=0)
        with pytest.raises(ValidationError):
            make(ke_fit_score=6)

    def test_jira_key_format(self):
        t = make(jira_key="KAN-123")
        assert t.jira_key == "KAN-123"
        with pytest.raises(ValidationError):
            make(jira_key="bad-key")
        with pytest.raises(ValidationError):
            make(jira_key="123")

    def test_estimated_hours_positive(self):
        make(estimated_hours=0.5)
        with pytest.raises(ValidationError):
            make(estimated_hours=0)
        with pytest.raises(ValidationError):
            make(estimated_hours=-1)


class TestTransition:
    def test_claim_pending_to_in_progress(self):
        t = transition(make(), "claim", owner="eng-coworker")
        assert t.state == TaskState.IN_PROGRESS
        assert t.owner == "eng-coworker"

    def test_complete_in_progress(self):
        t = transition(make(TaskState.IN_PROGRESS), "complete", result={"ok": True})
        assert t.state == TaskState.COMPLETED
        assert t.result == {"ok": True}

    def test_block_in_progress(self):
        t = transition(make(TaskState.IN_PROGRESS), "block", reason="waiting")
        assert t.state == TaskState.BLOCKED
        assert t.error == "waiting"

    def test_unblock_blocked(self):
        t = transition(make(TaskState.BLOCKED), "unblock")
        assert t.state == TaskState.IN_PROGRESS

    def test_fail_in_progress(self):
        t = transition(make(TaskState.IN_PROGRESS), "fail", error="timeout")
        assert t.state == TaskState.FAILED
        assert t.error == "timeout"

    def test_retry_failed_to_pending(self):
        t = transition(make(TaskState.FAILED, error="old"), "retry")
        assert t.state == TaskState.PENDING
        assert t.error is None
        assert t.owner is None

    def test_illegal_complete_from_pending(self):
        with pytest.raises(ValueError, match="illegal"):
            transition(make(), "complete")

    def test_illegal_claim_from_completed(self):
        with pytest.raises(ValueError, match="illegal"):
            transition(make(TaskState.COMPLETED), "claim", owner="x")

    def test_unknown_event(self):
        with pytest.raises(ValueError, match="unknown event"):
            transition(make(), "explode")

    def test_transition_immutable(self):
        original = make()
        transitioned = transition(original, "claim", owner="x")
        assert original.state == TaskState.PENDING
        assert transitioned.state == TaskState.IN_PROGRESS


class TestComputeScore:
    def test_all_zeros(self):
        s = compute_score(0, 0, 0, 0, 0)
        assert s.total == 0

    def test_all_100s(self):
        s = compute_score(100, 100, 100, 100, 100)
        assert s.total == 100

    def test_weights_sum(self):
        s = compute_score(50, 50, 50, 50, 50)
        assert s.total == 50

    def test_urgency_only(self):
        s = compute_score(100, 0, 0, 0, 0)
        assert s.total == 30

    def test_frozen(self):
        s = compute_score(50, 50, 50, 50, 50)
        with pytest.raises(ValidationError):
            s.total = 99


class TestUrgencyScore:
    def test_no_due_date(self):
        assert urgency_score(make()) == 30.0

    def test_overdue(self):
        assert urgency_score(make(due_date="2020-01-01T00:00:00Z")) == 100.0

    def test_far_future(self):
        assert urgency_score(make(due_date="2030-01-01T00:00:00Z")) == 20.0


class TestStalenessScore:
    def test_just_updated(self):
        now = datetime.now(timezone.utc)
        t = make()
        t = t.model_copy(update={"updated_at": now})
        assert staleness_score(t, now) == 0.0

    def test_capped_at_100(self):
        now = datetime(2026, 6, 22, tzinfo=timezone.utc)
        t = make()
        t = t.model_copy(update={"updated_at": datetime(2026, 5, 1, tzinfo=timezone.utc)})
        assert staleness_score(t, now) == 100.0
