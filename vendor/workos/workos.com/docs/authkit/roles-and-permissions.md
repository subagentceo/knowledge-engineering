# Roles and Permissions

## Introduction

A role represents a logical grouping of permissions, defining access control levels for users within your application. Roles are identified by unique, immutable slugs and are assigned to users through [organization memberships](https://workos.com/docs/authkit/users-organizations/organizations).

Permissions grant users privileged access to resources and actions in your application and are referenced in your code by unique, immutable slugs. A permission can be assigned to any number of roles.

### Standalone roles

Roles alone can be sufficient when your application only requires very coarse-grained access control. This is suitable if users only need to be separated into broad categories and there is minimal overlap between roles. Simple roles can be easier to manage, but are less flexible for complex access control scenarios.

### Utilizing permissions with roles

Permissions allow for more detailed and flexible management of access. They are particularly useful when:

- You anticipate the need to frequently modify access rights or introduce new roles.
- There is significant overlap in access rights between different roles, but with some variations.
- You want to minimize code changes when modifying access rights. By abstracting access control checks to permissions, you can add or modify roles and their access rights without changing the application code.

## Configure roles and permissions

Roles and permissions are managed in their own section of the [WorkOS Dashboard](https://dashboard.workos.com/environment/authorization/) or using the [authorization APIs](https://workos.com/docs/reference/roles).

![Roles section WorkOS Dashboard](https://images.workoscdn.com/images/09c8fb23-5748-4236-914e-79849ac03a9a.png?auto=format\&fit=clip\&q=50)

### Create permissions

When configuring permissions, we recommend:

- Defining a common naming scheme to use across all permissions for your application. Consider separating the resource and action with a delimiter, such as `users:view`. The following delimiters are permitted: `-.:_*`.
- Keep permission slugs clear and concise. When assigned to roles, these slugs will be included in session cookies in the [session JWT claims](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token), which is limited to a maximum size of 4KB in many modern web browsers.

### Assign permissions to roles

Permissions can be assigned when creating a new role or when editing an existing role.

![Assign permissions to a role](https://images.workoscdn.com/images/f6fd6d9a-a7b0-4df7-908b-b657e669a3dc.png?auto=format\&fit=clip\&q=50)

### Default role

Role configuration occurs at the environment level. Each environment is seeded with a default `member` role, which is automatically assigned to every organization member. This default role cannot be deleted, but any role can be set as the default.

If you need to set default roles or other role configurations at the organization level, refer to the [Custom roles](https://workos.com/docs/rbac/custom-roles) section.

### Assign roles

By default, organization memberships require exactly one role. Every user with an organization membership is automatically assigned the default role when added to an organization. This role can be edited.

When [multiple roles is enabled](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles), you can assign several roles to an organization membership. The user gets all permissions from each role.

You can retrieve the role information from the user's [organization membership object](https://workos.com/docs/reference/authkit/organization-membership) to determine their access level and capabilities within your application.

Role changes are tracked and logged via the [`organization_membership.updated` event](https://workos.com/docs/events/organization-membership). To view these changes, go to the [events page](https://dashboard.workos.com/environment/events) and filter by `organization_membership.updated`.

### Delete roles

When roles are deleted:

- **Single role mode**: All organization memberships with the deleted role are reassigned to the default role.
- **Multiple roles mode**: The deleted role is removed from all organization memberships that have it assigned, while other roles on the organization membership remain intact. If the deleted role was the only role assigned to the membership, it will be reassigned the default role.

Role deletion happens asynchronously, so there may be a slight delay between deleting a role and updating all affected organization memberships.

> To migrate from one default role to another, set the new default role and delete the old one. All users will then be reassigned to the new default role.

### Priority order

If a user is provisioned from multiple sources with conflicting roles, the role with the highest priority will be assigned. This is applicable for a single role architecture utilizing [role assignment](https://workos.com/docs/authkit/roles-and-permissions/role-assignment).

Priority order also determines which role will be assigned to users when migrating from a multiple roles to single role configuration in the environment.

## Multiple roles

When [enabled](https://workos.com/docs/rbac/configuration/configure-roles/multiple-roles), AuthKit supports multiple roles per organization membership. A user receives the **union of permissions** across all assigned roles. For example, a user with the *Designer* and *Engineer* roles gets both sets of permissions in their session. This prevents role explosion by avoiding redundant hybrid roles, like "designer-engineer". Each organization membership must have **at least one** role, they will always receive the default role if no other role(s) are set.

### Use cases

By default, multiple roles is disabled and users can only have a single role per entity. You might want to enable multiple roles when you need:

- **Cross-department collaboration**: e.g., designers who need some engineering permissions.
- **Additive, disjoint permissions**: independent permission sets that should stack.
- **Temporary access**: grant time-bound extra capabilities without creating hybrid roles.

For most apps, start with **single-role relationships** for simplicity and predictability, and adopt multiple roles only when overlapping permission sets become common.

| Mode           | Access calculation                         | Pros                                         | Considerations                                      |
| -------------- | ------------------------------------------ | -------------------------------------------- | --------------------------------------------------- |
| Single role    | One role's permissions per membership      | Simple model; predictable audits; small JWTs | May require hybrid roles for cross-functional users |
| Multiple roles | Union of permissions across assigned roles | Flexible; avoids role sprawl                 | Larger JWTs; more governance                        |

### Manually assign roles to a user

Roles can be assigned manually following the steps below, or via identity provider roles assignment outlined in the next section.

1. From the WorkOS Dashboard, open [Users](https://dashboard.workos.com/environment/users).
2. Select a user and go to **Organization memberships**
3. Click **Edit roles** and add all relevant roles
4. Or assign roles [via the API](https://workos.com/docs/reference/authkit/organization-membership/update)

Each organization membership must have **at least one** role.

## Role assignment

You can map identity provider groups to roles to automatically assign roles to users. AuthKit supports two methods for role assignment:

### SCIM (Directory Sync)

Roles can be assigned via SCIM through [directory group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment). Admins can map group memberships to roles in the Admin Portal during SCIM or Google Workspace directory setup. These mappings are used to assign roles to organization memberships via [Directory Provisioning](https://workos.com/docs/authkit/directory-provisioning).

### SSO

Roles can also be assigned via [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment/sso-group-role-assignment). Groups returned in the SSO profile can be mapped to roles in the WorkOS Dashboard. If an AuthKit user authenticates via SSO and belongs to a mapped group, the corresponding role will be set on the [organization membership](https://workos.com/docs/reference/authkit/organization-membership) and reflected in the [user's session](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token).

> Ensure [SSO JIT provisioning](https://workos.com/docs/authkit/jit-provisioning/sso-jit-provisioning) is enabled for each organization using SSO role assignment.

### Groups

Roles can also be assigned through [group role assignments](https://workos.com/docs/authkit/group-role-assignments). Unlike identity provider role assignment, groups are native to WorkOS and managed by your application through the API. Assigning a role to a [group](https://workos.com/docs/authkit/groups) grants that role to every member of the group. When members are added or removed, their roles update accordingly.

### Enabling in Admin Portal

IT contacts can assign roles to identity provider groups in the [Admin Portal](https://workos.com/docs/admin-portal) during SSO or directory setup.

From the *Authorization* section in the WorkOS Dashboard, role assignment is an environment-level setting. However, it can also be configured per organization via the *Roles* tab on that organization's page. If enabled, all Admin Portal sessions for the relevant SSO connection or directory will support group role assignment.

![Enable directory group role assignment dashboard setting](https://images.workoscdn.com/images/fe19e3ac-6370-404e-9590-cdb06b3de127.png?auto=format\&fit=clip\&q=50)

Whether to enable role assignment for SSO or directory groups depends on your application's setup. When [provisioning users with Directory Sync](https://workos.com/docs/authkit/directory-provisioning), we recommend enabling directory group role assignment due to [limitations of SSO role assignment](https://workos.com/docs/sso/identity-provider-role-assignment/considerations/drawbacks).

If you're not yet using directory provisioning, you can enable SSO group role assignment as the environment default.

Because this setting is configurable per organization, choose a sensible default based on your customers' typical setup:

- **A. All organizations use SSO:**
  If no organizations are using Directory Sync, enable SSO group role assignment in Admin Portal at the environment level.

- **B. Some organizations use Directory Sync:**
  Enable directory group role assignment in Admin Portal for those specific organizations.

- **C. Most organizations use Directory Sync:**
  Enable directory group role assignment in Admin Portal at the environment level, and override the setting for organizations that only use SSO.

### Migrating role assignment source

It's recommended to use only one role assignment source per organization. If your organization currently uses SSO group role assignment and you'd like to switch to [directory group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment), consider the following paths:

- **A. Directory is not yet configured:**
  [Enable directory group role assignment](https://workos.com/docs/authkit/roles-and-permissions/role-assignment/enabling-in-admin-portal) for this organization via the **Roles** tab under an organization in the WorkOS Dashboard. IT contacts will be prompted to set up directory group role assignments in the Admin Portal.

- **B. Directory is already configured:**
  Manually assign roles to directory groups in the WorkOS Dashboard, or regenerate an Admin Portal link so IT contacts can set the role mappings there.

Directory group role assignments take precedence and will override any SSO group role assignments on the organization membership. Once directory group roles are properly set up and reflected, you can delete the SSO group mappings.

### Role source priority

AuthKit enforces strict priority rules for assigning roles. When roles are sourced from SSO group role assignment:

- An explicit SSO group role assignment **overrides** any role manually assigned via the [organization memberships API](https://workos.com/docs/reference/authkit/organization-membership) or the [WorkOS Dashboard](https://dashboard.workos.com/). However, a default SSO group role assignment **does not override** a manual one.
- The system may allow a temporary override through the [organization memberships API](https://workos.com/docs/reference/authkit/organization-membership), but it **reapplies** the SSO-assigned role when the user next authenticates, provided the assignment came from an explicit SSO group.
- The system **always overwrites** previous SSO role assignments with new ones, whether they originate from an explicit or default mapping.

Role assignments sourced from [Directory Provisioning](https://workos.com/docs/authkit/directory-provisioning):

- An explicit directory group role assignment **overrides** any role manually assigned via the [organization memberships API](https://workos.com/docs/reference/authkit/organization-membership) or the [WorkOS Dashboard](https://dashboard.workos.com/), or any SSO group role assignment.
- The system **does not allow** SSO to override these roles.
- You **can override** these roles temporarily via the [organization memberships API](https://workos.com/docs/reference/authkit/organization-membership), but directory provisioning reapplies them during the next sync.
- The system **always replaces** previous directory provisioned role assignments with new ones, regardless of whether they came from an explicit or default mapping.

## Role-aware sessions

When a user signs into your app, a [user session](https://workos.com/docs/authkit/sessions) is initiated. The authentication response includes an access token, a JSON Web Token (JWT), with role claims indicating the user organization membership's role(s) for that session.

## Custom roles

Custom roles are roles scoped to a particular organization. They are managed via the "Roles" tab under an organization in the WorkOS Dashboard or using the [Custom Roles API](https://workos.com/docs/reference/roles/custom-role).

![Roles tab for organization](https://images.workoscdn.com/images/7faa176d-bfb9-405b-bb24-700201566ac6.png?auto=format\&fit=clip\&q=50)

### Why might I use custom roles?

In some cases, an application's fixed set of roles may not meet the needs of certain organizations. For example, an organization may require a lesser privileged set of permissions for their members. Custom roles allow you to create roles with the organization's desired set of permissions, without affecting access control for other organizations.

### Creating custom roles

By default, organizations have no custom roles and simply inherit the environment-level roles. You can create a custom role by clicking the "Create role" button on the organization's "Roles" tab or using the [Custom Roles API](https://workos.com/docs/reference/roles/custom-role/create). All custom role slugs are automatically prefixed with `org`.

![Create a custom role](https://images.workoscdn.com/images/fde65b6a-3a74-44bb-afc3-364e8a2041f1.png?auto=format\&fit=clip\&q=50)

### Custom role configuration

Once you create the first role for an organization, that organization will have its own [default role](https://workos.com/docs/authkit/roles-and-permissions/configure-roles-and-permissions/default-role) and [priority order](https://workos.com/docs/authkit/roles-and-permissions/configure-roles-and-permissions/priority-order), independent from the environment.

New roles added to the environment will be available to the organization and placed at the bottom of the organization's role priority order.

### Using custom roles

Like environment-level roles, custom roles can be used in [role assignment](https://workos.com/docs/authkit/roles-and-permissions/role-assignment), [sessions](https://workos.com/docs/authkit/roles-and-permissions/role-aware-sessions), and the [organization membership API](https://workos.com/docs/reference/authkit/organization-membership). No additional action is required to enable this behavior after creating custom roles.

### Deleting an environment role

When attempting to delete an environment role that's the default role for one or more organizations, you'll be prompted to select a new default role for all affected organizations. Organization members previously assigned the deleted role will be assigned the new organization default role.

![Select a replacement role](https://images.workoscdn.com/images/5e6f3e51-5de5-4bb1-a850-52b2196282b9.png?auto=format\&fit=clip\&q=50)
