"""
Managed Agents Memory API — Python / Pydantic v2 Bindings
Source: https://platform.claude.com/docs/en/managed-agents/memory
Beta: managed-agents-2026-04-01

Type-safety cascade: YAML → TypeScript/Zod → Rust/serde → THIS FILE

Install:
    pip install pydantic anthropic

Usage:
    from memory import CreateMemoryStoreParams, MemoryStore, MemoryStoreResource
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Annotated, Generic, Literal, Optional, TypeVar

from pydantic import BaseModel, Field, field_validator, model_validator

# ── Constants / Limits ────────────────────────────────────────────────────────

MEMORY_MAX_BYTES: int = 102_400          # 100 kB per memory
MEMORIES_PER_STORE: int = 2_000         # max memories per store
STORES_PER_SESSION: int = 8             # max stores per session
INSTRUCTIONS_MAX_CHARS: int = 4_096     # session-level instructions
VERSION_RETENTION_DAYS: int = 30        # versions retained (recent always kept)
RATE_CREATE_RPM: int = 300              # create endpoints per org per minute
RATE_READ_RPM: int = 600               # read endpoints per org per minute

API_BASE: str = "https://api.anthropic.com"
API_VERSION: str = "2023-06-01"
BETA_HEADER: str = "managed-agents-2026-04-01"


def api_headers(api_key: str) -> dict[str, str]:
    return {
        "x-api-key": api_key,
        "anthropic-version": API_VERSION,
        "anthropic-beta": BETA_HEADER,
        "content-type": "application/json",
    }


# ── Enums ─────────────────────────────────────────────────────────────────────

class MemoryAccess(str, Enum):
    READ_WRITE = "read_write"
    READ_ONLY  = "read_only"


class MemoryOperation(str, Enum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"
    REDACT = "redact"


class MemoryStoreStatus(str, Enum):
    ACTIVE   = "active"
    ARCHIVED = "archived"


class MemoryItemType(str, Enum):
    MEMORY        = "memory"
    MEMORY_PREFIX = "memory_prefix"


class OrderBy(str, Enum):
    PATH       = "path"
    CREATED_AT = "created_at"
    UPDATED_AT = "updated_at"


# ── Memory Store ──────────────────────────────────────────────────────────────

class MemoryStore(BaseModel):
    id: Annotated[str, Field(pattern=r"^memstore_")]
    name: Annotated[str, Field(max_length=256)]
    description: Annotated[str, Field(max_length=4096)]
    status: MemoryStoreStatus
    archived_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


class CreateMemoryStoreParams(BaseModel):
    name: Annotated[str, Field(max_length=256)]
    description: Annotated[str, Field(max_length=4096)]


class UpdateMemoryStoreParams(BaseModel):
    name: Annotated[Optional[str], Field(max_length=256)] = None
    description: Annotated[Optional[str], Field(max_length=4096)] = None

    @model_validator(mode="after")
    def at_least_one_field(self) -> "UpdateMemoryStoreParams":
        if self.name is None and self.description is None:
            raise ValueError("At least one of name or description is required")
        return self


class ListMemoryStoresParams(BaseModel):
    include_archived: bool = False


# ── Memory ────────────────────────────────────────────────────────────────────

class Memory(BaseModel):
    id: Annotated[str, Field(pattern=r"^mem_")]
    memory_store_id: Annotated[str, Field(pattern=r"^memstore_")]
    path: Annotated[str, Field(pattern=r"^/")]
    """Full content. Present on retrieve, absent in list results. Max 100 kB."""
    content: Optional[str] = None
    """SHA-256 hex digest. Use as precondition for safe concurrent updates."""
    content_sha256: str
    created_at: datetime
    updated_at: datetime

    @field_validator("content")
    @classmethod
    def content_size(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.encode()) > MEMORY_MAX_BYTES:
            raise ValueError(f"content exceeds {MEMORY_MAX_BYTES} bytes (100 kB limit)")
        return v


class MemoryLeafItem(BaseModel):
    type: Literal[MemoryItemType.MEMORY]
    path: str
    id: Annotated[str, Field(pattern=r"^mem_")]


class MemoryPrefixItem(BaseModel):
    type: Literal[MemoryItemType.MEMORY_PREFIX]
    path: str


# Discriminated union for list results
from typing import Union, Annotated as Ann
MemoryListItem = Ann[
    Union[MemoryLeafItem, MemoryPrefixItem],
    Field(discriminator="type"),
]


class ContentSha256Precondition(BaseModel):
    type: Literal["content_sha256"] = "content_sha256"
    content_sha256: str


class CreateMemoryParams(BaseModel):
    path: Annotated[str, Field(pattern=r"^/")]
    """Must not already exist — create does not overwrite."""
    content: Annotated[Optional[str], Field(max_length=MEMORY_MAX_BYTES)] = None


class UpdateMemoryParams(BaseModel):
    path: Annotated[Optional[str], Field(pattern=r"^/")] = None
    content: Optional[str] = None
    """Optimistic concurrency guard. Update only applies if hash matches."""
    precondition: Optional[ContentSha256Precondition] = None

    @model_validator(mode="after")
    def at_least_one(self) -> "UpdateMemoryParams":
        if self.path is None and self.content is None:
            raise ValueError("At least one of path or content is required")
        return self

    @field_validator("content")
    @classmethod
    def content_size(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v.encode()) > MEMORY_MAX_BYTES:
            raise ValueError(f"content exceeds {MEMORY_MAX_BYTES} bytes")
        return v


class ListMemoriesParams(BaseModel):
    path_prefix: Optional[str] = None
    order_by: OrderBy = OrderBy.CREATED_AT
    depth: Optional[int] = Field(default=None, ge=1)


# ── Memory Version ────────────────────────────────────────────────────────────

class MemoryVersion(BaseModel):
    id: Annotated[str, Field(pattern=r"^memver_")]
    memory_store_id: Annotated[str, Field(pattern=r"^memstore_")]
    memory_id: Annotated[str, Field(pattern=r"^mem_")]
    operation: MemoryOperation
    """Full content at this version. None when redacted. Present on retrieve only."""
    content: Optional[str] = None
    """None when redacted."""
    content_sha256: Optional[str] = None
    """Session that authored this version, if agent-written."""
    session_id: Optional[str] = None
    created_at: datetime


class ListMemoryVersionsParams(BaseModel):
    memory_id: Optional[str] = None


# ── Session Resource Attachment ───────────────────────────────────────────────

class MemoryStoreResource(BaseModel):
    """
    Attach a memory store to a session via resources[].
    Max 8 per session. Must be specified at session creation.
    """
    type: Literal["memory_store"] = "memory_store"
    memory_store_id: Annotated[str, Field(pattern=r"^memstore_")]
    access: MemoryAccess = MemoryAccess.READ_WRITE
    instructions: Annotated[Optional[str], Field(max_length=INSTRUCTIONS_MAX_CHARS)] = None

    @classmethod
    def read_write(cls, store_id: str, instructions: Optional[str] = None) -> "MemoryStoreResource":
        return cls(
            memory_store_id=store_id,
            access=MemoryAccess.READ_WRITE,
            instructions=instructions,
        )

    @classmethod
    def read_only(cls, store_id: str, instructions: Optional[str] = None) -> "MemoryStoreResource":
        return cls(
            memory_store_id=store_id,
            access=MemoryAccess.READ_ONLY,
            instructions=instructions,
        )


# ── Paginated Response ────────────────────────────────────────────────────────

T = TypeVar("T")


class Paginated(BaseModel, Generic[T]):
    data: list[T]
    has_more: bool
    first_id: Optional[str] = None
    last_id: Optional[str] = None


MemoryStoreList    = Paginated[MemoryStore]
MemoryVersionList  = Paginated[MemoryVersion]
# MemoryList uses the union type — construct manually:
# Paginated[MemoryLeafItem | MemoryPrefixItem]


# ── Quick validation smoke test ───────────────────────────────────────────────

if __name__ == "__main__":
    store_params = CreateMemoryStoreParams(
        name="e2m-test",
        description="Test store created from memory.py",
    )
    print("CreateMemoryStoreParams:", store_params.model_dump_json(indent=2))

    resource = MemoryStoreResource.read_write(
        "memstore_01Hxtest",
        instructions="Check before starting any task.",
    )
    print("MemoryStoreResource:", resource.model_dump_json(indent=2))

    precond = ContentSha256Precondition(content_sha256="abc123def456")
    update = UpdateMemoryParams(
        content="Updated content",
        precondition=precond,
    )
    print("UpdateMemoryParams:", update.model_dump_json(indent=2))

    print("All validations passed ✓")
