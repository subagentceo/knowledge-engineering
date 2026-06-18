# High-Cardinality Entities

## Overview

We recommend using FGA for lower-cardinality resources and handling high-cardinality entities in your application. This guide explains why and shows you how.

***

## Why FGA works well for lower-cardinality resources

Lower-cardinality resources like workspaces, projects, and environments are natural boundaries for role assignments:

- **Users need explicit roles** — You assign someone as a project editor or workspace admin
- **Sharing matters** — You grant external collaborators access to specific resources
- **Permissions vary by resource** — Different teams have different access to different projects
- **Long-lived and stable** — These resources are created infrequently and change slowly, so keeping them in FGA is straightforward

High-cardinality entities like rows, artifacts, and messages rarely need this. You don't typically assign someone as a "row editor" or "message viewer" — they inherit access from the container they're in. Defining roles and permissions for millions of individual messages would be operationally complex without adding value.

***

## Why keep high-cardinality entities out of FGA

Some authorization systems encourage storing entities such as individual files, messages, and rows as relationships in FGA. After working with many customers on authorization design, we've found this creates more problems than it solves. High-cardinality entities are created frequently, change often, and exist in volumes that make keeping two systems in sync impractical. Your database is already the source of truth for these entities, and access is almost always inherited from a parent container rather than granted individually.

***

## What to sync vs. keep local

**Sync to FGA (lower cardinality):**

- Organizations, workspaces, projects
- Environments, pipelines, apps
- Repositories, dashboards, teams

**Keep in your application (high cardinality):**

- Individual files, messages, comments
- Row-level data within tables
- Logs, events, audit records
- Anything with millions of instances per organization

***

## The pattern: nearest FGA-managed parent

To check access to high-cardinality entities, your application should traverse up to the nearest FGA-managed parent before making the authorization check:

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

***

## Nested folder example

For deeply nested structures, walk up the hierarchy to find the FGA-managed parent:

```typescript
async function canUserAccessFolder(
  organizationMembershipId: string,
  folderId: string,
): Promise<boolean> {
  const MAX_DEPTH = 25;
  const visited = new Set<string>();
  let currentFolderId = folderId;

  // Walk up the folder hierarchy
  while (visited.size < MAX_DEPTH) {
    if (visited.has(currentFolderId)) {
      // Cycle detected
      return false;
    }
    visited.add(currentFolderId);

    const folder = await db.folders.findUnique({
      where: { id: currentFolderId },
    });
    if (!folder) return false;

    // Found the FGA-managed parent
    if (folder.projectId) {
      const { authorized } = await workos.authorization.check({
        organizationMembershipId,
        permissionSlug: 'project:view',
        resourceTypeSlug: 'project',
        resourceExternalId: folder.projectId,
      });
      return authorized;
    }

    // Continue up the hierarchy
    if (!folder.parentFolderId) return false;
    currentFolderId = folder.parentFolderId;
  }

  // Exceeded max depth
  return false;
}
```

***

## Fast path with JWT claims

For organization-level permissions, you can skip the FGA API call entirely by checking JWT claims:

```typescript
async function canUserAccessFile(
  session: Session,
  fileId: string,
): Promise<boolean> {
  // Fast path: check org-level permission from JWT
  if (session.permissions?.includes('project:view')) {
    return true;
  }

  // Slow path: check resource-level permission via FGA
  const file = await db.files.findUnique({ where: { id: fileId } });
  if (!file) return false;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId: session.organizationMembershipId,
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    resourceExternalId: file.projectId,
  });

  return authorized;
}
```

***

## Benefits of this approach

- **No sync overhead** — High-cardinality entities stay in your database, not FGA
- **Single source of truth** — Your database owns the entity data
- **Fast path available** — JWT claims can skip API calls for org-level permissions
- **Flexible traversal** — Your app controls how entities map to FGA resources

***

## Next steps

- [Resources](https://workos.com/docs/fga/resources) — Register and manage FGA resources
- [Access Checks](https://workos.com/docs/fga/access-checks) — Perform authorization checks
- [AuthKit Integration](https://workos.com/docs/fga/authkit-integration) — Embed permissions in access tokens
