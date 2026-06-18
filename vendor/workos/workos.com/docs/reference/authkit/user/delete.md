# User

Represents a user identity in your application. A user can sign up in your application directly with a method like password, or they can be [JIT-provisioned](https://workos.com/docs/authkit/jit-provisioning) through an organization's SSO connection.

Users may belong to [organizations](https://workos.com/docs/reference/organization) as members.

See the [events reference](https://workos.com/docs/events/user) documentation for the user events.

## Delete an authorized application

Delete an existing Authorized Connect Application.

#### Request

## List authorized applications

Get a list of all Connect applications that the user has authorized.

#### Request

#### Response

## Confirm email change

Confirms an email change using the one-time code received by the user.

#### Request

#### Response

## Create a user

Create a new user in the current environment.

#### Request

#### Response

## Delete a user

Permanently deletes a user in the current environment. It cannot be undone.

#### Request

## Verify email

Verifies an email address using the one-time code received by the user.

#### Request

#### Response

## Get a user by external ID

Get the details of an existing user by an [external identifier](https://workos.com/docs/authkit/metadata/external-identifiers).

#### Request

#### Response

## Get a user

Get the details of an existing user.

#### Request

#### Response

## List users

Get a list of all of your existing users matching the criteria specified.

#### Request

#### Response

## Send email change code

Sends an email that contains a one-time code used to change a user's email address.

#### Request

#### Response

## Send verification email

Sends an email that contains a one-time code used to verify a user's email address.

#### Request

#### Response

## Update a user

Updates properties of a user. The omitted properties will be left unchanged.

#### Request

#### Response

### userland_user

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "user" | Yes | Distinguishes the user object. |
| `id` | string | Yes | The unique ID of the user. |
| `first_name` | string | No | The first name of the user. |
| `last_name` | string | No | The last name of the user. |
| `name` | string | No | The user's full name. |
| `profile_picture_url` | string | No | A URL reference to an image representing the user. |
| `email` | string | Yes | The email address of the user. |
| `email_verified` | boolean | Yes | Whether the user's email has been verified. |
| `external_id` | string | No | The external ID of the user. |
| `metadata` | object | No | Object containing metadata key/value pairs associated with the user. |
| `last_sign_in_at` | string | No | The timestamp when the user last signed in. |
| `locale` | string | No | The user's preferred locale. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |

### DELETE /user_management/users/{user_id}/authorized_applications/{application_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | string | Yes | The ID or client ID of the application. |
| `user_id` | string | Yes | The ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /user_management/users/{user_id}/authorized_applications

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | Yes | The ID of the user. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### POST /user_management/users/{id}/email_change/confirm

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `email_change_confirmation` | object | Distinguishes the email change confirmation object. |

### /user_management/users

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | The email address of the user. |
| `first_name` | string | No | The first name of the user. |
| `last_name` | string | No | The last name of the user. |
| `name` | string | No | The user's full name. |
| `email_verified` | boolean | No | Whether the user's email address was previously verified. You should normally use the [email verification flow](/reference/authkit/authentication/email-verification) to verify a user's email address. However, if the user's email was previously verified, or is being migrated from an existing user store, this can be set to `true` to mark it as already verified. |
| `metadata` | object | No | Object containing [metadata](/authkit/metadata) key/value pairs associated with the user. |
| `external_id` | string | No | The [external identifier](/authkit/metadata/external-identifiers) of the user. |
| `password` | string | No | The password to set for the user. |
| `password_hash` | string | No | The hashed password to set for the user. Mutually exclusive with `password`. |
| `password_hash_type` | "bcrypt" \| "firebase-scrypt" \| "ssha" \| ... | No | The algorithm originally used to hash the password, used when providing a `password_hash`. Valid values are `bcrypt`, `scrypt`, `firebase-scrypt`, `ssha`, `pbkdf2`, and `argon2`. See the [Firebase Migration guide](/migrate/firebase) for an example of how to format the `password_hash` when importing `firebase-scrypt` passwords. |

### DELETE /user_management/users/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |

### POST /user_management/users/{id}/email_verification/confirm

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The user whose email was verified. |

### GET /user_management/users/external_id/{external_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `external_id` | string | Yes | The external ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | Distinguishes the user object. |

### GET /user_management/users/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | Distinguishes the user object. |

### GET /user_management/users

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `organization` | string | No | Filter users by the organization they are a member of. Deprecated in favor of `organization_id`. |
| `organization_id` | string | No | Filter users by the organization they are members of. |
| `email` | string | No | Filter users by their email. |

### POST /user_management/users/{id}/email_change/send

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `email_change` | object | Distinguishes the email change object. |

### POST /user_management/users/{id}/email_verification/send

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | The user to whom the verification email was sent. |

### PUT /user_management/users/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `user` | object | Distinguishes the user object. |