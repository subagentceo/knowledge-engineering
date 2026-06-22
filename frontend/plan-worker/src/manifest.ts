/**
 * plan-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite https://www.agent-native.com/docs/template-plan
 * @cite cowork/coworkers/manifest.json
 */

export const QUEUE_DIR = "cowork/data/queues";

export const DOMAINS = [
  "product-management", "project-management", "engineering", "design", "data",
  "sales", "operations", "finance", "legal", "compliance", "human-resources",
  "agent-resources", "marketing",
] as const;
export type Domain = typeof DOMAINS[number];

export const PLAN_STATES = ["draft", "active", "paused", "completed", "archived"] as const;
export type PlanState = typeof PLAN_STATES[number];

export const ACTIONS = ["list_plans", "get_plan", "create_plan", "update_plan_status"] as const;

export const HSTS = "max-age=31536000; includeSubDomains";

export function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "plan.subagentknowledge.com");
  return out;
}

export function queuePath(domain: string): string {
  return `${QUEUE_DIR}/${domain}.jsonl`;
}
