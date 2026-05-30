# /// script
# requires-python = ">=3.12"
# dependencies = ["pydantic>=2"]
# ///
"""Pydantic mirror of src/agent/team/subagent-schema.ts.

@cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
upstream (not yet mirrored): https://code.claude.com/docs/en/agent-teams.md
                             https://code.claude.com/docs/en/agent-view.md
                             https://code.claude.com/docs/en/workflows.md

Field-for-field mirror of the Zod sub-agent / agent-team / agent-view /
workflow contract. The orchestrator emits OrchestratorView as JSON; both this
module and the SwiftUI agent-view surface decode it. Run directly to self-test:
    uv run src/agent/cowork/team_models.py
"""

from __future__ import annotations

import json
import re
from enum import Enum

from pydantic import BaseModel, Field, field_validator

_NAME_RE = re.compile(r"^[a-z][a-z0-9-]*$")
_JIRA_RE = re.compile(r"^[A-Z]+-\d+$")


# ── sub-agents.md ──────────────────────────────────────────────────────────
class SubagentModelAlias(str, Enum):
    SONNET = "sonnet"
    OPUS = "opus"
    HAIKU = "haiku"
    INHERIT = "inherit"


class PermissionMode(str, Enum):
    DEFAULT = "default"
    ACCEPT_EDITS = "acceptEdits"
    AUTO = "auto"
    DONT_ASK = "dontAsk"
    BYPASS = "bypassPermissions"
    PLAN = "plan"


class MemoryScope(str, Enum):
    USER = "user"
    PROJECT = "project"
    LOCAL = "local"


