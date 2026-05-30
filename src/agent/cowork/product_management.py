# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "pydantic>=2,<3",
#   "redis>=5,<7",
# ]
# ///
#
# src/agent/cowork/product_management.py
#
# The PYTHON COWORK lane's product-management skill-script — a SELF-CONTAINED
# PEP-723 script (inline deps, run with `uv run`). This is the Python mirror of
# the TS coding lane: where TS runs claude -p for code, this runs programmatic
# MCP tool calls for knowledge work, with the SAME chassis discipline
# (typed boundaries, outcome+test per task, durable steering memory).
#
# Run:
#   uv run src/agent/cowork/product_management.py --self-test     # offline, no MCP/redis
#   uv run src/agent/cowork/product_management.py plan            # emits JiraIssueDrafts as JSON
#
# Programmatic Atlassian tool calling: this script DEFINES the calls (typed
# JiraIssueDraft -> the createJiraIssue MCP tool shape) and emits them as a
# deterministic plan. The actual MCP dispatch is done by the agent runtime via
# the mcp__claude_ai_Atlassian_Rovo__createJiraIssue tool (the atlassian-mcp-server
# surface at third_party/atlassian-mcp-server). Keeping the PLAN in a typed,
# testable script (not free-form model output) is the cowork analogue of the
# coding lane's structured-output discipline.
#
# Durable steering memory: redis-py against the running dragonfly container
# (:6379, redis-compatible) — the same store §3 of the self-steering design
# names. If dragonfly is unreachable, the script degrades to a no-op memory so
# --self-test runs anywhere.
#
# @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/python.md
# @cite docs/reference/self-steering-abstraction.md  (§3 redis/dragonfly memory)

from __future__ import annotations

import json
import sys
from typing import Iterable

# models.py sits beside this script; importable when run from repo root via uv.
try:
    from models import JiraIssueDraft  # type: ignore
except ImportError:  # when run as a module
    from src.agent.cowork.models import JiraIssueDraft  # type: ignore


DRAGONFLY_URL = "redis://127.0.0.1:6379/0"


def steering_memory():
    """Return a redis client against dragonfly, or a no-op stub if unreachable.
    The cowork lane records what it planned so a later session resumes instead
    of re-planning (the durable-memory fix for the channel-drop failure mode)."""
    try:
        import redis  # declared inline; uv installs it

        client = redis.Redis.from_url(DRAGONFLY_URL, socket_connect_timeout=1)
        client.ping()
        return client
    except Exception:
        class _NoMemory:
            def hset(self, *a, **k): ...
            def xadd(self, *a, **k): ...
        return _NoMemory()


def rest_of_day_plan() -> list[JiraIssueDraft]:
    """The product-management plan: the rest-of-day tasks the operator named,
    each as a task-with-outcome-and-test. This is DATA (typed, testable), not
    free-form model output — the cowork discipline."""
    return [
        JiraIssueDraft(
            project_key="SCRUM",
            summary="Wire the pre-verify script-gate into steerKnowledgeLoop body",
            outcome="A LaneScript with stage=pre-verify actually executes in the loop and a non-zero exit rejects the producer before the model-verifier is spent.",
            acceptance_test="steer.test.ts: a producer with a failing pre-verify script is rejected without any model-verifier dispatch (assert verifier call count == 0).",
            labels=["agent-chassis", "cowork-plan"],
        ),
        JiraIssueDraft(
            project_key="SCRUM",
            summary="Build §3 Python steer.py + memory.py durable chassis (dragonfly + alloydb)",
            outcome="Loop state (attempts, budget, events) survives a process restart via dragonfly; the TaskEnvelope ledger persists in alloydb. A dropped session RESUMES instead of restarting.",
            acceptance_test="Kill the process mid-DAG; restart; assert the loop resumes from the last completed task using redis state (integration test gated on container availability).",
            labels=["agent-chassis", "python", "cowork-plan"],
        ),
        JiraIssueDraft(
            project_key="SCRUM",
            summary="Resume SIFT mobile + macOS app build (paused for agent dev)",
            outcome="The SIFT app (mobile + macOS) is back in active development — the corpus-viewer dual-platform work resumes per the goal plan, now driven by the steering chassis.",
            acceptance_test="swift build green on macOS + an iOS-simulator screenshot of the SIFT surface; the chassis DAG drives the cross-platform port.",
            labels=["sift", "app", "cowork-plan"],
        ),
        JiraIssueDraft(
            project_key="SCRUM",
            summary="Plugins-per-lane: wire claude-plugins-official code-review as the engineering verifier",
            outcome="The engineering lane's verifier is the real code-review plugin loaded via query({plugins}), not a hand-written rubric.",
            acceptance_test="lanes.test.ts: the engineering lane dispatches the code-review plugin as its verifier and a failing review triggers the loop's retry.",
            labels=["agent-chassis", "plugins", "cowork-plan"],
        ),
    ]


def as_mcp_calls(drafts: Iterable[JiraIssueDraft]) -> list[dict]:
    """Render each typed draft into the createJiraIssue MCP tool-call shape the
    agent runtime dispatches (mcp__claude_ai_Atlassian_Rovo__createJiraIssue).
    Programmatic tool calling = the script emits the exact typed call payloads."""
    return [
        {
            "tool": "mcp__claude_ai_Atlassian_Rovo__createJiraIssue",
            "arguments": {
                "projectKey": d.project_key,
                "summary": d.summary,
                "issueTypeName": d.issue_type,
                "description": d.to_description(),
                "labels": d.labels,
            },
        }
        for d in drafts
    ]


def self_test() -> int:
    """Offline validation: models construct, the plan is well-formed, the MCP
    call shapes are complete. No MCP/redis required — runs anywhere."""
    drafts = rest_of_day_plan()
    assert len(drafts) == 4, "expected 4 rest-of-day tasks"
    for d in drafts:
        assert d.outcome and d.acceptance_test, f"{d.summary} missing outcome/test"
        assert "Outcome" in d.to_description()
    calls = as_mcp_calls(drafts)
    assert all(c["tool"].endswith("createJiraIssue") for c in calls)
    assert all(c["arguments"]["description"] for c in calls)
    mem = steering_memory()  # exercises the degrade-to-noop path
    mem.hset("cowork:selftest", "ok", "1")
    print(f"self-test OK — {len(drafts)} tasks, {len(calls)} MCP calls, memory={'live' if type(mem).__name__=='Redis' else 'noop'}")
    return 0


def main(argv: list[str]) -> int:
    if "--self-test" in argv:
        return self_test()
    if "plan" in argv:
        print(json.dumps(as_mcp_calls(rest_of_day_plan()), indent=2))
        return 0
    print(__doc__)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
