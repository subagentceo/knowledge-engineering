"""Dreams API schema — Pydantic v2.

@cite platform.claude.com/docs/en/managed-agents/dreams
Beta headers: managed-agents-2026-04-01, dreaming-2026-04-21
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class DreamStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"
    canceled = "canceled"


class DreamModelId(str, Enum):
    opus_4_8 = "claude-opus-4-8"
    opus_4_7 = "claude-opus-4-7"
    sonnet_4_6 = "claude-sonnet-4-6"


class DreamErrorType(str, Enum):
    timeout = "timeout"
    internal_error = "internal_error"
    memory_store_org_limit_exceeded = "memory_store_org_limit_exceeded"
    input_memory_store_too_large = "input_memory_store_too_large"
    input_memory_store_unavailable = "input_memory_store_unavailable"
    input_session_unavailable = "input_session_unavailable"


class MemoryStoreInput(BaseModel):
    model_config = ConfigDict(frozen=True)
    type: Literal["memory_store"] = "memory_store"
    memory_store_id: str = Field(pattern=r"^memstore_")


class SessionsInput(BaseModel):
    model_config = ConfigDict(frozen=True)
    type: Literal["sessions"] = "sessions"
    session_ids: list[str] = Field(min_length=1, max_length=100)


DreamInput = MemoryStoreInput | SessionsInput


class MemoryStoreOutput(BaseModel):
    model_config = ConfigDict(frozen=True)
    type: Literal["memory_store"] = "memory_store"
    memory_store_id: str = Field(pattern=r"^memstore_")


class DreamModel(BaseModel):
    model_config = ConfigDict(frozen=True)
    id: DreamModelId


class DreamUsage(BaseModel):
    model_config = ConfigDict(frozen=True)
    input_tokens: int = Field(ge=0)
    output_tokens: int = Field(ge=0)
    cache_creation_input_tokens: int = Field(ge=0)
    cache_read_input_tokens: int = Field(ge=0)


class DreamError(BaseModel):
    model_config = ConfigDict(frozen=True)
    type: DreamErrorType
    message: str


class Dream(BaseModel):
    """The Dream resource returned by the API."""

    model_config = ConfigDict(frozen=True)
    type: Literal["dream"] = "dream"
    id: str = Field(pattern=r"^drm_")
    status: DreamStatus
    inputs: list[DreamInput]
    outputs: list[MemoryStoreOutput]
    model: DreamModel
    instructions: str | None = Field(default=None, max_length=4096)
    session_id: str | None = None
    created_at: datetime
    ended_at: datetime | None = None
    archived_at: datetime | None = None
    usage: DreamUsage
    error: DreamError | None = None


class CreateDreamRequest(BaseModel):
    """POST /v1/beta/dreams request body."""

    model_config = ConfigDict(frozen=True)
    inputs: list[DreamInput] = Field(min_length=1)
    model: DreamModelId
    instructions: str | None = Field(default=None, max_length=4096)


class ListDreamsParams(BaseModel):
    """GET /v1/beta/dreams query parameters."""

    limit: int = Field(default=20, ge=1, le=100)
    page: str | None = None
    include_archived: bool = False


BETA_HEADERS: dict[str, str] = {
    "anthropic-beta": "managed-agents-2026-04-01,dreaming-2026-04-21",
}
