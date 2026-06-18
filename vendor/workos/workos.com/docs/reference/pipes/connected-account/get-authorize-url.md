# Connected account

A connected account represents a user's authorized connection to a third-party [provider](https://workos.com/docs/reference/pipes/provider) through Pipes. Connected accounts store the OAuth credentials and scopes granted during the authorization flow.

When listing providers for a user, each provider includes a nested `connected_account` showing the user's connection status.

## Delete a connected account

Disconnects WorkOS's account for the user, including removing any stored access and refresh tokens. The user will need to reauthorize if they want to reconnect.

This does not revoke access on the provider side. The user may need to disconnect the application directly from the provider's settings.

Returns a `204 No Content` response on success.

#### Request

## Get authorization URL

Generates an OAuth authorization URL to initiate the connection flow for a user. Redirect the user to the returned URL to begin the OAuth flow with the third-party provider.

#### Request

#### Response

## Get a connected account

Retrieves a user's [connected account](https://workos.com/docs/reference/pipes/connected-account) for a specific provider.

#### Request

#### Response

### connected_account

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connected_account" | Yes | Distinguishes the connected account object. |
| `id` | string | Yes | The unique identifier of the connected account. |
| `user_id` | string \| null | Yes | The [User](/reference/authkit/user) identifier associated with this connection. |
| `organization_id` | string \| null | Yes | The [Organization](/reference/organization) identifier associated with this connection, or `null` if not scoped to an organization. |
| `scopes` | string[] | Yes | The OAuth scopes granted for this connection. |
| `state` | "connected" \| "needs_reauthorization" \| "disconnected" | Yes | The state of the connected account: `connected`: The connection is active and tokens are valid. `needs_reauthorization`: The user needs to reauthorize the connection, typically because required scopes have changed. `disconnected`: The connection has been disconnected. |
| `created_at` | string | Yes | The timestamp when the connection was created. |
| `updated_at` | string | Yes | The timestamp when the connection was last updated. |

### DELETE /user_management/users/{user_id}/connected_accounts/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | Yes | A [User](/reference/authkit/user) identifier. |
| `slug` | string | Yes | The slug identifier of the provider (e.g., `github`, `slack`, `notion`). |
| `organization_id` | string | No | An [Organization](/reference/organization) identifier. Optional parameter if the connection is scoped to an organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### POST /data-integrations/{slug}/authorize

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The slug identifier of the provider (e.g., `github`, `slack`, `notion`). |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `url` | string | The OAuth authorization URL to redirect the user to. |

### GET /user_management/users/{user_id}/connected_accounts/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | Yes | A [User](/reference/authkit/user) identifier. |
| `slug` | string | Yes | The slug identifier of the provider (e.g., `github`, `slack`, `notion`). |
| `organization_id` | string | No | An [Organization](/reference/organization) identifier. Optional parameter if the connection is scoped to an organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connected_account` | object | Distinguishes the connected account object. |