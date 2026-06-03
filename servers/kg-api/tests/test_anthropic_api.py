"""
Tests asserting our canonical-API mirrors round-trip JSON the way the SDK does.

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/batches.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/activities.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/sessions.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
"""

from __future__ import annotations

from ke_kg_api.anthropic_api.admin import APIKey, UsageReport, UsageReportRequest, User, Workspace
from ke_kg_api.anthropic_api.batches import (
    MessageBatch,
    MessageBatchCreateParams,
    MessageBatchRequest,
    RequestCounts,
)
from ke_kg_api.anthropic_api.compliance import Activity, ActivityList
from ke_kg_api.anthropic_api.managed_agents import (
    MANAGED_AGENTS_BETA_HEADER,
    Agent,
    AgentCreateParams,
    MemoryStore,
    Session,
    SessionCreateParams,
)
from ke_kg_api.anthropic_api.messages import (
    CacheControlEphemeral,
    Message,
    MessageCreateParams,
    MessageParam,
    TextBlockParam,
    ToolDefinition,
    Usage,
)


class TestMessagesCanonical:
    def test_simple_user_message_round_trip(self):
        body = MessageCreateParams(
            model="claude-opus-4-7",
            max_tokens=1024,
            messages=[MessageParam(role="user", content="Hello, Claude")],
        )
        as_json = body.model_dump(mode="json", exclude_none=True)
        # Canonical shape: model, max_tokens, messages with role + content
        assert as_json["model"] == "claude-opus-4-7"
        assert as_json["max_tokens"] == 1024
        assert as_json["messages"][0] == {"role": "user", "content": "Hello, Claude"}

    def test_cached_text_block(self):
        block = TextBlockParam(
            text="static system",
            cache_control=CacheControlEphemeral(ttl="1h"),
        )
        as_json = block.model_dump(mode="json", exclude_none=True)
        assert as_json == {
            "type": "text",
            "text": "static system",
            "cache_control": {"type": "ephemeral", "ttl": "1h"},
        }

    def test_message_response_parses(self):
        wire = {
            "id": "msg_01ABC",
            "type": "message",
            "role": "assistant",
            "content": [{"type": "text", "text": "ok"}],
            "model": "claude-opus-4-7",
            "stop_reason": "end_turn",
            "usage": {"input_tokens": 10, "output_tokens": 5, "cache_read_input_tokens": 100},
        }
        msg = Message.model_validate(wire)
        assert msg.usage.input_tokens == 10
        assert msg.usage.cache_read_input_tokens == 100
        assert msg.content[0].type == "text"

    def test_tool_definition(self):
        td = ToolDefinition(
            name="kg_search",
            description="search the KG",
            input_schema={"type": "object", "properties": {"q": {"type": "string"}}, "required": ["q"]},
        )
        as_json = td.model_dump(mode="json", exclude_none=True)
        assert as_json["name"] == "kg_search"
        assert as_json["input_schema"]["type"] == "object"


class TestBatchesCanonical:
    def test_batch_create(self):
        body = MessageBatchCreateParams(requests=[
            MessageBatchRequest(
                custom_id="req-1",
                params=MessageCreateParams(
                    model="claude-opus-4-7",
                    max_tokens=10,
                    messages=[MessageParam(role="user", content="hi")],
                ),
            ),
        ])
        as_json = body.model_dump(mode="json", exclude_none=True)
        assert as_json["requests"][0]["custom_id"] == "req-1"

    def test_batch_response(self):
        wire = {
            "id": "batch_01",
            "type": "message_batch",
            "created_at": "2026-06-03T00:00:00Z",
            "expires_at": "2026-06-04T00:00:00Z",
            "processing_status": "in_progress",
            "request_counts": {"processing": 5},
        }
        b = MessageBatch.model_validate(wire)
        assert b.processing_status == "in_progress"
        assert b.request_counts.processing == 5


class TestAdminCanonical:
    def test_api_key_parse(self):
        wire = {
            "id": "apikey_01",
            "created_at": "2024-10-30T23:58:27.427722Z",
            "created_by": {"id": "user_01", "type": "user"},
            "name": "Developer Key",
            "partial_key_hint": "sk-ant-api03-R2D...igAA",
            "status": "active",
            "type": "api_key",
            "workspace_id": "wrkspc_01",
        }
        k = APIKey.model_validate(wire)
        assert k.status == "active"
        assert k.created_by.type == "user"

    def test_user_parse(self):
        u = User.model_validate({
            "id": "user_01", "added_at": "2024-10-30T00:00:00Z",
            "email": "u@x.com", "name": "U", "role": "developer", "type": "user",
        })
        assert u.role == "developer"

    def test_workspace_default_residency(self):
        w = Workspace.model_validate({
            "id": "wrk_01", "created_at": "2024-10-30T00:00:00Z",
            "data_residency": {},
            "display_color": "#FFAA00", "name": "Default",
        })
        assert w.data_residency.workspace_geo == "us"

    def test_usage_report_request_defaults(self):
        req = UsageReportRequest(starting_at="2026-06-01T00:00:00Z")
        assert req.bucket_width == "1d"


class TestComplianceCanonical:
    def test_activity_with_extras(self):
        a = Activity.model_validate({
            "id": "act_1", "type": "admin_api_key_created",
            "organization_id": "org_1", "occurred_at": "2026-06-03T00:00:00Z",
            "actor_id": "user_1", "actor_type": "user",
            "key_id": "apikey_01",  # extra field — kept by extra="allow"
        })
        assert a.type == "admin_api_key_created"
        # extra field is preserved via Pydantic's __pydantic_extra__
        dumped = a.model_dump()
        assert dumped["key_id"] == "apikey_01"

    def test_activity_list(self):
        lst = ActivityList(data=[], has_more=False)
        assert lst.has_more is False


class TestManagedAgentsCanonical:
    def test_beta_header_constant(self):
        assert MANAGED_AGENTS_BETA_HEADER == "managed-agents-2026-04-01"

    def test_agent_create(self):
        params = AgentCreateParams(
            name="Coding Assistant",
            model="claude-opus-4-8",
            system="You are a helpful coding agent.",
            tools=[{"type": "agent_toolset_20260401"}],
        )
        body = params.model_dump(mode="json", exclude_none=True)
        assert body["name"] == "Coding Assistant"
        assert body["tools"][0]["type"] == "agent_toolset_20260401"

    def test_agent_response(self):
        a = Agent.model_validate({
            "id": "agent_01", "version": 1, "name": "C",
            "model": {"id": "claude-opus-4-8"},
            "created_at": "2026-06-03T00:00:00Z",
        })
        assert a.version == 1
        assert a.model.id == "claude-opus-4-8"

    def test_session_create_minimal(self):
        sp = SessionCreateParams(agent="agent_01", environment_id="env_01")
        body = sp.model_dump(mode="json", exclude_none=True)
        assert body == {
            "agent": "agent_01",
            "environment_id": "env_01",
            "metadata": {},
        }

    def test_session_parse_running(self):
        s = Session.model_validate({
            "id": "sess_01", "agent_id": "agent_01", "agent_version": 1,
            "environment_id": "env_01", "state": "running",
            "created_at": "2026-06-03T00:00:00Z",
        })
        assert s.state == "running"

    def test_memory_store_create(self):
        ms = MemoryStore.model_validate({
            "id": "memstore_01", "type": "memory_store",
            "name": "Prefs", "created_at": "2026-06-03T00:00:00Z",
        })
        assert ms.id.startswith("memstore_")
