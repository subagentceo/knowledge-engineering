# Lifecycle of a Task: Task state

## Overview

A [Task](/docs/taskrouter/api/task) is the core of TaskRouter. It represents a single item of work waiting to be processed. TaskRouter's primary role is to match a Task with a [Worker](/docs/taskrouter/api/worker), someone who can take action on the pending Task.

All of the other TaskRouter entities ([TaskQueues](/docs/taskrouter/api/task-queue), [Activities](/docs/taskrouter/api/activity), [Channels](/docs/taskrouter/api/worker-channel), and especially [Workflows](/docs/taskrouter/api/workflow)) are used to support this assignment.

## Task states

A Task progresses through a series of states, starting with `pending`, until successfully ending with `completed`. These Task states are closely associated with the [Reservations](/docs/taskrouter/api/reservations) that attempt to assign a Task to a Worker.

![Flowchart of task states: Pending, Reserved, Assigned, Wrapping, Completed, Canceled.](https://docs-resources.prod.twilio.com/ea09c99719972ca4b2e9be8032e4333cbdf516dccf1cfba2e0fb4b80db44c89b.png)

### Pending

When a Task is created, it starts as `pending`. A Task stays in `pending` until a Workflow finds a matching Worker. To learn more about how a Workflow evaluates a Task to be assigned, see [Workflows and Assignment](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

### Reserved

A Task moves to `reserved` when a Reservation is created with a matching Worker.

Once `reserved`, a Task moves back to `pending` if the Reservation is rejected or reaches the Reservation Timeout. Otherwise, if the Reservation is accepted, the Task moves to `assigned`.

For [multi-reservations](/docs/taskrouter/api/task-queue), where multiple reservations are created simultaneously for a Task, the Task only moves back to `pending` if all of the created reservations end without acceptance.

### Canceled

At any point until the Task has been `assigned`, the Task can be `canceled`. This primarily occurs for one of these reasons:

* The Task is canceled by an API request.
* The Task times-out according to the TTL set on the Task.
* The Task passes the final step in a Workflow without an accepted Reservation.
* The Task has reached the [Max Assignment Count](/docs/taskrouter/limits#other-limits), which is the number of times that a Task can move from status `pending` to `reserved`.

`canceled` is one of two terminal states for a Task (the other is `completed`), and the Task is deleted five minutes after moving into this state. Once a Task is canceled, it can no longer be queued for assignment anymore.

### Assigned

Once a Reservation is accepted, the Task is `assigned`. This is the period where the work represented by the Task actually gets done. For example, if the Task represents a voice call, the Worker is connected to the other call participant.

After a Task has been `assigned`, it only terminates at `completed`. An `assigned` Task won't move to `canceled`.

If the Task is not transitioned to `completed` within 24 hours, it's deleted from the system. Tasks can only be in the `assigned` state for 24 hours.

### Wrapping and Completed

Once the work associated with a Task is finished, the Task can be `completed`. For some Tasks, TaskRouter does this automatically — for example, voice calls accepted via `reservation.conference`. Otherwise, a Task must be `completed` using the API.

In a multitasking Workspace, Tasks move to `wrapping` first when the state is automatically transitioned by TaskRouter. Tasks can also be manually moved into `wrapping` by the API. `wrapping` Tasks must be moved to `completed` via the API.

The Task is deleted five minutes after moving into `completed`.
