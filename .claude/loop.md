# Default /loop maintenance prompt

When `/loop` is invoked without a prompt, run this autonomous check:

1. Re-fetch every docs URL cited in the active plan via
   `src/lib/docs-fetch.ts` and refresh `last_fetched`.
2. If any source has changed since the last iteration, mark the
   corresponding lane todo `pending` again and stop the loop.
3. Otherwise, append a one-line heartbeat to `docs/session-artifact.md`:
   `loop tick <iso-timestamp> — no source drift`.
4. Exit cleanly so the next iteration can start fresh.
