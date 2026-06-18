# Session tokens

## Access token

The access token that is returned in successful authentication responses is a JWT that can be used to verify that a user has an active session. The JWT is signed by a JWKS which can be retrieved from the [WorkOS API](https://workos.com/docs/reference/authkit/session-tokens/jwks).

#### Decoded access token

## JWKS URL

This hosts the public key that is used for verifying access tokens.

#### Request

#### Response

## Refresh token

The refresh token can be used to obtain a new access token using the [authenticate with refresh token
](https://workos.com/docs/reference/authkit/authentication/refresh-token) endpoint. Refresh tokens may only be used once. Refreshes will succeed as long as the user's session is still active.

### /sso/jwks

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | string | Yes | client_id |