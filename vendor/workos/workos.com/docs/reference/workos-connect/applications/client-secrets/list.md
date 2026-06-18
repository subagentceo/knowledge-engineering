# Client secrets

Client secrets are used to authenticate Connect Applications when making requests to WorkOS APIs.

When a client secret is first created, the response includes an additional `secret` field containing the plaintext secret. This is the only time the plaintext secret will be returned.

## Create a Client Secret

Create a new client secret for a Connect Application.

This is the only time the plaintext secret will be returned and must be stored securely.

#### Request

#### Response

## Delete a Client Secret

Delete (revoke) an existing client secret.

#### Request

## List Client Secrets

List all client secrets associated with a Connect Application.

The plaintext secret is never returned after creation. Only the secret hint is included.

#### Request

#### Response

### connect_application_secret

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connect_application_secret" | Yes | Always "connect_application_secret". |
| `id` | string | Yes | Unique identifier for the client secret. |
| `secret_hint` | string | Yes | A hint showing the last few characters of the secret. |
| `last_used_at` | string | No | ISO 8601 timestamp of when the secret was last used, or null if never used. |
| `created_at` | string | Yes | ISO 8601 timestamp of creation. |
| `updated_at` | string | Yes | ISO 8601 timestamp of last update. |
| `secret` | string | No | The plaintext client secret. This is only returned at creation time and cannot be retrieved later. |

### POST /connect/applications/{id}/client_secrets

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The application ID or client ID of the Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connect_application_secret` | object | Distinguishes the connect application secret object. |

### DELETE /connect/client_secrets/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the client secret. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /connect/applications/{id}/client_secrets

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The application ID or client ID of the Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connect_application_secret` | object[] | Distinguishes the connect application secret object. |