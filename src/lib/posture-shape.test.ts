/**
 * @cite seeds/posture/session-start.xml
 * @cite seeds/citations/boris-cherny-ai-ascent-2026.md
 * @tdd green
 *
 * Phase A / O-A3 — schema validator for posture XML v3.
 *
 * Two layers of validation:
 *   1. zod schema over the loader output (kicks off the zod-at-boundaries
 *      discipline from the cross-cutting standards table).
 *   2. cite-target resolution: every <cite ch="N" ts="A:BB-A:CC"/> in the
 *      posture XML must point at a real chapter+ts range in
 *      seeds/citations/boris-cherny-ai-ascent-2026.md.
 *
 * The validator is the first line of defense for posture drift — any
 * primitive added in a future rev without a backing transcript citation
 * fails this test.
 */
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { loadPosture, type CiteRef } from "./posture.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

// ────────────────────────────────────────────────────────────────────
// zod schema layer

const CiteRefSchema = z.object({
  chapter: z.string().regex(/^\d+$/),
  ts: z.string().regex(/^\d+:\d{2}-\d+:\d{2}$/),
});

const BorisPrimitiveSchema = z.object({
  kind: z.literal("primitive"),
  id: z.string().regex(/^P\d+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  cites: z.array(CiteRefSchema).min(1),
});

const BorisDirectiveSchema = z.object({
  kind: z.literal("directive"),
  id: z.string().regex(/^D\d+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  cites: z.array(CiteRefSchema).min(1),
  applies: z.array(z.string().regex(/^P\d+$/)).min(1),
});

const PostureSchema = z.object({
  version: z.string().regex(/^\d+$/),
  date: z.string().min(1),
  borisPrimitives: z.array(BorisPrimitiveSchema).length(11),
  borisDirectives: z.array(BorisDirectiveSchema).length(11),
});

test("posture parses through the zod schema", () => {
  const raw = loadPosture();
  const parsed = PostureSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(JSON.stringify(parsed.error.issues, null, 2));
  }
  assert.ok(parsed.success, "zod schema rejected the loaded posture");
});

// ────────────────────────────────────────────────────────────────────
// Cite-target resolution layer

interface TranscriptChapter {
  readonly chapter: string;
  readonly tsStartSec: number;
  readonly tsEndSec: number;
}

function parseTs(ts: string): { start: number; end: number } {
  const m = ts.match(/^(\d+):(\d{2})-(\d+):(\d{2})$/);
  if (!m) throw new Error(`bad ts: ${ts}`);
  const start = Number(m[1]) * 60 + Number(m[2]);
  const end = Number(m[3]) * 60 + Number(m[4]);
  return { start, end };
}

function loadTranscriptChapters(): TranscriptChapter[] {
  const path = resolve(REPO_ROOT, "seeds/citations/boris-cherny-ai-ascent-2026.md");
  const body = readFileSync(path, "utf8");
  const out: TranscriptChapter[] = [];
  // Table row shape: | <ch> | <title> | A:BB–A:CC |
  const re = /^\|\s*(\d+)\s*\|\s*[^|]+\|\s*(\d+):(\d{2})[–-](\d+):(\d{2})\s*\|/gm;
  for (const m of body.matchAll(re)) {
    out.push({
      chapter: m[1]!,
      tsStartSec: Number(m[2]) * 60 + Number(m[3]),
      tsEndSec: Number(m[4]) * 60 + Number(m[5]),
    });
  }
  return out;
}

function resolvesToChapter(cite: CiteRef, chapters: TranscriptChapter[]): boolean {
  const ch = chapters.find((c) => c.chapter === cite.chapter);
  if (!ch) return false;
  const { start, end } = parseTs(cite.ts);
  // Cite range must fall fully within the chapter's ts range (inclusive).
  return start >= ch.tsStartSec && end <= ch.tsEndSec;
}

test("transcript citation file has all 10 chapters", () => {
  const chapters = loadTranscriptChapters();
  assert.equal(chapters.length, 10);
  const ids = chapters.map((c) => Number(c.chapter)).sort((a, b) => a - b);
  assert.deepEqual(ids, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("every Boris primitive cite resolves to a real chapter+ts in transcript", () => {
  const posture = loadPosture();
  const chapters = loadTranscriptChapters();
  const misses: string[] = [];
  for (const prim of posture.borisPrimitives) {
    for (const cite of prim.cites) {
      if (!resolvesToChapter(cite, chapters)) {
        misses.push(`${prim.id}: ch=${cite.chapter} ts=${cite.ts}`);
      }
    }
  }
  assert.deepEqual(misses, [], `primitive cites failed to resolve:\n  ${misses.join("\n  ")}`);
});

test("every Boris directive cite resolves to a real chapter+ts in transcript", () => {
  const posture = loadPosture();
  const chapters = loadTranscriptChapters();
  const misses: string[] = [];
  for (const d of posture.borisDirectives) {
    for (const cite of d.cites) {
      if (!resolvesToChapter(cite, chapters)) {
        misses.push(`${d.id}: ch=${cite.chapter} ts=${cite.ts}`);
      }
    }
  }
  assert.deepEqual(misses, [], `directive cites failed to resolve:\n  ${misses.join("\n  ")}`);
});

test("every directive's applies-ref maps to a real primitive id", () => {
  const posture = loadPosture();
  const primIds = new Set(posture.borisPrimitives.map((p) => p.id));
  const misses: string[] = [];
  for (const d of posture.borisDirectives) {
    for (const ref of d.applies) {
      if (!primIds.has(ref)) misses.push(`${d.id} applies ${ref}`);
    }
  }
  assert.deepEqual(misses, []);
});
