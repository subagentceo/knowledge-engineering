#!/usr/bin/env python3
"""Build manifest.md (outline) + manifest.tsv (file/level/header/start/end) for the
bundled references/ directory, and rotate the snapshot date in SNAPSHOT.md and
SKILL.md frontmatter so the snapshot metadata stays consistent with the bundled
references.

The line-range columns let the reading agent jump straight into a section with
view(path, view_range=[start, end]) instead of opening the whole file.

Run this any time the bundled `references/` are overwritten (e.g. after the
companion `update-reference-managed-agents` skill runs). It is the canonical
post-fetch hook for this skill: regenerating the manifest is the only way to
keep line ranges in sync with the (possibly drifted) line counts after re-fetch
(ISSUE-4), and it also resets the snapshot date (ISSUE-1).

Usage:
  python3 build_manifest.py [references_dir] [--no-bump]
"""
from __future__ import annotations
import datetime as _dt
import re
import sys
from pathlib import Path

ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
REFS = Path(ARGS[0]) if ARGS else Path("references")
BUMP_SNAPSHOT = "--no-bump" not in sys.argv[1:]
HEADER_RE = re.compile(r"^(#{1,3})\s+(.+?)\s*$")
FENCE_RE = re.compile(r"^\s*(```|~~~)")

ORDER = [
    "overview", "quickstart", "onboarding", "agent-setup",
    "define-outcomes", "tools", "skills", "mcp-connector",
    "multi-agent", "sessions", "events-and-streaming", "environments",
    "cloud-containers", "permission-policies", "vaults", "files",
    "memory", "github", "webhooks", "dreams",
]


def extract_sections(path: Path) -> list[tuple[int, str, int, int]]:
    """Return [(level, header, start_line, end_line), ...].

    end_line of a section = line before the next header of equal-or-shallower level,
    or last line of file. Lines are 1-indexed to match `view`'s view_range.
    """
    lines = path.read_text(encoding="utf-8").splitlines()
    raw: list[tuple[int, int, str]] = []  # (line_no, level, header)
    in_fence = False
    for i, line in enumerate(lines, start=1):
        if FENCE_RE.match(line):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = HEADER_RE.match(line)
        if m:
            raw.append((i, len(m.group(1)), m.group(2)))

    out: list[tuple[int, str, int, int]] = []
    total = len(lines)
    for idx, (start, level, header) in enumerate(raw):
        end = total
        for j in range(idx + 1, len(raw)):
            jstart, jlevel, _ = raw[j]
            if jlevel <= level:
                end = jstart - 1
                break
        out.append((level, header, start, end))
    return out


def main() -> None:
    md = ["# Managed Agents reference — section index", ""]
    md.append(
        "Generated outline of every H1/H2/H3 in the bundled `.md` files. "
        "Use this to locate the right file/section before opening it. "
        "For machine-readable line ranges, see `manifest.tsv`."
    )
    md.append("")
    tsv = ["file\tlevel\theader\tstart_line\tend_line"]

    for topic in ORDER:
        path = REFS / f"{topic}.md"
        if not path.exists():
            md.append(f"## `{topic}.md` — *missing*")
            md.append("")
            continue

        md.append(f"## `{topic}.md`")
        sections = extract_sections(path)
        if not sections:
            md.append("- *(no headers)*")
            md.append("")
            continue

        for level, header, start, end in sections:
            indent = "  " * (level - 1)
            md.append(f"{indent}- {'#' * level} {header}  *(L{start}–L{end})*")
            tsv.append(f"{topic}.md\tH{level}\t{header}\t{start}\t{end}")
        md.append("")

    (REFS / "manifest.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    (REFS / "manifest.tsv").write_text("\n".join(tsv) + "\n", encoding="utf-8")

    n = len(tsv) - 1
    by = {1: 0, 2: 0, 3: 0}
    for line in tsv[1:]:
        by[int(line.split("\t")[1][1])] += 1
    print(f"manifest.md / manifest.tsv written under {REFS}")
    print(f"sections: {n}  (H1: {by[1]}  H2: {by[2]}  H3: {by[3]})")

    if BUMP_SNAPSHOT:
        bumped = bump_snapshot_date(REFS.parent)
        for path, old, new in bumped:
            print(f"  rotated {path.name}: {old or '(no prior)'} -> {new}")


SNAPSHOT_DATE_RE = re.compile(r"(\*\*Snapshot date:\*\*\s*)(\S+)")
SKILL_SNAPSHOT_RE = re.compile(r'(snapshot:\s*")([^"]+)(")')


def bump_snapshot_date(skill_root: Path) -> list[tuple[Path, str | None, str]]:
    """Rotate snapshot date in SNAPSHOT.md and SKILL.md frontmatter to today (UTC).

    Returns a list of (path, old_value, new_value) tuples for changed files.
    """
    today = _dt.datetime.now(_dt.timezone.utc).strftime("%Y-%m-%d")
    changed: list[tuple[Path, str | None, str]] = []

    snap = skill_root / "SNAPSHOT.md"
    if snap.exists():
        text = snap.read_text(encoding="utf-8")
        m = SNAPSHOT_DATE_RE.search(text)
        old = m.group(2) if m else None
        new_text = SNAPSHOT_DATE_RE.sub(rf"\g<1>{today}", text) if m else text
        if new_text != text:
            snap.write_text(new_text, encoding="utf-8")
            changed.append((snap, old, today))

    skill_md = skill_root / "SKILL.md"
    if skill_md.exists():
        text = skill_md.read_text(encoding="utf-8")
        m = SKILL_SNAPSHOT_RE.search(text)
        old = m.group(2) if m else None
        new_text = SKILL_SNAPSHOT_RE.sub(rf'\g<1>{today}\g<3>', text) if m else text
        if new_text != text:
            skill_md.write_text(new_text, encoding="utf-8")
            changed.append((skill_md, old, today))

    return changed


if __name__ == "__main__":
    main()
