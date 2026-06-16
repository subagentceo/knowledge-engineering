/**
 * Thin typed Redis-wire wrapper for the local DragonflyDB drop-in (:6379).
 * Gated by REDIS_URL: when unset, callers treat Redis as disabled (no client
 * built) and fall back to the source of truth. The client is lazily built via
 * node-redis 6 and module-cached so the dependency is never touched until
 * first use.
 *
 * @cite seeds/citations/dragonfly-redis-compat.md
 */
import { createRequire } from "node:module";

export const DEFAULT_REDIS_URL = "redis://localhost:6379";

export interface RedisClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: string, ttl?: number): Promise<unknown>;
    ping(): Promise<string>;
    // node-redis 6 graceful teardown (replaces deprecated quit()). No-op when
    // the lazy connection was never opened, keeping the REDIS_URL gate zero-cost.
    close(): Promise<void>;
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
    // node-redis 6 is declared in package.json; required lazily so an unconfigured
    // process never loads it (matches the REDIS_URL gate).
    // WHY: createRequire + synchronous require is used here to keep the lazy-load
    // pattern from ioredis. node-redis 6 exports createClient; we call it but defer
    // connect() to the first real operation so the gate stays zero-cost when inactive.
    const require = createRequire(import.meta.url);
    const mod = require("redis");
    const { createClient } = mod;
    // WHY: node-redis 6 requires explicit connect() — we wrap it behind a connected
    // promise so the first .get() or .set() call triggers the handshake transparently.
    let connectedClient: ReturnType<typeof createClient> | null = null;
    let connectPromise: Promise<ReturnType<typeof createClient>> | null = null;

    function getConnected(): Promise<ReturnType<typeof createClient>> {
        if (connectedClient !== null) return Promise.resolve(connectedClient);
        if (connectPromise !== null) return connectPromise;
        // Gate semantics: Redis is best-effort (callers fall back to the source
        // of truth when it's down). node-redis 6 defaults to an INFINITE initial
        // reconnect loop, which would hang the caller — and the CI verify gate —
        // when :6379 is unreachable. Bound it: 3 s connect timeout, give up after
        // 2 retries so connect() rejects fast instead of looping forever.
        const c = createClient({
            url,
            socket: {
                connectTimeout: 3000,
                reconnectStrategy: (retries: number) =>
                    retries >= 2 ? false : Math.min(retries * 100, 300),
            },
        });
        c.on("error", (err: Error) => console.error("redis-client error:", err.message));
        // WHY: reset connectPromise on rejection so the next call can retry,
        // rather than re-returning a permanently-rejected promise forever.
        connectPromise = c.connect().then(() => {
            connectedClient = c;
            return c;
        }).catch((err: unknown) => {
            connectPromise = null;
            throw err;
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return connectPromise!;
    }

    return {
        get: async (key: string) => {
            const c = await getConnected();
            return c.get(key);
        },
        set: async (key: string, value: string, mode?: string, ttl?: number) => {
            const c = await getConnected();
            if (mode === "EX" && ttl !== undefined) {
                return c.set(key, value, { EX: ttl });
            }
            return c.set(key, value);
        },
        ping: async () => {
            const c = await getConnected();
            return c.ping();
        },
        close: async () => {
            if (connectedClient !== null) {
                await connectedClient.close();
                connectedClient = null;
            }
            connectPromise = null;
        },
    };
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
