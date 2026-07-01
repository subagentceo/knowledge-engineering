/**
 * coworkers-worker/src/manifest.ts — pure data + helpers, no Worker runtime deps.
 *
 * @cite cowork/coworkers/manifest.json (12 coworker definitions)
 */

export interface Coworker {
  id: string;
  display_name: string;
  domain: string;
  trigger_phrase: string;
  protocols: string[];
  peers: string[];
  description: string;
  model: string;
}

export const COWORKERS: Coworker[] = [
  {
    id: "product-management-coworker",
    display_name: "Product Management",
    domain: "product-management",
    trigger_phrase: "/product-management-coworker",
    protocols: ["a2a", "e2m-mcp", "mcp"],
    peers: ["design-coworker", "engineering-coworker", "data-coworker", "sales-coworker", "operations-coworker", "finance-coworker"],
    description: "Lead PM. Routes work, manages priority-rerank cadence, orchestrates peer coworkers via e2m-mcp mailbox.",
    model: "claude-sonnet-5",
  },
  {
    id: "design-coworker",
    display_name: "Design",
    domain: "design",
    trigger_phrase: "/design-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "engineering-coworker"],
    description: "Design token + HTML artifact coworker. Owns cowork/artifacts/ and the 8-token design system.",
    model: "claude-sonnet-5",
  },
  {
    id: "engineering-coworker",
    display_name: "Engineering",
    domain: "engineering",
    trigger_phrase: "/engineering-coworker",
    protocols: ["a2a", "e2m-mcp", "mcp"],
    peers: ["product-management-coworker", "data-coworker"],
    description: "TypeScript + Rust coworker. Owns cowork/mcp/, cowork/templates/, src/. OAuth-only, no API keys.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "data-coworker",
    display_name: "Data",
    domain: "data",
    trigger_phrase: "/data-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "engineering-coworker"],
    description: "AlloyDB / Kimball DW coworker. Owns dw.* schema, dim_agent_templates, fact tables.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "sales-coworker",
    display_name: "Sales",
    domain: "sales",
    trigger_phrase: "/sales-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "finance-coworker"],
    description: "Outreach + mail coworker. Queue-first drafts only. Finance gate before spend.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "operations-coworker",
    display_name: "Operations",
    domain: "operations",
    trigger_phrase: "/operations-coworker",
    protocols: ["a2a", "e2m-mcp", "acp"],
    peers: ["product-management-coworker", "finance-coworker", "engineering-coworker"],
    description: "Infrastructure + process coworker. Manages CF Workers, scheduled tasks, deploy pipelines, subdomain provisioning.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "finance-coworker",
    display_name: "Finance",
    domain: "finance",
    trigger_phrase: "/finance-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "sales-coworker", "operations-coworker"],
    description: "Cost tracking + vendor spend coworker. Owns finance.jsonl, cost approval gates.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "legal-coworker",
    display_name: "Legal",
    domain: "legal",
    trigger_phrase: "/legal-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "sales-coworker", "engineering-coworker"],
    description: "Legal review, compliance, NDA triage, contract review. Queues all correspondence — never sends without operator approval.",
    model: "claude-sonnet-5",
  },
  {
    id: "marketing-coworker",
    display_name: "Marketing",
    domain: "marketing",
    trigger_phrase: "/marketing-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "sales-coworker", "legal-coworker"],
    description: "Brand, content, SEO, campaigns, competitive intelligence. Queues all content — never publishes without operator approval.",
    model: "claude-sonnet-5",
  },
  {
    id: "agent-resources-coworker",
    display_name: "Agent Resources",
    domain: "agent-resources",
    trigger_phrase: "/agent-resources-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "engineering-coworker", "human-resources-coworker"],
    description: "Agent lifecycle: onboard new coworkers, upgrade skills, track performance (ke_fit_score), manage cost, retire agents.",
    model: "claude-sonnet-5",
  },
  {
    id: "human-resources-coworker",
    display_name: "Human Resources",
    domain: "human-resources",
    trigger_phrase: "/human-resources-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "legal-coworker", "finance-coworker", "agent-resources-coworker"],
    description: "People ops for humans: recruiting, onboarding, performance, comp, org planning. All correspondence status=draft — never sends without operator approval.",
    model: "claude-sonnet-5",
  },
  {
    id: "project-management-coworker",
    display_name: "Project Management",
    domain: "project-management",
    trigger_phrase: "/project-management-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["product-management-coworker", "engineering-coworker", "agent-resources-coworker"],
    description: "Execution tracker, nightly review, type-safety auditor. Reports to product-management.",
    model: "claude-opus-4-8",
  },
];

export const PROTOCOLS = ["a2a", "e2m-mcp", "mcp", "acp"] as const;
export type Protocol = typeof PROTOCOLS[number];

export function findCoworker(idOrTrigger: string): Coworker | undefined {
  return COWORKERS.find(c => c.id === idOrTrigger || c.trigger_phrase === idOrTrigger);
}

export function protocolMatrix(): Array<{ id: string; domain: string; a2a: boolean; "e2m-mcp": boolean; mcp: boolean; acp: boolean }> {
  return COWORKERS.map(cw => ({
    id: cw.id,
    domain: cw.domain,
    a2a: cw.protocols.includes("a2a"),
    "e2m-mcp": cw.protocols.includes("e2m-mcp"),
    mcp: cw.protocols.includes("mcp"),
    acp: cw.protocols.includes("acp"),
  }));
}

export const HSTS = "max-age=31536000; includeSubDomains";

export function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "coworkers.subagentknowledge.com");
  return out;
}
