# Access checks

Access check endpoints help you answer authorization questions: "Can this user perform this action on this resource?" and "What resources can this user access?"

## Check authorization

Check if an organization membership has a specific permission on a resource. This endpoint considers all sources of access:

- Direct role assignments on the resource
- Inherited permissions from parent resources
- Organization-scoped roles

You must provide either `resource_id` or both `resource_external_id` and `resource_type_slug` to identify the resource.

> **Note:** For org-wide permissions, you can check the JWT directly without making an API
> call. Use this endpoint for resource-specific permission checks.

#### Request

#### Response

## List effective permissions for an organization membership on a resource by external ID

Returns all permissions the organization membership effectively has on a resource identified by its external ID, including permissions inherited through roles assigned to ancestor resources.

#### Request

#### Response

## List effective permissions for an organization membership on a resource

Returns all permissions the organization membership effectively has on a resource, including permissions inherited through roles assigned to ancestor resources.

#### Request

#### Response

## List memberships for a resource by external ID

Returns all organization memberships that have a specific permission on a resource, using the resource's external ID. This is useful for answering "Who can access this resource?" when you only have the external ID.

#### Request

#### Response

## List memberships for a resource

Returns all organization memberships that have a specific permission on a resource. This is useful for answering "Who can access this resource?"

You can filter by assignment type to distinguish between direct assignments (role assigned directly on the resource) and indirect assignments (permission inherited from a parent resource).

#### Request

#### Response

## List resources for an organization membership

Returns all child resources of a parent resource where the organization membership has a specific permission. This is useful for resource discovery—answering "What projects can this user access in this workspace?"

You must provide either `parent_resource_id` or both `parent_resource_external_id` and `parent_resource_type_slug` to identify the parent resource.

#### Request

#### Response

### POST /authorization/organization_memberships/{organization_membership_id}/check

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership to check. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authorized` | boolean | Whether the organization membership has the permission on the resource. |

### GET /authorization/organization_memberships/{organization_membership_id}/resources/{resource_type_slug}/{external_id}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | An identifier you provide to reference the resource in your system. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### GET /authorization/organization_memberships/{organization_membership_id}/resources/{resource_id}/permissions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |
| `resource_id` | string | Yes | The ID of the authorization resource. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### GET /authorization/organizations/{organization_id}/resources/{resource_type_slug}/{external_id}/organization_memberships

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | The external ID of the resource. |
| `before` | string | No | Cursor for pagination (before). |
| `after` | string | No | Cursor for pagination (after). |
| `limit` | integer | No | Maximum number of records to return (default 10, max 100). |
| `order` | "normal" \| "desc" \| "asc" | No | Sort order (asc or desc). |
| `permission_slug` | string | Yes | The permission slug to filter by. Only users with this permission on the resource are returned. |
| `assignment` | "direct" \| "indirect" | No | Filter by assignment type. Use "direct" for direct assignments only, or "indirect" to include inherited assignments. |

### GET /authorization/resources/{resource_id}/organization_memberships

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource_id` | string | Yes | The ID of the resource. |
| `before` | string | No | Cursor for pagination (before). |
| `after` | string | No | Cursor for pagination (after). |
| `limit` | integer | No | Maximum number of records to return (default 10, max 100). |
| `order` | "normal" \| "desc" \| "asc" | No | Sort order (asc or desc). |
| `permission_slug` | string | Yes | The permission slug to filter by. Only users with this permission on the resource are returned. |
| `assignment` | "direct" \| "indirect" | No | Filter by assignment type. Use "direct" for direct assignments only, or "indirect" to include inherited assignments. |

### GET /authorization/organization_memberships/{organization_membership_id}/resources

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |
| `before` | string | No | Cursor for pagination (before). |
| `after` | string | No | Cursor for pagination (after). |
| `limit` | integer | No | Maximum number of records to return (default 10, max 100). |
| `order` | "normal" \| "desc" \| "asc" | No | Sort order (asc or desc). |
| `permission_slug` | string | Yes | The permission slug to filter by. Only resources where the user has this permission are returned. |
| `parent_resource_id` | string | No | The ID of the parent resource. Use either this or parent_resource_external_id + parent_resource_type_slug. |
| `parent_resource_type_slug` | string | No | The resource type slug of the parent. Required with parent_resource_external_id. |
| `parent_resource_external_id` | string | No | The external ID of the parent resource. Requires parent_resource_type_slug. |