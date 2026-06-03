"""
Tests for Turn tracing envelope.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/events-and-streaming.md
"""

import io
import json
import sys

import pytest
from ke_api_core.tracing import (
    ErrorRecord,
    FileSink,
    StdoutSink,
    ToolCallRecord,
    ToolResultRecord,
    Tracer,
    Turn,
    load_turns,
)
from ke_api_core.messages import Usage


class TestTurn:
    def test_auto_id(self):
        t = Turn(kind="request", payload=ToolCallRecord(
            tool_use_id="tu_01", name="test_tool", input={}
        ))
        assert t.id.startswith("turn_")
        assert t.ts is not None

    def test_extra_fields_forbidden(self):
        with pytest.raises(Exception):
            Turn(kind="request", payload=ToolCallRecord(
                tool_use_id="tu_01", name="t", input={}
            ), unknown_extra="bad")


class TestTracerLinking:
    def test_parent_chaining(self, tmp_path):
        sink = FileSink(str(tmp_path / "trace.jsonl"))
        tracer = Tracer(sink=sink, session_id="sess_01")
        t1 = tracer.tool_call("tu_01", "tool_a", {})
        t2 = tracer.tool_result("tu_01", "ok")
        assert t2.parent_turn_id == t1.id

    def test_trace_id_set(self, tmp_path):
        sink = FileSink(str(tmp_path / "trace.jsonl"))
        tracer = Tracer(sink=sink, trace_id="trace_abc")
        t = tracer.error("api_error", "timeout")
        assert t.trace_id == "trace_abc"


class TestFileSink:
    def test_jsonl_round_trip(self, tmp_path):
        path = tmp_path / "trace.jsonl"
        sink = FileSink(str(path))
        tracer = Tracer(sink=sink)
        t1 = tracer.tool_call("tu_x", "my_tool", {"k": "v"})
        turns = load_turns(str(path))
        assert len(turns) == 1
        assert turns[0].id == t1.id


class TestPayloadTyping:
    def test_tool_call_record(self):
        rec = ToolCallRecord(tool_use_id="tu_01", name="search", input={"q": "kg"})
        assert rec.name == "search"

    def test_tool_result_record(self):
        rec = ToolResultRecord(tool_use_id="tu_01", content="nodes: []", is_error=False)
        assert not rec.is_error

    def test_error_record(self):
        rec = ErrorRecord(type="rate_limit_error", message="429", status_code=429)
        assert rec.status_code == 429
