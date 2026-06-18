# Migrate from OpenFGA

## Overview

This guide helps you migrate from OpenFGA to WorkOS FGA. While both systems are inspired by Google's Zanzibar paper, they take different approaches. OpenFGA uses relation-based access control (ReBAC) with explicit tuple storage, while WorkOS FGA uses hierarchical role-based access control (RBAC) with automatic permission inheritance.

***

## Key differences

| OpenFGA Concept             | WorkOS FGA Equivalent               |
| --------------------------- | ----------------------------------- |
| Types                       | Resource Types                      |
| Relations                   | Roles + Permissions                 |
| Tuples                      | Role Assignments                    |
| User sets                   | Organization Memberships            |
| Computed relations (`from`) | Native hierarchical inheritance     |
| Contextual tuples           | Check conditions in app code        |
| `but not` exclusions        | Permission exclusions (coming soon) |

### Architecture shift

OpenFGA requires a schema DSL and explicit tuples for every relationship. WorkOS FGA simplifies this:

1. **Permissions flow down automatically** — A role at a parent level grants access to all children without additional tuples
2. **Roles are scoped to resource types** — Each resource type has its own set of roles
3. **Single parent per resource instance** — Each resource instance has exactly one parent, creating predictable traversal paths
4. **No schema DSL** — Configure resource types, roles, and permissions in the Dashboard
5. **Native WorkOS integration** — Works seamlessly with AuthKit, SSO, Directory Sync, and IdP role assignment

### WorkOS product integration

