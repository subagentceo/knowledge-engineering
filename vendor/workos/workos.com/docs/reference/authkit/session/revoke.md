# Session

Represents an authenticated user's connection to your application. A session is created when a user signs in through AuthKit and contains information about the authentication method, device details, and session status.

## List sessions

Get a list of all active sessions for a specific user.

#### Request

#### Response

## Revoke Session

Revoke a [user session](https://workos.com/docs/reference/authkit/session).

#### Request

### session

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "session" | Yes | Distinguishes the session object. |
| `id` | string | Yes | The unique ID of the session. |
| `user_id` | string | Yes | The ID of the user this session belongs to. |
| `organization_id` | string | No | The ID of the organization this session is associated with. |
| `status` | string | Yes | The current status of the session. |
| `auth_method` | string | Yes | The authentication method used to create this session. |
| `ip_address` | string | No | The IP address from which the session was created. |
| `user_agent` | string | No | The user agent string from the device that created the session. |
| `impersonator` | object | No | Information about the impersonator if this session was created via impersonation. |
| `expires_at` | string | Yes | The timestamp when the session expires. |
| `ended_at` | string | No | The timestamp when the session ended. |
| `created_at` | string | Yes | The timestamp when the session was created. |
| `updated_at` | string | Yes | The timestamp when the session was last updated. |

### GET /user_management/users/{id}/sessions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the user. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### /user_management/sessions/revoke

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `session_id` | string | Yes | The ID of the session to revoke. This can be extracted from the `sid` claim of the access token. |