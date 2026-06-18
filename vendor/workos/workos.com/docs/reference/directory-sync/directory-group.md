# Directory group

A directory group represents an organizational unit of users in a directory provider.

## Get a Directory Group

Get the details of an existing Directory Group.

#### Request

#### Response

## List Directory Groups

Get a list of all of existing directory groups matching the criteria specified.

> **Note:** To fetch the groups a single user belongs to, pass the `user` query parameter
> with the directory user's ID. This is the recommended replacement for the
> `groups` field on the [Directory
> User](https://workos.com/docs/reference/directory-sync/directory-user) object, which is deprecated
> and returns an empty array by default for teams created on or after **May 1,
> 2026**. The response is bounded by a single user's memberships, which gives
> better throughput performance than the unbounded `groups` array. **Existing
> teams still depending on the legacy `groups` field should migrate to this
> access pattern.**

#### Request

#### Response

### directory_group

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "directory_group" | Yes | Distinguishes the Directory Group object. |
| `id` | string | Yes | Unique identifier for the Directory Group. |
| `idp_id` | string | Yes | Unique identifier for the group, assigned by the Directory Provider. Different Directory Providers use different ID formats. |
| `directory_id` | string | Yes | The identifier of the Directory the Directory Group belongs to. |
| `organization_id` | string | Yes | The identifier for the Organization in which the Directory resides. |
| `name` | string | Yes | The name of the Directory Group. |
| `raw_attributes` | object | No | The raw attributes received from the directory provider. |
| `created_at` | string | Yes | The timestamp when the Directory Group was created. |
| `updated_at` | string | Yes | The timestamp when the Directory Group was last updated. |

### GET /directory_groups/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Directory Group. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `directory_group` | object | Distinguishes the Directory Group object. |

### GET /directory_groups

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `directory` | string | No | Unique identifier of the WorkOS Directory. This value can be obtained from the WorkOS dashboard or from the WorkOS API. |
| `user` | string | No | Unique identifier of the WorkOS Directory User. This value can be obtained from the WorkOS API. |