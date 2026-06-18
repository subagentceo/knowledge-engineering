# Access Checks

## Overview

Access checks answer: "Can this user do this action on this resource?"

FGA looks at all the ways the user might have access—a role assigned directly on the resource, a role on a parent resource that grants inherited permissions, or an organization-scoped role. If any grant the permission, the user is authorized.

***

## A quick example

Alice wants to deploy an app. Here's her access:

```text
Org: Acme (Alice: org-member)
└─ Workspace: Engineering (Alice: workspace_admin)
   └─ Project: Web
      └─ App: Frontend
```

**Can Alice deploy App: Frontend?** Yes—her `workspace-admin` role includes `app:deploy`, which flows down to all apps in that workspace.

***

## Checking permissions

**JWT (fast)** – For org-wide permissions, check the token directly. No API call needed. Good for navigation and feature flags.

**API (precise)** – For resource-specific permissions, call the authorization API:

```bash
curl https://api.workos.com/authorization/organization_memberships/om_01HXYZ/check \
  -X POST \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "permission_slug": "project:edit",
    "resource_id": "authz_resource_01HXYZ"
  }'
```

Response:

```json
{
  "authorized": true
}
```

For best performance, check the JWT first for org-wide permissions, then fall back to the API for resource-specific checks.

***

## Integrating access checks in your application

Here's how you might protect an API endpoint that updates a project. Before performing the operation, check whether the user has the `proj:edit` permission on the specific project they're trying to modify:

```javascript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

app.patch('/projects/:projectId', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  // Check if the user can edit this project
  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'proj:edit',
    resourceExternalId: projectId,
    resourceTypeSlug: 'project',
  });

  if (!authorized) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // User is authorized — proceed with the update
  const project = await updateProject(projectId, req.body);
  return res.json(project);
});
```

The `check()` method evaluates all possible sources of access — direct assignments on the project, inherited permissions from a parent workspace, and organization-scoped roles. You don't need to check each level yourself.

***

## Choosing an access check endpoint

FGA exposes four endpoints for answering authorization questions. Pick the one that matches the shape of the question.

| Endpoint                     | Use when                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `check`                      | A single permission on a single resource. Best for action handlers and route gates.                     |
| `listEffectivePermissions`   | Many permissions on a single resource. Best for detail pages that render multiple permission-gated components.  |
| `listResourcesForMembership` | A single permission across many resources. Best for list views, navigation, and pickers.                |
| `listMembershipsForResource` | All users who have a permission on a single resource. Best for share dialogs and member lists.           |

Use `check` for a single permission gate. As soon as a detail page needs more than two or three permissions, prefer `listEffectivePermissions`—it returns the full permission set in one call instead of fanning out to multiple `check` requests. When the question is "which resources can this user access," use `listResourcesForMembership` rather than calling `check` once per candidate resource.

***

## Common use cases

**Protecting actions** – Before a user performs an action, check if they're allowed. Return 403 if not.

**Showing or hiding UI** – Check permissions before rendering to show edit buttons, delete options, or admin settings only to authorized users.

**Filtering lists** – Only show resources the user can access in navigation and search results.

***

## Performance

- **Sub-50ms** response times (p95)
- **Strong consistency**—role changes take effect immediately
- **High availability** for production workloads
