/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";
import { readGraph, searchNodes, openNodes } from "../../db/knowledge-graph.js";

export function registerGraphQL(server: McpServer): void {
  server.tool(
    "kg_graphql_query",
    "Execute a GraphQL-style query against the KE knowledge graph. Supported: { entities }, { searchNodes(query: \"X\") }, { node(name: \"X\") }, { graph }.",
    {
      query: z.string().describe("GraphQL query string"),
      variables: z.record(z.string(), z.unknown()).optional().describe("optional variables map"),
    },
    async ({ query, variables = {} }) => {
      const q = query.trim();

      const searchMatch = q.match(/searchNodes\s*\(\s*(?:query\s*:\s*)?["']([^"']+)["']\s*\)/i);
      if (searchMatch) {
        const searchQuery = searchMatch[1] ?? String((variables as Record<string, unknown>)["query"] ?? "");
        return jsonResult({ searchNodes: searchNodes(searchQuery) });
      }

      const nodeMatch = q.match(/node\s*\(\s*(?:name\s*:\s*)?["']([^"']+)["']\s*\)/i);
      if (nodeMatch) {
        const name = nodeMatch[1];
        const { entities, relations } = readGraph();
        const entity = entities.find(e => e.name === name) ?? null;
        const related = relations.filter(r => r.from === name || r.to === name);
        return jsonResult({ node: entity, relations: related });
      }

      return jsonResult({ graph: readGraph() });
    }
  );
}
