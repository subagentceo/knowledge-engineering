# AuthKit Integration

## Introduction

FGA integrates with [AuthKit](https://workos.com/docs/authkit) to provide two layers of authorization. Organization-scoped roles and permissions are embedded directly in the session token for instant checks. Resource-scoped permissions are checked through the [Authorization API](https://workos.com/docs/fga/access-checks).

***

## What's in the session token

When a user authenticates, their session token includes organization-scoped role information:

```json
{
  sub: "user_01HXYZ..."
  org_id: "org_01HXYZ..."
  role: "org_member"
  permissions: ["org:view", "workspace:view", "project:view"]
}
```

Your application can check these permissions directly from the token without making API calls.

### Why only organization-scoped roles?

Resource-scoped roles are intentionally excluded from the JWT:

- **Token size** – Users might have roles on hundreds of resources, bloating the JWT beyond practical limits
- **Freshness** – Resource assignments change frequently; stale tokens would cause mismatches
- **Performance** – Larger tokens mean slower requests and verification

For resource-level permissions, use the [Authorization API](https://workos.com/docs/fga/access-checks)—it's fast and always current.

***

## FGA and organization memberships

FGA role assignments are scoped to organization memberships, not users directly. When you assign a role on a resource, the subject is the organization membership ID (`om_...`), which represents a user's relationship to a specific organization.

This means FGA access checks require the organization membership ID rather than the user ID. You can include this ID in your JWT using [JWT Templates](https://workos.com/docs/authkit/jwt-templates):

```json
{
  "organization_membership_id": "{{ organization_membership.id }}"
}
```

This produces a token with the membership ID alongside the default claims:

```json
{
  "sub": "user_01HXYZ...",
  "org_id": "org_01HXYZ...",
  "role": "org_member",
  "permissions": ["org:view", "workspace:view"],
  ...
  "organization_membership_id": "om_01HXYZ..."
}
```

Your application can then extract the membership ID from the JWT and pass it to FGA access checks without needing an additional API call.

***

## Two layers of authorization

**Organization layer (JWT)** – Check the token directly for org-wide features like navigation and settings. Instant, no API call needed.

**Resource layer (API)** – Call the Authorization API for specific resource access. Checks the full permission hierarchy including inheritance.

```text
Can this user edit this project?

1. Quick check: Does the JWT include project:edit for all projects?
   → If yes, authorized (no API call)

2. Otherwise: Call the API for this specific project
   → Checks direct assignments and inheritance
```

***

## Groups and group role assignments

[Groups](https://workos.com/docs/authkit/groups) let you assign resource-scoped roles to a set of users at once. Instead of creating individual role assignments for each organization membership on a resource, assign the role to a group and let WorkOS propagate it to all members.

### Assigning a resource-scoped role to a group

```bash
curl https://api.workos.com/authorization/groups/group_01HXYZ/role_assignments \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "role_slug": "workspace-admin",
    "resource_type_slug": "workspace",
    "resource_external_id": "ws-engineering"
  }'
```

Every member of the group gains the `workspace-admin` role on the Engineering workspace. Permissions propagate through the resource hierarchy just like direct assignments, so members also get inherited access to child resources (projects, apps, etc.).

### How it integrates with access checks

Resource-scoped roles from group role assignments are checked through the [Authorization API](https://workos.com/docs/fga/access-checks) the same way as direct assignments. The access check evaluates all role sources for the organization membership, including group-sourced roles:

```text
Alice's effective roles:
├─ org-member (direct assignment)
├─ workspace-admin on Workspace: Engineering (from "Engineering" group)
└─ project-viewer on Project: Sensitive (direct assignment)
```

A single `check` call returns the combined result across all sources. Your application does not need to distinguish between direct and group-sourced roles.

### Dynamic membership and assignments

Roles update when group membership or group role assignments change:

- **Add member** — the member gains all resource-scoped roles from the group's assignments
- **Remove member** — the member loses resource-scoped roles that came from that group
- **Add group role assignment** — all current members of the group gain the role on the specified resource
- **Remove group role assignment** — all members lose the role that came from that assignment

This makes groups ideal for managing team-level access. When an engineer joins the platform team, adding them to the "Platform" group grants access to all the team's workspaces and projects without individual assignments.

### Example: team-based resource access

Consider a project management application where you want all engineers to have the `editor` role on a shared workspace:

1. [Create a group](https://workos.com/docs/reference/groups/create) named "Engineering" in the organization
2. [Add members](https://workos.com/docs/reference/groups/add-member) to the group for each engineer's organization membership
3. [Assign the role](https://workos.com/docs/reference/groups/role-assignment/create) `editor` on the workspace resource to the group

```bash
# 1. Create the group
curl https://api.workos.com/organizations/org_01HXYZ/groups \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{"name": "Engineering"}'

# 2. Add a member
curl https://api.workos.com/organizations/org_01HXYZ/groups/group_01HXYZ/organization-memberships \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{"organization_membership_id": "om_01HXYZ"}'

# 3. Assign the role to the group
curl https://api.workos.com/authorization/groups/group_01HXYZ/role_assignments \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "role_slug": "editor",
    "resource_type_slug": "workspace",
    "resource_external_id": "ws-engineering"
  }'
```

Every member of the "Engineering" group now has the `editor` role on the Engineering workspace. When a new engineer joins, adding them to the group grants the role automatically.

For full details, see [Group role assignments](https://workos.com/docs/authkit/group-role-assignments).

***

## When roles change

**API checks** reflect changes immediately.

**JWT permissions** require a session refresh since the token was issued at sign-in. Resource roles aren't in the JWT, so API checks always return current data.
