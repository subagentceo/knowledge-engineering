"""
Compliance API canonical types — /v1/compliance/*

@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/activities.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/apps.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/groups.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/organizations.md
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field

# ── Compliance activities ──────────────────────────────────────────────────────

class Activity(BaseModel):
    """A single compliance activity row.

    The `type` field selects from 300+ canonical activity types; we keep it
    as `str` instead of an enormous Literal so the model is forward-compatible.
    Additional per-type fields ride as ``data`` extras.
    """
    model_config = ConfigDict(extra="allow")

    id: str
    type: str
    organization_id: str
    occurred_at: str
    actor_id: str | None = None
    actor_type: str | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class ActivityQuery(BaseModel):
    activity_types: list[str] | None = None
    starting_at: str | None = None
    ending_at: str | None = None
    organization_ids: list[str] | None = None
    actor_ids: list[str] | None = None
    limit: int | None = None
    page: str | None = None


class ActivityList(BaseModel):
    data: list[Activity]
    has_more: bool = False
    next_page: str | None = None


# ── Apps (compliance scope) ────────────────────────────────────────────────────

class ComplianceApp(BaseModel):
    id: str
    type: Literal["app"] = "app"
    name: str
    description: str | None = None
    created_at: str
    updated_at: str | None = None


# ── Groups ─────────────────────────────────────────────────────────────────────

class ComplianceGroup(BaseModel):
    id: str
    type: Literal["group"] = "group"
    name: str
    description: str | None = None
    member_count: int = 0
    created_at: str


# ── Organizations (compliance view) ────────────────────────────────────────────

class ComplianceOrganization(BaseModel):
    id: str
    type: Literal["organization"] = "organization"
    name: str
    parent_organization_id: str | None = None
    created_at: str
