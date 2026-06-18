# Authentication Factor

An object representing an Authentication Factor.

## Delete Factor

Permanently deletes an Authentication Factor. It cannot be undone.

#### Request

## Enroll Factor

Enrolls an Authentication Factor to be used as an additional factor of authentication. The returned ID should be used to create an authentication Challenge.

#### Request

#### Response

## Get Factor

Gets an Authentication Factor.

#### Request

#### Response

### authentication_factor

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "authentication_factor" | Yes | Distinguishes the Authentication Factor object. |
| `id` | string | Yes | The unique ID of the Factor. |
| `type` | "generic_otp" \| "sms" \| "totp" \| "webauthn" | Yes | The type the Factor. Can be either `totp` or `sms`. |
| `user_id` | string | No | The ID of the [user](/reference/authkit/user). |
| `sms` | object | No | Additional information for `sms` Factors. |
| `totp` | object | No | Additional information for `totp` Factors. |
| `created_at` | string | Yes | The timestamp when the Factor was created. |
| `updated_at` | string | Yes | The timestamp when the Factor was last updated. |

### DELETE /auth/factors/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Factor. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### /auth/factors/enroll

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | "generic_otp" \| "sms" \| "totp" | Yes | The type of factor you wish to enroll. `totp` `sms` |
| `phone_number` | string | No | A valid phone number for an SMS-enabled device. Required when type is `sms`. |
| `totp_issuer` | string | No | An identifier for the organization issuing the challenge. Should be the name of your application or company. Required when type is `totp`. |
| `totp_user` | string | No | An identifier for the user. Used by authenticator apps to label connections. Required when type is `totp`. |
| `user_id` | string | No | The ID of the user to associate the factor with. |

### GET /auth/factors/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Factor. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authentication_factor` | object | Distinguishes the authentication factor object. |