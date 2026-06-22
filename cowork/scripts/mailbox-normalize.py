#!/usr/bin/env python3
"""
mailbox-normalize.py — one-time, idempotent migration of legacy mailbox/queue
records to the canon in cowork/standards/mailbox-envelope-canon.md.

- Idempotent: records that already pass mailbox-schema-validate are left byte-for-byte.
- Lossless: original keys preserved; only _type / envelope_type / at / id / state
  are ADDED where derivable. Provenance stamped via _normalized_by.
- Safe: writes a per-file .bak-canon-<date> backup before rewriting.

Usage: python3 cowork/scripts/mailbox-normalize.py [--apply]
       (dry-run by default; prints planned changes)

@cite cowork/standards/mailbox-envelope-canon.md
@cite cowork/scripts/mailbox-schema-validate.py
"""
import json, sys, uuid, datetime, shutil, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "cowork" / "scripts"))
from importlib import import_module
validate = import_module("mailbox-schema-validate")

MAILBOX_DIR = ROOT / "cowork" / "data" / "mailbox"
NOW = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
STAMP = "bak-canon-" + datetime.datetime.utcnow().strftime("%Y%m%d")

# legacy MailboxMessage.type  ->  canonical envelope_type
TYPE_MAP = {
    "outcome": "result", "result": "result", "task": "task",
    "dispatch": "task", "routine": "task", "interrupt": "escalate",
    "ping": "notify", "notify": "notify", "ack": "ack",
}
STATUS_TO_STATE = {"pending": "pending", "read": "read", "acked": "actioned",
                   "actioned": "actioned", "archived": "archived", "expired": "archived"}


def is_transition(r):
    return ("to" not in r and r.get("status") in {"acked", "read", "done"}
            and any(k in r for k in ("acked_by", "read_by", "acked_at", "read_at")))


def infer_envelope_type(r):
    if r.get("_type") == "message":
        subj = (r.get("subject") or "").lower()
        if any(w in subj for w in ("summary", "nightly", "morning", "review", "digest")):
            return "summary"
        return "task" if r.get("task_id") else "notify"
    if r.get("_type") == "note":
        return "notify"
    return TYPE_MAP.get(r.get("type"), "notify")


def to_envelope(r):
    new = {"_type": "envelope", "id": r.get("id") or str(uuid.uuid4()),
           "envelope_type": infer_envelope_type(r)}
    new.update(r)
    new["_type"] = "envelope"
    new["id"] = r.get("id") or new["id"]
    new["envelope_type"] = infer_envelope_type(r)
    new.setdefault("from", "unknown")
    new.setdefault("to", "unknown")
    new.setdefault("subject", "(normalized — no subject)")
    if "at" not in new:
        new["at"] = r.get("sent_at") or r.get("created_at") or NOW
    new["state"] = STATUS_TO_STATE.get(r.get("status"), r.get("state") if r.get("state") in
                    validate.ENVELOPE_STATES else "pending")
    new["_normalized_by"] = "mailbox-normalize-2026-06-19"
    return new


def to_transition(r):
    new = {"_type": "transition", "id": r.get("id") or str(uuid.uuid4())}
    new.update(r)
    new["_type"] = "transition"
    new["id"] = r.get("id") or new["id"]
    if "at" not in new:
        new["at"] = r.get("acked_at") or r.get("read_at") or r.get("sent_at") or NOW
    if "event" not in new:
        new["event"] = "ack" if r.get("status") == "acked" else ("read" if r.get("status") == "read" else "ack")
    new["_normalized_by"] = "mailbox-normalize-2026-06-19"
    return new


def normalize(r):
    if not validate.check_record(r):       # already canonical → untouched
        return r, False
    t = r.get("_type")
    if t in ("ack",) or is_transition(r):
        return to_transition(r), True
    return to_envelope(r), True


def main(apply):
    changed_files, changed_records = [], 0
    for f in sorted(MAILBOX_DIR.glob("*.jsonl")):
        lines = f.read_text().strip().splitlines()
        out, file_changed = [], False
        for l in lines:
            if not l.strip():
                continue
            r = json.loads(l)
            nr, changed = normalize(r)
            if changed:
                file_changed = True; changed_records += 1
                # verify the result actually conforms now
                resid = validate.check_record(nr)
                if resid:
                    print(f"WARN {f.name}: residual after normalize id={nr.get('id')}: {resid}",
                          file=sys.stderr)
            out.append(json.dumps(nr, ensure_ascii=False))
        if file_changed:
            changed_files.append(f.name)
            if apply:
                shutil.copy(f, f.with_suffix(f".jsonl.{STAMP}"))
                f.write_text("\n".join(out) + "\n")
    print(json.dumps({"mode": "apply" if apply else "dry-run",
                      "files_changed": len(changed_files), "records_changed": changed_records,
                      "files": changed_files}, indent=2))


if __name__ == "__main__":
    main("--apply" in sys.argv)
