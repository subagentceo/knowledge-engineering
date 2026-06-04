/**
 * @cite seeds/citations/programmatic-tool-calling.md
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";
import { readGraph, searchNodes, openNodes } from "../../db/knowledge-graph.js";

const StepSchema = z.object({
  tool: z.string().describe("kg tool name: kg_read_graph | kg_search_nodes | kg_open_nodes"),
  args: z.record(z.string(), z.unknown()).default({}),
});

export function registerCodeMode(server: McpServer): void {
  server.tool(
    "code_mode_batch",
    "Execute multiple KG operations in a single round-trip. Steps run in order; each result is appended to the output array. Supported tools: kg_read_graph, kg_search_nodes, kg_open_nodes.",
    {
      steps: z.array(StepSchema).min(1).describe("ordered list of tool invocations"),
    },
    async ({ steps }) => {
      const results: unknown[] = [];
      for (const step of steps) {
        switch (step.tool) {
          case "kg_read_graph":
            results.push({ tool: step.tool, result: readGraph() });
            break;
          case "kg_search_nodes": {
            const query = String((step.args as Record<string, unknown>)["query"] ?? "");
            results.push({ tool: step.tool, result: searchNodes(query) });
            break;
          }
          case "kg_open_nodes": {
            const names = (step.args as Record<string, unknown>)["names"];
            const nameArr = Array.isArray(names) ? names as string[] : [String(names ?? "")];
            results.push({ tool: step.tool, result: openNodes(nameArr) });
            break;
          }
          default:
            results.push({ tool: step.tool, error: `unsupported tool: ${step.tool}` });
        }
      }
      return jsonResult({ steps: results.length, results });
    }
  );
}
