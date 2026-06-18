# Applications

The Applications API allows you to programmatically manage Connect Applications and their associated client secrets.

WorkOS Connect supports two types of applications: [OAuth](https://workos.com/docs/reference/workos-connect/applications/oauth) and Machine-to-Machine [M2M](https://workos.com/docs/reference/workos-connect/applications/m2m).

## Create a Connect Application

Create a new Connect Application. Supports both OAuth and Machine-to-Machine (M2M) application types.

#### OAuth Request

#### M2M Request

#### Response

## Delete a Connect Application

Delete an existing Connect Application.

#### Request

## Get a Connect Application

Retrieve details for a specific Connect Application by ID or client ID.

#### Request

#### Response

## List Connect Applications

List all Connect Applications in the current environment with optional filtering.

#### Request

#### Response

## Machine-to-Machine Applications

[M2M applications](https://workos.com/docs/authkit/connect/m2m) are designed for server-to-server authentication without user interaction.

#### M2M Application Example

## OAuth Applications

[OAuth applications](https://workos.com/docs/authkit/connect/oauth) are designed for web, mobile, desktop, and CLI applications where a user needs to authenticate.

#### First-Party

#### Third-Party

#### Dynamically Registered

## Update a Connect Application

Update an existing Connect Application. For OAuth applications, you can update redirect URIs. For all applications, you can update the name, description, and scopes.

#### Request

#### Response

### /connect/applications

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Name of the application. |
| `application_type` | "oauth" \| "m2m" | Yes | Type of application - either "oauth" or "m2m". |
| `description` | string | No | Description of the application. |
| `scopes` | string[] | No | Permission slugs to assign to the application. |
| `redirect_uris` | object[] | No | Redirect URIs for the application. OAuth applications only. |
| `uses_pkce` | boolean | No | Whether the application uses PKCE (Proof Key for Code Exchange). OAuth applications only. |
| `is_first_party` | boolean | Yes | Whether this is a first-party application. Required for OAuth applications. |
| `organization_id` | string | No | The organization ID this application belongs to. Required for M2M applications. For OAuth applications, required if is_first_party is false. |

### DELETE /connect/applications/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The application ID or client ID of the Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /connect/applications/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The application ID or client ID of the Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connect_application` | object | Distinguishes the connect application object. |

### GET /connect/applications

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `organization_id` | string | No | Filter applications by organization ID. |

### M2M Application

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connect_application" | Yes | Always "connect_application". |
| `id` | string | Yes | Unique identifier for the application. |
| `client_id` | string | Yes | OAuth client ID for the application. |
| `name` | string | Yes | Name of the application. |
| `description` | string | No | Description of the application. |
| `application_type` | "m2m" | Yes | Type of application - either "oauth" or "m2m". |
| `organization_id` | string | Yes | The organization ID this application belongs to. First-party applications are managed by you, do not belong to an Organization, and therefore will not have an `organization_id`. |
| `scopes` | string[] | Yes | Permission slugs assigned to the application. |
| `created_at` | string | Yes | ISO 8601 timestamp of creation. |
| `updated_at` | string | Yes | ISO 8601 timestamp of last update. |

### OAuth Application

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connect_application" | Yes | Always "connect_application". |
| `id` | string | Yes | Unique identifier for the application. |
| `client_id` | string | Yes | OAuth client ID for the application. |
| `name` | string | Yes | Name of the application. |
| `description` | string | No | Description of the application. |
| `application_type` | "oauth" | Yes | Type of application - either "oauth" or "m2m". |
| `redirect_uris` | array | Yes | Redirect URIs configured for OAuth applications. |
| `uses_pkce` | boolean | Yes | Whether the OAuth application uses PKCE (Proof Key for Code Exchange). |
| `is_first_party` | boolean | Yes | Whether this is a first-party OAuth application. This is false for third-party applications which are owned by an Organization. |
| `was_dynamically_registered` | boolean | No | Whether the OAuth application was dynamically registered. Read more about Dynamic Client Registration and MCP auth in [our guide](/authkit/mcp/integrating/enabling-client-id-metadata-document). |
| `organization_id` | string | No | The organization ID this application belongs to. First-party applications are managed by you, do not belong to an Organization, and therefore will not have an `organization_id`. |
| `scopes` | string[] | Yes | Permission slugs assigned to the application. |
| `created_at` | string | Yes | ISO 8601 timestamp of creation. |
| `updated_at` | string | Yes | ISO 8601 timestamp of last update. |

### PUT /connect/applications/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The application ID or client ID of the Connect Application. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connect_application` | object | Distinguishes the connect application object. |