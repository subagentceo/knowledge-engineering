# Integrating Role-Based Access Control

## Configure roles and permissions

Before integrating with WorkOS Role-Based Access Control (RBAC), you'll need to [configure roles and permissions](https://workos.com/docs/rbac/configuration) for your application in the [WorkOS Dashboard](https://dashboard.workos.com/).

***

## Integrating with AuthKit

WorkOS RBAC seamlessly integrates with AuthKit to provide a complete user management solution. Using AuthKit, you can assign roles directly to organization memberships, source roles from your customer's identity provider (IdP), and read roles and permissions directly from session JWTs.

### Assigning roles

In AuthKit, users are associated with [organizations](https://workos.com/docs/reference/organization) via [organization memberships](https://workos.com/docs/reference/authkit/organization-membership). Each organization membership has role(s), which represents a user's access level for that particular organization. Every organization membership is automatically assigned the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role) when added to an organization.

You can modify an organization membership's role(s) via the [organization memberships API](https://workos.com/docs/reference/authkit/organization-membership/create), [WorkOS Dashboard](https://dashboard.workos.com/), or via [IdP role assignment](https://workos.com/docs/rbac/idp-role-assignment).

[IdP role assignment](https://workos.com/docs/rbac/idp-role-assignment) will always take precedence over roles assigned via API or the WorkOS Dashboard. For [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment/sso-group-role-assignment), the organization membership role updates each time the user authenticates. For [directory group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment) via [directory provisioning](https://workos.com/docs/authkit/directory-provisioning), the organization membership's role updates each time we receive a directory event for the user.

### Single vs. multiple roles

AuthKit, Directory Sync, and Single Sign-On all support both single and [multiple role](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles) paradigms. There are two ways to assign multiple roles:

- **Group-based assignment**: if a user is a member of multiple groups with role mappings, they will receive all the roles. This applies to directory users, SSO profiles, and organization memberships when using [directory](https://workos.com/docs/authkit/directory-provisioning) or [SSO JIT provisioning](https://workos.com/docs/authkit/jit-provisioning/sso-jit-provisioning) in AuthKit.
- **Manual assignment**: multiple roles can be assigned to [organization memberships](https://workos.com/docs/reference/authkit/organization-membership) directly via the WorkOS Dashboard or [API](https://workos.com/docs/reference/authkit/organization-membership/create).

Multiple roles helps to avoid needing to create roles for every possible combination of permissions e.g., designer-engineer. This model fits teams where users span functions or need additive, temporary access.

For most apps, start with **single-role** assignments for simplicity and predictability, and adopt multiple roles only when overlapping permission sets become common.

### Groups and group role assignments

[Groups](https://workos.com/docs/authkit/groups) provide a way to assign roles at the group level rather than to individual organization memberships. When you assign a role to a group, every member of that group receives the role automatically. As members are added or removed, their roles update accordingly.

This is particularly useful for managing roles across teams or departments. Instead of assigning the same role to each member individually, assign it once to the group.

Group-sourced roles are treated the same as directly assigned roles. They appear in the user's session token and count toward the effective permissions for the organization membership. In [multiple-roles mode](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles), all group roles are combined additively. In single-role mode, the highest-priority role wins across all sources.

For full details, see [Group role assignments](https://workos.com/docs/authkit/group-role-assignments).

### Using roles and permissions in your app

Read a user's role(s) from their [organization membership](https://workos.com/docs/reference/authkit/organization-membership) or from an [AuthKit session access token](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token).

***

## Integrating with Directory Sync

For [standalone Directory Sync](https://workos.com/docs/directory-sync), IT contacts manage roles through [directory group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment). Their assigned role defines the user's access level for the particular [organization](https://workos.com/docs/reference/organization) and is based on their directory group memberships.

All [directory users](https://workos.com/docs/reference/directory-sync/directory-user) have assigned roles. If no role is explicitly assigned through directory group role assignment, the user receives the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role). Roles are granted to directory users in real-time, when we receive updates to their group memberships.

Role slugs are returned on [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects from the API. These can be used to assign a role to your internal user object.

***

## Integrating with Single Sign-On (SSO)

For [standalone SSO](https://workos.com/docs/sso), IT contacts manage roles via [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment). Their assigned role defines the user's access level for the particular [organization](https://workos.com/docs/reference/organization).

All [SSO profiles](https://workos.com/docs/reference/sso/profile) have assigned roles. If no role is explicitly assigned through SSO group role assignment, the user receives the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role). Roles are granted to SSO profiles when the user authenticates.

Role slugs are returned on [SSO Profile](https://workos.com/docs/reference/sso/profile) objects from the API. These can be used to assign a role to your internal user object based on group memberships.
