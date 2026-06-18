# TaskRouter Events reference

## Overview

TaskRouter makes an HTTP request containing [Event](/docs/taskrouter/api/event) details to the [Workspace's](/docs/taskrouter/api/workspace) `EventCallbackURL` each time an Event takes place. This page contains a full list of Events and a description of Event Callbacks.

> \[!WARNING]
>
> A busy TaskRouter system generate a large volume of Events at a frequent rate. Keep this in mind when considering how your application will scale.

## Event callbacks

The `EventCallbackUrl` is defined on the [Workspace](/docs/taskrouter/api/workspace). Your application should respond to Event Callbacks with 204 No Content and a `Content-Type` header of `application/json` within 15 seconds.

TaskRouter will `POST` the following parameters to the `EventCallbackURL` configured on your Workspace each time an Event occurs.

| Parameter        | Description                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| EventType        | An identifier for this event                                                                                                      |
| AccountSid       | The account owning this event                                                                                                     |
| WorkspaceSid     | The Workspace Sid generating this event                                                                                           |
| WorkspaceName    | The Workspace Name generating this event ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )   |
| EventDescription | A description of the event ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                 |
| ResourceType     | The type of object this event is most relevant to (Task, Reservation, Worker, Activity, Workflow, Workspace)                      |
| ResourceSid      | The sid of the object this event is most relevant to (TaskSid, ReservationSid, WorkerSid, ActivitySid, WorkflowSid, WorkspaceSid) |
| Timestamp        | The time this event was sent                                                                                                      |

## Activity events

| **EventType**    | **Field Data**                             | **Description**        |
| ---------------- | ------------------------------------------ | ---------------------- |
| activity.created | ActivitySid ActivityName ActivityAvailable | An Activity is created |
| activity.updated | ActivitySid ActivityName ActivityAvailable | An Activity is created |
| activity.deleted | ActivitySid ActivityName ActivityAvailable | An Activity is deleted |

## Reservation events

| EventType             | Field Data                                          | Description                                                                                           |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| reservation.created   | Task Worker TaskQueueSid ReservationSid WorkflowSid | A task is assigned to a worker                                                                        |
| reservation.accepted  | Task Worker TaskQueueSid ReservationSid WorkflowSid | A task reservation is accepted by a worker                                                            |
| reservation.rejected  | Task Worker TaskQueueSid ReservationSid WorkflowSid | A task reservation is rejected by a worker                                                            |
| reservation.timeout   | Task Worker TaskQueueSid ReservationSid WorkflowSid | Too much time passed without a task being accepted or rejected. The reservation is canceled.          |
| reservation.canceled  | Task Worker TaskQueueSid ReservationSid WorkflowSid | A task reservation is canceled before it has been accepted by a worker                                |
| reservation.rescinded | Task Worker TaskQueueSid ReservationSid WorkflowSid | Multi-reservation was used for a task and another worker has accepted one of the created reservations |
| reservation.completed | Task Worker TaskQueueSid ReservationSid WorkflowSid | A task reservation is completed. Aligns with `task.completed`.                                        |
| reservation.failed    | Task TaskQueueSid ReservationSid WorkflowSid        | The reservation failed and was not assigned to an agent.                                              |
| reservation.wrapup    | Task Worker TaskQueueSid ReservationSid WorkflowSid | The task reservation is being wrapped up by the agent; happens directly before task completion.       |

## Task events

| EventType                    | Field Data                    | Description                                                                                  |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| task.created                 | Task WorkflowSid              | A task item is added to a Workspace                                                          |
| task.updated                 | Task TaskQueueSid WorkflowSid | A task's attributes are changed                                                              |
| task.canceled                | Task TaskQueueSid WorkflowSid | A task is canceled                                                                           |
| task.wrapup                  | Task TaskQueueSid WorkflowSid | A task is moved to wrapup state.                                                             |
| task.completed               | Task TaskQueueSid WorkflowSid | A task is completed                                                                          |
| task.deleted                 | Task TaskQueueSid WorkflowSid | A task is deleted via API. Does not include auto-deleted Tasks after cancelation/completion. |
| task.system-deleted          | Task TaskQueueSid WorkflowSid | A task is deleted via the system, after the task reaches its TTL.                            |
| task.transfer-initiated      | Task TaskQueueSid WorkflowSid |                                                                                              |
| task.transfer-attempt-failed | Task TaskQueueSid WorkflowSid |                                                                                              |
| task.transfer-failed         | Task TaskQueueSid WorkflowSid |                                                                                              |
| task.transfer-canceled       | Task TaskQueueSid WorkflowSid |                                                                                              |
| task.transfer-completed      | Task TaskQueueSid WorkflowSid |                                                                                              |

### Task event fields

When an event involving a Task is logged, the event callback includes the following fields.

| Parameter            | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TaskSid              | The SID of the task that changed                                                                                       |
| TaskAttributes       | The JSON Attributes of the task ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) ) |
| TaskAge              | The age of the task                                                                                                    |
| TaskPriority         | The priority of the task                                                                                               |
| TaskAssignmentStatus | The assignment status of the task                                                                                      |
| TaskCanceledReason   | The reason that task was canceled                                                                                      |
| TaskCompletedReason  | The reason that task was completed                                                                                     |

