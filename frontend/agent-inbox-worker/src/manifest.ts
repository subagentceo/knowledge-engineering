/**
 * agent-inbox-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite frontend/agent-inbox-worker/src/worker.ts
 */

export const DOMAIN = "subagentknowledge.com";

export const FUNCTIONS = ["product", "project", "finance", "legal"] as const;
export type AgentFunction = typeof FUNCTIONS[number];

export const TIERS = ["manager", "coworker", "subagent"] as const;
export type AgentTier = typeof TIERS[number];

export type Role = `${AgentFunction}-${AgentTier}`;

export const ROLES: Role[] = FUNCTIONS.flatMap((f) =>
  TIERS.map((t) => `${f}-${t}` as Role),
);

export function roleEmail(role: Role): string {
  return `${role}@${DOMAIN}`;
}

export function localPart(addr: string): string {
  return String(addr).toLowerCase().split("@")[0]?.split("+")[0] ?? "";
}
