"""
FastAPI router — /v1/compliance/*

@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/activities.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/apps.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/groups.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/compliance/organizations.md
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from .models import (
    Activity,
    ActivityList,
    ActivityQuery,
    ComplianceApp,
    ComplianceGroup,
    ComplianceOrganization,
)

router = APIRouter(prefix="/v1/compliance", tags=["compliance"])


@router.post("/activities", response_model=ActivityList)
async def list_activities(query: ActivityQuery) -> ActivityList:
    """List compliance activities (stub — wire to AlloyDB in production)."""
    return ActivityList(data=[], has_more=False)


@router.get("/activities/{activity_id}", response_model=Activity)
async def get_activity(activity_id: str) -> Activity:
    raise HTTPException(status_code=404, detail=f"activity {activity_id} not found")


@router.get("/apps", response_model=list[ComplianceApp])
async def list_apps() -> list[ComplianceApp]:
    return []


@router.get("/apps/{app_id}", response_model=ComplianceApp)
async def get_app(app_id: str) -> ComplianceApp:
    raise HTTPException(status_code=404, detail=f"app {app_id} not found")


@router.get("/groups", response_model=list[ComplianceGroup])
async def list_groups() -> list[ComplianceGroup]:
    return []


@router.get("/groups/{group_id}", response_model=ComplianceGroup)
async def get_group(group_id: str) -> ComplianceGroup:
    raise HTTPException(status_code=404, detail=f"group {group_id} not found")


@router.get("/organizations", response_model=list[ComplianceOrganization])
async def list_organizations() -> list[ComplianceOrganization]:
    return []


@router.get("/organizations/{org_id}", response_model=ComplianceOrganization)
async def get_organization(org_id: str) -> ComplianceOrganization:
    raise HTTPException(status_code=404, detail=f"organization {org_id} not found")