## Task Channel events

| EventType            | Field Data  | Description               |
| -------------------- | ----------- | ------------------------- |
| task-channel.created | TaskChannel | A task channel is created |
| task-channel.updated | TaskChannel | A task channel is updated |
| task-channel.deleted | TaskChannel | A task channel is deleted |

### Task Channel event fields

When an event comes in that relates to a Task Channel, the following fields are be passed in:

| Parameter                   | Description                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| TaskChannelSid              | The SID of the task-channel                                                                                                                 |
| TaskChannelName             | The Friendly Name of the task-channel ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                |
| TaskChannelUniqueName       | An application-defined string that uniquely identifies the Task Channel, such as `voice` or `sms`                                           |
| TaskChannelOptimizedRouting | Whether the Task Channel should prioritize Workers that have been idle. If `true`, Workers that have been idle the longest are prioritized. |

## Task Queue events

| EventType                     | Field Data                                                            | Description                                                                       |
| ----------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| task-queue.created            | TaskQueueSid TaskQueueName TaskQueueTargetExpression OperatingUnitSid | A TaskQueue has been created                                                      |
| task-queue.deleted            | TaskQueueSid TaskQueueName TaskQueueTargetExpression                  | A TaskQueue has been deleted                                                      |
| task-queue.entered            | Task TaskQueueSid WorkflowSid                                         | A task enters a queue during workflow processing                                  |
| task-queue.timeout            | Task TaskQueueSid WorkflowSid                                         | A workflow routing step timed-out and a task is leaving a queue                   |
| task-queue.moved              | Task TaskQueueSid WorkflowSid                                         | A task leaves its current queue to move to a new queue during workflow processing |
| task-queue.expression.updated | TaskQueueSid TaskQueueTargetExpression                                | The queue expression has been updated                                             |

## Worker events

| EventType                          | Field Data     | Description                                               |
| ---------------------------------- | -------------- | --------------------------------------------------------- |
| worker.created                     | Worker         | A worker is created                                       |
| worker.activity.update             | Worker         | A worker's activity is updated                            |
| worker.attributes.update           | Worker         | A worker's attributes are updated                         |
| worker.capacity.update             | Worker Channel | A worker's channel's configured capacity has been updated |
| worker.channel.availability.update | Worker Channel | A worker's channel's availability has been updated        |
| worker.deleted                     | Worker         | A worker is deleted                                       |

### Worker event fields

When an event comes in that relates to a Worker, the following fields are passed in:

| Parameter          | Description                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| WorkerSid          | The SID of the worker that changed                                                                                       |
| WorkerName         | The Friendly Name of the worker ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )   |
| WorkerAttributes   | The JSON Attributes of the worker ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) ) |
| WorkerActivitySid  | The new activity SID of the worker                                                                                       |
| WorkerActivityName | The new activity friendly name of the worker                                                                             |
| WorkerVersion      | The current worker version                                                                                               |
| OperatingUnitSid   | The SID of the operating unit to which the worker belongs                                                                |

When an event comes in that relates to a Worker's activity changing, the following additional fields are passed in:

| Parameter                      | Description                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------- |
| WorkerTimeInPreviousActivity   | The time spent in the previous activity, in seconds; truncated to zero decimals |
| WorkerTimeInPreviousActivityMs | The time spent in previous activity , in milliseconds                           |
| WorkerPreviousActivitySid      | The previous activity sid prior to this state change                            |

When an event comes in that relates to a Worker's configured channel capacity or availability changing, the following additional fields are passed in:

| Parameter                      | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| WorkerChannelAvailable         | The availability of the channel                             |
| WorkerChannelAvailableCapacity | The available capacity of the channel                       |
| WorkerChannelPreviousCapacity  | The previous capacity of the channel                        |
| TaskChannelSid                 | The associated channel sid                                  |
| TaskChannelUniqueName          | The associated channel unique name                          |
| WorkerChannelTaskCount         | The number of assigned tasks to this worker on this channel |

## Workflow events

| EventType               | Field Data               | Description                                                                                                |
| ----------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| workflow.created        | WorkflowSid WorkflowName | A workflow is created                                                                                      |
| workflow.updated        | WorkflowSid WorkflowName | A workflow is updated                                                                                      |
| workflow.deleted        | WorkflowSid WorkflowName | A workflow is deleted                                                                                      |
| workflow.target-matched | Task WorkflowSid         | A task item matches a workflow routing step                                                                |
| workflow.entered        | Task WorkflowSid         | A task enters a workflow                                                                                   |
| workflow.timeout        | Task WorkflowSid         | A task reaches the end of a workflow without being accepted and is removed from the workspace              |
| workflow.skipped        | Task WorkflowSid         | A task skips-out of the workflow (because of skip\_if in the final step) and is removed from the workspace |

## Workspace events

| EventType         | Field Data                 | Description            |
| ----------------- | -------------------------- | ---------------------- |
| workspace.created | WorkspaceSid WorkspaceName | A workspace is created |
| workspace.updated | WorkspaceSid WorkspaceName | A workspace is updated |
| workspace.deleted | WorkspaceSid WorkspaceName | A workspace is deleted |
