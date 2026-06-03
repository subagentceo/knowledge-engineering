"""
FastAPI router — /v1/organizations/*

@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/workspaces.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/users.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/cost_report.md
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from .models import (
    APIKey,
    ClaudeCodeUsageReport,
    CostReport,
    Invite,
    MessageBatch,
    MessageUsageReport,
    Organization,
    RateLimit,
    Skill,
    User,
    Workspace,
    WorkspaceMember,
)

router = APIRouter(prefix="/v1/organizations", tags=["admin"])


# ── Organizations ──────────────────────────────────────────────────────────────

@router.get("", response_model=list[Organization])
async def list_organizations() -> list[Organization]:
    return []


@router.get("/{org_id}", response_model=Organization)
async def get_organization(org_id: str) -> Organization:
    raise HTTPException(status_code=404, detail=f"organization {org_id} not found")


# ── Workspaces ─────────────────────────────────────────────────────────────────

@router.get("/{org_id}/workspaces", response_model=list[Workspace])
async def list_workspaces(org_id: str) -> list[Workspace]:
    return []


@router.get("/{org_id}/workspaces/{workspace_id}", response_model=Workspace)
async def get_workspace(org_id: str, workspace_id: str) -> Workspace:
    raise HTTPException(status_code=404, detail=f"workspace {workspace_id} not found")


# ── Users ──────────────────────────────────────────────────────────────────────

@router.get("/{org_id}/users", response_model=list[User])
async def list_users(org_id: str) -> list[User]:
    return []


# ── API keys ───────────────────────────────────────────────────────────────────

@router.get("/{org_id}/api_keys", response_model=list[APIKey])
async def list_api_keys(org_id: str) -> list[APIKey]:
    return []


# ── Usage + cost reports ───────────────────────────────────────────────────────

@router.get("/{org_id}/usage_report", response_model=MessageUsageReport)
async def get_usage_report(org_id: str) -> MessageUsageReport:
    return MessageUsageReport(workspace_id=org_id)


@router.get("/{org_id}/cost_report", response_model=CostReport)
async def get_cost_report(org_id: str) -> CostReport:
    return CostReport(org_id=org_id)


@router.get("/{org_id}/claude_code_usage_report", response_model=list[ClaudeCodeUsageReport])
async def get_claude_code_usage_report(org_id: str) -> list[ClaudeCodeUsageReport]:
    return []


# ── Rate limits ────────────────────────────────────────────────────────────────

@router.get("/{org_id}/rate_limits", response_model=list[RateLimit])
async def list_rate_limits(org_id: str) -> list[RateLimit]:
    return []


# ── Invites ────────────────────────────────────────────────────────────────────

@router.get("/{org_id}/invites", response_model=list[Invite])
async def list_invites(org_id: str) -> list[Invite]:
    return []
