"""
Claude Projects / multi-agent coordination primitives.

Models Claude Projects as workspace-level coordination objects: a project
declares its agent roster, each agent's model + tools + memory_store, and the
session config that governs each spawned session. ProjectOrchestrator is a
thin coordination layer — it builds MultiAgentSession stubs and broadcasts
messages across sessions.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agents.md
"""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class AgentDeclaration(BaseModel):
    agent_id: str
    model: str
    tools: list[str] = Field(default_factory=list)
    memory_store_id: str | None = None


class SessionConfig(BaseModel):
    max_turns: int = 10
    system_prompt: str | None = None


class ProjectConfig(BaseModel):
    name: str
    description: str | None = None
    workspace_id: str
    agent_declarations: list[AgentDeclaration] = Field(default_factory=list)
    session_config: SessionConfig = Field(default_factory=SessionConfig)


class MultiAgentSession(BaseModel):
    project_id: str
    session_ids: list[str]
    coordinator_session_id: str


class ProjectOrchestrator:
    def __init__(self, config: ProjectConfig) -> None:
        self.config = config

    def spawn_agents(self) -> MultiAgentSession:
        """Build session stubs from AgentDeclarations.

        First declaration is the coordinator. Returns before any network call —
        callers wire actual Session creation against the Managed Agents API.
        """
        session_ids = [
            f"{decl.agent_id}-session" for decl in self.config.agent_declarations
        ]
        coordinator = session_ids[0] if session_ids else ""
        return MultiAgentSession(
            project_id=self.config.name,
            session_ids=session_ids,
            coordinator_session_id=coordinator,
        )

    def broadcast(
        self, message: str, session: MultiAgentSession
    ) -> dict[str, Any]:
        """Return a mapping of session_id → queued receipt stub."""
        return {
            sid: {"status": "queued", "message": message}
            for sid in session.session_ids
        }
