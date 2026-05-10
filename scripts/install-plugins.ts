// scripts/install-plugins.ts
//
// PR 4 scaffold. Reads .claude/plugins.json and reports the install state.
// Full materialization (shallow-clone the marketplace subtree into
// .claude/plugins/<name>/) lands in Phase 7. PR 4 ships the manifest +
// this reporter so the operator and reviewers can see which plugins are
// declared, which are `stage: planned` vs `stage: installed`, and what
// each plugin contributes.
//
// Wired as `npm run install:plugins`. In PR 4 this is read-only.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(REPO_ROOT, ".claude", "plugins.json");

interface Marketplace {
  name: string;
  repo: string;
  ref: string;
  comment?: string;
}

interface InstallEntry {
  kind: "event-listener" | "language-server" | "skill" | "mcp-server";
  name: string;
  implementation?: string;
  package?: string;
  marketplace?: string;
  stage?: "planned" | "installed";
  comment?: string;
}

interface Manifest {
  marketplaces: Marketplace[];
  install: InstallEntry[];
}

function load(): Manifest {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
}

export function reportInstallState(): { ok: boolean; manifest: Manifest } {
  const manifest = load();
  console.log("plugins manifest:");
  console.log("  marketplaces:");
  for (const m of manifest.marketplaces) {
    console.log(`    ${m.name.padEnd(16)} → ${m.repo}@${m.ref}`);
  }
  console.log("  install:");
  const byStage = { planned: 0, installed: 0 };
  for (const i of manifest.install) {
    const stage = i.stage ?? (i.implementation ? "installed" : "planned");
    byStage[stage] = (byStage[stage] ?? 0) + 1;
    const target = i.package ?? i.implementation ?? `${i.marketplace}/${i.name}`;
    console.log(`    [${stage.padEnd(9)}] ${i.kind.padEnd(15)} ${i.name.padEnd(20)} ← ${target}`);
  }
  console.log(`\nsummary: ${byStage.installed} installed, ${byStage.planned} planned`);
  console.log(`Full materialization implemented in Phase 7 — see scripts/install-plugins.ts`);
  return { ok: true, manifest };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  reportInstallState();
}
