/**
 * Typed loader for `seeds/posture/session-start.xml` v3.
 *
 * Per Boris primitive P4 (harness-thins) + D4 (≤300 LOC orchestration):
 * pure-TS XML reader, no `xml2js` dep. The file is hand-edited and
 * well-formed by contract; tight regexes over the structured XML are
 * sufficient.
 *
 * Phase A / O-A2 — paired with src/lib/posture.test.ts (TDD red+green).
 *
 * @cite seeds/posture/session-start.xml
 * @cite seeds/citations/boris-cherny-ai-ascent-2026.md
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ────────────────────────────────────────────────────────────────────
// Types (per cross-cutting standard: inheritance via discriminated union)

export interface CiteRef {
  readonly chapter: string;
  readonly ts: string;
}

interface PostureNodeBase {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly cites: ReadonlyArray<CiteRef>;
}

export interface BorisPrimitive extends PostureNodeBase {
  readonly kind: "primitive";
}

export interface BorisDirective extends PostureNodeBase {
  readonly kind: "directive";
  readonly applies: ReadonlyArray<string>;
}

export type PostureNode = BorisPrimitive | BorisDirective;

export interface Posture {
  readonly version: string;
  readonly date: string;
  readonly borisPrimitives: ReadonlyArray<BorisPrimitive>;
  readonly borisDirectives: ReadonlyArray<BorisDirective>;
}

// ────────────────────────────────────────────────────────────────────
// Loader

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_POSTURE_PATH = resolve(
  __dirname,
  "..",
  "..",
  "seeds/posture/session-start.xml",
);

function readAttr(s: string, name: string): string {
  const m = s.match(new RegExp(`${name}="([^"]+)"`));
  return m ? m[1]! : "";
}

function readCites(block: string): CiteRef[] {
  const out: CiteRef[] = [];
  const re = /<cite\s+ch="(\d+)"\s+ts="([^"]+)"\s*\/>/g;
  for (const m of block.matchAll(re)) {
    out.push({ chapter: m[1]!, ts: m[2]! });
  }
  return out;
}

function readDescription(block: string): string {
  const inner = block.replace(/<cite\s+[^/]*\/>/g, "").replace(/<\/?[a-z][^>]*>/gi, "");
  return inner.replace(/\s+/g, " ").trim();
}

function parseBorisPrimitives(xml: string): BorisPrimitive[] {
  const sectionMatch = xml.match(/<boris-primitives[\s\S]*?<\/boris-primitives>/);
  if (!sectionMatch) return [];
  const section = sectionMatch[0];
  const out: BorisPrimitive[] = [];
  const re = /<p\s+id="(P\d+)"\s+name="([^"]+)"\s*>([\s\S]*?)<\/p>/g;
  for (const m of section.matchAll(re)) {
    const [, id, name, body] = m;
    out.push({
      kind: "primitive",
      id: id!,
      name: name!,
      description: readDescription(body!),
      cites: readCites(body!),
    });
  }
  return out;
}

function parseBorisDirectives(xml: string): BorisDirective[] {
  const sectionMatch = xml.match(/<boris-directives[\s\S]*?<\/boris-directives>/);
  if (!sectionMatch) return [];
  const section = sectionMatch[0];
  const out: BorisDirective[] = [];
  const re = /<d\s+id="(D\d+)"\s+applies="([^"]+)"\s+name="([^"]+)"\s*>([\s\S]*?)<\/d>/g;
  for (const m of section.matchAll(re)) {
    const [, id, applies, name, body] = m;
    out.push({
      kind: "directive",
      id: id!,
      name: name!,
      description: readDescription(body!),
      cites: readCites(body!),
      applies: applies!.split(",").map((s) => s.trim()),
    });
  }
  return out;
}

export function loadPosture(path: string = DEFAULT_POSTURE_PATH): Posture {
  const xml = readFileSync(path, "utf8");
  const postureMatch = xml.match(/<posture\s+([^>]+)>/);
  const attrs = postureMatch ? postureMatch[1]! : "";
  return {
    version: readAttr(attrs, "version") || "0",
    date: readAttr(attrs, "date") || "",
    borisPrimitives: parseBorisPrimitives(xml),
    borisDirectives: parseBorisDirectives(xml),
  };
}
