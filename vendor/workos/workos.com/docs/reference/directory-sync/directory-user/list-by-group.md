# Directory user

A directory user represents an active organization user.

Developers can receive [Webhooks](https://workos.com/docs/events/directory-sync) as employees are added, updated or removed, allowing for provisioning and de-provisioning Users within an application.

## Get a Directory User

Get the details of an existing Directory User.

> **Note:** The `groups` field on the directory user is deprecated. Starting May 1, 2026,
> newly created teams receive `groups: []` by default. **Existing teams
> currently depending on this field should migrate to the new access pattern for
> better throughput performance** — the field is unbounded by user, so users
> with many group memberships produce large, slow response payloads. To fetch
> the user's group memberships, use the [List Directory
> Groups](https://workos.com/docs/reference/directory-sync/directory-group/list) endpoint with a `user`
> filter.

#### Request

#### Response

## List directory users by group

Get a list of directory users that belong to a specific directory group. The response is bounded by the size of the requested group, which keeps payloads predictable.

Starting May 1, 2026, the `groups` field on each returned user is empty by default for newly created teams — the caller already knows which group is being filtered. To fetch a user's complete group memberships, use the [List Directory Groups](https://workos.com/docs/reference/directory-sync/directory-group/list) endpoint with a `user` filter.

#### Request

#### Response

## List Directory Users

Get a list of all of existing Directory Users matching the criteria specified.

> **Note:** The `groups` field on each directory user is deprecated. Starting May 1, 2026,
> newly created teams receive `groups: []` by default. **Existing teams
> currently depending on this field should migrate to the new access pattern for
> better throughput performance** — the field is unbounded by user, so users
> with many group memberships produce large, slow response payloads. To fetch a
> user's group memberships, use the [List Directory
> Groups](https://workos.com/docs/reference/directory-sync/directory-group/list) endpoint with a `user`
> filter.

#### Request

#### Response

### directory_user

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "directory_user" | Yes | Distinguishes the Directory User object. |
| `id` | string | Yes | Unique identifier for the Directory User. |
| `directory_id` | string | Yes | The identifier of the Directory the Directory User belongs to. |
| `organization_id` | string | Yes | The identifier for the Organization in which the Directory resides. |
| `idp_id` | string | Yes | Unique identifier for the user, assigned by the Directory Provider. Different Directory Providers use different ID formats. |
| `email` | string | No | The email address of the user. |
| `first_name` | string | No | The first name of the user. |
| `last_name` | string | No | The last name of the user. |
| `name` | string | No | The full name of the user. |
| `emails` | object[] | No | A list of email addresses for the user. |
| `job_title` | string | No | The job title of the user. |
| `username` | string | No | The username of the user. |
| `state` | "active" \| "suspended" \| "inactive" | Yes | The state of the user. `active` `inactive` |
| `raw_attributes` | object | Yes | The raw attributes received from the directory provider. |
| `custom_attributes` | object | Yes | An object containing the custom attribute mapping for the Directory Provider. |
| `role` | object | No | The primary role assigned to the user. |
| `roles` | object[] | No | All roles assigned to the user. |
| `created_at` | string | Yes | The timestamp when the Directory User was created. |
| `updated_at` | string | Yes | The timestamp when the Directory User was last updated. |

### GET /directory_users/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Directory User. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `directory_user` | object | Distinguishes the Directory User object. |

### GET /directory_users

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group` | string | Yes | Unique identifier of the WorkOS Directory Group. This value can be obtained from the WorkOS API. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to descending. |

### GET /directory_users

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `directory` | string | No | Unique identifier of the WorkOS Directory. This value can be obtained from the WorkOS dashboard or from the WorkOS API. |
| `group` | string | No | Unique identifier of the WorkOS Directory Group. This value can be obtained from the WorkOS API. |