"""
Tests for cowork/scripts/dispatch.py — DurableTask dispatch to queue + mailbox.

@cite cowork/scripts/dispatch.py
@cite cowork/templates/task-state-machine.ts
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import pytest

SCRIPT = Path(__file__).parent / "dispatch.py"
REPO_ROOT = Path(__file__).parent.parent.parent


def run_dispatch(tmp_path: Path, **kwargs: str) -> tuple[int, str, str]:
    args = [sys.executable, str(SCRIPT)]
    for k, v in kwargs.items():
        args.extend([f"--{k}", v])
    result = subprocess.run(
        args,
        capture_output=True,
        text=True,
        env={
            "PATH": "",
            "PYTHONPATH": "",
        },
        cwd=str(tmp_path),
    )
    return result.returncode, result.stdout, result.stderr


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text().strip().split("\n") if line.strip()]


class TestDispatch:
    def test_creates_queue_and_mailbox_files(self, tmp_path):
        (tmp_path / "cowork" / "data" / "queues").mkdir(parents=True)
        (tmp_path / "cowork" / "data" / "mailbox").mkdir(parents=True)
        rc, out, err = run_dispatch(tmp_path, queue="engineering", subject="Test task")
        assert rc == 0
        assert "dispatched" in out

        queue_file = tmp_path / "cowork" / "data" / "queues" / "engineering.jsonl"
        assert queue_file.exists()
        tasks = read_jsonl(queue_file)
        assert len(tasks) == 1
        assert tasks[0]["_type"] == "task"
        assert tasks[0]["queue"] == "engineering"
        assert tasks[0]["subject"] == "Test task"
        assert tasks[0]["state"] == "pending"

        mailbox_file = tmp_path / "cowork" / "data" / "mailbox" / "engineering-coworker.jsonl"
        assert mailbox_file.exists()
        msgs = read_jsonl(mailbox_file)
        assert len(msgs) == 1
        assert msgs[0]["_type"] == "message"
        assert msgs[0]["task_id"] == tasks[0]["id"]

    def test_ke_fit_score_included(self, tmp_path):
        rc, _, _ = run_dispatch(tmp_path, queue="design", subject="Design audit", ke="4")
        assert rc == 0
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "design.jsonl")
        assert tasks[0]["ke_fit_score"] == 4

    def test_ke_fit_score_omitted_by_default(self, tmp_path):
        rc, _, _ = run_dispatch(tmp_path, queue="design", subject="No KE")
        assert rc == 0
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "design.jsonl")
        assert "ke_fit_score" not in tasks[0]

    def test_payload_json_included(self, tmp_path):
        payload = '{"key": "value", "count": 42}'
        rc, _, _ = run_dispatch(tmp_path, queue="data", subject="With payload", payload=payload)
        assert rc == 0
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "data.jsonl")
        assert tasks[0]["payload"] == {"key": "value", "count": 42}

    def test_invalid_payload_exits_1(self, tmp_path):
        rc, _, err = run_dispatch(tmp_path, queue="data", subject="Bad payload", payload="not json{")
        assert rc == 1
        assert "invalid" in err.lower() or "json" in err.lower()

    def test_custom_sender(self, tmp_path):
        run_dispatch(tmp_path, **{"queue": "legal", "subject": "From ops", "from": "operations-coworker"})
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "legal.jsonl")
        assert tasks[0]["from"] == "operations-coworker"

    def test_default_sender_is_pm(self, tmp_path):
        run_dispatch(tmp_path, queue="finance", subject="Default sender")
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "finance.jsonl")
        assert tasks[0]["from"] == "product-management-coworker"

    def test_task_id_is_uuid(self, tmp_path):
        run_dispatch(tmp_path, queue="engineering", subject="UUID check")
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "engineering.jsonl")
        import uuid
        uuid.UUID(tasks[0]["id"])

    def test_multiple_dispatches_append(self, tmp_path):
        run_dispatch(tmp_path, queue="engineering", subject="Task 1")
        run_dispatch(tmp_path, queue="engineering", subject="Task 2")
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "engineering.jsonl")
        assert len(tasks) == 2
        assert tasks[0]["subject"] == "Task 1"
        assert tasks[1]["subject"] == "Task 2"

    def test_timestamps_are_iso8601(self, tmp_path):
        run_dispatch(tmp_path, queue="operations", subject="Timestamp check")
        tasks = read_jsonl(tmp_path / "cowork" / "data" / "queues" / "operations.jsonl")
        from datetime import datetime
        datetime.strptime(tasks[0]["created_at"], "%Y-%m-%dT%H:%M:%SZ")
        datetime.strptime(tasks[0]["updated_at"], "%Y-%m-%dT%H:%M:%SZ")

    def test_missing_queue_exits_nonzero(self, tmp_path):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--subject", "no queue"],
            capture_output=True, text=True, cwd=str(tmp_path),
        )
        assert result.returncode != 0


class TestDomainToMailbox:
    def test_all_12_domains_mapped(self):
        sys.path.insert(0, str(SCRIPT.parent))
        try:
            from dispatch import DOMAIN_TO_MAILBOX
        finally:
            sys.path.pop(0)
        expected_domains = {
            "product-management", "engineering", "design", "data", "sales",
            "finance", "operations", "legal", "marketing", "agent-resources",
            "human-resources", "project-management",
        }
        assert set(DOMAIN_TO_MAILBOX.keys()) == expected_domains
        for domain, mailbox_id in DOMAIN_TO_MAILBOX.items():
            assert mailbox_id.endswith("-coworker"), f"{domain} mailbox should end with -coworker"
