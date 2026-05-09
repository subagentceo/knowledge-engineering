/**
 * Bridge lane: llms.txt namespaces.
 *
 * llms.txt is a plain-text index served by a host so language models can
 * discover its docs without scraping HTML. The Claude/Anthropic surface
 * publishes several:
 *
 *   claude.com/llms.txt
 *   claude.com/docs/llms.txt
 *   code.claude.com/docs/llms.txt
 *   platform.claude.com/docs/llms.txt
 *   www.anthropic.com/llms.txt          (when present)
 *
 * Tools:
 *   llms_namespaces  - return the curated list of known namespaces
 *   llms_fetch       - fetch one llms.txt and return its raw text
 *   llms_grep        - line-grep across all known namespaces
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchText, jsonResult } from "../bridge-utils.js";

interface Namespace {
  id: string;
  url: string;
  description: string;
}

const NAMESPACES: ReadonlyArray<Namespace> = [
  {
    id: "claude.com",
    url: "https://www.claude.com/llms.txt",
    description: "Top-level Claude site index.",
  },
  {
    id: "claude.com/docs",
    url: "https://www.claude.com/docs/llms.txt",
    description: "Claude product docs (skills authoring, connectors).",
  },
  {
    id: "code.claude.com/docs",
    url: "https://code.claude.com/docs/llms.txt",
    description: "Claude Code CLI + agent runtime docs.",
  },
  {
    id: "platform.claude.com/docs",
    url: "https://platform.claude.com/docs/llms.txt",
    description: "Claude API / Messages / Managed Agents docs.",
  },
  {
    id: "anthropic.com",
    url: "https://www.anthropic.com/llms.txt",
    description: "Anthropic corporate site (engineering, research, product).",
  },
];

const NS_BY_ID: ReadonlyMap<string, Namespace> = new Map(NAMESPACES.map((n) => [n.id, n]));

export function registerLlmsTxt(server: McpServer): void {
  server.tool(
    "llms_namespaces",
    "List the curated set of llms.txt namespaces this bridge knows about.",
    {},
    async () => jsonResult({ namespaces: NAMESPACES }),
  );

  server.tool(
    "llms_fetch",
    "Fetch one llms.txt namespace and return its raw text. `id` is one of the values returned by `llms_namespaces` (e.g. 'code.claude.com/docs').",
    { id: z.string().min(1) },
    async ({ id }) => {
      const ns = NS_BY_ID.get(id);
      if (!ns) {
        throw new Error(`unknown namespace '${id}'. Use llms_namespaces to discover.`);
      }
      const text = await fetchText(ns.url);
      return jsonResult({ source: ns.url, id: ns.id, text });
    }
  );

  server.tool(
    "llms_grep",
    "Case-insensitive line-grep across every known llms.txt namespace. Returns each hit with its source URL.",
    {
      pattern: z.string().min(1),
      max_per_namespace: z.number().int().positive().max(100).default(20),
    },
    async ({ pattern, max_per_namespace }) => {
      const needle = pattern.toLowerCase();
      const results: Array<{ id: string; source: string; line: string }> = [];
      for (const ns of NAMESPACES) {
        try {
          const text = await fetchText(ns.url);
          const lines = text.split(/\r?\n/);
          let count = 0;
          for (const line of lines) {
            if (count >= max_per_namespace) break;
            if (line.toLowerCase().includes(needle)) {
              results.push({ id: ns.id, source: ns.url, line });
              count++;
            }
          }
        } catch (err) {
          results.push({
            id: ns.id,
            source: ns.url,
            line: `[error] ${(err as Error).message}`,
          });
        }
      }
      return jsonResult({ pattern, results });
    }
  );
}
