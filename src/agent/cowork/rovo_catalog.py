# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi>=0.115", "pydantic>=2.9", "uvicorn>=0.30"]
# ///
"""Atlassian Rovo tool catalog — FastAPI service (pydantic mirror of rovo-catalog.ts).

Run:    uv run src/agent/cowork/rovo_catalog.py            # self-test (no server)
Serve:  uv run uvicorn src.agent.cowork.rovo_catalog:app   # interactive docs at /docs

Structurally identical to src/lib/rovo-catalog.ts (Tool, ToolList,
CheckAccessRequest/Response). The zod schema is the source of truth.

OAuth-only invariant: NO x-api-key / anthropic-version auth middleware (the
blueprint's version is deliberately dropped). Claude auth is
CLAUDE_CODE_OAUTH_TOKEN, never an API key. The request-id header is kept
(harmless, matches the Claude-API list-response convention).

@cite docs/reference/rovo-api-and-orchestrator-blueprint.md
@cite vendor/anthropics/code.claude.com/docs/en/settings.md
"""
from __future__ import annotations

import uuid
from enum import Enum
from typing import Annotated

from fastapi import FastAPI, HTTPException, Query, Request
from pydantic import BaseModel, Field


class Permission(str, Enum):
    INTERACTIVE = "interactive"
    READ_ONLY = "read_only"
    WRITE_DELETE = "write_delete"


class ToolId(str, Enum):
    CREATE_ISSUE = "create_issue"
    UPDATE_ISSUE = "update_issue"
    GET_ISSUE = "get_issue"
    SEARCH_WITH_JQL = "search_with_jql"
    TRANSITION_ISSUE = "transition_issue"
    GET_CURRENT_USER_INFO = "get_current_user_info"
    FETCH_CONTENT_WITH_ARI = "fetch_content_with_ari"
    LIST_ACCESSIBLE_RESOURCES = "list_accessible_resources"
    GET_ISSUE_LINK_TYPES = "get_issue_link_types"
    GET_REMOTE_LINKS = "get_remote_links"
    GET_FIELD_METADATA = "get_field_metadata"
    GET_ISSUE_TYPES = "get_issue_types"
    GET_TRANSITIONS = "get_transitions"
    GET_PROJECTS = "get_projects"
    LOOKUP_USERS = "lookup_users"
    ROVO_SEARCH = "rovo_search"
    ADD_COMMENT = "add_comment"
    ADD_OR_UPDATE_WORKLOG = "add_or_update_worklog"
    CREATE_ISSUE_LINK = "create_issue_link"


class Tool(BaseModel):
    id: ToolId
    label: str
    permission: Permission
    type: str = "tool"


class ToolList(BaseModel):
    data: list[Tool]
    has_more: bool
    first_id: ToolId | None = None
    last_id: ToolId | None = None


class CheckAccessRequest(BaseModel):
    tool_id: ToolId
    allowed: list[Permission] = Field(default_factory=list)


class CheckAccessResponse(BaseModel):
    tool_id: ToolId
    permission: Permission
    allowed: bool


CATALOG: list[Tool] = [
    Tool(id=ToolId.CREATE_ISSUE, label="Create issue", permission=Permission.INTERACTIVE),
    Tool(id=ToolId.UPDATE_ISSUE, label="Update issue", permission=Permission.INTERACTIVE),
    Tool(id=ToolId.GET_ISSUE, label="Get issue", permission=Permission.INTERACTIVE),
    Tool(id=ToolId.SEARCH_WITH_JQL, label="Search with JQL", permission=Permission.INTERACTIVE),
    Tool(id=ToolId.TRANSITION_ISSUE, label="Transition issue", permission=Permission.INTERACTIVE),
    Tool(id=ToolId.GET_CURRENT_USER_INFO, label="Get current user info", permission=Permission.READ_ONLY),
    Tool(id=ToolId.FETCH_CONTENT_WITH_ARI, label="Fetch content with ARI (beta)", permission=Permission.READ_ONLY),
    Tool(id=ToolId.LIST_ACCESSIBLE_RESOURCES, label="List accessible resources", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_ISSUE_LINK_TYPES, label="Get issue link types", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_REMOTE_LINKS, label="Get remote links", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_FIELD_METADATA, label="Get field metadata", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_ISSUE_TYPES, label="Get issue types", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_TRANSITIONS, label="Get transitions", permission=Permission.READ_ONLY),
    Tool(id=ToolId.GET_PROJECTS, label="Get projects", permission=Permission.READ_ONLY),
    Tool(id=ToolId.LOOKUP_USERS, label="Lookup users", permission=Permission.READ_ONLY),
    Tool(id=ToolId.ROVO_SEARCH, label="Rovo Search Jira and Confluence", permission=Permission.READ_ONLY),
    Tool(id=ToolId.ADD_COMMENT, label="Add comment", permission=Permission.WRITE_DELETE),
    Tool(id=ToolId.ADD_OR_UPDATE_WORKLOG, label="Add or update worklog", permission=Permission.WRITE_DELETE),
    Tool(id=ToolId.CREATE_ISSUE_LINK, label="Create issue link", permission=Permission.WRITE_DELETE),
]
_BY_ID = {t.id: t for t in CATALOG}


