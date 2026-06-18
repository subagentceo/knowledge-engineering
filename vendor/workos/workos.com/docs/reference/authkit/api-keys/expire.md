# API Keys

API keys provide a secure way for your application's users to authenticate with your API. IT contacts create API keys through the [API Keys Widget](https://workos.com/docs/widgets/api-keys), and your application can validate these keys to authenticate API requests.

Read more about [API keys in AuthKit](https://workos.com/docs/authkit/api-keys).

The `owner.type` field distinguishes organization-owned keys from user-owned keys. Organization-owned keys include an organization ID in `owner.id`. User-owned keys include the user ID in `owner.id` and the organization the key can access in `owner.organization_id`.

The full API key value is returned only when a key is created. Later list, validate, and object responses include `obfuscated_value`, but not `value`.

## Create organization API key

Creates a new API key for the specified organization. The response includes the full API key value, which is only returned once at creation time. Make sure to store this value securely as it cannot be retrieved again.

You can optionally specify permissions to control what actions the API key can perform. If no permissions are provided, the key will have no specific permissions assigned.

#### Request

#### Response

## Create an API key for a user

Create a new API key owned by a user. The user must have an active membership in the specified organization.

#### Request

#### Response

## Delete an API key

Permanently deletes an API key. This action cannot be undone. Once deleted, any requests using this API key will fail authentication.

#### Request

## Expire an API key

Expire an API key immediately, schedule a future expiration, or clear a scheduled future expiration.

#### Request

#### Response

## List API keys for an organization

Get a list of all API keys for an organization.

#### Request

#### Response

## List API keys for a user

Get a list of API keys owned by a specific user.

#### Request

#### Response

# Validate API key

## Validate API key

Validates an API key and returns its associated metadata if the key is valid. Your application's API uses this endpoint to authenticate incoming requests that include an API key.

The endpoint returns the complete API key object when validation succeeds, allowing you to access the key's permissions and owner information for authorization purposes. If the key is invalid, the endpoint returns `null` for the `api_key` field.

#### Request

#### Response

### api_key

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "api_key" | Yes | Distinguishes the API key object. |
| `id` | string | Yes | The unique ID of the API key. |
| `owner` | object | Yes | The entity that owns the API Key. |
| `name` | string | Yes | The human-readable name assigned to the API key. |
| `obfuscated_value` | string | Yes | The obfuscated API key value showing only prefix and last few characters for security. |
| `last_used_at` | string | No | The timestamp when the API key was last used, null if never used. |
| `expires_at` | string | No | Timestamp when the API Key expires. Null means the key does not expire. |
| `permissions` | string[] | Yes | Array of permission strings assigned to this API key for authorization purposes. |
| `created_at` | string | Yes | The timestamp when the API key was created. |
| `updated_at` | string | Yes | The timestamp when the API key was last updated. |

### POST /organizations/{organizationId}/api_keys

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | object | Distinguishes the API Key object. |

### POST /user_management/users/{userId}/api_keys

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | string | Yes | Unique identifier of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | object | Distinguishes the API Key object. |

### DELETE /api_keys/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the API key to delete. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### POST /api_keys/{id}/expire

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the API key. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | object | Distinguishes the API Key object. |

### GET /organizations/{organizationId}/api_keys

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |

### GET /user_management/users/{userId}/api_keys

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | string | Yes | Unique identifier of the user. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |
| `organization_id` | string | No | The ID of the organization to filter user API keys by. When provided, only API keys created against that organization membership are returned. |

### /api_keys/validations

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | string | Yes | The API key value to validate. |