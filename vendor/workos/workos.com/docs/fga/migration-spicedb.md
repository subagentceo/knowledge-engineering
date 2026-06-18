# Migrate from SpiceDB

## Overview

This guide helps you migrate from SpiceDB (AuthZed) to WorkOS FGA. SpiceDB implements Google's Zanzibar paper with a `.zed` schema DSL, explicit relationship storage, and permission computation. WorkOS FGA takes a different approach: hierarchical role-based access control with automatic permission inheritance.

***

## Key differences

| SpiceDB Concept                    | WorkOS FGA Equivalent               |
| ---------------------------------- | ----------------------------------- |
| `definition`                       | Resource Type                       |
| `relation`                         | Role assignment relationship        |
| `permission`                       | Permission on a role                |
| Relationships                      | Role Assignments                    |
| Subject relations (`group#member`) | Organization Memberships            |
| `->` (arrow)                       | Native hierarchical inheritance     |
| Caveats                            | Check conditions in app code        |
| `-` (exclusion)                    | Permission exclusions (coming soon) |

### Architecture shift

SpiceDB requires writing schema in `.zed` files and explicitly storing relationships. WorkOS FGA simplifies this:

1. **Permissions flow down automatically** — A role at a parent level grants access to all children without additional relationships
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

## SpiceDB syntax reference

Key operators in SpiceDB:

- `+` (union) — subject has either relation
- `&` (intersection) — subject must have both relations
- `-` (exclusion) — subject has left but not right
- `->` (arrow) — traverse to parent's permission

***

## Step 1: Map definitions to resource types

Extract `definition` blocks from your SpiceDB schema. These become resource types in WorkOS FGA.

**Create resource types for:**

- Business containers: organizations, workspaces, projects, environments
- Shareable entities: apps, pipelines, repositories, dashboards

**Exclude:**

- `definition user {}` — Use Organization Memberships as subjects

### Example

```text
# SpiceDB
definition user {}
definition workspace {}
definition project {}

# WorkOS FGA Resource Types
organization (built-in)
└── workspace
    └── project
```

