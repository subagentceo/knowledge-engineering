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

  try {
    execFileSync("npx", ["tsc", "--no-emit"], { stdio: "pipe" });
    process.exit(0); // clean — nothing to feed back
  } catch (err) {
    const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim();
    console.error(`Type errors after editing ${filePath}:\n${out}`);
    process.exit(2); // surface errors back to Claude
  }
});
