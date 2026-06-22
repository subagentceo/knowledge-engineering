# `organizations/cloudflare/`

How the startup uses Cloudflare **like an enterprise** — the governance rule, the tag taxonomy, and a
faithful simulation of a Cloudflare **Organization** (which is enterprise-only).

Sits alongside `organizations/github/` (the e2m code repos). Same idea: model the org we operate as.

## 1. The rule — see `POLICY.md`

Every Cloudflare resource is **(1) created via `e2m-tf`** and **(2) tagged**. Normative spec + the required
tag set live in `POLICY.md`; the live inventory is `resources.yaml`.

## 2. Tagging (Resource Tagging beta — live on the account)

Real, available now. Key-value tags on `worker`, `kv_namespace`, `zone`, `dns_record`, … queryable across
the account with AND/OR + negation (up to 20 filters). API-first (GET → merge → PUT; PUT replaces all).

```bash
export CLOUDFLARE_API_TOKEN=...                 # MUST include the Tags permission (Tag Admin)
pip install pyyaml
python3 tagging/apply_tags.py --dry-run         # preview
python3 tagging/apply_tags.py                   # apply resources.yaml
python3 tagging/verify_tags.py                  # CI gate: fail on any missing required tag
```

> **Blocked once, on purpose:** the token currently wired into this account can deploy Workers + Email but
> does **not** carry the Tags permission, so the API returns `10000 Authentication error` on tag writes.
> Add the **Tags** permission to an Account Owned Token (Tag Admin), export it, and `apply_tags.py` tags all
> six resources (4 frontend workers + the agent-inbox worker + its KV) in one run. Nothing else is needed.

## 3. Organization (simulated — see `organization/`)

Cloudflare **Organizations** (public beta, Apr 2026) is a top-level container over many accounts with shared
WAF/Gateway policies, unified analytics, and a `cloudflare_organization` Terraform resource — but **you must
have an Enterprise account to create one**. This account is not in an org ("Accounts must be a member of an
organization to create shared configurations"). So `organization/org.simulated.yaml` models it as-if: the
**operator** as Org Super Admin, the 12 S-team managers as members, accounts per env/brand. The day we go
Enterprise, the model promotes to the real `cloudflare_organization` resource unchanged.

## Compliance status (2026-06-20)

| resource | in `e2m-tf` | tagged |
|----------|-------------|--------|
| `agent-inbox` worker + KV | ✅ imported (`e2m-tf/imports.tf`) | ⏳ pending Tags token |
| `mail/calendar/cowork/coworkers-frontend` | ⏳ adoption scheduled (routes + DO to model) | ⏳ pending Tags token |
| 4 role email rules | ✅ in `e2m-tf` | n/a (not a taggable type) |
