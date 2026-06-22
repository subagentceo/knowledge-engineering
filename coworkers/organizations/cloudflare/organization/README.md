# `organization/` — simulated Cloudflare Organization

`org.simulated.yaml` is the as-if enterprise org (we are not Enterprise yet, so we cannot create a real one).
It mirrors the real shape: members with the Org Super Admin role (operator) + members (the 12 managers),
child accounts per env/plane, and shared WAF/Gateway policies.

Promotion path: when the account becomes Enterprise, this YAML maps directly onto the
`cloudflare_organization` Terraform resource + account-assignment resources in `e2m-tf` — same names, same
members, same shared policies. The simulation is the spec; going Enterprise just makes it real.
