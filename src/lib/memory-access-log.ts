/**
 * Memory access logging (B13) — closes the dreams loop.
 *
 * Research-agent reads through the citations_* MCP lane append rows to
 * dw.fact_memory_access (grain: memory × access) so the dreams job has
 * real usage signal to curate against. Postgres is optional on the MCP
 * path: when no DATABASE_URL/PG socket is reachable the logger is a
 * no-op — vending citations never blocks on the warehouse.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
 * @cite data/models/alloydb/fact_memory_access.yaml
 * @cite data/models/alloydb/events_memory_access.yaml (KAN-13 raw stream)
 */

import type { PgLike } from "../cache/durable-store.js";

export class AccessLogger {
  constructor(
    private readonly pg: PgLike,
    private readonly agentId: string,
  ) {}

  /**
   * Append one access row per csl id that has a current memory, plus a
   * raw event per requested id (events_ pattern — unmatched reads are
   * the demand signal for memories that do not exist yet).
   */
  async record(cslIds: string[]): Promise<number> {
    if (cslIds.length === 0) return 0;
    const now = new Date();
    const dateKey = Number(
      `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`,
    );
    const { rows } = await this.pg.query(
      `INSERT INTO dw.fact_memory_access (memory_sk, agent_id, date_key, access_count)
       SELECT surrogate_key, $1, $2, 1 FROM dw.dim_memory
       WHERE is_current AND csl_id = ANY($3)
       RETURNING memory_sk`,
      [this.agentId, dateKey, cslIds],
    );
    await this.pg.query(
      `INSERT INTO dw.events_memory_access (csl_id, agent_id, matched)
       SELECT id, $1, EXISTS (
         SELECT 1 FROM dw.dim_memory d WHERE d.is_current AND d.csl_id = id)
       FROM unnest($2::text[]) AS id`,
      [this.agentId, cslIds],
    );
    return rows.length;
  }
}

let cached: AccessLogger | null | undefined;

/**
 * Lane-side singleton: AccessLogger when postgres env is configured,
 * null otherwise. Fire-and-forget — callers must not await failures.
 */
export async function maybeAccessLogger(): Promise<AccessLogger | null> {
  if (cached !== undefined) return cached;
  if (process.env.DATABASE_URL === undefined && process.env.PGHOST === undefined) {
    cached = null;
    return cached;
  }
  const { default: pg } = await import("pg");
  const pool = new pg.Pool(
    process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
  );
  cached = new AccessLogger(pool, process.env.KE_AGENT_ID ?? "citations-lane");
  return cached;
}
