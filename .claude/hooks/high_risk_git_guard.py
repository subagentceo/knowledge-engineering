"""
PreToolUse hook (matcher: Bash) - same risk classification as
high_risk_workflow_guard.py, applied to direct or subagent-issued shell
commands. Defense-in-depth for git/gh operations that don't route through a
top-level Workflow tool call (e.g. a subagent spawned outside of ultracode,
or a command typed directly).

@cite vendor/anthropics/code.claude.com/docs/en/hooks.md
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent))
from _risk_patterns import HIGH_RISK_REASON, MEDIUM_RISK_REASON, classify  # noqa: E402


def main() -> None:
    try:
        event: dict[str, Any] = json.loads(sys.stdin.read())
    except json.JSONDecodeError:
        sys.exit(0)

    tool_input = event.get("tool_input", {})
    if not isinstance(tool_input, dict):
        sys.exit(0)

    command = str(tool_input.get("command", ""))
    risk = classify(command)

    if risk == "high":
        sys.stderr.write(HIGH_RISK_REASON)
        sys.exit(2)

    if risk == "medium":
        print(
            json.dumps(
                {
                    "hookSpecificOutput": {
                        "hookEventName": "PreToolUse",
                        "permissionDecision": "ask",
                        "permissionDecisionReason": MEDIUM_RISK_REASON,
                    }
                }
            )
        )
    sys.exit(0)


if __name__ == "__main__":
    main()
