/**
 * memory-migrate.ts — migrate flat memory .md files into the knowledge graph.
 *
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/db/knowledge-graph.ts
 *
 * Reads every .md file in the flat memory directory
 *   ~/.claude/projects/-home-alexzh-subagentmcp-subagentceo-knowledge-engineering/memory/
 * and upserts a KGEntity into the JSON knowledge-graph store.
 *
 * Front-matter fields parsed:
 *   name:        → entity.name  (falls back to filename stem)
 *   metadata.type: → entity.type (falls back to "artifact")
 *
 * Run with:  npx tsx scripts/memory-migrate.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

import {
  createEntities,
  type KGEntity,
  type KGEntityType,
} from "../src/db/knowledge-graph.js";

const MEMORY_DIR =
  process.env["MEMORY_DIR"] ??
  path.join(
    os.homedir(),
    ".claude",
    "projects",
    "-home-alexzh-subagentmcp-subagentceo-knowledge-engineering",
    "memory"
  );

const VALID_TYPES = new Set<KGEntityType>([
  "coworker",
  "connector",
  "outcome",
  "artifact",
  "task",
  "session",
]);

function parseEntityType(raw: string | undefined): KGEntityType {
  if (raw && VALID_TYPES.has(raw as KGEntityType)) return raw as KGEntityType;
  return "artifact";
}

interface FrontMatter {
  name?: string;
  description?: string;
  metadata?: { type?: string };
}

function parseFrontMatter(content: string): { fm: FrontMatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: content };

  const rawYaml = match[1] ?? "";
  const body = (match[2] ?? "").trim();

  const fm: FrontMatter = {};
  for (const line of rawYaml.split("\n")) {
    const nameMatch = line.match(/^name:\s*(.+)$/);
    if (nameMatch) { fm.name = nameMatch[1]!.trim().replace(/^["']|["']$/g, ""); continue; }

    const descMatch = line.match(/^description:\s*(.+)$/);
    if (descMatch) { fm.description = descMatch[1]!.trim().replace(/^["']|["']$/g, ""); continue; }

    const typeMatch = line.match(/^\s+type:\s*(.+)$/);
    if (typeMatch) {
      fm.metadata = { ...fm.metadata, type: typeMatch[1]!.trim() };
    }
  }
  return { fm, body };
}

function migrateFile(filePath: string): KGEntity | null {
  if (!filePath.endsWith(".md")) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  const stem = path.basename(filePath, ".md");

  const { fm, body } = parseFrontMatter(content);

  const name = fm.name ?? stem;
  const type = parseEntityType(fm.metadata?.type);

  const observations: string[] = [];
  if (fm.description) observations.push(fm.description);
  if (body) observations.push(body.slice(0, 500)); // cap to 500 chars

  return { name, type, observations };
}

function main(): void {
  if (!fs.existsSync(MEMORY_DIR)) {
    console.error(`memory directory not found: ${MEMORY_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(MEMORY_DIR).filter((f) => f.endsWith(".md"));
  const entities: KGEntity[] = [];

  for (const file of files) {
    const full = path.join(MEMORY_DIR, file);
    const entity = migrateFile(full);
    if (entity) {
      entities.push(entity);
      console.log(`  -> ${entity.name} [${entity.type}]`);
    }
  }

  if (entities.length === 0) {
    console.log("no .md files found — nothing to migrate");
    return;
  }

  createEntities(entities);
  console.log(`\nmigrated ${entities.length} entities to ${process.env["KG_STORE_PATH"] ?? "default store"}`);
}

main();
