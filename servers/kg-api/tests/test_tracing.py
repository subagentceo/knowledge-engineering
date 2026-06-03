"""
Tests for structured agent-turn tracing.

Asserts:
  - Turn envelopes carry trace_id / parent_turn_id correctly
  - Each emit produces exactly one JSONL line
  - Round-trip via load_turns reconstructs typed payloads
  - Canonical Anthropic types (MessageCreateParams / Message) ride directly

@cite src/ke_kg_api/tracing.py
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
"""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

from ke_kg_api.anthropic_api.messages import (
    Message,
    MessageCreateParams,
    MessageParam,
    TextBlock,
    Usage,
)
from ke_kg_api.tracing import (
    ErrorRecord,
    FileSink,
    ToolCallRecord,
    Tracer,
    Turn,
    load_turns,
)


def _params() -> MessageCreateParams:
    return MessageCreateParams(
        model="claude-opus-4-7",
        max_tokens=100,
        messages=[MessageParam(role="user", content="hi")],
    )


def _response() -> Message:
    return Message(
        id="msg_01",
        content=[TextBlock(text="hi back")],
        model="claude-opus-4-7",
        usage=Usage(input_tokens=5, output_tokens=3),
    )


class TestTurn:
    def test_envelope_required_fields(self):
        t = Turn(kind="request", payload=_params())
        assert t.id.startswith("turn_")
        assert t.ts
        assert t.kind == "request"


class TestTracerLinking:
    def test_parent_link_chains_across_emits(self, tmp_path: Path):
        sink = FileSink(str(tmp_path / "trace.jsonl"))
        tr = Tracer(sink=sink, session_id="sess_01")
        a = tr.request(_params())
        b = tr.response(_response(), latency_ms=120)
        c = tr.tool_call("tool_1", "kg_search", {"q": "x"})
        assert a.parent_turn_id is None
        assert b.parent_turn_id == a.id
        assert c.parent_turn_id == b.id
        assert a.trace_id == b.trace_id == c.trace_id

    def test_session_id_propagates(self, tmp_path: Path):
        sink = FileSink(str(tmp_path / "trace.jsonl"))
        tr = Tracer(sink=sink, session_id="sess_xyz")
        t = tr.request(_params())
        assert t.session_id == "sess_xyz"


class TestFileSink:
    def test_round_trip(self, tmp_path: Path):
        path = str(tmp_path / "trace.jsonl")
        sink = FileSink(path)
        tr = Tracer(sink=sink, session_id="sess_01")
        tr.request(_params())
        tr.response(_response())
        tr.error("rate_limit", "429 too many requests", status_code=429)

        turns = load_turns(path)
        assert len(turns) == 3
        assert turns[0].kind == "request"
        assert turns[1].kind == "response"
        assert turns[2].kind == "error"
        assert isinstance(turns[2].payload, ErrorRecord)
        assert turns[2].payload.status_code == 429

    def test_each_emit_is_one_jsonl_line(self, tmp_path: Path):
        path = str(tmp_path / "trace.jsonl")
        sink = FileSink(path)
        tr = Tracer(sink=sink)
        tr.request(_params())
        tr.response(_response())
        lines = Path(path).read_text().splitlines()
        assert len(lines) == 2
        for line in lines:
            assert json.loads(line)  # valid JSON


class TestPayloadTyping:
    def test_request_carries_canonical_message_create_params(self, tmp_path: Path):
        path = str(tmp_path / "t.jsonl")
        tr = Tracer(sink=FileSink(path))
        tr.request(_params())
        [turn] = load_turns(path)
        # The discriminated-union payload re-hydrates to one of the typed shapes;
        # for request kind this should be MessageCreateParams-shaped.
        dumped = turn.payload.model_dump() if hasattr(turn.payload, "model_dump") else turn.payload
        # accept either typed (Pydantic) or dict re-hydration
        if isinstance(dumped, dict):
            assert dumped["model"] == "claude-opus-4-7"
        else:
            assert dumped.model == "claude-opus-4-7"

    def test_tool_call_payload(self, tmp_path: Path):
        path = str(tmp_path / "t.jsonl")
        tr = Tracer(sink=FileSink(path))
        tr.tool_call("t1", "kg_search", {"q": "x"})
        [turn] = load_turns(path)
        assert isinstance(turn.payload, ToolCallRecord)
        assert turn.payload.name == "kg_search"
