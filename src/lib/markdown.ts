/**
 * Markdown AST utility — typed parser + visitor triad + cached
 * `ParsedDoc` value object.
 *
 * Phase H (new, mid-session dogfood iteration). Inspired by Anthropic's
 * `swift-markdown` (Apache-2.0; fork of swiftlang/swift-markdown):
 * `Document(parsing:)` + `MarkupVisitor` / `MarkupWalker` /
 * `MarkupRewriter` triad over immutable typed nodes. We do not depend
 * on a Swift package directly; we mirror its shape on top of `mdast-
 * util-from-markdown` + `unist-util-visit` (the same AST surface
 * `unified` / `remark` ride on).
 *
 * The previous chassis state was 7+ scattered regex probes
 * (`/^#\s+/`, `/^##\s+/`, custom anchor regexes per lane). Centralizing
 * here lets consumers (`scripts/lib/llms-txt.ts`, future `vendor_grep`
 * chunking, citation-guard's @cite checker) parse the same AST instead
 * of each maintaining its own regex band.
 *
 * Citations:
 *   - github.com/anthropics/swift-markdown (parser shape + visitor triad)
 *   - github.com/anthropics/swift-markdown-ui (configuration-as-value pattern)
 *   - vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 *
 * Pure functions; no I/O.
 */
import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";
import type {
  Root,
  Heading,
  Code,
  Link,
  Text,
  Node,
  PhrasingContent,
} from "mdast";

/**
 * The parsed-once value object. Mirrors swift-markdown-ui's
 * `MarkdownContent`. Severs parse cost from query cost — consumers
 * (vendor_grep chunking, citation guards, llms.txt parser) read the
 * same `ParsedDoc` instead of each re-parsing.
 */
export interface ParsedDoc {
  ast: Root;
  source: string;
}

export interface HeadingEntry {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  slug: string;
}

export interface CodeBlockEntry {
  language: string | null;
  content: string;
}

export interface LinkEntry {
  url: string;
  text: string;
}

/**
 * Visitor result for `visitNodes<T>` — read-only traversal that
 * returns a value per visited node, mirroring swift-markdown's
 * `MarkupVisitor` with associated `Result` type.
 */
export type NodeVisitor<T> = (node: Node) => T | undefined;

/**
 * Walker — side-effecting traversal, returns void. Mirrors
 * swift-markdown's `MarkupWalker`.
 */
export type NodeWalker = (node: Node) => void;

/**
 * Parse source markdown into a typed `ParsedDoc`. Single entry point
 * (swift-markdown's `Document(parsing:)`).
 */
export function parseMarkdown(source: string): ParsedDoc {
  const ast = fromMarkdown(source);
  return { ast, source };
}

/**
 * Read-only visitor that collects per-node values. Caller controls
 * the result type via `T`. Returning `undefined` from the visitor
 * skips inclusion.
 */
export function visitNodes<T>(doc: ParsedDoc, visitor: NodeVisitor<T>): T[] {
  const out: T[] = [];
  visit(doc.ast, (node) => {
    const v = visitor(node);
    if (v !== undefined) out.push(v);
  });
  return out;
}

/**
 * Side-effecting walker — visits every node; visitor returns void.
 * Useful for diagnostics + validation passes.
 */
export function walkNodes(doc: ParsedDoc, walker: NodeWalker): void {
  visit(doc.ast, (node) => {
    walker(node);
  });
}

/**
 * Extract every heading with its level, plain-text content, and a
 * GitHub-style slug. Slug rule: lowercase, alphanumeric + hyphens.
 */
export function extractHeadings(doc: ParsedDoc): HeadingEntry[] {
  const out: HeadingEntry[] = [];
  visit(doc.ast, "heading", (node: Heading) => {
    const text = phrasingToText(node.children);
    out.push({ level: node.depth, text, slug: slugify(text) });
  });
  return out;
}

/**
 * Extract every fenced or indented code block with its declared
 * language (null if none) and content.
 */
export function extractCodeBlocks(doc: ParsedDoc): CodeBlockEntry[] {
  const out: CodeBlockEntry[] = [];
  visit(doc.ast, "code", (node: Code) => {
    out.push({ language: node.lang ?? null, content: node.value });
  });
  return out;
}

/**
 * Extract every inline link with its URL and rendered text. Image
 * links are not included (they have a separate `image` node type).
 */
export function extractLinks(doc: ParsedDoc): LinkEntry[] {
  const out: LinkEntry[] = [];
  visit(doc.ast, "link", (node: Link) => {
    out.push({ url: node.url, text: phrasingToText(node.children) });
  });
  return out;
}

/**
 * Validation rule — receives the doc, returns zero or more diagnostic
 * messages. Mirrors swift-markdown-ui's BlockStyle/TextStyle
 * configuration-as-value pattern.
 */
export type ValidationRule = (doc: ParsedDoc) => string[];

/**
 * Apply a set of rules and return aggregated diagnostics. Empty
 * array means "valid."
 */
export function validate(doc: ParsedDoc, rules: ValidationRule[]): string[] {
  const out: string[] = [];
  for (const rule of rules) {
    out.push(...rule(doc));
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────
// Built-in rules

/**
 * Rule: every fenced code block carries an explicit language tag.
 * Encourages syntax-highlightable + machine-classifiable blocks
 * in vendor docs.
 */
export const codeBlocksHaveLanguage: ValidationRule = (doc) => {
  const bad = extractCodeBlocks(doc).filter((b) => b.language === null);
  return bad.length === 0
    ? []
    : [`${bad.length} code block(s) missing language tag`];
};

/**
 * Rule: top-level heading is exactly one h1. Catches docs that drift
 * to h2-only or stack multiple h1s.
 */
export const singleTopHeading: ValidationRule = (doc) => {
  const h1s = extractHeadings(doc).filter((h) => h.level === 1);
  if (h1s.length === 0) return ["no h1 heading"];
  if (h1s.length > 1) return [`${h1s.length} h1 headings (expected 1)`];
  return [];
};

// ────────────────────────────────────────────────────────────────────
// Helpers

function phrasingToText(children: readonly PhrasingContent[]): string {
  const parts: string[] = [];
  for (const child of children) {
    if (child.type === "text" || child.type === "inlineCode") {
      parts.push((child as Text).value);
    } else if ("children" in child) {
      parts.push(phrasingToText((child as { children: PhrasingContent[] }).children));
    }
  }
  return parts.join("").trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
