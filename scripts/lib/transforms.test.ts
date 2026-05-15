/**
 * Phase 1.A unit tests for scripts/lib/transforms.ts. Each strategy
 * gets a happy-path case + a hard-rule case (HTML rejection where
 * relevant).
 *
 * @cite seeds/posture/session-start.xml
 * @cite seeds/prompts/operator-2026-05-10-followup.md
 * @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
 * @cite rubrics/phase-1.md
 */

import {
  verbatim,
  appendMd,
  appendMdAndAccept,
  cloudflareIndexMd,
  anthropicMdFirst,
  supportMdFirst,
  acceptOnly,
  htmlExtract,
} from "./transforms.js";

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

console.log("transforms:");

check("verbatim: passes URL through; rejects html body", () => {
  const t = verbatim("https://docs.turbopuffer.com/quickstart.md");
  if (t.fetchUrl !== "https://docs.turbopuffer.com/quickstart.md") throw new Error("url");
  if (t.validateBody(null, "<!doctype html><html>") !== false) throw new Error("html accepted");
  if (t.validateBody(null, "# Title\nhello") !== true) throw new Error("md rejected");
});

check("append-md: extensionless path gets .md", () => {
  const t = appendMd("https://www.anthropic.com/engineering/built-multi-agent-research-system");
  if (!t.fetchUrl.endsWith(".md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("append-md: trailing slash → /index.md", () => {
  const t = appendMd("https://www.anthropic.com/engineering/");
  if (!t.fetchUrl.endsWith("/engineering/index.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("append-md-and-accept: sends Accept header", () => {
  const t = appendMdAndAccept("https://docs.stripe.com/api/charges");
  if (t.headers["Accept"] !== "text/markdown") throw new Error("accept missing");
  if (!t.fetchUrl.endsWith(".md")) throw new Error("url not .md");
});

check("cloudflare-index-md: developers.cloudflare.com → /index.md", () => {
  const t = cloudflareIndexMd("https://developers.cloudflare.com/sandbox/tutorials/claude-code/");
  if (!t.fetchUrl.endsWith("/claude-code/index.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("cloudflare-index-md: hard-rejects text/html Content-Type", () => {
  const t = cloudflareIndexMd("https://developers.cloudflare.com/x");
  if (t.validateBody("text/html; charset=utf-8", "anything") !== false) {
    throw new Error("text/html was accepted");
  }
  if (t.validateBody("text/markdown", "# ok") !== true) {
    throw new Error("text/markdown was rejected");
  }
});

check("cloudflare-index-md: hard-rejects body that starts with <!doctype", () => {
  const t = cloudflareIndexMd("https://developers.cloudflare.com/x");
  if (t.validateBody(null, "<!doctype html>...") !== false) throw new Error("html accepted");
});

check("anthropic-mdfirst: code.claude.com .md appended", () => {
  const t = anthropicMdFirst("https://code.claude.com/docs/en/commands");
  if (!t.fetchUrl.endsWith("/commands.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("anthropic-mdfirst: platform.claude.com .md appended", () => {
  const t = anthropicMdFirst("https://platform.claude.com/docs/en/managed-agents/define-outcomes");
  if (!t.fetchUrl.endsWith("/define-outcomes.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("anthropic-mdfirst: claude.com/docs path gets .md", () => {
  const t = anthropicMdFirst("https://claude.com/docs/connectors/building");
  if (!t.fetchUrl.endsWith("/building.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("anthropic-mdfirst: neon.com/guides path gets .md", () => {
  const t = anthropicMdFirst("https://neon.com/guides/cloudflare-sandbox-neon-branching");
  if (!t.fetchUrl.endsWith("-neon-branching.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("anthropic-mdfirst: rejects text/html responses", () => {
  const t = anthropicMdFirst("https://platform.claude.com/docs/en/x");
  if (t.validateBody("text/html", "<html>") !== false) throw new Error("html accepted");
});

check("support-mdfirst: /en/articles/<id-slug> gets .md appended + Accept header", () => {
  const t = supportMdFirst("https://support.claude.com/en/articles/14445694-claude-code");
  if (!t.fetchUrl.endsWith("/14445694-claude-code.md")) throw new Error(`url: ${t.fetchUrl}`);
  if (t.headers["Accept"] !== "text/markdown") throw new Error("accept missing");
});

check("support-mdfirst: trailing slash → /index.md", () => {
  const t = supportMdFirst("https://support.claude.com/en/collections/");
  if (!t.fetchUrl.endsWith("/en/collections/index.md")) throw new Error(`url: ${t.fetchUrl}`);
});

check("support-mdfirst: hard-rejects text/html Content-Type", () => {
  const t = supportMdFirst("https://support.claude.com/en/articles/14445694-claude-code");
  if (t.validateBody("text/html; charset=utf-8", "anything") !== false) {
    throw new Error("text/html was accepted");
  }
  if (t.validateBody("text/markdown", "# Claude Code\nhello") !== true) {
    throw new Error("text/markdown was rejected");
  }
});

check("support-mdfirst: hard-rejects body that starts with <!doctype", () => {
  const t = supportMdFirst("https://support.claude.com/en/articles/14445694-claude-code");
  if (t.validateBody(null, "<!doctype html>...") !== false) throw new Error("html accepted");
});

check("accept-only: URL unchanged; sends Accept", () => {
  const t = acceptOnly("https://example.com/foo");
  if (t.fetchUrl !== "https://example.com/foo") throw new Error("url changed");
  if (t.headers["Accept"] !== "text/markdown") throw new Error("accept missing");
});

check("html-extract: passes URL through; postProcess invoked", () => {
  let touched = false;
  const t = htmlExtract("https://intercom.com/help/article", (s) => {
    touched = true;
    return s.toUpperCase();
  });
  if (t.fetchUrl !== "https://intercom.com/help/article") throw new Error("url");
  if (!t.postProcess) throw new Error("postProcess missing");
  if (t.postProcess("hello") !== "HELLO") throw new Error("postProcess wrong");
  if (!touched) throw new Error("postProcess not invoked");
  // html-extract intentionally accepts HTML (postProcess converts).
  if (t.validateBody("text/html", "<html>") !== true) throw new Error("html rejected");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
