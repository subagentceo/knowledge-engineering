/**
 * Thin typed Redis-wire wrapper for the local DragonflyDB drop-in (:6379).
 * Gated by REDIS_URL: when unset, callers treat Redis as disabled (no client
 * built) and fall back to the source of truth. The client is lazily built via
 * ioredis and module-cached so the dependency is never touched until first use.
 *
 * @cite seeds/citations/dragonfly-redis-compat.md
 */
import { createRequire } from "node:module";

export const DEFAULT_REDIS_URL = "redis://localhost:6379";

export interface RedisClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: string, ttl?: number): Promise<unknown>;
}

type RedisFactory = (url: string) => RedisClient;

let cached: RedisClient | null = null;
let testFactory: RedisFactory | null = null;

// WHY: tests inject a mock factory so the suite never opens a live socket.
export function setRedisFactoryForTest(factory: RedisFactory | null): void {
    testFactory = factory;
    cached = null;
}

export function redisEnabled(): boolean {
    return Boolean(process.env.REDIS_URL);
}

export function redisUrl(): string {
    return process.env.REDIS_URL ?? DEFAULT_REDIS_URL;
}

function build(url: string): RedisClient {
    // ioredis is declared in package.json; required lazily so an unconfigured
    // process never loads it (matches the REDIS_URL gate).
    const require = createRequire(import.meta.url);
    const mod = require("ioredis");
    const IORedis = mod.default ?? mod;
    return new IORedis(url, { lazyConnect: true }) as RedisClient;
}

export function getClient(): RedisClient | null {
    if (!redisEnabled() && !testFactory) return null;
    if (cached) return cached;
    const make = testFactory ?? build;
    cached = make(redisUrl());
    return cached;
}

export async function getString(key: string): Promise<string | null> {
    const client = getClient();
    if (!client) return null;
    return client.get(key);
}

export async function setString(
    key: string,
    value: string,
    opts?: { ex?: number },
): Promise<boolean> {
    const client = getClient();
    if (!client) return false;
    if (opts?.ex) await client.set(key, value, "EX", opts.ex);
    else await client.set(key, value);
    return true;
}
