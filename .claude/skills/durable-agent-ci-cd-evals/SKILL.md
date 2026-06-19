---
name: durable-agent-ci-cd-evals
description: >
  Deterministic eval harness — scans every skill directory under .claude/skills/,
  applies the durable-agent-ci-cd-rubrics scoring rubric to each SKILL.md, and
  writes per-skill grade records to cowork/data/queues/skill-grades.jsonl. Use
  whenever you want to score all skills in batch, before a merge, after authoring
  a new skill, on a scheduled cadence, or when durable-agent-ci-cd-outcomes needs
  fresh grades. Trigger on: "run evals", "score all skills", "skill audit",
  "grade the skills", "eval ci", "skill ci", "check skill quality", "which skills
  pass the rubric", "run the skill gate". Always runs before durable-agent-ci-cd-outcomes.
  Pairs with durable-agent-ci-cd-rubrics (scoring logic) and
  durable-agent-ci-cd-outcomes (merge-gate verdicts + DurableTask emission).
---

<!--
  @cite .claude/skills/durable-agent-ci-cd-rubrics/SKILL.md   (rubric spec)
  @cite cowork/templates/task-state-machine.ts                  (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts                           (queue paths)
  @cite scripts/lib/citation-guard.ts                           (citation enforcement)
-->

## What this skill does

Runs `scripts/eval_skills.py` against the `.claude/skills/` directory tree,
producing:

- `cowork/data/queues/skill-grades.jsonl` — one grade record per skill (last-line-wins per skill name)
- `cowork/artifacts/skill-eval-YYYY-MM-DD.html` — human-readable scorecard
- stdout summary table

The eval script is deterministic: given the same SKILL.md content it always
produces the same score. Scores are computed locally — no model calls needed.

---

## Run it

```bash
# from repo root
python3 .claude/skills/durable-agent-ci-cd-evals/scripts/eval_skills.py \
  --skills-dir .claude/skills \
  --output cowork/data/queues/skill-grades.jsonl \
  --html cowork/artifacts/skill-eval-$(date +%F).html

# single skill
python3 .claude/skills/durable-agent-ci-cd-evals/scripts/eval_skills.py \
  --skill durable-toolchain-doctor \
  --skills-dir .claude/skills \
  --output cowork/data/queues/skill-grades.jsonl
```

---

## eval_skills.py — full implementation

Read `scripts/eval_skills.py` (bundled). Key logic summary:

```python
# For each skill_dir in skills_dir/:
#   1. Parse frontmatter (name, description)
#   2. Score D1-D4 per rubric
#   3. Compute weighted total
#   4. Emit grade JSON to skill-grades.jsonl
#   5. Collect gaps → blocking list
```

Scoring functions map directly to the rubric:

```python
def score_d1(text: str, skill_dir: Path) -> tuple[int, str]:
    """Type safety: Zod/Pydantic schema + @cite on emit paths."""
    has_cite   = "@cite" in text
    has_schema = any(x in text for x in ["z.object","Zod","zod","BaseModel","Pydantic","schema.ts","schema.py"])
    has_ref_schema = any(
        f.suffix in (".ts",".py") and "schema" in f.name
        for f in (skill_dir / "references").glob("*") if (skill_dir / "references").exists()
    )
    # emit path check: body mentions the schema near emit keywords
    emit_typed = bool(re.search(r'(append|emit|write|json\.dumps|jsonl).{0,200}(DurableTask|schema|Zod|BaseModel)', text, re.DOTALL))

    if has_cite and (has_schema or has_ref_schema) and emit_typed:  return 5, "cite+schema+emit-typed"
    if (has_schema or has_ref_schema) and emit_typed:               return 4, "schema+emit-typed (no cite)"
    if has_schema or has_ref_schema:                                 return 3, "schema present"
    if re.search(r'```json', text):                                  return 2, "inline JSON example only"
    if re.search(r'emit|output|json', text, re.IGNORECASE):         return 1, "implicit types"
    return 0, "no types"

def score_d2(text: str, skill_dir: Path) -> tuple[int, str]:
    """Durability: failure handling → DurableTask envelope."""
    has_jsonl  = bool(re.search(r'engineering\.jsonl|skill-grades\.jsonl|\.jsonl', text))
    has_task   = bool(re.search(r'DurableTask|durable_task|queue.*engineering', text))
    has_fields = bool(re.search(r'resolvable|error_type|suggested_skill', text))
    full_schema = bool(re.search(r'ke_fit_score|queue.*engineering|created_at', text))
    has_echo   = bool(re.search(r'\[FAIL\]|\[OK\]|\[INSTALL\]|stderr|log_fail', text))
    has_struct = bool(re.search(r'json\.dumps|JSON\.stringify|emit.*fail|fail.*emit', text, re.IGNORECASE))

    if has_task and has_fields and full_schema:  return 5, "full DurableTask schema"
    if has_task and has_fields:                  return 4, "DurableTask+resolvable+error_type+suggested_skill"
    if has_task or has_jsonl:                    return 3, "DurableTask/JSONL present"
    if has_struct:                               return 2, "structured failure output"
    if has_echo:                                 return 1, "echo logging only"
    return 0, "no failure handling"

def score_d3(text: str, desc: str) -> tuple[int, str]:
    """Agent reuse: description quality + trigger phrases."""
    dlen = len(desc)
    has_triggers = bool(re.search(r'[Ff]ire|[Tt]rigger|whenever|[Uu]se when', text))
    has_negative = bool(re.search(r'[Dd]o NOT|never use|not for', text))
    has_peer     = bool(re.search(r'[Pp]airs with|durable-agent|durable-toolchain|durable-lru|durable-pg', text))
    valid_len    = 100 <= dlen <= 1024
    no_angle     = "<" not in desc and ">" not in desc

    if valid_len and no_angle and has_triggers and has_negative and has_peer:
        return 5, f"desc {dlen}ch, triggers+negative+peer"
    if valid_len and no_angle and has_triggers and has_negative:
        return 4, f"desc {dlen}ch, triggers+negative (no peer)"
    if valid_len and has_triggers:
        return 3, f"desc {dlen}ch, trigger phrases present"
    if dlen > 100:
        return 2, f"desc {dlen}ch, no trigger phrases"
    if dlen > 0:
        return 1, f"desc {dlen}ch, too terse"
    return 0, "description missing or empty"

def score_d4(text: str, skill_dir: Path) -> tuple[int, str]:
    """Packaging: frontmatter validity + packager output."""
    has_skill_md  = (skill_dir / "SKILL.md").exists()
    has_name      = bool(re.search(r'^name:\s*\S', text, re.MULTILINE))
    has_desc      = bool(re.search(r'^description:', text, re.MULTILINE))
    desc_m        = re.search(r'^description:\s*>\n((?:  .+\n)+)', text, re.MULTILINE)
    desc          = re.sub(r'\n\s+', ' ', desc_m.group(1)).strip() if desc_m else ""
    desc_ok       = 0 < len(desc) <= 1024 and "<" not in desc and ">" not in desc
    has_refs      = (skill_dir / "references").is_dir()
    has_scripts   = (skill_dir / "scripts").is_dir()
    refs_needed   = bool(re.search(r'references/|scripts/', text))
    bundled_ok    = (not refs_needed) or has_refs or has_scripts
    packaged      = list(skill_dir.parent.glob(f"{skill_dir.name}.skill"))

    if not has_skill_md:              return 0, "no SKILL.md"
    if not (has_name and has_desc):   return 1, "frontmatter incomplete"
    if not desc_ok:                   return 2, f"desc invalid: len={len(desc)} angle={'Y' if '<' in desc else 'N'}"
    if not bundled_ok:                return 3, "missing references/ or scripts/ (referenced in body)"
    if packaged:                      return 5, f"packaged: {packaged[0].name}"
    return 3, "frontmatter valid, not packaged"
```

Grade JSON format (one record per skill, appended to skill-grades.jsonl):

```json
{
  "skill": "durable-toolchain-doctor",
  "rubric_version": "1.0.0",
  "graded_at": "2026-06-19T12:00:00Z",
  "scores": {
    "D1_type_safety":  { "score": 3, "weight": 0.30, "evidence": "..." },
    "D2_durability":   { "score": 4, "weight": 0.30, "evidence": "..." },
    "D3_agent_reuse":  { "score": 4, "weight": 0.25, "evidence": "..." },
    "D4_packaging":    { "score": 3, "weight": 0.15, "evidence": "..." }
  },
  "total": 3.65,
  "verdict": "PASS",
  "blocking": [],
  "gaps": [
    { "dim": "D4", "current": 3, "target": 5, "fix": "Run packager, commit .skill zip" }
  ]
}
```

---

## HTML scorecard format

The `--html` flag writes a self-contained HTML file with:

- Summary row: total skills, pass/block/advisory/fail counts
- Per-skill table: name | D1 | D2 | D3 | D4 | total | verdict | top gap
- Color coding: green ≥ 4, amber 3, red < 3
- Sorted by total ascending (worst first)

Read `scripts/eval_skills.py` for the full implementation including HTML generation.

---

## Scheduling

Register as a nightly task so grades stay current:

```bash
# add to cron or scheduled-tasks MCP
0 6 * * * cd /path/to/knowledge-engineering && \
  python3 .claude/skills/durable-agent-ci-cd-evals/scripts/eval_skills.py \
    --skills-dir .claude/skills \
    --output cowork/data/queues/skill-grades.jsonl \
    --html cowork/artifacts/skill-eval-$(date +%F).html
```

After each run, `durable-agent-ci-cd-outcomes` should be invoked to emit any
new blocking DurableTasks.
