# Access token

An access token allows you to make API calls to a connected third-party service on behalf of a user. WorkOS handles token refresh automatically, so you always receive a valid, non-expired token.

## Get an access token for a connected account

Fetches a valid OAuth access token for a user's connected account. WorkOS automatically handles token refresh, ensuring you always receive a valid, non-expired token.

#### Request

#### Response

### access_token

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "access_token" | Yes | Distinguishes the access token object. |
| `access_token` | string | Yes | The OAuth access token for the connected integration. |
| `expires_at` | string \| null | Yes | The ISO-8601 formatted timestamp indicating when the access token expires. |
| `scopes` | string[] | Yes | The scopes granted to the access token. |
| `missing_scopes` | string[] | Yes | If the integration has requested scopes that aren't present on the access token, they're listed here. |

### POST /data-integrations/{slug}/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | The identifier of the integration. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `active` | boolean | Indicates whether the access token is valid and ready for use, or if reauthorization is required. |
| `access_token` | object | The [access token](/reference/pipes/access-token) object, present when `active` is `true`. |
| `error` | "needs_reauthorization" \| "not_installed" | - `"not_installed"`: The user does not have the integration installed. `"needs_reauthorization"`: The user needs to reauthorize the integration. |