# Protecting API Endpoints

## What you'll build

This guide shows how to use the [`check`](https://workos.com/docs/fga/access-checks) endpoint to protect every CRUD operation in a REST API. The same call pattern works across create, read, update, and delete handlers.

The example is a project management API with two resource types: workspaces contain projects. By the end, you'll have:

- A consistent pattern for gating handlers on a single permission check
- Protected `POST`, `GET`, `PATCH`, and `DELETE` endpoints for projects
- A reusable middleware that handles checks in one place
- Security guidance on returning 404 versus 403

```text
organization (implicit root)
└─ workspace
   └─ project
```

This guide uses only the `check` endpoint. For list endpoints, see [`listResourcesForMembership`](https://workos.com/docs/fga/resource-discovery). For detail pages that gate multiple UI components, see [`listEffectivePermissions`](https://workos.com/docs/fga/model-your-app-multi-level-inheritance).

***

## 1. The check pattern

Every protected endpoint follows the same shape: identify the user, identify the resource, run a single `check` for the relevant permission, and proceed only if the check passes.

```javascript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function performAction(req, res) {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Perform the action
}
```

The check resolves all sources of access in one call—direct assignments on the project, inherited roles on the parent workspace, and organization-scoped roles. The handler does not need to walk the hierarchy or merge results.

The permissions used in this guide:

| Permission       | Resource type | Used by          |
| ---------------- | ------------- | ---------------- |
| `project:view`   | project       | Read endpoints   |
| `project:edit`   | project       | Update endpoints |
| `project:delete` | project       | Delete endpoints |
| `project:create` | workspace       | Create endpoint  |

***

## 2. Read a resource

A read handler checks `project:view` on the project before returning it.

```javascript
app.get('/projects/:projectId', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const project = await db.projects.findUnique({ where: { id: projectId } });
  if (!project) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.json(project);
});
```

The check runs before the database lookup. Authorization should be evaluated independently of whether the row exists in the database.

***

## 3. Create a resource

A create handler checks `project:create` on the parent workspace. The project itself does not exist yet, so the check applies to the resource the new project will belong to.

```javascript
app.post('/workspaces/:workspaceId/projects', async (req, res) => {
  const { organizationId, organizationMembershipId } = req.user;
  const { workspaceId } = req.params;
  const { name } = req.body;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:create',
    resourceTypeSlug: 'workspace',
    resourceExternalId: workspaceId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const project = await db.projects.create({
    data: { name, workspaceId, organizationId },
  });

  await workos.authorization.createResource({
    organizationId,
    resourceTypeSlug: 'project',
    externalId: project.id,
    name: project.name,
    parentResourceTypeSlug: 'workspace',
    parentResourceExternalId: workspaceId,
  });

  return res.json(project);
});
```

`project:create` is defined on the project resource type but is included as a child-type permission in workspace-scoped roles like `workspace-admin`. Asking whether the user has `project:create` on the workspace returns true if any role assignment on the workspace bundles that permission.

The same pattern works for top-level resources. To check whether a user can create a workspace, run `check` with `resourceTypeSlug: 'organization'` and the organization's ID as the external ID.

***

## 4. Update a resource

An update handler checks `project:edit` on the project before applying the change.

```javascript
app.patch('/projects/:projectId', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:edit',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const project = await db.projects.update({
    where: { id: projectId },
    data: req.body,
  });

  return res.json(project);
});
```

Run a separate check for any operation that requires a different permission. A `PATCH` that moves a project between workspaces, for example, should check both `project:edit` on the project and `project:create` on the destination workspace.

***

## 5. Delete a resource

A delete handler checks `project:delete` on the project before removing it.

```javascript
app.delete('/projects/:projectId', async (req, res) => {
  const { organizationMembershipId, organizationId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:delete',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  await db.projects.delete({ where: { id: projectId } });

  await workos.authorization.deleteResourceByExternalId({
    organizationId,
    resourceTypeSlug: 'project',
    externalId: projectId,
  });

  return res.status(204).end();
});
```

Delete the FGA resource after the database delete completes. This keeps the two systems in sync and removes any role assignments that were attached to the project. See [Resources](https://workos.com/docs/fga/resources) for cascade behavior on resources with children.

***

## 6. A reusable check middleware

Every handler above runs the same three steps: pull the membership and resource ID from the request, call `check`, return 404 if it fails. Lifting that into a middleware keeps the route handlers focused on business logic.

```javascript
function requirePermission({ permissionSlug, resourceTypeSlug, paramName }) {
  return async (req, res, next) => {
    const { organizationMembershipId } = req.user;
    const externalId = req.params[paramName];

    const { authorized } = await workos.authorization.check({
      organizationMembershipId,
      permissionSlug,
      resourceTypeSlug,
      resourceExternalId: externalId,
    });

    if (!authorized) {
      return res.status(404).json({ error: 'Not found' });
    }

    return next();
  };
}
```

The CRUD routes become declarative:

```javascript
app.get(
  '/projects/:projectId',
  requirePermission({
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    paramName: 'projectId',
  }),
  getProjectHandler,
);

app.post(
  '/workspaces/:workspaceId/projects',
  requirePermission({
    permissionSlug: 'project:create',
    resourceTypeSlug: 'workspace',
    paramName: 'workspaceId',
  }),
  createProjectHandler,
);

app.patch(
  '/projects/:projectId',
  requirePermission({
    permissionSlug: 'project:edit',
    resourceTypeSlug: 'project',
    paramName: 'projectId',
  }),
  updateProjectHandler,
);

app.delete(
  '/projects/:projectId',
  requirePermission({
    permissionSlug: 'project:delete',
    resourceTypeSlug: 'project',
    paramName: 'projectId',
  }),
  deleteProjectHandler,
);
```

The check now lives in one place. New routes opt in by adding the middleware with the right permission and resource type.

***

## 7. Return 404 instead of 403

Every example in this guide returns 404 when the check fails, not 403. A 403 confirms that the resource exists, which can leak information across organization boundaries. A user who guesses a project ID belonging to another organization should not be able to tell whether the project exists.

There is one exception: when authorization fails on the parent resource for a create operation, returning 403 is acceptable because the parent resource is already in a URL the user is allowed to know about (the workspace they just opened). For example, `POST /workspaces/:workspaceId/projects` can return 403 if the user has `workspace:view` but not `project:create`, because the user already knows the workspace exists.

A practical rule:

- If the user cannot see the resource at all, return 404
- If the user can see the resource but cannot perform this action, return 403

For most CRUD endpoints, the simpler choice is 404 for everything.

***

`check` is enough for every CRUD endpoint because it resolves the full hierarchy in one call. There is no need to look up parent resources, walk roles, or merge permission sets in the application.
