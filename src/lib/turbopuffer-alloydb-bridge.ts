/**
 * Turbopuffer + AlloyDB bridge: embed text via Voyage, upsert
 * vectors to a Turbopuffer namespace, mirror id+content+metadata
 * to AlloyDB Omni for relational lookups.
 *
 * Turbopuffer stores vectors + flat metadata; relational queries
 * (joins across documents, runs, authors, etc.) need a Postgres.
 * AlloyDB Omni 17.7 from PR #174 is the canonical Postgres for this
 * chassis.
 *
 * Both stores use the same `id` as the join key. Mirror is
 * idempotent via ON CONFLICT (id) DO UPDATE.
 *
 * OAuth-only posture: refuses to construct if ANTHROPIC_API_KEY is
 * present in env. The bridge never calls the Anthropic API itself —
 * embeddings go to Voyage, vectors to Turbopuffer, rows to AlloyDB —
 * so the key has no legitimate reason to be set.
 *
 * @cite vendor/turbopuffer/turbopuffer.com/docs/namespaces.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/metadata.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 */

import type { VoyageClient, VoyageModel } from "./voyage-client.js";

export interface TurbopufferUpsertVector {
  id: string;
  vector: number[];
  attributes?: Record<string, unknown>;
}

export interface TurbopufferNamespace {
  upsert(call: { vectors: TurbopufferUpsertVector[] }): Promise<void>;
}

export interface AlloyDbPool {
  query(text: string, values: unknown[]): Promise<{ rows: unknown[] }>;
}

export interface BridgeOptions {
  voyage: VoyageClient;
  turbopuffer: TurbopufferNamespace;
  alloydb: AlloyDbPool;
  namespace: string;
  model?: VoyageModel;
}

export interface UpsertInput {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface Bridge {
  upsert(items: UpsertInput[]): Promise<void>;
}

const ALLOYDB_TABLE = "embeddings_mirror";

const ALLOYDB_INSERT = `
  INSERT INTO ${ALLOYDB_TABLE} (id, namespace, content, metadata, created_at)
  VALUES ($1, $2, $3, $4, NOW())
  ON CONFLICT (id) DO UPDATE
    SET content = EXCLUDED.content,
        metadata = EXCLUDED.metadata,
        namespace = EXCLUDED.namespace,
        updated_at = NOW()
`;

export function createBridge(opts: BridgeOptions): Bridge {
  if (process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "turbopuffer-alloydb-bridge: ANTHROPIC_API_KEY must not be set " +
        "(OAuth-only posture; this bridge uses Voyage + Turbopuffer + AlloyDB only)",
    );
  }

  return {
    async upsert(items) {
      if (items.length === 0) return;

      const embedOpts = opts.model
        ? { model: opts.model, inputType: "document" as const }
        : { inputType: "document" as const };
      const embedResult = await opts.voyage.embed(
        items.map((i) => i.content),
        embedOpts,
      );

      const vectors: TurbopufferUpsertVector[] = items.map((item, i) => ({
        id: item.id,
        vector: embedResult.embeddings[i]!,
        attributes: item.metadata ?? {},
      }));

      await opts.turbopuffer.upsert({ vectors });

      for (const item of items) {
        await opts.alloydb.query(ALLOYDB_INSERT, [
          item.id,
          opts.namespace,
          item.content,
          JSON.stringify(item.metadata ?? {}),
        ]);
      }
    },
  };
}
