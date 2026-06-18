# Configuration

## Overview

A role represents a logical grouping of permissions, defining access control levels for users within your application. Roles are identified by unique, immutable slugs and are assigned to users via [organization memberships](https://workos.com/docs/authkit/users-organizations/organizations). Role assignments can be sourced manually or from Identity Provider (IdP) group mappings (SSO or Directory Sync).

Permissions grant users privileged access to resources and actions in your application and are referenced in your code by unique, immutable slugs. A permission can be assigned to any number of roles.

> Role and permission configuration applies to [all integrations](https://workos.com/docs/rbac/integration).

***

## Configure roles

Roles alone can be sufficient when your application only requires very coarse-grained access control. This is suitable if users only need to be separated into broad categories and there is minimal overlap between roles. Simple roles can be easier to manage, but are less flexible for complex access control scenarios.

![Roles section WorkOS Dashboard](https://images.workoscdn.com/images/09c8fb23-5748-4236-914e-79849ac03a9a.png?auto=format\&fit=clip\&q=50)

You can manage roles in the *Authorization* section of the [WorkOS Dashboard](https://dashboard.workos.com/environment/authorization/) or using the [Roles API](https://workos.com/docs/reference/roles).

Role slugs are immutable and cannot be changed after creation. Environment role slugs are unique within an environment. [Custom role](https://workos.com/docs/rbac/custom-roles) slugs are unique within an organization.

### Default role

Role configuration occurs at the environment level. Each environment is seeded with a default `member` role, which is automatically assigned to every organization member. This default role cannot be deleted, but any role can be set as the default.

If you need to set default roles or other role configurations at the organization level, refer to the [Custom roles](https://workos.com/docs/rbac/custom-roles) section.

### Multiple roles

All [integrations](https://workos.com/docs/rbac/integration) support multiple roles across directory users, SSO profiles, and organization memberships. For any user, if role(s) are not explicit set, they will receive the default role.

Multiple roles is disabled by default. To manage this setting, open the [Authorization](https://dashboard.workos.com/environment/authorization/configuration) configuration page and scroll to the *Multiple Roles* section.

> Multiple roles is an **environment-level** setting and applies to all organizations in that environment.

### Priority order

Role priority order is used for [IdP role assignment](https://workos.com/docs/rbac/idp-role-assignment) to resolve conflicts when a user belongs to multiple mapped groups. The highest-priority role wins. Priority order also determines which role will be assigned to users when migrating from a multiple roles to single role configuration in the environment.

### Delete roles

When roles are deleted:

- **Single-role (default):** All affected organization memberships, SSO profiles, and directory users are reassigned to the **default role**.
- **Multiple-roles:** The deleted role is **removed** from each organization membership that has it, any other roles on the membership remain intact.

Deletion is asynchronous, so updates may take a moment to propagate.

> **Tip:** To migrate from one default role to another, set the new default, then delete the old one—users will be reassigned automatically.

***

## Configure permissions

Permissions allow for more detailed and flexible management of access. They are particularly useful when:

- You anticipate the need to frequently modify access rights or introduce new roles.
- There is significant overlap in access rights between different roles, but with some variations.
- You want to minimize code changes when modifying access rights. By abstracting access control checks to permissions, you can add or modify roles and their access rights without changing the application code.

### Create permissions

You can manage permissions in the *Authorization* section of the [WorkOS Dashboard](https://dashboard.workos.com/environment/authorization/permissions) or using the [Permissions API](https://workos.com/docs/reference/roles/permission).

When configuring permissions, we recommend:

- Defining a common naming scheme to use across all permissions for your application. Consider separating the resource and action with a delimiter, such as `users:view`. The following delimiters are permitted: `-.:_*`.
- Keep permission slugs clear and concise. When assigned to roles, these slugs will included as part of session cookies in the [session JWT claims](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token), which is limited to a maximum size of 4KB in many modern web browsers.

### Assign permissions to roles

Permissions can be assigned when creating a new role or when editing an existing role.

![Assign permissions to a role](https://images.workoscdn.com/images/f6fd6d9a-a7b0-4df7-908b-b657e669a3dc.png?auto=format\&fit=clip\&q=50)
