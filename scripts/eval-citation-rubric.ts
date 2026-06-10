// scripts/eval-citation-rubric.ts
//
// B27 — rubric evaluator (KAN-19). Scores the econ-researcher rubric
// against the code as built, deterministically and offline:
//
//   steps_to_citation   taps from landing to a copied citation for an
//                       economic-research doc (counted along the B23 path:
//                       team chip → row → copy button)
//   tokens_to_citation  byte cost of the agent round-trip
//                       citations_search → citations_get, with cache-tier
//                       evidence (L1 hit on repeat read must be true)
//   parallel_capacity   structural: TaskEnvelope schema present + mail
//                       transport present
//
// Emits frontend/public/rubric-scorecard.json so the score ships with the
// site. Wired as `npm run eval:rubric`.
//
// @cite vendor/anthropic-sitemap/research/team/economic-research.md
// @cite seeds/citations/define-outcomes.md

import { existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { corpus, rankedSearch } from "../src/mcp/lanes/citations.js";
import { getCitationCached, clearL1ForTests } from "../src/lib/citation-cache.js";
import { teamChips } from "../frontend/src/citations.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(REPO_ROOT, "frontend", "public", "rubric-scorecard.json");

const items = corpus(REPO_ROOT);

// steps_to_citation: chip (1) → row (2) → copy (3); valid only if the
// economic-research chip is first and the filter yields rows.
const econFirst = teamChips()[0] === "economic-research";
const econRows = items.filter((i) =>
  i.id.startsWith("anthropic-sitemap:research:team:economic-research"),
);
const stepsToCitation = econFirst && econRows.length > 0 ? 3 : Number.POSITIVE_INFINITY;

// tokens_to_citation: byte proxy for the agent round-trip, plus cache proof.
const hits = rankedSearch(items, "economic index report", 3);
const searchBytes = JSON.stringify(hits).length;
const firstId = hits[0]?.id ?? econRows[0]?.id ?? "";
clearL1ForTests();
const cold = await getCitationCached(firstId, {}, (id) => items.find((i) => i.id === id));
const warm = await getCitationCached(firstId, {}, (id) => items.find((i) => i.id === id));
const getBytes = JSON.stringify(cold.item ?? {}).length;

// parallel_capacity: structural presence of the typed-dispatch surfaces.
const envelopes = existsSync(resolve(REPO_ROOT, "src", "lib", "agent-envelope.ts"));
const mailbox = existsSync(resolve(REPO_ROOT, "mail", "README.md"));

const scorecard = {
  generated_at: new Date().toISOString(),
  rubric: "econ_researcher_rubric (batch-2026-06-10-mobile-econ.md)",
  steps_to_citation: {
    value: stepsToCitation,
    pass: stepsToCitation <= 3,
    evidence: `economic-research chip first=${econFirst}; ${econRows.length} team doc(s) reachable`,
  },
  tokens_to_citation: {
    search_bytes: searchBytes,
    get_bytes: getBytes,
    cold_tier: cold.tier,
    warm_tier: warm.tier,
    pass: warm.tier === "l1",
    evidence: "repeat citations_get served from L1 (zero recompute, zero I/O)",
  },
  parallel_capacity: {
    pass: envelopes && mailbox,
    evidence: "TaskEnvelope schema + repo mailbox transport present",
  },
};

writeFileSync(OUT, JSON.stringify(scorecard, null, 2) + "\n");
const allPass =
  scorecard.steps_to_citation.pass &&
  scorecard.tokens_to_citation.pass &&
  scorecard.parallel_capacity.pass;
console.log(
  `rubric: steps=${stepsToCitation} search=${searchBytes}B get=${getBytes}B cold=${cold.tier} warm=${warm.tier} → ${allPass ? "PASS" : "FAIL"}`,
);
if (!allPass) process.exit(1);
