# Audit Log Event

An Audit Log Event represents a notable action taken within your application. Each event captures what happened, who did it, what was affected, and contextual information about when and where it occurred.

## Create Event

Create an Audit Log Event.

This API supports idempotency which guarantees that performing the same operation multiple times will have the same result as if the operation were performed only once. This is handy in situations where you may need to retry a request due to a failure or prevent accidental duplicate requests from creating more than one resource.

To achieve idempotency, you can add `Idempotency-Key` request header to a Create Event request with a unique string as the value. Each subsequent request matching this unique string will return the same response. We suggest using [v4 UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) for idempotency keys to avoid collisions.

Idempotency keys expire after 24 hours. The API will generate a new response if you submit a request with an expired key.

#### Request

### event

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | string | Yes | Identifier of what action was taken. |
| `occurred_at` | string | Yes | ISO-8601 timestamp of when the action occurred. |
| `version` | number | No | The schema version the event is associated with. |
| `actor` | object | Yes |  |
| `targets` | array | Yes |  |
| `context` | object | Yes |  |
| `metadata` | object | No | Additional data associated with the event or entity. Limited to 50 keys. Key names can be up to 40 characters long, and values can be up to 500 characters long. |

### POST /audit_logs/events

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `idempotency-key` | string | No | A unique string to prevent duplicate requests. Each subsequent request matching this unique string will return the same response. We suggest using v4 UUIDs. Keys expire after 24 hours. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Whether the Audit Log event was created successfully. |