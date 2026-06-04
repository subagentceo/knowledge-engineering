"""
Fivetran-bridge canonical types — mirrored from Admin API models.

@cite apps/admin-api/src/ke_admin_api/models.py
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/workspaces.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class Organization(BaseModel):
    """Top-level billing + identity entity. Owns workspaces."""
    id: str
    name: str
    created_at: str
    billing_email: str | None = None
    fivetran_id: str | None = None


class Workspace(BaseModel):
    id: str
    org_id: str | None = None
    archived_at: str | None = None
    created_at: str
    name: str
    display_color: str
    type: Literal["workspace"] = "workspace"
    fivetran_id: str | None = None


class APIKey(BaseModel):
    id: str
    created_at: str
    name: str
    partial_key_hint: str
    status: str
    type: Literal["api_key"] = "api_key"
    workspace_id: str | None = None
    fivetran_id: str | None = None


class MessageUsageReportResult(BaseModel):
    """One row in a MessageUsageReport — composite PK: (index, fivetran_id)."""
    index: int
    fivetran_id: str | None = None
    report_id: str | None = None
    model: str | None = None
    uncached_input_tokens: int = 0
    cache_read_input_tokens: int = 0
    cache_creation_input_tokens: int = 0
    output_tokens: int = 0
    web_search_requests: int = 0
    api_key_id: str | None = None
    workspace_id: str | None = None
    service_tier: str | None = None


class MessageUsageReport(BaseModel):
    """Usage report scoped to a workspace."""
    id: str | None = None
    workspace_id: str | None = None
    period_start: str | None = None
    period_end: str | None = None
    fivetran_id: str | None = None
    data: list[MessageUsageReportResult] = Field(default_factory=list)
    has_more: bool = False
    next_page: str | None = None


class ClaudeCodeUsageReportModelBreakdown(BaseModel):
    """Per-model token breakdown for a Claude Code usage report."""
    report_id: str | None = None
    model: str
    input_tokens: int = 0
    output_tokens: int = 0
    cache_creation_tokens: int = 0
    cache_read_tokens: int = 0
    fivetran_id: str | None = None


class ClaudeCodeUsageReport(BaseModel):
    """Usage report for Claude Code (IDE + CLI) activity, org-scoped."""
    id: str
    org_id: str | None = None
    period_start: str
    period_end: str
    fivetran_id: str | None = None
    model_breakdowns: list[ClaudeCodeUsageReportModelBreakdown] = Field(default_factory=list)
