"""
UserPromptSubmit hook — auto-wraps unstructured prompt dumps in house-style XML.

Reads the Claude Code UserPromptSubmit event from stdin (JSON), checks
whether the user_message looks like an unstructured dump (long, many URLs,
no YAML/XML skeleton), and if so rewrites it into the house structured-prompt
format before the message reaches the model.

Structured already → pass through unchanged.
Unstructured → wrap in <user_request> with refs: YAML block extracted.

@cite vendor/anthropics/code.claude.com/docs/en/reference/hooks.md
@cite .claude/skills/structured-prompt-formatter/SKILL.md
"""

from __future__ import annotations

import json
import re
import sys
from typing import Any

_URL_RE = re.compile(r"https?://[^\s\"'<>]+")
_STRUCTURE_RE = re.compile(r"(<\w[\w-]*|^\s*\w[\w_-]+\s*:)", re.MULTILINE)


def _is_unstructured(text: str) -> bool:
    lines = text.splitlines()
    url_count = len(_URL_RE.findall(text))
    has_structure = bool(_STRUCTURE_RE.search(text))
    return (
        len(lines) > 15
        or url_count > 3
        or (len(text) > 500 and not has_structure)
    )


def _extract_urls(text: str) -> list[str]:
    return list(dict.fromkeys(_URL_RE.findall(text)))  # deduplicated, order-preserving


def _alias(url: str, idx: int) -> str:
    # 2-4 char alias from meaningful path segments
    parts = re.split(r"[/.\-_]", url.rstrip("/"))
    meaningful = [p for p in parts if p and not p.startswith("http") and len(p) > 1]
    if meaningful:
        candidate = "".join(w[0] for w in meaningful[-3:]).lower()
        return (candidate or f"r{idx}")[:4]
    return f"r{idx}"


def _build_refs_block(urls: list[str]) -> str:
    if not urls:
        return ""
    seen_aliases: dict[str, int] = {}
    rows = []
    for i, url in enumerate(urls):
        alias = _alias(url, i)
        # ensure uniqueness
        if alias in seen_aliases:
            seen_aliases[alias] += 1
            alias = f"{alias}{seen_aliases[alias]}"
        else:
            seen_aliases[alias] = 0
        rows.append(f"  {alias}: {url}")
    return "refs:\n" + "\n".join(rows)


def _reformat(text: str) -> str:
    urls = _extract_urls(text)
    refs_block = _build_refs_block(urls)
    # strip raw URLs from body to reduce duplication
    body = text
    for url in urls:
        body = body.replace(url, f"(refs: {_alias(url, urls.index(url))})")
    body = body.strip()

    parts: list[str] = ["<user_request>"]
    if refs_block:
        parts.append(f"```yaml\n{refs_block}\n```\n")
    parts.append("<format_intent>structured</format_intent>")
    parts.append("")
    parts.append(body)
    parts.append("</user_request>")
    return "\n".join(parts)


def main() -> None:
    raw = sys.stdin.read()
    try:
        event: dict[str, Any] = json.loads(raw)
    except json.JSONDecodeError:
        # not JSON — pass through unchanged
        sys.stdout.write(raw)
        return

    # UserPromptSubmit event shape: {"session_id": "...", "user_message": "..."}
    # fallback key: "prompt"
    key = "user_message" if "user_message" in event else "prompt"
    text = event.get(key, "")

    if not isinstance(text, str) or not _is_unstructured(text):
        sys.stdout.write(raw)
        return

    event[key] = _reformat(text)
    sys.stdout.write(json.dumps(event))


if __name__ == "__main__":
    main()
