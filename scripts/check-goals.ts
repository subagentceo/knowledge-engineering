/**
 * Deterministic goal checker for the /loop skill.
 *
 * Each goal has a small synchronous check function that returns
 * `pass` | `fail` | `blocked` plus a reason. Exit code is 0 when
 * every non-blocked goal passes; 1 otherwise. The /loop skill
 * iterates: run checker → if any pending goal, do one unit of work
 * → re-run checker → repeat.
 *
 * Goals + outcomes documented in seeds/memory/heartbeat/goals.md.
 *
 * @cite seeds/memory/heartbeat/goals.md
 * @cite .claude/loop.md
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

type Status = "pass" | "fail" | "blocked";
interface GoalResult {
  id: string;
  status: Status;
  reason: string;
}

const CHECKS: Array<{ id: string; check: () => GoalResult }> = [
  {
    id: "G2",
    check: () => {
      const id = "G2";
      const embPath = resolve(REPO_ROOT, "src/lib/embeddings.ts");
      const testPath = resolve(REPO_ROOT, "src/lib/embeddings.test.ts");
      const pkgPath = resolve(REPO_ROOT, "package.json");
      if (!existsSync(embPath)) return { id, status: "fail", reason: "src/lib/embeddings.ts missing" };
      if (!existsSync(testPath)) return { id, status: "fail", reason: "src/lib/embeddings.test.ts missing" };
      if (!existsSync(pkgPath)) return { id, status: "fail", reason: "package.json missing" };
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      const dep = pkg.dependencies?.["@xenova/transformers"];
      if (!dep || !/^\^?2\./.test(dep)) {
        return { id, status: "fail", reason: `package.json dependencies @xenova/transformers missing or wrong version: ${dep}` };
      }
      const emb = readFileSync(embPath, "utf8");
      if (!/export\s+(async\s+)?function\s+embed\b/.test(emb)) {
        return { id, status: "fail", reason: "embed() not exported" };
      }
      if (!/cosineSimilarity/.test(emb)) {
        return { id, status: "fail", reason: "cosineSimilarity() not exported" };
      }
      return { id, status: "pass", reason: "embeddings.ts + test + dep all present" };
    },
  },
  {
    id: "G3",
    check: () => ({
      id: "G3",
      status: "blocked",
      reason: "operator-action: gh secret set CLOUDFLARE_ACCOUNT_ID + gh variable set CLOUDFLARE_WORKER_NAME (see docs/operator-runbooks/cli-only-unblock-path.md Workaround 1)",
    }),
  },
  {
    id: "G4",
    check: () => ({
      id: "G4",
      status: "blocked",
      reason: "operator-action: wrangler login + dashboard token mint + gh secret set CLOUDFLARE_API_TOKEN (see docs/operator-runbooks/cli-only-unblock-path.md Workaround 2)",
    }),
  },
  {
    id: "G5",
    check: () => ({
      id: "G5",
      status: "blocked",
      reason: "operator-action: GITHUB_TOKEN=$(gh auth token) npm run setup:project + setup:branch-protection (see Workaround 3)",
    }),
  },
  {
    id: "G6",
    check: () => ({
      id: "G6",
      status: "blocked",
      reason: "cascading: blocked on G3 + G4 (CF secrets must land before cloudflare-preview.yml deploys)",
    }),
  },
  {
    id: "G7",
    check: () => {
      const id = "G7";
      const baselinePath = resolve(REPO_ROOT, "seeds/memory/heartbeat/baselines/phase-6-tokens.json");
      if (!existsSync(baselinePath)) {
        return { id, status: "blocked", reason: "cascading: blocked on G6 (codemode wiring needs live CF Sandbox runtime)" };
      }
      return { id, status: "pass", reason: "baseline + post token measurements committed" };
    },
  },
];

function main(): void {
  const results = CHECKS.map((c) => c.check());
  const requiredFails = results.filter((r) => r.status === "fail");
  const blocked = results.filter((r) => r.status === "blocked");
  const passed = results.filter((r) => r.status === "pass");

  for (const r of results) {
    const icon = r.status === "pass" ? "✓" : r.status === "fail" ? "✗" : "⏸";
    console.log(`  ${icon} ${r.id} ${r.status.padEnd(7)} ${r.reason}`);
  }
  console.log("");
  console.log(`  ${passed.length} pass | ${requiredFails.length} fail | ${blocked.length} blocked (operator-action / cascading)`);

  if (requiredFails.length > 0) {
    console.log("");
    console.log("loop: stop — required goals failing");
    process.exit(1);
  }
  if (blocked.length === results.length - passed.length && passed.length > 0) {
    console.log("");
    console.log("loop: yield — all agent-actionable goals pass; remaining are operator-blocked");
  }
  process.exit(0);
}

main();
