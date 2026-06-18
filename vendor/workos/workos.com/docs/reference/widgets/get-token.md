# Widgets

Widgets are React components that provide complete functionality for common enterprise app workflows.

## Generate a widget token

Generate a widget token scoped to an organization and user with the specified scopes.

#### Request

#### Response

### /widgets/token

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | An [Organization](/reference/organization) identifier. |
| `user_id` | string | No | A [User](/reference/authkit/user) identifier. |
| `scopes` | ("widgets:users-table:manage" \| "widgets:domain-verification:manage" \| "widgets:sso:manage" \| ...)[] | No | Scopes to include in the widget token. If a user_id is provided, the requested scopes will be also be restricted to the permissions that the user has in the requested organization. |