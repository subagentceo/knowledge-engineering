# Cloudflare Flagship — citation extract

Source: `vendor/cloudflare/developers.cloudflare.com/flagship/index.md` (mirrored 2026-05-11).

Cloudflare Flagship is Cloudflare's edge-evaluated feature flag service.
Designed for Workers: each flag is resolved at the request edge with
sub-millisecond latency, no external API call needed.

Architecture cited:

- **Apps** — top-level container. The chassis uses one app: `outcomesdk-chassis`.
- **Flags** — typed (boolean / string / number / object). The chassis declares one flag: `color-code` (string, 8 variations).
- **Variations** — the possible values a flag can resolve to. For `color-code`: red, blue, green, yellow, purple, orange, pink, cyan.
- **Targeting rules** — optional: condition-based variation selection. The chassis uses static defaults.

Bindings:

The Flagship binding is declared in `wrangler.jsonc` `flagship[]` block
(per `vendor/cloudflare/developers.cloudflare.com/flagship/configuration/index.md`):

```jsonc
"flagship": [{ "binding": "FLAGSHIP", "app_id": "<UUID>" }]
```

Worker code calls:

```ts
const value = await env.FLAGSHIP.getStringValue("color-code", "cyan");
```

No API token. No external service URL. The binding is a Worker-native
RPC into Cloudflare's edge eval cluster.

Operator setup: `docs/operator-runbooks/cf-flagship-setup.md`
(claude-in-chrome paste prompt, ~5 min one-time).

Citation: vendor/cloudflare/developers.cloudflare.com/flagship/index.md
Citation: vendor/cloudflare/developers.cloudflare.com/flagship/get-started/index.md
Citation: vendor/cloudflare/developers.cloudflare.com/flagship/binding/index.md
Citation: vendor/cloudflare/developers.cloudflare.com/flagship/configuration/index.md
Citation: rubrics/phase-13.md (O5)
