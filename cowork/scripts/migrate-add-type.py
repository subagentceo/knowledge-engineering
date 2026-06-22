#!/usr/bin/env python3
"""
migrate-add-type.py — add missing _type field to legacy e2m records.

Infers _type from file location and record shape:
  - queue files (cowork/data/queues/*.jsonl):
    - has "event" or "prior_state" or "new_state" → _type: "transition"
    - else → _type: "task"
  - mailbox files (cowork/data/mailbox/*.jsonl):
    - has "event" or "prior_state" or "new_state" or "status"=="read"/"acked" → _type: "transition"
    - _type: "message" → rewrite to _type: "envelope"
    - else → _type: "envelope"

Uses mailbox-schema-validate.check_record to verify each patched record.

@cite cowork/scripts/mailbox-schema-validate.py
@cite cowork/schemas/envelope.ts
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAILBOX_DIR = ROOT / "cowork" / "data" / "mailbox"
QUEUE_DIR = ROOT / "cowork" / "data" / "queues"

sys.path.insert(0, str(Path(__file__).parent))
validator = __import__("mailbox-schema-validate")


TRANSITION_SIGNALS = {"event", "prior_state", "new_state", "acked_by", "read_by"}
TASK_REQUIRED = {"id", "queue", "subject", "state"}
ENVELOPE_REQUIRED = {"id", "from", "to", "subject"}


def infer_type(rec: dict, is_queue: bool) -> str:
    if rec.get("_type") == "message":
        rec.setdefault("envelope_type", "task")
        return "envelope"

    keys = set(rec.keys())
    if keys & TRANSITION_SIGNALS:
        status = rec.get("status", "")
        if status in ("read", "acked"):
            return "transition"
        if rec.get("event") in ("claim", "complete", "block", "unblock", "fail", "retry", "ack", "read"):
            return "transition"

    if is_queue:
        return "task"

    if ENVELOPE_REQUIRED <= keys:
        return "envelope"

    return "task" if is_queue else "envelope"


def migrate_file(path: Path, is_queue: bool, dry_run: bool) -> tuple[int, int, int]:
    if not path.exists():
        return 0, 0, 0

    lines = path.read_text().strip().splitlines()
    if not lines:
        return 0, 0, 0

    total = fixed = errors = 0
    output = []

    for i, line in enumerate(lines):
        if not line.strip():
            output.append(line)
            continue
        total += 1
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            output.append(line)
            errors += 1
            continue

        if not rec.get("_type"):
            rec["_type"] = infer_type(rec, is_queue)
            fixed += 1
        elif rec["_type"] == "message":
            rec["_type"] = "envelope"
            fixed += 1

        errs = validator.check_record(rec)
        if errs:
            rec.setdefault("_migration_warnings", errs)

        output.append(json.dumps(rec, separators=(",", ":")))

    if not dry_run and fixed > 0:
        path.write_text("\n".join(output) + "\n")

    return total, fixed, errors


def main():
    dry_run = "--dry-run" in sys.argv
    total_all = fixed_all = errors_all = 0

    for d, is_queue in [(QUEUE_DIR, True), (MAILBOX_DIR, False)]:
        for f in sorted(d.glob("*.jsonl")):
            if ".bak" in f.name:
                continue
            t, f_count, e = migrate_file(f, is_queue, dry_run)
            if f_count > 0:
                prefix = "[DRY] " if dry_run else ""
                print(f"{prefix}{f.name}: {f_count}/{t} records fixed")
            total_all += t
            fixed_all += f_count
            errors_all += e

    mode = "DRY RUN" if dry_run else "APPLIED"
    print(f"\n{mode}: {fixed_all}/{total_all} records fixed, {errors_all} parse errors")
    return 0


if __name__ == "__main__":
    sys.exit(main())
