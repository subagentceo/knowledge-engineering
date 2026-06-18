# Authentication Challenge

An object representing a Challenge of an Authentication Factor.

## Challenge Factor

Creates a Challenge for an Authentication Factor.

#### Request

#### Response

## Verify Challenge

Verifies an Authentication Challenge.

#### Request

#### Response

### authentication_challenge

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "authentication_challenge" | Yes | Distinguishes the Authentication Challenge object. |
| `id` | string | Yes | The unique ID of the Authentication Challenge. |
| `expires_at` | string | No | The timestamp when the Challenge will expire. Does not apply to totp factors. |
| `code` | string | No | The one-time code for the challenge. |
| `authentication_factor_id` | string | Yes | The unique ID of the Authentication Factor the Challenge belongs to. |
| `created_at` | string | Yes | The timestamp when the Challenge was created. |
| `updated_at` | string | Yes | The timestamp when the Challenge was last updated. |

### POST /auth/factors/{id}/challenge

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Authentication Factor to be challenged. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `authentication_challenge` | object | Distinguishes the authentication challenge object. |

### POST /auth/challenges/{id}/verify

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the Authentication Challenge. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `challenge` | object | The relevant [Authentication Challenge](/reference/mfa/challenge). |
| `valid` | boolean | Indicates whether the code was correct. |