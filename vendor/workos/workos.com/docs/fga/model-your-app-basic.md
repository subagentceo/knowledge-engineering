# Basic App

## What you'll build

This guide shows how to use FGA in the two most common UI patterns in a B2B application: a list view that shows the resources a user can access, and a detail view that gates a single resource on a per-user permission.

The example is a small project management application. By the end, you'll have:

- A `project` resource type and a pair of roles
- A `/projects` page that lists only the projects the signed-in user can access
- A `/projects/:id` page that returns 404 if the user can't view it
- Empty state handling for users with no accessible projects

The model uses a single resource type under the organization. Deeper hierarchies are covered in the [Multi-level Inheritance](https://workos.com/docs/fga/model-your-app-multi-level-inheritance) guide.

```text
organization (implicit root)
└─ project
```

***

## 1. Model the hierarchy

A single resource type works well for list and detail apps where every resource is a peer. There are no parent workspaces or nested sub-projects—just projects that belong to an organization.

In the [WorkOS Dashboard](https://dashboard.workos.com/), navigate to **Authorization > Resource Types** and create one resource type:

| Name      | Slug      | Parent       |
| --------- | --------- | ------------ |
| `Project` | `project` | Organization |

For the full Dashboard walkthrough, see the [Quick Start](https://workos.com/docs/fga/quick-start) guide.

***

## 2. Define roles and permissions

The list and detail views need to answer two questions: can the user view this project, and can the user edit it? Create three permissions and two roles, all scoped to the `project` resource type.

| Permission       | Resource type | Description      |
| ---------------- | ------------- | ---------------- |
| `project:view`   | project       | View a project   |
| `project:edit`   | project       | Edit a project   |
| `project:delete` | project       | Delete a project |

| Role             | Scoped to | Permissions                                      |
| ---------------- | --------- | ------------------------------------------------ |
| `project-viewer` | project   | `project:view`                                   |
| `project-editor` | project   | `project:view`, `project:edit`, `project:delete` |

Because the roles are scoped to `project`, each assignment grants access to exactly one project. For step-by-step instructions, see the [Quick Start](https://workos.com/docs/fga/quick-start) guide.

***

## 3. Register projects as resources

Resources should be registered as users create entities in your application. When a project is created in your database, create a matching FGA resource using the project's database ID as the `external_id` in WorkOS. This allows your application to reference projects in WorkOS by their own primary key.

```javascript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

app.post('/projects', async (req, res) => {
  const { organizationId, organizationMembershipId } = req.user;
  const { name } = req.body;

  const project = await db.projects.create({
    data: { name, organizationId, createdBy: organizationMembershipId },
  });

  await workos.authorization.createResource({
    organizationId,
    resourceTypeSlug: 'project',
    externalId: project.id,
    name: project.name,
  });

  await workos.authorization.assignRole({
    organizationMembershipId,
    roleSlug: 'project-editor',
    resourceTypeSlug: 'project',
    resourceExternalId: project.id,
  });

  return res.json(project);
});
```

Two operations run on every project creation. The project is registered as an FGA resource so it can be referenced in access checks, and the creator is assigned `project-editor` on the new project so they can edit it immediately.

***

## 4. Grant access to other users

To share a project with a teammate, assign the appropriate role on that specific project:

```javascript
await workos.authorization.assignRole({
  organizationMembershipId: 'om_02HXYZ',
  roleSlug: 'project-viewer',
  resourceTypeSlug: 'project',
  resourceExternalId: 'proj_01H',
});
```

A single resource-scoped assignment grants access to that project only. See [Role assignments](https://workos.com/docs/fga/assignments) for more on assignment management.

***

## 5. Power the list view

The list view needs the set of projects the signed-in user can see. Use the [list resources for a user](https://workos.com/docs/fga/resource-discovery) endpoint, filtering by `project:view`:

```javascript
app.get('/projects', async (req, res) => {
  const { organizationMembershipId } = req.user;

  const { data: accessibleResources } =
    await workos.authorization.listResourcesForMembership({
      organizationMembershipId,
      permissionSlug: 'project:view',
      resourceTypeSlug: 'project',
      limit: 50,
    });

  const externalIds = accessibleResources.map((r) => r.externalId);

  const projects = await db.projects.findMany({
    where: { id: { in: externalIds } },
  });

  return res.json(projects);
});
```

This is a common pattern: ask FGA for the resource IDs the user can access, then load the row data from your database. *FGA is the source of truth for access, and the database is the source of truth for project content.*

A React component for the list looks like this:

```jsx
function ProjectList() {
  const { data: projects, isLoading } = useQuery('/projects');

  if (isLoading) return <Spinner />;
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create a project or ask a teammate to share one with you."
        action={<Link to="/projects/new">Create project</Link>}
      />
    );
  }

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```

The empty state covers two cases: a new user who hasn't created anything yet, and a user who has no access to any projects.

### Pagination

`listResourcesForMembership` returns up to 100 results per page. For longer lists, pass the `after` cursor from the response to the next call. Match the page size to the page size of the UI to avoid fetching IDs that won't be rendered.

***

## 6. Power the detail view

The detail view gates the page on a single permission: `project:view`. Run the check before loading the project, and return 404 if the user isn't authorized.

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

The React component renders the project. The backend has already verified that the user is allowed to view it.

```jsx
function ProjectDetail() {
  const { projectId } = useParams();
  const { data: project, isLoading } = useQuery(`/projects/${projectId}`);

  if (isLoading) return <Spinner />;
  if (!project) return <NotFound />;

  return (
    <article>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </article>
  );
}
```

Gating individual UI elements like an Edit button is covered in the [Multi-level Inheritance](https://workos.com/docs/fga/model-your-app-multi-level-inheritance) guide.

***

## 7. Handle empty and forbidden states

Two patterns need explicit handling.

**Empty list.** A user with no accessible projects should see a clear call to action rather than an empty page. The list component above handles this with an empty state that suggests creating a new project.

**Forbidden detail page.** When a user navigates to a project they can't view, return 404 instead of 403. A 403 response confirms that the project exists, which can leak information across organization boundaries. The detail handler returns 404 for both unauthorized requests and missing projects.

The same pattern applies to write endpoints. An edit request for a project the user can't view should also return 404, since acknowledging that the project exists reveals information.

***

This is the smallest end-to-end FGA integration for an application with list and detail views. The other "Model your app" guides extend this shape with deeper hierarchies, high-cardinality children, and richer sharing flows.
