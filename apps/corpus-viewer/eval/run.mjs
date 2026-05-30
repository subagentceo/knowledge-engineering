#!/usr/bin/env node
// apps/corpus-viewer evaluation harness.
//
// Two sub-probes: swift-test (logic) → mac-screenshot (visual). Exits 0 iff all pass.
// Artifacts under eval/.last/. Pass criteria: ../RUBRIC.md.

import { execFileSync, spawnSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(here, "..");
const lastDir = resolve(here, ".last");
mkdirSync(lastDir, { recursive: true });

const args = new Set(process.argv.slice(2));
const only = [...args].filter((a) => !a.startsWith("--"));
const skipMac = args.has("--skip-mac");
const results = [];

function run(name, argv, opts = {}) {
  const r = spawnSync(argv[0], argv.slice(1), {
    cwd: opts.cwd ?? appDir,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  });
  return { stdout: r.stdout ?? "", stderr: r.stderr ?? "", status: r.status, signal: r.signal };
}

function ok(name, extra = {}) {
  results.push({ name, ok: true, ...extra });
  console.log(`[${name}] PASS`, extra.summary ? `— ${extra.summary}` : "");
}

function fail(name, error, extra = {}) {
  results.push({ name, ok: false, error, ...extra });
  console.error(`[${name}] FAIL — ${error}`);
}

function sleepMs(ms) {
  spawnSync("sleep", [(ms / 1000).toFixed(2)]);
}

// ───── swift-test ─────
async function swiftTest() {
  const t0 = Date.now();
  const r = run("swift-test", ["swift", "test", "--package-path", appDir]);
  const dt = Date.now() - t0;
  writeFileSync(resolve(lastDir, "swift-test-stdout.txt"), r.stdout);
  writeFileSync(resolve(lastDir, "swift-test-stderr.txt"), r.stderr);
  if (r.status !== 0) {
    fail("swift-test", `exit ${r.status} after ${dt}ms`, { durationMs: dt });
    return;
  }
  const m = /Executed (\d+) tests?, with (\d+) failures?/.exec(r.stdout);
  const passed = m ? Number(m[1]) - Number(m[2]) : 0;
  const failed = m ? Number(m[2]) : 0;
  if (failed > 0 || passed < 5) {
    fail("swift-test", `parsed ${passed} passed / ${failed} failed (expected ≥5 passed, 0 failed)`, { durationMs: dt });
    return;
  }
  ok("swift-test", { durationMs: dt, summary: `${passed}/${passed} passed in ${dt}ms` });
}

// ───── mac-screenshot ─────
async function macScreenshot() {
  if (skipMac) { console.log("[mac-screenshot] SKIP (--skip-mac)"); return; }
  const t0 = Date.now();

  const b = run("swift-build", ["swift", "build", "-c", "debug", "--product", "CorpusViewer", "--package-path", appDir]);
  writeFileSync(resolve(lastDir, "swift-build-stdout.txt"), b.stdout);
  writeFileSync(resolve(lastDir, "swift-build-stderr.txt"), b.stderr);
  if (b.status !== 0) {
    fail("mac-screenshot", `swift build exit ${b.status}`, { durationMs: Date.now() - t0 });
    return;
  }

  const binPath = resolve(appDir, ".build/debug/CorpusViewer");
  if (!existsSync(binPath)) {
    fail("mac-screenshot", `binary not at ${binPath}`);
    return;
  }

  const macPng = resolve(lastDir, "mac.png");
  const r = run("render", [binPath, "--render", macPng]);
  writeFileSync(resolve(lastDir, "render-stdout.txt"), r.stdout);
  writeFileSync(resolve(lastDir, "render-stderr.txt"), r.stderr);
  if (r.status !== 0 || !existsSync(macPng)) {
    fail("mac-screenshot", `headless render failed (exit ${r.status}); stderr: ${r.stderr.trim()}`, { durationMs: Date.now() - t0 });
    return;
  }
  const sz = statSync(macPng).size;
  if (sz < 50 * 1024) {
    fail("mac-screenshot", `mac.png too small: ${sz} bytes`, { durationMs: Date.now() - t0, pngBytes: sz });
    return;
  }
  ok("mac-screenshot", { durationMs: Date.now() - t0, summary: `${macPng} (${(sz / 1024).toFixed(0)} KB)`, pngBytes: sz });
}

const probes = [["swift-test", swiftTest], ["mac-screenshot", macScreenshot]];
const toRun = only.length === 0 ? probes : probes.filter(([n]) => only.includes(n));

const t0 = Date.now();
for (const [, fn] of toRun) { await fn(); }
const totalMs = Date.now() - t0;

const summary = {
  passed: results.filter((r) => r.ok).length,
  failed: results.filter((r) => !r.ok).length,
  total: results.length,
  totalMs,
  probes: results,
};
writeFileSync(resolve(lastDir, "summary.json"), JSON.stringify(summary, null, 2));

if (summary.failed === 0 && summary.passed >= toRun.length) {
  console.log(`\nPASS (${summary.passed}/${summary.total} probes, ${totalMs}ms)`);
  process.exit(0);
} else {
  console.error(`\nFAIL (${summary.failed}/${summary.total} probes failed, ${totalMs}ms)`);
  process.exit(1);
}
