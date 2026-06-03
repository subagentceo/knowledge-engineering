"""
Tests for generic cache primitives.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
"""

from ke_api_core.cache import estimate_cost_usd, maybe_ephemeral
from ke_api_core.messages import CacheControlEphemeral, Usage


class TestMaybeEphemeral:
    def test_enabled(self):
        cc = maybe_ephemeral(True)
        assert isinstance(cc, CacheControlEphemeral)
        assert cc.ttl == "5m"

    def test_disabled(self):
        assert maybe_ephemeral(False) is None

    def test_one_hour(self):
        cc = maybe_ephemeral(True, ttl="1h")
        assert cc.ttl == "1h"


class TestEstimateCostUsd:
    def test_zero_usage(self):
        assert estimate_cost_usd(Usage()) == 0.0

    def test_pure_output(self):
        u = Usage(input_tokens=0, output_tokens=1_000_000)
        cost = estimate_cost_usd(u)
        assert abs(cost - 75.0) < 0.01

    def test_cache_read_cheaper(self):
        u_read = Usage(input_tokens=100, output_tokens=0, cache_read_input_tokens=100)
        u_uncached = Usage(input_tokens=100, output_tokens=0)
        assert estimate_cost_usd(u_read) < estimate_cost_usd(u_uncached)

    def test_cache_write_billed(self):
        u = Usage(input_tokens=0, output_tokens=0, cache_creation_input_tokens=1_000_000)
        cost = estimate_cost_usd(u)
        assert abs(cost - 18.75) < 0.01
