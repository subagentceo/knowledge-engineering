#!/usr/bin/env node
// Pre-tool-use hook: block reads/greps that touch a .env file.
//
// Wire up in a Claude settings file (e.g. .claude/settings.local.json) with
// matcher "read|grep" and command "node ./hooks/read_hook.js".
//
// Contract (see references/event-model.md):
//   - tool-call JSON arrives on stdin (session id, tool_name, tool input / file_path)
//   - exit 0 = allow, exit 2 = block (pre-tool-use only)
//   - on block, stderr is sent back to Claude as feedback

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    // Can't parse — fail open so we never wedge the session.
    process.exit(0);
  }

  // Inspect every field a read/grep might carry its target in: Read uses
  // file_path; Grep uses path/glob/pattern. Checking only file_path let a grep
  // over a directory containing a .env slip through (failed open).
  const targets = [
    input?.tool_input?.file_path,
    input?.tool_input?.path,
    input?.tool_input?.glob,
    input?.tool_input?.pattern,
  ].filter((t) => typeof t === "string");

  // Match `.env` as a real path segment (`.env`, `.env.local`, `a/.env`), not as
  // a substring — so `.includes(".env")` no longer blocks `.environment/` or
  // `dotenv.md`. Anchored to a path boundary on the left and `.`/end on the right.
  const ENV_FILE = /(^|\/)\.env(\.[^/]*)?$/;

  const hit = targets.find((t) => ENV_FILE.test(t));
  if (hit) {
    console.error(
      `Blocked: ${hit} looks like a secrets file (.env). Read it only if the user explicitly asks.`
    );
    process.exit(2); // block, feedback goes to Claude
  }

  process.exit(0); // allow
});
