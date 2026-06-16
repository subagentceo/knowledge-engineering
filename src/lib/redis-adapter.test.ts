/**
 * @cite seeds/citations/dragonfly-redis-compat.md
 * @tdd green
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { toRedisLike } from "./redis-adapter.js";

// Fake node-redis 6 client. withTypeMapping() returns a Buffer-typed view whose
// get() yields a Buffer (mirroring BLOB_STRING -> Buffer mapping); the base
// client carries set/del/expire.
function makeFakeNodeRedis() {
    const store = new Map<string, Buffer>();
    const calls: string[] = [];
    const client = {
        calls,
        withTypeMapping(_mapping: unknown) {
            return {
                get: async (key: string) => {
                    calls.push(`get ${key}`);
                    return store.has(key) ? store.get(key)! : null;
                },
            };
        },
        set: async (key: string, value: Buffer | string, opts: { EX: number }) => {
            calls.push(`set ${key} EX ${opts.EX}`);
            store.set(key, Buffer.isBuffer(value) ? value : Buffer.from(value));
            return "OK";
        },
        del: async (key: string) => {
            calls.push(`del ${key}`);
            return store.delete(key) ? 1 : 0;
        },
        expire: async (key: string, seconds: number) => {
            calls.push(`expire ${key} ${seconds}`);
            return true;
        },
    };
    return client;
}

test("toRedisLike.set + getBuffer round-trip binary through the BLOB_STRING view", async () => {
    const fake = makeFakeNodeRedis();
    const redis = toRedisLike(fake);
    const payload = Buffer.from([0x01, 0x02, 0xff]);
    await redis.set("k", payload, { EX: 30 });
    const got = await redis.getBuffer("k");
    assert.ok(Buffer.isBuffer(got));
    assert.deepEqual(got, payload);
});

test("toRedisLike.getBuffer returns null on a miss", async () => {
    const redis = toRedisLike(makeFakeNodeRedis());
    assert.equal(await redis.getBuffer("absent"), null);
});

test("toRedisLike.del + expire delegate to the base client", async () => {
    const fake = makeFakeNodeRedis();
    const redis = toRedisLike(fake);
    await redis.set("k", Buffer.from("v"), { EX: 10 });
    assert.equal(await redis.del("k"), 1);
    assert.equal(await redis.del("k"), 0);
    assert.equal(await redis.expire("k", 60), true);
    assert.deepEqual(fake.calls, ["set k EX 10", "del k", "del k", "expire k 60"]);
});
