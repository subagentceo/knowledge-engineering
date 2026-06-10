/**
 * Citations vending (B10) — CSL items → Claude citations document blocks.
 *
 * Maps csl_items rows (or corpus-built CslItem objects) into the Messages
 * API `document` content-block shape with `citations.enabled: true`, so a
 * research-team agent can drop vended citations straight into a request
 * and get span-level citations back. `context` carries the CSL provenance
 * (id, publisher, issued, URL) the model should echo when citing; `title`
 * is the CSL title; `data` is the citable text (abstract first, falling
 * back to title).
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite https://github.com/citation-style-language/schema
 */

import { z } from "zod";
import type { CslItem } from "./csl.js";

export const CitationsDocumentBlock = z.object({
  type: z.literal("document"),
  source: z.object({
    type: z.literal("text"),
    media_type: z.literal("text/plain"),
    data: z.string().min(1),
  }),
  title: z.string().min(1),
  context: z.string().min(1),
  citations: z.object({ enabled: z.literal(true) }),
});
export type CitationsDocumentBlock = z.infer<typeof CitationsDocumentBlock>;

export function cslItemToDocumentBlock(item: CslItem): CitationsDocumentBlock {
  const year = item.issued?.["date-parts"]?.[0]?.[0];
  const provenance = [
    `csl_id: ${item.id}`,
    item.publisher !== undefined ? `publisher: ${item.publisher}` : undefined,
    year !== undefined ? `issued: ${year}` : undefined,
    item.URL !== undefined ? `url: ${item.URL}` : undefined,
  ].filter((p) => p !== undefined);
  return CitationsDocumentBlock.parse({
    type: "document",
    source: {
      type: "text",
      media_type: "text/plain",
      data: item.abstract ?? item.title,
    },
    title: item.title,
    context: provenance.join("; "),
    citations: { enabled: true },
  });
}

/**
 * Citations must be enabled on all or none of the documents in a request
 * (refs: citations.md) — vending a batch enforces all-enabled by shape.
 */
export function vendCitations(items: CslItem[]): CitationsDocumentBlock[] {
  return items.map(cslItemToDocumentBlock);
}
