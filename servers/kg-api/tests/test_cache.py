"""
Unit tests for the Anthropic prompt-caching strategy.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite src/ke_kg_api/cache.py
"""

from __future__ import annotations

import uuid
from datetime import datetime
from types import SimpleNamespace

import pytest

from ke_kg_api.cache import build_messages, make_rag_response, parse_cache_usage
from ke_kg_api.models import EntityType, KGNodeRead, KGSchemaVersion, RAGRequest


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


class TestBuildMessages:
    def test_always_ends_with_uncached_user_query(self):
        req = RAGRequest(query="How does Workers KV work?")
        nodes = [_node("cloudflare/kv/intro", "KV is a key-value store.")]
        msgs = build_messages(req, nodes)
        # Last message must be plain user turn with no cache_control blocks
        last = msgs[-1]
        assert last["role"] == "user"
        assert isinstance(last["content"], str)

    def test_cached_blocks_have_cache_control(self):
        req = RAGRequest(query="Test", use_cache=True)
        nodes = [_node("ns/a", "content")]
        msgs = build_messages(req, nodes, graph_context="some graph context")
        # First user turn has content blocks list
        first_turn_blocks = msgs[0]["content"]
        assert isinstance(first_turn_blocks, list)
        for block in first_turn_blocks:
            assert "cache_control" in block
            assert block["cache_control"] == {"type": "ephemeral"}

    def test_no_cache_control_when_use_cache_false(self):
        req = RAGRequest(query="Test", use_cache=False)
        nodes = [_node("ns/b", "content")]
        msgs = build_messages(req, nodes)
        first_turn_blocks = msgs[0]["content"]
        for block in first_turn_blocks:
            assert "cache_control" not in block

    def test_no_graph_context_skips_graph_block(self):
        req = RAGRequest(query="Q")
        nodes = []
        msgs = build_messages(req, nodes, graph_context="")
        # Only system block in first turn
        first_turn_blocks = msgs[0]["content"]
        assert len(first_turn_blocks) == 1

    def test_empty_nodes_skips_retrieved_block(self):
        req = RAGRequest(query="Q")
        msgs = build_messages(req, [], graph_context="ctx")
        first_turn_blocks = msgs[0]["content"]
        # system + graph_context = 2 blocks
        assert len(first_turn_blocks) == 2


class TestParseCacheUsage:
    def test_cache_hit(self):
        usage = SimpleNamespace(cache_read_input_tokens=1000, input_tokens=50)
        cached, uncached, hit = parse_cache_usage(usage)
        assert cached == 1000
        assert uncached == 50
        assert hit is True

    def test_cache_miss(self):
        usage = SimpleNamespace(cache_read_input_tokens=0, input_tokens=500)
        cached, uncached, hit = parse_cache_usage(usage)
        assert cached == 0
        assert hit is False

    def test_missing_attribute_defaults_to_zero(self):
        usage = SimpleNamespace(input_tokens=200)
        cached, uncached, hit = parse_cache_usage(usage)
        assert cached == 0
        assert uncached == 200


class TestMakeRagResponse:
    def test_no_usage_gives_zero_tokens(self):
        req = RAGRequest(query="q")
        resp = make_rag_response(req, [], usage=None)
        assert resp.cached_tokens == 0
        assert resp.uncached_tokens == 0
        assert resp.cache_hit is False

    def test_with_cache_hit_usage(self):
        req = RAGRequest(query="q")
        node = _node("ns/x")
        usage = SimpleNamespace(cache_read_input_tokens=800, input_tokens=30)
        resp = make_rag_response(req, [node], usage=usage)
        assert resp.cache_hit is True
        assert resp.cached_tokens == 800
        assert len(resp.results) == 1
