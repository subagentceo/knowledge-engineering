/**
 * Walks vendor/modelcontextprotocol/modelcontextprotocol.io/ and upserts KGNode entries
 * for each changed page. Harvests admonitions from changed pages and creates admonition
 * KGNodes with source_of edges to the parent document KGNode.
 * @cite src/mcp/lanes/knowledge-graph.ts
 * @cite src/db/knowledge-graph.ts
 * @cite scripts/lib/checksums.ts
 * @cite src/lib/redis-client.ts
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { hashBody } from "./lib/checksums.js";
import { getString, setString } from "../src/lib/redis-client.js";
import { createEntities, createRelations } from "../src/db/knowledge-graph.js";
import type { KGEntity, KGRelation } from "../src/db/knowledge-graph.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const VENDOR_ROOT = join(REPO_ROOT, "vendor/modelcontextprotocol/modelcontextprotocol.io");
const HASH_TTL_S = 604800; // 7 days

interface AdmonitionHarvest {
  type: string;
  lineStart: number;
}

interface PageResult {
  file: string;
  changed: boolean;
  admonitions_harvested: number;
  nodes_upserted: number;
}

function walkMd(dir: string, results: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkMd(full, results);
    } else if (st.isFile() && extname(entry) === ".md") {
      results.push(full);
    }
  }
  return results;
}

function extractTitle(content: string, filePath: string): string {
  const m = content.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return basename(filePath, ".md");
}

function excerptContent(content: string): string {
  // Strip markdown syntax lightly: headings, links, bold, italic, code fences, HTML tags
  const stripped = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
  return stripped.slice(0, 500);
}

// WHY: harvest-admonitions.ts is a sister script that may not exist yet — forward-compatible import
async function tryHarvestAdmonitions(filePath: string): Promise<AdmonitionHarvest[]> {
  try {
    const mod = await import("./harvest-admonitions.js").catch(() => null);
    if (!mod) return [];
    const fn = mod.harvestAdmonitions ?? mod.default?.harvestAdmonitions;
    if (typeof fn !== "function") return [];
    return (await fn(filePath)) as AdmonitionHarvest[];
  } catch {
    return [];
  }
}

async function processPage(absPath: string): Promise<PageResult> {
  const relPath = relative(REPO_ROOT, absPath);
  const content = readFileSync(absPath, "utf-8");
  const sha256 = hashBody(content);

  const cached = await getString("kg:page-hash:" + relPath);
  if (cached === sha256) {
    return { file: relPath, changed: false, admonitions_harvested: 0, nodes_upserted: 0 };
  }

  const title = extractTitle(content, absPath);
  const excerpt = excerptContent(content);

  // Document entity: use "artifact" type as the closest KGEntityType for a vendor page
  const docEntity: KGEntity = {
    name: title,
    type: "artifact",
    observations: [
      "namespace: modelcontextprotocol.io",
      "path: " + relPath,
      "excerpt: " + excerpt,
    ],
  };
  createEntities([docEntity]);
  let nodesUpserted = 1;

  const admonitions = await tryHarvestAdmonitions(absPath);
  const relations: KGRelation[] = [];

  for (const admonition of admonitions) {
    const admName = `${title}:admonition:${admonition.lineStart}`;
    const admEntity: KGEntity = {
      name: admName,
      type: "artifact",
      observations: [
        "type: " + admonition.type,
        "source: " + relPath,
        "line: " + admonition.lineStart,
      ],
    };
    createEntities([admEntity]);
    nodesUpserted++;
    relations.push({ from: title, relation: "source_of", to: admName });
  }

  if (relations.length > 0) {
    createRelations(relations);
  }

  await setString("kg:page-hash:" + relPath, sha256, { ex: HASH_TTL_S });

  return {
    file: relPath,
    changed: true,
    admonitions_harvested: admonitions.length,
    nodes_upserted: nodesUpserted,
  };
}

async function main(): Promise<void> {
  const files = walkMd(VENDOR_ROOT);
  let changed = 0;
  let entitiesCreated = 0;
  let admonitionsHarvested = 0;

  for (const absPath of files) {
    const result = await processPage(absPath);
    process.stdout.write(JSON.stringify(result) + "\n");
    if (result.changed) {
      changed++;
      entitiesCreated += result.nodes_upserted;
      admonitionsHarvested += result.admonitions_harvested;
    }
  }

  const total = files.length;
  process.stderr.write(
    `[ingest] ${changed} changed / ${total} total pages. ${entitiesCreated} KGNodes upserted, ${admonitionsHarvested} admonitions harvested.\n`,
  );
}

main().catch((err) => {
  process.stderr.write("[ingest] fatal: " + String(err) + "\n");
  process.exit(1);
});
