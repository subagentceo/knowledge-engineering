#!/usr/bin/env python3
"""grade_disclosure_reply.py — mechanical grader for replies produced under
environment-disclosure-prompt.xml.

Resolves ISSUE-19 + ISSUE-20 from the 2026-05-09 session manifest:

  ISSUE-19  truth-source precedence in the XML is asserted in prose, not
            enforced. There is no in-prompt mechanism that prevents an
            agent from ignoring it.
  ISSUE-20  no test harness existed to validate that replies actually
            adhere to the seven-section protocol.

This file is the test harness. It does not call the API — it grades a
reply that was already produced (paste into a fixture file or pipe via
stdin). Pair with the determinism-test-plan.md trigger phrases.

Contract checked, in order:
  [G1] Reply opens with `## <section_name>` (one of the 7 named sections).
  [G2] Reply contains exactly ONE H2 section header.
  [G3] A fenced ```verified block is present and either:
        - contains a `$ ` prefixed shell command followed by output, OR
        - contains the literal `(no shell` for §1 / §4 / §5.
  [G4] A markdown table follows the verified block.
  [G5] Continuation marker is the final non-empty line and matches the
       template `Next: <section>. Ask "<trigger>" to continue.` with
       <section>/<trigger> drawn from the section_to_next map.
       (For §7 limits_and_caveats, marker is absent — that is the terminal
       section; this is enforced by NOT requiring it on §7.)
  [G6] Reply is <= 25 rendered lines (D5 in the XML).
  [G7] No content from any of the OTHER six sections leaks in.

Usage:
  echo "$REPLY" | python3 grade_disclosure_reply.py
  python3 grade_disclosure_reply.py path/to/reply.md
  python3 grade_disclosure_reply.py --self-test

Exit codes: 0 = all checks pass; 1 = one or more failed; 2 = bad input.
"""
from __future__ import annotations

import re
import sys
from dataclasses import dataclass

SECTIONS = [
    "surface_overview",
    "filesystem",
    "installed_runtimes",
    "tools_and_connectors",
    "skills_inventory",
    "network_and_io",
    "limits_and_caveats",
]

# section -> (next_section, trigger_phrase)  — derived from section-templates.md
NEXT_OF: dict[str, tuple[str, str] | None] = {
    "surface_overview": ("filesystem", "show me the filesystem"),
    "filesystem": ("installed_runtimes", "show me what's pre-installed"),
    "installed_runtimes": ("tools_and_connectors", "show me the tools"),
    "tools_and_connectors": ("skills_inventory", "show me the skills"),
    "skills_inventory": ("network_and_io", "show me network and IO"),
    "network_and_io": ("limits_and_caveats", "show me the limits"),
    "limits_and_caveats": None,  # terminal
}

H2_RE = re.compile(r"^##\s+([a-z_]+)\s*$", re.MULTILINE)
VERIFIED_RE = re.compile(r"```verified\s*\n(.*?)```", re.DOTALL)
TABLE_RE = re.compile(r"^\|.+\|\s*\n\|[\s\-|]+\|", re.MULTILINE)
CONTINUATION_RE = re.compile(
    r'^Next:\s+(?P<section>[a-z_]+)\.\s+Ask\s+"(?P<trigger>[^"]+)"\s+to continue\.\s*$',
    re.MULTILINE,
)


@dataclass
class Check:
    code: str
    ok: bool
    detail: str

    def fmt(self) -> str:
        mark = "PASS" if self.ok else "FAIL"
        return f"[{self.code}] {mark}  {self.detail}"


