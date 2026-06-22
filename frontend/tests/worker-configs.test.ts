// @cite .github/workflows/e2m-unblock.yml (deploy-workers matrix)
// @cite frontend/{worker}/wrangler.jsonc
import { strict as assert } from "node:assert";
import { describe, test } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");

const CI_MATRIX_WORKERS = [
  "agent-inbox-worker",
  "mail-worker",
  "calendar-worker",
  "cowork-worker",
  "coworkers-worker",
];

function readJsonc(path: string): Record<string, unknown> {
  const raw = readFileSync(path, "utf8");
  const stripped = raw.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  return JSON.parse(stripped);
}

describe("worker wrangler configs", () => {
  for (const worker of CI_MATRIX_WORKERS) {
    describe(worker, () => {
      const wranglerPath = join(ROOT, worker, "wrangler.jsonc");
      const srcDir = join(ROOT, worker, "src");

      test("wrangler.jsonc exists", () => {
        assert.ok(existsSync(wranglerPath), `missing ${wranglerPath}`);
      });

      test("has valid JSON (stripped comments)", () => {
        const config = readJsonc(wranglerPath);
        assert.ok(config.name, "missing name");
        assert.ok(config.main, "missing main");
      });

      test("main entrypoint file exists", () => {
        const config = readJsonc(wranglerPath);
        const mainFile = join(ROOT, worker, config.main as string);
        assert.ok(existsSync(mainFile), `main entrypoint missing: ${mainFile}`);
      });

      test("uses correct account_id", () => {
        const config = readJsonc(wranglerPath);
        assert.equal(config.account_id, "e6294e3ea89f8207af387d459824aaae");
      });

      test("has nodejs_compat flag", () => {
        const config = readJsonc(wranglerPath);
        const flags = config.compatibility_flags as string[] | undefined;
        assert.ok(flags?.includes("nodejs_compat"), "missing nodejs_compat");
      });

      test("package.json exists", () => {
        assert.ok(existsSync(join(ROOT, worker, "package.json")));
      });

      test("tsconfig.json exists", () => {
        assert.ok(existsSync(join(ROOT, worker, "tsconfig.json")));
      });
    });
  }
});

describe("cross-validation", () => {
  test("all CI matrix workers have src/ directory", () => {
    for (const w of CI_MATRIX_WORKERS) {
      assert.ok(existsSync(join(ROOT, w, "src")), `${w}/src missing`);
    }
  });

  test("no duplicate wrangler worker names", () => {
    const names = CI_MATRIX_WORKERS.map(w => {
      const config = readJsonc(join(ROOT, w, "wrangler.jsonc"));
      return config.name as string;
    });
    assert.equal(new Set(names).size, names.length, `duplicate names: ${names}`);
  });
});
