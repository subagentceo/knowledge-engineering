# Environment role

An environment role is an access control resource defined at the environment level. Environment roles can be assigned to [organization memberships](https://workos.com/docs/reference/authkit/organization-membership), [directory users](https://workos.com/docs/directory-sync/identity-provider-role-assignment), and [SSO profiles](https://workos.com/docs/sso/identity-provider-role-assignment).

Environment roles provide a consistent set of roles across all organizations in your environment. Each role has a unique slug identifier. Roles can have permissions assigned to them.

## Add a permission to an environment role

Add a single permission to an environment role. If the permission is already assigned to the role, this operation has no effect.

#### Request

#### Response

## Create an environment role

Create a new environment role.

The `slug` must be unique across all environment roles and can only contain lowercase letters, numbers, hyphens, and underscores.

> **Note:** New roles are placed at the bottom of the priority order.

#### Request

#### Response

## Get an environment role

Get an environment role by its slug.

#### Request

#### Response

## List environment roles

List all environment roles in priority order.

#### Request

#### Response

## Set permissions for an environment role

Replace all permissions assigned to an environment role. This operation removes any existing permissions and assigns the provided permissions.

To remove all permissions from a role, pass an empty array.

#### Request

#### Response

## Update an environment role

Update an existing environment role.

#### Request

#### Response

### Role

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "role" | Yes | Distinguishes the Role object. |
| `id` | string | Yes | Unique identifier of the Role. |
| `name` | string | Yes | A descriptive name for the Role. This field does not need to be unique. |
| `slug` | string | Yes | A unique key to reference the role. Must be lowercase and contain only letters, numbers, hyphens, and underscores. |
| `description` | string \| null | Yes | A description for the Role. |
| `permissions` | string[] | Yes | A list of permission slugs assigned to the role. |
| `type` | "EnvironmentRole" | Yes | The type of Role. For environment roles, this is always `EnvironmentRole`. |
| `resource_type_slug` | string | Yes | The slug of the resource type the role is scoped to. |
| `created_at` | string | Yes | The timestamp when the Role was created. |
| `updated_at` | string | Yes | The timestamp when the Role was last updated. |

### POST /authorization/roles/{slug}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The slug of the permission to add to the role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### /authorization/roles

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the role. Must be lowercase and contain only letters, numbers, hyphens, and underscores. |
| `name` | string | Yes | A name for the role. |
| `description` | string | No | An optional description for the role. |
| `resource_type_slug` | string | No | The slug of the [resource type](/fga/resource-types) to scope the role to. Only applicable when using [Fine-Grained Authorization](/fga). Defaults to the organization resource type if not provided. |

### GET /authorization/roles/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The unique slug of the role to retrieve. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### PUT /authorization/roles/{slug}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The slug of the environment role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### PATCH /authorization/roles/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The slug of the environment role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |