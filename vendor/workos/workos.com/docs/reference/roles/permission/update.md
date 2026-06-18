# Permission

A permission represents an individual access right that can be assigned to roles. Permissions define what actions users with a given role can perform within your application.

Permissions are defined at the environment level and can be assigned to both environment roles and custom roles. Each permission has a unique slug identifier that you use when assigning it to roles.

## Create a permission

Create a new permission in your WorkOS environment. The permission can then be assigned to environment roles and custom roles.

The `slug` must be unique within the environment and must be lowercase, containing only letters, numbers, hyphens, underscores, colons, periods, and asterisks.

#### Request

#### Response

## Delete a permission

Delete an existing permission. System permissions cannot be deleted.

#### Request

## Get a permission

Retrieve a permission by its unique slug.

#### Request

#### Response

## List permissions

Get a list of all permissions in your WorkOS environment.

#### Request

#### Response

## Update a permission

Update an existing permission. Only the fields provided in the request body will be updated.

#### Request

#### Response

### Permission

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "permission" | Yes | Distinguishes the Permission object. |
| `id` | string | Yes | Unique identifier of the Permission. |
| `slug` | string | Yes | A unique key to reference the permission. Must be lowercase and contain only letters, numbers, hyphens, underscores, colons, periods, and asterisks. |
| `name` | string | Yes | A descriptive name for the Permission. |
| `description` | string \| null | Yes | A description for the Permission. |
| `system` | boolean | Yes | Whether the permission is a system permission. System permissions are created and managed by WorkOS and cannot be deleted. |
| `resource_type_slug` | string | Yes | The slug of the resource type the permission is scoped to. |
| `created_at` | string | Yes | The timestamp when the Permission was created. |
| `updated_at` | string | Yes | The timestamp when the Permission was last updated. |

### /authorization/permissions

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the permission. Must be lowercase and contain only letters, numbers, hyphens, underscores, colons, periods, and asterisks. |
| `name` | string | Yes | A descriptive name for the permission. |
| `description` | string | No | An optional description for the permission. |
| `resource_type_slug` | string | No | The slug of the [resource type](/fga/resource-types) to scope the permission to. Only applicable when using [Fine-Grained Authorization](/fga). Defaults to the organization resource type if not provided. |

### DELETE /authorization/permissions/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the permission. Must be lowercase and contain only letters, numbers, hyphens, underscores, colons, periods, and asterisks. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /authorization/permissions/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the permission. Must be lowercase and contain only letters, numbers, hyphens, underscores, colons, periods, and asterisks. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `permission` | object | Distinguishes the Permission object. |

### GET /authorization/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### PATCH /authorization/permissions/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the permission. Must be lowercase and contain only letters, numbers, hyphens, underscores, colons, periods, and asterisks. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `permission` | object | Distinguishes the Permission object. |