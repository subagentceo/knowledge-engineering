/**
 * cowork-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite cowork/coworkers/manifest.json (12 coworker definitions)
 */

export interface CoworkerEntry {
  id: string;
  domain: string;
  model: string;
  protocols: string[];
}

export const COWORKERS: CoworkerEntry[] = [
  { id: "product-management-coworker", domain: "product-management", model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp","mcp"] },
  { id: "design-coworker",            domain: "design",             model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "engineering-coworker",       domain: "engineering",        model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp","mcp"] },
  { id: "data-coworker",              domain: "data",               model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
  { id: "sales-coworker",             domain: "sales",              model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
  { id: "operations-coworker",        domain: "operations",         model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp","acp"] },
  { id: "finance-coworker",           domain: "finance",            model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
  { id: "legal-coworker",            domain: "legal",              model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "marketing-coworker",        domain: "marketing",          model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "agent-resources-coworker",  domain: "agent-resources",    model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "human-resources-coworker",  domain: "human-resources",    model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "project-management-coworker", domain: "project-management", model: "claude-opus-4-6",       protocols: ["a2a","e2m-mcp"] },
];

export const DOMAINS = COWORKERS.map(c => c.domain);

export const KNOWN_PROTOCOLS = ["a2a", "e2m-mcp", "mcp", "acp"] as const;
export type Protocol = typeof KNOWN_PROTOCOLS[number];

export function findCoworker(id: string): CoworkerEntry | undefined {
  return COWORKERS.find(c => c.id === id);
}

export const HSTS = "max-age=31536000; includeSubDomains";

export function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "cowork.subagentknowledge.com");
  return out;
}
