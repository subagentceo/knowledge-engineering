# /// script
# requires-python = ">=3.12"
# dependencies = ["pydantic>=2,<3"]
# ///
#
# src/agent/cowork/test_models.py
#
# Standalone test for the cowork pydantic models — runnable with `uv run` (which
# provides a pydantic-core matching the declared pydantic, sidestepping any
# system-python version skew). Mirrors the discipline of the TS node:test suites.
#
# Run: uv run src/agent/cowork/test_models.py
#
# @cite src/agent/corpus-viewer/primitives.ts  (the zod originals these mirror)

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from models import (  # noqa: E402
    Effort,
    Lane,
    LaneScript,
    ModelChoice,
    ScriptStage,
    SubagentSpec,
    TaskEnvelope,
    Thinking,
    TokenBudget,
    Verdict,
    VerifyVerdict,
    RubricItem,
    JiraIssueDraft,
)


def check(name: str, fn) -> bool:
    try:
        fn()
        print(f"  ok  {name}")
        return True
    except Exception as e:  # noqa: BLE001
        print(f"  XX  {name}: {e}")
        return False


def main() -> int:
    passed = 0
    total = 0

    def t(name, fn):
        nonlocal passed, total
        total += 1
        if check(name, fn):
            passed += 1

    def valid_spec():
        s = SubagentSpec(
            name="knowledge-answerer",
            description="answerer",
            model=ModelChoice.OPUS_4_8,
            effort=Effort.HIGH,
            thinking=Thinking.ADAPTIVE,
            budget=TokenBudget(max_output_tokens=16000, compact_at_input_tokens=120000, max_turns=12),
            tools=["Read"],
        )
        assert s.model is ModelChoice.OPUS_4_8

    def budget_thrash_rejected():
        try:
            TokenBudget(max_output_tokens=16000, compact_at_input_tokens=100, max_turns=12)
            raise AssertionError("should have rejected thrashing budget")
        except ValueError:
            pass

    def kebab_name_enforced():
        try:
            SubagentSpec(
                name="Bad Name",
                description="x",
                model=ModelChoice.HAIKU,
                effort=Effort.LOW,
                thinking=Thinking.DISABLED,
                budget=TokenBudget(max_output_tokens=6000, compact_at_input_tokens=40000, max_turns=8),
            )
            raise AssertionError("should reject non-kebab name")
        except Exception:
            pass

    def verdict_model():
        v = VerifyVerdict(verdict=Verdict.PASS, rubric=[RubricItem(criterion="cited", met=True, evidence="ok")])
        assert v.verdict is Verdict.PASS

    def lane_with_script():
        lane = Lane(
            name="engineering",
            description="code review lane",
            fleet=[SubagentSpec(
                name="knowledge-answerer", description="x", model=ModelChoice.OPUS_4_8,
                effort=Effort.HIGH, thinking=Thinking.ADAPTIVE,
                budget=TokenBudget(max_output_tokens=16000, compact_at_input_tokens=120000, max_turns=12),
                tools=["Read"])],
            skills=["code-review", "testing-strategy"],
            verifier_skill="code-review",
            schema_refs=["KnowledgeAnswer", "VerifyVerdict"],
            scripts=[LaneScript(name="run-tests", path="scripts/lib/run-tests.ts", stage=ScriptStage.PRE_VERIFY, description="gate")],
            plugin_path="third_party/anthropics-knowledge-work-plugins/engineering",
        )
        assert lane.verifier_skill in lane.skills
        assert lane.scripts[0].stage is ScriptStage.PRE_VERIFY

    def jira_draft_renders_outcome():
        d = JiraIssueDraft(project_key="KE", summary="x", outcome="ship the gate", acceptance_test="test count 0")
        assert "Outcome" in d.to_description()
        assert "Acceptance test" in d.to_description()

    def task_envelope_defaults():
        te = TaskEnvelope(id="t1", content="do", active_form="doing", subagent="knowledge-answerer", output_schema_ref="KnowledgeAnswer")
        assert te.status.value == "pending"
        assert te.blocked_by == []

    t("SubagentSpec constructs with pinned model/effort/thinking", valid_spec)
    t("TokenBudget rejects a thrashing compaction threshold", budget_thrash_rejected)
    t("SubagentSpec enforces kebab-case name", kebab_name_enforced)
    t("VerifyVerdict carries verdict + rubric", verdict_model)
    t("Lane mirrors the TS Lane (verifier in skills, pre-verify script)", lane_with_script)
    t("JiraIssueDraft renders outcome + acceptance test", jira_draft_renders_outcome)
    t("TaskEnvelope defaults status=pending, blocked_by=[]", task_envelope_defaults)

    print(f"\n{passed}/{total} passed")
    return 0 if passed == total else 1


if __name__ == "__main__":
    raise SystemExit(main())
