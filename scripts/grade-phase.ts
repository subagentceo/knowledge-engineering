#!/usr/bin/env tsx
// scripts/grade-phase.ts
//
// Phase 9. ODD rubric grader. Reads rubrics/phase-<N>.md, splits into
// per-criterion sections, and grades each criterion against the
// repository state via the Messages API (OAuth — never ANTHROPIC_API_KEY).
//
// Citations:
//   @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
//   @cite seeds/posture/session-start.xml
//
// CLI:
//   npm run grade -- phase-N         (grade one phase)
//   npm run grade -- phase-N --dry-run  (no API; print plan only)
//
// Per the operator posture, this script does NOT call the Managed Agents
// API. It uses the Messages API over OAuth with a fresh context per
// criterion (per define-outcomes.md's "separate context window" guidance).

import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { requireOAuth } from "../src/oauth/token.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const MODEL = "claude-opus-4-7";
const ITERATION_CAP = 5;
const MAX_TOKENS = 1500;

interface Criterion {
  index: number;
  heading: string;
  body: string;
  status?: "DONE" | "DEFERRED" | "PARTIAL" | "TODO";
}

interface CriterionVerdict {
  index: number;
  heading: string;
  declared_status: Criterion["status"];
  verdict: "pass" | "fail" | "ambiguous" | "skipped";
  rationale: string;
  iteration: number;
  tokens?: { input: number; output: number };
}

function parseRubric(body: string): { phase: number; title: string; criteria: Criterion[] } {
  const phaseMatch = body.match(/^phase:\s*(\d+)$/m);
  const titleMatch = body.match(/^title:\s*(.+?)$/m);
  if (!phaseMatch || !titleMatch) throw new Error("rubric missing phase: or title:");
  const phase = parseInt(phaseMatch[1], 10);
  const title = titleMatch[1].trim();

  // Each criterion is a "### N. Heading" section. Split the body on
  // those boundaries; the last section runs to end-of-file. (JS regex
  // has no \Z; explicit split is simpler than the lookahead trick.)
  const criteria: Criterion[] = [];
  const HEADER_RE = /^### (\d+)\.\s+(.+?)\s*$/gm;
  const headers: { index: number; heading: string; start: number; end: number }[] = [];
  for (const m of body.matchAll(HEADER_RE)) {
    headers.push({ index: parseInt(m[1], 10), heading: m[2], start: m.index! + m[0].length, end: -1 });
  }
  for (let i = 0; i < headers.length; i += 1) {
    headers[i].end = i + 1 < headers.length ? body.lastIndexOf("\n### ", headers[i + 1].start) : body.length;
  }
  for (const h of headers) {
    const heading = h.heading;
    const sectionBody = body.slice(h.start, h.end).trim();
    let status: Criterion["status"] | undefined;
    if (/✅\s*DONE/.test(heading) || /\bDONE\b/i.test(heading)) status = "DONE";
    else if (/🟡\s*DEFERRED/.test(heading) || /\bDEFERRED\b/i.test(heading)) status = "DEFERRED";
    else if (/⚠️\s*PARTIAL/.test(heading) || /\bPARTIAL\b/i.test(heading)) status = "PARTIAL";
    else status = "TODO";
    criteria.push({
      index: h.index,
      heading: heading.replace(/[—\-]\s*(✅|🟡|⚠️|✗).*$/, "").trim(),
      body: sectionBody,
      status,
    });
  }
  return { phase, title, criteria };
}

