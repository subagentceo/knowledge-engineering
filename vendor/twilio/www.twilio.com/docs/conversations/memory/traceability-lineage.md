# Memory observability traceability and lineage

Conversation Memory propagates structured trace identifiers across every stage of the bulk profile import pipeline. Use these identifiers to monitor import jobs, group related events, and trace issues to individual profiles.

## Overview

When you submit a bulk profile import, Conversation Memory emits product events and attaches a trace identifier to each event. These identifiers remain consistent across all related events, so you can group, filter, and follow the full lineage of an import—from initial submission through individual profile creation or update.

## How tracing works

A bulk profile import produces three layers of observable events:

1. Import creation: One event when the import job is submitted
2. Batch submission: One event per batch of up to 1,000 rows
3. Profile events: Individual events for each profile processed within a batch

Each layer carries a trace identifier that links it to the others. You can therefore move between the overall job view and a single profile without losing context.

## Trace identifiers

| Identifier   | Description                                             | Scope                                                                                                   |
| ------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `import_id`  | Generated when the bulk profile import job is submitted | Shared across all events for the job — track the overall import from submission to completion           |
| `request_id` | Assigned to the processing of a specific batch          | Shared across all operations for that batch — trace the end-to-end flow of a single batch               |
| `profile_id` | Uniquely identifies a single profile in the import      | Shared across all operations for that profile — verify or investigate the outcome for a specific record |

## Key events

### Import creation

When a bulk profile import is submitted, Memory emits the following event:

```bash
com.twilio.memory.profiles.created-import
```

The payload includes:

* `import_id`: The unique identifier for this import job
* `file_name`: The source file associated with the import

### Batch submission

For each batch of up to 1,000 rows, Memory emits:

```bash
com.twilio.memory.profiles.submitted-import
```

The payload includes:

* `request_id`: The identifier for tracking this specific batch

Details of the submitted batch also appear in the properties of the parent `com.twilio.memory.profiles.created-import` event.

### Profile events

Each profile processed within a batch produces its own event. Filter by `request_id` to return all profile events for that batch and view which profiles succeeded, failed, or require attention.

## Monitoring and debugging

### Monitor overall job status

In the Twilio Console **Debugger**, filter logs by `import_id` to view all events associated with the import job.

### Debug batch-level failures

Filter logs by `request_id` to surface processing details for a specific batch. This view helps identify bottlenecks or errors that affect every profile in the batch.

### Trace individual profile outcomes

Filter logs by `profile_id` to isolate a single profile and confirm successful creation or update, or to investigate failures.

### Identify errors and warnings

To focus on failures, filter logs where `log_level` is `error` or `warning`.
Each profile event includes:

* `error_code`: Mapped to the Twilio error catalog
* `error_message`: A human-readable description

Combine these fields with the [Twilio API error reference](/docs/api/errors) to determine likely root causes and next steps.

## Identifier lookup

| Goal                              | Identifier to search for |
| --------------------------------- | ------------------------ |
| All events for a bulk import job  | `import_id`              |
| All events for a specific batch   | `request_id`             |
| All events for a specific profile | `profile_id`             |

## Using AI tools for troubleshooting

To use third-party AI coding assistants, provide Conversation Memory documentation and exported log data for pattern analysis and remediation suggestions. Omit or redact sensitive information before sharing data with external services.
