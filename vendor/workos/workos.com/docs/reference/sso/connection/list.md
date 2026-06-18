# Connection

A connection represents the relationship between WorkOS and any collection of application users. This collection of application users may include personal or enterprise identity providers. As a layer of abstraction, a WorkOS connection rests between an application and its users, separating an application from the implementation details required by specific standards like [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) and [SAML](https://workos.com/docs/glossary/saml).

See the [events reference](https://workos.com/docs/events/connection) documentation for the connection events.

## Delete a Connection

Permanently deletes an existing connection. It cannot be undone.

#### Request

## Get a Connection

Get the details of an existing connection.

#### Request

#### Response

## List Connections

Get a list of all of your existing connections matching the criteria specified.

#### Request

#### Response

### connection

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "connection" | Yes | Distinguishes the Connection object. |
| `id` | string | Yes | Unique identifier for the Connection. |
| `organization_id` | string | No | Unique identifier for the Organization in which the Connection resides. |
| `connection_type` | enum | Yes | The type of the SSO Connection used to authenticate the user. The Connection type may be used to dynamically generate authorization URLs. Possible values: `ADFSSAML` `AdpOidc` `AppleOAuth` `Auth0SAML` `AzureSAML` `CasSAML` `ClassLinkSAML` `CloudflareSAML` `CyberArkSAML` `DuoSAML` `GenericOIDC` `GenericSAML` `GitHubOAuth` `GoogleOAuth` `GoogleSAML` `JumpCloudSAML` `KeycloakSAML` `LastPassSAML` `LoginGovOidc` `MagicLink` `MicrosoftOAuth` `MiniOrangeSAML` `NetIqSAML` `OktaSAML` `OneLoginSAML` `OracleSAML` `PingFederateSAML` `PingOneSAML` `RipplingSAML` `SalesforceSAML` `ShibbolethGenericSAML` `ShibbolethSAML` `SimpleSamlPhpSAML` `VMwareSAML` |
| `name` | string | Yes | A human-readable name for the Connection. This will most commonly be the organization's name. |
| `state` | enum | Yes | Indicates whether a Connection is able to authenticate users. Possible values: `active` `inactive` `validating` Connections that can't authenticate users are `inactive`. When a new connection is configured, it transitions to the `validating` state until its first successful authentication. After it successfully authorizes a user for the first time, the connection state changes to `active`. |
| `created_at` | string | Yes | The timestamp when the Connection was created. |
| `updated_at` | string | Yes | The timestamp when the Connection was last updated. |
| `domains` | array | Yes | List of [Organization Domains](/reference/domain-verification). |

### DELETE /connections/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Connection. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /connections/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier for the Connection. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `connection` | object | Distinguishes the Connection object. |

### GET /connections

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |
| `connection_type` | "ADFSSAML" \| "AdpOidc" \| "AppleOAuth" \| ... | No | Filter Connections by their type. |
| `domain` | string | No | Filter Connections by their associated domain. |
| `organization_id` | string | No | Filter Connections by their associated organization. |
| `search` | string | No | Searchable text to match against Connection names. |