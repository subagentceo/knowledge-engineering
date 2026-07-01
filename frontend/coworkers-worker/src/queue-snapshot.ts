/**
 * src/queue-snapshot.ts
 *
 * Shared KV-read helper for the { at, domains } queue-snapshot document
 * written by cowork/scripts/queue-snapshot.ts (KAN-32) to the
 * QUEUE_SNAPSHOTS_KV namespace under key "queues:latest".
 *
 * Never throws: KV.get(..., { type: "json" }) throws on malformed JSON, so
 * this reads as text and parses/validates manually, returning null on any
 * failure (missing key, malformed JSON, schema mismatch) instead of
 * propagating an error to the caller.
 *
 * DUPLICATED byte-for-byte in both frontend/cowork-worker/src/queue-snapshot.ts
 * and frontend/coworkers-worker/src/queue-snapshot.ts (KAN-35). Each Cloudflare
 * Worker is an isolated bundle deployed independently — there is no shared
 * npm package between frontend/* workers in this repo — so this file is
 * copied rather than imported cross-package. If you change one copy, change
 * the other to match (a diff between the two files should be empty).
 *
 * @cite cowork/mcp/e2m-mcp/server.ts       (collapseById + queue_status counts shape)
 * @cite cowork/scripts/queue-snapshot.ts   (QueueSnapshotDocument producer)
 * @cite frontend/cowork-worker/src/queue-snapshot.ts (KAN-33 original)
 */

import { z } from "zod";

const DomainCountsSchema = z.object({
  pending: z.number().int().nonnegative(),
  in_progress: z.number().int().nonnegative(),
  blocked: z.number().int().nonnegative(),
  completed: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  unknown: z.number().int().nonnegative(),
});

export const QueueSnapshotSchema = z.object({
  at: z.string(),
  domains: z.record(z.string(), DomainCountsSchema),
});

export type DomainCounts = z.infer<typeof DomainCountsSchema>;
export type QueueSnapshot = z.infer<typeof QueueSnapshotSchema>;

export const QUEUE_SNAPSHOT_KEY = "queues:latest";

// Cloudflare KV enforces a 60s floor on cacheTtl.
const CACHE_TTL_SECONDS = 60;

interface QueueSnapshotEnv {
  QUEUE_SNAPSHOTS_KV: KVNamespace;
}

/**
 * Reads the latest queue snapshot from KV. Returns null on missing key,
 * malformed JSON, or schema mismatch — never throws.
 */
export async function getQueueSnapshot(env: QueueSnapshotEnv): Promise<QueueSnapshot | null> {
  let raw: string | null;
  try {
    raw = await env.QUEUE_SNAPSHOTS_KV.get(QUEUE_SNAPSHOT_KEY, { cacheTtl: CACHE_TTL_SECONDS });
  } catch (err) {
    console.error(`[getQueueSnapshot] KV.get failed: ${(err as Error).message}`);
    return null;
  }
  if (raw === null) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`[getQueueSnapshot] malformed JSON in KV: ${(err as Error).message}`);
    return null;
  }

  const result = QueueSnapshotSchema.safeParse(parsed);
  if (!result.success) {
    console.error(`[getQueueSnapshot] schema mismatch: ${result.error.message}`);
    return null;
  }
  return result.data;
}
