# CLI Auth

CLI Auth for WorkOS Connect enables third-party applications to build command-line tools that integrate with your app's credentials using the [OAuth 2.0 Device Authorization Flow](https://datatracker.ietf.org/doc/html/rfc8628).

The CLI Auth flow for Connect involves two main endpoints:

1. The **device authorization URL** initiates the flow by obtaining device codes, user codes, and verification URIs.
2. The **device access token URL** is where the device exchanges the device code for access and refresh tokens after the user authenticates.

Read more about [CLI Auth here](https://workos.com/docs/authkit/cli-auth/connect).

## Device code grant

Exchanges a device code for access and refresh tokens as part of the device authorization flow for WorkOS Connect applications. This endpoint should be polled repeatedly until the user authorizes the request, declines it, or the device code expires.

#### Request

#### Response

The returned tokens are similar to those provided by the [authorization code grant](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant).

### POST /oauth2/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `grant_type` | "urn:ietf:params:oauth:grant-type:device_code" | Yes | Must be `urn:ietf:params:oauth:grant-type:device_code` for device authorization flow. |
| `device_code` | string | Yes | The device code obtained from the device authorization endpoint. |
| `client_id` | string | Yes | The client ID of the WorkOS Connect Application. |
| `client_secret?` | string | Yes | A secret key associated with the WorkOS Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | string | A JWT that can be used to authorize requests. |
| `refresh_token` | string | An opaque token that can be exchanged for new access, ID, and refresh tokens. |
| `id_token` | string | A JWT that contains information about the user. |
| `token_type` | "Bearer" | How to use the access token to authorize requests. Always `"Bearer"`. |
| `expires_in` | integer | The number of seconds until the access token expires. |