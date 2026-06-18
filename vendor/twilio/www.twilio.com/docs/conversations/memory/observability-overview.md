# Conversation Memory observability

With Conversation Memory observability, you can monitor, debug, and trace product events across the entire lifecycle of memory and profile pipelines. This includes tracking create, read, update, and delete (CRUD) operations, as well as searches and retrievals, which are vital for troubleshooting agent-based use cases.

## Key capabilities

| Feature                     | Description                                                                                                                                                                    | Primary use case                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Product event logging       | Structured logs for key CRUD lifecycle operations, plus sync, import, and more across memory resources                                                                         | Auditing, event tracing, and downstream analysis                |
| Error and warning logs      | Detailed diagnostics for all CRUD operation failures, including `error_code`, `error_type`, possible causes, and suggested actions                                             | Accelerated root cause analysis and debugging                   |
| Alerting                    | Configurable thresholds (error rate, warning volume) for proactive notification; alert routing through the Twilio Console UI (email, webhook, and PagerDuty)                   | Proactive incident response and SRE workflows                   |
| Traceability and lineage    | Unified trace ID propagation (`conversation_id`, `request_id`, `profile_id`, and `operator_id`) across Conversation Orchestrator, Conversation Intelligence, and Memory        | End-to-end debugging and correlation across the Twilio AI stack |
| Onboarding UI errors        | Built-in observability for errors during setup (profile ingest and identity resolution); errors are tagged with `interface_type: "UI"` in logs                                 | Debugging setup and configuration failures                      |
| Data export and integration | Real-time log export using Twilio Event Streams to external systems (Security Information and Event Management (SIEM), data warehouse, analytics) with personal data redaction | Agent monitoring, compliance, and custom analytics              |

## Lifecycle event logging

Memory emits structured events at every state transition of the product lifecycle. Events follow the naming convention:

```bash
com.twilio.<domain>.<resource>.<action>
```

| Domain                                                    | Key event examples                                                                                                                                        |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conversation Memory (observations and summaries)          | `com.twilio.memory.observation.created`, `.updated`, `.deleted`, `.retrieved` · `com.twilio.memory.summary.created`, `.updated`, `.deleted`, `.retrieved` |
| Profile Memory (profiles, traits, identity, trait groups) | `com.twilio.memory.profile.created` · `com.twilio.memory.profiles.merged` · `com.twilio.memory.traits.upserted`                                           |
| Profile bulk imports and syncs (CSV, CRM, data warehouse) | `com.twilio.memory.profiles.submitted-import` · `.finished-import` · `com.twilio.memory.profiles.sync`                                                    |

## Error and warning logs

Conversation Memory captures all errors and warnings across memory and profile CRUD operations.

Twilio structures error log entries to accelerate root-cause analysis. You can find error log entries in both the Twilio Console and in exported event streams.

Errors fall into two categories:

* Input Errors: Problems with configuration, formatting, data integrity, or resource limits
* Processing Errors: Runtime failures such as partial processing, conflicts, data drops, delays, locks, and timeouts

Every error entry includes a description of the likely cause and potential solutions.

### Error log fields

| Field               | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `error_list`        | Array of one or more error entries associated with the operation                             |
| `error_code`        | Numeric code referencing the Twilio error catalog                                            |
| `error_type`        | Categorical classification (for example, `ValidationError`, `IngestError`, or `RecallError`) |
| `description`       | Human-readable summary of what went wrong                                                    |
| `possible_causes`   | List of likely root causes for the error condition                                           |
| `suggested_actions` | Recommended remediation steps                                                                |

Twilio generate error and warning logs for failures across all create, update, and delete operations, as well as critical search and retrieval calls.

> \[!NOTE]
>
> Full error code descriptions and remediation guidance are available in the [Twilio API error reference](/docs/api/errors). Error details are also viewable directly in the Twilio Console.

## Configuration

Configure observability features in the Troubleshoot section of the Twilio Console. Go to **Develop > Troubleshoot > Debugger** to access logs, configure alert thresholds, and set up event export.

## Best practices

| Guideline                 | Action                                                                                                 | Rationale                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Proactive alerting        | Configure error rate and warning volume thresholds in the Twilio Console before your production launch | Identify issues based on system health signals, not user-reported impact               |
| Runbook integration       | Reference `error_code` from the log directly in your internal runbooks                                 | Speeds up remediation by linking to the [Twilio API error reference](/docs/api/errors) |
| Centralized configuration | Manage alerts, export settings, and observability controls from the Twilio Console                     | Single control plane for all observability features                                    |
| Error reference           | Full error descriptions and guidance are in the [Twilio API error reference](/docs/api/errors)         | Source of truth for diagnostic details and remediation steps                           |
