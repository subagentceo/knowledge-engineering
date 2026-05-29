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

  const filePath =
    input?.tool_input?.file_path ?? input?.tool_input?.path ?? "";

  if (typeof filePath === "string" && filePath.includes(".env")) {
    console.error(
      `Blocked: ${filePath} looks like a secrets file (.env). Read it only if the user explicitly asks.`
    );
    process.exit(2); // block, feedback goes to Claude
  }

  process.exit(0); // allow
});
