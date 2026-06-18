# Lifecycle of a Task: Timeout evaluation

## Overview

Timeouts help create a good customer experience by ensuring that a Task never gets "stuck" in a Queue with no available workers. Timeout behaviors can be tricky to master, but once you do, they'll give you fine-grained control over the movement of your Tasks through your Workflows.

## Example Workflow

Consider the following Workflow:

```json
{
    "task_routing": {
        "filters": [
            {
                "targets": [
                    {
                        "queue": "Q1",
                        "timeout": 10
                    },
                    {
                        "queue": "Q2",
                        "timeout": 10
                    },
                    {
                        "queue": "Q3",
                        "timeout": 10
                    },
                ],
                "expression": "1==1"
            }
        ]
    }
}

```

The reservation timeout is 5 seconds.

> \[!NOTE]
>
> For the sake of simpler visualization and reasoning, we've artificially increased the time it takes to create a Reservation. Your Workflows will likely run much faster than the one described here!

## How TaskRouter evaluate timeouts

![Animated task evaluation showing time, task, queue timeout, and reservation timeout values.](https://docs-resources.prod.twilio.com/9e0308ecab400e03e4f047162e47734cdb44dfcaedccb0ce7b51b14fe3d7e08e.gif)

1. Task A is created against the Workflow.
2. At t=3, a Reservation created for Task A against Q1.
3. At t=8, the reservation times out for Task A.
4. Task A re-evaluates and maps to Q2.

The Queue timeout is now the sum of Q1 and Q2 timeouts: 20. However, the target timeout for this task happens in 12 seconds because it's based on the Task's current time. Unlike the Reservation Timeout (which always starts at zero), the queue timeout is based on the current age of the Task.

## Manage task timeouts for active calls in Twilio Flex

When no agents are available in the TaskRouter workspace, and a voice task is created by the [Send to Flex widget](/docs/studio/widget-library/send-flex) in Studio, the task may time out with a TTL exceeded message even though the call remains active. This can result in prolonged customer wait times and additional PSTN inbound connectivity charges.

To avoid this issue:

* **Check worker availability**: Ensure that there are available workers before routing calls to the Send to Flex widget.
* **Listen for task canceled events**: Use the `task.canceled` event through [Event Callback](/docs/taskrouter/api/event/reference) to monitor task status.
* **Update call status**: Use the Programmable Voice API's [Update a Call](/docs/voice/api) resource to end the call or provide a message to the caller before disconnecting.

## Next steps

* Review the [Task State Lifecycle](/docs/taskrouter/lifecycle-task-state) and how a Task moves from `pending` to `completed`.
* Review the [Workflow and Assignment Lifecycle](/docs/taskrouter/lifecycle-task-workflows-and-assignment) and how TaskRouter finds a Worker to whom it can assign a Task.
* Start [configuring your own Workflows](/docs/taskrouter/workflow-configuration).
