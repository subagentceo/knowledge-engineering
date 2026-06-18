# Group Role Assignments

## Introduction

Group role assignments let you assign a role to a [group](https://workos.com/docs/authkit/groups) so that every member of that group automatically receives the role and its permissions. When you add or remove members from the group, their roles update accordingly.

This eliminates the need to manage role assignments on a per-user basis.

***

## How it works

A group role assignment connects a group to a role. WorkOS automatically reconciles the roles for all members of the group:

- **Assign a role to a group** — all current members receive the role
- **Add a member to the group** — the new member receives all roles assigned to the group
- **Remove a member from the group** — the member loses any roles they received from that group
- **Remove a group role assignment** — all members lose the role that came from that assignment

In [multiple-roles mode](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles), roles sourced from group role assignments are additive. A user's effective permissions are the union of all roles from direct assignment and group assignment. In single-role mode, the highest-priority role wins across all sources. If a group role was the highest-priority role and the assignment is removed, the member's role resets to the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role) for the organization.

When you assign or remove a role from a group, WorkOS reconciles the roles for all group members asynchronously. There may be a brief delay between the API call and the roles being fully propagated to all members.

Adding or removing individual members from a group reconciles that member's roles synchronously. The updated roles take effect before the API response is returned.

***

## Assigning a role to a group

When you assign a role to a group without specifying a resource, every member of that group receives the role. These roles behave the same as directly assigned roles — they appear in the [session token](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token) and are enforced through the standard [RBAC](https://workos.com/docs/rbac) system.

To create a group role assignment, use the [create group role assignment API](https://workos.com/docs/reference/groups/role-assignment/create).

***

## Resource-scoped assignments

Group role assignments can also target a specific [FGA resource](https://workos.com/docs/fga/resources), granting members of the group a role on that resource. This is useful for giving an entire team access to a workspace, project, or any other resource in your authorization model.

You can identify the target resource using either:

- `resource_id` — the WorkOS resource ID (`authz_resource_...`)
- `resource_type_slug` + `resource_external_id` — a combination of the resource type and your external identifier

Resource-scoped role assignments are checked through the [Authorization API](https://workos.com/docs/fga/access-checks). Permissions propagate down to child resources via [permission inheritance](https://workos.com/docs/fga/roles-and-permissions), just like directly assigned resource-scoped roles. Resource-scoped roles are always additive, regardless of whether you are using single-role or multiple-roles mode.

To create a resource-scoped group role assignment, use the [create group role assignment API](https://workos.com/docs/reference/groups/role-assignment/create) with the resource fields.

***

## Managing group role assignments

### Listing assignments

Retrieve all role assignments for a group using the [list group role assignments API](https://workos.com/docs/reference/groups/role-assignment/list).

### Removing assignments

Remove a specific assignment by ID using the [remove group role assignment API](https://workos.com/docs/reference/groups/role-assignment/remove-group-role-assignment), or remove by criteria (role and optional resource) using the [remove group role assignments API](https://workos.com/docs/reference/groups/role-assignment/remove-group-role-assignments).

When a group role assignment is removed, all members lose the role that came from that assignment. Any roles from other sources (direct assignment or other groups) remain intact.

***

## Single vs. multiple roles

Group role assignments work in both single-role and [multiple-role](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles) modes:

- **Single-role mode**: The highest-priority role wins across all sources (direct and group). If a group role assignment grants a higher-priority role than the member's current role, it takes effect. If that assignment is later removed, the member's role resets to the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role).
- **Multiple-roles mode**: All applicable group roles are granted to the member. The member's effective permissions are the union of all assigned roles.

***

## Cascade behavior

Group role assignments are automatically cleaned up in these scenarios:

- **Deleting a group** removes all role assignments for that group and revokes the associated roles from all members.
- **Removing a member from a group** revokes any roles that member received from that group's assignments.

***

## Example: department-level roles

Consider an application where you want all members of the finance department to have the `billing-admin` role:

1. [Create a group](https://workos.com/docs/reference/groups/create) named "Finance" in the organization
2. [Add members](https://workos.com/docs/reference/groups/add-member) to the group for each finance team member's organization membership
3. [Assign the role](https://workos.com/docs/reference/groups/role-assignment/create) `billing-admin` to the group

Every member of the "Finance" group now has the `billing-admin` role. When a new team member joins, adding them to the group grants the role automatically. When someone leaves the team, removing them from the group revokes the role.

***

## API reference

For the full API specification, see the [Group Role Assignment API reference](https://workos.com/docs/reference/groups/role-assignment).
