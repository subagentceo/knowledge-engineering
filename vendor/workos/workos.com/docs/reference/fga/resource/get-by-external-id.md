# Resource

A resource is an instance of a [resource type](https://workos.com/docs/fga/resource-types) that represents an entity in your application. Resources can be workspaces, projects, apps, or any other object that users can access.

Resources are organized in a hierarchy. When a role is assigned to a user on a parent resource, they automatically gain access to child resources through permission inheritance.

## Create a resource

Create a new authorization resource. The resource is associated with an organization and resource type.

You can optionally specify a parent resource to place it in a hierarchy. The parent can be identified either by `parent_resource_id` or by the combination of `parent_resource_external_id` and `parent_resource_type_slug`.

> **Note:** The `external_id` must be unique within the organization and resource type
> combination.

#### Request

#### Response

## Delete a resource by external ID

Delete an authorization resource using its external ID. By default, this will fail if the resource has child resources or role assignments. Set `cascade_delete` to `true` to delete the resource along with all its descendants and role assignments.

> **Note:** Deleting a resource also removes all role assignments on that resource. This
> action cannot be undone.

#### Request

## Delete a resource

Delete an authorization resource. By default, this will fail if the resource has child resources or role assignments. Set `cascade_delete` to `true` to delete the resource along with all its descendants and role assignments.

> **Note:** Deleting a resource also removes all role assignments on that resource. This
> action cannot be undone.

#### Request

## Get a resource by external ID

Retrieve the details of an authorization resource by its external ID, organization, and resource type. This is useful when you only have the external ID from your system and need to fetch the full resource details.

#### Request

#### Response

## Get a resource

Retrieve the details of an authorization resource by its ID.

#### Request

#### Response

## List resources

Get a paginated list of authorization resources.

#### Request

#### Response

## Update a resource by external ID

Update an existing authorization resource using its external ID.

#### Request

#### Response

## Update a resource

Update an existing authorization resource.

#### Request

#### Response

### Resource

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "authorization_resource" | Yes | Distinguishes the Resource object. |
| `id` | string | Yes | Unique identifier of the Resource. |
| `external_id` | string | Yes | An identifier you provide to reference the resource in your system. |
| `name` | string | Yes | A human-readable name for the Resource. |
| `description` | string \| null | Yes | An optional description for the Resource. |
| `resource_type_slug` | string | Yes | The slug of the resource type this resource belongs to. |
| `parent_resource_id` | string \| null | Yes | The ID of the parent resource in the hierarchy, if any. |
| `organization_id` | string | Yes | The ID of the organization this resource belongs to. |
| `created_at` | string | Yes | The timestamp when the Resource was created. |
| `updated_at` | string | Yes | The timestamp when the Resource was last updated. |

### /authorization/resources

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `external_id` | string | Yes | An identifier you provide to reference the resource in your system. Must be unique within the organization and resource type. |
| `name` | string | Yes | A human-readable name for the resource. |
| `description` | string | No | An optional description for the resource. |
| `resource_type_slug` | string | Yes | The slug of the resource type this resource belongs to. |
| `organization_id` | string | Yes | The ID of the organization this resource belongs to. |
| `parent_resource_id` | string | No | The ID of the parent resource. Use either this or parent_resource_external_id + parent_resource_type_slug. |
| `parent_resource_external_id` | string | No | The external ID of the parent resource. Requires parent_resource_type_slug. |
| `parent_resource_type_slug` | string | No | The resource type slug of the parent resource. Required with parent_resource_external_id. |

### DELETE /authorization/organizations/{organization_id}/resources/{resource_type_slug}/{external_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | The external ID of the resource. |
| `cascade_delete` | boolean | No | If true, deletes all descendant resources and role assignments. Defaults to false. If not set and the resource has children or assignments, the request will fail. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### DELETE /authorization/resources/{resource_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource_id` | string | Yes | The ID of the resource to delete. |
| `cascade_delete` | boolean | No | If true, deletes all descendant resources and role assignments. Defaults to false. If not set and the resource has children or assignments, the request will fail. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /authorization/organizations/{organization_id}/resources/{resource_type_slug}/{external_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | The external ID of the resource. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authorization_resource` | object | Distinguishes the Resource object. |

### GET /authorization/resources/{resource_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource_id` | string | Yes | The ID of the resource to retrieve. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authorization_resource` | object | Distinguishes the Resource object. |

### GET /authorization/resources

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | Cursor for pagination (before). |
| `after` | string | No | Cursor for pagination (after). |
| `limit` | integer | No | Maximum number of records to return (default 10, max 100). |
| `order` | "normal" \| "desc" \| "asc" | No | Sort order (asc or desc). |
| `organization_id` | string | No | Filter resources by organization ID. |
| `resource_type_slug` | string | No | Filter resources by resource type slug. |
| `resource_external_id` | string | No | Filter resources by external ID. |
| `parent_resource_id` | string | No | Filter resources by parent resource ID. |
| `parent_resource_type_slug` | string | No | Filter resources by parent resource type slug. |
| `parent_external_id` | string | No | Filter resources by parent external ID. |

### PATCH /authorization/organizations/{organization_id}/resources/{resource_type_slug}/{external_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | The external ID of the resource. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authorization_resource` | object | Distinguishes the Resource object. |

### PATCH /authorization/resources/{resource_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource_id` | string | Yes | The ID of the resource to update (path parameter). |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authorization_resource` | object | Distinguishes the Resource object. |