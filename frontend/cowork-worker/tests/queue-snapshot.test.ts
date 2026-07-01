/**
 * @cite cowork/mcp/e2m-mcp/server.ts
 * @cite cowork/scripts/queue-snapshot.ts
 * @cite frontend/cowork-worker/src/queue-snapshot.ts
 */
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { getQueueSnapshot, QUEUE_SNAPSHOT_KEY, type QueueSnapshot } from "../src/queue-snapshot.js";

interface FakeKV {
  get(key: string, opts?: { cacheTtl?: number }): Promise<string | null>;
}

function fakeEnv(kv: FakeKV) {
  return { QUEUE_SNAPSHOTS_KV: kv as unknown as KVNamespace };
}

const VALID_DOMAIN_COUNTS = {
  pending: 3, in_progress: 1, blocked: 0, completed: 2, failed: 0, unknown: 0,
};

describe("getQueueSnapshot", () => {
  test("happy path: returns parsed snapshot for well-formed JSON", async () => {
    const doc: QueueSnapshot = {
      at: "2026-06-30T12:00:00.000Z",
      domains: { engineering: VALID_DOMAIN_COUNTS },
    };
    let calledKey: string | undefined;
    const env = fakeEnv({
      async get(key) {
        calledKey = key;
        return JSON.stringify(doc);
      },
    });
    const snapshot = await getQueueSnapshot(env);
    assert.deepEqual(snapshot, doc);
    assert.equal(calledKey, QUEUE_SNAPSHOT_KEY);
  });

  test("missing key: returns null, does not throw", async () => {
    const env = fakeEnv({ async get() { return null; } });
    const snapshot = await getQueueSnapshot(env);
    assert.equal(snapshot, null);
  });

  test("malformed JSON: returns null, does not throw", async () => {
    const env = fakeEnv({ async get() { return "{not valid json"; } });
    const snapshot = await getQueueSnapshot(env);
    assert.equal(snapshot, null);
  });

  test("schema mismatch: returns null, does not throw", async () => {
    const env = fakeEnv({
      async get() {
        return JSON.stringify({ at: "2026-06-30T12:00:00.000Z", domains: { engineering: { pending: "not-a-number" } } });
      },
    });
    const snapshot = await getQueueSnapshot(env);
    assert.equal(snapshot, null);
  });

  test("KV.get throws: caught, returns null instead of propagating", async () => {
    const env = fakeEnv({
      async get() {
        throw new Error("KV unavailable");
      },
    });
    const snapshot = await getQueueSnapshot(env);
    assert.equal(snapshot, null);
  });

  test("passes cacheTtl >= 60s (Cloudflare KV floor)", async () => {
    let seenTtl: number | undefined;
    const env = fakeEnv({
      async get(_key, opts) {
        seenTtl = opts?.cacheTtl;
        return null;
      },
    });
    await getQueueSnapshot(env);
    assert.ok(seenTtl !== undefined && seenTtl >= 60, `cacheTtl was ${seenTtl}`);
  });
});
