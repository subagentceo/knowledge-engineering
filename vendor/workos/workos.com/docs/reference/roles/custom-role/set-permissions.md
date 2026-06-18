# Custom role

A custom role is an access control resource defined at the organization level. Custom roles allow individual organizations to create roles tailored to their specific needs, in addition to the environment roles that apply across all organizations.

Like environment roles, custom roles can be assigned to [organization memberships](https://workos.com/docs/reference/authkit/organization-membership), [directory users](https://workos.com/docs/directory-sync/identity-provider-role-assignment), and [SSO profiles](https://workos.com/docs/sso/identity-provider-role-assignment). Each custom role has a unique slug identifier within the organization and can have permissions assigned to it.

> **Note:** When listing roles for an organization, both environment roles and custom
> roles are returned in priority order. Environment roles are included because
> they apply to all organizations in your environment.

## Add a permission to a custom role

Add a single permission to a custom role. If the permission is already assigned to the role, this operation has no effect.

#### Request

#### Response

## Create a custom role

Create a new custom role. The role will be specific to the organization and can be assigned to organization memberships.

The `slug` must be unique within the organization, begin with `org-`, and contain only lowercase letters, numbers, hyphens, and underscores.

> **Note:** New roles are placed at the bottom of the organization's priority order.

#### Request

#### Response

## Delete a custom role

Delete an existing custom role. The role must not have any active assignments or [IdP group role mappings](https://workos.com/docs/rbac/idp-role-assignment).

If the role has active assignments, you will receive a `409 Conflict` error with code `role_has_assignments`. If the role has group role mappings, you will receive a `409 Conflict` error with code `role_has_group_role_mappings`.

#### Request

## Get a custom role

Retrieve a role that applies to an organization by its slug. This can return either an environment role or a custom role.

#### Request

#### Response

## List custom roles

Get a list of all roles that apply to an organization. This includes both environment roles and custom roles, returned in priority order.

#### Request

#### Response

## Remove a permission from a custom role

Remove a single permission from a custom role by its slug.

#### Request

#### Response

## Set permissions for a custom role

Replace all permissions assigned to a custom role. This operation removes any existing permissions and assigns the provided permissions.

To remove all permissions from a role, pass an empty array.

#### Request

#### Response

## Update a custom role

Update an existing custom role. Only the fields provided in the request body will be updated.

#### Request

#### Response

### Organization Role

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "role" | Yes | Distinguishes the Role object. |
| `id` | string | Yes | Unique identifier of the Role. |
| `name` | string | Yes | A descriptive name for the Role. This field does not need to be unique. |
| `slug` | string | Yes | A unique key to reference the role within the organization. Must be lowercase and contain only letters, numbers, hyphens, and underscores. |
| `description` | string \| null | Yes | A description for the Role. |
| `permissions` | string[] | Yes | A list of permission slugs assigned to the role. |
| `type` | "OrganizationRole" | Yes | The type of Role. For custom roles, this is always `OrganizationRole`. |
| `resource_type_slug` | string | Yes | The slug of the resource type the role is scoped to. |
| `created_at` | string | Yes | The timestamp when the Role was created. |
| `updated_at` | string | Yes | The timestamp when the Role was last updated. |

### POST /authorization/organizations/{organizationId}/roles/{slug}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The slug of the permission to add to the role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### POST /authorization/organizations/{organizationId}/roles

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### DELETE /authorization/organizations/{organizationId}/roles/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The slug of the role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /authorization/organizations/{organizationId}/roles/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The unique slug of the role to retrieve. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### GET /authorization/organizations/{organizationId}/roles

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `list` | object |  |

### DELETE /authorization/organizations/{organizationId}/roles/{slug}/permissions/{permissionSlug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The slug of the role. |
| `permissionSlug` | string | Yes | The slug of the permission to remove. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### PUT /authorization/organizations/{organizationId}/roles/{slug}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The slug of the role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |

### PATCH /authorization/organizations/{organizationId}/roles/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `slug` | string | Yes | The slug of the role. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role` | object | Distinguishes the role object. |