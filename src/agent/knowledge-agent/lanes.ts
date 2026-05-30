// src/agent/knowledge-agent/lanes.ts
//
// The knowledge-work LANE abstraction — the layer above steerKnowledgeLoop that
// makes self-steering composable across knowledge-work *domains*, not just the
// code/npm lanes.
//
// A Lane is DATA the loop consumes, not new control flow: steerKnowledgeLoop is
// already lane-agnostic (it takes specFor/seedFor as injected resolvers), so a
// new domain is a Lane record + its SubagentSpecs + its skill set + its output
// schemas. This file proves that by defining lanes whose resolvers plug straight
// into the loop.
//
// Grounded in the REAL anthropics/knowledge-work-plugins structure cloned at
// third_party/anthropics-knowledge-work-plugins/ (gitignored per CLAUDE.md, so
// referenced by path, not imported). Every `skills` entry below is a real skill
// directory name in that clone; the domain set matches the real plugins.
//
// Key insight (operator): a skill can carry REUSABLE PROGRAMMATICALLY-CALLED
// SCRIPTS (e.g. data/skills/data-context-extractor/scripts/package_data_skill.py,
// the whole bio-research scripts/ trees). So a Lane carries `scripts[]`: the loop
// runs these deterministically BETWEEN model dispatches — a cheap, non-model gate
// that can reject a producer's output before the model-verifier is even spent.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/plugins.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/skills.md
//   (ground truth: third_party/anthropics-knowledge-work-plugins/ — gitignored clone)

import { SubagentSpec, type SubagentSpec as Spec } from "../corpus-viewer/primitives.js";
import { KNOWLEDGE_ANSWERER, NPM_RESEARCHER, ANSWER_VERIFIER } from "./fleet.js";

/**
 * A deterministic script a lane's skill carries — the non-model gate. The loop
 * may run it between model dispatches; a non-zero exit is treated like a
 * verifier `fail` (cheaper than spending the model-verifier). Mirrors the
 * scripts/ dirs in the real knowledge-work-plugins skills.
 */
export interface LaneScript {
  /** Stable id, e.g. "run-tests" or "validate-data". */
  name: string;
  /** Path to the script (relative to a plugin root or repo). */
  path: string;
  /** When the loop should run it: 'pre-verify' gates before the model-verifier. */
  stage: "pre-verify" | "post-pass";
  description: string;
}

/**
 * A knowledge-work lane: a domain's fleet + skill set + output schemas + the
 * deterministic scripts its skills carry. One Lane = one entry in the real
 * knowledge-work-plugins marketplace, expressed as steering data.
 */
export interface Lane {
  /** Stable id; matches the knowledge-work-plugins domain dir name. */
  name: string;
  /** One-line role. */
  description: string;
  /** The SubagentSpecs that staff this lane. */
  fleet: readonly Spec[];
  /** Real skill directory names from the domain's plugin (skills/<name>). */
  skills: readonly string[];
  /** The skill that acts as this lane's VERIFIER (gates producers). */
  verifierSkill: string;
  /** StructuredOutput schema names this lane's producers return. */
  schemaRefs: readonly string[];
  /** Deterministic scripts the lane's skills carry (the non-model gates). */
  scripts: readonly LaneScript[];
  /** Path to the source plugin in the gitignored clone (provenance, not import). */
  pluginPath: string;
}

const KWP = "third_party/anthropics-knowledge-work-plugins";

// ── ENGINEERING — fully worked, the reference lane ─────────────────────────
//
// Staffed by the existing knowledge fleet (answerer produces, verifier grades).
// Its verifier skill is the real `code-review` skill, whose SKILL.md is itself a
// structured reviewer ("security, performance, correctness, maintainability") —
// exactly a verifier. Skills list = the 10 real engineering/skills/* dirs.

export const ENGINEERING_LANE: Lane = {
  name: "engineering",
  description:
    "Code review, system design, tech-debt, testing-strategy, incident-response over the corpus + repo. Producer = knowledge-answerer; verifier = the code-review skill.",
  fleet: [KNOWLEDGE_ANSWERER, ANSWER_VERIFIER],
  skills: [
    "architecture",
    "code-review",
    "debug",
    "deploy-checklist",
    "documentation",
    "incident-response",
    "standup",
    "system-design",
    "tech-debt",
    "testing-strategy",
  ],
  verifierSkill: "code-review",
  schemaRefs: ["KnowledgeAnswer", "VerifyVerdict"],
  // The deterministic gate: run the repo's own test suite before the
  // model-verifier. A failing exit rejects the producer cheaply.
  scripts: [
    {
      name: "run-tests",
      path: "scripts/lib/run-tests.ts",
      stage: "pre-verify",
      description: "Run the node:test suite; non-zero exit fails the producer before the model-verifier is spent.",
    },
    {
      name: "typecheck",
      path: "tsc --noEmit",
      stage: "pre-verify",
      description: "tsc --noEmit; a type error is a deterministic fail, no model needed.",
    },
  ],
  pluginPath: `${KWP}/engineering`,
};

