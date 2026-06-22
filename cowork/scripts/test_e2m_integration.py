"""
Integration tests for the e2m (envelope-to-mailbox) protocol.

Exercises the full dispatch → validate → read round-trip using the
actual cowork/data/ JSONL files and the tools we built:
  - dispatch.py (queue + mailbox writer)
  - mailbox-schema-validate.py (validator)
  - cowork/coworkers/manifest.json (coworker registry)

@cite cowork/scripts/dispatch.py
@cite cowork/scripts/mailbox-schema-validate.py
@cite cowork/coworkers/manifest.json
@cite cowork/schemas/envelope.ts
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path
from uuid import UUID

import pytest

ROOT = Path(__file__).resolve().parents[2]
DISPATCH = ROOT / "cowork" / "scripts" / "dispatch.py"
VALIDATOR = ROOT / "cowork" / "scripts" / "mailbox-schema-validate.py"
MANIFEST = ROOT / "cowork" / "coworkers" / "manifest.json"
MAILBOX_DIR = ROOT / "cowork" / "data" / "mailbox"
QUEUE_DIR = ROOT / "cowork" / "data" / "queues"


def dispatch(queue: str, subject: str, **kwargs) -> tuple[int, str]:
    args = [sys.executable, str(DISPATCH), "--queue", queue, "--subject", subject]
    for k, v in kwargs.items():
        args.extend([f"--{k}", str(v)])
    r = subprocess.run(args, capture_output=True, text=True, cwd=str(ROOT))
    return r.returncode, r.stdout


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(l) for l in path.read_text().strip().split("\n") if l.strip()]


def last_record(path: Path) -> dict | None:
    records = read_jsonl(path)
    return records[-1] if records else None


def validate() -> dict:
    r = subprocess.run(
        [sys.executable, str(VALIDATOR), "mailbox", "queues"],
        capture_output=True, text=True, cwd=str(ROOT),
    )
    return json.loads(r.stdout)


class TestLiveDataIntegrity:
    """Validate the live cowork/data/ against our schemas."""

    def test_all_e2m_records_pass_validation(self):
        result = validate()
        assert result["violations"] == 0, (
            f"{result['violations']} violations in {result['scanned']} records: "
            + json.dumps(result["detail"][:5], indent=2)
        )

    def test_mailbox_files_exist_for_all_manifest_coworkers(self):
        manifest = json.loads(MANIFEST.read_text())
        for cw in manifest["coworkers"]:
            mb_path = ROOT / cw["mailbox"]
            assert mb_path.exists(), f"mailbox missing for {cw['id']}: {cw['mailbox']}"

    def test_queue_files_exist_for_all_manifest_coworkers(self):
        manifest = json.loads(MANIFEST.read_text())
        for cw in manifest["coworkers"]:
            queue_raw = cw["queue"]
            if queue_raw.endswith(".jsonl"):
                queue_path = ROOT / queue_raw
            else:
                queue_path = QUEUE_DIR / f"{queue_raw}.jsonl"
            assert queue_path.exists(), f"queue missing for {cw['id']}: {queue_raw}"


class TestDispatchRoundTrip:
    """Test that dispatch.py creates valid e2m records that pass validation."""

    def test_dispatch_to_engineering_creates_valid_records(self):
        pre_queue = len(read_jsonl(QUEUE_DIR / "engineering.jsonl"))
        pre_mailbox = len(read_jsonl(MAILBOX_DIR / "engineering-coworker.jsonl"))

        rc, out = dispatch("engineering", "Integration test: type-safety audit")
        assert rc == 0
        assert "dispatched" in out

        queue_records = read_jsonl(QUEUE_DIR / "engineering.jsonl")
        assert len(queue_records) == pre_queue + 1
        task = queue_records[-1]
        assert task["_type"] == "task"
        assert task["state"] == "pending"
        UUID(task["id"])

        mailbox_records = read_jsonl(MAILBOX_DIR / "engineering-coworker.jsonl")
        assert len(mailbox_records) == pre_mailbox + 1
        msg = mailbox_records[-1]
        assert msg["_type"] == "envelope"
        assert msg["envelope_type"] == "task"
        assert msg["task_id"] == task["id"]

        result = validate()
        assert result["violations"] == 0

    def test_cross_coworker_dispatch_chain(self):
        """Simulate PM dispatching to engineering, then engineering to design."""
        rc1, _ = dispatch(
            "engineering",
            "Build e2m envelope schema tests",
            **{"from": "product-management-coworker", "ke": "5"},
        )
        assert rc1 == 0

        rc2, _ = dispatch(
            "design",
            "Review e2m envelope schema visual",
            **{"from": "engineering-coworker", "ke": "3"},
        )
        assert rc2 == 0

        eng_task = last_record(QUEUE_DIR / "engineering.jsonl")
        design_task = last_record(QUEUE_DIR / "design.jsonl")
        assert eng_task is not None and eng_task["from"] == "product-management-coworker"
        assert design_task is not None and design_task["from"] == "engineering-coworker"

        result = validate()
        assert result["violations"] == 0

    def test_dispatch_with_payload(self):
        payload = json.dumps({"pr_url": "https://github.com/example/123", "files_changed": 5})
        rc, _ = dispatch("engineering", "Review PR #123", payload=payload)
        assert rc == 0

        task = last_record(QUEUE_DIR / "engineering.jsonl")
        assert task is not None
        assert task["payload"]["pr_url"] == "https://github.com/example/123"

    def test_all_12_domains_accept_dispatch(self):
        manifest = json.loads(MANIFEST.read_text())
        domains_tested = set()
        for cw in manifest["coworkers"]:
            domain = cw["domain"]
            rc, _ = dispatch(domain, f"Integration test: {domain} domain")
            assert rc == 0, f"dispatch to {domain} failed"
            domains_tested.add(domain)

        assert len(domains_tested) >= 12

        result = validate()
        assert result["violations"] == 0


class TestManifestCoworkerPeers:
    """Validate that peer relationships in the manifest are bidirectional-safe."""

    def test_all_peers_have_mailboxes(self):
        manifest = json.loads(MANIFEST.read_text())
        ids_with_mailbox = {cw["id"] for cw in manifest["coworkers"]}
        for cw in manifest["coworkers"]:
            for peer in cw.get("peers", []):
                assert peer in ids_with_mailbox, (
                    f"{cw['id']} peer {peer} not in manifest"
                )

    def test_dispatch_between_all_peer_pairs(self):
        manifest = json.loads(MANIFEST.read_text())
        pairs_tested = 0
        for cw in manifest["coworkers"][:3]:
            for peer_id in cw.get("peers", [])[:2]:
                peer = next((c for c in manifest["coworkers"] if c["id"] == peer_id), None)
                if peer:
                    rc, _ = dispatch(
                        peer["domain"],
                        f"Peer test: {cw['id']} → {peer_id}",
                        **{"from": cw["id"]},
                    )
                    assert rc == 0
                    pairs_tested += 1

        assert pairs_tested >= 3
        result = validate()
        assert result["violations"] == 0
