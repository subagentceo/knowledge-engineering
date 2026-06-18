# IdP Role Assignment

## Overview

Identity Provider (IdP) role assignment is the process of mapping identity provider groups to roles to automatically assign roles to users.

Users are assigned to groups via the identity provider. Groups usually correspond to roles in your app. Therefore, IT contacts will often map a group one-to-one to a role. This can be defined within the WorkOS dashboard or Admin Portal for your application to receive automatic role updates.

## Role assignment sources

### Directory Sync

Roles can be assigned from the identity provider via Directory Sync through [directory group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment). IT contacts can map groups to roles in the Admin Portal during SCIM and Google Workspace directory setup.
You can also manage these assignments in the [WorkOS Dashboard](https://dashboard.workos.com/).

Enterprise organizations typically use SSO to manage user authentication and SCIM (Directory Sync) for user lifecycle management.
While access management can be automated through either SSO or SCIM, SCIM is generally the preferred option due to its real-time synchronization capabilities.

### SSO

Roles can be assigned from the identity provider via SSO through [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment/sso-group-role-assignment). IT contacts can map groups to roles in the Admin Portal during SSO connection setup.
You can also manage these assignments in the [WorkOS Dashboard](https://dashboard.workos.com/). SSO group role assignment is supported in both SAML and OIDC-based connection types, except for Google OIDC due to [a limitation](https://issuetracker.google.com/issues/133774835?pli=1) with the groups claim.

A key limitation of SSO-based role assignment is that changes made in the identity provider (IdP) only take effect after the user re-authenticates. In contrast, SCIM propagates changes immediately without requiring user interaction, enabling applications to revoke sessions and enforce access updates in real time.

> If your organization has a directory connection configured, it is recommended to use the [directory for role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment).

## AuthKit integration

If you are [integrating with AuthKit](https://workos.com/docs/authkit/roles-and-permissions/role-assignment), our full user management solution, roles are automatically assigned to the appropriate [organization membership](https://workos.com/docs/reference/authkit/organization-membership). These roles are also reflected in the [user's session token](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token), ensuring consistent access control across your application.

When using SSO group role assignment, roles are populated on the organization membership through SSO groups, allowing role assignment based on your customer's identity provider configuration each time a user authenticates.

When using Directory Sync group role assignment, roles are populated on the organization membership through [directory provisioning](https://workos.com/docs/authkit/directory-provisioning), allowing for seamless, real-time role assignment based on your customer's identity provider configuration.

## Priority order

If a user is provisioned from multiple groups with conflicting roles, the role with the highest priority will be assigned. If using multiple roles, priority order should be ignored.

![Edit role priority dialog](https://images.workoscdn.com/images/3c6946c2-4ff1-41e4-b10f-568339dc3a2b.png?auto=format\&fit=clip\&q=50)

## Multiple roles

When [multiple roles is enabled](https://workos.com/docs/rbac/configuration/configure-roles/multiple-roles), users can receive multiple roles through identity provider group memberships. This applies to both [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment) and [Directory Sync group role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment).

### How multiple roles work with IdP assignment

- **All applicable roles assigned**: Users receive all roles from groups they belong to that have explicit role mappings
- **Union of permissions**: Users get the combined permissions from all assigned roles
- **Priority order ignored**: When multiple roles are enabled, priority order is not used since users receive all applicable roles
- **Minimum one role**: Every user must have at least one role - if no groups have explicit mappings, the user receives the [default role](https://workos.com/docs/rbac/configuration)

### Example scenario

If a user is a member of both "Engineering" and "Design" groups in their identity provider:

- **Single role mode**: User receives the highest priority role (e.g., "Engineering")
- **Multiple roles mode**: User receives both "Engineering" and "Designer" roles

This prevents "role explosion" where you would otherwise need to create hybrid roles like "designer-engineer" for every possible combination.

## Explicit vs. default role assignments

Explicit role assignments are created by manually mapping an IdP group to a role in the WorkOS Admin Portal or Dashboard.

Default role assignments are created for any IdP group that does not have an explicit role mapping. Default group role assignments are always mapped to the configured [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role).

## Role assignment in Admin Portal

You can choose to show or hide the role assignment step in Admin Portal, and whether to show the steps for Directory Sync or SSO at an environment level on the *Authorization* page in the [WorkOS Dashboard](https://dashboard.workos.com/).

![Role assignment in Admin Portal dialog](https://images.workoscdn.com/images/fe19e3ac-6370-404e-9590-cdb06b3de127.png?auto=format\&fit=clip\&q=50)

For your customers that may have a different setup, you can override the role assignment in Admin Portal setting per-organization, on the *Roles* tab of the organization page in the [WorkOS Dashboard](https://dashboard.workos.com/). For example, if most customers use Directory Sync but a few only use SSO, select "Directory groups" role assignment at the environment level, and select "Single Sign-On groups" at the organization level for the exceptions.
