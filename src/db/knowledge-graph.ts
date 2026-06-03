/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite vendor/anthropics/code.claude.com/docs/en/sub-agents.md
 *
 * D1-backed (production) / JSON-file (local) knowledge graph.
 * Mirrors the MCP memory server tool surface so agents can read/write a
 * shared entity-relation-observation store without any external process.
 *
 * Storage backend: JSON file at KG_STORE_PATH env var, defaulting to
 * $TMPDIR/ke-knowledge-graph.json.  No better-sqlite3 dependency required.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

export type KGEntityType =
  | "coworker"
  | "connector"
  | "outcome"
  | "artifact"
  | "task"
  | "session";

export interface KGEntity {
  name: string;
  type: KGEntityType;
  observations: string[];
}

export interface KGRelation {
  from: string;
  relation: string; // active-voice verb
  to: string;
}

export interface KnowledgeGraph {
  entities: KGEntity[];
  relations: KGRelation[];
}

// ─── storage path ─────────────────────────────────────────────────────────────

function storePath(): string {
  return (
    process.env["KG_STORE_PATH"] ??
    path.join(os.tmpdir(), "ke-knowledge-graph.json")
  );
}

// ─── low-level persistence ────────────────────────────────────────────────────

function load(): KnowledgeGraph {
  const p = storePath();
  if (!fs.existsSync(p)) return { entities: [], relations: [] };
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8")) as KnowledgeGraph;
  } catch {
    return { entities: [], relations: [] };
  }
}

function save(graph: KnowledgeGraph): void {
  const p = storePath();
  fs.writeFileSync(p, JSON.stringify(graph, null, 2), "utf-8");
}

// ─── public API ───────────────────────────────────────────────────────────────

export function createEntities(entities: KGEntity[]): void {
  const graph = load();
  const byName = new Map(graph.entities.map((e) => [e.name, e]));
  for (const entity of entities) {
    if (!byName.has(entity.name)) {
      byName.set(entity.name, { ...entity, observations: [...entity.observations] });
    }
  }
  graph.entities = [...byName.values()];
  save(graph);
}

export function createRelations(relations: KGRelation[]): void {
  const graph = load();
  const key = (r: KGRelation) => `${r.from}|${r.relation}|${r.to}`;
  const existing = new Set(graph.relations.map(key));
  for (const rel of relations) {
    if (!existing.has(key(rel))) {
      graph.relations.push(rel);
      existing.add(key(rel));
    }
  }
  save(graph);
}

export function addObservations(entityName: string, observations: string[]): void {
  const graph = load();
  const entity = graph.entities.find((e) => e.name === entityName);
  if (!entity) throw new Error(`entity not found: ${entityName}`);
  entity.observations.push(...observations);
  save(graph);
}

export function deleteEntities(names: string[]): void {
  const nameSet = new Set(names);
  const graph = load();
  graph.entities = graph.entities.filter((e) => !nameSet.has(e.name));
  graph.relations = graph.relations.filter(
    (r) => !nameSet.has(r.from) && !nameSet.has(r.to)
  );
  save(graph);
}

export function deleteRelations(relations: KGRelation[]): void {
  const graph = load();
  const key = (r: KGRelation) => `${r.from}|${r.relation}|${r.to}`;
  const toDelete = new Set(relations.map(key));
  graph.relations = graph.relations.filter((r) => !toDelete.has(key(r)));
  save(graph);
}

export function readGraph(): KnowledgeGraph {
  return load();
}

export function searchNodes(query: string): KGEntity[] {
  const graph = load();
  const q = query.toLowerCase();
  return graph.entities.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q) ||
      e.observations.some((o) => o.toLowerCase().includes(q))
  );
}

export function openNodes(names: string[]): { entities: KGEntity[]; relations: KGRelation[] } {
  const nameSet = new Set(names);
  const graph = load();
  const entities = graph.entities.filter((e) => nameSet.has(e.name));
  const relations = graph.relations.filter(
    (r) => nameSet.has(r.from) || nameSet.has(r.to)
  );
  return { entities, relations };
}
