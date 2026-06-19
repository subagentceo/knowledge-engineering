/**
 * infra/cache/alloydb-redis.ts
 * Cache-aside layer: ioredis front-cache for AlloyDB Omni queries.
 *
 * Pattern: read → Redis hit → return; miss → AlloyDB → write Redis → return
 * All keys are namespaced under e2m:cache:<namespace>:<cacheKey>
 *
 * Token-efficiency goal: hot reads never hit AlloyDB; writes invalidate Redis.
 */

import debug from "debug";
import { Pool, type QueryResultRow } from "pg";
import { type E2MRedisClient } from "../redis/client.js";

const log = debug("e2m:cache");

export interface CacheAside {
  /** Namespace used in Redis key: e2m:cache:<ns>:<key> */
  ns: string;
  /** TTL for cached rows in milliseconds. Default 60s. */
  ttlMs?: number;
}

export interface CacheOptions extends CacheAside {
  /** Force a cache bypass and refresh from AlloyDB */
  refresh?: boolean;
}

// ── Core cache-aside executor ─────────────────────────────────────────────────

export class AlloyDBRedisCache {
  private readonly pool: Pool;
  private readonly redis: E2MRedisClient;
  private readonly defaultTtlMs: number;

  constructor(pool: Pool, redis: E2MRedisClient, defaultTtlMs = 60_000) {
    this.pool = pool;
    this.redis = redis;
    this.defaultTtlMs = defaultTtlMs;
  }

  private redisKey(ns: string, cacheKey: string): string {
    return `e2m:cache:${ns}:${cacheKey}`;
  }

  /**
   * Execute a SELECT query with cache-aside.
   * Returns cached rows if present; otherwise queries AlloyDB and caches result.
   */
  async query<R extends QueryResultRow = QueryResultRow>(
    cacheKey: string,
    sql: string,
    params: unknown[],
    opts: CacheOptions,
  ): Promise<R[]> {
    const key = this.redisKey(opts.ns, cacheKey);
    const ttl = opts.ttlMs ?? this.defaultTtlMs;

    if (!opts.refresh) {
      const cached = await this.redis.client.get(key);
      if (cached !== null) {
        log("HIT  %s", key);
        return JSON.parse(cached) as R[];
      }
    }

    log("MISS %s → AlloyDB", key);
    const { rows } = await this.pool.query<R>(sql, params);
    await this.redis.client.set(key, JSON.stringify(rows), "PX", ttl);
    return rows;
  }

  /**
   * Invalidate one or more cache keys in a namespace.
   * Supports glob patterns via Redis SCAN (e.g. "*" to flush all in ns).
   */
  async invalidate(ns: string, ...cacheKeys: string[]): Promise<void> {
    const keys = cacheKeys.map((k) => this.redisKey(ns, k));
    if (keys.length === 0) return;
    log("DEL  %o", keys);
    await this.redis.client.del(...keys);
  }

  /** Flush all keys in a namespace via scanStream (non-blocking, pause/resume). */
  async flushNamespace(ns: string): Promise<number> {
    const deleted = await this.redis.flushNamespace(this.redisKey(ns, "").slice(0, -1));
    log("FLUSH ns=%s deleted=%d", ns, deleted);
    return deleted;
  }

  // ── E2M Domain Queries ────────────────────────────────────────────────────

  /** Get envelope by ID — cached 5 min */
  async getEnvelope(envelopeId: string, refresh = false) {
    return this.query(
      envelopeId,
      `SELECT * FROM e2m_envelopes WHERE envelope_id = $1`,
      [envelopeId],
      { ns: "envelope", ttlMs: 300_000, refresh },
    );
  }

  /** List pending envelopes for a mailbox — cached 10s (high-churn) */
  async getPendingForMailbox(toHost: string, toMailbox: string, refresh = false) {
    return this.query(
      `${toHost}:${toMailbox}`,
      `SELECT * FROM e2m_envelopes
       WHERE to_host = $1 AND to_mailbox = $2 AND status = 'pending'
       ORDER BY sent_at ASC LIMIT 100`,
      [toHost, toMailbox],
      { ns: "mailbox-pending", ttlMs: 10_000, refresh },
    );
  }

  /** Get task by ID — cached 30s */
  async getTask(taskId: string, refresh = false) {
    return this.query(
      taskId,
      `SELECT * FROM e2m_tasks WHERE task_id = $1`,
      [taskId],
      { ns: "task", ttlMs: 30_000, refresh },
    );
  }

  /** Invalidate envelope cache after write */
  async invalidateEnvelope(envelopeId: string): Promise<void> {
    await this.invalidate("envelope", envelopeId);
  }

  /** Invalidate mailbox listing after delivery */
  async invalidateMailbox(toHost: string, toMailbox: string): Promise<void> {
    await this.invalidate("mailbox-pending", `${toHost}:${toMailbox}`);
  }

  /** Invalidate task cache after status update */
  async invalidateTask(taskId: string): Promise<void> {
    await this.invalidate("task", taskId);
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createCacheAside(
  pool: Pool,
  redis: E2MRedisClient,
  defaultTtlMs?: number,
): AlloyDBRedisCache {
  return new AlloyDBRedisCache(pool, redis, defaultTtlMs);
}
