/**
 * Token counting against the Anthropic Messages API.
 *
 * Wraps `client.messages.countTokens()` (OAuth-only) so callers can pre-flight
 * the cost of an orchestrator turn before paying for it. Used by the
 * `context-budget` CLI (scripts/context-budget.ts) and by per-test smoke
 * checks that assert seed sizes stay under their phase budget.
 *
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/token-counting.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/context-windows.md
 * @cite seeds/posture/session-start.xml
 */
import Anthropic from "@anthropic-ai/sdk";
import { requireOAuth } from "../oauth/token.js";

export const DEFAULT_MODEL = "claude-opus-4-7";

export interface CountTokensInput {
  system: string | Anthropic.Messages.TextBlockParam[];
  messages: Anthropic.Messages.MessageParam[];
  tools?: Anthropic.Messages.Tool[];
  model?: string;
}

export interface TokenCount {
  input_tokens: number;
  model: string;
}

export async function countTokens(input: CountTokensInput): Promise<TokenCount> {
  const auth = requireOAuth();
  if (!auth.token) {
    throw new Error("[oauth-only] countTokens requires CLAUDE_CODE_OAUTH_TOKEN");
  }
  const anthropic = new Anthropic({ authToken: auth.token });
  const model = input.model ?? DEFAULT_MODEL;
  const result = await anthropic.messages.countTokens({
    model,
    system: input.system as Anthropic.Messages.MessageCountTokensParams["system"],
    messages: input.messages,
    ...(input.tools ? { tools: input.tools } : {}),
  });
  return { input_tokens: result.input_tokens, model };
}
