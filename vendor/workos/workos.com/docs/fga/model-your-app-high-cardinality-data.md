# High-Cardinality Data

## What you'll build

This guide shows how to authorize high-cardinality data—documents, files, messages, rows—without syncing every record into FGA. The pattern keeps the high-volume entity in your database, stores a reference to its nearest FGA-managed parent, and runs every access check against the parent.

The example is a document editor with three layers. Workspaces and projects are modeled in FGA. Documents stay in the application database, with a `project_id` reference linking each document to the project it belongs to.

```text
organization (implicit root)
└─ workspace             ← in FGA
   └─ project            ← in FGA
      └─ document        ← in your database
```

By the end, you'll have:

- A workspace and project hierarchy in FGA
- Document permissions defined on the project resource type
- A document table in your database that references its FGA-managed parent
- Read, list, and search handlers that gate on the parent project
- A clear rule for deciding what belongs in FGA and what stays in the database

This guide builds on the patterns in [High-cardinality entities](https://workos.com/docs/fga/high-cardinality-entities).

***

## 1. Decide what goes into FGA

FGA is designed for stable, low-cardinality entities where users hold distinct roles—workspaces, projects, environments. High-cardinality entities like individual documents are different. They are created frequently, exist in volumes of thousands to millions per organization, and access is almost always inherited from a parent container rather than granted individually.

Keep high-cardinality entities in your database and use FGA to authorize their containers. The database stays the source of truth for the entity, FGA stays the source of truth for access. For the full reasoning, see [High-cardinality entities](https://workos.com/docs/fga/high-cardinality-entities).

| Entity    | Where                | Why                                                            |
| --------- | -------------------- | -------------------------------------------------------------- |
| Workspace | FGA                  | Long-lived, low cardinality, distinct roles per user           |
| Project   | FGA                  | Same as workspace                                              |
| Document  | Application database | High volume, frequently created, access inherited from project |

***

## 2. Model the hierarchy

Create two resource types in the [WorkOS Dashboard](https://dashboard.workos.com/) under **Authorization > Resource Types**. Documents are not modeled as a resource type—they only exist in the database.

| Name        | Slug        | Parent       |
| ----------- | ----------- | ------------ |
| `Workspace` | `workspace` | Organization |
| `Project`   | `project`   | Workspace    |

***

## 3. Define document permissions on the project type

Document permissions are conceptually about documents, but they're defined on the project resource type because that's the FGA-managed parent. Permission slugs can use any naming convention, so the `document:` prefix clearly signals intent.

| Permission        | Resource type | Description          |
| ----------------- | ------------- | -------------------- |
| `document:view`   | project       | View documents       |
| `document:edit`   | project       | Edit documents       |
| `document:create` | project       | Create new documents |
| `document:delete` | project       | Delete documents     |

Bundle these into project-scoped roles. A user with `project-editor` on a project can view, edit, create, and delete every document in that project. A user with `project-viewer` can only read them.

| Role             | Scoped to | Permissions                                                            |
| ---------------- | --------- | ---------------------------------------------------------------------- |
| `project-editor` | project   | `document:view`, `document:edit`, `document:create`, `document:delete` |
| `project-viewer` | project   | `document:view`                                                        |

Roles assigned higher in the hierarchy inherit these permissions. A `workspace-admin` role can include all four document permissions, granting access to every document in every project under the workspace.

***

## 4. Store the parent reference in your database

Every document row needs a stable reference to the project it belongs to. Use the project's external ID—the same ID that was used when registering the project with FGA.

```text
documents
├─ id              # The document's primary key
├─ project_id      # FK to the project (matches the FGA external ID)
├─ title
├─ content
└─ ...
```

When a document is created, save it with the project ID:

```javascript
app.post('/projects/:projectId/documents', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'document:create',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const document = await db.documents.create({
    data: {
      projectId,
      title: req.body.title,
      content: req.body.content,
    },
  });

  return res.json(document);
});
```

There's no `createResource` call for the document because the document is not in FGA. The project ID stored on the row is enough to authorize every subsequent access.

***

## 5. Read a document

To read a document, look it up in the database, then check the user's permission on its parent project.

```javascript
app.get('/documents/:documentId', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { documentId } = req.params;

  const document = await db.documents.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    return res.status(404).json({ error: 'Not found' });
  }

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'document:view',
    resourceTypeSlug: 'project',
    resourceExternalId: document.projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.json(document);
});
```

The check uses the project as the resource and the document permission as the slug. FGA evaluates the user's role on the project—plus any inherited roles on the workspace or organization—and returns whether the permission applies.

Update and delete handlers follow the same shape with `document:edit` and `document:delete`.

***

## 6. List documents inside a project

When the user is already on a project page, listing the project's documents is a database query gated by a single check on the project itself.

```javascript
app.get('/projects/:projectId/documents', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'document:view',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const documents = await db.documents.findMany({
    where: { projectId },
  });

  return res.json(documents);
});
```

One check authorizes the entire list, no matter how many documents the project contains. There's no per-document call because every document inherits the same project-level access.

***

## 7. List documents across projects

A global search or "all my documents" view spans many projects. The pattern here is the inverse: first ask FGA for every project the user can read, then run a database query scoped to those project IDs.

```javascript
app.get('/documents', async (req, res) => {
  const { organizationMembershipId } = req.user;

  const { data: accessibleProjects } = await workos.authorization.listResourcesForMembership(
    {
      organizationMembershipId,
      permissionSlug: 'document:view',
      resourceTypeSlug: 'project',
      limit: 100,
    },
  );

  const projectIds = accessibleProjects.map((p) => p.externalId);

  const documents = await db.documents.findMany({
    where: { projectId: { in: projectIds } },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });

  return res.json(documents);
});
```

This is a single FGA call for the project IDs followed by a single database query. There is no per-document permission check. For very large project counts, page through `listResourcesForMembership` with the `after` cursor and stream results to the client.

***

## 8. Nested folders

When documents are nested in folders, the folder hierarchy lives in the database. Walk up the folder chain until reaching the FGA-managed parent, then run the check there.

```javascript
async function findProjectForDocument(documentId) {
  const document = await db.documents.findUnique({ where: { id: documentId } });
  if (!document) return null;

  let currentFolderId = document.folderId;
  const visited = new Set();

  while (currentFolderId) {
    if (visited.has(currentFolderId)) {
      return null;
    }
    visited.add(currentFolderId);

    const folder = await db.folders.findUnique({
      where: { id: currentFolderId },
    });
    if (!folder) return null;

    if (folder.projectId) {
      return folder.projectId;
    }

    currentFolderId = folder.parentFolderId;
  }

  return null;
}
```

Use the returned project ID as the resource in the `check` call. Cap the traversal depth to guard against cycles and runaway queries. Caching the project ID directly on each document or folder row eliminates the walk entirely.

***

## 9. Cache the parent ID for performance

The walk in the previous step works, but it requires database round trips for each folder. A common optimization is to store the FGA-managed parent ID directly on every descendant row.

```text
documents
├─ id
├─ project_id      # Denormalized for fast access checks
├─ folder_id       # For UI navigation
└─ ...
```

When a document or folder is moved between projects, update the `project_id` on every descendant in the move. The trade-off is more write work on move operations in exchange for one-step authorization on every read.

***

## 10. Share individual documents

Inherited access covers the common case, but sometimes a single document is shared directly with a user who has no role on its project. Modeling every document in FGA to support this would defeat the purpose—but the set of *individually shared* documents is far smaller than the set of all documents, so it's cheap to model on its own.

Create a `shared-document` resource type with its own permissions, and register a resource only when a document is shared outside its project. The permissions live on a different resource type, so they need a distinct slug—`shared-document:view` on `shared-document` rather than `document:view` on `project`. At runtime, a document is accessible if the user inherits access from the project **or** has been granted access to that specific document:

```javascript
const [project, shared] = await Promise.all([
  workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'document:view',
    resourceTypeSlug: 'project',
    resourceExternalId: document.projectId,
  }),
  workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'shared-document:view',
    resourceTypeSlug: 'shared-document',
    resourceExternalId: document.id,
  }),
]);

const authorized = project.authorized || shared.authorized;
```

This adds a second check only on the paths where direct sharing is possible. Documents that are never shared still authorize with a single project check, and FGA only stores the small number of documents that have actually been shared.

***

The pattern scales because document volume never touches FGA. A million documents cost nothing—they all inherit access from the same handful of project assignments.
