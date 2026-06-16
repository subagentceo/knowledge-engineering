/**
 * BloomFilter-backed deduplication for the A2A self-steering PR-analysis loop.
 *
 * Uses @redis/bloom (Redis Stack BF module) to record which PR numbers have
 * already been fully analysed in this session. False-positive rate < 0.1% at
 * 10 000 items with the default BF.RESERVE parameters.
 *
 * Callers:
 *   markAnalyzed(client, prNumber)  — called after successful analysis
 *   wasAnalyzed(client, prNumber)   — called before dispatching analysis work
 *
 * Key: ke:analyzed-prs (filter created on first write if absent).
 *
 * @cite https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/
 * @cite src/lib/redis-adapter.ts
 */

import type { NodeRedisClient } from "./redis-adapter.js";

const BLOOM_KEY = "ke:analyzed-prs";

/**
 * Record that a PR has been analyzed. Idempotent (BF.ADD is set-semantics).
 */
export async function markAnalyzed(client: NodeRedisClient, prNumber: number): Promise<void> {
  await client.bf.add(BLOOM_KEY, prNumber.toString());
}

/**
 * Check whether a PR has already been analyzed. May return true for PRs that
 * were NOT analyzed (false positive) — callers must tolerate the rare skip.
 */
export async function wasAnalyzed(client: NodeRedisClient, prNumber: number): Promise<boolean> {
  return client.bf.exists(BLOOM_KEY, prNumber.toString());
}
