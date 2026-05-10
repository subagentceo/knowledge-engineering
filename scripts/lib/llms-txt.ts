// scripts/lib/llms-txt.ts
//
// Phase 1.A. Parser for the llms.txt file format.
//
// Citations:
//   @cite seeds/posture/session-start.xml          (vendor llms.txt as the URL allowlist source)
//   @cite seeds/citations/connectors-building.md   (MCP-side reference for "discoverable docs")
//
// The llms.txt convention (as published by various vendor doc sites):
//   # <title>
//   > <optional blurb>
//   ## <section heading>
//   - [<link title>](<url>): <optional blurb>
//   - [<link title>](<url>)
//
// We extract a normalized tree. A "valid" llms.txt MUST contain a title (`# `)
// AND at least one markdown link. Anything less → return `null`, signaling
// to the discovery probe to try the next candidate URL.
//
// Pure parser: no I/O, no fetches.

export interface LlmsLink {
  title: string;
  url: string;
  blurb?: string;
}

export interface LlmsSection {
  heading: string;
  links: LlmsLink[];
}

export interface LlmsTxt {
  title: string;
  blurb?: string;
  sections: LlmsSection[];
}

const TITLE_RE = /^#\s+(.+?)\s*$/;
const SECTION_RE = /^##\s+(.+?)\s*$/;
const BLURB_RE = /^>\s+(.+?)\s*$/;
// Markdown link with optional trailing colon-prefixed blurb.
const LINK_RE = /^[-*]\s+\[([^\]]+?)\]\(([^)]+?)\)(?:\s*[:—\-]\s*(.+?))?\s*$/;

/**
 * Parse a string that may be an llms.txt file. Returns the normalized
 * tree, or `null` if the body fails the validity check.
 */
export function parseLlmsTxt(body: string): LlmsTxt | null {
  const lines = body.split(/\r?\n/);
  let title: string | undefined;
  let topBlurb: string | undefined;
  const sections: LlmsSection[] = [];
  // The "preamble" links (before the first ##) live in an unnamed section.
  let current: LlmsSection | null = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (line === "") continue;

    const titleMatch = line.match(TITLE_RE);
    if (titleMatch) {
      if (title === undefined) title = titleMatch[1];
      continue;
    }

    const sectionMatch = line.match(SECTION_RE);
    if (sectionMatch) {
      current = { heading: sectionMatch[1], links: [] };
      sections.push(current);
      continue;
    }

    const blurbMatch = line.match(BLURB_RE);
    if (blurbMatch) {
      if (current === null && topBlurb === undefined) topBlurb = blurbMatch[1];
      continue;
    }

    const linkMatch = line.match(LINK_RE);
    if (linkMatch) {
      const link: LlmsLink = { title: linkMatch[1], url: linkMatch[2] };
      if (linkMatch[3]) link.blurb = linkMatch[3];
      if (current === null) {
        current = { heading: "", links: [] };
        sections.push(current);
      }
      current.links.push(link);
      continue;
    }
    // Unknown lines are intentionally ignored — vendors mix in HTML
    // comments, raw paragraphs, etc.
  }

  if (title === undefined) return null;
  const totalLinks = sections.reduce((acc, s) => acc + s.links.length, 0);
  if (totalLinks < 3) return null;

  const out: LlmsTxt = { title, sections };
  if (topBlurb !== undefined) out.blurb = topBlurb;
  return out;
}
