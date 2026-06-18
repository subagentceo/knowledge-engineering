# Roles and Permissions

## Introduction

Once you've defined your resource types, the next step is deciding what users can actually do. Roles and permissions in FGA are always scoped to a specific resource type—a workspace role applies only to workspaces, a project role applies only to projects.

This scoping makes permissions predictable. When you see `workspace-admin`, you know it grants workspace access. When a role includes permissions for child types, those permissions flow down automatically—a workspace admin can access all projects in that workspace without separate assignments.

***

## Understanding permissions

A permission represents a specific action a user can perform on a resource type. Each permission has a name (like "Edit Workspace"), a slug used in code (`workspace:edit`), and the resource type it applies to.

We recommend following a `{resource_type}:{action}` pattern for permission slugs. This makes permissions self-documenting—`project:delete` clearly means the ability to delete a project.

Common patterns include:

- `{type}:view` for read access
- `{type}:edit` for modifying a resource
- `{type}:create` for creating child resources
- `{type}:delete` for removing a resource
- `{type}:manage` for full administrative control
- `{type}:invite` for adding collaborators

Keep permissions granular. Instead of a broad `project:access` permission, create specific ones like `project:view`, `project:edit`, and `project:delete`. This gives you flexibility as your product's access requirements evolve.

***

## Understanding roles

Roles are collections of permissions that describe what someone can do. Like permissions, each role is scoped to a resource type—you create a role for workspaces, another for projects, and so on.

We recommend naming roles to indicate both the scope and the capability level. Following a `{resource-type}-{capability}` pattern makes roles self-explanatory:

- `workspace-admin` – full control of a workspace
- `workspace-member` – basic workspace access
- `project-editor` – can modify a project
- `project-viewer` – read-only project access

When you assign `workspace-admin` to a user on a specific workspace, they get all the permissions bundled in that role for that workspace.

***

## Permission inheritance

The key feature of FGA roles is that they can include permissions for child resource types. This is where the power of hierarchical authorization comes in.

A `workspace-admin` role might include:

- `workspace:view` and `workspace:edit` (same type)
- `project:view` and `project:edit` (child type)
- `app:view` and `app:deploy` (grandchild type)

When you assign this role to someone on a workspace, they can view and edit that workspace, plus view, edit, and deploy all projects and apps within it. One assignment grants access across the entire sub-tree.

This reduces "role explosion"—instead of creating separate roles for every resource combination, you define roles at appropriate levels and let inheritance handle the rest. A workspace admin naturally has access to everything in the workspace, which matches how people think about access.

***

## Seeing inheritance in action

To understand how permission inheritance works in practice, consider a hierarchy where an organization contains projects, and projects contain apps:

```text
Org
  └─ Project
        └─ App
```

Different users can have roles at different levels, and the access they receive depends on where their role is assigned and what permissions that role includes.

