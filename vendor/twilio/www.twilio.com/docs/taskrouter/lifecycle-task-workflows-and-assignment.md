# Lifecycle of a Task: Workflows and Assignment

TaskRouter's primary job with a `pending` [Task](/docs/taskrouter/api/task) is to find a matching Worker. This assignment is handled by the [Workflows](/docs/taskrouter/api/workflow) within a Workspace.

When created, every Task is associated with a Workflow that is used to evaluate how to find a matching Worker. These Workflow configurations, represented in JSON, trace the path a Task takes until either a [Reservation](/docs/taskrouter/api/reservations) is accepted or the Task is canceled.

This page demonstrates how a Task finds a matching Worker given a Workflow. [Workflows Overview](/docs/taskrouter/workflow-configuration) provides documentation on how these Workflows can be configured.

## Workflow Example

```javascript
  "task_routing": {
    "filters": [
      {
        "expression": "type==\"Support\"",
        "filter_friendly_name": "Support Calls",
        "targets": [
          {
            "queue": <Just Support>,
            "timeout": 15,
            "expression": "worker.id IN task.preferred_agents"
          },
          {
            "timeout": 15
          }
        ]
      },
      {
        "expression": "type==\"Sales\"",
        "filter_friendly_name": "Sales Calls",
        "targets": [
          {
            "queue": <Just Sales>,
            "timeout": 15
          }
        ]
      }
    ],
    "default_filter": {
      "queue": <Everyone>
    }
  }
}
```

This configuration would be represented in Console like:

