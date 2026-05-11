# OpenFeature — citation extract

Source: `vendor/openfeature/openfeature.dev/docs/reference/intro.md` (mirrored 2026-05-11).

OpenFeature is a vendor-agnostic feature-flag specification + SDK family.
The chassis uses `@openfeature/server-sdk` on the agent side and
`@cloudflare/flagship` (when bound) as the production provider in the
Worker runtime.

Key concepts cited:

- **Provider** — the vendor-specific implementation that resolves flag values. Swappable. The SDK API is identical regardless of provider.
- **Client** — the consumer-facing surface. Application code calls `client.getStringValue(flagKey, default, context)` etc. — never touches the provider directly.
- **Evaluation Context** — per-call attributes (user id, geo, etc.) that the provider uses to resolve targeting rules. Optional.
- **Hooks** — middleware executed before/after each evaluation. Used for telemetry, fallbacks, A/B logging.

The chassis ships:
- `src/lib/openfeature.ts` — singleton client; default provider is `InMemoryProvider` seeded from `seeds/openfeature/local-flags.json`.
- `infra/cloudflare/src/worker.ts` — pre-evaluates flags via `env.FLAGSHIP.getStringValue(...)` and forwards the result into the Sandbox via `OPENFEATURE_<flag>` env overrides.

Why provider-side resolution in Worker, env-override in Sandbox: the
`@openfeature/server-sdk` package needs Node APIs that aren't available
in the Cloudflare Worker bundle. The Worker uses the native Flagship
binding directly; the agent (running in the Sandbox container) uses the
full SDK with InMemoryProvider + env overrides. Both paths yield the
same flag values.

Citation: vendor/openfeature/openfeature.dev/docs/reference/intro.md
Citation: vendor/openfeature/openfeature.dev/docs/reference/concepts/provider.md
Citation: rubrics/phase-13.md (O5)
