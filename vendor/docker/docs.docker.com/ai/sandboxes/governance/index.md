# Governance


Sandbox governance covers the policy system that controls what sandboxes can
access over the network and on the filesystem. It operates at two layers, and
only one applies at a time:

**Local policy** is configured per machine using the `sbx policy` CLI. It
lets individual developers customize which domains their sandboxes can reach.
See [Local policy](/ai/sandboxes/governance/local/).

**Organization policy** is configured centrally in the Docker Admin Console or
via the [Governance API](/reference/api/ai-governance/). Rules defined at the org level apply
uniformly across every sandbox in the organization. When organization
governance is active, it replaces local policy entirely: local `sbx policy`
rules are no longer evaluated. See [Organization policy](/ai/sandboxes/governance/org/).

Alongside this access-control policy, admins can require developers to sign in
as members of their organization before using sandboxes at all.
[Sign-in enforcement](/ai/sandboxes/governance/sign-in-enforcement/) is deployed through endpoint
management and ensures developers can't bypass organization policy by using a
personal account.

> [!NOTE]
> Organization governance is available on a separate paid subscription.
> [Contact Docker Sales](https://www.docker.com/products/ai-governance/#contact-sales)
> to request access.

## Learn more

- [Policy concepts](/ai/sandboxes/governance/concepts/): resource model, rule syntax, evaluation,
  and precedence
- [Local policy](/ai/sandboxes/governance/local/): configure network and filesystem rules on your
  machine with the `sbx policy` CLI
- [Organization policy](/ai/sandboxes/governance/org/): centrally manage sandbox policies across
  your organization from the Admin Console
- [Sign-in enforcement](/ai/sandboxes/governance/sign-in-enforcement/): require developers to sign in
  as organization members, enforced through endpoint management
- [Monitoring](/ai/sandboxes/governance/monitoring/): inspect active rules and monitor sandbox
  network traffic with `sbx policy ls` and `sbx policy log`
- [Audit logs](/ai/sandboxes/governance/audit/): capture a durable, structured record of every
  policy decision for SIEM ingestion and compliance
- [API reference](/reference/api/ai-governance/): manage org policies
  programmatically via the Governance API