// ── DATA — the lane that proves skills-carry-scripts ───────────────────────
//
// The only domain in the clone with a real script today
// (data/skills/data-context-extractor/scripts/package_data_skill.py). Its
// validate-data / write-query skills are deterministic-gate candidates: a SQL
// query can be EXPLAIN-validated by a script before the model interprets results.
// Against the operator's running stack: alloydb :5433 (durable) + dragonfly :6379.

export const DATA_LANE: Lane = {
  name: "data",
  description:
    "Query/visualize/interpret datasets; write + validate SQL against the running alloydb (:5433). Scripts validate queries deterministically before model interpretation.",
  fleet: [KNOWLEDGE_ANSWERER, ANSWER_VERIFIER],
  skills: [
    "analyze",
    "build-dashboard",
    "create-viz",
    "data-context-extractor",
    "data-visualization",
    "explore-data",
    "sql-queries",
    "statistical-analysis",
    "validate-data",
    "write-query",
  ],
  verifierSkill: "validate-data",
  schemaRefs: ["KnowledgeAnswer", "VerifyVerdict"],
  scripts: [
    {
      name: "package-data-skill",
      path: `${KWP}/data/skills/data-context-extractor/scripts/package_data_skill.py`,
      stage: "post-pass",
      description: "Real script from the data plugin: packages extracted data context (the canonical skill-carries-script example).",
    },
  ],
  pluginPath: `${KWP}/data`,
};

// ── Remaining domains — scaffolded from REAL skill names ───────────────────
//
// These reuse the knowledge fleet for now (producer + verifier); a later pass
// gives each its own domain-tuned SubagentSpecs. The skill lists are the actual
// skills/<name> dirs in the clone, so the lane is grounded, not invented.

function scaffoldLane(
  name: string,
  description: string,
  skills: string[],
  verifierSkill: string,
): Lane {
  return {
    name,
    description,
    fleet: [KNOWLEDGE_ANSWERER, ANSWER_VERIFIER],
    skills,
    verifierSkill,
    schemaRefs: ["KnowledgeAnswer", "VerifyVerdict"],
    scripts: [],
    pluginPath: `${KWP}/${name}`,
  };
}

export const PRODUCTIVITY_LANE = scaffoldLane(
  "productivity",
  "Tasks, memory, daily workflows (TASKS.md + two-tier memory).",
  ["dashboard.html", "memory-management", "start", "task-management", "update"],
  "task-management",
);

export const PRODUCT_MANAGEMENT_LANE = scaffoldLane(
  "product-management",
  "Specs, roadmaps, research synthesis, competitive briefs.",
  ["competitive-brief", "metrics-review", "product-brainstorming", "roadmap-update", "sprint-planning", "stakeholder-update", "synthesize-research", "write-spec"],
  "metrics-review",
);

export const ENTERPRISE_SEARCH_LANE = scaffoldLane(
  "enterprise-search",
  "One query across email/chat/docs/wikis; synthesis + source management.",
  ["digest", "knowledge-synthesis", "search", "search-strategy", "source-management"],
  "knowledge-synthesis",
);

export const DESIGN_LANE = scaffoldLane(
  "design",
  "Design critique, accessibility/UX review, research synthesis, handoff.",
  ["accessibility-review", "design-critique", "design-handoff", "design-system", "research-synthesis", "user-research", "ux-copy"],
  "design-critique",
);

export const COWORK_PLUGIN_MANAGEMENT_LANE = scaffoldLane(
  "cowork-plugin-management",
  "The meta-lane: creates/customizes plugins (and thus new lanes) for the chassis itself.",
  ["cowork-plugin-customizer", "create-cowork-plugin"],
  "create-cowork-plugin",
);

// ── Registry + resolvers the loop consumes ─────────────────────────────────

export const LANES: readonly Lane[] = [
  ENGINEERING_LANE,
  DATA_LANE,
  PRODUCTIVITY_LANE,
  PRODUCT_MANAGEMENT_LANE,
  ENTERPRISE_SEARCH_LANE,
  DESIGN_LANE,
  COWORK_PLUGIN_MANAGEMENT_LANE,
];

/** Resolve a lane by name; throws on unknown (callers want a hard failure). */
export function laneFor(name: string): Lane {
  const l = LANES.find((x) => x.name === name);
  if (!l) throw new Error(`[lanes] unknown lane '${name}'`);
  return l;
}

/**
 * Build the (specFor, seedFor) resolvers steerKnowledgeLoop needs from a Lane.
 * This is the proof the loop is lane-agnostic: pass these in and the same loop
 * drives any domain's fleet. seedFor returns the subagent's directive; in a
 * full wiring it would read the skill's SKILL.md from pluginPath.
 */
export function laneResolvers(lane: Lane): {
  specFor: (name: string) => Spec;
  seedFor: (name: string) => string;
} {
  const byName = new Map(lane.fleet.map((s) => [s.name, s] as const));
  return {
    specFor: (name: string) => {
      const s = byName.get(name);
      if (!s) throw new Error(`[lanes] lane '${lane.name}' has no subagent '${name}'`);
      return s;
    },
    seedFor: (name: string) =>
      `You are ${name} in the '${lane.name}' knowledge-work lane. ` +
      `Skills available: ${lane.skills.join(", ")}. Verifier skill: ${lane.verifierSkill}.`,
  };
}
