# Webhooks

Webhook endpoints let WorkOS deliver event notifications directly to your application. Use these endpoints to create, list, and delete the webhook endpoints configured for your environment.

For implementation guidance, including payload verification and local testing, see the [webhooks guide](https://workos.com/docs/events/data-syncing/webhooks).

## Create a Webhook Endpoint

Create a new webhook endpoint to receive event notifications.

#### Request

#### Response

## Delete a Webhook Endpoint

Delete an existing webhook endpoint.

#### Request

## List Webhook Endpoints

Get a list of all of your existing webhook endpoints.

#### Request

#### Response

## Update a Webhook Endpoint

Update the properties of an existing webhook endpoint.

#### Request

#### Response

### webhook_endpoint

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "webhook_endpoint" | Yes | Distinguishes the Webhook Endpoint object. |
| `id` | string | Yes | Unique identifier of the Webhook Endpoint. |
| `endpoint_url` | string | Yes | The URL to which webhooks are sent. |
| `secret` | string | Yes | The secret used to sign webhook payloads. |
| `status` | "enabled" \| "disabled" | Yes | Whether the Webhook Endpoint is enabled or disabled. |
| `events` | string[] | Yes | The events that the Webhook Endpoint is subscribed to. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `updated_at` | string | Yes | An ISO 8601 timestamp. |

### /webhook_endpoints

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint_url` | string | Yes | The HTTPS URL where webhooks will be sent. |
| `events` | ("authentication.email_verification_succeeded" \| "authentication.magic_auth_failed" \| "authentication.magic_auth_succeeded" \| ...)[] | Yes | The events that the Webhook Endpoint is subscribed to. |

### DELETE /webhook_endpoints/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Webhook Endpoint. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /webhook_endpoints

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `after="obj_123"` to fetch a new batch of objects after `"obj_123"`. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |

### PATCH /webhook_endpoints/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Webhook Endpoint. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `webhook_endpoint` | object | Distinguishes the Webhook Endpoint object. |