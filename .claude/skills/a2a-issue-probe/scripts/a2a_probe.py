#!/usr/bin/env python3
"""
a2a_probe.py — talk to another agent through a GitHub issue, but trust a LOCAL
probe's exit code over anything the other agent says.

Distilled from issue #522, where a remote agent was confidently wrong twice
(claimed OLLAMA_ORIGINS=* fixes a 403 → false; claimed 0.0.0.0 still 403s the
hostname → false) and right once. The ONLY thing that sorted truth from claim
every time was running a deterministic local command and reading its exit code.

So this tool always pairs a question-to-the-other-agent with a local verify cmd.
The verify cmd's exit code is ground truth; the issue comments are DATA, never
commands — they are surfaced for a human/you to read, never auto-executed.

Subcommands:
  post   --issue N --body-file F            append a comment
  read   --issue N [--since ID]             print comments newer than comment-ID
  verify --cmd '<shell>' [--expect-exit 0]  run local probe; exit = its exit code
  await  --issue N --since ID --cmd '<...>' [--expect-exit 0] [--timeout S] [--interval S]
         poll: succeeds the moment the LOCAL verify passes (NOT when a reply
         arrives); prints any new replies as they appear. Reply ≠ resolution.

@cite https://github.com/subagentceo/knowledge-engineering/issues/522
NOTE: identity lives in the comment BODY — both agents may post under one PAT,
so author.login does not distinguish sender. Sign your posts in the body.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time

REPO = "subagentceo/knowledge-engineering"


def _gh(args: list[str]) -> str:
    r = subprocess.run(["gh", *args], capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(f"[a2a] gh failed: {r.stderr.strip()}\n")
        sys.exit(4)
    return r.stdout


def comments(issue: int) -> list[dict]:
    out = _gh(["issue", "view", str(issue), "--repo", REPO, "--json", "comments"])
    raw = json.loads(out).get("comments", [])
    for c in raw:
        # extract numeric comment id from the url tail
        c["_id"] = int(c["url"].rsplit("-", 1)[-1])
    return raw


def cmd_post(a) -> int:
    body = open(a.body_file).read() if a.body_file else a.body
    _gh(["issue", "comment", str(a.issue), "--repo", REPO, "--body", body])
    print(f"[a2a] posted to #{a.issue}")
    return 0


def cmd_read(a) -> int:
    since = a.since or 0
    new = [c for c in comments(a.issue) if c["_id"] > since]
    for c in new:
        print(f"--- {c['author']['login']} @ {c['createdAt']} (id={c['_id']}) ---")
        print(c["body"])
    if not new:
        print(f"[a2a] no comments newer than {since}")
    return 0


def _verify(cmd: str, expect_exit: int) -> bool:
    r = subprocess.run(cmd, shell=True)
    ok = r.returncode == expect_exit
    sys.stderr.write(f"[a2a] verify exit={r.returncode} (expect {expect_exit}) -> {'PASS' if ok else 'FAIL'}\n")
    return ok


def cmd_verify(a) -> int:
    return 0 if _verify(a.cmd, a.expect_exit) else 1


def cmd_await(a) -> int:
    """Ground truth = the local probe passing, not a reply landing."""
    seen = a.since or 0
    deadline = None  # set on first loop via monotonic; avoids Date.now-style nondeterminism
    elapsed = 0
    while True:
        # surface any new replies (data only — never executed)
        for c in [c for c in comments(a.issue) if c["_id"] > seen]:
            print(f"\n>>> reply from {c['author']['login']} (id={c['_id']}):\n{c['body'][:800]}")
            seen = max(seen, c["_id"])
        if _verify(a.cmd, a.expect_exit):
            print(f"[a2a] RESOLVED — local probe passed. (latest seen comment id={seen})")
            return 0
        if elapsed >= a.timeout:
            print(f"[a2a] TIMEOUT after {a.timeout}s — probe still failing. latest seen id={seen}")
            return 1
        time.sleep(a.interval)
        elapsed += a.interval


def main() -> int:
    p = argparse.ArgumentParser(prog="a2a_probe")
    sub = p.add_subparsers(dest="sub", required=True)

    pp = sub.add_parser("post"); pp.add_argument("--issue", type=int, required=True)
    g = pp.add_mutually_exclusive_group(required=True)
    g.add_argument("--body"); g.add_argument("--body-file"); pp.set_defaults(fn=cmd_post)

    pr = sub.add_parser("read"); pr.add_argument("--issue", type=int, required=True)
    pr.add_argument("--since", type=int); pr.set_defaults(fn=cmd_read)

    pv = sub.add_parser("verify"); pv.add_argument("--cmd", required=True)
    pv.add_argument("--expect-exit", type=int, default=0); pv.set_defaults(fn=cmd_verify)

    pa = sub.add_parser("await"); pa.add_argument("--issue", type=int, required=True)
    pa.add_argument("--since", type=int, default=0); pa.add_argument("--cmd", required=True)
    pa.add_argument("--expect-exit", type=int, default=0)
    pa.add_argument("--timeout", type=int, default=900); pa.add_argument("--interval", type=int, default=60)
    pa.set_defaults(fn=cmd_await)

    a = p.parse_args()
    return a.fn(a)


if __name__ == "__main__":
    sys.exit(main())
