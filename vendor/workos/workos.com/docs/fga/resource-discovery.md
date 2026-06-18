# Resource Discovery

## Overview

Beyond permission checks, FGA provides endpoints to discover access relationships. These power common product features like member lists, a sharing dialog, and scoped navigation.

***

## List users for a resource

Find all users with access to a resource:

```bash
curl "https://api.workos.com/authorization/resources/authz_resource_01HXYZ/organization_memberships?permission_slug=project:edit" \
  -H "Authorization: Bearer sk_example_123456789"
```

### Direct vs. indirect assignments

Use the `assignment` parameter to control whether results include only users with direct assignments or also those with inherited access:

```bash
# Only users with a direct role assignment on this resource
curl "https://api.workos.com/authorization/resources/resource_01HXYZ/organization_memberships?permission_slug=project:edit&assignment=direct" \
  -H "Authorization: Bearer sk_example_123456789"

# All users who can access this resource (direct + inherited)
curl "https://api.workos.com/authorization/resources/resource_01HXYZ/organization_memberships?permission_slug=project:edit&assignment=indirect" \
  -H "Authorization: Bearer sk_example_123456789"
```

**Direct assignments** (default) return only users with an explicit role on this specific resource. For example, users assigned as `project-editor` directly on this project.

**Indirect assignments** return all users with access, including through parent resources. Users with `workspace-admin` on the parent workspace appear in results, as do users with organization-scoped roles that grant the permission.

### Real-world examples

**Access audit** – An admin reviews who has been explicitly granted access to a sensitive project. Use `assignment=direct` to see only users with direct role assignments, excluding those with inherited access from workspace or organization-scoped roles.

**Member list** – A project page displays all team members who can access the project. Use `assignment=indirect` to show everyone who can access it, whether through direct project membership, workspace membership, or organization-scoped roles.

**Sharing confirmation** – Before inviting a collaborator to a project, verify who already has access. Query with `permission=project:view&assignment=indirect` to see all users who can view the project, including inherited access.

**Compliance reporting** – Generate reports of users with admin access to critical resources. Use `permission_slug=workspace:admin&assignment=direct` to identify users explicitly assigned admin roles, separate from those with inherited organization-level admin access.

***

## List resources for a user

Find all resources where a user has a specific permission:

```bash
curl "https://api.workos.com/authorization/organization_memberships/om_01HXYZ/resources?permission_slug=project:edit&parent_resource_id=authz_resource_01HXYZ" \
  -H "Authorization: Bearer sk_example_123456789"
```

This endpoint returns all child resources of a parent where the user has the specified permission, including through inheritance. For example, if a user's `workspace-admin` role includes `proj:edit`, all projects in that workspace appear when querying for `proj:edit`—even without direct project assignments.

### Real-world examples

**Scoped navigation** – A project management app shows only the projects a user can access in their sidebar within a specific workspace. Query with `parent_resource_id` set to the workspace.

**Sharing dialog** – When inviting a collaborator, filter the project picker to show only projects where the user has edit access within the current workspace.

**"My Projects" view** – Display all projects under a workspace where a user can perform specific actions. The query includes projects accessible through higher-level roles.

***

## How inheritance affects results

When listing users for a resource, the full permission hierarchy is considered. A user with `workspace-admin` on a workspace will appear in results for all projects in that workspace, even without direct project assignments. Use the `assignment` parameter to control whether inherited access is included.

When listing resources for a user, only resources where the user has a direct role assignment on the parent resource or any child resources are returned. Indirect assignment lookups are not supported yet.
