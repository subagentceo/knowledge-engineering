# Useful hooks from the course

Two post-tool-use feedback loops demonstrated in *Claude Code in Action*.

## TypeScript type-checker (post-tool-use)

Run `tsc --no-emit` after TS edits; type errors are fed back so Claude fixes call sites it changed. Adapt with tests for untyped languages.

Runnable example: [`scripts/typecheck_hook.js`](../scripts/typecheck_hook.js).

## Duplicate-code prevention (post-tool-use)

On edits to a watched dir (e.g. `queries/`), launch a separate Claude instance via the SDK to compare against existing code; if it finds a duplicate, exit 2 with feedback so the original Claude reuses the existing code. Watch only critical dirs to limit cost.

Runnable example: [`scripts/dedup_hook.js`](../scripts/dedup_hook.js). See also the `subagents` skill for the SDK-launch detail behind this loop.
