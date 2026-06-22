# `e2m-tf`

Reusable **infrastructure as code** for the e2m agent plane. It codifies the Cloudflare setup we first
built by hand — the agent-inbox Worker, its KV queue, Email Routing, and the four role addresses — so the
whole thing is reproducible from a file instead of click-ops.

> **Governance.** Per `organizations/cloudflare/POLICY.md`, every Cloudflare resource must be created via
> this package **and** tagged. New resource → add it here **and** to `organizations/cloudflare/resources.yaml`
> in the same change. Tags are applied by `organizations/cloudflare/tagging/apply_tags.py` until the
> Cloudflare provider ships native tag support, at which point they move into the resource blocks here.

New to Terraform? You only need three commands (below). Terraform reads `.tf` files describing the
infrastructure you *want*, compares them to what *exists*, and makes reality match. That's it.

## What it sets up

- **One Worker** (`agent-inbox`) with a **KV** queue (`INBOX`) — module `modules/agent-worker`.
- **Email Routing** on `subagentknowledge.com` + one rule per role address — module `modules/email-routing`:
  `product-manager@`, `project-manager@`, `legal-manager@`, `finance-manager@` → the Worker.

Both pieces are **modules** — reusable building blocks. Want a fifth role, or the same pattern on another
domain? Add a string to `var.roles`, or call the module again with a different `zone_id`. No copy-paste.

## Run it

```bash
cp terraform.tfvars.example terraform.tfvars      # IDs are already filled in the example
export CLOUDFLARE_API_TOKEN=...                    # never goes in a file

terraform init        # download the Cloudflare provider (~> 4.52)
terraform plan        # preview — should show "adopt", not "create" (see below)
terraform apply       # make it so
```

## It adopts the live resources (won't double-create)

These resources already exist (created via the Cloudflare API on 2026-06-20). `imports.tf` contains
`import` blocks that tell Terraform to **adopt** them, so the first `terraform plan` reconciles state
instead of trying to create duplicates. The captured IDs:

| resource | id |
|----------|----|
| KV namespace `INBOX` | `4bcdd7b006cc42ba9bfebd9587ea5235` |
| Worker `agent-inbox` | `agent-inbox` |
| Email Routing settings | zone `3f820e0424fd375d5b6f86acaad0d5d7` |
| 4 routing rules | one per role (see `imports.tf`) |

## Two planes

- **Cloud plane** — this Terraform (Cloudflare Workers + Email + KV). Serverless, so there is no Kubernetes
  here; Workers *is* the runtime.
- **Local/container plane** — `runtime/docker-compose.yml` (copied from `apps/docker-harness`): redis +
  postgres + polyglot test runners (Python / Node / Swift). Reusable infra for building and testing the
  `e2m-*` packages locally. See `runtime/README.md`.

## Tri-pass (per `../../CONVENTIONS.md`)

- **manager** gates on `terraform validate` + `terraform plan` (no unexpected changes).
- **knowledge-worker** reads this README + the two module READMEs-in-comments.
- **subagent** runs `terraform fmt -check` + `terraform validate` (HCL2 verified: all `.tf` parse clean).
