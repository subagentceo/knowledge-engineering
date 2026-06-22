# Cloudflare resource policy (normative)

> Scope: every Cloudflare resource in the startup's account(s). Owner: **operator** + **project-manager**.
> Status: **in force as of 2026-06-20.**

## The rule

1. **Created via `e2m-tf` — Terraform is the only creation path.** A resource is legitimate **iff it is in
   Terraform state**. Creating one by GUI (dashboard) or raw API (`curl`/ad-hoc script) is a violation and
   the compliance worker **kills it**. The single source of truth is `coworkers/organizations/github/e2m-tf`.
   The one-time bootstrap (resources created via API before this rule, incl. `compliance-worker` itself) is
   legitimate only after `terraform apply` runs `imports.tf` to adopt them into state — until then they are
   non-compliant. After that, every new resource goes through `terraform apply`, never the API or GUI.
2. **Secrets via `durable-vault-store`.** No plaintext secrets in code, Terraform state, or `wrangler secret
   put` by hand. Agents request a credential by key; an admin grants; the vault syncs it to the Worker as a
   secret binding (`apps/agent-native/.../sync-vault-to-app`). Reference by vault id only.
3. **Tagged.** Every taggable resource carries the **required tag set** (below) before it is considered
   live. Tags are declared in `resources.yaml` and applied with `tagging/apply_tags.py`.
4. **Has a defensive component.** Every addition ships with a safeguard that makes the rule
   self-enforcing — for this policy, `compliance/compliance-worker`.

A resource that is not in `e2m-tf` **or** is missing a required tag is **non-compliant** and must be fixed.

## The defensive component (safeguard)

`compliance/compliance-worker` (deployed, cron every 6h, **report-only until armed**) makes enforcement
deterministic: it scans live resources, flags anything **not in the `e2m-tf` allowlist** (created outside
Terraform), routes an e2m `escalate` envelope to the responsible **`*-manager`** (and emails them once Email
Sending is on), and acts per `MODE` — `report` → `quarantine` (reversible) → `kill` (gated on
`KILL_CONFIRM=yes`). The worker, its cron, and its bindings are themselves defined in `e2m-tf`. Rollout in
`compliance/PROCESS.md` (report → adopt via `cf-terraforming` → arm). **Principle: nothing is added without
its defensive counterpart.**

## Required tags (every taggable resource)

| key          | meaning                                  | example                    |
|--------------|------------------------------------------|----------------------------|
| `managed-by` | who owns the desired state               | `e2m-tf`                   |
| `app`        | the product surface                      | `mail`, `agent-inbox`      |
| `env`        | environment                              | `production`               |
| `e2m-plane`  | which plane of the architecture          | `frontend`, `email`, `data`|
| `domain`     | the brand domain                         | `subagentknowledge.com`    |
| `team`       | owning S-team function                   | `product`                  |

## Enforcement

- `tagging/apply_tags.py` reads `resources.yaml` and applies the declared tags (GET → merge → PUT).
- `tagging/verify_tags.py` fails if any inventoried resource is missing a required key — wire it into CI.
- New resource types added to `e2m-tf` must be added to `resources.yaml` in the same change.

## Known platform limits (Resource Tagging beta)

- **`email_routing_rule` is not a taggable type.** Cloudflare's supported list covers `worker`,
  `kv_namespace`, `zone`, `dns_record`, `worker_route`, etc. — not email routing rules. So the 4 role
  **addresses** cannot carry tags; their **infrastructure** (the `agent-inbox` worker + KV) does, and the
  rules are governed by being defined in `e2m-tf`.
- `PUT /tags` replaces all tags (no partial update) → the script always does GET-merge-PUT.
- Tagging needs a token with the **Tags** permission (Tag Admin). Worker/email tokens do not include it.
