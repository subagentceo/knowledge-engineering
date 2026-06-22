"""
Tests for cowork/scripts/mailbox-schema-validate.py — e2m record validator.

@cite cowork/scripts/mailbox-schema-validate.py
@cite cowork/schemas/envelope.ts
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent))
mv = __import__("mailbox-schema-validate")
check_record = mv.check_record
scan = mv.scan


class TestCheckRecord:
    def test_valid_envelope(self):
        rec = {
            "_type": "envelope",
            "id": "e1",
            "envelope_type": "task",
            "from": "product-management-coworker",
            "to": "engineering-coworker",
            "subject": "Do work",
            "at": "2026-06-22T00:00:00Z",
            "state": "pending",
        }
        assert check_record(rec) == []

    def test_valid_task(self):
        rec = {
            "_type": "task",
            "id": "t1",
            "queue": "engineering",
            "subject": "Build it",
            "state": "pending",
            "created_at": "2026-06-22T00:00:00Z",
            "updated_at": "2026-06-22T00:00:00Z",
        }
        assert check_record(rec) == []

    def test_valid_transition(self):
        rec = {
            "_type": "transition",
            "id": "t1",
            "at": "2026-06-22T00:00:00Z",
        }
        assert check_record(rec) == []

    def test_missing_type(self):
        errs = check_record({"id": "x"})
        assert len(errs) == 1
        assert "_type" in errs[0]

    def test_unknown_type(self):
        errs = check_record({"_type": "bogus"})
        assert len(errs) == 1
        assert "unknown" in errs[0]

    def test_envelope_missing_fields(self):
        errs = check_record({"_type": "envelope", "id": "e1"})
        assert len(errs) >= 1
        assert "missing required fields" in errs[0]

    def test_envelope_bad_type(self):
        rec = {
            "_type": "envelope",
            "id": "e1",
            "envelope_type": "invalid_type",
            "from": "product-management-coworker",
            "to": "engineering-coworker",
            "subject": "x",
            "at": "now",
            "state": "pending",
        }
        errs = check_record(rec)
        assert any("envelope_type" in e for e in errs)

    def test_envelope_bad_state(self):
        rec = {
            "_type": "envelope",
            "id": "e1",
            "envelope_type": "task",
            "from": "product-management-coworker",
            "to": "engineering-coworker",
            "subject": "x",
            "at": "now",
            "state": "cancelled",
        }
        errs = check_record(rec)
        assert any("state" in e for e in errs)

    def test_task_bad_state(self):
        rec = {
            "_type": "task",
            "id": "t1",
            "queue": "engineering",
            "subject": "x",
            "state": "cancelled",
            "created_at": "now",
            "updated_at": "now",
        }
        errs = check_record(rec)
        assert any("state" in e for e in errs)

    def test_task_missing_queue(self):
        rec = {
            "_type": "task",
            "id": "t1",
            "subject": "x",
            "state": "pending",
            "created_at": "now",
            "updated_at": "now",
        }
        errs = check_record(rec)
        assert any("missing" in e for e in errs)


class TestScan:
    def test_clean_mailbox(self, tmp_path):
        d = tmp_path / "mailbox"
        d.mkdir()
        f = d / "test.jsonl"
        f.write_text(json.dumps({
            "_type": "envelope", "id": "e1", "envelope_type": "task",
            "from": "product-management-coworker", "to": "engineering-coworker", "subject": "ok", "at": "now", "state": "pending",
        }) + "\n")
        scanned, violations = scan([d])
        assert scanned == 1
        assert violations == []

    def test_invalid_json_line(self, tmp_path):
        d = tmp_path / "mailbox"
        d.mkdir()
        f = d / "test.jsonl"
        f.write_text("not json\n")
        scanned, violations = scan([d])
        assert scanned == 1
        assert len(violations) == 1
        assert "invalid JSON" in violations[0]["issues"][0]

    def test_violation_reported(self, tmp_path):
        d = tmp_path / "mailbox"
        d.mkdir()
        f = d / "test.jsonl"
        f.write_text(json.dumps({"_type": "envelope", "id": "e1"}) + "\n")
        scanned, violations = scan([d])
        assert len(violations) == 1
        assert "missing" in violations[0]["issues"][0]

    def test_multiple_records(self, tmp_path):
        d = tmp_path / "mailbox"
        d.mkdir()
        good = json.dumps({
            "_type": "transition", "id": "t1", "at": "now",
        })
        bad = json.dumps({"_type": "bogus"})
        (d / "test.jsonl").write_text(good + "\n" + bad + "\n")
        scanned, violations = scan([d])
        assert scanned == 2
        assert len(violations) == 1

    def test_empty_dir(self, tmp_path):
        d = tmp_path / "empty"
        d.mkdir()
        scanned, violations = scan([d])
        assert scanned == 0
        assert violations == []
