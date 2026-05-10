/**
 * Shared Anthropic SDK client for the example scripts.
 *
 * All examples must run OAuth-only:
 *   - `requireOAuth()` refuses to start if `ANTHROPIC_API_KEY` is set.
 *   - The SDK is initialized with `authToken` (Bearer) instead of `apiKey`,
 *     pulling the value from `CLAUDE_CODE_OAUTH_TOKEN`.
 *
 * Billing therefore stays on the Max-plan OAuth identity; no API key is ever
 * read or sent.
 */
import Anthropic from "@anthropic-ai/sdk";
import { requireOAuth } from "../oauth/token.js";

export const MODEL = "claude-opus-4-7";

export function client(): Anthropic {
  const auth = requireOAuth();
  if (!auth.token) {
    throw new Error(
      "[oauth-only] examples require CLAUDE_CODE_OAUTH_TOKEN; CLI session inheritance is not enough for direct SDK calls."
    );
  }
  return new Anthropic({ authToken: auth.token });
}
