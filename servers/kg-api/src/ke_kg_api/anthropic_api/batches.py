"""
Message Batches API canonical types.

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/batches.md
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict

from .messages import Message, MessageCreateParams

BatchStatus = Literal["in_progress", "canceling", "ended"]
BatchResultType = Literal["succeeded", "errored", "canceled", "expired"]


class RequestCounts(BaseModel):
    canceled: int = 0
    errored: int = 0
    expired: int = 0
    processing: int = 0
    succeeded: int = 0


class MessageBatchRequest(BaseModel):
    """Single request inside a batch."""
    model_config = ConfigDict(extra="forbid")

    custom_id: str
    params: MessageCreateParams


class MessageBatchCreateParams(BaseModel):
    """POST /v1/messages/batches body."""
    model_config = ConfigDict(extra="forbid")

    requests: list[MessageBatchRequest]


class MessageBatch(BaseModel):
    """Response from POST /v1/messages/batches and GET /v1/messages/batches/{id}."""
    id: str
    type: Literal["message_batch"] = "message_batch"
    archived_at: str | None = None
    cancel_initiated_at: str | None = None
    created_at: str
    ended_at: str | None = None
    expires_at: str
    processing_status: BatchStatus
    request_counts: RequestCounts
    results_url: str | None = None


# ── Result rows (JSONL stream) ─────────────────────────────────────────────────

class MessageBatchSucceededResult(BaseModel):
    type: Literal["succeeded"] = "succeeded"
    message: Message


class MessageBatchErrorResult(BaseModel):
    type: Literal["errored"] = "errored"
    error: dict[str, Any]


class MessageBatchCanceledResult(BaseModel):
    type: Literal["canceled"] = "canceled"


class MessageBatchExpiredResult(BaseModel):
    type: Literal["expired"] = "expired"


class MessageBatchIndividualResponse(BaseModel):
    """One line of the batch results JSONL."""
    custom_id: str
    result: (
        MessageBatchSucceededResult
        | MessageBatchErrorResult
        | MessageBatchCanceledResult
        | MessageBatchExpiredResult
    )
