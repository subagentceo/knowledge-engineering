# Passwordless session \[Deprecated]

An object representing a passwordless authentication session.

## Create Passwordless Session \[Deprecated]

Create a Passwordless Session for a Magic Link Connection.

#### Request

#### Response

## Email a Magic Link \[Deprecated]

Email a user the Magic Link confirmation URL.

#### Request

#### Response

### passwordless_session

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "passwordless_session" | Yes | Distinguishes the Paswordless Session object. |
| `id` | string | Yes | The unique ID of the session. |
| `email` | string | Yes | The email address of the user for the session. |
| `expires_at` | string | Yes | The ISO-8601 datetime at which the session expires. |
| `link` | string | Yes | The link for the user to authenticate with. You can use this link to send a custom email to the user, or send an email using [Email a Magic Link](/reference/magic-link/passwordless-session/send-email) to the user. Once a user has authenticated with the link, WorkOS issues a redirect to your application's default redirect URI, with a `code` parameter and, if provided during [session creation](/reference/magic-link/passwordless-session/create), a `state` parameter. Code can then be exchanged for an access token and user [Profile](/reference/sso/profile). To perform this exchange, the Developer should make a POST request to the `/sso/token` [endpoint](/reference/sso/profile/get-profile-and-token). > If the link has expired, WorkOS will issue a redirect with an `error` query parameter and value of `access_denied`. |

### POST /passwordless/sessions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | The email of the user to authenticate. |
| `type` | "MagicLink" | Yes | The type of Passwordless Session to create. Currently, the only supported value is `MagicLink`. |
| `redirect_uri` | string | No | Optional parameter that a developer can choose to include in their authorization URL. If included, it will override the default redirect URI configured for your application. This is the location your user will be redirected to once the session has been completed successfully. |
| `expires_in` | number | No | The number of seconds the Passwordless Session should live before expiring. This value must be between `900` (15 minutes) and `86400` (24 hours), inclusive. |
| `state` | string | No | Optional parameter that a developer can choose to include in their authorization URL. If included, then the redirect URI received from WorkOS will contain the exact `state` that was passed in the authorization URL. The `state` parameter can be used to encode arbitrary information to help restore application state between redirects. |

### POST /passwordless/sessions/:id/send

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique identifier of the [Passwordless Session](/reference/magic-link/passwordless-session) to send an email for. |