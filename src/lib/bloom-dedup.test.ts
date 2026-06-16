/**
 * @cite seeds/citations/dragonfly-redis-compat.md
 * @tdd green
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { markAnalyzed, wasAnalyzed } from "./bloom-dedup.js";

// Fake @redis/bloom client: BF.ADD set-semantics, BF.EXISTS membership.
function makeBloomClient() {
    const added = new Set<string>();
    const calls: string[] = [];
    return {
        calls,
        bf: {
            add: async (key: string, item: string) => {
                calls.push(`add ${key} ${item}`);
                const isNew = !added.has(item);
                added.add(item);
                return isNew;
            },
            exists: async (key: string, item: string) => {
                calls.push(`exists ${key} ${item}`);
                return added.has(item);
            },
        },
    };
}

test("wasAnalyzed is false before markAnalyzed, true after", async () => {
    const client = makeBloomClient();
    assert.equal(await wasAnalyzed(client, 492), false);
    await markAnalyzed(client, 492);
    assert.equal(await wasAnalyzed(client, 492), true);
});

test("markAnalyzed is idempotent (set-semantics)", async () => {
    const client = makeBloomClient();
    await markAnalyzed(client, 100);
    await markAnalyzed(client, 100);
    assert.equal(await wasAnalyzed(client, 100), true);
});

test("distinct PR numbers are tracked independently against the same key", async () => {
    const client = makeBloomClient();
    await markAnalyzed(client, 1);
    assert.equal(await wasAnalyzed(client, 1), true);
    assert.equal(await wasAnalyzed(client, 2), false);
    // Both functions address the canonical filter key.
    assert.ok(client.calls.every((c) => c.includes("ke:analyzed-prs")));
});
