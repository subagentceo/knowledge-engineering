# Compliance process (the defensive component)

> **Principle.** Every addition ships with a defensive component. For the Cloudflare resource policy
> (`../POLICY.md`), that component is `compliance-worker` — a deterministic safeguard that makes the
> e2m-tf architecture self-enforcing.

## The e2m-tf architecture (non-negotiable)

**Terraform is the only creation path.** A Cloudflare resource is legitimate **if and only if it is in
Terraform state** (`terraform.tfstate`, mapped from the `e2m-tf` config). If someone uses the dashboard
(GUI) or a raw API call (`curl`, an ad-hoc script) to create a resource, it is **not in state** → the
compliance worker **kills it**. There is no "create now, adopt later" — adoption is for the one-time
bootstrap below, not an ongoing escape hatch.

### Honest note on the bootstrap (this matters)

The current resources — `agent-inbox`, the 12 email rules, the KV, and **`compliance-worker` itself** — were
created through the **Cloudflare API**, not `terraform apply`. Under the rule above, **they are exactly what
the worker kills.** They become legitimate only after `e2m-tf` adopts them into state:

```bash
cd coworkers/organizations/github/e2m-tf
terraform init
terraform plan     # the import blocks (imports.tf) reconcile the bootstrap into state
terraform apply    # NOW these resources are terraform-managed; before this, they are non-compliant
```

After `apply`, **everything new goes through `terraform apply`** — never the API or GUI again.

## How the worker enforces (deterministic, every run)

1. **Scan.** Cron (`scheduled` handler, every 6h — see
   `vendor/cloudflare/.../workers/configuration/cron-triggers`) or on-demand `/scan`. List live resources.
2. **Detect.** The legitimate set = **`terraform state list`** (the allowlist is *generated* from state, not
   hand-written). Any live resource not in state = created outside Terraform = violation.
3. **Alert.** Route to the responsible `*-manager`; deliver an e2m `escalate` envelope to their inbox (and
   email `<manager>@subagentknowledge.com` once Email Sending is on). Each manager sees only their actions.
4. **Act per `MODE`:** `report` (default) → `quarantine` (reversible) → `kill` (delete the rogue resource;
   gated on `KILL_CONFIRM=yes`). This is the "manual GUI/API creation gets killed" behavior.

## Secrets come from `durable-vault-store` (agents handle secrets)

The worker needs `CF_API_TOKEN` (Workers Read to scan, Email Send to alert, Workers Edit to kill). It is a
[Workers secret](https://developers.cloudflare.com/workers/configuration/secrets/) (encrypted binding, read
via `env.CF_API_TOKEN`) — but we **do not** `wrangler secret put` it by hand. It is provisioned through
`durable-vault-store` (already set up; agents request, an admin grants, the value is synced to the Worker as
a secret binding). Reference by vault id only; the plaintext never appears in code, Terraform state, or chat.

```
agent  --request-->  durable-vault-store (credentialKey: CF_API_TOKEN, appId: compliance-worker)
admin  --approve-->  grant
vault  --sync----->  Worker secret binding env.CF_API_TOKEN     # apps/agent-native/.../sync-vault-to-app
```

Action handlers: `request-vault-secret`, `approve-vault-request`, `sync-vault-to-app` in
`apps/agent-native/packages/dispatch`. Vault model:
`.claude/skills/read-reference-managed-agents/references/vaults.md`.

## Safe rollout (don't kill the 44 pre-policy workers)

`report` → review drift → **adopt** legitimate resources into `e2m-tf` with `cf-terraforming`
(`generate`/`import`) + `terraform apply` → only then arm `quarantine`/`kill`. Bindings, cron, and the
secret are all defined in `e2m-tf`, so the safeguard is governed by the same rule it enforces.
