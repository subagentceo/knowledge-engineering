# Share Button

## What you'll build

This guide shows how to build a share dialog—the kind that appears behind a "Share" button on a project, document, or workspace. The dialog lists everyone who already has access, distinguishes direct collaborators from people who inherited access from a parent, and lets the owner add or remove members.

The example uses two resource types: workspaces contain projects. The share dialog lives on the project, and the workspace is the source of inherited access for members who weren't added to the project directly. By the end, you'll have:

- Resource types, permissions, and roles configured for shareable projects
- A member list rendered with [`listMembershipsForResource`](https://workos.com/docs/fga/resource-discovery)
- Direct versus inherited member labels using the `assignment` parameter
- Per-member role labels using [`listRoleAssignmentsForResource`](https://workos.com/docs/reference/fga/role-assignment/list-for-resource)
- Endpoints to add a member, change a member's role, and remove a member

```text
organization (implicit root)
└─ workspace
   └─ project
```

***

## 1. Model the hierarchy

Create two resource types in the [WorkOS Dashboard](https://dashboard.workos.com/) under **Authorization > Resource Types**. The workspace is the parent of the project—anyone with a workspace-scoped role automatically appears as an inherited member of every project in the workspace.

| Name        | Slug        | Parent       |
| ----------- | ----------- | ------------ |
| `Workspace` | `workspace` | Organization |
| `Project`   | `project`   | Workspace    |

For the full Dashboard walkthrough, see the [Quick Start](https://workos.com/docs/fga/quick-start) guide.

***

## 2. Define roles and permissions

The share dialog needs to answer two questions: who has access to this project, and what role do they have. Define the permissions and roles that back those operations.

| Permission     | Resource type | Description                                |
| -------------- | ------------- | ------------------------------------------ |
| `project:view` | project       | View a project                             |
| `project:edit` | project       | Edit the project, including membership     |

| Role             | Scoped to | Permissions                       |
| ---------------- | --------- | --------------------------------- |
| `project-viewer` | project   | `project:view`                    |
| `project-editor` | project   | `project:view`, `project:edit`    |

The share dialog assigns one of these two roles to each new collaborator. Gating the management endpoints on `project:edit` means project editors can change membership, while viewers cannot.

Workspace-scoped roles produce the inherited members shown in the dialog. A `workspace-admin` role that includes `project:view` and `project:edit` as child-type permissions grants project access to every project in the workspace without any direct project assignment. Those users appear in the indirect membership list with no direct role on the project. For more on how inheritance affects access, see [Roles and permissions](https://workos.com/docs/fga/roles-and-permissions).

***

## 3. List who has access

The core of the share dialog is the list of members. `listMembershipsForResource` returns every organization membership that has a permission on the resource. Using `permission_slug=project:view` returns everyone who can see the project at all.

The `assignment` parameter controls whether inherited access is included:

- `direct` returns only users who have a role assigned directly on this project
- `indirect` returns everyone who can access the project, including via workspace or organization-scoped roles

The share dialog typically needs both. Direct assignments show who was explicitly added. Indirect assignments show everyone who can see the project, including users who inherited access through a parent.

```javascript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

app.get('/projects/:projectId/members', async (req, res) => {
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

  const [{ data: allMembers }, { data: directMembers }] = await Promise.all([
    workos.authorization.listMembershipsForResource({
      resourceId: project.authzResourceId,
      permissionSlug: 'project:view',
      assignment: 'indirect',
    }),
    workos.authorization.listMembershipsForResource({
      resourceId: project.authzResourceId,
      permissionSlug: 'project:view',
      assignment: 'direct',
    }),
  ]);

  const directIds = new Set(directMembers.map((m) => m.id));

  const members = allMembers.map((member) => ({
    id: member.id,
    user: member.user,
    accessSource: directIds.has(member.id) ? 'direct' : 'inherited',
  }));

  return res.json(members);
});
```

The handler runs two calls in parallel and uses the direct list as a lookup to label each indirect entry. The response includes the user object for each membership, so the dialog can render names and avatars without a second round trip.

Store the WorkOS `authz_resource_id` on the project row when it's created. The `listMembershipsForResource` endpoint takes the internal resource ID rather than an external ID.

***

## 4. Add role labels for direct members

The membership endpoint returns who has access but not what role they were assigned. To show "Alice — Editor" in the dialog, fetch role assignments for the resource and merge them with the member list.

```javascript
async function loadProjectMembers(projectId, authzResourceId) {
  const [allMembers, directMembers, roleAssignments] = await Promise.all([
    workos.authorization.listMembershipsForResource({
      resourceId: authzResourceId,
      permissionSlug: 'project:view',
      assignment: 'indirect',
    }),
    workos.authorization.listMembershipsForResource({
      resourceId: authzResourceId,
      permissionSlug: 'project:view',
      assignment: 'direct',
    }),
    workos.authorization.listRoleAssignmentsForResource({
      resourceId: authzResourceId,
    }),
  ]);

  const directIds = new Set(directMembers.data.map((m) => m.id));
  const roleByMembershipId = new Map(
    roleAssignments.data.map((a) => [a.organizationMembershipId, a]),
  );

  return allMembers.data.map((member) => {
    const organizationMembershipId = member.id;
    const isDirect = directIds.has(organizationMembershipId);
    const assignment = roleByMembershipId.get(organizationMembershipId);

    return {
      id: organizationMembershipId,
      user: member.user,
      accessSource: isDirect ? 'direct' : 'inherited',
      role: isDirect ? assignment?.role.slug : null,
      roleAssignmentId: isDirect ? assignment?.id : null,
    };
  });
}
```

`listRoleAssignmentsForResource` only returns assignments granted on this resource, which matches the set of direct members. Inherited members don't have a role on the project itself—their access comes from a role on a parent—so the role label is omitted for them.

The React component renders each row with the user's name, role, and an "Inherited" pill for members who picked up access from a parent.

```jsx
function MemberList({ members, currentUserId, onRoleChange, onRemove }) {
  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          <Avatar src={member.user.profilePictureUrl} />
          <span>{member.user.email}</span>

          {member.accessSource === 'direct' ? (
            <RoleSelect
              value={member.role}
              onChange={(role) =>
                onRoleChange(member.roleAssignmentId, member.id, role)
              }
            />
          ) : (
            <Pill>Inherited from workspace</Pill>
          )}

          {member.accessSource === 'direct' &&
            member.user.id !== currentUserId && (
              <Button onClick={() => onRemove(member.roleAssignmentId, member.id)}>
                Remove
              </Button>
            )}
        </li>
      ))}
    </ul>
  );
}
```

Inherited members can't be removed from the project directly—their access is controlled by the parent role. The dialog should reflect that by hiding the Remove and Role controls for inherited rows.

***

## 5. Share with a new member

Adding a member is a single `assignRole` call. The dialog typically takes an email or organization membership ID, then assigns the chosen role on the project.

```javascript
app.post('/projects/:projectId/members', async (req, res) => {
  const { organizationMembershipId } = req.user;
  const { projectId } = req.params;
  const { membershipId, roleSlug } = req.body;

  const { authorized } = await workos.authorization.check({
    organizationMembershipId,
    permissionSlug: 'project:edit',
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  if (!authorized) {
    return res.status(404).json({ error: 'Not found' });
  }

  const assignment = await workos.authorization.assignRole({
    organizationMembershipId: membershipId,
    roleSlug,
    resourceTypeSlug: 'project',
    resourceExternalId: projectId,
  });

  return res.json(assignment);
});
```

Gate the endpoint on `project:edit` so only users who can edit the project can manage its members. The new assignment takes effect immediately—the next `check` for that user will return the new permissions.

If the user being added isn't already an organization member, create the membership through the standard user flow first. FGA only assigns roles to existing organization memberships.

***

## 6. Change a member's role

Role assignments are immutable. To change a member's role, delete the existing assignment and create a new one with the updated role.

```javascript
app.patch(
  '/projects/:projectId/members/:membershipId/:roleAssignmentId',
  async (req, res) => {
    const { organizationMembershipId } = req.user;
    const { projectId, membershipId, roleAssignmentId } = req.params;
    const { roleSlug } = req.body;

    const { authorized } = await workos.authorization.check({
      organizationMembershipId,
      permissionSlug: 'project:edit',
      resourceTypeSlug: 'project',
      resourceExternalId: projectId,
    });

    if (!authorized) {
      return res.status(404).json({ error: 'Not found' });
    }

    await workos.authorization.removeRoleAssignment({
      organizationMembershipId: membershipId,
      roleAssignmentId,
    });

    const updated = await workos.authorization.assignRole({
      organizationMembershipId: membershipId,
      roleSlug,
      resourceTypeSlug: 'project',
      resourceExternalId: projectId,
    });

    return res.json(updated);
  },
);
```

The role assignment ID and the member's organization membership ID both come from the member list returned in step 4. There is a brief window between removing and reassigning where the user has no role on the project—if that matters, perform the operation inside a transaction or queue, and treat any failure as a rollback.

***

## 7. Remove a member

Removing a direct member is a single `removeRoleAssignment` call. Pass the assignment ID and the member's organization membership ID from the member list.

```javascript
app.delete(
  '/projects/:projectId/members/:membershipId/:roleAssignmentId',
  async (req, res) => {
    const { organizationMembershipId } = req.user;
    const { projectId, membershipId, roleAssignmentId } = req.params;

    const { authorized } = await workos.authorization.check({
      organizationMembershipId,
      permissionSlug: 'project:edit',
      resourceTypeSlug: 'project',
      resourceExternalId: projectId,
    });

    if (!authorized) {
      return res.status(404).json({ error: 'Not found' });
    }

    await workos.authorization.removeRoleAssignment({
      organizationMembershipId: membershipId,
      roleAssignmentId,
    });

    return res.status(204).end();
  },
);
```

Access is revoked immediately. The member may still appear in the indirect list if they inherit access from a parent role—the dialog should reflect that by relabeling the row from "Direct" to "Inherited" after the delete.

To revoke inherited access, the user's role on the parent resource (workspace or organization) needs to change. The share dialog should not attempt this from a project-scoped view; surface a hint to manage workspace access elsewhere.

***

The same pattern works for any resource type. To share a workspace, swap `project` for `workspace` and use workspace-scoped roles. The membership and assignment endpoints work identically regardless of resource type.
