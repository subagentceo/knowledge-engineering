/**
 * Citation memories (B2) — managed-agents memory shape over CSL items.
 *
 * Maps csl_items rows into memory records {path, content} matching the
 * memory_stores API surface, so research-team agents can seed a memory
 * store (or read the dw.dim_memory mirror) with curated citations. The
 * dreams job (B3) rewrites content over time; dim_memory is SCD II so the
 * curation history stays auditable.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md
 */

import { z } from "zod";
import type { CslItem } from "./csl.js";

export const MemoryRecord = z.object({
  path: z.string().regex(/^\/citations\/[a-z0-9._-]+\.md$/),
  content: z.string().min(1),
  csl_id: z.string(),
  curation_source: z.enum(["ingest", "dreams"]),
});
export type MemoryRecord = z.infer<typeof MemoryRecord>;

export function memoryPathFor(cslId: string): string {
  return `/citations/${cslId.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase()}.md`;
}

/**
 * Deterministic ingest-time memory body: human-readable summary first
 * (what agents quote), canonical CSL-JSON block last (what agents cite).
 */
export function cslItemToMemory(item: CslItem): MemoryRecord {
  const year = item.issued?.["date-parts"]?.[0]?.[0];
  const lines = [
    `# ${item.title}`,
    "",
    [
      year !== undefined ? `(${year})` : undefined,
      item.publisher,
      item.URL,
    ].filter((p) => p !== undefined).join(" — "),
    "",
    ...(item.abstract !== undefined ? [item.abstract, ""] : []),
    "```csl-json",
    JSON.stringify(item, null, 2),
    "```",
  ];
  return MemoryRecord.parse({
    path: memoryPathFor(item.id),
    content: lines.join("\n"),
    csl_id: item.id,
    curation_source: "ingest",
  });
}

/** Extract the canonical CSL block back out of a memory body. */
export function memoryToCslJson(content: string): unknown {
  const m = content.match(/```csl-json\n([\s\S]*?)\n```/);
  if (m?.[1] === undefined) throw new Error("citation-memory: no csl-json block in memory content");
  return JSON.parse(m[1]);
}
