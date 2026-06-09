/**
 * Durable semantic-cache tier — PostgreSQL 16.
 *
 * Sits under the volatile tiers in src/cache/lru-bm25.ts (L1 in-process
 * LRU, L2 Redis). Redis is allkeys-lru with a 7-day TTL, so anything an
 * agent learns mid-session evaporates unless it is persisted here. The
 * runtime contract: while agents work in the repo, hot entries that
 * survive past PROMOTE_AFTER_HITS volatile hits get upserted into
 * `semantic_cache` and outlive the session.
 *
 * Type safety mirrors lru-bm25.ts: every get() validates through a
 * caller-supplied zod schema; no `as T` casts.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite https://www.npmjs.com/package/redis
 * @cite https://www.npmjs.com/package/pg
 */

import { z } from "zod";

// Hits in the volatile tier before an entry is considered durable-worthy.
export const PROMOTE_AFTER_HITS = 3;

export const SEMANTIC_CACHE_DDL = `
CREATE TABLE IF NOT EXISTS semantic_cache (
  key         text PRIMARY KEY,
  payload     jsonb NOT NULL,
  source_path text,
  hits        bigint NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  last_hit_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS semantic_cache_last_hit_idx ON semantic_cache (last_hit_at);
`.trim();

// Minimal structural interface over `pg` Pool/Client so tests run
// without a live database and callers can pass either.
export interface PgLike {
  query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>;
}

export interface DurableEntry<T> {
  key: string;
  value: T;
  sourcePath?: string;
  hits?: number;
}

export class DurableStore {
  constructor(private readonly pg: PgLike) {}

  async init(): Promise<void> {
    await this.pg.query(SEMANTIC_CACHE_DDL);
  }

  async set<T>(entry: DurableEntry<T>, schema: z.ZodType<T>): Promise<void> {
    const payload = schema.parse(entry.value);
    await this.pg.query(
      `INSERT INTO semantic_cache (key, payload, source_path, hits)
       VALUES ($1, $2::jsonb, $3, $4)
       ON CONFLICT (key) DO UPDATE
         SET payload = EXCLUDED.payload,
             source_path = EXCLUDED.source_path,
             hits = semantic_cache.hits + GREATEST(EXCLUDED.hits, 1),
             last_hit_at = now()`,
      [entry.key, JSON.stringify(payload), entry.sourcePath ?? null, entry.hits ?? 1],
    );
  }

  async get<T>(key: string, schema: z.ZodType<T>): Promise<T | undefined> {
    const { rows } = await this.pg.query(
      `UPDATE semantic_cache SET hits = hits + 1, last_hit_at = now()
       WHERE key = $1 RETURNING payload`,
      [key],
    );
    const row = rows[0];
    if (row === undefined) return undefined;
    return schema.parse(row.payload);
  }

  /**
   * Runtime persistence hook: batch-promote volatile entries that
   * crossed the hit threshold. Called by agents at todo-commit
   * boundaries so durable state lands even if the session dies.
   */
  async persistVolatile<T>(
    entries: DurableEntry<T>[],
    schema: z.ZodType<T>,
  ): Promise<number> {
    let promoted = 0;
    for (const entry of entries) {
      if ((entry.hits ?? 0) < PROMOTE_AFTER_HITS) continue;
      await this.set(entry, schema);
      promoted += 1;
    }
    return promoted;
  }

  async evictOlderThan(days: number): Promise<number> {
    const { rows } = await this.pg.query(
      `DELETE FROM semantic_cache
       WHERE last_hit_at < now() - make_interval(days => $1)
       RETURNING key`,
      [days],
    );
    return rows.length;
  }
}
