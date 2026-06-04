"""
FastAPI router — /v1/organizations/*

@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/workspaces.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/users.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/api_keys.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/cost_report.md
"""

from __future__ import annotations

import json
import os

import redis as redis_lib
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

_CACHE_TTL = 300


def _get_redis() -> redis_lib.Redis:
    url = os.getenv("REDIS_URL", "redis://localhost:6379")
    return redis_lib.from_url(url, decode_responses=True)


def _cache_get(key: str) -> dict | None:
    try:
        r = _get_redis()
        cached = r.get(key)
        if cached:
            return json.loads(cached)
    except Exception:
        pass
    return None


def _cache_set(key: str, value: dict) -> None:
    try:
        r = _get_redis()
        r.setex(key, _CACHE_TTL, json.dumps(value))
    except Exception:
        pass


# ── Organizations ──────────────────────────────────────────────────────────────

@router.get("")
async def list_organizations() -> dict:
    cached = _cache_get("admin_api:orgs")
    if cached:
        return cached
    # Real fetch requires CLAUDE_CODE_OAUTH_TOKEN (not ANTHROPIC_API_KEY).
    result = {"data": [], "source": "admin_api", "cached": False}
    _cache_set("admin_api:orgs", result)
    return result


@router.get("/{org_id}")
async def get_organization(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    # Real fetch requires CLAUDE_CODE_OAUTH_TOKEN — no org found without live token.
    raise HTTPException(status_code=404, detail=f"organization {org_id} not found")


# ── Workspaces ─────────────────────────────────────────────────────────────────

@router.get("/{org_id}/workspaces")
async def list_workspaces(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:workspaces"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result


@router.get("/{org_id}/workspaces/{workspace_id}")
async def get_workspace(org_id: str, workspace_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:workspaces:{workspace_id}"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    raise HTTPException(status_code=404, detail=f"workspace {workspace_id} not found")


# ── Users ──────────────────────────────────────────────────────────────────────

@router.get("/{org_id}/users")
async def list_users(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:users"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result


# ── API keys ───────────────────────────────────────────────────────────────────

@router.get("/{org_id}/api_keys")
async def list_api_keys(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:api_keys"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result


# ── Usage + cost reports ───────────────────────────────────────────────────────

@router.get("/{org_id}/usage_report")
async def get_usage_report(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:usage_report"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {
        "data": [],
        "source": "admin_api",
        "cached": False,
        "workspace_id": org_id,
        "has_more": False,
    }
    _cache_set(cache_key, result)
    return result


@router.get("/{org_id}/cost_report")
async def get_cost_report(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:cost_report"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {
        "data": [],
        "source": "admin_api",
        "cached": False,
        "org_id": org_id,
        "has_more": False,
    }
    _cache_set(cache_key, result)
    return result


@router.get("/{org_id}/claude_code_usage_report")
async def get_claude_code_usage_report(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:claude_code_usage_report"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result


# ── Rate limits ────────────────────────────────────────────────────────────────

@router.get("/{org_id}/rate_limits")
async def list_rate_limits(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:rate_limits"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result


# ── Invites ────────────────────────────────────────────────────────────────────

@router.get("/{org_id}/invites")
async def list_invites(org_id: str) -> dict:
    cache_key = f"admin_api:orgs:{org_id}:invites"
    cached = _cache_get(cache_key)
    if cached:
        return cached
    result = {"data": [], "source": "admin_api", "cached": False, "org_id": org_id}
    _cache_set(cache_key, result)
    return result
