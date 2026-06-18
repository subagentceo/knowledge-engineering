# Get Audit Log Configuration

The Audit Log Configuration endpoint provides a single view of an organization's audit logging setup. It includes retention settings (how long audit logs are stored), the audit log state (active, inactive, or disabled), and—if configured—the audit log stream, which sends events to external destinations like Splunk, Datadog, S3, Google Cloud Storage, or a custom HTTPS endpoint.

The log\_stream field is optional and only appears if the organization has a stream configured. If no stream is set up, the response includes only the audit log retention and state information.

#### Request

#### Response

#### Response (No Stream)

### GET /organizations/{id}/audit_log_configuration

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique identifier of the Organization. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `organization_id` | string | The ID of the Organization |
| `retention_period_in_days` | integer | The number of days audit log events are retained |
| `state` | "active" \| "inactive" \| "disabled" | The state of the audit log trail (e.g., "active", "inactive", "disabled") |
| `log_stream` | object | Optional object containing the audit log stream configuration. Only present if a stream is configured. |