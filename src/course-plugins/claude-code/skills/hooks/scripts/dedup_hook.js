#!/usr/bin/env node
// Post-tool-use hook: duplicate-code prevention.
//
// When the primary Claude edits a watched directory (e.g. queries/), launch a
// SEPARATE Claude instance via the Claude Code SDK to compare the new code
// against existing code. If the secondary Claude reports a duplicate, exit 2
// with feedback so the primary reuses the existing code instead.
//
// Watch only critical dirs to limit cost. See the `subagents` skill for the
// SDK-launch detail (read-only by default; same tools as the terminal version).

const { query } = require("@anthropic-ai/claude-code"); // Claude Code SDK

const WATCHED = ["queries/"];

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", async () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const filePath =
    input?.tool_input?.file_path ?? input?.tool_input?.path ?? "";

  if (!WATCHED.some((dir) => filePath.includes(dir))) process.exit(0);

  // Spawn a secondary, read-only Claude to check for duplication.
  let verdict = "";
  for await (const message of query({
    prompt:
      `A file under a watched directory was just edited: ${filePath}. ` +
      `Compare the new code against the existing code in that directory. ` +
      `If it duplicates logic that already exists, reply with a line starting ` +
      `"DUPLICATE:" followed by the path to reuse. Otherwise reply "OK".`,
    options: { allowedTools: ["Read", "Grep"] }, // read-only by default
  })) {
    if (message.type === "result") verdict = message.result ?? "";
  }

  // Block only on an explicit DUPLICATE signal. The old check `verdict !== "OK"`
  // treated any natural phrasing ("OK.", "OK — looks unique") as a duplicate and
  // blocked good edits. Match a clear positive signal instead of exact-"OK".
  if (/(^|\n)\s*DUPLICATE:/i.test(verdict)) {
    console.error(`Possible duplicate. Reuse existing code instead:\n${verdict}`);
    process.exit(2);
  }
  process.exit(0);
});
