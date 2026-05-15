#!/usr/bin/env tsx
/**
 * scripts/verify-project.ts
 *
 * Phase 15.D — assert that docs/PROJECT.md has the required Cowork-style
 * sections and that docs/pending.md isn't stale.
 *
 * Citations:
 *   @cite vendor/anthropics/claude.com/docs/cowork/guide/projects.md
 *   @cite vendor/anthropics/claude.com/docs/cowork/guide/dispatch.md
 *   @cite rubrics/phase-15.md
 *
 * Wired into the verify chain via `npm run verify:project`.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const PROJECT_MD = resolve(REPO_ROOT, "docs/PROJECT.md");
const PENDING_MD = resolve(REPO_ROOT, "docs/pending.md");

const PENDING_MAX_AGE_DAYS = 14;

// Sections PROJECT.md must contain — each maps to a Cowork primitive.
const REQUIRED_SECTIONS = [
  "## Description", // What Dispatch reads when choosing a project
  "## Folders", // Project's bundled folders
  "## Instructions", // Standing guidance per session
  "## Links", // Reference URLs
  "## Memory", // Cross-session memory store
  "## Dispatch", // Long-running orchestrator
  "## Plugins", // Skills + connectors + agents + hooks
];

interface Finding {
  level: "error" | "warning";
  file: string;
  message: string;
}

const findings: Finding[] = [];

function err(file: string, message: string): void {
  findings.push({ level: "error", file, message });
}

function warn(file: string, message: string): void {
  findings.push({ level: "warning", file, message });
}

// ───── PROJECT.md checks ────────────────────────────────────────────

if (!existsSync(PROJECT_MD)) {
  err("docs/PROJECT.md", "missing — required by Phase 15.A");
} else {
  const body = readFileSync(PROJECT_MD, "utf8");
  for (const section of REQUIRED_SECTIONS) {
    // Match "## Section" possibly followed by extra text on the same heading line
    // (e.g. "## Dispatch (cross-session orchestrator)").
    const sectionPrefix = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`^${sectionPrefix}(\\s|$|\\()`, "m");
    if (!re.test(body)) {
      err("docs/PROJECT.md", `missing section: ${section}`);
    }
  }

  // Light check: at least three @cite-style local-path references (vendor/, seeds/, rubrics/).
  const localRefs = body.match(/`(vendor|seeds|rubrics)\/[^`]+`/g) ?? [];
  if (localRefs.length < 3) {
    warn(
      "docs/PROJECT.md",
      `expected ≥3 local-path references (vendor/seeds/rubrics); found ${localRefs.length}`,
    );
  }
}

// ───── pending.md freshness checks ──────────────────────────────────

if (!existsSync(PENDING_MD)) {
  err("docs/pending.md", "missing — required by Phase 15.B");
} else {
  const body = readFileSync(PENDING_MD, "utf8");

  // Check for the YAML front-matter `last-reviewed:` field.
  const lastReviewedMatch = body.match(/^last-reviewed:\s*(\S+)/m);
  if (!lastReviewedMatch) {
    err(
      "docs/pending.md",
      "missing `last-reviewed:` front-matter field; cannot assess freshness",
    );
  } else {
    const lastReviewed = new Date(lastReviewedMatch[1]);
    if (Number.isNaN(lastReviewed.getTime())) {
      err(
        "docs/pending.md",
        `last-reviewed value '${lastReviewedMatch[1]}' is not a parseable date`,
      );
    } else {
      const ageMs = Date.now() - lastReviewed.getTime();
      const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
      if (ageDays > PENDING_MAX_AGE_DAYS) {
        warn(
          "docs/pending.md",
          `last-reviewed=${lastReviewedMatch[1]} is ${ageDays} days old (>${PENDING_MAX_AGE_DAYS}); refresh recommended`,
        );
      }
    }
  }

  // Check the file has the documented 3 columns.
  const columnHeadings = [
    "## Column 1 —",
    "## Column 2 —",
    "## Column 3 —",
  ];
  for (const heading of columnHeadings) {
    if (!body.includes(heading)) {
      warn("docs/pending.md", `missing expected heading: ${heading}`);
    }
  }
}

// ───── Cross-file checks ────────────────────────────────────────────

// PROJECT.md should reference docs/pending.md (the live dashboard).
if (existsSync(PROJECT_MD) && existsSync(PENDING_MD)) {
  const body = readFileSync(PROJECT_MD, "utf8");
  if (!body.includes("docs/pending.md")) {
    warn(
      "docs/PROJECT.md",
      "no reference to docs/pending.md — the Cowork manifest should link the live dashboard",
    );
  }
}

// ───── Output ───────────────────────────────────────────────────────

const errors = findings.filter((f) => f.level === "error");
const warnings = findings.filter((f) => f.level === "warning");

console.log("verify:project — PROJECT.md sections + pending.md freshness");
for (const f of findings) {
  const prefix = f.level === "error" ? "✗" : "⚠";
  console.log(`  ${prefix} ${f.file}: ${f.message}`);
}
if (findings.length === 0) {
  console.log("  ✓ all checks pass");
}
console.log(
  `\nverify:project: ${errors.length} error(s), ${warnings.length} warning(s)`,
);

if (errors.length > 0) process.exit(1);
