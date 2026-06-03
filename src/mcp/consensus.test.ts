/**
 * @cite seeds/citations/multi-agent.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */
import { test } from "node:test";
import assert from "node:assert";
import { majorityRead, ConsensusError } from "./consensus.js";
import type { D1ReplicaAdapter, DivergenceEvent } from "./consensus.js";

// Inline types for isolated in-memory adapter — no import from src/db/knowledge-graph.ts
interface KGEntityLocal {
  name: string;
  type: string;
  observations: string[];
}
interface KGRelationLocal {
  from: string;
  relation: string;
  to: string;
}
interface KnowledgeGraphLocal {
  entities: KGEntityLocal[];
  relations: KGRelationLocal[];
}

class InMemoryAdapter implements D1ReplicaAdapter {
  readonly replicaId: string;
  private graph: KnowledgeGraphLocal;
  readonly logged: DivergenceEvent[] = [];

  constructor(replicaId: string, graph: KnowledgeGraphLocal) {
    this.replicaId = replicaId;
    this.graph = graph;
  }

  async readGraph(): Promise<KnowledgeGraphLocal> {
    return this.graph;
  }

  async searchNodes(query: string): Promise<KGEntityLocal[]> {
    const q = query.toLowerCase();
    return this.graph.entities.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        e.observations.some((o) => o.toLowerCase().includes(q)),
    );
  }

  async openNodes(names: string[]): Promise<{ entities: KGEntityLocal[]; relations: KGRelationLocal[] }> {
    const nameSet = new Set(names);
    return {
      entities: this.graph.entities.filter((e) => nameSet.has(e.name)),
      relations: this.graph.relations.filter(
        (r) => nameSet.has(r.from) || nameSet.has(r.to),
      ),
    };
  }

  async logDivergence(event: DivergenceEvent): Promise<void> {
    this.logged.push(event);
  }
}

function makeGraph(tag: string): KnowledgeGraphLocal {
  return {
    entities: [{ name: `entity-${tag}`, type: "outcome", observations: [`obs-${tag}`] }],
    relations: [],
  };
}

test("majorityRead: 3 agreeing adapters → returns result", async () => {
  const g = makeGraph("same");
  const adapters = [
    new InMemoryAdapter("r1", g),
    new InMemoryAdapter("r2", g),
    new InMemoryAdapter("r3", g),
  ];
  const result = await majorityRead(adapters, 2, "readGraph", (a) => a.readGraph());
  assert.deepStrictEqual(result, g);
});

test("majorityRead: 2-of-3 quorum, 1 diverges → returns majority value", async () => {
  const gA = makeGraph("A");
  const gB = makeGraph("B");
  const adapters = [
    new InMemoryAdapter("r1", gA),
    new InMemoryAdapter("r2", gA),
    new InMemoryAdapter("r3", gB),
  ];
  const result = await majorityRead(adapters, 2, "readGraph", (a) => a.readGraph());
  assert.deepStrictEqual(result, gA);
});

test("majorityRead: no quorum throws ConsensusError", async () => {
  const adapters = [
    new InMemoryAdapter("r1", makeGraph("A")),
    new InMemoryAdapter("r2", makeGraph("B")),
    new InMemoryAdapter("r3", makeGraph("C")),
  ];
  await assert.rejects(
    () => majorityRead(adapters, 2, "readGraph", (a) => a.readGraph()),
    (err: unknown) => {
      assert.ok(err instanceof ConsensusError, "should be ConsensusError");
      return true;
    },
  );
});

test("majorityRead: not enough adapters for quorum", async () => {
  const adapters = [new InMemoryAdapter("r1", makeGraph("A"))];
  await assert.rejects(
    () => majorityRead(adapters, 2, "readGraph", (a) => a.readGraph()),
    (err: unknown) => {
      assert.ok(err instanceof ConsensusError, "should be ConsensusError");
      assert.ok((err as ConsensusError).message.includes("Insufficient adapters"));
      return true;
    },
  );
});

test("majorityRead: divergence events logged on all adapters when consensus fails", async () => {
  const adapters = [
    new InMemoryAdapter("r1", makeGraph("A")),
    new InMemoryAdapter("r2", makeGraph("B")),
    new InMemoryAdapter("r3", makeGraph("C")),
  ];
  try {
    await majorityRead(adapters, 2, "readGraph", (a) => a.readGraph());
    assert.fail("should have thrown");
  } catch (err) {
    assert.ok(err instanceof ConsensusError);
    for (const adapter of adapters) {
      assert.strictEqual(adapter.logged.length, 1, `adapter ${adapter.replicaId} should have 1 divergence`);
      assert.strictEqual(adapter.logged[0]!.operation, "readGraph");
    }
  }
});

test("ConsensusError carries divergences array", async () => {
  const adapters = [
    new InMemoryAdapter("r1", makeGraph("X")),
    new InMemoryAdapter("r2", makeGraph("Y")),
    new InMemoryAdapter("r3", makeGraph("Z")),
  ];
  try {
    await majorityRead(adapters, 2, "readGraph", (a) => a.readGraph());
    assert.fail("should have thrown");
  } catch (err) {
    assert.ok(err instanceof ConsensusError);
    assert.ok(Array.isArray(err.divergences));
    assert.ok(err.divergences.length > 0, "divergences should be non-empty");
    assert.strictEqual(err.name, "ConsensusError");
  }
});

test("stableKGKey / majorityRead: two replicas with same entities in different insertion order → agrees (no false divergence)", async () => {
  const graphA: KnowledgeGraphLocal = {
    entities: [
      { name: "alpha", type: "concept", observations: ["obs1"] },
      { name: "beta", type: "concept", observations: ["obs2"] },
    ],
    relations: [
      { from: "alpha", relation: "uses", to: "beta" },
      { from: "beta", relation: "extends", to: "alpha" },
    ],
  };
  const graphB: KnowledgeGraphLocal = {
    entities: [
      { name: "beta", type: "concept", observations: ["obs2"] },
      { name: "alpha", type: "concept", observations: ["obs1"] },
    ],
    relations: [
      { from: "beta", relation: "extends", to: "alpha" },
      { from: "alpha", relation: "uses", to: "beta" },
    ],
  };
  const adapters = [
    new InMemoryAdapter("r1", graphA),
    new InMemoryAdapter("r2", graphB),
    new InMemoryAdapter("r3", graphA),
  ];
  // With stableKGKey as default serializer, r1 and r2 should agree despite insertion-order difference
  const result = await majorityRead(adapters, 2, "readGraph", (a) => a.readGraph());
  assert.ok(result !== undefined, "should return a result without throwing ConsensusError");
  const names = (result as KnowledgeGraphLocal).entities.map((e) => e.name).sort();
  assert.deepStrictEqual(names, ["alpha", "beta"]);
});

test("majorityRead: throwing logDivergence adapter does not corrupt ConsensusError", async () => {
  class ThrowingLogAdapter extends InMemoryAdapter {
    override async logDivergence(_event: DivergenceEvent): Promise<void> {
      throw new Error("logDivergence exploded");
    }
  }
  const adapters = [
    new ThrowingLogAdapter("r1", makeGraph("A")),
    new ThrowingLogAdapter("r2", makeGraph("B")),
    new ThrowingLogAdapter("r3", makeGraph("C")),
  ];
  await assert.rejects(
    () => majorityRead(adapters, 2, "readGraph", (a) => a.readGraph()),
    (err: unknown) => {
      assert.ok(err instanceof ConsensusError, `expected ConsensusError, got ${String(err)}`);
      assert.ok(err.message.includes("No majority"), `unexpected message: ${err.message}`);
      return true;
    },
  );
});
