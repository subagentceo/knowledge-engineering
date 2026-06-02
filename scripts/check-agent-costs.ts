// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (AgentSessionCost schema)
// @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/

import { readFileSync } from "fs";

interface AgentSessionCost {
  session_id: string;
  model: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  pr_number?: number;
  branch?: string;
}

const REQUIRED_FIELDS: (keyof AgentSessionCost)[] = [
  "session_id",
  "model",
  "tokens_input",
  "tokens_output",
  "cost_usd",
];

function validateEntry(entry: unknown, index: number): entry is AgentSessionCost {
  if (typeof entry !== "object" || entry === null) {
    console.error(`Entry ${index}: not an object`);
    return false;
  }
  const obj = entry as Record<string, unknown>;
  let valid = true;
  for (const field of REQUIRED_FIELDS) {
    if (!(field in obj)) {
      console.error(`Entry ${index}: missing required field '${field}'`);
      valid = false;
    }
  }
  if (typeof obj.tokens_input !== "number" || obj.tokens_input < 0) {
    console.error(`Entry ${index}: tokens_input must be a non-negative number`);
    valid = false;
  }
  if (typeof obj.tokens_output !== "number" || obj.tokens_output < 0) {
    console.error(`Entry ${index}: tokens_output must be a non-negative number`);
    valid = false;
  }
  if (typeof obj.cost_usd !== "number" || obj.cost_usd < 0) {
    console.error(`Entry ${index}: cost_usd must be a non-negative number`);
    valid = false;
  }
  return valid;
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--skip")) {
    console.log("Cost gate skipped via --skip flag.");
    process.exit(0);
  }

  const artifactIdx = args.indexOf("--artifact-path");
  if (artifactIdx === -1 || !args[artifactIdx + 1]) {
    console.error("Usage: check-agent-costs.ts --artifact-path <path> | --skip");
    process.exit(1);
  }

  const artifactPath = args[artifactIdx + 1];
  let raw: string;
  try {
    raw = readFileSync(artifactPath, "utf8");
  } catch (err) {
    console.error(`Failed to read artifact at ${artifactPath}: ${err}`);
    process.exit(1);
  }

  let sessions: unknown[];
  try {
    sessions = JSON.parse(raw);
    if (!Array.isArray(sessions)) throw new Error("Expected a JSON array");
  } catch (err) {
    console.error(`Invalid JSON in artifact: ${err}`);
    process.exit(1);
  }

  if (sessions.length === 0) {
    console.error("agent-session-costs.json is empty. At least one session entry is required.");
    process.exit(1);
  }

  let allValid = true;
  for (let i = 0; i < sessions.length; i++) {
    if (!validateEntry(sessions[i], i)) allValid = false;
  }

  if (!allValid) {
    console.error("\nSchema validation failed. Fix the entries above and re-upload the artifact.");
    process.exit(1);
  }

  const valid = sessions as AgentSessionCost[];
  const totalCost = valid.reduce((s, e) => s + e.cost_usd, 0);
  const totalIn = valid.reduce((s, e) => s + e.tokens_input, 0);
  const totalOut = valid.reduce((s, e) => s + e.tokens_output, 0);

  const colWidths = { id: 24, model: 22, in: 12, out: 12, cost: 10 };
  const hr = `+${"-".repeat(colWidths.id + 2)}+${"-".repeat(colWidths.model + 2)}+${"-".repeat(colWidths.in + 2)}+${"-".repeat(colWidths.out + 2)}+${"-".repeat(colWidths.cost + 2)}+`;
  const row = (id: string, model: string, tin: string, tout: string, cost: string) =>
    `| ${id.padEnd(colWidths.id)} | ${model.padEnd(colWidths.model)} | ${tin.padStart(colWidths.in)} | ${tout.padStart(colWidths.out)} | ${cost.padStart(colWidths.cost)} |`;

  console.log("\nAgent Session Cost Summary");
  console.log(hr);
  console.log(row("session_id", "model", "tokens_in", "tokens_out", "cost_usd"));
  console.log(hr);
  for (const s of valid) {
    console.log(row(
      s.session_id.slice(0, colWidths.id),
      s.model.slice(0, colWidths.model),
      s.tokens_input.toLocaleString(),
      s.tokens_output.toLocaleString(),
      `$${s.cost_usd.toFixed(4)}`,
    ));
  }
  console.log(hr);
  console.log(row("TOTAL", "", totalIn.toLocaleString(), totalOut.toLocaleString(), `$${totalCost.toFixed(4)}`));
  console.log(hr);
  console.log(`\n${valid.length} session(s) validated. Total cost: $${totalCost.toFixed(4)} USD\n`);
}

main();
