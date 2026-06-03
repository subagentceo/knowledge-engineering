"""
Managed Agents API canonical types — /v1/agents, /v1/sessions, /v1/memory_stores,
/v1/vaults, /v1/skills, /v1/environments, /v1/files, /v1/webhooks.

Every request requires the `anthropic-beta: managed-agents-2026-04-01` header.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/environments.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/skills.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/vaults.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/files.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/webhooks.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/events-and-streaming.md
"""

from __future__ import annotations

from typing import Any, Literal, Union

from pydantic import BaseModel, ConfigDict, Field

MANAGED_AGENTS_BETA_HEADER = "managed-agents-2026-04-01"


# ── Agent ──────────────────────────────────────────────────────────────────────

class ModelConfig(BaseModel):
    id: str  # e.g. "claude-opus-4-8"


class AgentToolset20260401(BaseModel):
    type: Literal["agent_toolset_20260401"] = "agent_toolset_20260401"


class MCPServerReference(BaseModel):
    type: Literal["mcp_server"] = "mcp_server"
    name: str
    url: str
    authorization_token: str | None = None


class SkillReference(BaseModel):
    id: str
    version: int | None = None


class MultiagentCoordinator(BaseModel):
    delegates: list[str]


class AgentCreateParams(BaseModel):
    """POST /v1/agents body."""
    model_config = ConfigDict(extra="forbid")

    name: str
    model: Union[str, ModelConfig]
    system: str | None = None
    description: str | None = None
    tools: list[dict[str, Any]] | None = None
    mcp_servers: list[MCPServerReference] | None = None
    skills: list[SkillReference] | None = None
    multiagent: MultiagentCoordinator | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)


class Agent(BaseModel):
    id: str
    type: Literal["agent"] = "agent"
    version: int
    name: str
    model: ModelConfig
    system: str | None = None
    description: str | None = None
    tools: list[dict[str, Any]] = Field(default_factory=list)
    mcp_servers: list[MCPServerReference] = Field(default_factory=list)
    skills: list[SkillReference] = Field(default_factory=list)
    multiagent: MultiagentCoordinator | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: str
    updated_at: str | None = None


# ── Environment ────────────────────────────────────────────────────────────────

class Environment(BaseModel):
    id: str
    type: Literal["environment"] = "environment"
    name: str
    sandbox_kind: Literal["cloud", "self_hosted"]
    image: str | None = None
    cpu: int | None = None
    memory_mb: int | None = None
    created_at: str


class EnvironmentCreateParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    sandbox_kind: Literal["cloud", "self_hosted"] = "cloud"
    image: str | None = None
    cpu: int | None = None
    memory_mb: int | None = None
    setup_script: str | None = None


# ── Session ────────────────────────────────────────────────────────────────────

SessionState = Literal[
    "created", "running", "waiting_for_input", "paused", "ended", "failed",
]


class SessionCreateParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    agent: Union[str, dict[str, Any]]
    environment_id: str
    vault_ids: list[str] | None = None
    memory_store_ids: list[str] | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)


class Session(BaseModel):
    id: str
    type: Literal["session"] = "session"
    agent_id: str
    agent_version: int
    environment_id: str
    state: SessionState
    vault_ids: list[str] = Field(default_factory=list)
    memory_store_ids: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: str
    started_at: str | None = None
    ended_at: str | None = None


# ── Session events (input) ─────────────────────────────────────────────────────

class UserEvent(BaseModel):
    type: Literal["user_event"] = "user_event"
    text: str | None = None
    content: list[dict[str, Any]] | None = None


class ToolResultEvent(BaseModel):
    type: Literal["tool_result"] = "tool_result"
    tool_use_id: str
    content: Any
    is_error: bool = False


# ── Memory store ───────────────────────────────────────────────────────────────

class MemoryStore(BaseModel):
    id: str
    type: Literal["memory_store"] = "memory_store"
    name: str
    description: str | None = None
    workspace_id: str | None = None
    created_at: str


class MemoryStoreCreateParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    description: str | None = None


class Memory(BaseModel):
    id: str
    type: Literal["memory"] = "memory"
    memory_store_id: str
    path: str
    content: str
    version: int
    created_at: str
    updated_at: str | None = None


# ── Skill (managed agents) ─────────────────────────────────────────────────────

class Skill(BaseModel):
    id: str
    type: Literal["skill"] = "skill"
    name: str
    description: str | None = None
    workspace_id: str | None = None
    version: int
    created_at: str


# ── Vault (secrets) ───────────────────────────────────────────────────────────

class Vault(BaseModel):
    id: str
    type: Literal["vault"] = "vault"
    name: str
    workspace_id: str | None = None
    created_at: str


class Credential(BaseModel):
    id: str
    type: Literal["credential"] = "credential"
    vault_id: str
    name: str
    secret_kind: str  # e.g. "string", "oauth_token"
    created_at: str


# ── File ──────────────────────────────────────────────────────────────────────

class File(BaseModel):
    id: str
    type: Literal["file"] = "file"
    filename: str
    mime_type: str
    size_bytes: int
    created_at: str
    purpose: Literal["session_input", "session_output", "memory", "skill_asset"] | None = None


# ── Webhook ───────────────────────────────────────────────────────────────────

WebhookEventType = Literal[
    "session.created", "session.started", "session.ended", "session.failed",
    "session.event", "session.input_requested",
    "agent.created", "agent.updated",
    "memory.updated", "skill.updated",
]


class Webhook(BaseModel):
    id: str
    type: Literal["webhook"] = "webhook"
    url: str
    event_types: list[WebhookEventType]
    signing_secret_hint: str
    enabled: bool = True
    created_at: str
