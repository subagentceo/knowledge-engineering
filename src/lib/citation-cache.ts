/**
 * L1/L2/L3 read-through for citation items (B24) — dogfoods the semantic
 * cache so repeat citations_get calls cost near-zero tokens and latency.
 *
 *   L1  in-process Map (this MCP server process)
 *   L2  redis (volatile tier, same instance as src/cache/lru-bm25.ts)
 *   L3  postgres dw.semantic_cache via DurableStore (key csl:<id>)
 *   miss → corpus lookup, then populate L1 (and L2 best-effort)
 *
 * Tier hit counters are exported so citations_get can return them in
 * result meta — the tokens_to_citation rubric evidence.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite https://www.npmjs.com/package/redis
 */

import { CslItem } from "./csl.js";
import { DurableStore, type PgLike } from "../cache/durable-store.js";

export interface RedisLike {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: "EX", ttlSec: number): Promise<unknown>;
}

export const cacheCounters = { l1: 0, l2: 0, l3: 0, miss: 0 };

const L1 = new Map<string, CslItem>();
const L2_TTL_SEC = 7 * 24 * 60 * 60; // matches the volatile tier's 7-day TTL

export interface CitationCacheTiers {
  redis?: RedisLike | null;
  pg?: PgLike | null;
}

/** Read-through; `lookup` is the authoritative miss path (corpus find). */
export async function getCitationCached(
  id: string,
  tiers: CitationCacheTiers,
  lookup: (id: string) => CslItem | undefined,
): Promise<{ item: CslItem | undefined; tier: "l1" | "l2" | "l3" | "miss" }> {
  const key = `csl:${id}`;

  const l1 = L1.get(id);
  if (l1 !== undefined) {
    cacheCounters.l1 += 1;
    return { item: l1, tier: "l1" };
  }

  if (tiers.redis != null) {
    const raw = await tiers.redis.get(key).catch(() => null);
    if (raw !== null) {
      const item = CslItem.parse(JSON.parse(raw));
      L1.set(id, item);
      cacheCounters.l2 += 1;
      return { item, tier: "l2" };
    }
  }

  if (tiers.pg != null) {
    const result = await new DurableStore(tiers.pg).get(key, CslItem).catch(() => undefined);
    if (result !== undefined) {
      const item = result.value;
      L1.set(id, item);
      if (tiers.redis != null) {
        await tiers.redis.set(key, JSON.stringify(item), "EX", L2_TTL_SEC).catch(() => undefined);
      }
      cacheCounters.l3 += 1;
      return { item, tier: "l3" };
    }
  }

  cacheCounters.miss += 1;
  const item = lookup(id);
  if (item !== undefined) {
    L1.set(id, item);
    if (tiers.redis != null) {
      await tiers.redis.set(key, JSON.stringify(item), "EX", L2_TTL_SEC).catch(() => undefined);
    }
  }
  return { item, tier: "miss" };
}

export function clearL1ForTests(): void {
  L1.clear();
}