Unlike standalone authorization systems, WorkOS FGA integrates natively with the WorkOS identity platform (although it [can be used standalone](https://workos.com/docs/fga/standalone-integration)):

- **AuthKit Integration** — Organization-scoped roles and permissions are embedded in access tokens for instant JWT-based checks
- **IdP Role Assignment** — Map identity provider groups (Okta, Azure AD, Google Workspace) directly to organization-scoped roles
- **Directory Sync** — Automatically provision and deprovision users with appropriate role assignments when group memberships change
- **SSO** — Enterprise SSO users get role assignments based on IdP group membership during authentication

***

## Step 1: Map types to resource types

Extract domain objects from your OpenFGA `type` definitions. These become resource types in WorkOS FGA.

**Create resource types for:**

- Business containers: organizations, workspaces, projects, environments
- Shareable entities: apps, pipelines, repositories, dashboards

**Exclude:**

- `type user` — Use Organization Memberships as subjects instead
- `type group` — User groups are coming soon; for now, assign roles directly to users

### Example

```text
# OpenFGA
type user
type organization
type workspace
type project

# WorkOS FGA Resource Types
organization (built-in)
└── workspace
    └── project
```

Navigate to **Authorization > Resource Types** in the [Dashboard](https://workos.com/docs/fga/resource-types/creating-and-managing-resource-types/using-the-dashboard) to create your hierarchy.

***

## Step 2: Establish hierarchy

Map OpenFGA parent relations to WorkOS FGA parent-child resource type relationships.

### OpenFGA pattern

```text
type workspace
  relations
    define viewer: [user]

type project
  relations
    define parent: [workspace]
    define viewer: viewer from parent
```

### WorkOS FGA equivalent

Create a `project` resource type with `workspace` as its parent. The parent relationship is defined at the resource type level.

When you register individual project resources instances via the API, they automatically inherit from their workspace. Permissions flow down this hierarchy without explicit tuples.

***

## Step 3: Translate relations to roles

OpenFGA relations like `viewer`, `editor`, and `admin` become roles scoped to resource types.

### OpenFGA pattern

```text
type project
  relations
    define viewer: [user]
    define editor: [user] or viewer
    define owner: [user] or editor
```

### WorkOS FGA equivalent

Create roles on the `project` resource type:

| Role   | Permissions                                      |
| ------ | ------------------------------------------------ |
| viewer | `project:view`                                   |
| editor | `project:view`, `project:edit`                   |
| owner  | `project:view`, `project:edit`, `project:manage` |

The `or` unions in OpenFGA become multiple permissions bundled into a single role.

> **Permission slug convention:** Permission slugs are arbitrary text, but we recommend the pattern `{resource-type}:{action}` for clarity. Each permission must be explicitly scoped to a resource type in the Dashboard—[see more about permissions](https://workos.com/docs/fga/roles-and-permissions). When a role includes permissions scoped to child resource types (like `project:view` on a workspace role), it grants that permission on all child resources of that type.

***

## Step 4: Handle computed relations

OpenFGA computed relations using the `from` keyword are replaced by native hierarchical inheritance.

### OpenFGA pattern

```text
type workspace
  relations
    define viewer: [user]

type project
  relations
    define parent: [workspace]
    define viewer: viewer from parent
```

### WorkOS FGA equivalent

Create a `workspace` resource type with a role that includes child-type permissions:

| Role (on workspace) | Permissions                      |
| ------------------- | -------------------------------- |
| viewer              | `workspace:view`, `project:view` |

When you assign `workspace:viewer` to a user, they automatically get `project:view` on all projects within that workspace. No explicit per-project tuples needed.

***

## Step 5: Map grant patterns

| OpenFGA Pattern            | WorkOS FGA Equivalent                            |
| -------------------------- | ------------------------------------------------ |
| Direct user tuple          | Role assignment on resource                      |
| `[type#relation]` usersets | Role includes child-type permissions (automatic) |
| `or` unions                | Multiple permissions in a role                   |
| `and` intersections        | Check both conditions in app code                |
| `but not` exclusions       | Permission exclusions (coming soon)              |

### Contextual tuples

OpenFGA contextual tuples allow passing runtime context with permission checks. With WorkOS FGA, handle these checks in your application code instead. This keeps the check interface simple and puts conditional logic next to the data it depends on.

```javascript
// Check time-based access in your app
const now = new Date();
const accessWindow = await getAccessWindow(resourceId);

if (now < accessWindow.start || now > accessWindow.end) {
  return { authorized: false };
}

// Then check FGA permissions
const { authorized } = await workos.authorization.check({
  organizationMembershipId,
  permissionSlug: 'project:view',
  resourceExternalId: resourceId,
  resourceTypeSlug: 'project',
});
```

***

## High-cardinality entities

Not everything belongs in FGA. We recommend using FGA for lower-cardinality resources (organizations, workspaces, projects) and handling high-cardinality entities (files, messages, comments) in your application.

Syncing millions of entities into FGA creates reconciliation overhead, race conditions, and consistency challenges. Instead, check access at the parent container level and filter entities in your application.

For detailed guidance on this pattern, including interceptor examples for nested entities, see [High-Cardinality Entities](https://workos.com/docs/fga/high-cardinality-entities).

***

## Migration steps

1. **Define resource types** in the WorkOS Dashboard matching your OpenFGA types
2. **Define permissions** for each type (e.g., `view`, `edit`, `manage`)
3. **Create roles** that bundle permissions, including child-type permissions for inheritance
4. **Register resources** via API when entities are created in your app
5. **Migrate tuples** to role assignments on specific resources
6. **Replace OpenFGA checks** with WorkOS FGA `check` API calls

### API migration

**OpenFGA Check:**

```javascript
const { allowed } = await fga.check({
  user: 'user:alice',
  relation: 'viewer',
  object: 'project:budget',
});
```

**WorkOS FGA Check:**

```javascript
const { authorized } = await workos.authorization.check({
  organizationMembershipId: 'om_01HXYZ', // available in a session token or via the API
  permissionSlug: 'project:view',
  resourceTypeSlug: 'project',
  resourceExternalId: 'budget',
});
```

***

## Example migration

### OpenFGA schema

```text
type user

type organization
  relations
    define admin: [user]
    define member: [user] or admin

type workspace
  relations
    define parent_org: [organization]
    define viewer: [user] or member from parent_org
    define editor: [user] or viewer
    define admin: [user] or admin from parent_org

type project
  relations
    define parent_workspace: [workspace]
    define viewer: [user] or viewer from parent_workspace
    define editor: [user] or editor from parent_workspace
```

### WorkOS FGA equivalent

**Resource type hierarchy:**

```text
organization (built-in)
└── workspace
    └── project
```

**Roles for `workspace`:**

| Role   | Permissions                                                        |
| ------ | ------------------------------------------------------------------ |
| viewer | `workspace:view`, `project:view`                                   |
| editor | `workspace:view`, `workspace:edit`, `project:view`, `project:edit` |
| admin  | All workspace and project permissions                              |

**Roles for `project`:**

| Role   | Permissions                    |
| ------ | ------------------------------ |
| viewer | `project:view`                 |
| editor | `project:view`, `project:edit` |

Organization members get `workspace:viewer` through an organization-scoped role. Workspace editors automatically get `project:edit` on all child projects through inheritance.

***

## Next steps

- [Resource Types](https://workos.com/docs/fga/resource-types) — Design your hierarchy
- [Roles and Permissions](https://workos.com/docs/fga/roles-and-permissions) — Configure inheritance patterns
- [AuthKit Integration](https://workos.com/docs/fga/authkit-integration) — Embed permissions in access tokens
- [IdP Role Assignment](https://workos.com/docs/fga/idp-role-assignment) — Map IdP groups to roles
- [Assignments](https://workos.com/docs/fga/assignments) — Migrate your tuples to role assignments
- [Access Checks](https://workos.com/docs/fga/access-checks) — Replace OpenFGA check calls
