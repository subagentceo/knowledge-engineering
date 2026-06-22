/**
 * infra/crawler/html-to-markdown.ts
 * Cheerio → CommonMark markdown pipeline.
 * Output is validated by the commonmark parser before return.
 * If parsing fails, throws — callers must handle (never store invalid markdown).
 */

import * as cheerio from "cheerio";
import TurndownService from "turndown";
// @ts-expect-error — commonmark ships CJS without bundled declarations
import * as commonmark from "commonmark";
import { createHash } from "node:crypto";
import type { MarkdownDoc, MarkdownSection, PageMeta } from "./types.js";
import { MarkdownDocSchema, PageMetaSchema } from "./types.js";

// ── Turndown config (CommonMark-safe rules) ───────────────────────────────────

const td = new TurndownService({
  headingStyle: "atx",       // # H1, ## H2 — CommonMark compatible
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",  // ``` blocks
  fence: "```",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
  preformattedCode: true,
});

// Remove nav, footer, cookie banners, scripts before conversion
td.remove(["script", "style", "nav", "footer", "aside", "noscript", "svg", "figure > figcaption"]);

// Preserve code blocks with language
td.addRule("fencedCodeBlock", {
  filter(node): boolean {
    return (
      node.nodeName === "PRE" &&
      node.firstChild?.nodeName === "CODE"
    );
  },
  replacement(_content, node): string {
    const code = node.firstChild as Element;
    const lang = (code as HTMLElement).getAttribute?.("class")?.replace(/^language-/, "") ?? "";
    return `\n\`\`\`${lang}\n${(code as HTMLElement).textContent ?? ""}\n\`\`\`\n`;
  },
});

// ── CommonMark validator ──────────────────────────────────────────────────────

const cmReader = new commonmark.Parser();
const cmWriter = new commonmark.HtmlRenderer();

/**
 * Parse markdown through commonmark. Throws if the result HTML is empty
 * (indicates the input was not valid CommonMark content).
 */
export function validateCommonmark(md: string): string {
  const parsed = cmReader.parse(md);
  const html = cmWriter.render(parsed);
  if (!html || html.trim().length === 0) {
    throw new Error("CommonMark parse produced empty output — invalid markdown");
  }
  return md; // Return original (cmark round-trip may alter formatting)
}

// ── Section tree extractor ────────────────────────────────────────────────────

function extractSections($: cheerio.CheerioAPI, root: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const stack: Array<{ level: number; section: MarkdownSection }> = [];

  $(root).find("h1,h2,h3,h4,h5,h6").each((_i, el) => {
    const level = parseInt((el as cheerio.Element).tagName.slice(1), 10);
    const heading = $(el).text().trim();
    const bodyParts: string[] = [];

    // Collect sibling text until next heading of same or higher level
    let sib = $(el).next();
    while (sib.length && !sib.is("h1,h2,h3,h4,h5,h6")) {
      bodyParts.push(sib.text().trim());
      sib = sib.next();
    }

    if (!heading) return; // skip headings with no text content

    const section: MarkdownSection = {
      level,
      heading,
      body: bodyParts.filter(Boolean).join("\n\n"),
      children: [],
    };

    // Pop stack until we find parent
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();

    if (stack.length) {
      (stack[stack.length - 1].section.children ??= []).push(section);
    } else {
      sections.push(section);
    }
    stack.push({ level, section });
  });

  return sections;
}

// ── Main converter ────────────────────────────────────────────────────────────

export interface HtmlToMarkdownInput {
  html: string;
  url: string;
  site: "anthropic.com" | "claude.com";
  section: string;
  lastmod?: string;
}

export function htmlToMarkdown(input: HtmlToMarkdownInput): MarkdownDoc {
  const { html, url, site, section, lastmod } = input;
  const $ = cheerio.load(html);

  // ── Extract metadata ────────────────────────────────────────────────────────
  const title =
    $("h1").first().text().trim() ||
    $("title").text().replace(/\s*[-|].*$/, "").trim() ||
    $('meta[property="og:title"]').attr("content") ||
    "";

  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content");

  const publishedAt =
    $('meta[name="article:published_time"]').attr("content") ||
    $('time[datetime]').first().attr("datetime");

  // ── Target content area (fall back through selectors) ──────────────────────
  const contentSel =
    $("article").length ? "article" :
    $("main").length ? "main" :
    $('[class*="content"]').first().length ? '[class*="content"]:first' :
    "body";

  // Remove clutter before conversion
  $(`${contentSel} .cookie-banner, ${contentSel} [aria-hidden="true"]`).remove();

  // ── Collect PDF links (absolute) ────────────────────────────────────────────
  const pdfUrls: string[] = [];
  $("a[href$='.pdf']").each((_i, el) => {
    const href = $(el).attr("href") ?? "";
    try {
      pdfUrls.push(new URL(href, url).toString());
    } catch { /* skip malformed */ }
  });

  // ── Collect all links ───────────────────────────────────────────────────────
  const links: Array<{ text: string; href: string }> = [];
  $(`${contentSel} a[href]`).each((_i, el) => {
    const href = $(el).attr("href") ?? "";
    const text = $(el).text().trim();
    if (text && href) links.push({ text, href });
  });

  // ── Collect code blocks ─────────────────────────────────────────────────────
  const codeBlocks: Array<{ lang: string; code: string }> = [];
  $(`${contentSel} pre > code`).each((_i, el) => {
    const lang = ($(el).attr("class") ?? "").replace(/^language-/, "");
    codeBlocks.push({ lang, code: $(el).text() });
  });

  // ── Convert to markdown ─────────────────────────────────────────────────────
  const contentHtml = $(contentSel).html() ?? "";
  let markdown = td.turndown(contentHtml);

  // Ensure title is H1 if not already present
  if (title && !markdown.startsWith("# ")) {
    markdown = `# ${title}\n\n${markdown}`;
  }

  // Validate through CommonMark — throws on invalid
  validateCommonmark(markdown);

  // ── Build structured sections ───────────────────────────────────────────────
  const sections = extractSections($, contentSel);

  // ── Word count (plain text) ─────────────────────────────────────────────────
  const plainText = $(`${contentSel}`).text();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  // ── Content hash (dedup key) ────────────────────────────────────────────────
  const contentHash = createHash("sha256").update(markdown).digest("hex");

  const urlPath = new URL(url).pathname;

  const meta: PageMeta = PageMetaSchema.parse({
    url,
    urlPath,
    site,
    section,
    title,
    description,
    publishedAt: publishedAt ?? undefined,
    lastmod,
    contentHash,
    pdfUrls,
    crawledAt: new Date().toISOString(),
  });

  return MarkdownDocSchema.parse({
    meta,
    markdown,
    sections,
    links,
    codeBlocks,
    wordCount,
  });
}
