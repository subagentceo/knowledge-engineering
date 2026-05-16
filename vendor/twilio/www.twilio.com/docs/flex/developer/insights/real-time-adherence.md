# Workforce Management Real-Time Adherence

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

The Workforce Management Real-Time Adherence Feed (WFM RTA Feed) is designed for partners to monitor and report on the activity of agents within a Flex contact center. Events from this feed can be used to generate a real-time snapshot of agent status.

[TaskRouter events](/docs/taskrouter/api/event/reference) model the core activity of the agents within a Flex application. The RTA Feed interprets and reformats these TaskRouter events so that they can be used to monitor real-time adherence. Each event contains a JSON-formatted message to represent the status of an agent.

Events from the RTA Feed are sent securely as HTTPS requests to a registered URL. Unencrypted HTTP protocol isn't supported.

> \[!WARNING]
>
> A busy Flex application will generate a large volume of events at a frequent
> rate. Keep this in mind when considering how your application will scale.

## Event Trigger

Each event represents the real-time status of an agent. The status of an agent is the combination of their [activity](/docs/flex/admin-guide/core-concepts/routing#activities) and any [tasks](/docs/flex/admin-guide/core-concepts/routing#tasks) they are handling. The tasks that agents are handling are represented as `reservations` because this is binding between the task and the agent. These entities are the same as what you would see if you subscribed to the TaskRouter Events Feed.

Example Event:

```json
{
  "product": "Flex",
  "object": "WFMWorkerChange",
  "version": 1,
  "records": [
    {
      "worker": {
        "sid": "WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_sid": "WAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_name": "Available",
        "date_activity_updated": "2021-06-06T11:06:10.268Z"
      },
      "channels": [
        {
          "reservations": [
            {
              "sid": "WRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "status": "created",
              "workflow_sid": "WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_queue_sid": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_assignment_status": "reserved",
              "date_created": "2021-06-06T11:09:09.240Z",
              "date_updated": "2021-06-06T11:09:09.240Z",
              "date_reservation_status_updated": "2021-06-06T11:09:09.240Z",
              "direction": "inbound"
            }
          ],
          "worker_channel_sid": null,
          "task_channel_sid": "TCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "task_channel_name": "voice",
          "available": 1,
          "available_capacity": 0,
          "capacity": 1,
          "date_capacity_updated": null
        }
      ],
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "workspace_sid": "WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "last_processed_event_sid": "EVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "date_last_processed_event": "2021-06-06T11:09:09.240Z"
    }
  ]
}
```

With the TaskRouter Events Feed, every single action and update within Flex generates a new event: a task is created, an agent changes their status, a task is routed to an agent, a task is completed, etc. The details contained within that event are specific to whatever happened, and they don't contain any other context. For example, a `task.completed` event will tell you which agent finished a task, but it won't tell you how many additional tasks that agent might still be handling.

In comparison, an event from the RTA Feed tells you everything you need to know about a single agent. An event is triggered whenever something about an agent changes. For example, an event would be triggered when an agent receives or finishes a task. However, no events would be triggered when a task is created but hasn't yet been assigned anywhere.

If multiple changes happen simultaneously, the RTA Feed sends a single event with the latest information following the simultaneous updates. This means that the RTA Feed may not provide the exact timestamp of all the changes within Flex. Sometimes, short-lived changes are collated with subsequent events instead of being sent as individual events. If you need an accurate timestamp of all changes, use [TaskRouter Events](/docs/taskrouter/api/event/reference).

### TaskRouter events that trigger an RTA Feed update

These TaskRouter events may trigger an update to the RTA Feed:

* worker.created → a new worker was created
* worker.deleted → a worker was deleted
* worker.capacity.update → the capacity setting for a worker was updated
* worker.activity.update → a worker's activity was updated
* reservation.created → a new reservation has been created for a worker (i.e., a task was assigned)
* reservation.accepted → a reservation was accepted by a worker
* reservation.canceled → a reservation was canceled
* reservation.rescinded → a reservation was rescinded
* reservation.rejected → a reservation was rejected
* reservation.timeout → a reservation timed out
* reservation.wrapup → a reservation moved into wrap-up

Our documentation on the Lifecycle of a Task provides more detail on these [task states](/docs/taskrouter/lifecycle-task-state) and [assignment](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

## Event API

An event will take the following form:

```json
{
  "product": "Flex",
  "object": "WFMWorkerChange",
  "version": 1,
  "records": [
    <recordObject1>,
    <recordObject2>,
    ...
  ]
}
```

This is the standard wrapper for the event. `product`, `object`, and `version` will be the same for each event you receive.

`records` will contain a list of event records, documented below. Most fields that are documented below may return `null` values. This often happens when the RTA Feed is processing events for an agent it hasn't seen before. Over time as the agent triggers more events, there will be fewer `null` values. When designing a system to process these records, you should ensure that you respond appropriately to `null` values.

### recordObject

Each `record` represents the status of a particular agent. a `recordObject` will take the following form:

```json
{
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "workspace_sid": "WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "last_processed_event_sid": "EVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "date_last_processed_event": "2021-06-06T11:09:09.240Z",
  "worker": <workerObject>,
  "channels": [
    <channelObject1>,
    <channelObject2>,
    ...
  ]
}
```

* `account_sid` - The AccountSid for the Flex application generating events
* `workspace_sid` - The TaskRouter Workspace containing the Flex activity
* `last_processed_event_sid` - A unique identifier for the RTA feed record
* `date_last_processed_event` - A timestamp for when the event data was generated
* `worker` - An object that describes which TaskRouter Worker this record relates to
* `channels` - An array of `channelObjects`, each communicating whether the agent is handling tasks on a particular channel. If `channels` is `null`, this means the agent has no active tasks.

### workerObject

The `workerObject` describes which TaskRouter Worker this RTA feed record relates to.

```json
{
  "sid": "WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "activity_sid": "WAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "activity_name": "Available",
  "date_activity_updated": "2021-06-06T11:06:10.268Z"
}
```

* `sid` - The TaskRouter WorkerSid associated with this agent
* `activity_sid` - The TaskRouter ActivitySid for the agent's current activity
* `activity_name` - The friendly name for the agent's current activity. Common values are "Offline", "Available", and "Unavailable". Each Flex application may customize this list to include custom values.
* `date_activity_update` - A timestamp for when the agent switched into their current activity

### channelObject

The tasks an agent is handling are segmented by the channel of the task, like "voice" or "sms". Each `channelObject` represents one channel. It's possible for the `channels` array to be null and not contain any `channelObjects`. This situation may happen when the RTA Feed processes the first event for a new agent, and this event does not contain any channel information. If `channels` is null, then it should be interpreted that the agent has no active tasks.

```json
{
  "worker_channel_sid": "WCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_channel_sid": "TCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_channel_name": "voice",
  "available": 1,
  "available_capacity": 100,
  "capacity": 1,
  "date_capacity_updated": "2021-06-06T11:06:10.268Z",
  "reservations": [
    <reservationObject1>,
    <reservationObject2>,
    ...
  ]
}
```

* `worker_channel_sid` - The TaskRouter WorkerChannelSid which identifies the resource. The WorkerChannel is the entity that maps an agent's capacity and availability for a particular TaskChannel.
* `task_channel_sid` - The TaskRouter TaskChannelSid for this channel
* `task_channel_name` - The friendly name of this channel. Common values are "voice", "chat", and "sms". Each Flex application may customize this list to include custom values.
* `available` - Whether the worker will receive tasks of this channel type. `1` indicates they will. `0` indicates they won't.
* `available_capacity` - The current percentage of capacity the TaskChannel has available. Can be a number between `0` and `100`. A value of `0` indicates that TaskChannel has no capacity available and a value of `100` means the Worker is available to receive any Tasks of this TaskChannel type.
* `capacity` - The number of tasks of this channel that the agent is configured to handle simultaneously. TaskRouter will not create any reservations after the assigned Tasks for the Worker reaches the value.
* `date_capacity_updated` - A timestamp for when the agent's configured capacity was last updated for this channel
* `reservations` - An array of `reservationObjects`, each communicating the state and details of individual tasks the agent is handling. If `reservations` is `null`, this means the agent has no active tasks on this channel.

### reservationObject

Each active task that an agent is handling is represented as a reservation. Details on reservations can be found in our [TaskRouter documentation](/docs/taskrouter/api/reservations). It is common for the reservations array to be null. This means that the agent is not handling any tasks on that particular channel.

```json
{
  "sid": "WRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "created",
  "workflow_sid": "WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_queue_sid": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_assignment_status": "reserved",
  "date_created": "2021-06-06T11:09:09.240Z",
  "date_updated": "2021-06-06T11:09:09.240Z",
  "date_reservation_status_updated": "2021-06-06T11:09:09.240Z",
  "direction": "inbound"
}
```

* `sid` - The unique identifier for the TaskRouter Reservation
* `status` - The status of the agent's reservation. Possible values are accepted, canceled, completed, pending, rejected, rescinded, timeout, wrapping. Details on these statuses are in our [Reservation documentation](/docs/taskrouter/api/reservations#resource-properties).
* `workflow_sid` - The TaskRouter WorkflowSid for the workflow that routed this particular task
* `task_sid` - The TaskSid associated with this task
* `task_queue_sid` - A unique identifier for the TaskRouter TaskQueue that the task is part of
* `task_assignment_status` - The status of the task. Possible values are pending, reserved, assigned, canceled, wrapping, and completed. Details on these statuses are in our [Task Lifecycle](/docs/taskrouter/lifecycle-task-state) documentation.
* `date_created` - The timestamp for when this reservation was created. This indicates the amount of time that the task has been assigned to this agent.
* `date_updated` - The timestamp for the last time the reservation's status was updated
* `date_reservation_status_updated` - The timestamp for the last time the reservation's status was updated
* `direction` - The direction of the task. `inbound` or `outbound`.

## Examples

### Agent is offline and not handling any tasks

```json
{
  "product": "Flex",
  "object": "WFMWorkerChange",
  "version": 1,
  "records": [
    {
      "worker": {
        "sid": "WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_sid": "WAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_name": "Offline",
        "date_activity_updated": "2021-06-06T10:51:19.778Z"
      },
      "channels": null,
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "workspace_sid": "WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "last_processed_event_sid": "EVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "date_last_processed_event": "2021-06-06T10:52:04.383Z"
    }
  ]
}
```

### Agent is `Available` and handling one voice call

```json
{
  "product": "Flex",
  "object": "WFMWorkerChange",
  "version": 1,
  "records": [
    {
      "worker": {
        "sid": "WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_sid": "WAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_name": "Available",
        "date_activity_updated": "2021-06-06T11:06:10.268Z"
      },
      "channels": [
        {
          "reservations": [
            {
              "sid": "WRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "status": "accepted",
              "workflow_sid": "WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_queue_sid": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_assignment_status": "assigned",
              "date_created": "2021-06-06T11:09:09.240Z",
              "date_updated": "2021-06-06T11:10:00.561Z",
              "date_reservation_status_updated": "2021-06-06T11:10:00.561Z",
              "direction": "inbound"
            }
          ],
          "worker_channel_sid": null,
          "task_channel_sid": "TCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "task_channel_name": "voice",
          "available": 1,
          "available_capacity": 0,
          "capacity": 1,
          "date_capacity_updated": null
        }
      ],
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "workspace_sid": "WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "last_processed_event_sid": "EVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "date_last_processed_event": "2021-06-06T11:10:00.561Z"
    }
  ]
}
```

### Agent is `Available` and multitasking

```json
{
  "product": "Flex",
  "object": "WFMWorkerChange",
  "version": 1,
  "records": [
    {
      "worker": {
        "sid": "WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_sid": "WAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "activity_name": "Available",
        "date_activity_updated": "2021-06-06T11:06:10.268Z"
      },
      "channels": [
        {
          "reservations": [
            {
              "sid": "WRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "status": "accepted",
              "workflow_sid": "WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_queue_sid": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_assignment_status": "assigned",
              "date_created": "2021-06-06T12:26:09.602Z",
              "date_updated": "2021-06-06T12:26:18.104Z",
              "date_reservation_status_updated": "2021-06-06T12:26:18.104Z"
            }
          ],
          "worker_channel_sid": null,
          "task_channel_sid": "TCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "task_channel_name": "voice",
          "available": 1,
          "available_capacity": 0,
          "capacity": 1,
          "date_capacity_updated": null
        },
        {
          "reservations": [
            {
              "sid": "WRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "status": "accepted",
              "workflow_sid": "WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_queue_sid": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              "task_assignment_status": "assigned",
              "date_created": "2021-06-06T11:44:31.924Z",
              "date_updated": "2021-06-06T11:44:42.262Z",
              "date_reservation_status_updated": "2021-06-06T11:44:42.262Z"
            }
          ],
          "worker_channel_sid": null,
          "task_channel_sid": "TCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "task_channel_name": "chat",
          "available": 1,
          "available_capacity": 75,
          "capacity": 4,
          "date_capacity_updated": null
        }
      ],
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "workspace_sid": "WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "last_processed_event_sid": "EVxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "date_last_processed_event": "2021-06-06T12:26:18.104Z"
    }
  ]
}
```
