"""
PreToolUse hook (matcher: Agent) - nudges toward narrow, decomposed
exploration instead of fanning out many Explore/general-purpose agents
before decomposing what's already in front of Claude (e.g. a screenshot
attached to the turn). Fires starting on the 2nd qualifying spawn within a
session burst. Explicit-code counter per D7 ("narrow-allowlist-explicit-
reduce") - no LLM call involved in the decision.

@cite vendor/anthropics/code.claude.com/docs/en/hooks.md
@cite seeds/posture/session-start.xml
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path
from typing import Any

_FANOUT_SUBAGENT_TYPES = {"Explore", "general-purpose"}
_WINDOW_SECONDS = 300
_NUDGE_THRESHOLD = 2

_NUDGE_TEXT = (
    "Reminder (D7, narrow-allowlist-explicit-reduce): before spawning another "
    "Explore/general-purpose agent, check whether any screenshot or visual context "
    "attached to this turn or session can be decomposed directly instead, and keep "
    "each agent's scope as narrow as possible."
)


def _state_path(project_dir: str, session_id: str) -> Path:
    return Path(project_dir) / ".claude" / "state" / "explore-fanout" / f"{session_id}.json"


def _next_count(state_file: Path) -> int:
    now = time.time()
    count = 0
    try:
        stale = (now - state_file.stat().st_mtime) > _WINDOW_SECONDS
        if not stale:
            count = int(json.loads(state_file.read_text()).get("count", 0))
    except (OSError, json.JSONDecodeError, ValueError, TypeError):
        count = 0

    count += 1
    try:
        state_file.parent.mkdir(parents=True, exist_ok=True)
        state_file.write_text(json.dumps({"count": count}))
    except OSError:
        pass  # guidance-only hook: a failed write just skips future nudges
    return count


def main() -> None:
    try:
        event: dict[str, Any] = json.loads(sys.stdin.read())
    except json.JSONDecodeError:
        sys.exit(0)

    tool_input = event.get("tool_input", {})
    if not isinstance(tool_input, dict) or tool_input.get("subagent_type") not in _FANOUT_SUBAGENT_TYPES:
        sys.exit(0)

    project_dir = os.environ.get("CLAUDE_PROJECT_DIR") or event.get("cwd") or "."
    session_id = event.get("session_id", "unknown")
    count = _next_count(_state_path(project_dir, session_id))

    if count >= _NUDGE_THRESHOLD:
        print(
            json.dumps(
                {
                    "hookSpecificOutput": {
                        "hookEventName": "PreToolUse",
                        "additionalContext": _NUDGE_TEXT,
                    }
                }
            )
        )
    sys.exit(0)


if __name__ == "__main__":
    main()
