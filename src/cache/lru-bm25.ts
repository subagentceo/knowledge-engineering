/**
 * LRU + BM25 cache layer — L1 in-process (lru-cache) + L2 Redis (ioredis).
 *
 * Serialization: @msgpack/msgpack (canonical binary codec).
 * Eviction:      lru-cache v11 by isaacs — allkeys-LRU, 7-day TTL.
 * Ranking:       wink-bm25-text-search v2 — BM25F, k1/b tunable.
 * Type safety:   every get() call validates via a caller-supplied z.ZodType<T>;
 *                no "as T" casts anywhere. The same schema is exported for use
 *                as Anthropic tool input_schema so the model is constrained to
 *                produce the exact shape — no type prediction required.
 *
 * @cite infra/redis/redis.conf
 * @cite https://github.com/isaacs/node-lru-cache
 * @cite https://www.npmjs.com/package/wink-bm25-text-search
 * @cite https://github.com/msgpack/msgpack-javascript
 */

import { LRUCache } from "lru-cache";
import { encode, decode } from "@msgpack/msgpack";
import BM25 from "wink-bm25-text-search";
import { z } from "zod";
import type { Redis } from "ioredis";
import { recordCacheEvent } from "./events.js";

// 7 days aligned with Redis allkeys-lru TTL constant in infra/redis/redis.conf
export const TTL_MS  = 7 * 24 * 60 * 60 * 1_000;
export const TTL_SEC = TTL_MS / 1_000;

// In-process LRU — max 1 000 entries, 64 MiB byte-size cap
const lru = new LRUCache<string, Uint8Array>({
  max: 1_000,
  maxSize: 64 * 1024 * 1024,
  sizeCalculation: (v) => v.byteLength,
  ttl: TTL_MS,
  allowStale: false,
});

// ── BM25 engine factory ───────────────────────────────────────────────────────
// wink-bm25 is write-once: consolidate() seals the index. Re-indexing requires
// a new instance. We track the live instance + a pending-docs buffer so callers
// can call indexDoc() freely and search() always consolidates lazily.

type BM25Engine = ReturnType<typeof BM25>;

let engine: BM25Engine = makeFreshEngine();
let pendingDocs = 0;
let consolidated = false;

function makeFreshEngine(): BM25Engine {
  const e = BM25();
  e.defineConfig({ fldWeights: { title: 2, body: 1 } });
  // Prep pipeline: canonical string transforms — no wink-nlp-utils dep needed.
  // BM25F ranking is entirely inside wink-bm25; only tokenisation lives here.
  e.definePrepTasks([
    (s: string)   => s.toLowerCase(),
    (s: string)   => s.split(/\W+/).filter(Boolean),
    (ts: string[]) => ts.filter((t) => t.length > 1),
  ]);
  return e;
}

// ── Public API ────────────────────────────────────────────────────────────────

export const DocSchema = z.object({
  id:    z.string(),
  title: z.string(),
  body:  z.string(),
}).passthrough();
export type Doc = z.infer<typeof DocSchema>;

/**
 * get — L1 (in-process LRU) → L2 (Redis) → undefined on miss.
 *
 * schema validates the decoded value at runtime — no "as T" cast.
 * On schema failure the entry is treated as a miss and evicted.
 */
export async function get<T>(
  redis: Redis,
  key:   string,
  schema: z.ZodType<T>,
): Promise<T | undefined> {
  const l1 = lru.get(key);
  if (l1) {
    const parsed = schema.safeParse(decode(l1));
    if (parsed.success) {
      recordCacheEvent(key, "L1", "hit");
      return parsed.data;
    }
    lru.delete(key);
  }
  recordCacheEvent(key, "L1", "miss");

  const raw = await redis.getBuffer(key);
  if (!raw) {
    recordCacheEvent(key, "L2", "miss");
    return undefined;
  }

  const parsed = schema.safeParse(decode(raw));
  if (!parsed.success) {
    await redis.del(key);
    recordCacheEvent(key, "L2", "miss");
    return undefined;
  }
  lru.set(key, new Uint8Array(raw));
  recordCacheEvent(key, "L2", "hit");
  return parsed.data;
}

/**
 * set — writes validated value to L1 + L2 with 7-day TTL.
 */
export async function set<T>(
  redis: Redis,
  key:   string,
  value: T,
): Promise<void> {
  const bytes = encode(value) as Uint8Array;
  lru.set(key, bytes);
  recordCacheEvent(key, "L1", "set");
  await redis.set(key, Buffer.from(bytes), "EX", TTL_SEC);
  recordCacheEvent(key, "L2", "set");
}

/**
 * invalidate — evicts from both tiers.
 */
export async function invalidate(redis: Redis, key: string): Promise<void> {
  lru.delete(key);
  await redis.del(key);
  recordCacheEvent(key, "L1", "invalidate");
  recordCacheEvent(key, "L2", "invalidate");
}

/**
 * indexDoc — adds a document to the BM25 index.
 * If the engine was already consolidated, it is re-created (all prior
 * documents are NOT re-indexed — callers must re-seed on restart).
 */
export function indexDoc(doc: Doc): void {
  const validated = DocSchema.parse(doc);
  if (consolidated) {
    engine = makeFreshEngine();
    pendingDocs = 0;
    consolidated = false;
  }
  engine.addDoc({ title: validated.title, body: validated.body }, validated.id);
  pendingDocs++;
}

/**
 * search — BM25F ranked search. Returns doc ids ordered by relevance.
 */
export function search(query: string, limit = 10): string[] {
  if (pendingDocs === 0) return [];
  if (!consolidated) {
    engine.consolidate();
    consolidated = true;
  }
  const results: Array<[string, number]> = engine.search(query);
  return results.slice(0, limit).map(([id]) => id);
}

/**
 * cacheKey — deterministic Redis key namespace.
 */
export function cacheKey(ns: string, id: string): string {
  return `ke:${ns}:${id}`;
}
