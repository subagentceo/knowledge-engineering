/**
 * OAuth-only auth gate.
 *
 * This stack refuses to fall back to API-key auth. Either:
 *   - `CLAUDE_CODE_OAUTH_TOKEN` is set (mint via `claude setup-token`), or
 *   - the running `claude` CLI has an active OAuth session and the SDK
 *     inherits it.
 *
 * `ANTHROPIC_API_KEY` being present is treated as a configuration error so
 * that no caller can accidentally bypass OAuth by exporting a key.
 */
export interface OAuthEnv {
  token: string;
  source: "env" | "cli-session";
}

/**
 * Strict subset of the gate: refuse to run if `ANTHROPIC_API_KEY` is set.
 *
 * Use this in modules that don't themselves need a token (e.g. the planner)
 * but must guarantee billing stays on the OAuth identity.
 */
export function assertOAuthOnly(): void {
  if (process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "[oauth-only] ANTHROPIC_API_KEY is set. This stack is OAuth-only. " +
        "Unset ANTHROPIC_API_KEY before running."
    );
  }
}

export function requireOAuth(): OAuthEnv {
  assertOAuthOnly();

  const envToken = process.env.CLAUDE_CODE_OAUTH_TOKEN;
  if (envToken && envToken.length > 0) {
    return { token: envToken, source: "env" };
  }

  // The Claude Agent SDK can also pick up an interactive `claude` CLI session.
  // If neither is present we fail loud.
  if (process.env.CLAUDE_CODE_SESSION_INHERIT === "1") {
    return { token: "", source: "cli-session" };
  }

  throw new Error(
    "[oauth-only] No OAuth token. Set CLAUDE_CODE_OAUTH_TOKEN " +
      "(`claude setup-token`) or CLAUDE_CODE_SESSION_INHERIT=1 to use the " +
      "active CLI session."
  );
}
