"""
Admin API canonical types — /v1/organizations/* and /v1/organizations/usage_report,
/v1/organizations/cost_report. Mirrors the X-Api-Key (Admin) surface.

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

# ── Common ────────────────────────────────────────────────────────────────────

class Actor(BaseModel):
    id: str
    type: str


# ── API keys ──────────────────────────────────────────────────────────────────

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


# ── Users ─────────────────────────────────────────────────────────────────────

UserRole = Literal["user", "developer", "billing", "admin", "claude_code_user"]


class User(BaseModel):
    id: str
    added_at: str
    email: str
    name: str
    role: UserRole
    type: Literal["user"] = "user"


# ── Invites ───────────────────────────────────────────────────────────────────

InviteStatus = Literal["accepted", "expired", "deleted", "pending"]


class Invite(BaseModel):
    id: str
    email: str
    expires_at: str
    invited_at: str
    role: UserRole
    status: InviteStatus
    type: Literal["invite"] = "invite"


# ── Workspaces ────────────────────────────────────────────────────────────────

class DataResidency(BaseModel):
    allowed_inference_geos: list[str] | Literal["unrestricted"] = "unrestricted"
    default_inference_geo: str = "global"
    workspace_geo: str = "us"


class Workspace(BaseModel):
    id: str
    archived_at: str | None = None
    created_at: str
    data_residency: DataResidency
    display_color: str
    name: str
    tags: dict[str, str] = Field(default_factory=dict)
    type: Literal["workspace"] = "workspace"


class WorkspaceMember(BaseModel):
    user_id: str
    workspace_id: str
    workspace_role: Literal["workspace_user", "workspace_admin", "workspace_billing", "workspace_developer"]
    type: Literal["workspace_member"] = "workspace_member"


# ── Usage report ──────────────────────────────────────────────────────────────

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


class UsageReportResult(BaseModel):
    uncached_input_tokens: int = 0
    cache_read_input_tokens: int = 0
    cache_creation_input_tokens: int = 0
    cache_creation: dict[str, int] | None = None
    output_tokens: int = 0
    server_tool_use: dict[str, int] | None = None
    web_search_requests: int = 0
    api_key_id: str | None = None
    workspace_id: str | None = None
    model: str | None = None
    service_tier: str | None = None
    context_window: str | None = None
    inference_geo: str | None = None
    speed: str | None = None
    account_id: str | None = None
    service_account_id: str | None = None


class UsageReportBucket(BaseModel):
    starting_at: str
    ending_at: str
    results: list[UsageReportResult]


class UsageReport(BaseModel):
    data: list[UsageReportBucket]
    has_more: bool = False
    next_page: str | None = None


# ── Cost report ───────────────────────────────────────────────────────────────

class CostReportResult(BaseModel):
    amount: str
    currency: str = "USD"
    description: str | None = None
    cost_type: str | None = None
    context_window: str | None = None
    model: str | None = None
    service_tier: str | None = None
    workspace_id: str | None = None


class CostReportBucket(BaseModel):
    starting_at: str
    ending_at: str
    results: list[CostReportResult]


class CostReport(BaseModel):
    data: list[CostReportBucket]
    has_more: bool = False
    next_page: str | None = None


# ── Rate limits ───────────────────────────────────────────────────────────────

class RateLimit(BaseModel):
    id: str
    type: Literal["rate_limit"] = "rate_limit"
    model: str
    workspace_id: str | None = None
    requests_per_minute: int | None = None
    input_tokens_per_minute: int | None = None
    output_tokens_per_minute: int | None = None
