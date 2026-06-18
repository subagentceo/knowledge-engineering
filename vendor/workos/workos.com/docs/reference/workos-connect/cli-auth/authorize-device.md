# Authorize device

Initiates the device authorization flow for WorkOS Connect applications. This endpoint implements the [OAuth 2.0 Device Authorization Flow](https://datatracker.ietf.org/doc/html/rfc8628) and is designed for CLI applications and other devices with limited input capabilities.

This endpoint is used by third-party applications to authenticate users through WorkOS Connect. Users will be prompted to authorize the application's access to their data as part of the consent flow.

#### Request

#### Response

### POST /oauth2/device_authorization

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The client ID of the WorkOS Connect Application. |
| `scope` | string | No | A space-separated list of scopes being requested. Acceptable values: `openid`: Required to enable other scopes like `profile` and `email`. `profile`: Adds profile information (name fields) to the ID token. `name` `given_name` `family_name` `email`: Adds email information to the ID token. `email` `email_verified` `offline_access`: Adds a refresh token to the response. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `device_code` | string | A unique identifier for this authorization request. Use this when polling the token endpoint. |
| `user_code` | string | A short, user-friendly code that users enter to authorize the device. |
| `verification_uri` | string | The URL where users can enter the user code to authorize the device. |
| `verification_uri_complete` | string | A URL with the user code pre-filled, allowing one-click authorization. |
| `expires_in` | integer | The lifetime of the device code and user code in seconds (300 seconds = 5 minutes). |
| `interval` | integer | The minimum interval in seconds between token requests (5 seconds). |