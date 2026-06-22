/**
 * agent-inbox-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * ROLES is the canonical list of 12 coworker email addresses live on Cloudflare Email Routing
 * for subagentknowledge.com, keyed by their cowork/coworkers/manifest.json coworker IDs.
 *
 * @cite frontend/agent-inbox-worker/src/worker.ts
 * @cite cowork/coworkers/manifest.json
 */

export const DOMAIN = "subagentknowledge.com";

/**
 * Canonical coworker role IDs — must match cowork/coworkers/manifest.json `.id` fields
 * AND the live Cloudflare Email Routing addresses (<role>@subagentknowledge.com).
 */
export const ROLES = [
  "product-management-coworker",
  "project-management-coworker",
  "design-coworker",
  "engineering-coworker",
  "data-coworker",
  "sales-coworker",
  "operations-coworker",
  "finance-coworker",
  "legal-coworker",
  "marketing-coworker",
  "agent-resources-coworker",
  "human-resources-coworker",
] as const;

export type Role = typeof ROLES[number];

export function roleEmail(role: Role): string {
  return `${role}@${DOMAIN}`;
}

/** Extract the local part (before @), stripping any + subaddress. */
export function localPart(addr: string): string {
  return String(addr).toLowerCase().split("@")[0]?.split("+")[0] ?? "";
}

/** True if addr is a known coworker address on this domain. */
export function isKnownRole(addr: string): addr is Role {
  return (ROLES as readonly string[]).includes(localPart(addr));
}
