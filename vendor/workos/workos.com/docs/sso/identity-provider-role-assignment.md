# Identity Provider Role Assignment

## Introduction

A role represents a logical grouping of permissions, defining access control levels for users within your application. Roles are identified by a unique, immutable slug and are assigned to [SSO user profiles](https://workos.com/docs/reference/sso/profile) through their identity provider group memberships. These group role mappings can be configured on the WorkOS dashboard.

To utilize Identity Provider (IdP) role assignment, you must first [configure roles](https://workos.com/docs/rbac/configuration).

## SSO group role assignment

Users are assigned to groups via the identity provider. Groups usually correspond to roles in your app. Therefore, IT contacts will often map a group one-to-one to a role.

During authentication, a user's identity provider group memberships can be read via attributes. This enables you to define SSO groups that correspond to IdP groups and set role assignments for those groups in the WorkOS Dashboard.

Based on these settings, SSO user profiles returned from WorkOS will include a role attribute that reflects their highest priority group membership. The SSO user profile role is calculated during each sign-in.

![Session page showing user profile with role defined](https://images.workoscdn.com/images/ceea13ba-bf6b-4ea1-a25c-0a08e8833fb0.png?auto=format\&fit=clip\&q=50)

> Supported in both SAML and OIDC-based connection types, except for Google OIDC due to [a limitation](https://issuetracker.google.com/issues/133774835?pli=1) with the groups claim.

### Sample scenario

Consider the fictional SaaS company *HireOS*. *HireOS* has set up an SSO Connection and configured group-based role assignment. For example, a *HireOS* customer would like to assign their engineering team to the application. The customer's IT contact would take the following steps:

1. Create an "Engineering" group using their identity provider.
2. Configure the `groups` attribute in their SAML app to return the group memberships.
3. Provide the developer with the IdP Group ID for the "Engineering" group.

In the WorkOS dashboard, the developer can then assign users of that group to the role "Engineer".

1. Navigate to the *Connection* section of the WorkOS dashboard.

![SSO group role assignment card](https://images.workoscdn.com/images/28606b9b-fd5b-4219-8b8f-3a640295e784.png?auto=format\&fit=clip\&q=50)

2. Create an SSO group defining the IdP Group ID for the "Engineering" group. Then, assign this group to the "Engineer" role.

![Dialog to create connection group with role assignment](https://images.workoscdn.com/images/648410f3-1b82-4ebd-97f3-a8f6edbdd27e.png?auto=format\&fit=clip\&q=50)

From this point on, whenever a user in the "Engineering" group authenticates via SSO, they will be granted the "Engineer" role for that session from the WorkOS API. The role will be returned in the [profile response](https://workos.com/docs/reference/sso/profile).

```json language="json" title="SSO user profile"
{
  "object": "profile",
  "id": "prof_01DMC79VCBZ0NY2099737PSVF1",
  "connection_id": "conn_01E4ZCR3C56J083X43JQXF3JK5",
  "connection_type": "OktaSAML",
  "organization_id": "org_01EHWNCE74X7JSDV0X3SZ3KJNY",
  "email": "todd@example.com",
  "first_name": "Todd",
  "last_name": "Rundgren",
  "idp_id": "00u1a0ufowBJlzPlk357",
  "role": {
    "slug": "engineer"
  },
  "roles": [
    {
      "slug": "engineer"
    }
  ]
}
```

> When a user is not a member of any groups or their groups do not match any SSO group role assignments, the user will be granted the [default role](https://workos.com/docs/rbac/configuration/configure-roles/default-role) in the SSO profile.

### Multiple roles

When [multiple roles is enabled](https://workos.com/docs/rbac/configuration/configure-roles/multiple-roles), a user can be assigned multiple roles from their identity provider group memberships. If a user belongs to multiple mapped groups, they will receive all corresponding roles in their SSO profile.

For example, if a user is a member of both "Engineering" and "Design" groups, and both groups are mapped to roles, the user will receive both the "Engineer" and "Designer" roles. If a user is not a member of any groups with explicit mappings, they will receive the [default role](https://workos.com/docs/rbac/configuration).

#### Use cases

By default, multiple roles is disabled and users can only have a single role per entity. It's recommended to start with a single-role setup for simplicity, where it's easier to maintain consistent and correct access patterns.

You might want to enable multiple roles when you need:

- **Cross-department collaboration**: e.g., designers who need some engineering permissions.
- **Additive, disjoint permissions**: independent permission sets that should stack.
- **Temporary access**: grant time-bound extra capabilities without creating hybrid roles.

### Role assignment in Admin Portal

Once [roles](https://workos.com/docs/rbac/configuration) are configured for your application, enable SSO group role assignment in [Admin Portal](https://workos.com/docs/admin-portal) to allow IT contacts to assign roles to groups during SSO connection setup. If enabled, all Admin Portal sessions for SSO connections will have the ability to configure and assign roles to groups.

![Enable SSO group role assignment dashboard setting](https://images.workoscdn.com/images/04f86ccc-87a1-4db6-bd54-54a685d409ef.png?auto=format\&fit=clip\&q=50)

This is an environment-level setting, but can be configured per organization via the *Roles* tab under an organization in the WorkOS Dashboard.

## Considerations

Your customers will store role information in different forms, depending on their preferred provisioning workflow. WorkOS allows for flexibility in how you source role data. However, there are some considerations to keep in mind when using SSO-based connection groups for role assignment.

### Drawbacks

**Strictly** assigning roles during [JIT user provisioning](https://workos.com/docs/sso/jit-provisioning) has a few caveats:

- Your customer must explicitly map the SAML `groups` attribute in the SSO setup so that you can retrieve that attribute in the SSO profile.
- SSO groups need to be manually defined.
- Your app will receive updates to this user's group data only once they sign-in with SSO again. This delay can allow unauthorized users to access resources using a stale role.

### Directory group role assignment

Directory Sync supports [group-based role assignment](https://workos.com/docs/directory-sync/identity-provider-role-assignment/directory-group-role-assignment) and avoids the pitfalls mentioned above. For organizations with a directory, this method of group-based role assignment is preferred.

It's recommended to use only one method of role assignment—either from a Directory or an SSO Connection—to avoid overlap.
