# Audit Log Retention

Retention settings control how long Audit Log events are stored before being permanently deleted. You can configure the retention period on a per-organization basis.

## Get Retention

Get the configured event retention period for the given Organization.

#### Request

#### Response

## Set Retention

Set the event retention period for the given Organization.

#### Request

#### Response

### retention

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `retention_period_in_days` | number | Yes | The number of days Audit Log events will be retained before being permanently deleted. Valid values are `30` and `365`. |

### GET /organizations/{id}/audit_logs_retention

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `retention_period_in_days` | integer | The number of days Audit Log events will be retained. |

### PUT /organizations/{id}/audit_logs_retention

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `retention_period_in_days` | integer | The number of days Audit Log events will be retained. Valid values are `30` and `365`. |