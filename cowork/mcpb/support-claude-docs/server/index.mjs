#!/usr/bin/env node
// cowork/mcpb/support-claude-docs/server/index.mjs
//
// Local stdio MCP server that serves the vendor/support-claude-sitemap mirror.
// Read-only, local filesystem only, path-traversal guarded. No network.
//
// MIRROR_DIR comes from manifest server.mcp_config.env (no auto-prefix).
//
// @cite cowork/plugins/mcp-server-dev/skills/build-mcpb/SKILL.md

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFile, readdir } from "node:fs/promises";
import { resolve, join, sep } from "node:path";
import { homedir } from "node:os";

const ROOT = resolve(
  process.env.MIRROR_DIR ??
    join(homedir(), "knowledge-engineering", "vendor", "support-claude-sitemap"),
);
const SAFE = /^[A-Za-z0-9._-]+$/; // blocks "..", "/", and path separators
const isCollection = (n) => /^\d+-[a-z0-9-]+$/.test(n);

// Resolve a path and refuse anything that escapes ROOT.
function under(...parts) {
  const p = resolve(ROOT, ...parts);
  if (p !== ROOT && !p.startsWith(ROOT + sep)) throw new Error("path escapes mirror root");
  return p;
}

const server = new McpServer({ name: "support-claude-docs", version: "0.1.0" });

server.registerTool(
  "list_collections",
  {
    description: "List the support collections in the local mirror (id-slug + title).",
    inputSchema: {},
    annotations: { readOnlyHint: true },
  },
  async () => {
    const entries = await readdir(ROOT, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory() && isCollection(e.name));
    const out = [];
    for (const d of dirs.sort((a, b) => a.name.localeCompare(b.name))) {
      let title = d.name;
      try {
        const head = await readFile(under(d.name, "_collection.md"), "utf8");
        title = head.split("\n")[0].replace(/^#\s*/, "").trim() || d.name;
      } catch {
        /* no _collection.md yet (pre-crawl) */
      }
      out.push({ collection: d.name, title });
    }
    return { content: [{ type: "text", text: JSON.stringify(out, null, 2) }] };
  },
);

server.registerTool(
  "list_articles",
  {
    description: "List article .md files in a collection (by its id-slug).",
    inputSchema: { collection: z.string() },
    annotations: { readOnlyHint: true },
  },
  async ({ collection }) => {
    if (!SAFE.test(collection)) throw new Error("invalid collection");
    const files = (await readdir(under(collection)))
      .filter((f) => f.endsWith(".md") && f !== "_collection.md")
      .sort();
    return { content: [{ type: "text", text: JSON.stringify(files, null, 2) }] };
  },
);

server.registerTool(
  "read_article",
  {
    description: "Read one article's markdown by collection id-slug + filename.",
    inputSchema: { collection: z.string(), article: z.string() },
    annotations: { readOnlyHint: true },
  },
  async ({ collection, article }) => {
    if (!SAFE.test(collection) || !SAFE.test(article)) throw new Error("invalid path component");
    const name = article.endsWith(".md") ? article : `${article}.md`;
    const text = await readFile(under(collection, name), "utf8");
    return { content: [{ type: "text", text }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