def grade(reply: str) -> list[Check]:
    checks: list[Check] = []
    lines = reply.splitlines()

    # G1 + G2: section header(s)
    headers = H2_RE.findall(reply)
    first_h2 = headers[0] if headers else None
    g1_ok = first_h2 in SECTIONS
    checks.append(Check("G1", g1_ok,
        f"first H2 is one of the 7 known sections (got: {first_h2!r})"))
    g2_ok = len(headers) == 1
    checks.append(Check("G2", g2_ok,
        f"exactly one H2 section header (found {len(headers)}: {headers})"))

    # G3: verified block
    vmatch = VERIFIED_RE.search(reply)
    g3_ok = False
    g3_detail = "no ```verified``` block found"
    if vmatch:
        body = vmatch.group(1).strip()
        has_shell = body.startswith("$ ") or "\n$ " in body
        no_shell = body.startswith("(no shell")
        g3_ok = has_shell or no_shell
        g3_detail = (
            "verified block present (shell)" if has_shell else
            "verified block present (no-shell variant)" if no_shell else
            "verified block present but neither shell nor no-shell variant"
        )
    checks.append(Check("G3", g3_ok, g3_detail))

    # G4: table
    g4_ok = bool(TABLE_RE.search(reply))
    checks.append(Check("G4", g4_ok, "markdown table present"))

    # G5: continuation marker (or absence on terminal section)
    is_terminal = first_h2 == "limits_and_caveats"
    cmatch = CONTINUATION_RE.search(reply)
    if is_terminal:
        # terminal: marker should be absent
        g5_ok = cmatch is None
        g5_detail = "no continuation marker on terminal section §7"
        if cmatch:
            g5_detail = f"unexpected continuation marker on §7: {cmatch.group(0)!r}"
    elif cmatch is None:
        g5_ok = False
        g5_detail = "continuation marker missing"
    else:
        expected = NEXT_OF.get(first_h2 or "")
        if expected is None:
            g5_ok = False
            g5_detail = f"unexpected continuation marker for §{first_h2}: {cmatch.group(0)!r}"
        else:
            exp_section, exp_trigger = expected
            got_section = cmatch.group("section")
            got_trigger = cmatch.group("trigger")
            g5_ok = got_section == exp_section and got_trigger == exp_trigger
            g5_detail = (
                f"continuation marker matches template "
                f"(section={got_section!r}, trigger={got_trigger!r})"
                if g5_ok
                else f"continuation marker mismatch: got "
                     f"section={got_section!r} trigger={got_trigger!r}; "
                     f"expected section={exp_section!r} trigger={exp_trigger!r}"
            )
        # Also check it is the final non-empty line
        last_nonempty = next((l for l in reversed(lines) if l.strip()), "")
        if g5_ok and not CONTINUATION_RE.match(last_nonempty):
            g5_ok = False
            g5_detail = (
                f"continuation marker is not the final non-empty line "
                f"(last line: {last_nonempty!r})"
            )
    checks.append(Check("G5", g5_ok, g5_detail))

    # G6: <= 25 rendered lines
    rendered = len([l for l in lines if l.strip()])
    g6_ok = rendered <= 25
    checks.append(Check("G6", g6_ok, f"rendered lines <= 25 (got {rendered})"))

    # G7: no leakage from other sections
    leaked = [s for s in SECTIONS if s != first_h2 and f"## {s}" in reply]
    g7_ok = not leaked
    checks.append(Check("G7", g7_ok,
        f"no other-section H2 headers leaked (leaked: {leaked})"))

    return checks


def grade_and_print(reply: str) -> int:
    results = grade(reply)
    for c in results:
        print(c.fmt())
    fails = [c for c in results if not c.ok]
    print(f"\n{len(results) - len(fails)}/{len(results)} passed")
    return 0 if not fails else 1


# --------------------------- self-test fixtures ---------------------------

GOOD_S1 = """\
## surface_overview
This is a claude.ai chat session running Claude Opus 4.x. Code execution is enabled.
```verified
(no shell command — facts are read from this skill's metadata)
```
| Field | Value |
| --- | --- |
| product | claude.ai web/mobile chat |
| model | Claude Opus 4.x |
| code_execution | enabled |
| current_date | 2026-05-09 |
| working_directory | /home/claude |
| output_directory | /mnt/user-data/outputs |

Next: filesystem. Ask "show me the filesystem" to continue.
"""

BAD_TWO_SECTIONS = """\
## surface_overview
intro
```verified
(no shell command)
```
| Field | Value |
| --- | --- |
| product | claude.ai |

## filesystem
also here
Next: filesystem. Ask "show me the filesystem" to continue.
"""

BAD_NO_VERIFICATION = """\
## filesystem
intro
| Path | Mount |
| --- | --- |
| /home/claude | rw |
Next: installed_runtimes. Ask "show me what's pre-installed" to continue.
"""

BAD_WRONG_MARKER = """\
## surface_overview
intro
```verified
(no shell command — facts are read from this skill's metadata)
```
| Field | Value |
| --- | --- |
| product | claude.ai |

Next: tools_and_connectors. Ask "show me the tools" to continue.
"""


def self_test() -> int:
    fixtures = [
        ("GOOD_S1", GOOD_S1, True),
        ("BAD_TWO_SECTIONS", BAD_TWO_SECTIONS, False),
        ("BAD_NO_VERIFICATION", BAD_NO_VERIFICATION, False),
        ("BAD_WRONG_MARKER", BAD_WRONG_MARKER, False),
    ]
    overall = 0
    for name, fix, should_pass in fixtures:
        results = grade(fix)
        passed = all(c.ok for c in results)
        ok = passed == should_pass
        marker = "PASS" if ok else "FAIL"
        print(f"[self-test] {marker}  {name}  "
              f"(pass={passed}, expected_pass={should_pass})")
        if not ok:
            overall = 1
            for c in results:
                print(f"           {c.fmt()}")
    return overall


def main(argv: list[str]) -> int:
    if "--self-test" in argv:
        return self_test()
    if len(argv) > 1:
        try:
            text = open(argv[1], encoding="utf-8").read()
        except OSError as e:
            print(f"error: {e}", file=sys.stderr)
            return 2
    else:
        text = sys.stdin.read()
    if not text.strip():
        print("error: empty input", file=sys.stderr)
        return 2
    return grade_and_print(text)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
