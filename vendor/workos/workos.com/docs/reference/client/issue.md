## Generate a Client API token

Generate a short-lived, session-bound token for the Client GraphQL API, scoped to an organization and user.

#### Request

#### Response

### /client/token

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The ID of the organization to scope the Client API token to. |
| `user_id` | string | Yes | The ID of the user to issue the Client API token for. |