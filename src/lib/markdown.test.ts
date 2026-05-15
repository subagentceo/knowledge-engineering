/**
 * Tests for src/lib/markdown/index.ts — AST parser + visitor +
 * extractors + validation.
 *
 * Phase H. Each assertion drives one branch of the public API.
 * Sample inputs are drawn from the chassis's own vendor mirror format
 * (h1 title, h2 sections, fenced code blocks with language, .md links)
 * so the test doubles as a contract for what the module guarantees
 * over real-world mirrors.
 *
 * @tdd green
 * @cite vendor/turbopuffer/turbopuffer.com/docs/auth.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 * @cite rubrics/phase-H.md
 */
import {
  codeBlocksHaveLanguage,
  extractCodeBlocks,
  extractHeadings,
  extractLinks,
  parseMarkdown,
  singleTopHeading,
  validate,
  visitNodes,
  walkNodes,
} from "./markdown.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("markdown:");

const SAMPLE = `# Authentication

The API expects a Bearer token.

## Header

\`\`\`http
Authorization: Bearer <API_KEY>
\`\`\`

See [the dashboard](https://example.com/dashboard) for tokens.

## Errors

A failure returns:

\`\`\`json
{ "status": "error" }
\`\`\`
`;

check("parseMarkdown returns a Root AST + the source", () => {
  const doc = parseMarkdown(SAMPLE);
  if (doc.ast.type !== "root") throw new Error(`type=${doc.ast.type}`);
  if (doc.source !== SAMPLE) throw new Error("source drift");
});

check("extractHeadings finds h1 + h2s with correct levels + slugs", () => {
  const headings = extractHeadings(parseMarkdown(SAMPLE));
  if (headings.length !== 3) throw new Error(`count=${headings.length}`);
  if (headings[0]?.level !== 1) throw new Error("first not h1");
  if (headings[0]?.text !== "Authentication") throw new Error(`text=${headings[0]?.text}`);
  if (headings[0]?.slug !== "authentication") throw new Error(`slug=${headings[0]?.slug}`);
  if (headings[1]?.level !== 2) throw new Error("second not h2");
  if (headings[2]?.text !== "Errors") throw new Error(`third=${headings[2]?.text}`);
});

check("extractHeadings slug strips punctuation + collapses whitespace", () => {
  const doc = parseMarkdown("## Cloud  Sandbox: best practices!");
  const h = extractHeadings(doc);
  if (h[0]?.slug !== "cloud-sandbox-best-practices") {
    throw new Error(`slug=${h[0]?.slug}`);
  }
});

check("extractCodeBlocks finds fenced blocks with languages", () => {
  const blocks = extractCodeBlocks(parseMarkdown(SAMPLE));
  if (blocks.length !== 2) throw new Error(`count=${blocks.length}`);
  if (blocks[0]?.language !== "http") throw new Error(`lang0=${blocks[0]?.language}`);
  if (!blocks[0]?.content.startsWith("Authorization")) {
    throw new Error(`content0=${blocks[0]?.content}`);
  }
  if (blocks[1]?.language !== "json") throw new Error(`lang1=${blocks[1]?.language}`);
});

check("extractCodeBlocks returns null language for fenceless blocks", () => {
  const doc = parseMarkdown("```\nno lang here\n```\n");
  const blocks = extractCodeBlocks(doc);
  if (blocks[0]?.language !== null) throw new Error(`lang=${blocks[0]?.language}`);
  if (blocks[0]?.content !== "no lang here") throw new Error(`content=${blocks[0]?.content}`);
});

check("extractLinks returns url + rendered text for inline links", () => {
  const links = extractLinks(parseMarkdown(SAMPLE));
  if (links.length !== 1) throw new Error(`count=${links.length}`);
  if (links[0]?.url !== "https://example.com/dashboard") throw new Error(`url=${links[0]?.url}`);
  if (links[0]?.text !== "the dashboard") throw new Error(`text=${links[0]?.text}`);
});

check("visitNodes<T> aggregates per-node values returned by visitor", () => {
  const doc = parseMarkdown(SAMPLE);
  const headingTypes = visitNodes(doc, (n) => (n.type === "heading" ? n.type : undefined));
  if (headingTypes.length !== 3) throw new Error(`count=${headingTypes.length}`);
  if (headingTypes.some((t) => t !== "heading")) throw new Error("non-heading leaked");
});

check("walkNodes invokes side-effecting walker on every node", () => {
  let n = 0;
  walkNodes(parseMarkdown(SAMPLE), () => {
    n += 1;
  });
  if (n < 5) throw new Error(`too few nodes walked: ${n}`);
});

check("validate aggregates rule diagnostics; empty array == valid", () => {
  const doc = parseMarkdown(SAMPLE);
  const diags = validate(doc, [singleTopHeading, codeBlocksHaveLanguage]);
  if (diags.length !== 0) throw new Error(`diags=${JSON.stringify(diags)}`);
});

check("singleTopHeading rule flags missing h1", () => {
  const doc = parseMarkdown("## only an h2\n");
  const diags = singleTopHeading(doc);
  if (diags.length !== 1) throw new Error(`diags=${JSON.stringify(diags)}`);
  if (!diags[0]?.includes("no h1")) throw new Error(`msg=${diags[0]}`);
});

check("singleTopHeading rule flags duplicate h1", () => {
  const doc = parseMarkdown("# one\n# two\n");
  const diags = singleTopHeading(doc);
  if (diags.length !== 1 || !diags[0]?.includes("2 h1")) {
    throw new Error(`diags=${JSON.stringify(diags)}`);
  }
});

check("codeBlocksHaveLanguage rule flags fenceless blocks", () => {
  const doc = parseMarkdown("```\nno lang\n```\n");
  const diags = codeBlocksHaveLanguage(doc);
  if (diags.length !== 1) throw new Error(`diags=${JSON.stringify(diags)}`);
});

check("codeBlocksHaveLanguage rule is silent when every block has a lang", () => {
  const doc = parseMarkdown("```ts\nx\n```\n");
  const diags = codeBlocksHaveLanguage(doc);
  if (diags.length !== 0) throw new Error(`diags=${JSON.stringify(diags)}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
