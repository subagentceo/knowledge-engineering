# Multi-level Inheritance

## What you'll build

This guide extends the [Basic App](https://workos.com/docs/fga/model-your-app-basic) to a multi-level hierarchy where users navigate down through nested resources. At each level, the list shows only the resources the user can access. At the leaf, a detail page renders many UI components, each gated on a different permission.

The example is a deployment platform with three resource types: workspaces contain projects, and projects contain apps. By the end, you'll have:

- A three-level resource type hierarchy
- Navigation views that list workspaces, then projects within a workspace, then apps within a project
- An app detail page that fetches the user's effective permissions in a single call and renders the appropriate components
- An understanding of when to use `listEffectivePermissions` instead of repeated `check` calls

```text
organization (implicit root)
└─ workspace
   └─ project
      └─ app
```

***

## 1. Model the hierarchy

Create three resource types in the [WorkOS Dashboard](https://dashboard.workos.com/) under **Authorization > Resource Types**. Each one points to its parent.

| Name        | Slug        | Parent       |
| ----------- | ----------- | ------------ |
| `Workspace` | `workspace` | Organization |
| `Project`   | `project`   | Workspace    |
| `App`       | `app`       | Project      |

Permissions assigned higher in the hierarchy flow down. A user with a workspace-scoped role automatically has the corresponding access on every project and app inside that workspace. See [Resource types](https://workos.com/docs/fga/resource-types) for hierarchy constraints and validation rules.

***

## 2. Define roles and permissions

Define permissions for each resource type, then create roles that bundle them. Roles can include permissions for child types, which is what enables inheritance across the hierarchy.

| Permission           | Resource type | Description                  |
| -------------------- | ------------- | ---------------------------- |
| `workspace:view`     | workspace     | View a workspace             |
| `workspace:manage`   | workspace     | Edit workspace settings      |
| `project:view`       | project       | View a project               |
| `project:edit`       | project       | Edit a project               |
| `project:create_app` | project       | Create apps inside a project |
| `app:view`           | app           | View an app                  |
| `app:deploy`         | app           | Deploy an app                |
| `app:configure`      | app           | Edit app settings            |
| `app:view_logs`      | app           | Read deployment logs         |
| `app:delete`         | app           | Delete an app                |

Bundle these into roles scoped to each resource type. A role scoped to `workspace` can include permissions on `project` and `app` because those are descendant types.

| Role               | Scoped to | Permissions                                                                                                                                                          |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspace-admin`  | workspace | `workspace:view`, `workspace:manage`, `project:view`, `project:edit`, `project:create_app`, `app:view`, `app:deploy`, `app:configure`, `app:view_logs`, `app:delete` |
| `workspace-member` | workspace | `workspace:view`, `project:view`, `app:view`                                                                                                                         |
| `project-editor`   | project   | `project:view`, `project:edit`, `project:create_app`, `app:view`, `app:deploy`, `app:configure`, `app:view_logs`                                                     |
| `app-deployer`     | app       | `app:view`, `app:deploy`, `app:view_logs`                                                                                                                            |

A `workspace-admin` assignment on a single workspace grants full control of every project and app in it without any per-resource assignment. A `project-editor` assignment grants access to one project and its apps. An `app-deployer` assignment grants access to one app only. See [Roles and permissions](https://workos.com/docs/fga/roles-and-permissions) for more on inheritance.

***

## 3. Register resources as they are created

Register the corresponding FGA resource each time a workspace, project, or app is created in the database. Use the database ID as the `external_id` and reference the parent by its external ID and type.

```javascript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

app.post('/workspaces', async (req, res) => {
  const { organizationId, organizationMembershipId } = req.user;
  const { name } = req.body;

  const workspace = await db.workspaces.create({
    data: { name, organizationId },
  });

  await workos.authorization.createResource({
    organizationId,
    resourceTypeSlug: 'workspace',
    externalId: workspace.id,
    name: workspace.name,
  });

  await workos.authorization.assignRole({
    organizationMembershipId,
    roleSlug: 'workspace-admin',
    resourceTypeSlug: 'workspace',
    resourceExternalId: workspace.id,
  });

  return res.json(workspace);
});

app.post('/workspaces/:workspaceId/projects', async (req, res) => {
  const { organizationId } = req.user;
  const { workspaceId } = req.params;
  const { name } = req.body;

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

Apps follow the same pattern with `parentResourceTypeSlug: 'project'`. Note that the workspace creator gets `workspace-admin`, which already includes every project and app permission. There's no need to create per-project or per-app assignments for the creator—inheritance handles it.

***

## 4. Navigate the hierarchy

At each level, the UI lists the resources the user can access.

### List workspaces

```javascript
app.get('/workspaces', async (req, res) => {
  const { organizationMembershipId } = req.user;

  const { data } = await workos.authorization.listResourcesForMembership({
    organizationMembershipId,
    permissionSlug: 'workspace:view',
    resourceTypeSlug: 'workspace',
  });

  const workspaces = await db.workspaces.findMany({
    where: { id: { in: data.map((r) => r.externalId) } },
  });

  return res.json(workspaces);
});
```

Use [`listResourcesForMembership`](https://workos.com/docs/fga/resource-discovery) with the appropriate `parent_resource` filter to scope results to the current view.

### List projects inside a workspace

```javascript
app.get('/workspaces/:workspaceId/projects', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { workspaceId } = req.params;

  const { data } = await workos.authorization.listResourcesForMembership({
    organizationMembershipId,
    permissionSlug: 'project:view',
    resourceTypeSlug: 'project',
    parentResourceTypeSlug: 'workspace',
    parentResourceExternalId: workspaceId,
  });

  const projects = await db.projects.findMany({
    where: { id: { in: data.map((r) => r.externalId) } },
  });

  return res.json(projects);
});
```

A user with `workspace-admin` on the workspace lists every project for the workspace, because `project:view` is included in the role through inheritance. A user with `project-editor` on a single project only lists that project. A user with neither role sees nothing.

The app list follows the same pattern with `permission_slug=app:view` and `parent_resource_type_slug=project`.

***

## 5. Power the detail page with effective permissions

The app detail page renders multiple components, each gated on a different permission. Rather than calling `check` once per component, use [`listEffectivePermissions`](https://workos.com/docs/reference/fga/access-check/list-effective-permissions) to fetch every permission the user has on the resource in a single call. Inherited permissions from workspace and project roles are included automatically.

```javascript
app.get('/apps/:appId', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { appId } = req.params;

  const { data: permissions } =
    await workos.authorization.listEffectivePermissionsByExternalId({
      organizationMembershipId,
      resourceTypeSlug: 'app',
      externalId: appId,
    });

  const slugs = new Set(permissions.map((p) => p.slug));

  if (!slugs.has('app:view')) {
    return res.status(404).json({ error: 'Not found' });
  }

  const app = await db.apps.findUnique({ where: { id: appId } });

  if (!app) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.json({
    app,
    permissions: {
      canDeploy: slugs.has('app:deploy'),
      canConfigure: slugs.has('app:configure'),
      canViewLogs: slugs.has('app:view_logs'),
      canDelete: slugs.has('app:delete'),
    },
  });
});
```

The returned permission list reflects the user's full access on this resource, including everything inherited from roles on parent resources. A workspace admin sees every `app:*` permission here, even though they don't have any direct assignment on the app itself.

The React component renders one section per permission:

```jsx
function AppDetail() {
  const { appId } = useParams();
  const { data, isLoading } = useQuery(`/apps/${appId}`);

  if (isLoading) return <Spinner />;
  if (!data) return <NotFound />;

  const { app, permissions } = data;

  return (
    <article>
      <h1>{app.name}</h1>
      <Overview app={app} />

      {permissions.canViewLogs && <LogsPanel appId={app.id} />}
      {permissions.canDeploy && <DeployButton appId={app.id} />}
      {permissions.canConfigure && <SettingsForm app={app} />}
      {permissions.canDelete && <DangerZone appId={app.id} />}
    </article>
  );
}
```

Every component above the fold is rendered based on the same permission set, fetched once. There are no waterfall requests as the page hydrates, and adding a new permission-gated component is a one-line change.

***

## 6. When to use each access check endpoint

FGA exposes four endpoints for answering authorization questions. Pick the one that matches the shape of the question.

| Endpoint                      | Use when                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `check`                       | A single permission on a single resource. Best for action handlers and route gates.                            |
| `listEffectivePermissions`    | Many permissions on a single resource. Best for detail pages that render multiple permission-gated components. |
| `listResourcesForMembership`  | A single permission across many resources. Best for list views, navigation, and pickers.                       |
| `listMembershipsForResource`  | All users who have a permission on a single resource. Best for share dialogs and member lists.                  |

The pattern from the [Basic App](https://workos.com/docs/fga/model-your-app-basic) used `check` for a single permission gate. As soon as the detail page needs more than two or three permissions, prefer `listEffectivePermissions`. It returns the full permission set in one call instead of fanning out to multiple `check` requests.

The same applies in the opposite direction. When the question is "which resources can this user access," use `listResourcesForMembership` rather than calling `check` once per candidate resource.

***

Inheritance is what makes this scale. A single workspace-admin assignment grants access to every project and app under that workspace. The list endpoints surface inherited access automatically, and the detail page sees the full inherited permission set in one fetch.