class Effort(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    XHIGH = "xhigh"
    MAX = "max"


class SubagentColor(str, Enum):
    RED = "red"
    BLUE = "blue"
    GREEN = "green"
    YELLOW = "yellow"
    PURPLE = "purple"
    ORANGE = "orange"
    PINK = "pink"
    CYAN = "cyan"


class Isolation(str, Enum):
    WORKTREE = "worktree"


class SubagentScope(str, Enum):
    MANAGED = "managed"
    CLI = "cli"
    PROJECT = "project"
    USER = "user"
    PLUGIN = "plugin"


class SubagentDefinition(BaseModel):
    """Verbatim sub-agents.md frontmatter; only name + description required.

    `model` accepts an alias or a full model ID, so it's typed str | alias.
    """

    name: str
    description: str
    tools: list[str] | None = None
    disallowed_tools: list[str] | None = Field(default=None, alias="disallowedTools")
    model: SubagentModelAlias | str | None = None
    permission_mode: PermissionMode | None = Field(default=None, alias="permissionMode")
    max_turns: int | None = Field(default=None, alias="maxTurns")
    skills: list[str] | None = None
    mcp_servers: list[str] | None = Field(default=None, alias="mcpServers")
    memory: MemoryScope | None = None
    background: bool | None = None
    effort: Effort | None = None
    isolation: Isolation | None = None
    color: SubagentColor | None = None
    initial_prompt: str | None = Field(default=None, alias="initialPrompt")
    scope: SubagentScope | None = None

    model_config = {"populate_by_name": True}

    @field_validator("name")
    @classmethod
    def _name_shape(cls, v: str) -> str:
        if not _NAME_RE.match(v):
            raise ValueError("name must be lowercase letters and hyphens")
        return v


# ── agent-teams.md ─────────────────────────────────────────────────────────
class TeamTaskState(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class TeammateMode(str, Enum):
    IN_PROCESS = "in-process"
    TMUX = "tmux"
    AUTO = "auto"


class TeamRole(str, Enum):
    LEAD = "lead"
    TEAMMATE = "teammate"


class TeamMember(BaseModel):
    name: str
    agent_id: str = Field(alias="agentId")
    agent_type: str = Field(alias="agentType")
    role: TeamRole = TeamRole.TEAMMATE

    model_config = {"populate_by_name": True}


class TeamTask(BaseModel):
    id: str
    subject: str
    state: TeamTaskState = TeamTaskState.PENDING
    owner: str | None = None
    depends_on: list[str] = Field(default_factory=list, alias="dependsOn")
    jira_key: str | None = Field(default=None, alias="jiraKey")

    model_config = {"populate_by_name": True}

    @field_validator("jira_key")
    @classmethod
    def _jira_shape(cls, v: str | None) -> str | None:
        if v is not None and not _JIRA_RE.match(v):
            raise ValueError("jiraKey must look like SCRUM-7")
        return v


class TeamConfig(BaseModel):
    name: str
    members: list[TeamMember]
    teammate_mode: TeammateMode = Field(default=TeammateMode.AUTO, alias="teammateMode")

    model_config = {"populate_by_name": True}


# ── agent-view.md ──────────────────────────────────────────────────────────
class SessionState(str, Enum):
    WORKING = "working"
    NEEDS_INPUT = "needs_input"
    IDLE = "idle"
    COMPLETED = "completed"
    FAILED = "failed"
    STOPPED = "stopped"


class ProcessShape(str, Enum):
    ALIVE = "alive"
    EXITED = "exited"
    LOOP_SLEEPING = "loop_sleeping"


class PullRequestStatus(str, Enum):
    YELLOW = "yellow"
    GREEN = "green"
    PURPLE = "purple"
    GREY = "grey"


class AgentSession(BaseModel):
    session_id: str = Field(alias="sessionId")
    name: str
    state: SessionState
    shape: ProcessShape = ProcessShape.ALIVE
    cwd: str
    kind: str
    started_at: str = Field(alias="startedAt")
    summary: str | None = None
    pr_number: int | None = Field(default=None, alias="prNumber")
    pr_status: PullRequestStatus | None = Field(default=None, alias="prStatus")
    pinned: bool = False

    model_config = {"populate_by_name": True}


# ── workflows.md ───────────────────────────────────────────────────────────
class WorkflowPhaseMeta(BaseModel):
    title: str
    detail: str | None = None
    model: SubagentModelAlias | None = None


class WorkflowMeta(BaseModel):
    name: str
    description: str
    when_to_use: str | None = Field(default=None, alias="whenToUse")
    phases: list[WorkflowPhaseMeta] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


class WorkflowPhaseProgress(BaseModel):
    title: str
    agent_count: int = Field(default=0, alias="agentCount")
    tokens_total: int = Field(default=0, alias="tokensTotal")
    elapsed_ms: int = Field(default=0, alias="elapsedMs")

    model_config = {"populate_by_name": True}


class WorkflowRunState(str, Enum):
    RUNNING = "running"
    PAUSED = "paused"
    COMPLETED = "completed"
    STOPPED = "stopped"


class WorkflowRun(BaseModel):
    run_id: str = Field(alias="runId")
    meta: WorkflowMeta
    state: WorkflowRunState = WorkflowRunState.RUNNING
    phases: list[WorkflowPhaseProgress] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


class OrchestratorView(BaseModel):
    team: TeamConfig
    tasks: list[TeamTask]
    sessions: list[AgentSession]
    workflows: list[WorkflowRun] = Field(default_factory=list)
    generated_at: str = Field(alias="generatedAt")

    model_config = {"populate_by_name": True}


def _self_test() -> int:
    passed = failed = 0

    def check(name: str, fn) -> None:
        nonlocal passed, failed
        try:
            fn()
            passed += 1
            print(f"  PASS {name}")
        except Exception as exc:  # noqa: BLE001 - self-test reporter
            failed += 1
            print(f"  FAIL {name}: {exc}")

    check(
        "subagent rejects bad name",
        lambda: _expect_raises(lambda: SubagentDefinition(name="Bad Name", description="x")),
    )
    check(
        "subagent accepts full frontmatter",
        lambda: SubagentDefinition(
            name="code-reviewer",
            description="review diffs",
            tools=["Read", "Grep"],
            disallowedTools=["Write", "Edit"],
            model=SubagentModelAlias.OPUS,
            permissionMode=PermissionMode.PLAN,
            memory=MemoryScope.PROJECT,
            effort=Effort.HIGH,
            color=SubagentColor.CYAN,
            isolation=Isolation.WORKTREE,
        ),
    )
    check(
        "subagent model accepts full model id",
        lambda: SubagentDefinition(name="opus-agent", description="x", model="claude-opus-4-8"),
    )
    check(
        "team task jira bridge",
        lambda: TeamTask(id="t1", subject="pre-verify gate", jiraKey="SCRUM-7"),
    )
    check(
        "team task rejects bad jira key",
        lambda: _expect_raises(lambda: TeamTask(id="t1", subject="x", jiraKey="scrum7")),
    )

    sample = OrchestratorView(
        team=TeamConfig(
            name="knowledge-engineering",
            members=[
                TeamMember(name="lead", agentId="a0", agentType="claude", role=TeamRole.LEAD),
                TeamMember(name="pre-verify-gate", agentId="a1", agentType="refactoring-expert"),
            ],
        ),
        tasks=[TeamTask(id="t7", subject="SCRUM-7 pre-verify gate", jiraKey="SCRUM-7", owner="pre-verify-gate", state=TeamTaskState.IN_PROGRESS)],
        sessions=[AgentSession(sessionId="7c5dcf5d", name="pre-verify-gate", state=SessionState.WORKING, cwd=".", kind="session", startedAt="2026-05-30T21:00:00Z", summary="Edit steer.ts")],
        workflows=[],
        generatedAt="2026-05-30T21:00:00Z",
    )
    check(
        "OrchestratorView round-trips through JSON aliases",
        lambda: OrchestratorView.model_validate_json(sample.model_dump_json(by_alias=True)),
    )
    check(
        "OrchestratorView json is camelCase for Swift",
        lambda: _expect_keys(json.loads(sample.model_dump_json(by_alias=True)), {"team", "tasks", "sessions", "workflows", "generatedAt"}),
    )

    print(f"\n{passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


def _expect_raises(fn) -> None:
    try:
        fn()
    except Exception:  # noqa: BLE001
        return
    raise AssertionError("expected a validation error")


def _expect_keys(obj: dict, keys: set[str]) -> None:
    missing = keys - set(obj)
    if missing:
        raise AssertionError(f"missing keys: {missing}")


if __name__ == "__main__":
    raise SystemExit(_self_test())
