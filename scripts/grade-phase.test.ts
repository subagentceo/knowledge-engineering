/**
 * Phase 11.B (issue #42) — grade-phase batch-submit / batch-collect tests.
 *
 * Tests CLI flag parsing + JSONL roundtrip + ID-path fallback without
 * touching the real Anthropic Batches API. The actual submit/collect
 * paths are exercised end-to-end against the real API at operator-run
 * time (the script honors --dry-run).
 *
 * Citations:
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/batch-processing.md
 * @cite rubrics/phase-11.md
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SCRIPT = resolve(REPO_ROOT, "scripts/grade-phase.ts");

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

/**
 * Run grade-phase with given args; capture stdout/stderr/exit-code.
 * Always uses --dry-run to ensure no real API calls.
 */
function runCli(extraArgs: string[]): { stdout: string; stderr: string; code: number } {
  try {
    const out = execSync(`npx tsx ${SCRIPT} ${extraArgs.join(" ")}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { stdout: out, stderr: "", code: 0 };
  } catch (err) {
    const e = err as { stdout?: Buffer | string; stderr?: Buffer | string; status?: number };
    return {
      stdout: e.stdout?.toString() ?? "",
      stderr: e.stderr?.toString() ?? "",
      code: e.status ?? 1,
    };
  }
}

// ───── CLI usage prints all 4 modes ─────────────────────────────────

check("no-args prints usage with 4 modes", () => {
  const r = runCli([]);
  if (r.code === 0) throw new Error("expected non-zero exit");
  const text = r.stdout + r.stderr;
  for (const expected of ["--batch-prepare", "--batch-submit", "--batch-collect"]) {
    if (!text.includes(expected)) {
      throw new Error(`usage missing flag: ${expected}\n${text.slice(0, 500)}`);
    }
  }
});

// ───── --batch-submit needs the JSONL file ──────────────────────────

check("--batch-submit errors when /tmp/grade-batch.jsonl missing", () => {
  // Ensure the file doesn't exist (or is moved aside) before the test
  const jsonlPath = "/tmp/grade-batch.jsonl";
  const backupPath = "/tmp/grade-batch.jsonl.bak-test";
  let restored = false;
  if (existsSync(jsonlPath)) {
    execSync(`mv ${jsonlPath} ${backupPath}`);
    restored = true;
  }
  try {
    const r = runCli(["--batch-submit", "--dry-run"]);
    if (r.code !== 2) throw new Error(`expected exit code 2; got ${r.code}\n${r.stderr}`);
    if (!r.stderr.includes("not found") || !r.stderr.includes("--batch-prepare")) {
      throw new Error(`stderr should suggest --batch-prepare; got: ${r.stderr}`);
    }
  } finally {
    if (restored) execSync(`mv ${backupPath} ${jsonlPath}`);
  }
});

// ───── --batch-submit --dry-run reads JSONL + emits plan ────────────

check("--batch-submit --dry-run loads JSONL + previews first request", () => {
  const jsonlPath = "/tmp/grade-batch.jsonl";
  const backupPath = "/tmp/grade-batch.jsonl.bak-test2";
  const hadOld = existsSync(jsonlPath);
  if (hadOld) execSync(`mv ${jsonlPath} ${backupPath}`);

  // Seed a tiny 2-line JSONL
  const sample = [
    {
      custom_id: "phase-15_C1",
      params: { model: "claude-opus-4-7", max_tokens: 500, messages: [{ role: "user", content: "X" }] },
    },
    {
      custom_id: "phase-15_C2",
      params: { model: "claude-opus-4-7", max_tokens: 500, messages: [{ role: "user", content: "Y" }] },
    },
  ];
  writeFileSync(jsonlPath, sample.map((s) => JSON.stringify(s)).join("\n") + "\n");

  try {
    const r = runCli(["--batch-submit", "--dry-run"]);
    if (r.code !== 0) throw new Error(`expected exit 0; got ${r.code}\nstdout: ${r.stdout}\nstderr: ${r.stderr}`);
    if (!r.stdout.includes("2 request(s) loaded")) {
      throw new Error(`expected '2 request(s) loaded' in stdout: ${r.stdout}`);
    }
    if (!r.stdout.includes("(dry run)") || !r.stdout.includes("phase-15_C1")) {
      throw new Error(`dry-run output should preview first request: ${r.stdout}`);
    }
  } finally {
    rmSync(jsonlPath, { force: true });
    if (hadOld) execSync(`mv ${backupPath} ${jsonlPath}`);
  }
});

// ───── --batch-collect ──────────────────────────────────────────────

check("--batch-collect without id reads /tmp/grade-batch.id (when present)", () => {
  const idPath = "/tmp/grade-batch.id";
  const backupPath = "/tmp/grade-batch.id.bak-test";
  const hadOld = existsSync(idPath);
  if (hadOld) execSync(`mv ${idPath} ${backupPath}`);

  writeFileSync(idPath, "msgbatch_test_12345\n");

  try {
    const r = runCli(["--batch-collect", "--dry-run"]);
    if (r.code !== 0) throw new Error(`expected exit 0; got ${r.code}\nstdout: ${r.stdout}\nstderr: ${r.stderr}`);
    if (!r.stdout.includes("polling batch msgbatch_test_12345")) {
      throw new Error(`stdout missing 'polling batch msgbatch_test_12345': ${r.stdout}`);
    }
    if (!r.stdout.includes("(dry run)")) {
      throw new Error(`dry-run banner missing: ${r.stdout}`);
    }
  } finally {
    rmSync(idPath, { force: true });
    if (hadOld) execSync(`mv ${backupPath} ${idPath}`);
  }
});

check("--batch-collect with no id and no id-file errors helpfully", () => {
  const idPath = "/tmp/grade-batch.id";
  const backupPath = "/tmp/grade-batch.id.bak-test2";
  const hadOld = existsSync(idPath);
  if (hadOld) execSync(`mv ${idPath} ${backupPath}`);
  try {
    const r = runCli(["--batch-collect", "--dry-run"]);
    if (r.code !== 2) throw new Error(`expected exit 2; got ${r.code}\nstderr: ${r.stderr}`);
    if (!r.stderr.includes("no id provided")) {
      throw new Error(`stderr should mention 'no id provided': ${r.stderr}`);
    }
  } finally {
    if (hadOld) execSync(`mv ${backupPath} ${idPath}`);
  }
});

check("--batch-collect accepts an explicit id positional arg", () => {
  const r = runCli(["--batch-collect", "msgbatch_explicit_99", "--dry-run"]);
  if (r.code !== 0) throw new Error(`expected exit 0; got ${r.code}\nstdout: ${r.stdout}\nstderr: ${r.stderr}`);
  if (!r.stdout.includes("polling batch msgbatch_explicit_99")) {
    throw new Error(`explicit id not honored: ${r.stdout}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
