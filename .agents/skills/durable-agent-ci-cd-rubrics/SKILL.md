---
name: durable-agent-ci-cd-rubrics
description: >
  Canonical scoring rubric for every skill in .Codex/skills/. Defines four
  dimensions — type-safety, durability, agent-reuse, packaging — each scored
  0-5, with pass thresholds and blocking vs. advisory tiers. Use whenever a
  skill is being authored, reviewed, or evaluated before merge; whenever
  durable-agent-ci-cd-evals runs; or when the user asks "how good is this skill",
  "what does a skill need to merge", "rubric a skill", "score this SKILL.md",
  "is this skill mergeable", or "what's wrong with this skill". Fire even on
  "skill review" or "skill audit" — this rubric is the canonical gate. Returns
  a per-dimension score table, a weighted total, a pass/fail verdict, and a
  structured gap list that durable-agent-ci-cd-outcomes writes to engineering.jsonl.
---

<!--
  @cite cowork/templates/task-state-machine.ts   (DurableTask, TaskState)
  @cite cowork/mcp/e2m-mcp/server.ts             (envelope schema, domain queues)
  @cite cowork/coworkers/manifest.json           (plugin registry)
  @cite scripts/lib/citation-guard.ts            (citation enforcement)
-->

## Purpose

Every skill that lands in `.Codex/skills/` runs this rubric before it can merge
to main. The rubric answers three questions a different Codex agent should be
able to answer about any skill without reading its body:

1. **Will the skill produce type-safe, verifiable outputs?**
2. **Will failures surface as durable, actionable tasks — not silent gaps?**
3. **Will another Codex agent (or a coworker) actually trigger this skill?**

Scores feed `durable-agent-ci-cd-evals`, which writes structured JSONL grades.
`durable-agent-ci-cd-outcomes` reads those grades and emits merge-gate verdicts
and blocking DurableTasks to `engineering.jsonl`.

---

## Rubric dimensions (4 × 5-point scale)

### D1 — Type Safety (weight 0.30)

Does the skill's outputs have verified types? Can another agent consume the
output without guessing the schema?

| Score | Criterion |
|-------|-----------|
| 0 | No types anywhere. Outputs are freeform prose or unstructured shell output. |
| 1 | Implicit types only (narrative says "emits JSON" but no schema shown). |
| 2 | Inline JSON example present but no formal schema (no Zod/Pydantic/TypeScript). |
| 3 | A Zod or Pydantic schema exists somewhere in the body OR bundled in `references/`. |
| 4 | Schema present AND every emit path (success + failure) references it explicitly. |
| 5 | Schema present, every emit path typed, AND a `@cite` pointing at the schema source. |

**Blocking threshold: D1 ≥ 2** (skills with D1 < 2 cannot merge).

### D2 — Durability (weight 0.30)

Does the skill make failures visible and recoverable? Durable = no silent drops.

| Score | Criterion |
|-------|-----------|
| 0 | No failure handling. Errors silently swallowed or ignored. |
| 1 | Echo logging present (stderr/stdout) but no structured output on failure. |
| 2 | Failures produce structured output but not written to a durable store. |
| 3 | Failures emit a DurableTask envelope to `cowork/data/queues/<domain>.jsonl`. |
| 4 | DurableTask includes `resolvable`, `error_type`, `suggested_skill` fields. |
| 5 | DurableTask conforms to full schema: required fields + `queue` + `ke_fit_score`. DurableTask transitions (pending→failed) are also written on partial failure. |

**Blocking threshold: D2 ≥ 2** (skills with D2 < 2 cannot merge).

### D3 — Agent Reuse (weight 0.25)

How likely is it that this or another Codex agent will trigger the skill
correctly, unprompted?

| Score | Criterion |
|-------|-----------|
| 0 | Description is missing or empty. |
| 1 | Description present but under 100 chars — too terse to discriminate. |
| 2 | Description > 100 chars, covers what the skill does, but no trigger phrases. |
| 3 | Description includes explicit trigger phrases ("fire when user says X"). |
| 4 | Description covers both positive triggers AND negative cases ("do NOT use for Y"). |
| 5 | Description is ≤ 1024 chars, no angle brackets, has trigger phrases, negative cases, AND names at least one peer skill it pairs with. |

