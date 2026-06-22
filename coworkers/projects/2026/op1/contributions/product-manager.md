# product-manager — OP1 contribution: the Platform (agent applications)

> Product-manager's §4 initiative for the 2026 OP1: ship the gated **platform** of e2m-native agent
> applications on coworkers.subagentknowledge.com. Written as product-manager (product strategy);
> coordinated with project-manager (router) per `operator-routing.md`.
>
> @cite cowork/coworkers/operational-plan/ (the OP1) · operator-routing.md · agent-hierarchy.md
> @cite uploads: agent-native (templates) · cowork/artifacts/templates/ (the 12 we already have)

## Strategy — templates as e2m-native agent apps (reuse, don't re-scaffold)

The agent-native templates (mail, calendar, plan, content, dispatch, brain, analytics, assets, chat,
design, forms, slides) are the product surface of coworkers. We do **not** run
`npx @agent-native/core create …` — we already have all 12 as `cowork/artifacts/templates/*.html`. The
initiative is to **agent-wire** each over e2m and gate them behind the platform secret. **Flagship shipped:**
`cowork/artifacts/templates/mail-agent.html` (envelope = email, transition = reply, mailbox = inbox).

## SMART initiative (OP1 §4)

```yaml
initiative: "Platform — 12 e2m-native agent apps, gated, on coworkers.subagentknowledge.com"
owner: product-manager
baseline: "reuse cowork/artifacts/templates/* (already built); wire mail (done)"
incremental: "wire the remaining 11 via the generator pattern (like build_op.py)"
metric_impact: "operator runs all 12 apps from the gated platform; each dispatches via e2m"
dependencies:
  design-manager: "8-token compliance on each app"
  engineering-manager: "the agent-wiring (UI actions → e2m transitions)"
  project-manager: "routes operator asks to the right app / manager"
provider_lens: "apps are provider-agnostic — 1p now, 3p via the Configure-Third-Party-Inference gateway"
```

## The vault gate (operator action — NOT performed by the agent)

The platform is gated by a secret. Per the OAuth-only / no-plaintext posture — and agent-native's own
pattern of "keep secret values in the vault, grant apps credential refs":

```yaml
gate:
  ref: vlt_platform              # referenced everywhere; the plaintext lives only in the macOS Keychain
  operator_sets_it: "/durable-vault-store create vlt_platform --kind static_bearer --keychain"
  agents_use: "resolve by ref on macOS / the Tailscale tailnet; never read or store the value"
boundary: >-
  the agent (product-manager) does NOT generate or store the password — that is an operator action.
  handling secrets in plaintext is prohibited; the platform HTML references vlt_platform only.
```

## Calendar / OP coordination (with project-manager)

Today's calendar = create the 2026 OP. product-manager owns the product sections; project-manager (router)
rolls up and routes. The plan + calendar templates feed the OP1:

- `plan` template → the OP1 narrative (`operational-plan/`).
- `calendar` template → the cadence (WBR / MBR / QBR + the milestone calendar, `operating-cadence.md`).

product-manager dispatches the platform initiative as an e2m DurableTask to engineering-manager +
design-manager, evaluator = "12 apps gated + e2m-wired"; project-manager tracks it to green.

## Status

- ✓ `mail-agent.html` — flagship preview, e2m-native.
- ✓ `platform/index.html` — gated section, `vlt_platform` ref, 12-app grid + template mapping.
- ⏳ remaining 11 apps — wire via the generator pattern (next cycle).
- ⏳ `vlt_platform` — **operator** to set (the one command above).
