# Invitation

An email invitation allows the recipient to sign up for your app and join a specific [organization](https://workos.com/docs/reference/organization). When an invitation is accepted, a [user](https://workos.com/docs/reference/authkit/user) and a corresponding [organization membership](https://workos.com/docs/reference/authkit/organization-membership) are created.

Users may be invited to your app without joining an organization, or they may be invited to join an organization if they already have an account. Invitations may be also issued on behalf of another user. In this case, the invitation email will mention the name of the user who invited the recipient.

## Accept an invitation

Accepts an invitation and, if linked to an organization, activates the user's membership in that organization.

In most cases, use existing authentication methods like [`authenticateWithCode`](https://workos.com/docs/reference/authkit/authentication/code), which also accept an invitation token. These methods offer the same functionality (invitation acceptance and membership activation) while also signing the user in.

This method is useful for apps requiring a highly customized invitation flow, as it focuses solely on handling invitations without authentication. It's also helpful when users can be invited to multiple organizations and need a way to accept invitations after signing in.

Your application should verify that the invitation is intended for the user accepting it. For example, by fetching the invitation using the [find-by-token endpoint](https://workos.com/docs/reference/authkit/invitation/find-by-token) and ensuring the email matches the email address of the accepting user.

#### Request

#### Response

## Find an invitation by token

Retrieve an existing invitation using the token.

#### Request

#### Response

## Get an invitation

Get the details of an existing invitation.

#### Request

#### Response

## List invitations

Get a list of all of invitations matching the criteria specified.

#### Request

#### Response

## Resend an invitation

Resends an invitation email to the recipient. The invitation must be in a pending state.

#### Request

#### Response

## Revoke an invitation

Revokes an existing invitation.

#### Request

#### Response

## Send an invitation

Sends an invitation email to the recipient.

#### Request

#### Response

### userland_user_invite

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "invitation" | Yes | Distinguishes the invitation object. |
| `id` | string | Yes | The unique ID of the invitation. |
| `email` | string | Yes | The email address of the recipient. |
| `state` | "pending" \| "accepted" \| "expired" \| "revoked" | Yes | The state of the invitation. |
| `accepted_at` | string | No | The timestamp when the invitation was accepted, or null if not yet accepted. |
| `revoked_at` | string | No | The timestamp when the invitation was revoked, or null if not revoked. |
| `expires_at` | string | Yes | The timestamp when the invitation expires. |
| `organization_id` | string | No | The ID of the [organization](/reference/organization) that the recipient will join. |
| `inviter_user_id` | string | No | The ID of the user who invited the recipient, if provided. |
| `accepted_user_id` | string | No | The ID of the user who accepted the invitation, once accepted. |
| `role_slug` | string | No | Slug of the role the invitee will be assigned on acceptance. Reflects the current role on the invitee's organization membership. null when the invitation has no associated organization. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |
| `token` | string | Yes | The token used to accept the invitation. |
| `accept_invitation_url` | string | Yes | The URL where the recipient can accept the invitation. |

### POST /user_management/invitations/{id}/accept

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the invitation. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `invitation` | object | Distinguishes the invitation object. |

### GET /user_management/invitations/by_token/{token}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | string | Yes | The token used to accept the invitation. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `invitation` | object | Distinguishes the invitation object. |

### GET /user_management/invitations/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the invitation. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `invitation` | object | Distinguishes the invitation object. |

### GET /user_management/invitations

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `organization_id` | string | No | The ID of the [organization](/reference/organization) that the recipient will join. |
| `email` | string | No | The email address of the recipient. |

### POST /user_management/invitations/{id}/resend

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the invitation. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `invitation` | object | Distinguishes the invitation object. |

### POST /user_management/invitations/{id}/revoke

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the invitation. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `invitation` | object | Distinguishes the invitation object. |

### /user_management/invitations

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | The email address of the recipient. |
| `organization_id` | string | No | The ID of the [organization](/reference/organization) that the recipient will join. |
| `role_slug` | string | No | The [role](/authkit/roles) that the recipient will receive when they join the organization in the invitation. |
| `expires_in_days` | integer | No | How many days the invitations will be valid for. Must be between 1 and 30 days. Defaults to 7 days if not specified. |
| `inviter_user_id` | string | No | The ID of the [user](/reference/authkit/user) who invites the recipient. The invitation email will mention the name of this user. |
| `locale` | "af" \| "am" \| "ar" \| ... | No | The locale to use when rendering the invitation email. See [supported locales](/authkit/hosted-ui/localization). |