![Example resource hierarchy with roles](https://images.workoscdn.com/images/74c1fad7-abe9-4c21-a244-8c2563f1313c.png?auto=format\&fit=clip\&q=50)

- User John has `Project read-only` on `Project:1` and can view only that project, not its apps

- User Jane is `Org member` of `Org:1` with `org:read`, `project:read`, and `app:read` permissions. They can view the organization, all of its projects, and all apps under those projects.

- Jane is also `Project editor` for `Project:2` and can read and edit `Project:2` and all of its apps.

- Jane has `App editor` for `App:Finance` and can view and edit only that app instance.

This pattern is powerful because it lets you express nuanced access with minimal assignments. A single organization-level membership provides baseline visibility, while targeted assignments grant elevated access where needed. The hierarchy does the work of propagating permissions, so you don't have to create individual assignments for every resource.

***

## How access is evaluated

When your application checks whether a user can perform an action on a resource, FGA looks at all possible sources of access:

1. **Direct assignments** on the resource itself
2. **Inherited assignments** from parent resources
3. **Organization-scoped roles** that include the permission

If any of these grant the permission, the user is authorized.

For example, if Alice wants to deploy `App:Frontend`, FGA checks whether she has `app:deploy` directly on that app, or on its parent project, or on its parent workspace, or through an organization-scoped role. Her `workspace-admin` role on `Workspace: Engineering` includes `app:deploy`, so she's authorized—even without any direct assignment on the app.

> **Note:** **Organization-scoped roles** refer to where a role applies—the organization level rather than a specific resource. Every organization membership must have at least one organization-scoped role, which determines baseline permissions within the organization.**Custom roles** (managed under the organization's Roles tab) are roles created specifically for an organization, as opposed to environment-level roles that apply across all organizations. Both environment roles and custom roles can serve as organization-scoped roles.For more on creating organization-specific roles, see [Custom roles](https://workos.com/docs/rbac/custom-roles).

***

## Managing roles in the Dashboard

Configure roles and permissions in the [WorkOS Dashboard](https://dashboard.workos.com/) under **Authorization**. You'll need to have [resource types](https://workos.com/docs/fga/resource-types) defined before you can create scoped roles and permissions.

To create a new role, select the resource type it applies to and give it a descriptive name and slug.

![FGA create role set details](https://images.workoscdn.com/images/9e943b39-8c7f-448a-8568-2408402d2873.png?auto=format\&fit=clip\&q=50)

Then choose which permissions to include from the same type and child types.

![FGA create role assign permissions](https://images.workoscdn.com/images/98c6a8b5-8814-49d9-a27f-9ba32525c214.png?auto=format\&fit=clip\&q=50)

When you modify a role's permissions, changes apply immediately to everyone with that role. No re-assignment is needed—existing users automatically get the updated permissions.

For organizations using [multiple roles](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles), users receive all permissions from all their assigned roles. Priority order only matters for [IdP role assignment](https://workos.com/docs/fga/idp-role-assignment) when running in single-role mode.

***

## Custom resource-scoped roles

While environment-level roles apply across all organizations, you can also create custom roles scoped to a specific organization and resource type. These roles let individual organizations define their own access patterns without affecting other organizations.

Custom resource-scoped roles are useful when:

- Different organizations need different role structures
- You want to let organizations define their own roles
- Specific organizations have unique access requirements that don't fit the environment-level roles

### Creating a custom resource-scoped role

Navigate to an organization in the Dashboard, then select the **Roles** tab. Click **Create custom role** to start.

First, enter the role details—a descriptive name and slug for the role.

![Create custom role details step](https://images.workoscdn.com/images/dc0fd548-2408-400b-8da8-2c5f278f9299.png?auto=format\&fit=clip\&q=50)

Next, select the resource type the role applies to and choose which permissions to include.

![Create custom role permissions step](https://images.workoscdn.com/images/52447f46-8bd8-4fce-8deb-901c99cba459.png?auto=format\&fit=clip\&q=50)

The permissions available depend on the selected resource type. You can include permissions from the selected type and any of its child types, just like environment-level roles.

### Assigning custom resource-scoped roles

Once created, custom resource-scoped roles can be assigned to users on specific resources within the organization. The assignment process works the same as environment-level roles—you assign the role to a user on a resource instance, and they receive all permissions bundled in that role.

***

## Changing resource type scope

A permission's or role's **resource type scope** can't be changed after it's created. Their **slugs** are also immutable.

WorkOS doesn't allow changing a permission's scope in place because a scope change can have downstream effects throughout your authorization model. It may change the meaning of existing assignments, make some role-permission relationships invalid under your resource hierarchy, and introduce application-specific dependency issues that are hard to detect automatically. Keeping scope immutable makes these migrations explicit and rollout behavior more predictable.

If you need to move a permission or role to a different scope, use this migration path instead:

1. **Create a new permission or role** at the correct resource type scope with a new slug.
2. **Update your roles and authorization model** to include the new permission or role.
3. **Roll your application over** to the new permission or role and verify all relevant paths are covered.
4. **Delete the old permission or role** once it is no longer in use.
