# Encrypted object

Represents an encrypted object stored by Vault.

#### Object

## Create an object

Encrypt and store a new key-value object.

#### Request

#### Response

## Delete an object

Delete an encrypted object.

#### Request

#### Response

## Read an object by name

Fetch and decrypt an object by its unique name.

#### Request

#### Response

## Read an object by ID

Fetch and decrypt an object by its unique identifier.

#### Request

#### Response

## List objects

List all encrypted objects with cursor-based pagination.

#### Request

#### Response

## Describe an object

Fetch metadata for an object without decrypting it.

#### Request

#### Response

## Update an object

Update the value of an existing encrypted object.

#### Request

#### Response

# Object version

Represents a static version of an object stored by Vault.

#### Object Version

## List object versions

Retrieve all versions for a specific object.

#### Request

#### Response

### object

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique string ID of the object. |
| `name` | string | Yes | Unique name of the object, used as the KV store key. |
| `value` | string | Yes | Plaintext data that will be stored in an encrypted format. |
| `metadata` | object | Yes |  |

### /vault/v1/kv

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `key_context` | object | Yes | Map of values used to determine the encryption key. |
| `name` | string | Yes | Unique name for the object. |
| `value` | string | Yes | Plaintext data to encrypt and store. |

### DELETE /vault/v1/kv/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the object. |
| `version_check` | string | No | Expected current version for optimistic locking. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Name of the deleted object. |
| `success` | boolean | Whether the deletion succeeded. |

### GET /vault/v1/kv/name/{name}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Unique name of the object. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier of the object. |
| `metadata` | object | Metadata for a stored encrypted object. |
| `name` | string | Unique name of the object. |
| `value` | string | Decrypted plaintext value. |

### GET /vault/v1/kv/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the object. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier of the object. |
| `metadata` | object | Metadata for a stored encrypted object. |
| `name` | string | Unique name of the object. |
| `value` | string | Decrypted plaintext value. |

### GET /vault/v1/kv

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | integer | No | Upper limit on the number of objects to return. Defaults to `10`. |
| `before` | string | No | Cursor for the previous page of results. |
| `after` | string | No | Cursor for the next page of results. |
| `order` | "asc" \| "desc" | No | Sort direction for results. |
| `search` | string | No | Filter results by name or structured search JSON. |
| `updatedAfter` | string | No | ISO 8601 timestamp to filter by last modified time. |

### GET /vault/v1/kv/{id}/metadata

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the object. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier of the object. |
| `metadata` | object | Metadata for a stored encrypted object. |
| `name` | string | Unique name of the object. |

### PUT /vault/v1/kv/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the object. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier of the object. |
| `metadata` | object | Metadata for a stored encrypted object. |
| `name` | string | Unique name of the object. |

### object_version

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique string ID of the version. |
| `current_version` | boolean | Yes | Boolean indicating whether this version is the default for the object. |
| `created_at` | string | Yes | ISO 8601 timestamp of when this version was created. |
| `size` | integer | Yes | Number of bytes of data stored in the object. |
| `etag` | string | Yes | A hash of the value of the object. |

### GET /vault/v1/kv/{id}/versions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the object. |