"""
Structured agent turn tracing — zero prose, only structured I/O.

Every agent step (tool call, API request, model response) is logged as a
typed envelope using canonical Anthropic API shapes. Replays must be possible
without consulting human-readable notes; the log IS the source of truth.

Sinks supported:
  - stdout JSONL (default; one envelope per line)
  - file JSONL (TRACE_FILE env var)
  - AlloyDB (planned: writes to ke_agent_turns table)

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/events-and-streaming.md
"""

from __future__ import annotations

import json
import os
import sys
import uuid
from datetime import datetime, timezone
from typing import Any, Literal, Union

from pydantic import BaseModel, ConfigDict, Field

from .anthropic_api.messages import (
    ContentBlock,
    Message,
    MessageCreateParams,
    Usage,
)


# ── Turn envelope ──────────────────────────────────────────────────────────────

TurnKind = Literal[
    "request", "response", "tool_call", "tool_result", "error",
    "session_event", "memory_write", "memory_read",
]


class ToolCallRecord(BaseModel):
    tool_use_id: str
    name: str
    input: dict[str, Any]


class ToolResultRecord(BaseModel):
    tool_use_id: str
    content: Any
    is_error: bool = False
    duration_ms: int | None = None


class ErrorRecord(BaseModel):
    type: str
    message: str
    request_id: str | None = None
    status_code: int | None = None


class MemoryRecord(BaseModel):
    memory_store_id: str
    path: str
    version: int | None = None
    bytes_written: int | None = None
    bytes_read: int | None = None


class SessionEventRecord(BaseModel):
    session_id: str
    event_type: str
    sequence: int


TurnPayload = Union[
    MessageCreateParams,
    Message,
    ToolCallRecord,
    ToolResultRecord,
    ErrorRecord,
    MemoryRecord,
    SessionEventRecord,
]


class Turn(BaseModel):
    """One envelope per agent step. Append-only, immutable after emit."""
    model_config = ConfigDict(extra="forbid")

    id: str = Field(default_factory=lambda: f"turn_{uuid.uuid4().hex[:24]}")
    ts: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    session_id: str | None = None
    trace_id: str | None = None
    parent_turn_id: str | None = None
    kind: TurnKind
    payload: TurnPayload
    usage: Usage | None = None
    model: str | None = None
    cost_usd: float | None = None
    latency_ms: int | None = None


# ── Sinks ──────────────────────────────────────────────────────────────────────

class TraceSink:
    """Base sink — emit one Turn at a time as a JSON line."""

    def emit(self, turn: Turn) -> None:
        raise NotImplementedError


class StdoutSink(TraceSink):
    def emit(self, turn: Turn) -> None:
        sys.stdout.write(turn.model_dump_json(exclude_none=True) + "\n")
        sys.stdout.flush()


class FileSink(TraceSink):
    def __init__(self, path: str) -> None:
        self.path = path

    def emit(self, turn: Turn) -> None:
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(turn.model_dump_json(exclude_none=True) + "\n")


# ── Tracer ─────────────────────────────────────────────────────────────────────

class Tracer:
    """Thin wrapper that stamps + dispatches Turn envelopes to a sink."""

    def __init__(
        self,
        sink: TraceSink | None = None,
        session_id: str | None = None,
        trace_id: str | None = None,
    ) -> None:
        self.sink = sink or _default_sink()
        self.session_id = session_id
        self.trace_id = trace_id or f"trace_{uuid.uuid4().hex[:24]}"
        self._last_turn_id: str | None = None

    def emit(
        self,
        kind: TurnKind,
        payload: TurnPayload,
        **extra: Any,
    ) -> Turn:
        turn = Turn(
            kind=kind,
            payload=payload,
            session_id=self.session_id,
            trace_id=self.trace_id,
            parent_turn_id=self._last_turn_id,
            **extra,
        )
        self.sink.emit(turn)
        self._last_turn_id = turn.id
        return turn

    def request(self, params: MessageCreateParams) -> Turn:
        return self.emit("request", params, model=params.model)

    def response(self, message: Message, latency_ms: int | None = None) -> Turn:
        return self.emit(
            "response", message, model=message.model,
            usage=message.usage, latency_ms=latency_ms,
        )

    def tool_call(self, tool_use_id: str, name: str, input_: dict[str, Any]) -> Turn:
        return self.emit("tool_call", ToolCallRecord(
            tool_use_id=tool_use_id, name=name, input=input_,
        ))

    def tool_result(
        self, tool_use_id: str, content: Any,
        is_error: bool = False, duration_ms: int | None = None,
    ) -> Turn:
        return self.emit("tool_result", ToolResultRecord(
            tool_use_id=tool_use_id, content=content,
            is_error=is_error, duration_ms=duration_ms,
        ))

    def error(
        self, type_: str, message: str,
        request_id: str | None = None, status_code: int | None = None,
    ) -> Turn:
        return self.emit("error", ErrorRecord(
            type=type_, message=message,
            request_id=request_id, status_code=status_code,
        ))


def _default_sink() -> TraceSink:
    path = os.environ.get("TRACE_FILE")
    return FileSink(path) if path else StdoutSink()


# ── Replay ─────────────────────────────────────────────────────────────────────

def load_turns(path: str) -> list[Turn]:
    """Re-hydrate a JSONL trace into Turn objects (for replay or audit)."""
    turns: list[Turn] = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            turns.append(Turn.model_validate(json.loads(line)))
    return turns
