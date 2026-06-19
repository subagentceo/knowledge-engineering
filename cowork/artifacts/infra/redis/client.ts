/**
 * infra/redis/client.ts
 * E2M Redis client — ioredis 5.11.1
 *
 * Features used:
 *   - Named import (default import deprecated in next major)
 *   - enableAutoPipelining  — 35-50% throughput gain at zero API cost
 *   - blockingTimeout       — zombie-connection safety for BLPOP/XREAD
 *   - reconnectOnError      — auto-reconnect on READONLY (failover)
 *   - node:diagnostics_channel — built-in OTel-compatible tracing (replaces @opentelemetry/redis-common)
 *   - scanStream            — non-blocking namespace flush
 *   - showFriendlyErrorStack — dev mode only
 *   - Bloom filter via raw ioredis .call() (redis-stack BF.*)
 *
 * DEBUG=ioredis:* for wire-level trace | DEBUG=e2m:cache for cache-aside
 */

import { Redis, type RedisOptions } from "ioredis";
import dc from "node:diagnostics_channel";

// ── Diagnostics channel subscribers (ioredis 5.11.1 native tracing) ──────────
// Fires for every command — wire up to OTel or just log in dev
// Channels: tracing:ioredis:command:{start,end,asyncStart,asyncEnd,error}
//           tracing:ioredis:batch:{...}   tracing:ioredis:connect:{...}

if (process.env.IOREDIS_TRACE === "1") {
  dc.subscribe("tracing:ioredis:command:start", (msg: unknown) => {
    const m = msg as Record<string, unknown>;
    process.stdout.write(`[ioredis] > ${m["command"]} ${JSON.stringify(m["args"]).slice(0, 80)}\n`);
  });
  dc.subscribe("tracing:ioredis:command:error", (msg: unknown) => {
    const m = msg as Record<string, unknown>;
    process.stderr.write(`[ioredis] ERR ${m["command"]}: ${(m["error"] as Error)?.message}\n`);
  });
}

// ── Config ────────────────────────────────────────────────────────────────────

export interface E2MRedisConfig {
  host?: string;
  port?: number;
  password?: string;
  db?: number;
  tls?: boolean;
  maxRetriesPerRequest?: number;
  /** Auto-pipeline: batch all commands issued in one event loop tick. Default true. */
  enableAutoPipelining?: boolean;
  /** Client-side timeout (ms) for blocking commands (BLPOP, XREAD, …). Default 30s. */
  blockingTimeout?: number;
  otelServiceName?: string;
}

// ── Client ────────────────────────────────────────────────────────────────────

export class E2MRedisClient {
  readonly client: Redis;
  private readonly serviceName: string;

  constructor(config: E2MRedisConfig = {}) {
    this.serviceName = config.otelServiceName ?? "e2m-redis";

    const isDev = process.env.NODE_ENV !== "production";

    const opts: RedisOptions = {
      host: config.host ?? "127.0.0.1",
      port: config.port ?? 6379,
      password: config.password,
      db: config.db ?? 0,
      maxRetriesPerRequest: config.maxRetriesPerRequest ?? 3,
      enableReadyCheck: true,
      lazyConnect: true,
      tls: config.tls ? {} : undefined,

      // Auto-pipeline: zero API changes, 35-50% throughput improvement
      enableAutoPipelining: config.enableAutoPipelining ?? true,

      // Zombie-connection protection for BLPOP / XREAD / BRPOP
      blockingTimeout: config.blockingTimeout ?? 30_000,

      // Reconnect on READONLY — handles ElastiCache / Redis Sentinel failover
      reconnectOnError(err: Error) {
        return err.message.includes("READONLY") ? 2 : false; // 2 = reconnect + resend
      },

      retryStrategy(times: number) {
        return Math.min(times * 50, 2_000);
      },

      // Friendly stacks in dev only — too slow for production
      showFriendlyErrorStack: isDev,
    };

    this.client = new Redis(opts);

    this.client.on("connect", () =>
      process.stdout.write(`[${this.serviceName}] Redis connected\n`)
    );
    this.client.on("ready", () =>
      process.stdout.write(`[${this.serviceName}] Redis ready\n`)
    );
    this.client.on("reconnecting", (ms: number) =>
      process.stdout.write(`[${this.serviceName}] Redis reconnecting in ${ms}ms\n`)
    );
    this.client.on("error", (err: Error) =>
      process.stderr.write(`[${this.serviceName}] Redis error: ${err.message}\n`)
    );
  }

  // ── E2M Envelope Storage ──────────────────────────────────────────────────

  async putEnvelope(envelopeId: string, envelope: object, ttlMs?: number): Promise<void> {
    const key = `e2m:envelope:${envelopeId}`;
    const json = JSON.stringify(envelope);
    if (ttlMs) {
      await this.client.set(key, json, "PX", ttlMs);
    } else {
      await this.client.set(key, json);
    }
  }

