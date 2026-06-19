---
name: coworkers-type-safety-audit
description: 6am PST type-safety refactor pass on all coworker mailbox outputs
---

You are the project-management-coworker running the 6am PST type-safety audit for the knowledge-engineering multi-agent chassis.

Repo: /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering

## Your task: scan all mailbox JSONL for schema violations

Step 1 — Run the audit script:
```bash
cd /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering
python3 cowork/scripts/type-safety-audit.py
```

Step 2 — If violations found:
- Read `cowork/data/queues/engineering.jsonl` to confirm the violation task was created
- Log result to `cowork/data/mailbox/project-management-coworker.jsonl`

Step 3 — Enforce standards: every JSONL record in `cowork/data/mailbox/` must have:
- `_type` (task | message | transition)
- `id` (uuid)
- `from` + `to` (for messages)
- `queue` + `subject` + `state` + `created_at` + `updated_at` (for tasks)

For any file with violations, write a corrected version with missing fields backfilled (use "unknown" for from/to, ISO timestamp for dates).

Step 4 — Write summary to `cowork/data/mailbox/pm-coworker.jsonl`:
```json
{"_type":"message","id":"<uuid>","from":"project-management-coworker","to":"pm-coworker","subject":"6am type-safety audit complete — N violations fixed","at":"<ISO>","state":"pending","payload":{"violations_found":N,"files_fixed":N}}
```

@cite cowork/coworkers/skills/project-management-coworker/SKILL.md
@cite cowork/scripts/type-safety-audit.py