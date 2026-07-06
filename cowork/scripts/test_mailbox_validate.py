"""
Tests for cowork/scripts/mailbox-schema-validate.py — e2m record validator.

Also covers cowork/scripts/migrate-add-type.py's infer_type() and
migrate_file() (KAN-29 _type coverage regression guard, see
TestTypeCoverageRegression below).

@cite cowork/scripts/mailbox-schema-validate.py
@cite cowork/scripts/migrate-add-type.py
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
migrate = __import__("migrate-add-type")


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


class TestTypeCoverageRegression:
    """
    KAN-29 — regression guard for _type coverage (cowork/schemas/E2M-PROTOCOL.md
    "Open / next" item 3). Locks in two things so a future edit can't silently
    reopen the legacy missing-_type gap:
      1. check_record() flags a synthetic record with no _type at all.
      2. migrate-add-type.py's infer_type() correctly classifies both a
         queue-context task row and a mailbox-context envelope row that are
         each missing _type.
    """

    def test_synthetic_line_missing_type_is_flagged(self):
        # A legacy-shaped JSONL line as it would have looked before the
        # migration ran: task-like fields, but no _type discriminator.
        synthetic_legacy_line = json.dumps({
            "id": "legacy-t1",
            "queue": "engineering",
            "subject": "pre-migration task row",
            "state": "pending",
            "created_at": "2026-06-01T00:00:00Z",
            "updated_at": "2026-06-01T00:00:00Z",
        })
        rec = json.loads(synthetic_legacy_line)
        errs = check_record(rec)
        assert len(errs) == 1
        assert "_type" in errs[0]

    def test_infer_type_queue_context_task_row(self):
        # Queue-context (cowork/data/queues/*.jsonl): a bare task-shaped row
        # missing _type must infer to "task", never "envelope".
        rec = {
            "id": "legacy-t2",
            "queue": "data",
            "subject": "queue row missing _type",
            "state": "in_progress",
            "created_at": "2026-06-02T00:00:00Z",
            "updated_at": "2026-06-02T00:00:00Z",
        }
        assert migrate.infer_type(rec, is_queue=True) == "task"

    def test_infer_type_mailbox_context_envelope_row(self):
        # Mailbox-context (cowork/data/mailbox/*.jsonl): a bare envelope-shaped
        # row missing _type must infer to "envelope", never "task".
        rec = {
            "id": "legacy-e1",
            "from": "product-management-coworker",
            "to": "engineering-coworker",
            "subject": "mailbox row missing _type",
        }
        assert migrate.infer_type(rec, is_queue=False) == "envelope"

    def test_infer_type_queue_transition_row(self):
        # Transition signal (event) takes priority over the is_queue default,
        # even in queue context.
        rec = {
            "id": "legacy-t3",
            "event": "claim",
            "prior_state": "pending",
            "new_state": "in_progress",
        }
        assert migrate.infer_type(rec, is_queue=True) == "transition"

    def test_infer_type_mailbox_ack_transition_row(self):
        # status=="acked" is a transition signal in mailbox context too.
        rec = {
            "id": "legacy-e2",
            "status": "acked",
            "acked_by": "engineering-coworker",
        }
        assert migrate.infer_type(rec, is_queue=False) == "transition"

    def test_migrate_file_patches_and_validates_synthetic_fixture(self, tmp_path):
        # End-to-end: write a synthetic missing-_type queue file, run
        # migrate_file, confirm the patched record now passes check_record.
        d = tmp_path / "queues"
        d.mkdir()
        f = d / "engineering.jsonl"
        f.write_text(json.dumps({
            "id": "legacy-t4",
            "queue": "engineering",
            "subject": "fixture row",
            "state": "pending",
            "created_at": "2026-06-03T00:00:00Z",
            "updated_at": "2026-06-03T00:00:00Z",
        }) + "\n")

        total, fixed, errors = migrate.migrate_file(f, is_queue=True, dry_run=False)
        assert total == 1
        assert fixed == 1
        assert errors == 0

        patched = json.loads(f.read_text().strip())
        assert patched["_type"] == "task"
        assert check_record(patched) == []
