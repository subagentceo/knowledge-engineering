// scripts/lib/allowlist.ts
//
// URL allowlist gate for the crawler. Extracted from crawl-vendors.ts so
// the rule can be unit-tested without loading the side-effecting crawler
// module.
//
// Citations:
//   @cite rubrics/phase-0.md  (frontmatter + numbered-criteria precedent)
//   @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md

/**
 * Structural subset of CrawlConfig — only the fields inAllowlist needs.
 * Kept local so this module has no dependency on crawl-vendors.ts.
 */
export interface AllowlistConfig {
  allow_prefixes: string[];
  deny_prefixes?: string[];
  allow_urls?: string[];
  deny_urls?: string[];
}

/**
 * Decide whether a URL is in this vendor's crawl allowlist.
 *
 * Evaluation order:
 *   1. deny_prefixes match → reject  (denies always win)
 *   2. deny_urls match → reject
 *   3. allow_urls exact match → accept  (bypass prefix gate)
 *   4. allow_prefixes match → accept
 *   5. otherwise → reject
 *
 * The allow_urls bypass exists for bare-index URLs (e.g.
 * `https://claude.com/pricing`) where widening the prefix to drop the
 * trailing slash would over-match unrelated paths (e.g. `/pricing-foo`).
 */
export function inAllowlist(url: string, cfg: AllowlistConfig): boolean {
  if (cfg.deny_prefixes?.some((p) => url.startsWith(p))) return false;
  if (cfg.deny_urls?.some((u) => url === u)) return false;
  if (cfg.allow_urls?.some((u) => url === u)) return true;
  if (!cfg.allow_prefixes.some((p) => url.startsWith(p))) return false;
  return true;
}
