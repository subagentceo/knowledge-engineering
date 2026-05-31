# DragonflyDB Redis-wire compatibility (extract)

> Source: DragonflyDB docs — Redis & Memcached API compatibility + getting started. No `vendor/redis` mirror exists yet, so this seed is the canonical @cite target for the local Redis-surface client added under SCRUM-32 (data-plane migration: Neon out of budget → AlloyDB Omni + DragonflyDB local containers).

## What it is

DragonflyDB is a multi-threaded, drop-in replacement for Redis and Memcached. It speaks the **Redis RESP wire protocol** on the default Redis port **6379**, so any RESP-speaking client connects unchanged. For this repo the local Redis surfaces target a `dragonfly` container at `redis://localhost:6379`.

## Drop-in compatibility

- Implements the Redis RESP2/RESP3 protocol; existing Redis clients connect with no code change.
- A Redis client pointed at `localhost:6379` cannot tell it is talking to Dragonfly rather than `redis-server`.
- `redis-cli -h localhost -p 6379 ping` returns `PONG`.

## Supported data types and commands

The common Redis data types are supported, covering the surfaces this repo uses:

- **Strings** — `SET`, `GET`, `GETSET`, `APPEND`, `INCR`/`DECR`, `SETEX`, `SET ... EX`.
- **Hashes** — `HSET`, `HGET`, `HGETALL`, `HDEL`.
- **Lists** — `LPUSH`, `RPUSH`, `LRANGE`, `LPOP`/`RPOP`.
- **Sets / Sorted sets** — `SADD`, `SMEMBERS`, `ZADD`, `ZRANGE`.
- **Streams** — `XADD`, `XREAD` (back the orchestrator state-channel layer).
- **Pub/Sub** — `SUBSCRIBE`, `PUBLISH`.
- **Key lifecycle** — `EXPIRE`, `TTL`, `DEL`, `EXISTS`, `KEYS`/`SCAN`.

## Client connection

### redis-py (`redis>=5`)

```python
import redis
r = redis.Redis(host="localhost", port=6379, decode_responses=True)
r.set("k", "v")
assert r.get("k") == "v"
```

### Node (`ioredis` / `redis`)

```ts
import Redis from "ioredis";
const client = new Redis("redis://localhost:6379");
await client.set("k", "v");
```

The same client code works against `redis-server` or `dragonfly` — the wire protocol is identical.

## Repo convention

- Canonical local target: `redis://localhost:6379` (the `dragonfly` container).
- Gate connection behind the `REDIS_URL` env var; when unset, callers treat Redis as disabled (no client built) and fall back to source-of-truth. The default target documented here is `redis://localhost:6379`.
- OAuth-only invariant is unaffected: the Redis surface never touches the Anthropic API and never reads `ANTHROPIC_API_KEY`.
