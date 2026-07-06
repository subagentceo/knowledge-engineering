"""
PreToolUse hook (matcher: Workflow) - flags high-risk operations (GitHub
ruleset/branch-protection edits, admin merge bypass, force-push, branch
delete) embedded in a Workflow script before it runs. Ultracode dispatches
work through subagents the user never reviews individually, so the script
itself is the only checkpoint before those commands execute.

High risk (ruleset/branch-protection/--admin) -> block (exit 2), directing
Claude to AskUserQuestion first. Medium risk (force-push, branch delete) ->
ask, surfacing the normal human permission prompt instead of silently
proceeding.

@cite vendor/anthropics/code.claude.com/docs/en/hooks.md
@cite https://code.claude.com/docs/en/workflows#let-claude-decide-with-ultracode
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent))
from _risk_patterns import HIGH_RISK_REASON, MEDIUM_RISK_REASON, classify  # noqa: E402


def _scannable_text(tool_input: dict[str, Any]) -> str:
    parts = [
        str(tool_input.get("script", "")),
        str(tool_input.get("args", "")),
    ]
    script_path = tool_input.get("scriptPath")
    if isinstance(script_path, str) and script_path:
        try:
            parts.append(Path(script_path).read_text())
        except OSError:
            pass
    return "\n".join(parts)


def main() -> None:
    try:
        event: dict[str, Any] = json.loads(sys.stdin.read())
    except json.JSONDecodeError:
        sys.exit(0)

    tool_input = event.get("tool_input", {})
    if not isinstance(tool_input, dict):
        sys.exit(0)

    risk = classify(_scannable_text(tool_input))

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
