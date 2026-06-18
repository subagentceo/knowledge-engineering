# Migrate from Oso Cloud

## Overview

This guide helps you migrate from Oso Cloud to WorkOS FGA. Oso Cloud uses the Polar language to define authorization policies with explicit fact storage. WorkOS FGA takes a different approach: hierarchical role-based access control with automatic permission inheritance configured through a Dashboard.

***

## Key differences

| Oso Cloud Concept    | WorkOS FGA Equivalent             |
| -------------------- | --------------------------------- |
| `resource` blocks    | Resource Types                    |
| `roles` array        | Roles                             |
| `permissions` array  | Permissions                       |
| `relations`          | Parent-child hierarchy            |
| `has_role` facts     | Role Assignments                  |
| `has_relation` facts | Resource registration with parent |
| `actor User {}`      | Organization Memberships          |
| Local Authorization  | App-side traversal (see below)    |
| Polar DSL            | Dashboard configuration           |

### Architecture shift

Oso Cloud requires you to write Polar policies and manage facts. WorkOS FGA simplifies this:

1. **Permissions flow down automatically** — A role at a parent level grants access to all children without additional facts
2. **Roles are scoped to resource types** — Each resource type has its own set of roles
3. **Single parent per resource instance** — Each resource instance has exactly one parent, creating predictable traversal paths
4. **No policy DSL** — Configure resource types, roles, and permissions in the Dashboard
5. **Native WorkOS integration** — Works seamlessly with AuthKit, SSO, Directory Sync, and IdP role assignment

### WorkOS product integration

