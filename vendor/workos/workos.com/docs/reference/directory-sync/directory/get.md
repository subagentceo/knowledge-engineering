# Directory

A directory stores information about an organization's employee management system.

Synchronizing with a directory enables you to receive changes to an organization's [user](https://workos.com/docs/reference/directory-sync/directory-user) and [group](https://workos.com/docs/reference/directory-sync/directory-group) structure.

Directory providers vary in implementation details and may require different sets of fields for integration, such as API keys, subdomains, endpoints, usernames, etc. Where available, the WorkOS API will provide these fields when fetching directory records.

## Delete a Directory

Permanently deletes an existing directory. It cannot be undone.

#### Request

## Get a Directory

Get the details of an existing directory.

#### Request

#### Response

## List Directories

Get a list of all of your existing directories matching the criteria specified.

#### Request

#### Response

### directory

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "directory" | Yes | Distinguishes the Directory object. |
| `id` | string | Yes | Unique identifier for the Directory. |
| `organization_id` | string | Yes | The unique identifier for the Organization in which the directory resides. |
| `external_key` | string | Yes | External Key for the Directory. |
| `type` | "azure scim v2.0" \| "bamboohr" \| "breathe hr" \| ... | Yes | The type of external Directory Provider integrated with. |
| `state` | "linked" \| "validating" \| "invalid_credentials" \| "unlinked" \| "deleting" | Yes | Describes whether the Directory has been successfully connected to an external provider. |
| `name` | string | Yes | The name of the directory. |
| `domain` | string | No | The URL associated with an Enterprise Client. |
| `metadata` | object | No | Aggregate counts of directory users and groups synced from the provider. |
| `created_at` | string | Yes | The timestamp when the Directory was created. |
| `updated_at` | string | Yes | The timestamp when the Directory was last updated. |

### DELETE /directories/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Directory. |

### GET /directories/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Directory. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `directory` | object | Distinguishes the Directory object. |

### GET /directories

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |
| `organization_id` | string | No | Filter Directories by their associated organization. |
| `search` | string | No | Searchable text to match against Directory names. |
| `domain` | string | No | Filter Directories by their associated domain. |