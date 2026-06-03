"""
Admin API canonical types — Fivetran Anthropic Claude ERD aligned.

Covers both Admin Key Tables (org-scoped) and API Key Tables (workspace-scoped)
from the Fivetran connector schema. All models carry an optional `fivetran_id`
for sync-key deduplication.

@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/workspaces.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/users.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/cost_report.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/invites.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/rate_limits.md
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

# ── Common ─────────────────────────────────────────────────────────────────────

class Actor(BaseModel):
    id: str
    type: str


# ── Admin Key Tables (org-scoped) ──────────────────────────────────────────────

class Organization(BaseModel):
    """Top-level billing + identity entity. Owns workspaces."""
    id: str
    name: str
    created_at: str
    billing_email: str | None = None
    fivetran_id: str | None = None


# ── Workspaces ─────────────────────────────────────────────────────────────────

class DataResidency(BaseModel):
    allowed_inference_geos: list[str] | Literal["unrestricted"] = "unrestricted"
    default_inference_geo: str = "global"
    workspace_geo: str = "us"


class Workspace(BaseModel):
    id: str
    org_id: str | None = None
    archived_at: str | None = None
    created_at: str
    data_residency: DataResidency = Field(default_factory=DataResidency)
    display_color: str
    name: str
    tags: dict[str, str] = Field(default_factory=dict)
    type: Literal["workspace"] = "workspace"
    fivetran_id: str | None = None


# ── Workspace members ──────────────────────────────────────────────────────────

class WorkspaceMember(BaseModel):
    """Composite PK: (user_id, workspace_id) per Fivetran ERD."""
    user_id: str
    workspace_id: str
    workspace_role: Literal[
        "workspace_user", "workspace_admin", "workspace_billing", "workspace_developer"
    ]
    type: Literal["workspace_member"] = "workspace_member"
    fivetran_id: str | None = None


# ── Users ──────────────────────────────────────────────────────────────────────

UserRole = Literal["user", "developer", "billing", "admin", "claude_code_user"]


class User(BaseModel):
    id: str
    added_at: str
    email: str
    name: str
    role: UserRole
    type: Literal["user"] = "user"
    fivetran_id: str | None = None


# ── Invites ────────────────────────────────────────────────────────────────────

InviteStatus = Literal["accepted", "expired", "deleted", "pending"]


class Invite(BaseModel):
    id: str
    email: str
    expires_at: str
    invited_at: str
    role: UserRole
    status: InviteStatus
    type: Literal["invite"] = "invite"
    fivetran_id: str | None = None


# ── API keys ───────────────────────────────────────────────────────────────────

APIKeyStatus = Literal["active", "inactive", "archived", "expired"]


class APIKey(BaseModel):
    id: str
    created_at: str
    created_by: Actor
    expires_at: str | None = None
    name: str
    partial_key_hint: str
    status: APIKeyStatus
    type: Literal["api_key"] = "api_key"
    workspace_id: str | None = None
    fivetran_id: str | None = None


# ── Usage report ───────────────────────────────────────────────────────────────

BucketWidth = Literal["1m", "1h", "1d"]
ContextWindow = Literal["0-200k", "200k-1M"]
InferenceGeo = Literal["global", "us", "not_available"]
GroupBy = Literal[
    "api_key_id", "workspace_id", "model", "service_tier", "context_window",
    "inference_geo", "speed", "account_id", "service_account_id",
]


class UsageReportRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    starting_at: str
    ending_at: str | None = None
    bucket_width: BucketWidth = "1d"
    limit: int | None = None
    page: str | None = None
    api_key_ids: list[str] | None = None
    workspace_ids: list[str] | None = None
    models: list[str] | None = None
    service_tiers: list[Literal["standard", "priority", "batch"]] | None = None
    context_window: list[ContextWindow] | None = None
    inference_geos: list[InferenceGeo] | None = None
    account_ids: list[str] | None = None
    service_account_ids: list[str] | None = None
    group_by: list[GroupBy] | None = None


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
    context_window: str | None = None
    inference_geo: str | None = None
    speed: str | None = None
    account_id: str | None = None
    service_account_id: str | None = None


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


# ── Cost report ────────────────────────────────────────────────────────────────

class CostReportResult(BaseModel):
    amount: str
    currency: str = "USD"
    description: str | None = None
    cost_type: str | None = None
    context_window: str | None = None
    model: str | None = None
    service_tier: str | None = None
    workspace_id: str | None = None
    fivetran_id: str | None = None


class CostReportBucket(BaseModel):
    starting_at: str
    ending_at: str
    results: list[CostReportResult]


class CostReport(BaseModel):
    id: str | None = None
    org_id: str | None = None
    period_start: str | None = None
    period_end: str | None = None
    fivetran_id: str | None = None
    data: list[CostReportBucket] = Field(default_factory=list)
    has_more: bool = False
    next_page: str | None = None


# ── ClaudeCode usage report (Fivetran ERD) ─────────────────────────────────────

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


# ── Rate limits ────────────────────────────────────────────────────────────────

class RateLimit(BaseModel):
    id: str
    type: Literal["rate_limit"] = "rate_limit"
    model: str
    workspace_id: str | None = None
    requests_per_minute: int | None = None
    input_tokens_per_minute: int | None = None
    output_tokens_per_minute: int | None = None


# ── API Key Tables (workspace-scoped, Fivetran ERD) ────────────────────────────

class File(BaseModel):
    """File stored in a workspace (managed by Files API)."""
    id: str
    workspace_id: str | None = None
    name: str
    mime_type: str | None = None
    size: int | None = None
    created_at: str
    fivetran_id: str | None = None


class SkillVersion(BaseModel):
    id: str
    skill_id: str | None = None
    version: str
    created_at: str
    fivetran_id: str | None = None


class Skill(BaseModel):
    id: str
    workspace_id: str | None = None
    name: str
    description: str | None = None
    fivetran_id: str | None = None
    versions: list[SkillVersion] = Field(default_factory=list)


class ModelInfo(BaseModel):
    """A Claude model available in this workspace."""
    id: str
    display_name: str
    created_at: str
    type: str | None = None
    fivetran_id: str | None = None


class MessageBatchResult(BaseModel):
    """Single result row for a MessageBatch — composite PK: (batch_id, custom_id)."""
    batch_id: str | None = None
    custom_id: str
    result_type: Literal["succeeded", "errored", "canceled", "expired"]
    fivetran_id: str | None = None


class MessageBatch(BaseModel):
    id: str
    workspace_id: str | None = None
    processing_status: Literal["in_progress", "canceling", "ended"]
    request_counts_processing: int = 0
    request_counts_succeeded: int = 0
    request_counts_errored: int = 0
    request_counts_canceled: int = 0
    request_counts_expired: int = 0
    created_at: str | None = None
    ended_at: str | None = None
    fivetran_id: str | None = None
    results: list[MessageBatchResult] = Field(default_factory=list)
