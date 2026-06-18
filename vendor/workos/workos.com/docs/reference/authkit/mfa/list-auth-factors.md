# Multi-Factor Authentication

# Multi-Factor Authentication

Enroll users in multi-factor authentication for an additional layer of security. MFA can be enabled via the [Authentication page](https://dashboard.workos.com/environment/authentication/features) in the WorkOS dashboard.

## Authentication challenge

Represents a challenge of an authentication factor.

#### Authentication challenge

## Authentication factor

Represents an authentication factor.

#### Authentication factor

## Enroll an authentication factor

Enrolls a user in a new [authentication factor](https://workos.com/docs/reference/authkit/mfa/authentication-factor).

#### Request

## List authentication factors

Lists the [authentication factors](https://workos.com/docs/reference/authkit/mfa/authentication-factor) for a user.

#### Request

### authentication_challenge

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "authentication_challenge" | Yes | Distinguishes the authentication challenge object. |
| `id` | string | Yes | The unique ID of the authentication challenge. |
| `created_at` | string | Yes | The timestamp when the challenge was created. |
| `updated_at` | string | Yes | The timestamp when the challenge was last updated. |
| `expires_at` | string | Yes | The timestamp when the challenge will expire. Does not apply to TOTP factors. |
| `authentication_factor_id` | string | Yes | The unique ID of the authentication factor the challenge belongs to. |

### authentication_factor

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "authentication_factor" | Yes | Distinguishes the authentication factor object. |
| `id` | string | Yes | The unique ID of the factor. |
| `created_at` | string | Yes | The timestamp when the factor was created. |
| `updated_at` | string | Yes | The timestamp when the factor was last updated. |
| `type` | "totp" | Yes | The type of the factor to enroll. The only available option is TOTP. |
| `totp` | object | Yes |  |
| `user_id` | string | Yes | The ID of the [user](/reference/authkit/user). |

### POST /user_management/users/{userlandUserId}/auth_factors

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `userlandUserId` | string | Yes | The ID of the [user](/reference/authkit/user). |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authentication_factor` | object | The [authentication factor](/reference/authkit/mfa/authentication-factor) object that represents the additional authentication method used on top of the existing authentication strategy. |
| `authentication_challenge` | object | The [authentication challenge](/reference/authkit/mfa/authentication-challenge) object that is used to complete the authentication process. |

### GET /user_management/users/{userlandUserId}/auth_factors

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `userlandUserId` | string | Yes | The ID of the [user](/reference/authkit/user). |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |