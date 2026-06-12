/**
 * Tiered-cache access event stream — dw.events_cache_access.
 *
 * Every get/set against L1 (in-process LRU), L2 (Redis) and L3
 * (Postgres semantic_cache) records one event. Events buffer in memory
 * and flush in batches through a PgLike sink, so the hot cache path
 * never blocks on the warehouse. With no sink attached the recorder is
 * a bounded ring buffer — recording is always safe to call.
 *
 * Contract: data/models/alloydb/events_cache_access.yaml (append-only;
 * the fact_cache_hits rollup aggregates this stream).
 *
 * @cite data/models/alloydb/events_cache_promotion.yaml
 * @cite seeds/citations/define-outcomes.md
 */

import { z } from "zod";
import type { PgLike } from "./durable-store.js";

export const EVENTS_CACHE_ACCESS_DDL = `
CREATE SCHEMA IF NOT EXISTS dw;
CREATE TABLE IF NOT EXISTS dw.events_cache_access (
  cache_key   text NOT NULL,
  tier        text NOT NULL CHECK (tier IN ('L1', 'L2', 'L3')),
  op          text NOT NULL CHECK (op IN ('hit', 'miss', 'set', 'invalidate', 'promote')),
  lane        text,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS events_cache_access_occurred_idx
  ON dw.events_cache_access (occurred_at);
`.trim();

export const CacheEventSchema = z.object({
  cacheKey: z.string().min(1),
  tier: z.enum(["L1", "L2", "L3"]),
  op: z.enum(["hit", "miss", "set", "invalidate", "promote"]),
  lane: z.string().nullable(),
  occurredAt: z.date(),
});
export type CacheEvent = z.infer<typeof CacheEventSchema>;

// Bounded so an unattached or unreachable sink can never grow memory
// without limit; oldest events drop first.
export const MAX_BUFFERED_EVENTS = 10_000;
// Auto-flush threshold once a sink is attached.
export const FLUSH_AFTER_EVENTS = 100;

let buffer: CacheEvent[] = [];
let sink: PgLike | null = null;
let flushing = false;

/** ke:<lane>:<id> → <lane>; null for keys outside the namespace. */
export function laneOf(cacheKey: string): string | null {
  const m = /^ke:([^:]+):/.exec(cacheKey);
  return m?.[1] ?? null;
}

export function recordCacheEvent(
  cacheKey: string,
  tier: CacheEvent["tier"],
  op: CacheEvent["op"],
): void {
  buffer.push(
    CacheEventSchema.parse({
      cacheKey,
      tier,
      op,
      lane: laneOf(cacheKey),
      occurredAt: new Date(),
    }),
  );
  if (buffer.length > MAX_BUFFERED_EVENTS) {
    buffer.splice(0, buffer.length - MAX_BUFFERED_EVENTS);
  }
  if (sink !== null && buffer.length >= FLUSH_AFTER_EVENTS && !flushing) {
    // Fire-and-forget: the cache path must not await the warehouse.
    void flushCacheEvents().catch(() => undefined);
  }
}

export function attachCacheEventSink(pg: PgLike): void {
  sink = pg;
}

export function detachCacheEventSink(): void {
  sink = null;
}

export async function initCacheEvents(pg: PgLike): Promise<void> {
  await pg.query(EVENTS_CACHE_ACCESS_DDL);
  attachCacheEventSink(pg);
}

/** Drain the buffer into the sink. Returns rows written (0 without a sink). */
export async function flushCacheEvents(): Promise<number> {
  if (sink === null || buffer.length === 0 || flushing) return 0;
  flushing = true;
  const batch = buffer;
  buffer = [];
  try {
    await sink.query(
      `INSERT INTO dw.events_cache_access (cache_key, tier, op, lane, occurred_at)
       SELECT * FROM unnest($1::text[], $2::text[], $3::text[], $4::text[], $5::timestamptz[])`,
      [
        batch.map((e) => e.cacheKey),
        batch.map((e) => e.tier),
        batch.map((e) => e.op),
        batch.map((e) => e.lane),
        batch.map((e) => e.occurredAt.toISOString()),
      ],
    );
    return batch.length;
  } catch (err) {
    // Re-buffer on failure so events survive a transient sink outage.
    buffer = batch.concat(buffer).slice(-MAX_BUFFERED_EVENTS);
    throw err;
  } finally {
    flushing = false;
  }
}

export function pendingCacheEvents(): number {
  return buffer.length;
}

// Exported for tests only.
export const __test = {
  reset(): void {
    buffer = [];
    sink = null;
    flushing = false;
  },
  peek(): readonly CacheEvent[] {
    return buffer;
  },
};