function repoStateContext(): string {
  // Compact summary the grader can ground criteria against.
  // Doesn't include actual file bodies (too large) — instead lists key
  // file paths + sizes so the grader can infer presence.
  const interesting = [
    "package.json",
    "src/mcp/bridge-server.ts",
    "scripts/verify.ts",
    "scripts/lib/citation-guard.ts",
    "scripts/crawl-vendors.ts",
    "scripts/generate-server-tree.ts",
    "scripts/discover-sources.ts",
    "scripts/verify-freshness.ts",
    "src/lib/vendor-manifests.ts",
    "src/lib/vendor-mirror.ts",
    "src/mcp/lanes/vendor.ts",
    "src/mcp/lanes/search-tools.ts",
    "infra/cloudflare/wrangler.jsonc",
    "infra/cloudflare/src/worker.ts",
    "seeds/discovered-sources.json",
  ];
  const out: string[] = [];
  for (const rel of interesting) {
    const p = resolve(REPO_ROOT, rel);
    if (existsSync(p)) {
      const stat = readFileSync(p, "utf8").length;
      out.push(`  ${rel} (${stat} chars)`);
    } else {
      out.push(`  ${rel} (missing)`);
    }
  }
  // Vendor mirror summary
  const vendorRoot = resolve(REPO_ROOT, "vendor");
  if (existsSync(vendorRoot)) {
    const vendors = readdirSync(vendorRoot, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
    out.push(`  vendor/ — ${vendors.length} vendors: ${vendors.join(", ")}`);
  }
  return out.join("\n");
}

async function gradeOne(client: Anthropic, criterion: Criterion, context: string): Promise<CriterionVerdict> {
  if (criterion.status === "DEFERRED") {
    return {
      index: criterion.index,
      heading: criterion.heading,
      declared_status: criterion.status,
      verdict: "skipped",
      rationale: "criterion is explicitly DEFERRED in the rubric; not graded",
      iteration: 0,
    };
  }

  const prompt = `You are an outcome-driven-development grader.
Cite: vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
Per that doc, you grade against ONE criterion at a time, with no influence from
the agent that produced the work.

## Criterion ${criterion.index}: ${criterion.heading}

${criterion.body}

## Repository state (compact summary)
${context}

## Instructions
Decide whether the criterion is satisfied based on the repository state above.

Respond with EXACTLY this JSON shape (no prose around it):
{
  "verdict": "pass" | "fail" | "ambiguous",
  "rationale": "<one or two sentences>"
}

Use "ambiguous" only when the repo state is insufficient to decide.`;

  let iteration = 0;
  let lastErr: unknown = null;
  while (iteration < ITERATION_CAP) {
    iteration += 1;
    try {
      const r = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "user", content: prompt }],
      });
      const text = r.content
        .filter((b): b is Extract<typeof b, { type: "text" }> => b.type === "text")
        .map((b) => b.text)
        .join("\n");
      // Best-effort JSON extraction.
      const jsonMatch = text.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("no JSON in model response");
      const parsed = JSON.parse(jsonMatch[0]) as { verdict: string; rationale: string };
      if (!["pass", "fail", "ambiguous"].includes(parsed.verdict)) throw new Error(`bad verdict: ${parsed.verdict}`);
      return {
        index: criterion.index,
        heading: criterion.heading,
        declared_status: criterion.status,
        verdict: parsed.verdict as CriterionVerdict["verdict"],
        rationale: parsed.rationale,
        iteration,
        tokens: { input: r.usage.input_tokens, output: r.usage.output_tokens },
      };
    } catch (err) {
      lastErr = err;
    }
  }
  return {
    index: criterion.index,
    heading: criterion.heading,
    declared_status: criterion.status,
    verdict: "ambiguous",
    rationale: `iteration cap (${ITERATION_CAP}) exceeded; last error: ${(lastErr as Error)?.message ?? "unknown"}`,
    iteration,
  };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const phaseArg = args.find((a) => /^phase-\d+$/.test(a));
  const dryRun = args.includes("--dry-run");

  if (!phaseArg) {
    console.error("usage: grade-phase phase-N [--dry-run]");
    process.exit(2);
  }
  const phase = parseInt(phaseArg.slice(6), 10);
  const path = resolve(REPO_ROOT, "rubrics", `phase-${phase}.md`);
  if (!existsSync(path)) {
    console.error(`rubric not found: ${path}`);
    process.exit(2);
  }
  const body = readFileSync(path, "utf8");
  const { title, criteria } = parseRubric(body);

  console.log(`grade-phase ${phase} — ${title}`);
  console.log(`criteria: ${criteria.length}`);
  console.log(`mode: ${dryRun ? "DRY RUN (no API calls)" : "live (Messages API; OAuth)"}`);
  console.log();

  const context = repoStateContext();
  const verdicts: CriterionVerdict[] = [];

  if (dryRun) {
    for (const c of criteria) {
      verdicts.push({
        index: c.index,
        heading: c.heading,
        declared_status: c.status,
        verdict: "skipped",
        rationale: "(dry run) would grade against repo state context",
        iteration: 0,
      });
    }
  } else {
    requireOAuth();
    const client = new Anthropic({ authToken: process.env.CLAUDE_CODE_OAUTH_TOKEN });
    for (const c of criteria) {
      const v = await gradeOne(client, c, context);
      verdicts.push(v);
      const tag = v.verdict === "pass" ? "✓" : v.verdict === "fail" ? "✗" : v.verdict === "skipped" ? "·" : "?";
      console.log(`  ${tag} C${v.index} | ${v.heading}`);
      console.log(`    ${v.rationale}`);
    }
  }

  const summary = verdicts.reduce(
    (acc, v) => ({ ...acc, [v.verdict]: (acc[v.verdict] || 0) + 1 }),
    {} as Record<string, number>
  );
  console.log();
  console.log(`summary: ${JSON.stringify(summary)}`);
  if (verdicts.some((v) => v.verdict === "fail")) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
