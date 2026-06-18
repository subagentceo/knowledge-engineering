# Organization domain

An organization domain represents an [organization](https://workos.com/docs/reference/organization)'s domain. Domains can be verified to assert that an organization owns the configured domain which is accomplished through DNS TXT record verification.

Organization domains can be verified manually through the Dashboard, or by setting `state: 'verified'` when adding domains via the [Organization create](https://workos.com/docs/reference/organization/create) or [update](https://workos.com/docs/reference/organization/update) APIs. Domains can also be verified through [a self-serve flow](https://workos.com/docs/domain-verification) via the Admin Portal.
The organization that defines this domain policy exerts authentication policy control over that domain across your application.
For this reason, it is important to verify ownership of manually added domains.
Additionally, WorkOS does not allow addition of common consumer domains, like `gmail.com`.

To automatically respond to changes in the organization domains, use [organization domain events](https://workos.com/docs/events/organization-domain).

## Create an Organization Domain

Creates a new Organization Domain.

#### Request

#### Response

## Delete an Organization Domain

Permanently deletes an organization domain. It cannot be undone.

#### Request

## Get an Organization Domain

Get the details of an existing organization domain.

#### Request

#### Response

## Verify an Organization Domain

Initiates verification process for an Organization Domain.

#### Request

#### Response

### organization_domain

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "organization_domain" | Yes | Distinguishes the organization domain object. |
| `id` | string | Yes | Unique identifier of the organization domain. |
| `organization_id` | string | Yes | ID of the parent Organization. |
| `domain` | string | Yes | Domain for the organization domain. |
| `state` | "pending" \| "verified" \| "failed" | Yes | Verification state of the domain. |
| `verificationStrategy` | "dns" \| "manual" | Yes | Strategy used to verify the domain |
| `verificationToken` | string | Yes | validation token to be used in DNS TXT record. |

### /organization_domains

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | string | Yes | The domain to add to the organization. |
| `organization_id` | string | Yes | The ID of the organization to add the domain to. |

### DELETE /organization_domains/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the organization domain. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /organization_domains/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the organization domain. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_domain` | object | Distinguishes the organization domain object. |

### POST /organization_domains/{id}/verify

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the organization domain. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_domain` | object | Distinguishes the organization domain object. |