# Group

A Group is a collection of [Organization Memberships](https://workos.com/docs/reference/authkit/organization-membership) within an [Organization](https://workos.com/docs/reference/organization). Use Groups to organize users into organizational units.

To list the groups that a specific Organization Membership belongs to, use [List Groups](https://workos.com/docs/reference/authkit/organization-membership/list-groups).

#### Example Group

## Add a member to a Group

Add an organization membership to a group.

#### Request

#### Response

## Create a group

Create a new group within an organization.

#### Request

#### Response

## Delete a group

Delete a group from an organization.

#### Request

## Get a group

Retrieve a group by its ID within an organization.

#### Request

#### Response

## List Group members

Get a list of organization memberships in a group.

#### Request

#### Response

## List groups

Get a paginated list of groups within an organization.

#### Request

#### Response

## Remove a member from a Group

Remove an organization membership from a group.

#### Request

## Update a group

Update an existing group. Only the fields provided in the request body will be updated.

#### Request

#### Response

### group

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "group" | Yes | The Group object. |
| `id` | string | Yes | The unique ID of the Group. |
| `organization_id` | string | Yes | The ID of the Organization the Group belongs to. |
| `name` | string | Yes | The name of the Group. |
| `description` | string | No | An optional description of the Group. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |

### POST /organizations/{organizationId}/groups/{groupId}/organization-memberships

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |
| `groupId` | string | Yes | Unique identifier of the Group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group` | object | The Group object. |

### POST /organizations/{organizationId}/groups

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group` | object | The Group object. |

### DELETE /organizations/{organizationId}/groups/{groupId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `groupId` | string | Yes | The ID of the group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /organizations/{organizationId}/groups/{groupId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `groupId` | string | Yes | The ID of the group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group` | object | The Group object. |

### GET /organizations/{organizationId}/groups/{groupId}/organization-memberships

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |
| `groupId` | string | Yes | Unique identifier of the Group. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### GET /organizations/{organizationId}/groups

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### DELETE /organizations/{organizationId}/groups/{groupId}/organization-memberships/{omId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |
| `groupId` | string | Yes | Unique identifier of the Group. |
| `omId` | string | Yes | Unique identifier of the Organization Membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### PATCH /organizations/{organizationId}/groups/{groupId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | The ID of the organization. |
| `groupId` | string | Yes | The ID of the group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `group` | object | The Group object. |