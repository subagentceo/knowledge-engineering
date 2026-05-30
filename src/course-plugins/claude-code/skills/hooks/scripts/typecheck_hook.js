#!/usr/bin/env node
// Post-tool-use hook: run `tsc --no-emit` after a TypeScript edit and feed any
// type errors back to Claude so it fixes call sites it just changed.
//
// Wire up with a matcher for the edit tool(s) and command
// "node ./hooks/typecheck_hook.js". Post-tool-use cannot block the edit that
// already happened; exit 2 surfaces the type errors as feedback for the next turn.
//
// Adapt with a test command for untyped languages.

const { execFileSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const path = require("node:path");

// Walk up from the edited file to the nearest dir containing a tsconfig.json.
// Returns null if none is found (e.g. a stray .ts outside any TS project) — in a
// monorepo this pins tsc to the right package instead of the repo root.
function findProjectDir(filePath) {
  let dir = path.dirname(path.resolve(filePath));
  const root = path.parse(dir).root;
  while (true) {
    if (existsSync(path.join(dir, "tsconfig.json"))) return dir;
    if (dir === root) return null;
    dir = path.dirname(dir);
  }
}

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const filePath =
    input?.tool_input?.file_path ?? input?.tool_input?.path ?? "";

  // Only run on TypeScript edits.
  if (!/\.tsx?$/.test(filePath)) process.exit(0);

  // No tsconfig above the file → not part of a TS project; don't typecheck the
  // wrong root (or trigger an npx auto-install of a transient tsc). Fail open.
  const projectDir = findProjectDir(filePath);
  if (!projectDir) process.exit(0);

  try {
    // cwd-pinned to the file's package so tsc uses that project's tsconfig, not
    // whatever root Claude Code invoked the hook from. --noEmit honors tsconfig.
    execFileSync("npx", ["--no-install", "tsc", "--noEmit"], {
      cwd: projectDir,
      stdio: "pipe",
    });
    process.exit(0); // clean — nothing to feed back
  } catch (err) {
    const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
    // If tsc isn't installed in this project, --no-install makes npx fail with no
    // tsc output. Don't surface that as a type error — fail open instead.
    if (!out || /could not determine executable|not found/i.test(out)) {
      process.exit(0);
    }
    // Report against the project, not "${filePath}" — the errors may be anywhere
    // in the package, not necessarily the edited file.
    console.error(
      `Type errors in ${path.relative(process.cwd(), projectDir) || "."} ` +
        `(after editing ${filePath}):\n${out}`
    );
    process.exit(2); // surface errors back to Claude
  }
});
