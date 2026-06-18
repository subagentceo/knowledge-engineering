# Email verification

Email verification is a security feature that requires users to verify their email address before they can sign in to your application. It is enabled by default.

Users signing in with Magic Auth, Google OAuth, Apple OAuth, or SSO are automatically verified. For other authentication methods, an email verification flow is required to confirm that the user's email address belongs to them.

## Get an email verification code

Get the details of an existing email verification code that can be used to send an email to a user for verification.

#### Request

#### Response

### email_verification

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the email verification code. |
| `user_id` | string | Yes | The unique ID of the user. |
| `email` | string | Yes | The email address of the user. |
| `expires_at` | string | Yes | The timestamp when the email verification code expires. |
| `code` | string | Yes | The code used to verify the email. |
| `created_at` | string | Yes | The timestamp when the email verification code was created. |
| `updated_at` | string | Yes | The timestamp when the email verification code was last updated. |

### GET /user_management/email_verification/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the email verification code. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `email_verification` | object | Distinguishes the email verification object. |