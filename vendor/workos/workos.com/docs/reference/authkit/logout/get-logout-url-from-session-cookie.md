# Logout

End a user's session. The user's browser should be redirected to this URL.

# Get logout URL from session cookie

Generates the logout URL by extracting the session ID from the session cookie. Use this over `getLogoutUrl` if you don't have a saved reference to the session ID and you'd like the SDK to handle extracting the session ID from the cookie for you.

#### Request

#### Response

# Get logout URL

#### Request

#### Response

### GET /user_management/sessions/logout

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `session_id` | string | Yes | The ID of the session that is ending. This can be extracted from the `sid` claim of the access token. |
| `return_to` | string | No | The URL to redirect the user to after logout. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `url` | string | The URL to redirect to. |