  async getEnvelope(envelopeId: string): Promise<unknown | null> {
    const raw = await this.client.get(`e2m:envelope:${envelopeId}`);
    return raw ? JSON.parse(raw) : null;
  }

  // ── Mailbox Queue (RPUSH / BLPOP) ─────────────────────────────────────────
  // blockingTimeout guards the BLPOP against zombie connections

  async enqueue(mailbox: string, envelopeId: string): Promise<void> {
    await this.client.rpush(`e2m:mailbox:${mailbox}`, envelopeId);
  }

  async dequeue(mailbox: string, timeoutSec = 5): Promise<string | null> {
    const result = await this.client.blpop(`e2m:mailbox:${mailbox}`, timeoutSec);
    return result ? result[1] : null;
  }

  // ── Task State ────────────────────────────────────────────────────────────

  async setTaskStatus(taskId: string, status: string, ttlMs = 3_600_000): Promise<void> {
    await this.client.set(`e2m:task:${taskId}:status`, status, "PX", ttlMs);
  }

  async getTaskStatus(taskId: string): Promise<string | null> {
    return this.client.get(`e2m:task:${taskId}:status`);
  }

  // ── Memory Store Cache ────────────────────────────────────────────────────

  async cacheMemory(storeId: string, memId: string, content: string, ttlMs = 300_000): Promise<void> {
    await this.client.set(`e2m:memcache:${storeId}:${memId}`, content, "PX", ttlMs);
  }

  async getCachedMemory(storeId: string, memId: string): Promise<string | null> {
    return this.client.get(`e2m:memcache:${storeId}:${memId}`);
  }

  // ── OpenFeature Flag Cache ────────────────────────────────────────────────

  async cacheFlag(flagKey: string, value: unknown, ttlMs = 60_000): Promise<void> {
    await this.client.set(`e2m:flag:${flagKey}`, JSON.stringify(value), "PX", ttlMs);
  }

  async getCachedFlag(flagKey: string): Promise<unknown | null> {
    const raw = await this.client.get(`e2m:flag:${flagKey}`);
    return raw ? JSON.parse(raw) : null;
  }

  // ── Bloom Filter (redis-stack BF.* via raw .call()) ───────────────────────

  async bloomReserve(filterName: string, errorRate = 0.001, capacity = 10_000): Promise<void> {
    await this.client.call("BF.RESERVE", filterName, String(errorRate), String(capacity));
  }

  async bloomAdd(filterName: string, item: string): Promise<number> {
    return (await this.client.call("BF.ADD", filterName, item)) as number;
  }

  async bloomExists(filterName: string, item: string): Promise<boolean> {
    return (await this.client.call("BF.EXISTS", filterName, item)) === 1;
  }

  // ── Envelope Dedup ────────────────────────────────────────────────────────

  async markEnvelopeSeen(envelopeId: string): Promise<boolean> {
    return (await this.bloomAdd("e2m:seen-envelopes", envelopeId)) === 1;
  }

  async isEnvelopeSeen(envelopeId: string): Promise<boolean> {
    return this.bloomExists("e2m:seen-envelopes", envelopeId);
  }

  // ── Namespace Flush via scanStream (non-blocking) ─────────────────────────

  async flushNamespace(prefix: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const stream = this.client.scanStream({ match: `${prefix}:*`, count: 100 });
      let deleted = 0;
      const pipeline = this.client.pipeline();

      stream.on("data", (keys: string[]) => {
        if (keys.length === 0) return;
        stream.pause();
        for (const k of keys) pipeline.del(k);
        pipeline.exec().then((results: unknown[] | null) => {
          deleted += results?.length ?? 0;
          stream.resume();
        }).catch(reject);
      });

      stream.on("end", () => resolve(deleted));
      stream.on("error", reject);
    });
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createE2MRedis(config?: E2MRedisConfig): E2MRedisClient {
  return new E2MRedisClient(config);
}

// ── Preset configs ────────────────────────────────────────────────────────────

export const REDIS_CONFIGS = {
  localDocker: (): E2MRedisConfig => ({
    host: "127.0.0.1",
    port: 6379,
    otelServiceName: "e2m-redis-local",
  }),

  redisCloud: (host: string, port: number, password: string): E2MRedisConfig => ({
    host,
    port,
    password,
    tls: true,
    otelServiceName: "e2m-redis-cloud",
  }),

  alloydbOmniSidecar: (): E2MRedisConfig => ({
    host: process.env.REDIS_HOST ?? "redis",
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD,
    otelServiceName: "e2m-redis-alloydb-sidecar",
  }),
} as const;
