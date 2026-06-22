# Coworkers — product vision & roadmap

> Simulate launching **coworkers** as an operator product: an **iOS 27 app** + three web surfaces + a
> self-hosted managed-agents control plane, multi-LLM (1p Anthropic now → 3p later). Built on the
> architecture this repo already ships (managers → coworkers → teams → subagents, over e2m). Grounded in
> the operator's uploaded prototypes.
>
> @cite cowork/standards/agent-hierarchy.md, operator-routing.md, cowork-platform-facts.md
> @cite uploads: open-managed-agents (managed-coworkers.zip), agent-native, ClaudeForFoundationModels, claude-cowork-linux
> @cite https://apps.apple.com/us/app/claude-by-anthropic/id6473753684 · https://claude.com/download · https://www.google.com/chrome/canary

## Thesis — fill the gaps of Claude's chat apps

Claude's **iOS app** (id6473753684) and **desktop app** (claude.com/download) are chat-first; Cowork adds
agentic work but is desktop-only and single-operator-per-session. **Coworkers** is the missing layer: your
agentic *startup* — managers, coworkers, teams, subagents — operable from anywhere, self-hosted, multi-LLM.

| capability | Claude iOS app | Claude desktop (Cowork) | MS Scout | **coworkers** |
| :-- | :--: | :--: | :--: | :--: |
| chat | ✓ | ✓ | ✓ | ✓ |
| agentic tasks | — | ✓ (desktop only) | ✓ | ✓ (iOS + web + desktop) |
| multi-agent org (managers/teams) | — | — | — | ✓ (e2m hierarchy) |
| self-hosted / multi-LLM | — | — | — | ✓ (1p→3p) |
| operate from phone | chat only | — | ✓ | ✓ (iOS 27 app) |

## Surfaces

```yaml
ios_app:          # the gap-filler — operate your coworkers from iOS 27
  basis: "ClaudeForFoundationModels (Swift; iOS/macOS/visionOS/watchOS 27.0)"
  rendering: "swift-markdown + Textual (swift-markdown-ui successor) — render agent .md natively"
  role: "operator inbox + dispatch + morning summary on the phone — what Claude's chat-only iOS app lacks"
  client: "Chrome Canary for the web companion; native SwiftUI for the app"
web_surfaces:     # frontend/ — Cloudflare Workers, Chrome-Canary-optimized
  cowork.subagentknowledge.com:     "the cowork/ application dashboard (frontend/cowork-worker)"
  coworkers.subagentknowledge.com:  "the coworker directory + protocol matrix (frontend/coworkers-worker)"
  workspaces.subagentknowledge.com: "NEW — self-hosted managed-coworkers control plane (open-managed-agents)"
deploy:
  runtime: "Cloudflare Workers"
  toolchain: "wrangler (build/deploy) + miniflare (local test) — per the uploaded CF docs"
```

## Building blocks (uploads → where they fit)

```yaml
open-managed-agents:        # managed-coworkers.zip → workspaces.subagentknowledge.com
  what: "self-hosted agent-management platform; multi-LLM; per-team governance; data-engineer agent (Rust + cube SQL); AGPL v3"
  fit:  "the workspaces control plane; its cube SQL models align with our e2m-OKF semantic layer; multi-LLM = our 1p→3p gateway"
agent-native:               # → frontend/ app architecture
  what: "framework for agentic apps you own; agent + UI share one DB/state; CRDT multiplayer; per-user workspace (skills/memory/subagents/MCP); agents-call-agents over A2A"
  fit:  "the UI↔agent sync model for all three surfaces + the live-artifacts tab; its A2A = our a2a protocol"
ClaudeForFoundationModels:  # → the iOS 27 app
  what: "Swift package, iOS/macOS 27; ClaudeAPI sources (ClaudeClient, Messages, SSE)"
  fit:  "the app's model layer — .proxied to our relay, OR baseURL → Tailscale Ollama (ollama/AUTH-LANES.md)"
swift_markdown_textual:     # → iOS rendering
  fit:  "render agent .md output natively (CommonMark; e2m doc §4 markdown_substrate)"
claude-cowork-linux:        # → Linux / 3p
  fit:  "Cowork on Linux/WSL2 — the 3p + headless story (agent-hierarchy provider-portability)"
```

## Roadmap as outcomes (dogfooding the manager tier)

Each phase is an **outcome** the operator dispatches to a manager (operator-routing.md) — not a task list.
The 400-file multi-agent branch is Phase 0's input.

```yaml
phase_0_consolidate:   # the 400-file branch
  outcome: "land the multi-agent branch — green verify, no schema/token drift"
  owner: "project-manager (router) → engineering-manager → engineering-subagents"
phase_1_workspaces:    # → workspaces.subagentknowledge.com
  outcome: "stand up the workspaces control plane from open-managed-agents (self-hosted, multi-LLM, per-team)"
  owner: "project-manager → product-manager + engineering-manager + data-manager"
phase_2_deploy:        # cloudflare
  outcome: "deploy the 3 surfaces as Workers; wrangler CI + miniflare tests green"
  owner: "operations-manager"
phase_3_ios:           # the gap-filler
  outcome: "operator iOS 27 app — inbox / dispatch / morning-summary; CFM + swift-markdown; .proxied or local"
  owner: "product-manager → engineering-manager (swift subagents)"
phase_4_agent_native:  # UI↔agent sync
  outcome: "wire agent-native UI↔agent sync into frontend/ + the live-artifacts tab"
  owner: "design-manager + engineering-manager"
phase_5_3p:            # scale
  outcome: "3p rollout — Bedrock / Vertex / Foundry via the gateway; Linux via claude-cowork-linux"
  owner: "project-manager + finance-manager (cost) + compliance-manager (OTel monitoring)"
```

## Foundation already shipped (this session)

e2m protocol + canon; the four-tier hierarchy (managers / coworkers / teams / subagents); 12 managers + the
operator router; e2m-OKF; the session-memory skill + live artifacts; `ollama/AUTH-LANES` (1p / local /
on-device / 3p); provider portability; durability (OTel → Sentry → iMessage); the support-claude-sitemap
crawler; the support-claude-docs `.mcpb`. The roadmap sequences the remaining surfaces on top.

## Open / needs operator input

- The request was **truncated** ("i want to turn …") — confirm the next build before I start it.
- `open-managed-agents` is **AGPL v3** — confirm the license posture before basing a commercial surface on it.
- Cloudflare deploy + the iOS app signing need operator-provided account/secrets — out of scope for autonomous setup.
