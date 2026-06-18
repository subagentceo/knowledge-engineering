# Organization

An Organization is a top-level resource in WorkOS. Each Connection, Directory, and Audit Trail Event belongs to an Organization. An Organization will usually represent one of your customers. There is no limit to the number of organizations you can create in WorkOS.

## Create an Organization

Creates a new organization in the current environment.

You can include one or more domains to associate with the organization, but you should [verify the ownership](https://workos.com/docs/authkit/domain-verification) of every domain before setting its state to `verified`.

#### Request

#### Response

## Delete an Organization

Permanently deletes an organization in the current environment. It cannot be undone.

#### Request

## Get an Organization by External ID

Get the details of an existing organization by an [external identifier](https://workos.com/docs/authkit/metadata/external-identifiers).

#### Request

#### Response

## Get an Organization

Get the details of an existing organization.

#### Request

#### Response

## List Organizations

Get a list of all of your existing organizations matching the criteria specified.

#### Request

#### Response

## Update an Organization

Updates an organization in the current environment.

You can include one or more domains to associate with the organization, but you should [verify the ownership](https://workos.com/docs/authkit/domain-verification) of every domain before setting its state to `verified`.

#### Request

#### Response

### organization

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "organization" | Yes | Distinguishes the Organization object. |
| `id` | string | Yes | Unique identifier of the Organization. |
| `name` | string | Yes | A descriptive name for the Organization. This field does not need to be unique. |
| `domains` | object[] | Yes | List of [Organization Domains](/reference/domain-verification). |
| `metadata` | object | Yes | Object containing [metadata](/authkit/metadata) key/value pairs associated with the Organization. |
| `external_id` | string | No | The external ID of the Organization. |
| `stripe_customer_id` | string | No | The Stripe customer ID associated with this organization. |
| `created_at` | string | Yes | The timestamp when the Organization was last created. |
| `updated_at` | string | Yes | The timestamp when the Organization was last updated. |
| `allow_profiles_outside_organization` | boolean | No | Whether the Organization allows profiles outside of its managed domains. |

### /organizations

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | The name of the organization. |
| `allow_profiles_outside_organization` | boolean | No | Whether the organization allows profiles from outside the organization to sign in. |
| `domains` | string[] | No | The domains associated with the organization. Deprecated in favor of `domain_data`. |
| `domain_data` | object[] | No | The domains associated with the organization, including verification state. |
| `metadata` | object | No | Object containing [metadata](/authkit/metadata) key/value pairs associated with the Organization. |
| `external_id` | string | No | An external identifier for the Organization. |

### DELETE /organizations/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

### GET /organizations/external_id/{external_id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `external_id` | string | Yes | The external ID of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization` | object | Distinguishes the Organization object. |

### GET /organizations/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization` | object | Distinguishes the Organization object. |

### GET /organizations

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `domains` | string[] | No | The domains of an Organization. Any Organization with a matching domain will be returned. |
| `search` | string | No | Searchable text for an Organization. Matches against the organization name. |

### PUT /organizations/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization` | object | Distinguishes the Organization object. |