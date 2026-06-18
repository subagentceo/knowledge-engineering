# Magic Auth

Magic Auth is a passwordless authentication method that allows users to sign in or sign up via a unique, six digit one-time-use code sent to their email inbox. To verify the code, [authenticate the user with Magic Auth](https://workos.com/docs/reference/authkit/authentication/magic-auth).

## Create a Magic Auth code

Creates a one-time authentication code that can be sent to the user's email address. The code expires in 10 minutes. To verify the code, [authenticate the user with Magic Auth](https://workos.com/docs/reference/authkit/authentication/magic-auth).

#### Request

#### Response

## Get Magic Auth code details

Get the details of an existing [Magic Auth](https://workos.com/docs/reference/authkit/magic-auth) code that can be used to send an email to a user for authentication.

#### Request

#### Response

### magic_auth

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Magic Auth code. |
| `user_id` | string | Yes | The unique ID of the user. |
| `email` | string | Yes | The email address of the user. |
| `expires_at` | string | Yes | The timestamp when the Magic Auth code expires. |
| `code` | string | Yes | The code used to verify the Magic Auth code. |
| `created_at` | string | Yes | The timestamp when the Magic Auth code was created. |
| `updated_at` | string | Yes | The timestamp when the Magic Auth code was last updated. |

### /user_management/magic_auth

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | The email address to send the magic code to. |
| `invitation_token` | string | No | The token of an [invitation](/reference/authkit/invitation). The invitation should be in the pending state. When a valid invitation token is specified, the user is able to sign up even if it is disabled in the environment. Additionally, if the invitation was for a specific organization, attaching the token to a user's authenticate call automatically provisions their membership to the organization. |

### GET /user_management/magic_auth/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Magic Auth code. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `magic_auth` | object | Distinguishes the Magic Auth object. |