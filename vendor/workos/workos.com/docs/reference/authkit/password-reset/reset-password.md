# Password reset

Create a password reset token for a user and reset the user's password.

> When a user's password is reset, all of their active sessions are revoked.

## Create a password reset token

Creates a one-time token that can be used to reset a user's password.

#### Request

#### Response

## Get a password reset token

Get the details of an existing password reset token that can be used to reset a user's password.

#### Request

#### Response

## Reset the password

Sets a new password using the `token` query parameter from the link that the user received. Successfully resetting the password will verify a user's email, if it hasn't been verified yet.

#### Request

### password_reset

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the password reset object. |
| `user_id` | string | Yes | The unique ID of the user. |
| `email` | string | Yes | The email address of the user. |
| `password_reset_token` | string | Yes | The token used to reset the password. |
| `password_reset_url` | string | Yes | The URL where the user can reset their password. |
| `expires_at` | string | Yes | The timestamp when the password reset token expires. |
| `created_at` | string | Yes | The timestamp when the password reset token was created. |

### /user_management/password_reset

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | The email address of the user requesting a password reset. |

### GET /user_management/password_reset/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the password reset token. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `password_reset` | object | Distinguishes the password reset object. |

### /user_management/password_reset/confirm

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | string | Yes | The `token` query parameter from the password reset URL. |
| `new_password` | string | Yes | The new password to set for the user. |