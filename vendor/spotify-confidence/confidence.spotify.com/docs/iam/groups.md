> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Groups

Groups allow you to bundle users, API clients, and other groups together and treat them as a unit.
Granting teams, instead of individuals, access to resources simplifies access management.
If someone leaves a team, remove them from the group to instantly revoke all their access rights.

You can layer groups such that one group consists of one or more other groups. Using this you can
model your current organizational structure so that one business area group has multiple teams as
members.

## Sync Groups

If you already have all your groups in some other external system, contact the Confidence team to
see if it's possible to automatically sync the groups from this system into Confidence.

## Related Resources

<CardGroup cols={2}>
  <Card title="IAM Introduction" href="/docs/iam/introduction">
    Overview of identity and access management
  </Card>

  <Card title="Users" href="/docs/iam/users">
    Manage individual user access
  </Card>

  <Card title="Roles" href="/docs/iam/roles">
    Understand roles and permissions
  </Card>

  <Card title="Policies" href="/docs/iam/policies">
    Assign roles to groups
  </Card>
</CardGroup>
