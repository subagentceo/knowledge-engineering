"""
Tests for Compliance API types and routes.

@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/activities.md
"""

import pytest
from fastapi.testclient import TestClient

from ke_compliance_api.main import app
from ke_compliance_api.models import (
    Activity,
    ActivityList,
    ActivityQuery,
    ComplianceApp,
    ComplianceGroup,
    ComplianceOrganization,
)


class TestActivityModel:
    def test_minimal(self):
        a = Activity(id="act_01", type="message.create", organization_id="org_01", occurred_at="2026-06-01T00:00:00Z")
        assert a.type == "message.create"

    def test_extra_fields_allowed(self):
        a = Activity(
            id="act_01", type="batch.create", organization_id="org_01",
            occurred_at="2026-06-01T00:00:00Z",
            custom_field="accepted",
        )
        assert a.model_extra.get("custom_field") == "accepted"

    def test_activity_list_pagination(self):
        al = ActivityList(data=[], has_more=True, next_page="cursor_abc")
        assert al.next_page == "cursor_abc"


class TestComplianceRoutes:
    @pytest.fixture
    def client(self):
        return TestClient(app)

    def test_health(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "ok"

    def test_list_activities_empty(self, client):
        resp = client.post("/v1/compliance/activities", json={})
        assert resp.status_code == 200
        assert resp.json()["data"] == []

    def test_get_activity_404(self, client):
        resp = client.get("/v1/compliance/activities/nonexistent")
        assert resp.status_code == 404

    def test_list_apps(self, client):
        resp = client.get("/v1/compliance/apps")
        assert resp.status_code == 200
        assert resp.json() == []

    def test_list_groups(self, client):
        resp = client.get("/v1/compliance/groups")
        assert resp.status_code == 200

    def test_list_organizations(self, client):
        resp = client.get("/v1/compliance/organizations")
        assert resp.status_code == 200
