# Memory observability logs

Conversation Memory emits structured log events at every stage of the memory pipeline — from ingestion and recall through update and deletion. Use these logs to access diagnostics, troubleshoot issues, and monitor your agent-based applications.

## Overview

Conversation Memory's logging layer captures lifecycle events across the following product domains:

| Domain              | Logged events                                                                  |
| ------------------- | ------------------------------------------------------------------------------ |
| Conversation Memory | Create, update, delete, and retrieval of observations                          |
| Profile Memory      | Profile and identity operations, trait management, bulk imports, and summaries |

You can access logs in the Twilio Console:

Go to **Develop > Troubleshoot > Debugger** to view, filter, and inspect log entries in real time.

## Access logs

To view Memory logs in the Twilio Console:

1. Open the [Twilio Console](https://1console.twilio.com).
2. Go to **Develop > Troubleshoot > Debugger**.
3. Filter by event type, domain, or time range.
4. Select any log entry to expand the full diagnostic panel, including error descriptions, possible causes, and suggested remediation steps.

## Product event logs

Conversation Memory emits a structured log event for each significant state change. Events follow the naming convention:

```bash
com.twilio.<domain>.<resource>.<action>
```

### Conversation Memory events

| Event type                                | Description                                 |
| ----------------------------------------- | ------------------------------------------- |
| `com.twilio.memory.observation.created`   | New observation successfully created        |
| `com.twilio.memory.observation.updated`   | Existing observation modified               |
| `com.twilio.memory.observation.deleted`   | Observation permanently removed             |
| `com.twilio.memory.observation.retrieved` | Observation successfully queried or fetched |

### Profile Memory events

#### Profiles and identity

| Event type                                        | Description                                                           |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| `com.twilio.memory.profile.created`               | Profile created during identity resolution                            |
| `com.twilio.memory.profile.deleted`               | Profile deleted                                                       |
| `com.twilio.memory.profile.retrieved`             | Profile retrieved                                                     |
| `com.twilio.memory.profiles.created.importcsv`    | Profiles created through CSV import                                   |
| `com.twilio.memory.profiles.merged`               | Profiles merged during identity resolution                            |
| `com.twilio.memory.profiles.lookup`               | Profile lookup completed                                              |
| `com.twilio.memory.profiles.sync`                 | Batch published to Profiles Bulk API for a CRM or data warehouse sync |
| `com.twilio.memory.identity.added`                | Identifier added to a profile                                         |
| `com.twilio.memory.identity.updated`              | Identifier updated                                                    |
| `com.twilio.memory.identity.deleted`              | Identifier deleted                                                    |
| `com.twilio.memory.identity.listed`               | Identifiers listed for a profile                                      |
| `com.twilio.memory.identityresolution.configured` | Identity resolution rules configured                                  |
| `com.twilio.memory.identityresolution.updated`    | Identity resolution rules updated                                     |

#### Traits and trait groups

| Event type                                     | Description                                   |
| ---------------------------------------------- | --------------------------------------------- |
| `com.twilio.memory.traits.created.importcsv`   | Traits created with CSV import                |
| `com.twilio.memory.traits.upserted`            | Trait created or updated (single)             |
| `com.twilio.memory.traits.upserted.bulk`       | Traits created or updated in bulk             |
| `com.twilio.memory.traits.promoted.identifier` | Trait promoted to act as a profile identifier |
| `com.twilio.memory.traitgroups.created`        | New trait group created                       |
| `com.twilio.memory.traitgroups.updated`        | Trait group modified                          |
| `com.twilio.memory.traitgroups.deleted`        | Trait group removed                           |

#### Store

| Event type                        | Description                        |
| --------------------------------- | ---------------------------------- |
| `com.twilio.memory.store.created` | Memory store provisioned           |
| `com.twilio.memory.store.updated` | Memory store configuration updated |
| `com.twilio.memory.store.deleted` | Memory store removed               |

#### Summary

| Event type                            | Description               |
| ------------------------------------- | ------------------------- |
| `com.twilio.memory.summary.created`   | Profile summary generated |
| `com.twilio.memory.summary.retrieved` | Profile summary fetched   |
| `com.twilio.memory.summary.updated`   | Profile summary updated   |
| `com.twilio.memory.summary.deleted`   | Profile summary removed   |

### Log entry schema

Every log entry shares a common top-level structure:

| Field           | Type              | Description                                                           |
| --------------- | ----------------- | --------------------------------------------------------------------- |
| `logId`         | string            | Unique identifier for this log entry                                  |
| `eventTime`     | string (ISO 8601) | Timestamp of the event                                                |
| `source`        | string            | The Memory subsystem that emitted the event                           |
| `eventType`     | string            | Full event type name (for example, `com.twilio.memory.store.created`) |
| `level`         | string            | Severity level: `INFO`, `WARNING`, or `ERROR`                         |
| `errorCode`     | integer           | `0` for success; non-zero maps to the Twilio error catalog            |
| `errorReason`   | string \| null    | Human-readable error description, if applicable                       |
| `requestId`     | string            | Unique ID for the originating API request                             |
| `correlationId` | string            | Trace ID for correlating events across services                       |
| `body`          | object            | Operation-specific payload                                            |

### Example log entry

```json
{
  "logId": "1775677339108-67cbb62a",
  "eventTime": "2026-04-08T19:42:19Z",
  "source": "conversation-memory",
  "eventType": "com.twilio.memory.store.created",
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
    "store_id": "mem_store_01knq9vx4qfghrt2dyrh4942w0"
  }
}
```

## Error and warning logs

Conversation Memory logs errors and warnings for all create, update, delete, search, and retrieval operations. Twilio structures every error log entry to help you quickly identify the root cause and take corrective action.

Errors fall into two categories:

* Input errors: Problems with configuration, request formatting, data integrity, or resource limits.
* Processing errors: Runtime failures such as partial processing, conflicts, data drops, timeouts, or resource locks.

### Error log fields

| Field                | Description                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `error_list`         | Array of one or more error entries associated with the operation                              |
| `error_code`         | Numeric code referencing the Twilio error catalog                                             |
| `error_type`         | Categorical classification (for example, `ValidationError`, `IngestError`, and `RecallError`) |
| `description`        | Human-readable summary of what went wrong                                                     |
| `possible_causes`    | List of likely root causes for the error condition                                            |
| `possible_solutions` | Recommended remediation steps                                                                 |

> \[!NOTE]
>
> Select any error entry in the Twilio Console Debugger to see the full diagnostic panel, including the error description, possible causes, and suggested remediation steps.

## Onboarding error logs

During initial setup, Conversation Memory surfaces errors in real time within the onboarding UI and also writes them to your Twilio logs for later review. This covers profile ingest errors, which are failures during initial profile data upload or sync.

## Error code reference

Conversation Memory error codes follow the Twilio standard error catalog. For every error code, you'll find:

* A plain-language description of the error
* A list of possible causes
* Suggested actions to resolve the issue

For the full reference, see [Twilio API error reference](/docs/api/errors).

## Best practices

### Set alerting thresholds before you go to production

Configure error-rate and warning-volume thresholds in the Twilio Console UI early. If you wait until an incident occurs, the first signal you receive will be user impact rather than a proactive alert.

### Use `conversation_id` as your primary trace key

Twilio uses `conversation_id` across Conversation Orchestrator, Conversation Intelligence, and Conversation Memory, making it the most reliable identifier for end-to-end debugging across products.

### Link error codes directly in your runbooks

Each error log entry includes an `error_code` that maps to a documented entry in the [Twilio API error reference](/docs/api/errors). Linking to that reference from your internal runbooks reduces mean time to resolution.

### Route alerts for each domain, not globally

Profile ingest errors and recall errors typically require different on-call owners. Configuring separate alert routes per domain reduces noise and improves response time.

### Use AI tools to accelerate log analysis

You can securely share Conversation Memory documentation and exported log data with AI coding assistants to analyze patterns and surface suggested fixes. This is especially useful for high-volume pipelines where manual log review is impractical.
