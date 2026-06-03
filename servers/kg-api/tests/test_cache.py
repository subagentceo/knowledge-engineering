"""
Tests for canonical-API-backed prompt caching.

Asserts the body we build matches the shape POST /v1/messages expects:
  - system slot is a list[TextBlockParam] with cache_control on each block
  - context turn(s) are user-role MessageParam with list[TextBlockParam]
  - final user turn carries a plain string (NEVER cached)
  - usage projection reads canonical Usage fields

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
@cite src/ke_kg_api/cache.py
"""

from __future__ import annotations

import uuid
from datetime import datetime

from ke_kg_api.anthropic_api.messages import (
    CacheControlEphemeral,
    Message,
    TextBlockParam,
    Usage,
)
from ke_kg_api.cache import (
    build_message_params,
    estimate_cost_usd,
    usage_to_rag_response,
)
from ke_kg_api.models import EntityType, KGNodeRead, RAGRequest


def _node(entity_id: str, content: str = "") -> KGNodeRead:
    return KGNodeRead(
        id=uuid.uuid4(),
        entity_id=entity_id,
        type=EntityType.DOCUMENT,
        title=entity_id.split("/")[-1],
        namespace=entity_id.split("/")[0],
        content=content,
        created_at=datetime.utcnow(),
    )


class TestBuildMessageParams:
    def test_returns_canonical_message_create_params(self):
        params = build_message_params(RAGRequest(query="Q"), [])
        # MessageCreateParams: model + max_tokens + messages required
        assert params.model
        assert params.max_tokens > 0
        assert params.messages

    def test_system_has_cache_control_when_enabled(self):
        params = build_message_params(RAGRequest(query="Q", use_cache=True), [])
        assert isinstance(params.system, list)
        assert all(isinstance(b, TextBlockParam) for b in params.system)
        assert all(
            isinstance(b.cache_control, CacheControlEphemeral)
            for b in params.system
        )

    def test_system_no_cache_when_disabled(self):
        params = build_message_params(RAGRequest(query="Q", use_cache=False), [])
        assert all(b.cache_control is None for b in params.system)

    def test_final_user_turn_is_plain_string(self):
        params = build_message_params(
            RAGRequest(query="Final"),
            [_node("ns/x", "ctx")],
            graph_context="g",
        )
        last = params.messages[-1]
        assert last.role == "user"
        assert isinstance(last.content, str)
        assert last.content == "Final"

    def test_context_blocks_cached_when_present(self):
        nodes = [_node("ns/x", "doc-text")]
        params = build_message_params(
            RAGRequest(query="Q"),
            nodes,
            graph_context="some graph ctx",
        )
        context_turn = params.messages[0]
        assert context_turn.role == "user"
        assert isinstance(context_turn.content, list)
        for b in context_turn.content:
            assert isinstance(b, TextBlockParam)
            assert b.cache_control == CacheControlEphemeral(ttl="5m")

    def test_no_context_turn_when_no_graph_no_nodes(self):
        params = build_message_params(RAGRequest(query="Q"), [])
        # Only the final user query remains
        assert len(params.messages) == 1
        assert params.messages[0].content == "Q"

    def test_supports_1h_ttl(self):
        params = build_message_params(
            RAGRequest(query="Q"),
            [_node("ns/x", "c")],
            ttl="1h",
        )
        ctx_block = params.messages[0].content[0]
        assert ctx_block.cache_control.ttl == "1h"


class TestUsageProjection:
    def _msg(self, **usage_kwargs) -> Message:
        return Message(
            id="msg_test",
            content=[],
            model="claude-opus-4-7",
            usage=Usage(**usage_kwargs),
        )

    def test_cache_hit(self):
        req = RAGRequest(query="q")
        msg = self._msg(input_tokens=50, cache_read_input_tokens=1000)
        resp = usage_to_rag_response(req, [], msg)
        assert resp.cache_hit is True
        assert resp.cached_tokens == 1000
        assert resp.uncached_tokens == 50

    def test_cache_miss(self):
        req = RAGRequest(query="q")
        msg = self._msg(input_tokens=500)
        resp = usage_to_rag_response(req, [], msg)
        assert resp.cache_hit is False
        assert resp.cached_tokens == 0

    def test_no_message(self):
        req = RAGRequest(query="q")
        resp = usage_to_rag_response(req, [_node("a/b")], None)
        assert resp.cache_hit is False
        assert len(resp.results) == 1


class TestCostEstimate:
    def test_uncached_baseline(self):
        u = Usage(input_tokens=1_000_000, output_tokens=0)
        # $15 / Mtok input at default Opus rates
        assert abs(estimate_cost_usd(u) - 15.0) < 1e-6

    def test_cache_read_discount(self):
        u = Usage(
            input_tokens=1_000_000,
            cache_read_input_tokens=1_000_000,
            output_tokens=0,
        )
        # All input came from cache → only the read-rate applies (1.50/Mtok)
        assert abs(estimate_cost_usd(u) - 1.50) < 1e-6

    def test_cache_write_surcharge(self):
        u = Usage(
            input_tokens=1_000_000,
            cache_creation_input_tokens=1_000_000,
            output_tokens=0,
        )
        # uncached 1M ($15) + cache write 1M ($18.75) = $33.75
        assert abs(estimate_cost_usd(u) - 33.75) < 1e-6

    def test_output_tokens(self):
        u = Usage(input_tokens=0, output_tokens=1_000_000)
        assert abs(estimate_cost_usd(u) - 75.0) < 1e-6
