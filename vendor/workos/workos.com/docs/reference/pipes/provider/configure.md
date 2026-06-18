# Provider

A provider represents a third-party service that users can connect to through Pipes. Providers are configured in the WorkOS Dashboard and define the OAuth scopes and credentials used during the authorization flow.

When listed for a specific user, each provider includes a `connected_account` field showing the user's connection status.

## Configure a provider for an organization

Creates or updates an organization's provider configuration. Use this endpoint to enable or disable a provider, set custom OAuth scopes, or supply organization-managed OAuth credentials.

#### Request

#### Response

## List providers for an organization

Returns a list of all providers available to the specified organization, along with any configured custom OAuth scopes, enabled state, and organization-managed credentials where applicable.

#### Request

#### Response

## List providers for a user

Retrieves a list of available providers and the user's connection status for each. Returns all providers configured for your environment, along with the user's [connected account](https://workos.com/docs/reference/pipes/connected-account) information where applicable.

#### Request

#### Response

### provider

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "data_provider" | Yes | Distinguishes the provider object. |
| `id` | string | Yes | The unique identifier of the provider. |
| `name` | string | Yes | The display name of the provider (e.g., "GitHub", "Slack"). |
| `description` | string \| null | Yes | A description of the provider explaining how it will be used, if configured. |
| `slug` | string | Yes | The slug identifier used in API calls (e.g., `github`, `slack`, `notion`). |
| `integration_type` | string | Yes | The type of integration (e.g., `github`, `slack`). |
| `credentials_type` | string | Yes | The type of credentials used by the provider (e.g., `oauth2`). |
| `scopes` | string[] \| null | Yes | The OAuth scopes configured for this provider, or `null` if none are configured. |
| `created_at` | string | Yes | The timestamp when the provider was created. |
| `updated_at` | string | Yes | The timestamp when the provider was last updated. |
| `connected_account` | connected_account \| null | Yes | The user's [connected account](/reference/pipes/connected-account) for this provider, or `null` if the user has not connected. |

### PUT /organizations/{organizationId}/data_integration_configurations/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | An [Organization](/reference/organization) identifier to configure the provider for. |
| `slug` | string | Yes | The slug identifier of the provider to configure (e.g., `github`, `slack`, `notion`). |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `data_integration_configuration` | object | Distinguishes the data integration configuration object. |

### GET /organizations/{organizationId}/data_integration_configurations

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | An [Organization](/reference/organization) identifier to list provider configurations for. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `list` | object | Indicates this is a list response. |

### GET /user_management/users/{user_id}/data_providers

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | Yes | A [User](/reference/authkit/user) identifier to list providers and connected accounts for. |
| `organization_id` | string | No | An [Organization](/reference/organization) identifier. Optional parameter to filter connections for a specific organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `list` | object | Indicates this is a list response. |