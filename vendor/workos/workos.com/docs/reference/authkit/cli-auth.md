# CLI Auth

CLI Auth enables command-line applications to authenticate users through the web using the [OAuth 2.0 Device Authorization Flow](https://datatracker.ietf.org/doc/html/rfc8628).

The CLI Auth flow involves two main endpoints:

1. The **device authorization URL** initiates the flow by obtaining a device code, user code, and verification URIs.
2. The **device access token URL** is where the device exchanges the device code for access and refresh tokens after the user authenticates.

Read more about [CLI Auth here](https://workos.com/docs/authkit/cli-auth).

# Get a device authorization URL

## Get device authorization URL

Initiates the CLI Auth flow by requesting a device code and verification URLs. This endpoint implements the OAuth 2.0 Device Authorization Flow ([RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628)) and is designed for command-line applications or other devices with limited input capabilities.

#### Request

#### Response

# Device code

## Device code

Exchanges a device code for access and refresh tokens as part of the [CLI Auth](https://workos.com/docs/authkit/cli-auth) flow. This endpoint should be polled repeatedly until the user authorizes the request, declines it, or the device code expires.

#### Request

#### Response

### Error codes

When polling the device code endpoint, you may receive various error responses before the user completes authorization or if authorization fails. These errors help your application understand the current state and take appropriate action.

Possible error codes and the corresponding descriptions are listed below.

| Error code               | Description                                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization_pending`  | The authorization request is still pending as the user hasn't yet completed the user interaction flow. Continue polling at the specified interval.                    |
| `slow_down`              | The client is polling too frequently and should slow down. Increase your polling interval by at least 5 seconds and continue polling.                                 |
| `access_denied`          | The user declined the authorization request. Stop polling and inform the user that authorization was denied.                                                          |
| `expired_token`          | The device code has expired (typically after 5 minutes). Stop polling and restart the authorization flow if needed.                                                   |
| `invalid_request`        | The request is missing a required parameter or includes an invalid parameter value. Check that `grant_type`, `device_code`, and `client_id` are provided and correct. |
| `invalid_client`         | Client authentication failed (e.g., unknown client, client authentication not included, or unsupported authentication method).                                        |
| `invalid_grant`          | The provided device code is invalid, malformed, or has already been used.                                                                                             |
| `unsupported_grant_type` | The grant type is not supported. Ensure you're using `urn:ietf:params:oauth:grant-type:device_code`.                                                                  |

### Error response format

All error responses are returned with a 400 status code and follow the OAuth 2.0 error response format. For example:

```json
{
  "error": "authorization_pending",
  "error_description": "The authorization request is still pending as the user hasn't yet completed the user interaction flow."
}
```

### /user_management/authorize/device

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The WorkOS client ID for your application. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `grant_type` | "urn:ietf:params:oauth:grant-type:device_code" | Yes | Must be `urn:ietf:params:oauth:grant-type:device_code` for device authorization flow. |
| `device_code` | string | Yes | The device code obtained from the device authorization endpoint. |
| `client_id` | string | Yes | The WorkOS client ID for your application. |
| `ip_address` | string | No | The IP address of the user's request. |
| `device_id` | string | No | A unique identifier for the device. |
| `user_agent` | string | No | The user agent string from the user's browser. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | The access token for making authenticated requests. |
| `refresh_token` | string | The refresh token for obtaining new access tokens. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |