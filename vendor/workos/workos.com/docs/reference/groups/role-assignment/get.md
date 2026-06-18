# GroupRoleAssignment

A group role assignment connects a [Group](https://workos.com/docs/reference/groups) to a [role](https://workos.com/docs/reference/roles). When a role is assigned to a group, all members of that group gain the permissions included in that role. As organization memberships are added to or removed from the group, the role and its permissions automatically propagate to the current members.

Group role assignments can also be scoped to a specific resource for [Fine-Grained Authorization](https://workos.com/docs/reference/fga). When a resource is specified, members of the group receive the role's permissions on that resource and its descendants via [permission inheritance](https://workos.com/docs/fga/roles-and-permissions).

#### Example GroupRoleAssignment

## Assign a role to a group

Assign a role to a group on a specific resource.

#### Request

#### Response

## Get a group role assignment

Get a specific role assignment for a group by its ID.

#### Request

#### Response

## List role assignments for a group

List all role assignments granted to a group. Each assignment represents a role granted to the group on a resource.

#### Request

#### Response

## Remove a group role assignment

Remove a specific role assignment from a group by its ID.

#### Request

## Remove group role assignments by criteria

Remove role assignments from a group that match the provided criteria. Returns 404 when no matching active assignment is found.

#### Request

## Replace all role assignments for a group

Replace all role assignments for a group with the provided list. Existing assignments not in the list will be removed.

#### Request

#### Response

### group_role_assignment

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "group_role_assignment" | Yes | Distinguishes the group role assignment object. |
| `id` | string | Yes | Unique identifier of the group role assignment. |
| `group_id` | string | Yes | The ID of the group the role is assigned to. |
| `role` | object | Yes | The role included in the assignment. |
| `resource` | object | Yes | The resource the role is assigned on. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |

### POST /authorization/groups/{group_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group_role_assignment` | object | Distinguishes the group role assignment object. |

### GET /authorization/groups/{group_id}/role_assignments/{role_assignment_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |
| `role_assignment_id` | string | Yes | The ID of the group role assignment. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group_role_assignment` | object | Distinguishes the group role assignment object. |

### GET /authorization/groups/{group_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### DELETE /authorization/groups/{group_id}/role_assignments/{role_assignment_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |
| `role_assignment_id` | string | Yes | The ID of the group role assignment to remove. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### DELETE /authorization/groups/{group_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### PUT /authorization/groups/{group_id}/role_assignments

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_id` | string | Yes | The ID of the group. |