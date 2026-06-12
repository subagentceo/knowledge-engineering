// scripts/verify.ts
//
// MCP smoke test. Spawns each stdio MCP server this repo ships, sends a
// JSON-RPC `tools/list` request over stdio, and asserts the expected tool
// surface. Designed to be the first verify step (the planner smoke chains
// after via `npm run verify:mcp`). OAuth-only: refuses to start if
// ANTHROPIC_API_KEY is set.

import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { assertOAuthOnly } from "../src/oauth/token.js";

assertOAuthOnly();

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

interface ServerSpec {
  name: string;
  entry: string;
}

const SERVERS: ServerSpec[] = [
  {
    name: "knowledge-bridge",
    entry: resolve(root, "dist/mcp/bridge-server.js"),
  },
  {
    name: "npm-registry",
    entry: resolve(root, "dist/mcp/npm-registry/server.js"),
  },
];

// Expected tool names per server. Deliberate friction: registering a
// tool means updating the manifest (run `tsx scripts/verify.ts --update`)
// so the surface change shows up in the diff — and a mismatch names the
// drifted tools instead of "expected 54, got 55".
const MANIFEST_PATH = resolve(__dirname, "lib", "mcp-tool-manifest.json");

function fail(msg: string): never {
  process.stderr.write(`[verify:mcp] FAIL — ${msg}\n`);
  process.exit(1);
}

async function listTools(spec: ServerSpec): Promise<string[]> {
  if (!existsSync(spec.entry)) {
    fail(`${spec.entry} missing — run \`npm run build\` first.`);
  }

  const child = spawn("node", [spec.entry], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  const initialize = {
    jsonrpc: "2.0" as const,
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "verify-mcp", version: "0.1.0" },
    },
  };
  const initialized = {
    jsonrpc: "2.0" as const,
    method: "notifications/initialized",
    params: {},
  };
  const listRequest = {
    jsonrpc: "2.0" as const,
    id: 2,
    method: "tools/list",
    params: {},
  };

  child.stdin.write(JSON.stringify(initialize) + "\n");
  child.stdin.write(JSON.stringify(initialized) + "\n");
  child.stdin.write(JSON.stringify(listRequest) + "\n");

  const buffer: string[] = [];
  return await new Promise<string[]>((resolveP, rejectP) => {
    const timer = setTimeout(() => {
      child.kill();
      rejectP(new Error(`timeout waiting for ${spec.name} tools/list`));
    }, 10_000);

    child.stdout.on("data", (chunk: Buffer) => {
      buffer.push(chunk.toString("utf8"));
      const joined = buffer.join("");
      for (const line of joined.split("\n")) {
        if (!line.trim()) continue;
        let msg: any;
        try {
          msg = JSON.parse(line);
        } catch {
          continue;
        }
        if (msg.id === 2 && msg.result?.tools) {
          clearTimeout(timer);
          child.kill();
          resolveP(msg.result.tools.map((t: { name: string }) => t.name));
          return;
        }
      }
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      rejectP(err);
    });
  });
}

const updateMode = process.argv.includes("--update");
const manifest: Record<string, string[]> = updateMode
  ? {}
  : (JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Record<string, string[]>);

let allOk = true;
for (const spec of SERVERS) {
  try {
    const tools = (await listTools(spec)).sort();
    if (updateMode) {
      manifest[spec.name] = tools;
      process.stdout.write(`[verify:mcp] manifest — ${spec.name}: ${tools.length} tools\n`);
      continue;
    }
    const expected = manifest[spec.name] ?? [];
    const missing = expected.filter((t) => !tools.includes(t));
    const unexpected = tools.filter((t) => !expected.includes(t));
    if (missing.length > 0 || unexpected.length > 0) {
      process.stderr.write(
        `[verify:mcp] FAIL — ${spec.name}: tool surface drifted` +
          (missing.length > 0 ? `; missing: ${missing.join(", ")}` : "") +
          (unexpected.length > 0 ? `; unexpected: ${unexpected.join(", ")}` : "") +
          ` — if intentional, run \`tsx scripts/verify.ts --update\`\n`
      );
      allOk = false;
    } else {
      process.stdout.write(
        `[verify:mcp] OK — ${spec.name} exposes ${tools.length} tools\n`
      );
    }
  } catch (err) {
    process.stderr.write(`[verify:mcp] FAIL — ${spec.name}: ${(err as Error).message}\n`);
    allOk = false;
  }
}

if (updateMode) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  process.stdout.write(`[verify:mcp] wrote ${MANIFEST_PATH}\n`);
  process.exit(0);
}
if (!allOk) process.exit(1);
process.stdout.write("[verify:mcp] OK — both stdio servers passed tools/list\n");
