"""
Tests for Batches API canonical types.

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/batches.md
"""

from ke_api_core.batches import (
    MessageBatch,
    MessageBatchCreateParams,
    MessageBatchRequest,
    MessageBatchSucceededResult,
    MessageBatchErrorResult,
    RequestCounts,
)
from ke_api_core.messages import MessageCreateParams, MessageParam


class TestRequestCounts:
    def test_defaults(self):
        rc = RequestCounts()
        assert rc.processing == 0
        assert rc.succeeded == 0
        assert rc.errored == 0
        assert rc.canceled == 0
        assert rc.expired == 0


class TestMessageBatch:
    def test_minimal(self):
        b = MessageBatch(
            id="msgbatch_01",
            processing_status="in_progress",
            request_counts=RequestCounts(processing=3),
            created_at="2026-06-01T00:00:00Z",
            expires_at="2026-06-02T00:00:00Z",
        )
        assert b.id == "msgbatch_01"
        assert b.request_counts.processing == 3


class TestBatchResults:
    def test_succeeded_round_trip(self):
        from ke_api_core.messages import Message, Usage
        msg = Message(
            id="msg_01", role="assistant", content=[], model="claude-opus-4-7",
            usage=Usage(input_tokens=10, output_tokens=5),
        )
        r = MessageBatchSucceededResult(type="succeeded", message=msg)
        assert r.type == "succeeded"

    def test_errored_round_trip(self):
        r = MessageBatchErrorResult(
            type="errored",
            error={"type": "overloaded_error", "message": "rate limit"},
        )
        assert r.error["type"] == "overloaded_error"
