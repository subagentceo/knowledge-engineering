# Determinism test plan — chat-in-the-web

Purpose: validate ISSUE-18. The skill's central promise is "first reply to any
trigger phrase is always §1 surface_overview, alone." This file lists the
concrete trigger phrases to run and the structural assertions a reviewer (or a
grader script) must check.

## How to run

In a **fresh** claude.ai session with this skill installed and no prior
conversation context, paste each trigger phrase below as the first message.
For each reply, record pass/fail against the structural checks.

## Trigger phrases (run all 8)

| # | Phrase | Why this case |
| --- | --- | --- |
| 1 | `what's in this environment` | canonical trigger |
| 2 | `what can you do here` | broader trigger |
| 3 | `show me the env` | abbreviated phrasing |
| 4 | `do I have postgres` | scoped capability question — should still open with §1 |
| 5 | `can you run docker` | scoped capability question — should still open with §1 |
| 6 | `what tools do I have` | leans toward §4, but §1 must come first |
| 7 | `is web search on` | leans toward §4, but §1 must come first |
| 8 | `what's pre-installed` | leans toward §3, but §1 must come first |

## Structural assertions (all must hold)

For each first reply, the reviewer asserts:

- [ ] **A1**: Reply opens with the literal line `## surface_overview`.
- [ ] **A2**: A fenced block with the language tag `verified` is present.
- [ ] **A3**: The verification block is the no-shell variant (`(no shell command — facts are read from this skill's metadata)`) — §1 has no shell command per template.
- [ ] **A4**: A markdown table with header `| Field | Value |` is present and contains rows for product, model, code_execution, knowledge_cutoff, current_date, working_directory, output_directory.
- [ ] **A5**: The reply ends with the literal line `Next: filesystem. Ask "show me the filesystem" to continue.`
- [ ] **A6**: No content from §2–§7 appears (`## filesystem`, `## installed_runtimes`, `## tools_and_connectors`, `## skills_inventory`, `## network_and_io`, `## limits_and_caveats` must all be absent).
- [ ] **A7**: No preamble before `## surface_overview` (no "Sure!", "Here's…", "Great question", etc.).

## Pass criterion

8 trigger phrases × 7 assertions = 56 checks. Skill passes determinism if **all 56 pass**. Any single fail invalidates the central promise and ISSUE-18 stays open.

## Optional grader script (pseudocode)

```python
def grade(reply: str) -> list[str]:
    failures = []
    if not reply.lstrip().startswith("## surface_overview"):
        failures.append("A1")
    if "```verified" not in reply:
        failures.append("A2")
    if "(no shell command" not in reply:
        failures.append("A3")
    if "| Field | Value |" not in reply:
        failures.append("A4")
    if 'Next: filesystem. Ask "show me the filesystem" to continue.' not in reply:
        failures.append("A5")
    forbidden = ["## filesystem", "## installed_runtimes",
                 "## tools_and_connectors", "## skills_inventory",
                 "## network_and_io", "## limits_and_caveats"]
    if any(s in reply for s in forbidden):
        failures.append("A6")
    return failures
```

## Negative tests (also run)

| # | Phrase | Expected behavior |
| --- | --- | --- |
| N1 | `do I have a GPU` | If user already saw §1 in conversation, may answer scoped via the §7 limits_and_caveats template. On a fresh session, opens with §1 first. |
| N2 | `what time is it` | Out of scope — skill should not fire. No section header. |

## When this passes, mark ISSUE-18 closed in the manifest.
