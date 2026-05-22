// scripts/lib/sitemap-classify.ts
//
// Three-way URL classifier used by scripts/audit-sitemap-coverage.ts.
// Extracted from the audit script so the rule can be unit-tested without
// loading the side-effecting main() at the bottom of that file.
//
// Citations:
//   @cite docs/audits/2026-05-22-sitemap-audit-OBLOGS1.md

import { inAllowlist, type AllowlistConfig } from "./allowlist.js";

/**
 * Three-way classification:
 *   - "denied"    — explicit deny_prefixes or deny_urls match
 *   - "allowed"   — inAllowlist returns true
 *   - "uncovered" — neither denied nor allowed; lives in the surface but
 *                   no rule matched. The OBLOGS1 audit treats this as
 *                   the actionable category — either expand allow rules
 *                   or document the intentional skip.
 *
 * Distinct from inAllowlist (boolean) because the audit cares about
 * *why* a URL was rejected: explicit deny vs missing rule.
 */
export function classify(
  url: string,
  cfg: AllowlistConfig,
): "allowed" | "denied" | "uncovered" {
  if (cfg.deny_prefixes?.some((p) => url.startsWith(p))) return "denied";
  if (cfg.deny_urls?.some((u) => url === u)) return "denied";
  return inAllowlist(url, cfg) ? "allowed" : "uncovered";
}
