# AuthKit

AuthKit is a user management platform that provides a set of user authentication and organization security features designed to provide a fast, scalable integration while handling all of the user management complexity that comes with advanced B2B customer needs.

To automatically respond to AuthKit activities, like authentication and changes related to the users, use the corresponding [events](https://workos.com/docs/events).

## Create a CORS origin

Creates a new CORS origin for the current environment. CORS origins allow browser-based applications to make requests to the WorkOS API.

#### Request

#### Response

## Create a redirect URI

Creates a new redirect URI for an application.

#### Request

#### Response

### /user_management/cors_origins

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `origin` | string | Yes | The origin URL to allow for CORS requests. |

### /user_management/redirect_uris

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `uri` | string | Yes | The redirect URI to create. |