**Blocking threshold: D3 ≥ 3** (skills with D3 < 3 cannot merge — poor descriptions
are the #1 reason skills never get used).

### D4 — Packaging (weight 0.15)

Is the skill correctly structured so the skill-creator can package it and agents
can load it incrementally?

| Score | Criterion |
|-------|-----------|
| 0 | No `SKILL.md` present. |
| 1 | `SKILL.md` present but missing required frontmatter (`name` or `description`). |
| 2 | Frontmatter complete. Description > 1024 chars OR contains angle brackets (fails packager). |
| 3 | Frontmatter valid, description ≤ 1024 chars, no angle brackets. |
| 4 | Score 3 AND bundled resources (`references/` or `scripts/`) are present if the skill references external files. |
| 5 | Score 4 AND a `.skill` zip exists alongside the directory (i.e., packager has been run and output committed). |

**Blocking threshold: D4 ≥ 3** (frontmatter must be valid and description must
pass the packager).

---

## Weighted total

```
total = (D1 × 0.30) + (D2 × 0.30) + (D3 × 0.25) + (D4 × 0.15)
max   = 5.0
```

**Merge verdicts:**

| Total | Verdict |
|-------|---------|
| ≥ 3.5 AND all blocking thresholds met | PASS — merge allowed |
| ≥ 3.5 BUT any blocking threshold missed | BLOCK — fix blocking dims first |
| 2.5 – 3.49 | ADVISORY — merge allowed with documented gaps; DurableTask filed |
| < 2.5 | FAIL — must remediate before merge |

---

## Output format (canonical — consumed by durable-agent-ci-cd-evals)

Every rubric run MUST emit this JSON object (one line, minified) to stdout AND
append it to `cowork/data/queues/skill-grades.jsonl`:

```json
{
  "skill": "durable-toolchain-doctor",
  "rubric_version": "1.0.0",
  "graded_at": "2026-06-19T00:00:00Z",
  "scores": {
    "D1_type_safety":  { "score": 3, "weight": 0.30, "evidence": "DurableTask Zod schema referenced in body" },
    "D2_durability":   { "score": 4, "weight": 0.30, "evidence": "Emits DurableTask with resolvable+error_type+suggested_skill" },
    "D3_agent_reuse":  { "score": 4, "weight": 0.25, "evidence": "Trigger phrases present, negative case documented" },
    "D4_packaging":    { "score": 3, "weight": 0.15, "evidence": "Frontmatter valid, desc 953 chars, no packaged .skill" }
  },
  "total": 3.65,
  "verdict": "PASS",
  "blocking": [],
  "gaps": [
    { "dim": "D1", "current": 3, "target": 5, "fix": "Add @cite to schema source in every emit path" },
    { "dim": "D4", "current": 3, "target": 5, "fix": "Run skill-creator packager and commit .skill zip" }
  ]
}
```

`gaps` entries with `dim` whose `current < blocking_threshold` are promoted to
`blocking` and become blocking DurableTasks in `durable-agent-ci-cd-outcomes`.

---

## Applying the rubric manually

Read a SKILL.md, then score each dimension in order:

1. **D1**: Search for Zod/Pydantic/schema. Check every emit path. Check `@cite`.
2. **D2**: Search for `jsonl`, `DurableTask`, `engineering.jsonl`. Check failure paths.
3. **D3**: Extract `description:` from frontmatter. Count chars. Check trigger phrases,
   negative cases, peer skill names.
4. **D4**: Confirm frontmatter fields. Measure description length. Check for angle
   brackets. Check for `references/` or `scripts/` if skill body references files.
   Check for `.skill` zip sibling.

Then compute weighted total and emit the output JSON.

---

## Known gap baseline (2026-06-19)

From the initial audit of 31 skills in `.Codex/skills/`:

| Gap | Count | Root cause |
|-----|-------|------------|
| D4 < 5 (no packaged .skill) | 29 | Packager never run after authoring |
| D1 < 3 (no schema) | 21 | Skills authored before type-safety requirement |
| D3 < 3 (no trigger phrases) | 8 | Description-only frontmatter, no examples |
| D2 < 3 (no DurableTask on failure) | 18 | Pre-durable skills — emit echo only |
| Description = 0 chars | 11 | `description:` uses single-line not block-scalar |

The `durable-agent-ci-cd-evals` script regenerates this baseline on every run.
