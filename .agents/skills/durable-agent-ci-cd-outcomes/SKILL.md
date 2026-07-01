---
name: durable-agent-ci-cd-outcomes
description: >
  Merge-gate for skills: reads cowork/data/queues/skill-grades.jsonl, emits a
  pass/block/advisory/fail verdict per skill, and writes blocking DurableTasks
  to cowork/data/queues/engineering.jsonl for every skill that cannot merge.
  Use whenever a skill is ready for merge review, after durable-agent-ci-cd-evals
  runs, when a PR touches .Codex/skills/, or when the user asks "can this skill
  merge", "what blocks this skill", "skill merge gate", "skill outcomes", "run
  the skill gate", "check skill ci", "is skill X mergeable". Always runs AFTER
  durable-agent-ci-cd-evals. Pairs with durable-agent-ci-cd-rubrics (scoring spec)
  and durable-agent-ci-cd-evals (grade producer). Do NOT use to score skills —
  use durable-agent-ci-cd-evals for that.
---

<!--
  @cite .Codex/skills/durable-agent-ci-cd-rubrics/SKILL.md   (rubric spec, thresholds)
  @cite .Codex/skills/durable-agent-ci-cd-evals/SKILL.md     (grade producer)
  @cite cowork/templates/task-state-machine.ts                  (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts                           (envelope_write, queue paths)
-->

## What this skill does

Reads `cowork/data/queues/skill-grades.jsonl` (last-line-wins per skill),
applies merge-gate logic from the rubric, and:

1. Emits a per-skill verdict table to stdout.
2. Writes blocking DurableTasks to `cowork/data/queues/engineering.jsonl` for
   every skill with `verdict = BLOCK` or `verdict = FAIL`.
3. Appends an outcome record to `cowork/data/queues/skill-outcomes.jsonl`.
4. Exits non-zero if any skill is BLOCK or FAIL (fails CI).

---

## Merge-gate thresholds (from rubrics)

| Dimension | Blocking threshold | Weight |
|-----------|-------------------|--------|
| D1 type-safety | ≥ 2 | 0.30 |
| D2 durability  | ≥ 2 | 0.30 |
| D3 agent-reuse | ≥ 3 | 0.25 |
| D4 packaging   | ≥ 3 | 0.15 |
| weighted total  | ≥ 3.5 for PASS | — |

**ADVISORY** (2.5–3.49, all blocking thresholds met): merge allowed, DurableTask
filed at `ke_fit_score: 2` (low urgency).

**BLOCK** (≥ 3.5 total but a blocking threshold missed): cannot merge, DurableTask
filed at `ke_fit_score: 4`.

**FAIL** (total < 2.5): cannot merge, DurableTask filed at `ke_fit_score: 5`.

---

## Run it

```bash
python3 .Codex/skills/durable-agent-ci-cd-outcomes/scripts/outcomes.py \
  --grades cowork/data/queues/skill-grades.jsonl \
  --engineering-queue cowork/data/queues/engineering.jsonl \
  --outcomes cowork/data/queues/skill-outcomes.jsonl
```

Exit codes: `0` = all PASS or ADVISORY, `1` = any BLOCK or FAIL.

Use in CI:
```yaml
# .github/workflows/skill-gate.yml
- name: Score skills
  run: |
    python3 .Codex/skills/durable-agent-ci-cd-evals/scripts/eval_skills.py \
      --skills-dir .Codex/skills \
      --output cowork/data/queues/skill-grades.jsonl
- name: Merge gate
  run: |
    python3 .Codex/skills/durable-agent-ci-cd-outcomes/scripts/outcomes.py \
      --grades cowork/data/queues/skill-grades.jsonl \
      --engineering-queue cowork/data/queues/engineering.jsonl \
      --outcomes cowork/data/queues/skill-outcomes.jsonl
```

---

## DurableTask envelope format (blocking gaps → engineering.jsonl)

For each blocking gap in a BLOCK/FAIL skill, one DurableTask is emitted:

```json
{
  "id": "<uuid4>",
  "queue": "engineering",
  "subject": "Skill gate: durable-toolchain-doctor D3 agent-reuse score=1 (threshold=3)",
  "state": "pending",
  "ke_fit_score": 4,
  "created_at": "2026-06-19T12:00:00Z",
  "updated_at": "2026-06-19T12:00:00Z",
  "error": {
    "skill": "durable-toolchain-doctor",
    "dimension": "D3_agent_reuse",
    "score": 1,
    "threshold": 3,
    "evidence": "desc 953ch, no trigger phrases",
    "fix": "Add trigger phrases and negative cases to description frontmatter",
    "resolvable": true,
    "suggested_skill": "durable-agent-ci-cd-rubrics"
  }
}
```

One task per blocking gap (not per skill) so autoresolve can claim and fix
them independently.

---

## Outcome record format (skill-outcomes.jsonl)

```json
{
  "skill": "durable-toolchain-doctor",
  "graded_at": "2026-06-19T12:00:00Z",
  "outcome_at": "2026-06-19T12:01:00Z",
  "total": 3.65,
  "verdict": "PASS",
  "blocking_tasks_emitted": 0,
  "advisory_tasks_emitted": 1,
  "gaps": [
    { "dim": "D4", "current": 3, "target": 5, "fix": "Run packager" }
  ]
}
```

---

## Stdout verdict table

```
SKILL MERGE GATE — 2026-06-19
═══════════════════════════════════════════════════════════════════════
skill                            D1  D2  D3  D4  total  verdict
─────────────────────────────────────────────────────────────────────
durable-lru-dreams               5   5   4   5   4.85   PASS
durable-pg-memory-store          5   4   4   5   4.55   PASS
durable-toolchain-doctor         3   4   4   3   3.65   PASS
durable-toolchain-install        3   4   4   3   3.65   PASS
durable-toolchain-autoresolve    3   4   4   3   3.65   PASS
alpine-linux-319-toolchain-*     0   1   3   3   1.75   FAIL   ← D1,D2 blocking
ubuntu-2004-lts-toolchain-*      0   1   3   3   1.75   FAIL   ← D1,D2 blocking
dreams-consolidate               0   0   0   2   0.45   FAIL   ← all blocking
heartbeat                        0   0   2   3   1.30   FAIL   ← D1,D2,D3 blocking
═══════════════════════════════════════════════════════════════════════
PASS: 5  ADVISORY: 0  BLOCK: 0  FAIL: 8
Blocking DurableTasks emitted: 16
```

---

## What to do with FAIL skills

FAIL skills in `.Codex/skills/` that predate this rubric are grandfathered —
they stay on disk but get a DurableTask filed. The autoresolve loop (durable-toolchain-autoresolve
pattern) claims tasks and applies fixes incrementally. Priority order:

1. Fix D3 (agent-reuse) first — a skill with no trigger phrases is invisible.
2. Fix D2 (durability) — add DurableTask emission on failure paths.
3. Fix D1 (type-safety) — add schema references.
4. Fix D4 (packaging) — run packager last (depends on D1-D3 being stable).

The `ke_fit_score` on each DurableTask encodes urgency:
- FAIL + blocking dim → `ke_fit_score: 5`
- BLOCK + blocking dim → `ke_fit_score: 4`
- ADVISORY gap → `ke_fit_score: 2`