def list_tools(
    permission: Permission | None = None,
    limit: int = 100,
    after_id: ToolId | None = None,
) -> ToolList:
    limit = min(max(limit, 1), 100)
    items = [t for t in CATALOG if permission is None or t.permission == permission]
    if after_id is not None:
        ids = [t.id for t in items]
        if after_id not in ids:
            raise ValueError(f"invalid after_id: {after_id}")
        items = items[ids.index(after_id) + 1 :]
    page = items[:limit]
    return ToolList(
        data=page,
        has_more=len(items) > limit,
        first_id=page[0].id if page else None,
        last_id=page[-1].id if page else None,
    )


def check_access(req: CheckAccessRequest) -> CheckAccessResponse:
    tool = _BY_ID.get(req.tool_id)
    if tool is None:
        raise KeyError(req.tool_id)
    return CheckAccessResponse(
        tool_id=tool.id, permission=tool.permission, allowed=tool.permission in req.allowed
    )


app = FastAPI(title="Atlassian Rovo Tool Catalog", version="v1")


@app.middleware("http")
async def add_request_id(request: Request, call_next):
    resp = await call_next(request)
    resp.headers["request-id"] = f"req_{uuid.uuid4().hex}"
    return resp


@app.get("/v1/tools", response_model=ToolList)
def _list(
    permission: Annotated[Permission | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
    after_id: Annotated[ToolId | None, Query()] = None,
) -> ToolList:
    try:
        return list_tools(permission, limit, after_id)
    except ValueError as e:
        raise HTTPException(400, str(e)) from e


@app.get("/v1/tools/{tool_id}", response_model=Tool)
def _get(tool_id: ToolId) -> Tool:
    tool = _BY_ID.get(tool_id)
    if tool is None:
        raise HTTPException(404, "not_found_error")
    return tool


@app.post("/v1/tools/check_access", response_model=CheckAccessResponse)
def _check(req: CheckAccessRequest) -> CheckAccessResponse:
    return check_access(req)


def _self_test() -> None:
    assert len(CATALOG) == 19
    assert len({t.id for t in CATALOG}) == 19
    assert [t.permission for t in CATALOG].count(Permission.INTERACTIVE) == 5
    assert [t.permission for t in CATALOG].count(Permission.READ_ONLY) == 11
    assert [t.permission for t in CATALOG].count(Permission.WRITE_DELETE) == 3

    full = list_tools()
    assert len(full.data) == 19 and full.has_more is False
    assert full.first_id == ToolId.CREATE_ISSUE and full.last_id == ToolId.CREATE_ISSUE_LINK

    first = list_tools(limit=5)
    assert len(first.data) == 5 and first.has_more is True
    nxt = list_tools(limit=5, after_id=first.last_id)
    assert nxt.data[0].id == ToolId.GET_CURRENT_USER_INFO

    assert list_tools(permission=Permission.WRITE_DELETE).data.__len__() == 3
    assert check_access(CheckAccessRequest(tool_id=ToolId.ADD_COMMENT, allowed=[Permission.READ_ONLY])).allowed is False
    assert check_access(CheckAccessRequest(tool_id=ToolId.GET_ISSUE, allowed=[Permission.INTERACTIVE])).allowed is True
    print("rovo_catalog self-test: 12/12 OK")


if __name__ == "__main__":
    _self_test()
