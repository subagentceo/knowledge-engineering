#!/usr/bin/env tsx
/**
 * github-it-admin MCP server — exposes the claude-action-lint skill as
 * an MCP tool so other Claude sessions (e.g., cloud Routines) can lint
 * a workflow without learning the rules in-context.
 *
 * Only ONE tool is exposed: lint_claude_action_workflow. The `gh` ops
 * themselves are deliberately NOT wrapped — `gh` CLI is already
 * ergonomic; wrapping would add a layer without value.
 *
 * @cite plugins/github-it-admin/skills/claude-action-lint/SKILL.md
 * @cite plugins/github-it-admin/skills/claude-action-lint/scripts/lint.ts
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "node:fs";
import { lint } from "../skills/claude-action-lint/scripts/lint.ts";

const server = new Server(
  { name: "github-it-admin", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "lint_claude_action_workflow",
      description:
        "Lint a .github/workflows/claude*.yml file for OAUTO13 security baseline. Returns an array of findings, each with severity (ERROR|WARNING|INFO), rule, line, message. Empty array = clean.",
      inputSchema: {
        type: "object",
        properties: {
          file_path: {
            type: "string",
            description: "Absolute or repo-relative path to the YAML file",
          },
        },
        required: ["file_path"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== "lint_claude_action_workflow") {
    throw new Error(`unknown tool: ${req.params.name}`);
  }
  const filePath = (req.params.arguments as { file_path?: string })?.file_path;
  if (!filePath) throw new Error("file_path is required");

  let body: string;
  try {
    body = readFileSync(filePath, "utf8");
  } catch (e) {
    return {
      content: [{ type: "text", text: `error: cannot read ${filePath}: ${String(e)}` }],
      isError: true,
    };
  }

  const findings = lint(filePath, body);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({ file_path: filePath, findings }, null, 2),
      },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
