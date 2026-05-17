/**
 * Asserts the platform-engineering plugin ships a parseable
 * .lsp.json and monitors/monitors.json, with OAuth-only posture
 * and GoogleOSV-only invariants preserved.
 *
 * Outcome OPE7. Dogfoods the assertOAuthOnlyPosture() pattern from
 * src/lib/github-security-review.ts (OSL1) and the agentskills SKILL
 * shape from OPE3.
 *
 * @tdd red
 * @cite vendor/anthropics/code.claude.com/docs/en/plugins-reference.md
 * @cite vendor/anthropics/code.claude.com/docs/en/remote-control.md
 * @cite vendor/anthropics/code.claude.com/docs/en/routines.md
 * @cite docs/decisions/2026-05-16-osv-only-no-secret-scanning.md
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const PLUGIN_ROOT = resolve(REPO_ROOT, "plugins/platform-engineering");
const LSP_JSON = resolve(PLUGIN_ROOT, ".lsp.json");
const MONITORS_JSON = resolve(PLUGIN_ROOT, "monitors/monitors.json");

let passed = 0;
let failed = 0;
function check(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

console.log("platform-engineering-lsp:");

check(".lsp.json exists and parses with at least one active server", () => {
  if (!existsSync(LSP_JSON)) throw new Error(`missing ${LSP_JSON}`);
  const cfg = JSON.parse(readFileSync(LSP_JSON, "utf8"));
  if (!cfg.servers || typeof cfg.servers !== "object")
    throw new Error("missing servers map");
  const ids = Object.keys(cfg.servers);
  if (ids.length === 0) throw new Error("no servers declared");
  // Each server must have command + fileTypes
  for (const id of ids) {
    const s = cfg.servers[id];
    if (!s.command) throw new Error(`server ${id} missing command`);
    if (!Array.isArray(s.fileTypes) || s.fileTypes.length === 0)
      throw new Error(`server ${id} missing fileTypes`);
  }
});

check("monitors.json exists and parses with at least one monitor", () => {
  if (!existsSync(MONITORS_JSON)) throw new Error(`missing ${MONITORS_JSON}`);
  const cfg = JSON.parse(readFileSync(MONITORS_JSON, "utf8"));
  if (!Array.isArray(cfg.monitors) || cfg.monitors.length === 0)
    throw new Error("monitors array empty");
  for (const m of cfg.monitors) {
    if (!m.id) throw new Error("monitor missing id");
    if (!m.event) throw new Error(`monitor ${m.id} missing event`);
    if (!m.handler) throw new Error(`monitor ${m.id} missing handler`);
  }
});

check("monitors.json MUST NOT reference any forbidden secret_scanning_* flag (OSL1)", () => {
  const body = readFileSync(MONITORS_JSON, "utf8");
  const forbidden = [
    "secret_scanning",
    "secret_scanning_push_protection",
    "dependabot_security_updates",
  ];
  for (const f of forbidden) {
    if (body.includes(f))
      throw new Error(`monitors.json references forbidden flag '${f}' (per ADR OSL1)`);
  }
});

check("OAuth-only posture: ANTHROPIC_API_KEY must not appear anywhere in either JSON", () => {
  for (const p of [LSP_JSON, MONITORS_JSON]) {
    const body = readFileSync(p, "utf8");
    if (body.includes("ANTHROPIC_API_KEY"))
      throw new Error(`${p} references ANTHROPIC_API_KEY — chassis is OAuth-only`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
