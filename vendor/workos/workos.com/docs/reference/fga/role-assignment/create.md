# Role assignment

A role assignment connects an organization membership to a role on a specific resource. When a role is assigned, the user gains all permissions included in that role on the resource and its descendants through permission inheritance.

## Assign a role

Assign a role to an organization membership on a specific resource. The user will immediately gain all permissions included in that role on the resource and its descendants.

You must provide either `resource_id` or both `resource_external_id` and `resource_type_slug` to identify the resource.

> **Note:** The role must be scoped to the resource type of the target resource. You
> cannot assign a project role on a workspace resource.

#### Request

#### Response

## Remove a role assignment by ID

Remove a role assignment using its ID. Access is revoked immediately. Removing an assignment also removes any permissions that were inherited by child resources through that assignment.

> **Note:** This removes the specific role assignment, but direct assignments on child
> resources remain intact.

#### Request

## Remove a role assignment

Remove a role assignment by specifying the role slug and resource. Access is revoked immediately. Removing an assignment also removes any permissions that were inherited by child resources through that assignment.

You must provide either `resource_id` or both `resource_external_id` and `resource_type_slug` to identify the resource.

> **Note:** This removes the specific role assignment, but direct assignments on child
> resources remain intact.

#### Request

## List role assignments for a resource by external ID

List all role assignments granted on a resource, identified by its external ID. Each assignment includes the organization membership it was granted to.

#### Request

#### Response

## List role assignments for a resource

List all role assignments granted on a specific resource instance. Each assignment includes the organization membership it was granted to.

#### Request

#### Response

## List role assignments

List all role assignments for an organization membership. This returns all roles that have been assigned to the user on resources, including organization-level and sub-resource roles.

#### Request

#### Response

### Role Assignment

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "role_assignment" | Yes | Distinguishes the Role Assignment object. |
| `id` | string | Yes | Unique identifier of the role assignment. |
| `role` | object | Yes | The role that was assigned. |
| `resource` | object | Yes | The resource the role is assigned on. |
| `created_at` | string | Yes | The timestamp when the role assignment was created. |
| `updated_at` | string | Yes | The timestamp when the role assignment was last updated. |

### POST /authorization/organization_memberships/{organization_membership_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `role_assignment` | object | Distinguishes the role assignment object. |

### DELETE /authorization/organization_memberships/{organization_membership_id}/role_assignments/{role_assignment_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |
| `role_assignment_id` | string | Yes | The ID of the role assignment to remove. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### DELETE /authorization/organization_memberships/{organization_membership_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /authorization/organizations/{organization_id}/resources/{resource_type_slug}/{external_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization that owns the resource. |
| `resource_type_slug` | string | Yes | The slug of the resource type. |
| `external_id` | string | Yes | An identifier you provide to reference the resource in your system. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `role_slug` | string | No | Filter assignments by the slug of the role. |

### GET /authorization/resources/{resource_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource_id` | string | Yes | The ID of the authorization resource. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `role_slug` | string | No | Filter assignments by the slug of the role. |

### GET /authorization/organization_memberships/{organization_membership_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_membership_id` | string | Yes | The ID of the organization membership. |
| `before` | string | No | Cursor for pagination (before). |
| `after` | string | No | Cursor for pagination (after). |
| `limit` | integer | No | Maximum number of records to return (default 10, max 100). |
| `order` | "normal" \| "desc" \| "asc" | No | Sort order (asc or desc). |
| `resource_id` | string | No | Filter assignments by the ID of the resource. |
| `resource_external_id` | string | No | Filter assignments by the external ID of the resource. |
| `resource_type_slug` | string | No | Filter assignments by the slug of the resource type. |