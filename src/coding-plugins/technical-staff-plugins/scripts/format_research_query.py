# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# Shapes a raw "topic + file path" input into a focused research query for
# O'Reilly, Context7, or Parallel Search - used by every technical-staff-plugins
# skill before calling its research connector, so query quality doesn't depend
# on how the caller phrased the request.
#
# Usage: uv run format_research_query.py "<topic>" [file_path]

from __future__ import annotations

import re
import sys

_STOPWORDS = {
    "a", "an", "the", "for", "and", "or", "of", "to", "in", "on", "with",
    "this", "that", "how", "what", "is", "are", "should", "we", "our",
}


def _keywords_from_path(file_path: str) -> list[str]:
    stem = re.sub(r"\.(ts|tsx|js|jsx|py|rs|go|java|rb|php)$", "", file_path)
    tokens = re.split(r"[/_\-.]+", stem)
    return [t for t in tokens if t and t.lower() not in _STOPWORDS]


def build_query(topic: str, file_path: str | None = None) -> str:
    words = [w for w in re.findall(r"[A-Za-z][A-Za-z0-9']*", topic) if w.lower() not in _STOPWORDS]
    if file_path:
        words.extend(_keywords_from_path(file_path))
    # de-dupe, case-insensitive, order-preserving
    seen: set[str] = set()
    deduped: list[str] = []
    for w in words:
        key = w.lower()
        if key not in seen:
            seen.add(key)
            deduped.append(w)
    return " ".join(deduped)


def main(argv: list[str]) -> int:
    if not argv:
        print("usage: format_research_query.py <topic> [file_path]", file=sys.stderr)
        return 2
    topic = argv[0]
    file_path = argv[1] if len(argv) > 1 else None
    print(build_query(topic, file_path))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
