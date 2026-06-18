# Token introspection

Indicates whether the given token (access token or refresh token) is valid and active. Additionally, it provides details about the token.

This endpoint is authenticated by provided the WorkOS Application's client ID and client secret in the body of the request.

#### Request

#### Access token

#### Access token (M2M)

#### Refresh token

#### Invalid

### POST /oauth2/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | workos_connect_token_request.client_id |
| `client_secret` | string | Yes | workos_connect_token_request.client_secret |
| `token` | string | Yes | The token (an access token or refresh token) to return information for. |
| `token_type_hint` | "access_token" \| "refresh_token" | No | An optional hint for the type of token provided. This can be either `"access_token"` or `"refresh_token"`. |