/**
 * Tiered read-through — one entry point over all three cache tiers.
 *
 * tieredGet: L1 (in-process LRU) → L2 (Redis) → L3 (Postgres
 * semantic_cache), backfilling the volatile tiers on an L3 hit so the
 * next read resolves at L1. Volatile hits are counted per key; crossing
 * PROMOTE_AFTER_HITS promotes the entry to L3 so it outlives the
 * 7-day allkeys-lru TTL. Every tier touch is recorded in
 * dw.events_cache_access by the underlying tier modules.
 *
 * Type safety matches the tiers: every read validates through the
 * caller's zod schema; no `as T` casts.
 *
 * @cite seeds/citations/define-outcomes.md
 * @cite infra/redis/redis.conf
 */

import { z } from "zod";
import type { RedisLike } from "./lru-bm25.js";
import { get as volatileGet, set as volatileSet } from "./lru-bm25.js";
import { DurableStore, PROMOTE_AFTER_HITS } from "./durable-store.js";

const volatileHits = new Map<string, number>();
// B2: tracks sourcePath from L3 backfill so promotion carries the correct path.
const volatileSourcePaths = new Map<string, string>();

export interface TieredCache {
  redis: RedisLike;
  durable: DurableStore;
}

/**
 * L1 → L2 → L3. Returns undefined only when all three tiers miss.
 */
export async function tieredGet<T>(
  cache: TieredCache,
  key: string,
  schema: z.ZodType<T>,
  sourcePath?: string,
): Promise<T | undefined> {
  const volatile = await volatileGet(cache.redis, key, schema);
  if (volatile !== undefined) {
    const hits = (volatileHits.get(key) ?? 0) + 1;
    volatileHits.set(key, hits);
    if (hits === PROMOTE_AFTER_HITS) {
      // B2: prefer caller-supplied sourcePath; fall back to path stored from L3 backfill.
      const resolvedSourcePath = sourcePath ?? volatileSourcePaths.get(key);
      try {
        await cache.durable.persistVolatile(
          [{ key, value: volatile, ...(resolvedSourcePath !== undefined && { sourcePath: resolvedSourcePath }), hits }],
          schema,
        );
      } finally {
        // B1: evict after promotion so the map doesn't grow unbounded.
        // try/finally ensures eviction even when persistVolatile throws so the key
        // is not stuck at PROMOTE_AFTER_HITS and silently skipped forever.
        volatileHits.delete(key);
        volatileSourcePaths.delete(key);
      }
    }
    return volatile;
  }

  const durableResult = await cache.durable.get(key, schema);
  if (durableResult === undefined) return undefined;
  // Backfill the volatile tiers so the next read resolves at L1.
  // B2: store sourcePath from L3 row so it threads through on promotion.
  await volatileSet(cache.redis, key, durableResult.value);
  volatileHits.set(key, 0);
  // Always sync sourcePath — clear stale path when L3 row has none.
  if (durableResult.sourcePath !== undefined) {
    volatileSourcePaths.set(key, durableResult.sourcePath);
  } else {
    volatileSourcePaths.delete(key);
  }
  return durableResult.value;
}

/**
 * Writes to L1 + L2. L3 is reached through promotion (read heat), or
 * immediately when `durable: true` — for values that must survive the
 * session regardless of hit count.
 */
export async function tieredSet<T>(
  cache: TieredCache,
  key: string,
  value: T,
  schema: z.ZodType<T>,
  opts: { sourcePath?: string; durable?: boolean } = {},
): Promise<void> {
  schema.parse(value);
  await volatileSet(cache.redis, key, value);
  volatileHits.set(key, 0);
  // Always sync sourcePath — clear stale path when opts.sourcePath is absent.
  if (opts.sourcePath !== undefined) {
    volatileSourcePaths.set(key, opts.sourcePath);
  } else {
    volatileSourcePaths.delete(key);
  }
  if (opts.durable === true) {
    await cache.durable.set(
      { key, value, ...(opts.sourcePath !== undefined && { sourcePath: opts.sourcePath }), hits: PROMOTE_AFTER_HITS },
      schema,
    );
  }
}

// Exported for tests only.
export const __test = {
  reset(): void {
    volatileHits.clear();
    volatileSourcePaths.clear();
  },
  hitsFor(key: string): number {
    return volatileHits.get(key) ?? 0;
  },
  hasKey(key: string): boolean {
    return volatileHits.has(key);
  },
  sourcePathFor(key: string): string | undefined {
    return volatileSourcePaths.get(key);
  },
};
