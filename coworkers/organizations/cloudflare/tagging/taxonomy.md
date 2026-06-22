# Tag taxonomy

Keys are lowercase-hyphen. Values are from a closed set where practical (so filtering is reliable).

| key          | allowed values                                              |
|--------------|-------------------------------------------------------------|
| `managed-by` | `e2m-tf` (always — nothing else creates resources)          |
| `env`        | `production` · `staging` · `dev`                            |
| `e2m-plane`  | `frontend` · `email` · `data` · `runtime`                  |
| `app`        | `mail` · `calendar` · `cowork` · `coworkers` · `agent-inbox`|
| `domain`     | `subagentknowledge.com` (+ future brand domains)            |
| `team`       | one of the 12 S-team functions (`product`, `engineering`, …)|

## Filtering (the payoff)

With 50+ workers, the account becomes queryable. Up to 20 filters per query, AND/OR + negation:

- everything on the email plane: `e2m-plane = email`
- production frontends owned by product: `e2m-plane = frontend AND env = production AND team = product`
- anything NOT yet adopted: `NOT managed-by = e2m-tf`  ← the compliance query

## Future (per Cloudflare roadmap)

Tag-based access control, **billing/usage attribution by tag** (cost per `app`/`team`/`env`), and native
Terraform tag support — at which point tags move from `apply_tags.py` into the `e2m-tf` resource blocks.
