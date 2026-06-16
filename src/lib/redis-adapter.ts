/**
 * Thin adapter that wraps a node-redis 6 client into the RedisLike interface
 * consumed by src/cache/lru-bm25.ts (L2 msgpack tier).
 *
 * node-redis 6 GET returns a string by default; to receive raw bytes we call
 * withTypeMapping({ [RESP_TYPES.BLOB_STRING]: Buffer }) so the library maps
 * the BLOB_STRING RESP type to a Node.js Buffer instead of decoding it as UTF-8.
 *
 * @cite https://www.npmjs.com/package/redis
 * @cite src/cache/lru-bm25.ts
 */

import { createClient, RESP_TYPES } from "redis";
import type { RedisLike } from "../cache/lru-bm25.js";

// WHY: The return type of createClient() is a complex generic. Using `unknown`
// here avoids downstream generic-mismatch errors when calling withTypeMapping.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NodeRedisClient = any;

/**
 * Wrap a connected node-redis 6 client in the RedisLike interface so callers
 * in lru-bm25.ts / tiered.ts get binary-safe reads without casting.
 */
export function toRedisLike(client: NodeRedisClient): RedisLike {
  // WHY: withTypeMapping creates a view of the client where BLOB_STRING RESP
  // replies are mapped to Buffer — necessary for msgpack binary round-trips.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const bufClient: { get(key: string): Promise<Buffer | null> } = client.withTypeMapping({
    [RESP_TYPES.BLOB_STRING]: Buffer,
  }) as { get(key: string): Promise<Buffer | null> };

  return {
    getBuffer: (key) => bufClient.get(key),
    set: (key, value, opts) =>
      // node-redis 6 SET accepts Buffer as value; EX option sets TTL in seconds.
      // WHY: deprecated shorthand `{ EX: n }` is still supported in v6.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      client.set(key, value, { EX: opts.EX }) as Promise<unknown>,
    del: (key) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      client.del(key) as Promise<unknown>,
    expire: (key, seconds) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      client.expire(key, seconds) as Promise<unknown>,
  };
}

/**
 * Create and connect a node-redis 6 client, return the RedisLike adapter.
 * Caller is responsible for calling client.disconnect() on teardown.
 */
export async function createRedisLike(url: string): Promise<{ client: NodeRedisClient; redis: RedisLike }> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const client: NodeRedisClient = createClient({ url });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  client.on("error", (err: Error) => {
    console.error("Redis client error:", err.message);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await client.connect();
  return { client, redis: toRedisLike(client) };
}
