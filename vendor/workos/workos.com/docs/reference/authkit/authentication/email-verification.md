# Authentication

Authenticate a user with a specified authentication method.

## Authenticate with code

Authenticates a user using AuthKit, OAuth or an organization's SSO connection.

AuthKit handles all authentication methods, however it is conceptually similar to a social login experience. Like OAuth and SSO, AuthKit returns you a code that you can exchange for an authenticated user. See [Integrating with AuthKit](https://workos.com/docs/authkit).

#### Request

#### Response

## Authenticate with an email verification code

Authenticates a user with an unverified email and verifies their email address.

A user with an unverified email address won't be able to authenticate right away. When they attempt to authenticate with their credentials, the API will return an [email verification required error](https://workos.com/docs/reference/authkit/authentication-errors/email-verification-required-error) that contains a pending authentication token.

If the [email setting](https://workos.com/docs/authkit/custom-emails) for email verification is enabled, WorkOS will automatically send a one-time email verification code to the user's email address. If the email setting is not enabled, [retrieve the email verification code](https://workos.com/docs/reference/authkit/email-verification/get) to send the email yourself. Use the pending authentication token from the error and the one-time code the user received to authenticate them and to complete the email verification process.

#### Request

#### Response

## Authenticate with Magic Auth

Authenticates a user by verifying the [Magic Auth code](https://workos.com/docs/reference/authkit/magic-auth) sent to the user's email.

#### Request

#### Response

## Authenticate with organization selection

Authenticates a user into an organization they are a member of.

When a user who is a member of multiple organizations attempts to authenticate with their credentials, the API will return an [organization selection error](https://workos.com/docs/reference/authkit/authentication-errors/organization-selection-error) that contains a pending authentication token. To continue with the authentication flow, your application should display the list of organizations for the user to choose.

Use the pending authentication token from the error and the organization the user selected in your UI to complete the authentication.

#### Request

#### Response

## Authenticate a user with password

Authenticates a user with email and password.

#### Request

#### Response

## Refresh and seal session data

Unseals the provided session data from a user's session cookie, [authenticates with the existing refresh token](https://workos.com/docs/reference/authkit/authentication/refresh-token), and returns the sealed data for the refreshed session.

#### Request

#### Success response

#### Failure response

## Authenticate with refresh token

Use this endpoint to exchange a refresh token for a new access token. Refresh tokens may be rotated after use, so a replacement refresh token is also provided.

#### Request

#### Response

## Authenticate with session cookie

Authenticates a user using an AuthKit session cookie. This method does not make a network call, but simply unseals an existing session cookie and decodes the JWT claims from the [access token](https://workos.com/docs/reference/authkit/session-tokens/access-token).

#### Request

#### Success response

#### Failure response

## Authenticate with a time-based one-time password

Authenticates a user enrolled into MFA using time-based one-time password (TOTP).

Users enrolled into MFA are required to enter a TOTP each time they sign in. When they attempt to authenticate with their credentials, the API will return an [MFA challenge error](https://workos.com/docs/reference/authkit/authentication-errors/mfa-challenge-error) that contains a pending authentication token.

To continue with the authentication flow, [challenge](https://workos.com/docs/reference/mfa/challenge/create) one of the factors returned by the MFA challenge error response and present a UI to the user to enter the TOTP code. Then, authenticate the user with the TOTP code, the challenge from the factor, and the pending authentication token from the MFA challenge error.

MFA can be enabled via the [Authentication page](https://dashboard.workos.com/environment/authentication/features) in the WorkOS dashboard.

#### Request

#### Response

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | No | client_secret |
| `code_verifier` | string | No | The randomly generated string used to derive the code challenge that was passed to the [authorization url](/reference/authkit/authentication/get-authorization-url) as part of the PKCE flow. This parameter is **required** when the client secret is not present. |
| `grant_type` | "authorization_code" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `code` | string | Yes | The authorization value which was passed back as a query parameter in the callback to the [redirect URI](/reference/authkit/authentication/get-authorization-url/redirect-uri). |
| `invitation_token` | string | No | The token of an [invitation](/reference/authkit/invitation). The invitation should be in the pending state. When a valid invitation token is specified, the user is able to sign up even if it is disabled in the environment. Additionally, if the invitation was for a specific organization, attaching the token to a user's authenticate call automatically provisions their membership to the organization. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |
| `oauth_tokens` | object | The OAuth tokens from the identity provider, if applicable. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "urn:workos:oauth:grant-type:email-verification:code" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `code` | string | Yes | The one-time email verification code received by the user. |
| `pending_authentication_token` | string | Yes | The authentication token returned from a failed authentication attempt due to the corresponding error. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |
| `oauth_tokens` | object | The OAuth tokens from the identity provider, if applicable. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "urn:workos:oauth:grant-type:magic-auth:code" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `code` | string | Yes | The one-time code that was emailed to the user. |
| `invitation_token` | string | No | The token of an [invitation](/reference/authkit/invitation). The invitation should be in the pending state. When a valid invitation token is specified, the user is able to sign up even if it is disabled in the environment. Additionally, if the invitation was for a specific organization, attaching the token to a user's authenticate call automatically provisions their membership to the organization. |
| `email` | string | Yes | user.email |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "MagicAuth" | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "urn:workos:oauth:grant-type:organization-selection" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `pending_authentication_token` | string | Yes | The authentication token returned from a failed authentication attempt due to the corresponding error. |
| `organization_id` | string | Yes | The [organization](/reference/organization) the user selected to sign in to. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |
| `oauth_tokens` | object | The OAuth tokens from the identity provider, if applicable. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "password" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `email` | string | Yes | user.email |
| `password` | string | Yes | user.password |
| `invitation_token` | string | No | The token of an [invitation](/reference/authkit/invitation). The invitation should be in the pending state. When a valid invitation token is specified, the user is able to sign up even if it is disabled in the environment. Additionally, if the invitation was for a specific organization, attaching the token to a user's authenticate call automatically provisions their membership to the organization. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "Password" | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "refresh_token" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `refresh_token` | string | Yes | The `refresh_token` received from a successful authentication response. |
| `organization_id` | string | No | The organization to authorize in the new access token. If the current session is not authorized for the organization, an appropriate [authentication error](/reference/authkit/authentication-errors) will be returned. If no organization ID is provided, then the access token will default to the original organization selected. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |

### POST /user_management/authenticate

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | client_id |
| `client_secret` | string | Yes | client_secret |
| `grant_type` | "urn:workos:oauth:grant-type:mfa-totp" | Yes | A string constant that distinguishes the method by which your application will receive an access token. |
| `code` | string | Yes | The time-based one-time password generated by the factor that was challenged. |
| `authentication_challenge_id` | string | Yes | The unique ID of the authentication challenge created for the TOTP factor for which the user is enrolled. |
| `pending_authentication_token` | string | Yes | The authentication token returned from a failed authentication attempt due to the corresponding error. |
| `ip_address` | string | No | The IP address of the request from the user who is attempting to authenticate. Refer to your web framework or server documentation for the correct way to obtain the user's actual IP address. If your application receives requests from a reverse proxy, you may need to retrieve this from a special header like `X-Forward-For`. |
| `user_agent` | string | No | The user agent of the request from the user who is attempting to authenticate. This should be the value of the `User-Agent` header. |
| `device_id` | string | No | A unique identifier for the device. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The corresponding [user](/reference/authkit/user) object. |
| `organization_id` | string | The ID of the organization the user selected to sign in to. |
| `authkit_authorization_code` | string | An authorization code that can be exchanged for tokens by a different application. |
| `access_token` | string | A JWT containing information about the current session. |
| `refresh_token` | string | [Exchange this token](/reference/authkit/authentication/refresh-token) for a new access token. |
| `authentication_method` | "SSO" \| "Password" \| "Passkey" \| ... | The authentication method used to initiate the session. |
| `impersonator` | object | Information about the impersonator if this session was created via impersonation. |
| `oauth_tokens` | object | The OAuth tokens from the identity provider, if applicable. |