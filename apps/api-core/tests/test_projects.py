"""
Tests for Claude Projects / multi-agent coordination primitives.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
"""

from ke_api_core.projects import (
    AgentDeclaration,
    MultiAgentSession,
    ProjectConfig,
    ProjectOrchestrator,
    SessionConfig,
)


class TestProjectConfig:
    def test_minimal(self):
        cfg = ProjectConfig(name="test-project", workspace_id="wrkspc_01")
        assert cfg.name == "test-project"
        assert cfg.agent_declarations == []
        assert cfg.session_config.max_turns == 10

    def test_with_agents(self):
        cfg = ProjectConfig(
            name="multi-agent",
            workspace_id="wrkspc_01",
            agent_declarations=[
                AgentDeclaration(agent_id="researcher", model="claude-opus-4-7"),
                AgentDeclaration(agent_id="verifier", model="claude-haiku-4-5-20251001"),
            ],
        )
        assert len(cfg.agent_declarations) == 2


class TestProjectOrchestrator:
    def _make_orch(self) -> ProjectOrchestrator:
        cfg = ProjectConfig(
            name="proj-01",
            workspace_id="wrkspc_01",
            agent_declarations=[
                AgentDeclaration(agent_id="coordinator", model="claude-opus-4-7"),
                AgentDeclaration(agent_id="worker-a", model="claude-sonnet-4-6"),
            ],
        )
        return ProjectOrchestrator(cfg)

    def test_spawn_agents_returns_session(self):
        orch = self._make_orch()
        session = orch.spawn_agents()
        assert isinstance(session, MultiAgentSession)
        assert len(session.session_ids) == 2
        assert session.coordinator_session_id == "coordinator-session"

    def test_broadcast_keys(self):
        orch = self._make_orch()
        session = orch.spawn_agents()
        receipts = orch.broadcast("start task", session)
        assert set(receipts.keys()) == set(session.session_ids)
        for v in receipts.values():
            assert v["status"] == "queued"

    def test_empty_declarations(self):
        cfg = ProjectConfig(name="empty", workspace_id="wrkspc_01")
        orch = ProjectOrchestrator(cfg)
        session = orch.spawn_agents()
        assert session.coordinator_session_id == ""
        assert session.session_ids == []
