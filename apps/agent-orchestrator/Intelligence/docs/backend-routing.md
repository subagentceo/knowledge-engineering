# Backend routing — where a request actually goes

Thinking context for how the orchestrator's Claude-backed features choose a
backend, **with each load-bearing claim marked verified or unverified**. Written
after reading the real `anthropics/ClaudeForFoundationModels` source at commit
`f47c8aa` (`ClaudeLanguageModel.swift`, `AuthMode.swift`, `ClaudeExecutor.swift`,
`RequestBuilder.swift`).

## Capture, not just routing (added 2026-06-19, operator-flagged)

These lanes aren't only about *where inference goes* — a gateway you control is a
**data-capture point**. Claude Desktop → Developer → **Configure Third-Party
Inference** sets a *Gateway base URL* + custom headers + credential kind; once set,
**every** Claude Desktop inference request/response flows through that gateway. If
the gateway is a Worker you run, you capture your own go-forward conversation data
with no Fivetran / Admin / Enterprise dependency. This is the live capture lane
(see `cowork/data/queues/data.jsonl`: "Build inference-gateway logger Worker").

Honest limits: it captures Claude **Desktop** traffic going forward — not your
historical claude.ai web/mobile chats (those still need the Settings → Export
data download), and not retroactively. And "Credential kind" selects the source
with *no fallback*, so whether you keep hitting real Claude on your Max plan vs.
needing an API key vs. a local model **depends on the forward target and is not
yet verified** (queued: "VERIFY gateway mode interacts with the Max subscription").

## The core distinction (this is the part people get wrong)

Two things that sound similar but are not:

1. **Feeding a subscription OAuth token into an unofficial app** — out of bounds.
   This is the thing we said no to previously. Not in scope here.
2. **Pointing an *official* client at a different backend via a documented
   environment variable / `baseURL`** — fully supported. No Anthropic call
   happens for those requests, so the subscription/billing question is sidestepped
   entirely.

Everything below is case 2.

## The lanes

| Lane | Client | Backend | Anthropic usage | Status |
|---|---|---|---|---|
| A | Claude Code (subscription) | api.anthropic.com | yes — real Claude | established |
| B | Claude Code, `ANTHROPIC_BASE_URL=http://localhost:11434` | local Ollama | **none** | established (documented env var) |
| C | `ClaudeForFoundationModels`, default `baseURL` | api.anthropic.com | yes | **verified** from source |
| D | `ClaudeForFoundationModels`, `baseURL` → local Ollama | local Ollama | none | **EXPERIMENT — unverified, likely to break.** See below. |

Lanes A/B are backend *switches*, not augmentation: each session goes wholly to
one backend depending on the env var. Across a workflow you use both —
subscription-Claude for hard tasks, local models for cheap/offline/private ones.
That is exactly the fallback pattern in the `ollama-healthcheck` script (§9).

## What is verified about lane C (and why D is shaky)

Read directly from `RequestBuilder.build(...)` and `ClaudeExecutor`:

**Verified — `baseURL` and auth are overridable:**
- `ClaudeLanguageModel.defaultBaseURL == https://api.anthropic.com`; the `init`
  takes any `baseURL`.
- `.apiKey(key)` → `x-api-key` header sent to that `baseURL`. Empty key throws
  `ClaudeError.missingCredential`.
- `.proxied(headers:)` → `auth = .none` at the client, your `headers` forwarded
  verbatim. So a non-empty placeholder key, OR `.proxied`, will deliver a request
  to a local server that ignores auth.

**Why lane D (Ollama) is unverified and probably won't "just work":**
`RequestBuilder` emits a strict **Anthropic Messages API** request, not a generic
one. Specifically it always sets:
- `model: model.id` — a *real Claude ID* like `claude-sonnet-4-6`. A local server
  must accept that exact id (Ollama would 404/400 on an unknown model).
- `stream: true` — always. The client parses Anthropic's **SSE event sequence**
  via `EventTranslator`; the local server must reproduce that byte shape.
- `output_config.effort`, `thinking: .adaptive`, `cache_control`, and an
  Anthropic-strict sanitized JSON schema (`additionalProperties:false`, only the
  allowed key set). A non-Anthropic server may reject or mishandle these.

So lane D requires the local endpoint to be a *high-fidelity* Anthropic Messages
emulator (correct model-id acceptance + exact SSE events + tolerance of
`output_config`/`thinking`/`cache_control`). Ollama's Anthropic-compatibility
shim is **not known to meet that bar**. Treat lane D as an experiment to test
end-to-end, not a fact.

### If you want to try lane D anyway

```swift
// EXPERIMENTAL. Verify against your local server before relying on it.
let model = ClaudeLanguageModel(
  name: .sonnet4_6,                               // sent as the literal model id
  auth: .apiKey("ollama"),                        // ignored by Ollama; must be non-empty
  baseURL: URL(string: "http://<tailscale-host>:11434")!
)
```

Test plan before trusting it: one non-streaming-looking `respond(to:)` call, then
confirm (a) the server accepted the `claude-sonnet-4-6` model id, (b) it returned
Anthropic SSE events `EventTranslator` can parse, (c) it didn't 400 on
`output_config`/`thinking`. If any fail, lane D is closed for that server.

## The safe local lane

Apple's **on-device Foundation Models** (the framework's *own* model, not Claude
through it) are free, require no network or credentials, and need no baseURL
tricks. That is the dependable "local AI in the Apple framework" path. Lane D only
matters if you specifically want a *larger* local model (e.g. via Ollama) behind
the same `LanguageModelSession` API.

## OAuth-only invariant interaction

This chassis never sets `ANTHROPIC_API_KEY` (repo `CLAUDE.md`). That governs lane
C: we default the bridge to `.proxied`, not `.apiKey`. Lane D's placeholder-key
form uses `.apiKey("ollama")` — acceptable *only* because the value is a non-secret
literal that never reaches Anthropic (the request goes to localhost). It is still
gated behind the experiment caveat above.
