/**
 * Programmatic PreToolUse hooks for the orchestrator.
 *
 * Wires runtime enforcement of the OAuth-only posture (`ANTHROPIC_API_KEY`
 * may not be exported) plus a small set of destructive-Bash patterns. This
 * supplements the startup-time gate at `src/oauth/token.ts` so a long-running
 * orchestrator turn can't be tricked into setting the key after the fact.
 *
 * The hook returns the Agent SDK's `SyncHookJSONOutput` shape:
 *   - {} → allow
 *   - { decision: "block", reason: "..." } → blocked; reason flows back to
 *     the model as the tool result.
 *
 * Extracted as a pure function for testability — the SDK invokes
 * `auditBashPreToolUse(input)` per call.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/claude-code-features.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/hooks.md
 * @cite seeds/posture/session-start.xml
 */

export interface BashToolInput {
  command?: string;
}

export interface BlockedDecision {
  decision: "block";
  reason: string;
}

export type HookDecision = BlockedDecision | Record<string, never>;

const FORBIDDEN_PATTERNS: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /\bANTHROPIC_API_KEY\b\s*=/,
    reason:
      "OAuth-only posture (seeds/posture/session-start.xml): ANTHROPIC_API_KEY must never be set. Use CLAUDE_CODE_OAUTH_TOKEN instead.",
  },
  {
    pattern: /\bexport\s+ANTHROPIC_API_KEY\b/,
    reason:
      "OAuth-only posture: refusing to export ANTHROPIC_API_KEY. The repo's chassis fails closed when this key is present.",
  },
  {
    pattern: /\brm\s+-rf\s+\/(?:\s|$)/,
    reason: "Refusing rm -rf on filesystem root.",
  },
  {
    pattern: /git\s+push\s+(?:--force|-f)\s+(?:\S+\s+)?(?:main|master)\b/,
    reason:
      "Refusing force-push to main/master. Open a fresh PR instead per docs/CONVENTIONS.md.",
  },
  {
    pattern: /git\s+(?:commit|push|rebase|merge)\s+(?:[^|]*\s+)?--no-verify\b/,
    reason:
      "Refusing --no-verify. Pre-commit hooks enforce the OAuth + citation + convention discipline.",
  },
];

export function auditBashCommand(command: string): HookDecision {
  for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
    if (pattern.test(command)) {
      return { decision: "block", reason };
    }
  }
  return {};
}

export function auditBashPreToolUse(input: {
  hook_event_name: string;
  tool_name?: string;
  tool_input?: unknown;
}): HookDecision {
  if (input.hook_event_name !== "PreToolUse") return {};
  if (input.tool_name !== "Bash") return {};
  const cmd = (input.tool_input as BashToolInput | undefined)?.command;
  if (typeof cmd !== "string" || cmd.length === 0) return {};
  return auditBashCommand(cmd);
}
