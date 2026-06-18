# Token

This endpoint is called by WorkOS Connect Applications to get access tokens, ID tokens, and refresh tokens, depending on the `grant_type` provided when requested.

This endpoint is authenticated by providing the WorkOS Application's client ID and client secret in the body of the request.

There are four grant types available:

- [Authorization code](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant)
- [Refresh token](https://workos.com/docs/reference/workos-connect/token/refresh-token-grant)
- [Client credentials](https://workos.com/docs/reference/workos-connect/token/client-credentials-grant)
- [Device code](https://workos.com/docs/reference/workos-connect/cli-auth/device-code-grant)

Each is described in greater detail below.

### Authorization code grant

Used by WorkOS Connect OAuth Applications to exchange an authorization code for access tokens, ID tokens, and refresh tokens.

#### Request

#### Response

#### Access token

The access token for WorkOS Connect OAuth Applications contains the following claims.

#### Decoded access token

#### ID token

The ID token, when requested with the `openid` scope, contains information about the user's identity, like name and email address.

#### Decoded ID token

### Client credentials grant

Used by WorkOS Connect M2M Applications to exchange the app's credentials for access tokens.

#### Request

#### Response

#### Access token

The access token for WorkOS Connect M2M Applications contains the following claims.

#### Decoded access token

### Refresh token grant

Used by WorkOS Connect OAuth Applications to exchange a refresh token for new access tokens and/or ID tokens. The refresh token is provided when the initial `oauth2/authorize` request is made with the `offline_access` scope.

The [access token](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant/access-token) and [ID tokens](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant/id-token) issued here are the same as those issued for the initial `authorization_code` grant.

#### Request

#### Response

### POST /oauth2/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The client ID of the WorkOS Connect Application. |
| `client_secret` | string | Yes | A secret key associated with the WorkOS Connect Application. |
| `grant_type` | "authorization_code" | Yes | Always `"authorization_code"` for this flow. |
| `code` | string | Yes | The authorization code received from authenticating the user, provided when the user is redirected back to the client. |
| `redirect_uri` | string | Yes | The URL to redirect the user to after they have logged in. This must be the same redirect URI used in the initial `/oauth2/authorize` request. |
| `code_verifier` | string | No | The code verifier used for PKCE (Proof Key for Code Exchange). This is the original random string that was used to generate the `code_challenge` in the authorization request. Required when using PKCE. **Note:** PKCE is only supported by applications created through Dynamic Client Registration, which is required to use MCP (Model Context Protocol) authorization. For setup instructions, see our [MCP guide](/authkit/mcp). |

### POST /oauth2/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The client ID of the WorkOS Connect Application. |
| `client_secret` | string | Yes | A secret key associated with the WorkOS Connect Application. |
| `grant_type` | "client_credentials" | Yes | Always `"client_credentials"` for this flow. |
| `scope` | string | No | A space-separated set of scopes to use for the access token. |

### POST /oauth2/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The client ID of the WorkOS Connect Application. |
| `client_secret` | string | Yes | A secret key associated with the WorkOS Connect Application. |
| `grant_type` | "refresh_token" | Yes | Always `"refresh_token"` for this flow. |
| `refresh_token` | string | Yes | The refresh token received from a previous token request. |
| `scope` | string | No | A space-separated set of scopes to use for the tokens to be issued by this request. Must be a subset of the scopes initially specified in the `/oauth2/authorize` request. |