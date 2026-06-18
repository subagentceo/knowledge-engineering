# Enterprise Knowledge observability

With Enterprise Knowledge observability, you can monitor, debug, and trace product events across the entire lifecycle of knowledge bases and knowledge sources. This includes tracking create, read, update, and delete (CRUD) operations, as well as searches, indexing, and retrievals.

## Key capabilities

| Feature                     | Description                                                                                                                                                                                | Primary use case                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Product event logging       | Structured logs for key CRUD lifecycle operations, plus sync, import, and more across Enterprise Knowledge resources                                                                       | Auditing, event tracing, and downstream analysis                |
| Error and warning logs      | Detailed diagnostics for all CRUD operation failures, including `error_code`, `error_type`, possible causes, and suggested actions                                                         | Accelerated root cause analysis and debugging                   |
| Alerting                    | Set custom error and warning thresholds in the Twilio Console and route proactive alerts across multiple channels—including email, webhooks, and PagerDuty                                 | Proactive incident response and SRE workflows                   |
| Traceability and lineage    | Unified trace ID propagation (`conversation_id`, `request_id`, `profile_id`, `operator_id`, and `knowledge_id`) across Conversation Orchestrator, Conversation Intelligence, and Knowledge | End-to-end debugging and correlation across the Twilio AI stack |
| Onboarding UI errors        | Built-in observability for errors encountered during setup (profile and knowledge ingest, identity resolution). Errors are tagged with `interface_type: "UI"` in logs                      | Debugging setup and configuration failures                      |
| Data export and integration | Real-time log export using Twilio Event Streams to external systems (Security Information and Event Management (SIEM), data warehouse, analytics) with personal data redaction             | Agent monitoring, compliance, and custom analytics              |

## Access logs

To view Enterprise Knowledge logs:

1. Open the [Twilio Console](https://1console.twilio.com).
2. Go to **Develop > Troubleshoot > Debugger**.
3. Filter by event type (for example, `com.twilio.knowledge.knowledge.created`) or search for Knowledge-related events.
4. Select any log entry to expand the full diagnostic panel, including error descriptions, possible causes, and suggested remediation steps.

## Product event logs

Enterprise Knowledge emits a structured log event for each significant state change. Events follow the naming convention:

`com.twilio.<domain>.<resource>.<action>`

### Knowledge events

| Event type                                | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| `com.twilio.knowledge.knowledge.created`  | New knowledge document or source successfully created |
| `com.twilio.knowledge.knowledge.updated`  | Existing knowledge document or source modified        |
| `com.twilio.knowledge.knowledge.deleted`  | Knowledge document or source permanently removed      |
| `com.twilio.knowledge.knowledge.searched` | Knowledge search operation completed                  |
| `com.twilio.knowledge.knowledge.indexed`  | Knowledge document indexed for retrieval              |

### Knowledge base events

| Event type                                   | Description                           |
| -------------------------------------------- | ------------------------------------- |
| `com.twilio.knowledge.knowledgebase.created` | New knowledge base provisioned        |
| `com.twilio.knowledge.knowledgebase.updated` | Knowledge base configuration modified |
| `com.twilio.knowledge.knowledgebase.deleted` | Knowledge base removed                |

## Log entry schema

Every log entry shares a common top-level structure:

| Field           | Type              | Description                                                                      |
| --------------- | ----------------- | -------------------------------------------------------------------------------- |
| `logId`         | string            | Unique identifier for this log entry                                             |
| `eventTime`     | string (ISO 8601) | Timestamp of the event                                                           |
| `source`        | string            | The Knowledge subsystem that emitted the event                                   |
| `eventType`     | string            | Full event type name (for example, `com.twilio.knowledge.knowledgebase.created`) |
| `level`         | string            | Severity level: `INFO`, `WARNING`, or `ERROR`                                    |
| `errorCode`     | integer           | `0` for success; non-zero maps to the Twilio error catalog                       |
| `errorReason`   | string \| null    | Human-readable error description, if applicable                                  |
| `requestId`     | string            | Unique ID for the originating API request                                        |
| `correlationId` | string            | Trace ID for correlating events across services                                  |
| `body`          | object            | Operation-specific payload                                                       |

### Example log entry

```json
{
  "logId": "1775677339108-67cbb62a",
  "eventTime": "2026-04-08T19:42:19Z",
  "source": "knowledge",
  "eventType": "com.twilio.knowledge.knowledgebase.created",
  "level": "INFO",
  "errorCode": 0,
  "errorReason": null,
  "requestId": "4cc248bf-330b-49e6-9257-c9756e34c267",
  "correlationId": "4cc248bf-330b-49e6-9257-c9756e34c267",
  "body": {
    "created_by": "ACda1bb2889ad6cbe4814c2addbc8a657c",
    "error_code": null,
    "interface_type": "API",
    "latency_ms": 251,
    "knowledge_base_id": "know_base_01knq9vx4qfghrt2dyrh4942w0"
  }
}
```

## Error and warning logs

Enterprise Knowledge logs errors and warnings for all create, update, delete, search, indexing, and retrieval operations. Twilio structures every error log entry to help you quickly identify the root cause and take corrective action.

### Error log fields

| Field                | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `error_list`         | Array of one or more error entries associated with the operation                          |
| `error_code`         | Numeric code referencing the Twilio error catalog                                         |
| `error_type`         | Categorical classification (for example, `ValidationError`, `IngestError`, `SearchError`) |
| `description`        | Human-readable summary of what went wrong                                                 |
| `possible_causes`    | List of likely root causes for the error condition                                        |
| `possible_solutions` | Recommended remediation steps                                                             |

> \[!NOTE]
>
> Full error code descriptions and remediation guidance are available in the [Twilio API error reference](/docs/api/errors). Error details are also viewable directly in the Twilio Console Debugger.
