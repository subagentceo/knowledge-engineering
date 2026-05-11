// scripts/lib/html-index.ts
//
// Phase 13.B (O1). Discovery primitive for vendors whose index page is
// HTML rather than llms.txt. Given a fetched HTML body and a regex with
// one capture group naming a path, returns absolute URLs (deduplicated,
// stable insertion order).
//
// Citations:
//   @cite rubrics/phase-13.md                                    (O1 — html-index discovery)
//   @cite src/mcp/lanes/anthropic-engineering.ts                 (the regex pattern this generalizes)
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/slash-commands.md  (/schedule daily routines)
//
// Pure function: no I/O. The crawler in scripts/crawl-vendors.ts
// owns the fetch + the merge into the URL pool.

/**
 * Extract absolute URLs from `html` matching the supplied capture-group
 * regex. The regex MUST contain exactly one capture group whose match
 * is a URL path (with or without leading `/`) or an absolute URL.
 *
 * Relative paths are resolved against `baseUrl`. Absolute URLs in the
 * capture group are returned as-is.
 *
 * Deduplication preserves first-encounter order.
 */
export function extractIndexUrls(html: string, linkRegex: RegExp, baseUrl: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const re = linkRegex.global ? linkRegex : new RegExp(linkRegex.source, `${linkRegex.flags}g`);
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const captured = match[1];
    if (!captured) continue;
    let abs: string;
    try {
      abs = new URL(captured, baseUrl).toString();
    } catch {
      continue;
    }
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  return out;
}
