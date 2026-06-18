# Standalone Connect

Standalone Connect allows applications with existing authentication systems to use AuthKit as their OAuth authorization server. Instead of migrating your entire authentication stack, you can leverage WorkOS's OAuth infrastructure while keeping your existing user authentication as the source of truth.

The Standalone Connect flow uses the following endpoints:

| Endpoint                                                                    | Host                | Description                             |
| --------------------------------------------------------------------------- | ------------------- | --------------------------------------- |
| [`/oauth2/authorize`](https://workos.com/docs/reference/workos-connect/authorize)                  | Your AuthKit domain | Initiates the OAuth flow                |
| [`/authkit/oauth2/complete`](https://workos.com/docs/reference/workos-connect/standalone/complete) | `api.workos.com`    | Completes external authentication       |
| [`/oauth2/token`](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant) | Your AuthKit domain | Exchanges authorization code for tokens |

Read more in the [Standalone Connect guide](https://workos.com/docs/authkit/connect/standalone).

## Complete external authentication

Completes an external authentication flow and returns control to AuthKit. This endpoint is used with [Standalone Connect](https://workos.com/docs/authkit/connect/standalone) to bridge your existing authentication system with the Connect OAuth API infrastructure.

After successfully authenticating a user in your application, calling this endpoint will:

- Create or update the user in AuthKit, using the given `id` as its `external_id`.
- Return a `redirect_uri` your application should redirect to in order for AuthKit to complete the flow

Users are automatically created or updated based on the `id` and `email` provided. If a user with the same `id` exists, their information is updated. Otherwise, a new user is created.

If you provide a new `id` with an `email` that already belongs to an existing user, the request will fail with an error as email addresses are unique to a user.

#### Request

#### Response

## User Consent Options

The `user_consent_options` can take an array of consent options that the user will be required to choose from on AuthKit's OAuth consent screen. The chosen option will then become available as a JWT claim on the issued access token.

These options can be presented as either a flat or grouped set of options.

#### Flat

#### Grouped

### /authkit/oauth2/complete

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `external_auth_id` | string | Yes | Identifier provided when AuthKit redirected to your login page. |
| `user` | object | Yes | The user to create or update in AuthKit. |
| `user_consent_options` | object[] | No | Array of [User Consent Options](/reference/workos-connect/standalone/user-consent-options) to store with the session. |

### User Consent Options

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claim` | string | Yes | The claim name that will appear in the token. |
| `type` | "enum" | Yes | Always `enum` (currently the only supported type). |
| `label` | string | Yes | Display text for the option. |
| `choices` | array | Yes | Array of choices. See the flat and grouped examples. |