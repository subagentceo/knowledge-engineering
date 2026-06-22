/**
 * calendar-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite cowork/coworkers/operational-plan/operating-cadence.md (the OP1 calendar)
 */

export const QUEUE_DIR = "cowork/data/queues";

export const DOMAINS = [
  "product-management", "project-management", "engineering", "design", "data",
  "sales", "operations", "finance", "legal", "compliance", "human-resources", "agent-resources",
] as const;
export type Domain = typeof DOMAINS[number];

export const ACTIONS = ["list_events", "check_availability", "create_event"] as const;

export const HSTS = "max-age=31536000; includeSubDomains";

export function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "calendar.subagentknowledge.com");
  return out;
}

export function queuePath(domain: string): string {
  return `${QUEUE_DIR}/${domain}.jsonl`;
}
