# Audit Log Export

An object representing an Audit Log Export.

## Create Export

Create an Audit Log Export. Exports are scoped to a single organization within a specified date range.

#### Request

#### Response

## Get Export

Get an Audit Log Export. The URL will expire after 10 minutes. If the export is needed again at a later time, refetching the export will regenerate the URL.

#### Request

#### Response

> The URL will expire after 10 minutes. If the export is needed again at a later time, refetching the export will regenerate the URL.

### audit_log_export

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "audit_log_export" | Yes | Distinguishes the Audit Log Export object. |
| `id` | string | Yes | The unique ID of the Audit Log Export. |
| `created_at` | string | Yes | The timestamp when the Audit Log Export was created. |
| `updated_at` | string | Yes | The timestamp when the Audit Log Export was last updated. |
| `state` | "pending" \| "ready" \| "error" | Yes | The state of the export. Possible values: `pending` `ready` `error`. |
| `url` | string | No | A URL to the CSV file. Only defined when the Audit Log Export is ready. |

### /audit_logs/exports

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `organization_id` | string | Yes | The unique ID of the Organization. |
| `range_start` | string | Yes | ISO-8601 value for start of the export range. |
| `range_end` | string | Yes | ISO-8601 value for end of the export range. |
| `actions` | string[] | No | List of actions to filter against. |
| `actors` | string[] | No | Deprecated. Use `actor_names` instead. |
| `actor_names` | string[] | No | List of actor names to filter against. |
| `actor_ids` | string[] | No | List of actor IDs to filter against. |
| `targets` | string[] | No | List of target types to filter against. |

### GET /audit_logs/exports/{auditLogExportId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `auditLogExportId` | string | Yes | The unique ID of the Audit Log Export. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `audit_log_export` | object | Distinguishes the Audit Log Export object. |