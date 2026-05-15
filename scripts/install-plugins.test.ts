/**
 * Phase 7.B (issue #41) — install-plugins materializer tests.
 *
 * The materializer is tested via dependency injection (mocked runGit +
 * runCopy) so the test doesn't touch the network or filesystem. The
 * actual git ls-remote / clone / sparse-checkout commands are recorded
 * and asserted against the expected shell shape.
 *
 * Citations:
 * @cite vendor/anthropics/claude.com/docs/cowork/guide/plugins.md
 * @cite rubrics/phase-7.md
 */

import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { materializePlugin, type InstallEntry, type Manifest } from "./install-plugins.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

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

const MOCK_SHA = "a".repeat(40);

const MOCK_MANIFEST: Manifest = {
  marketplaces: [
    { name: "official", repo: "anthropics/claude-plugins-official", ref: "main" },
    { name: "community", repo: "anthropics/claude-plugins-community", ref: "main" },
  ],
  install: [],
};

function makeMockRunner() {
  const calls: string[] = [];
  const runGit = (cmd: string, _cwd?: string): string => {
    calls.push(cmd);
    if (cmd.startsWith("git ls-remote")) {
      return `${MOCK_SHA}\trefs/heads/main`;
    }
    return ""; // clone, sparse-checkout return nothing on stdout
  };
  return { calls, runGit };
}

// ───── materializePlugin: non-marketplace entry → null ────────────

check("materializePlugin returns null for non-marketplace entries", () => {
  const entry: InstallEntry = {
    kind: "skill",
    name: "heartbeat",
    implementation: ".claude/skills/heartbeat.md",
  };
  const result = materializePlugin(MOCK_MANIFEST, entry);
  if (result !== null) {
    throw new Error(`expected null for skill entry; got ${JSON.stringify(result)}`);
  }
});

check("materializePlugin returns null when marketplace missing", () => {
  const entry: InstallEntry = {
    kind: "marketplace-plugin",
    name: "test",
    marketplace: "official",
    // plugin field missing
  };
  const result = materializePlugin(MOCK_MANIFEST, entry);
  if (result !== null) {
    throw new Error(`expected null when plugin field missing; got ${JSON.stringify(result)}`);
  }
});

// ───── materializePlugin: unknown marketplace throws ───────────────

check("materializePlugin throws for unknown marketplace", () => {
  const entry: InstallEntry = {
    kind: "marketplace-plugin",
    name: "test",
    marketplace: "nonexistent",
    plugin: "test-plugin",
  };
  let threw = false;
  try {
    materializePlugin(MOCK_MANIFEST, entry, { runGit: () => "" });
  } catch (err) {
    threw = true;
    if (!(err as Error).message.includes("unknown marketplace")) {
      throw new Error(`wrong error: ${(err as Error).message}`);
    }
  }
  if (!threw) throw new Error("expected throw");
});

// ───── materializePlugin: happy path ──────────────────────────────

check("materializePlugin issues correct git commands for new install", () => {
  const calls: string[] = [];
  // Smarter mock: when `git clone <repo> <dest>` is invoked, create the
  // dest dir + the plugin subdir so the later existsSync(srcPath) passes.
  const runGit = (cmd: string, _cwd?: string): string => {
    calls.push(cmd);
    if (cmd.startsWith("git ls-remote")) {
      return `${MOCK_SHA}\trefs/heads/main`;
    }
    if (cmd.startsWith("git clone")) {
      // Last argument is the clone destination
      const parts = cmd.split(/\s+/);
      const dest = parts[parts.length - 1];
      mkdirSync(resolve(dest, "mcp-server-dev"), { recursive: true });
      return "";
    }
    return "";
  };
  let copySrc = "";
  let copyDest = "";
  const runCopy = (from: string, to: string) => {
    copySrc = from;
    copyDest = to;
    mkdirSync(to, { recursive: true });
  };
  const entry: InstallEntry = {
    kind: "marketplace-plugin",
    name: "mcp-server-dev",
    marketplace: "official",
    plugin: "mcp-server-dev",
  };

  const result = materializePlugin(MOCK_MANIFEST, entry, { runGit, runCopy });

  if (!result) throw new Error("expected non-null result");
  if (result.status !== "installed") {
    throw new Error(`expected installed; got ${result.status}`);
  }
  if (result.sha !== MOCK_SHA) {
    throw new Error(`expected SHA ${MOCK_SHA}; got ${result.sha}`);
  }
  // Verify the git command sequence
  if (!calls.some((c) => c.includes("git ls-remote"))) {
    throw new Error("missing git ls-remote call");
  }
  if (!calls.some((c) => c.includes("git clone --depth 1 --filter=blob:none --sparse"))) {
    throw new Error("missing shallow blobless sparse clone");
  }
  if (!calls.some((c) => c.includes("git sparse-checkout set mcp-server-dev"))) {
    throw new Error("missing sparse-checkout set");
  }
  if (!copySrc.endsWith("mcp-server-dev")) {
    throw new Error(`unexpected copy source: ${copySrc}`);
  }
  if (!copyDest.endsWith("/.claude/plugins/mcp-server-dev")) {
    throw new Error(`unexpected copy destination: ${copyDest}`);
  }
});

// ───── materializePlugin: idempotency ─────────────────────────────

check("materializePlugin returns 'unchanged' when SHA matches existing .sha file", () => {
  // Setup: pre-populate .claude/plugins/test-plugin/.sha with MOCK_SHA
  const pluginsDir = resolve(REPO_ROOT, ".claude", "plugins");
  const pluginDir = resolve(pluginsDir, "test-plugin");
  mkdirSync(pluginDir, { recursive: true });
  writeFileSync(resolve(pluginDir, ".sha"), `${MOCK_SHA}\n`);

  const entry: InstallEntry = {
    kind: "marketplace-plugin",
    name: "test-plugin",
    marketplace: "official",
    plugin: "test-plugin",
  };

  const { runGit } = makeMockRunner();
  const runCopyCalls: number[] = [];
  const runCopy = () => {
    runCopyCalls.push(1);
  };

  try {
    const result = materializePlugin(MOCK_MANIFEST, entry, { runGit, runCopy });
    if (!result) throw new Error("expected non-null result");
    if (result.status !== "unchanged") {
      throw new Error(`expected unchanged; got ${result.status}`);
    }
    if (runCopyCalls.length > 0) {
      throw new Error("runCopy must not be called on idempotent re-install");
    }
  } finally {
    // Cleanup
    rmSync(pluginDir, { recursive: true, force: true });
  }
});

// ───── materializePlugin: invalid SHA from ls-remote throws ───────

check("materializePlugin throws when ls-remote returns unparseable output", () => {
  const runGit = (_cmd: string): string => "";
  const entry: InstallEntry = {
    kind: "marketplace-plugin",
    name: "test",
    marketplace: "official",
    plugin: "test-plugin",
  };
  let threw = false;
  try {
    materializePlugin(MOCK_MANIFEST, entry, { runGit, runCopy: () => {} });
  } catch (err) {
    threw = true;
    if (!(err as Error).message.includes("failed to resolve SHA")) {
      throw new Error(`wrong error: ${(err as Error).message}`);
    }
  }
  if (!threw) throw new Error("expected throw on unparseable ls-remote");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
