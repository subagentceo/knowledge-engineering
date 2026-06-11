/**
 * @cite vendor/anthropics/code.claude.com/docs/en/deep-links.md
 */
/**
 * Example: Deep links.
 *
 * Outcome: Build the two flavors of deep links the Claude surfaces accept:
 *   - `claude://` URI for Claude Code commands (registered by the desktop /
 *     CLI installs per `code.claude.com/docs/en/deep-links`).
 *   - `https://claude.ai/new?q=...` for prefilled chat on Claude.ai.
 *
 * Source: https://code.claude.com/docs/en/deep-links
 *
 * Run: npm run example:deep-links
 */
import { client, MODEL } from "./_client.js";

export type DeepLinkInput =
  | { kind: "claude-code"; command: string; args?: string }
  | { kind: "claude-chat"; q: string };

export function buildDeepLink(input: DeepLinkInput): string {
  if (input.kind === "claude-code") {
    const args = encodeURIComponent(input.args ?? "");
    return `claude://command/${input.command}?args=${args}`;
  }
  return `https://claude.ai/new?q=${encodeURIComponent(input.q)}`;
}

// Show the two link shapes locally — no model call needed.
const codeLink = buildDeepLink({
  kind: "claude-code",
  command: "review",
  args: "PR #1",
});
const chatLink = buildDeepLink({
  kind: "claude-chat",
  q: "Summarize @modelcontextprotocol/sdk v2 idioms",
});
process.stdout.write(`code: ${codeLink}\nchat: ${chatLink}\n`);

// Optional model turn that emits a deep link in its answer.
if (process.argv.includes("--with-model")) {
  const resp = await client().messages.create({
    model: MODEL,
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content:
          "Reply with one https://claude.ai/new?q=... deep link that prefills 'help me audit @anthropic-ai/claude-agent-sdk'. Output only the URL.",
      },
    ],
  });
  for (const block of resp.content) {
    if (block.type === "text") process.stdout.write(block.text + "\n");
  }
}