Unlike standalone authorization systems, WorkOS FGA integrates natively with the WorkOS identity platform (although it [can be used standalone](https://workos.com/docs/fga/standalone-integration)):

- **AuthKit Integration** — Organization-scoped roles and permissions are embedded in access tokens for instant JWT-based checks
- **IdP Role Assignment** — Map identity provider groups (Okta, Azure AD, Google Workspace) directly to organization-scoped roles
- **Directory Sync** — Automatically provision and deprovision users with appropriate role assignments when group memberships change
- **SSO** — Enterprise SSO users get role assignments based on IdP group membership during authentication

***

## Polar syntax reference

Key patterns in Oso Polar:

- `roles = [...]` — Define available roles on a resource
- `permissions = [...]` — Define available permissions
- `relations = {...}` — Define relationships to other resources
- `"permission" if "role"` — Grant permission to role
- `"role" if "role"` — Role inheritance
- `role if role on "relation"` — Inherit roles from related resource

***

## Step 1: Map resources to resource types

Extract `resource` blocks from your Polar policy. These become resource types in WorkOS FGA.

**Create resource types for:**

- Business containers: organizations, workspaces, projects, environments
- Shareable entities: apps, pipelines, repositories, dashboards

**Exclude:**

- `actor User {}` — Use Organization Memberships as subjects instead
- `actor Group {}` — User groups are coming soon; for now, assign roles directly to users

### Example

```text
# Oso Cloud
actor User {}
resource Organization {}
resource Workspace {}
resource Project {}

# WorkOS FGA Resource Types
organization (built-in)
└── workspace
    └── project
```

Navigate to **Authorization > Resource Types** in the [Dashboard](https://workos.com/docs/fga/resource-types/creating-and-managing-resource-types/using-the-dashboard) to create your hierarchy.

***

## Step 2: Establish hierarchy

Map Oso `relations` to WorkOS FGA parent-child resource type relationships.

### Oso Cloud pattern

```text
resource Project {
  relations = { workspace: Workspace };
}
```

### WorkOS FGA equivalent

Create a `workspace` resource type with `organization` as its parent. Create a `project` resource type with `workspace` as its parent. The parent relationship is defined at the resource type level.

When you register individual project resources instances via the API, you specify the parent workspace. Permissions flow down this hierarchy without explicit facts.

***

## Step 3: Convert roles and permissions

Oso `roles` and `permissions` arrays map directly to WorkOS FGA roles and permissions.

### Oso Cloud pattern

```text
resource Project {
  roles = ["viewer", "editor", "admin"];
  permissions = ["read", "write", "manage"];

  "read" if "viewer";
  "write" if "editor";
  "manage" if "admin";
  "viewer" if "editor";
  "editor" if "admin";
}
```

### WorkOS FGA equivalent

Create roles on the `project` resource type:

| Role   | Permissions                                       |
| ------ | ------------------------------------------------- |
| viewer | `project:read`                                    |
| editor | `project:read`, `project:write`                   |
| admin  | `project:read`, `project:write`, `project:manage` |

The role inheritance (`"viewer" if "editor"`) becomes permissions bundled into roles. Higher-privilege roles include all permissions from lower-privilege roles.

> **Permission slug convention:** Permission slugs are arbitrary text, but we recommend the pattern `{resource-type}:{action}` for clarity. Each permission must be explicitly scoped to a resource type in the Dashboard—[see more about permissions](https://workos.com/docs/fga/roles-and-permissions). When a role includes permissions scoped to child resource types (like `project:read` on a workspace role), it grants that permission on all child resources of that type.

***

## Step 4: Handle role inheritance via relations

Oso's `role if role on "relation"` pattern is replaced by native hierarchical inheritance.

### Oso Cloud pattern

```text
resource Workspace {
  roles = ["viewer", "editor"];
}

resource Project {
  permissions = ["read", "write"];
  relations = { workspace: Workspace };
  role if role on "workspace";
}
```

### WorkOS FGA equivalent

Create a `workspace` resource type with roles that include child-type permissions:

| Role (on workspace) | Permissions                                                          |
| ------------------- | -------------------------------------------------------------------- |
| viewer              | `workspace:read`, `project:read`                                     |
| editor              | `workspace:read`, `workspace:write`, `project:read`, `project:write` |

When you assign `workspace:viewer` to a user, they automatically get `project:read` on all projects within that workspace. No explicit per-project facts needed.

***

## Step 5: Map permission patterns

| Oso Cloud Pattern                      | WorkOS FGA Equivalent                         |
| -------------------------------------- | --------------------------------------------- |
| `"permission" if "role"`               | Permission included in role                   |
| `"role" if "role"`                     | Higher role includes lower role's permissions |
| `role if role on "relation"`           | Native inheritance (automatic)                |
| `"permission" if "role" on "relation"` | Include permission in parent role             |
| Custom Polar rules                     | Check conditions in app code                  |
| `and` expressions                      | Check multiple conditions in app code         |
| `not` expressions                      | Permission exclusions (coming soon)           |

***

## Replacing Local Authorization

Oso's Local Authorization generates SQL queries that you run against your database. WorkOS FGA takes a different approach: keep high-cardinality data in your database and traverse to FGA-managed resources in your application code.

### Why this approach?

- **Simpler architecture** — No SQL generation or policy-database mapping configuration
- **Clearer boundaries** — FGA handles coarse-grained access, your app handles fine-grained filtering
- **Better performance** — Single parent traversal path, no complex joins
- **No config drift** — Authorization logic lives in your code, not a separate YAML file

### Example: file access via parent project

Instead of configuring Local Authorization mappings, look up the parent resource and check access there:

```typescript
async function canUserAccessFile(
  organizationMembershipId: string,
  fileId: string,
): Promise<boolean> {
  // 1. Look up the file to find its parent project
  const file = await db.files.findUnique({ where: { id: fileId } });
  if (!file) return false;

  // 2. Check access at the project level (FGA-managed)
  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    resourceExternalId: file.projectId,
  });

  return authorized;
}
```

This replaces Oso's Local Authorization YAML configuration:

```yaml
# Oso Local Authorization config (no longer needed)
facts:
  has_relation(File:_, parent, Project:_):
    query: SELECT id, project_id FROM files
  has_role(User:_, String:_, Project:_):
    query: SELECT user_id, role, project_id FROM project_memberships

sql_types:
  File: UUID
  Project: UUID
```

With this approach, traversal logic lives in your application code where it's easier to test, debug, and version alongside your business logic.

***

## High-cardinality entities

Not everything belongs in FGA. We recommend using FGA for lower-cardinality resources (organizations, workspaces, projects) and handling high-cardinality entities (files, messages, comments) in your application.

Syncing millions of entities into FGA creates reconciliation overhead, race conditions, and consistency challenges. Instead, check access at the parent container level and filter entities in your application.

For detailed guidance on this pattern, see [High-Cardinality Entities](https://workos.com/docs/fga/high-cardinality-entities).

***

## Migration steps

1. **Analyze Polar policy** — Identify resource blocks, roles, permissions, and relations
2. **Define resource types** in the WorkOS Dashboard matching your resources
3. **Define permissions** for each type (e.g., `read`, `write`, `manage`)
4. **Create roles** that bundle permissions, including child-type permissions for inheritance
5. **Register resources** via API when entities are created in your app
6. **Migrate facts** — Convert `has_role` to role assignments, `has_relation` to resource registration
7. **Replace Oso checks** with WorkOS FGA `check` API calls
8. **Replace Local Authorization** with app-side traversal for high-cardinality entities

### API migration

**Oso Cloud authorize (JavaScript):**

```javascript
const authorized = await oso.authorize({ type: 'User', id: 'alice' }, 'read', {
  type: 'Project',
  id: 'proj_123',
});
```

**WorkOS FGA Check (JavaScript):**

```javascript
const { authorized } = await workos.authorization.check({
  organizationMembershipId: 'om_01HXYZ', // available in a session token or via the API
  permissionSlug: 'project:read',
  resourceTypeSlug: 'project',
  resourceExternalId: 'proj_123',
});
```

***

## Example migration

### Oso Cloud policy

```text
actor User {}

resource Organization {
  roles = ["admin", "member"];
  permissions = ["manage", "read"];

  "read" if "member";
  "manage" if "admin";
  "member" if "admin";
}

resource Workspace {
  roles = ["viewer", "editor"];
  permissions = ["read", "write"];
  relations = { organization: Organization };

  role if role on "organization";
  "viewer" if "member" on "organization";
  "editor" if "admin" on "organization";
  "read" if "viewer";
  "write" if "editor";
}

resource Project {
  relations = { workspace: Workspace };

  "read" if "viewer" on "workspace";
  "write" if "editor" on "workspace";
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

| Role   | Permissions                                                                        |
| ------ | ---------------------------------------------------------------------------------- |
| member | `organization:read`, `workspace:read`, `project:read`                              |
| admin  | All member permissions + `organization:manage`, `workspace:write`, `project:write` |

**Roles for `workspace`:**

| Role   | Permissions                                                          |
| ------ | -------------------------------------------------------------------- |
| viewer | `workspace:read`, `project:read`                                     |
| editor | `workspace:read`, `workspace:write`, `project:read`, `project:write` |

**Key insights:**

- `role if role on "organization"` — Replaced by org roles including workspace/project permissions
- `"viewer" if "member" on "organization"` — Org member role includes workspace:read
- No explicit Polar rules needed — Inheritance happens automatically

***

## Next steps

- [Resource Types](https://workos.com/docs/fga/resource-types) — Design your hierarchy
- [Roles and Permissions](https://workos.com/docs/fga/roles-and-permissions) — Configure inheritance patterns
- [AuthKit Integration](https://workos.com/docs/fga/authkit-integration) — Embed permissions in access tokens
- [IdP Role Assignment](https://workos.com/docs/fga/idp-role-assignment) — Map IdP groups to roles
- [Assignments](https://workos.com/docs/fga/assignments) — Migrate your facts to role assignments
- [Access Checks](https://workos.com/docs/fga/access-checks) — Replace Oso authorize calls
