# Organization membership

An organization membership is a top-level resource that represents a [user](https://workos.com/docs/reference/authkit/user)'s relationship with an [organization](https://workos.com/docs/reference/organization). A user may be a member of zero, one, or many organizations.

See the [events reference](https://workos.com/docs/events/organization-membership) documentation for the organization membership events.

## Create an organization membership

Creates a new `active` organization membership for the given organization and user.

Calling this API with an organization and user that match an `inactive` organization membership will activate the membership with the specified role(s).

#### Request

#### Response

## Deactivate an organization membership

Deactivates an `active` organization membership. Emits an [organization\_membership.updated](https://workos.com/docs/events/organization-membership) event upon successful deactivation.

- Deactivating an `inactive` membership is a no-op and does not emit an event.
- Deactivating a `pending` membership returns an error. This membership should be [deleted](https://workos.com/docs/reference/authkit/organization-membership/delete) instead.

See the [membership management documentation](https://workos.com/docs/authkit/users-organizations/organizations/membership-management) for additional details.

#### Request

#### Response

## Delete an organization membership

Permanently deletes an existing organization membership. It cannot be undone.

#### Request

## Get an organization membership

Get the details of an existing organization membership.

#### Request

#### Response

## List groups

Get a list of groups that an organization membership belongs to.

#### Request

#### Response

## List organization memberships

Get a list of all organization memberships matching the criteria specified. At least one of `user_id` or `organization_id` must be provided. By default only active memberships are returned. Use the `statuses` parameter to filter by other statuses.

#### Request

#### Response

## Reactivate an organization membership

Reactivates an `inactive` organization membership, retaining the pre-existing role(s). Emits an [organization\_membership.updated](https://workos.com/docs/events/organization-membership) event upon successful reactivation.

- Reactivating an `active` membership is a no-op and does not emit an event.
- Reactivating a `pending` membership returns an error. The user needs to [accept the invitation](https://workos.com/docs/authkit/invitations) instead.

See the [membership management documentation](https://workos.com/docs/authkit/users-organizations/organizations/membership-management) for additional details.

#### Request

#### Response

## Update an organization membership

Update the details of an existing organization membership.

#### Request

#### Response

### organization_membership

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "organization_membership" | Yes | Distinguishes the organization membership object. |
| `id` | string | Yes | The unique ID of the organization membership. |
| `userId` | string | Yes | The ID of the [user](/reference/authkit/user). |
| `organizationId` | string | Yes | The ID of the [organization](/reference/organization) which the user belongs to. |
| `organizationName` | string | Yes | The name of the [organization](/reference/organization) which the user belongs to. |
| `role` | object | Yes | organization_membership.role |
| `roles` | array | Yes | The list of roles assigned to the user within the organization. |
| `customAttributes` | object | Yes | An object containing IdP-sourced attributes from the linked [Directory User](/reference/directory-sync/directory-user) or [SSO Profile](/reference/sso/profile). Directory User attributes take precedence when both are linked. |
| `directoryManaged` | boolean | Yes | Whether the organization membership is managed by a directory sync connection. |
| `status` | "active" \| "inactive" \| "pending" | Yes | The status of the organization membership. One of `active`, `inactive`, or `pending`. |
| `createdAt` | string | Yes | The timestamp when the organization membership was created. |
| `updatedAt` | string | Yes | The timestamp when the organization membership was last updated. |

### /user_management/organization_memberships

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | Yes | The ID of the [user](/reference/authkit/user). |
| `organization_id` | string | Yes | The ID of the [organization](/reference/organization) which the user belongs to. |
| `role_slug` | string | No | A single role identifier. Defaults to `member` or the explicit default role. Mutually exclusive with `role_slugs`. |
| `role_slugs` | string[] | No | An array of role identifiers. Mutually exclusive with `role_slug`. Limited to one role when Multiple Roles is disabled. |

### PUT /user_management/organization_memberships/{id}/deactivate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_membership` | object | Distinguishes the organization membership object. |

### DELETE /user_management/organization_memberships/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the organization membership. |

### GET /user_management/organization_memberships/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_membership` | object | Distinguishes the organization membership object. |

### GET /user_management/organization_memberships/{omId}/groups

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `omId` | string | Yes | Unique identifier of the Organization Membership. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### GET /user_management/organization_memberships

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `organization_id` | string | No | The ID of the [organization](/reference/organization) which the user belongs to. |
| `statuses` | ("active" \| "inactive" \| "pending")[] | No | Filter by the status of the organization membership. Array including any of `active`, `inactive`, or `pending`. |
| `user_id` | string | No | The ID of the [user](/reference/authkit/user). |

### PUT /user_management/organization_memberships/{id}/reactivate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_membership` | object | Distinguishes the organization membership object. |

### PUT /user_management/organization_memberships/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the organization membership. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_membership` | object | Distinguishes the organization membership object. |