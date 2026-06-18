# Identity Provider Role Assignment

## Introduction

A role represents a logical grouping of permissions, defining access control levels for users within your application. Roles are identified by a unique, immutable slug and are assigned to Directory Sync [users](https://workos.com/docs/directory-sync/api-overview/directory-user) through their group memberships. These role assignments can be configured on the WorkOS dashboard.

To utilize Identity Provider (IdP) role assignment, you must first [configure roles](https://workos.com/docs/rbac/configuration).

## Directory group role assignment

Users are assigned to groups via the identity provider. Groups usually correspond to roles in your app. Therefore, IT contacts will often map a group one-to-one to a role. This can be defined within the WorkOS dashboard or Admin Portal for your application to receive automatic role updates.

> Only supported in directories using SCIM-based or Google Workspace providers.

### Sample scenario

Consider the fictional SaaS company *HireOS*. *HireOS* has integrated Directory Sync and supports group-based role assignment. For example, a *HireOS* customer would like to assign their engineering team to it. The customer's IT contact would take the following steps:

1. Create a group "Engineering" using their identity provider.
2. Push the group to *HireOS* via the identity provider. This is configured in the identity provider admin console.

The developer on the WorkOS dashboard can then assign users of that group to the role "Developer".

1. Navigate to the directory page on the WorkOS dashboard.

![The directory page on the WorkOS dashboard](https://images.workoscdn.com/images/88d4701b-7e6d-4655-ad74-48bc7c14959f.png?auto=format\&fit=clip\&q=50)

2. Create an assignment for "Engineering" to the "Developer" role.

![The role assignment dialog on the WorkOS dashboard](https://images.workoscdn.com/images/bdd4cc91-11cb-49b1-858b-f2509ce3675e.png?auto=format\&fit=clip\&q=50)

From this point on, all new users added to "Engineering" will be given "Developer" role from the WorkOS API. The role will be in the [directory user response](https://workos.com/docs/reference/directory-sync/directory-user).

![Screenshot of directory user page](https://images.workoscdn.com/images/18f584f6-d758-4f11-bfc8-e93c16452580.png?auto=format\&fit=clip\&q=50)

### Multiple roles

When [multiple roles is enabled](https://workos.com/docs/rbac/configuration/configure-roles/multiple-roles) in your environment, directory users can be assigned multiple roles from their identity provider group memberships. If a user belongs to multiple mapped groups, they will receive all corresponding roles.

For example, if a user is a member of both "Engineering" and "Design" groups, and both groups are mapped to roles, the directory user will receive both the "Developer" and "Designer" roles. If a user is not a member of any groups with explicit mappings, they will receive the [default role](https://workos.com/docs/rbac/configuration).

When using [AuthKit with Directory Provisioning](https://workos.com/docs/authkit/directory-provisioning), these multiple roles are automatically applied to the user's [organization membership](https://workos.com/docs/reference/authkit/organization-membership) and reflected in their [session token](https://workos.com/docs/authkit/sessions/integrating-sessions/access-token).

#### Use cases

By default, multiple roles is disabled and users can only have a single role per entity. It's recommended to start with a single-role setup for simplicity, where it's easier to maintain consistent and correct access patterns.

You might want to enable multiple roles when you need:

- **Cross-department collaboration**: e.g., designers who need some engineering permissions.
- **Additive, disjoint permissions**: independent permission sets that should stack.
- **Temporary access**: grant time-bound extra capabilities without creating hybrid roles.

### Role assignment in Admin Portal

Once [roles](https://workos.com/docs/rbac/configuration) are configured for your application, enable directory group role assignment in [Admin Portal](https://workos.com/docs/admin-portal) to allow IT contacts to assign roles to groups during directory setup.

![Enable directory group role assignment dashboard setting](https://images.workoscdn.com/images/fe19e3ac-6370-404e-9590-cdb06b3de127.png?auto=format\&fit=clip\&q=50)

This is an environment-level setting, but can be configured per organization via the *Roles* tab under an organization in the WorkOS Dashboard. If your application is integrated with Directory Sync, it is recommended to use directory group role assignment as the environment default.

![Screenshot of admin portal with role assignment step](https://images.workoscdn.com/images/74d09b62-b2b2-4aba-9803-3ec6305897e0.png?auto=format\&fit=clip\&q=50)

If enabled, all Admin Portal sessions for SCIM-based or Google Workspace directories will have the ability to see and assign roles to identity provider groups.

## Other forms of role assignment

Your customers will store role information in different forms, depending on their preferred provisioning workflow. WorkOS allows for flexibility in how you source role data, though these formats are not automated today and not available on the role property on the [directory user response](https://workos.com/docs/reference/directory-sync/directory-user). You can fetch role data via two distinct mechanisms:

- A custom-mapped role attribute from the directory user profile.
- A groups attribute in the SSO user profile.

The type of mechanism needed will depend on the level of support for roles in your app, your app's architecture, and your customer's workflows:

| Approach                        | Your app                                               | Your customer                                                      |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| SSO group role assignment       | Receives role data each time a user logs in            | Uses identity provider groups to assign roles in your app          |
| Attribute-based role assignment | Sets roles based on a per-user custom-mapped attribute | Assigns roles using attributes on users in their identity provider |

### SSO group role assignment

[SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment/sso-group-role-assignment) involves mapping identity provider (IdP) groups to roles within your application during [Single Sign-On](https://workos.com/docs/sso) and [JIT Provisioning](https://workos.com/docs/sso/jit-provisioning). In this method, SSO groups corresponding to IdP groups are defined in the WorkOS Dashboard, and roles are assigned based on these group memberships.

The user's role is then included in the [SSO profile](https://workos.com/docs/reference/sso/profile) returned from WorkOS. [Read more](https://workos.com/docs/sso/identity-provider-role-assignment/considerations/drawbacks) on this approach, including [drawbacks](https://workos.com/docs/sso/identity-provider-role-assignment/considerations/drawbacks) to consider.

### Attribute-based role

You can use [custom-mapped attributes](https://workos.com/docs/directory-sync/attributes/custom-attributes/custom-attributes) if your customers do not use groups to establish and manage user roles.

You can create a custom-mapped attribute role (e.g., `myRole`) in the [WorkOS Dashboard](https://dashboard.workos.com/) under Configuration → Directory Sync. You can set the status of a role attribute to "Required" or "Optional".

```json language="json" title="Directory user with a custom-mapped attribute"
{
  "id": "directory_user_01E1X7B89OH8Z3SXFJR4H7RGX7",
  "idp_id": "821991",
  "first_name": "Jane",
  "last_name": "Doe",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "state": "active",
  "created_at": "2021-06-25T19:07:33.155Z",
  "updated_at": "2021-06-25T19:07:33.155Z",
  "object": "directory_user",
  "directory_id": "directory_01E1X194NTJ3PXMAY79DYV0F0P",
  "organization_id": "org_01EHWNCE74X7JSDV0X3SZ3PJNY",
  "custom_attributes": {
    "myRole": "admin"
  }
}
```

The newly created attribute will appear as a field in the [Admin Portal](https://workos.com/docs/admin-portal). When setting up Directory Sync with their identity provider in Admin Portal, your customers can map this role field to a field in their identity provider. You'll have to communicate with your customer what value(s) you expect in the custom-mapped attribute.

An example being that `myRole` should be one of `"admin"`, `"viewer"`, or `"editor"`. This allows your app to parse the `myRole` field value correctly.

## Common edge cases

### A user is part of multiple groups

Having a user who belongs to multiple groups is a common scenario. For example, there might be a case where an employee *Jane* is an *Engineering Manager* and belongs to an "Engineering", "Manager", and "Admin" group. With group-based role assignment, the user will be assigned the role that has the [highest priority defined](https://workos.com/docs/rbac/configuration/configure-roles/priority-order).

### Role assignment availability on Directory Sync

Identity provider role assignment through groups is only available through SCIM compliant and Google Workspace directories.
