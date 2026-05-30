# src/agent/cowork/models.py
#
# Pydantic data models + enums for the PYTHON COWORK lane — the Python mirror of
# the TypeScript zod models that drive the CODING lane.
#
# Differentiation (operator's ask):
#   - TypeScript (src/agent/knowledge-agent/*.ts, corpus-viewer/*.ts) is the
#     CODING lane: code-generation/engineering, zod-typed, runs claude -p.
#   - Python (this module + cowork skills) is the COWORK lane: knowledge work
#     (product-management, etc.) via programmatic MCP tool calling, pydantic-typed.
#
# These pydantic models are the line-for-line mirror of the zod schemas in
# src/agent/corpus-viewer/primitives.ts + knowledge-agent/{schemas,lanes}.ts, so
# the two languages implement ONE shared contract — the entity-relationship
# diagram in docs/architecture/knowledge-engineering-erd.md is that contract.
#
# Pure data models. No I/O, no SDK — importable + testable standalone.
#
# @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
# @cite src/agent/corpus-viewer/primitives.ts  (the zod originals this mirrors)

from __future__ import annotations

from enum import Enum
from pydantic import BaseModel, Field, field_validator


# ── Enums — mirror the zod z.enum() schemas exactly ────────────────────────

class ModelChoice(str, Enum):
    """Mirrors zod ModelChoice. Aliases + the two pinned full IDs."""
    OPUS = "opus"
    SONNET = "sonnet"
    HAIKU = "haiku"
    INHERIT = "inherit"
    OPUS_4_8 = "claude-opus-4-8"
    HAIKU_4_5 = "claude-haiku-4-5-20251001"


class Effort(str, Enum):
    """Mirrors zod Effort / AgentDefinition.effort."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    XHIGH = "xhigh"
    MAX = "max"


class Thinking(str, Enum):
    """Opus 4.8: adaptive is the only thinking-on mode."""
    ADAPTIVE = "adaptive"
    DISABLED = "disabled"


class MemoryScope(str, Enum):
    USER = "user"
    PROJECT = "project"
    LOCAL = "local"
    NONE = "none"


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    DONE = "done"
    FAILED = "failed"
    COMPACTED = "compacted"


class Verdict(str, Enum):
    """Mirrors VerifyVerdict.verdict — the quality gate."""
    PASS = "pass"
    WARN = "warn"
    FAIL = "fail"


class ScriptStage(str, Enum):
    """Mirrors LaneScript.stage — when a skill-script runs in the loop."""
    PRE_VERIFY = "pre-verify"   # deterministic gate BEFORE the model-verifier
    POST_PASS = "post-pass"


# ── Core models — mirror the zod object schemas ────────────────────────────

class Citation(BaseModel):
    source: str = Field(min_length=1)
    last_fetched: str = Field(min_length=1)


class TokenBudget(BaseModel):
    max_output_tokens: int = Field(gt=0)
    compact_at_input_tokens: int = Field(gt=0)
    max_turns: int = Field(gt=0, le=50)

    @field_validator("compact_at_input_tokens")
    @classmethod
    def _no_thrash(cls, v: int, info) -> int:
        mot = info.data.get("max_output_tokens", 0)
        if mot and v <= mot / 4:
            raise ValueError("compact_at_input_tokens too low relative to max_output_tokens — compaction would thrash")
        return v


class CachePolicy(BaseModel):
    cache_system_prefix: bool = True
    cache_tool_definitions: bool = True
    preserve_cache_across_system_messages: bool = True


class BetaFeature(BaseModel):
    name: str = Field(min_length=1)
    surface: str = Field(min_length=1)
    rationale: str = Field(min_length=1)
    citation: Citation


class SubagentSpec(BaseModel):
    """Mirrors the zod SubagentSpec — the per-agent pinned config."""
    name: str = Field(pattern=r"^[a-z][a-z0-9-]*$")
    description: str = Field(min_length=1)
    model: ModelChoice
    effort: Effort
    thinking: Thinking
    budget: TokenBudget
    cache: CachePolicy = CachePolicy()
    memory: MemoryScope = MemoryScope.PROJECT
    tools: list[str] = Field(default_factory=list)
    betas: list[BetaFeature] = Field(default_factory=list)


class TaskEnvelope(BaseModel):
    """Mirrors the zod TaskEnvelope — the START/STOP boundary."""
    id: str = Field(min_length=1)
    content: str = Field(min_length=1)
    active_form: str = Field(min_length=1)
    subagent: str = Field(min_length=1)
    status: TaskStatus = TaskStatus.PENDING
    output_schema_ref: str = Field(min_length=1)
    blocked_by: list[str] = Field(default_factory=list)
    citations: list[Citation] = Field(default_factory=list)


class RubricItem(BaseModel):
    criterion: str = Field(min_length=1)
    met: bool
    evidence: str = Field(min_length=1)


class VerifyVerdict(BaseModel):
    """Mirrors the zod VerifyVerdict — the loop's quality gate."""
    kind: str = "VerifyVerdict"
    verdict: Verdict
    rubric: list[RubricItem]
    citations: list[Citation] = Field(default_factory=list)


class LaneScript(BaseModel):
    """Mirrors the TS LaneScript — a skill's deterministic, programmatically-
    called script. stage=PRE_VERIFY runs it as a cheap gate before the
    model-verifier (the skills-carry-scripts pattern)."""
    name: str = Field(min_length=1)
    path: str = Field(min_length=1)
    stage: ScriptStage
    description: str = Field(min_length=1)


class Lane(BaseModel):
    """Mirrors the TS Lane — a knowledge-work domain as steering data."""
    name: str = Field(min_length=1)
    description: str = Field(min_length=1)
    fleet: list[SubagentSpec]
    skills: list[str]
    verifier_skill: str
    schema_refs: list[str]
    scripts: list[LaneScript] = Field(default_factory=list)
    plugin_path: str


# ── Cowork-specific: the Atlassian product-management task contract ────────

class JiraIssueDraft(BaseModel):
    """A task-with-outcome-and-test the cowork lane creates in Jira. The
    'outcome' + 'acceptance_test' fields are the chassis's discipline (every
    task has a measurable outcome), carried into the Jira description."""
    project_key: str = Field(min_length=1)
    summary: str = Field(min_length=1)
    issue_type: str = "Task"
    outcome: str = Field(min_length=1, description="The measurable outcome this task delivers.")
    acceptance_test: str = Field(min_length=1, description="How we verify it's done.")
    labels: list[str] = Field(default_factory=list)

    def to_description(self) -> str:
        """Render the outcome+test discipline into a Jira description body."""
        return (
            f"*Outcome:* {self.outcome}\n\n"
            f"*Acceptance test:* {self.acceptance_test}\n\n"
            f"_Created by the knowledge-engineering cowork lane (product-management)._"
        )
