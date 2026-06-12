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
import type { Redis } from "ioredis";
import { get as volatileGet, set as volatileSet } from "./lru-bm25.js";
import { DurableStore, PROMOTE_AFTER_HITS } from "./durable-store.js";

const volatileHits = new Map<string, number>();

export interface TieredCache {
  redis: Redis;
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
      await cache.durable.persistVolatile(
        [{ key, value: volatile, ...(sourcePath !== undefined && { sourcePath }), hits }],
        schema,
      );
    }
    return volatile;
  }

  const durable = await cache.durable.get(key, schema);
  if (durable === undefined) return undefined;
  // Backfill the volatile tiers so the next read resolves at L1.
  await volatileSet(cache.redis, key, durable);
  volatileHits.set(key, 0);
  return durable;
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
  },
  hitsFor(key: string): number {
    return volatileHits.get(key) ?? 0;
  },
};