Navigate to **Authorization > Resource Types** in the [Dashboard](https://workos.com/docs/fga/resource-types/creating-and-managing-resource-types/using-the-dashboard) to create your hierarchy.

***

## Step 2: Establish hierarchy

Map SpiceDB parent relations to WorkOS FGA parent-child resource type relationships.

### SpiceDB pattern

```text
definition project {
    relation parent: workspace
    permission read = reader + parent->read
}
```

### WorkOS FGA equivalent

Create a `workspace` resource type with `organization` as its parent. Create a `project` resource type with `workspace` as its parent. The parent relationship is defined at the resource type level.

When you register individual project resources instances via the API, you specify the parent workspace. Permissions flow down this hierarchy without explicit operations.

***

## Step 3: Convert relations to roles

SpiceDB relations that grant access become roles in WorkOS FGA. SpiceDB permissions guide which permissions to include in each role.

### SpiceDB pattern

```text
definition project {
    relation reader: user
    relation writer: user
    relation owner: user

    permission view = reader + writer + owner
    permission edit = writer + owner
    permission manage = owner
}
```

### WorkOS FGA equivalent

Create roles on the `project` resource type:

| Role   | Permissions                                      |
| ------ | ------------------------------------------------ |
| reader | `project:view`                                   |
| writer | `project:view`, `project:edit`                   |
| owner  | `project:view`, `project:edit`, `project:manage` |

The `+` unions in SpiceDB become permissions bundled into roles.

> **Permission slug convention:** Permission slugs are arbitrary text, but we recommend the pattern `{resource-type}:{action}` for clarity. Each permission must be explicitly scoped to a resource type in the Dashboard—[see more about permissions](https://workos.com/docs/fga/roles-and-permissions). When a role includes permissions scoped to child resource types (like `project:view` on a workspace role), it grants that permission on all child resources of that type.

***

## Step 4: Handle arrow operations

SpiceDB arrows (`->`) traverse to a parent's permission. WorkOS FGA handles this through native hierarchical inheritance.

### SpiceDB pattern

```text
definition workspace {
    relation viewer: user
    permission view = viewer
}

definition project {
    relation parent: workspace
    relation viewer: user
    permission view = viewer + parent->view
}
```

### WorkOS FGA equivalent

Create a `workspace` resource type with a role that includes child-type permissions:

| Role (on workspace) | Permissions                      |
| ------------------- | -------------------------------- |
| viewer              | `workspace:view`, `project:view` |

When you assign `workspace:viewer` to a user, they automatically get `project:view` on all projects within that workspace. The arrow traversal is replaced by native inheritance.

***

## Step 5: Map permission operators

| SpiceDB Operator   | WorkOS FGA Equivalent               |
| ------------------ | ----------------------------------- |
| `+` (union)        | Multiple permissions in a role      |
| `&` (intersection) | Check both conditions in app code   |
| `-` (exclusion)    | Permission exclusions (coming soon) |
| `->` (arrow)       | Native hierarchical inheritance     |

### Intersection example

```javascript
// SpiceDB: permission admin = writer & reader
// WorkOS FGA: Check both conditions in your app
const canRead = await workos.authorization.check({
  organizationMembershipId,
  permissionSlug: 'project:read',
  resourceExternalId: projectId,
  resourceTypeSlug: 'project',
});

const canWrite = await workos.authorization.check({
  organizationMembershipId,
  permissionSlug: 'project:write',
  resourceExternalId: projectId,
  resourceTypeSlug: 'project',
});

const isAdmin = canRead.authorized && canWrite.authorized;
```

### Caveats

SpiceDB caveats allow conditional access based on runtime context. Implement these checks in your application instead. This keeps the check interface simple and puts conditional logic next to the data it depends on.

```javascript
// Check IP allowlist before FGA call
const clientIp = req.headers['x-forwarded-for'];
const allowedCidrs = await getAllowedCidrs(resourceId);

if (!isIpInCidrs(clientIp, allowedCidrs)) {
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

Syncing millions of entities into FGA creates reconciliation overhead, race conditions, and consistency challenges. Instead, check access at the parent container level and filter entities in your application. This pattern also replaces SpiceDB's caveats for many use cases — instead of conditional relationships stored in SpiceDB, you handle the conditions in your app before the FGA check.

For detailed guidance on this pattern, see [High-Cardinality Entities](https://workos.com/docs/fga/high-cardinality-entities).

***

## Migration steps

1. **Analyze `.zed` schema** — Identify definitions, relations, and permissions
2. **Define resource types** in the WorkOS Dashboard matching your definitions
3. **Define permissions** for each type (e.g., `view`, `edit`, `manage`)
4. **Create roles** that bundle permissions, including child-type permissions for inheritance
5. **Register resources** via API when entities are created
6. **Migrate relationships** to role assignments
7. **Replace SpiceDB checks** with WorkOS FGA `check` API calls

### API migration

**SpiceDB CheckPermission (JavaScript):**

```javascript
const { authorized } = await client.checkPermission(
  v1.CheckPermissionRequest.create({
    resource: v1.ObjectReference.create({
      objectType: 'project',
      objectId: 'proj_123',
    }),
    permission: 'view',
    subject: v1.SubjectReference.create({
      object: v1.ObjectReference.create({
        objectType: 'user',
        objectId: 'user_456',
      }),
    }),
  }),
);
```

**WorkOS FGA Check (JavaScript):**

```javascript
const { authorized } = await workos.authorization.check({
  organizationMembershipId: 'om_01HXYZ', // available in a session token or via the API
  permissionSlug: 'project:view',
  resourceTypeSlug: 'project',
  resourceExternalId: 'proj_123',
});
```

***

## Example migration

### SpiceDB schema

```text
definition user {}

definition organization {
    relation admin: user
    relation member: user

    permission manage = admin
    permission access = admin + member
}

definition workspace {
    relation org: organization
    relation viewer: user
    relation editor: user

    permission view = org->access + viewer + editor
    permission edit = org->admin + editor
}

definition project {
    relation workspace: workspace
    relation contributor: user

    permission view = workspace->view + contributor
    permission edit = workspace->edit + contributor
}
```

### WorkOS FGA equivalent

**Resource type hierarchy:**

```text
organization (built-in)
└── workspace
    └── project
```

**Roles for `organization`:**

| Role   | Permissions                                                                      |
| ------ | -------------------------------------------------------------------------------- |
| member | `organization:access`, `workspace:view`, `project:view`                          |
| admin  | All member permissions + `organization:manage`, `workspace:edit`, `project:edit` |

**Roles for `workspace`:**

| Role   | Permissions                                                        |
| ------ | ------------------------------------------------------------------ |
| viewer | `workspace:view`, `project:view`                                   |
| editor | `workspace:view`, `workspace:edit`, `project:view`, `project:edit` |

**Roles for `project`:**

| Role        | Permissions                    |
| ----------- | ------------------------------ |
| contributor | `project:view`, `project:edit` |

**Key insights:**

- `org->access` arrow — Replaced by org member role including workspace/project view
- `workspace->edit` arrow — Replaced by workspace editor role including project edit
- No explicit traversals needed — Inheritance happens automatically

***

## Next steps

- [Resource Types](https://workos.com/docs/fga/resource-types) — Design your hierarchy
- [Roles and Permissions](https://workos.com/docs/fga/roles-and-permissions) — Configure inheritance patterns
- [AuthKit Integration](https://workos.com/docs/fga/authkit-integration) — Embed permissions in access tokens
- [IdP Role Assignment](https://workos.com/docs/fga/idp-role-assignment) — Map IdP groups to roles
- [Assignments](https://workos.com/docs/fga/assignments) — Migrate your relationships to role assignments
- [Access Checks](https://workos.com/docs/fga/access-checks) — Replace SpiceDB check calls
