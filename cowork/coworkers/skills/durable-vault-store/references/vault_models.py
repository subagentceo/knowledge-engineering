"""
Pydantic v2 models for durable-vault-store.

@cite platform.claude.com/docs/en/managed-agents/vaults.md
@cite platform.claude.com/docs/en/api/beta/vaults/credentials/archive.md
"""
from __future__ import annotations
from datetime import datetime
from enum import Enum
from typing import Annotated, Literal, Optional, Union
from pydantic import BaseModel, Field


class VaultStatus(str, Enum):
    active = "active"
    archived = "archived"
    deleted = "deleted"


class AuthType(str, Enum):
    static_bearer = "static_bearer"
    mcp_oauth = "mcp_oauth"


# ── Credential auth subtypes ──────────────────────────────────────────────────

class StaticBearerAuth(BaseModel):
    type: Literal["static_bearer"]
    mcp_server_url: str
    # token is write-only; never returned in API responses


class TokenEndpointAuthNone(BaseModel):
    type: Literal["none"]

class TokenEndpointAuthBasic(BaseModel):
    type: Literal["client_secret_basic"]

class TokenEndpointAuthPost(BaseModel):
    type: Literal["client_secret_post"]

TokenEndpointAuth = Annotated[
    Union[TokenEndpointAuthNone, TokenEndpointAuthBasic, TokenEndpointAuthPost],
    Field(discriminator="type"),
]


class MCPOAuthRefresh(BaseModel):
    token_endpoint: str
    client_id: str
    scope: Optional[str] = None
    resource: Optional[str] = None
    token_endpoint_auth: TokenEndpointAuth
    # refresh_token + client_secret are write-only


class MCPOAuthAuth(BaseModel):
    type: Literal["mcp_oauth"]
    mcp_server_url: str
    expires_at: Optional[datetime] = None
    refresh: Optional[MCPOAuthRefresh] = None
    # access_token is write-only; never returned


CredentialAuth = Annotated[
    Union[StaticBearerAuth, MCPOAuthAuth],
    Field(discriminator="type"),
]


# ── Core models ───────────────────────────────────────────────────────────────

class DurableVault(BaseModel):
    vault_id: str                           # "vlt_01..."
    display_name: str
    metadata: dict[str, str] = Field(default_factory=dict)
    status: VaultStatus = VaultStatus.active
    archived_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


class DurableCredential(BaseModel):
    credential_id: str                      # "vcrd_01..."
    vault_id: str
    display_name: Optional[str] = None
    auth: CredentialAuth
    mcp_server_url: str                     # denormalized for queries
    auth_type: AuthType
    status: VaultStatus = VaultStatus.active
    archived_at: Optional[datetime] = None
    metadata: dict[str, str] = Field(default_factory=dict)
    created_at: datetime
    updated_at: datetime


class CredentialRotation(BaseModel):
    id: int
    credential_id: str
    vault_id: str
    rotated_at: datetime
    rotated_by: str                         # skill name or user ID


# ── DurableTask payload ───────────────────────────────────────────────────────

class VaultDurableTaskPayload(BaseModel):
    vault_id: str
    credential_id: Optional[str] = None
    mcp_server_url: str
    auth_type: AuthType
    operation: Literal["create", "rotate", "archive", "migrate"]
    resolvable: bool
    suggested_skill: Literal["durable-vault-store"]
    note: str
