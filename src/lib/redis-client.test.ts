/**
 * @cite seeds/citations/dragonfly-redis-compat.md
 * @tdd green
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
    redisEnabled,
    redisUrl,
    DEFAULT_REDIS_URL,
    getClient,
    getString,
    setString,
    setRedisFactoryForTest,
    type RedisClient,
} from "./redis-client.js";

function makeMock() {
    const store = new Map<string, string>();
    const calls: string[] = [];
    let builds = 0;
    const factory = (): RedisClient => {
        builds += 1;
        return {
            get: async (k) => (store.has(k) ? store.get(k)! : null),
            set: async (k, v, mode, ttl) => {
                store.set(k, v);
                calls.push(mode ? `set ${k} ${mode} ${ttl}` : `set ${k}`);
                return "OK";
            },
        };
    };
    return { factory, builds: () => builds, calls };
}

function withRedisUrl<T>(url: string | undefined, fn: () => T): T {
    const prev = process.env.REDIS_URL;
    if (url === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = url;
    try {
        return fn();
    } finally {
        if (prev === undefined) delete process.env.REDIS_URL;
        else process.env.REDIS_URL = prev;
    }
}

test("redisEnabled / redisUrl reflect REDIS_URL", () => {
    setRedisFactoryForTest(null);
    withRedisUrl(undefined, () => {
        assert.equal(redisEnabled(), false);
        assert.equal(redisUrl(), DEFAULT_REDIS_URL);
    });
    withRedisUrl(DEFAULT_REDIS_URL, () => {
        assert.equal(redisEnabled(), true);
        assert.equal(redisUrl(), DEFAULT_REDIS_URL);
    });
});

test("getString/setString are no-ops when disabled", async () => {
    setRedisFactoryForTest(null);
    await withRedisUrl(undefined, async () => {
        assert.equal(getClient(), null);
        assert.equal(await getString("k"), null);
        assert.equal(await setString("k", "v"), false);
    });
});

test("get/set round-trip against the mock (plain + TTL)", async () => {
    const mock = makeMock();
    setRedisFactoryForTest(mock.factory);
    await withRedisUrl(DEFAULT_REDIS_URL, async () => {
        assert.equal(await getString("missing"), null);
        assert.equal(await setString("a", "1"), true);
        assert.equal(await getString("a"), "1");
        assert.equal(await setString("b", "2", { ex: 60 }), true);
        assert.equal(await getString("b"), "2");
    });
    assert.deepEqual(mock.calls, ["set a", "set b EX 60"]);
    setRedisFactoryForTest(null);
});

test("client is built once (module cache)", () => {
    const mock = makeMock();
    setRedisFactoryForTest(mock.factory);
    withRedisUrl(DEFAULT_REDIS_URL, () => {
        const a = getClient();
        const b = getClient();
        assert.equal(a, b);
        assert.equal(mock.builds(), 1);
    });
    setRedisFactoryForTest(null);
});

test("test factory forces a client even without REDIS_URL", () => {
    const mock = makeMock();
    setRedisFactoryForTest(mock.factory);
    withRedisUrl(undefined, () => {
        assert.notEqual(getClient(), null);
    });
    setRedisFactoryForTest(null);
});

async function withRedisUrlAsync<T>(
    url: string | undefined,
    fn: () => Promise<T>,
): Promise<T> {
    const prev = process.env.REDIS_URL;
    if (url === undefined) delete process.env.REDIS_URL;
    else process.env.REDIS_URL = url;
    try {
        return await fn();
    } finally {
        if (prev === undefined) delete process.env.REDIS_URL;
        else process.env.REDIS_URL = prev;
    }
}

// Live path — exercises the real ioredis build() against the local DragonflyDB
// container. Skips (does not fail) when :6379 is unreachable so CI without a
// container stays green; locally it covers the build()/get/set wire path.
test("live: real ioredis build() round-trips against DragonflyDB :6379", async (t) => {
    setRedisFactoryForTest(null);
    await withRedisUrlAsync(DEFAULT_REDIS_URL, async () => {
        const client = getClient() as unknown as {
            ping(): Promise<string>;
            quit(): Promise<unknown>;
        } | null;
        assert.notEqual(client, null);
        try {
            await client!.ping();
        } catch {
            await client!.quit().catch(() => {});
            setRedisFactoryForTest(null);
            t.skip("DragonflyDB :6379 unreachable — skipping live wire test");
            return;
        }
        const key = `ke:test:${Date.now()}`;
        assert.equal(await setString(key, "live", { ex: 30 }), true);
        assert.equal(await getString(key), "live");
        await client!.quit();
    });
    setRedisFactoryForTest(null);
});
