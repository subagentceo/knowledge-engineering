"""
Tests for canonical Messages API types.

@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages.md
"""

import pytest
from ke_api_core.messages import (
    CacheControlEphemeral,
    ContentBlock,
    Message,
    MessageCreateParams,
    MessageParam,
    TextBlockParam,
    ToolDefinition,
    InputSchema,
    Usage,
)


class TestCacheControl:
    def test_default_ttl(self):
        cc = CacheControlEphemeral()
        assert cc.type == "ephemeral"
        assert cc.ttl == "5m"

    def test_one_hour_ttl(self):
        cc = CacheControlEphemeral(ttl="1h")
        assert cc.ttl == "1h"


class TestTextBlockParam:
    def test_minimal(self):
        b = TextBlockParam(text="hello")
        assert b.type == "text"
        assert b.cache_control is None

    def test_with_cache_control(self):
        cc = CacheControlEphemeral()
        b = TextBlockParam(text="system", cache_control=cc)
        assert b.cache_control.ttl == "5m"


class TestMessageCreateParams:
    def test_minimal(self):
        params = MessageCreateParams(
            model="claude-opus-4-7",
            max_tokens=1024,
            messages=[MessageParam(role="user", content="hi")],
        )
        assert params.model == "claude-opus-4-7"
        assert len(params.messages) == 1

    def test_extra_fields_forbidden(self):
        with pytest.raises(Exception):
            MessageCreateParams(
                model="claude-opus-4-7",
                max_tokens=1024,
                messages=[],
                unknown_field="bad",
            )

    def test_system_as_blocks(self):
        params = MessageCreateParams(
            model="claude-opus-4-7",
            max_tokens=512,
            messages=[MessageParam(role="user", content="q")],
            system=[TextBlockParam(text="sys", cache_control=CacheControlEphemeral())],
        )
        assert isinstance(params.system, list)
        assert params.system[0].cache_control.ttl == "5m"


class TestUsage:
    def test_defaults(self):
        u = Usage()
        assert u.input_tokens == 0
        assert u.output_tokens == 0
        assert u.cache_read_input_tokens is None

    def test_cache_fields(self):
        u = Usage(input_tokens=100, output_tokens=50, cache_read_input_tokens=80)
        assert u.cache_read_input_tokens == 80
