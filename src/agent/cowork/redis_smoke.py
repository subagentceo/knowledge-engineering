# /// script
# requires-python = ">=3.12"
# dependencies = ["redis>=5"]
# ///
"""Redis-wire smoke test against the local DragonflyDB container (:6379).

Run:  uv run src/agent/cowork/redis_smoke.py            # SET/GET round-trip, prints OK
Self: uv run src/agent/cowork/redis_smoke.py _self_test # offline checks, no connection

DragonflyDB is a drop-in Redis replacement; redis-py connects unchanged on the
default Redis port. The connection target is REDIS_URL, default redis://localhost:6379.

OAuth-only invariant: this script never touches the Anthropic API and never
reads ANTHROPIC_API_KEY.

@cite seeds/citations/dragonfly-redis-compat.md
"""
from __future__ import annotations

import os
import sys

DEFAULT_REDIS_URL = "redis://localhost:6379"


def redis_url() -> str:
    return os.environ.get("REDIS_URL", DEFAULT_REDIS_URL)


def smoke(url: str | None = None) -> bool:
    import redis

    client = redis.Redis.from_url(url or redis_url(), decode_responses=True)
    client.set("knowledge-engineering:smoke", "ok")
    return client.get("knowledge-engineering:smoke") == "ok"


def _self_test() -> None:
    assert redis_url().endswith(":6379")
    os.environ["REDIS_URL"] = "redis://example:6380"
    try:
        assert redis_url() == "redis://example:6380"
    finally:
        os.environ["REDIS_URL"] = DEFAULT_REDIS_URL
    print("redis_smoke self-test: OK")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "_self_test":
        _self_test()
    else:
        ok = smoke()
        print("OK" if ok else "FAIL")
        sys.exit(0 if ok else 1)
