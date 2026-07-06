"""
Shared high-risk-operation patterns for high_risk_workflow_guard.py and
high_risk_git_guard.py. Kept in one place so the two hooks can't drift.

@cite vendor/anthropics/code.claude.com/docs/en/hooks.md
"""

from __future__ import annotations

import re

HIGH_RISK_PATTERNS: list[re.Pattern[str]] = [
    re.compile(r"ruleset", re.IGNORECASE),
    re.compile(r"branch[-_ ]?protection", re.IGNORECASE),
    re.compile(r"required_status_checks", re.IGNORECASE),
    re.compile(r"--admin\b", re.IGNORECASE),
    re.compile(r"disable[^\n]{0,20}(ruleset|protection)", re.IGNORECASE),
]

MEDIUM_RISK_PATTERNS: list[re.Pattern[str]] = [
    re.compile(r"--force(?!-with-lease)", re.IGNORECASE),
    re.compile(r"push\s+-f\b", re.IGNORECASE),
    re.compile(r"branch\s+-D\b"),
    re.compile(r"push[^\n]*--delete", re.IGNORECASE),
]

HIGH_RISK_REASON = (
    "This looks like it targets GitHub branch-protection/ruleset configuration or an "
    "admin merge bypass. No tool in this environment can read or modify repository "
    "rulesets (no gh CLI, no direct GitHub API, no mcp__github__ ruleset tool) - only "
    "the repo owner can do this via the GitHub web UI. Use AskUserQuestion to confirm "
    "with the user before proceeding."
)

MEDIUM_RISK_REASON = (
    "This command force-pushes or deletes a branch. Confirm this is intended before "
    "proceeding."
)


def classify(text: str) -> str | None:
    """Return "high", "medium", or None for the strongest risk pattern found in text."""
    if any(pattern.search(text) for pattern in HIGH_RISK_PATTERNS):
        return "high"
    if any(pattern.search(text) for pattern in MEDIUM_RISK_PATTERNS):
        return "medium"
    return None
