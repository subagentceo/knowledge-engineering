# Roles

The Authorization API provides endpoints for managing roles and permissions in your WorkOS environment. Use these endpoints to define access control structures that can be assigned to users, organization memberships, and more.

## Environment Roles

Environment roles are defined at the environment level and apply to all organizations. They provide a consistent set of roles that can be used throughout your application.

## Custom Roles

Custom roles are defined at the organization level and are specific to individual organizations. They allow organizations to create roles tailored to their needs.

### role

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique slug for the role. |
| `object` | "role" | Yes | Distinguishes the role object. |
| `id` | string | Yes | Unique identifier of the role. |
| `name` | string | Yes | A descriptive name for the role. |
| `description` | string | No | An optional description of the role. |
| `type` | "EnvironmentRole" \| "OrganizationRole" | Yes | Whether the role is scoped to the environment or an organization (custom role). |
| `resource_type_slug` | string | Yes | The slug of the resource type the role is scoped to. |
| `permissions` | string[] | Yes | The permission slugs assigned to the role. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |