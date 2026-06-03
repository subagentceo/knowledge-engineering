"""
Tests for Fivetran-ERD-aligned Admin API types.

@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/workspaces.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
"""

import pytest
from fastapi.testclient import TestClient

from ke_admin_api.main import app
from ke_admin_api.models import (
    APIKey,
    Actor,
    ClaudeCodeUsageReport,
    ClaudeCodeUsageReportModelBreakdown,
    CostReport,
    CostReportBucket,
    CostReportResult,
    Invite,
    MessageBatch,
    MessageBatchResult,
    MessageUsageReport,
    MessageUsageReportResult,
    ModelInfo,
    Organization,
    RateLimit,
    Skill,
    SkillVersion,
    User,
    Workspace,
    WorkspaceMember,
)


class TestOrganization:
    def test_minimal(self):
        org = Organization(id="org_01", name="Acme", created_at="2026-01-01T00:00:00Z")
        assert org.fivetran_id is None

    def test_with_fivetran_id(self):
        org = Organization(id="org_01", name="Acme", created_at="2026-01-01T00:00:00Z", fivetran_id="ft_org_01")
        assert org.fivetran_id == "ft_org_01"


class TestWorkspace:
    def test_fivetran_id_present(self):
        ws = Workspace(id="ws_01", created_at="2026-01-01T00:00:00Z", display_color="#fff", name="Dev", fivetran_id="ft_ws")
        assert ws.fivetran_id == "ft_ws"
        assert ws.org_id is None


class TestWorkspaceMember:
    def test_composite_pk_fields(self):
        m = WorkspaceMember(user_id="usr_01", workspace_id="ws_01", workspace_role="workspace_admin")
        assert m.user_id == "usr_01"
        assert m.workspace_id == "ws_01"
        assert m.fivetran_id is None


class TestClaudeCodeUsageReport:
    def test_model_breakdowns(self):
        r = ClaudeCodeUsageReport(
            id="cc_01",
            period_start="2026-06-01T00:00:00Z",
            period_end="2026-06-30T23:59:59Z",
            model_breakdowns=[
                ClaudeCodeUsageReportModelBreakdown(
                    report_id="cc_01",
                    model="claude-opus-4-7",
                    input_tokens=10_000,
                    output_tokens=3_000,
                    cache_creation_tokens=5_000,
                    cache_read_tokens=8_000,
                )
            ],
        )
        assert len(r.model_breakdowns) == 1
        assert r.model_breakdowns[0].cache_creation_tokens == 5_000


class TestMessageUsageReportResult:
    def test_composite_pk_fields(self):
        row = MessageUsageReportResult(index=0, fivetran_id="ft_row_01", model="claude-haiku-4-5-20251001")
        assert row.index == 0
        assert row.fivetran_id == "ft_row_01"


class TestAPIKey:
    def test_with_fivetran_id(self):
        key = APIKey(
            id="apikey_01",
            created_at="2026-01-01T00:00:00Z",
            created_by=Actor(id="usr_01", type="user"),
            name="CI Key",
            partial_key_hint="sk-ant-...abc",
            status="active",
            fivetran_id="ft_key_01",
        )
        assert key.fivetran_id == "ft_key_01"


class TestMessageBatch:
    def test_workspace_scoped(self):
        b = MessageBatch(
            id="msgbatch_01",
            workspace_id="ws_01",
            processing_status="ended",
            created_at="2026-06-01T00:00:00Z",
            fivetran_id="ft_batch_01",
            results=[MessageBatchResult(batch_id="msgbatch_01", custom_id="req_0", result_type="succeeded")],
        )
        assert b.workspace_id == "ws_01"
        assert b.results[0].result_type == "succeeded"


class TestAdminRoutes:
    @pytest.fixture
    def client(self):
        return TestClient(app)

    def test_health(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "ok"

    def test_list_organizations(self, client):
        resp = client.get("/v1/organizations")
        assert resp.status_code == 200
        assert resp.json() == []

    def test_get_org_404(self, client):
        resp = client.get("/v1/organizations/nonexistent")
        assert resp.status_code == 404

    def test_list_workspaces(self, client):
        resp = client.get("/v1/organizations/org_01/workspaces")
        assert resp.status_code == 200

    def test_usage_report_stub(self, client):
        resp = client.get("/v1/organizations/org_01/usage_report")
        assert resp.status_code == 200

    def test_cost_report_stub(self, client):
        resp = client.get("/v1/organizations/org_01/cost_report")
        assert resp.status_code == 200
