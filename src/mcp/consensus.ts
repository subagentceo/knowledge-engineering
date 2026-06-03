/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */
import type { KnowledgeGraph, KGEntity, KGRelation } from "../db/knowledge-graph.js";

export interface DivergenceEvent {
  replicaId: string;
  operation: string;
  ts: string;
}

export interface D1ReplicaAdapter {
  readonly replicaId: string;
  readGraph(): Promise<KnowledgeGraph>;
  searchNodes(query: string): Promise<KGEntity[]>;
  openNodes(names: string[]): Promise<{ entities: KGEntity[]; relations: KGRelation[] }>;
  logDivergence(event: DivergenceEvent): Promise<void>;
}

export class ConsensusError extends Error {
  constructor(
    message: string,
    public readonly divergences: DivergenceEvent[],
  ) {
    super(message);
    this.name = "ConsensusError";
  }
}

function stableKGKey(v: unknown): string {
  if (
    v !== null &&
    typeof v === "object" &&
    Array.isArray((v as KnowledgeGraph).entities) &&
    Array.isArray((v as KnowledgeGraph).relations)
  ) {
    const g = v as KnowledgeGraph;
    return JSON.stringify({
      entities: [...g.entities].sort((a, b) => a.name.localeCompare(b.name)),
      relations: [...g.relations].sort((a, b) =>
        `${a.from}|${a.relation}|${a.to}`.localeCompare(`${b.from}|${b.relation}|${b.to}`),
      ),
    });
  }
  return JSON.stringify(v);
}

// Fan out reads to all adapters; return the first value agreed by >= quorum replicas.
// Logs divergences to all adapters and throws ConsensusError when no quorum.
export async function majorityRead<T>(
  adapters: D1ReplicaAdapter[],
  quorum: number,
  operation: string,
  fn: (adapter: D1ReplicaAdapter) => Promise<T>,
  serialize: (v: T) => string = stableKGKey as (v: T) => string,
): Promise<T> {
  if (adapters.length < quorum) {
    throw new ConsensusError(
      `Insufficient adapters: have ${adapters.length}, need quorum ${quorum}`,
      [],
    );
  }

  const settled = await Promise.allSettled(adapters.map(fn));
  const successes: Array<{ replicaId: string; value: T; key: string }> = [];

  settled.forEach((r, i) => {
    if (r.status === "fulfilled") {
      successes.push({
        replicaId: adapters[i]!.replicaId,
        value: r.value,
        key: serialize(r.value),
      });
    }
  });

  if (successes.length < quorum) {
    throw new ConsensusError(
      `Quorum unreachable: ${successes.length}/${adapters.length} responded, need ${quorum}`,
      [],
    );
  }

  const tally = new Map<string, { value: T; count: number }>();
  for (const { value, key } of successes) {
    const entry = tally.get(key);
    if (entry) {
      entry.count += 1;
    } else {
      tally.set(key, { value, count: 1 });
    }
  }

  for (const [, { value, count }] of tally) {
    if (count >= quorum) return value;
  }

  const ts = new Date().toISOString();
  const divergences: DivergenceEvent[] = successes.map(({ replicaId }) => ({
    replicaId,
    operation,
    ts,
  }));
  await Promise.allSettled(
    adapters.map((a) =>
      Promise.resolve()
        .then(() => a.logDivergence({ replicaId: a.replicaId, operation, ts }))
        .catch(() => undefined),
    ),
  );
  throw new ConsensusError(
    `No majority for ${operation}: ${tally.size} distinct values from ${successes.length} replicas`,
    divergences,
  );
}