![Workflow for support and sales calls with worker matching and timeout settings.](https://docs-resources.prod.twilio.com/f3ce65821a404de474ccbab3e1b0051bdf77ba720f684507d9831508f1fc1b85.png)

## Workflow Basics

A Workflow evaluates linearly from top to bottom. A Task will find the first filter that matches that Task's attributes. Within that filter, the Task will then work progressively through each target ("routing step" in Console).

A Task will wait in each step of the defined workflow rule target for an accepted Reservation. A workflow will be re-evaluted in the following scenarios:

* A Reservation times out.
* A Reservation is canceled or rejected.
* Workflow or Task attributes are updated (if the ReEvaluateTasks [request body parameter](https://www.twilio.com/docs/taskrouter/api/workflow#request-body-parameters-1) is set to true).

If the timeout is hit based on the rule target timeout configuration, the Task will advance to the next rule target.

When using `skip_if`, a Task will advance to the next rule target until it reaches the last workflow rule target of a given rule. When this happens, a task will move to the next workflow rule. For more information, see [Skipping based on Worker availability](/docs/taskrouter/worker-presence).

The `default_filter` is only invoked if a Task doesn't match any filters. In this case, TaskRouter will attempt to find a matching Worker in the Queue defined by `default_filter` until the Task reaches its TTL.

## Tracing a Sample 'Sales' Task

Suppose a Task is created for the Workflow defined above with the following attributes:

```javascript
{
    "type": "Sales"
}
```

First, the Task would check against the "Support Calls" expression: `type==\"Support\""`. Failing that check, the Task then succeeds against the "Sales Calls" expression: `"type==\"Sales\""`.

Sales Filter:

```javascript
{
    "expression": "type==\"Sales\"",
    "filter_friendly_name": "Sales Calls",
    "targets": [{
        "queue": <Just Sales>,
        "timeout": 15
    }]
}
```

The single routing step attempts to find a matching Worker in the "Just Sales" TaskQueue. This queue has the following Workers Expression: `skills HAS "sales"`.

TaskRouter maintains a list of Workers associated with each queue. Here, TaskRouter already knows all Workers which have the `sales` skill. While the Task is attempting to be assigned, TaskRouter will filter the Workers in the queue for anyone that is in an `Available` activity state. For multitasking Workspaces, TaskRouter will additionally filter the Workers for anyone who has capacity for the Task's channel.

**To summarize**: the routing step above will find any Worker in the "Just Sales" queue that is `Available` and has capacity on the Task's channel.

### Creating Reservations

TaskRouter will create a `pending` Reservation for a Worker, choosing Workers in a "round robin" (i.e., a sequential cycle). The new Reservation is sent to the client application in three ways:

1. An initialized Worker on the [JS SDK](/docs/taskrouter/js-sdk-v1) can subscribe to the `reservation.created` event
2. A `reservation.created` event will `POST` to the [Event Callback URL](/docs/taskrouter/api/event)
3. An assignment event will `POST` to the [Assignment Callback URL](/docs/taskrouter/handle-assignment-callbacks)

If the Reservation is accepted, the Task will continue to its following [Task States](/docs/taskrouter/lifecycle-task-state).

If the Reservation doesn't succeed (i.e., the Reservation is rejected or it times out), the Workflow will check the timeout on the routing step. If the Task is still within the timeout, TaskRouter will attempt to assign the Task to any other matching Workers. Otherwise, if the Task is past the routing step timeout, the Task will flow to the next routing step or filter.

If the Worker moves to a different `Available` activity state to another while they have Reservations, the Reservations remain with that Worker. This means that a Worker may have Reservations that don't match their new activity state. Reservations stay with the Worker until they are accepted, rejected, or time out.

## Tracing a Sample 'Support' Task

Suppose a Task is created for the Workflow defined above with the following attributes:

```javascript
{
    "type": "Support",
    "preferred_agents": ["agent01","agent04"]
}
```

First, the Task would check against the "Support Calls" expression: `type==\"Support\""` and succeed.

Support Filter:

```javascript
{
    "expression": "type==\"Support\"",
    "filter_friendly_name": "Support Calls",
    "targets": [{
        "queue": <Just Support>,
        "timeout": 15,
        "expression": "worker.id IN task.preferred_agents"
    },{
        "timeout": 15
    }]
}
```

Similar to the Sales example above, TaskRouter will first find any Worker in the "Just Support" queue that is `Available` and has capacity on the Task's channel.

In addition, this routing step has an expression to match a subset of the Workers within the "Just Support' queue. As a result, TaskRouter will only generate a reservation for the Worker identified by "agent01" or "agent04" as a Worker attribute.

> \[!WARNING]
>
> If you would like to target a single known/preferred agent, use our
> dedicated [Known Agent
> Routing](/docs/taskrouter/workflow-configuration/known-agent-routing) feature
> to optimize performance for this use case.

### No Matching Workers Initially Available

Suppose our support Task is a voice call, and both "agent01" and "agent04" Workers are already on a call. If those Workers have their `voice` capacity set to 1, this Task will continue to wait for the 15 seconds timeout.

> \[!NOTE]
>
> *The sample workflow is simplified for demonstration*
>
> In the Workflow above, *all* Support tasks would wait for 15 seconds attempting to match `worker.id IN task.preferred_agents` — even if `task.preferred_agents` doesn't exist. This could be more universally addressed with a filter like:
>
> ```javascript
> {
>     "expression": "preferred_agents != null",
>     "filter_friendly_name": "Preferred Agents",
>     "targets": [{
>         "queue": <Everyone>,
>         "expression": "worker.id IN task.preferred_agents",
>         "timeout": 15
>     }]
> }
> ```

After timeout, the Task will progress to the next routing step:

```javascript
{
    "timeout": 15
}
```

Although that step doesn't contain a lot of detail, here is how that is rendered in Console:

![Workflow settings showing matching workers and timeout priority details.](https://docs-resources.prod.twilio.com/cda30e2fc72f0cd5adaff747da78f1b1e9253dbda70bc66ffbda5af401f9ae8c.png)

This second step has inherited the previous step's queue, but this time no matching workers expression is applied — any `Available` Worker can match. Therefore this step behaves similarly to the Sales filter from the previous section.

**Filter Summary**: TaskRouter will first find any `Available` Worker in the "Just Support" queue with `voice` capacity who has "agent01" or "agent04" as their ID. After 15 seconds without a match, TaskRouter will expand the search to anyone in the same queue for another 15 seconds.

## Advanced Workflow Features

In addition to the standard Workflow features mentioned here, there are additional features that impact how a Task finds a matching Worker.

* [Worker Ordering](/docs/taskrouter/order-workers) — Influencing the sort of which Worker is selected if multiple match the routing step
* [Skip Timeout](/docs/taskrouter/worker-presence) — Moving to the next routing step if a matching Worker isn't immediately found
* [Multi-reservation](/docs/taskrouter/api/task-queue#multi-reservation) — Sending multiple Reservations simultaneously. First accepted gets the Task.
