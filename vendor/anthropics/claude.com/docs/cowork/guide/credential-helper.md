> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a credential helper

> Supply Claude with a short-lived API token by running an executable you provide.

A credential helper is an executable on the user's machine that prints an API token to stdout. Claude runs it whenever it needs a credential for the inference provider, caches the result for a configurable time, and re-runs it when the credential expires. Use a helper when your token comes from an internal secret broker, a CLI, or an SSO flow that the built-in interactive sign-in options don't cover.

## What the helper must do

Claude runs the executable at the configured path with no arguments and reads stdout. The exit code must be `0`. Anything written to stderr is logged for diagnostics but otherwise ignored.

Stdout must contain exactly one of the following, with no banners, prompts, or log lines mixed in.

* A single bare token. The whole trimmed stdout becomes the bearer token.
* A JSON object when per-request headers are needed:

  ```json theme={null}
  { "token": "...", "headers": { "X-Org-Route": "prod" } }
  ```

  Headers from the JSON object are merged over any static custom inference headers; the helper's value wins on conflict.

## When the helper runs

Claude sets the `CLAUDE_HELPER_CONTEXT` environment variable on every invocation so the script can decide whether interactive authentication (opening a browser, prompting for a device code) is appropriate.

| Value                 | Meaning                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `interactive`         | The user started a session and is present. Interactive sign-in is acceptable.                   |
| `mid-session-refresh` | A running session's credential expired. Prefer a silent refresh; the user is waiting on a turn. |
| `scheduled-task`      | A scheduled task started with no user present.                                                  |
| `setup-test`          | The setup UI's connection test.                                                                 |
| `background`          | A background probe or health check.                                                             |

A well-behaved helper should attempt its silent path (cached token, refresh-token grant) for any value other than `interactive`, and exit non-zero rather than block on user input when that path is exhausted. Claude treats a non-zero exit as a refresh failure and surfaces it to the user.

The legacy variable `CLAUDE_HELPER_MANUAL_RUN=1` is also set when `CLAUDE_HELPER_CONTEXT` is `setup-test` (the setup UI's connection-test button), for scripts written before the context variable existed. New scripts should branch on `CLAUDE_HELPER_CONTEXT` instead.

## Timeouts and caching

The helper's output is cached for `inferenceCredentialHelperTtlSec` seconds (default 3600). After expiry it re-runs at the next session start.

Each run is bounded by `inferenceCredentialHelperTimeoutSec` seconds (default 60, maximum 600). When Claude re-runs the helper to recover a session mid-turn (`CLAUDE_HELPER_CONTEXT=mid-session-refresh`), the timeout is additionally clamped to 20 seconds so a slow helper can't stall the turn. A helper's silent path should comfortably finish within that window.

## Turn off mid-session re-runs

By default, when a running session's credential is rejected, Claude re-runs the helper with `CLAUDE_HELPER_CONTEXT=mid-session-refresh` to recover without interrupting the user. If your helper can't run safely outside the `interactive` context, set `inferenceCredentialHelperSilentRefreshEnabled` to `false`. Claude then keeps the cached credential until the next session start and surfaces an expiry prompt instead of re-running the helper mid-session.
