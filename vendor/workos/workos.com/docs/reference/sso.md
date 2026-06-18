# Single Sign-On

The Single Sign-On API has been modeled to meet the [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) framework specification. As a result, authentication flows constructed using the Single Sign-On API replicate the OAuth 2.0 protocol flow.

To automatically respond to changes in your SSO connections, use the [Connection events](https://workos.com/docs/events/connection).

## Get JWKS

Returns the JSON Web Key Set (JWKS) containing the public keys used for verifying access tokens.

#### Request

#### Response

### connection

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connection" | Yes | Distinguishes the Connection object. |
| `id` | string | Yes | Unique identifier for the Connection. |
| `organization_id` | string | No | Unique identifier for the Organization in which the Connection resides. |
| `connection_type` | "Pending" \| "ADFSSAML" \| "AdpOidc" \| ... | Yes | The type of the SSO Connection used to authenticate the user. The Connection type may be used to dynamically generate authorization URLs. |
| `name` | string | Yes | A human-readable name for the Connection. This will most commonly be the organization's name. |
| `state` | "requires_type" \| "draft" \| "active" \| ... | Yes | Indicates whether a Connection is able to authenticate users. |
| `status` | "linked" \| "unlinked" | Yes | Deprecated. Use `state` instead. |
| `domains` | object[] | Yes | List of Organization Domains. |
| `options` | object | No | Configuration options for SAML connections. Only present for SAML connection types. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |

### GET /sso/jwks/{clientId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | string | Yes | Identifies the application making the request to the WorkOS server. You can obtain your client ID from the [API Keys](https://dashboard.workos.com/api-keys) page in the dashboard. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `keys` | object[] | The public keys used for verifying access tokens. |