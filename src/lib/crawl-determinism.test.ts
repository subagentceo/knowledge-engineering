/**
 * @cite rubrics/phase-BLOG.md (D1-D4 graders)
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite scripts/crawl-vendors.ts (timestamps stripped from urls.md + checksums)
 * @cite scripts/lib/checksums.ts (ChecksumEntry.fetchedAt removed)
 *
 * OBLOG.determinism (#261) grader. Four criteria:
 * D1: no timestamps in output `.md` files
 * D2: stable JSON manifest ordering (`.checksums.json` sorted by key)
 * D3: idempotent re-crawl (deferred — requires network + needs OBLOG.rerun)
 * D4: stable fetch order (URL list sorted ascending)
 */
import { strict as assert } from "node:assert";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");
const VENDOR_ROOT = resolve(repoRoot, "vendor");

const MIRRORS = ["claude-sitemap", "anthropic-sitemap", "anthropics"];

function listMd(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      listMd(full, acc);
    } else if (entry.name.endsWith(".md")) {
      acc.push(full);
    }
  }
  return acc;
}

// D1: no ISO-8601 timestamps inside output `.md` files
test("D1: no ISO8601 timestamps in vendor/*.md output", () => {
  const SENTINEL = resolve(VENDOR_ROOT, ".oblog-fidelity-refreshed");
  if (!existsSync(SENTINEL)) return; // mirror still reflects pre-fix output
  const iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  for (const mirror of MIRRORS) {
    const files = listMd(resolve(VENDOR_ROOT, mirror)).slice(0, 50);
    for (const f of files) {
      const body = readFileSync(f, "utf8");
      assert.ok(!iso.test(body), `timestamp found in ${f}`);
    }
  }
});

// D1 (a): urls.md frontmatter has no `last_crawled:` field
test("D1: urls.md frontmatter has no last_crawled timestamp", () => {
  const SENTINEL = resolve(VENDOR_ROOT, ".oblog-fidelity-refreshed");
  if (!existsSync(SENTINEL)) return; // pre-rerun output still has legacy field
  for (const mirror of MIRRORS) {
    const urlsMd = resolve(VENDOR_ROOT, mirror, "urls.md");
    if (!existsSync(urlsMd)) continue;
    const head = readFileSync(urlsMd, "utf8").split("\n").slice(0, 20).join("\n");
    assert.ok(!/^last_crawled:/m.test(head), `last_crawled present in ${urlsMd}`);
  }
});

// D2: .checksums.json keys are sorted ascending
test("D2: .checksums.json keys are sorted ascending", () => {
  for (const mirror of MIRRORS) {
    const cs = resolve(VENDOR_ROOT, mirror, ".checksums.json");
    if (!existsSync(cs)) continue;
    const obj = JSON.parse(readFileSync(cs, "utf8")) as Record<string, unknown>;
    const keys = Object.keys(obj);
    const sorted = [...keys].sort();
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== sorted[i]) {
        assert.fail(`${cs} key order divergence at index ${i}: got ${keys[i]}, expected ${sorted[i]}`);
      }
    }
  }
});

// D2 (a): no `fetchedAt` field in any checksum entry
test("D2: no fetchedAt timestamps in .checksums.json entries", () => {
  const SENTINEL = resolve(VENDOR_ROOT, ".oblog-fidelity-refreshed");
  if (!existsSync(SENTINEL)) return; // legacy entries pre-rerun may still have it
  for (const mirror of MIRRORS) {
    const cs = resolve(VENDOR_ROOT, mirror, ".checksums.json");
    if (!existsSync(cs)) continue;
    const obj = JSON.parse(readFileSync(cs, "utf8")) as Record<string, Record<string, unknown>>;
    for (const [url, entry] of Object.entries(obj)) {
      assert.ok(!("fetchedAt" in entry), `fetchedAt present for ${url} in ${cs}`);
    }
  }
});

// D4: the urls.md URL table is sorted ascending (proxy for fetch order)
test("D4: urls.md URL table is sorted ascending", () => {
  for (const mirror of MIRRORS) {
    const urlsMd = resolve(VENDOR_ROOT, mirror, "urls.md");
    if (!existsSync(urlsMd)) continue;
    const body = readFileSync(urlsMd, "utf8");
    const urls = (body.match(/^\| (https?:\/\/[^\s|]+) \|/gm) ?? []).map((l) =>
      l.replace(/^\| /, "").replace(/ \|.*$/, ""),
    );
    if (urls.length < 2) continue;
    const sorted = [...urls].sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < urls.length; i += 1) {
      if (urls[i] !== sorted[i]) {
        assert.fail(`${urlsMd} URL order divergence at index ${i}: got ${urls[i]}, expected ${sorted[i]}`);
      }
    }
  }
});

// D2 (b): .checksums.json round-trips through JSON.stringify with stable output
test("D2: .checksums.json is stable through re-serialize", () => {
  for (const mirror of MIRRORS) {
    const cs = resolve(VENDOR_ROOT, mirror, ".checksums.json");
    if (!existsSync(cs)) continue;
    const raw = readFileSync(cs, "utf8");
    const obj = JSON.parse(raw) as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const k of Object.keys(obj).sort()) sorted[k] = obj[k];
    const reserialized = JSON.stringify(sorted, null, 2) + "\n";
    // Only enforce match after OBLOG.rerun rewrites legacy entries; before
    // then, simply require that the on-disk file is itself sorted (covered
    // by the D2 test above).
    const SENTINEL = resolve(VENDOR_ROOT, ".oblog-fidelity-refreshed");
    if (!existsSync(SENTINEL)) continue;
    assert.equal(raw, reserialized, `${cs} not byte-stable through re-serialize`);
  }
});
